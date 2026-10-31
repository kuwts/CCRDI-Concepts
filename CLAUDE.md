# Project: Consumer Choice Research, Data & Insights website

Converting the finished Consumer Choice Canada (CCC) site, itself built from a purchased Astro
theme, into a professional corporate site for its sister brand Consumer Choice Research, Data &
Insights (CCRDI). The framework, styling system, animations, components, component lab, QA
scripts, dev pages and i18n infrastructure carry over from CCC; content, branding and pages are
CCRDI's.

Sources of truth for copy, highest weight first:
1. /brief/Consumer_Choice_Canada_CCRDI_Key_Messaging.pdf (the client's Key Messaging Framework),
   sections 1 to 13 only. CCRDI: sections 6, 7, 8, 9 and 12, and the CCRDI rows of 2 and 3.
2. /brief/content.md (the CCRDI copy transcribed word for word from the framework).
Design: /brief/design.md. Pages: /brief/sitemap.md and /brief/page-plans.md. Open content
items: /brief/gaps.md. Decisions for the project owner: /brief/questions.md.
Component reference: THEME_CATALOG.md. The CCC site's working docs are in /brief/ccc-archive/,
for reference only: they are not sources of copy or rules for this site.

## Using the Key Messaging Framework
- Sections 1 to 13 are final copy and may be used word for word, the same as content.md.
  Where content.md and the framework disagree, the framework wins.
- Everything after section 13 (from the second "CONSUMER CHOICE CANADA (CCC)" heading on
  page 6 onward) is draft notes with personal commentary. Never use it on the site.
- Direction text written for the client, not the public, is not site copy (e.g. "Core
  rebrand idea", "Strategic positioning recommendation", "This should be the central
  message...").
- This site is CCRDI only. Position CCRDI as a broader Canadian consumer intelligence and
  industry benchmarking organization, not just the division that selects Consumer Choice Award
  winners: award research is one of its five Core Services and never leads.
- Consumer Choice Canada, Consumer Choice Award and Consumer Choice Marketing appear only as
  the family of brands (their lines in sections 2, 3, 9 and 12), never with their own service
  detail. Consumers and Award Winners (section 8) are parent-level audiences; use them only
  where Consumer Choice Canada is described.
- Section 11 (Long-Term Brand Opportunity) may only appear as future direction, never as
  current services. It is not used at launch (approved by the project owner).

## Rules
- COPY: Every word of visible text, alt text and SEO text comes from the framework
  (sections 1 to 13) or /brief/content.md, word for word. Never write, rewrite, expand,
  shorten or "improve" copy. Never invent statistics, client names, testimonials, counts,
  dates, quotes, headings, intros or button text. Where text is missing, insert a
  placeholder like [CLIENT TO PROVIDE: client logos] and log it in /brief/gaps.md.
- Approved exceptions to the copy sources (each logged in /brief/gaps.md for client
  confirmation): public facts stated on ccaward.com (including its blog) or in Consumer Choice
  Award press releases, with their source URLs; never invented dates or milestones. Never use
  or write quotes from real people unless the client supplies them.
- French version: the site will be bilingual, but French comes at the very end of the
  project. Until then French is switched off (`i18n.languages.fr.enabled: false` in
  site.config.json): no /fr pages, no language switcher, no French sitemap or hreflang. Keep
  the i18n infrastructure working: src/i18n (routes.json pairs every English and French URL),
  French entries in each collection's fr/ folder, French site-wide text in site.config.json
  (`fr`, `ui`) and menu.json (`fr`), the French page templates in src/pages/_fr/ (routed only
  when the flag is on), and scripts/qa/i18n.cjs and scripts/qa/frtypo.cjs (which skip while
  French is off). When it is switched on: the French pages translate the approved English copy
  into Canadian French (fr-CA, standard Quebec French following OQLF guidance, a professional
  corporate register). They are machine-assisted drafts, logged in /brief/gaps.md, and must be
  reviewed by a professional translator or a native French speaker before launch. Translate
  only what the English pages say; add nothing. Brand names stay in English, except Consumer
  Choice Award, which is "Prix Choix du Consommateur" (as on ccaward.com/fr). Inclusive
  writing: gender-neutral wording where it reads naturally, paired forms in key places (e.g.
  "Canadiennes et Canadiens"), never dot forms. [CLIENT TO PROVIDE: ...] placeholders stay in
  English.
- STRUCTURE: Keep the theme's existing layouts, page templates, section components, header,
  footer, grid and spacing system. Change the content and styling inside them; do not
  rebuild or restructure what the theme already does.
- NEW COMPONENTS: Only when no existing component can do the job after restyling. Ask me
  first and name the existing components you considered. Approved new components go in
  src/components/ccc/ (the folder keeps the name it had on the CCC site; it holds the
  project's added components), follow the theme's existing code patterns and naming, and must
  be responsive and keyboard accessible.
- Remove theme sections that have no matching content rather than filling them with
  invented text. Tell me which ones you removed.
  Exception, homepage and About: keep every section of the CCC site's original page, in the
  same order and layout, and fill sections without CCRDI content with [CLIENT TO PROVIDE: ...]
  placeholders and labelled placeholder images, all logged in /brief/gaps.md. The CCC
  homepage's 40-year seal is CCC's own and is removed.
- All colours come from the `brand` block in src/config/site.config.json (`brand.colors`,
  extended with extra keys for the full CCRDI palette and the sister brands' colours), written
  to `--brand-*` variables by Base.astro and mapped to Tailwind tokens in the `@theme` block of
  src/styles/global.css. Fonts, radii and shadows are tokens in that `@theme` block. No
  hard-coded hex values in components. Sister-brand colours are used only on the
  family-of-brands slides.
- All site-wide text (nav, footer, contact, social, default SEO) lives in the theme's config
  files: src/config/site.config.json, src/config/menu.json and src/config/social.json,
  using only text from the sources above.
- Meet WCAG 2.1 AA: 4.5:1 text contrast (3:1 for large text), visible focus states, alt text,
  one H1 per page, logical heading order, respect prefers-reduced-motion. design.md lists
  where each palette colour may be used as text.
- Canadian spelling throughout (colour, behaviour, centre, favourite).
- Do not delete files until the cleanup phase, and only after I approve the list
  (/brief/cleanup-list.md).
- After changing a page, run the build and report any errors.
- After building or changing a page, screenshot it at 1440px and 390px (Playwright is
  installed as a dev dependency; scripts/qa/shoot.cjs), save the screenshots under
  screenshots/ (CCC's are in screenshots/ccc-archive/), and review them critically before
  reporting back.
- After changing a content schema (src/types/collections.ts), restart the dev server with its
  content cache cleared: `npx astro dev stop`, delete `.astro/data-store.json`, then
  `npm run dev`. The dev server keeps its own cache (separate from the build's
  node_modules/.astro cache, which is all `astro sync --force` clears) and does not notice
  schema changes in that file, so new fields can silently disappear in dev while the build
  is fine. Confirm against the dev server, not only `npm run build`.
- Changes that should go back into the base theme are recorded in BACKPORT.md.

## Pre-launch
- The CCRDI domain is set. `baseURL` in site.config.json is the placeholder
  `https://ccrdi.example` until the client supplies the domain (/brief/gaps.md). Check:
  `grep -rl "ccrdi.example" src dist` returns nothing, the build prints no placeholder-domain
  warning, and /robots.txt no longer disallows everything.
- No [CLIENT TO PROVIDE: ...] placeholders, placeholder images or the free-licence placeholder
  photos and video (listed in /brief/placeholder-media.md) may remain on the live site. Check:
  `grep -rl "CLIENT TO PROVIDE" dist` and `grep -rl "placeholders/" src/content src/config`
  both return nothing, and src/assets/images/placeholders/ and src/assets/videos/placeholders/
  are no longer used.
- The official logo, favicon set and share image replace the temporary ones.
- French: translated, reviewed and approved by a professional translator or a native French
  speaker (/brief/gaps.md), switched on, and `node scripts/qa/i18n.cjs` and
  `node scripts/qa/frtypo.cjs .` report no problems; or the site launches in English only by
  the client's decision.

## Tone
Confident, plain, professional. No hype words, emoji, or exclamation marks.
