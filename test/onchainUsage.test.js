import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { classifyPayments, fetchPayments, getOnchainUsage, readScriptedRuns, _clearCacheForTests, SCRIPT_BURST_PER_HOUR } from "../src/onchainUsage.js";

beforeEach(() => _clearCacheForTests());

const RULES = {
  launchedAt: "2026-09-07T21:59:00Z",
  runs: [{ label: "Verification run", from: "2026-09-07T21:59:00Z", to: "2026-09-07T22:21:00Z", source: "HASHES.md" }],
};
const at = (iso) => ({ at: iso, tx: "0x" + iso });

test("scripted runs, bursts and pre-launch payments are kept out of everyday use", () => {
  const burst = Array.from({ length: SCRIPT_BURST_PER_HOUR }, (_, i) => at(`2026-09-13T21:${String(i % 60).padStart(2, "0")}:00Z`));
  const out = classifyPayments([
    at("2026-09-05T10:00:00Z"),
    at("2026-09-07T22:00:00Z"),
    at("2026-09-07T22:10:00Z"),
    at("2026-09-20T09:00:00Z"),
    at("2026-09-21T09:00:00Z"),
    ...burst,
  ], RULES);
  assert.equal(out.total, 5 + SCRIPT_BURST_PER_HOUR);
  assert.equal(out.beforeLaunch, 1);
  assert.equal(out.scriptedRuns[0].count, 2);
  assert.deepEqual(out.bursts, [{ hour: "2026-09-13T21:00Z", count: SCRIPT_BURST_PER_HOUR }]);
  assert.equal(out.everyday, 2);
  assert.deepEqual(out.everydayByDay, { "2026-09-20": 1, "2026-09-21": 1 });
});

test("an hour just under the burst line still counts as everyday use", () => {
  const busy = Array.from({ length: SCRIPT_BURST_PER_HOUR - 1 }, () => at("2026-09-22T12:30:00Z"));
  assert.equal(classifyPayments(busy, RULES).everyday, SCRIPT_BURST_PER_HOUR - 1);
});

test("the committed scripted-runs record names a proof for every run", () => {
  const rules = readScriptedRuns();
  assert.ok(rules.launchedAt);
  assert.ok(rules.runs.length >= 3);
  for (const r of rules.runs) assert.ok(r.source && r.from < r.to, r.label);
});

test("payments are read across pages and only USDC to the registry counts", async () => {
  const pages = [
    { items: [
      { token: { symbol: "USDC" }, to: { hash: "0xREG" }, timestamp: "2026-09-20T01:00:00Z", transaction_hash: "0x1" },
      { token: { symbol: "WETH" }, to: { hash: "0xREG" }, timestamp: "2026-09-20T01:00:00Z", transaction_hash: "0x2" },
    ], next_page_params: { block_number: 5, index: 1 } },
    { items: [
      { token: { symbol: "USDC" }, to: { hash: "0xOTHER" }, timestamp: "2026-09-19T01:00:00Z", transaction_hash: "0x3" },
      { token: { symbol: "USDC" }, to: { hash: "0xreg" }, timestamp: "2026-09-19T02:00:00Z", transaction_hash: "0x4" },
    ], next_page_params: null },
  ];
  const urls = [];
  const fetchImpl = async (url) => { urls.push(url); return new Response(JSON.stringify(pages[urls.length - 1])); };
  const got = await fetchPayments("0xW", { fetchImpl, recipient: "0xReg" });
  assert.deepEqual(got.map((p) => p.tx), ["0x1", "0x4"]);
  assert.match(urls[1], /block_number=5&index=1/);
});

test("a Blockscout failure answers null instead of breaking the stats page", async () => {
  const fetchImpl = async () => new Response("down", { status: 503 });
  assert.equal(await getOnchainUsage("0xW", { fetchImpl, waitMs: 1000 }), null);
});

test("no paying wallet means no on-chain figure", async () => {
  assert.equal(await getOnchainUsage(null), null);
});
