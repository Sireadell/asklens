# AskLens Clip Guard

The instant you copy a link or a wallet address, it gets checked against live
Telegraph Protocol miners, and a Windows notification shows the verdict before
you ever paste it anywhere.

Built for people with no company security filter standing between them and
the links people send them: freelancers, remote workers, and anyone active
in crypto or Discord communities.

## Install on Windows

Download **AskLens Clip Guard Setup.exe**, then double-click it once. Clip
Guard starts quietly after you sign in to Windows and shows a notification
whenever you copy a link.

The installer is published in the project's GitHub Releases. Developers can
also run it from source:

## Run from source

```
npm install
npm run watch
```

Leave the console window open. Copy any `http://` or `https://` link, or any
`0x` wallet address, and a notification appears within a few seconds.

`npm start` runs the same thing as a desktop app with a tray icon and a live
status window instead of a console.

## Links: three miners, not one

Three separately built Telegraph miners, each pulling from different
sources, not one source with three name tags:

- **NetWire** — live HTTP request plus the URLhaus and OpenPhish threat feeds
- **URL Sentinel** — an independent malicious/suspicious/safe classifier
- **Preflight** — TLS certificate validation, redirect chain, and the
  URLhaus feed, with a 0-1 risk score

If they disagree, the notification shows that too, rather than a single
falsely confident number.

## Wallet addresses: the moment before money moves

Anything matching `0x` followed by 40 hex characters is checked by **Sentinel**
for sanctions matches, known-scam list entries, and other fraud signals, and
comes back HIGH or LOW with a plain-language reason.

Copying an address is the last step before a transfer, and two well-documented
attacks live in exactly that gap. Clipboard hijacking malware silently swaps the
address you copied for the attacker's. Address poisoning seeds a lookalike
address into your history hoping you copy the wrong one. Neither is catchable
after the paste.

Addresses are checked on Ethereum by default. Sentinel also covers Base.

## Where the checks go

Every check runs through Telegraph's paid engine via the hosted AskLens service
at `https://asklens-zoox.onrender.com`, so each one is a real, settled network
request, not a shortcut to a miner's own host.
