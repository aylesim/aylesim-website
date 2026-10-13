---
type: work
category: web-interactive
order: 2
menuLabel: web
listTagline: Public site for a Berlin Max/MSP network
canvasImage: /LN.png
title: Max Berlin Network
role: Co-Founder & Web Developer
client: Max Berlin Network
year: 2025–ongoing
tech:
  - Frontend Architecture
  - Next.js / TypeScript
  - Content Systems
liveLink: https://www.maxberlin.network/
highlights:
  - Designed and built the public site at maxberlin.network
  - Homepage shows next meetup date, venue, and detail pages without a redeploy for every edit
  - Newsletter signup and social links between sessions
  - Meetup archive and about pages for past events and the initiative
---

## Overview

[Max Berlin Network](https://www.maxberlin.network/) is the website I co-founded and built in early **2025** for a Berlin-based Max/MSP network. The job is narrow: when the next session is, where it happens, how to get on the list, and where to read about past meetups, without relying on scattered social posts.

The visual language is poster-like: bold type, slight rotations, monospace detail. The layout puts date, venue, and signup first.

## What the site does

- **Next meetup** on the homepage with date, venue, time, and a link to the full event page
- **Newsletter** capture for upcoming meetups, open calls, and announcements
- **Meetup archive** for past sessions
- **About**, plus outbound links to Discord and Instagram
- **Light / dark** theme toggle

## My contribution

I shaped the information architecture and built the site in **Next.js** and **TypeScript**, deployed on **Vercel**. Meetup copy and scheduling stay editable without treating the homepage as a one-off static file.

- **Event routing**: a page per meetup with a stable URL
- **Homepage data**: next session pulled into the hero so the primary call to action stays current
- **Newsletter flow**: signup in the main layout
- **Share metadata**: Open Graph and Twitter cards for link previews
