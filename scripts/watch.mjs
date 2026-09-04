// Runs a round of questions across every intent we serve, records who the
// router picked and how their answer compared to ours, and prints a summary.
//
//   node scripts/watch.mjs                 one question per intent
//   node scripts/watch.mjs --rounds 3      three rounds, rotating the wording
//   node scripts/watch.mjs --intent GAS_PRICE
//   node scripts/watch.mjs --delay 3000    pause between questions
//
// Each question costs $0.01 in testnet USDC, and a head-to-head costs two
// cents because it asks twice. Keep runs modest: the hackathon disqualifies
// for inflating request counts, and this is meant to measure, not to pad.
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { initPayments } from "../src/telegraph.js";
import { compareOnce, appendComparison, readComparisons } from "../src/compare.js";
import { buildReport } from "../src/report.js";
import { questionsForRound, QUESTION_POOL } from "../src/questions.js";

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const rounds = Number(arg("rounds", 1));
// Where in the wording rotation to begin, so a second run asks differently
// phrased questions rather than repeating the first run word for word.
const start = Number(arg("start", 0));
const only = arg("intent", null);
const delayMs = Number(arg("delay", 1500));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// The transaction-lookup questions need a hash that actually exists, so pull a
// recent one rather than shipping a stale constant.
async function recentTxHash() {
  try {
    const client = createPublicClient({ chain: mainnet, transport: http("https://eth.drpc.org") });
    const block = await client.getBlock();
    return block.transactions[0] ?? null;
  } catch {
    return null;
  }
}

if (!initPayments()) {
  console.error("No EVM_PRIVATE_KEY set — nothing can be asked. Put a Base Sepolia key in .env.");
  process.exit(1);
}

const tx = await recentTxHash();
if (!tx) console.warn("Could not fetch a recent transaction hash; skipping ONCHAIN_TX_LOOKUP questions.");

let asked = 0;
for (let round = start; round < start + rounds; round += 1) {
  const batch = questionsForRound(round, tx ? { tx } : {}).filter((q) => {
    if (only && q.intent !== only) return false;
    if (!tx && q.intent === "ONCHAIN_TX_LOOKUP") return false;
    return true;
  });

  for (const { intent, question } of batch) {
    process.stdout.write(`\n[${intent}] ${question.slice(0, 72)}\n`);
    try {
      const record = appendComparison(await compareOnce(question, intent));
      asked += 1;
      const who = record.routedToUs ? "US" : record.routed.miner;
      process.stdout.write(`  router -> ${who}${record.intent !== intent ? ` (classified as ${record.intent})` : ""}\n`);
      process.stdout.write(`  theirs : ${(record.routed.answer ?? "[no plain text]").slice(0, 100)}\n`);
      if (record.ours) process.stdout.write(`  ours   : ${(record.ours.answer ?? "[no plain text]").slice(0, 100)}\n`);
      if (record.oursError) process.stdout.write(`  ours   : failed - ${record.oursError}\n`);
    } catch (err) {
      process.stdout.write(`  failed: ${err.message}\n`);
    }
    await sleep(delayMs);
  }
}

const report = buildReport(readComparisons());
console.log(`\n${"=".repeat(72)}`);
console.log(`Asked ${asked} question(s) this run. ${report.totals.asked} recorded in total.`);
console.log(`Router picked your miners ${report.totals.routedToUs} of ${report.totals.asked} times (${Math.round(report.totals.routedShare * 100)}%).\n`);
console.log("intent                  asked  you  you-win  they-win  top competitor");
for (const row of report.intents) {
  const top = Object.entries(row.competitors).sort((a, b) => b[1] - a[1])[0];
  console.log(
    `${row.intent.padEnd(22)} ${String(row.asked).padStart(5)} ${String(row.routedToUs).padStart(4)}` +
    ` ${String(row.headToHead.weAnsweredTheyDidNot).padStart(8)} ${String(row.headToHead.theyAnsweredWeDidNot).padStart(9)}` +
    `  ${top ? `${top[0]} (${top[1]})` : "-"}`
  );
}
console.log(`\nIntents in the pool: ${Object.keys(QUESTION_POOL).length}. Full detail at /report.html`);
