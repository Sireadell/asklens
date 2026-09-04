// AskLens as an MCP server: the same Telegraph miners the web app uses,
// reachable from an editor or chat app that speaks the Model Context
// Protocol (Claude Desktop, Claude Code, Cursor, and similar).
//
// This process talks stdio only. The MCP wire protocol lives on stdout, so
// nothing except protocol messages may ever be written there. Every log line
// in this file goes to stderr instead, and initPayments() (which logs to
// stdout via console.log in telegraph.js) is called with console.log
// temporarily rerouted to stderr so its startup banner cannot corrupt a
// message frame.
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { fileURLToPath } from "node:url";
import { lookup as dnsLookup } from "node:dns/promises";
import net from "node:net";
import { config } from "./config.js";
import { initPayments, paymentReady, askMiner, EngineError } from "./telegraph.js";
import { extractAnswer, extractConfidence } from "./answer.js";
import { logAsk } from "./asklog.js";
import { recordAnswered } from "./stats.js";
import { intentInfo } from "./intents.js";

const EVM_ADDRESS_RE = /^0x[a-fA-F0-9]{40}$/;

export function isValidAddress(address) {
  return typeof address === "string" && EVM_ADDRESS_RE.test(address.trim());
}

// Pulls a hostname out of whatever the caller typed. People paste bare
// domains as often as full URLs, so a missing protocol is filled in before
// handing the string to the URL parser rather than rejecting it outright.
export function extractDomain(input) {
  if (typeof input !== "string" || !input.trim()) return null;
  let candidate = input.trim();
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(candidate)) {
    candidate = `https://${candidate}`;
  }
  try {
    const hostname = new URL(candidate).hostname;
    return hostname || null;
  } catch {
    return null;
  }
}

// Sentinel only accepts two chain values, "eth" and "base". People say
// "ethereum" or "mainnet" more often than "eth" in plain conversation, so
// those are mapped rather than passed straight through into a 400.
const CHAIN_ALIASES = {
  eth: "eth",
  ethereum: "eth",
  mainnet: "eth",
  base: "base",
};

export function normalizeChain(chain) {
  if (chain === undefined || chain === null || chain === "") {
    return { ok: true, value: "eth" };
  }
  if (typeof chain !== "string") {
    return { ok: false };
  }
  const mapped = CHAIN_ALIASES[chain.trim().toLowerCase()];
  return mapped ? { ok: true, value: mapped } : { ok: false };
}

// Turns any thrown error into one plain sentence. EngineError already carries
// a friendly message (see telegraph.js), so this mostly just adds a little
// context for the two cases worth calling out by name: a refused request
// (422, never charged) and a missing wallet key.
export function describeEngineError(err) {
  if (err instanceof EngineError) {
    if (err.code === "REQUEST_REFUSED") {
      return `Telegraph declined this request before running it, so nothing was charged. ${err.message}`;
    }
    return err.message;
  }
  return `Something went wrong: ${err?.message ?? String(err)}`;
}

