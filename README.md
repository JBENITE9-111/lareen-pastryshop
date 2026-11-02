# LaReen Sweets — Al Barsha 1

Bilingual (English / Arabic) static website for **LaReen Sweets, Al Barsha 1, Dubai** — a pastry shop
storefront with WhatsApp-first ordering. No online payment, no claimed checkout, no backend.

- **Live site:** https://lareen-pastryshop.vercel.app
- **Vercel project:** `lareen-pastryshop` (`prj_8jMWYCSvmNwDM3KAl7lUVAn6i474`)
- **This repo:** the exact static tree that is deployed, plus documentation. There is no build step:
  what is in this tree is what the visitor gets.

## 1. The shop

| Fact | Value |
|---|---|
| Branch | Al Barsha 1 only — Ground Floor, Shop 2, Lahej and Sultan Residential Complex, Al Barsha 1, Dubai |
| Phone | +971 4 222 0110 |
| WhatsApp (primary ordering channel) | 056 322 0110 → https://wa.me/971563220110 |
| Map | https://maps.app.goo.gl/8cxWFTwHhriqay75A |
| Instagram | https://www.instagram.com/lareensweets/ |
| Hours | **Unconfirmed by the owner — never publish exact hours.** The site says "contact the bakery to confirm today's hours". |

Ordering channels, in the order the site presents them: **WhatsApp bag** (primary) · **Talabat**
Al Barsha listing · **Noon Food** outlet · **Zomato** listing (view-only at last check) · call · visit.
The bakery confirms availability, final price and fulfilment for every order; the site takes no
payment and promises no delivery time.

- Talabat: https://www.talabat.com/uae/restaurant/30605/lareen-sweets-al-barsha-1?aid=1230
- Noon Food: https://food.noon.com/uae-en/outlet/LRNSWTLH8J/
- Zomato: https://www.zomato.com/dubai/lareen-sweets-al-barsha

## 2. What the site contains

| Area | Count | Notes |
|---|---|---|
| Products | 78 | `products/<slug>.html`, one page per product |
| Collections | 8 | arabic-sweets, baklava, cake-slices, cakes, dates-biscuits, gifts-celebrations, kahk-petitfour, kunafa-basbousa |
| Occasions | 4 | birthdays, corporate-gifts, eid, weddings |
| Root pages | 19 | home, shop, search, bag, custom-cakes, catering-events, order, visit-al-barsha, our-story, contact, faq, privacy, terms, allergens, admin, roles, brand-studio, occasions, 404 |
| Site pages total | 109 | Sitemap lists 104 public pages (utility pages excluded) |
| HTML files in this repo | 110 | The 110th is the V3 integration example under `docs/cinematic/`, not a route |

Every product page carries the note: *"For ingredient and allergen information, please contact
the bakery before ordering."* Catalogue pictures are labelled illustrative wherever they appear:
*"Images are illustrative. Presentation may vary."*

## 3. How it works (architecture)

Plain static HTML, CSS and JavaScript. No framework, no server code, no build step, no
environment variables consumed by pages. `vercel.json` sets clean URLs without trailing slashes.

| File | Role |
|---|---|
| `index.html`, `shop.html`, `search.html`, `bag.html`, … | Pages (see §2) |
| `products.js` | The whole catalogue as `window.LAREEN_PRODUCTS` (see §4) |
| `lareen.js` | All interactivity: shop/collection/search rendering, bag, hero slider, pager, language, inquiry builders |
| `_next/static/css/c446f0a724b5c3c8.css` | Compiled stylesheet (design tokens in §7) |
| `images/` | 78 catalogue pictures (see §6) |
| `vercel.json`, `robots.txt`, `sitemap.xml` | Clean URLs, crawler rules, 104 public pages |
| `docs/` | Content rules, deployment, cinematic runbook, image manifest |
| `docs/cinematic/` | The complete V3 cinematic production package, verbatim |
| `tools/` | `fetch-assets.sh` — reconstructs `images/` from the live deployment (see §6) |

### Shop, search, collections

- **Shop** renders from `products.js` with sort (Featured / Price low–high / Price high–low /
  Name A–Z), category filter and search. Sorting reorders the actual page elements, not just an
  internal list.
- **Search** matches names, categories and aliases, with synonyms: `konafa` / `knafeh` →
  `kunafa`, `ghoriba` → `ghorayeba`.
