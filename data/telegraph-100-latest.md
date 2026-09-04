# Telegraph live run, 100 hard questions

Run: 2026-09-03T17:29:50.635Z
Spacing: one question every 30s plus up to 10s jitter.

Answer quality: 54 PASS, 45 FAIL, 1 UNVERIFIED out of 100.
Routing: 76/100 reached the intent the question was written for.
Won by our miners: 24/100.

## By intent

| Intent | Asked | Pass | Fail | Routed as expected | Answered by us |
|---|---:|---:|---:|---:|---:|
| ONCHAIN_TX_LOOKUP | 8 | 8 | 0 | 8 | 0 |
| GAS_PRICE | 7 | 1 | 6 | 5 | 0 |
| WALLET_BALANCE_CHECK | 7 | 3 | 4 | 3 | 0 |
| TOKEN_HOLDER_COUNT | 7 | 6 | 1 | 7 | 0 |
| TVL_LOOKUP | 7 | 0 | 6 | 6 | 6 |
| CRYPTO_PRICE | 8 | 8 | 0 | 8 | 0 |
| STOCK_PRICE | 7 | 5 | 2 | 5 | 5 |
| SSL_VERIFICATION | 7 | 7 | 0 | 7 | 7 |
| WEATHER_FORECAST | 7 | 0 | 7 | 7 | 0 |
| STORM_ALERT | 7 | 2 | 5 | 6 | 0 |
| IP_GEOLOCATION | 7 | 6 | 1 | 6 | 6 |
| ACADEMIC_SEARCH | 7 | 0 | 7 | 7 | 0 |
| WEB_SEARCH | 7 | 6 | 1 | 0 | 0 |
| FRAUD_DETECTION | 7 | 2 | 5 | 1 | 0 |

## Every question

