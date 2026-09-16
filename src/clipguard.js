// Clip Guard: the instant a link is copied on someone's PC, ask several
// independent Telegraph URL_SCAN miners at once and hand back one ranked
// verdict, fast enough to show in a desktop notification.
import { askMiner, EngineError } from "./telegraph.js";
import { extractAnswer, extractConfidence } from "./answer.js";
import { recordAnswered } from "./stats.js";
import { config } from "./config.js";
import { walletAssessRequest } from "./mcp.js";
import { snapWalletResult } from "./snap-wallet.js";
import { isContractAddress } from "./chain.js";
import { checkTokenSafety } from "./token-safety.js";

// These are the only URL_SCAN miners Clip Guard knows how to call and read
// safely. The registry can rank them, but it cannot introduce an unknown
// miner into a security decision without an explicit compatible definition.
export const CLIPGUARD_MINERS = [
  { id: "7334", name: "NetWire", method: "GET", endpoint: "/url-scan", payload: (url) => ({ question: `Is ${url} safe?` }) },
  { id: "5001", name: "URL Sentinel", method: "POST", endpoint: "/scan", payload: (url) => ({ url }) },
  { id: "20260828", name: "Preflight", method: "GET", endpoint: "/url-scan", payload: (url) => ({ url }) },
];

// Adding a miner here is a reviewed compatibility decision, not a registry
// setting. Its endpoint, request payload, and response verdict schema must
// all be verified before it can affect a safety result.
const URL_MINER_CANDIDATES = CLIPGUARD_MINERS;
const URL_SCAN_INTENT = "URL_SCAN";
export const URL_MINER_DISCOVERY_CACHE_MS = 6 * 60 * 60 * 1000;
export const URL_MINER_DISCOVERY_TIMEOUT_MS = 1500;

const VERDICT_MAP = {
  safe: "safe", clean: "safe", benign: "safe", legitimate: "safe", ok: "safe", low: "safe",
  suspicious: "suspicious", caution: "suspicious", unverified: "suspicious", risky: "suspicious", warning: "suspicious", medium: "suspicious",
  malicious: "malicious", phishing: "malicious", scam: "malicious", dangerous: "malicious", blocklisted: "malicious", blacklisted: "malicious", threat: "malicious", compromised: "malicious", high: "malicious",
};

function registryEntries(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.integrations)) return payload.integrations;
  if (Array.isArray(payload?.miners)) return payload.miners;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function urlScanRank(integration) {
  const scores = Array.isArray(integration?.scores) ? integration.scores : [];
  const score = scores.find((item) => item?.intent_id === URL_SCAN_INTENT);
  const rank = Number(score?.rank);
  return Number.isFinite(rank) && rank > 0 ? rank : null;
}

function hasCompatibleEndpoint(integration, candidate) {
  const endpoints = Array.isArray(integration?.endpoints)
    ? integration.endpoints
    : [integration?.endpoints];
  return endpoints.some((endpoint) => (
    endpoint?.path === candidate.endpoint
    && String(endpoint?.method ?? "").toUpperCase() === candidate.method
  ));
}

// The registry is an advisory leaderboard, not a source of executable
// configuration. A miner is eligible only when it is active, says it serves
// URL_SCAN, and has an explicit compatible definition above.
export function chooseRankedUrlMiners(payload, candidates = URL_MINER_CANDIDATES) {
  const byId = new Map(registryEntries(payload).map((item) => [String(item?.id), item]));
  return candidates
    .map((candidate) => ({ candidate, integration: byId.get(candidate.id) }))
    .filter(({ candidate, integration }) => (
      integration?.activation_status === "active"
      && Array.isArray(integration.supported_intents)
      && integration.supported_intents.includes(URL_SCAN_INTENT)
      && urlScanRank(integration) !== null
      && hasCompatibleEndpoint(integration, candidate)
    ))
    .sort((a, b) => {
      const rankDifference = urlScanRank(a.integration) - urlScanRank(b.integration);
      return rankDifference || a.candidate.name.localeCompare(b.candidate.name);
    })
    .slice(0, 3)
    .map(({ candidate }) => candidate);
}

