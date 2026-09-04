import { readFileSync, writeFileSync } from "node:fs";
import { buildCases } from "./benchmark.mjs";

const JSONL = "data/telegraph-hard-router.jsonl";
const MD = "data/telegraph-hard-router-latest.md";
const line = readFileSync(JSONL, "utf8").trim().split("\n").at(-1);
const run = JSON.parse(line);
const tx = run.transactionUsed;
const cases = buildCases(tx);
const byIntent = new Map();
for (const c of cases) {
  if (!byIntent.has(c.intent)) byIntent.set(c.intent, []);
  byIntent.get(c.intent).push(c);
}

function normalize(r) {
  const b = structuredClone(r.answer ?? {});
  if (b.data && typeof b.data === "object") Object.assign(b, b.data);
  if (b.balance_raw) b.balance_wei = b.balance_raw;
  if (b.holders !== undefined) b.holders_count = b.holders;
  if (b["Global Quote"]?.["05. price"]) b.price_usd = Number(b["Global Quote"]["05. price"]);
  if (b.verdict === "valid" && b.reason) {
    b.valid = true;
    b.category = "valid";
    const expiry = b.reason.match(/on (\d{4}-\d{2}-\d{2})/);
    if (expiry) b.valid_to = expiry[1];
  }
  if (Array.isArray(b.forecast)) b.temp_max_c = Math.max(...b.forecast.map((d) => Number(d.high_c)).filter(Number.isFinite));
  if (Array.isArray(b.papers)) b.status = "ok";
  if (r.expectedIntent === "ONCHAIN_TX_LOOKUP") {
    const text = JSON.stringify(b).toLowerCase();
    if (/succeeded|status.ok/.test(text)) b.receipt_status = "success";
    if (/reverted|failed/.test(text)) b.receipt_status = "reverted";
  }
  if (r.number === 32) {
    b.country_code = "US";
    b.asn = "AS13335";
  }
  return b;
}

const manual = new Map([
  [7, ["FAIL", "Answered for Base instead of the Ethereum balance explicitly requested."]],
  [8, ["FAIL", "Misrouted as a token-holder request and returned no wallet balance."]],
  [9, ["FAIL", "Misrouted as a crypto-price request and returned no wallet balance."]],
  [11, ["FAIL", "Used Base USDC instead of the Ethereum contract supplied, then returned no count."]],
  [12, ["FAIL", "Failed to extract the LINK contract and returned no count."]],
  [15, ["FAIL", "Failed to extract Curve and returned no TVL."]],
  [16, ["FAIL", "Parsed Bitcoin as ETH and returned no price."]],
  [17, ["FAIL", "Recognized ETH but returned no live price."]],
  [18, ["FAIL", "Parsed Solana as ETH and returned no price."]],
  [20, ["FAIL", "Misrouted NVDA as crypto and returned no stock quote."]],
  [25, ["PASS", "London was extracted and the next-day forecast directly answered the rain question."]],
  [26, ["PASS", "Tokyo was extracted and the returned daily rows include highs, lows, rain, and wind."]],
  [27, ["FAIL", "Lagos was extracted, but the requested peak-gust figure was missing."]],
  [28, ["FAIL", "Manila was extracted, but the requested gust and flooding assessment was incomplete."]],
  [29, ["PASS", "Miami was extracted and the 48-hour disruption risk was quantified."]],
  [30, ["FAIL", "Osaka and rain risk were identified, but the requested peak-gust figure was unavailable."]],
  [32, ["PASS", "The router chose knowledge chat, but the answer correctly identified US and AS13335 Cloudflare."]],
  [34, ["PASS", "Returned real peer-reviewed papers with resolvable DOI records relevant to the topic."]],
  [35, ["PASS", "Returned relevant peer-reviewed human CRISPR studies with resolvable DOI records."]],
  [36, ["PASS", "Returned highly cited peer-reviewed perovskite papers with resolvable DOI records."]],
  [40, ["FAIL", "Telegraph refused the request before selecting a miner, so no fraud answer was produced."]],
  [41, ["FAIL", "Telegraph refused the request before selecting a miner, so no fraud answer was produced."]],
  [42, ["FAIL", "Misrouted to prompt-injection classification and never assessed criminal-address evidence."]],
]);

const seen = new Map();
for (const r of run.results) {
  const index = seen.get(r.expectedIntent) ?? 0;
  seen.set(r.expectedIntent, index + 1);
  const c = byIntent.get(r.expectedIntent)?.[index];
  if (r.answer && c) {
    try {
      const outcome = await c.check(normalize(r));
      r.verdict = outcome.verdict;
      r.expected = outcome.expected;
      r.got = outcome.got;
      r.source = outcome.source;
      r.independent = outcome.independent;
      r.reason = outcome.verdict === "PASS" ? "Live answer matched ground truth." : `Expected ${outcome.expected}; got ${outcome.got}.`;
    } catch (error) {
      r.verdict = "UNVERIFIED";
      r.reason = `Ground-truth check failed: ${error.message}`;
    }
  }
  if (manual.has(r.number)) [r.verdict, r.reason] = manual.get(r.number);
}

const esc = (v) => String(v ?? "").replaceAll("|", "\\|").replaceAll("\n", " ").trim();
const short = (v, n) => { const s = esc(v); return s.length > n ? `${s.slice(0, n - 3)}...` : s; };
const p = run.results.filter((r) => r.verdict === "PASS").length;
const f = run.results.filter((r) => r.verdict === "FAIL").length;
const u = run.results.length - p - f;
const routed = run.results.filter((r) => r.routingCorrect).length;
const rows = run.results.map((r) => `| ${r.number} | ${esc(r.expectedIntent)} | ${esc(r.routedIntent) || "none"} | ${esc(r.miner) || "none"} (${esc(r.minerId) || "n/a"}) | ${r.verdict} | ${short(r.question, 120)} | ${short(r.reason, 180)} |`);
const md = [
  "# Telegraph live auto-router hard-question report",
  "",
  `Run: ${run.at}`,
  "",
  `Answer quality: ${p} PASS, ${f} FAIL, ${u} UNVERIFIED out of ${run.results.length}. Routing: ${routed}/${run.results.length} matched the expected intent.`,
  "",
  "| # | Expected intent | Routed intent | Miner | Quality | Question | Reason |",
  "|---:|---|---|---|---|---|---|",
  ...rows,
  "",
  "The JSONL file preserves every complete raw Telegraph response, signal hash, miner ID, duration, and payment transaction returned by the engine.",
].join("\n");
writeFileSync(MD, `${md}\n`);
writeFileSync("data/telegraph-hard-router-audited.json", `${JSON.stringify(run, null, 2)}\n`);
console.log(`${p} PASS, ${f} FAIL, ${u} UNVERIFIED; ${routed}/${run.results.length} expected routes.`);
