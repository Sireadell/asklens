const test = require("node:test");
const assert = require("node:assert/strict");
const { createCheckGate, normaliseCheckKey } = require("../check-gate.cjs");

test("blocks duplicate checks until the first check finishes", () => {
  const gate = createCheckGate();
  const address = "0x1111111111111111111111111111111111111111";

  assert.equal(gate.tryStart("address", address), true);
  assert.equal(gate.tryStart("address", address.toUpperCase()), false);
  assert.equal(gate.size(), 1);

  gate.finish("address", address);
  assert.equal(gate.tryStart("address", address), true);
});

test("keeps link and address checks separate", () => {
  const gate = createCheckGate();
  const value = "https://example.com";

  assert.equal(gate.tryStart("link", value), true);
  assert.equal(gate.tryStart("address", value), true);
  assert.equal(gate.size(), 2);
});

test("normalises check keys", () => {
  assert.equal(normaliseCheckKey("link", "HTTPS://EXAMPLE.COM"), "link:https://example.com");
});
