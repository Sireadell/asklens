// Second collection pass, appending to the same log with a fresh set of real
// inputs so no row repeats an earlier one. Same rules as the first pass: only
// responses that came back with a signal hash are written.
import { appendFileSync, readFileSync } from "node:fs";
import { initPayments, askMiner } from "../src/telegraph.js";
import { config } from "../src/config.js";

const OUT = "data/evidence-signals.jsonl";
const TXLENS = config.ownMiners.txlens.id;

const URLS = [
  "https://sourceforge.net", "https://gnu.org", "https://freebsd.org",
  "https://openbsd.org", "https://vim.org", "https://gnome.org",
  "https://kde.org", "https://blender.org", "https://inkscape.org",
  "https://gimp.org", "https://libreoffice.org", "https://videolan.org",
  "https://ffmpeg.org", "https://curl.se", "https://openssh.com",
  "https://haproxy.org", "https://varnish-cache.org", "https://rabbitmq.com",
  "https://kafka.apache.org", "https://cassandra.apache.org", "https://spark.apache.org",
  "https://hadoop.apache.org", "https://airflow.apache.org", "https://gradle.org",
  "https://maven.apache.org", "https://scala-lang.org", "https://kotlinlang.org",
  "https://swift.org", "https://ruby-lang.org", "https://php.net",
  "https://perl.org", "https://haskell.org", "https://elixir-lang.org",
  "https://erlang.org", "https://clojure.org", "https://julialang.org",
  "https://r-project.org", "https://tensorflow.org", "https://pytorch.org",
  "https://scikit-learn.org", "https://numpy.org", "https://pandas.pydata.org",
  "https://jupyter.org", "https://anaconda.com", "https://huggingface.co",
  "https://openai.com", "https://anthropic.com", "https://deepmind.com",
  "https://mit.edu", "https://stanford.edu", "https://harvard.edu",
  "https://ox.ac.uk", "https://cam.ac.uk", "https://ethz.ch",
];

const URL_MINERS = [
  { id: "7334", method: "GET", endpoint: "/url-scan", payload: (u) => ({ question: `Is ${u} safe?` }) },
  { id: "5001", method: "POST", endpoint: "/scan", payload: (u) => ({ url: u }) },
  { id: "20260828", method: "GET", endpoint: "/url-scan", payload: (u) => ({ url: u }) },
];

const COINS = [
  "tether", "binancecoin", "ripple", "tron", "toncoin", "hedera-hashgraph",
  "vechain", "theta-token", "elrond-erd-2", "flow", "kava", "zilliqa",
  "decentraland", "the-sandbox", "axie-infinity", "chiliz", "enjincoin",
];
const TICKERS = [
  "JPM", "BAC", "WFC", "GS", "MS", "V", "MA", "AXP",
  "JNJ", "PFE", "MRK", "ABBV", "LLY", "UNH", "CVS",
  "XOM", "CVX", "COP", "BP", "SHEL",
];
const DOMAINS = [
  "gnu.org", "curl.se", "openssh.com", "kernel.org", "debian.org",
  "ubuntu.com", "redhat.com", "suse.com", "archlinux.org", "gentoo.org",
  "pytorch.org", "tensorflow.org", "huggingface.co", "mit.edu", "stanford.edu",
];
const LOCATIONS = [
  "Abuja, Nigeria", "Accra, Ghana", "Kampala, Uganda", "Dakar, Senegal",
  "Casablanca, Morocco", "Addis Ababa, Ethiopia", "Dar es Salaam, Tanzania",
  "Lisbon, Portugal", "Dublin, Ireland", "Oslo, Norway", "Helsinki, Finland",
  "Warsaw, Poland", "Prague, Czechia", "Vienna, Austria", "Zurich, Switzerland",
  "Bangkok, Thailand", "Jakarta, Indonesia", "Manila, Philippines",
  "Hanoi, Vietnam", "Kuala Lumpur, Malaysia",
];
const IPS = [
  "208.67.222.123", "156.154.70.1", "156.154.71.1", "8.26.56.26",
  "8.20.247.20", "199.85.126.10", "199.85.127.10", "195.46.39.39",
  "195.46.39.40", "216.146.35.35", "216.146.36.36", "45.90.28.0",
];
const PROTOCOLS = [
  "spark", "morpho", "pendle", "eigenlayer", "ethena", "jito",
  "raydium", "orca", "marinade-finance", "benqi", "trader-joe",
];
const TOKENS = ["ARB", "OP", "LDO", "CRV", "SNX", "COMP", "GRT", "SAND"];
const TOPICS = [
  "graph neural networks", "reinforcement learning from human feedback",
  "topological insulators", "antibiotic resistance mechanisms",
  "exoplanet atmospheric spectroscopy", "gut microbiome and immunity",
  "lithium sulfur batteries", "photonic integrated circuits",
];
const CHAINS = ["avalanche", "bsc", "fantom", "celo"];