export function createUrlMinerSelector({
  discoveryUrl = config.discoveryUrl,
  fetchFn = fetch,
  now = () => Date.now(),
  cacheMs = URL_MINER_DISCOVERY_CACHE_MS,
  discoveryTimeoutMs = URL_MINER_DISCOVERY_TIMEOUT_MS,
} = {}) {
  // The original three are the safe startup and failure fallback. A failed
  // registry read never takes protection away or changes a live check.
  let currentMiners = [...CLIPGUARD_MINERS];
  let lastAttemptAt = null;
  let refreshInFlight = null;

  function refreshIfDue() {
    const currentTime = now();
    if (lastAttemptAt !== null && currentTime - lastAttemptAt < cacheMs) {
      return [...currentMiners];
    }
    if (refreshInFlight) return [...currentMiners];

    // Record the attempt before the request so a broken registry cannot add a
    // network request to every clipboard event.
    lastAttemptAt = currentTime;
    refreshInFlight = (async () => {
      const controller = new AbortController();
      let deadline;
      try {
        const timeout = new Promise((_, reject) => {
          deadline = setTimeout(() => {
            controller.abort();
            reject(new Error("Registry request timed out."));
          }, discoveryTimeoutMs);
        });
        // The deadline covers both headers and the JSON body. A response can
        // arrive while its body never finishes, which must not leave the
        // refresh marked in-flight forever.
        const payload = await Promise.race([
          (async () => {
            const response = await fetchFn(discoveryUrl, {
              headers: { Accept: "application/json" },
              signal: controller.signal,
            });
            if (!response?.ok) throw new Error(`Registry returned HTTP ${response?.status ?? "unknown"}.`);
            return response.json();
          })(),
          timeout,
        ]);
        const ranked = chooseRankedUrlMiners(payload);
        // Do not replace a complete, known-working set with a partial one.
        if (ranked.length === 3) currentMiners = ranked;
      } catch {
        // Retain the last complete set. The next refresh is still rate-limited.
      } finally {
        clearTimeout(deadline);
        refreshInFlight = null;
      }
    })();
    // Discovery is advisory. Clipboard checks immediately use the last
    // complete snapshot while this bounded refresh happens in the background.
    return [...currentMiners];
  }

  return { refreshIfDue };
}

const urlMinerSelector = createUrlMinerSelector();

