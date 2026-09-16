# AskLens: the Telegraph trust app

## The decision

Build AskLens into the easiest way to check something before trusting, sharing, paying, travelling, or acting on it.

The user should never choose a miner. They paste, share, type, or upload something. AskLens asks Telegraph in plain language, lets the network choose the best active miner, then gives one clear next step with the proof behind it.

This is broader than weather and more useful than a generic chat box. Its job is: Can I trust this right now?

## Hard rules

1. Every live fact comes from a paid request through Telegraph. No direct provider calls and no made-up result.
2. Use Telegraph's automatic router first. Save the selected miner, intent, signal reference, time, and cost for every answer.
3. Only show a decision card after its exact question and answer format pass paid live tests.
4. Offline mode only displays saved, clearly dated miner answers. It never pretends a saved answer is live.
5. AskLens explains what miners found. It does not make payment, trading, medical, legal, or safety-critical decisions for a person.

## What the live network can support

The public registry contains many raw integration records. It is not a trusted
count of real usable miners, so AskLens must not use it as a public claim.
These are the high-value consumer groups worth testing first, not a promise to
use every listed miner.

| AskLens card | User gives us | Telegraph work behind it | Why it matters |
|---|---|---|---|
| Link Check | A copied or shared web link | URL_SCAN, SSL_VERIFICATION, IP_GEOLOCATION | Stops a person before they open a fake page or enter details. |
| Wallet and Token Check | Wallet address, token, or transaction | FRAUD_DETECTION, WALLET_BALANCE_CHECK, ONCHAIN_TX_LOOKUP, TOKEN_HOLDER_COUNT, GAS_PRICE, CRYPTO_PRICE, TVL_LOOKUP | Makes confusing crypto actions understandable before money moves. |
| Claim Check | A claim, headline, screenshot text, or question | FACT_CHECK, WEB_SEARCH, NEWS_SEARCH, RESEARCH_QUERY, RESEARCH_SYNTHESIS | Shows whether a viral claim has evidence, not only a confident answer. |
| Real or Fake Media | Image, video, or copied caption | IMAGE_VERIFICATION, DEEPFAKE_DETECTION, VIDEO_VERIFICATION, MEDIA_AUTHENTICITY_CHECK | A memorable use for the phone camera and share sheet. |
| Plan Check | Place, time, and plan | WEATHER_FORECAST, WEATHER_CHECK, STORM_ALERT | Turns weather into a simple go, prepare, or delay decision. |
| Software Check | A CVE number, package, or security concern | CVE_LOOKUP, VULNERABILITY_TRIAGE, URL_SCAN | Helps a founder decide whether to patch or trust a download. |
| Money Context | A coin, stock, currency, or protocol | CRYPTO_PRICE, FINANCIAL_DATA, CURRENCY_EXCHANGE, STOCK_PRICE, TVL_LOOKUP | Fast context while clearly separating facts from investment advice. |
| Cross-chain Check | A bridge, chain pair, transaction, or token | CROSS_CHAIN_STATE_VERIFY, ONCHAIN_TX_LOOKUP, WALLET_BALANCE_CHECK | Explains whether a cross-chain action is possible or complete. |

Several useful intents have more than one listed option, but directory counts
do not prove availability or answer quality. Every card needs its own live
router proof before it becomes a public feature.

### First live proof, 2026-09-16

| Card | Result | Decision |
|---|---|---|
| Link Check | Correctly routed as `URL_SCAN` to NetWire URL Scan. | Safe to keep developing. |
| Wallet and Token Check | Correctly routed as `FRAUD_DETECTION` to Zengawd Transaction Guard. | Safe to keep developing. |
| Claim Check | Did not return within the intended short test window. | Do not build or promote it yet. |

## The experience

### One front door: Check this

The home screen has one large button: Check this.

On Windows, a person pastes a link, wallet, claim, or question. On a phone, they share a link or image into AskLens, paste text, or use the camera. AskLens detects what it received, asks Telegraph, then shows one calm result card:

CAUTION: Do not sign in yet

This link has a suspicious redirect pattern.

