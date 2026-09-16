// Tests candidate AskLens cards through Telegraph's automatic router.
//
// Safe default:
//   node scripts/asklens-proof-bench.mjs
// prints the questions and spends nothing.
//
// Live run:
//   node scripts/asklens-proof-bench.mjs --run --limit 3
// makes a small paid Telegraph batch and writes its router evidence to
// data/asklens-proof-bench.json. Use only with an approved test-USDC budget.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ask, EngineError, initPayments, paymentReady } from "../src/telegraph.js";

const here = dirname(fileURLToPath(import.meta.url));
const outputDirectory = resolve(here, "../data");
const runLive = process.argv.includes("--run");
const PROOF_TIMEOUT_MS = 12_000;

const checks = [
  { card: "Link Check", expectedIntent: "URL_SCAN", question: "Is https://example.com safe to open?" },
  { card: "Link Check", expectedIntent: "URL_SCAN", question: "Before I sign in, check whether https://example.org looks suspicious." },
  { card: "Link Check", expectedIntent: "URL_SCAN", question: "Can I trust this website: https://example.net?" },
  { card: "Link Check", expectedIntent: "URL_SCAN", question: "Scan https://example.edu for phishing or malware risk." },
  { card: "Link Check", expectedIntent: "URL_SCAN", question: "Should I open https://example.info?" },
  { card: "Wallet and Token Check", expectedIntent: "FRAUD_DETECTION", question: "Is wallet 0x000000000000000000000000000000000000dEaD risky or linked to known scams?" },
  { card: "Wallet and Token Check", expectedIntent: "FRAUD_DETECTION", question: "Check this Ethereum wallet for scam or fraud signals: 0x000000000000000000000000000000000000dEaD." },
  { card: "Wallet and Token Check", expectedIntent: "ONCHAIN_TX_LOOKUP", question: "Did Ethereum transaction 0x0000000000000000000000000000000000000000000000000000000000000000 succeed?" },
  { card: "Wallet and Token Check", expectedIntent: "WALLET_BALANCE_CHECK", question: "What is the ETH balance of 0x000000000000000000000000000000000000dEaD?" },
  { card: "Wallet and Token Check", expectedIntent: "TOKEN_HOLDER_COUNT", question: "How many holders does token 0x000000000000000000000000000000000000dEaD have on Ethereum?" },
  { card: "Claim Check", expectedIntent: "FACT_CHECK", question: "Fact check this claim: The moon landing was faked." },
  { card: "Claim Check", expectedIntent: "FACT_CHECK", question: "Is this claim true: vaccines cause autism? Show the evidence." },
  { card: "Claim Check", expectedIntent: "NEWS_SEARCH", question: "What reliable reporting confirms the latest announcement from the Bank of England?" },
  { card: "Claim Check", expectedIntent: "RESEARCH_QUERY", question: "What primary evidence supports or challenges the claim that four-day work weeks improve productivity?" },
  { card: "Claim Check", expectedIntent: "WEB_SEARCH", question: "Find reliable sources for the claim that electric vehicles have lower lifetime emissions." },
];

function compact(text) {
  return String(text ?? "").replace(/\s+/g, " ").trim();
}

function selectedChecks() {
  const cardIndex = process.argv.indexOf("--card");
  const card = cardIndex === -1 ? null : process.argv[cardIndex + 1];
  const candidates = card ? checks.filter((check) => check.card === card) : checks;
  if (card && candidates.length === 0) {
    throw new Error(`--card must be one of: ${[...new Set(checks.map((check) => check.card))].join(", ")}.`);
  }
  const index = process.argv.indexOf("--limit");
  if (index === -1) return candidates;
  const limit = Number(process.argv[index + 1]);
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > candidates.length) {
    throw new Error(`--limit must be a whole number from 1 to ${candidates.length}.`);
  }
  return candidates.slice(0, limit);
}

function dryRun() {
  const selected = selectedChecks();
  console.log(`AskLens proof bench: ${selected.length} questions, $${(selected.length * 0.01).toFixed(2)} maximum test-USDC cost.`);
  console.log("Dry run only. Add --run after approving that test budget.");
  for (const [index, check] of selected.entries()) {
    console.log(`${index + 1}. [${check.card}] expect ${check.expectedIntent}: ${check.question}`);
  }
}

async function run() {
  const selected = selectedChecks();
  initPayments();
  if (!paymentReady()) {
    throw new Error("No Telegraph payment key is configured. Set the testnet key before running paid checks.");
  }

  const startedAt = new Date().toISOString();
  const rows = [];
  for (const [index, check] of selected.entries()) {
    process.stdout.write(`${index + 1}/${selected.length} ${check.card}: `);
    const row = { ...check, checkedAt: new Date().toISOString() };
    try {
      const { body, settlement } = await ask(check.question, undefined, { timeoutMs: PROOF_TIMEOUT_MS });
      row.receivedIntent = body?.intent ?? null;
      row.intentMatched = row.receivedIntent === check.expectedIntent;
      row.minerId = body?.miner_id ?? null;
      row.minerName = body?.miner_name ?? null;
      row.signalHash = body?.signal_hash ?? null;
      row.durationMs = body?.duration_ms ?? null;
      row.costUsd = body?.cost_usd ?? null;
      row.answer = compact(body?.result?.summary ?? body?.result?.answer ?? body?.result?.signal);
      row.paymentTx = settlement?.transaction ?? settlement?.tx ?? null;
      console.log(`${row.receivedIntent ?? "no intent"} via ${row.minerName ?? "unknown miner"}`);
    } catch (error) {
      row.error = error instanceof EngineError ? { code: error.code, message: error.message } : { code: "UNEXPECTED", message: String(error?.message ?? error) };
      console.log(`failed: ${row.error.code}`);
    }
    rows.push(row);
  }

  const answered = rows.filter((row) => !row.error);
  const intentMatches = answered.filter((row) => row.intentMatched).length;
  const evidence = {
    startedAt,
    completedAt: new Date().toISOString(),
    planned: selected.length,
    answered: answered.length,
    intentMatches,
    rows,
  };
  const runId = startedAt.replace(/[:.]/g, "-");
  const outputFile = resolve(outputDirectory, `asklens-proof-bench-${runId}.json`);
  await mkdir(dirname(outputFile), { recursive: true });
  await writeFile(outputFile, `${JSON.stringify(evidence, null, 2)}\n`, "utf8");
  console.log(`Saved evidence to ${outputFile}`);
  console.log(`Intent matched: ${intentMatches}/${answered.length} answered requests.`);
}

if (!runLive) dryRun();
else run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
