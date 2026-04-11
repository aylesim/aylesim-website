---
type: device
order: 5
menuLabel: max4live
title: Disco
role: Developer & Designer
client: Aylesim Devices
tech:
  - Max/MSP
  - Max for Live
  - Ableton Live
  - Delay
featured: false
buyLink: https://aylesim.gumroad.com/l/disco
videos:
  - title: Demo
    url: https://www.youtube.com/watch?v=WpoSqDDA4EY
  - title: Walkthrough
    url: https://www.youtube.com/watch?v=UDeSFi8StDw
highlights:
  - Built a multi-tap delay engine in Max for Live with per-step gain, pan, and on/off inside a circular layout
  - Implemented independent or ganged rotation of delay taps for Euclidean-style patterns and spin effects
  - Combined manual control and LFO-driven motion so the same patch scales from subtle movement to extreme modulation
  - Tuned the UI around spatial readout of time and level so delay density stays interpretable while taps move
---

## Overview

Disco is a Max for Live audio effect I built around a circular multi-tap delay structure: incoming audio is distributed across several delay lines whose positions can rotate on a ring, together or independently, so repeats bunch, spread, and re-phase over time. The project sits between time-domain DSP, Euclidean pattern logic, and interface design inside Ableton Live.

![Disco — Max for Live interface](/disco.png)

The patch treats the delay not as a single feedback line, but as a small moving system of timed events. A lot of the work went into making that system legible while it shifts, so the interface helps you understand where rhythmic density and stereo energy are accumulating.

## How it works

Each tap is a controllable point on a cycle: position sets time offset around the ring, gain and pan define how that tap sits in the mix, and rotation continuously re-phases taps relative to the input. Manual control or LFO-driven motion changes the angular velocity of the whole structure or of individual steps, which is what produces the characteristic acceleration and deceleration in the repeats.

- **Multi-tap delay bank** with Euclidean-style spacing as a starting geometry, not a fixed preset
- **Per-step parameters** for level, stereo placement, and bypass so patterns can be sculpted precisely
- **Coupled or decoupled rotation** to move all taps as one field or let them drift against each other
- **LFO and manual modulation** of spin rate for performable sweeps and static “frozen” geometries

## Skills involved

The project combines time-based audio design, rhythmic system thinking, Max patching, and interface work for moving structures that need to remain readable in use. It reflects an approach I return to often in device design: build a strong behavioral model first, then give it a visual and performative surface that makes the underlying logic feel graspable.
