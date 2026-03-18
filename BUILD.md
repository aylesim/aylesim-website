# Aylesim Website — Build Plan

## Tech Stack

**Next.js 16** + **Tailwind CSS 4** + **TypeScript**

Optional: **Framer Motion** for subtle page transitions and micro-interactions. Skip Webflow — you already have a codebase; Webflow is no-code and would mean rebuilding from scratch.

---

## 1. Folder & Page Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx
│   ├── globals.css
│   ├── work/
│   │   ├── page.tsx                # Portfolio index (4 case studies)
│   │   └── [slug]/page.tsx         # Case study detail
│   ├── devices/
│   │   ├── page.tsx                # Store showcase
│   │   └── [slug]/page.tsx         # Device detail (NEW — to add)
│   ├── about/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── layout/
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   ├── home/
│   │   ├── hero.tsx                # NEW
│   │   ├── nav-cards.tsx           # NEW — Work / Devices / About
│   │   ├── featured-device.tsx     # NEW — Birds demo
│   │   └── open-to-work-banner.tsx # NEW
│   ├── features/
│   │   ├── devices-grid.tsx
│   │   ├── device-card.tsx         # NEW — card with video, price, buy
│   │   └── project-card.tsx        # for work case studies
│   └── visuals/
│       └── planet.tsx              # (existing)
├── lib/
│   ├── devices.ts
│   └── work.ts                     # NEW — case study data
└── types/
    └── ...
```

**Pages to add:**
- `devices/[slug]/page.tsx` — individual device page with demo video, description, buy CTA

**Pages to remove or redirect:**
- `selected-works`, `generative-projects`, `interactive-systems`, `code-technology`, `community`, `tools`, `blog`, `newsletter` — consolidate into `/work` per your brief, or archive

---

## 2. Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#0a0a0a` | Page background |
| `--bg-elevated` | `#18181b` | Cards, hover states |
| `--border` | `#27272a` | Borders, dividers |
| `--text-primary` | `#fafafa` | Headlines, primary text |
| `--text-secondary` | `#a1a1aa` | Body, descriptions |
| `--text-muted` | `#71717a` | Labels, meta |
| `--accent` | `#d4d4d8` | Links, CTAs (subtle) |

Tailwind mapping:
- `bg-zinc-950` / `bg-zinc-900` for backgrounds
- `text-zinc-100` / `text-zinc-400` / `text-zinc-500` for text
- `border-zinc-800` for borders

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Display (hero, h1) | Cormorant | 4xl–5xl | 500–600 |
| Headings (h2, h3) | Cormorant | 2xl–3xl | 500 |
| Body | Geist Sans | base–lg | 400 |
| Labels, meta | Geist Mono | sm | 400 |

Existing classes: `font-serif-display`, `font-mono`

### Spacing

- Section padding: `py-16 md:py-24` or `py-24 md:py-32`
- Content max-width: `max-w-3xl` (about, contact), `max-w-4xl` (work, devices)
- Horizontal padding: `px-6`
- Gaps between sections: `space-y-16` or `mb-24`

### Motion

- Page transitions: 200–300ms ease-out
- Hover: opacity or underline, no heavy transforms
- Featured device video: autoplay, loop, muted

---

## 3. Homepage Component Breakdown

### `Hero` (`components/home/hero.tsx`)

- **Aylesim** — serif display, large
- Subline: "Creative Technologist — Max/MSP, Creative Coding, Interactive Experiences · Berlin"
- No extra decoration

### `NavCards` (`components/home/nav-cards.tsx`)

Three cards in a row (stack on mobile):

| Card | Link | Short label |
|------|------|-------------|
| Work | `/work` | Portfolio for studios |
| Devices | `/devices` | Max4Live instruments |
| About | `/about` | Bio & CV |

Each: clickable block, subtle border or background, hover state. Typography-forward, not icon-heavy.

### `FeaturedDevice` (`components/home/featured-device.tsx`)

- Device: Birds (from `lib/devices.ts`)
- Short looping demo video (30s or less)
- "New" or "Featured" label
- One-line description
- Link to `/devices/birds` or buy CTA

### `OpenToWorkBanner` (`components/home/open-to-work-banner.tsx`)

- Thin banner, full-width
- Text: "Open to studio collaborations and freelance projects"
- Muted styling, non-intrusive

### Homepage Layout Order

1. Hero
2. NavCards
3. FeaturedDevice
4. OpenToWorkBanner
5. (Footer via layout)

---

## 4. 5-Day Build Order

### Day 1 — Foundation & Design System

- [ ] Add design tokens to `globals.css` (colors, spacing vars)
- [ ] Create `lib/work.ts` with 4 case studies (Planetary Compendium, Aylesim Devices, Max Berlin Network, Generative Music System)
- [ ] Clean up routes: remove or redirect legacy pages (`selected-works`, `generative-projects`, etc.)
- [ ] Update `work/page.tsx` to use `lib/work.ts` and match brief order
- [ ] Add `sequencer` to device categories in `lib/devices.ts` if needed

### Day 2 — Homepage

- [ ] Build `Hero` component
- [ ] Build `NavCards` component
- [ ] Build `FeaturedDevice` component (video placeholder if no asset yet)
- [ ] Build `OpenToWorkBanner` component
- [ ] Compose homepage in `app/page.tsx`
- [ ] Ensure mobile responsive layout

### Day 3 — Work & Devices

- [ ] Update `work/[slug]/page.tsx` with full case study content (role, stack, year, link, media)
- [ ] Add Aylesim Devices case study (links to Gumroad + Isotonik)
- [ ] Add `devices/[slug]/page.tsx` for device detail pages
- [ ] Add store links (Gumroad, Isotonik) at top of `/devices`
- [ ] Add `sequencer` filter tag to devices
- [ ] Build `DeviceCard` with video slot, price, buy button for devices grid

### Day 4 — About & Contact

- [ ] Rewrite About: 3–4 line first-person bio
- [ ] Add Publication: CDM - Create Digital Music (2020)
- [ ] Add "Alessandro Miracapillo, known as Aylesim" line (discreet)
- [ ] Contact: add LinkedIn, Cal.com/Calendly, Isotonik link
- [ ] Contact: add "Open to studio collaborations, commissions, and freelance projects"

### Day 5 — Polish & Content

- [ ] Add real media: screenshots/videos for case studies
- [ ] Add Birds demo video to homepage and devices
- [ ] Add CV PDF to `/public/cv.pdf`
- [ ] Final copy pass (no "passionate about", etc.)
- [ ] Mobile QA, performance check

---

## Quick Reference — Case Study Order (Work)

1. **Planetary Compendium** — Frontend Developer · Berggruen Institute × Dark Matter Labs · Next.js · Live platform, exhibited Zürich Nov 2025
2. **Aylesim Devices** — Overview, links to Gumroad + Isotonik
3. **Max Berlin Network** — Founder & Community Manager · Since Jan 2025 · Betahaus Berlin · maxberlin.network
4. **Generative Music System** — Artistic project · Max/MSP · Blackout Festival Turin

---

## Quick Reference — Device Tags

`generative` · `FX` · `utility` · `sequencer`
