---
type: work
category: web-interactive
title: Glossia
year: '2026'
role: Developer
tech:
  - Next.js
  - React
  - TypeScript
  - zod
  - React Flow
summary: Compiles a written request into a typed workflow, checks the graph, and records each step as it runs.
featured: false
order: 3
showInMenu: true
canvasImage: /media/glossia.webp
imageAlt: Glossia prototype showing a compiled workflow, execution trace and node inspector
galleryAfterVideo:
  - /media/glossia-artifact.webp
status: Proof of concept
listTagline: Compiles a written request into a typed workflow, checks the graph, and records each step as it runs.
liveLink: 'https://glossia-seven.vercel.app'
listBadges: []
---
## Context and constraints

An LLM can describe a plausible workflow with connections that do not work. Glossia explores how much of that failure can be caught before execution. A domain defines the available node types and their ports, so generated graphs can be checked against an explicit contract.

## What I built

I built a compiler and runtime around that contract. A written request becomes a typed graph; a deterministic analyzer checks it, and a bounded repair pass addresses errors before the graph can run. The studio renders the accepted graph in React Flow alongside an inspector and execution timeline.

The runtime executes the graph in dependency order and records each node's input and output, with token use, cost and latency. Research briefs include a separate citation check: quoted evidence must appear in the source text. The studio also includes MIDI and storytelling presets.

## Outcome

A working research prototype with recorded and live execution modes. Recorded mode runs without an API key and uses fixtures through the same analyzer and repair loop. Live mode uses a model provider.

The research example uses a small, hand-written source corpus. It does not search the live web or ingest PDFs. The graph is read-only, and run storage is in process; this remains a study of validation and execution rather than a production workflow service.

## Media

The studio shows the compiled graph and its run trace. The artifact view exposes the output so the result can be inspected alongside the steps that produced it.

## Links

[Open site](https://glossia-seven.vercel.app) · [View code](https://github.com/aylesim/Glossia)
