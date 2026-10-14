---
type: device
category: devices
title: Birds
year: '2026'
role: 'Design, code and user manual.'
tech:
  - Max/MSP
  - JavaScript (jsui/mgraphics)
  - Max for Live
  - Live API
summary: >-
  A generative MIDI sequencer for Ableton Live. It plays a 16-step melody and
  changes it while it plays.
featured: true
order: 1
showInMenu: true
canvasImage: /Birdsgr.png
imageAlt: '[needs alt text]'
status: Released
listTagline: >-
  A generative MIDI sequencer for Ableton Live. It plays a 16-step melody and
  changes it while it plays.
videos:
  - title: Carousel demo
    url: 'https://www.youtube.com/watch?v=Eax-kVIUId4'
  - title: Full walkthrough
    url: 'https://www.youtube.com/watch?v=0-D_bPzaqfo'
listBadges:
  - prefix: available on
    label: Gumroad
    url: 'https://aylesim.gumroad.com/l/birds'
  - prefix: available on
    label: Isotonik Studios
    url: >-
      https://isotonikstudios.com/product/birds-by-alessandro-aylesim-miracapillo/
buyLink: 'https://aylesim.gumroad.com/l/birds'
client: Aylesim Devices
---
A generative MIDI sequencer for Ableton Live. It plays a 16-step melody and changes it while it plays.

- **Role:** Design, code and user manual.
- **Stack:** Max/MSP, JavaScript (jsui/mgraphics), Max for Live, Live API.
- **Constraints:** The melody changes while it plays, so pitch, timing and note state had to stay readable as it changes. [needs: any other constraints, e.g. panel size]
- **What I built:**
  - A display where each note is a bird on one of 12 wires, one wire per pitch class. Clicking a bird switches its step on or off.
  - Colour states for original, drifted and muted notes. The playing bird is drawn in flight.
  - A Difference Limit control that sets how far the melody can drift from the original before it returns
  - Pitch and gate mutation strategies, and the manual
- **Outcome:** Covered by Rekkerd in April 2026. Sold on Gumroad and Isotonik Studios.
- **Media:** Carousel demo, full walkthrough (YouTube).
- **Links:** aylesim.gumroad.com/l/birds · Isotonik · Manual (PDF)

[needs: manual PDF link]
