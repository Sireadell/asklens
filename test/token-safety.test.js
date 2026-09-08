import { test } from "node:test";
import assert from "node:assert/strict";
import { holderFlag, deriveTokenVerdict, formatPriceUsd } from "../src/token-safety.js";

const OK_HOLDERS = { ok: true, count: 500 };
const THIN_HOLDERS = { ok: true, count: 3 };
const NO_HOLDERS = { ok: true, count: 0 };
const UNKNOWN_HOLDERS = { ok: false, count: null };

const SAFE_FRAUD = { status: "safe", reason: "No known fraud signals." };
const CRITICAL_FRAUD = { status: "critical", reason: "Known exploiter." };
const UNAVAILABLE_FRAUD = { status: "unavailable" };

test("holderFlag classifies a healthy, thin, empty, and unreadable holder count", () => {
  assert.equal(holderFlag(OK_HOLDERS), "ok");
  assert.equal(holderFlag(THIN_HOLDERS), "thin");
  assert.equal(holderFlag(NO_HOLDERS), "none");
  assert.equal(holderFlag(UNKNOWN_HOLDERS), "unknown");
});

test("a real, distributed token with no fraud signal is safe", () => {
  const verdict = deriveTokenVerdict(OK_HOLDERS, SAFE_FRAUD);
  assert.equal(verdict.overall, "safe");
});

test("zero holders is dangerous even with a clean fraud signal", () => {
  const verdict = deriveTokenVerdict(NO_HOLDERS, SAFE_FRAUD);
  assert.equal(verdict.overall, "dangerous");
});

test("a critical fraud signal always wins, even with a healthy holder count", () => {
  const verdict = deriveTokenVerdict(OK_HOLDERS, CRITICAL_FRAUD);
  assert.equal(verdict.overall, "dangerous");
});

test("a thin holder count is caution, not dangerous, on its own", () => {
  const verdict = deriveTokenVerdict(THIN_HOLDERS, SAFE_FRAUD);
  assert.equal(verdict.overall, "caution");
});

test("an unreadable holder count is caution rather than a false safe", () => {
  const verdict = deriveTokenVerdict(UNKNOWN_HOLDERS, SAFE_FRAUD);
  assert.equal(verdict.overall, "caution");
});

test("a healthy holder count with no fraud signal available is caution, not safe", () => {
  const verdict = deriveTokenVerdict(OK_HOLDERS, UNAVAILABLE_FRAUD);
  assert.equal(verdict.overall, "caution");
});

test("reason text mentions the holder count and the fraud reason", () => {
  const verdict = deriveTokenVerdict(OK_HOLDERS, SAFE_FRAUD);
  assert.match(verdict.reason, /500 holders found\./);
  assert.match(verdict.reason, /No known fraud signals\./);
});

test("formatPriceUsd scales precision to the size of the price", () => {
  assert.equal(formatPriceUsd(1), "1.00");
  assert.equal(formatPriceUsd(1234.5), "1234.50");
  assert.equal(formatPriceUsd(0.9999341059795359), "0.9999");
  assert.equal(formatPriceUsd(0.05), "0.0500");
  assert.equal(formatPriceUsd(0.000001234), "0.00000123");
});

test("formatPriceUsd returns null for anything that isn't a real number", () => {
  assert.equal(formatPriceUsd(null), null);
  assert.equal(formatPriceUsd(undefined), null);
  assert.equal(formatPriceUsd(NaN), null);
  assert.equal(formatPriceUsd("1.00"), null);
});
