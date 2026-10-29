# Theme audit: obicol-astro

Read-only audit of the purchased theme before any edits. Nothing in this document has been changed.

## 1. Astro version, integrations, CSS approach

- **Astro**: `^7.2.0` (astro.config.mjs uses the v7 `fonts` config API and `fontProviders`).
- **Package name**: `obicol-astro` (per package.json) — this is the "Obicol" agency/portfolio demo theme.
- **Integrations** (astro.config.mjs): `@astrojs/mdx`, `@astrojs/sitemap`, `astro-icon`, `@astrojs/react`.
- **CSS approach**: Tailwind CSS **v4** via `@tailwindcss/vite` (Vite plugin, not the old `@astrojs/tailwind` integration). A single global stylesheet at `src/styles/global.css` uses the v4 `@theme`, `@utility`, and `@layer` directives — there is no separate `tailwind.config.js`; all theming lives in CSS.
- Also loaded: `tailwind-bootstrap-grid` (gives the `.container`/`.row`/`.col-*` Bootstrap-style grid classes used throughout every page) and `@tailwindcss/typography` (the `prose` class used on long-form content).
- **Fonts**: one Google font, "Space Grotesk", loaded via Astro's built-in `fonts` config + `fontProviders.google()`, exposed as CSS var `--font-space-grotesk` and mapped to `--font-primary` in global.css. This is the only font in the theme (self-hosted and proxied by Astro, not a `<link>` tag — see §6).
- **React**: used for exactly 3 islands: `CounterUp.tsx` (animated numbers in Facts), `DropdownNav.tsx` (desktop mega-menu in Header), `GradualBlur.tsx` (decorative blur overlay in Base layout, loaded `client:idle` on every page).
- **Other libs**: `swiper` (carousels), `motion` (Framer Motion fork, used by CounterUp/DropdownNav), `marked` (not obviously used — see gaps below), `astro-embed` (YouTube/Vimeo/LinkPreview/Mastodon embeds, used only on style-guide.astro).

## 2. Every page/route

14 route files under `src/pages/` (2 are dynamic `[slug]` routes that fan out over collections):

| Route | Purpose / sections |
|---|---|
| `index.astro` | Homepage. Hero banner (headline, lead, 2 CTAs, social-proof avatars) → video showreel → intro + stacked services panel → featured-projects carousel (`PortfolioCarousel`) → `WorkProcess` (4-step process + CTA) → testimonials (`ReviewCarousel` + dark client logos) → blog teaser grid (1 featured + 3 grid posts). |
| `about.astro` | `PageHeader` → full-width image → client logos → `Facts` (stats/counters section) → `TeamGroupCarousel` (marquee) → testimonials → team grid (8 members) + CTA button. |
| `services.astro` | `PageHeader` → client logos → `Facts` → scroll-driven "stacked cards" service list (custom inline JS, one card per service with image/icon/sub-services) → testimonials. |
| `contact.astro` | `PageHeader` → two-column info (email/phone/address via `LineLink`) + contact form (name/email/phone/company/project type/budget/message) that POSTs via `fetch` to `formsubmit.co` (see §6). |
| `faq.astro` | `PageHeader` → `Faq` accordion (grouped Q&A). |
| `pricing.astro` | `PageHeader` → monthly/yearly toggle + 3 pricing-plan cards (one "featured") → shared `Faq` accordion. **Not referenced in CCC sitemap.** |
| `team.astro` | `PageHeader` → team grid (same 8 members as About) + CTA → open positions list grouped by category, linking to `/job/[slug]`. |
| `privacy.astro` | `PageHeader` → MDX body content (`pages` collection, `privacy` entry) → optional CTA block. Only CMS-driven long-form page currently wired up. |
| `404.astro` | Standalone "404" numeral + heading + body + "Back to Home" button. Not wrapped in `PageHeader`. |
| `style-guide.astro` | Internal dev/demo page: type scale, buttons, links, FAQ accordion, and 4 `astro-embed` components (YouTube, Vimeo, LinkPreview, Mastodon) pointed at public demo URLs. Pure theme scaffolding — no real content. |
| `blog/index.astro` | `PageHeader` → post grid (1 featured + others) with a "load more" button (reveals hidden cards, no pagination). |
| `blog-horizontal.astro` | Alternate blog listing layout (all cards horizontal). Not in the main nav; appears to be a theme demo variant/duplicate of `blog/index.astro`. |
| `blog/[slug].astro` | Blog post detail: hero image, sticky table-of-contents (auto-built from markdown `##`/`###` headings via regex), MDX body, related posts. |
| `job/[slug].astro` | Job detail: header, MDX body, "apply" form. **Form `action="#"` — it does not submit anywhere; it's decorative/non-functional.** |
| `portfolio/index.astro` | Masonry grid of portfolio projects with custom JS layout + "load more". |
| `portfolio/[slug].astro` | Case-study detail: hero image, client info sidebar, services list, MDX body, "what's next" related-projects row. |

