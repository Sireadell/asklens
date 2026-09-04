# Track 3 plan: four days to Sep 7

Written 2026-09-03. One repo (`~/asklens`), two front doors:

| Front door | What it is | Who it is for |
|---|---|---|
| AskLens web page | Type a question, a live miner answers, you see who and why | Judges, clicking a link |
| AskLens MCP server | Two safety tools any AI app can call | Developers, generating repeat traffic |

Both talk to the same Telegraph client (`src/telegraph.js`), pay from the same
wallet, and log to the same files. No duplicated code.

## Why both, not one

The web page is what a judge can open and understand in ten seconds. The MCP is
what generates real, recurring requests without us begging for traffic, which is
what the scoring actually rewards and what the 100-request eligibility bar needs.
Dropping either loses something the other cannot cover.

## What we are NOT building

- All 14 intents as separate tools. Bundling everything reads as dated and
  dilutes the pitch.
- A Telegram bot or on-chain execution agent. Both need an audience we cannot
  build in four days.
- Anything that competes head-on with Alchemy, CoinGecko or Etherscan on raw
  data. That race is already lost.

## The pitch, in one line

Every other crypto-safety MCP returns one company's private risk score. Ours
returns a verdict sourced from independently scored, competing miners, and shows
you which miner answered and how it ranks.

---

## Day 1, Wed Sep 3: the MCP core

| # | Task | Done when |
|---|---|---|
| 1 | Put the repo in git and push to GitHub | `git log` shows a first commit, remote set |
| 2 | Add the MCP dependency and an `npm run mcp` script | Server starts and reports its tool list |
| 3 | Build `src/mcp.js` with `check_wallet_safety(address)` | Calling it returns a verdict, evidence, and the miner name |
| 4 | Build `check_link_safety(url)` | Same shape, backed by SSL and IP geolocation intents |
| 5 | Log every MCP call through the existing stats and ask log | Calls appear in `data/asks.jsonl` |

Risk to watch: the verdict must degrade gracefully when a miner refuses (the 422
path). A tool that throws in someone's editor gets uninstalled the same day.

## Day 2, Thu Sep 4: make it real

| # | Task | Done when |
|---|---|---|
| 1 | Install the MCP in Claude Desktop and Claude Code | Tools show up and answer live in both |
| 2 | Install it in one third app (Cursor or VS Code) | Proves the "works everywhere" claim with a screenshot |
| 3 | Add the thin second tier: 3 or 4 raw lookups (price, gas, weather) | "Multi-tool" framing has substance |
| 4 | Write tests for the new code | `npm test` passes with the MCP covered |
| 5 | Fix the broken single entry in `data/asks.jsonl` | Log holds only real, complete records |

## Day 3, Fri Sep 5: the demo and the traffic

| # | Task | Done when |
|---|---|---|
| 1 | Record the demo video, 60 to 90 seconds, Win+Alt+R | A file exists showing a real question answered live |
| 2 | Deploy the web page somewhere public | A URL a judge can open, not localhost |
| 3 | Publish the MCP so others can install it | An install command a stranger can copy |

Note on request volume, checked live 2026-09-03: eligibility is already met.
Every one of our 14 intents is well past the 100-request bar, the lowest
(STOCK_PRICE) at 271 and the highest (WEATHER_FORECAST) at 1,664. Chasing
traffic for eligibility is not a task. Caveat: the API reports all-time
requests from all sources, not Track-3 requests specifically, but the margins
are large enough that this is not a live worry.

## Day 4, Sat Sep 6: finish and submit

| # | Task | Done when |
|---|---|---|
| 1 | Rewrite the README around both front doors | A stranger can install and run it without asking us |
| 2 | Fold the routing study into the submission story | The 57% usable finding is in the pitch, it is our best evidence |
| 3 | Write the submission in first person, human voice | Passes the humanizer checklist, no em dashes |
| 4 | Submit | Confirmation received |
| 5 | Update `~/hackathons/README.md` Submitted column and log | Row reads Yes plus date |

Sep 7 is the deadline, not a working day. Everything lands Sep 6 so there is a
full day of slack.

## Standing risks

| Risk | Mitigation |
|---|---|
| Nobody installs the MCP in four days, so it generates no traffic | The web page carries the demo on its own. The MCP is upside, not the floor. Eligibility does not depend on it |
| Our miners are low-volume: txlens 91 requests, sentinel 8, against DegenLens's 1,078 | Do not hide it. Volume is a routing outcome, and the routing study explains why. But it does mean DegenLens is the entry to beat |
| Testnet USDC runs out mid-sprint | Check the balance at the start of each day, top up from Circle's faucet early |
| GoPlus or ChainAware is closer than we think | Our edge is positioning, competing scored miners. Lead with that, not accuracy claims |
| Our own miners rarely get routed (3 wins in 40) | Honest framing. The routing study makes this a finding, not a failure |
