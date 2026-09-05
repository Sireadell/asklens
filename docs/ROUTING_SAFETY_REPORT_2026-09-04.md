# Telegraph fraud-routing safety check

Date: 2026-09-04

## Why we ran this

Fraud-detection miners inside the same intent do not necessarily perform the same checks.
Sentinel examines sanctions records, circular funding, shared funders, funder fan-out,
contract controls, and transaction evidence. We wanted to see whether a user asking a
normal fraud question could reliably reach a miner capable of answering it.

## Method

We tested ten Ethereum addresses covering known harmful wallets, normal high-activity
wallets, and addresses that should not be assessed as ordinary wallets.

Each case was sent through AskLens in two ways:

1. A normal plain-language request through Telegraph's automatic routing.
2. A direct `check_wallet_safety` request to Telegraph Sentinel through Telegraph.

These were real paid testnet requests. Nothing was mocked.

## Results

| # | Address or case | Automatic routing | Direct Sentinel result |
|---|---|---|---|
| 1 | Ronin Bridge exploiter | Failed before miner selection | HIGH, 95%, sanctions match |
| 2 | Tornado Cash-related address | Failed before miner selection | HIGH, 90%, circular funding |
| 3 | SUEX | Failed before miner selection | HIGH, 95%, sanctions match |
| 4 | SecondEye / REvil-linked wallet | Failed before miner selection | HIGH, 95%, sanctions match |
| 5 | Compromised Bybit wallet | Failed before miner selection | HIGH, 90%, circular funding |
| 6 | vitalik.eth | Failed before miner selection | LOW, 10%, limited evidence |
| 7 | Binance 14 | Failed before miner selection | LOW, 5%, known exchange |
| 8 | Kraken 4 | Failed before miner selection | LOW, 10%, limited evidence |
| 9 | Tornado Cash router contract | Failed before miner selection | NOT_APPLICABLE, not a standard wallet |
| 10 | Burn address | Failed before miner selection | NOT_APPLICABLE, not a standard wallet |

Automatic routing completed 0 of 10 requests. Sentinel completed 10 of 10.

All ten routed requests failed with a router-side error before any miner was selected. We have
not yet confirmed the exact error breakdown against a saved log, so we are not stating specific
error counts or token numbers here until that is verified.

Sentinel's own output marks 8 of these 10 answers "Assessment status: LIMITED" (its own label for
incomplete observation), and only 2 as fully "ASSESSED". The HIGH/LOW percentages above are real,
but most of them come with that caveat attached.

## Earlier evidence of wrong selection

This availability problem sits beside an earlier capability-matching problem observed on
2026-09-03.

Telegraph correctly classified this request as `FRAUD_DETECTION`:

> Run a fraud risk check on `0x8589427373D6D84E98730D7795D8f6f8731FDA16`
> and tell me what the evidence actually is.

It routed the request to SarzOps Fraud Intelligence, which is the right category, not a
mis-route. SarzOps is a retrieval-based fraud-news miner that is designed to abstain rather
than fabricate when it has no sourced public reporting on an address, and that is what it did
here. This is not a routing bug; it shows that `FRAUD_DETECTION` bundles two different jobs
(public fraud-news lookup and on-chain wallet forensics) under one category. Sentinel, asked
the same address directly, returned HIGH after finding circular funding and attached four
evidence signals (assessment status: LIMITED).

Another fraud question was routed to a Telegraph documentation miner, and another was sent
to a prompt-injection detector. Those miners could not perform the requested wallet
investigation.

## What we recommend

Keep Telegraph's competitive routing, but add capability matching before ranking.

A fraud request should be able to declare requirements such as:

- sanctions lookup
- wallet clustering
- circular-funding analysis
- funder fan-out analysis
- contract-control analysis
- transaction evidence

Telegraph can first remove miners that cannot perform the requested checks, then choose among
the eligible miners using its normal performance-based routing. This preserves competition
without treating every miner registered under one broad intent as interchangeable.

The routing service also needs a fallback when its chosen model is unavailable, and the
miner context supplied to that model must fit within its input limit.

