// Turns the raw signal log into the published evidence: HASHES.md, which
// anyone can check, and the stats baseline the live counter starts from.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const IN = "data/evidence-signals.jsonl";

function load() {
  return readFileSync(IN, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function tally(rows, key) {
  const counts = {};
  for (const row of rows) {
    const k = row[key] ?? "unknown";
    counts[k] = (counts[k] ?? 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

function main() {
  const rows = load();
  const byIntent = tally(rows, "intent");
  const byMiner = tally(rows, "minerName");
  const paid = rows.filter((r) => r.paymentTx).length;
  const spent = rows.reduce((sum, r) => sum + (r.costUsd ?? 0), 0);
  const first = rows[0]?.at;
  const last = rows[rows.length - 1]?.at;

  const lines = [];
  lines.push("# Signal hashes");
  lines.push("");
  lines.push("Every row below is a real Telegraph miner response that AskLens paid for");
  lines.push("and received. Each carries the `signal_hash` the network returned, which is");
  lines.push("resolvable at the Engine by anyone, and the on-chain transaction that settled");
  lines.push("the x402 payment for it. Nothing here is generated, replayed, or estimated:");
  lines.push("if a call failed, it is not in this file.");
  lines.push("");
  lines.push(`**${rows.length} signals** across ${byIntent.length} intents and ${byMiner.length} miners.`);
  lines.push("");
  lines.push(`- Collected: ${first} to ${last}`);
  lines.push(`- Paid by: \`0xA8Ae7deF7692C81a0Cb8Cd8eD55B60a56e417076\` (Base Sepolia test USDC)`);
  lines.push(`- Settled on-chain: ${paid} of ${rows.length}`);
  lines.push(`- Spent: $${spent.toFixed(2)} in test USDC`);
  lines.push("");
  lines.push("## Per intent");
  lines.push("");
  lines.push("| Intent | Signals |");
  lines.push("|---|---|");
  for (const [intent, n] of byIntent) lines.push(`| ${intent} | ${n} |`);
  lines.push("");
  lines.push("## Per miner");
  lines.push("");
  lines.push("| Miner | Signals |");
  lines.push("|---|---|");
  for (const [miner, n] of byMiner) lines.push(`| ${miner} | ${n} |`);
  lines.push("");
  lines.push("Two of these miners, TxLens and Telegraph Sentinel, are ours. The rest are");
  lines.push("other teams'. AskLens routes a link check to three independent URL scanners");
  lines.push("on purpose, because one source agreeing with itself is not corroboration.");
  lines.push("");
  lines.push("## Every signal");
  lines.push("");
  lines.push("| # | Intent | Miner | Input | Signal hash | Payment tx |");
  lines.push("|---|---|---|---|---|---|");
  rows.forEach((r, i) => {
    const input = String(r.input).length > 46 ? String(r.input).slice(0, 43) + "..." : r.input;
    const tx = r.paymentTx ? `\`${r.paymentTx.slice(0, 18)}...\`` : "-";
    lines.push(`| ${i + 1} | ${r.intent} | ${r.minerName ?? "-"} | \`${input}\` | \`${r.signalHash}\` | ${tx} |`);
  });
  lines.push("");

  writeFileSync("HASHES.md", lines.join("\n"));

  const baseline = {
    note: "Verified floor for the live request counter. Every request counted here has a published signal hash in HASHES.md. The host wipes its disk on deploy, so the counter seeds from this instead of restarting at zero.",
    total: rows.length,
    byIntent: Object.fromEntries(byIntent),
    byMiner: Object.fromEntries(byMiner),
    startedAt: first,
    verifiedAt: new Date().toISOString(),
  };
  mkdirSync("evidence", { recursive: true });
  writeFileSync("evidence/stats-baseline.json", JSON.stringify(baseline, null, 2));

  console.log(`HASHES.md written: ${rows.length} signals, ${byIntent.length} intents, ${byMiner.length} miners.`);
  console.log(`evidence/stats-baseline.json written: total ${rows.length}.`);
}

main();