| # | Expected intent | Routed intent | Miner | Quality | Question | Reason |
|---:|---|---|---|---|---|---|
| 1 | ONCHAIN_TX_LOOKUP | ONCHAIN_TX_LOOKUP | ChainSight — On-Chain Intelligence Hub (302) | PASS | I need to know whether 0x56955327978f804e5cc83412779c4919fec38aaf1492b849a5ca4bcff6870ec9 actually executed on Ethere... | receipt status is definitive |
| 2 | ONCHAIN_TX_LOOKUP | ONCHAIN_TX_LOOKUP | ChainSight — On-Chain Intelligence Hub (302) | PASS | Pull the receipt for 0xa6c1817ef970ae7f5320894ebda705720e410275e372211ddecee9f817ce3248 and tell me what the transact... | receipt status is definitive |
| 3 | ONCHAIN_TX_LOOKUP | ONCHAIN_TX_LOOKUP | ChainSight — On-Chain Intelligence Hub (302) | PASS | A transaction can sit in a confirmed block and still have reverted. Is that what happened with 0xe5985516fc3f86d40188... | receipt status is definitive |
| 4 | ONCHAIN_TX_LOOKUP | ONCHAIN_TX_LOOKUP | ChainSight — On-Chain Intelligence Hub (302) | PASS | Someone sent me 0xef9c185bf62bf8889c5bbf9fc9a897c7927ba6445ed4a7e2deeeac6f0e2e45b1 as proof of payment. Does the chai... | receipt status is definitive |
| 5 | ONCHAIN_TX_LOOKUP | ONCHAIN_TX_LOOKUP | ChainSight — On-Chain Intelligence Hub (302) | PASS | What is the final execution status of 0xe82ba1c2caa44aac1720567a5c6c379980d159a662b5ada876b2f6c1b61c71c5 on mainnet, ... | receipt status is definitive |
| 6 | ONCHAIN_TX_LOOKUP | ONCHAIN_TX_LOOKUP | ChainSight — On-Chain Intelligence Hub (302) | PASS | Is 0x94a99ba9c9480af7ecee8adb45e2e63cf3ddec1e5ba01c4727c89fbbdf9eb95a still pending, or has Ethereum settled it one w... | receipt status is definitive |
| 7 | ONCHAIN_TX_LOOKUP | ONCHAIN_TX_LOOKUP | ChainSight — On-Chain Intelligence Hub (302) | PASS | Look up 0xc06f1707a3563e046c770f6d10915cb8f44c23be90d12783453b0f0eb1a9c9a8 and tell me plainly whether it succeeded. ... | receipt status is definitive |
| 8 | ONCHAIN_TX_LOOKUP | ONCHAIN_TX_LOOKUP | ChainSight — On-Chain Intelligence Hub (302) | PASS | Check 0x978bd498688d416bf27bdd67ce7a5583d63b5bc21d5cd8972bddd6d28723c0bb against the Ethereum receipt and report both... | receipt status is definitive |
| 9 | GAS_PRICE | GAS_PRICE | Kriterion-Pramagraph (152) | PASS | I want to send an Ethereum transaction in the next couple of minutes. What is gas costing right now in gwei? | 40% band, gas moves per block |
| 10 | GAS_PRICE | GAS_PRICE | Kriterion-Pramagraph (152) | FAIL | How much am I paying per unit of gas on Base at this moment? | expected 0.0060 gwei, got 0.5498 gwei |
| 11 | GAS_PRICE | GAS_PRICE | Kriterion-Pramagraph (152) | FAIL | Is Arbitrum cheap to transact on right this second? Give me the actual gas number, not a general impression. | expected 0.0200 gwei, got 0.4940 gwei |
| 12 | GAS_PRICE | GAS_PRICE | Kriterion-Pramagraph (152) | FAIL | What is the live gas price on Optimism, in gwei? | expected 0.0010 gwei, got 0.5432 gwei |
| 13 | GAS_PRICE | WEATHER_FORECAST | LiveCert Operational Signals (4433) | FAIL | Polygon fees felt high yesterday. What are they at now? | routed to WEATHER_FORECAST instead; expected 275.6549 gwei, got NaN gwei |
| 14 | GAS_PRICE | CRYPTO_PRICE | PricePulse Multi-Source Crypto Oracle (147117) | FAIL | People keep saying Ethereum fees are spiking. Is that actually true at this moment, and what number shows it? | routed to CRYPTO_PRICE instead; expected 0.4270 gwei, got 2489.8600 gwei |
| 15 | GAS_PRICE | GAS_PRICE | Kriterion-Pramagraph (152) | FAIL | Comparing like for like, what does one unit of gas cost on Base right now? | expected 0.0060 gwei, got 0.5136 gwei |
| 16 | WALLET_BALANCE_CHECK | WALLET_BALANCE_CHECK | ChainSight — On-Chain Intelligence Hub (302) | PASS | Read Ethereum at the latest block and give me the exact native balance of 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045. | exact wei match |
| 17 | WALLET_BALANCE_CHECK | CRYPTO_PRICE | PricePulse Multi-Source Crypto Oracle (147117) | FAIL | Without adding up past transfers, how much ETH does 0x28C6c06298d514Db089934071355E5743bf21d60 hold today? | routed to CRYPTO_PRICE instead; no wei field returned; expected 124143.1614780169 ETH, got 2490.215 ETH |
| 18 | WALLET_BALANCE_CHECK | CRYPTO_PRICE | PricePulse Multi-Source Crypto Oracle (147117) | FAIL | Give me both the readable ETH figure and the exact wei for 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8. | routed to CRYPTO_PRICE instead; no wei field returned; expected 1996008.38580481 ETH, got 2490.08 ETH |
| 19 | WALLET_BALANCE_CHECK | TOKEN_HOLDER_COUNT | ChainSight — On-Chain Intelligence Hub (302) | FAIL | What is sitting in 0x2910543Af39abA0Cd09dBb2D50200b3E800A63D2 right now? Native coin only, ignore tokens. | routed to TOKEN_HOLDER_COUNT instead; no wei field returned; expected 0.001653073377779059 ETH, got 0 ETH |
| 20 | WALLET_BALANCE_CHECK | WALLET_BALANCE_CHECK | ChainSight — On-Chain Intelligence Hub (302) | PASS | Balance check on 0x876EabF441B2EE5B5b0554Fd502a8E0600950cFa please, as of the current block rather than a cached snap... | exact wei match |
| 21 | WALLET_BALANCE_CHECK | TOKEN_HOLDER_COUNT | ChainSight — On-Chain Intelligence Hub (302) | FAIL | How much ether is held at 0x8315177aB297bA92A06054cE80a67Ed4DBd7ed3a? | routed to TOKEN_HOLDER_COUNT instead; no wei field returned; expected 727885.646685898 ETH, got 0 ETH |
| 22 | WALLET_BALANCE_CHECK | WALLET_BALANCE_CHECK | ChainSight — On-Chain Intelligence Hub (302) | PASS | I want the current on-chain ETH balance for 0x098B716B8Aaf21512996dC57EB0615e2383E2f96, whatever else that address is... | exact wei match |
| 23 | TOKEN_HOLDER_COUNT | TOKEN_HOLDER_COUNT | ChainSight — On-Chain Intelligence Hub (302) | PASS | How many separate addresses currently hold DAI at 0x6B175474E89094C44Da98b954EedeAC495271d0F? I mean holders, not sup... | same upstream as the miner: proves plumbing, not truth |
| 24 | TOKEN_HOLDER_COUNT | TOKEN_HOLDER_COUNT | ChainSight — On-Chain Intelligence Hub (302) | PASS | Give me the number of unique wallets holding any amount of USDC at 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48. | same upstream as the miner: proves plumbing, not truth |
| 25 | TOKEN_HOLDER_COUNT | TOKEN_HOLDER_COUNT | ChainSight — On-Chain Intelligence Hub (302) | PASS | For LINK at 0x514910771AF9Ca656af840dff83E8264EcF986CA, what is the live holder count? | same upstream as the miner: proves plumbing, not truth |
| 26 | TOKEN_HOLDER_COUNT | TOKEN_HOLDER_COUNT | ChainSight — On-Chain Intelligence Hub (302) | PASS | How widely distributed is WETH? I am after the count of distinct holders of 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2. | same upstream as the miner: proves plumbing, not truth |
| 27 | TOKEN_HOLDER_COUNT | TOKEN_HOLDER_COUNT | ChainSight — On-Chain Intelligence Hub (302) | PASS | Count the addresses holding UNI at 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984 right now. | same upstream as the miner: proves plumbing, not truth |
| 28 | TOKEN_HOLDER_COUNT | TOKEN_HOLDER_COUNT | ChainSight — On-Chain Intelligence Hub (302) | PASS | Tether on Ethereum, contract 0xdAC17F958D2ee523a2206206994597C13D831ec7: how many holders does it have? | same upstream as the miner: proves plumbing, not truth |
| 29 | TOKEN_HOLDER_COUNT | TOKEN_HOLDER_COUNT | ChainSight — On-Chain Intelligence Hub (302) | FAIL | SHIB at 0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE is meant to have a huge holder base. What is the actual number? | expected 1837009, got 0 |
| 30 | TVL_LOOKUP | TVL_LOOKUP | Telegraph Sentinel Risk Intelligence (501) | UNVERIFIED | What is the total value locked in Uniswap across all the chains it is deployed on, in dollars? | checker error: fetch failed |
| 31 | TVL_LOOKUP | TVL_LOOKUP | Telegraph Sentinel Risk Intelligence (501) | FAIL | How much is locked in Aave at the moment? Not its market cap, and not the amount borrowed. | expected 18096854220, got NaN |
| 32 | TVL_LOOKUP | TVL_LOOKUP | Telegraph Sentinel Risk Intelligence (501) | FAIL | How much capital is sitting in Curve right now across its deployments? | expected 1317656066, got NaN |
| 33 | TVL_LOOKUP | TVL_LOOKUP | Telegraph Sentinel Risk Intelligence (501) | FAIL | Give me the current TVL figure for Lido in USD. | expected 24013546756, got NaN |
| 34 | TVL_LOOKUP | TVL_LOOKUP | Telegraph Sentinel Risk Intelligence (501) | FAIL | What is Balancer holding in total value locked today? | expected 64972864, got NaN |
| 35 | TVL_LOOKUP | TELEGRAPH_KNOWLEDGE | LiveCert Operational Signals (4433) | FAIL | Is there still meaningful capital in Sushi? Give me the live TVL number. | routed to TELEGRAPH_KNOWLEDGE instead; expected 102342054, got NaN |
| 36 | TVL_LOOKUP | TVL_LOOKUP | Telegraph Sentinel Risk Intelligence (501) | FAIL | How much value is locked in Convex Finance at present? | expected 579456096, got NaN |
| 37 | CRYPTO_PRICE | CRYPTO_PRICE | OnChain Intel Miner (900) | PASS | Price one whole bitcoin in US dollars as of now, and do not give me a wrapped or bridged version of it. | the miner reads CoinPaprika, so this is independent |
| 38 | CRYPTO_PRICE | CRYPTO_PRICE | OnChain Intel Miner (900) | PASS | What is ether worth in dollars right this moment? | the miner reads CoinPaprika, so this is independent |
| 39 | CRYPTO_PRICE | CRYPTO_PRICE | OnChain Intel Miner (900) | PASS | Give me the live spot price of Solana in USD. Spot price, not market cap. | the miner reads CoinPaprika, so this is independent |
| 40 | CRYPTO_PRICE | CRYPTO_PRICE | OnChain Intel Miner (900) | PASS | What is LINK trading at in dollars? | the miner reads CoinPaprika, so this is independent |
| 41 | CRYPTO_PRICE | CRYPTO_PRICE | PricePulse Multi-Source Crypto Oracle (147117) | PASS | Current USD price for Cardano please. | the miner reads CoinPaprika, so this is independent |
| 42 | CRYPTO_PRICE | CRYPTO_PRICE | OnChain Intel Miner (900) | PASS | How much is one AVAX in dollars right now? | the miner reads CoinPaprika, so this is independent |
| 43 | CRYPTO_PRICE | CRYPTO_PRICE | OnChain Intel Miner (900) | PASS | What is dogecoin worth in USD at the moment? | the miner reads CoinPaprika, so this is independent |
| 44 | CRYPTO_PRICE | CRYPTO_PRICE | OnChain Intel Miner (900) | PASS | Quote the UNI token in US dollars. I mean the token, not the protocol TVL. | the miner reads CoinPaprika, so this is independent |
| 45 | STOCK_PRICE | STOCK_PRICE | TxLens (9002) | PASS | What is one TSLA share going for on the latest quote? Share price, not the market cap of Tesla. | live Nasdaq quote, independent of the providers the miner uses |
| 46 | STOCK_PRICE | none | none (n/a) | FAIL | Give me NVDA in dollars at the freshest price you can get. | request failed: Telegraph returned HTTP 500. |
| 47 | STOCK_PRICE | STOCK_PRICE | TxLens (9002) | PASS | How much does a single Apple share cost right now? | live Nasdaq quote, independent of the providers the miner uses |
| 48 | STOCK_PRICE | STOCK_PRICE | TxLens (9002) | PASS | Latest traded price on MSFT please. | live Nasdaq quote, independent of the providers the miner uses |
| 49 | STOCK_PRICE | STOCK_PRICE | TxLens (9002) | PASS | What is Amazon stock at today? | live Nasdaq quote, independent of the providers the miner uses |
| 50 | STOCK_PRICE | STOCK_PRICE | TxLens (9002) | PASS | Current quote for GOOGL in USD. | live Nasdaq quote, independent of the providers the miner uses |
| 51 | STOCK_PRICE | none | none (n/a) | FAIL | Where is META trading as of the most recent print? | request failed: Telegraph returned HTTP 500. |
| 52 | SSL_VERIFICATION | SSL_VERIFICATION | TxLens (9002) | PASS | Do a real handshake with wikipedia.org and tell me whether the certificate it serves is valid. | live answer matched ground truth |
| 53 | SSL_VERIFICATION | SSL_VERIFICATION | TxLens (9002) | PASS | What is the exact expiry date on the certificate stripe.com is presenting right now? | live answer matched ground truth |
| 54 | SSL_VERIFICATION | SSL_VERIFICATION | TxLens (9002) | PASS | Who issued the TLS certificate github.com is currently serving, and when does it run out? | live answer matched ground truth |
| 55 | SSL_VERIFICATION | SSL_VERIFICATION | TxLens (9002) | PASS | Is cloudflare.com serving a trusted, still-valid certificate? | live answer matched ground truth |
| 56 | SSL_VERIFICATION | SSL_VERIFICATION | TxLens (9002) | PASS | Check the live certificate on bbc.co.uk. Valid or not, and expiring when? | live answer matched ground truth |
| 57 | SSL_VERIFICATION | SSL_VERIFICATION | TxLens (9002) | PASS | I want the certificate details nytimes.com is actually serving today, not what a scan cached last week. | live answer matched ground truth |
| 58 | SSL_VERIFICATION | SSL_VERIFICATION | TxLens (9002) | PASS | Verify the TLS setup on mozilla.org and give me the issuer plus the expiry. | live answer matched ground truth |
| 59 | WEATHER_FORECAST | WEATHER_FORECAST | LiveCert Operational Signals (4433) | FAIL | Is it going to actually rain in London tomorrow, or just look like it? | expected 25.3C max, got NaNC max |
| 60 | WEATHER_FORECAST | WEATHER_FORECAST | LiveCert Operational Signals (4433) | FAIL | Give me the high, the low, the rain and the wind for Tokyo over the next two days. | expected 25.4C max, got NaNC max |
| 61 | WEATHER_FORECAST | WEATHER_FORECAST | LiveCert Operational Signals (4433) | FAIL | How windy is Lagos going to get tomorrow? | expected 28.3C max, got NaNC max |
| 62 | WEATHER_FORECAST | WEATHER_FORECAST | LiveCert Operational Signals (4433) | FAIL | What temperatures should I expect in Cape Town over the next couple of days? | expected 22.6C max, got NaNC max |
| 63 | WEATHER_FORECAST | WEATHER_FORECAST | LiveCert Operational Signals (4433) | FAIL | Toronto forecast for tomorrow please, with the expected high. | expected 26.3C max, got NaNC max |
| 64 | WEATHER_FORECAST | WEATHER_FORECAST | LiveCert Operational Signals (4433) | FAIL | Should I plan around rain in Mumbai over the next two days? | expected 29.4C max, got NaNC max |
| 65 | WEATHER_FORECAST | WEATHER_FORECAST | LiveCert Operational Signals (4433) | FAIL | What is the outlook for Berlin tomorrow, temperature and precipitation both? | expected 24.7C max, got NaNC max |
| 66 | STORM_ALERT | STORM_ALERT | SkyWire Storm Alert (7306) | PASS | Assess Manila over the next 48 hours for storm disruption. I care about gusts and flooding, not the average temperature. | probably the same source the miner uses; 25% band |
| 67 | STORM_ALERT | STORM_ALERT | SkyWire Storm Alert (7306) | PASS | Could severe weather disrupt things in Miami in the next two days? Put a number on it. | probably the same source the miner uses; 25% band |
| 68 | STORM_ALERT | STORM_ALERT | SkyWire Storm Alert (7306) | FAIL | Is Osaka facing a real storm threat in the coming 48 hours? | expected 34.2 km/h peak gust, got 48 km/h |
| 69 | STORM_ALERT | WEATHER_FORECAST | LiveCert Operational Signals (4433) | FAIL | How rough is the next 48 hours looking in Reykjavik, wind especially? | routed to WEATHER_FORECAST instead; expected 32.4 km/h peak gust, got NaN km/h |
| 70 | STORM_ALERT | STORM_ALERT | SkyWire Storm Alert (7306) | FAIL | Houston over the next two days: any storm risk worth rescheduling for? | expected 35.6 km/h peak gust, got 16.7 km/h |
| 71 | STORM_ALERT | STORM_ALERT | SkyWire Storm Alert (7306) | FAIL | What is the storm and flooding risk in Dhaka across the next 48 hours? | expected 32 km/h peak gust, got 48 km/h |
| 72 | STORM_ALERT | STORM_ALERT | SkyWire Storm Alert (7306) | FAIL | Auckland, next 48 hours. Peak gusts and whether it counts as disruptive. | expected 70.2 km/h peak gust, got 48 km/h |
| 73 | IP_GEOLOCATION | IP_GEOLOCATION | TxLens (9002) | PASS | Where does 8.8.4.4 sit geographically, who runs the network, and does it look like VPN or hosting infrastructure? | country and network operator |
| 74 | IP_GEOLOCATION | WEATHER_FORECAST | LiveCert Operational Signals (4433) | FAIL | Which country and which network currently announce 1.1.1.1? | routed to WEATHER_FORECAST instead; expected AU / AS13335, got undefined / ASnull |
| 75 | IP_GEOLOCATION | IP_GEOLOCATION | TxLens (9002) | PASS | For 104.16.132.229, separate the physical city estimate from the organisation that actually operates the address. | country and network operator |
| 76 | IP_GEOLOCATION | IP_GEOLOCATION | TxLens (9002) | PASS | Locate 9.9.9.9 and tell me whose network it belongs to. | country and network operator |
| 77 | IP_GEOLOCATION | IP_GEOLOCATION | TxLens (9002) | PASS | Is 208.67.222.222 a datacenter address, and where does it resolve to? | country and network operator |
| 78 | IP_GEOLOCATION | IP_GEOLOCATION | TxLens (9002) | PASS | Country and autonomous system for 8.8.8.8 please. | country and network operator |
| 79 | IP_GEOLOCATION | IP_GEOLOCATION | TxLens (9002) | PASS | I keep seeing 1.0.0.1 in logs. Where is it and who owns it? | country and network operator |
| 80 | ACADEMIC_SEARCH | ACADEMIC_SEARCH | LiveCert Operational Signals (4433) | FAIL | Find me peer-reviewed journal work that surveys how hallucination in large language models gets categorised. | expected at least one paper, got none listed |
| 81 | ACADEMIC_SEARCH | ACADEMIC_SEARCH | LiveCert Operational Signals (4433) | FAIL | Which peer-reviewed human studies cover CRISPR gene editing in a clinical setting and its safety record? | expected at least one paper, got none listed |
| 82 | ACADEMIC_SEARCH | ACADEMIC_SEARCH | LiveCert Operational Signals (4433) | FAIL | I want highly cited peer-reviewed papers measuring efficiency gains in perovskite solar cells. | expected at least one paper, got none listed |
| 83 | ACADEMIC_SEARCH | ACADEMIC_SEARCH | LiveCert Operational Signals (4433) | FAIL | Point me at real published research on the mechanisms behind antibiotic resistance in gram-negative bacteria. | expected at least one paper, got none listed |
| 84 | ACADEMIC_SEARCH | ACADEMIC_SEARCH | LiveCert Operational Signals (4433) | FAIL | Is there serious peer-reviewed literature on interpretability methods for transformer models? Give me actual papers. | expected at least one paper, got none listed |
| 85 | ACADEMIC_SEARCH | ACADEMIC_SEARCH | LiveCert Operational Signals (4433) | FAIL | Find published studies on how ocean acidification affects coral calcification. | expected at least one paper, got none listed |
| 86 | ACADEMIC_SEARCH | ACADEMIC_SEARCH | LiveCert Operational Signals (4433) | FAIL | What peer-reviewed work exists on solid-state battery electrolytes and their conductivity limits? | expected at least one paper, got none listed |
| 87 | WEB_SEARCH | CHAT_COMPLETION | Amazon Nova 2 Lite (114) | PASS | Who is currently serving as secretary general of the United Nations? | routed to CHAT_COMPLETION instead |
| 88 | WEB_SEARCH | CHAT_COMPLETION | Amazon Nova 2 Lite (114) | PASS | When exactly was the James Webb Space Telescope launched? | routed to CHAT_COMPLETION instead |
| 89 | WEB_SEARCH | CHAT_COMPLETION | Amazon Nova 2 Lite (114) | PASS | What is the chemical symbol for tungsten, and why is it that rather than the obvious one? | routed to CHAT_COMPLETION instead |
| 90 | WEB_SEARCH | CHAT_COMPLETION | Amazon Nova 2 Lite (114) | PASS | Which city is the capital of Australia? Not the biggest city, the capital. | routed to CHAT_COMPLETION instead |
| 91 | WEB_SEARCH | CHAT_COMPLETION | Amazon Nova 2 Lite (114) | PASS | In what year did humans first land on the Moon? | routed to CHAT_COMPLETION instead |
| 92 | WEB_SEARCH | WEATHER_CHECK | WeatherAPI (212) | FAIL | Which ocean is the deepest point on Earth found in? | routed to WEATHER_CHECK instead; expected pacific, got |
| 93 | WEB_SEARCH | CHAT_COMPLETION | Amazon Nova 2 Lite (114) | PASS | Which planet in our solar system is closest to the Sun? | routed to CHAT_COMPLETION instead |
| 94 | FRAUD_DETECTION | none | none (n/a) | FAIL | Is 0x098B716B8Aaf21512996dC57EB0615e2383E2f96 tied to a known theft or a sanctions listing, or is that just rumour? | request failed: Telegraph returned HTTP 500. |
| 95 | FRAUD_DETECTION | FRAUD_DETECTION | SarzOps Fraud Intelligence (91001) | FAIL | Run a fraud risk check on 0x8589427373D6D84E98730D7795D8f6f8731FDA16 and tell me what the evidence actually is. | Tornado Cash related, OFAC-designated August 2022; expected high risk, got unclear |
| 96 | FRAUD_DETECTION | TELEGRAPH_KNOWLEDGE | LiveCert Operational Signals (4433) | FAIL | Before I interact with 0x722122dF12D4e14e13Ac3b6895a86e84145b6967, is there anything on it I should know? | routed to TELEGRAPH_KNOWLEDGE instead; Tornado Cash proxy, OFAC-designated August 2022; expected high risk, got unclear |
| 97 | FRAUD_DETECTION | TEXT_CLASSIFICATION | Elcaro IPI Detector (8848) | PASS | Look for evidence before deciding whether 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 deserves to be labelled criminal. | routed to TEXT_CLASSIFICATION instead; public, widely-known ordinary address |
| 98 | FRAUD_DETECTION | none | none (n/a) | FAIL | Is 0x28C6c06298d514Db089934071355E5743bf21d60 a scam address? It moves a lot of money, which is not the same thing. | request failed: Telegraph took longer than 90000ms to answer. |
| 99 | FRAUD_DETECTION | CONTENT_MODERATION | Elcaro IPI Detector (8848) | PASS | Any sanctions or scam reports against 0x2910543Af39abA0Cd09dBb2D50200b3E800A63D2? | routed to CONTENT_MODERATION instead; exchange wallet, no designation |
| 100 | FRAUD_DETECTION | none | none (n/a) | FAIL | Should I treat 0x8315177aB297bA92A06054cE80a67Ed4DBd7ed3a as risky, or is it a legitimate contract? | request failed: Telegraph returned HTTP 500. |

