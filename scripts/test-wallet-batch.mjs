import { initPayments } from "../src/telegraph.js";
import { checkWalletAddress } from "../src/clipguard.js";

const CANDIDATES = [
  ["0x098B716B8Aaf21512996dC57EB0615e2383E2f96", "Ronin bridge exploiter (Lazarus, OFAC sanctioned)"],
  ["0x8589427373D6D84E98730D7795D8f6f8731FDA16", "Tornado Cash router (OFAC sanctioned)"],
  ["0x722122dF12D4e14e13Ac3b6895a86e84145b6967", "Tornado Cash proxy (OFAC sanctioned)"],
  ["0x7F367cC41522cE07553e823bf3be79A889DEbe1B", "Known scam-associated address"],
  ["0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", "vitalik.eth"],
  ["0x28C6c06298d514Db089934071355E5743bf21d60", "Binance hot wallet"],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  initPayments();
  for (const [address, note] of CANDIDATES) {
    const result = await checkWalletAddress(address);
    console.log(`${result.overall.toUpperCase().padEnd(12)} ${result.label ?? "-"} | ${address} | ${note}`);
    console.log(`             ${result.reason}\n`);
    await sleep(1200);
  }
}

run().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
