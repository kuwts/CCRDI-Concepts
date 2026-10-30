# Backport to the base theme

Every change in this project that should go back into the Obicol base theme
(`/Users/dancutz/Documents/Projects/Obicol - Astro with AI Rules`, never edited from here).
For each item: what it is, the files, and what's CCC-specific to strip out before backporting.

**Keep this file up to date:** add an entry whenever a generic fix, improvement, component,
utility or script is made in this project.

Generic CCC parts to strip everywhere: the CCC palette values and extra colour keys in
`site.config.json` (`goldText`, `goldEdge`, division and edge colours), CCC copy, logos and
placeholder media, `[CLIENT TO PROVIDE: …]` placeholders, Lucide icon names chosen for CCC
content, and page lists in scripts.

---

## 1. Bug fixes

| Fix | Files | Notes / strip |
|---|---|---|
| **Header twitch near 100px scrolled.** Pinning shrinks the sticky header, which pulls the page under the threshold, which unpins it, in a loop. Hysteresis: pin above 100px, unpin below 40px. | `src/layouts/Base.astro` (header script) | Generic. |
| **Slider drag flies through slides.** `freeMode` gave mouse drags momentum through the looped slides. Removed; a drag or swipe moves exactly one slide (tracked by `realIndex`, which survives loop re-ordering; corrected with `slideToLoop`); links and images aren't native drag sources; `threshold` 8, `preventClicks`. | `src/components/PortfolioCarousel.astro` | Generic. |
| **Unused media shipped in the build.** The asset globs in `AstroImage`, `AstroVideo`, `ReviewCarousel` and `lib/seo.ts` emit every file under `src/assets`, used or not. Production globs exclude demo-only folders; dev resolves everything. | those four files | For the theme, make the exclude list a single config (or keep demo media outside `src/assets`); the folder list is this project's. |
| **Eager glob emits everything it matches.** Keep eager globs narrow. | `src/pages/[page].astro` (downloads) | Pattern note. |
| **`AstroImage` with only width or height** cropped instead of keeping proportions. | `src/components/helper/AstroImage.astro` | Generic. |
| **`Clients` forced logos into 120 × 36.** `logoHeight` prop; proportions kept. Also `tiles` option (logos on white tiles on navy). | `src/components/Clients.astro` | Generic. |
| **Footer:** `mailto:` only for a real address (hidden otherwise); social links only when they're `http(s)` URLs, opening in a new tab. | `src/components/Footer.astro` | Generic. |
| **Structured data published placeholders and a `sameAs` of someone else's profiles.** Organization data skips empty or placeholder values; `sameAs` left to config. | `src/layouts/Base.astro` | Strip the CCC comment. |
| **`SectionTitle` double full stop** after titles ending in punctuation (the dot is now off by default). | `src/components/SectionTitle.astro` | Decide the theme default. |
| **`BlogCard`:** chips overflowed at 390; `item` mode clamped text with "…". | `src/components/BlogCard.astro` | Generic. |
| **`ReviewCarousel`** drew 5 stars without a rating. | `src/components/ReviewCarousel.astro` | Generic. |
| **`Showreel` with no video** showed broken controls; now a poster-only still. | `src/components/Showreel.astro` | Generic. |
| **Contact form labels** were visually hidden (placeholder-only). Visible labels with required markers. | `src/pages/contact.astro` | Generic. |
| **Reduced-motion `scale` dropped by the CSS minifier** when combined with `transform` in one rule; split into separate rules. | `src/styles/global.css` (`has-anim` clip/mask) | Generic. |
| **Transform breaks a stretched link.** A transformed ancestor becomes the containing block for `after:inset-0`; nudge with margin instead. | `src/components/ccc/NewsList.astro` | Pattern note for all stretched-link cards. |
| **Breadcrumb JSON-LD URL** kept a trailing slash. | `src/pages/our-brands/[slug].astro` | Generic. |
| **Closed dropdown links stayed in the Tab order.** The desktop panel collapses visually but its links were still reachable by Tab after Esc or closing. Closed panels are now `hidden` once the close transition ends (a timer, cleared on reopen). | `src/components/menu/DropdownNav.astro` | Generic. |
| **Header crowded at 1024–1279px** once a menu item gets a dropdown caret. Logo `lg:w-36` (was `lg:w-40`) keeps at least 8px between items. | `src/components/Header.astro` | Logo widths depend on the logo's shape; check with `dropdown.cjs`. |

