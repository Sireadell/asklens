// 100 hard questions, sent through live Telegraph, one at a time.
//
// Why this exists: benchmark.mjs asks our miners directly, which is free and
// fast but skips the router entirely. This one goes through the paid
// /ask endpoint, so it measures the thing that actually matters: when a real
// question arrives, does Telegraph route it to us, and is our answer right.
//
// Every ask costs $0.01 in test USDC, so a full run is about $1.00.
//
// Requests are spaced out deliberately. Telegraph asks callers not to spam the
// engine, so the default is one question every 30 seconds with jitter, which
// puts a full run at roughly an hour. Tune with --delay.
//
//   node scripts/telegraph-100.mjs --dry-run        print the questions, send nothing
//   node scripts/telegraph-100.mjs                  full run, 30s spacing
//   node scripts/telegraph-100.mjs --delay 45       slower
//   node scripts/telegraph-100.mjs --limit 10       first 10 only
//   node scripts/telegraph-100.mjs --start 41       resume partway
//   node scripts/telegraph-100.mjs --intent GAS_PRICE
import { appendFileSync, mkdirSync, writeFileSync } from "node:fs";
import tls from "node:tls";
import { ask, initPayments } from "../src/telegraph.js";

const OUT_JSONL = "data/telegraph-100.jsonl";
const OUT_MD = "data/telegraph-100-latest.md";

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};
const dryRun = process.argv.includes("--dry-run");
const delaySec = Number(arg("delay", 30));
const jitterSec = Number(arg("jitter", 10));
const limit = Number(arg("limit", 0));
const startAt = Number(arg("start", 1));
const onlyIntent = arg("intent", null);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- ground-truth sources -------------------------------------------------
// Copied rather than imported: importing benchmark.mjs runs its own benchmark
// as a side effect and writes to data/accuracy.jsonl.

const getJson = async (url, opts = {}) => {
  const res = await fetch(url, { signal: AbortSignal.timeout(45000), ...opts });
  return res.json();
};

const RPC = {
  ethereum: "https://eth.drpc.org",
  base: "https://base.drpc.org",
  arbitrum: "https://arbitrum.drpc.org",
  optimism: "https://optimism.drpc.org",
  polygon: "https://polygon.drpc.org",
};

