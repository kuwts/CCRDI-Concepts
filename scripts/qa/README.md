# QA scripts

Browser checks used while building the site. Each takes the project folder and a base URL; run
them against `npx astro preview` (production build) or `npm run dev`. They use Playwright and
axe-core from this project's dev dependencies.

```bash
npm run build && npx astro preview --port 4331
node scripts/qa/stage.cjs "$PWD" http://localhost:4331 screenshots/check   # every page
PAGES=/,/contact node scripts/qa/stage.cjs "$PWD" http://localhost:4331 screenshots/check
```

| Script | What it checks |
|---|---|
| `i18n.cjs` | The English/French site (exits with "French disabled" while `i18n.languages.fr.enabled` is off in site.config.json): every page pair in `src/i18n/routes.json` at 1440 and 390: `html lang`, hreflang (x-default English), `og:locale`, the language switcher (header and mobile menu) going to the paired page, links staying in the page's language, no English interface labels on French pages, press releases marked `lang="en"`, the French contact form (French validation messages, `language` field, French thank-you page). |
| `frtypo.cjs` | French typography in `dist/fr` (exits with "French disabled" while French is off; no server needed: `node scripts/qa/frtypo.cjs "$PWD"`): non-breaking space before `:` and inside « », narrow non-breaking space before `;` `?` `!`, curly apostrophes; skips `lang="en"` passages and placeholders. |
| `stage.cjs` | Every page (English, and French while it's on) at 1440 and 390: full-page screenshot, sideways overflow, one H1, heading order, missing alt, console errors, axe (WCAG 2.1 A/AA). `PAGES` limits the pages. |
| `interact.cjs` | Navigation (skip link, current page, desktop links, mobile menu with Esc and focus return), sliders, showreels (autoplay, pause, dialog), logo walls (pause), contact form (labels, validation, error, thank-you), every internal link; at 1440 and 390, with and without reduced motion. |
| `labtest.cjs` | The component lab (/component-lab, dev only: run against `npm run dev`): tabs keyboard model, table scroll region, breadcrumbs, downloads, news preview, drawn lines, scroll-scrubbed timeline and statement, reduced motion, no-JS fallbacks, axe. |
| `dropdown.cjs` | The header dropdown menu: header fit and spacing at every width from 1024 to 1600; keyboard (Enter, Space, ArrowDown, Tab through and out, Esc with focus return), focus ring, closed links out of the Tab order; hover, click outside, link navigation and current page; touch on a tablet-width header; the mobile drawer submenu with mouse and touch; with and without reduced motion. |
| `drag.cjs` | The brand slider: mouse drags, long flings and touch swipes move exactly one slide and settle; a drag never opens a link; a click does. |
| `jitter.cjs` | The page holds still at every scroll position from 0 to 200px (the header pin twitch). |
| `herocontrast.cjs` | Worst-case contrast of every hero text line over the hero image or video frames and overlay. |
| `cardcontrast.cjs` | Worst-case text contrast on the brand cards, the Our Brands panels and every `StackedServices` photo card (large text at 3:1, the rest at 4.5:1). |
| `texture-contrast.cjs` | Pixel spread and worst-case text contrast of the navy texture. |
| `hlall.cjs` | Every gold hairline: colour and contrast against both sides. |
| `rhythm.cjs` | Section background order per page; flags two adjacent sections with the same background. |
| `measure.cjs` | Section padding, type sizes and line lengths on a page. |
| `shoot.cjs`, `clips.cjs`, `sheet.cjs` | Screenshots: full page at 1440 and 390, vertical crops, a contact sheet of a folder. |
| `logo-trim.cjs`, `logo-white.cjs` | Logo files: trim empty space (optionally reverse navy to white), and an all-white single-colour version. |

Page lists, selectors and brand names in these scripts are this site's; adjust them per project.