Checked 12 seconds ago by Telegraph miner URL Sentinel.

[Why?] [View proof] [Check something else]

### The Why view

Every result opens the same proof view:

- What the person asked AskLens to check.
- The clear answer and what it means.
- Miner name, Telegraph intent, checked time, and signal reference.
- The returned evidence in plain words.
- A button to report an answer that looks wrong.

### Personal trust timeline

The dashboard is a private timeline of previous checks, not a generic analytics screen:

- Recent checks and their status.
- Saved checks available offline, with a refresh deadline.
- Which Telegraph miners actually helped the user.
- A recheck button for time-sensitive items.
- A visible monthly request and spend limit.

## Platform plan

Start as a mobile-friendly web app that can be installed on a phone. This gives us share links, camera upload, and a home-screen icon without waiting to build separate iPhone and Android apps.

Keep the existing Windows Clip Guard as the background convenience product. It remains the best place for automatic copied-link and copied-wallet checks.

Build a full native mobile app only after the web share flow proves demand. Native phones do not automatically give background clipboard permission, so we must not promise that first.

## Delivery plan

### Phase 0: proof bench before features

Create a small internal test page and saved test list. It sends carefully written questions through Telegraph's router and saves the selected intent, miner, answer, time taken, cost, signal reference, and whether the answer can safely power a card.

Follow the existing router call in src/telegraph.js: ask(query, context, options). Follow the existing response shape and logging in src/server.js at POST /api/ask. Use the live miner registry only to discover options, never as executable miner configuration.

Proof before building a card:

- Test ten ordinary questions for each proposed card using an approved small test-USDC budget.
- The router must recognise the intent, name a miner, return an understandable answer, and stay within the chosen wait time.
- Keep failures. They tell us what not to promise.

Do not call a provider directly, hardcode a miner because its description sounds good, or spend from the Telegraph wallet before the test budget is approved.

### Phase 1: irresistible core

Build only Link Check, Wallet and Token Check, and Claim Check first. They cover the strongest everyday moments: before opening, before paying, and before believing.

Use the router for every question. Return one action label: SAFE, CAUTION, BLOCK, or NOT ENOUGH EVIDENCE. Show the proof view and save the result to the private timeline.

Proof: real results show selected miner and signal reference, delayed or failed results never become SAFE, existing link and wallet checks still work, and tests cover detection, result states, and private history.

### Phase 2: shareable on phones

Build the mobile-friendly website with a share target for links, text, and images. Add the camera and image-upload path only after media tests prove that the router consistently chooses a capable miner.

The first phone demo is a person sharing a suspicious link, viral claim, or image into AskLens and receiving a clear sourced answer.

Proof: it works in a phone browser, can be installed to the home screen, shared content arrives intact, the user controls whether it is saved, and AskLens clearly says when it cannot check something.

### Phase 3: real-world planning

Add Plan Check as the first saved offline brief. It asks the router about weather and storm risk, then stores returned miner evidence locally with a checked time and refresh deadline.

After the proof bench succeeds, add Software Check and Cross-chain Check for founders and crypto users.

Proof: offline results become NEEDS REFRESH at their deadline, every live fact identifies its miner, and AskLens never combines weather, security, and finance into one invented safety score.

### Phase 4: visible network intelligence

Add an optional Ask again button for important checks. It uses the automatic router again and shows whether the selected miner or answer changed. This is a live recheck, not a fake consensus claim.

Build the dashboard network view from answers AskLens actually received. It answers: Which miners have helped me, and what did they say?

Proof: each answer traces to a saved signal reference, no miner count is presented as proof of truth, and privacy controls can delete local history.

## Final public-launch checks

1. Re-run the proof bench for every card shown publicly.
2. Review every public claim against a real saved Telegraph response.
3. Confirm every live route uses the automatic router and no direct provider URL exists.
4. Test phone sharing, Windows Clip Guard, offline history, failures, and no-network state.
5. Record a real end-to-end demo before publishing launch claims.

## What not to build now

