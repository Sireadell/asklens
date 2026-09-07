# AskLens Clip Guard

Watches your clipboard. The instant you copy a link, it checks that URL
against several independent Telegraph Protocol miners and shows a Windows
notification with the verdict, before you ever paste it anywhere.

Built for people with no company security filter standing between them and
the links people send them: freelancers, remote workers, and anyone active
in crypto or Discord communities.

## Run it

```
npm install
npm start
```

Leave the console window open. Copy any `http://` or `https://` link as you
normally would, and a notification appears within a few seconds.

## What it checks against

Three separately built Telegraph miners, each pulling from different
sources, not one source with three name tags:

- **NetWire** — live HTTP request plus the URLhaus and OpenPhish threat feeds
- **URL Sentinel** — an independent malicious/suspicious/safe classifier
- **Preflight** — TLS certificate validation, redirect chain, and the
  URLhaus feed, with a 0-1 risk score

If they disagree, the notification shows that too, rather than a single
falsely confident number.

By default it talks to the hosted AskLens backend
(`https://asklens-zoox.onrender.com`). To point it at a local AskLens server
instead:

```
ASKLENS_URL="http://localhost:3000/api/clipguard/check-url" npm start
```
