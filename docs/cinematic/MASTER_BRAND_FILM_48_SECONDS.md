# 48-Second LaReen Cinematic Film — Exact Assembly
**Project:** LAREEN_MASTER_STUDIO_V1  
**Deliverable:** `assets/lareen/video/lareen-brand-film-48s-16x9.mp4`  
**Purpose:** click-to-play **Our Story** brand film / optional marketing showcase. **Never autoload the full 48 seconds on homepage.**

## The 6 x 8s shot map
| Master timeline | File | Product | Camera | Shot |
|---|---|---|---|---|
| 00:00–00:08 | `FILM_01_hero-mixed-arabic-sweets` | Mixed Arabic Sweets | 100mm macro | Quiet opening; gentle push in; soft light from left |
| 00:08–00:16 | `FILM_02_film-layers-pistachio` | Pistachio Baklawa | 105mm macro | Layer detail; tiny lateral track |
| 00:16–00:24 | `FILM_03_film-mango-kunafa` | Mango Kunafa | 100mm macro | Controlled arc; golden kataifi + natural mango |
| 00:24–00:32 | `FILM_04_film-chocolate-cake` | Special Chocolate Cake | 90mm | Whole cake glaze; slight dolly |
| 00:32–00:40 | `FILM_05_film-eid-gifting` | Eid Box | 50mm | Authentic assortment; full composition |
| 00:40–00:48 | `FILM_06_film-final-gifting` | Mixed Baklawa Box | 50mm | Widen into full frame; held end for brand CTA |

**Precise filenames and their exact Flow prompts are in** `VIDEO_SHOT_MANIFEST.json` and `VIDEOS_EXACT_PROMPTS/FILM_XX_*.txt` (the manifest controls any discrepancy in this editorial overview).

## On-screen typography (always edit in post, NEVER generate through AI)
- 00:00–00:07: `A sweeter kind of tradition.` — fade up at 0.4 sec; retain 60% clean visual area.
- 00:08–00:15: `Every layer, a little more to love.`
- 00:16–00:23: `Golden favourites. Carefully celebrated.`
- 00:24–00:31: `For life's sweetest moments.`
- 00:32–00:39: `Made for sharing.`
- 00:40–00:48: `LAREEN SWEETS` / `Al Barsha 1, Dubai` / `Explore sweets` button added by website compositor, link to `/shop`.

**Tone:** warm, modern, restrained and believable. Avoid historical claims, claims of handmade production, or claims of freshness unless confirmed by the owner. Descriptive editorial language does not certify production method.

## Optional English voiceover for the click-to-play film (not for auto-playing home background)
Use a professional neutral-warm narrator, measured at about 115–125 words/minute, no fake voice of an actual employee. Test spoken duration and re-time if needed; don't cut off words. Use **one** consistent voice or no narration at all.

- **00:00–00:08:** “There are moments made sweeter by simply being together.”
- **00:08–00:16:** “A delicate layer, a familiar flavour, a favourite shared.”
- **00:16–00:24:** “From golden kunafa to pastries worth lingering over.”
- **00:24–00:32:** “For birthdays, celebrations, and the little joys between.”
- **00:32–00:40:** “A thoughtful selection can make a gathering feel special.”
- **00:40–00:48:** “Discover LaReen Sweets in Al Barsha One, Dubai.”

These words describe the experience, not unconfirmed food-making techniques. Add Arabic voiceover **only after a native Arabic copy and pronunciation review**, with separately approved script and timing.

## Sound design
- Home hero video: **silent, muted, `playsinline`; no speaker icon needed**.
- The 48s optional brand film: low, licensed or original instrumental soundtrack, roughly -23 LUFS integrated as an initial mix starting point, adjusted so voice is clearly intelligible; the best setting depends on actual recording. No invented food ASMR. Do not use copyrighted background music without licence or permission.
- If narration is included, supply clear captions `.vtt`; provide mute/volume and play/pause controls, and a transcript link.
- Music is not essential for perceived quality. If licensing unclear, deliver a clean silent version.

## Edit constraints
- Avoid speed-ramped transitions or swirling VFX. Straight cuts at 00:08, 00:16, 00:24, 00:32, 00:40 work because the set and camera language match.
- If using a dissolve, ≤250ms, and avoid overlaying chocolate over pale dessert in a confusing way.
- Never generate text or actual LaReen logo inside an AI video. Overlay proper owner-approved vector logo in editing/website.
- Do not mask continuity faults with quick fades; fix/regenerate the flawed shot.
- The homepage uses `FILM_01` as its own optimized, loop-tested file; keep the ten linked slider products intact below or beside the hero.

## Deliverables
- One 48s landscape editorial MP4 H.264, silent; second soundtracked version only if source audio rights are cleared.
- One website hero short MP4 (8s, ≤3 MB aspirational; if impossible, prioritize quality and lazy playback), 1 WebP poster and static fallback.
- Optional `lareen-brand-film-48s-en.vtt`, transcript and captioned export.
- A contact sheet of six START stills plus six video midpoint frames and six end frames for reviewer approval.
- If client requests 9:16 for social, re-render deliberate 9:16 framing per scene (don't stretch or slice off the subject).
