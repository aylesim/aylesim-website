---
type: work
category: devices
workScope: commercial
order: 2
menuLabel: max4live
listTagline: Layered modulation engine for Live
listBadges:
  - prefix: available on
    label: Gumroad
    url: https://aylesim.gumroad.com/l/knobstudio
  - prefix: available on
    label: Isotonik Studios
    url: https://isotonikstudios.com/product/knob-studio-by-alessandro-aylesim-miracapillo/
  - prefix: available on
    label: Attack Magazine Store
    url: https://store.attackmagazine.com/products/knob-studio
  - prefix: featured on
    label: Attack Magazine
    url: https://www.attackmagazine.com/features/long-read/modulation-revelation-the-future-of-sound-design/
  - prefix: featured on
    label: Rekkerd
    url: https://rekkerd.org/aylesim-releases-knob-studio-experimental-mapping-device-for-live/
title: Knob Studio
role: Developer & Designer
client: Aylesim Devices
year: 2024
tech:
  - Max/MSP
  - Audio Engineering
  - Modulation Design
  - Performance Optimization
liveLink:
videos:
  - title: Carousel
    url: https://www.youtube.com/watch?v=nanpp0rhG_I
  - title: Walkthrough
    url: https://www.youtube.com/watch?v=crROD4nBBzE
  - title: How it's made
    url: https://www.youtube.com/watch?v=J0A9h0l-F2s
highlights:
  - Covered by Rekkerd and Attack Magazine on release
  - Featured in Attack Magazine’s long-read on Max for Live modulation
  - Layered modulation engine with multiple concurrent function generators
  - Reading-head modes (manual, LFO, envelope follower) on shared waveform material
  - Real-time visualization tied to the modulation being applied
  - Randomization plus global smoothing and jitter as macros over the modulator field
---

[Gumroad](https://aylesim.gumroad.com/l/knobstudio) · [Isotonik Studios](https://isotonikstudios.com/product/knob-studio-by-alessandro-aylesim-miracapillo/) · [Attack Magazine Store](https://store.attackmagazine.com/products/knob-studio)

## Overview

Knob Studio is a Max for Live audio effect for parameter modulation in Ableton Live. Several layers can run in parallel, hit the same targets, and stay editable.

![Knob Studio - Max for Live interface](/knobstudio.png)

The device is a waveform-driven modulation graph: functions are stacked, shaped, then read under different strategies. The graph is meant to stay readable while it runs.

## How it works

Stacked waveform functions, each with its own parameters, are interpreted by **reading heads**. Heads can be driven by hand, by LFOs, or by an envelope follower, which changes how the same material is scanned over time.

Randomization adjusts parameters within fixed limits. Global smoothing and jitter keep the whole modulator field moving together when you want cohesion.

- **Layered function stack** for building modulation shapes from simpler pieces
- **Multiple head modes**: manual control, periodic motion, audio-responsive scanning
- **Real-time waveform display** aligned with what is being applied to parameters
- **Randomization** with clear entry points so exploration does not erase the starting point
- **Global smoothing and jitter** across active modulations