// Turns the sentinel miner's assess-wallet payload into a short, readable
// verdict. The evidence array can be large, so it is counted and summarised
// by signal code rather than dumped whole into the response.
export function shapeWalletVerdict(body, fallbackMinerName, fallbackMinerId) {
  const result = body?.result && typeof body.result === "object" ? body.result : {};
  const label = typeof result.label === "string" && result.label.trim() ? result.label.trim() : "UNKNOWN";
  const confidence = typeof result.confidence === "number" && !Number.isNaN(result.confidence) ? result.confidence : null;
  const reason = typeof result.reason === "string" && result.reason.trim() ? result.reason.trim() : "No reason given.";
  const reasonCodes = Array.isArray(result.reason_codes) ? result.reason_codes : [];
  const evidence = Array.isArray(result.evidence) ? result.evidence : [];
  // Sentinel's real evidence items use camelCase (signalCode), not the
  // snake_case guesses this used to look for first.
  const evidenceCodes = [
    ...new Set(
      evidence.map((e) => {
        if (e && typeof e === "object") return e.signalCode ?? e.signal_code ?? e.code ?? e.signal ?? "unspecified";
        return "unspecified";
      })
    ),
  ];

  const riskLevel = typeof result.risk_level === "string" && result.risk_level.trim() ? result.risk_level.trim() : null;
  const riskPct = typeof result.risk_pct === "number" && !Number.isNaN(result.risk_pct) ? result.risk_pct : null;
  const assessmentStatus =
    typeof result.assessment_status === "string" && result.assessment_status.trim() ? result.assessment_status.trim() : null;

  const lines = [
    `Wallet safety verdict: ${label}`,
    riskLevel ? `Risk level: ${riskLevel}` : null,
    riskPct !== null ? `Risk: ${riskPct}%` : null,
    confidence !== null ? `Confidence: ${Math.round(confidence * 100)}%` : "Confidence: not reported",
    assessmentStatus ? `Assessment status: ${assessmentStatus}` : null,
    `Reason: ${reason}`,
    reasonCodes.length ? `Reason codes: ${reasonCodes.join(", ")}` : "Reason codes: none given",
    evidence.length
      ? `Evidence: ${evidence.length} piece(s), signals: ${evidenceCodes.join(", ")}`
      : "Evidence: none given",
    `Answered by: ${body?.miner_name ?? fallbackMinerName} (miner id ${body?.miner_id ?? fallbackMinerId})`,
    typeof body?.cost_usd === "number" ? `Cost: $${body.cost_usd.toFixed(2)}` : null,
  ].filter(Boolean);

  return lines.join("\n");
}

// Renders one of the two link checks (ssl-check or ip-geolocate) as a single
// clause. `outcome` is either { error } for a call that failed, or the shaped
// result of a call that succeeded.
export function summarizeCheck(label, outcome) {
  if (!outcome || outcome.error) {
    return `${label}: could not be completed (${outcome?.error ?? "unknown error"}).`;
  }
  const { text } = extractAnswer(outcome.result);
  const confidence = extractConfidence(outcome.result);
  const status = outcome.result && typeof outcome.result === "object" ? outcome.result.status : null;
  const parts = [text ?? (status ? `status: ${status}` : "no summary given")];
  if (confidence !== null) parts.push(`confidence ${Math.round(confidence * 100)}%`);
  return `${label}: ${parts.join(", ")}`;
}

// Combines the certificate check and the hosting-location check into one
// verdict about a link. Either check can fail on its own without the other
// one being lost.
export function shapeLinkVerdict(domain, sslOutcome, geoOutcome) {
  const bothOk = !sslOutcome?.error && !geoOutcome?.error;
  const headline = bothOk
    ? `Checked ${domain}: the certificate check and the hosting-location check both came back.`
    : `Checked ${domain}, but one of the two checks could not be completed. Treat this as a partial answer.`;

  const costs = [sslOutcome, geoOutcome]
    .filter((o) => o && !o.error && typeof o.costUsd === "number")
    .reduce((sum, o) => sum + o.costUsd, 0);

  const lines = [
    headline,
    summarizeCheck("Certificate", sslOutcome),
    summarizeCheck("Hosting location", geoOutcome),
    costs > 0 ? `Cost: $${costs.toFixed(2)}` : null,
  ].filter(Boolean);

  return lines.join("\n");
}

// Runs one direct askMiner call and turns any thrown EngineError into a
// plain-object outcome instead of letting it propagate, so one failed check
// never takes the other one down with it.
async function safeAskMiner(minerId, opts) {
  try {
    const { body, settlement } = await askMiner(minerId, opts);
    return {
      ok: true,
      result: body.result,
      minerName: body.miner_name,
      minerId: body.miner_id,
      costUsd: typeof body.cost_usd === "number" ? body.cost_usd : null,
      signalHash: body.signal_hash ?? null,
      paymentTx: settlement?.transaction ?? settlement?.tx ?? null,
      body,
    };
  } catch (err) {
    return { ok: false, error: describeEngineError(err) };
  }
}

