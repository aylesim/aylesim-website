---
type: device
order: 8
menuLabel: max4live
title: Lucky Notes
role: Developer & Designer
client: Aylesim Devices
tech:
  - Max/MSP
  - Max for Live
  - Ableton Live
  - MIDI
  - Probability
price: Free
featured: false
highlights:
  - Built a lightweight Max for Live MIDI effect that gates notes by probability for live arrangement
  - Tuned the control range so patterns can start sparse and grow in density without extra clip editing
  - Shipped as a free Gumroad download with over two thousand downloads to date
---

[Gumroad](https://aylesim.gumroad.com/l/luckynotes)

## Overview

Lucky Notes is a small Max for Live **MIDI effect** I released as a performance utility: it passes or drops incoming notes according to a single **probability** control, so you can thin out a busy clip or slowly bring a pattern toward full density from the device instead of duplicating clips or drawing automation by hand. I use it most after a mono sequencer on melodic material, but it behaves predictably on rhythmic parts too.

![Lucky Notes - Max for Live interface](/LN.png)

At **0%** probability the lane stays effectively silent; at **100%** every note is let through. Between those extremes the stream thins or thickens in real time, which makes it easy to rehearse builds or keep a set feeling less static without rewriting MIDI.

The distribution there is free; over time the page has accumulated **more than two thousand downloads**, which tells me the problem it solves is a common one in Live-centric workflows.

## How it works

The device sits on a MIDI track in front of an instrument: each note-on is evaluated against the current probability threshold (with sensible randomization so the result is musical rather than a fixed decimation pattern). There is no audio path inside the patch - it is strictly about **which notes fire**, which keeps CPU low and the mental model simple.

- **Single main control** for probability, oriented toward live adjustment
- **MIDI-only processing** so it stays lightweight in large sets
- **Compatible with typical Live chains** (before instruments, after sequencers)

## Skills involved

The patch is intentionally minimal: the engineering work was about correct MIDI handling, clear parameter scaling, and a UI that reads instantly under stage lighting. It also reflects how I sometimes ship tools: a tight scope, a single strong idea, and distribution that stays frictionless for the person downloading it.
