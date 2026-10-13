---
type: device
category: devices
workScope: commercial
order: 8
menuLabel: max4live
listBadges:
  - prefix: available on
    label: Gumroad
    url: https://aylesim.gumroad.com/l/luckynotes
  - prefix: featured on
    label: ELPHNT Curated Collection
    url: https://elphnt.io/max-for-live-curated-collection/
title: Lucky Notes
role: Developer & Designer
client: Aylesim Devices
year: "2022"
tech:
  - Max/MSP
  - MIDI Systems
  - Probability Design
  - UI/UX Design
price: Free
highlights:
  - Listed in the ELPHNT Max for Live Curated Collection
  - MIDI effect that gates notes by probability for live arrangement
  - Control range lets patterns start sparse and grow denser without extra clip editing
  - Free Gumroad download, more than two thousand downloads
---

[Gumroad](https://aylesim.gumroad.com/l/luckynotes)

## Overview

Lucky Notes is a small Max for Live MIDI effect. It passes or drops incoming notes according to a single probability control, so you can thin a busy clip or bring a pattern toward full density from the device instead of duplicating clips or drawing automation. I use it most after a mono sequencer on melodic material. It also behaves predictably on rhythmic parts.

![Lucky Notes - Max for Live interface](/LN.png)

At 0% probability the lane stays effectively silent. At 100% every note is let through. Between those extremes the stream thins or thickens in real time, which is useful for rehearsing builds without rewriting MIDI.

The Gumroad page is free. It has **more than two thousand downloads**.

## How it works

The device sits on a MIDI track in front of an instrument. Each note-on is evaluated against the current probability threshold, with randomization so the result is musical rather than a fixed skip pattern. There is no audio path. The patch only decides which notes fire, which keeps CPU low.

- **Single main control** for probability, meant for live adjustment
- **MIDI-only processing** so it stays light in large sets
- **Typical Live chains**: before instruments, after sequencers

I implemented MIDI note gating, probability scaling, and a UI that stays legible under stage lighting.