None of blog, portfolio, jobs, pricing, blog-horizontal, or style-guide map to anything in `/brief/sitemap.md` — they are all theme demo content for cleanup/removal in Phase 6, except where their *components* get reused for CCC's own pages (see §7).

## 3. Every component, and which pages use it

All 24 components live in `src/components/` (with `helper/`, `menu/`, `ui/` subfolders). `grep`-verified usage:

| Component | Used by |
|---|---|
| `Header.astro` | `Base.astro` (every page, via layout) |
| `Footer.astro` | `Base.astro` (every page) |
| `ScrollProgress.astro` | `Base.astro` |
| `helper/DeviceSizeIndicator.astro` | `Base.astro` (dev-only breakpoint badge, gated on `NODE_ENV === "development"`) |
| `ui/GradualBlur.tsx` | `Base.astro` (bottom-of-page blur vignette, every page) |
| `PageHeader.astro` | about, blog-horizontal, blog/index, contact, faq, portfolio/index, pricing, privacy, services, style-guide, team |
| `Button.astro` | WorkProcess (component), 404, about, blog-horizontal, blog/index, contact, index, job/[slug], portfolio/index, pricing, privacy, style-guide, team |
| `LineLink.astro` | Footer (component), contact, index, job/[slug], portfolio/[slug], style-guide |
| `SectionTitle.astro` | WorkProcess (component), about, index, pricing, services, team |
| `Clients.astro` | about, index, services |
| `Facts.astro` (→ uses `CounterUp.tsx`) | about, services |
| `Faq.astro` | faq, pricing, style-guide |
| `ReviewCarousel.astro` (→ uses `helper/AstroImage`, `helper/AstroVideo`) | about, index, services |
| `BlogCard.astro` | blog-horizontal, blog/[slug], blog/index, index |
| `PortfolioCard.astro` | PortfolioCarousel (component), portfolio/[slug], portfolio/index |
| `PortfolioCarousel.astro` | index only |
| `BannerShape.astro` | index only (decorative SVG blob behind hero) |
| `BannerTestimonial.astro` | index only (hero social-proof avatar stack) |
| `Showreel.astro` (→ uses `helper/AstroVideo`) | index only (hero video with custom cursor + fullscreen overlay) |
| `StackedServices.astro` | index only (sticky-stack services panel beside the intro text) |
| `WorkProcess.astro` | index only |
| `TeamGroupCarousel.astro` | about only (marquee of team photos) |
| `menu/DropdownNav.tsx` | Header.astro only |
| `helper/AstroImage.astro` | nearly everywhere — BannerTestimonial, BlogCard, Clients, Facts, Footer, Header, PortfolioCard, ReviewCarousel, StackedServices, TeamGroupCarousel, WorkProcess, about, blog/[slug], portfolio/[slug], services, team |
| `helper/AstroVideo.astro` | ReviewCarousel, Showreel |

