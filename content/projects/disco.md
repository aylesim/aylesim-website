---
type: device
category: devices
workScope: commercial
order: 5
menuLabel: max4live
listBadges:
  - prefix: available on
    label: Gumroad
    url: https://aylesim.gumroad.com/l/disco
  - prefix: available on
    label: Isotonik Studios
    url: https://isotonikstudios.com/product/disco-by-aylsim/
title: Disco
role: Developer & Designer
client: Aylesim Devices
year: "2022"
tech:
  - Max/MSP
  - Audio Engineering
  - Signal Processing
  - UI/UX Design
videos:
  - title: Demo
    url: https://www.youtube.com/watch?v=WpoSqDDA4EY
  - title: Walkthrough
    url: https://www.youtube.com/watch?v=UDeSFi8StDw
highlights:
  - Multi-tap delay engine in Max for Live with per-step gain, pan, and on/off in a circular layout
  - Independent or ganged rotation of delay taps for Euclidean-style patterns and spin effects
  - Manual control and LFO-driven motion, from small movement to extreme modulation
  - UI built around a spatial readout of time and level so delay density stays readable while taps move
---

[Gumroad](https://aylesim.gumroad.com/l/disco) · [Isotonik Studios](https://isotonikstudios.com/product/disco-by-aylsim/)

## Overview

Disco is a Max for Live audio effect built around a circular multi-tap delay. Incoming audio is spread across several delay lines whose positions can rotate on a ring, together or independently, so repeats bunch, spread, and re-phase over time. Time-domain DSP, Euclidean pattern logic, and the Live interface all had to hold together.

![Disco - Max for Live interface](/disco.png)

The delay is a small moving system of timed events, not a single feedback line. The interface has to stay readable while it shifts, so you can see where rhythmic density and stereo energy are accumulating.

## How it works

Each tap is a point on a cycle. Position sets time offset around the ring. Gain and pan place that tap in the mix. Rotation re-phases taps relative to the input. Manual control or LFO-driven motion changes the angular velocity of the whole structure or of individual steps, which produces the acceleration and deceleration in the repeats.

- **Multi-tap delay bank** with Euclidean-style spacing as a starting geometry, not a fixed preset
- **Per-step parameters** for level, stereo placement, and bypass
- **Coupled or decoupled rotation** so taps move as one field or drift against each other
- **LFO and manual modulation** of spin rate for sweeps and static geometries
