// Clip Guard: the instant a link is copied on someone's PC, ask several
// independent Telegraph URL_SCAN miners at once and hand back one ranked
// verdict, fast enough to show in a desktop notification.
import { askMiner, EngineError } from "./telegraph.js";
import { extractAnswer, extractConfidence } from "./answer.js";

// Three genuinely different backends that each return an immediate verdict
// (no async submit-then-poll like urlscan.io or VirusTotal, which would blow
// the notification-speed budget). ProofGate (network rank 1) is left out: it
// fails Telegraph's own pre-flight validation on every payload shape tried,
// a network-side registration issue, not something fixable from here.
export const CLIPGUARD_MINERS = [
  { id: "7334", name: "NetWire", method: "GET", endpoint: "/url-scan", payload: (url) => ({ question: `Is ${url} safe?` }) },
  { id: "5001", name: "URL Sentinel", method: "POST", endpoint: "/scan", payload: (url) => ({ url }) },
  { id: "20260828", name: "Preflight", method: "GET", endpoint: "/url-scan", payload: (url) => ({ url }) },
];

const VERDICT_MAP = {
  safe: "safe", clean: "safe", benign: "safe", legitimate: "safe", ok: "safe", low: "safe",
  suspicious: "suspicious", caution: "suspicious", unverified: "suspicious", risky: "suspicious", warning: "suspicious", medium: "suspicious",
  malicious: "malicious", phishing: "malicious", scam: "malicious", dangerous: "malicious", blocklisted: "malicious", blacklisted: "malicious", threat: "malicious", compromised: "malicious", high: "malicious",
};

// Every miner names its verdict differently, so this trusts an exact,
// short verdict-style field first (e.g. "safe", "malicious", or NetWire's
// "risk": "low") rather than scanning full sentences: a clean explanation
// naturally contains words like "malicious" inside a negation ("no
// malicious signals found"), and a substring scan over that free text
// would misread it as a bad verdict. Free-text scanning is never used.
function classify(result) {
  if (!result || typeof result !== "object") return "unknown";

  if (typeof result.verdict === "string") {
    const mapped = VERDICT_MAP[result.verdict.trim().toLowerCase()];
    if (mapped) return mapped;
  }
  if (typeof result.malicious === "boolean") {
    return result.malicious ? "malicious" : "safe";
  }
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
    return {
      miner: miner.name,
      ok: true,
      verdict: classify(body?.result),
      confidence: extractConfidence(body?.result),
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
  // Firing all payments in the same instant occasionally collides (the same
  // wallet signs several transactions at once); a stagger between
  // dispatches avoids that without meaningfully slowing the notification.
  const settled = await Promise.allSettled(
    CLIPGUARD_MINERS.map(async (miner, i) => {
      await sleep(i * 900);
      return askOneMiner(miner, url, timeoutMs);
    })
  );
  const results = settled.map((s) => (s.status === "fulfilled" ? s.value : { ok: false, error: "internal error" }));
  const answered = results.filter((r) => r.ok);

  const malicious = answered.filter((r) => r.verdict === "malicious").length;
  const suspicious = answered.filter((r) => r.verdict === "suspicious").length;
  const safe = answered.filter((r) => r.verdict === "safe").length;

  let overall = "unknown";
  if (answered.length === 0) overall = "unavailable";
  else if (malicious > 0) overall = "malicious";
  else if (suspicious > 0) overall = "suspicious";
  else if (safe > 0) overall = "safe";

  return {
    url,
    overall,
    answeredCount: answered.length,
    totalCount: CLIPGUARD_MINERS.length,
    malicious,
    suspicious,
    safe,
    results,
  };
}