function textResult(text, isError = false) {
  return { content: [{ type: "text", text }], isError };
}

function logToolCall({ question, intent, minerName, direct, answer, signalHash, paymentTx, durationMs }) {
  try {
    logAsk({ question, intent, minerName, ourMiner: true, answer, signalHash, paymentTx, direct, durationMs });
    recordAnswered({ intent, minerName });
  } catch (err) {
    // Logging must never take a tool call down. Match server.js's stance of
    // failing soft on side-channel bookkeeping.
    console.error("[mcp] could not log tool call:", err.message);
  }
}

// Builds the sentinel assess-wallet request.
//
// The method MUST be POST. Sentinel registers both GET and POST for this
// endpoint, but the Telegraph engine delivers the payload as a request body,
// which only the POST route reads. Over GET the wallet never arrives and the
// engine returns HTTP 500 with "body must include a valid wallet address".
// Verified live on 2026-09-03: GET failed 4 times out of 4 spaced 8 seconds
// apart, POST returned a real verdict and a signal hash every time. Do not
// change this back to GET.
export function walletAssessRequest(address, chain) {
  return {
    method: "POST",
    endpoint: "/assess-wallet",
    payload: { wallet: address, chain },
  };
}

async function checkWalletSafety({ address, chain }) {
  if (!isValidAddress(address)) {
    return textResult(
      `"${address}" does not look like an EVM wallet address. It should be 0x followed by 40 hex characters.`,
      true
    );
  }

  const normalizedChain = normalizeChain(chain);
  if (!normalizedChain.ok) {
    return textResult(
      `"${chain}" is not a chain this check supports. Sentinel only covers eth and base right now.`,
      true
    );
  }

  const miner = config.ownMiners.sentinel;
  const startedAt = Date.now();
  const outcome = await safeAskMiner(miner.id, walletAssessRequest(address, normalizedChain.value));

  if (!outcome.ok) {
    return textResult(`Could not check ${address}. ${outcome.error}`, true);
  }

  const text = shapeWalletVerdict(outcome.body, miner.name, miner.id);
  logToolCall({
    question: `check_wallet_safety: ${address}`,
    intent: "WALLET_SAFETY",
    minerName: outcome.minerName ?? miner.name,
    direct: true,
    answer: text,
    signalHash: outcome.signalHash,
    paymentTx: outcome.paymentTx,
    durationMs: Date.now() - startedAt,
  });

  return textResult(text);
}

// ip-geolocate wants a literal IP, not a hostname, so a domain has to be
// resolved with DNS first. A bare IP passed straight through is used as-is.
async function resolveHostForGeo(domain) {
  if (net.isIP(domain) !== 0) {
    return { ok: true, ip: domain };
  }
  try {
    const { address } = await dnsLookup(domain);
    return { ok: true, ip: address };
  } catch (err) {
    return { ok: false, error: `Could not resolve ${domain} to an IP address: ${err.message}` };
  }
}

