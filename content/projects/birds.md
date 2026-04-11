---
type: work
order: 1
menuLabel: max4live
title: Birds
role: Developer & Designer
client: Aylesim Devices
year: 2025
tech:
  - Max/MSP
  - Max for Live
  - Ableton Live
  - Generative MIDI
  - Algorithmic composition
liveLink:
videos:
  - title: Carousel demo
    url: https://www.youtube.com/watch?v=Eax-kVIUId4
  - title: Full walkthrough
    url: https://www.youtube.com/watch?v=0-D_bPzaqfo
highlights:
  - Designed a rule-based generative system for melodic variation inside Max for Live
  - Built a visual mapping where pitch, timing, and note state stay legible while the sequence evolves
  - Balanced algorithmic behavior with musical constraints through a Difference Limit model
---

## Overview

Birds is a generative MIDI sequencer for Ableton Live, developed as a Max for Live device. I built it as a study in algorithmic composition, interface design, and musical constraint: the goal was to create a system that can transform a short MIDI phrase in real time while preserving enough structure to keep the result readable and usable.

![Birds — Max for Live interface](/Birdsgr.png)

The interface translates the sequence into an animated score where each bird represents a note, the wire represents pitch, and horizontal position represents timing. This made the project as much about visual communication as sequencing logic: the challenge was to expose generative behavior in a way that feels immediate rather than opaque.

## How it works

At the core of the device is a **Difference Limit system** that measures how far each new generation can move away from a reference pattern. Instead of treating variation as randomness, I approached it as a constrained transformation problem: pitch, rhythm, density, and register can all shift, but only within a controlled distance from the source material.

- **Rule-based melodic generation** with different strategies for transforming source material
- **Real-time pitch and rhythm mutation** with controls for gate behavior and instability
- **Scale-aware and chromatic modes** to test different harmonic constraints
- **Density and range controls** to shape both musical output and system responsiveness
- **Transport-driven or MIDI-triggered playback** to support different performance contexts

## Skills involved

The project brought together several parts of my practice: Max/MSP patch design, generative music systems, parameter mapping, interaction design, and the translation of abstract musical processes into a visual interface. It also reflects how I tend to work more broadly: defining a clear behavioral model first, then designing controls and visuals that make the system understandable in use.
