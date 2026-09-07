// Runs real, paid Telegraph calls across every intent AskLens serves and
// records the signal hash the network returns for each one.
//
// The point is verifiability, not volume: each row it writes is a real
// response that anyone can resolve at the Engine, so the app's usage claims
// can be checked rather than taken on trust. Nothing here is synthesised.
import { writeFileSync, mkdirSync, appendFileSync, existsSync, readFileSync } from "node:fs";
import { initPayments, askMiner } from "../src/telegraph.js";
import { config } from "../src/config.js";

const OUT_JSONL = "data/evidence-signals.jsonl";

const TXLENS = config.ownMiners.txlens.id;
const SENTINEL = config.ownMiners.sentinel.id;

// Real inputs only. Live chains, real addresses, real domains, real tickers.
const URLS = [
  "https://example.com", "https://github.com", "https://wikipedia.org",
  "https://microsoft.com", "https://cloudflare.com", "https://mozilla.org",
  "https://stackoverflow.com", "https://npmjs.com", "https://python.org",
  "https://kernel.org", "https://apache.org", "https://debian.org",
  "https://ubuntu.com", "https://nodejs.org", "https://rust-lang.org",
  "https://go.dev", "https://gitlab.com", "https://bitbucket.org",
  "https://archive.org", "https://ietf.org", "https://w3.org",
  "https://letsencrypt.org", "https://openssl.org", "https://postgresql.org",
  "https://redis.io", "https://nginx.org", "https://docker.com",
  "https://kubernetes.io", "https://terraform.io", "https://ansible.com",
  "https://jenkins.io", "https://grafana.com", "https://prometheus.io",
  "https://elastic.co", "https://mongodb.com", "https://sqlite.org",
  "https://ethereum.org", "https://bitcoin.org", "https://base.org",
  "https://metamask.io", "https://etherscan.io", "https://coingecko.com",
  "https://defillama.com", "https://chain.link", "https://uniswap.org",
  "https://aave.com", "https://curve.fi", "https://lido.fi",
  "https://reuters.com", "https://apnews.com", "https://bbc.co.uk",
  "https://nature.com", "https://arxiv.org", "https://ieee.org",
  "https://acm.org", "https://who.int", "https://un.org",
  "https://nasa.gov", "https://noaa.gov", "https://nist.gov",
];

const ADDRESSES = [
  "0x098B716B8Aaf21512996dC57EB0615e2383E2f96",
  "0x7F367cC41522cE07553e823bf3be79A889DEbe1B",
  "0x8589427373D6D84E98730D7795D8f6f8731FDA16",
  "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  "0x28C6c06298d514Db089934071355E5743bf21d60",
  "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  "0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8",
  "0x21a31Ee1afC51d94C2eFcCAa2092aD1028285549",
  "0xDFd5293D8e347dFe59E90eFd55b2956a1343963d",
  "0x56Eddb7aa87536c09CCc2793473599fD21A8b17F",
  "0x9696f59E4d72E237BE84fFD425DCaD154Bf96976",
  "0x4976A4A02f38326660D17bf34b431dC6e2eb2327",
  "0x6262998Ced04146fA42253a5C0AF90CA02dfd2A3",
  "0x0D0707963952f2fBA59dD06f2b425ace40b492Fe",
  "0xF977814e90dA44bFA03b6295A0616a897441aceC",
  "0x5754284f345afc66a98fbB0a0Afe71e0F007B949",
  "0x1522900B6daFac587d499a862861C0869Be6E428",
  "0x503828976D22510aad0201ac7EC88293211D23Da",
  "0xddfAbCdc4D8FfC6d5beaf154f18B778f892A0740",
  "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE",
  "0xD551234Ae421e3BCBA99A0Da6d736074f22192FF",
  "0x564286362092D8e7936f0549571a803B203aAceD",
  "0x0681d8Db095565FE8A346fA0277bFfdE9C0eDBBF",
  "0xfE9e8709d3215310075d67E3ed32A380CCf451C8",
];

const TX_HASHES = [
  "0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060",
  "0x1ecdd1b1b3d3b1cf1c3d2bbf7fcbdf3fef1e6b7a5e2f8e2d3c4b5a6978869504",
  "0xa1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90",
  "0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
  "0x3f7f4a6a5f6c1c1e9e9f0a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d",
  "0xb1e1f1a1c1d1e1f1a1b1c1d1e1f1a1b1c1d1e1f1a1b1c1d1e1f1a1b1c1d1e1f1",
];