- **Pagination is 12 products per page** on shop, search, collections and occasions. Small
  collections (12 or fewer) show a single page with no pager. The pager scrolls back to the top
  of the grid, below the sticky header. Homepage grids are not paginated.
- **Language** is an EN/AR toggle that sets `dir` and `lang` on the document, including
  right-to-left mirrors for the hero caption, slider and rail arrows, gift CTA and story images.
  Arabic names are machine-assisted and pending native review.

### The bag (WhatsApp-first ordering)

- The bag lives in the browser (`localStorage`) and survives page visits. The header badge and
  an aria-live announcement update on every add.
- **Add-to-bag buttons: 555 across the site** — shop 78, search 78, collections 111, product-page
  related cards 288. Cards use the pattern `<article class="card"><a …>…</a><button
  data-add-to-bag>`, so the button is never nested inside the link.
- Product pages also carry a quantity + Add to bag + Ask-on-WhatsApp panel.
- Tapping the bag's send action builds a **prefilled WhatsApp order request** to
  `wa.me/971563220110`. The message never presents a false total: enquiry-priced items are
  listed as enquiries, not priced.
- The same builder pattern powers the **custom-cakes, catering-events and contact** inquiry
  forms: structured fields (name/phone required), a WhatsApp message, and a receipt reference
  dated in Asia/Dubai time. Nothing is submitted to a server; nothing is stored in localStorage
  as a form record.

### Hero showcase (home)

10 slides, each linked to its real product page, manual arrows/dots/swipe only (autoplay OFF):

1. Mixed Arabic Sweets — AED 70 · 2. Eid Box — AED 86 · 3. Special Chocolate Cake — AED 135 ·
2. Tiramisu Full Cake — AED 110 · 5. Mixed Baklawa Box — AED 93 · 6. Pistachio Baklawa ·
3. Mango Kunafa · 8. Lotus Cheesecake · 9. Red Velvet Cake · 10. Circle Chocolate Gift Tray
   (slides 6–10 are enquiry-priced). Phones show a `01 / 10` counter; desktop shows dots.

### Buttons on every card

Each product card carries three minimal pill icon buttons: **Delivery** (truck → Talabat) ·
**Call the bakery** (phone icon → `tel:`, number not shown in the button text) · **Directions**
(map-pin → Google Maps link). The footer still shows the phone number as contact information.

## 4. Catalogue data (`products.js`)

One array, one object per product. Prices are stored in **minor units** (fils): `8600` = AED 86.

| Field | Meaning |
|---|---|
| `id` | `LAR-FIX-###` (fixed-price) or `LAR-ENQ-###` (enquiry-only) |
| `slug` | URL slug, also the product page filename and the image filename |
| `name_en`, `name_ar` | Display names (Arabic pending native review) |
| `category`, `category_ar` | Collection grouping |
| `unit` | e.g. `1 kg`, `1 kg assorted box` |
| `price_status` | `approved_fixed` or `enquiry` — the only two states |
| `price_aed_minor` | Fixed amount in fils; absent for enquiry products |
| `source` | Price provenance, e.g. `Talabat Al Barsha, blueprint 2026-11-02` |
| `featured` | Drives homepage/featured placement |
| `aliases` | Extra search terms |
| `description_en`, `description_ar` | Short descriptions |

### Price truth (non-negotiable)

- **34 products** carry approved fixed Talabat Al Barsha amounts. These are delivery-menu
  amounts, not guaranteed till prices.
- **44 products** are enquiry-only and display exactly **"Enquire for price"** — never zero,
  never invented, never rounded into.
- Never mix another branch's prices or details. Branch scope is Al Barsha 1, always.

Full rules: [`docs/CONTENT_RULES.md`](docs/CONTENT_RULES.md).

## 5. Honesty rules (what this site never claims)

- No invented ingredients, allergens, availability, discounts, ratings, testimonials, awards
  or heritage dates. "Since 1994" is brand heritage, not this branch's opening year, and is
  never used as a prominent claim.
- Pictures are **Flow-generated illustrations**, not real bakery photographs, and are labelled
  as such. They are the starting references for the V3 cinematic package (§8), not documentary
  photos.
- No fake checkout: the bag produces a WhatsApp order request only. Availability, final price
  and fulfilment are confirmed by the bakery.
- No exact opening hours (unconfirmed). No sales data: the homepage section is "Featured
  sweets", not "Bestsellers".

## 6. Images