function buildJobs() {
  const jobs = [];
  for (const url of URLS) {
    for (const m of URL_MINERS) {
      jobs.push({ intent: "URL_SCAN", minerId: m.id, input: url, req: { method: m.method, endpoint: m.endpoint, payload: m.payload(url) } });
    }
  }
  const t = (intent, endpoint, param, values) => {
    for (const v of values) {
      jobs.push({ intent, minerId: TXLENS, input: v, req: { method: "GET", endpoint, payload: { [param]: v } } });
    }
  };
  t("CRYPTO_PRICE", "/crypto-price", "coin_id", COINS);
  t("STOCK_PRICE", "/stock-price", "ticker", TICKERS);
  t("SSL_VERIFICATION", "/ssl-check", "domain", DOMAINS);
  t("WEATHER_FORECAST", "/weather-forecast", "location", LOCATIONS);
  t("STORM_ALERT", "/storm-alert", "location", LOCATIONS);
  t("IP_GEOLOCATION", "/ip-geolocate", "ip", IPS);
  t("TVL_LOOKUP", "/tvl", "protocol", PROTOCOLS);
  t("TOKEN_HOLDER_COUNT", "/token-holders", "token", TOKENS);
  t("ACADEMIC_SEARCH", "/academic-search", "query", TOPICS);
  t("GAS_PRICE", "/gas-price", "chain", CHAINS);
  return jobs;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function runJob(job, attempt = 0) {
  try {
    const { body, settlement } = await askMiner(job.minerId, job.req, { timeoutMs: 25000 });
    if (!body?.signal_hash) return { ok: false };
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
    if (attempt < 2 && err.code === "PAYMENT_FAILED") {
      await sleep(1500);
      return runJob(job, attempt + 1);
    }
    return { ok: false };
  }
}

async function main() {
  initPayments();
  const seen = new Set(
    readFileSync(OUT, "utf8").split("\n").filter(Boolean).map((l) => {
      const r = JSON.parse(l);
      return `${r.intent}|${r.minerId}|${r.input}`;
    })
  );
  const jobs = buildJobs().filter((j) => !seen.has(`${j.intent}|${j.minerId}|${j.input}`));
  console.log(`${jobs.length} new calls (no repeats of the first pass).`);

  let ok = 0;
  let failed = 0;
  let cursor = 0;

  async function worker(id) {
    await sleep(id * 700);
    while (cursor < jobs.length) {
      const job = jobs[cursor++];
      const result = await runJob(job);
      if (result.ok) {
        ok += 1;
        appendFileSync(OUT, JSON.stringify(result.row) + "\n");
      } else {
        failed += 1;
      }
      if ((ok + failed) % 50 === 0) console.log(`${ok + failed}/${jobs.length} — ${ok} recorded`);
      await sleep(250);
    }
  }

  await Promise.all(Array.from({ length: 4 }, (_, i) => worker(i)));
  console.log(`\nTop-up finished. ${ok} added, ${failed} failed.`);
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
