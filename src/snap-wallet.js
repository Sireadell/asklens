import { config } from "./config.js";
import { askMiner } from "./telegraph.js";
import { isValidAddress, walletAssessRequest } from "./mcp.js";

const CHAIN_BY_CAIP_ID = {
  "eip155:1": "eth",
  "eip155:8453": "base",
};

export function snapChain(chainId) {
  return CHAIN_BY_CAIP_ID[chainId] ?? null;
}

export function snapWalletResult(body, address) {
  if (!body?.result || typeof body.result !== "object" || Array.isArray(body.result)) {
    return { status: "unavailable", message: "Sentinel could not check this address right now." };
  }

  const result = body.result;
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

export async function assessWalletForSnap({ address, chainId }, askMinerFn = askMiner) {
  if (!isValidAddress(address)) {
    return { status: "unavailable", message: "This transaction has no valid recipient address to check." };
  }

  const chain = snapChain(chainId);
  if (!chain) {
    return { status: "unavailable", message: "Sentinel does not support this network yet." };
  }

  try {
    const { body } = await askMinerFn(
      config.ownMiners.sentinel.id,
      walletAssessRequest(address, chain),
      { timeoutMs: config.snapAskTimeoutMs },
    );
    return snapWalletResult(body, address);
  } catch {
    return { status: "unavailable", message: "Sentinel could not check this address right now." };
  }
}
