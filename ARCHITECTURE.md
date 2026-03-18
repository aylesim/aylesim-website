# Aylesim Website — Technical Architecture

## 1. Folder Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage — core experience
│   ├── layout.tsx
│   ├── globals.css
│   ├── work/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── devices/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── compositions/page.tsx       # Archive of saved compositions
│   ├── c/[id]/page.tsx             # Saved composition viewer (nanoid)
│   └── api/
│       └── compositions/
│           ├── route.ts            # POST: save, GET: list
│           └── [id]/route.ts       # GET: fetch single composition
├── components/
│   ├── home/
│   │   ├── hero-experience.tsx      # Full homepage hero (shape + glitch + sound)
│   │   ├── breathing-shape.tsx     # Canvas-based organic shape
│   │   ├── glitch-overlay.tsx      # Pixel-shatter effect
│   │   ├── soundscape.ts           # Tone.js audio engine (hook/context)
│   │   └── composition-cta.tsx     # Salva / Esplora buttons
│   ├── layout/
│   │   ├── navbar.tsx              # Conditional: hidden until "esplora"
│   │   └── footer.tsx
│   └── compositions/
│       └── archive-grid.tsx        # Grid of saved compositions
├── lib/
│   ├── composition-state.ts        # Shape params, sound params, serialization
│   ├── devices.ts
│   └── work.ts
└── types/
    └── composition.ts
```

---

## 2. Core Homepage — Implementation Plan

### 2a. Breathing Shape (Canvas API)

**Choice: Canvas API over p5.js**

- Lighter bundle, no React wrapper complexity
- Full control over animation loop, no framework conflicts
- `useRef` + `useEffect` for canvas lifecycle

**Algorithm:**
- Start: irregular polygon (5–7 vertices), not a circle
- Each vertex has a target position + current position
- Target drifts slowly using Perlin-like noise (simplex or simple sine combinations)
- Lerp current → target for organic "breathing" motion
- Vertices never settle — continuous micro-movement
- Color: single acid accent, opacity varies with "breath"

**State evolution per click:**
- Click 1: +1 vertex, hue shift
- Click 2–5: +1 vertex each, more color channels, faster drift
- Click 6: final form — stable but still breathing

### 2b. Glitch Effect

**Approach: Canvas pixel manipulation**

1. On click: capture current canvas as `ImageData`
2. Create offscreen canvas, draw captured frame
3. For 1.5s (then 0.8s, 0.3s, 0.1s): 
   - Slice image into horizontal strips
   - Apply random vertical offset (pixels "fall")
   - Add RGB channel shift (chromatic aberration)
   - Draw to main canvas
4. Ease out, recompose to clean state

**Alternative:** WebGL fragment shader for real-time glitch — more performant but heavier. Canvas is sufficient for 1.5s burst.

### 2c. Soundscape (Web Audio API)

**Implementation:** Native Web Audio API — no Tone.js dependency. Can be upgraded to Tone.js for richer effects.

**First click:**
- Short burst: filtered noise buffer (0.4s), harsh but controlled

**Subsequent clicks (2–6):**
- Add layers: sine oscillators at 55, 82.5, 110, 165, 220, 330 Hz
- LFO modulates gain for rhythmic pulse
- Layers accumulate, loop
- Final state: minimal composition, all layers active

### 2d. Composition URLs (nanoid)

**Flow:**
1. User clicks [ salva ]
2. Serialize: `{ shape: {...}, sound: {...} }` → base64 or JSON
3. Generate `nanoid(10)` → short ID
4. POST to `/api/compositions` → store in DB/KV
5. Redirect to `aylesim.com/c/[id]`

**Storage options:**
- **Vercel KV** (recommended): serverless, persistent
- **Supabase**: if already in stack
- **Fallback:** encode full state in URL (long but works without backend)

**`/c/[id]` page:**
- Fetch composition by ID
- Render shape + sound in frozen state (no further clicks)
- No "touch it" — it's a view-only composition

---

## 3. Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#0c0c0c` | Page background (near black) |
| `--bg-elevated` | `#141414` | Cards, hover |
| `--border` | `#1a1a1a` | Hard edges |
| `--text` | `#f5f5f5` | Primary text |
| `--text-muted` | `#737373` | Secondary |
| `--accent` | `#b8ff00` | Acid green (or `#00ff9d` mint) |

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Logo, hero | Space Grotesk | 1rem (logo), 4xl+ (hero) | 700 |
| Headings | Space Grotesk | 2xl–4xl | 600–700 |
| Body | IBM Plex Mono | base | 400 |
| Labels | IBM Plex Mono | sm | 400 |

**No border-radius.** Hard edges everywhere.

### Spacing

- Section: `py-20 md:py-32`
- Content: `max-w-4xl`, `px-6`
- Grid gaps: `gap-4` or `gap-6`

---

## 4. Build Order

### Phase 1 — Core Experience (Homepage Hero)

1. **Design system** — Update `globals.css`, fonts (Space Grotesk, IBM Plex Mono), colors
2. **Breathing shape** — Canvas component, vertex drift, acid color
3. **Glitch effect** — Pixel capture + falling strips on click
4. **Soundscape** — Tone.js context, first-click burst, accumulating layers
5. **State machine** — Click count, evolution logic, final state
6. **Composition CTA** — Salva / Esplora buttons, conditional render
7. **Save flow** — nanoid, API route, redirect to `/c/[id]`
8. **Esplora transition** — Shape morphs into nav (GSAP or CSS)

### Phase 2 — Composition Persistence

9. **API routes** — POST/GET compositions (Vercel KV or JSON file for dev)
10. **`/c/[id]` page** — Load and display saved composition
11. **`/compositions` page** — Archive grid, thumbnails, play buttons

### Phase 3 — Rest of Site

12. **Layout** — Conditional navbar (hidden on hero until esplora)
13. **Work, Devices, About, Contact** — Per existing BUILD.md + brief updates

---

## 5. Dependencies

- **nanoid** — unique composition IDs
- **gsap** — "esplora" morph transition (optional, for shape→nav animation)
- **tone** — optional upgrade for richer soundscape (currently using Web Audio API)
