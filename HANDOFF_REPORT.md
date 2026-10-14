# Site strategy implementation report

The site now has server-rendered sections and 17 individual project URLs, with the existing moving-card stage, typography, palette, drag, inertia, and hover language retained. The homepage identifies Alessandro's work in the exact approved sentence. Retired claims are removed from published copy and generated JSON. This branch is for review; it does not deploy or merge the site.

## Acceptance results

- Step 1: documented Markdown data, App Router, all redirects, project renderer, moving cards, GSAP, styles, font, and PDF locations in HANDOFF_PROGRESS.md.
- Step 2: statically generated category routes; project titles and descriptions exist in initial HTML; unknown slugs return real 404s; old project routes redirect to their canonical category URL.
- Step 3: Work, Instruments, Art, About, Contact and Archive return 200. Sections reuse TileField, featured entries lead their section, and remaining entries sort by descending year. Store/label entries no longer appear as projects; community and teaching moved to About. The single Max Berlin website entry has its own Work URL.
- Step 4: applied supplied Home, case-study, Instruments, Art, About, community/teaching and Contact copy. Added Transluoghi Ecomuseo, ShapeLLM and the unnamed plugin. Missing facts remain highlighted.
- Step 5: retired-claim scan passes on src/, content/ and public/content.json. Confirmed dates, credit, Gumroad metric and tool tags replace earlier claims. Buttons have explicit destinations and appropriate labels.
- Step 6: internal-link crawl passes except the intentionally missing /cv.pdf. About works and /portfolio.pdf remains unchanged. No CV was generated.
- Step 7: 24 distinct page titles, descriptions, canonicals, Open Graph and Twitter cards. Sitemap lists all section and project URLs. Person JSON-LD uses GitHub and Instagram; LinkedIn is omitted pending confirmation.
- Step 8: all exported media are below 500 KB. The largest is 445,566 bytes; all original images and videos remain. Thumbnails are 800 by 500. Homepage props contain card previews, not long project descriptions. YouTube/Vimeo frames are created only after an explicit play action.
- Step 9: shared case template renders the requested fields and section order. Planetary uses the worked-example context, build and outcome with the exact design/development credit. Missing artwork setup and dates remain visible. Next-project navigation covers the full collection.
- Step 9b: category labels, first-three featured emphasis, persistent identity panel, sound previews, direct project navigation and retained stage pan/rotation. Short local hover loops are unavailable, so visual goal 4 is partial and every card says [needs clip].

## Validation

- `pnpm build`: passed, 28 generated static paths including framework routes, 17 project pages.
- `pnpm check`: passed (content JSON consistency and Biome).
- `pnpm verify:handoff http://localhost:3100`: passed. Checked 24 pages, 24 unique titles, 26 internal destinations, 17 legacy project redirects, three unknown-project 404s, all required metadata and headings, no initial video iframes, and nonempty alt text on 86 rendered image instances. The only missing internal file is /cv.pdf.
- Manual collaborative-browser checks: desktop 1440 by 900, tablet 768 by 1024, mobile 390 by 844. About and Birds have no horizontal overflow or clipped About cards. Enter/Tab navigation opens the menu and follows section links; Enter opens cards; Escape closes the sound preview and removes its iframe. A pointer drag changes world position and continues with inertia; hover still dims and blurs other cards. Returning from a project retains stage pan rather than resetting it. Reduced-motion checks in code skip inertia, plane nudges and the new opening tween.
- Lighthouse 13.5.0, local production server, default mobile simulation: Home performance 85, accessibility 100; Birds performance 91, accessibility 100. Both have no failed accessibility audits. Largest measured image transfer: Home 42,241 bytes; Birds 6,994 bytes. Scores are local snapshots, not production guarantees. Remaining performance costs include the existing Google Fonts stylesheet and framework JavaScript.
- Graph refreshed after substantive edits and final impact reviewed. Its test-gap warnings are supplemented by the production HTTP verification and manual interaction checks above.

## Visual changes (before/after)