## 2. Spacing, typography and interaction (UI proposal and bold round)

| Change | Files | Strip |
|---|---|---|
| Section rhythm tokens `--spacing-section-*` (96 / 120 / 160) and `py-section` / `pt-section` / `pb-section`; SectionTitle gap 60 / 80 | `global.css`; every page and section component | Values are a theme choice. |
| Motion tokens `--duration-fast/base/slow`, `--reveal-distance`, `--zoom-image` | `global.css` | Generic. |
| Fluid type scale (`text-display`, `text-h1`, `text-h2`, `text-statement`, `text-h3`, `text-lead`, `text-body`, `text-eyebrow`), two heading weights, `max-w-measure` (34em), `text-wrap: balance / pretty` | `global.css`; components | Font names are CCC's (Source Serif 4, Inter). |
| Buttons: no label roll; quiet fill, 1px press; gold-outline ring with a sheen (`btn-gold-ring`) | `global.css`, `Button.astro`, `Header.astro` | The gold colours. |
| Line links: faint underline at rest, draw-in on hover, arrow nudge | `global.css` (`line-link`) | Generic. |
| Reveals: one calm fade-up; new `has-anim pop`, `clip` (photo unveil + settle), `mask` (text rises from behind its edge) | `global.css` | Generic. |
| Drawn hairlines `draw-x` / `draw-y`; gold hairlines `hairline-top`, `hairline-dark`, `hairline-bottom` | `global.css` | Colour tokens are CCC's. |
| `edge-ring` (inset gradient border with hover sheen) and `frame-ring` (draws itself clockwise on reveal, `@property --frame`) | `global.css` | Edge gradients `--edge-award/marketing/research` are CCC's. |
| Pull quote utility (`pull-quote`, `--pull-quote-size`, `--pull-quote-rule`) | `global.css` | Generic. |
| Navy paper texture (SVG turbulence, `--grain-image`, `bg-grain`), tuned to be only just visible | `global.css` | Tuned for navy #0B2545; retune per brand. |
| **Long-form reading text** (`content`): line height 1.75 (`--leading-body`), paragraph gap `--spacing-paragraph` (1.5rem), headings 3rem above and 1rem below (the theme's 15px gap applied to headings too, because `> *:not(:last-child)` outranks the heading rule) | `global.css` (`@utility content`) | Generic. |
| **`Facts` with text-only tiles:** empty labels aren't rendered (they left a gap); a `hero` or `impact` tile with no label and no value shows its statement alone, larger, at the top | `Facts.astro` | Generic. |
| **External cards and rows:** `BlogCard` items and `NewsList` rows take `external` (new tab, `rel="noopener"`, "(opens in a new tab)" for screen readers); `BlogCard` items take `datetime` for `<time>` | `BlogCard.astro`, `ccc/NewsList.astro` | Generic. |
| **Press releases as a data collection** (`file()` loader on a JSON file, a `getPressReleases()` helper, newest first) feeding both the card grid and the list | `src/content/data/press-releases.json`, `src/types/collections.ts`, `src/lib/content.ts` | The releases; the pattern is generic. |
| **`StackedServices` overlay:** a gradient scrim strongest behind the text, a soft shade behind the number, a masked blur behind the text only, replacing the flat frosted pane, so the photo shows | `StackedServices.astro` | Stops tuned for navy; measure with `cardcontrast.cjs`. |
| Card images: one radius, 3:2 ratio, 4% zoom on hover or focus | `PortfolioCard.astro`, `BlogCard.astro`, `PortfolioCarousel.astro` | Generic. |
| GradualBlur removed from Base | `Base.astro` | Theme decision. |
| Hero imagery behind the headline (photo or muted looping video, switchable; poster only with reduced motion; paused off screen; keyboard pause; `hero-scrim` overlay with `--scrim-*` strengths, contrast measured per pixel) | `src/pages/index.astro`, `global.css`, homepage schema `banner.background` | Media and scrim strengths. |
| `PageHeader` `hairline` prop; `Facts` `quote` prop; `WorkProcess` `columns`, `spacingClass`, optional `cta`; `BlogCard` `item` mode; `PortfolioCarousel` per-item `href`, `accent`, `logo`, `edge` | those components | Generic. |
| **Branded slider cards:** with `logo` and `edge`, a carousel slide becomes photo under a navy overlay, an inset gradient edge, the logo as the heading (sized by shape), role rising on hover | `PortfolioCard.astro`, `PortfolioCarousel.astro` | Generic pattern; brand values are CCC's. |
| Division / brand colour pattern: `brand.colors` keys → `--brand-*` → `@theme` tokens, with separate fill, mark-on-light and on-dark shades | `site.config.json`, `Base.astro`, `global.css` | The colours. |

## 3. New components and shared utilities

All in `src/components/ccc/` (move to `src/components/` in the theme). Each is documented in
THEME_CATALOG.md with its signature interaction, props and accessibility notes.

| Component | Signature | Strip |
|---|---|---|
| `StatRow` | Facts-style tiles; CounterUp; rule drawn with the count | — |
| `StepList` | Scroll-drawn spine (timeline or numbered steps) | — |
| `MediaSplit` | Photo unveil + parallax; heading mask; frosted statement pane | — |
| `FeatureGrid` | Rules draw in a wave; tiles on dark | — |
| `Callout` | Rule or frame draws on reveal | — |
| `Tabs` | WAI-ARIA tabs; gliding indicator; no-JS fallback | — |
| `ComparisonTable` | Header rule draws; row reveal; row bar; keyboard scroll region | — |
| `DownloadCards` | Arrow drops into its tray; `filename` | — |
| `NewsList` | Cursor-following photo preview | — |
| `CtaBand` | Frame draws itself around the band | — |
| `Statement` | Lights word by word with the scroll | — |
| `Breadcrumbs` | Crumb-by-crumb rise; drawn current rule; pair with BreadcrumbList JSON-LD | — |
| `AnniversarySeal` | — | **CCC-specific: don't backport.** |

Also: `src/dev-pages/component-lab.astro` (the lab page) as the theme's component showcase.

## 4. Build and tooling

| Item | Files | Strip |
|---|---|---|
| **Dev-only pages:** pages in `src/dev-pages/` routed only by `astro dev` (`dev-only-pages` integration, `devOnlyPages` list); never built. Content-collection pages filtered with `import.meta.env.DEV`. | `astro.config.mjs`, `src/pages/thank-you/[slug].astro` | The page list. |
| **Favicon from a monogram:** a tab-size SVG master plus a home-screen variant; `/favicon.ico` built from a dedicated small source (`brand.favicon.ico.source`) | `public/images/icons/`, `site.config.json` | The CCC artwork. |
| **QA scripts** (see `scripts/qa/README.md`); `axe-core` as a pinned dev dependency; `cardcontrast.cjs` judges large text at 3:1 and covers `StackedServices` cards; `labtest.cjs` skips the dev-only `DeviceSizeIndicator` | `scripts/qa/`, `package.json` | Page lists, selectors, brand names. |
| **THEME_CATALOG.md "Theme design language"** section | `THEME_CATALOG.md` | CCC-specific notes in the component entries. |
| **Dev server cache rule:** after a content schema change, restart dev with `.astro/data-store.json` deleted (the build's `astro sync --force` doesn't clear it) | `CLAUDE.md` | Put in the theme's docs. |
