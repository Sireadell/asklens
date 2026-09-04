// Pokes our own miners directly, bypassing Telegraph entirely.
//
// Telegraph charges a cent per question and feeds answers into the scoring
// pipeline, so it is the wrong tool for hunting bugs. The miners' own servers
// are free to call and answer in a second or two, which makes them the right
// place to find out which questions break before anything is registered,
// routed or scored.
//
//   node scripts/probe-miners.mjs
//   node scripts/probe-miners.mjs --intent TVL_LOOKUP
//   node scripts/probe-miners.mjs --verbose
import { QUESTION_POOL, fillTemplate } from "../src/questions.js";
import { INTENTS } from "../src/intents.js";
import { answerQuality } from "../src/report.js";
import { extractAnswer } from "../src/answer.js";

const BASE = {
  txlens: "https://telegraph-onchain-tx-lookup-miner.onrender.com",
  sentinel: "https://telegraph-sentinel-40vp.onrender.com",
};

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const only = arg("intent", null);
const verbose = process.argv.includes("--verbose");

// A real, recent transaction, so the lookup questions reference something that
// exists rather than a hash that has aged out.
async function recentTxHash() {
  try {
    const res = await fetch("https://eth.drpc.org", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_getBlockByNumber", params: ["latest", false] }),
    });
    const body = await res.json();
    return body?.result?.transactions?.[0] ?? null;
  } catch {
    return null;
  }
}

async function callMiner(info, question) {
  const base = BASE[info.miner];
  const started = Date.now();
  let res;
  try {
    if (info.method === "GET") {
      const url = `${base}${info.endpoint}?${new URLSearchParams({ [info.param]: question })}`;
      res = await fetch(url, { signal: AbortSignal.timeout(60000) });
    } else {
      res = await fetch(`${base}${info.endpoint}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ [info.param]: question }),
        signal: AbortSignal.timeout(60000),
      });
    }
  } catch (err) {
    return { ok: false, status: 0, ms: Date.now() - started, error: err.message };
  }
  const ms = Date.now() - started;
  const text = await res.text();
  let body = null;
  try {
    body = JSON.parse(text);
  } catch {
    return { ok: false, status: res.status, ms, error: "response was not JSON" };
  }
  const { text: answer } = extractAnswer(body);
  return { ok: res.ok, status: res.status, ms, answer, body };
}

const tx = await recentTxHash();
const results = [];

for (const [intent, questions] of Object.entries(QUESTION_POOL)) {
  if (only && intent !== only) continue;
  const info = INTENTS[intent];
  if (!info) continue;
  console.log(`\n${intent}  (${info.miner} ${info.method} ${info.endpoint}, param "${info.param}")`);

  for (const raw of questions) {
    const question = fillTemplate(raw, tx ? { tx } : {});
    if (question.includes("{tx}")) {
      console.log("  SKIP  no transaction hash available");
      continue;
    }
    const r = await callMiner(info, question);
    const quality = r.ok ? answerQuality({ hasPlainText: Boolean(r.answer), answer: r.answer }) : "error";
    const bad = quality !== "answered";
    results.push({ intent, question, quality, status: r.status, ms: r.ms });
    const label = bad ? "FAIL" : "ok  ";
    console.log(`  ${label}  [${quality}] ${r.ms}ms  ${question.slice(0, 62)}`);
    if (bad || verbose) {
      console.log(`        -> ${(r.answer ?? r.error ?? "[no plain text]").slice(0, 150)}`);
    }
  }
}

const failures = results.filter((r) => r.quality !== "answered");
console.log(`\n${"=".repeat(72)}`);
console.log(`${results.length - failures.length}/${results.length} questions answered properly.\n`);
if (failures.length) {
  console.log("Broken, grouped by question type:");
  const byIntent = {};
  for (const f of failures) (byIntent[f.intent] ??= []).push(f);
  for (const [intent, list] of Object.entries(byIntent)) {
    console.log(`  ${intent}: ${list.length} of ${QUESTION_POOL[intent].length} — ${[...new Set(list.map((l) => l.quality))].join(", ")}`);
  }
} else {
  console.log("Nothing broken.");
}
const slow = results.filter((r) => r.ms > 10000);
if (slow.length) console.log(`\nSlow (over 10s): ${slow.map((s) => `${s.intent} ${Math.round(s.ms / 1000)}s`).join(", ")}`);