1. **Collections and navigation.** Before: mixed legacy filter names and generic home redirects. After: All, Work, Instruments and Art filters; Work, Instruments, Art, About and Contact menu links; Archive in the footer. This serves goal 1 while retaining frosted panels and existing filter motion, rather than adding a separate navigation system.
2. **Category labels.** Before: category was not visible on each card. After: a small black/white label stays visible on each card. This serves goal 1. Text labels use the existing palette and avoid new category colours or thumbnail effects.
3. **Featured hierarchy.** Before: every project was unfeatured and equally sized. After: Planetary, Birds and Please Set a Password occupy the first spiral positions, receive an 8% scale increase, a thin white edge and persistent title metadata. This serves goal 2 without changing the spiral generator or introducing a second card layout.
4. **Identity.** Before: no readable identity sentence on the stage. After: a compact frosted lower-left panel with the name, exact hero and Berlin/EU line; on mobile it sits above the footer. This serves goal 3. It stays readable instead of fading on drag, while the centre remains available for cards.
5. **Long-form reading.** Before: all case text travelled with the homepage and opened in a full-screen overlay. After: server pages hold case text; section introductions and supplied editorial copy can be read below the stage. This supports goals 3 and 5 and keeps the fixed stage intact rather than replacing it with a grid.
6. **Card opening.** Before: a card selected an in-page overlay. After: a 0.18-second GSAP scale tween opens its canonical page; reduced-motion users navigate immediately. Existing card proportions, black media frames and white inner lines carry into project pages. This serves goal 5. A modest existing-GSAP tween avoids a new shared-transition dependency. World pan/rotation is remembered across client navigation.
7. **Sound previews.** Before: no sound control on a card. After: cards with supplied videos have Play sound, opening a native modal using the existing dark detail language. One video loads after that explicit action; Escape closes it. This supports goal 4 without inventing audio samples or autoplaying media. Local muted hover loops remain [needs clip].
8. **Thumbnails.** Before: original-size images filled 300:215 cards, often cropped. After: compressed, contained 16:10 source thumbnails inside the same 300:215 cards. Source content can gain black padding; the stage card ratio is unchanged. This supports goals 1, 2 and 4 and keeps screenshots/device interfaces readable rather than enforcing destructive crops. Lucky Notes and TEDx remain marked for better images.
9. **Project layout.** Before: generic overlay with inconsistent facts and media order. After: breadcrumb, title, summary, card-shaped lead media, fields, five case sections and next-project links. This serves goal 5. The existing font, palette, media surfaces and spacing language carry the longer text; no new UI kit is used.
10. **About.** Before: gradient cards mixed stale biography and repeated recognition data. After: the same gradient-card component and GSAP entrance contain the approved biography, community, teaching, awards, press, education and languages. Community remains in this established card language instead of appearing as another project category.
11. **Readability and controls.** Before: card metadata shrank with viewport width, inactive filters used very faint text, and some closed-menu items could receive focus. After: metadata has a 14px minimum, inactive labels use the existing muted grey, closed menus and filtered cards are inert, accessible names contain visible labels, sound controls are keyboard-operable, and Archive has a larger touch target. These support all five goals without changing the typeface or palette.
12. **Missing facts.** Before: incomplete details were absent or implied as facts. After: white-on-dark inline markers with an existing red underline remain visible in editorial copy, fields and cards. This makes the unfinished evidence reviewable without adding a new colour.

Screenshots: [before](docs/handoff/before.png), [desktop after](docs/handoff/home-desktop.png), [mobile after](docs/handoff/home-mobile.png), [project after](docs/handoff/project-desktop.png). These are review artifacts, not public site assets.

## Copy handling and factual limits

No descriptive paragraph was shortened to create a new claim. Labels moved into fields, link labels were made actionable, and Planetary's worked example takes precedence over its shorter duplicate case outline. The speculative additional performance entry is represented by a confirmation marker; its event/year claim is withheld. Short Work entries retain section 4.7 text. About's Node.js/Python/FastAPI sentence comes from supplied section 4.10; its supporting project remains an open question.

