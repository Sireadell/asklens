// Accuracy benchmark: four questions per intent, each answer checked against
// ground truth fetched live at the same moment.
//
// This asks our miners directly, not through Telegraph. That is deliberate:
// direct calls are free, take a second or two, and do not enter the scoring
// pipeline, so we can measure honestly and as often as we like. Routing is a
// separate problem, measured by scripts/watch.mjs.
//
//   node scripts/benchmark.mjs
//   node scripts/benchmark.mjs --intent CRYPTO_PRICE
//   node scripts/benchmark.mjs --verbose
//
// Every check records where its truth came from and whether that source is
// independent of the one the miner used. A check against the miner's own
// upstream proves the plumbing works, not that the answer is right, and it is
// labelled "same-source" so nobody later reads it as stronger than it is.
import { appendFileSync, mkdirSync } from "node:fs";
import tls from "node:tls";

const TXLENS = "https://telegraph-onchain-tx-lookup-miner.onrender.com";
const SENTINEL = "https://telegraph-sentinel-40vp.onrender.com";
const OUT = "data/accuracy.jsonl";

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};
const only = arg("intent", null);
const verbose = process.argv.includes("--verbose");
const hard = process.argv.includes("--hard");

export const HARD_QUESTIONS = {
  ONCHAIN_TX_LOOKUP: [
    "Prove from the Ethereum receipt whether {tx} actually succeeded, rather than merely being included.",
    "Decode what the Ethereum transaction {tx} attempted and report its final execution status.",
    "Could {tx} be confirmed on Ethereum while its execution still reverted? Check the receipt and decide.",
  ],
  GAS_PRICE: [
    "Using the latest Ethereum block conditions, what gas price would be reasonable right now?",
    "I need to submit an Ethereum transaction immediately. What is the current gas price in gwei?",
    "Are Ethereum fees genuinely elevated at this moment, and what live gas-price number supports that?",
  ],
  WALLET_BALANCE_CHECK: [
    "Read Ethereum at the latest block and give the exact native balance of 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045.",
    "Without estimating from past transfers, how much ETH is currently held by 0x28C6c06298d514Db089934071355E5743bf21d60?",
    "Return both human-readable ETH and exact wei for 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 on Ethereum.",
  ],
  TOKEN_HOLDER_COUNT: [
    "Count distinct current Ethereum holders of DAI contract 0x6B175474E89094C44Da98b954EedeAC495271d0F.",
    "How many unique addresses currently hold any USDC at 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48?",
    "Give the live holder count, not supply, for LINK contract 0x514910771AF9Ca656af840dff83E8264EcF986CA.",
  ],
  TVL_LOOKUP: [
    "What is Uniswap's aggregate live TVL across every chain, in USD?",
    "Report Aave's present total value locked, not market capitalization or borrowed value.",
    "How much capital is currently locked in Curve DEX across its deployments?",
  ],
  CRYPTO_PRICE: [
    "Quote one whole bitcoin in US dollars now, and do not confuse it with a wrapped token.",
    "How many US dollars is one ether worth at this moment?",
    "Give Solana's live USD spot price rather than its market cap.",
  ],
  STOCK_PRICE: [
    "What was the latest executable-looking TSLA share quote, not Tesla's market cap?",
    "Quote NVDA in USD using the freshest available market price.",
    "How much does one AAPL share cost now, distinguishing it from Apple's company valuation?",
  ],
  SSL_VERIFICATION: [
    "Perform a live TLS handshake with wikipedia.org and tell me whether the served certificate is valid.",
    "What exact expiry date is on the certificate stripe.com is serving right now?",
    "Identify the issuer and expiry of github.com's currently served TLS certificate.",
  ],
  WEATHER_FORECAST: [
    "Will measurable rain fall in London tomorrow, based on the latest forecast window?",
    "Give Tokyo's high, low, rain, and wind outlook for the next two calendar days.",
    "What peak wind and gust speeds are forecast for Lagos tomorrow?",
  ],
  STORM_ALERT: [
    "Assess Manila's next 48 hours for thunderstorm, gust, and flooding disruption risk.",
    "Could Miami operations be disrupted by severe weather during the next 48 hours? Quantify the risk.",
    "Does Osaka face a meaningful storm threat in the coming 48 hours, including rain and peak gusts?",
  ],
  IP_GEOLOCATION: [
    "Geolocate 8.8.4.4 and identify its network owner plus whether it appears to be hosting or VPN infrastructure.",
    "Which country and autonomous network currently announce 1.1.1.1?",
    "For 104.16.132.229, distinguish the physical city estimate from the organization operating the address.",
  ],
  ACADEMIC_SEARCH: [
    "Find peer-reviewed journal literature that surveys hallucination taxonomies in large language models.",
    "Which peer-reviewed human studies discuss CRISPR gene editing, clinical use, and safety?",
    "Find highly cited peer-reviewed work measuring perovskite solar-cell efficiency improvements.",
  ],
  WEB_SEARCH: [
    "Verify from a current authoritative source who presently serves as UN secretary-general.",
    "Give the exact launch date of the James Webb Space Telescope and distinguish launch from deployment.",
    "Without confusing the element name with its symbol, what is tungsten's chemical symbol?",
  ],
  FRAUD_DETECTION: [
    "Assess whether 0x098B716B8Aaf21512996dC57EB0615e2383E2f96 has a documented sanctions or exploit connection.",
    "Is 0x8589427373D6D84E98730D7795D8f6f8731FDA16 tied to a known illicit entity, or merely suspicious by heuristics?",
    "Look for evidence before deciding whether 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 should be labelled criminal.",
  ],
};