- **78 JPGs** in `images/`, one per product, each ≤ 75,000 bytes (≈ 4.7 MB total), generated in
  Google Flow (project `lareem`). Every image is unique to its product.
- Because this repo is pushed as a **text snapshot** (binary files cannot go through that
  route), `images/` is not stored in the snapshot commit. Two ways to get it:
  1. `sh tools/fetch-assets.sh` — re-downloads all 78 from the live deployment and verifies
     each file's byte size and SHA-1 against `docs/IMAGES_MANIFEST.json`.
  2. The image files uploaded directly to `images/` in the repo (same bytes, same manifest).
- `docs/IMAGES_MANIFEST.json` is the authority: 78 entries of slug, file, bytes and SHA-1.

## 7. Design system

- **Palette:** ivory `#F7F3EC`, cocoa `#2B211C`, champagne `#B99B70`. Type: DM Sans.
  Cards are 4:5. Pistachio `#758069` and rose `#CBA99A` are studio imagery accents only,
  not site tokens.
- **Motion (V2 luxury motion + V3 §5):** text-only reveal, 520 ms / 12 px translate; card
  image zoom ≤ 1.025 with a ≤ 2 px lift in 180–260 ms; section reveals are JS-gated but content
  stays visible without JS and under `prefers-reduced-motion` (static, no animation). The hero
  image is never delayed by the text reveal.
- **SEO:** unique title, description, canonical and Open Graph tags per route; BreadcrumbList
  JSON-LD on all 78 product + 8 collection + 4 occasion pages; lazy loading on 629 images
  (product main images and the first hero slide stay eager; the first hero slide carries
  `fetchpriority="high"`).

## 8. Cinematic work (V3) — status

The V3 package is prompts, manifests and workflow — **not generated media**. Nothing here
claims a film exists. Full runbook: [`docs/CINEMATIC_V3_RUNBOOK.md`](docs/CINEMATIC_V3_RUNBOOK.md);
source package verbatim in `docs/cinematic/`.

| Item | State (2026-11-02) |
|---|---|
| Existing catalogue stills (JPG) | 78/78 present — V3's *existing references*, not deliverables |
| V3 still deliverables (WebP, 4:5) | 0/78 — NOT GENERATED, pending Gate B + owner approval |
| Brand-film clips (6 × 8 s, 16:9) | 0/6 — NOT GENERATED |
| Hero product clips (10) | 0/10 — gated on film QA passing |
| Category clips (5) | 0/5 |
| Hero poster (WebP) | Absent — needs an approved still or video frame |
| Flow project `LAREEN_MASTER_STUDIO_V1` | Not created — see Gate A |

Gates, in order, never skipped: **A** inventory + owner references → **B** 3 pilot stills
(`mixed-arabic-sweets`, `pistachio-baklawa`, `eid-box`) with owner approval of the look →
**C** 6 film shots (approved stills as start frames, frame-QA at 0/25/50/75/100%) → **D** 48 s
film assembly (Our Story / click-to-play only — never autoplay, never the homepage background;
the homepage takes only the first optimized 8 s clip after QA) → **E** hero slide videos
(optional, desktop only) → **F** remaining 75 stills → **G** integrate + measured QA
(320–1440 px viewports, EN + AR RTL, reduced-motion, Save-Data; never quote unmeasured scores).
Veo 3.1 guide prices (verify inside Flow before generating): Fast 20 credits, Quality 100 per
generation — budget for rejected generations too. No video was generated and no Flow credits
were spent in the run that produced this repo.

## 9. Deployment

Current method is the **Vercel file-upload flow** (this repo is not yet wired for automatic git
deploys; connecting it is a deliberate step — see `docs/DEPLOYMENT.md`):

1. Edit the files in this tree.
2. Upload changed files to Vercel (each file content-addressed by SHA-1; unchanged files
   are skipped).
3. Create a production deployment from the uploaded files.
4. Verify the served bytes (status, size, markers) before reporting it live.

**Rollback:** redeploy the previous production deployment from the Vercel dashboard (or
recreate it from the same file set). Recent production deployments, newest first:

