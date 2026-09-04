// Configuration, read once at startup.
//
// The Engine base URL is Telegraph's testnet coordinator. Every /ask call is
// gated by x402 and costs $0.01 in test USDC, so the signer key below is a
// TESTNET key holding testnet USDC on Base Sepolia. Never put a mainnet key
// with real funds here.
import "dotenv/config";

function int(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export const config = {
  port: int(process.env.PORT, 3000),
  engineBaseUrl: (process.env.TELEGRAPH_ENGINE_URL ?? "https://devnode.telegraphprotocol.com/engine").replace(/\/$/, ""),
  discoveryUrl: process.env.TELEGRAPH_DISCOVERY_URL ?? "https://devnode.telegraphprotocol.com/miner-dispatcher/integrations",
  askTimeoutMs: int(process.env.ASK_TIMEOUT_MS, 90000),
  privateKey: process.env.EVM_PRIVATE_KEY?.trim() ?? "",
  statsFile: process.env.STATS_FILE ?? "data/stats.json",
  askLogFile: process.env.ASK_LOG_FILE ?? "data/asks.jsonl",
  compareFile: process.env.COMPARE_FILE ?? "data/comparisons.jsonl",
  // Our own miners, used for the "second opinion" panel and for labelling
  // answers that came from a miner this project also operates.
  ownMiners: {
    txlens: { id: "9002", name: "TxLens" },
    sentinel: { id: "94217603", name: "Telegraph Sentinel" },
  },
};