// Every miner names its verdict differently, so this trusts an exact,
// short verdict-style field first (e.g. "safe", "malicious", or NetWire's
// "risk": "low") rather than scanning full sentences: a clean explanation
// naturally contains words like "malicious" inside a negation ("no
// malicious signals found"), and a substring scan over that free text
// would misread it as a bad verdict. Free-text scanning is never used.
export function classifyUrlVerdict(result) {
  if (!result || typeof result !== "object") return "unknown";

  const hasExplicitVerdict = typeof result.verdict === "string";
  const explicitVerdict = hasExplicitVerdict
    ? VERDICT_MAP[result.verdict.trim().toLowerCase()]
    : null;
  if (typeof result.malicious === "boolean") {
    const booleanVerdict = result.malicious ? "malicious" : "safe";
    // Two explicit signals that disagree are not evidence of safety.
    if (explicitVerdict && explicitVerdict !== booleanVerdict) return "unknown";
    // An unrecognised named verdict means this miner needs an adapter before
    // its boolean field can be trusted for a safety decision.
    if (hasExplicitVerdict && !explicitVerdict) return "unknown";
    return explicitVerdict ?? booleanVerdict;
  }
  if (explicitVerdict) return explicitVerdict;
  if (typeof result.safe === "boolean") {
    if (result.safe) return "safe";
    if (typeof result.risk === "string") {
      const mapped = VERDICT_MAP[result.risk.trim().toLowerCase()];
      if (mapped) return mapped;
    }
    return "suspicious";
  }
  if (typeof result.risk === "string") {
    const mapped = VERDICT_MAP[result.risk.trim().toLowerCase()];
    if (mapped) return mapped;
  }
  return "unknown";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// A payment occasionally fails to settle on the first try (a same-wallet
// nonce race, not a real balance problem — confirmed live, the balance is
// fine when this happens). One retry after a short pause clears it almost
// every time, so a single transient failure does not cost a whole miner's
// vote in the aggregated verdict.
async function askOneMiner(miner, url, timeoutMs, retriesLeft = 1) {
  try {
    const { body } = await askMiner(
      miner.id,
      { method: miner.method, endpoint: miner.endpoint, payload: miner.payload(url) },
      { timeoutMs }
    );
    recordAnswered({ intent: "URL_SCAN", minerName: miner.name });
    return {
      miner: miner.name,
      minerId: body?.miner_id ?? miner.id,
      ok: true,
      verdict: classifyUrlVerdict(body?.result),
      confidence: extractConfidence(body?.result),
      signalHash: body?.signal_hash ?? null,
      reason: typeof body?.result?.reason === "string" && body.result.reason.trim()
        ? body.result.reason.trim()
        : extractAnswer(body?.result).text,
    };
  } catch (err) {
    if (retriesLeft > 0 && err instanceof EngineError && err.code === "PAYMENT_FAILED") {
      await sleep(600);
      return askOneMiner(miner, url, timeoutMs, retriesLeft - 1);
    }
    return { miner: miner.name, ok: false, error: err.message };
  }
}

// Fans out to every configured miner in parallel, capped by timeoutMs so one
// slow provider never blocks the toast notification. Miners still running
// past the cap are left to finish in the background; only whoever answered
// in time counts toward the verdict.
export async function checkUrlAcrossMiners(url, { timeoutMs = 9000 } = {}) {
  // Resolve the ranked set before any paid miner call starts, then retain this
  // snapshot for the whole check. A registry refresh can therefore never
  // switch miners halfway through a user-visible result.
  const selectedMiners = urlMinerSelector.refreshIfDue();
  // Firing all payments in the same instant occasionally collides (the same
  // wallet signs several transactions at once); a stagger between
  // dispatches avoids that without meaningfully slowing the notification.
  const settled = await Promise.allSettled(
    selectedMiners.map(async (miner, i) => {
      await sleep(i * 900);
      return askOneMiner(miner, url, timeoutMs);
    })
  );
  const results = settled.map((s) => (s.status === "fulfilled" ? s.value : { ok: false, error: "internal error" }));
  const verdict = aggregateUrlVerdict(results, selectedMiners.length);

  return {
    url,
    ...verdict,
    totalCount: selectedMiners.length,
    results,
  };
}

// A partial clean result is not a clean bill of health. A slow, unavailable,
// or incompatible miner must turn an otherwise-safe link result into caution,
// so Clip Guard never calls a link safe on one incomplete answer.
export function aggregateUrlVerdict(results, totalCount = results.length) {
  const answered = results.filter((result) => result?.ok);
  const malicious = answered.filter((result) => result.verdict === "malicious").length;
  const suspicious = answered.filter((result) => result.verdict === "suspicious").length;
  const safe = answered.filter((result) => result.verdict === "safe").length;
  const unknown = answered.length - malicious - suspicious - safe;

  let overall = "caution";
  if (answered.length === 0) overall = "unavailable";
  else if (malicious > 0) overall = "malicious";
  else if (suspicious > 0) overall = "suspicious";
  else if (safe === totalCount && answered.length === totalCount) overall = "safe";

  return {
    overall,
    answeredCount: answered.length,
    malicious,
    suspicious,
    safe,
    unknown,
  };
}

// Copying a wallet address is the single highest-stakes copy action in crypto:
// it is the step immediately before money moves. Two well-documented attacks
// live in exactly that gap. Clipboard hijacking malware silently replaces the
// address you copied with the attacker's, and address poisoning seeds a
// lookalike address into your transaction history hoping you copy the wrong
// one. Checking at the moment of the copy is the only point where either is
// still catchable, before the paste, before the send.
//
// Unlike the URL check this asks one miner, not several: Sentinel is the only
// miner on the network serving a wallet fraud verdict, and it happens to be
// ours. The call still goes through Telegraph's paid engine, so it is a real
// attributed network request, not a shortcut to our own host.
export async function checkWalletAddress(address, { timeoutMs = 12000, chain = "eth", retriesLeft = 1 } = {}) {
  // A contract address and a wallet address are the same 0x + 40 hex text,
  // so the fraud-signal check below is the wrong question for a contract:
  // it asks "has this address done anything malicious", not "is there a
  // real, distributed token here". One free on-chain read tells them apart
  // before either check runs.
  const isContract = await isContractAddress(address, chain);
  if (isContract) {
    return checkTokenSafety(address, { timeoutMs, chain });
  }

  const miner = config.ownMiners.sentinel;
  try {
    const { body } = await askMiner(miner.id, walletAssessRequest(address, chain), { timeoutMs });
    recordAnswered({ intent: "WALLET_SAFETY", minerName: miner.name });

    const verdict = snapWalletResult(body, address);
    if (verdict.status === "unavailable") {
      return { address, chain, overall: "unavailable", reason: verdict.message, miner: miner.name };
    }
    return {
      address,
      chain,
      overall: verdict.status === "critical" ? "dangerous" : "safe",
      label: verdict.label,
      reason: verdict.reason,
      confidence: verdict.confidence,
      miner: verdict.miner ?? miner.name,
      signalHash: verdict.signalHash ?? null,
    };
  } catch (err) {
    // Same transient payment race the URL checks hit: one retry after a short
    // pause clears it almost every time, and the balance is not the problem.
    if (retriesLeft > 0 && err instanceof EngineError && err.code === "PAYMENT_FAILED") {
      await sleep(600);
      return checkWalletAddress(address, { timeoutMs, chain, retriesLeft: retriesLeft - 1 });
    }
    return { address, chain, overall: "unavailable", reason: err.message, miner: miner.name };
  }
}
