# LaReen Sweets — Cinematic Production Pack V3
**Prepared:** 2 November 2026 · **Target:** Muse + Google Flow, portable to Lovable · **Current production website:** https://lareen-pastryshop.vercel.app/

## Scope and factual baseline
- Inspected Muse thread `https://muse.ai/thread/2220bb36-1a06-4ebc-a372-fe2093538931` via the connected browser. The most recent Muse message reports Add-to-bag on product, shop, search and collection views was deployed and tested. Do **not** undo this fix.
- Inspected Vercel deployment `dpl_4g6aDfKHpJZFeuoYqBuHPYMD2MwT` (latest during audit). Source tree: **109 HTML files, 78 product JPG assets, 78 product pages, 4 JS files and 1 compiled CSS file**. No newly generated cinematic videos are claimed here.
- The site already has 10 linked featured-product slides, 12-per-page pagination, an existing bag/WhatsApp checkout inquiry, bilingual handling, metadata and SEO basics. Retain these.
- Product photographs are AI-generated editorial representations. These must **not** be presented as documentary photographs of the actual bakery or precisely guaranteed items. Owner approval of every depicted product remains necessary.
- Client details still requiring verification before launch: product composition, final prices and portions, packaging, order/WhatsApp operating number, store hours, any historical claim, Arabic proofreading, delivery fulfilment, allergen statements and model/copyright rights.

## What is included
1. `MUSE_MASTER_INSTRUCTIONS.md`: one comprehensive copy/paste work order, phase gates and non-negotiable preservation rules.
2. `VISUAL_BIBLE_AND_FLOW_WORKFLOW.md`: lighting, palette, lens choices, studio references, model-selection guidance, source continuity, and Google Flow operation steps.
3. `MASTER_BRAND_FILM_48_SECONDS.md`: timecoded English optional script, shot assembly, visual continuity and accessibility approach.
4. `VIDEOS_EXACT_PROMPTS/`: **21 individually written copy/paste text prompts**: 6 brand-film scenes, 10 product hero motion clips, 5 category cinema clips.
5. `STILLS_78_COPY_PASTE/`: **78 full copy/paste product image prompts**, each identifying the exact product filename and product texture/geometry.
6. `PRODUCT_SHOT_MANIFEST_78.csv` + `.json`: audit map for product page, published reference URL, deliverables and review statuses.
7. `HERO_10_PRODUCT_SLIDES.json` / `VIDEO_SHOT_MANIFEST.json`: ordered media plan linked to existing live product URLs.
8. `MEDIA_QA_AND_ACCEPTANCE.md`: checklist covering consistency, product facts, perceived luxury, technical performance, iPhone, RTL, and export.
9. `website_integration_example/`: neutral HTML/CSS/JS example for lazy muted web hero video **without** rewriting the existing production framework.
10. `VIDEO_EXPORT_COMMANDS.md`: ffmpeg reference to prepare compact web files and poster frames after media exists.

## Important: generate assets in this order
**Gate A:** Request owner-approved reference photographs or confirm that the existing AI catalogue images are approved illustrative starting references. Choose and lock one studio look from `VISUAL_BIBLE_AND_FLOW_WORKFLOW.md`.

**Gate B:** Generate and manually QA only three KEY stills first: `mixed-arabic-sweets`, `pistachio-baklawa`, `eid-box`. Confirm a human reviewing them sees one coherent commercial campaign.

**Gate C:** Generate 6 × 8-second brand-film shots using approved stills as start frames; test shape stability. If using Veo 3.1 Quality, use Frames to Video (not Ingredients mode where unsupported). If needing Ingredients/References, use a model currently supporting it (for example Veo 3.1 Fast) and verify the options inside Flow.

**Gate D:** Assemble the 48-second editorial film from six **independently generated** 8-second clips. Put on **Our Story** or a click-to-play brand-film overlay. The homepage uses only the first optimized short clip as a muted, lightweight, optional hero background—not the entire 48s film.

**Gate E:** The ten existing featured-product cards remain accessible image-first links. Optional video loops may be generated for each card, but **never autoplay all ten**. Display only active slide's video after interaction on appropriate desktop hardware; mobile defaults to static art unless a measured test shows benefit.

**Gate F:** Once the visual language is approved, re-art-direct the remaining 75 product stills. The CSV is the source-of-truth checklist. Replacing every existing product picture on day one is NOT mandatory.

**Gate G:** Integrate progressively into the live site, test key routes, perform mobile QA and provide evidence of actual results. Do not report a quality score without measuring it. Do not imply the films already exist.

## How Muse should use the package
Upload this entire ZIP. Read `MUSE_MASTER_INSTRUCTIONS.md` first. Use exact `STILLS_78_COPY_PASTE/STILL-<slug>.txt` as still instructions and exact `VIDEOS_EXACT_PROMPTS/*.txt` for videos. When the user's Flow account is connected and actions are authorized, produce media inside one named project `LAREEN_MASTER_STUDIO_V1`. If Flow is unavailable, provide user-ready prompts and generated-file checklist, not fake success reports.

## How Lovable should use the package
If Lovable is building the same site, import finished, **QA-approved exported files** into its actual public asset directory, then apply `MUSE_MASTER_INSTRUCTIONS.md` and the portable integration code. Do not assume Lovable itself can generate Flow videos or access Muse's local files. The current live project is on Vercel; changing frameworks would add risk without improving cinematography.

## Google primary references
- Create video clips, frames and ingredients: https://support.google.com/flow/answer/16353334
- Supported video features: https://support.google.com/flow/answer/16352836
- Build scene and edit clips: https://support.google.com/flow/answer/16935718
- Current credit costs (check inside account): https://support.google.com/flow/answer/16526234
- Web autoplay basics: https://web.dev/articles/video-basics

## Additional practical tools
- `COPY_THIS_TO_MUSE.txt`: the shortest possible exact kickoff message.
- `validate_assets.py`: checks for actual exported still/movie files and ffprobe metadata. Does **not** pretend to replace visual QC.
- `QA_FRAME_EXTRACTION.sh`: extracts frames at 0/2/4/6/7.8 seconds for manual morphological review.
