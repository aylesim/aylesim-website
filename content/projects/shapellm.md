---
type: work
category: web-interactive
title: ShapeLLM
year: '2026'
role: Developer
tech:
  - Next.js
  - three.js
  - zod
summary: >-
  Reads the tone of a text across six dimensions and maps that reading to a 3D
  form, with source quotes behind the scores.
featured: false
order: 30
showInMenu: true
canvasImage: /media/shapellm.webp
imageAlt: ShapeLLM Studio with a text sample, a 3D specimen and six tone dimensions
galleryAfterVideo:
  - /media/shapellm-furious.webp
  - /media/shapellm-reading.webp
status: Proof of concept
listTagline: >-
  Reads the tone of a text across six dimensions and maps that reading to a 3D
  form, with source quotes behind the scores.
liveLink: 'https://shape-llm.vercel.app'
listBadges: []
---
## Context and constraints

A single anger score leaves much of a text's tone unexplained. ShapeLLM explores a richer reading: valence, arousal, dominance, tension, warmth and certainty. Each score has a confidence value and quoted evidence that the reader can inspect. These readings are interpretations of language, not psychological assessments.

## What I built

I built a Studio where text becomes a structured reading and a three.js specimen. Zod validates the model response, and quoted evidence is anchored to the source text. A deterministic mapping turns the six-axis reading into geometry and material parameters: the same reading produces the same form.

The Reading Room extends this to longer texts. It divides a reading into beats, follows their changing tone, and animates the specimen during playback. Browser speech synthesis provides the voice; silent playback keeps the visual sequence usable without audio.

## Outcome

A working proof of concept with a specimen gallery and a Lab showing evaluation methods and baseline results. The demo works without an API key through labelled sample readings and a local heuristic fallback. A provider key enables live model readings.

The evaluation set is small and uses a single author's targets without a held-out split. Its results are a baseline for further testing, not evidence that the system measures emotion reliably.

## Media

Studio screenshots compare calm and furious samples. The Reading Room shows how a longer text becomes a sequence of changing forms.

## Links

[Open site](https://shape-llm.vercel.app) · [View code](https://github.com/aylesim/ShapeLLM)
