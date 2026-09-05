// One hard, boundary-testing question per intent we serve, phrased to avoid
// the obvious keywords already used in questions.js / route-monitor.mjs, sent
// through Telegraph's live router (not direct-to-miner) so this measures
// actual routing + answer quality, not just miner uptime.
//
// Results are written to data/hard-monitor-results.json for the dashboard.
import { writeFileSync } from "node:fs";
import { ask, initPayments } from "../src/telegraph.js";
import { logAsk } from "../src/asklog.js";
import { recordAnswered } from "../src/stats.js";
import { extractAnswer } from "../src/answer.js";

const HARD_QUESTIONS = [
  { intent: "ONCHAIN_TX_LOOKUP", question: "0xbb3a336e7f6f0d9c9ef3c9e0f57a5f0c0d1234f8a1a1a1a1a1a1a1a1a1a1a1a1a — did the chain ever actually settle that one, or is it still floating?" },
  { intent: "GAS_PRICE", question: "If I submitted a swap on Arbitrum this second, what would it cost me to get it included?" },
  { intent: "WALLET_BALANCE_CHECK", question: "Strip away everything else — just tell me the ether sitting in 0x28C6c06298d514Db089934071355E5743bf21d60 right now." },
  { intent: "TOKEN_HOLDER_COUNT", question: "Not the circulating supply — I want the count of unique wallets currently holding 0x6B175474E89094C44Da98b954EedeAC495271d0F." },
  { intent: "TVL_LOOKUP", question: "Across everything deposited into Curve today, what does that add up to in dollars?" },
  { intent: "CRYPTO_PRICE", question: "One SOL, right now, converted to dollars — what number are we looking at?" },
  { intent: "STOCK_PRICE", question: "Pull up what a single share of Apple is changing hands for at this moment." },
  { intent: "SSL_VERIFICATION", question: "Would a browser throw a warning if I opened revoked.badssl.com right now, and why?" },
  { intent: "WEATHER_FORECAST", question: "Should someone in Cape Town plan around rain this weekend or not?" },
  { intent: "STORM_ALERT", question: "Over the next two days, is Miami looking at anything a storm-watcher would call dangerous?" },
  { intent: "IP_GEOLOCATION", question: "1.1.1.1 — whose network is that on, and roughly where does it sit?" },
  { intent: "ACADEMIC_SEARCH", question: "Point me to peer-reviewed literature, not blog posts, on perovskite solar cell degradation." },
  { intent: "WEB_SEARCH", question: "As of today, who holds the title of UN Secretary-General?" },
  { intent: "FRAUD_DETECTION", question: "0x722122dF12D4e14e13Ac3b6895a86e84145b6967 — does that wallet carry any sanctions or scam exposure?" },
];

const short = (v, max = 220) => {
  const t = String(v ?? "").replace(/\s+/g, " ").trim();
  return t.length > max ? `${t.slice(0, max - 3)}...` : t;
};

initPayments();

const rows = [];
for (const [i, c] of HARD_QUESTIONS.entries()) {
  const n = i + 1;
  console.log(`\n[${n}/${HARD_QUESTIONS.length}] expected ${c.intent}`);
  console.log(`  Q: ${c.question}`);
  const started = Date.now();
  const row = { n, expected: c.intent, question: c.question, routed: null, miner: null, ok: false };
  try {
    const { body } = await ask(c.question);
    row.routed = body.intent ?? null;
    row.miner = body.miner_name ?? body.miner_id ?? null;
    row.reasoning = body.reasoning ?? body.routing_reason ?? null;
    row.ms = body.duration_ms ?? Date.now() - started;
    row.signalHash = body.signal_hash ?? null;
    const extracted = extractAnswer(body.result);
    row.answer = extracted.text ?? JSON.stringify(body.result ?? null);
    row.ok = row.routed === c.intent;

    const ourMiner = ["TxLens", "Telegraph Sentinel", "Sentinel"].includes(row.miner);
    logAsk({
      question: c.question,
      intent: row.routed,
      minerName: row.miner,
      ourMiner,
      answer: row.answer,
      signalHash: row.signalHash,
      durationMs: row.ms,
      direct: false,
    });
    if (ourMiner) recordAnswered({ intent: row.routed, minerName: row.miner });

    console.log(`  routed -> ${row.routed} via ${row.miner} (${row.ms}ms) ${row.ok ? "OK" : "MISROUTE"}`);
    if (row.reasoning) console.log(`  router said: ${short(row.reasoning)}`);
    console.log(`  answer: ${short(row.answer)}`);
  } catch (err) {
    row.error = err.message;
    console.log(`  request failed: ${err.message}`);
  }
  rows.push(row);
}

const okCount = rows.filter((r) => r.ok).length;
const misroutes = rows.filter((r) => r.routed && !r.ok);
const failures = rows.filter((r) => r.error);

console.log("\n================ SUMMARY ================");
for (const r of rows) {
  const verdict = r.error ? "ERROR" : r.ok ? "OK" : "MISROUTE";
  console.log(`${r.n}. ${verdict.padEnd(9)} expected ${r.expected} -> got ${r.routed ?? r.error}`);
}
console.log(`\nrouted correctly: ${okCount}/${rows.length}`);
console.log(`misroutes: ${misroutes.length}, request failures: ${failures.length}`);

writeFileSync(
  new URL("../data/hard-monitor-results.json", import.meta.url),
  JSON.stringify({ ranAt: new Date().toISOString(), rows, okCount, total: rows.length }, null, 2)
);
console.log("\nwrote data/hard-monitor-results.json");
