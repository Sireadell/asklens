const test = require("node:test");
const assert = require("node:assert/strict");
const { DEFAULT_WINDOW_MS, didAddressChange } = require("../address-change.cjs");

const FIRST = "0x1111111111111111111111111111111111111111";
const SECOND = "0x2222222222222222222222222222222222222222";

test("warns only when a different address follows shortly after a copied address", () => {
  assert.equal(didAddressChange({ address: FIRST, copiedAt: 1_000 }, SECOND, 2_000), true);
  assert.equal(didAddressChange({ address: FIRST, copiedAt: 1_000 }, FIRST.toUpperCase(), 2_000), false);
  assert.equal(didAddressChange({ address: FIRST, copiedAt: 1_000 }, SECOND, 1_000 + DEFAULT_WINDOW_MS + 1), false);
});

test("does not warn when the clipboard history is missing or invalid", () => {
  assert.equal(didAddressChange(null, SECOND, 2_000), false);
  assert.equal(didAddressChange({ address: FIRST, copiedAt: "now" }, SECOND, 2_000), false);
  assert.equal(didAddressChange({ address: FIRST, copiedAt: 3_000 }, SECOND, 2_000), false);
});
