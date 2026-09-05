import express from "express";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { config } from "./config.js";
import { initPayments, paymentReady, getPayerAddress, ask, askMiner, EngineError } from "./telegraph.js";
import { extractAnswer, extractConfidence } from "./answer.js";
import { INTENTS, EXAMPLES, intentInfo } from "./intents.js";
import { loadStats, getStats, recordAnswered } from "./stats.js";
import { logAsk, readLog } from "./asklog.js";
import { buildReport } from "./report.js";
import { readComparisons } from "./compare.js";
import { createAskLensServer } from "./mcp.js";
import { assessWalletForSnap } from "./snap-wallet.js";
import { createSnapRequestGuard } from "./snap-guard.js";
import { createSnapWalletSafetyHandler } from "./snap-route.js";

const here = dirname(fileURLToPath(import.meta.url));
const app = express();
// Render places exactly one trusted proxy in front of this service. Express
// therefore uses only the address supplied by that final proxy and ignores
// extra, user-supplied addresses farther to the left.
app.set("trust proxy", 1);
app.use(express.json({ limit: "32kb" }));
app.use(express.static(join(here, "..", "public")));

// Claude's custom connectors speak MCP over normal HTTPS. Each visitor gets
// an isolated session, while AskLens keeps the Telegraph payment details on
// the server. Nobody connecting to this public endpoint needs a wallet.
const mcpTransports = new Map();

async function handleMcpPost(req, res) {
  const sessionId = req.headers["mcp-session-id"];
  let transport = sessionId ? mcpTransports.get(sessionId) : null;

  if (!transport && !sessionId && isInitializeRequest(req.body)) {
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (id) => mcpTransports.set(id, transport),
    });
    transport.onclose = () => {
      if (transport.sessionId) mcpTransports.delete(transport.sessionId);
    };
    await createAskLensServer().connect(transport);
  }

  if (!transport) {
    return res.status(400).json({
      jsonrpc: "2.0",
      error: { code: -32000, message: "No valid MCP session was provided." },
      id: null,
    });
  }

  await transport.handleRequest(req, res, req.body);
}

async function handleMcpSession(req, res) {
  const sessionId = req.headers["mcp-session-id"];
  const transport = sessionId ? mcpTransports.get(sessionId) : null;
  if (!transport) {
    return res.status(400).json({
      jsonrpc: "2.0",
      error: { code: -32000, message: "No valid MCP session was provided." },
      id: null,
    });
  }
  await transport.handleRequest(req, res);
}

app.post("/mcp", (req, res, next) => handleMcpPost(req, res).catch(next));
app.get("/mcp", (req, res, next) => handleMcpSession(req, res).catch(next));
app.delete("/mcp", (req, res, next) => handleMcpSession(req, res).catch(next));

const MAX_QUESTION_CHARS = 500;

function shapeResponse(body, settlement) {
  const { text, raw } = extractAnswer(body.result);
  const ourMiner = Object.values(config.ownMiners).some((m) => m.id === String(body.miner_id));
  return {
    answer: text,
    raw: text ? undefined : raw,
    intent: body.intent ?? null,
    intentLabel: body.intent ? intentInfo(body.intent)?.label ?? body.intent : null,
    reasoning: body.reasoning ?? null,
    minerId: body.miner_id ?? null,
    minerName: body.miner_name ?? null,
    ourMiner,
    endpoint: body.endpoint ?? null,
    confidence: extractConfidence(body.result),
    costUsd: typeof body.cost_usd === "number" ? body.cost_usd : null,
    durationMs: typeof body.duration_ms === "number" ? body.duration_ms : null,
    signalHash: body.signal_hash ?? null,
    warnings: body.warnings ?? null,
    paymentTx: settlement?.transaction ?? settlement?.tx ?? null,
    timestamp: body.timestamp ?? new Date().toISOString(),
  };
}

function sendEngineError(res, err) {
  if (err instanceof EngineError) {
    return res.status(err.status).json({ error: err.code, message: err.message, details: err.details });
  }
  console.error("[ask] unexpected error:", err);
  return res.status(500).json({ error: "INTERNAL_ERROR", message: "Something went wrong on our side." });
}

// Ask anything. Telegraph's router picks the intent and the miner.
app.post("/api/ask", async (req, res) => {
  const question = typeof req.body?.question === "string" ? req.body.question.trim() : "";
  if (question.length < 3) {
    return res.status(400).json({ error: "QUESTION_TOO_SHORT", message: "Type a question first." });
  }
  if (question.length > MAX_QUESTION_CHARS) {
    return res.status(400).json({ error: "QUESTION_TOO_LONG", message: `Keep it under ${MAX_QUESTION_CHARS} characters.` });
  }

  try {
    const { body, settlement } = await ask(question);
    const shaped = shapeResponse(body, settlement);
    recordAnswered({ intent: shaped.intent, minerName: shaped.minerName });
    logAsk({ question, ...shaped });
    return res.json({ question, ...shaped, stats: getStats() });
  } catch (err) {
    return sendEngineError(res, err);
  }
});

// Second opinion: put the same question to one of the miners this project
// runs, named directly rather than chosen by the router.
app.post("/api/second-opinion", async (req, res) => {
  const question = typeof req.body?.question === "string" ? req.body.question.trim() : "";
  const intent = typeof req.body?.intent === "string" ? req.body.intent : "";
  const info = intentInfo(intent);
  if (!question || !info) {
    return res.status(400).json({ error: "UNSUPPORTED_INTENT", message: "No miner of ours covers that intent." });
  }

  const miner = config.ownMiners[info.miner];
  try {
    const { body, settlement } = await askMiner(miner.id, {
      method: info.method,
      endpoint: info.endpoint,
      payload: { [info.param]: question },
    });
    const shaped = shapeResponse(body, settlement);
    recordAnswered({ intent, minerName: shaped.minerName ?? miner.name });
    logAsk({ question, ...shaped, intent, minerName: shaped.minerName ?? miner.name, direct: true });
    return res.json({ question, askedMiner: miner.name, intent, ...shaped, stats: getStats() });
  } catch (err) {
    return sendEngineError(res, err);
  }
});

app.get("/api/stats", (_req, res) => {
  res.json({ ...getStats(), intents: INTENTS, examples: EXAMPLES });
});

// The last N questions asked, each with the signal hash needed to pull the
// full exchange back from Telegraph and check the answer afterwards.
app.get("/api/log", (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 50, 500);
  res.json({ entries: readLog(limit) });
});

// How your miners are faring against the ones the router prefers.
app.get("/api/report", (_req, res) => {
  res.json(buildReport(readComparisons()));
});

// MetaMask transaction insights use this narrow endpoint. The server keeps
// the Telegraph payment key private and returns only Sentinel's wallet verdict.
const snapGuard = createSnapRequestGuard({
  usageFile: config.snapUsageFile,
  perClientLimit: config.snapRateLimit,
  windowMs: config.snapRateWindowMs,
  dailyPaidLimit: config.snapDailyPaidLimit,
});
app.post("/api/snap/wallet-safety", createSnapWalletSafetyHandler({
  assessWallet: assessWalletForSnap,
  guard: snapGuard,
  enabled: config.snapPublicDemoEnabled,
}));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    paymentConfigured: paymentReady(),
    payer: getPayerAddress(),
    engine: config.engineBaseUrl,
    miners: config.ownMiners,
    snapPublicDemoEnabled: config.snapPublicDemoEnabled,
  });
});

loadStats();
initPayments();
app.listen(config.port, () => {
  console.log(`AskLens listening on http://localhost:${config.port}`);
});
