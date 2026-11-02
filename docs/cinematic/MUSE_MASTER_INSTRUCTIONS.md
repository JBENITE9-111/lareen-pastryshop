# ONE COPY/PASTE WORK ORDER FOR MUSE — LaReen Cinematic V3

> You are improving the existing, live LaReen Sweets website `https://lareen-pastryshop.vercel.app/`, not building a different website. Work with the attached complete package. Read `README_START_HERE.md` first and every other Markdown/JSON/CSV file before touching production. Project name: **LAREEN_MASTER_STUDIO_V1**. Date: 2 November 2026. Target: bespoke $10,000-class luxury web experience with photographic integrity, excellent mobile shopping and measurable performance. Price point is a project proposal, not a claim of actual valuation.

## 1. Preserve the already working app
Latest Muse thread `https://muse.ai/thread/2220bb36-1a06-4ebc-a372-fe2093538931` reports deployed and verified Add-to-bag on **all product pages, shop cards, search results and collection grids**, with quantity picker on product details. This is now fixed. **DO NOT list it as missing, undo it or add duplicate buttons.** Keep all 78 products, matching published pictures, product URLs and category membership. Keep the 10 linked hero slides, 12-item pagination, sorting/filter/search, WhatsApp order-bag summary, bilingual/RTL behavior, mobile touch targets and existing SEO. Check current live deployment before starting and preserve the ability to roll back.

## 2. Creative objective
A quiet, high-end editorial visual world. LaReen is a real Arabic/Egyptian sweets business in Al Barsha 1, not an invented French pâtisserie. Food textures must be exceptionally realistic, packaging and products must match real offerings, and studio art direction must stay identical through **every still and moving shot**. Do not create a fake actual interior, owner, chef or branch photo with AI. Do not fabricate heritage, awards, testimonials or prices.

## 3. Lock production bible and exact prompts
Read `VISUAL_BIBLE_AND_FLOW_WORKFLOW.md`. **Do not paraphrase the visual bible when generating.** For each photo, use the whole matching `STILLS_78_COPY_PASTE/STILL-{slug}.txt` and attach the exact source reference at the URL indicated in `PRODUCT_SHOT_MANIFEST_78.csv`. For each video, paste the entire corresponding `VIDEOS_EXACT_PROMPTS/*.txt`, attach the approved start still, and record output/quality status. All photos inherit the same light direction, material palette, lens logic, grading and product-accuracy rules. Maintain filenames exactly.

## 4. Generation order with stage gates
**A / Discovery:** Inventory already-present assets and QA them, saving a before state. Request actual product/brand photographs from bakery if available. Take consent for use and keep track of which examples are illustrative. Mark no unapproved assets as documentary.

**B / Hero still style-lock:** Generate only 3 pilot stills: `mixed-arabic-sweets`, `pistachio-baklawa`, `eid-box`, first. Create a side-by-side contact sheet and visual QA against the catalogue sources. Present to owner for visual approval. If anything looks synthetic, regenerate that **asset** rather than drifting the entire style.

**C / Six movie shots:** Generate the 6 × 8-second video shots from exact prompts in `VIDEOS_EXACT_PROMPTS/FILM_XX_*.txt`. The official Google Flow help supports Frames and Ingredients, but model support varies. Do not claim Quality Ingredients works unless the UI supports it. Inspect the video frames for morphology and product fidelity. Edit together according to `MASTER_BRAND_FILM_48_SECONDS.md`. No video may be called approved before a real downloadable exported file and frame QA exist.

**D / Homepage integration:** Build a lightweight, muted and truly cinematic 8-second `FILM_01` backdrop (optimized MP4 with WebP poster and static fallback) above or around the original homepage headline “A sweeter kind of tradition.” Keep existing CTAs. Hero video should not delay the text, CTA or product imagery. Desktop only when motion and connection suitable; mobile defaults to static poster until careful performance testing. Preserve existing 10-slide product showcase and links; do not autoplay ten videos.

**E / Product features:** Use `HERO_10_PRODUCT_SLIDES.json` and optional per-slide prompts as a second production stage if the first six clips meet QA. Enhanced video for the active hero slide is an option, not a requirement for the homepage first load. Preserve keyboard/swipe, RTL and reduced motion.