- A button for every Telegraph intent.
- A generic AI chat clone.
- Background phone clipboard surveillance.
- A single hidden score that claims to prove something is safe.
- Full native apps before the share flow proves demand.

## Winning feature shortlist, researched 2026-09-16

### Build next: Proof Receipt and live recheck

Every AskLens result should become a small receipt a person can understand and
keep: what was checked, result, reason, selected miner, Telegraph signal
reference, checked time, and a recheck button. A recheck must be a new paid
Telegraph request and show what changed, including when a different miner
answered.

This is a real gap in the current Windows app. The server already receives
signal references, but Clip Guard's stored activity currently keeps only its
short result text. Preserve the source reference for every URL miner result
and wallet result before calling a dashboard history item a proof timeline.

Why this matters: URL scanners can disagree because they see different page
versions, locations, redirects, and times. Showing the disagreement and the
time makes AskLens more trustworthy than a silent green label. It also makes
Telegraph's network visible without claiming that miner counts equal truth.

### Build next: Address Change Alarm

Clip Guard already checks a copied wallet address, but it does not yet warn
when one address is copied and then replaced by a different address before a
send. Add a local, time-limited address-change alert. It must say only what
the computer observed: **"The copied address changed. Verify the recipient
before sending."** It must not call the change malware or a scam without a
Telegraph result.

Ask Telegraph to check the final address as it does today, then display its
wallet or token result beside the local change alert. This is a strong fit for
Windows, needs no surveillance beyond the exact address Clip Guard already
watches, and addresses the real address-poisoning and clipboard-replacement
moment that users describe.

### Improve before adding new cards: Explain link disagreement

Keep the existing three-miner link check. Add a compact explanation when the
miners disagree or some do not answer: who said what, their source references,
and a **check again** action. Never turn a partial answer into SAFE.

### Hold behind proof: Media Origin Check

An image or video share card could be the most memorable phone feature:
AskLens checks for Content Credentials, image or video verification, and
deepfake signals through Telegraph, then tells the person whether it found
provenance, not whether the media is "true." The C2PA standard itself warns
that provenance is history, not proof that a claim is accurate. Build only
after the router reliably selects capable media miners for real files.

### Hold behind proof: Offline Safety Brief

The product direction is sound because users value a locally saved,
time-stamped safety brief when the connection drops. Build only after the
router reliably answers the exact weather and storm questions with an
understandable answer. A stale saved brief must become NEEDS REFRESH, never
SAFE.

### Do not build now: broad browser extension or generic claim checker

Browser extensions with broad page or screenshot access create a major trust
and privacy burden, and the market is already crowded with blocklist and
transaction-simulation products. Claim Check remains blocked because its
first paid proof did not return within the target wait time. Do not ship it
until that evidence changes.

## Research sources behind the shortlist

- Address poisoning affects real wallet users and is not well covered by
  wallet warnings: https://arxiv.org/abs/2508.12107
- Wallet Guard already offers transaction insights and approval reminders:
  https://github.com/wallet-guard/wallet-guard-snap
- Scam Sniffer already offers continuously updated phishing and drainer
  blocklists: https://www.scamsniffer.io/
- C2PA explains that Content Credentials record media provenance, not whether
  its message is accurate: https://c2pa.org/faqs/
- Google Fact Check Explorer returns existing claim, rating, and source data:
  https://newsinitiative.withgoogle.com/resources/trainings/fact-check-explorer/
- PlainWeather demonstrates the appeal of an offline, visibly dated safety
  layer: https://play.google.com/store/apps/details?id=com.equalinformation.plainweather.app

## First public message after the core demo works

> We are building AskLens, a simple way to check something before you trust, share, pay, or act on it.
>
> Send it a link, wallet, claim, or image. AskLens asks live Telegraph miners and gives you the answer, the source, and what to do next.
>
> No black box. No fake certainty. Just a clearer moment before a costly mistake.

## Research source

Live Telegraph registry reviewed on 2026-09-16:
https://devnode.telegraphprotocol.com/miner-dispatcher/integrations. It is used
only to find candidate capabilities. Real router responses are the only proof
that a miner is available for an AskLens feature.