## Evidence

### 1. ONCHAIN_TX_LOOKUP

- Question: I need to know whether 0x56955327978f804e5cc83412779c4919fec38aaf1492b849a5ca4bcff6870ec9 actually executed on Ethereum, not just whether it made it into a block. Which is it?
- Signal: 0xc193edf0f6bc1b68ddd8fba3d8e2e661909e6b665824e2a5ef718a766ec97d23
- Ground truth source: eth.drpc.org receipt
- Expected: success
- Got: success
- Payment: 0xbdd22cd73a2ee99025be9d78b05c0f4d0f64fc1f437df5963256a660a3aefa64

### 2. ONCHAIN_TX_LOOKUP

- Question: Pull the receipt for 0xa6c1817ef970ae7f5320894ebda705720e410275e372211ddecee9f817ce3248 and tell me what the transaction was trying to do and how it ended.
- Signal: 0xa85bf0553643cfd4b5b76d713e037451e45b9998181f04b6d3165e01248c1ea3
- Ground truth source: eth.drpc.org receipt
- Expected: success
- Got: success
- Payment: 0x89f4d8ba438de003fc4d149eee20c71ff9bbf5d84551d4b948da7d74b088c6f0

### 3. ONCHAIN_TX_LOOKUP

- Question: A transaction can sit in a confirmed block and still have reverted. Is that what happened with 0xe5985516fc3f86d40188416b0fdbc613a8d3ae0869a4b46f5218224c1d288645?
- Signal: 0xf4880a847e5ade5256c9006975a9dd88f5c600a1489bdefa4d225e41789cbb0d
- Ground truth source: eth.drpc.org receipt
- Expected: success
- Got: success
- Payment: 0x7f0a9b9463d370dc2b9687db326da35ac2bf5d76774997e4ffd3fb9544effd33

