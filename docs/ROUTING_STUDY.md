# Why our miners don't get picked

Field study, 2026-09-02, epoch 302. Written so a later session can pick this up
without re-deriving it.

Everything below comes from 40 recorded head-to-heads (`data/comparisons.jsonl`)
and a leaderboard snapshot (`data/standings.jsonl`). All of it is reproducible:

```
npm run watch        ask across every intent we serve, record who answered
npm run standings    snapshot the leaderboard, append to the history
npm run probe        hit our own miners directly: free, no scoring effect
```

## The question

Which miner gets picked most, are the picked miners actually correct, and what
are we doing wrong?

## Answer 1: no single miner wins. Routing is per intent.

There is no dominant miner. Each intent has its own leaderboard and its own
winner, and the router picks the top of that intent. Across 40 questions the
most any one miner won was 4, and each of them won inside a single intent.

Our miners were picked 3 times out of 40, all three on IP_GEOLOCATION.

## Answer 2: the picked miners are often wrong. 57% usable.

Of 40 routed answers, 23 were usable. The rest refused, returned no readable
text, or answered in one or two words. Several of the worst are the top-ranked
miner in their intent:

| Miner picked | Intent | Picks | Usable |
|---|---|---|---|
| sentinel-risk-oracle | CRYPTO_PRICE | 3 | 0, answered about ETH whichever coin was asked |
| alphavantage | STOCK_PRICE | 3 | 0, returned no readable text at all |
| tvlwire-oracle | TVL_LOOKUP | 2 | 0, returned no readable text |
| preflight-ssl-verification | ACADEMIC_SEARCH | 2 | 0, answered the single word "found" |
| livecert | SSL_VERIFICATION | 3 | 0, answered "valid" and nothing else |
| chainwire-holder-count | TOKEN_HOLDER_COUNT | 4 | 2 |

Note the fourth row: a miner whose own slug says it does SSL verification holds
rank 1 on academic paper search.

The sharpest case is fraud. Asked whether
`0x098B716B8Aaf21512996dC57EB0615e2383E2f96` was linked to scams, the routed
miner said there was no publicly documented evidence. That address is the Ronin
Bridge exploiter, OFAC-sanctioned in April 2022 and attributed to North Korea's
Lazarus Group. Our Sentinel, asked the same question directly, returned HIGH
risk on a sanctions-list match at 0.95 confidence.

So a routed answer is not a quality signal. We measured that rather than
assuming it.

## Answer 3: why we are not picked

Routing follows the leaderboard score. Those scores are not spread evenly. They
fall into three shapes, and the shape decides whether an intent is worth
fighting for at all. All figures from epoch 302.

### Shape A, locked: one miner at 1.0, everyone else eleven orders down

```
GAS_PRICE          1. onchain-intel-miner   1.0000e+0
                   3. txlens                1.3581e-11   <- us
FRAUD_DETECTION    1. anchor                1.0000e+0
                   6. telegraph-sentinel    7.2523e-15   <- us
```

We are not slightly behind here, we are behind by a factor of a hundred billion.
Sentinel sits at 7e-15 on FRAUD_DETECTION while answering that intent correctly,
which is the clearest evidence that this number is not tracking answer quality
in a way we can influence by answering better today.

### Shape B, dead: nobody has a real score, including the leader

```
CRYPTO_PRICE       1. sentinel-risk-oracle  3.2433e-15
                   7. txlens                5.3410e-25   <- us
```

Also WALLET_BALANCE_CHECK, STOCK_PRICE, TOKEN_HOLDER_COUNT and WEB_SEARCH. The
whole field has decayed to nothing, so rank is not a quality ordering, it is
just who decayed least. That is how a miner answering "ETH price unavailable"
to a question about Bitcoin still wins every routed crypto-price question.

### Shape C, contested: several miners in one band, gaps of a few percent