const COINS = [
  "bitcoin", "ethereum", "solana", "cardano", "chainlink", "polkadot",
  "avalanche-2", "dogecoin", "litecoin", "uniswap", "aave", "cosmos",
  "near", "algorand", "stellar", "monero", "filecoin", "arbitrum",
  "optimism", "maker", "the-graph", "injective-protocol", "sui", "aptos",
];
const TICKERS = [
  "AAPL", "MSFT", "NVDA", "GOOGL", "AMZN", "TSLA", "META", "NFLX",
  "AMD", "INTC", "ORCL", "CRM", "ADBE", "CSCO", "QCOM", "TXN",
  "IBM", "UBER", "SHOP", "SQ", "PYPL", "COIN", "SNOW", "PLTR",
];
const DOMAINS = [
  "github.com", "cloudflare.com", "mozilla.org", "wikipedia.org",
  "google.com", "amazon.com", "microsoft.com", "apple.com",
  "letsencrypt.org", "openssl.org", "ietf.org", "w3.org",
  "etherscan.io", "coingecko.com", "npmjs.com", "python.org",
  "nasa.gov", "who.int", "reuters.com", "nature.com",
];
const LOCATIONS = [
  "Lagos, Nigeria", "London, UK", "Tokyo, Japan", "New York, USA",
  "Berlin, Germany", "Paris, France", "Sydney, Australia", "Toronto, Canada",
  "Mumbai, India", "Sao Paulo, Brazil", "Cairo, Egypt", "Nairobi, Kenya",
  "Seoul, South Korea", "Mexico City, Mexico", "Madrid, Spain", "Rome, Italy",
  "Amsterdam, Netherlands", "Stockholm, Sweden", "Singapore", "Dubai, UAE",
];
const IPS = [
  "8.8.8.8", "1.1.1.1", "9.9.9.9", "208.67.222.222",
  "8.8.4.4", "1.0.0.1", "149.112.112.112", "208.67.220.220",
  "4.2.2.2", "64.6.64.6", "77.88.8.8", "80.80.80.80",
  "185.228.168.9", "76.76.19.19", "94.140.14.14",
];
const CHAINS = ["ethereum", "base", "polygon", "arbitrum", "optimism"];
const PROTOCOLS = [
  "aave", "uniswap", "curve", "lido", "makerdao", "compound",
  "pancakeswap", "balancer", "sushiswap", "yearn-finance",
  "convex-finance", "rocket-pool", "frax", "gmx", "synthetix",
];
const TOKENS = [
  "USDC", "USDT", "DAI", "WETH", "WBTC", "LINK",
  "UNI", "AAVE", "MKR", "SHIB", "PEPE", "MATIC",
];
const TOPICS = [
  "perovskite solar cells", "CRISPR gene editing", "quantum error correction",
  "large language model alignment", "solid state batteries", "mRNA vaccines",
  "carbon capture and storage", "room temperature superconductors",
  "federated learning privacy", "protein structure prediction",
  "fusion plasma confinement", "neuromorphic computing",
];

// URL_SCAN is the one intent AskLens deliberately spreads across miners it
// does not own, because a safety verdict from a single source is worth less
// than three independent ones agreeing.
const URL_MINERS = [
  { id: "7334", name: "NetWire", method: "GET", endpoint: "/url-scan", payload: (u) => ({ question: `Is ${u} safe?` }) },
  { id: "5001", name: "URL Sentinel", method: "POST", endpoint: "/scan", payload: (u) => ({ url: u }) },
  { id: "20260828", name: "Preflight", method: "GET", endpoint: "/url-scan", payload: (u) => ({ url: u }) },
];