Note: a literal-string grep for "PortfolioCarousel" also matched `ReviewCarousel.astro` — that's a false positive from a code *comment* ("mirrors PortfolioCarousel"), not an actual import; `ReviewCarousel` does not use `PortfolioCarousel`.

## 4. Colours, fonts, radii, spacing — and every hard-coded hex value

**Design tokens** (Tailwind v4 `@theme` block, `src/styles/global.css:8-16`):
```
--color-primary:  #00b75f
--color-light:    #fafafa
--color-dark:     #001213
--color-muted:    #a3b2b3
--color-mutedDark:#666666
--font-primary:   var(--font-space-grotesk), sans-serif
```
This is the **only** place theme-wide colour/font tokens are defined. There is no separate radius or spacing scale — radii are hard-coded per-utility (e.g. `btn-circle` → `border-radius: 100%`; `scroll-progress` → `50px`/`50%`) and spacing comes straight from Tailwind's default scale used ad hoc in class names (no custom `--spacing-*` tokens).

Phase 2 will need to replace this whole `@theme` block with CCC's tokens from `/brief/design.md` and re-point every one of the hard-coded hex values below at a token or a Tailwind arbitrary-value using the new palette.

**Every hard-coded hex (or `%23`-encoded hex inside inline SVG data-URIs) found in `src/`:**

`src/styles/global.css` (the heaviest concentration — 28 hits, mostly inside `@utility` blocks for buttons, the scroll-to-top button, `.content` prose styling, and two inline SVG data-URIs):
- L9-13: theme tokens themselves (`#00b75f`, `#fafafa`, `#001213`, `#a3b2b3`, `#666666`)
- L20-21: `::selection` (`#008645`, `#fff`)
- L164-178: `.btn-white`/`.btn-black`/`.btn-dark`(uses `--color-dark`)/`.btn-light` (uses `--color-light`) — `#fff`×2, `#000`×3
- L205-217: `.btn-circle-white`/`.btn-circle-black` hover states — `#000`×3, `#fff`×3
- L267: inline SVG checkmark fill `%23ffffff`
- L282: `.progress-circle path` stroke `#fff`
- L325, 329: `.content a` link colour `#333` / hover `#000`
- L371: `.content blockquote` border `#eee`
- L376: `.content blockquote` text colour `#343a40`
- L391, 394, 397, 400: `.content-dark` heading/link colours `#ddd`×2, `#fff`×2
- L408: `.select-icon` chevron SVG stroke `%23222222`
- L416: `.select-icon` disabled-option colour `#888`

Component/page-level hex (18 hits):
- `src/components/BannerShape.astro:6` — `#332D2B` (decorative SVG fill colour)
- `src/components/BannerTestimonial.astro:39` — `#74484a` (avatar border)
- `src/components/SectionTitle.astro:23` — `#bbb` (muted subtitle on dark background)
- `src/components/Faq.astro:47` — `#fbfdff` (answer-panel background)
- `src/components/BlogCard.astro:28` — `#222`, `#444` (hover title/underline colour)
- `src/components/Header.astro:103`, `:140` — `#eee` (inactive mobile-nav link colour, ×2)
- `src/components/menu/DropdownNav.tsx:108` — `#eee` (inactive desktop-nav link colour)
- `src/components/menu/DropdownNav.tsx:165` — `#fff` (dropdown-panel caret triangle)
- `src/types/collections.ts:248` — `#0a11a8` (zod schema **default value** for `blog.color`, not a rendered style, but still a hard-coded brand colour baked into the schema)
- `src/pages/team.astro:78` — `#eae9e9`, `:78` `#f1f1f1` (job-row hover background)
- `src/pages/team.astro:81` — `#666` (job location text)
- `src/pages/contact.astro:159` — `#17a34a` (success status colour, JS-set inline style)
- `src/pages/contact.astro:169` — `#dc2625` (error status colour, JS-set inline style)
- `src/pages/pricing.astro:67` — `#555` (non-featured plan name colour)
- `src/pages/pricing.astro:102` — `#00b75f` (pricing checkmark SVG stroke — duplicates the primary token instead of referencing it)
- `src/pages/services.astro:101` — `#001213` (fallback background colour if a service has no `color` field — duplicates the dark token)
- `src/pages/job/[slug].astro:18` — `#ced4da`, `#495057` (form field border/text colour, inconsistent with every other form on the site which uses `border-dark/30`/`text-dark`)