const rpc = async (method, params, chain = "ethereum") => {
  const body = await getJson(RPC[chain], {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  return body.result;
};

const coingecko = async (id) => {
  const d = await getJson(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`);
  return d?.[id]?.usd ?? null;
};

const nasdaq = async (ticker) => {
  const d = await getJson(`https://api.nasdaq.com/api/quote/${ticker}/info?assetclass=stocks`, {
    headers: {
      "user-agent": "Mozilla/5.0",
      accept: "application/json, text/plain, */*",
      origin: "https://www.nasdaq.com",
      referer: "https://www.nasdaq.com/",
    },
  });
  const raw = d?.data?.primaryData?.lastSalePrice;
  const n = Number(String(raw ?? "").replace(/[$,]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
};

const defillama = async (slug) => {
  const res = await fetch(`https://api.llama.fi/tvl/${slug}`, { signal: AbortSignal.timeout(30000) });
  const n = Number(await res.text());
  return Number.isFinite(n) ? n : null;
};

const blockscoutHolders = async (token) => {
  const d = await getJson(`https://eth.blockscout.com/api/v2/tokens/${token}`);
  const n = Number(d?.holders ?? d?.holders_count);
  return Number.isFinite(n) ? n : null;
};

const openMeteo = async (lat, lon) => getJson(
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
  `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_gusts_10m_max&forecast_days=3&timezone=auto`
);

const ipinfo = async (ip) => getJson(`https://ipinfo.io/${ip}/json`);

const tlsCert = (host) => new Promise((resolve) => {
  const socket = tls.connect({ host, port: 443, servername: host, timeout: 15000 }, () => {
    const cert = socket.getPeerCertificate();
    socket.end();
    resolve({ issuer: cert?.issuer?.O ?? null, validTo: cert?.valid_to ?? null });
  });
  socket.on("error", () => resolve(null));
  socket.on("timeout", () => { socket.destroy(); resolve(null); });
});

// ---- comparison helpers ---------------------------------------------------

const within = (got, expected, tolerance) => {
  if (!Number.isFinite(got) || !Number.isFinite(expected) || expected === 0) return false;
  return Math.abs(got - expected) / Math.abs(expected) <= tolerance;
};

const pass = (expected, got, source, independent, note) => ({ verdict: "PASS", expected, got, source, independent, note });
const fail = (expected, got, source, independent, note) => ({ verdict: "FAIL", expected, got, source, independent, note });
const unver = (note, source) => ({ verdict: "UNVERIFIED", expected: null, got: null, source: source ?? null, independent: null, note });

// ---- one checker per intent, parameterised by the subject asked about -----
// Each records where its truth came from and whether that source is
// independent of the one the miner reads, so a same-source check is never
// read later as stronger proof than it is.

// Any miner on the network can win a question, and they do not agree on field
// names or wording. ChainSight reports a settled transaction as status "ok"
// where TxLens says "success", which a literal comparison marks wrong. These
// two helpers read the meaning instead of the exact string, so the report
// measures answers rather than vocabulary.

const NUM_IN_TEXT = /-?\d[\d,]*(?:\.\d+)?/;

// Look through the field names miners actually use, then fall back to the
// first number in the prose answer.
const num = (b, names) => {
  for (const name of names) {
    const raw = b?.[name];
    if (raw === undefined || raw === null) continue;
    const n = Number(String(raw).replace(/[$,%\s]/g, ""));
    if (Number.isFinite(n)) return n;
  }
  const text = String(b?.answer ?? b?.summary ?? b?.signal ?? "");
  const hit = text.match(NUM_IN_TEXT);
  return hit ? Number(hit[0].replaceAll(",", "")) : NaN;
};

const txStatus = (b) => {
  const raw = String(b?.receipt_status ?? b?.status ?? "").toLowerCase();
  const text = `${raw} ${String(b?.answer ?? b?.summary ?? b?.signal ?? "")}`.toLowerCase();
  if (/revert|failed|failure|\bfail\b/.test(text)) return "reverted";
  if (/success|succeeded|\bok\b|confirmed|settled|went through|executed/.test(text)) return "success";
  if (/pending|not found|unknown/.test(text)) return raw || "pending";
  return raw || "unclear";
};

const CHECKERS = {
  ONCHAIN_TX_LOOKUP: async (tx, b) => {
    const receipt = await rpc("eth_getTransactionReceipt", [tx]);
    if (!receipt) return unver("chain returned no receipt yet", "eth.drpc.org");
    const expected = receipt.status === "0x1" ? "success" : "reverted";
    const got = txStatus(b);
    return got === expected
      ? pass(expected, got, "eth.drpc.org receipt", true, "receipt status is definitive")
      : fail(expected, got, "eth.drpc.org receipt", true);
  },

  GAS_PRICE: async (chain, b) => {
    const hex = await rpc("eth_gasPrice", [], chain);
    if (!hex) return unver(`no gas price from the ${chain} node`, RPC[chain]);
    const expected = Number(BigInt(hex)) / 1e9;
    const got = num(b, ["gas_price_gwei", "gasPriceGwei", "gas_price", "gasPrice", "price_gwei", "gwei"]);
    // Gas re-prices every block, so a tight band would fail on timing rather
    // than on correctness. 40% catches a wrong chain or a stale cache.
    return within(got, expected, 0.4)
      ? pass(`${expected.toFixed(4)} gwei`, `${got.toFixed(4)} gwei`, `${RPC[chain]} eth_gasPrice`, true, "40% band, gas moves per block")
      : fail(`${expected.toFixed(4)} gwei`, `${got.toFixed(4)} gwei`, `${RPC[chain]} eth_gasPrice`, true);
  },

  WALLET_BALANCE_CHECK: async (addr, b) => {
    const hex = await rpc("eth_getBalance", [addr, "latest"]);
    if (!hex) return unver("no balance returned", "eth.drpc.org");
    const expectedWei = BigInt(hex).toString();
    // Exact wei is the strongest check we have, so prefer it when the miner
    // reports it. Miners that only return a rounded ETH figure get compared in
    // ETH instead, tightly, rather than being marked wrong for the omission.
    const gotWei = b.balance_wei ?? b.balanceWei ?? b.wei ?? null;
    if (gotWei !== null && gotWei !== undefined) {
      const got = String(gotWei);
      return got === expectedWei
        ? pass(`${expectedWei} wei`, `${got} wei`, "eth.drpc.org eth_getBalance", true, "exact wei match")
        : fail(`${expectedWei} wei`, `${got} wei`, "eth.drpc.org eth_getBalance", true);
    }
    const expectedEth = Number(BigInt(hex)) / 1e18;
    const gotEth = num(b, ["balance_eth", "balanceEth", "balance", "native_balance", "eth"]);
    return within(gotEth, expectedEth, 0.0001)
      ? pass(`${expectedEth} ETH`, `${gotEth} ETH`, "eth.drpc.org eth_getBalance", true, "no wei field returned, compared in ETH at 0.01%")
      : fail(`${expectedEth} ETH`, `${gotEth} ETH`, "eth.drpc.org eth_getBalance", true, "no wei field returned");
  },

  TOKEN_HOLDER_COUNT: async (token, b) => {
    const expected = await blockscoutHolders(token);
    if (expected === null) return unver("Blockscout returned no holder count", "blockscout");
    const got = num(b, ["holders_count", "holdersCount", "holders", "holder_count", "unique_holders"]);
    return within(got, expected, 0.02)
      ? pass(expected, got, "eth.blockscout.com", false, "same upstream as the miner: proves plumbing, not truth")
      : fail(expected, got, "eth.blockscout.com", false);
  },

  TVL_LOOKUP: async (slug, b) => {
    const expected = await defillama(slug);
    if (expected === null) return unver(`DefiLlama had no slug ${slug}`, "api.llama.fi");
    const got = num(b, ["tvl_usd", "tvlUsd", "tvl", "total_value_locked", "value_locked_usd"]);
    return within(got, expected, 0.03)
      ? pass(Math.round(expected), Math.round(got), "api.llama.fi", false, "same upstream as the miner")
      : fail(Math.round(expected), Math.round(got), "api.llama.fi", false);
  },

  CRYPTO_PRICE: async (id, b) => {
    const expected = await coingecko(id);
    if (expected === null) return unver("CoinGecko returned no price", "coingecko");
    const got = num(b, ["price_usd", "priceUsd", "price", "usd", "spot_price"]);
    return within(got, expected, 0.03)
      ? pass(expected, got, "coingecko", true, "the miner reads CoinPaprika, so this is independent")
      : fail(expected, got, "coingecko", true);
  },

  STOCK_PRICE: async (ticker, b) => {
    const expected = await nasdaq(ticker);
    if (expected === null) return unver("Nasdaq returned no live price, likely outside market hours", "nasdaq.com");
    const got = num(b, ["price_usd", "priceUsd", "price", "last_price", "lastSalePrice"]);
    return within(got, expected, 0.03)
      ? pass(expected, got, "nasdaq.com", true, "live Nasdaq quote, independent of the providers the miner uses")
      : fail(expected, got, "nasdaq.com", true);
  },

  SSL_VERIFICATION: async (host, b) => {
    const truth = await tlsCert(host);
    if (!truth?.validTo) return unver("our own handshake failed", "node tls");
    const expectedExpiry = new Date(truth.validTo).toISOString().slice(0, 10);
    const rawExpiry = b.valid_to ?? b.validTo ?? b.expires_at ?? b.expiry ?? b.not_after ?? null;
    const gotExpiry = rawExpiry ? new Date(rawExpiry).toISOString().slice(0, 10) : null;
    const okExpiry = expectedExpiry === gotExpiry;
    const validText = `${b.category ?? ""} ${b.answer ?? ""} ${b.summary ?? ""}`.toLowerCase();
    const okValid = b.valid === true || b.is_valid === true || /valid|trusted/.test(validText);
    return okExpiry && okValid
      ? pass(`valid, expires ${expectedExpiry}`, `${b.category}, expires ${gotExpiry}`, "live TLS handshake from this machine", true)
      : fail(`valid, expires ${expectedExpiry}`, `${b.category}, expires ${gotExpiry}`, "live TLS handshake from this machine", true);
  },

  WEATHER_FORECAST: async ([lat, lon], b) => {
    const truth = await openMeteo(lat, lon);
    const highs = truth?.daily?.temperature_2m_max;
    if (!highs?.length) return unver("Open-Meteo returned no daily highs", "open-meteo");
    const expected = Math.max(...highs);
    const got = num(b, ["temp_max_c", "tempMaxC", "temperature_max_c", "high_c", "max_temp_c"]);
    // Two degrees absolute, because the miner may pick its maximum over a
    // different number of days than we do.
    return Number.isFinite(got) && Math.abs(got - expected) <= 2
      ? pass(`${expected}C max`, `${got}C max`, "open-meteo", false, "probably the same source the miner uses; 2C band")
      : fail(`${expected}C max`, `${got}C max`, "open-meteo", false);
  },

  STORM_ALERT: async ([lat, lon], b) => {
    const truth = await openMeteo(lat, lon);
    const gusts = truth?.daily?.wind_gusts_10m_max?.slice(0, 2);
    if (!gusts?.length) return unver("Open-Meteo returned no gust data", "open-meteo");
    const expected = Math.max(...gusts);
    const got = num(b, ["peak_gust_kmh", "peakGustKmh", "gust_kmh", "max_gust_kmh", "wind_gust_kmh"]);
    return within(got, expected, 0.25)
      ? pass(`${expected} km/h peak gust`, `${got} km/h`, "open-meteo", false, "probably the same source the miner uses; 25% band")
      : fail(`${expected} km/h peak gust`, `${got} km/h`, "open-meteo", false);
  },

  IP_GEOLOCATION: async (ip, b) => {
    const truth = await ipinfo(ip);
    if (!truth?.country) return unver("ipinfo returned no country", "ipinfo.io");
    const asnTruth = (truth.org ?? "").match(/AS(\d+)/)?.[1] ?? null;
    const asnGot = String(b.asn ?? b.isp ?? "").match(/AS(\d+)/)?.[1] ?? null;
    const okCountry = b.country_code === truth.country;
    const okAsn = asnTruth && asnGot ? asnTruth === asnGot : true;
    return okCountry && okAsn
      ? pass(`${truth.country} / AS${asnTruth}`, `${b.country_code} / AS${asnGot}`, "ipinfo.io", true, "country and network operator")
      : fail(`${truth.country} / AS${asnTruth}`, `${b.country_code} / AS${asnGot}`, "ipinfo.io", true);
  },

  ACADEMIC_SEARCH: async (_subject, b) => {
    if (b.status && b.status !== "ok") return fail("papers returned", `status ${b.status}`, "miner response", true, "refused the question");
    const papers = b.papers ?? b.results ?? b.articles ?? [];
    if (!papers.length) return fail("at least one paper", "none listed", "miner response", true);
    const title = papers[0].title ?? papers[0].name;
    if (!title) return unver("paper had no title to verify", "openalex");
    const doi = String(papers[0].doi ?? "").replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, "");
    if (doi) {
      const resolved = await fetch(`https://doi.org/${doi}`, { redirect: "manual", signal: AbortSignal.timeout(30000) });
      if (resolved.ok || (resolved.status >= 300 && resolved.status < 400)) {
        return pass("paper DOI resolves", doi, "doi.org", true, "confirms the cited paper exists");
      }
    }
    const found = await getJson(`https://api.openalex.org/works?search=${encodeURIComponent(title.slice(0, 80))}&per_page=1`);
    return (found?.results?.length ?? 0) > 0
      ? pass("paper exists in OpenAlex", `"${title.slice(0, 50)}" found`, "api.openalex.org", true, "confirms the paper is real, not invented")
      : fail("paper exists in OpenAlex", `"${title.slice(0, 50)}" not found`, "api.openalex.org", true);
  },

  WEB_SEARCH: async (needles, b) => {
    const text = JSON.stringify(b).toLowerCase();
    const hit = needles.every((n) => text.includes(n));
    return hit
      ? pass(needles.join(" + "), "present in answer", "settled public fact", true)
      : fail(needles.join(" + "), (b.answer ?? b.summary ?? "").slice(0, 60), "settled public fact", true);
  },

  // A checker that only tested known-bad addresses could be passed by a miner
  // that answers "high risk" to everything, so clean controls are mixed in.
  FRAUD_DETECTION: async ({ expectRisk, why }, b) => {
    const text = `${b.summary ?? ""} ${b.answer ?? ""} ${b.risk_level ?? ""} ${b.category ?? ""}`.toLowerCase();
    const high = /high risk|sanction|sanctioned|known-scam|known scam|illicit/.test(text);
    const low = /low risk|no .*(match|evidence|indicators)|not .*(flagged|linked)|clean/.test(text);
    const got = high ? "high" : low ? "low" : "unclear";
    const okay = expectRisk ? high : !high;
    return okay
      ? pass(expectRisk ? "high risk" : "not high risk", got, "OFAC designation record", true, why)
      : fail(expectRisk ? "high risk" : "not high risk", got, "OFAC designation record", true, why);
  },
};

// ---- the 100 questions ----------------------------------------------------
//
// Seven or eight per intent, deliberately uneven in phrasing and length. The
// engine routes on prose, so a set of bare parameters would flatter us: a
// question that already names the parameter is barely a routing test at all.
// Several are written to punish a plausible-sounding guess, by asking for the
// thing next to the obvious answer (holder count rather than supply, TVL
// rather than market cap, execution status rather than inclusion).
//
// {tx0} through {tx7} are filled at run time with real hashes pulled from
// recent Ethereum blocks, so the transaction cases are never stale.

const QUESTIONS = [
  // --- ONCHAIN_TX_LOOKUP ---------------------------------------------------
  { intent: "ONCHAIN_TX_LOOKUP", subject: "{tx0}", q: "I need to know whether {tx0} actually executed on Ethereum, not just whether it made it into a block. Which is it?" },
  { intent: "ONCHAIN_TX_LOOKUP", subject: "{tx1}", q: "Pull the receipt for {tx1} and tell me what the transaction was trying to do and how it ended." },
  { intent: "ONCHAIN_TX_LOOKUP", subject: "{tx2}", q: "A transaction can sit in a confirmed block and still have reverted. Is that what happened with {tx2}?" },
  { intent: "ONCHAIN_TX_LOOKUP", subject: "{tx3}", q: "Someone sent me {tx3} as proof of payment. Does the chain back that up?" },
  { intent: "ONCHAIN_TX_LOOKUP", subject: "{tx4}", q: "What is the final execution status of {tx4} on mainnet, and how many blocks deep is it now?" },
  { intent: "ONCHAIN_TX_LOOKUP", subject: "{tx5}", q: "Is {tx5} still pending, or has Ethereum settled it one way or the other?" },
  { intent: "ONCHAIN_TX_LOOKUP", subject: "{tx6}", q: "Look up {tx6} and tell me plainly whether it succeeded. I do not want a maybe." },
  { intent: "ONCHAIN_TX_LOOKUP", subject: "{tx7}", q: "Check {tx7} against the Ethereum receipt and report both its status and what it moved." },

  // --- GAS_PRICE -----------------------------------------------------------
  { intent: "GAS_PRICE", subject: "ethereum", q: "I want to send an Ethereum transaction in the next couple of minutes. What is gas costing right now in gwei?" },
  { intent: "GAS_PRICE", subject: "base", q: "How much am I paying per unit of gas on Base at this moment?" },
  { intent: "GAS_PRICE", subject: "arbitrum", q: "Is Arbitrum cheap to transact on right this second? Give me the actual gas number, not a general impression." },
  { intent: "GAS_PRICE", subject: "optimism", q: "What is the live gas price on Optimism, in gwei?" },
  { intent: "GAS_PRICE", subject: "polygon", q: "Polygon fees felt high yesterday. What are they at now?" },
  { intent: "GAS_PRICE", subject: "ethereum", q: "People keep saying Ethereum fees are spiking. Is that actually true at this moment, and what number shows it?" },
  { intent: "GAS_PRICE", subject: "base", q: "Comparing like for like, what does one unit of gas cost on Base right now?" },

  // --- WALLET_BALANCE_CHECK ------------------------------------------------
  { intent: "WALLET_BALANCE_CHECK", subject: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", q: "Read Ethereum at the latest block and give me the exact native balance of 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045." },
  { intent: "WALLET_BALANCE_CHECK", subject: "0x28C6c06298d514Db089934071355E5743bf21d60", q: "Without adding up past transfers, how much ETH does 0x28C6c06298d514Db089934071355E5743bf21d60 hold today?" },
  { intent: "WALLET_BALANCE_CHECK", subject: "0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8", q: "Give me both the readable ETH figure and the exact wei for 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8." },
  { intent: "WALLET_BALANCE_CHECK", subject: "0x2910543Af39abA0Cd09dBb2D50200b3E800A63D2", q: "What is sitting in 0x2910543Af39abA0Cd09dBb2D50200b3E800A63D2 right now? Native coin only, ignore tokens." },
  { intent: "WALLET_BALANCE_CHECK", subject: "0x876EabF441B2EE5B5b0554Fd502a8E0600950cFa", q: "Balance check on 0x876EabF441B2EE5B5b0554Fd502a8E0600950cFa please, as of the current block rather than a cached snapshot." },
  { intent: "WALLET_BALANCE_CHECK", subject: "0x8315177aB297bA92A06054cE80a67Ed4DBd7ed3a", q: "How much ether is held at 0x8315177aB297bA92A06054cE80a67Ed4DBd7ed3a?" },
  { intent: "WALLET_BALANCE_CHECK", subject: "0x098B716B8Aaf21512996dC57EB0615e2383E2f96", q: "I want the current on-chain ETH balance for 0x098B716B8Aaf21512996dC57EB0615e2383E2f96, whatever else that address is known for." },

  // --- TOKEN_HOLDER_COUNT --------------------------------------------------
  { intent: "TOKEN_HOLDER_COUNT", subject: "0x6B175474E89094C44Da98b954EedeAC495271d0F", q: "How many separate addresses currently hold DAI at 0x6B175474E89094C44Da98b954EedeAC495271d0F? I mean holders, not supply." },
  { intent: "TOKEN_HOLDER_COUNT", subject: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", q: "Give me the number of unique wallets holding any amount of USDC at 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48." },
  { intent: "TOKEN_HOLDER_COUNT", subject: "0x514910771AF9Ca656af840dff83E8264EcF986CA", q: "For LINK at 0x514910771AF9Ca656af840dff83E8264EcF986CA, what is the live holder count?" },
  { intent: "TOKEN_HOLDER_COUNT", subject: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", q: "How widely distributed is WETH? I am after the count of distinct holders of 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2." },
  { intent: "TOKEN_HOLDER_COUNT", subject: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", q: "Count the addresses holding UNI at 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984 right now." },
  { intent: "TOKEN_HOLDER_COUNT", subject: "0xdAC17F958D2ee523a2206206994597C13D831ec7", q: "Tether on Ethereum, contract 0xdAC17F958D2ee523a2206206994597C13D831ec7: how many holders does it have?" },
  { intent: "TOKEN_HOLDER_COUNT", subject: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE", q: "SHIB at 0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE is meant to have a huge holder base. What is the actual number?" },

  // --- TVL_LOOKUP ----------------------------------------------------------
  { intent: "TVL_LOOKUP", subject: "uniswap", q: "What is the total value locked in Uniswap across all the chains it is deployed on, in dollars?" },
  { intent: "TVL_LOOKUP", subject: "aave", q: "How much is locked in Aave at the moment? Not its market cap, and not the amount borrowed." },
  { intent: "TVL_LOOKUP", subject: "curve-dex", q: "How much capital is sitting in Curve right now across its deployments?" },
  { intent: "TVL_LOOKUP", subject: "lido", q: "Give me the current TVL figure for Lido in USD." },
  { intent: "TVL_LOOKUP", subject: "balancer", q: "What is Balancer holding in total value locked today?" },
  { intent: "TVL_LOOKUP", subject: "sushi", q: "Is there still meaningful capital in Sushi? Give me the live TVL number." },
  { intent: "TVL_LOOKUP", subject: "convex-finance", q: "How much value is locked in Convex Finance at present?" },

  // --- CRYPTO_PRICE --------------------------------------------------------
  { intent: "CRYPTO_PRICE", subject: "bitcoin", q: "Price one whole bitcoin in US dollars as of now, and do not give me a wrapped or bridged version of it." },
  { intent: "CRYPTO_PRICE", subject: "ethereum", q: "What is ether worth in dollars right this moment?" },
  { intent: "CRYPTO_PRICE", subject: "solana", q: "Give me the live spot price of Solana in USD. Spot price, not market cap." },
  { intent: "CRYPTO_PRICE", subject: "chainlink", q: "What is LINK trading at in dollars?" },
  { intent: "CRYPTO_PRICE", subject: "cardano", q: "Current USD price for Cardano please." },
  { intent: "CRYPTO_PRICE", subject: "avalanche-2", q: "How much is one AVAX in dollars right now?" },
  { intent: "CRYPTO_PRICE", subject: "dogecoin", q: "What is dogecoin worth in USD at the moment?" },
  { intent: "CRYPTO_PRICE", subject: "uniswap", q: "Quote the UNI token in US dollars. I mean the token, not the protocol TVL." },

  // --- STOCK_PRICE ---------------------------------------------------------
  { intent: "STOCK_PRICE", subject: "TSLA", q: "What is one TSLA share going for on the latest quote? Share price, not the market cap of Tesla." },
  { intent: "STOCK_PRICE", subject: "NVDA", q: "Give me NVDA in dollars at the freshest price you can get." },
  { intent: "STOCK_PRICE", subject: "AAPL", q: "How much does a single Apple share cost right now?" },
  { intent: "STOCK_PRICE", subject: "MSFT", q: "Latest traded price on MSFT please." },
  { intent: "STOCK_PRICE", subject: "AMZN", q: "What is Amazon stock at today?" },
  { intent: "STOCK_PRICE", subject: "GOOGL", q: "Current quote for GOOGL in USD." },
  { intent: "STOCK_PRICE", subject: "META", q: "Where is META trading as of the most recent print?" },

  // --- SSL_VERIFICATION ----------------------------------------------------
  { intent: "SSL_VERIFICATION", subject: "wikipedia.org", q: "Do a real handshake with wikipedia.org and tell me whether the certificate it serves is valid." },
  { intent: "SSL_VERIFICATION", subject: "stripe.com", q: "What is the exact expiry date on the certificate stripe.com is presenting right now?" },
  { intent: "SSL_VERIFICATION", subject: "github.com", q: "Who issued the TLS certificate github.com is currently serving, and when does it run out?" },
  { intent: "SSL_VERIFICATION", subject: "cloudflare.com", q: "Is cloudflare.com serving a trusted, still-valid certificate?" },
  { intent: "SSL_VERIFICATION", subject: "bbc.co.uk", q: "Check the live certificate on bbc.co.uk. Valid or not, and expiring when?" },
  { intent: "SSL_VERIFICATION", subject: "nytimes.com", q: "I want the certificate details nytimes.com is actually serving today, not what a scan cached last week." },
  { intent: "SSL_VERIFICATION", subject: "mozilla.org", q: "Verify the TLS setup on mozilla.org and give me the issuer plus the expiry." },

  // --- WEATHER_FORECAST ----------------------------------------------------
  { intent: "WEATHER_FORECAST", subject: [51.5074, -0.1278], q: "Is it going to actually rain in London tomorrow, or just look like it?" },
  { intent: "WEATHER_FORECAST", subject: [35.6895, 139.6917], q: "Give me the high, the low, the rain and the wind for Tokyo over the next two days." },
  { intent: "WEATHER_FORECAST", subject: [6.4541, 3.3947], q: "How windy is Lagos going to get tomorrow?" },
  { intent: "WEATHER_FORECAST", subject: [-33.9249, 18.4241], q: "What temperatures should I expect in Cape Town over the next couple of days?" },
  { intent: "WEATHER_FORECAST", subject: [43.6532, -79.3832], q: "Toronto forecast for tomorrow please, with the expected high." },
  { intent: "WEATHER_FORECAST", subject: [19.076, 72.8777], q: "Should I plan around rain in Mumbai over the next two days?" },
  { intent: "WEATHER_FORECAST", subject: [52.52, 13.405], q: "What is the outlook for Berlin tomorrow, temperature and precipitation both?" },

  // --- STORM_ALERT ---------------------------------------------------------
  { intent: "STORM_ALERT", subject: [14.5995, 120.9842], q: "Assess Manila over the next 48 hours for storm disruption. I care about gusts and flooding, not the average temperature." },
  { intent: "STORM_ALERT", subject: [25.7617, -80.1918], q: "Could severe weather disrupt things in Miami in the next two days? Put a number on it." },
  { intent: "STORM_ALERT", subject: [34.6937, 135.5023], q: "Is Osaka facing a real storm threat in the coming 48 hours?" },
  { intent: "STORM_ALERT", subject: [64.1466, -21.9426], q: "How rough is the next 48 hours looking in Reykjavik, wind especially?" },
  { intent: "STORM_ALERT", subject: [29.7604, -95.3698], q: "Houston over the next two days: any storm risk worth rescheduling for?" },
  { intent: "STORM_ALERT", subject: [23.8103, 90.4125], q: "What is the storm and flooding risk in Dhaka across the next 48 hours?" },
  { intent: "STORM_ALERT", subject: [-36.8485, 174.7633], q: "Auckland, next 48 hours. Peak gusts and whether it counts as disruptive." },

  // --- IP_GEOLOCATION ------------------------------------------------------
  { intent: "IP_GEOLOCATION", subject: "8.8.4.4", q: "Where does 8.8.4.4 sit geographically, who runs the network, and does it look like VPN or hosting infrastructure?" },
  { intent: "IP_GEOLOCATION", subject: "1.1.1.1", q: "Which country and which network currently announce 1.1.1.1?" },
  { intent: "IP_GEOLOCATION", subject: "104.16.132.229", q: "For 104.16.132.229, separate the physical city estimate from the organisation that actually operates the address." },
  { intent: "IP_GEOLOCATION", subject: "9.9.9.9", q: "Locate 9.9.9.9 and tell me whose network it belongs to." },
  { intent: "IP_GEOLOCATION", subject: "208.67.222.222", q: "Is 208.67.222.222 a datacenter address, and where does it resolve to?" },
  { intent: "IP_GEOLOCATION", subject: "8.8.8.8", q: "Country and autonomous system for 8.8.8.8 please." },
  { intent: "IP_GEOLOCATION", subject: "1.0.0.1", q: "I keep seeing 1.0.0.1 in logs. Where is it and who owns it?" },

  // --- ACADEMIC_SEARCH -----------------------------------------------------
  { intent: "ACADEMIC_SEARCH", subject: "llm hallucination", q: "Find me peer-reviewed journal work that surveys how hallucination in large language models gets categorised." },
  { intent: "ACADEMIC_SEARCH", subject: "crispr clinical safety", q: "Which peer-reviewed human studies cover CRISPR gene editing in a clinical setting and its safety record?" },
  { intent: "ACADEMIC_SEARCH", subject: "perovskite efficiency", q: "I want highly cited peer-reviewed papers measuring efficiency gains in perovskite solar cells." },
  { intent: "ACADEMIC_SEARCH", subject: "antibiotic resistance mechanisms", q: "Point me at real published research on the mechanisms behind antibiotic resistance in gram-negative bacteria." },
  { intent: "ACADEMIC_SEARCH", subject: "transformer interpretability", q: "Is there serious peer-reviewed literature on interpretability methods for transformer models? Give me actual papers." },
  { intent: "ACADEMIC_SEARCH", subject: "ocean acidification coral", q: "Find published studies on how ocean acidification affects coral calcification." },
  { intent: "ACADEMIC_SEARCH", subject: "solid state battery electrolyte", q: "What peer-reviewed work exists on solid-state battery electrolytes and their conductivity limits?" },

  // --- WEB_SEARCH ----------------------------------------------------------
  { intent: "WEB_SEARCH", subject: ["guterres"], q: "Who is currently serving as secretary general of the United Nations?" },
  { intent: "WEB_SEARCH", subject: ["2021", "december"], q: "When exactly was the James Webb Space Telescope launched?" },
  { intent: "WEB_SEARCH", subject: ["w"], q: "What is the chemical symbol for tungsten, and why is it that rather than the obvious one?" },
  { intent: "WEB_SEARCH", subject: ["canberra"], q: "Which city is the capital of Australia? Not the biggest city, the capital." },
  { intent: "WEB_SEARCH", subject: ["1969"], q: "In what year did humans first land on the Moon?" },
  { intent: "WEB_SEARCH", subject: ["pacific"], q: "Which ocean is the deepest point on Earth found in?" },
  { intent: "WEB_SEARCH", subject: ["mercury"], q: "Which planet in our solar system is closest to the Sun?" },

  // --- FRAUD_DETECTION -----------------------------------------------------
  { intent: "FRAUD_DETECTION", subject: { expectRisk: true, why: "Ronin Bridge exploiter, OFAC-designated April 2022" }, q: "Is 0x098B716B8Aaf21512996dC57EB0615e2383E2f96 tied to a known theft or a sanctions listing, or is that just rumour?" },
  { intent: "FRAUD_DETECTION", subject: { expectRisk: true, why: "Tornado Cash related, OFAC-designated August 2022" }, q: "Run a fraud risk check on 0x8589427373D6D84E98730D7795D8f6f8731FDA16 and tell me what the evidence actually is." },
  { intent: "FRAUD_DETECTION", subject: { expectRisk: true, why: "Tornado Cash proxy, OFAC-designated August 2022" }, q: "Before I interact with 0x722122dF12D4e14e13Ac3b6895a86e84145b6967, is there anything on it I should know?" },
  { intent: "FRAUD_DETECTION", subject: { expectRisk: false, why: "public, widely-known ordinary address" }, q: "Look for evidence before deciding whether 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 deserves to be labelled criminal." },
  { intent: "FRAUD_DETECTION", subject: { expectRisk: false, why: "major exchange hot wallet, high volume is not fraud" }, q: "Is 0x28C6c06298d514Db089934071355E5743bf21d60 a scam address? It moves a lot of money, which is not the same thing." },
  { intent: "FRAUD_DETECTION", subject: { expectRisk: false, why: "exchange wallet, no designation" }, q: "Any sanctions or scam reports against 0x2910543Af39abA0Cd09dBb2D50200b3E800A63D2?" },
  { intent: "FRAUD_DETECTION", subject: { expectRisk: false, why: "canonical bridge contract, not an illicit actor" }, q: "Should I treat 0x8315177aB297bA92A06054cE80a67Ed4DBd7ed3a as risky, or is it a legitimate contract?" },
];

// ---- runner ---------------------------------------------------------------

const clean = (value) => String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ").trim();
const short = (value, max = 150) => {
  const text = clean(value);
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
};

// Eight real hashes from the most recent blocks, so the transaction questions
// are about something that happened minutes ago rather than a fixed fixture
// that may have been indexed by everyone already.
async function recentTransactions(count) {
  const found = [];
  let blockNumber = await rpc("eth_blockNumber", []);
  if (!blockNumber) return found;
  let n = BigInt(blockNumber);
  while (found.length < count && n > 0n) {
    const block = await rpc("eth_getBlockByNumber", [`0x${n.toString(16)}`, false]);
    for (const hash of block?.transactions ?? []) {
      if (found.length < count) found.push(hash);
    }
    n -= 1n;
  }
  return found;
}

const txHashes = await recentTransactions(8);
if (txHashes.length < 8 && !dryRun) {
  throw new Error(`Only found ${txHashes.length} recent transactions, needed 8.`);
}

const fill = (text) => text.replace(/\{tx(\d)\}/g, (_m, i) => txHashes[Number(i)] ?? `{tx${i}}`);

let cases = QUESTIONS.map((c, i) => ({
  number: i + 1,
  intent: c.intent,
  subject: typeof c.subject === "string" ? fill(c.subject) : c.subject,
  question: fill(c.q),
})).filter((c) => c.number >= startAt && (!onlyIntent || c.intent === onlyIntent));
if (limit > 0) cases = cases.slice(0, limit);

if (dryRun) {
  console.log(`${QUESTIONS.length} questions total, ${cases.length} selected. Nothing is being sent.\n`);
  let current = "";
  for (const c of cases) {
    if (c.intent !== current) {
      current = c.intent;
      console.log(`\n${c.intent}`);
    }
    console.log(`  ${String(c.number).padStart(3)}. ${c.question}`);
  }
  const minutes = Math.round((cases.length * (delaySec + jitterSec / 2)) / 60);
  console.log(`\nA real run would cost about $${(cases.length * 0.01).toFixed(2)} in test USDC and take roughly ${minutes} minutes at the current spacing.`);
  process.exit(0);
}

initPayments();

console.log(`Sending ${cases.length} questions through live Telegraph, about ${delaySec}s apart plus up to ${jitterSec}s of jitter.`);
console.log(`Estimated cost $${(cases.length * 0.01).toFixed(2)} in test USDC, estimated wall time ${Math.round((cases.length * (delaySec + jitterSec / 2)) / 60)} minutes.\n`);

const results = [];
for (const [position, c] of cases.entries()) {
  const started = Date.now();
  let row;
  try {
    const { body, settlement } = await ask(c.question);
    let quality;
    try {
      quality = await CHECKERS[c.intent](c.subject, body.result ?? {});
    } catch (error) {
      quality = unver(`checker error: ${error.message}`, null);
    }
    const routedIntent = body.intent ?? null;
    const routingCorrect = routedIntent === c.intent;
    const reasonParts = [];
    if (!routingCorrect) reasonParts.push(`routed to ${routedIntent ?? "unknown"} instead`);
    if (quality.note) reasonParts.push(quality.note);
    if (quality.verdict === "FAIL") reasonParts.push(`expected ${short(quality.expected, 60)}, got ${short(quality.got, 60)}`);
    row = {
      number: c.number,
      intent: c.intent,
      question: c.question,
      expectedIntent: c.intent,
      routedIntent,
      routingCorrect,
      minerId: body.miner_id ?? null,
      miner: body.miner_name ?? null,
      wonByUs: /txlens|sentinel/i.test(String(body.miner_name ?? "")),
      endpoint: body.endpoint ?? null,
      answer: body.result ?? null,
      verdict: quality.verdict,
      expected: quality.expected,
      got: quality.got,
      source: quality.source,
      independent: quality.independent,
      reason: reasonParts.join("; ") || "live answer matched ground truth",
      durationMs: body.duration_ms ?? Date.now() - started,
      signalHash: body.signal_hash ?? null,
      paymentTx: settlement?.transaction ?? settlement?.tx ?? null,
    };
  } catch (error) {
    row = {
      number: c.number,
      intent: c.intent,
      question: c.question,
      expectedIntent: c.intent,
      routedIntent: null,
      routingCorrect: false,
      minerId: null,
      miner: null,
      wonByUs: false,
      endpoint: null,
      answer: null,
      verdict: "FAIL",
      expected: "a paid Telegraph answer",
      got: error.message,
      source: null,
      independent: null,
      reason: `request failed: ${error.message}`,
      durationMs: Date.now() - started,
      signalHash: null,
      paymentTx: null,
    };
  }
  results.push(row);
  console.log(
    `${String(c.number).padStart(3)}/${QUESTIONS.length} ${row.verdict.padEnd(11)} ${c.intent.padEnd(21)} -> ${String(row.routedIntent ?? "none").padEnd(21)} ${row.miner ?? "no miner"}`
  );

  // Space the calls out. Telegraph asks callers not to hammer the engine, and
  // a fixed interval would also mean every question lands in the same slice of
  // the minute, which tells us less about behaviour under varied timing.
  const isLast = position === cases.length - 1;
  if (!isLast) {
    const waitMs = (delaySec + Math.random() * jitterSec) * 1000;
    await sleep(waitMs);
  }
}

// ---- report ---------------------------------------------------------------

const run = { at: new Date().toISOString(), transactionsUsed: txHashes, spacing: { delaySec, jitterSec }, results };
mkdirSync("data", { recursive: true });
appendFileSync(OUT_JSONL, `${JSON.stringify(run)}\n`);

const passed = results.filter((r) => r.verdict === "PASS").length;
const failed = results.filter((r) => r.verdict === "FAIL").length;
const unverified = results.length - passed - failed;
const routed = results.filter((r) => r.routingCorrect).length;
const ours = results.filter((r) => r.wonByUs).length;

const byIntent = [...new Set(results.map((r) => r.intent))].map((intent) => {
  const rows = results.filter((r) => r.intent === intent);
  return {
    intent,
    total: rows.length,
    pass: rows.filter((r) => r.verdict === "PASS").length,
    fail: rows.filter((r) => r.verdict === "FAIL").length,
    routed: rows.filter((r) => r.routingCorrect).length,
    ours: rows.filter((r) => r.wonByUs).length,
  };
});

const lines = [
  "# Telegraph live run, 100 hard questions",
  "",
  `Run: ${run.at}`,
  `Spacing: one question every ${delaySec}s plus up to ${jitterSec}s jitter.`,
  "",
  `Answer quality: ${passed} PASS, ${failed} FAIL, ${unverified} UNVERIFIED out of ${results.length}.`,
  `Routing: ${routed}/${results.length} reached the intent the question was written for.`,
  `Won by our miners: ${ours}/${results.length}.`,
  "",
  "## By intent",
  "",
  "| Intent | Asked | Pass | Fail | Routed as expected | Answered by us |",
  "|---|---:|---:|---:|---:|---:|",
  ...byIntent.map((s) => `| ${s.intent} | ${s.total} | ${s.pass} | ${s.fail} | ${s.routed} | ${s.ours} |`),
  "",
  "## Every question",
  "",
  "| # | Expected intent | Routed intent | Miner | Quality | Question | Reason |",
  "|---:|---|---|---|---|---|---|",
  ...results.map(
    (r) =>
      `| ${r.number} | ${clean(r.expectedIntent)} | ${clean(r.routedIntent) || "none"} | ${clean(r.miner) || "none"} (${clean(r.minerId) || "n/a"}) | ${r.verdict} | ${short(r.question, 120)} | ${short(r.reason, 180)} |`
  ),
  "",
  "## Evidence",
  "",
  ...results.map(
    (r) =>
      `### ${r.number}. ${r.intent}\n\n- Question: ${clean(r.question)}\n- Signal: ${r.signalHash ?? "none"}\n- Ground truth source: ${clean(r.source) || "none"}${r.independent === false ? " (same upstream as the miner)" : ""}\n- Expected: ${short(r.expected, 500)}\n- Got: ${short(r.got, 500)}\n- Payment: ${r.paymentTx ?? "none"}\n`
  ),
];
writeFileSync(OUT_MD, `${lines.join("\n")}\n`);

console.log(`\n${passed} PASS, ${failed} FAIL, ${unverified} UNVERIFIED. Routed as expected ${routed}/${results.length}. Answered by our miners ${ours}/${results.length}.`);
console.log(`Saved ${OUT_JSONL} and ${OUT_MD}`);