### 4. ONCHAIN_TX_LOOKUP

- Question: Someone sent me 0xef9c185bf62bf8889c5bbf9fc9a897c7927ba6445ed4a7e2deeeac6f0e2e45b1 as proof of payment. Does the chain back that up?
- Signal: 0x7be68e577910ffdf1e02ec8a7d70a5fe76d9336ca021682817d3e3a530cf20e2
- Ground truth source: eth.drpc.org receipt
- Expected: success
- Got: success
- Payment: 0xfc758f055acf7b245744f51f3ba2441fa2b0c3bc96141403a79d9598a17411e4

### 5. ONCHAIN_TX_LOOKUP

- Question: What is the final execution status of 0xe82ba1c2caa44aac1720567a5c6c379980d159a662b5ada876b2f6c1b61c71c5 on mainnet, and how many blocks deep is it now?
- Signal: 0x841fb3ac892a2fdf51d5879e0317b359a53ac820216b2800879108b57046d029
- Ground truth source: eth.drpc.org receipt
- Expected: success
- Got: success
- Payment: 0x7b54a13c58520e0674f9b343866ee20cc2a0d984742c58ea95d4e6b89695d305

### 6. ONCHAIN_TX_LOOKUP

- Question: Is 0x94a99ba9c9480af7ecee8adb45e2e63cf3ddec1e5ba01c4727c89fbbdf9eb95a still pending, or has Ethereum settled it one way or the other?
- Signal: 0xa24b3a4c461b8aa3b15d60793c01f189d85da1e77fe2e4d773358b17d13312ac
- Ground truth source: eth.drpc.org receipt
- Expected: success
- Got: success
- Payment: 0xa480f50907083671044193c84f7b891897572c305c53c490ebd0bd4e15900ed2

### 7. ONCHAIN_TX_LOOKUP

- Question: Look up 0xc06f1707a3563e046c770f6d10915cb8f44c23be90d12783453b0f0eb1a9c9a8 and tell me plainly whether it succeeded. I do not want a maybe.
- Signal: 0xc65fc06760cc28fe124b0deb6e7e0b2ca325f15141a041f2d74caa14163675fa
- Ground truth source: eth.drpc.org receipt
- Expected: success
- Got: success
- Payment: 0x911705ad23ca1cda03de705db97d72366d265474ebc8b15611158ec2c74769b8

### 8. ONCHAIN_TX_LOOKUP

- Question: Check 0x978bd498688d416bf27bdd67ce7a5583d63b5bc21d5cd8972bddd6d28723c0bb against the Ethereum receipt and report both its status and what it moved.
- Signal: 0x6d549b18ca78ae1fc21f350c45b76c7173f5cea44ad07e4663458442de9965ec
- Ground truth source: eth.drpc.org receipt
- Expected: success
- Got: success
- Payment: 0xe09d9482639f8012b90c554c5e901ddd98f121bfc7ce9fd92722645de3adbcf8

### 9. GAS_PRICE

- Question: I want to send an Ethereum transaction in the next couple of minutes. What is gas costing right now in gwei?
- Signal: 0x8c948a30ef9e9a3e0b8f2c320fba28c9a4895a3a5bc1d93f0cf4bf5879bc7494
- Ground truth source: https://eth.drpc.org eth_gasPrice
- Expected: 0.5780 gwei
- Got: 0.5780 gwei
- Payment: 0x914b0a1b0f0ca2157223b0f60ffcca7c0b15213ef65f35776bdaa3d0a12edf4e

### 10. GAS_PRICE

- Question: How much am I paying per unit of gas on Base at this moment?
- Signal: 0x3d203e3eea8a7375fc2f58e76af5f77e4cf073b7d4157b06bffc92dcf1b4ee40
- Ground truth source: https://base.drpc.org eth_gasPrice
- Expected: 0.0060 gwei
- Got: 0.5498 gwei
- Payment: 0x6ca1fa5d1560d2f9887cc3f0955aaaedf680237088e0bbfe2e05bc8fc9ddadde

### 11. GAS_PRICE

- Question: Is Arbitrum cheap to transact on right this second? Give me the actual gas number, not a general impression.
- Signal: 0xe762b7dbf166c0ca84c7e234fae91f25abec5d43a32916e0640592a9890d2c1b
- Ground truth source: https://arbitrum.drpc.org eth_gasPrice
- Expected: 0.0200 gwei
- Got: 0.4940 gwei
- Payment: 0x4ec9604244cff778de0da926e7bcdb6e8209c85696ec06d999ad1eec5e772dfb

### 12. GAS_PRICE

- Question: What is the live gas price on Optimism, in gwei?
- Signal: 0x140bce6096b3c95d550a538ec8df9ed49480b8363c731b27a2e03ece8d23731a
- Ground truth source: https://optimism.drpc.org eth_gasPrice
- Expected: 0.0010 gwei
- Got: 0.5432 gwei
- Payment: 0xdcf4f88ac34449167a61a1053ac8d309d6c17a5535f7df7e214e15c82fdab90d

### 13. GAS_PRICE

- Question: Polygon fees felt high yesterday. What are they at now?
- Signal: 0x335ff06ffae202431bc07781b77c8d01904fe0d564e09b26b045c11aaf1153af
- Ground truth source: https://polygon.drpc.org eth_gasPrice
- Expected: 275.6549 gwei
- Got: NaN gwei
- Payment: 0x1e1033d410f08cbd34693d3f8d5e92245a25476a49e8d53fc72717e4206ecbe3

### 14. GAS_PRICE

- Question: People keep saying Ethereum fees are spiking. Is that actually true at this moment, and what number shows it?
- Signal: 0x9a89c18eed763b6019bf07ffc94fd851abc09492596148c3a47508547ba793c0
- Ground truth source: https://eth.drpc.org eth_gasPrice
- Expected: 0.4270 gwei
- Got: 2489.8600 gwei
- Payment: 0x7b5358e5f84eb13108d4f1231a271473a8b4ac56a82a28d3071fd62376035ac0

### 15. GAS_PRICE

- Question: Comparing like for like, what does one unit of gas cost on Base right now?
- Signal: 0xf87e328418be15ebaa296a6852a77ada83bb350bb1d3c060b9e0f7d4d250bc0c
- Ground truth source: https://base.drpc.org eth_gasPrice
- Expected: 0.0060 gwei
- Got: 0.5136 gwei
- Payment: 0x74110d67124ee4f38e4236d45abe4fd29ff4e4673f017efc15f2cb5b92358b4e

### 16. WALLET_BALANCE_CHECK

- Question: Read Ethereum at the latest block and give me the exact native balance of 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045.
- Signal: 0xaf9dd0929898c29ab073276629e788b48110d67d33ced457f37ad5722b89a8d1
- Ground truth source: eth.drpc.org eth_getBalance
- Expected: 6712150161831460931 wei
- Got: 6712150161831460931 wei
- Payment: 0x8de2a6a6fae44977506f6ac36252b23bc7da1d3d8baba16db27e0b5728147970

### 17. WALLET_BALANCE_CHECK

- Question: Without adding up past transfers, how much ETH does 0x28C6c06298d514Db089934071355E5743bf21d60 hold today?
- Signal: 0x19ad5f784361a24e228c573ff5bb6de2afc4d7df4099552459546a442c861991
- Ground truth source: eth.drpc.org eth_getBalance
- Expected: 124143.1614780169 ETH
- Got: 2490.215 ETH
- Payment: 0x10134cd6272236bc8ef0943283b6e2b2a597926b41f03e982b417f2fffc64d8d

### 18. WALLET_BALANCE_CHECK

- Question: Give me both the readable ETH figure and the exact wei for 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8.
- Signal: 0x45d913db01017ae9dbf203f1d5ba1596cfdd64b731fda60aac8b44cdc6986097
- Ground truth source: eth.drpc.org eth_getBalance
- Expected: 1996008.38580481 ETH
- Got: 2490.08 ETH
- Payment: 0xf0575e13b1e79210e79582d5f08768c50005b87cededeec5cbb2a5ff16f07854

### 19. WALLET_BALANCE_CHECK

- Question: What is sitting in 0x2910543Af39abA0Cd09dBb2D50200b3E800A63D2 right now? Native coin only, ignore tokens.
- Signal: 0xf5f3125a933743d79c587066c733bfd80206126a4be788a7f8f6a2435eb32ef0
- Ground truth source: eth.drpc.org eth_getBalance
- Expected: 0.001653073377779059 ETH
- Got: 0 ETH
- Payment: 0xcb8cbc3c06cda5b85666d14287e0c8ef8ce0b6cd5cc39bd1a1342840228f7375