```
IP_GEOLOCATION     1. txlens                9.9606e-1    <- us, and we hold it
                   2. netwire-ip            9.9465e-1
ACADEMIC_SEARCH    1. preflight-ssl-verif   1.1826e-2
                   2. txlens                1.1620e-2    <- us, 1.8% behind
STORM_ALERT        1. skywire-storm-alert   9.9050e-3
                   3. txlens                9.4900e-3    <- us, 4% behind
SSL_VERIFICATION   1. livecert              1.0817e-2
                   3. txlens                7.9640e-3    <- us
ONCHAIN_TX_LOOKUP  1. veyctum               1.3561e-2
                   4. txlens                8.9980e-3    <- us
```

## The mechanism, and how sure we are

**Well supported by the data.** The one intent where we hold a real score
(IP_GEOLOCATION, 0.996) is the only intent where we received routed traffic,
3 for 3. Score and traffic move together.

**Our working explanation, not yet proven.** Scores appear to decay toward zero
when a miner is not scored, and a miner is only scored when it is routed a
request. Routing goes to the top of the leaderboard, so the leader keeps being
scored and stays on top while everyone below decays until their score is a
rounding error. The exponents support this: 1e-11, 1e-15 and 1e-25 look like the
same decay caught at different ages, not like graded answers. Telegraph's own
docs describe a 7-day grace period giving new miners 5% of routed traffic, which
is exactly the escape hatch this problem would need, and ours has expired.

**What would confirm it.** Snapshot standings now, send a run of direct asks to
our miners through the engine, then snapshot again next epoch. If a direct ask
counts as a scored request, our score should rise on the intents we asked. If
nothing moves, only router-chosen traffic is scored and the loop is closed.
`npm run standings -- --history` exists to show that movement.

## What we are doing wrong, and what we are not

**Not the problem: answer quality.** Head to head against the miners that beat
us, ours answered better on 11 questions to their 5.

**Was a real problem, now fixed.** TVL and stock-price questions failed 7 for 7,
because both routes only parsed a sentence when the parameter was empty, while
the engine passes the whole question in *as* the parameter. Fixed and deployed
2026-09-02, `Sireadell/onchain-tx` commit e348e76, verified against the live
miner.

**Still a problem.** We are not registered for the intents that general
questions actually land on. "Who is the current secretary general of the United
Nations?" was classified as CHAT_COMPLETION, and a papers question landed on
RESEARCH_QUERY. TxLens serves WEB_SEARCH and ACADEMIC_SEARCH and never gets
offered that traffic.

**Structural, not our fault.** On shape A and shape B intents, answering
correctly today cannot move a score that only refreshes for whoever is already
winning.

## Where to spend effort next

1. **Defend IP_GEOLOCATION.** It is the only real score we have and the only
   traffic we get. Change nothing there carelessly.
2. **Attack ACADEMIC_SEARCH.** We are 1.8% behind a miner built for SSL
   verification that answers "found". The most winnable gap on the board.
3. **Then STORM_ALERT (4% behind) and SSL_VERIFICATION.** Same band, real
   contests.
4. **Register CHAT_COMPLETION and RESEARCH_QUERY** to stop losing general
   questions we can already answer.
5. **Do not sink time into GAS_PRICE or FRAUD_DETECTION** while a miner sits at
   exactly 1.0, unless the decay explanation is disproved.

## Open questions for next time

- Does a direct ask (`/engine/v1/ask/{minerId}`) count as a scored request, or
  only router-chosen traffic? This decides whether AskLens can lift our score at
  all.
- Two auto-routed FRAUD_DETECTION questions returned HTTP 500 from the engine
  itself. Sentinel answered fine when asked directly, so the fault was upstream.
  Worth watching whether it recurs.
- What is the decay rate per epoch? Two snapshots a few epochs apart would give
  it, and would turn the explanation above into a measured fact.

## Corrections made while writing this

An earlier read of the leaderboard printed scores to six decimal places and made
it look as though every miner except the leader scored exactly zero. They do not.
The real values run from 1e-11 down to 1e-25, which is what revealed the decay
pattern and changed the conclusion. Print these in exponential form, not fixed
decimals.
