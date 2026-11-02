# LaReen Sweets — Al Barsha 1

Bilingual (English / Arabic) static website for LaReen Sweets, Al Barsha 1, Dubai.
Live: **https://lareen-pastryshop.vercel.app**

## What it is

- 78 products, 8 collections, 4 occasions, plus custom-cakes, catering, order, visit, story, FAQ and policy pages.
- WhatsApp-first ordering: a local draft bag builds a prefilled WhatsApp order request. No online payment, no claimed checkout, no guaranteed delivery time.
- 12 products per page, shop sort / filter / search, 10-slide linked hero showcase, one-line swipeable category rail.
- No backend, no build step: plain static HTML, CSS and JavaScript, deployed on Vercel.

## Repository layout

| Path | Contents |
|---|---|
| `index.html`, `shop.html`, `search.html`, `bag.html`, … | Pages (109 HTML files) |
| `products/`, `collections/`, `occasions/` | Product, collection and occasion pages |
| `images/` | 78 Flow-generated catalogue pictures (see `docs/IMAGES_MANIFEST.json`) |
| `lareen.js`, `products.js` | All interactivity, catalogue data, bag and inquiry builders |
| `_next/static/css/` | Compiled stylesheet (source of tokens: `site/` is not in this repo) |
| `vercel.json`, `robots.txt`, `sitemap.xml` | Clean URLs, crawler rules, 104 public pages |
| `docs/` | Content rules, deployment, cinematic runbook, image manifest |
| `docs/cinematic/` | The complete V3 cinematic production package (visual bible, prompts, manifests, QA) |
| `tools/` | Asset reconstruction script (re-downloads `images/` from the live deployment, SHA-1 verified) |

## Content rules (non-negotiable)

- **Al Barsha 1 only.** Never mix other branches' prices or details.
- **Price truth has two states only:** `approved_fixed` (34 products, Talabat Al Barsha amounts) and enquiry (44 products, "Enquire for price", never zero, never invented).
- **Honesty:** catalogue pictures are Flow-generated and labelled illustrative ("Images are illustrative. Presentation may vary."). No fake reviews, ratings, testimonials, availability, discounts or heritage claims. Every product page carries the ingredient/allergen contact note.
- Arabic names are machine-assisted, pending native review. Opening hours are shown only as "contact the bakery to confirm".

Full rules: [`docs/CONTENT_RULES.md`](docs/CONTENT_RULES.md).

## Deployment

Production deploys from this tree via Vercel file upload (project `lareen-pastryshop`), tracked in an upload manifest. This repo is not yet wired for automatic git deploys; changing that is a deliberate step, not a side effect. Procedure and rollback: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Cinematic work (V3)

The site is video-ready but ships no video: the V3 package's 6 brand-film clips, 10 hero clips and 5 category clips are prompts and manifests, not generated media. Nothing is claimed as filmed. Generation order, QA gates and the exact hero-activation steps: [`docs/CINEMATIC_V3_RUNBOOK.md`](docs/CINEMATIC_V3_RUNBOOK.md).

## Links

- Live site: https://lareen-pastryshop.vercel.app
- Vercel project: `lareen-pastryshop` (`prj_8jMWYCSvmNwDM3KAl7lUVAn6i474`)
