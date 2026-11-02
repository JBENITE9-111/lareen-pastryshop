# Website hero integration notes

This is illustrative neutral HTML/CSS/JS. **Do not paste the extra H1 alongside an already existing hero headline.** Adapt existing markup and class names to apply the video layer to the current homepage. The site is compiled static HTML/JS on Vercel; no React rewrite needed. Keep the existing 10-slide image rail and linked products.

1. First export the actual approved `/assets/lareen/posters/lareen-hero.webp` file. If not ready, leave original product JPG as poster. Do NOT deploy broken media references.
2. Then export the short approved hero MP4. Deploy only after the asset exists and plays.
3. Add video backdrop as a progressive enhancement, not mandatory functionality. Leave SEO text and CTAs server-rendered.
4. Adjust overlay typography/gradient for Arabic RTL and test each approved video frame for text contrast. `dir="rtl"` may require a separate mobile/desktop art-directed crop.
5. Do not use video to animate every product card. The existing product slider should stay a manual 10-slide image-first navigation.
6. Because the hero image is a potential LCP element, evaluate `fetchpriority="high"` against actual page structure and do not accidentally make two images compete for high-priority requests.
7. The demo allows an 8s loop; trim the film so start and end framing are near identical to avoid a visible jump, or crossfade onto still before restarting.
8. On mobile, keep static poster default; enable video only after controlled A/B performance review proves benefit.
9. Keep disclosure that images are illustrative; presentation may vary, subject to real product accuracy review.
10. Test 320–1440px, dark/light mobile browser chrome, iPhone Safari, Android Chrome, keyboard navigation, screen readers and reduced-motion settings.