Repository-only assertions withheld or corrected include old release dates for Birds/Freesound4Live/Lucky Notes, the artwork's conflicting year, a larger customer claim, an unsourced download count, an unverified partner attribution, unconfirmed Planetary feature highlights, outdated cooperative role/work claims, an open-source release claim and skill-like tags. Existing assets are evidence of their visible content, not proof of the roles or outcomes previously attached to them. The Planetary screenshot is the existing general Compendium interface and still contains the original site's logo strip; a North Sea-specific still/recording remains needed. No partner credit was added to published copy.

The three new entries lack approved source stills. Their cards use title fallbacks, their pages show missing-image markers, and social metadata temporarily uses the existing portrait rather than an invented project screenshot. LinkedIn, freelance availability, plugin name/formats/date/stack, manuals, artwork setup and remaining media require the confirmations below.

## Dependencies and retained assets

No new UI or animation dependency. Added sharp 0.34.5 as explicit development image tooling (already present transitively), plus media:compress and verify:handoff commands. All original assets, including portfolio.pdf, remain; no original image or video was deleted. Removed Markdown project entries are the store, label and community duplicates, whose confirmed content moved into the appropriate section/About page.

## Remaining [needs] markers by page

This inventory includes editorial text, fields and selectable card previews. Repeated occurrences on the same page are listed once. Project-image alt text for the three missing source images is also pending in data; it will require approval when those images are supplied.

### /

- [needs clip]
- [needs: 2021 per award, site says 2022]
- [needs: name]
- [needs: release date]
- [needs year; site says 2022]
- [needs year]
- [needs: whether to add "and freelance projects"]
- [needs: CV PDF file]

### /work

- [needs clip]
- [needs: 2021 per award, site says 2022]
- [needs: name]
- [needs: release date]
- [needs year; site says 2022]
- [needs year]

### /instruments

- [needs clip]
- [needs: 2021 per award, site says 2022]
- [needs: name]
- [needs: release date]
- [needs year; site says 2022]
- [needs year]
- [needs: where the plugin will be sold]
- [needs: manual PDF link]
- [needs: current store link; whether it is open source]
- [needs: formats]
- [needs: link]

### /art

- [needs clip]
- [needs: 2021 per award, site says 2022]
- [needs: name]
- [needs: release date]
- [needs year; site says 2022]
- [needs year]
- [needs end year]
- [needs confirmation before publishing: additional performances]

### /about

- [needs year]
- [needs: CV PDF file]
- [needs: meetup photo]

### /contact

- [needs: freelance yes/no]
- [needs current URL confirmed]
- [needs: CV PDF file]

### /instruments/birds

- [needs: any other constraints, e.g. panel size]
- [needs: video captions and description of the sound]
- [needs: manual PDF link]
- [needs: CV PDF file]

### /instruments/disco-plugin

- [needs: name]
- [needs: project image]
- [needs: role]
- [needs: release date]
- [needs: context and constraints]
- [needs: formats]
- [needs: link]
- [needs: stack confirmed for publication]
- [needs: release date, formats and link]
- [needs clip]
- [needs: manual PDF link]
- [needs: CV PDF file]

### /instruments/disco

- [needs year; site says 2022]
- [needs: context and constraints]
- [needs: outcome]
- [needs: video captions]
- [needs: manual PDF link]
- [needs: CV PDF file]

### /work/eduardo-pesole

- [needs: context and constraints]
- [needs: screenshots or screen recording]
- [needs clip]
- [needs: CV PDF file]

### /art/fonema

- [needs: channel count, duration, speakers]
- [needs: where shown; confirm it was the Conservatorio thesis]
- [needs: exhibition record]
- [needs: 3 to 5 stills, duration and excerpt]
- [needs: streamable audio]
- [needs: CV PDF file]

### /instruments/freesound4live

- [needs: current store link; whether it is open source]
- [needs: context and constraints]
- [needs: repo link or remove]
- [needs: video captions]
- [needs: manual PDF link]
- [needs: CV PDF file]

### /work/glossia

- [needs: context and constraints]
- [needs: outcome]
- [needs: screenshots or screen recording]
- [needs clip]
- [needs: CV PDF file]

### /instruments/knob-studio