Pages reused for CCC (about, services, contact, team, 404) all contain at least one hard-coded hex that Phase 2 must replace with a token.

## 5. Content collections, data files, demo text and images

**Collections** (`src/content.config.ts` → `src/types/collections.ts`), all Zod-validated:
- Singleton MDX "page data" collections (one `index.mdx` each): `homepage`, `about`, `services`, `team`, `pricing`, `faq`, `contact` — these hold the *structured* copy (hero text, stats, form field options, etc.) that the corresponding page component reads via `getEntry()`. This is the pattern CCC content should probably follow.
- Repeating MDX collections: `jobs` (8 entries), `portfolio` (7 entries), `blog` (7 entries) — all theme demo content, irrelevant to CCC and slated for removal.
- Generic long-form MDX collection: `pages` (currently only `privacy.mdx`) — reused for CCC's own Privacy Policy and Accessibility Statement pages.
- JSON "data" collections (`file()` loader, no MDX): `src/content/data/clients.json` (10), `clients-dark.json` (10), `team.json` (8), `testimonials.json` (5) — flat lists of logos/team members/reviews referenced by id from the schema above, not prose.

**Config/data files** (plain JSON, not Astro collections):
- `src/config/site.config.json` — site name/tagline/SEO meta/logo/footer contact/buy-now CTA. This is exactly the shape CCC's planned `src/data/site.ts` (Phase 3) should replace/absorb. Currently full of theme placeholder values ("Obicol - Agency & Portfolio Template", `platoltheme.demo@gmail.com`, `hello@example.com`, a fictitious US address, `https://platoltheme.com/...`).
- `src/config/menu.json` — nav + footer link columns. All entries point at theme demo pages (Portfolio, Blog, Pricing, Job Details, Style Guide, etc.) that don't exist in CCC's sitemap.
- `src/config/social.json` — 4 social links, all `url: "#!"` placeholders.

**Demo images/video**: `src/assets/images/` (team, team-group, clients ×2 sets light/dark, blogs, portfolio/carousel, portfolio/masonry, services, testimonials, plus `about-header.jpg`, `about-stats.jpg`, `placeholder.png`) and `src/assets/videos/` (`showreel.webm`, `poster.png`) — all theme stock/demo imagery, to be replaced with CCC's own (or placeholder) imagery per `/brief/design.md`. `public/images/` holds only `favicon.png` and `ogimage.png` (both theme-branded, need replacing).

`src/lib/content.ts` holds three `getCollection()` helpers (`getPosts`, `getProjects`, `getJobs`) plus `getFeaturedProjects()` — all specific to the blog/portfolio/jobs collections being removed; this file is a cleanup candidate once those collections go.

## 6. Third-party scripts, analytics, forms

- **No analytics/tracking of any kind** — no Google Analytics/GTM, no Plausible, Meta pixel, Hotjar, etc. anywhere in the codebase.
- **No raw `<script src="...">` third-party tags.** The only external network calls at runtime are:
  - **Google Fonts**: not a `<link>` tag — loaded through Astro's native `fonts` integration (`astro.config.mjs` → `fontProviders.google()`), which self-hosts/proxies the font at build time. Per `/brief/design.md`, this still needs to be swapped out for self-hosted `@fontsource-variable/source-serif-4` + `@fontsource-variable/inter`.
  - **`formsubmit.co`** — the contact form (`src/pages/contact.astro`) intercepts submit, builds a JSON payload (name/email/phone/company/project_type/budget/message), and `fetch()`s `https://formsubmit.co/ajax/{email}` where `{email}` comes from `site.config.json`'s `contact_form.email` (currently `platoltheme.demo@gmail.com`, a theme placeholder). The JSON `_subject` field is hard-coded to `"Message from Obicol Astro!"`. This is a real, working third-party form backend that will need a decision: keep formsubmit.co (update the destination email) or swap to something else — flag for `/brief/gaps.md` (form destination).
  - **`style-guide.astro`** embeds live content from `astro.build`, `m.webtoo.ls` (Mastodon), `youtube.com`, and `vimeo.com` via `astro-embed` components — pure dev/demo page, deleted in cleanup.