- `dpl_47vAqar14SKSpMYfHmE89YhknxxD` — V3 motion spec, reveal 12 px (current, 2026-11-02)
- `dpl_4g6aDfKHpJZFeuoYqBuHPYMD2MwT` — bag buttons on all cards, 555 buttons (2026-11-02)
- `dpl_CaAKb8dSzbukHXiUFxQTkkCh8yPL` — V2 luxury motion + icon buttons (2026-11-02)
- `dpl_B5z4HbPYtq157KkFcnczXUEKCRZQ` — category rail (2026-11-02)
- `dpl_23xCCEBHjs48d6cPFaiVw92bsLZP` — sort reorders the DOM (2026-11-02)
- `dpl_5GBX8CRYrGcgt2j743SxfhftpnBH` — luxury blueprint end-to-end (2026-11-02)
- `dpl_DS4VPCXyBwcGGdavPgjcTpVyxYeH` — pagination at 12 per page (2026-11-02)

Full procedure: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## 10. Build history (2026-11-02, newest first)

- **V3 motion spec:** reveal distance 14 px → 12 px in the compiled stylesheet (the only file
  changed); the site already complied with the rest of V3 §5.
- **Bag buttons everywhere:** 555 Add-to-bag buttons (shop 78, search 78, collections 111,
  product-page related cards 288); product-page quantity + Add to bag + Ask-on-WhatsApp panel
  restored (its script had anchored on a renamed button label; it now matches the Talabat link
  by href, which survives language switches).
- **V2 luxury motion + final polish:** hero text stagger reveal, restrained section reveals,
  card zoom/lift, phone-only slider counter, RTL-aware slider keys, bag-add announcements,
  story section with two crops, gifting feature + Explore Gift Boxes CTA, imagery on occasion
  cards, "Bestsellers" renamed "Featured sweets", BreadcrumbList JSON-LD, lazy loading,
  double-escaped titles fixed (19 files), stale copy fixed (FAQ hours/order answers, terms,
  order intro, 404 head, stray hero hours line).
- **Icon buttons:** the product/info button trio became minimal pill icon buttons site-wide
  (Delivery / Call / Directions); the footer phone link still shows the number.
- **Luxury blueprint:** WhatsApp-first header CTA + mobile bar, full WhatsApp bag with `/bag`
  review page, WhatsApp inquiry builders replacing all localStorage forms, demo admin/brand
  dashboards removed → Owner-access gate + noindex, newsletter removed, dev notes and
  unapproved hours stripped from customer copy.
- **Category rail:** homepage "Shop by category" as one horizontal scroll-snap rail
  (250 px desktop / 220 px phone cards, arrows, swipe, peek).
- **Sort fix:** the sorted list now also reorders the DOM (verified sequence
  5, 7, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14).
- **Pagination:** 12 products per page everywhere (corrected from 10 the same day).
- **Catalogue pictures:** 78/78 Flow-generated visuals live, each labelled illustrative, zero
  placeholder tiles remaining.

## 11. Backend (none connected)

No backend is connected. A Supabase project was evaluated and set aside by the owner
(2026-11-02); nothing in this repo reads Supabase. The `admin.html` / `roles.html` /
`brand-studio.html` pages are an Owner-access gate placeholder, not authenticated access.
Real Supabase Auth + Row Level Security must land before anything is presented as an owner CMS.

## 12. Open items and known limits

- Hero video: no QA-approved asset; gated on owner-approved references + 3 pilot stills (§8).
- Native Arabic review of all Arabic copy: pending.
- Exact opening hours: pending owner confirmation.
- GA4 / consent analytics: not installed.
- Lighthouse scores: never measured here (the unauthenticated PageSpeed endpoint returned
  429); do not quote scores for this site.
- The Next.js source the static tree was generated from is **not** in this repo; page-level
  work lives in this tree. Any regeneration from source must preserve the `lareen.js` behaviour
  and the content rules above.

## 13. Working on this repo safely

1. Edit files in this tree. Never invent a price, ingredient, availability claim or hour.
2. Keep `products.js` as the single source of catalogue truth; a product change means its
   page, its card data and its image stay in sync.
3. If you change `lareen.js` or the stylesheet, re-check: bag add → badge + announcement,
   sort order, search synonyms, pagination, hero links, EN/AR toggle, reduced-motion.
4. Push text changes as a snapshot commit; binary images go through the web upload or are
   reconstructed with `tools/fetch-assets.sh` — never claim images are in the repo when only
   the manifest is.
5. Deploy with the file-upload flow (§9) and verify served bytes before calling anything live.
6. A deploy without its matching repo push is an unfinished change: every change made here
   must be pushed into the repo — no change stays local-only.
