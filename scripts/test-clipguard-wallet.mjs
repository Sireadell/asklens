import { initPayments } from "../src/telegraph.js";
import { checkWalletAddress } from "../src/clipguard.js";

async function run() {
  initPayments();
  const address = process.argv[2] || "0x098B716B8Aaf21512996dC57EB0615e2383E2f96";
  const result = await checkWalletAddress(address);
  console.log(JSON.stringify(result, null, 2));
}

run().catch((err) => {
  console.error("Test failed:", err.message);
  process.exit(1);
});