**F / Remaining 75 stills:** Use `PRODUCT_SHOT_MANIFEST_78.csv` as one-to-one checklist. There are 78 products. Do not lose any SKUs or introduce fake products. Check whole cake vs slice, malban vs walnut vs date fillings, sparkler vs birthday candles, pistachio vs cashew baklawa, plain vs mango vs lotus kunafa, packaged assortment counts.

**G / Technical + mobile QA:** Run actual viewport checks at 320, 360, 390, 430, 768, 1024, 1440 pixels, English and Arabic RTL. Test iPhone Safari + Android Chrome via real devices, simulator or reliably configured automation; if unavailable state limitation. Test taps, image/video load, navigation, sorting, pagination, bag persistence, WhatsApp message content, no horizontal overflow, hero poster fallback and reduced-motion setting. Create a documented list of measured performance metrics: LCP, INP, CLS and total page media transfer. Do not make up Lighthouse/PageSpeed results.

## 5. Cinema motion style to implement
- Opening text: subtle opacity/y translation on **text only** over ~450–650 ms, reduced motion gives static immediately. Never delay LCP image or keyboard CTA.
- Photo revealing: intersection-based once-per-section editorial fade+translate 12px, not blanket opacity zero with JS unavailable.
- Product interactions: 180–260 ms lift by ≤2px, subtle image zoom max 1.025 on devices with hover; **never** substitute hover for accessible button.
- Hero video: only if verified short actual file exists. Never autoplay with sound. Stop outside viewport and when document hidden. `prefers-reduced-motion` disables autoplay; `Save-Data` chooses poster.
- Story module: cinema film only behind deliberate Play button, properly captioned, transcript available. Do not bury navigation under an autoplay full-screen video.
- One horizontal category rail remains; give tactile arrow buttons and maintain swipe. No scroll hijacking or full-page snap effects.

## 6. Design system
Warm ivory `#F7F3EC`, espresso `#2B211C`, pistachio `#758069`, rose `#CBA99A`, brass `#B99B70`. Existing English Cormorant Garamond, DM Sans, Arabic IBM Plex Sans Arabic or approved Arabic title serif. Avoid too many gradients, false 24-karat gold effects or fake luxury jargon. Negative space is intentional, not empty. Main 16:9 hero composition must leave ample clean space for HTML headline on the left (RTL art direction can be independently re-composed if needed). Ensure WCAG contrast. Product stills preferably 4:5 with natural subject occupying 72–82% of shot.

## 7. Checkout and business truth
Keep **WhatsApp-first** bag request. No online payments or confirmed orders are claimed. Missing/uncertain prices stay “Price on request”, with no fake totals. Product variation/availability final with bakery. Confirm the number `+971 56 322 0110` with owner before client release. No fake selling claims or timing guarantees. The actual source assets are illustrations, and display copy must continue to reflect that.

## 8. Implementation approach
The live Vercel project has existing HTML, shared CSS and JavaScript; don't force-migrate to React/Lovable for the sake of animation. Use supplied portable DOM implementation example if applicable. If moving into Lovable later, import the **finished approved video/image assets** into the repository and implement equivalent React components rather than trying to import Muse runtime behavior. Changes should be incremental and reversible; record touched files and release ID.

## 9. Proof and report required
Return a table with columns `Asset / Source reference / Flow model / Prompt filename / Export filename / Size / Frame QA / Client review / Website route / Pass-Fail`. Attach **actual output** links or file paths only for assets that exist. Provide before-and-after screenshot pairs, a short mobile screen recording if possible, live route list, measured Core Web Vitals and the Vercel deployment ID. Explicitly call out features unable to test. Distinguish `ready`, `generated`, `QA passed`, `approved`, and `published`.

## 10. Definition of done
Site works **with no video assets loaded**; if videos are added they preserve all commerce flows, product fidelity, accessibility and fast load. No invented storefront; no decorative hallucinations. All 78 products remain matched to exact names and routes, and every generated artifact is traced to an approved still and a full copy/paste prompt. If Flow outputs are unavailable, complete the instructions and generation checklist, but do not claim to have made the media.
