# Visual Bible and Google Flow Workflow — LAReen Studio Set 01

## The promise
A coherent **premium, modern Dubai Arabic/Egyptian sweets** visual campaign, accessible and elegant, not imitation of a French luxury brand. **Realism beats spectacle.** AI-generated product imagery must not imply specific products, premises or packaging unavailable at the actual bakery. Images are creative concepts until bakery owner reviews.

## Brand-lock token dictionary
| Token | Exact value | Where to use |
|---|---|---|
| STUDIO_NAME | `LAREEN_MASTER_STUDIO_V1` | All prompts, Google Flow project, exported media metadata |
| SURFACE | Warm matte ivory limestone `#F7F3EC` | Every frame, with believable pores |
| BACKDROP | Warm ivory-to-cocoa studio gradient `#2B211C` | One fixed backdrop, not a changing colour each shot |
| KEY LIGHT | Large diffused light camera-left 45°, ~4800K | All 78 products and 21 moving shots |
| FILL | White bounce card camera-right, -1.5 stops equivalent | Natural shadow detail |
| ACCENT A | Muted pistachio `#758069` | One folded linen only where appropriate |
| ACCENT B | Dusty rose `#CBA99A` | Used sparingly, not a neon tint |
| ACCENT C | Champagne brass `#B99B70` | Small tray rim only if style/reference warrants |
| OPTICS | 100/105mm macro for textures; 50mm for table; 70–90mm for cakes | Avoid wide distortion of desserts |
| GRADE | Warm-neutral, subtle film contrast, natural saturation | Same white balance and highlight treatment |
| FRAME RATE LOOK | 24 fps, physically plausible 1/48–1/50 shutter-like motion | Realistic cadence; don't add exaggerated speed ramps |
| TYPE | Existing real Lareen mark as **HTML or vector overlay** | NEVER ask AI to generate the logo |
| OUTPUT | Still 4:5 + optional designed 16:9; video 16:9, 8 sec | 9:16 as a separately designed derivative when needed |

## Photography lenses applied correctly
**100–105mm macro:** main pastry texture. Shoot f/5.6–f/8 equivalent; avoid shallow f/1.4 simulation that hides most of the pastry. Preserve filigree, kataifi strands and cake layers. Preferred for baklava, kunafa, basbousa, mousse and plated slices.

**50mm prime:** credible tabletop assortments, gift boxes, kahk and biscuit spreads; f/5.6–f/8. On real APS-C, 35mm provides a broadly similar field of view, but these are descriptive AI optical cues rather than camera-body commitments.

**24–70mm f/2.8:** reserve for an *actual client-approved branch photograph or filmed space*; do not synthesize an invented premium storefront. For product closes avoid 24mm distortion.

**85/90mm shift-style perspective:** optional for a planar full-row assortment when a long tray must remain sharply legible; not needed in the main run.

**Focal length instructions in AI prompts are visual directives, not proof the final asset came from that physical lens.**

## Source references / continuity chain
1. Existing product SKU, route and `/images/{slug}.jpg` source exist in the site. Treat that as the visual starting reference, **not independent proof of real product shape**.
2. Obtain any available real bakery image from owner; use this to correct first-generation AI errors.
3. Generate one high-quality still (`STILL_{slug}_APPROVED_V1`) as the locked source.
4. Make an **actual new 16:9 composition** `STILL_{slug}_FILM_START_V1` using that exact product; do not crop off essential pastries.
5. In Flow, use this approved still as **Start frame**; if a strict loop is needed, provide a separately designed **End frame with identical objects and near-identical composition**, not a randomly generated new shot.
6. For Ingredient mode, use up to three concept references as available: Product (approved), Studio (clean background), Palette/props (no unrelated food). Avoid conflicting textual references.
7. Export candidate clip. QA frame 0, 25%, 50%, 75%, 100% and inspect objects, frosting, layers, tray geometry and background; reject deformation.
8. Use the approved video as source for editorial master; never re-generate a reference based on a flawed video frame.

