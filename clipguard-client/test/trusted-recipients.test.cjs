const test = require("node:test");
const assert = require("node:assert/strict");
const {
  findRecipientMatch,
  normaliseAddress,
  shortAddress,
  visiblePartsMatch,
} = require("../trusted-recipients.cjs");

const REAL = "0x1234567890abcdef1234567890abcdef1234abcd";
const LOOKALIKE = "0x123456000000000000000000000000000000abcd";
const OTHER = "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

test("normalises valid EVM addresses", () => {
  assert.equal(normaliseAddress(REAL.toUpperCase()), REAL);
  assert.equal(normaliseAddress("not an address"), null);
});

test("detects visible lookalikes without treating exact matches as lookalikes", () => {
  assert.equal(visiblePartsMatch(REAL, LOOKALIKE), true);
  assert.equal(visiblePartsMatch(REAL, REAL), false);
  assert.equal(visiblePartsMatch(REAL, OTHER), false);
});

test("finds exact trusted recipients before lookalikes", () => {
  const recipients = [{ label: "Treasury", address: REAL }];
  assert.equal(findRecipientMatch(REAL, recipients).type, "trusted");
  assert.equal(findRecipientMatch(LOOKALIKE, recipients).type, "lookalike");
  assert.equal(findRecipientMatch(OTHER, recipients).type, "none");
});

test("formats a short address", () => {
  assert.equal(shortAddress(REAL), "0x1234...abcd");
});
