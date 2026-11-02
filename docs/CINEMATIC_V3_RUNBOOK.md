# Cinematic V3 runbook

Source of truth: `docs/cinematic/` (the complete uploaded V3 package, verbatim).
Read `docs/cinematic/README_START_HERE.md` and `docs/cinematic/MUSE_MASTER_INSTRUCTIONS.md` first.

## Status (2026-11-02, honest)

| Item | State |
|---|---|
| Existing catalogue stills (JPG, `images/`) | 78/78 present, each ≤ 75,000 bytes — these are V3's *existing references*, not V3 deliverables |
| V3 still deliverables (`assets/lareen/stills/*.webp`, 4:5) | 0/78 — NOT GENERATED, pending Gate B + owner approval |
| Brand-film clips (6 × 8 s, 16:9) | 0/6 — NOT GENERATED |
| Hero product clips (10, optional) | 0/10 — gated on film QA passing |
| Category clips (5) | 0/5 |
| Hero poster (`assets/lareen/posters/lareen-hero.webp`) | Absent — needs an approved still or video frame |
| Flow project `LAREEN_MASTER_STUDIO_V1` | Not created by this run — see Gate A |
| Site motion (§5 of the work order) | Compliant: text-only reveal 520 ms / 12 px, card lift ≤ 2 px in 180–260 ms, image zoom ≤ 1.025, reduced-motion static, no video shipped, 10-slide showcase kept, category rail kept |
| Site palette (§6) | Ivory `#F7F3EC`, espresso `#2B211C`, champagne `#B99B70` already live; pistachio `#758069` / rose `#CBA99A` are studio accents for imagery |

No video was generated in this run, no Flow credits were spent, and nothing here claims a film exists.

## Gates (in order, do not skip)

- **Gate A — Inventory + references.** Done for the live site (above). Still needed from the owner: real bakery reference photos if available, and confirmation that the existing AI catalogue images may serve as approved illustrative starting references.
- **Gate B — 3 pilot stills.** Generate only `mixed-arabic-sweets`, `pistachio-baklawa`, `eid-box` first, from `docs/cinematic/STILLS_78_COPY_PASTE/STILL-<slug>.txt` in Flow project `LAREEN_MASTER_STUDIO_V1`. Side-by-side contact sheet vs catalogue sources; owner approves the look before anything else is generated.
- **Gate C — 6 film shots.** From `docs/cinematic/VIDEOS_EXACT_PROMPTS/FILM_*.txt`, approved stills as start frames, 16:9, 8 s each. Frame-QA at 0 / 25 / 50 / 75 / 100 %; reject on any rejection condition in the visual bible (object-count change, deformation, fake text/logos, floating trays, gold-box drift).
- **Gate D — 48 s film + hero clip.** Assemble the six clips per `docs/cinematic/MASTER_BRAND_FILM_48_SECONDS.md`. The 48 s film goes on Our Story / a click-to-play overlay — never autoplay, never the homepage background. The homepage takes only the first optimized 8 s clip (silent MP4 + WebP poster + static fallback).
- **Gate E — Hero slide videos (optional).** Only after Gate C passes. Never autoplay all ten; at most the active slide's video, desktop only.
- **Gate F — Remaining 75 stills.** Only after the look is approved. The CSV is the checklist; never drop a SKU or invent a product.
- **Gate G — Integrate + measure.** Real viewport checks (320–1440, EN + AR RTL), reduced-motion, Save-Data, and measured LCP/INP/CLS. Never quote unmeasured scores.

## Hero activation (when FILM_01 passes QA)

1. Export per `docs/cinematic/VIDEO_EXPORT_COMMANDS.md`: silent H.264 MP4 16:9 24 fps (`assets/lareen/video/lareen-hero-8s-16x9.mp4`) + WebP poster from an approved frame (`assets/lareen/posters/lareen-hero.webp`).
2. Add the video layer to the existing hero copy block (adapt `docs/cinematic/website_integration_example/` — do NOT paste a second H1, do NOT replace the 10-slide slider, do NOT put video on product cards).
3. Keep the existing JPG as the poster fallback; video plays desktop-only, muted, loop, paused offscreen and when hidden, disabled under `prefers-reduced-motion` and Save-Data. Mobile stays on the poster until a measured test proves benefit.
4. Deploy only after the file exists and plays; never deploy a reference to a missing file.

## Cost note

Veo 3.1 pricing changes by model and entitlement (guide prices: Fast 20 credits, Quality 100 per generation — verify inside Flow before generating). Budget for rejected generations too.
