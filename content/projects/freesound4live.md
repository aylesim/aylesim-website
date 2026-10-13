---
type: device
category: devices
workScope: commercial
order: 7
menuLabel: max4live
listBadges:
  - prefix: featured on
    label: Create Digital Music
    url: https://cdm.link/free-sounds-and-samples-in-ableton-live/
title: Freesound4Live
client: Aylesim Devices
tech:
  - Max/MSP
  - API Integration
  - Audio Engineering
  - Live Workflow Design
year: "2023"
videos:
  - title: Demo
    url: https://www.youtube.com/watch?v=x8-n1uze24s
highlights:
  - Featured on Create Digital Music for bringing the Freesound.org library into Ableton Live
  - Freesound.org HTTP API inside a Max for Live patch: search, preview, download
  - Filters by tag, duration, and license metadata
  - Drag-and-drop into Drum Rack and Simpler
  - Released as open source
---

Currently not available.

## Overview

Freesound4Live is a free Max for Live utility I built to browse [Freesound.org](https://freesound.org/) from inside Ableton Live. You search, audition, and pull samples into the session without leaving Live for a browser. The patch respects Max UI limits and Live’s rules for where sample files may land.

![Freesound4Live - Max for Live interface](/ffl.png)

Freesound is treated as a remote catalog with strict metadata. License and duration stay visible, because they matter when you import audio into a project that might be published.

## How it works

Search requests are parameterized (text, tags, duration bounds, license filters). Responses become a compact list for in-device preview. Previews stream before anything is written to disk. On confirm, audio drops onto Drum Rack pads or into Simpler without a separate file-management step.

- **Query and filter** on Freesound’s fields so long result lists can be scanned
- **Preview before download** so network use stays predictable in a session or class
- **License-aware browsing** so CC and other terms are visible at selection time
- **Live-native placement** via drag-and-drop into rack and sampler slots