- [needs: context and constraints]
- [needs: manual PDF link]
- [needs: CV PDF file]

### /instruments/lucky-notes

- [needs year]
- [needs: context and constraints]
- [needs: better image]
- [needs clip]
- [needs: manual PDF link]
- [needs: CV PDF file]

### /work/max-berlin-network-site

- [needs: context and constraints]
- [needs: screenshots or screen recording]
- [needs clip]
- [needs: CV PDF file]

### /work/planetary-compendium

- [needs: other constraints, for example performance, accessibility or exhibition hardware]
- [needs confirmation: the draggable document archive for the Hindu Kush chapter]
- [needs confirmation before keeping: reduced-motion support, stable rendering during live group sessions]
- [needs: screen recording of the chapter scroll; confirmation whether the chapter has audio]
- [needs: screenshot of the immersive part of the chapter and its case page]
- [needs: 3 to 5 more stills, compressed]
- [needs clip]
- [needs: CV PDF file]

### /art/please-set-a-password

- [needs: 2021 per award, site says 2022]
- [needs: screens or projectors, channel count, room size]
- [needs other venues]
- [needs: 3 to 5 stills, duration and excerpt]
- [needs: CV PDF file]

### /work/shapellm

- [needs: project image]
- [needs: context and constraints]
- [needs: outcome]
- [needs: screenshots or screen recording]
- [needs clip]
- [needs: CV PDF file]

### /art/tedx-barletta

- [needs: exhibition record]
- [needs: 3 to 5 stills, duration and excerpt]
- [needs: better image]
- [needs: CV PDF file]

### /art/there-will-be-no-more-determination

- [needs: single or multi-screen, duration, sound]
- [needs where it was exhibited]
- [needs: exhibition record]
- [needs: 3 to 5 stills, duration and excerpt]
- [needs: CV PDF file]

### /work/transluoghi-ecomuseo

- [needs: project image]
- [needs: e.g. who edits the content, languages, deadlines]
- [needs screenshots]
- [needs clip]
- [needs: CV PDF file]

### /art/wikyslavery

- [needs: display setup]
- [needs where it was exhibited]
- [needs: exhibition record]
- [needs: 3 to 5 stills, duration and excerpt]
- [needs: confirm spelling]
- [needs: CV PDF file]

## Open questions from strategy section 5

1. What file should the CV link open: fix /resume.pdf or move to /cv.pdf?
2. Is the LinkedIn URL on the site (alessandro-miracapillo-21b57895) current, and should it be used?
3. Do you also want freelance work, or employment only?
4. Can the site say three.js (used on eduardopesole.com and ShapeLLM), or leave it off?
5. What are the VST's name, formats and release date, and can the site mention C++/JUCE?
6. Can you describe the Max for Live work for Hans Christian Merten at Ars Electronica, and may it be published?
7. Did you build the draggable document archive for the Hindu Kush chapter?
8. Are the current site claims about Planetary Compendium (reduced-motion paths, stable rendering in live sessions, audio-driven interfaces) true?
9. Is Freesound4Live open source, and where is the code?
10. Which year is Birds: 2025 (site) or 2026 (PDF, Rekkerd)?
11. What year were Disco and Lucky Notes released?
12. Is Please Set a Password from 2021 or 2022?
13. For each artwork: duration, channel count, screens, and where it was shown?
14. Was Fonema your Conservatorio thesis, and what year did you graduate?
15. Should ayyyyyyyyyyyyyyy (Blackout Festival, Turin) and the Phonè show at Maul go on the site? What years?
16. Until when did the artist practice run, and should the site say it is paused?
17. Is there an Attack Magazine article about Knob Studio, or only the store listing? (The plan currently drops Attack.)
18. Do you have manual PDFs for every device to link?
19. Which Python or FastAPI project can be shown?
20. Do you want the La Scuola Open Source and TEDx entries on the main pages or in the archive?
21. Can you supply screenshots or recordings for Transluoghi, Eduardo Pesole, the Max Berlin site and the North Sea chapter?
22. Should the GitHub profile location change from Bari to Berlin?
