import { test } from "node:test";
import assert from "node:assert/strict";
import { assessWalletForSnap, snapChain, snapWalletResult } from "../src/snap-wallet.js";

const BAD = "0x098B716B8Aaf21512996dC57EB0615e2383E2f96";

test("maps supported MetaMask chain IDs to Sentinel chains", () => {
  assert.equal(snapChain("eip155:1"), "eth");
  assert.equal(snapChain("eip155:8453"), "base");
  assert.equal(snapChain("eip155:137"), null);
});

test("turns Sentinel HIGH into a critical result", () => {
  const result = snapWalletResult({ result: { label: "HIGH", reason: "Known exploiter." } }, BAD);
  assert.equal(result.status, "critical");
  assert.equal(result.reason, "Known exploiter.");
});

test("routes the wallet check through Telegraph's paid engine, not Sentinel's own host", async () => {
  let request;
  const result = await assessWalletForSnap({ address: BAD, chainId: "eip155:1" }, async (url, options) => {
    request = { url, options };
    return new Response(
      JSON.stringify({ result: { label: "LOW", reason: "No known fraud signals." } }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  });

  // A direct call to the miner's own host settles no x402 payment and is not
  // attributed to this app on Telegraph's side, so it must not be used here.
  assert.doesNotMatch(request.url, /telegraph-sentinel/);
  assert.match(request.url, /\/v1\/ask\//);

  const sent = JSON.parse(request.options.body);
  assert.equal(sent.method, "POST");
  assert.equal(sent.endpoint, "/assess-wallet");
  assert.deepEqual(sent.payload, { wallet: BAD, chain: "eth" });
  assert.equal(result.status, "safe");
});

test("returns unavailable when Sentinel fails", async () => {
  const result = await assessWalletForSnap({ address: BAD, chainId: "eip155:1" }, async () => {
    throw new Error("offline");
  });
  assert.equal(result.status, "unavailable");
});

for (const invalid of [
  undefined,
  null,
  {},
  { result: null },
  { result: [] },
  { result: {} },
  { result: { label: "UNKNOWN" } },
  { result: { label: "MEDIUM" } },
  { result: { label: "unexpected" } },
]) {
  test(`does not show malformed or unrecognized verdict as safe: ${JSON.stringify(invalid)}`, () => {
    assert.equal(snapWalletResult(invalid, BAD).status, "unavailable");
  });
}

test("only explicit LOW or SAFE verdicts are shown as safe", () => {
  assert.equal(snapWalletResult({ result: { label: "LOW" } }, BAD).status, "safe");
  assert.equal(snapWalletResult({ result: { risk_level: "SAFE" } }, BAD).status, "safe");
});
