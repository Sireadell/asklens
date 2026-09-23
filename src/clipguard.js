// Clip Guard: the instant a link is copied on someone's PC, ask Telegraph's
// router for a URL safety answer and hand back one clear verdict, fast enough
// to show in a desktop notification.
import { ask, askMiner, EngineError } from "./telegraph.js";
import { extractAnswer, extractConfidence } from "./answer.js";
import { recordAnswered } from "./stats.js";
import { config } from "./config.js";
import { walletAssessRequest } from "./mcp.js";
import { snapWalletResult } from "./snap-wallet.js";
import { isContractAddress } from "./chain.js";
import { checkTokenSafety } from "./token-safety.js";

const URL_SCAN_INTENT = "URL_SCAN";

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

function routedUrlQuestion(url) {
  return [
    "Check this copied link for safety.",
    "Use the URL_SCAN intent.",
    "Return a clear verdict of safe, suspicious, or malicious.",
    `Link: ${url}`,
  ].join(" ");
}

function routedUrlResult(url, body, settlement = null) {
  const routedIntent = body?.intent ?? null;
  const miner = body?.miner_name ?? body?.miner_id ?? "Telegraph router";
  const verdict = classifyUrlVerdict(body?.result);
  const signalHash = body?.signal_hash ?? null;
  const answer = extractAnswer(body?.result).text;
  const confidence = extractConfidence(body?.result);
  const routedToUrlScan = routedIntent === URL_SCAN_INTENT;

  let overall = "caution";
  if (routedToUrlScan && verdict === "safe") overall = "safe";
  else if (routedToUrlScan && verdict === "malicious") overall = "malicious";
  else if (routedToUrlScan && verdict === "suspicious") overall = "suspicious";

  const result = {
    miner,
    minerId: body?.miner_id ?? null,
    ok: routedToUrlScan,
    verdict: routedToUrlScan ? verdict : "unknown",
    confidence,
    signalHash,
    reason: routedToUrlScan
      ? answer
      : `Telegraph routed this copied link as ${routedIntent ?? "unknown"} instead of URL_SCAN.`,
    intent: routedIntent,
    endpoint: body?.endpoint ?? null,
    paymentTx: settlement?.transaction ?? settlement?.tx ?? null,
  };

  return {
    url,
    overall,
    answeredCount: routedToUrlScan ? 1 : 0,
    totalCount: 1,
    malicious: overall === "malicious" ? 1 : 0,
    suspicious: overall === "suspicious" ? 1 : 0,
    safe: overall === "safe" ? 1 : 0,
    unknown: overall === "caution" ? 1 : 0,
    router: true,
    miner,
    intent: routedIntent,
    signalHash,
    confidence,
    results: [result],
  };
}

// A payment occasionally fails to settle on the first try. One retry after a
// short pause clears it often enough that a transient payment race should not
// cost the user a safety check.
export async function checkUrlWithRouter(url, { timeoutMs = 9000, retriesLeft = 1, fetchFn } = {}) {
  try {
    const { body, settlement } = await ask(routedUrlQuestion(url), { surface: "clipguard", inputType: "copied_url", url }, { timeoutMs, fetchFn });
    const result = routedUrlResult(url, body, settlement);
    if (result.intent) recordAnswered({ intent: result.intent, minerName: result.miner });
    return result;
  } catch (err) {
    if (retriesLeft > 0 && err instanceof EngineError && err.code === "PAYMENT_FAILED") {
      await sleep(600);
      return checkUrlWithRouter(url, { timeoutMs, retriesLeft: retriesLeft - 1, fetchFn });
    }
    return {
      url,
      overall: "unavailable",
      answeredCount: 0,
      totalCount: 1,
      malicious: 0,
      suspicious: 0,
      safe: 0,
      unknown: 1,
      router: true,
      miner: "Telegraph router",
      intent: null,
      signalHash: null,
      results: [{ miner: "Telegraph router", ok: false, verdict: "unknown", error: err.message }],
    };
  }
}

// Kept as the server-facing name so older route code and tests do not need a
// new public function. It now lets Telegraph route the copied link instead of
// naming URL miners inside AskLens.
export async function checkUrlAcrossMiners(url, { timeoutMs = 9000 } = {}) {
  return checkUrlWithRouter(url, { timeoutMs });
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