### 20. WALLET_BALANCE_CHECK

- Question: Balance check on 0x876EabF441B2EE5B5b0554Fd502a8E0600950cFa please, as of the current block rather than a cached snapshot.
- Signal: 0x294c2b4dc646547acbc591a4c0809994dadd9d1327c5e3acae0a98e6da46141e
- Ground truth source: eth.drpc.org eth_getBalance
- Expected: 3975369503209562072 wei
- Got: 3975369503209562072 wei
- Payment: 0xdd5134a169ec59e4f535c17437d7a1d5ea8867b092df8fd20a3acd39d525e6cd

### 21. WALLET_BALANCE_CHECK

- Question: How much ether is held at 0x8315177aB297bA92A06054cE80a67Ed4DBd7ed3a?
- Signal: 0x8206586d27274ff4ce1d06a79ccd5d73f9c8e3c674fdf9a7f88a12609c96ae56
- Ground truth source: eth.drpc.org eth_getBalance
- Expected: 727885.646685898 ETH
- Got: 0 ETH
- Payment: 0xd83a75a829e6b0bf5afc93c3a1b7b1cc8e979467a2f9c5cccc054b8d7c178654

### 22. WALLET_BALANCE_CHECK

- Question: I want the current on-chain ETH balance for 0x098B716B8Aaf21512996dC57EB0615e2383E2f96, whatever else that address is known for.
- Signal: 0x5a6dbebde4e95177fa2f7e964a703129282042273adf48ea274644e08c925693
- Ground truth source: eth.drpc.org eth_getBalance
- Expected: 101802486783767055350 wei
- Got: 101802486783767055350 wei
- Payment: 0x214cac963c4ceb8f976c752165140bff76c6a24808eff9b8f1f6163d0dc988b6

### 23. TOKEN_HOLDER_COUNT

- Question: How many separate addresses currently hold DAI at 0x6B175474E89094C44Da98b954EedeAC495271d0F? I mean holders, not supply.
- Signal: 0x17fa55a589262c52dee27bf30ba329e5da095039f933e747f35ce25a2802f9ec
- Ground truth source: eth.blockscout.com (same upstream as the miner)
- Expected: 754582
- Got: 754582
- Payment: 0x2a4739c69a161ebe823dd80ecb406c603ebfdaa56bc867886016b4c2da08abe4

### 24. TOKEN_HOLDER_COUNT

- Question: Give me the number of unique wallets holding any amount of USDC at 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.
- Signal: 0x476cbd6fee0bb460efce33f53e6b727ed62e44e4044e96dce1124d95904ecf36
- Ground truth source: eth.blockscout.com (same upstream as the miner)
- Expected: 9113526
- Got: 9113525
- Payment: 0x815ba688209a19cd417cc1c72f32b8334cf6b1d5a563267e1d7e6e716122b4d3

### 25. TOKEN_HOLDER_COUNT

- Question: For LINK at 0x514910771AF9Ca656af840dff83E8264EcF986CA, what is the live holder count?
- Signal: 0xaf1929586305fea7c53c62aed128054862a6ac9f13e4e02dd034e40c7d7956c3
- Ground truth source: eth.blockscout.com (same upstream as the miner)
- Expected: 1001497
- Got: 1001497
- Payment: 0xc28871decaf52e4e91be9d1ff04746335ab771eecc3e2ffb72ac7a6241350ac1

### 26. TOKEN_HOLDER_COUNT

- Question: How widely distributed is WETH? I am after the count of distinct holders of 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2.
- Signal: 0x01a913b5b04ce85bccecd58cd601dcb6c34d9a434893dbf01e013772f301e9f5
- Ground truth source: eth.blockscout.com (same upstream as the miner)
- Expected: 3344096
- Got: 3344096
- Payment: 0x6f8fc345af7b9159da346f6570053fe0f9783802de54500e2416d9846dbf6b84

### 27. TOKEN_HOLDER_COUNT

- Question: Count the addresses holding UNI at 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984 right now.
- Signal: 0xdaff5d68e2c5fb0bc9e6e97c732664563fb6f9584f05b14e1d0f4327d1697f13
- Ground truth source: eth.blockscout.com (same upstream as the miner)
- Expected: 415559
- Got: 415559
- Payment: 0xbe08745a6ed7109b480f31f9f75084675650e0495d1060ff41fe1e31ebbc4bdc

### 28. TOKEN_HOLDER_COUNT

- Question: Tether on Ethereum, contract 0xdAC17F958D2ee523a2206206994597C13D831ec7: how many holders does it have?
- Signal: 0x44902876f1aeb40a01ab624439394bf0bd8541c3e6e5e903be02b6bf1d004a54
- Ground truth source: eth.blockscout.com (same upstream as the miner)
- Expected: 17564938
- Got: 17564938
- Payment: 0x59410ef16be79a3efedef94c4f332d66c4abf4d5b6c2c2d6c48f5f7ecea13cb1

### 29. TOKEN_HOLDER_COUNT

- Question: SHIB at 0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE is meant to have a huge holder base. What is the actual number?
- Signal: 0xa5ee80e239ca80a66d76b439212e9abe713316d7c31c6289fc7ce680e111bb07
- Ground truth source: eth.blockscout.com (same upstream as the miner)
- Expected: 1837009
- Got: 0
- Payment: 0x9bda54211ade4f6ac36a51b7e16de3b9e77afa9963f709473d39e49cf1853baf

### 30. TVL_LOOKUP

- Question: What is the total value locked in Uniswap across all the chains it is deployed on, in dollars?
- Signal: 0x5bdbd465f6ab60a1f6831d47e844951247ffb61e23cc1477c513f4a8dd2048b5
- Ground truth source: none
- Expected: 
- Got: 
- Payment: 0x759777f676893926da1e637d32f93eed81dc1af1bd3709cd3f927d36fefe8f14

### 31. TVL_LOOKUP

- Question: How much is locked in Aave at the moment? Not its market cap, and not the amount borrowed.
- Signal: 0xe729f1846398d7b35dbf8ce74e3b44668b5a9887a37a7e65f061003c563de3cf
- Ground truth source: api.llama.fi (same upstream as the miner)
- Expected: 18096854220
- Got: NaN
- Payment: 0x254f8023b584e2a062e80bdc4398d27dcdd22069aebeda79b1aa1ed21753a5f6

### 32. TVL_LOOKUP

- Question: How much capital is sitting in Curve right now across its deployments?
- Signal: 0xe525667f849fc4aa863304b6ecd17575811f3c896e0e7d324e474e26fe568bdf
- Ground truth source: api.llama.fi (same upstream as the miner)
- Expected: 1317656066
- Got: NaN
- Payment: 0x0733b896ab1b25fe6cfa6ae46d0e4380eecadc9a38dc1e7c3da03e2d7ca4bb78

### 33. TVL_LOOKUP

- Question: Give me the current TVL figure for Lido in USD.
- Signal: 0x32690c0177edaa03b4b3051461edc693d69cf4ec3a702966500b9a5b01865c33
- Ground truth source: api.llama.fi (same upstream as the miner)
- Expected: 24013546756
- Got: NaN
- Payment: 0xbd6c07b79e53420a2f4e470fbb12e64fe6fc9dace0d115569b9443d754012976

### 34. TVL_LOOKUP

- Question: What is Balancer holding in total value locked today?
- Signal: 0xf3caa864f878623f805186d73194da92d732782ed9bdb976bfb756e71cfdaaff
- Ground truth source: api.llama.fi (same upstream as the miner)
- Expected: 64972864
- Got: NaN
- Payment: 0x557c4437b1b278f9f10d5fd3629f88d78cbfc8847299523e9be12f8ee85e0ec5

### 35. TVL_LOOKUP

- Question: Is there still meaningful capital in Sushi? Give me the live TVL number.
- Signal: 0x5300578d7dd1d942926275cfc498f4e64cbc22cfc4257a66d6a980265be6a005
- Ground truth source: api.llama.fi (same upstream as the miner)
- Expected: 102342054
- Got: NaN
- Payment: 0x174f47a9b46711bd24459b1d58d2c7978eab1f61c77685c640a9de39976f24c0

### 36. TVL_LOOKUP

- Question: How much value is locked in Convex Finance at present?
- Signal: 0x56badea3ffa509f4e69372244569ef04be3276aa94a70c0250d3bf2078175cc4
- Ground truth source: api.llama.fi (same upstream as the miner)
- Expected: 579456096
- Got: NaN
- Payment: 0xe2ad076d5610bba31d8dbf7c5d526c18ff4379952f5367a3381500dbb56b2dfc

### 37. CRYPTO_PRICE

- Question: Price one whole bitcoin in US dollars as of now, and do not give me a wrapped or bridged version of it.
- Signal: 0x1b285102f960bc082c255cfdc3f1f9dd2a772f6e689d11969a12145a0e0eb612
- Ground truth source: coingecko
- Expected: 80839
- Got: 80811.17
- Payment: 0xa71cf794ebeb0bd558f6c7901c0ae9de2acc42409ce625ecb936916432a8e4a7

### 38. CRYPTO_PRICE

- Question: What is ether worth in dollars right this moment?
- Signal: 0xbddf1daecb9ad95c073bd3a013fe6df3f05e4716510ad09db8fb028a2b5ceee1
- Ground truth source: coingecko
- Expected: 2491.33
- Got: 2489.97
- Payment: 0x3211d04131c0dd735cd67d39ad44ff33d719e38fdba5693a7419d6b8cc41c7b3