## Step-by-step Flow operation
1. Open https://labs.google/fx/tools/flow and create one project **`LAREEN_MASTER_STUDIO_V1`**.
2. Upload each original product image, each approved still, the simple empty studio reference, and an approved palette board. Use descriptive filenames matching the CSV.
3. For image generation, select currently available Nano Banana image mode, paste the whole matching `STILLS_78_COPY_PASTE/STILL-{slug}.txt`, and attach the existing catalogue image (or actual client photo if available). Make 2 candidates, select 1 after strict QA.
4. For video generation, select `Video` → `Frames` → `Start frame`; attach the approved still; paste the matching `FILM_XX_...txt` prompt. Choose 16:9, 8 seconds and a model supporting the desired frame workflow.
5. If multiple Ingredients references are needed instead of a strict start-frame, select `Video` → `Ingredients` and a model that **currently supports Ingredients** (the official list shows Veo 3.1 Fast, but not Quality for this mode). Check menu before credits are spent.
6. Choose a single output first; avoid parallel ambiguous variations. Compare the first output to the visual bible and original image; regenerate only the failing clip.
7. Download approved footage with exact manifest names. Record model, settings, source, reviewer, QA notes, date, and duration in the manifest.
8. Use Flow Scenebuilder or an editor to order `FILM_01` to `FILM_06`; hard cuts or short 150–250ms dissolves may be used only if continuity holds. Do not invent a seamless 48-second single-shot transition.
9. Produce a silent website hero cut from `FILM_01` and a separate editorial 48s master. Do not place text or a logo in Flow footage: add those in website CSS or compositing software.
10. Export MP4 H.264, 16:9, 24fps; preserve approved still/webp posters. Use 9:16 outputs for Stories or mobile marketing, but don't force an over-cropped desktop film into portrait.

## Model choice guide
- **Need strict match to an approved start frame:** use Frames-to-Video in a supported model; try Quality for final hero when available.
- **Need consistent product + studio + prop references:** use Ingredients-to-Video where supported, e.g. Veo 3.1 Fast; verify current model capabilities.
- **Need iteration / editing:** use the Flow scene editor and tools that are actually available; do not assume every model supports every form of editing.
- **Duration:** current official Veo 3.1 options often offer 4s, 6s and 8s. This package uses six separately generated 8s scenes, not a one-shot 48s request.
- **Credit planning:** cost changes by model and entitlement. Google currently lists Veo 3.1 Fast at 20 credits/generation for non-Ultra, Quality 100; **verify Flow's displayed price before generating**. Budget for rejected generations too.

## Shoot blocking principles
- No cross-scene camera direction changes: keep light from left in every shot.
- One action per shot: slow dolly OR slow lateral slide; never simultaneous orbit, rack focus, pouring glaze and rotating plate.
- Hero asset must leave negative space on left in English; handle Arabic layout with CSS or create a mirrored *camera-safe crop* (never mirror readable real-world elements or packaging).
- No floating nuts, pouring syrup, exaggerated steam, fake chefs or fake brand signage.
- Product silhouettes must remain identical to the approved reference. Manual review is required, especially for filled kahk, chocolate-glaze borders and tiny pastries.
- Accessories (candles, poppers) are pictured as real accessories: no fake ignited flames; don't imply included in cakes unless specifically selected.
- Avoid trademark logos on imitated wrapped products. Named flavour variants must follow the actual menu; images should not create fake branded packaging.

## Rejection conditions
Reject immediately when: object count changes across frames; cake switches from whole to slice; phyllo or pistachio becomes melty or furry; syrup pours without a plausible cause; the box material turns to gold; trays float; AI creates wrong text or fake logos; appearance significantly departs from approved source; video starts with a warped object; motion is too fast; focus makes the intended texture unreadable; products look generically 3D rendered; a generated shop photo masquerades as real premises.

## Commercial truth
Until the owner confirms that the generation matches the product as sold, use honest copy such as **“Images are illustrative; presentation may vary.”** Do not add fake customer reviews, fictional pastry-making process footage, fictional store interior or invented brand history. Keep explicit owner sign-off as a launch gate.

## Verified help links
- Google Flow create and reference guide: https://support.google.com/flow/answer/16353334
- Model features: https://support.google.com/flow/answer/16352836
- Scene editing and builder: https://support.google.com/flow/answer/16935718
- Credit costs: https://support.google.com/flow/answer/16526234