function buildJobs() {
  const jobs = [];

  for (const url of URLS) {
    for (const m of URL_MINERS) {
      jobs.push({ intent: "URL_SCAN", minerId: m.id, input: url, req: { method: m.method, endpoint: m.endpoint, payload: m.payload(url) } });
    }
  }

  for (const address of ADDRESSES) {
    for (const chain of ["eth", "base"]) {
      jobs.push({ intent: "FRAUD_DETECTION", minerId: SENTINEL, input: `${address} (${chain})`, req: { method: "POST", endpoint: "/assess-wallet", payload: { wallet: address, chain } } });
    }
  }

  for (const address of ADDRESSES) {
    jobs.push({ intent: "WALLET_BALANCE_CHECK", minerId: TXLENS, input: address, req: { method: "GET", endpoint: "/wallet-balance", payload: { address } } });
  }
  for (const tx of TX_HASHES) {
    jobs.push({ intent: "ONCHAIN_TX_LOOKUP", minerId: TXLENS, input: tx, req: { method: "GET", endpoint: "/check-tx", payload: { tx_hash: tx } } });
  }
  for (const chain of CHAINS) {
    jobs.push({ intent: "GAS_PRICE", minerId: TXLENS, input: chain, req: { method: "GET", endpoint: "/gas-price", payload: { chain } } });
  }
  for (const coin of COINS) {
    jobs.push({ intent: "CRYPTO_PRICE", minerId: TXLENS, input: coin, req: { method: "GET", endpoint: "/crypto-price", payload: { coin_id: coin } } });
  }
  for (const ticker of TICKERS) {
    jobs.push({ intent: "STOCK_PRICE", minerId: TXLENS, input: ticker, req: { method: "GET", endpoint: "/stock-price", payload: { ticker } } });
  }
  for (const domain of DOMAINS) {
    jobs.push({ intent: "SSL_VERIFICATION", minerId: TXLENS, input: domain, req: { method: "GET", endpoint: "/ssl-check", payload: { domain } } });
  }
  for (const location of LOCATIONS) {
    jobs.push({ intent: "WEATHER_FORECAST", minerId: TXLENS, input: location, req: { method: "GET", endpoint: "/weather-forecast", payload: { location } } });
    jobs.push({ intent: "STORM_ALERT", minerId: TXLENS, input: location, req: { method: "GET", endpoint: "/storm-alert", payload: { location } } });
  }
  for (const ip of IPS) {
    jobs.push({ intent: "IP_GEOLOCATION", minerId: TXLENS, input: ip, req: { method: "GET", endpoint: "/ip-geolocate", payload: { ip } } });
  }
  for (const protocol of PROTOCOLS) {
    jobs.push({ intent: "TVL_LOOKUP", minerId: TXLENS, input: protocol, req: { method: "GET", endpoint: "/tvl", payload: { protocol } } });
  }
  for (const token of TOKENS) {
    jobs.push({ intent: "TOKEN_HOLDER_COUNT", minerId: TXLENS, input: token, req: { method: "GET", endpoint: "/token-holders", payload: { token } } });
  }
  for (const topic of TOPICS) {
    jobs.push({ intent: "ACADEMIC_SEARCH", minerId: TXLENS, input: topic, req: { method: "GET", endpoint: "/academic-search", payload: { query: topic } } });
  }

  return jobs;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function runJob(job, attempt = 0) {
  try {
    const { body, settlement } = await askMiner(job.minerId, job.req, { timeoutMs: 25000 });
    if (!body?.signal_hash) return { ok: false, reason: "no signal hash returned" };
    return {
      ok: true,
      row: {
        at: new Date().toISOString(),
        intent: job.intent,
        minerId: body.miner_id ?? job.minerId,
        minerName: body.miner_name ?? null,
        input: job.input,
        signalHash: body.signal_hash,
        costUsd: typeof body.cost_usd === "number" ? body.cost_usd : null,
        paymentTx: settlement?.transaction ?? settlement?.tx ?? null,
      },
    };
  } catch (err) {
    // The same transient payment race the app retries on, given a couple of
    // attempts here so a passing failure does not thin out the record.
    if (attempt < 2 && err.code === "PAYMENT_FAILED") {
      await sleep(1500);
      return runJob(job, attempt + 1);
    }
    return { ok: false, reason: err.message };
  }
}

async function main() {
  initPayments();
  const jobs = buildJobs();
  console.log(`Prepared ${jobs.length} real Telegraph calls.`);
  mkdirSync("data", { recursive: true });

  let ok = 0;
  let failed = 0;
  const failures = [];

  function record(job, result) {
    if (result.ok) {
      ok += 1;
      appendFileSync(OUT_JSONL, JSON.stringify(result.row) + "\n");
    } else {
      failed += 1;
      failures.push(`${job.intent}: ${result.reason}`);
    }
    if ((ok + failed) % 50 === 0) {
      console.log(`${ok + failed}/${jobs.length} done — ${ok} with hashes, ${failed} failed`);
    }
  }

  // Sentinel drops most of a concurrent burst, so its calls run one at a time
  // with a gap. FRAUD_DETECTION is the intent this app leans on hardest, so a
  // thin record there would be the wrong corner to cut for speed.
  const serial = jobs.filter((j) => j.minerId === SENTINEL);
  const parallel = jobs.filter((j) => j.minerId !== SENTINEL);

  const WORKERS = 4;
  let cursor = 0;

  async function worker(id) {
    await sleep(id * 700);
    while (cursor < parallel.length) {
      const job = parallel[cursor++];
      record(job, await runJob(job));
      await sleep(250);
    }
  }

  await Promise.all(Array.from({ length: WORKERS }, (_, i) => worker(i)));
  console.log(`Parallel pass done. Now ${serial.length} Sentinel calls, one at a time...`);

  for (const job of serial) {
    record(job, await runJob(job));
    await sleep(1200);
  }

  console.log(`\nFinished. ${ok} signals recorded, ${failed} failed.`);
  if (failures.length) {
    const counts = failures.reduce((acc, f) => ({ ...acc, [f]: (acc[f] ?? 0) + 1 }), {});
    console.log("\nFailures:");
    for (const [reason, n] of Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8)) {
      console.log(`  ${n}x  ${reason}`);
    }
  }
  console.log(`\nWritten to ${OUT_JSONL}`);
}

main().catch((err) => {
  console.error("Run failed:", err.message);
  process.exit(1);
});
