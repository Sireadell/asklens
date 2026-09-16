# AskLens Offline Safety Brief

## Non-negotiable product rule

Every live fact AskLens shows must come from a paid request through a
Telegraph miner. AskLens may format, compare, explain, and save a miner's
answer locally, but it must never call a weather provider directly.

For this feature, AskLens asks Telegraph in plain language and lets its router
choose the best active miner for each need:

| Need | Telegraph intent we expect | How AskLens calls it |
|---|---|---|
| Forecast conditions for a place and time | `WEATHER_FORECAST` | Telegraph automatic router |
| Severe-weather risk or official warning question | `STORM_ALERT` | Telegraph automatic router |

This is not just an implementation detail. Each refresh produces a real
Telegraph request, pays the network, and records the miner that actually
answered. AskLens must show that miner's name with every live fact.

## Decision

Build an offline safety brief inside AskLens Clip Guard for a person who has
saved a place or plan before leaving. It is not an offline weather service and
must never claim to have live weather after the computer loses its connection.

The product promise is:

> AskLens keeps your last verified safety brief available when the connection
> disappears, including when it was checked and when it needs refreshing.

## Why this fits AskLens

AskLens is strongest at the moment a person decides whether to trust, send, or
go. A generic weather screen would dilute that. This feature should answer one
practical question instead: **is it sensible to leave, drive, fly, or work
outside during my chosen window?**

The difference is meaningful. A normal forecast lists conditions. A safety
brief identifies the danger, its expected time window, and whether the person
should leave now, take precautions, or delay the plan.

## Data we can honestly use

| Evidence | Coverage | Role in the brief | Status |
|---|---|---|---|
| Telegraph-routed miner, `WEATHER_FORECAST` | Where an active Telegraph miner can answer | The forecast facts and expected risk period for the saved place | Must be tested against the exact Safety Brief questions before build. |
| Telegraph-routed miner, `STORM_ALERT` | Where an active Telegraph miner can answer | Severe weather and warning facts for the saved place | Must be tested against the exact Safety Brief questions before build. |
| Local AskLens cache | Windows device only | Retains the last verified brief and its evidence while offline | To build. |

The upstream source a miner uses is the miner operator's responsibility.
AskLens' responsibility is to make the paid Telegraph request, retain the
returned evidence, and name the miner that answered in the result.

## Version 1: build only this

1. Add a **Safety Brief** page to the existing Windows tray app.
2. Let the user save up to three places, for example Home, Work, and Airport.
3. Let the user select a time window: now, next 3 hours, commute, or tomorrow.
4. When online, make two paid requests through Telegraph's router, one for
   `WEATHER_FORECAST` and one for `STORM_ALERT`, then create one local brief
   containing:
   - a clear action: SAFE, CAUTION, or DELAY;
   - the specific risk and its expected hours;
   - only forecast evidence actually returned by the selected miner;
   - any active warning or storm risk actually returned by the selected miner;
   - the Telegraph signal reference and the selected miner as the source for
     each live fact;
   - `checked at` and `refresh by` times.
5. Save the brief only on that Windows device.
6. When offline, show the saved brief immediately with a prominent status:
   - **Last verified 18 minutes ago** while fresh;
   - **Connection unavailable. This brief may be outdated** after its refresh
     deadline;
   - **No saved brief for this place** when there is nothing honest to show.
7. Send a Windows notification only when a saved place changes to CAUTION or
   DELAY while the computer is online.

## Decision rules for version 1

These are transparent safeguards, not a claim that AskLens can predict every
danger.

| Result | Trigger examples |
|---|---|
| SAFE | The selected Telegraph miner returned no alert and no risk condition that meets a tested threshold. |
| CAUTION | The selected Telegraph miner returned a tested caution condition, such as heavy rain, poor visibility, high heat, unhealthy air, or strong gusts. |
| DELAY | The selected Telegraph miner returned a severe storm or warning, or a tested severe condition. |
| NEEDS REFRESH | The device is offline and the saved brief has passed its refresh deadline. This is not SAFE. |

The first version must always show the facts that triggered the result. It must
not hide uncertainty behind a single colour.

## What is deliberately out of scope

- A false claim of live offline weather.
- Automatic reading of a person's calendar, email, or location history.
- Flight-delay prediction, route traffic, flood-road closures, or global
  official alert coverage. Each needs separate trusted data and consent.
- Background tracking. Places are saved by the user and remain local.

## Build order and proof needed

| Step | Deliverable | Proof before the next step |
|---|---|---|
| 1 | Local brief format plus expiry rules | Automated test proves a stale brief can never be labelled SAFE. |
| 2 | Telegraph routing proof | Paid routed calls show the network chooses a suitable miner for our exact forecast and alert questions, including a clear response for an unavailable signal. |
| 3 | Safety calculation from miner answers | Tests with fixed Telegraph miner responses show each risk threshold and its explanation. |
| 4 | Windows page and tray notification | Manual test with network disabled confirms the saved brief remains readable and clearly dated. |
| 5 | Public demo and release | Screen recording proves paid Telegraph refreshes, offline reading, stale warning, local-only saved places, and named miner sources. |

## Tweet draft, use only after a working demo exists

> We are building AskLens Offline Safety Brief for Windows.
>
> Before you leave, it asks our Telegraph miner for a weather-risk brief for
> your places, then saves that verified answer locally.
>
> If your connection disappears, AskLens still shows what it last verified and
> exactly when it needs refreshing. No fake “live offline weather.”
>
> The goal is simple: a better answer to “should I go now?”

## Research notes

- AskLens already recognises `WEATHER_FORECAST` and `STORM_ALERT`. Safety Brief
  must use Telegraph's automatic route, retain the returned miner name and
  signal reference, and never call a provider-side request.
- The earlier provider research is useful only for improving TxLens itself. It
  must never become a direct AskLens dependency.
- Electron already supports native Windows notifications. The current Clip
  Guard app is an Electron client, so this feature extends a working Windows
  product instead of creating a separate app.
