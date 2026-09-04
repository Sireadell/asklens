import { test } from "node:test";
import assert from "node:assert/strict";
import {
  isValidAddress,
  extractDomain,
  normalizeChain,
  describeEngineError,
  shapeWalletVerdict,
  summarizeCheck,
  shapeLinkVerdict,
  walletAssessRequest,
  shapeLookupVerdict,
} from "../src/mcp.js";
import { EngineError } from "../src/telegraph.js";

// -- shapeLookupVerdict ---------------------------------------------------

test("shapes a successful lookup into a readable line with the miner and cost", () => {
  const outcome = {
    ok: true,
    result: { answer: "Ethereum gas is 12 gwei." },
    minerName: "TxLens",
    minerId: "9002",
    costUsd: 0.01,
  };
  const text = shapeLookupVerdict("ethereum", outcome, "fallback", "0");
  assert.match(text, /Ethereum gas is 12 gwei\./);
  assert.match(text, /Answered by: TxLens \(miner id 9002\)/);
  assert.match(text, /Cost: \$0\.01/);
});

test("falls back to the raw response when there is no readable summary", () => {
  const outcome = { ok: true, result: { weird: "shape" }, minerName: "TxLens", minerId: "9002", costUsd: 0.01 };
  const text = shapeLookupVerdict("x", outcome, "fallback", "0");
  assert.match(text, /No readable summary came back/);
  assert.match(text, /"weird":"shape"/);
});

test("reports a failed lookup as a plain sentence, not a crash", () => {
  const outcome = { ok: false, error: "Telegraph returned HTTP 500." };
  const text = shapeLookupVerdict("x", outcome, "fallback", "0");
  assert.match(text, /Could not answer for "x"/);
  assert.match(text, /HTTP 500/);
});

// -- walletAssessRequest ------------------------------------------------

// This is the regression guard for the bug that made every wallet check fail.
// The engine sends the payload as a request body, and sentinel's GET route
// never sees it, so GET returns HTTP 500 while POST works. If someone changes
// the method back, this test fails before anyone pays for a broken call.
test("asks sentinel over POST, because GET silently loses the wallet", () => {
  const req = walletAssessRequest("0x1111111111111111111111111111111111111111", "eth");
  assert.equal(req.method, "POST");
  assert.equal(req.endpoint, "/assess-wallet");
});

test("passes the wallet and the normalized chain through untouched", () => {
  const req = walletAssessRequest("0x1111111111111111111111111111111111111111", "base");
  assert.deepEqual(req.payload, {
    wallet: "0x1111111111111111111111111111111111111111",
    chain: "base",
  });
});

// -- isValidAddress -----------------------------------------------------

test("accepts a well-formed EVM address", () => {
  assert.equal(isValidAddress("0x1234567890abcdef1234567890abcdef12345678"), true);
});

test("rejects a short or malformed address", () => {
  assert.equal(isValidAddress("0x1234"), false);
  assert.equal(isValidAddress("not an address"), false);
  assert.equal(isValidAddress(""), false);
  assert.equal(isValidAddress(undefined), false);
});

// -- extractDomain --------------------------------------------------------

test("extracts a domain from a full URL", () => {
  assert.equal(extractDomain("https://example.com/path?x=1"), "example.com");
});

test("fills in a missing protocol", () => {
  assert.equal(extractDomain("example.com"), "example.com");
  assert.equal(extractDomain("www.example.com/some/page"), "www.example.com");
});

test("returns null for something that is not a URL at all", () => {
  assert.equal(extractDomain(""), null);
  assert.equal(extractDomain("   "), null);
  assert.equal(extractDomain(null), null);
});

// -- normalizeChain ---------------------------------------------------------
// Sentinel's live /assess-wallet only accepts "eth" or "base" and returns a
// 400 for anything else, including the "ethereum" default this app used to
// send on every call. These tests are the ones that would have caught that.

test("defaults to eth when no chain is given", () => {
  assert.deepEqual(normalizeChain(undefined), { ok: true, value: "eth" });
  assert.deepEqual(normalizeChain(null), { ok: true, value: "eth" });
  assert.deepEqual(normalizeChain(""), { ok: true, value: "eth" });
});

test("maps common aliases to the two chains sentinel actually accepts", () => {
  assert.deepEqual(normalizeChain("ethereum"), { ok: true, value: "eth" });
  assert.deepEqual(normalizeChain("mainnet"), { ok: true, value: "eth" });
  assert.deepEqual(normalizeChain("Eth"), { ok: true, value: "eth" });
  assert.deepEqual(normalizeChain("BASE"), { ok: true, value: "base" });
  assert.deepEqual(normalizeChain(" base "), { ok: true, value: "base" });
});

test("rejects a chain sentinel does not support instead of passing it through", () => {
  assert.deepEqual(normalizeChain("boguschain"), { ok: false });
  assert.deepEqual(normalizeChain("polygon"), { ok: false });
  assert.deepEqual(normalizeChain(123), { ok: false });
});

// -- describeEngineError ---------------------------------------------------

test("describes a refused (422) request as unbilled", () => {
  const err = new EngineError("REQUEST_REFUSED", "Address format not recognised.", 422);
  const msg = describeEngineError(err);
  assert.match(msg, /nothing was charged/);
  assert.match(msg, /Address format not recognised\./);
});

