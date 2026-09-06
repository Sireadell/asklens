// Configuration, read once at startup.
//
// The Engine base URL is Telegraph's testnet coordinator. Every /ask call is
// gated by x402 and costs $0.01 in test USDC, so the signer key below is a
// TESTNET key holding testnet USDC on Base Sepolia. Never put a mainnet key
// with real funds here.
// Loaded by explicit path, not "dotenv/config", because that resolves .env
// against process.cwd() — which is wrong when this file is imported by a
// process launched from elsewhere (e.g. the MCP server, started by an editor
// with its own working directory).
import dotenv from "dotenv";
dotenv.config({ path: new URL("../.env", import.meta.url) });

function int(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function enabled(value) {
  return String(value ?? "").trim().toLowerCase() === "true";
}

export const config = {
  port: int(process.env.PORT, 3000),
  engineBaseUrl: (process.env.TELEGRAPH_ENGINE_URL ?? "https://devnode.telegraphprotocol.com/engine").replace(/\/$/, ""),
  discoveryUrl: process.env.TELEGRAPH_DISCOVERY_URL ?? "https://devnode.telegraphprotocol.com/miner-dispatcher/integrations",
  sentinelDirectUrl: (process.env.SENTINEL_DIRECT_URL ?? "https://telegraph-sentinel-40vp.onrender.com").replace(/\/$/, ""),
  askTimeoutMs: int(process.env.ASK_TIMEOUT_MS, 90000),
  snapAskTimeoutMs: Math.min(int(process.env.SNAP_ASK_TIMEOUT_MS, 12_000), 12_000),
  snapPublicDemoEnabled: enabled(process.env.SNAP_PUBLIC_DEMO_ENABLED),
  privateKey: process.env.EVM_PRIVATE_KEY?.trim() ?? "",
  statsFile: process.env.STATS_FILE ?? "data/stats.json",
  askLogFile: process.env.ASK_LOG_FILE ?? "data/asks.jsonl",
  compareFile: process.env.COMPARE_FILE ?? "data/comparisons.jsonl",
  snapUsageFile: process.env.SNAP_USAGE_FILE ?? "data/snap-usage.json",
  snapRateLimit: int(process.env.SNAP_RATE_LIMIT, 5),
  snapRateWindowMs: int(process.env.SNAP_RATE_WINDOW_MS, 10 * 60 * 1000),
  snapDailyPaidLimit: int(process.env.SNAP_DAILY_PAID_LIMIT, 100),
  // Our own miners, used for the "second opinion" panel and for labelling
  // answers that came from a miner this project also operates.
  ownMiners: {
    txlens: { id: "9002", name: "TxLens" },
    sentinel: { id: "94217603", name: "Telegraph Sentinel" },
  },
};
