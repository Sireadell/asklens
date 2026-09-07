import { test } from "node:test";
import assert from "node:assert/strict";
import { hasDeployedCode } from "../src/chain.js";

test("no code deployed reads as a wallet, not a contract", () => {
  assert.equal(hasDeployedCode("0x"), false);
  assert.equal(hasDeployedCode(undefined), false);
  assert.equal(hasDeployedCode(null), false);
});

test("any real bytecode reads as a contract", () => {
  assert.equal(hasDeployedCode("0x6080604052"), true);
});

test("an EIP-7702 delegation marker reads as a wallet, not a contract", () => {
  // Real value observed live from a delegated EOA on mainnet.
  assert.equal(hasDeployedCode("0xef01005a7fc11397e9a8ad41bf10bf13f22b0a63f96f6d"), false);
  assert.equal(hasDeployedCode("0xEF0100aabbccddeeff00112233445566778899aabb"), false);
});
