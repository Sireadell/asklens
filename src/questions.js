// The question pool the watcher draws from.
//
// Every question here sits inside an intent one of our miners serves, so the
// router always has the option of picking us. Whether it does is the thing we
// are measuring. Questions are phrased the way a person would ask, not as bare
// parameters, because that is what the router actually classifies.
export const QUESTION_POOL = {
  ONCHAIN_TX_LOOKUP: [
    "Did transaction {tx} go through on Ethereum?",
    "What did the transaction {tx} do?",
    "Is {tx} confirmed or did it revert?",
  ],
  GAS_PRICE: [
    "What is the gas price on Ethereum right now?",
    "How much does a transaction cost on Base at the moment?",
    "Are gas fees high on Polygon right now?",
    "What is gas on Arbitrum?",
  ],
  WALLET_BALANCE_CHECK: [
    "How much ETH does the address 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 hold on Ethereum?",
    "What is the Ethereum balance of 0x28C6c06298d514Db089934071355E5743bf21d60?",
    "How much ether does 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 hold?",
  ],
  TOKEN_HOLDER_COUNT: [
    "How many wallets hold the token 0x6B175474E89094C44Da98b954EedeAC495271d0F on Ethereum?",
    "How many distinct addresses own USDC at 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48?",
    "What is the holder count for the token 0x514910771AF9Ca656af840dff83E8264EcF986CA?",
  ],
  TVL_LOOKUP: [
    "How much value is locked in Uniswap?",
    "What is the TVL of Aave?",
    "How much money is locked in Curve right now?",
    "What is the total value locked in Lido?",
  ],
  CRYPTO_PRICE: [
    "What is the price of Bitcoin in USD?",
    "How much is one ether worth in dollars?",
    "What is Solana trading at right now?",
    "What is the current USD price of Chainlink?",
  ],
  STOCK_PRICE: [
    "What is Tesla stock trading at?",
    "What is the current share price of NVDA?",
    "How much is Apple stock right now?",
  ],
  SSL_VERIFICATION: [
    "Is the SSL certificate for wikipedia.org valid?",
    "When does the TLS certificate for stripe.com expire?",
    "Who issued the certificate for github.com?",
    "Is the certificate for cloudflare.com trusted and still valid?",
  ],
  WEATHER_FORECAST: [
    "Will it rain in London tomorrow?",
    "What is the weather forecast for Tokyo over the next two days?",
    "How windy will it be in Lagos tomorrow?",
    "What is the temperature going to be in Cape Town this weekend?",
  ],
  STORM_ALERT: [
    "Is there any storm risk in Manila over the next 48 hours?",
    "How disruptive will the weather be in Miami in the next two days?",
    "Is a storm expected in Osaka over the next 48 hours?",
  ],
  IP_GEOLOCATION: [
    "Where is the IP address 8.8.4.4 and is it a VPN?",
    "What network does the IP 1.1.1.1 belong to?",
    "Is the IP address 104.16.132.229 a datacenter address, and where is it?",
  ],
  ACADEMIC_SEARCH: [
    "Find peer-reviewed papers about large language model hallucination",
    "What research has been published on CRISPR gene editing in humans?",
    "Show me academic studies on perovskite solar cell efficiency",
  ],
  WEB_SEARCH: [
    "Who is the current secretary general of the United Nations?",
    "What is the tallest building in the world right now?",
    "When was the James Webb Space Telescope launched?",
  ],
  FRAUD_DETECTION: [
    "Is the address 0x098B716B8Aaf21512996dC57EB0615e2383E2f96 linked to scams or sanctions?",
    "Check the wallet 0x7F367cC41522cE07553e823bf3be79A889DEbe1B for fraud risk",
    "Is 0x8589427373D6D84E98730D7795D8f6f8731FDA16 associated with any known criminal activity?",
  ],
};

// A transaction hash that stays valid: filled in at run time by the watcher so
// the ONCHAIN_TX_LOOKUP questions reference a real, recent transaction rather
// than a stale one nobody can look up.
export function fillTemplate(question, values) {
  return question.replace(/\{(\w+)\}/g, (whole, key) => values[key] ?? whole);
}

export function intentsCovered() {
  return Object.keys(QUESTION_POOL);
}

// Pick one question per intent, rotating by round so repeated runs do not send
// the identical string every time.
export function questionsForRound(round, values = {}) {
  return Object.entries(QUESTION_POOL).map(([intent, list]) => ({
    intent,
    question: fillTemplate(list[round % list.length], values),
  }));
}
