# Review request: Telegraph routing for wallet-fraud questions

Date of tests: 2026-09-04

## What we need reviewed

We are building AskLens, a web app and MCP server that lets people and AI tools
use specialist services on Telegraph Protocol. One of our services, Sentinel,
assesses Ethereum and Base wallet risk using sanctions records, funding patterns,
contract controls, and transaction evidence.

We need an independent review of whether the evidence below supports this concern:

> A broad `FRAUD_DETECTION` category may route a wallet-investigation request to
> a service that cannot perform the checks the request needs. The router was also
> unavailable during our latest ten-request sample.

Please challenge the conclusion if the evidence is weak, incomplete, or framed
unfairly. Do not assume Sentinel is the only capable fraud service.

## Important context

Telegraph's intended model is that an application declares the type of answer it
needs and Telegraph chooses a service based on performance. The application does
not normally choose a specific service.

The problem is that `FRAUD_DETECTION` currently covers many different jobs:

- wallet-history investigation
- sanctions and known-scam checks
- smart-contract risk analysis
- email reputation
- scam-message analysis
- general fraud-information questions

These jobs are related, but they are not interchangeable.

## Method

We chose ten Ethereum addresses covering known harmful wallets, normal
high-activity wallets, and addresses that should not be treated as ordinary
wallets.

For each address, we sent a plain-language question through AskLens' normal
Telegraph routing. We then sent the address directly to Sentinel through the
AskLens MCP wallet-safety tool.

The direct Sentinel call is deliberately not presented as proof that Sentinel is
better than every other service. It shows that a specialised wallet check was
available while automatic routing could not select any service at all.

## The ten sampled questions and results

| # | Plain-language question sent to automatic routing | Result from automatic routing | Direct Sentinel result |
|---|---|---|---|
| 1 | Is Ethereum wallet `0x098B716B8Aaf21512996dC57EB0615e2383E2f96` linked to fraud or sanctions? Give evidence. | Failed before selecting a service. | HIGH, 95%. Sanctions match, direct funder, circular funding, and funding cluster. (LIMITED) |
| 2 | Check Ethereum wallet `0x8589427373D6D84E98730D7795D8f6f8731FDA16` for fraud risk and explain the evidence. | Failed before selecting a service. | HIGH, 90%. Circular funding, funder fan-out, and funding cluster. (LIMITED) |
| 3 | Assess Ethereum wallet `0x2f389ce8bd8ff92de3402ffce4691d17fc4f6535` for sanctions or fraud risk. | Failed before selecting a service. | HIGH, 95%. Sanctions match, funder fan-out, and funding cluster. (LIMITED) |
| 4 | Is Ethereum wallet `0x1da5821544e25c636c1417ba96ade4cf6d2f9b5a` unsafe? Show the evidence. | Failed before selecting a service. | HIGH, 95%. Sanctions match and funding cluster. (ASSESSED) |
| 5 | Assess Ethereum wallet `0x47666fab8bd0ac7003bce3f5c3585383f09486e2` for fraud risk, including suspicious funding patterns. | Failed before selecting a service. | HIGH, 90%. Circular funding and funding cluster. (LIMITED) |
| 6 | Does Ethereum wallet `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045` show evidence of fraud? | Failed before selecting a service. | LOW, 10%, but limited confidence. No strong risk conclusion. (LIMITED) |
| 7 | Is Ethereum wallet `0x28C6c06298d514Db089934071355E5743bf21d60` fraudulent, or is it a legitimate high-activity wallet? | Failed before selecting a service. | LOW, 5%. Publicly identified exchange wallet. (ASSESSED) |
| 8 | Check Ethereum wallet `0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0` for fraud risk without treating high transaction volume as proof. | Failed before selecting a service. | LOW, 10%, but limited confidence. No strong risk conclusion. (LIMITED) |
| 9 | Should Ethereum contract `0x722122dF12D4e14e13Ac3b6895a86e84145b6967` be assessed as an ordinary wallet? Explain any risk. | Failed before selecting a service. | NOT_APPLICABLE. Known mixer or non-standard wallet, so it should not receive an ordinary wallet-risk verdict. (INCONCLUSIVE) |
| 10 | Assess `0x000000000000000000000000000000000000dEaD` for fraud risk. Is it an ordinary wallet? | Failed before selecting a service. | NOT_APPLICABLE. Burn address, not a standard funded wallet. (INCONCLUSIVE) |