async function checkLinkSafety({ url }) {
  const domain = extractDomain(url);
  if (!domain) {
    return textResult(`"${url}" does not look like a URL or domain this app can check.`, true);
  }

  const miner = config.ownMiners.txlens;
  const startedAt = Date.now();
  const isLiteralIp = net.isIP(domain) !== 0;

  // A bare IP has no certificate to look up, so skip that call rather than
  // sending a domain-shaped request that would just fail.
  const sslPromise = isLiteralIp
    ? Promise.resolve({ ok: false, error: "This is an IP address, not a domain, so there is no certificate to check." })
    : safeAskMiner(miner.id, { method: "GET", endpoint: "/ssl-check", payload: { domain } });

  const geoPromise = (async () => {
    const resolved = await resolveHostForGeo(domain);
    if (!resolved.ok) return { ok: false, error: resolved.error };
    return safeAskMiner(miner.id, { method: "GET", endpoint: "/ip-geolocate", payload: { ip: resolved.ip } });
  })();

  const [sslOutcome, geoOutcome] = await Promise.all([sslPromise, geoPromise]);

  if (!sslOutcome.ok && !geoOutcome.ok) {
    return textResult(
      `Could not check ${domain}. Certificate check: ${sslOutcome.error} Hosting check: ${geoOutcome.error}`,
      true
    );
  }

  const text = shapeLinkVerdict(domain, sslOutcome, geoOutcome);

  if (sslOutcome.ok) {
    logToolCall({
      question: `check_link_safety (ssl-check): ${domain}`,
      intent: "LINK_SAFETY",
      minerName: sslOutcome.minerName ?? miner.name,
      direct: true,
      answer: text,
      signalHash: sslOutcome.signalHash,
      paymentTx: sslOutcome.paymentTx,
      durationMs: Date.now() - startedAt,
    });
  }
  if (geoOutcome.ok) {
    logToolCall({
      question: `check_link_safety (ip-geolocate): ${domain}`,
      intent: "LINK_SAFETY",
      minerName: geoOutcome.minerName ?? miner.name,
      direct: true,
      answer: text,
      signalHash: geoOutcome.signalHash,
      paymentTx: geoOutcome.paymentTx,
      durationMs: Date.now() - startedAt,
    });
  }

  // One check succeeding is enough to return a real (if partial) verdict, so
  // this is not reported as a tool error even when the other check failed.
  return textResult(text);
}

