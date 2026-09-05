// Retries only the rows in hard-monitor-results.json that errored out
// (transient network failures), and merges the new result back in place.
import { readFileSync, writeFileSync } from "node:fs";
import { ask, initPayments } from "../src/telegraph.js";
import { logAsk } from "../src/asklog.js";
import { recordAnswered } from "../src/stats.js";
import { extractAnswer } from "../src/answer.js";

const path = new URL("../data/hard-monitor-results.json", import.meta.url);
const data = JSON.parse(readFileSync(path, "utf8"));

initPayments();

for (const row of data.rows) {
  if (!row.error) continue;
  console.log(`\nretrying #${row.n} (${row.expected}): ${row.question}`);
  const started = Date.now();
  try {
    const { body } = await ask(row.question);
    row.routed = body.intent ?? null;
    row.miner = body.miner_name ?? body.miner_id ?? null;
    row.reasoning = body.reasoning ?? body.routing_reason ?? null;
    row.ms = body.duration_ms ?? Date.now() - started;
    row.signalHash = body.signal_hash ?? null;
    const extracted = extractAnswer(body.result);
    row.answer = extracted.text ?? JSON.stringify(body.result ?? null);
    row.ok = row.routed === row.expected;
    delete row.error;

    const ourMiner = ["TxLens", "Telegraph Sentinel", "Sentinel"].includes(row.miner);
    logAsk({ question: row.question, intent: row.routed, minerName: row.miner, ourMiner, answer: row.answer, signalHash: row.signalHash, durationMs: row.ms, direct: false });
    if (ourMiner) recordAnswered({ intent: row.routed, minerName: row.miner });

    console.log(`  routed -> ${row.routed} via ${row.miner} ${row.ok ? "OK" : "MISROUTE"}`);
  } catch (err) {
    row.error = err.message;
    console.log(`  still failing: ${err.message}`);
  }
}

data.okCount = data.rows.filter((r) => r.ok).length;
data.ranAt = new Date().toISOString();
writeFileSync(path, JSON.stringify(data, null, 2));
console.log(`\nfinal: ${data.okCount}/${data.total} routed correctly`);