Automatic routing completed 0 of 10 requests. Sentinel completed 10 of 10
direct wallet checks. Sentinel's own output marks 6 of these 10 answers "LIMITED"
(its label for incomplete observation) and 2 "INCONCLUSIVE"; only 2 are fully "ASSESSED".

## What the routing failures said

All ten requests failed with a router-side error before any service was selected.
We have not verified the exact error type or a token-limit figure against a saved
log, so we are not stating specific error causes or counts here pending that check.

## Earlier examples where automatic routing did select a service

On 2026-09-03, the router completed several fraud-related requests. These are
useful because they show selection problems separately from the September 4
availability problem.

| Request | Expected category | Category or service selected by Telegraph | Outcome |
|---|---|---|---|
| Check `0x8589427373D6D84E98730D7795D8f6f8731FDA16` for fraud risk and show evidence. | Fraud detection | `FRAUD_DETECTION`, SarzOps Fraud Intelligence | Correct category, not a mis-route. SarzOps is a retrieval-based fraud-news miner that abstains rather than fabricates; it found no sourced public reporting and said so. It does not perform wallet-history or transaction-evidence analysis, which is a different job than Sentinel's. |
| Before I interact with `0x722122dF12D4e14e13Ac3b6895a86e84145b6967`, is there anything I should know? | Fraud detection | `TELEGRAPH_KNOWLEDGE`, LiveCert Operational Signals | Returned documentation information about Telegraph instead of a wallet assessment. |
| Look for evidence before deciding whether `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045` should be labelled criminal. | Fraud detection | `TEXT_CLASSIFICATION`, Elcaro IPI Detector | Scanned the wording for prompt injection instead of assessing the address. |
| Any sanctions or scam reports against `0x2910543Af39abA0Cd09dBb2D50200b3E800A63D2`? | Fraud detection | `CONTENT_MODERATION`, Elcaro IPI Detector | Scanned the wording for prompt injection instead of checking the address. |

## Known limits and fair interpretation

- This is a small sample, not a full benchmark.
- The direct Sentinel calls use a wallet-specific endpoint. Automatic routing may
  choose a different endpoint and service for a natural-language request.
- A single poor SarzOps answer does not prove SarzOps cannot perform wallet
  analysis. Its live registration could not be inspected on September 4 because
  it was no longer listed in Telegraph's live integration list.
- Other current fraud services do claim overlapping capabilities. For example,
  DegenLens claims several on-chain wallet-pattern screens, while other services
  focus on contracts, messages, emails, or risk gates.
- The strongest proven point is not that Sentinel is uniquely capable. It is that
  the broad fraud category includes incompatible jobs and the current router can
  fail before any service is selected.

## Suggested solution to evaluate

Keep competitive routing, but let a request declare the evidence it requires.
For example:

- sanctions lookup
- wallet clustering
- circular-funding analysis
- funder fan-out analysis
- contract-control analysis
- transaction-hash evidence

Telegraph could first remove services that do not declare the needed capability,
then apply its normal performance-based routing among the remaining services.

## Questions for review

1. Does this evidence support the claim that capability matching is needed before
   ranking for safety-critical wallet requests?
2. What claims would be unfair or unsupported if we present this to Telegraph?
3. Is capability matching the right solution, or is there a better design that
   keeps Telegraph's competitive model intact?
4. What additional tests would make this case stronger without turning the
   exercise into artificial traffic generation?
5. How would you separate the routing availability failure from the
   category-matching failure in a clear report to the team?

## Primary sources for the known-risk examples

- Ronin wallet designation: https://ofac.treasury.gov/recent-actions/20220506
- SUEX designation: https://home.treasury.gov/news/press-releases/jy0364
- Bybit incident context: https://www.bybitglobal.com/en/learn/this-week-in-bybit/bybit-security-incident-timeline
- Telegraph live integration registry queried during this review: https://devnode.telegraphprotocol.com/miner-dispatcher/integrations

