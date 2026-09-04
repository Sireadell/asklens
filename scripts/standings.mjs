// Snapshots the Telegraph leaderboard for the intents we serve.
//
// Routing follows the leaderboard, so the leaderboard is the thing to watch,
// and it moves per epoch. Each run appends one snapshot to data/standings.jsonl
// so a later session can see how a score moved rather than re-deriving today's
// number and guessing at the trend.
//
//   node scripts/standings.mjs              snapshot and print
//   node scripts/standings.mjs --history    print every snapshot taken so far
import { appendFileSync, readFileSync, mkdirSync } from "node:fs";

const URL_LEADERBOARD = "https://explorer.telegraphprotocol.com/api/leaderboard/miners";
const FILE = "data/standings.jsonl";
const OURS = new Set(["txlens", "telegraph-sentinel"]);
const INTENTS = [
  "ONCHAIN_TX_LOOKUP", "GAS_PRICE", "WALLET_BALANCE_CHECK", "TOKEN_HOLDER_COUNT",
  "TVL_LOOKUP", "CRYPTO_PRICE", "STOCK_PRICE", "SSL_VERIFICATION", "WEATHER_FORECAST",
  "STORM_ALERT", "IP_GEOLOCATION", "ACADEMIC_SEARCH", "WEB_SEARCH", "FRAUD_DETECTION",
];

// Which of three shapes an intent is in. The shape decides whether the intent
// is worth fighting for, and the bare rank does not tell you:
//
//   locked     one miner near 1.0 with the runner-up orders of magnitude down.
//              Answering better today cannot close a gap like that.
//   dead       even the leader has decayed to nothing, so rank is just who
//              decayed least and the field is wide open.
//   contested  several miners in the same band, gaps of a few percent. A real
//              race, and the only place effort pays back quickly.
//
// Scores must be read as exponents, not rounded decimals: printed to six
// decimal places every value below the leader looks like zero, which is what
// hid this pattern the first time we looked.
function classify(rows) {
  const top = rows[0].score;
  const second = rows[1]?.score ?? 0;
  if (top >= 0.5 && second < top / 1e6) return "locked";
  if (top < 1e-6) return "dead";
  return "contested";
}

function readHistory() {
  try {
    return readFileSync(FILE, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l));
  } catch {
    return [];
  }
}

if (process.argv.includes("--history")) {
  const history = readHistory();
  if (!history.length) {
    console.log("No snapshots yet. Run without --history first.");
    process.exit(0);
  }
  console.log(`${history.length} snapshot(s). Cells are our rank on that intent.\n`);
  console.log("epoch  taken                " + INTENTS.map((i) => i.slice(0, 6).padStart(7)).join(""));
  for (const snap of history) {
    const cells = INTENTS.map((i) => String(snap.intents[i]?.ourRank ?? "-").padStart(7)).join("");
    console.log(`${String(snap.epoch).padEnd(6)} ${snap.at.slice(0, 19)}${cells}`);
  }
  process.exit(0);
}

const board = await (await fetch(URL_LEADERBOARD, { signal: AbortSignal.timeout(45000) })).json();
const snapshot = { at: new Date().toISOString(), epoch: board.epoch, intents: {} };

for (const intent of INTENTS) {
  const rows = board.intents?.[intent];
  if (!rows?.length) continue;
  const top = rows[0];
  const us = rows.find((r) => OURS.has(r.miner_slug));
  snapshot.intents[intent] = {
    field: rows.length,
    shape: classify(rows),
    topSlug: top.miner_slug,
    topScore: top.score,
    secondScore: rows[1]?.score ?? 0,
    ourSlug: us?.miner_slug ?? null,
    ourRank: us?.rank ?? null,
    ourScore: us?.score ?? null,
  };
}

mkdirSync("data", { recursive: true });
appendFileSync(FILE, `${JSON.stringify(snapshot)}\n`);

console.log(`Epoch ${snapshot.epoch}, taken ${snapshot.at}\n`);
console.log("intent                 field  shape      our rank    our score     #1 score  #1 miner");
for (const [intent, r] of Object.entries(snapshot.intents)) {
  const flag = r.ourRank === 1 ? "  <-- we are #1" : "";
  console.log(
    `${intent.padEnd(22)} ${String(r.field).padStart(5)}  ${r.shape.padEnd(9)}` +
    ` ${String(r.ourRank ?? "-").padStart(8)} ${(r.ourScore ?? 0).toExponential(4).padStart(12)}` +
    ` ${r.topScore.toExponential(4).padStart(12)}  ${r.topSlug}${flag}`
  );
}

const shapes = { locked: [], dead: [], contested: [] };
for (const [intent, r] of Object.entries(snapshot.intents)) shapes[r.shape].push(intent);
console.log("");
console.log(`locked    (${shapes.locked.length})  one miner near 1.0, runner-up orders down: ${shapes.locked.join(", ") || "-"}`);
console.log(`dead      (${shapes.dead.length})  even the leader has decayed to nothing:    ${shapes.dead.join(", ") || "-"}`);
console.log(`contested (${shapes.contested.length})  a real race, gaps of a few percent:        ${shapes.contested.join(", ") || "-"}`);

const winnable = Object.entries(snapshot.intents)
  .filter(([, r]) => r.shape === "contested" && r.ourRank !== 1 && r.ourScore > 0)
  .map(([intent, r]) => [intent, (r.topScore - r.ourScore) / r.topScore])
  .sort((a, b) => a[1] - b[1]);

if (winnable.length) {
  console.log("\nClosest winnable gaps (contested intents where we are not first):");
  for (const [intent, gap] of winnable.slice(0, 5)) {
    console.log(`  ${intent.padEnd(22)} ${(gap * 100).toFixed(1)}% behind`);
  }
}
