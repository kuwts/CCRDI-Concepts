# Site audit

Report only: no files were changed during the audit. Branch `ccc-site-build`, production build
(`npm run build`, 45 pages) served with `astro preview`.

**Scope:** the 14 CCC pages:
- Home, About, Our Brands, the three brand pages, 40 Years, For Businesses, Media & Partners
- Contact and its thank-you page, Privacy Policy, Accessibility Statement, 404

**Methods:**
- an internal link crawl of every built page
- grep scans of the built HTML and the source
- an axe-core 4.10.2 scan (WCAG 2.0/2.1 A and AA, plus best practice) at 1440px and 390px
- Playwright layout checks at 390, 768, 1024 and 1440px (sideways overflow, one H1, heading
  order, alt attributes, header fit)
- page weight measured after scrolling each page to the bottom

**What passed:**
- **Accessibility scan:** 0 axe violations on all 14 pages.
- **Layout and headings:** at every width tested: one H1, no skipped heading levels, every
  `<img>` has an alt attribute, no sideways scrolling, and the header fits at 1024px.
- **Links:** no CCC page links to a theme demo page, and no theme demo text remains on any CCC page.
- **Colour:** no hard-coded hex colours in components or CCC pages.

---

## Broken

Things that are wrong now, or would be wrong on a live site.

1. **Theme demo pages are still built, public and listed in the XML sitemap.**
   - **Where:** /blog (and 7 posts), /blog-horizontal, /portfolio (and 7 case studies),
     /job/… (8 postings), /pricing, /faq, /team and /services are in `dist/sitemap-0.xml`.
     /style-guide and /thank-you/application are built but kept out of the sitemap.
   - **Effect:** search engines would index Obicol demo copy (lorem ipsum, fake team members,
     prices) under the CCC domain. The demo videos (`showreel.webm` / `.mp4`, `video-02.mp4`,
     about 4.4 MB) are also built.
   - **Fix:** the cleanup phase. Approve the deletion list, then remove the page files, their
     content, schemas, helpers and `seo.pages` entries, following THEME_CATALOG.md "Removing a
     page cleanly". Until then, adding them to the sitemap `filter` in `astro.config.mjs` and
     `noindex` would at least keep them out of search.
2. **`baseURL` is `https://example.com`.**
   - **Where:** `src/config/site.config.json`.
   - **Effect:** every canonical URL, `og:url`, share image URL, the sitemap and robots.txt
     point to example.com.
   - **Fix:** set the real domain (gaps.md).
3. **Placeholder links on every page.**
   - **Where:** the header button "Find a Trusted Business" and the homepage hero button go to
     `#` (directory URL missing). The four footer social links go to `#!`.
   - **Effect:** none of them go anywhere.
   - **Fix:** client URLs (gaps.md). Until then, hide the social links rather than show dead ones.
4. **Footer email link is a broken `mailto:`.**
   - **Where:** `Footer.astro`; on all 45 pages.
   - **Effect:** it links to `mailto:[CLIENT TO PROVIDE: email]`.
   - **Fix:** render plain text until the value is a real address, as the Contact page now does.
5. **The dev server's content cache goes stale after schema changes.** Schemas changed during
   this build: `businesses`, `brandPages`, the `pages` `news` flag and the contact fields.
   - **Effect:** the dev server can drop new fields, as happened with the 40 Years video.
   - **Fix:** restart it with `.astro/data-store.json` deleted (the CLAUDE.md rule). I did this
     after the audit, as it deletes only a generated file.

## Should fix

1. **SEO: title length.**
   - **Where:** CCRDI brand page.
   - **Effect:** "Consumer Choice Research, Data & Insights | Consumer Choice Canada" is 66
     characters (target under 60).
   - **Fix:** set `seo.title` to "CCRDI" in `src/content/brand-pages/ccrdi.mdx`.
2. **SEO: site default description.**
   - **Where:** Contact, thank-you, Privacy, Accessibility and 404.
   - **Effect:** all five use the same 183-character default (target 120 to 160 characters).
   - **Fix:** client SEO descriptions (gaps.md). The Contact page is the one that matters most.
3. **SEO: share image and favicons are still the theme's.**
   - **Where:** `public/images/ogimage.png` (used by 10 of 14 pages) and the five icons in
     `public/images/icons/`.
   - **Fix:** a 1200 × 630 CCC share image and a CCC icon set (skill pre-launch checklist).
