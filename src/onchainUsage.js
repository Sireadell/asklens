// AskLens's usage, read from the chain instead of from a local file.
//
// Every request AskLens makes is paid in test USDC from one wallet to the
// Telegraph registry contract, so the wallet's transfer history is a count
// that survives redeploys and that anyone can check on Blockscout. The local
// counter in stats.js was wiped on every deploy, and it was seeded with a
// 720-request scripted verification run, so it could not tell a judge how
// much of the app's traffic came from people.
//
// The same wallet also paid for scripted runs: the verification run on
// 7 September and the load tests on 11 and 12 September. Those are listed in
// evidence/scripted-runs.json with the log that proves each one, and any
// other clock hour with SCRIPT_BURST_PER_HOUR or more payments is set aside
// as a burst, since no person clicks that fast. What is left is everyday use.
// That can still include the owner's own use, so the page calls it everyday
// use, not use by other people.
import { readFileSync } from "node:fs";

const BLOCKSCOUT = "https://base-sepolia.blockscout.com/api/v2";
const SCRIPTED_RUNS_FILE = new URL("../evidence/scripted-runs.json", import.meta.url);
export const SCRIPT_BURST_PER_HOUR = 50;
const CACHE_MS = 10 * 60 * 1000;
const MAX_PAGES = 200;

let cache = null;

export function readScriptedRuns() {
  try {
    return JSON.parse(readFileSync(SCRIPTED_RUNS_FILE, "utf8"));
  } catch {
    return { launchedAt: null, runs: [] };
  }
}

// Outgoing USDC transfers from the paying wallet, newest first.
export async function fetchPayments(wallet, { fetchImpl = globalThis.fetch, recipient } = {}) {
  const base = `${BLOCKSCOUT}/addresses/${wallet}/token-transfers?type=ERC-20&filter=from`;
  const payments = [];
  let url = base;
  for (let page = 0; url && page < MAX_PAGES; page++) {
    const res = await fetchImpl(url, { headers: { accept: "application/json" } });
    if (!res.ok) throw new Error(`Blockscout answered ${res.status}`);
    const body = await res.json();
    for (const t of body.items ?? []) {
      if (t.token?.symbol !== "USDC") continue;
      if (recipient && t.to?.hash?.toLowerCase() !== recipient.toLowerCase()) continue;
      payments.push({ at: t.timestamp, tx: t.transaction_hash });
    }
    url = body.next_page_params ? `${base}&${new URLSearchParams(body.next_page_params)}` : null;
  }
  return payments;
}

// Splits payments into before launch, documented scripted runs, bursts and
// everyday use. Pure, so the rules can be tested without the network.
export function classifyPayments(payments, { launchedAt, runs = [] } = {}) {
  const inRun = (at) => runs.find((r) => at >= r.from && at <= r.to);
  const out = {
    total: payments.length,
    beforeLaunch: 0,
    scriptedRuns: runs.map((r) => ({ label: r.label, source: r.source, count: 0 })),
    bursts: [],
    everyday: 0,
    everydayByDay: {},
    lastPaymentAt: payments.reduce((m, p) => (p.at > m ? p.at : m), "") || null,
  };

  const candidates = [];
  for (const p of payments) {
    if (launchedAt && p.at < launchedAt) { out.beforeLaunch++; continue; }
    const run = inRun(p.at);
    if (run) { out.scriptedRuns[runs.indexOf(run)].count++; continue; }
    candidates.push(p);
  }

  const perHour = {};
  for (const p of candidates) perHour[p.at.slice(0, 13)] = (perHour[p.at.slice(0, 13)] ?? 0) + 1;
  for (const p of candidates) {
    const hour = p.at.slice(0, 13);
    if (perHour[hour] >= SCRIPT_BURST_PER_HOUR) continue;
    out.everyday++;
    const day = p.at.slice(0, 10);
    out.everydayByDay[day] = (out.everydayByDay[day] ?? 0) + 1;
  }
  out.bursts = Object.entries(perHour)
    .filter(([, n]) => n >= SCRIPT_BURST_PER_HOUR)
    .map(([hour, count]) => ({ hour: `${hour}:00Z`, count }))
    .sort((a, b) => a.hour.localeCompare(b.hour));
  return out;
}

let inFlight = null;

async function refresh(wallet, opts) {
  const rules = readScriptedRuns();
  const payments = await fetchPayments(wallet, { ...opts, recipient: rules.recipient });
  const at = Date.now();
  const value = {
    wallet,
    explorer: `https://base-sepolia.blockscout.com/address/${wallet}?tab=token_transfers`,
    burstRule: `${SCRIPT_BURST_PER_HOUR} or more payments in one clock hour`,
    launchedAt: rules.launchedAt,
    ...classifyPayments(payments, rules),
    checkedAt: new Date(at).toISOString(),
  };
  cache = { wallet, at, value };
  return value;
}

// Never throws and never keeps the page waiting long: reading the whole
// payment history takes dozens of Blockscout pages. A cached answer comes
// back at once (refreshed behind the scenes once it is stale). With nothing
// cached yet, it waits up to waitMs, then answers null while the read
// finishes for the next caller.
export async function getOnchainUsage(wallet, { waitMs = 5000, ...opts } = {}) {
  if (!wallet) return null;
  const fresh = cache && cache.wallet === wallet && Date.now() - cache.at < CACHE_MS;
  if (fresh) return cache.value;
  if (!inFlight) {
    inFlight = refresh(wallet, opts)
      .catch((err) => {
        console.warn("[onchain-usage] could not read payments:", err.message);
        return null;
      })
      .finally(() => { inFlight = null; });
  }
  if (cache && cache.wallet === wallet) return cache.value;
  const timeout = new Promise((resolve) => setTimeout(() => resolve(null), waitMs).unref());
  return Promise.race([inFlight, timeout]);
}

export function _clearCacheForTests() {
  cache = null;
  inFlight = null;
}
