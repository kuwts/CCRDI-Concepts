# Project: Consumer Choice Canada website

Rebuilding a purchased Astro theme into a professional corporate site for Consumer Choice Canada (CCC).
Sources of truth for copy, highest weight first:
1. /brief/Consumer_Choice_Canada_CCRDI_Key_Messaging.pdf (the client's Key Messaging Framework),
   sections 1 to 13 only.
2. /brief/content.md.
Design: /brief/design.md. Pages: /brief/sitemap.md. Open content items: /brief/gaps.md.
Component reference: THEME_CATALOG.md (current; /brief/theme-audit.md is out of date).

## Using the Key Messaging Framework
- Sections 1 to 13 are final copy and may be used word for word, the same as content.md.
  Where content.md and the framework disagree, the framework wins.
- Everything after section 13 (from the second "CONSUMER CHOICE CANADA (CCC)" heading on
  page 6 onward) is draft notes with personal commentary. Never use it on the site.
- Direction text written for the client, not the public, is not site copy (e.g. "Core
  rebrand idea", "Strategic positioning recommendation", "This should be the central
  message...").
- This site is CCC only. Use the CCRDI sections only to describe CCRDI as a brand, and
  position it as broader consumer intelligence and industry benchmarking, not just the
  division that selects award winners.
- Section 11 (Long-Term Brand Opportunity) may only appear as future direction, never as
  current services.

## Rules
- COPY: Every word of visible text, alt text and SEO text comes from the framework
  (sections 1 to 13) or /brief/content.md, word for word. Never write, rewrite, expand,
  shorten or "improve" copy. Never invent statistics, client names, testimonials, award
  counts, dates, quotes, headings, intros or button text. Where text is missing, insert a
  placeholder like [CLIENT TO PROVIDE: winners to date] and log it in /brief/gaps.md.
- Approved exceptions to the copy sources (each logged in /brief/gaps.md for client
  confirmation): public facts stated on ccaward.com (including its blog) or in Consumer Choice
  Award press releases, with their source URLs (e.g. "since 1987"); never invented dates or
  milestones; the Consumer Choice Marketing service list from
  the framework's draft notes, on Our Brands only. Never use or write quotes from real people
  unless the client supplies them.
- STRUCTURE: Keep the theme's existing layouts, page templates, section components, header,
  footer, grid and spacing system. Change the content and styling inside them; do not
  rebuild or restructure what the theme already does.
- NEW COMPONENTS: Only when no existing component can do the job after restyling. Ask me
  first and name the existing components you considered. Approved new components go in
  src/components/ccc/, follow the theme's existing code patterns and naming, and must be
  responsive and keyboard accessible.
- Remove theme sections that have no matching content rather than filling them with
  invented text. Tell me which ones you removed.
  Exception, homepage, About, Our Brands and 40 Years: keep every section of the theme's
  original page, in the same order and layout, and fill sections without CCC content with [CLIENT TO PROVIDE: ...]
  placeholders and labelled placeholder images, all logged in /brief/gaps.md.
- All colours come from the `brand` block in src/config/site.config.json (`brand.colors`,
  extended with extra keys for the full navy, gold and ivory palette), written to
  `--brand-*` variables by Base.astro and mapped to Tailwind tokens in the `@theme` block of
  src/styles/global.css. Fonts, radii and shadows are tokens in that `@theme` block. No
  hard-coded hex values in components.
- All site-wide text (nav, footer, contact, social, default SEO) lives in the theme's config
  files: src/config/site.config.json, src/config/menu.json and src/config/social.json,
  using only text from the sources above.
- Meet WCAG 2.1 AA: 4.5:1 text contrast (3:1 for large text), visible focus states, alt text,
  one H1 per page, logical heading order, respect prefers-reduced-motion.
- Canadian spelling throughout (colour, behaviour, centre, favourite).
- Do not delete theme files until the cleanup phase, and only after I approve the list.
- After changing a page, run the build and report any errors.
- After building or changing a page, screenshot it at 1440px and 390px (Playwright is
  installed as a dev dependency), and review the screenshots critically before reporting back.
- After changing a content schema (src/types/collections.ts), restart the dev server with its
  content cache cleared: `npx astro dev stop`, delete `.astro/data-store.json`, then
  `npm run dev`. The dev server keeps its own cache (separate from the build's
  node_modules/.astro cache, which is all `astro sync --force` clears) and does not notice
  schema changes in that file, so new fields can silently disappear in dev while the build
  is fine. Confirm against the dev server, not only `npm run build`.

## Pre-launch
- No [CLIENT TO PROVIDE: ...] placeholders, [FOUNDING YEAR], placeholder images or the
  free-licence placeholder photos and video (listed in /brief/placeholder-media.md) may
  remain on the live site. Check: `grep -rl "CLIENT TO PROVIDE\|FOUNDING YEAR" dist` and
  `grep -rl "placeholders/" src/content src/config` both return nothing, and
  src/assets/images/placeholders/ and src/assets/videos/placeholders/ are no longer used.
- Refresh the press releases (src/content/data/press-releases.json) from Consumer Choice
  Award's newswire releases, word for word, and log the changes in /brief/gaps.md.

## Tone
Confident, plain, professional. No hype words, emoji, or exclamation marks.
