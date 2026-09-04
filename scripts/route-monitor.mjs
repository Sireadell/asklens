// Send a handful of questions through Telegraph's live router and watch how it
// classifies them. Each question is picked to sit near the boundary between two
// of our 14 intents, because that is where a misroute would actually show up.
//
// On a misroute we also exercise the app's recovery path: the same question put
// directly to the miner that should have taken it, which is what the
// "second opinion" panel does for a real visitor.
import { ask, askMiner, initPayments } from "../src/telegraph.js";
import { INTENTS, intentInfo } from "../src/intents.js";
import { extractAnswer } from "../src/answer.js";

const CASES = [
  {
    expected: "STORM_ALERT",
    confusableWith: "WEATHER_FORECAST",
    question: "Could Miami operations be disrupted by severe weather during the next 48 hours? Quantify the risk.",
  },
  {
    expected: "TOKEN_HOLDER_COUNT",
    confusableWith: "WALLET_BALANCE_CHECK",
    question: "Give the live holder count, not supply, for LINK contract 0x514910771AF9Ca656af840dff83E8264EcF986CA.",
  },
  {
    expected: "FRAUD_DETECTION",
    confusableWith: "WEB_SEARCH",
    question: "Is 0x8589427373D6D84E98730D7795D8f6f8731FDA16 tied to a known illicit entity, or merely suspicious by heuristics?",
  },
  {
    expected: "ACADEMIC_SEARCH",
    confusableWith: "WEB_SEARCH",
    question: "Find peer-reviewed journal literature that surveys hallucination taxonomies in large language models.",
  },
  {
    expected: "TVL_LOOKUP",
    confusableWith: "CRYPTO_PRICE",
    question: "Report Aave's present total value locked, not market capitalization or borrowed value.",
  },
];

const short = (v, max = 220) => {
  const t = String(v ?? "").replace(/\s+/g, " ").trim();
  return t.length > max ? `${t.slice(0, max - 3)}...` : t;
};

initPayments();

const rows = [];

for (const [i, c] of CASES.entries()) {
  const n = i + 1;
  console.log(`\n[${n}/${CASES.length}] expected ${c.expected} (easy to confuse with ${c.confusableWith})`);
  console.log(`  Q: ${c.question}`);

  const started = Date.now();
  const row = { n, ...c, routed: null, miner: null, ok: false, recovery: null };

  try {
    const { body } = await ask(c.question);
    row.routed = body.intent ?? null;
    row.miner = body.miner_name ?? body.miner_id ?? null;
    row.reasoning = body.reasoning ?? body.routing_reason ?? null;
    row.ms = body.duration_ms ?? Date.now() - started;
    row.answer = extractAnswer(body.result).text ?? JSON.stringify(body.result ?? null);
    row.ok = row.routed === c.expected;

    console.log(`  routed -> ${row.routed} via ${row.miner} (${row.ms}ms) ${row.ok ? "OK" : "MISROUTE"}`);
    if (row.reasoning) console.log(`  router said: ${short(row.reasoning)}`);
    console.log(`  answer: ${short(row.answer)}`);

    if (!row.ok) {
      // Recovery path: ask the miner that should have had it, by name.
      const info = intentInfo(c.expected);
      const miner = info && { txlens: "9002", sentinel: "94217603" }[info.miner];
      if (!miner) {
        row.recovery = { status: "NO_MINER", detail: `no miner of ours covers ${c.expected}` };
      } else {
        try {
          const direct = await askMiner(miner, {
            method: info.method,
            endpoint: info.endpoint,
            payload: { [info.param]: c.question },
          });
          row.recovery = {
            status: "OK",
            miner: direct.body.miner_name ?? miner,
            answer: extractAnswer(direct.body.result).text ?? JSON.stringify(direct.body.result ?? null),
          };
          console.log(`  recovery via ${row.recovery.miner}: ${short(row.recovery.answer)}`);
        } catch (err) {
          row.recovery = { status: "FAILED", detail: err.message };
          console.log(`  recovery FAILED: ${err.message}`);
        }
      }
    }
  } catch (err) {
    row.error = err.message;
    console.log(`  request failed: ${err.message}`);
  }

  rows.push(row);
}

const misroutes = rows.filter((r) => r.routed && !r.ok);
const failures = rows.filter((r) => r.error);

console.log("\n================ SUMMARY ================");
for (const r of rows) {
  const verdict = r.error ? "ERROR" : r.ok ? "OK" : "MISROUTE";
  console.log(`${r.n}. ${verdict.padEnd(9)} expected ${r.expected} -> got ${r.routed ?? r.error}`);
  if (r.recovery) console.log(`     recovery: ${r.recovery.status}${r.recovery.detail ? ` (${r.recovery.detail})` : ""}`);
}
console.log(`\nrouted correctly: ${rows.filter((r) => r.ok).length}/${rows.length}`);
console.log(`misroutes: ${misroutes.length}, request failures: ${failures.length}`);
console.log(`known intents in app: ${Object.keys(INTENTS).length}`);