### 39. CRYPTO_PRICE

- Question: Give me the live spot price of Solana in USD. Spot price, not market cap.
- Signal: 0x9c5b8dc48f30cd7747ee61077c0064a6969789ae820f25190f0ccd67a630d8af
- Ground truth source: coingecko
- Expected: 104.26
- Got: 104.27
- Payment: 0x5e20c7ce2fcd90092649c86110ce9fe01bdad87fa8f80d620aea8c8d4891566e

### 40. CRYPTO_PRICE

- Question: What is LINK trading at in dollars?
- Signal: 0xacd28445c421b9648c385130de9958a6fc283087e91c6db08330ec2d4a0e51a9
- Ground truth source: coingecko
- Expected: 11.7
- Got: 11.71
- Payment: 0x36de66dc004c5e9ff91f07b376aa12070868e96af342609f49e4f21b36268f75

### 41. CRYPTO_PRICE

- Question: Current USD price for Cardano please.
- Signal: 0x0176a63e5427f47307a06af465ced188617e3fb89374b94b6f5d568f493a0945
- Ground truth source: coingecko
- Expected: 0.221977
- Got: 0.222588
- Payment: 0x1944a38b9d294efcfbdf4af2d1d0bdc36cbc3aa29567df5b6e86a78e8a7c2070

### 42. CRYPTO_PRICE

- Question: How much is one AVAX in dollars right now?
- Signal: 0xeeb7f688207960cc75595d186d1c7ae1e471d245ab5903dc0a2bc17b8aef9244
- Ground truth source: coingecko
- Expected: 7.52
- Got: 7.53
- Payment: 0x5a75e803740ba8a6f58ee83675a9b789812d874fd91b32e9a37d0f3648465ced

### 43. CRYPTO_PRICE

- Question: What is dogecoin worth in USD at the moment?
- Signal: 0x330adfd2aca0d68fdf9290155ab610fa6b42c11ddcc1c31a9623045cae723ad9
- Ground truth source: coingecko
- Expected: 0.089305
- Got: 0.089455
- Payment: 0xa44d90e6afaab2c6ad6b05f4f475179a3f72b51e519528c4204227ef0da73ed6

### 44. CRYPTO_PRICE

- Question: Quote the UNI token in US dollars. I mean the token, not the protocol TVL.
- Signal: 0x4c11bb3b799ceae3a62b85f3de87ff93dbf3ea00587679ada7b1f1cffe8ce253
- Ground truth source: coingecko
- Expected: 6.12
- Got: 6.13
- Payment: 0xb7332143aa0372aaa2c1e4d35b94ee92a15c3f9c39fe3394a4da1f4ba19ea839

### 45. STOCK_PRICE

- Question: What is one TSLA share going for on the latest quote? Share price, not the market cap of Tesla.
- Signal: 0x4776a7a459a20144df31fad4889e7ee18dfd0afd69c7844c541f636dd7c8d709
- Ground truth source: nasdaq.com
- Expected: 382.335
- Got: 382.33
- Payment: 0x79b13d4f1614b73ad184b8771abe11eb1cdd78d6ae8baef0661a8fca903c58fd

### 46. STOCK_PRICE

- Question: Give me NVDA in dollars at the freshest price you can get.
- Signal: none
- Ground truth source: none
- Expected: a paid Telegraph answer
- Got: Telegraph returned HTTP 500.
- Payment: none

### 47. STOCK_PRICE

- Question: How much does a single Apple share cost right now?
- Signal: 0xf0fed744c05c71358bdbaba5f76ce1143b0a5459db29f2614351d3e5a8f46ff6
- Ground truth source: nasdaq.com
- Expected: 329.445
- Got: 329.432
- Payment: 0xbfc4a7f3e1f83b11c28f6c9871635edb569616084c4c60d12a9e4ac0ab4fbd60

### 48. STOCK_PRICE

- Question: Latest traded price on MSFT please.
- Signal: 0xa054f7dbafaef3051cc038878599f22c49172f48e0545d2931642946421cf2d8
- Ground truth source: nasdaq.com
- Expected: 510.99
- Got: 510.99
- Payment: 0xaedb987817053b42b9e6464e220d0a02a70becb5c174d888d673632f4250e255

### 49. STOCK_PRICE

- Question: What is Amazon stock at today?
- Signal: 0xa8ae65bce03616225d5616229eb1136ea87ef132f4903bc93990277e7b2b5ce3
- Ground truth source: nasdaq.com
- Expected: 258.33
- Got: 258.33
- Payment: 0xd9c0adf6390f028223dc5735a14de66b51f74ee6aeefe70b24bb1b6a1c18b8f3

### 50. STOCK_PRICE

- Question: Current quote for GOOGL in USD.
- Signal: 0xfc23662fc2992711467b5058051d02599a3d86fdefc3bf422e228534c11db5d9
- Ground truth source: nasdaq.com
- Expected: 341.69
- Got: 341.69
- Payment: 0xf114cd8b27df392baca7fb87fd35d54dc3c92af2e36be1881ffe38095276fc01

### 51. STOCK_PRICE

- Question: Where is META trading as of the most recent print?
- Signal: none
- Ground truth source: none
- Expected: a paid Telegraph answer
- Got: Telegraph returned HTTP 500.
- Payment: none

### 52. SSL_VERIFICATION

- Question: Do a real handshake with wikipedia.org and tell me whether the certificate it serves is valid.
- Signal: 0x1c437a0879159df59e3c2f5727256698b7e5118f8e40375f541d96596224e89f
- Ground truth source: live TLS handshake from this machine
- Expected: valid, expires 2026-11-03
- Got: valid, expires 2026-11-03
- Payment: 0xba47cefd11b0d1eb9870a83a24b4532fa650c0715810a20c4234a80eda0a5940

### 53. SSL_VERIFICATION

- Question: What is the exact expiry date on the certificate stripe.com is presenting right now?
- Signal: 0x088bfe2046af8d8e529d9f07d99c1b69d34a733ab1ebfce22c3b78b5ea48dec5
- Ground truth source: live TLS handshake from this machine
- Expected: valid, expires 2026-11-12
- Got: valid, expires 2026-11-12
- Payment: 0x7981801321ac1cb6e38f1a08cd548b9f4f54afc960e0150cb3ded1a8bc58d692

### 54. SSL_VERIFICATION

- Question: Who issued the TLS certificate github.com is currently serving, and when does it run out?
- Signal: 0x62c6807347324516b30391048aa39a4fb8acfd846c4ea25a95714462f74fa290
- Ground truth source: live TLS handshake from this machine
- Expected: valid, expires 2026-11-29
- Got: valid, expires 2026-11-29
- Payment: 0x95720e205c7db2786f352b2f695e92936a36ed0388b4883cc06908523e1747c5

### 55. SSL_VERIFICATION

- Question: Is cloudflare.com serving a trusted, still-valid certificate?
- Signal: 0x3bf47a74afcd7f20f6593d42973e98baa9080b3c8d3ed46d6ff345cc49648b14
- Ground truth source: live TLS handshake from this machine
- Expected: valid, expires 2026-10-06
- Got: valid, expires 2026-10-06
- Payment: 0x418bef53b7bb984ed74c9da866269ce2bbbe07e041cc5640854210c41808c849

### 56. SSL_VERIFICATION

- Question: Check the live certificate on bbc.co.uk. Valid or not, and expiring when?
- Signal: 0x018a7ce3fec3fe6c872670a4135d2251f06e7f972587cd822dc8d08571b537f9
- Ground truth source: live TLS handshake from this machine
- Expected: valid, expires 2027-01-24
- Got: valid, expires 2027-01-24
- Payment: 0x8d6408ce4f88250a84c66a3790adbd0a01a7d32ec1b21d3818046ccf26f033da

### 57. SSL_VERIFICATION

- Question: I want the certificate details nytimes.com is actually serving today, not what a scan cached last week.
- Signal: 0xe08db1c3526b2b0af2bc032af178256dc295636f23da6221726685143f6f1aef
- Ground truth source: live TLS handshake from this machine
- Expected: valid, expires 2027-03-19
- Got: valid, expires 2027-03-19
- Payment: 0xeda81d691267d3b5667600e05912293c59819f700c7468868fc14bf14d277c29

### 58. SSL_VERIFICATION

- Question: Verify the TLS setup on mozilla.org and give me the issuer plus the expiry.
- Signal: 0xb41a373c0020735f7df63f5024b1976c383053a8b405cc1e3d59a8e8743b9568
- Ground truth source: live TLS handshake from this machine
- Expected: valid, expires 2026-10-21
- Got: valid, expires 2026-10-21
- Payment: 0xd90814a1fd477386e9348a6275d9a8e6c93449302e0e1d12d0df25991a206ba5

### 59. WEATHER_FORECAST

- Question: Is it going to actually rain in London tomorrow, or just look like it?
- Signal: 0xe78c66d3838d94bdfb8f87b85b1775dc41cccebad7b8541a42dbe6d95c460552
- Ground truth source: open-meteo (same upstream as the miner)
- Expected: 25.3C max
- Got: NaNC max
- Payment: 0xb9049afd9ee9ff96b76c2fe76937c5292fb500e602e2c59e02de6d477ec4c375

