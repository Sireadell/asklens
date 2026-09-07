import { initPayments } from "../src/telegraph.js";
import { checkUrlAcrossMiners } from "../src/clipguard.js";

async function run() {
  initPayments();
  const url = process.argv[2] || "https://example.com";
  console.log(`Checking: ${url}\n`);
  const started = Date.now();
  const result = await checkUrlAcrossMiners(url, { timeoutMs: 8000 });
  console.log(`Took ${Date.now() - started}ms\n`);
  console.log(JSON.stringify(result, null, 2));
}

run().catch((err) => {
  console.error("Test failed:", err.message);
  process.exit(1);
});