4. **Contact form: placeholder-only labels.**
   - **Where:** `src/pages/contact.astro`.
   - **Effect:** field names show only as placeholders (labels are hidden for screen readers).
     They disappear while typing, and required fields aren't marked.
   - **Fix:** visible labels with a required marker (WCAG 3.3.2; questions.md #2).
5. **Contact form: notifications not set up.**
   - **Where:** Netlify dashboard.
   - **Effect:** messages won't be emailed anywhere yet.
   - **Fix:** turn on form detection and email notifications (gaps.md).
6. **Header logo is a temporary wordmark.**
   - **Where:** header and footer, all pages.
   - **Effect:** the generated text wordmark is small at 72px wide on phones, and the footer
     watermark uses it too.
   - **Fix:** the real CCC logo (gaps.md).
7. **Page weight on Home and 40 Years.**
   - **Effect:** Home is about 7.7 MB once fully scrolled (the Toronto showreel is 3.6 MB; range
     requests counted higher). 40 Years is about 5.3 MB (the fireworks loop is 4.5 MB). Every
     other page is about 1 MB or less.
   - **Mitigation:** the videos load only their metadata until on screen, and pause off screen.
   - **Fix:** WebM versions alongside the MP4s (the `sources` prop already exists), or 540p
     encodes for phones.
8. **Placeholder text is visible across the site.**
   - **Counts:** 63 "CLIENT TO PROVIDE" markers on Home, 45 on About, 29 on Media, 24 on Our Brands.
   - **Effect:** placeholder headings such as the testimonials, news and leadership headings
     dominate whole sections.
   - **Fix:** client content (gaps.md register). Sections that are still empty at launch should
     be hidden rather than shipped, except on the four pages where the owner chose to keep them.
9. **Careers thank-you page.**
   - **Where:** /thank-you/application.
   - **Effect:** still theme demo copy, and reachable by URL (noindex).
   - **Fix:** on the cleanup list (questions.md #6).
10. **`seo.pages` lists theme routes.**
    - **Where:** `src/config/site.config.json`.
    - **Effect:** the block still holds empty entries for /blog, /blog-horizontal and /portfolio.
    - **Fix:** remove with the demo pages.
11. **Showreel accessibility.**
    - **Where:** homepage and 40 Years.
    - **Effect:** the full-screen player has no captions. axe flags it for review; both clips
      now have no audio track, so none are needed yet.
    - **Fix:** when the client's anniversary video arrives, add captions (WCAG 1.2.2), plus an
      audio description if it carries information.
12. **Brand page copy quoted from ccaward.com.**
    - **Where:** the Award brand page and the Award card on Our Brands.
    - **Effect:** the process steps and descriptions are word for word from the Award site;
      it's the client's own copy, but unconfirmed for use on the CCC site.
    - **Fix:** client confirmation (questions.md #7, gaps.md).

## Nice to have

1. **Fixed blur strip at the bottom of the viewport.**
   - **Where:** `GradualBlur` in `Base.astro`, on every page.
   - **Effect:** it blurs whatever scrolls under it, and a full-width `backdrop-filter` costs
     GPU time on low-end phones. It's also why every full-page screenshot shows a blurred band.
   - **Fix:** remove it, or keep it lighter, for a calmer institutional feel.
2. **Theme interface text.**
   - **Where:** Prev/Next (sliders), Play / Play showreel, Pause … controls, Close video,
     Close menu / Open menu, "Rated n out of 5", Copyright.
   - **Effect:** these are still the theme's English strings, hardcoded in components.
   - **Fix:** move them to site config when the client approves interface labels (gaps.md).
3. **Duplicate page titles.**
   - **Where:** the thank-you page and the Contact page.
   - **Effect:** both show "Contact | Consumer Choice Canada".
   - **Fix:** a thank-you title when the copy arrives.
4. **Leftover theme neutrals in `global.css`.**
   - **Effect:** `#f1f1f1` (fill), `#dc2625` (error), and `#fff` / `#000` in a few `.content` and
     button-circle utilities. They aren't in components, but they sit outside the brand palette.
   - **Fix:** map them to `brand.colors` keys when the palette is final.
5. **Repeated photos.**
   - **Effect:** the three brand photos appear on Home, Our Brands, 40 Years, For Businesses and
     each brand page (by design: one image per brand), but they repeat a lot while browsing.
   - **Fix:** client photography, one set per page type.
6. **Navigation.**
   - **Effect:** "Our Brands" is a single link. The brand pages are one click deeper and also in
     the footer.
   - **Fix:** a dropdown with the three brands (questions.md #5).
7. **Lighthouse not run.**
   - **Effect:** Lighthouse isn't installed here; the axe scan covers most of its accessibility
     audit.
   - **Fix:** run Lighthouse on the live deploy (skill pre-launch checklist).
8. **Placeholder images in the build.**
   - **Effect:** the generated SVG placeholders and the temporary wordmarks ship in `dist`.
     That's expected now; the pre-launch check in CLAUDE.md covers removing them.
