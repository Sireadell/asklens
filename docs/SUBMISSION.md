# AskLens

**Telegraph Protocol Season I, Track 3 (Applications)**

Live app: https://asklens-zoox.onrender.com
Code: https://github.com/Sireadell/asklens

---

## What it is

AskLens lets you ask a question in plain English and get it answered by a live
miner on the Telegraph network. You type something like "did this transaction go
through" or "is this wallet safe", and Telegraph's Engine reads it, works out
which intent it belongs to, picks a miner, and comes back with an answer.

There are two ways to use it. There's a web page, and there's an MCP server that
puts the same miners inside Claude, Cursor, or any other app that speaks the
Model Context Protocol.

Nothing is cached and nothing is mocked. Every answer on that page is a fresh,
paid request to a real miner, one cent in testnet USDC on Base Sepolia, settled
through x402.

## Why I built it this way

I run two miners on the network, TxLens and Telegraph Sentinel, so I'd been
looking at Telegraph from the miner's side for weeks. Building an app meant
switching to the other side of it, and the first thing I noticed was how much
context you lose when all you get back is an answer.

An answer on its own doesn't tell you much. Who produced it? Was it the miner
that's currently rated best at this, or one that happened to be available? What
did it cost? So I decided the app should show all of that, every time.

For every question, AskLens displays:

| Shown | Why |
|---|---|
| The answer | The point of the thing |
| Which miner answered | So you know whose work you're looking at |
| Which intent it was classified as | Shows how the router read your question |
| The router's own reasoning | Telegraph explains its choice, so I show it |
| Cost and time taken | Real figures, not estimates |
| The signal hash | The on-chain record the answer was filed under |

That last one matters more than it sounds. Every answer is filed on-chain, so
you can go and check it later. Most apps would throw that away. I put it on the
page.

## The MCP server

This is the part I'm most pleased with.

Raw crypto data is already well served. If a developer wants a token price or a
wallet balance, there are big, free, established tools for that and I'm not
going to beat them in a week. What I couldn't find anywhere was something that
gives you a **verdict** rather than a number, with the evidence attached.

So the MCP server has two tools:

**`check_wallet_safety(address)`** returns a risk verdict on a wallet. Not a
balance, not a transaction list, an actual answer to "should I deal with this
address". Here's a real response, from a sanctioned address:

```
Wallet safety verdict: HIGH
Risk level: HIGH
Risk: 95%
Confidence: 70%
Reason: HIGH risk: direct match on a sanctions or known-scam list.
Reason codes: SANCTIONED_ADDRESS, DIRECT_FUNDER, DIRECT_CIRCULAR_FUNDING, FUNDING_CLUSTER
Evidence: 4 piece(s)
Answered by: Telegraph Sentinel (miner id 94217603)
Cost: $0.01
```

**`check_link_safety(url)`** does the same for a link, combining a certificate
check with where the site is actually hosted.

Here's what I think makes this different from the security tools already out
there. Every one of them returns one company's private risk score, and you take
it on trust. AskLens returns a verdict that came from a miner competing on a
public leaderboard, scored independently, with its identity attached. If a
better miner overtakes it tomorrow, the answers get better on their own and you
don't have to do anything. That's a property of Telegraph, not of my code, and
it's the reason building on this network was interesting to me.

An agent about to move funds can call one tool and get a go or no-go with
reasons. That's a real thing developers need, and I haven't seen it anywhere
else.

## Field work

I didn't want to build on the network without understanding how it behaves, so I
spent a couple of days measuring it before writing much of the app.

I sent 140 questions through the router in total. 40 as head to head
comparisons, where I asked the same question twice, once letting the router
choose and once putting it directly to one of my own miners, and then a run of
100 hard questions spread across every intent I serve. I also snapshotted the
leaderboard repeatedly so I could see how scores move between epochs.

Three things I learned, all of which changed the app:

**Routing is per intent, and it's genuinely competitive.** There's no single
dominant miner. Each intent has its own leaderboard and its own leader, and
across 40 questions the most any one miner won was four. That's a healthy
market, and it's why showing the miner's name on every answer felt right rather
than decorative.

**Answers vary between miners, which is the whole reason scoring exists.** Some
answers came back sharper than others. Rather than hide that, I decided to show
you exactly who answered so you can form your own view, and to keep my second
opinion panel, which lets you put the same question directly to one of my miners
and compare.

**Scores move fast.** I watched an intent go from a leader sitting near a perfect
score to the whole field resetting inside two epochs. Ranks are a snapshot, not a
standing. Once I understood that, the app stopped treating any single answer as
final.

All of the raw data is committed in the repo under `data/`, and the write up is
in `docs/ROUTING_STUDY.md`. I've included the numbers rather than just the
conclusions so anyone can check my working.

## What's running

| | |
|---|---|
| Web app | https://asklens-zoox.onrender.com |
| MCP server | `npm run mcp`, install instructions in the README |
| Payments | x402, Base Sepolia testnet USDC, one cent per request |
| Tests | 57, all passing |
| My miners | TxLens (id 9002, 14 intents), Telegraph Sentinel (id 94217603, fraud detection) |

## Honest notes

A few things I'd rather say myself than have someone find:

- It's testnet only. No real money moves anywhere in this.
- Answer quality belongs to the miners, not to me. AskLens routes, pays, and
  presents. If a miner has an off day, you'll see it, with its name on it.
- Not every miner returns a plain sentence, because they each define their own
  output. When there's no readable summary, the app says so and shows the raw
  response rather than inventing a tidy one.
- The request counter only goes up after Telegraph has answered and the payment
  has settled. It never counts a failed or refused call, and it's shown on the
  page rather than kept private.

## What I'd do next

Ship the MCP server properly, so it's a one line install rather than a config
file edit. Then widen the verdict tools, because the pattern generalises. Any
question of the form "is this safe" can be answered by chaining a few intents
together, and that's a shape the network is unusually well suited to.

Longer term I'd like the app to show a miner's recent form alongside its answer,
so you can see not just who answered but how they've been doing lately. The data
for that already exists in the leaderboard. I just ran out of days.
