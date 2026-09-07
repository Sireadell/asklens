import { config } from "./config.js";
import { isValidAddress, walletAssessRequest } from "./mcp.js";
import { askMiner } from "./telegraph.js";
import { recordAnswered } from "./stats.js";

const CHAIN_BY_CAIP_ID = {
  "eip155:1": "eth",
  "eip155:8453": "base",
};

export function snapChain(chainId) {
  return CHAIN_BY_CAIP_ID[chainId] ?? null;
}

export function snapWalletResult(body, address) {
  const result = body?.result ?? body;
  if (!result || typeof result !== "object" || Array.isArray(result)) {
    return { status: "unavailable", message: "Sentinel could not check this address right now." };
  }
  const rawLabel = result.label ?? result.risk_level;
  if (typeof rawLabel !== "string") {
    return { status: "unavailable", message: "Sentinel could not check this address right now." };
  }
  const label = rawLabel.trim().toUpperCase();
  if (!["LOW", "SAFE", "HIGH", "CRITICAL"].includes(label)) {
    return { status: "unavailable", message: "Sentinel could not check this address right now." };
  }
  const reason = typeof result.reason === "string" && result.reason.trim()
    ? result.reason.trim()
    : "Sentinel did not provide a reason.";
  const confidence = typeof result.confidence === "number" ? result.confidence : null;

  return {
    status: label === "HIGH" || label === "CRITICAL" ? "critical" : "safe",
    address,
    label,
    reason,
    confidence,
    miner: body?.miner_name ?? config.ownMiners.sentinel.name,
    signalHash: body?.signal_hash ?? null,
  };
}

// Goes through Telegraph's paid engine rather than calling Sentinel's own URL
// directly. Sentinel is our miner either way, but only the routed call is a
// real Telegraph request: it settles x402 payment, is attributed to this app's
// wallet on Telegraph's side, and counts toward the app's request numbers. A
// direct call to the miner's host proves nothing about network usage.
export async function assessWalletForSnap({ address, chainId }, fetchFn) {
  if (!isValidAddress(address)) {
    return { status: "unavailable", message: "This transaction has no valid recipient address to check." };
  }

  const chain = snapChain(chainId);
  if (!chain) {
    return { status: "unavailable", message: "Sentinel does not support this network yet." };
  }

  const miner = config.ownMiners.sentinel;
  try {
    const { body } = await askMiner(miner.id, walletAssessRequest(address, chain), {
      timeoutMs: config.snapAskTimeoutMs,
      ...(fetchFn ? { fetchFn } : {}),
    });
    recordAnswered({ intent: "WALLET_SAFETY", minerName: miner.name });
    return snapWalletResult(body, address);
  } catch {
    return { status: "unavailable", message: "Sentinel could not check this address right now." };
  }
}
