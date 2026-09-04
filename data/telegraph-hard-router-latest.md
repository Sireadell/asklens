# Telegraph live auto-router hard-question report

Run: 2026-09-02T18:16:47.954Z

Answer quality: 25 PASS, 17 FAIL, 0 UNVERIFIED out of 42. Routing: 31/42 matched the expected intent.

| # | Expected intent | Routed intent | Miner | Quality | Question | Reason |
|---:|---|---|---|---|---|---|
| 1 | ONCHAIN_TX_LOOKUP | ONCHAIN_TX_LOOKUP | ChainSight — On-Chain Intelligence Hub (302) | PASS | Prove from the Ethereum receipt whether 0x00b731a98c3286f0945c6a913341811a622185f4521aa5d997473584ff927fdc actually s... | Live answer matched ground truth. |
| 2 | ONCHAIN_TX_LOOKUP | ONCHAIN_TX_LOOKUP | ChainSight — On-Chain Intelligence Hub (302) | PASS | Decode what the Ethereum transaction 0x00b731a98c3286f0945c6a913341811a622185f4521aa5d997473584ff927fdc attempted and... | Live answer matched ground truth. |
| 3 | ONCHAIN_TX_LOOKUP | ONCHAIN_TX_LOOKUP | ChainSight — On-Chain Intelligence Hub (302) | PASS | Could 0x00b731a98c3286f0945c6a913341811a622185f4521aa5d997473584ff927fdc be confirmed on Ethereum while its execution... | Live answer matched ground truth. |
| 4 | GAS_PRICE | GAS_PRICE | OnChain Intel Miner (900) | PASS | Using the latest Ethereum block conditions, what gas price would be reasonable right now? | Live answer matched ground truth. |
| 5 | GAS_PRICE | GAS_PRICE | OnChain Intel Miner (900) | PASS | I need to submit an Ethereum transaction immediately. What is the current gas price in gwei? | Live answer matched ground truth. |
| 6 | GAS_PRICE | GAS_PRICE | OnChain Intel Miner (900) | PASS | Are Ethereum fees genuinely elevated at this moment, and what live gas-price number supports that? | Live answer matched ground truth. |
| 7 | WALLET_BALANCE_CHECK | WALLET_BALANCE_CHECK | ChainWire Wallet Balance (7303) | FAIL | Read Ethereum at the latest block and give the exact native balance of 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045. | Answered for Base instead of the Ethereum balance explicitly requested. |
| 8 | WALLET_BALANCE_CHECK | TOKEN_HOLDER_COUNT | ChainWire Token Holder Count (7302) | FAIL | Without estimating from past transfers, how much ETH is currently held by 0x28C6c06298d514Db089934071355E5743bf21d60? | Misrouted as a token-holder request and returned no wallet balance. |
| 9 | WALLET_BALANCE_CHECK | CRYPTO_PRICE | Telegraph Sentinel Risk Intelligence (501) | FAIL | Return both human-readable ETH and exact wei for 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8 on Ethereum. | Misrouted as a crypto-price request and returned no wallet balance. |
| 10 | TOKEN_HOLDER_COUNT | TOKEN_HOLDER_COUNT | ChainWire Token Holder Count (7302) | PASS | Count distinct current Ethereum holders of DAI contract 0x6B175474E89094C44Da98b954EedeAC495271d0F. | Live answer matched ground truth. |
| 11 | TOKEN_HOLDER_COUNT | TOKEN_HOLDER_COUNT | ChainWire Token Holder Count (7302) | FAIL | How many unique addresses currently hold any USDC at 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48? | Used Base USDC instead of the Ethereum contract supplied, then returned no count. |
| 12 | TOKEN_HOLDER_COUNT | TOKEN_HOLDER_COUNT | ChainWire Token Holder Count (7302) | FAIL | Give the live holder count, not supply, for LINK contract 0x514910771AF9Ca656af840dff83E8264EcF986CA. | Failed to extract the LINK contract and returned no count. |
| 13 | TVL_LOOKUP | TVL_LOOKUP | TVL Oracle — DeFi Total Value Locked (301) | PASS | What is Uniswap's aggregate live TVL across every chain, in USD? | Live answer matched ground truth. |
| 14 | TVL_LOOKUP | TVL_LOOKUP | TVL Oracle — DeFi Total Value Locked (301) | PASS | Report Aave's present total value locked, not market capitalization or borrowed value. | Live answer matched ground truth. |
| 15 | TVL_LOOKUP | TVL_LOOKUP | FinWire TVL Lookup (7322) | FAIL | How much capital is currently locked in Curve DEX across its deployments? | Failed to extract Curve and returned no TVL. |
| 16 | CRYPTO_PRICE | CRYPTO_PRICE | Telegraph Sentinel Risk Intelligence (501) | FAIL | Quote one whole bitcoin in US dollars now, and do not confuse it with a wrapped token. | Parsed Bitcoin as ETH and returned no price. |
| 17 | CRYPTO_PRICE | CRYPTO_PRICE | Telegraph Sentinel Risk Intelligence (501) | FAIL | How many US dollars is one ether worth at this moment? | Recognized ETH but returned no live price. |
| 18 | CRYPTO_PRICE | CRYPTO_PRICE | Telegraph Sentinel Risk Intelligence (501) | FAIL | Give Solana's live USD spot price rather than its market cap. | Parsed Solana as ETH and returned no price. |
| 19 | STOCK_PRICE | STOCK_PRICE | Alpha Vantage Stocks (208) | PASS | What was the latest executable-looking TSLA share quote, not Tesla's market cap? | Live answer matched ground truth. |
| 20 | STOCK_PRICE | CRYPTO_PRICE | Telegraph Sentinel Risk Intelligence (501) | FAIL | Quote NVDA in USD using the freshest available market price. | Misrouted NVDA as crypto and returned no stock quote. |
| 21 | STOCK_PRICE | STOCK_PRICE | Alpha Vantage Stocks (208) | PASS | How much does one AAPL share cost now, distinguishing it from Apple's company valuation? | Live answer matched ground truth. |
| 22 | SSL_VERIFICATION | TELEGRAPH_KNOWLEDGE | Telegraph Knowledge Chatbot (200) | FAIL | Perform a live TLS handshake with wikipedia.org and tell me whether the served certificate is valid. | Expected valid, expires 2026-11-03; got undefined, expires null. |
| 23 | SSL_VERIFICATION | SSL_VERIFICATION | LiveCert Operational Signals (4433) | PASS | What exact expiry date is on the certificate stripe.com is serving right now? | Live answer matched ground truth. |
| 24 | SSL_VERIFICATION | SSL_VERIFICATION | LiveCert Operational Signals (4433) | PASS | Identify the issuer and expiry of github.com's currently served TLS certificate. | Live answer matched ground truth. |
| 25 | WEATHER_FORECAST | WEATHER_FORECAST | SkyWire Weather Forecast (7305) | PASS | Will measurable rain fall in London tomorrow, based on the latest forecast window? | London was extracted and the next-day forecast directly answered the rain question. |
| 26 | WEATHER_FORECAST | WEATHER_FORECAST | SkyWire Weather Forecast (7305) | PASS | Give Tokyo's high, low, rain, and wind outlook for the next two calendar days. | Tokyo was extracted and the returned daily rows include highs, lows, rain, and wind. |
| 27 | WEATHER_FORECAST | WEATHER_FORECAST | SkyWire Weather Forecast (7305) | FAIL | What peak wind and gust speeds are forecast for Lagos tomorrow? | Lagos was extracted, but the requested peak-gust figure was missing. |
| 28 | STORM_ALERT | STORM_ALERT | SkyWire Storm Alert (7306) | FAIL | Assess Manila's next 48 hours for thunderstorm, gust, and flooding disruption risk. | Manila was extracted, but the requested gust and flooding assessment was incomplete. |
| 29 | STORM_ALERT | STORM_ALERT | SkyWire Storm Alert (7306) | PASS | Could Miami operations be disrupted by severe weather during the next 48 hours? Quantify the risk. | Miami was extracted and the 48-hour disruption risk was quantified. |
| 30 | STORM_ALERT | STORM_ALERT | SkyWire Storm Alert (7306) | FAIL | Does Osaka face a meaningful storm threat in the coming 48 hours, including rain and peak gusts? | Osaka and rain risk were identified, but the requested peak-gust figure was unavailable. |
| 31 | IP_GEOLOCATION | IP_GEOLOCATION | TxLens (9002) | PASS | Geolocate 8.8.4.4 and identify its network owner plus whether it appears to be hosting or VPN infrastructure. | Live answer matched ground truth. |
| 32 | IP_GEOLOCATION | TELEGRAPH_KNOWLEDGE | Telegraph Knowledge Chatbot (200) | PASS | Which country and autonomous network currently announce 1.1.1.1? | The router chose knowledge chat, but the answer correctly identified US and AS13335 Cloudflare. |
| 33 | IP_GEOLOCATION | IP_GEOLOCATION | TxLens (9002) | PASS | For 104.16.132.229, distinguish the physical city estimate from the organization operating the address. | Live answer matched ground truth. |
| 34 | ACADEMIC_SEARCH | ACADEMIC_SEARCH | PREFLIGHT Infrastructure Signals (20260828) | PASS | Find peer-reviewed journal literature that surveys hallucination taxonomies in large language models. | Returned real peer-reviewed papers with resolvable DOI records relevant to the topic. |
| 35 | ACADEMIC_SEARCH | ACADEMIC_SEARCH | PREFLIGHT Infrastructure Signals (20260828) | PASS | Which peer-reviewed human studies discuss CRISPR gene editing, clinical use, and safety? | Returned relevant peer-reviewed human CRISPR studies with resolvable DOI records. |
| 36 | ACADEMIC_SEARCH | ACADEMIC_SEARCH | PREFLIGHT Infrastructure Signals (20260828) | PASS | Find highly cited peer-reviewed work measuring perovskite solar-cell efficiency improvements. | Returned highly cited peer-reviewed perovskite papers with resolvable DOI records. |
| 37 | WEB_SEARCH | CHAT_COMPLETION | Telegraph Groq LPU Miner (901) | PASS | Verify from a current authoritative source who presently serves as UN secretary-general. | Live answer matched ground truth. |
| 38 | WEB_SEARCH | TELEGRAPH_KNOWLEDGE | Telegraph Knowledge Chatbot (200) | PASS | Give the exact launch date of the James Webb Space Telescope and distinguish launch from deployment. | Live answer matched ground truth. |
| 39 | WEB_SEARCH | CHAT_COMPLETION | Telegraph Groq LPU Miner (901) | PASS | Without confusing the element name with its symbol, what is tungsten's chemical symbol? | Live answer matched ground truth. |
| 40 | FRAUD_DETECTION | none | none (n/a) | FAIL | Assess whether 0x098B716B8Aaf21512996dC57EB0615e2383E2f96 has a documented sanctions or exploit connection. | Telegraph refused the request before selecting a miner, so no fraud answer was produced. |
| 41 | FRAUD_DETECTION | none | none (n/a) | FAIL | Is 0x8589427373D6D84E98730D7795D8f6f8731FDA16 tied to a known illicit entity, or merely suspicious by heuristics? | Telegraph refused the request before selecting a miner, so no fraud answer was produced. |
| 42 | FRAUD_DETECTION | TEXT_CLASSIFICATION | Elcaro IPI Detector (8848) | FAIL | Look for evidence before deciding whether 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 should be labelled criminal. | Misrouted to prompt-injection classification and never assessed criminal-address evidence. |

The JSONL file preserves every complete raw Telegraph response, signal hash, miner ID, duration, and payment transaction returned by the engine.
