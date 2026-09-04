// Sends a batch of hard questions through Telegraph's own router, aimed at the
// intents we are currently losing on.
//
// We do not choose the miner. Every question goes to /v1/ask, Telegraph reads
// it, classifies the intent, and picks whichever miner it rates best for that
// intent right now. Most of these will be answered by competitors. What comes
// back is a record of who won each one and what they said.
//
//   node scripts/push-traffic.mjs                     100 questions, 8s apart
//   node scripts/push-traffic.mjs --count 20          a shorter run
//   node scripts/push-traffic.mjs --delay 12000       slower, if 402s appear
//   node scripts/push-traffic.mjs --intent GAS_PRICE  only one intent
//   node scripts/push-traffic.mjs --dry               print the plan, send nothing
//
// Each question costs $0.01 in testnet USDC, so a 100 question run costs $1.00.
// Paid calls fired back to back get refused with a 402, so there is a pause
// between every question and one slower retry when a call is refused.
import { appendFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { initPayments, ask, EngineError } from "../src/telegraph.js";
import { extractAnswer, extractConfidence } from "../src/answer.js";

const OUT = "data/traffic.jsonl";

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const count = Number(arg("count", 100));
const delayMs = Number(arg("delay", 8000));
const onlyIntent = arg("intent", null);
const dry = process.argv.includes("--dry");

// The intents we are not ranked first on as of epoch 305. Anything we already
// lead is deliberately left out: there is nothing to gain there, and a bad
// round could only cost us a top spot we already hold.
//
// Every question is answerable by an endpoint txlens or sentinel actually
// serves, and uses real hashes, real addresses and real tickers, so a wrong
// answer is a real miss rather than an unanswerable question.
const QUESTIONS = {
  ONCHAIN_TX_LOOKUP: [
    "Did transaction 0x59a439c8cebd31573880c1518d730ddd2e4b42955f123fb57cd230e7a9edf1c8 succeed on Ethereum, and what did it cost in gas?",
    "For Ethereum transaction 0xeedfe9a3bfee9f254ba1bed24a484592595bd105ce5ede2edf6e36941fb59375, who sent it and who received it?",
    "Was 0x2f1c1b5d0b0c1e4b8e9a0d7c6b5a4938271605f4e3d2c1b0a998877665544332 ever mined on Ethereum, or does it not exist?",
    "How much ETH moved in transaction 0x59a439c8cebd31573880c1518d730ddd2e4b42955f123fb57cd230e7a9edf1c8, and which contract function did it call?",
    "Show me the ERC-20 transfers inside Ethereum transaction 0xeedfe9a3bfee9f254ba1bed24a484592595bd105ce5ede2edf6e36941fb59375.",
    "What block was Ethereum transaction 0x59a439c8cebd31573880c1518d730ddd2e4b42955f123fb57cd230e7a9edf1c8 included in?",
    "Did transaction 0xeedfe9a3bfee9f254ba1bed24a484592595bd105ce5ede2edf6e36941fb59375 revert, and if so why?",
  ],
  WALLET_BALANCE_CHECK: [
    "How much ETH does 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 hold on Ethereum right now, to the wei?",
    "What is the current native balance of 0x28C6c06298d514Db089934071355E5743bf21d60 on Ethereum?",
    "Does 0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503 hold any ETH on Ethereum at the latest block?",
    "What tokens does 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 currently hold on Ethereum?",
    "Give me the exact wei balance of 0xF977814e90dA44bFA03b6295A0616a897441aceC on Ethereum, not a rounded figure.",
    "Is the wallet 0x0000000000000000000000000000000000000001 empty on Ethereum, or does it hold a balance?",
    "What is the balance of 0x28C6c06298d514Db089934071355E5743bf21d60 on Base?",
  ],
  CRYPTO_PRICE: [
    "What is the price of ETH in US dollars right now?",
    "How much is one bitcoin worth in dollars at this moment?",
    "What is the current USD price of USDC, and is it holding its peg?",
    "Give me the live dollar price of SOL.",
    "What does LINK trade at in dollars right now?",
    "What is the current price of MATIC in USD?",
    "How much is one ETH worth in dollars, and as of what time?",
  ],
  GAS_PRICE: [
    "What is the current gas price on Ethereum in gwei?",
    "How much does a simple ETH transfer cost on Ethereum right now?",
    "What is gas on Base at this moment?",
    "Is Ethereum gas high or low right now compared to a normal day?",
    "Give me the current Ethereum base fee in gwei.",
    "What would it cost in dollars to send a transaction on Ethereum right now?",
    "What is the priority fee on Ethereum at the moment?",
  ],
  TOKEN_HOLDER_COUNT: [
    "How many addresses currently hold USDC on Ethereum?",
    "What is the holder count for the token at 0xdAC17F958D2ee523a2206206994597C13D831ec7 on Ethereum?",
    "How many wallets hold LINK on Ethereum right now?",
    "Give me the number of holders of the token at 0x6B175474E89094C44Da98b954EedeAC495271d0F on Ethereum.",
    "How many holders does WETH have on Ethereum?",
    "What is the current holder count for USDC on Base?",
  ],
  TVL_LOOKUP: [
    "What is the total value locked in Aave right now?",
    "How much TVL does Uniswap have at this moment, in dollars?",
    "What is the current total value locked in Lido?",
    "Give me the TVL of Curve in US dollars right now.",
    "How much value is locked in Compound today?",
    "What is the total value locked in MakerDAO at the moment?",
  ],
  WEB_SEARCH: [
    "Who is the current chief executive of Anthropic, and since when?",
    "What is the most recent stable release version of Node.js?",
    "Which company acquired Figma, and did the deal actually complete?",
    "What is the Model Context Protocol, and who created it?",
    "When was the Ethereum Dencun upgrade activated on mainnet?",
    "What does the x402 payment standard do, in one sentence?",
    "Who founded Base, and which company operates it?",
  ],
  ACADEMIC_SEARCH: [
    "Find the paper that introduced the transformer architecture and tell me its authors.",
    "What paper introduced the idea of retrieval augmented generation, and in what year?",
    "Find published research on detecting money laundering in blockchain transaction graphs.",
    "Which paper first described the BERT language model, and who wrote it?",
    "Find academic work on zero knowledge proofs applied to identity verification.",
    "What is the most cited paper on graph neural networks for fraud detection?",
  ],
  WEATHER_FORECAST: [
    "What is the weather forecast for Lagos, Nigeria over the next 24 hours?",
    "Will it rain in Jos, Nigeria tomorrow?",
    "What is the temperature in Reykjavik, Iceland right now, and what is forecast tonight?",
    "Give me the 12 hour forecast for Singapore.",
    "What is the forecast for Anchorage, Alaska over the next day?",
    "How hot will it get in Phoenix, Arizona in the next 24 hours?",
  ],
  STORM_ALERT: [
    "Are there any active storm or cyclone alerts for the Philippines right now?",
    "Is there a hurricane currently active in the Atlantic basin?",
    "Are there severe weather warnings in effect for Florida at the moment?",
    "Any active tropical storm alerts for the Caribbean today?",
    "Is there a current flood or storm warning anywhere in West Africa?",
    "Are there any active weather emergencies in Japan right now?",
  ],
  FRAUD_DETECTION: [
    "Is the Ethereum address 0x098B716B8Aaf21512996dC57EB0615e2383E2f96 safe to receive funds from?",
    "Assess 0x722122dF12D4e14e13Ac3b6895a86e84145b6967 on Ethereum for fraud risk.",
    "Is 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 a risky counterparty on Ethereum?",
    "Check whether the Ethereum wallet 0x7F367cC41522cE07553e823bf3be79A889DEbe1B appears on any sanctions or scam list.",
    "Does the address 0x098B716B8Aaf21512996dC57EB0615e2383E2f96 show signs of being part of a scam cluster?",
    "Should I trust a payment coming from 0x28C6c06298d514Db089934071355E5743bf21d60 on Ethereum?",
    "Is there fraud risk in dealing with 0x722122dF12D4e14e13Ac3b6895a86e84145b6967?",
  ],
};

// Round robin across intents so a run stopped early still covers all of them,
// rather than finishing one intent and never reaching the rest.
function buildPlan(n, only) {
  const intents = only ? [only] : Object.keys(QUESTIONS);
  const missing = intents.filter((i) => !QUESTIONS[i]);
  if (missing.length) {
    console.error(`No questions defined for: ${missing.join(", ")}`);
    console.error(`Known intents: ${Object.keys(QUESTIONS).join(", ")}`);
    process.exit(1);
  }
  const plan = [];
  for (let round = 0; plan.length < n; round += 1) {
    for (const intent of intents) {
      if (plan.length >= n) break;
      const pool = QUESTIONS[intent];
      plan.push({ intent, question: pool[round % pool.length] });
    }
  }
  return plan;
}

function record(row) {
  mkdirSync(dirname(OUT), { recursive: true });
  appendFileSync(OUT, JSON.stringify(row) + "\n");
}

const plan = buildPlan(count, onlyIntent);

if (dry) {
  const minutes = Math.round((plan.length * delayMs) / 60000);
  console.log(`Plan: ${plan.length} questions, ${delayMs}ms apart, about ${minutes} minutes, $${(plan.length * 0.01).toFixed(2)}\n`);
  const perIntent = {};
  for (const p of plan) perIntent[p.intent] = (perIntent[p.intent] ?? 0) + 1;
  for (const [k, v] of Object.entries(perIntent)) console.log(String(v).padStart(4), k);
  process.exit(0);
}

initPayments();

const minutes = Math.round((plan.length * delayMs) / 60000);
console.log(`Sending ${plan.length} questions through Telegraph's router, ${delayMs}ms apart.`);
console.log(`About $${(plan.length * 0.01).toFixed(2)} in testnet USDC, roughly ${minutes} minutes.`);
console.log(`Telegraph picks the miner, not us. Logging to ${OUT}\n`);

const tally = { sent: 0, ok: 0, failed: 0, toUs: 0, byIntent: {}, byMiner: {} };

for (const [i, item] of plan.entries()) {
  const label = `${String(i + 1).padStart(3)}/${plan.length} ${item.intent.padEnd(22)}`;
  let attempt = 0;
  let done = false;

  while (attempt < 2 && !done) {
    attempt += 1;
    const startedAt = Date.now();
    try {
      const { body } = await ask(item.question);
      const { text } = extractAnswer(body.result);
      const minerName = body.miner_name ?? "unknown";
      const ours = /txlens|sentinel/i.test(minerName);
      const routedIntent = body.intent ?? null;

      tally.sent += 1;
      tally.ok += 1;
      if (ours) tally.toUs += 1;
      tally.byIntent[routedIntent ?? "unknown"] = (tally.byIntent[routedIntent ?? "unknown"] ?? 0) + 1;
      tally.byMiner[minerName] = (tally.byMiner[minerName] ?? 0) + 1;

      record({
        at: new Date().toISOString(),
        askedIntent: item.intent,
        routedIntent,
        question: item.question,
        miner: minerName,
        minerId: body.miner_id ?? null,
        ours,
        answer: text,
        confidence: extractConfidence(body.result),
        reasoning: body.reasoning ?? null,
        signalHash: body.signal_hash ?? null,
        costUsd: typeof body.cost_usd === "number" ? body.cost_usd : null,
        durationMs: Date.now() - startedAt,
      });
      console.log(`${label} -> ${ours ? "US  " : "them"}  ${minerName}`);
      done = true;
    } catch (err) {
      const code = err instanceof EngineError ? err.code : "UNKNOWN";
      // A 402 here is almost always the facilitator refusing calls sent too
      // close together, not an empty wallet. One slower retry usually clears
      // it. A 422 means Telegraph refused before running and charged nothing.
      if (code === "PAYMENT_FAILED" && attempt < 2) {
        console.log(`${label} -> 402, pausing and retrying once`);
        await sleep(delayMs * 2);
        continue;
      }
      tally.sent += 1;
      tally.failed += 1;
      record({
        at: new Date().toISOString(),
        askedIntent: item.intent,
        question: item.question,
        error: code,
        status: err?.status ?? null,
        detail: typeof err?.details === "object" ? JSON.stringify(err.details).slice(0, 300) : null,
      });
      console.log(`${label} -> FAILED ${code}`);
      done = true;
    }
  }

  if (i < plan.length - 1) await sleep(delayMs);
}

console.log("\n--- run finished ---");
console.log(`sent ${tally.sent}, answered ${tally.ok}, failed ${tally.failed}`);
console.log(`answered by one of our miners: ${tally.toUs} of ${tally.ok}`);
console.log("\nwho answered:");
for (const [m, n] of Object.entries(tally.byMiner).sort((a, b) => b[1] - a[1])) {
  console.log(String(n).padStart(4), m);
}
console.log("\nhow the router classified them:");
for (const [k, n] of Object.entries(tally.byIntent).sort((a, b) => b[1] - a[1])) {
  console.log(String(n).padStart(4), k);
}
console.log(`\nFull record in ${OUT}`);
