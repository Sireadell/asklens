// A token contract gets a different check than a wallet: not "has this
// address done anything malicious", but "is there a real, distributed token
// here at all, or is this a shell with nobody holding it". Combines two
// signals from our own miners into one verdict, the same shape as the
// wallet-safety and link-safety checks already use.
//
// Default thresholds (deliberately simple, not tuned against real scam
// tokens yet — revisit once this has seen live copies):
//   - Zero or unreadable holder count -> dangerous. A real token has buyers.
//   - Fewer than 10 holders -> caution. Could just be brand new.
//   - A Sentinel fraud signal at HIGH/CRITICAL always wins, regardless of
//     holder count, same as the existing wallet check.
import { config } from "./config.js";
import { askMiner, EngineError } from "./telegraph.js";
import { intentInfo } from "./intents.js";
import { walletAssessRequest } from "./mcp.js";
import { snapWalletResult } from "./snap-wallet.js";

const MIN_HEALTHY_HOLDERS = 10;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function holderRequest(token, chain) {
  const info = intentInfo("TOKEN_HOLDER_COUNT");
  return { method: info.method, endpoint: info.endpoint, payload: { token, chain } };
}

// Both calls below pay from the same wallet. Firing them in the same instant
// occasionally collides on a same-wallet nonce race (confirmed live: Sentinel
// answered fine on its own but failed here on the first attempt), the same
// issue checkUrlAcrossMiners already staggers and retries around in
// clipguard.js. One retry after a short pause clears it almost every time.
async function fetchHolderCount(address, chain, timeoutMs, retriesLeft = 1) {
  const miner = config.ownMiners.txlens;
  try {
    const { body } = await askMiner(miner.id, holderRequest(address, chain), { timeoutMs });
    const result = body?.result ?? {};
    const count = typeof result.holders_count === "number" ? result.holders_count : null;
    return { ok: true, count, status: result.status ?? null, miner: body?.miner_name ?? miner.name };
  } catch (err) {
    if (retriesLeft > 0 && err instanceof EngineError && err.code === "PAYMENT_FAILED") {
      await sleep(600);
      return fetchHolderCount(address, chain, timeoutMs, retriesLeft - 1);
    }
    return { ok: false, error: err instanceof EngineError ? err.message : String(err?.message ?? err) };
  }
}

async function fetchFraudSignal(address, chain, timeoutMs, retriesLeft = 1) {
  const miner = config.ownMiners.sentinel;
  try {
    const { body } = await askMiner(miner.id, walletAssessRequest(address, chain), { timeoutMs });
    return snapWalletResult(body, address);
  } catch (err) {
    if (retriesLeft > 0 && err instanceof EngineError && err.code === "PAYMENT_FAILED") {
      await sleep(600);
      return fetchFraudSignal(address, chain, timeoutMs, retriesLeft - 1);
    }
    return { status: "unavailable", message: err instanceof EngineError ? err.message : String(err?.message ?? err) };
  }
}

export function holderFlag(holders) {
  if (!holders.ok || holders.count === null) return "unknown";
  if (holders.count === 0) return "none";
  if (holders.count < MIN_HEALTHY_HOLDERS) return "thin";
  return "ok";
}

// Pure decision logic, kept separate from the network calls above so it can
// be tested against every holders/fraud combination without hitting
// Telegraph. A fraud signal at HIGH/CRITICAL always wins, since a confirmed
// scam signal matters more than a healthy-looking holder count.
export function deriveTokenVerdict(holders, fraud) {
  const flag = holderFlag(holders);

  let overall;
  if (fraud.status === "critical") overall = "dangerous";
  else if (flag === "none") overall = "dangerous";
  else if (flag === "thin" || flag === "unknown" || fraud.status === "unavailable") overall = "caution";
  else overall = "safe";

  const reasons = [];
  if (holders.ok && holders.count !== null) {
    reasons.push(`${holders.count} holder${holders.count === 1 ? "" : "s"} found.`);
  } else {
    reasons.push("Could not read a holder count for this address.");
  }
  if (fraud.status === "critical" || fraud.status === "safe") {
    reasons.push(fraud.reason ?? "No fraud reason given.");
  } else {
    reasons.push("Could not get a fraud signal for this address.");
  }

  return { overall, reason: reasons.join(" ") };
}

export async function checkTokenSafety(address, { chain = "eth", timeoutMs = 12000 } = {}) {
  const [holders, fraud] = await Promise.all([
    fetchHolderCount(address, chain, timeoutMs),
    sleep(900).then(() => fetchFraudSignal(address, chain, timeoutMs)),
  ]);

  const { overall, reason } = deriveTokenVerdict(holders, fraud);

  return {
    address,
    chain,
    overall,
    holderCount: holders.ok ? holders.count : null,
    fraudLabel: fraud.label ?? null,
    reason,
    miner: `${holders.miner ?? config.ownMiners.txlens.name} + ${config.ownMiners.sentinel.name}`,
    signalHash: fraud.signalHash ?? null,
  };
}
