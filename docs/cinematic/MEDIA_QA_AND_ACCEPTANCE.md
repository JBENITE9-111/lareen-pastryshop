# LaReen Media + Website Quality-Control Checklist

## Artifact QA — every still
- [ ] Product matches exact slug and catalogue page; source images not swapped.
- [ ] Owner has approved illustrative visual accuracy against what customers can actually order.
- [ ] 4:5 portrait, sensible crop with no clipping, good thumbnail readability.
- [ ] All geometric proportions and toppings correct; no incorrect filling, added fruit or invented decorative packaging.
- [ ] Texture looks credible at 100% zoom; clear natural shadows, not fake CGI.
- [ ] Same key light direction camera-left; identical grade and studio surface.
- [ ] No generated logo, text, hands, fake owner, invented bakery interior.
- [ ] No misleading photo of physical premises; original real owner-approved shots used for storefront if shown.
- [ ] Alt text factually describes pictured product, not unverified claim.
- [ ] Editor saved prompt, source, model, reviewer and version information.

## Video QA — every 8-second generation
- [ ] Video is an actual exported MP4; file opens.
- [ ] First frame matches approved 16:9 still.
- [ ] At 0%, 25%, 50%, 75%, 100% product silhouette and count are stable.
- [ ] No morphing, melted phyllo, extra nuts, disappearing icing, fake drips.
- [ ] Physically plausible dolly/slide; no erratic zoom, orbital whip or speed ramp.
- [ ] Same ivory stone, cocoa background, key-light direction and color as other scenes.
- [ ] No text/logo/subtitles generated inside footage; overlay provided separately.
- [ ] Safe cropped margins for desktop and any independently composed portrait version.
- [ ] Any soundtrack is original/licensed, any voiceover has approved text and captions.
- [ ] Review accepted and labelled `QA approved`, not just `generated`.

## Exact continuity validation
- [ ] **Six-film sequence:** 6 scenes × 8 seconds, ordered 01→06, 48s video master.
- [ ] **Website hero:** trimmed scene 01, short and optimized; poster and no-motion fallback.
- [ ] **Ten linked product slides:** exactly the published products in `HERO_10_PRODUCT_SLIDES.json`, unchanged product pages.
- [ ] **78 catalogue stills:** exactly one master prompt per published image asset (78 unique SKUs).
- [ ] **Five optional category clips:** placed in matching category pages or used as restrained editorials only.
- [ ] No physical storefront generated from imagination and presented as real.

## Website QA
- [ ] With JS disabled all main text, product cards and CTA remain usable.
- [ ] With video missing/unavailable hero poster loads and `Explore sweets` is clickable.
- [ ] On reduced-motion operating-system setting all animation/video autoplay is off.
- [ ] On slow connections, Save-Data, slow CPUs and mobile: picture-first or poster-first rendering.
- [ ] No layout shift when poster switches to video.
- [ ] Hero text fully legible with contrast over every video frame.
- [ ] No 48s autoplay. Video longer than 8s is user-initiated with controls and captions/transcript.
- [ ] Audio muted by default on all autoplay contexts; the page never surprise-plays sound.
- [ ] English and Arabic RTL show proper order, arrows and text direction.
- [ ] 320/360/390/430px phones, 768px tablet, 1024/1440 desktops have no overflow, overlapping header or hidden CTA.
- [ ] Product, collection, search, bag, form and WhatsApp links function as before.
- [ ] All 78 product pages and 78 assets are present, links are not broken, image 404 count is zero.
- [ ] Price inquiry items not assigned fake prices; unavailable variants not purchasable with fake totals.
- [ ] Lazy-load below-fold media; load current slide only, no ten videos prefetching.
- [ ] Query-device video performance actually measured: Core Web Vitals goal LCP ≤2.5s / INP ≤200ms / CLS ≤0.1 at 75th percentile where reliable field data exist, not claimed based only on lab runs.
- [ ] Browser logs free of critical JS errors; mobile Safari and Chrome tested.
- [ ] Keep privacy, terms, allergens and owner-review gating correct.

## Final production sign-off matrix
`Idea` → `Reference approved` → `Still generated` → `Still QA passed` → `Video generated` → `Video QA passed` → `Owner approved` → `Optimized` → `Website integrated` → `Device tested` → `Published`.

No one may skip these states, and no status report may call an asset "live" merely because Flow created a preview or started a download.
