// The intents this app knows how to explain, and how to reach our own miners
// for a second opinion on each one.
//
// The `param` field is the query parameter each endpoint reads. TxLens accepts
// the caller's whole question in place of the structured value (see its
// miner.yaml description), so a second-opinion call can pass the raw question
// straight through rather than parsing it first.
export const INTENTS = {
  ONCHAIN_TX_LOOKUP: { label: "Transaction lookup", plain: "did this transaction go through", miner: "txlens", endpoint: "/check-tx", method: "GET", param: "tx_hash" },
  GAS_PRICE:         { label: "Gas price",          plain: "what a transaction costs right now", miner: "txlens", endpoint: "/gas-price", method: "GET", param: "chain" },
  WALLET_BALANCE_CHECK: { label: "Wallet balance",  plain: "how much a wallet holds", miner: "txlens", endpoint: "/wallet-balance", method: "GET", param: "address" },
  TOKEN_HOLDER_COUNT:{ label: "Token holders",      plain: "how many wallets hold a token", miner: "txlens", endpoint: "/token-holders", method: "GET", param: "token" },
  TVL_LOOKUP:        { label: "Value locked",       plain: "how much money is locked in a project", miner: "txlens", endpoint: "/tvl", method: "GET", param: "protocol" },
  CRYPTO_PRICE:      { label: "Crypto price",       plain: "what a coin is worth", miner: "txlens", endpoint: "/crypto-price", method: "GET", param: "coin_id" },
  STOCK_PRICE:       { label: "Stock price",        plain: "what a share is trading at", miner: "txlens", endpoint: "/stock-price", method: "GET", param: "ticker" },
  SSL_VERIFICATION:  { label: "Site certificate",   plain: "is a website's security certificate real", miner: "txlens", endpoint: "/ssl-check", method: "GET", param: "domain" },
  WEATHER_FORECAST:  { label: "Weather",            plain: "the forecast somewhere", miner: "txlens", endpoint: "/weather-forecast", method: "GET", param: "location" },
  STORM_ALERT:       { label: "Storm risk",         plain: "how rough the weather will get", miner: "txlens", endpoint: "/storm-alert", method: "GET", param: "location" },
  IP_GEOLOCATION:    { label: "IP location",        plain: "where an IP address is, and if it's a VPN", miner: "txlens", endpoint: "/ip-geolocate", method: "GET", param: "ip" },
  ACADEMIC_SEARCH:   { label: "Research papers",    plain: "real published papers on a topic", miner: "txlens", endpoint: "/academic-search", method: "GET", param: "query" },
  WEB_SEARCH:        { label: "Open question",      plain: "anything answerable from the live web", miner: "txlens", endpoint: "/web-search", method: "GET", param: "query" },
  FRAUD_DETECTION:   { label: "Fraud check",        plain: "is this address or scheme a scam", miner: "sentinel", endpoint: "/fraud-query", method: "POST", param: "query" },
};

export function intentInfo(intent) {
  return INTENTS[intent] ?? null;
}

// Example questions shown on the page, one per intent, so a first-time visitor
// can see the range without having to guess what the miners cover.
export const EXAMPLES = [
  "What is gas on Ethereum right now?",
  "What is Bitcoin worth today?",
  "Is the SSL certificate for github.com valid?",
  "Will it rain in London tomorrow?",
  "How much value is locked in Aave?",
  "What is NVDA trading at?",
  "Where is the IP address 8.8.8.8?",
  "Find peer-reviewed papers on perovskite solar cells",
];