### 60. WEATHER_FORECAST

- Question: Give me the high, the low, the rain and the wind for Tokyo over the next two days.
- Signal: 0x7f6e2882bd9c472eb06f154e54442901e7ac437acaaababd1e5659a177be9e5b
- Ground truth source: open-meteo (same upstream as the miner)
- Expected: 25.4C max
- Got: NaNC max
- Payment: 0x5f0be82d349cc7d4788f1ab20ff9ca87bbcc3ba29e840611b7c0fa3be6c8ebae

### 61. WEATHER_FORECAST

- Question: How windy is Lagos going to get tomorrow?
- Signal: 0xb142f702d67faa6af2d812d1f37f25534867260500f8bf6500d18a9524093aaf
- Ground truth source: open-meteo (same upstream as the miner)
- Expected: 28.3C max
- Got: NaNC max
- Payment: 0x3f0e3a5067564155535ce1a5d6db6f553e8d69712c758f45c3b0354f58355b2c

### 62. WEATHER_FORECAST

- Question: What temperatures should I expect in Cape Town over the next couple of days?
- Signal: 0x5c0214920f1135a5f9b89488f5aeb72a09051d9480512d30c0aa5c1f0cd5d1de
- Ground truth source: open-meteo (same upstream as the miner)
- Expected: 22.6C max
- Got: NaNC max
- Payment: 0x4126f9fc46958cbab556e84e43f638cd1c68e98f64e27ab5c036dd4a2714299b

### 63. WEATHER_FORECAST

- Question: Toronto forecast for tomorrow please, with the expected high.
- Signal: 0x09aa37e43fe2662caf64f8c5ac193d4ff98709828fe047a4ee8c347b5b94bc48
- Ground truth source: open-meteo (same upstream as the miner)
- Expected: 26.3C max
- Got: NaNC max
- Payment: 0x2f4d05e25aee8bc2856318324acb7b61114d0edbe094befb00966862327027c0

### 64. WEATHER_FORECAST

- Question: Should I plan around rain in Mumbai over the next two days?
- Signal: 0x08789ad94c386ac41176d2ac2dee8c8f863c465e9e1b4aa67ffa569b78ad684f
- Ground truth source: open-meteo (same upstream as the miner)
- Expected: 29.4C max
- Got: NaNC max
- Payment: 0x73f6a5eb5c69dc3e6f34031a0794eca2df1cd65de31b3ddcac42587844199d4f

### 65. WEATHER_FORECAST

- Question: What is the outlook for Berlin tomorrow, temperature and precipitation both?
- Signal: 0x0c45ea22896339a73b16f34f4a66c5b08262257010d0167872b0f7c97bf55611
- Ground truth source: open-meteo (same upstream as the miner)
- Expected: 24.7C max
- Got: NaNC max
- Payment: 0xc59040618f2ae18ba53645912ab99b48dc748098b057a5912db1a544fb31d368

### 66. STORM_ALERT

- Question: Assess Manila over the next 48 hours for storm disruption. I care about gusts and flooding, not the average temperature.
- Signal: 0x2b153619ad5b98aa82d99925542f159f6deb78ba236f35844623950137695efe
- Ground truth source: open-meteo (same upstream as the miner)
- Expected: 61.2 km/h peak gust
- Got: 48 km/h
- Payment: 0xe3e695ebc1c20ae8b6d5e2bac375920a02020c42171613a1a69ebbe99d67badb

### 67. STORM_ALERT

- Question: Could severe weather disrupt things in Miami in the next two days? Put a number on it.
- Signal: 0x69c56c56d1c10afc5a749bdfd7c7ffe952d48930f54f278f6cee1fb4e7bb7bd4
- Ground truth source: open-meteo (same upstream as the miner)
- Expected: 25.2 km/h peak gust
- Got: 22.2 km/h
- Payment: 0xbf6c1f71a7850ed2da2acea6713691aa91eab245f13289bc90f63e901c6d7bd5

### 68. STORM_ALERT

- Question: Is Osaka facing a real storm threat in the coming 48 hours?
- Signal: 0x3e104a21999971e9e97ac3de14ec9379b8706d30501602a9ab5b996792b431b0
- Ground truth source: open-meteo (same upstream as the miner)
- Expected: 34.2 km/h peak gust
- Got: 48 km/h
- Payment: 0x994553c878e2cd20f2fa7657af46c8a37e9c10fd8a1b1e8fefe46b91da18720d

### 69. STORM_ALERT

- Question: How rough is the next 48 hours looking in Reykjavik, wind especially?
- Signal: 0x04d36530b2a1f2bdf56d03109e22cac148c2b57f27b5a9623c02d89defe0b1c3
- Ground truth source: open-meteo (same upstream as the miner)
- Expected: 32.4 km/h peak gust
- Got: NaN km/h
- Payment: 0x421d7729e2aee19a1d08317cb94db5360d8c295996fd59eeb07309af8c435269

### 70. STORM_ALERT

- Question: Houston over the next two days: any storm risk worth rescheduling for?
- Signal: 0xc6fe2eb790394bc13786181d5dc192c3658c7ce6e3f15be3cf9470e3ca002f91
- Ground truth source: open-meteo (same upstream as the miner)
- Expected: 35.6 km/h peak gust
- Got: 16.7 km/h
- Payment: 0x76f3f4100c83a48d3272a847eab776a5df0ef1ebc4ba3dd7d65f2d8a0257e8e5

### 71. STORM_ALERT

- Question: What is the storm and flooding risk in Dhaka across the next 48 hours?
- Signal: 0x0c2100e2512881e89bb4237fcb0dcd6d682256209721835fee2c50c82a0bc774
- Ground truth source: open-meteo (same upstream as the miner)
- Expected: 32 km/h peak gust
- Got: 48 km/h
- Payment: 0x0f3ff3c3207ab28983678d23926cd9644ec0a40178f73e2c79023264a8a06060

### 72. STORM_ALERT

- Question: Auckland, next 48 hours. Peak gusts and whether it counts as disruptive.
- Signal: 0x0fca875995482fcd319e37112d66bf6c921c7a6c1c377c6cb4b425fcd4ae7a21
- Ground truth source: open-meteo (same upstream as the miner)
- Expected: 70.2 km/h peak gust
- Got: 48 km/h
- Payment: 0x437225ce6d4608f62480f6f1676952d14b4ed4eda6070d33ec27b0a0050e6ecc

### 73. IP_GEOLOCATION

- Question: Where does 8.8.4.4 sit geographically, who runs the network, and does it look like VPN or hosting infrastructure?
- Signal: 0x7ada6ab92a252f2c694befaca0821a551d3ad2911ef3146bf5eba3c34c806a30
- Ground truth source: ipinfo.io
- Expected: US / AS15169
- Got: US / AS15169
- Payment: 0xe567247e73a7f5df3455d0ed12922e88ced14ba240010b9e1c0681e1e4a1ab5b

### 74. IP_GEOLOCATION

- Question: Which country and which network currently announce 1.1.1.1?
- Signal: 0x11da07e303ef79f21b6ec9020ff14ed8392ef933754e0bedbcf64b9c81cff014
- Ground truth source: ipinfo.io
- Expected: AU / AS13335
- Got: undefined / ASnull
- Payment: 0xfe728dc503775d4b190afe46a3738929ba133499915383b34ed083da899629a7

### 75. IP_GEOLOCATION

- Question: For 104.16.132.229, separate the physical city estimate from the organisation that actually operates the address.
- Signal: 0xd0eb377840c751e58df432298e272debcd3590ba9551421fc1e4ccae21654993
- Ground truth source: ipinfo.io
- Expected: US / AS13335
- Got: US / AS13335
- Payment: 0xe3e7863871484ac53b8548a9cd657a3cb80ff4ecd0eb21389adbb56f04c8b59c

### 76. IP_GEOLOCATION

- Question: Locate 9.9.9.9 and tell me whose network it belongs to.
- Signal: 0xe1d7c9c3af0fece658e41e0b265e0fc6323d7efad9bfa52170dc7b983705214b
- Ground truth source: ipinfo.io
- Expected: US / AS19281
- Got: US / AS19281
- Payment: 0xe3bea609cd02a6de5ac30779037d3392b768ac4356a8f44416cb7a4f3c82d594

### 77. IP_GEOLOCATION

- Question: Is 208.67.222.222 a datacenter address, and where does it resolve to?
- Signal: 0x8af0ac9338e722e80423dc7d28485ee6f9942ac3cae471e004d0607e33a7e8ba
- Ground truth source: ipinfo.io
- Expected: US / AS36692
- Got: US / AS36692
- Payment: 0x04999ba137191402d1c5071af4f4ce622313819c5151ad8aaaae7643886b6ed8

### 78. IP_GEOLOCATION

- Question: Country and autonomous system for 8.8.8.8 please.
- Signal: 0x9e0c0f85d011ab8919bc01030f1b2df2dc1d4c099c135cbe31435b25a5f4b0d6
- Ground truth source: ipinfo.io
- Expected: US / AS15169
- Got: US / AS15169
- Payment: 0x410aa28cbd326e63c6655e6e895d9a4b2b35afca62234c3cfa4c8d1751a34c74

### 79. IP_GEOLOCATION

