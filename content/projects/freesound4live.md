---
type: device
order: 7
menuLabel: max4live
title: Freesound4Live
client: Aylesim Devices
tech:
  - Max/MSP
  - Max for Live
  - Ableton Live
  - Utility
featured: false
buyLink: https://github.com/aylesim/freesound4live
year: "2023"
videos:
  - title: Demo
    url: https://www.youtube.com/watch?v=x8-n1uze24s
highlights:
  - Integrated the Freesound.org HTTP API inside a Max for Live patch with search, preview, and download paths
  - Implemented filtering by tag, duration, and license metadata so results stay usable in a live set
  - Wired drag-and-drop and Live-specific targets (Drum Rack, Simpler) so samples land in the right container
  - Shipped the device as open source so others can audit, fork, or extend the integration
---

## Overview

Freesound4Live is a free Max for Live utility I built to browse [Freesound.org](https://freesound.org/) from inside Ableton Live: search, audition, and pull samples into the session without context-switching to a browser. The motivation was practical — community sound libraries are only useful in production if the retrieval loop is short — but the work also sits at the intersection of API integration, UI constraints inside Max, and Live’s object model for where a sample file may land.

![Freesound4Live — Max for Live interface](/ffl.png)

The patch treats Freesound as a remote catalog with strict metadata: licensing and duration are not optional niceties when you are importing audio into a project someone might publish.

## How it works

Search requests are parameterized (text, tags, duration bounds, license filters), responses are parsed into a compact list suitable for in-device preview, and previews stream before any commit to disk. When a sound is chosen, the download path hands audio to Live in a way that matches common workflows: dropping onto Drum Rack pads or into Simpler without manual file juggling.

- **Query and filter** against Freesound’s fields so long lists collapse to something you can scan quickly
- **Preview before download** to keep network use predictable during performance or teaching
- **License-aware browsing** so CC and other terms stay visible at selection time
- **Live-native placement** via drag-and-drop into rack and sampler slots

The source lives on GitHub; issues and forks are part of how the tool has stayed compatible as Live and the Freesound API evolve.

## Skills involved

The device combines API integration, metadata handling, Max for Live UI design, and workflow thinking inside Ableton Live. It reflects the way I approach utility tools more generally: reduce friction around a real production task, then make the interaction model clear enough that the tool can stay useful in both studio and teaching contexts.
