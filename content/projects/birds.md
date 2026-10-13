---
type: work
category: devices
workScope: commercial
order: 1
menuLabel: max4live
listTagline: Generative melody sequencer
listBadges:
  - prefix: available on
    label: Gumroad
    url: https://aylesim.gumroad.com/l/birds
  - prefix: available on
    label: Isotonik Studios
    url: https://isotonikstudios.com/product/birds-by-alessandro-aylesim-miracapillo/
title: Birds
role: Developer & Designer
client: Aylesim Devices
year: 2025
tech:
  - Max/MSP
  - Audio Engineering
  - UI/UX Design
  - Generative Systems
liveLink:
videos:
  - title: Carousel demo
    url: https://www.youtube.com/watch?v=Eax-kVIUId4
  - title: Full walkthrough
    url: https://www.youtube.com/watch?v=0-D_bPzaqfo
highlights:
  - Rule-based generative system for melodic variation inside Max for Live
  - Visual mapping where pitch, timing, and note state stay readable while the sequence changes
  - Difference Limit model keeps algorithmic output inside musical bounds
---

[Gumroad](https://aylesim.gumroad.com/l/birds) · [Isotonik Studios](https://isotonikstudios.com/product/birds-by-alessandro-aylesim-miracapillo/)

## Overview

Birds is a generative MIDI sequencer for Ableton Live, built as a Max for Live device. It takes a short MIDI phrase and rewrites it in real time, with enough of the original structure left that the result stays usable.

![Birds - Max for Live interface](/Birdsgr.png)

The interface is an animated score: each bird is a note, the wire is pitch, horizontal position is timing. Making that readable was as much of the work as the sequencer logic.

## How it works

A **Difference Limit** measures how far each new generation can move from a reference pattern. Pitch, rhythm, density, and register can shift, but only within a set distance from the source. Variation is a bounded rewrite, not a random scramble.

- **Rule-based melodic generation** with different strategies for rewriting source material
- **Real-time pitch and rhythm mutation** with controls for gate behavior and instability
- **Scale-aware and chromatic modes** for different harmonic constraints
- **Density and range controls** for both musical output and how the system responds
- **Transport-driven or MIDI-triggered playback** for studio and performance use