// Turns one own-miner lookup into a short, readable line. Shared by every
// plain-data tool below (gas, price, weather, and so on), which all follow
// the same shape: one question in, one summarised answer out.
export function shapeLookupVerdict(value, outcome, fallbackMinerName, fallbackMinerId) {
  if (!outcome.ok) {
    return `Could not answer for "${value}". ${outcome.error}`;
  }
  const { text } = extractAnswer(outcome.result);
  const confidence = extractConfidence(outcome.result);
  const lines = [
    text ?? "No readable summary came back. Raw response follows.",
    text ? null : JSON.stringify(outcome.result).slice(0, 600),
    confidence !== null ? `Confidence: ${Math.round(confidence * 100)}%` : null,
    `Answered by: ${outcome.minerName ?? fallbackMinerName} (miner id ${outcome.minerId ?? fallbackMinerId})`,
    typeof outcome.costUsd === "number" ? `Cost: $${outcome.costUsd.toFixed(2)}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}

// Asks one of our own miners directly for a known intent, using the exact
// same endpoint, method and parameter name the web app's second-opinion
// panel already uses in production (see src/intents.js and server.js). That
// mapping is proven, so this is wiring, not new integration work.
async function askOwnMiner(intentKey, value) {
  const info = intentInfo(intentKey);
  const miner = config.ownMiners[info.miner];
  const startedAt = Date.now();
  const outcome = await safeAskMiner(miner.id, {
    method: info.method,
    endpoint: info.endpoint,
    payload: { [info.param]: value },
  });
  const text = shapeLookupVerdict(value, outcome, miner.name, miner.id);
  if (outcome.ok) {
    logToolCall({
      question: `${intentKey}: ${value}`,
      intent: intentKey,
      minerName: outcome.minerName ?? miner.name,
      direct: true,
      answer: text,
      signalHash: outcome.signalHash,
      paymentTx: outcome.paymentTx,
      durationMs: Date.now() - startedAt,
    });
  }
  return textResult(text, !outcome.ok);
}

// Every intent our miner serves other than fraud detection, which has its
// own dedicated tool (check_wallet_safety) because its response shape is a
// verdict, not a plain lookup. One MCP tool per row, so nothing here needs
// a separate dashboard or a different app.
const LOOKUP_TOOLS = [
  { name: "check_transaction", intent: "ONCHAIN_TX_LOOKUP", field: "tx_hash", describe: "The transaction hash to look up, e.g. 0xabc...123." },
  { name: "check_gas_price", intent: "GAS_PRICE", field: "chain", describe: "The chain to check gas on, e.g. ethereum." },
  { name: "check_wallet_balance", intent: "WALLET_BALANCE_CHECK", field: "address", describe: "The wallet address to check, e.g. 0xabc...123." },
  { name: "check_token_holders", intent: "TOKEN_HOLDER_COUNT", field: "token", describe: "The token to check, by symbol, name, or contract address." },
  { name: "check_tvl", intent: "TVL_LOOKUP", field: "protocol", describe: "The protocol to check total value locked for, e.g. aave." },
  { name: "check_crypto_price", intent: "CRYPTO_PRICE", field: "coin_id", describe: "The coin to price, e.g. bitcoin or eth." },
  { name: "check_stock_price", intent: "STOCK_PRICE", field: "ticker", describe: "The stock ticker to price, e.g. AAPL." },
  { name: "check_ssl_certificate", intent: "SSL_VERIFICATION", field: "domain", describe: "The domain to check the certificate of, e.g. example.com." },
  { name: "check_weather", intent: "WEATHER_FORECAST", field: "location", describe: "The place to get a forecast for, e.g. Lagos, Nigeria." },
  { name: "check_storm_alert", intent: "STORM_ALERT", field: "location", describe: "The place to check for active storm or severe weather alerts." },
  { name: "check_ip_location", intent: "IP_GEOLOCATION", field: "ip", describe: "The IP address to locate, e.g. 8.8.8.8." },
  { name: "search_academic_papers", intent: "ACADEMIC_SEARCH", field: "query", describe: "The research topic to find published papers on." },
  { name: "search_web", intent: "WEB_SEARCH", field: "query", describe: "Any question answerable from the live web." },
];

function registerTools(server) {
  for (const tool of LOOKUP_TOOLS) {
    const info = intentInfo(tool.intent);
    server.registerTool(
      tool.name,
      {
        title: info.label,
        description: `Asks Telegraph's txlens miner: ${info.plain}. Costs $0.01 in testnet USDC per call.`,
        inputSchema: {
          [tool.field]: z.string().describe(tool.describe),
        },
      },
      async (args) => askOwnMiner(tool.intent, args[tool.field])
    );
  }

  server.registerTool(
    "check_wallet_safety",
    {
      title: "Check wallet safety",
      description:
        "Asks Telegraph's sentinel fraud-detection miner for a safety verdict on an EVM wallet address (HIGH/LOW risk, a confidence score, and a plain-language reason). Costs $0.01 in testnet USDC per call.",
      inputSchema: {
        address: z.string().describe("The EVM wallet address to check, e.g. 0xabc...123"),
        chain: z
          .string()
          .optional()
          .describe("The chain the address is on. Supported chains are eth and base, defaulting to eth."),
      },
    },
    async ({ address, chain }) => checkWalletSafety({ address, chain })
  );

  server.registerTool(
    "check_link_safety",
    {
      title: "Check link safety",
      description:
        "Checks a URL's TLS certificate and where it is hosted, using Telegraph's txlens miner. Two calls, each $0.01 in testnet USDC.",
      inputSchema: {
        url: z.string().describe("The URL or domain to check, e.g. https://example.com"),
      },
    },
    async ({ url }) => checkLinkSafety({ url })
  );
}

export async function main() {
  const server = new McpServer({ name: "asklens", version: "0.1.0" });
  registerTools(server);

  // initPayments() logs its result with console.log, which writes to stdout.
  // On an MCP stdio server stdout is the protocol channel, so that banner is
  // rerouted to stderr for the duration of this one call.
  const realLog = console.log;
  console.log = (...args) => console.error(...args);
  try {
    initPayments();
  } finally {
    console.log = realLog;
  }

  if (!paymentReady()) {
    console.error(
      "[mcp] no wallet key configured (EVM_PRIVATE_KEY). Tool calls will fail with a friendly error until one is set."
    );
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`[mcp] AskLens MCP server ready over stdio (engine: ${config.engineBaseUrl})`);
}

// Only run the server when this file is executed directly, not when it is
// imported by the test suite.
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  main().catch((err) => {
    console.error("[mcp] fatal startup error:", err);
    process.exit(1);
  });
}
