---
type: work
order: 2
menuLabel: max4live
title: Knob Studio
role: Developer & Designer
client: Aylesim Devices
year: 2024
tech:
  - Max/MSP
  - Max for Live
  - Ableton Live
  - Generative modulation
liveLink:
videos:
  - title: Carousel
    url: https://www.youtube.com/watch?v=nanpp0rhG_I
  - title: Walkthrough
    url: https://www.youtube.com/watch?v=crROD4nBBzE
  - title: How it's made
    url: https://www.youtube.com/watch?v=J0A9h0l-F2s
highlights:
  - Built a layered modulation engine with multiple concurrent function generators in Max for Live
  - Implemented reading-head modes (manual, LFO, envelope follower) on shared waveform material
  - Tied real-time visualization to modulation output so behavior stays inspectable while it runs
  - Used randomization plus global smoothing and jitter as macro controls over the whole modulator field
---

## Overview

Knob Studio is a Max for Live audio effect I developed to explore alternative approaches to parameter modulation in Ableton Live. Rather than treating modulation as a single control source, I wanted a small environment for mapping experiments: several layers can run in parallel, influence the same targets, and remain editable without the system turning into something you can only operate by trial and error.

![Knob Studio - Max for Live interface](/knobstudio.png)

The device centers on a waveform-driven modulation graph where functions are layered, shaped, and then interpreted by different reading strategies. A lot of the work went into keeping that graph legible in performance: what the patch is doing should be visible, not only audible.

## How it works

The modulation path is built around stacked waveform functions, each with its own parameters, and **reading heads** that interpret the combined result under different rules. Heads can be driven manually, by LFOs, or by an envelope follower, which effectively changes how the same underlying material is scanned over time.

Randomization is treated as a controlled perturbation layer: useful for breaking local minima in sound design, but always bounded by smoothing and jitter applied at a global level so the whole field of modulators moves together when you want cohesion.

- **Layered function stack** for building complex modulation shapes from simpler primitives
- **Multiple head modes** to switch between performative control, periodic motion, and audio-responsive scanning
- **Real-time waveform display** aligned with what is actually being applied to parameters
- **Randomization** with clear entry points so exploration does not erase your starting point
- **Global smoothing and jitter** as cross-cutting dynamics across all active modulations

## Skills involved

The project sits at the intersection of DSP-facing modulation logic, Max patch architecture, and interaction design for dense parameter spaces. It reflects how I like to build tools: define the behavior model first (what is being modulated, by what structure, and under which constraints), then design the surface so editing and performance stay connected to that model.