const getJson = async (url, opts = {}) => {
  const res = await fetch(url, { signal: AbortSignal.timeout(45000), ...opts });
  return res.json();
};

// ---- ground-truth sources -------------------------------------------------

const rpc = async (method, params) => {
  const body = await getJson("https://eth.drpc.org", {
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

// A real TLS handshake, from this machine, right now. Nothing shared with the
// miner's path to the same certificate.
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

// ---- the cases ------------------------------------------------------------
//
// Four per intent, varied in phrasing on purpose: the engine sends prose, so a
// benchmark of bare parameters would flatter us.

export function buildCases(tx) {
  return [
    // --- ONCHAIN_TX_LOOKUP: chain receipt is definitive -------------------
    ...[
      `Did transaction ${tx} go through on Ethereum?`,
      `What did the transaction ${tx} do?`,
      `Is ${tx} confirmed or did it revert?`,
      tx,
    ].map((q) => ({
      intent: "ONCHAIN_TX_LOOKUP", base: TXLENS, path: "/tvl_unused", endpoint: "/check-tx", param: "tx_hash", question: q,
      check: async (b) => {
        const receipt = await rpc("eth_getTransactionReceipt", [tx]);
        if (!receipt) return unver("chain returned no receipt", "eth.drpc.org");
        const expected = receipt.status === "0x1" ? "success" : "reverted";
        const got = b.receipt_status ?? b.status;
        return got === expected
          ? pass(expected, got, "eth.drpc.org receipt", true)
          : fail(expected, got, "eth.drpc.org receipt", true);
      },
    })),

    // --- GAS_PRICE: gas moves per block, so this is a sanity band ---------
    ...["What is the gas price on Ethereum right now?", "How much does a transaction cost on Ethereum at the moment?", "Are gas fees high on Ethereum?", "eth"].map((q) => ({
      intent: "GAS_PRICE", base: TXLENS, endpoint: "/gas-price", param: "chain", question: q,
      check: async (b) => {
        const hex = await rpc("eth_gasPrice", []);
        const expected = Number(BigInt(hex)) / 1e9;
        const got = Number(b.gas_price_gwei);
        // Gas re-prices every block, so a tight tolerance would fail on
        // timing rather than on correctness. 40% catches a wrong chain or a
        // stale cache without punishing normal drift.
        return within(got, expected, 0.4)
          ? pass(`${expected.toFixed(4)} gwei`, `${got.toFixed(4)} gwei`, "eth.drpc.org eth_gasPrice", true, "40% band, gas moves per block")
          : fail(`${expected.toFixed(4)} gwei`, `${got.toFixed(4)} gwei`, "eth.drpc.org eth_gasPrice", true);
      },
    })),

    // --- WALLET_BALANCE_CHECK: exact wei, the strongest check we have -----
    ...[
      ["How much ETH does 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 hold?", "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"],
      ["What is the Ethereum balance of 0x28C6c06298d514Db089934071355E5743bf21d60?", "0x28C6c06298d514Db089934071355E5743bf21d60"],
      ["How much ether does 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 hold?", "0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8"],
      ["0x098B716B8Aaf21512996dC57EB0615e2383E2f96", "0x098B716B8Aaf21512996dC57EB0615e2383E2f96"],
    ].map(([q, addr]) => ({
      intent: "WALLET_BALANCE_CHECK", base: TXLENS, endpoint: "/wallet-balance", param: "address", question: q,
      check: async (b) => {
        const hex = await rpc("eth_getBalance", [addr, "latest"]);
        const expected = BigInt(hex).toString();
        const got = String(b.balance_wei);
        return got === expected
          ? pass(`${expected} wei`, `${got} wei`, "eth.drpc.org eth_getBalance", true, "exact wei match")
          : fail(`${expected} wei`, `${got} wei`, "eth.drpc.org eth_getBalance", true);
      },
    })),

    // --- TOKEN_HOLDER_COUNT: same upstream as the miner, so labelled ------
    ...[
      ["How many wallets hold DAI at 0x6B175474E89094C44Da98b954EedeAC495271d0F?", "0x6B175474E89094C44Da98b954EedeAC495271d0F"],
      ["How many distinct addresses own USDC at 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48?", "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"],
      ["What is the holder count for 0x514910771AF9Ca656af840dff83E8264EcF986CA?", "0x514910771AF9Ca656af840dff83E8264EcF986CA"],
      ["0x6B175474E89094C44Da98b954EedeAC495271d0F", "0x6B175474E89094C44Da98b954EedeAC495271d0F"],
    ].map(([q, token]) => ({
      intent: "TOKEN_HOLDER_COUNT", base: TXLENS, endpoint: "/token-holders", param: "token", question: q,
      check: async (b) => {
        const expected = await blockscoutHolders(token);
        if (expected === null) return unver("Blockscout returned no holder count", "blockscout");
        const got = Number(b.holders_count);
        return within(got, expected, 0.02)
          ? pass(expected, got, "eth.blockscout.com", false, "same upstream as the miner: proves plumbing, not truth")
          : fail(expected, got, "eth.blockscout.com", false);
      },
    })),

    // --- TVL_LOOKUP: same upstream, labelled ------------------------------
    ...[
      ["How much value is locked in Uniswap?", "uniswap"],
      ["What is the TVL of Aave?", "aave"],
      ["How much money is locked in Curve right now?", "curve-dex"],
      ["What is the total value locked in Lido?", "lido"],
    ].map(([q, slug]) => ({
      intent: "TVL_LOOKUP", base: TXLENS, endpoint: "/tvl", param: "protocol", question: q,
      check: async (b) => {
        const expected = await defillama(slug);
        if (expected === null) return unver(`DefiLlama had no slug ${slug}`, "api.llama.fi");
        const got = Number(b.tvl_usd);
        return within(got, expected, 0.03)
          ? pass(Math.round(expected), Math.round(got), "api.llama.fi", false, "same upstream as the miner")
          : fail(Math.round(expected), Math.round(got), "api.llama.fi", false);
      },
    })),

    // --- CRYPTO_PRICE: CoinGecko, independent of CoinPaprika --------------
    ...[
      ["What is the price of Bitcoin in USD?", "bitcoin"],
      ["How much is one ether worth in dollars?", "ethereum"],
      ["What is Solana trading at right now?", "solana"],
      ["What is the current USD price of Chainlink?", "chainlink"],
    ].map(([q, id]) => ({
      intent: "CRYPTO_PRICE", base: TXLENS, endpoint: "/crypto-price", param: "coin_id", question: q,
      check: async (b) => {
        const expected = await coingecko(id);
        if (expected === null) return unver("CoinGecko returned no price", "coingecko");
        const got = Number(b.price_usd);
        return within(got, expected, 0.03)
          ? pass(expected, got, "coingecko", true, "miner reads CoinPaprika, so this is independent")
          : fail(expected, got, "coingecko", true);
      },
    })),

    // --- STOCK_PRICE: Nasdaq, independent of Twelve Data and Yahoo --------
    ...[
      ["What is Tesla stock trading at?", "TSLA"],
      ["What is the current share price of NVDA?", "NVDA"],
      ["How much is Apple stock right now?", "AAPL"],
      ["MSFT", "MSFT"],
    ].map(([q, ticker]) => ({
      intent: "STOCK_PRICE", base: TXLENS, endpoint: "/stock-price", param: "ticker", question: q,
      check: async (b) => {
        const expected = await nasdaq(ticker);
        if (expected === null) return unver("Nasdaq returned no live price", "nasdaq.com");
        const got = Number(b.price_usd);
        return within(got, expected, 0.03)
          ? pass(expected, got, "nasdaq.com", true, "live Nasdaq quote, independent of the miner's providers")
          : fail(expected, got, "nasdaq.com", true);
      },
    })),

    // --- SSL_VERIFICATION: our own TLS handshake --------------------------
    ...[
      ["Is the SSL certificate for wikipedia.org valid?", "wikipedia.org"],
      ["When does the TLS certificate for stripe.com expire?", "stripe.com"],
      ["Who issued the certificate for github.com?", "github.com"],
      ["Is the certificate for cloudflare.com trusted and still valid?", "cloudflare.com"],
    ].map(([q, host]) => ({
      intent: "SSL_VERIFICATION", base: TXLENS, endpoint: "/ssl-check", param: "domain", question: q,
      check: async (b) => {
        const truth = await tlsCert(host);
        if (!truth?.validTo) return unver("our own handshake failed", "node tls");
        const expectedExpiry = new Date(truth.validTo).toISOString().slice(0, 10);
        const gotExpiry = b.valid_to ? String(b.valid_to).slice(0, 10) : null;
        const okExpiry = expectedExpiry === gotExpiry;
        const okValid = b.valid === true || b.category === "valid";
        return okExpiry && okValid
          ? pass(`valid, expires ${expectedExpiry}`, `${b.category}, expires ${gotExpiry}`, "live TLS handshake from this machine", true)
          : fail(`valid, expires ${expectedExpiry}`, `${b.category}, expires ${gotExpiry}`, "live TLS handshake from this machine", true);
      },
    })),

    // --- WEATHER_FORECAST: Open-Meteo, likely the miner's own source ------
    ...[
      ["Will it rain in London tomorrow?", 51.5074, -0.1278],
      ["What is the weather forecast for Tokyo over the next two days?", 35.6895, 139.6917],
      ["How windy will it be in Lagos tomorrow?", 6.4541, 3.3947],
      ["What is the temperature going to be in Cape Town this weekend?", -33.9249, 18.4241],
    ].map(([q, lat, lon]) => ({
      intent: "WEATHER_FORECAST", base: TXLENS, endpoint: "/weather-forecast", param: "location", question: q,
      check: async (b) => {
        const truth = await openMeteo(lat, lon);
        const highs = truth?.daily?.temperature_2m_max;
        if (!highs?.length) return unver("Open-Meteo returned no daily highs", "open-meteo");
        const expected = Math.max(...highs);
        const got = Number(b.temp_max_c);
        // Two degrees absolute, because the miner may cover a different number
        // of days and pick its maximum over a different window.
        return Number.isFinite(got) && Math.abs(got - expected) <= 2
          ? pass(`${expected}C max`, `${got}C max`, "open-meteo", false, "probably the miner's own source; 2C band")
          : fail(`${expected}C max`, `${got}C max`, "open-meteo", false);
      },
    })),

    // --- STORM_ALERT: gusts against Open-Meteo ----------------------------
    ...[
      ["Is there any storm risk in Manila over the next 48 hours?", 14.5995, 120.9842],
      ["How disruptive will the weather be in Miami in the next two days?", 25.7617, -80.1918],
      ["Is a storm expected in Osaka over the next 48 hours?", 34.6937, 135.5023],
      ["What is the storm risk in Reykjavik over the next 48 hours?", 64.1466, -21.9426],
    ].map(([q, lat, lon]) => ({
      intent: "STORM_ALERT", base: TXLENS, endpoint: "/storm-alert", param: "location", question: q,
      check: async (b) => {
        const truth = await openMeteo(lat, lon);
        const gusts = truth?.daily?.wind_gusts_10m_max?.slice(0, 2);
        if (!gusts?.length) return unver("Open-Meteo returned no gust data", "open-meteo");
        const expected = Math.max(...gusts);
        const got = Number(b.peak_gust_kmh);
        return within(got, expected, 0.25)
          ? pass(`${expected} km/h peak gust`, `${got} km/h`, "open-meteo", false, "probably the miner's own source; 25% band")
          : fail(`${expected} km/h peak gust`, `${got} km/h`, "open-meteo", false);
      },
    })),

    // --- IP_GEOLOCATION: ipinfo, independent ------------------------------
    ...[
      ["Where is the IP address 8.8.4.4 and is it a VPN?", "8.8.4.4"],
      ["What network does the IP 1.1.1.1 belong to?", "1.1.1.1"],
      ["Is the IP address 104.16.132.229 a datacenter address, and where is it?", "104.16.132.229"],
      ["9.9.9.9", "9.9.9.9"],
    ].map(([q, ip]) => ({
      intent: "IP_GEOLOCATION", base: TXLENS, endpoint: "/ip-geolocate", param: "ip", question: q,
      check: async (b) => {
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
    })),

    // --- ACADEMIC_SEARCH: OpenAlex confirms the papers are real -----------
    ...[
      "Find peer-reviewed papers about large language model hallucination",
      "What research has been published on CRISPR gene editing in humans?",
      "Show me academic studies on perovskite solar cell efficiency",
      "CRISPR gene editing",
    ].map((q) => ({
      intent: "ACADEMIC_SEARCH", base: TXLENS, endpoint: "/academic-search", param: "query", question: q,
      check: async (b) => {
        if (b.status !== "ok") return fail("papers returned", `status ${b.status}`, "miner response", true, "refused the question");
        const papers = b.papers ?? b.results ?? b.articles ?? [];
        if (!papers.length) return fail("at least one paper", "none listed", "miner response", true);
        const title = papers[0].title ?? papers[0].name;
        if (!title) return unver("paper had no title to verify", "openalex");
        const doi = String(papers[0].doi ?? "").replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, "");
        if (doi) {
          const resolved = await fetch(`https://doi.org/${doi}`, {
            redirect: "manual",
            signal: AbortSignal.timeout(30000),
          });
          if (resolved.ok || (resolved.status >= 300 && resolved.status < 400)) {
            return pass("paper DOI resolves", doi, "doi.org", true, "confirms the cited paper exists");
          }
        }
        const found = await getJson(`https://api.openalex.org/works?search=${encodeURIComponent(title.slice(0, 80))}&per_page=1`);
        const real = (found?.results?.length ?? 0) > 0;
        return real
          ? pass("paper exists in OpenAlex", `"${title.slice(0, 50)}" found`, "api.openalex.org", true, "confirms the paper is real, not invented")
          : fail("paper exists in OpenAlex", `"${title.slice(0, 50)}" not found`, "api.openalex.org", true);
      },
    })),

    // --- WEB_SEARCH: facts with settled answers ---------------------------
    ...[
      ["Who is the current secretary general of the United Nations?", ["guterres"]],
      ["When was the James Webb Space Telescope launched?", ["2021", "december"]],
      ["What is the chemical symbol for tungsten?", ["w"]],
      ["What is the capital city of Australia?", ["canberra"]],
    ].map(([q, needles]) => ({
      intent: "WEB_SEARCH", base: TXLENS, endpoint: "/web-search", param: "query", question: q,
      check: async (b) => {
        const text = JSON.stringify(b).toLowerCase();
        const hit = needles.every((n) => text.includes(n));
        return hit
          ? pass(needles.join(" + "), "present in answer", "settled public fact", true)
          : fail(needles.join(" + "), (b.answer ?? b.summary ?? "").slice(0, 60), "settled public fact", true);
      },
    })),

    // --- FRAUD_DETECTION: OFAC designations and clean controls ------------
    // Two sanctioned addresses that must read as high risk, and two ordinary
    // ones that must not. A checker that only tested known-bad addresses could
    // be passed by a miner that answers "high risk" to everything.
    ...[
      ["Is 0x098B716B8Aaf21512996dC57EB0615e2383E2f96 linked to scams or sanctions?", true, "Ronin Bridge exploiter, OFAC-designated April 2022"],
      ["Check 0x8589427373D6D84E98730D7795D8f6f8731FDA16 for fraud risk", true, "Tornado Cash related, OFAC-designated August 2022"],
      ["Is 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 associated with criminal activity?", false, "public, widely-known ordinary address"],
      ["Is 0x28C6c06298d514Db089934071355E5743bf21d60 a scam address?", false, "major exchange hot wallet"],
    ].map(([q, expectRisk, why]) => ({
      intent: "FRAUD_DETECTION", base: SENTINEL, endpoint: "/fraud-query", param: "query", method: "POST", question: q,
      check: async (b) => {
        const text = `${b.summary ?? ""} ${b.answer ?? ""}`.toLowerCase();
        const high = /high risk|sanction|sanctioned|known-scam|known scam/.test(text);
        const low = /low risk|no .*(match|evidence|indicators)|not .*(flagged|linked)|clean/.test(text);
        const got = high ? "high" : low ? "low" : "unclear";
        const okay = expectRisk ? high : !high;
        return okay
          ? pass(expectRisk ? "high risk" : "not high risk", got, "OFAC designation record", true, why)
          : fail(expectRisk ? "high risk" : "not high risk", got, "OFAC designation record", true, why);
      },
    })),
  ];
}

// ---- runner ---------------------------------------------------------------

async function askMiner(c) {
  const started = Date.now();
  try {
    const res = c.method === "POST"
      ? await fetch(`${c.base}${c.endpoint}`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ [c.param]: c.question }),
          signal: AbortSignal.timeout(60000),
        })
      : await fetch(`${c.base}${c.endpoint}?${new URLSearchParams({ [c.param]: c.question })}`, { signal: AbortSignal.timeout(60000) });
    return { body: await res.json(), ms: Date.now() - started, httpStatus: res.status };
  } catch (err) {
    return { body: null, ms: Date.now() - started, error: err.message };
  }
}