- **Forms found:**
  - Contact form (`contact.astro`) — functional, POSTs to formsubmit.co as above.
  - Job application form (`job/[slug].astro`) — `<form action="#">`, no JS handler attached anywhere; it is purely decorative/non-functional in the theme. Moot for CCC since the Team/Jobs page isn't in `/brief/sitemap.md`.
  - Pricing toggle "form" — not a real form, just a styled `<button>` with inline JS animating price values.

## Homepage content-block → theme component mapping

Mapping each CCC homepage block from `/brief/sitemap.md` to the existing theme component(s) best suited to it:

| CCC block | Theme component(s) | Why it fits |
|---|---|---|
| Header | `Header.astro` + `menu/DropdownNav.tsx` | Already a full responsive header (desktop dropdown nav, mobile drawer, logo, CTA button slot) — exactly the nav/CTA structure the brief calls for. |
| Hero | Hero section of `index.astro` (headline/body/2-CTA block) + `BannerTestimonial.astro` for social proof, **without** `Showreel.astro`/`BannerShape.astro` | The two-column layout (headline+CTAs / lead+proof) matches the brief's "headline, body, two buttons" hero; CCC has no video or decorative dot-blob asset, so those two sub-pieces would be dropped, not restyled. |
| Lead statement | `SectionTitle.astro` (or the plain intro-text block from `index.astro`'s second section) | It's a centered subtitle+title component already used for exactly this "set text large" pattern elsewhere (about, services, pricing). |
| Family of brands | `Clients.astro` restyled as a 3-card grid, or `PortfolioCard.astro`/grid layout | Brief wants 3 cards with accent colours and one-liners; `PortfolioCard` already supports a `color` overlay per item, which maps directly onto "division accent colour on each card." |
| Four pillars | `Facts.astro`'s stat-tile layout (without `CounterUp`), or a restyled `WorkProcess.astro` 4-up grid | `WorkProcess` already renders exactly 4 equal-width cards with an icon/symbol, heading, and text — the simplest match for 4 pillars (Trust/Recognition/Intelligence/Growth). |
| Stats | `Facts.astro` (with `CounterUp.tsx`) | Purpose-built counter/stat component; only use if real numbers are supplied (brief says placeholders only, so may stay dormant). |
| 40 years | Split layout from `about.astro`'s intro section (image + heading/body) or `PageHeader` + image block | Brief wants a text+image split with a "Read Our Story" button — the existing about-page intro block (image above, text block pattern) restyles cleanly into a side-by-side split. |
| Who we serve | `WorkProcess.astro` grid (3-up instead of 4-up) or `Clients`-style card grid | Same card-grid pattern as pillars/brands, reused for the 3 audience cards (Consumers, Award Winners, Media & Partners). |
| Testimonials | `ReviewCarousel.astro` | Direct match if real testimonials ever arrive; brief says remove/hide until then — straightforward to omit this `<section>` from the homepage. |
| Closing CTA | Footer's CTA heading block (`Footer.astro` top section) pattern, reused as a standalone `<section>` | Theme already has a "big heading + arrow link" CTA pattern at the top of the footer; the same markup restyled as its own band matches "tagline + Contact Us button." |
| Footer | `Footer.astro` | Already has the exact shape needed: nav columns, contact info, social links, legal links, big CTA heading — just needs CCC's data and no theme-demo links. |

No existing theme component was found for the anniversary SVG seal (navy/gold, light+dark variants) — confirms it as the one net-new component already flagged for approval in `/brief/design.md`.
