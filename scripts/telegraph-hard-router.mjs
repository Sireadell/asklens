import { appendFileSync, mkdirSync, writeFileSync } from "node:fs";
import { ask, initPayments } from "../src/telegraph.js";
import { HARD_QUESTIONS, buildCases, recentTransaction } from "./benchmark.mjs";

const OUT_JSONL = "data/telegraph-hard-router.jsonl";
const OUT_MD = "data/telegraph-hard-router-latest.md";

const clean = (value) => String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ").trim();
const short = (value, max = 150) => {
  const text = clean(value);
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
};

initPayments();
const tx = await recentTransaction();
if (!tx) throw new Error("Could not fetch a recent Ethereum transaction for the transaction cases.");

const seen = new Map();
const cases = buildCases(tx).flatMap((c) => {
  const index = seen.get(c.intent) ?? 0;
  seen.set(c.intent, index + 1);
  const question = HARD_QUESTIONS[c.intent]?.[index];
  return question ? [{ ...c, question: question.replaceAll("{tx}", tx) }] : [];
});

const results = [];
for (const [index, c] of cases.entries()) {
  const started = Date.now();
  let row;
  try {
    const { body, settlement } = await ask(c.question);
    let quality;
    try {
      quality = await c.check(body.result);
    } catch (error) {
      quality = { verdict: "UNVERIFIED", expected: null, got: null, source: null, note: `checker error: ${error.message}` };
    }
    const routedIntent = body.intent ?? null;
    const routingCorrect = routedIntent === c.intent;
    const reasonParts = [];
    if (!routingCorrect) reasonParts.push(`misrouted to ${routedIntent ?? "unknown"}`);
    if (quality.note) reasonParts.push(quality.note);
    if (quality.verdict !== "PASS") reasonParts.push(`expected ${short(quality.expected, 60)}, got ${short(quality.got, 60)}`);
    row = {
      number: index + 1,
      question: c.question,
      expectedIntent: c.intent,
      routedIntent,
      routingCorrect,
      minerId: body.miner_id ?? null,
      miner: body.miner_name ?? null,
      endpoint: body.endpoint ?? null,
      answer: body.result ?? null,
      verdict: quality.verdict,
      expected: quality.expected,
      got: quality.got,
      source: quality.source,
      independent: quality.independent,
      reason: reasonParts.join("; ") || "live answer matched ground truth",
      durationMs: body.duration_ms ?? Date.now() - started,
      signalHash: body.signal_hash ?? null,
      paymentTx: settlement?.transaction ?? settlement?.tx ?? null,
    };
  } catch (error) {
    row = {
      number: index + 1,
      question: c.question,
      expectedIntent: c.intent,
      routedIntent: null,
      routingCorrect: false,
      minerId: null,
      miner: null,
      endpoint: null,
      answer: null,
      verdict: "FAIL",
      expected: "a paid Telegraph answer",
      got: error.message,
      source: null,
      independent: null,
      reason: `request failed: ${error.message}`,
      durationMs: Date.now() - started,
      signalHash: null,
      paymentTx: null,
    };
  }
  results.push(row);
  console.log(`${String(index + 1).padStart(2)}/42 ${row.verdict.padEnd(10)} ${c.intent.padEnd(22)} -> ${String(row.routedIntent).padEnd(22)} ${row.miner ?? "no miner"}`);
}

const run = { at: new Date().toISOString(), transactionUsed: tx, results };
mkdirSync("data", { recursive: true });
appendFileSync(OUT_JSONL, `${JSON.stringify(run)}\n`);

const passed = results.filter((r) => r.verdict === "PASS").length;
const failed = results.filter((r) => r.verdict === "FAIL").length;
const unverified = results.length - passed - failed;
const routed = results.filter((r) => r.routingCorrect).length;
const lines = [
  "# Telegraph live auto-router hard-question report",
  "",
  `Run: ${run.at}`,
  "",
  `Answer quality: ${passed} PASS, ${failed} FAIL, ${unverified} UNVERIFIED out of ${results.length}. Routing: ${routed}/${results.length} matched the expected intent.`,
  "",
  "| # | Expected intent | Routed intent | Miner | Quality | Question | Reason |",
  "|---:|---|---|---|---|---|---|",
  ...results.map((r) => `| ${r.number} | ${clean(r.expectedIntent)} | ${clean(r.routedIntent) || "none"} | ${clean(r.miner) || "none"} (${clean(r.minerId) || "n/a"}) | ${r.verdict} | ${short(r.question, 120)} | ${short(r.reason, 180)} |`),
  "",
  "## Evidence",
  "",
  ...results.map((r) => `### ${r.number}. ${r.expectedIntent}\n\n- Signal: ${r.signalHash ?? "none"}\n- Ground truth: ${clean(r.source) || "none"}\n- Expected: ${short(r.expected, 500)}\n- Got: ${short(r.got, 500)}\n- Router reason: ${short(r.answer?.reasoning ?? "recorded in raw JSONL", 500)}\n`),
];
writeFileSync(OUT_MD, `${lines.join("\n")}\n`);
console.log(`\nSaved ${OUT_JSONL} and ${OUT_MD}`);