export async function recentTransaction() {
  const block = await rpc("eth_getBlockByNumber", ["latest", false]);
  return block?.transactions?.[0] ?? null;
}

async function runBenchmark() {
const tx = await recentTransaction();

if (!tx) console.warn("Could not fetch a recent transaction hash; those cases will be skipped.\n");

let cases = buildCases(tx).filter((c) => (!only || c.intent === only) && (tx || c.intent !== "ONCHAIN_TX_LOOKUP"));
if (hard) {
  const seen = new Map();
  cases = cases.flatMap((c) => {
    const index = seen.get(c.intent) ?? 0;
    seen.set(c.intent, index + 1);
    const question = HARD_QUESTIONS[c.intent]?.[index];
    return question ? [{ ...c, question: question.replaceAll('{tx}', tx ?? '{tx}') }] : [];
  });
}
const results = [];
let current = "";

for (const c of cases) {
  if (c.intent !== current) {
    current = c.intent;
    console.log(`\n${c.intent}`);
  }
  const asked = await askMiner(c);
  let outcome;
  if (!asked.body) {
    outcome = { verdict: "FAIL", expected: "a response", got: asked.error ?? "no body", source: null, independent: null, note: "request failed" };
  } else {
    try {
      outcome = await c.check(asked.body);
    } catch (err) {
      outcome = unver(`checker error: ${err.message}`);
    }
  }

  const mark = outcome.verdict === "PASS" ? "PASS" : outcome.verdict === "FAIL" ? "FAIL" : "----";
  const indep = outcome.independent === false ? " [same-source]" : "";
  console.log(`  ${mark}  ${String(asked.ms).padStart(5)}ms  ${c.question.slice(0, 58)}`);
  if (outcome.verdict !== "PASS" || verbose) {
    console.log(`          expected ${outcome.expected}`);
    console.log(`          got      ${outcome.got}`);
    console.log(`          truth    ${outcome.source ?? "-"}${indep}${outcome.note ? ` (${outcome.note})` : ""}`);
  }

  results.push({ intent: c.intent, question: c.question, ms: asked.ms, ...outcome });
}

mkdirSync("data", { recursive: true });
appendFileSync(OUT, `${JSON.stringify({ at: new Date().toISOString(), results })}\n`);

// ---- summary --------------------------------------------------------------

const byIntent = new Map();
for (const r of results) {
  if (!byIntent.has(r.intent)) byIntent.set(r.intent, { pass: 0, fail: 0, unver: 0, slowest: 0 });
  const row = byIntent.get(r.intent);
  if (r.verdict === "PASS") row.pass += 1;
  else if (r.verdict === "FAIL") row.fail += 1;
  else row.unver += 1;
  row.slowest = Math.max(row.slowest, r.ms);
}

console.log(`\n${"=".repeat(74)}`);
console.log("intent                  pass  fail  unverified  slowest  independent truth?");
for (const [intent, r] of byIntent) {
  const anyIndep = results.some((x) => x.intent === intent && x.independent === true);
  console.log(
    `${intent.padEnd(22)} ${String(r.pass).padStart(5)} ${String(r.fail).padStart(5)} ${String(r.unver).padStart(11)}` +
    ` ${String(r.slowest + "ms").padStart(8)}  ${anyIndep ? "yes" : "no, same source"}`
  );
}

const p = results.filter((r) => r.verdict === "PASS").length;
const f = results.filter((r) => r.verdict === "FAIL").length;
const u = results.length - p - f;
console.log(`\n${p} passed, ${f} failed, ${u} unverified, out of ${results.length}.`);
if (f) {
  console.log("\nFailures:");
  for (const r of results.filter((x) => x.verdict === "FAIL")) {
    console.log(`  ${r.intent.padEnd(22)} ${r.question.slice(0, 50)}`);
    console.log(`      wanted ${r.expected} / got ${r.got}`);
  }
}
}

if (process.argv[1] && import.meta.url === new URL(`file:///${process.argv[1].replaceAll("\\", "/")}`).href) {
  await runBenchmark();
}
console.log(`\nAppended to ${OUT}.`);