test("passes through an EngineError's own message for other codes", () => {
  const err = new EngineError("PAYMENT_NOT_CONFIGURED", "No wallet key is configured.", 503);
  assert.equal(describeEngineError(err), "No wallet key is configured.");
});

test("wraps a plain Error with a generic prefix", () => {
  assert.match(describeEngineError(new Error("boom")), /Something went wrong: boom/);
});

// -- shapeWalletVerdict -----------------------------------------------------

test("shapes a full sentinel response into a readable verdict", () => {
  // Shaped after the real evidence-item keys confirmed against the live
  // miner: signalCode (camelCase), not code or signal_code.
  const body = {
    result: {
      label: "HIGH",
      risk_level: "high",
      risk_pct: 87,
      assessment_status: "completed",
      confidence: 0.87,
      reason: "This address has sent funds to three known mixers.",
      reason_codes: ["MIXER_INTERACTION", "NEW_WALLET"],
      evidence: [
        { signalCode: "MIXER_INTERACTION", strength: 0.9 },
        { signalCode: "MIXER_INTERACTION", strength: 0.8 },
        { signalCode: "NEW_WALLET", strength: 0.5 },
      ],
    },
    miner_name: "Telegraph Sentinel",
    miner_id: "94217603",
    cost_usd: 0.01,
  };
  const text = shapeWalletVerdict(body, "Telegraph Sentinel", "94217603");
  assert.match(text, /Wallet safety verdict: HIGH/);
  assert.match(text, /Risk level: high/);
  assert.match(text, /Risk: 87%/);
  assert.match(text, /Confidence: 87%/);
  assert.match(text, /Assessment status: completed/);
  assert.match(text, /three known mixers/);
  assert.match(text, /MIXER_INTERACTION, NEW_WALLET/);
  // Evidence is summarised, not dumped: three items collapse to two unique
  // signal codes, read from the real signalCode field rather than a guess.
  assert.match(text, /Evidence: 3 piece\(s\), signals: MIXER_INTERACTION, NEW_WALLET/);
  assert.match(text, /Telegraph Sentinel \(miner id 94217603\)/);
  assert.match(text, /Cost: \$0\.01/);
});

test("evidence items with no signalCode still degrade to unspecified, not a crash", () => {
  const body = { result: { label: "LOW", evidence: [{ note: "no signal field here" }] } };
  const text = shapeWalletVerdict(body, "Telegraph Sentinel", "94217603");
  assert.match(text, /Evidence: 1 piece\(s\), signals: unspecified/);
});

test("risk fields are omitted, not shown as blank, when sentinel does not send them", () => {
  const text = shapeWalletVerdict({ result: { label: "LOW" } }, "Telegraph Sentinel", "94217603");
  assert.doesNotMatch(text, /Risk level:/);
  assert.doesNotMatch(text, /Risk: /);
  assert.doesNotMatch(text, /Assessment status:/);
});

test("falls back gracefully when sentinel fields are missing", () => {
  const text = shapeWalletVerdict({ result: {} }, "Telegraph Sentinel", "94217603");
  assert.match(text, /Wallet safety verdict: UNKNOWN/);
  assert.match(text, /Confidence: not reported/);
  assert.match(text, /No reason given\./);
  assert.match(text, /Reason codes: none given/);
  assert.match(text, /Evidence: none given/);
});

// -- summarizeCheck / shapeLinkVerdict ---------------------------------------

test("summarizeCheck reads a miner's summary and confidence", () => {
  const outcome = { result: { status: "ok", summary: "Certificate is valid and current.", confidence: 0.95 } };
  const text = summarizeCheck("Certificate", outcome);
  assert.match(text, /Certificate: Certificate is valid and current\., confidence 95%/);
});

test("summarizeCheck reports a failed check plainly", () => {
  const text = summarizeCheck("Hosting location", { error: "Telegraph took too long to answer." });
  assert.match(text, /Hosting location: could not be completed \(Telegraph took too long to answer\.\)/);
});

test("shapeLinkVerdict merges two successful checks", () => {
  const ssl = { result: { status: "ok", summary: "Valid certificate, issued by Let's Encrypt." }, costUsd: 0.01 };
  const geo = { result: { status: "ok", summary: "Hosted in the United States." }, costUsd: 0.01 };
  const text = shapeLinkVerdict("example.com", ssl, geo);
  assert.match(text, /both came back/);
  assert.match(text, /Valid certificate, issued by Let's Encrypt\./);
  assert.match(text, /Hosted in the United States\./);
  assert.match(text, /Cost: \$0\.02/);
});

test("shapeLinkVerdict says plainly when one check failed", () => {
  const ssl = { result: { status: "ok", summary: "Valid certificate." }, costUsd: 0.01 };
  const geo = { error: "Telegraph declined this request before running it, so nothing was charged." };
  const text = shapeLinkVerdict("example.com", ssl, geo);
  assert.match(text, /one of the two checks could not be completed/);
  assert.match(text, /Valid certificate\./);
  assert.match(text, /could not be completed/);
  // Only the successful call's cost is counted.
  assert.match(text, /Cost: \$0\.01/);
});