- Question: I keep seeing 1.0.0.1 in logs. Where is it and who owns it?
- Signal: 0x73f11313109eb084e3b9d199c16055f636d49ed4d543c0f11cb30cdc36b97a68
- Ground truth source: ipinfo.io
- Expected: AU / AS13335
- Got: AU / AS13335
- Payment: 0x0e14122a307d759df3f8d5573a23082ed88950414e2a6f75d7fd2a985e8acc9b

### 80. ACADEMIC_SEARCH

- Question: Find me peer-reviewed journal work that surveys how hallucination in large language models gets categorised.
- Signal: 0x598037ed9162d935d9f4cee82db3ea7b6df271603127d4fcde53462288184187
- Ground truth source: miner response
- Expected: at least one paper
- Got: none listed
- Payment: 0x5c0def589f4db26d794361f38c3740bca66db4cdbdf630865ad7be679210477f

### 81. ACADEMIC_SEARCH

- Question: Which peer-reviewed human studies cover CRISPR gene editing in a clinical setting and its safety record?
- Signal: 0x6fa81c97d6fe3704abbd360bff83353ce7778bdc99562c55e7c2098ff66f2082
- Ground truth source: miner response
- Expected: at least one paper
- Got: none listed
- Payment: 0x2fd9b6ca1aecd29898cca7fbb4f7b6b0470bb1662054ef06776fee8dcfeb06f8

### 82. ACADEMIC_SEARCH

- Question: I want highly cited peer-reviewed papers measuring efficiency gains in perovskite solar cells.
- Signal: 0x7ad7e991923d80016a9f0e9466f5653fb4928558257cf5539a1ea5a0707385db
- Ground truth source: miner response
- Expected: at least one paper
- Got: none listed
- Payment: 0x0fa1b767cd174e80f1fba7a30061b9c4df538caf7821da088f9ae8a1da6368ff

### 83. ACADEMIC_SEARCH

- Question: Point me at real published research on the mechanisms behind antibiotic resistance in gram-negative bacteria.
- Signal: 0x894c2d08caf47c38e8efdbf42d95772d559f18775734757c0e6f63cf143b7c61
- Ground truth source: miner response
- Expected: at least one paper
- Got: none listed
- Payment: 0x7fdfcee780f91d75e0eae16677b0b91ba2a9e856d58d3063d95b5db086c956fe

### 84. ACADEMIC_SEARCH

- Question: Is there serious peer-reviewed literature on interpretability methods for transformer models? Give me actual papers.
- Signal: 0xeea526a9d247b6fd8dbf03b13dc53ee0be8434226a8a5ed7ca8458408c78dec9
- Ground truth source: miner response
- Expected: at least one paper
- Got: none listed
- Payment: 0x513997e566f24b609b47a6b64fdb5913b95a020f4a5e1245104b345571a12e87

### 85. ACADEMIC_SEARCH

- Question: Find published studies on how ocean acidification affects coral calcification.
- Signal: 0x734cc121f7008b8ce6058d09c8de34a6c42cb045628a2e081805b511d270a7f1
- Ground truth source: miner response
- Expected: at least one paper
- Got: none listed
- Payment: 0x2c83de1d0c6b263e19b3ec9a7ab5e605f5732be035a21f8226184724251ee3fa

### 86. ACADEMIC_SEARCH

- Question: What peer-reviewed work exists on solid-state battery electrolytes and their conductivity limits?
- Signal: 0x35bb5d21112bac38f65ef7ce1450673a3ed80f578cdb27aec8086d502a7b3a73
- Ground truth source: miner response
- Expected: at least one paper
- Got: none listed
- Payment: 0xc11432fece834411a964cf10e438a0091ee0ea42f298dac3157ff5b05019c172

### 87. WEB_SEARCH

- Question: Who is currently serving as secretary general of the United Nations?
- Signal: 0x9c08348e281c5874f7c07f5d00f96ecacf285ef56646aa934a88b4fb3c45e166
- Ground truth source: settled public fact
- Expected: guterres
- Got: present in answer
- Payment: 0xd560887bb494c4facb46059bf213d33b4012d08d0779b709f0f018cdbbaeadc2

### 88. WEB_SEARCH

- Question: When exactly was the James Webb Space Telescope launched?
- Signal: 0xa2149fc9b2fbec546d35a3800f5350645bca38fb1f2d227bcc7be548002d17a8
- Ground truth source: settled public fact
- Expected: 2021 + december
- Got: present in answer
- Payment: 0xbd6a9043ec1250f612eef529857f514c124689363475aa877ca6835830d76515

### 89. WEB_SEARCH

- Question: What is the chemical symbol for tungsten, and why is it that rather than the obvious one?
- Signal: 0x73db0911522474ee4706c2b57ea76049b9dedeefb893a343fb584c67f032e71d
- Ground truth source: settled public fact
- Expected: w
- Got: present in answer
- Payment: 0x7dee54178ecf224e3631d64f81e432abc19245f97a4680e82d5a04804a180df9

### 90. WEB_SEARCH

- Question: Which city is the capital of Australia? Not the biggest city, the capital.
- Signal: 0x4dde24803d21d86ddb51b079b6619ac972c14825853931bdfd89354a4dfdf7a7
- Ground truth source: settled public fact
- Expected: canberra
- Got: present in answer
- Payment: 0xf6574b014cde10bfd17e8fb121fa45067b0a9e27281c4aaa35a814404b1c840f

### 91. WEB_SEARCH

- Question: In what year did humans first land on the Moon?
- Signal: 0xb0a3ca01d8a3da61170d40da6de8150d9f24e425e25759503066fbc166ed25e5
- Ground truth source: settled public fact
- Expected: 1969
- Got: present in answer
- Payment: 0x31ae412ff2daf1d5edaae684b8485f3a37e69067bd8e6725565bf3e4d0324a0d

### 92. WEB_SEARCH

- Question: Which ocean is the deepest point on Earth found in?
- Signal: 0x8a61bf3b2041f622d756783323951a38cee4571676c4b3b41c691d0121455f0a
- Ground truth source: settled public fact
- Expected: pacific
- Got: 
- Payment: 0x9d0096a67281721443b1f86a16022389c66c2c204946a816f9432e892f517468

### 93. WEB_SEARCH

- Question: Which planet in our solar system is closest to the Sun?
- Signal: 0xbdb57981ccbd169f2da72e2fcb83786b21a7cc5fc8ecc34c8638fa6aa0b04ac6
- Ground truth source: settled public fact
- Expected: mercury
- Got: present in answer
- Payment: 0xfd1617da81953d682dd6c9acf2cc63b77beeab203bfb57584a63a671f6f0682e

### 94. FRAUD_DETECTION

- Question: Is 0x098B716B8Aaf21512996dC57EB0615e2383E2f96 tied to a known theft or a sanctions listing, or is that just rumour?
- Signal: none
- Ground truth source: none
- Expected: a paid Telegraph answer
- Got: Telegraph returned HTTP 500.
- Payment: none

### 95. FRAUD_DETECTION

- Question: Run a fraud risk check on 0x8589427373D6D84E98730D7795D8f6f8731FDA16 and tell me what the evidence actually is.
- Signal: 0x115e60aa7155387a3f098e29fe284db026e35a73c2c14570819db1285a449fb5
- Ground truth source: OFAC designation record
- Expected: high risk
- Got: unclear
- Payment: 0xe36ebe6effb239ff96928a74a12e44b9a81174897cdc60cf2f112dada53e88c3

### 96. FRAUD_DETECTION

- Question: Before I interact with 0x722122dF12D4e14e13Ac3b6895a86e84145b6967, is there anything on it I should know?
- Signal: 0x6665b1188682f2735d13251c8008fc870c24710cf1d9f6d0aad45c3aa2222211
- Ground truth source: OFAC designation record
- Expected: high risk
- Got: unclear
- Payment: 0x9e259113bd0b0016c673b754917d061861cf7da41ed08b4c3d09ee5f9df73a93

### 97. FRAUD_DETECTION

- Question: Look for evidence before deciding whether 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 deserves to be labelled criminal.
- Signal: 0xfb6accd716f824163b7657b84178275967bfc133e546581b6420b285beda424b
- Ground truth source: OFAC designation record
- Expected: not high risk
- Got: unclear
- Payment: 0x0fcd7d85f098969b0764a8729f056bc6660ac4684ebd5e85973a9841f18e2246

### 98. FRAUD_DETECTION

- Question: Is 0x28C6c06298d514Db089934071355E5743bf21d60 a scam address? It moves a lot of money, which is not the same thing.
- Signal: none
- Ground truth source: none
- Expected: a paid Telegraph answer
- Got: Telegraph took longer than 90000ms to answer.
- Payment: none

### 99. FRAUD_DETECTION

- Question: Any sanctions or scam reports against 0x2910543Af39abA0Cd09dBb2D50200b3E800A63D2?
- Signal: 0x9335c0d1c127c66dd75eb016e6fb098f8c88481024eced77b5aa0e1f09e5b1bd
- Ground truth source: OFAC designation record
- Expected: not high risk
- Got: unclear
- Payment: 0x7ec7f63175c92105e8f650949bd664d7d32f437fc313d23f72d7bab97378e57c

### 100. FRAUD_DETECTION

- Question: Should I treat 0x8315177aB297bA92A06054cE80a67Ed4DBd7ed3a as risky, or is it a legitimate contract?
- Signal: none
- Ground truth source: none
- Expected: a paid Telegraph answer
- Got: Telegraph returned HTTP 500.
- Payment: none

