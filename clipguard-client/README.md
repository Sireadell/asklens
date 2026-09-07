# AskLens Clip Guard

Watches your clipboard. The instant you copy a link, it checks that URL
against several independent Telegraph Protocol miners and shows a Windows
notification with the verdict, before you ever paste it anywhere.

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

It checks copied links through the hosted AskLens service at
`https://asklens-zoox.onrender.com`.
