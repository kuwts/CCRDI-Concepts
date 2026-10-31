# Obicol Theme Catalog

A reference to every component and page template in this Astro theme, and a guide to which pieces fit which kinds of sites.

**Stack:** Astro 7, Tailwind CSS 4 (with `tailwind-bootstrap-grid` for `row` / `col-*`, and `@tailwindcss/typography` for `prose` on long-form pages), Swiper 14 (the two carousels only), `astro-icon` (Hugeicons), `astro-embed`. No UI framework: every interactive piece is an `.astro` component with a small vanilla script, so pages ship almost no JavaScript.
**Look:** dark base (`dark` #001213) with white and light-gray content bands, green accent (`primary` #00b75f), Space Grotesk, square corners throughout. All brand settings live in `site.config.json`; see [Rebranding](#rebranding).
**Content:** page copy lives in `src/content/*/index.mdx` front matter; repeatable data lives in `src/content/data/*.json` and the `blog`, `portfolio`, `jobs`, `pages` and `thankYou` collections. Schemas are in [src/types/collections.ts](src/types/collections.ts). To collect copy from a client, send them [CONTENT_TEMPLATE.md](CONTENT_TEMPLATE.md), organized to match this catalog's page types and sections.

---

## Contents

1. [How to read this catalog](#how-to-read-this-catalog)
2. [Shared animation systems](#shared-animation-systems)
3. [Theme design language](#theme-design-language)
4. [Component quick reference](#component-quick-reference)
5. [Components in detail](#components-in-detail)
6. [Page templates](#page-templates)
7. [Rebranding](#rebranding)
8. [SEO](#seo)
9. [Best uses by site type](#best-uses-by-site-type)

---

## How to read this catalog

**Visual weight** describes how much a component dominates the page and how much it costs to run:

| Weight | Meaning |
| --- | --- |
| **Light** | Text-level or small UI. Little or no motion. Safe to use anywhere. |
| **Medium** | A full section or card with imagery or modest motion. Pair with calmer sections. |
| **Heavy** | Fills the viewport, plays large media, or runs scroll-linked or continuous JS animation. Use one or two per page. |

**Backgrounds:** most components are designed for one background. "Dark" means the page's default `#001213`; "light" means `bg-white`, `bg-light` (`#fafafa`) or `bg-gray-100`.

**Multiple copies:** every component works when used more than once on the same page; each copy runs its own script.

**Accessibility baseline:** every interactive piece works with a keyboard (visible `:focus-visible` ring, Esc closes menus and dialogs, focus moves into dialogs and back out), closed panels are `inert`, decorative images and glyphs are hidden from screen readers, moving content pauses (see below), and text colors meet WCAG AA contrast on the theme's backgrounds. Keep these when adding components.

---

## Shared animation systems

These are defined once and reused across many components. Component entries refer to them by name.

| Name | Where it's defined | What it does |
| --- | --- | --- |
| **Scroll reveal** (`has-anim`) | `@utility has-anim` in [src/styles/global.css](src/styles/global.css); observer in [src/layouts/Base.astro](src/layouts/Base.astro) | Element starts transparent and `--reveal-distance` (12px) lower, then fades and rises in over `--duration-slow` (700ms) when it enters the viewport (IntersectionObserver, bottom margin −15%). Runs once. Only `opacity`/`transform` change, so unrevealed content is still read by screen readers, found by find-in-page and printed. (CCC: the theme's 25px rise with a 99% scale, over 400ms, was calmed in the UI proposal.) |
| **Scroll reveal, fade** (`has-anim fade`) | same | Kept as an alias of the default reveal. |
| **Scroll reveal, pop** (`has-anim pop`) | same | CCC: fades and scales in place (0.9 → 1 over 0.9s); the anniversary seal. |
| **Scroll reveal, clip** (`has-anim clip`) | same | CCC: a photo frame unveils upward (`clip-path`, 1.1s) while the `<img>` inside settles from 1.12 to 1 (1.4s), like a camera coming to rest. Used by `MediaSplit`. |
| **Scroll reveal, mask** (`has-anim mask`) | same | CCC: the wrapper clips and stays put; its children rise from behind its edge (105% → 0, 0.9s), as the theme's portfolio grid titles do. For headings and eyebrows. |
| **Drawn hairlines** (`draw-x`, `draw-y`) | `@utility draw-x` / `draw-y` in global.css | CCC: a hairline scales in (1.2s, `ease-theme`, `--draw-delay`) when its revealed ancestor appears. StatRow, FeatureGrid, Callout, ComparisonTable, CtaBand (split), Breadcrumbs. |
| **Edge ring / frame ring** (`edge-ring`, `frame-ring`) | global.css | CCC: a 1px inset gradient border (`--edge`, `--edge-inset`) with a slow sheen on `.group` hover; `frame-ring` draws it clockwise from the top centre on reveal (`--frame` 0 → 360deg). Brand cards, Callout (navy), CtaBand. |
| **Stagger** (`delay-*`, `animDelay[i]`) | [src/utils/animDelay.ts](src/utils/animDelay.ts) | Adds 0–500ms transition delays by item index. All delays are switched off below the `md` breakpoint. |
| **Motion curve** (`ease-theme`) | `--ease-theme` in the `@theme` block of global.css | The theme's one easing curve, `cubic-bezier(.2,1,.2,1)`, for every movement and hover effect (reveals, buttons, links, menus, carousels, the showreel zoom). Use `ease-theme` / `var(--ease-theme)`; plain `ease-out` only for small opacity fades. |
| **Buttons** (`btn`, `btn-white`, `btn-black`) | `@utility btn` / `btn-gold-ring` in global.css | CCC: gold-outline buttons; on hover or focus a quiet fill and a slow sheen across the border (1.6s), and a 1px press. (The theme's label roll was removed in the UI proposal.) Long labels wrap. |
| **Line-link wipe** (`line-link`) | `@utility line-link` in global.css | A faint gold underline at rest; on hover or keyboard focus a full gold underline draws in from the left (250ms) and the arrow nudges 2px. |
| **Scroll-scrubbed effects** | `StackedServices` (cards), `StepList` (CCC timeline), `MediaSplit` (CCC parallax) | Driven by the scroll position in a `requestAnimationFrame` loop (passive scroll listener, recomputed on resize), not by timers, so they track the reader's pace. Off with reduced motion. |
| **Pause control** (`PauseButton`) | [src/components/PauseButton.astro](src/components/PauseButton.astro) | Moving content (logo wall, team marquee, autoplaying videos) only moves while it's on screen and the tab is visible, pauses on hover, and has a "Pause …" button that appears when it gets keyboard focus (WCAG 2.2.2). |

> **Reduced motion and no JavaScript:** with "reduce motion" turned on, `has-anim` content (all variants) appears in place with no movement, and smooth scrolling is off. Without JavaScript, a `<noscript>` style in Base.astro shows it. `StackedServices`, the Services page's card deck, `TeamGroupCarousel`, `Clients`, `Showreel`, `CounterUp`, `DropdownNav`, `Faq`, the pricing count and `ReviewCarousel`'s video cards also respect reduced motion (details in each entry). Hover effects and slider transitions still animate.

---

## Theme design language

How the theme's best components are built, so new ones can be designed in the same language. Read with the [Shared animation systems](#shared-animation-systems) above.

### The idea behind each signature component

Every premium component has **one physical idea**, carried out with restraint: one thing moves, it moves on the theme's curve, and the rest of the component stays still and legible.

| Component | Signature idea | Why it feels premium |
| --- | --- | --- |
| **StackedServices** | Sticky cards stack as you scroll; each covered card scales down by depth (`1.1 - 0.1 × depth`), scrubbed by the scroll (a `requestAnimationFrame` loop), not on a timer. Each card is a photo seen through a frosted navy pane (`bg-dark/75 backdrop-blur-2xl`) inset by a 16px photo frame (`p-4`). | Physical depth that follows the reader's own pace; the frame-within-a-frame gives each card a printed, mounted quality. |
| **WorkProcess** | Tall translucent tiles with a large decorative glyph (✳ ✺ ✲ ❋, `text-6xl`), the title, then a long gap (`mb-24`) before the text at the foot: vertical tension. Staggered reveal; a CTA strip under a faint divider (`border-white/5`) with an overlapping avatar stack. | Generous negative space inside each tile, ornament used once and large, quiet reveals. |
| **Facts** | A 12-column bento: tiles of different spans (8/4, 6/6, 7/5) in translucent white on navy (`bg-white/3`, square corners, no border), uppercase tracked labels, numbers that count up (`CounterUp`) and staggered reveals (100–400ms). | Asymmetry and varied tile sizes read as editorial, not templated; the counters add life to static facts. |
| **PortfolioCarousel / PortfolioCard** | A centred, looping slider with wide gaps and a thin progress bar (3px × 330px) between "01" and the total; text Prev / Next. On hover a card's image zooms, a full colour wash (95%) floods it, and the title and category rise in after 200ms. The grid variant uses a **mask reveal**: the category drops from above and the title rises from below, each inside an `overflow-hidden` line (700ms). | A single, confident hover moment; typography that appears from behind an edge instead of fading. |
| **ReviewCarousel** | A free-scrolling drag slider (`cursor-grab`, free mode, mouse-wheel) of white `rounded-card` tiles on ivory, `min-h-90`; a summary tile with an oversized number (`text-8xl text-black/40`); video cards autoplay muted under a gradient. | Tactile drag, big quiet numerals, and content-first cards with no chrome. |
| **Showreel** | A custom "Play" pill follows the cursor (scales in from 0 over 0.2s); clicking expands the video into a fullscreen dialog with a FLIP animation (0.5s, `ease-theme`); the close button rotates 90° on hover. | The interface responds to the hand; the expansion keeps the reader oriented. |
| **Homepage hero** | Cascading fade-ups (eyebrow → H1 → actions → lead: 0 / 100 / 150ms), a scattered-dot shape at low opacity behind, an overlapping avatar stack (`-ml-4`) with hover tooltips, and a seal stamped across the hero's edge. | Layers that overlap section boundaries make the page feel composed rather than stacked. |
| **Clients** | Logos cycle per column: each enters from 10% below with a blur (8px → 0, 0.5s, `ease-theme`) and leaves upward with a blur (0.3s, `ease-in`), columns offset in time. Pauses on hover, focus and off screen. | Motion with focus-pull (blur) feels photographic, not mechanical. |
| **Case-study layout** | An eyebrow + H1, a wide feature image that overlaps the next section (`-mb-12`), then a 4/7 split: a sidebar of facts, each revealed 100ms after the last (inline delays), with "~ " list markers, beside a long-form body. "What's next" sits under a faint rule (`border-black/5`). | Asymmetric columns and overlap; the sidebar reads like a printed spec sheet. |
| **BlogCard** | Featured horizontal card (6/6) and grid cards; uppercase chip (`bg-dark/5`, 13px, tracked); the arrow nudges up-right on hover. (Theme: the image panned by switching `transform-origin`; CCC: a 4% zoom.) | Small, precise hover details; consistent chip and arrow language. |

### Cards and tiles

- **On navy:** translucent white tiles with no border and **square corners**: `bg-white/3` (Facts), `bg-white/5` (WorkProcess). Over photos, the frosted pane `bg-dark/75 backdrop-blur-2xl` with `rounded-lg`, inset in a `rounded-card` photo frame by `p-4`.
- **On ivory:** white tiles, `rounded-card` (12px), no border, no shadow (ReviewCarousel). Pills: `rounded-full`, `border-dark/10`, `bg-white`, `px-5 py-2`.
- **Padding:** `p-8 md:p-10` for content tiles; `p-6 md:p-7` for denser cards; `px-8 py-8` for tall process tiles.
- **Shadows:** almost none. Only tooltips (`shadow-xl`) and the seal (`drop-shadow-xl`). Depth comes from translucency, overlap and scale, not shadows.
- **Heights:** tiles are tall and let space breathe (`min-h-90` reviews, `h-95` stacked cards, `mb-24` inside process tiles); content sits at the foot with `mt-auto`.

### Typography inside components

- **Labels:** uppercase, tracked, 13px (`uppercase tracking-widest text-[13px]`, Facts), or the CCC `text-eyebrow` (13px, 0.08em, gold).
- **Numbering:** two-digit indices ("01", `text-4xl` in StackedServices' top-right corner; "01 / 03" around the slider's progress bar).
- **Ornament:** one large glyph per tile (✳ ✺ ✲ ❋), "~ " list markers, a "———" dash rule (`tracking-[-3px]`).
- **Numbers:** large Inter semibold (`text-3xl md:text-5xl`, Facts); oversized quiet numerals (`text-8xl text-black/40`, reviews).
- **Headings in components:** CCC `text-h3` (serif, 600) for card titles; section titles through `SectionTitle` (`text-h2`).
- **Body in tiles:** `text-sm`/`text-[15px]`, `leading-relaxed`, white at 70–80% on navy.

### Animation

- **What animates:** one primary element per component (the stack, the wash, the count, the logo) plus staggered reveals. Body text only fades up; it is never scrubbed or masked.
- **Reveals:** `has-anim` (12px rise, 700ms), `fade`, `pop`, `clip` and `mask` (above). Stagger with `animDelay[i]` (100ms steps) or inline `transition-delay` (sidebar facts); no delays below `md`.
- **Scroll-driven:** a `requestAnimationFrame` loop on a passive scroll listener, recomputed on resize; the value is written to a CSS variable or a transform. Scrubbed effects track the reader both ways (StackedServices); reveals run once (and a drawn line stays drawn).
- **Durations:** feedback 150–250ms; hover reveals 300ms (+200ms delay for text after a wash); image zoom and mask reveals 700–900ms; counters 1.5s linear; slow sheens 1.6s.
- **Easing:** `ease-theme` (`cubic-bezier(.2,1,.2,1)`) for everything that moves; `ease-in` only for exits (logo blur out); linear for counters.
- **Always:** moving content runs only on screen, pauses on hover and focus, and has a `PauseButton`; reduced motion shows the final state with no movement.

### Hover, focus, images and dividers

- **Hover = focus:** every hover effect also runs on keyboard focus (`group-focus-within`), and the gold-and-navy focus ring is always visible.
- **Hover moments:** image zoom (`--zoom-image`, 4%), full colour wash with text rising after 200ms, arrow nudge (2px), underline draw, close button rotation. Nothing hovers that can't be clicked.
- **Images:** `rounded-card` crops at fixed ratios (3:2 cards, 16:9 feature, 4:3 or 4:5 splits), photos under navy panes or washes, frames that overlap section edges.
- **Dividers:** faint (`border-white/5` on navy, `border-black/5` on white) inside components; CCC gold hairlines (`hairline-top`, 1px) only between sections.

### Layout patterns

- **Asymmetry:** 8/4 (homepage intro beside the card stack), 4/7 (case study), 6/6 (featured blog), bento spans (Facts), 7/4 offset (CCC MediaSplit).
- **Sticky beside scrolling:** a sticky text column beside a scrolling column of cards (homepage intro).
- **Overlap:** feature images over the next section (`-mb-12`), the seal across an edge, avatar stacks, frosted panes over photos.
- **Dark vs light:** navy sections use translucent tiles, white text at 70–100% and faint white dividers; light sections use white tiles on ivory (or ivory on white), navy text and gold accents. A section title sits centred above; content blocks align to the grid.

---

## Component quick reference

| Component | Purpose | Weight | Used on |
| --- | --- | --- | --- |
| [Header](#header) | Navigation bar + mobile drawer | Medium | All pages |
| [DropdownNav](#dropdownnav) | Desktop dropdown menus | Light | All pages (via Header) |
| [Footer](#footer) | Footer CTA, contact, links | Medium | All pages |
| [ScrollProgress](#scrollprogress) | Back-to-top with progress ring | Light | All pages |
| [GradualBlur](#gradualblur) | Blur fade at the bottom edge of the screen (CSS only) | Light | All pages |
| [DeviceSizeIndicator](#devicesizeindicator) | Breakpoint badge (dev only) | — | All pages (dev only) |
| [PageHeader](#pageheader) | Inner-page hero / title band | Light | 12 page templates |
| [BannerShape](#bannershape) | Decorative hero background shape | Light | Home |
| [BannerTestimonial](#bannertestimonial) | Hero social proof (avatar stack) | Light | Home |
| [Showreel](#showreel) | Hero video with fullscreen player | Heavy | Home |
| [StackedServices](#stackedservices) | Services / features as sticky stacking cards | Heavy | Home |
| [WorkProcess](#workprocess) | Process steps + CTA strip | Medium | Home |
| [Facts](#facts) | Stats / about bento grid | Heavy | About, Services |
| [CounterUp](#counterup) | Animated number | Light | About, Services (via Facts) |
| [Clients](#clients) | Logo wall with cycling logos | Medium | Home, About, Services |
| [ReviewCarousel](#reviewcarousel) | Testimonials slider (text + video) | Heavy | Home, About, Services |
| [TeamGroupCarousel](#teamgroupcarousel) | Team photo marquee | Medium | About |
| [PortfolioCarousel](#portfoliocarousel) | Featured projects slider | Heavy | Home |
| [PortfolioCard](#portfoliocard) | Project tile with hover reveal | Medium | Home, Portfolio, Portfolio detail |
| [BlogCard](#blogcard) | Blog post card | Medium | Home, Blog, Blog Horizontal, Blog detail |
| [SectionTitle](#sectiontitle) | Section eyebrow + heading | Light | Home, About, Services, Team, Pricing |
| [Button](#button) | Primary button / link button | Light | Most pages |
| [LineLink](#linelink) | Text link with animated underline | Light | Home, Contact, Job, Portfolio detail, Style Guide, Footer |
| [Faq](#faq) | Accordion (FAQ) | Light | FAQ, Pricing, Style Guide |
| [TeamGrid](#teamgrid) | Team member cards | Light | About, Team |
| [LoadMore](#loadmore) | "+" load-more button | Light | Blog, Blog Horizontal, Portfolio |
| [PauseButton](#pausebutton) | Keyboard pause control for moving content | — | Inside Clients, TeamGroupCarousel, ReviewCarousel, Showreel |
| [AnniversarySeal](#anniversaryseal) | CCC 40th anniversary seal (SVG) | Light | Home (hero), Footer (all pages) |
| [StatRow](#statrow) | Key facts as tiles; count-up and drawn rules | Light | Component lab only (not yet used on pages) |
| [StepList](#steplist) | Vertical steps or a dated timeline | Light | Component lab only |
| [FeatureGrid](#featuregrid) | Icon features / services / values | Light | Component lab only |
| [Callout](#callout) | Notice or note panel | Light | Component lab only |
| [Tabs](#tabs) | Accessible tabs | Medium | Component lab only |
| [ComparisonTable](#comparisontable) | Comparison table with a scroll region | Medium | Component lab only |
| [DownloadCards](#downloadcards) | Media kit / resource downloads | Light | Component lab only |
| [NewsList](#newslist) | News or press releases as a list | Light | Component lab only |
| [CtaBand](#ctaband) | Call-to-action band (navy, ivory, split) | Medium | Component lab only |
| [MediaSplit](#mediasplit) | Photo beside text (left / right) | Medium | Component lab only |
| [Statement](#statement) | One framework statement, centred pull quote | Medium | Component lab only |
| [Breadcrumbs](#breadcrumbs) | Page trail | Light | Component lab only |
| [AstroImage](#astroimage) | Image helper | — | Everywhere |
| [AstroVideo](#astrovideo) | Video helper | — | Home, About, Services (via Showreel / ReviewCarousel) |

---

## Components in detail

### Layout and site chrome

#### Base layout

- **File:** [src/layouts/Base.astro](src/layouts/Base.astro)
- **For:** the page shell. Every page uses it. It renders `<head>` SEO/OG tags, then a "Skip to content" link (visible on keyboard focus), `ScrollProgress`, `DeviceSizeIndicator`, `Header`, `<main id="main">`, `Footer`, and a page-level `GradualBlur`.
- **Props:** `title?` (shown as `"{title} | {brand.name}"`; omit for the site default `seo.title`), `description?`, `image?` (social share image), `noindex?`, `canonical?` (defaults to the page's own URL), `type?` (`website` | `article`). Also a named `head` slot. See [SEO](#seo).
- **Also outputs:** `<html lang>` from `site.config.json` → `locale.lang`, the brand color variables, the brand font, the favicon set (SVG, 32×32 PNG, Apple touch icon), the web manifest link, `theme-color`, `<meta name="author">` (only when `seo.author` is set), and Organization JSON-LD on the homepage.
- **Animations:** holds the global scripts for scroll reveal, header hide/shrink on scroll (passive, once per frame; the header stays visible while it has keyboard focus), scroll-progress ring, mobile drawer and mobile submenu accordions.
- **Visual weight:** n/a (wrapper).

#### Header

- **File:** [src/components/Header.astro](src/components/Header.astro)
- **For:** navigation. A sticky dark top bar with logo, desktop menu, a header button and a hamburger; below `lg` a slide-in drawer.
- **Props:** none. Reads `menu.main` from [src/config/menu.json](src/config/menu.json) and `logo` / `headerButton` from [src/config/site.config.json](src/config/site.config.json).
- **Variants:** desktop (≥ `lg`, uses `DropdownNav`) and mobile drawer (< `lg`, submenus become accordions). Active page and active section are highlighted automatically (`aria-current="page"` on the current link).
- **Animations:** hides when you scroll down past 300px and comes back when you scroll up; padding shrinks after 100px; drawer slides in from the right over a blurred dim overlay; mobile submenus open with a height animation and the caret rotates; the header button uses the button text roll.
- **Accessibility:** the logo loads eagerly. The hamburger has `aria-expanded` / `aria-controls`. The closed drawer is `inert` and hidden, so its links can't be tabbed to; opening it moves focus to "Close", Tab stays inside it, Esc or the overlay closes it and focus returns to the hamburger. Closed accordions are `inert` too.
- **Visual weight:** Medium.
- **Used on:** all pages (via Base).
- **Notes:** the header button is the site's main action: `headerButton` (`label`, `url`; default "Contact Us" → `/contact`). Full `http(s)` URLs open in a new tab.
- **Language switcher (CCC, bilingual):** a link to the same page in the other language (`src/i18n/routes.json`), beside the header button: compact "FR" / "EN" with the full name for screen readers ("FR – Français", so the accessible name contains the visible text), and the full name ("Français" / "English") in the drawer above the button. The link carries the other language's `lang` and `hreflang`. Menus, logo link, header button and labels follow the page's language. Header fit is tight at `lg`: nav items `px-2.5` (was `px-3`), switcher–button gap 12px; check every width with a header-fit script after changing labels.
- **Short button label at `lg`:** `headerButton.shortLabel` (optional) replaces the label at 1024–1279px only (French: "Entreprises de confiance"); two spans, one displayed per width (`xl:hidden!` / `hidden! xl:block!`, important because `btn` sets `display: block` on its spans), so the accessible name is always the visible text. French pages also tighten the bar at `lg` (nav `px-2`, button `--btn-px: 16px`, switcher gap 8px; 12px at `xl`).

#### DropdownNav

- **File:** [src/components/menu/DropdownNav.astro](src/components/menu/DropdownNav.astro) (vanilla script, no framework)
- **For:** desktop dropdown menus.
- **Props:** `items: { name, url, children?: { name, url }[] }[]`, `currentPath: string`.
- **Animations:** a single white panel with a pointer arrow slides sideways to follow the hovered item; its height animates between menus of different lengths; child links fade up with a 40ms stagger; the other top-level items dim to 50%. Reduced motion: no animation.
- **Keyboard and touch:** items with children are buttons (`aria-expanded`, `aria-controls`). Hover opens a menu; click, Enter, Space or Arrow Down open it and keep it open. Tab goes from the button into its links, and from the last link on to the next item. Esc closes and returns focus to the button; clicking outside or tabbing away closes it. A closed menu's links are `hidden` once the close transition ends, so Tab skips them.
- **Visual weight:** Light.
- **Used on:** all pages (inside Header).
- **Notes:** a parent item's `url` isn't used (it's a button); give it `"#"` in `menu.json`, or repeat the parent page as the first child (CCC: "Our Brands" lists /our-brands first, then the three brand pages).

#### Footer

- **File:** [src/components/Footer.astro](src/components/Footer.astro)
- **For:** footer CTA, contact details, link columns, social links and copyright.
- **Props:** none. Reads `footer`, `logo`, `author` from site config; `menu.footer.col1–col3`; [src/config/social.json](src/config/social.json).
- **Layout:** large "Have an idea…" heading (`h2`) with a green arrow link → email (as a LineLink) + phone + two address lines → three link columns → copyright + social links → oversized logo watermark at 5% opacity bleeding off the bottom (hidden from screen readers).
- **Animations:** scroll reveal (fade) with small staggers; line-link wipe on the email; underline fade on links.
- **Visual weight:** Medium.
- **Used on:** all pages (via Base).
- **Notes:** links have 28px tap targets. The copyright line reads "Copyright © {year} {brand.name}."; set `author.name` (and optionally `author.url`) in site config to add "Developed by …".

#### ScrollProgress

- **File:** [src/components/ScrollProgress.astro](src/components/ScrollProgress.astro)
- **For:** back-to-top button.
- **Props:** none. Behavior is in Base.astro.
- **Animations:** fixed bottom-right circle appears after 50px of scroll; an SVG ring fills in step with scroll position; the arrow nudges up on hover; click smooth-scrolls to top. Uses `mix-blend-mode: difference` so it shows on light and dark sections.
- **Visual weight:** Light.
- **Used on:** all pages (via Base).

#### GradualBlur

- **File:** [src/components/GradualBlur.astro](src/components/GradualBlur.astro) (CSS only; the layers are worked out at build time)
- **For:** a stepped backdrop blur along an edge. Base uses it as a fixed blur strip at the bottom of the viewport (`target="page"`, 6rem, strength 2, 5 layers, bezier curve, exponential).
- **Props:** `position` (`top|bottom|left|right`), `strength`, `height`, `width`, `divCount`, `exponential`, `curve` (`linear|bezier|ease-in|ease-out|ease-in-out`), `opacity`, `zIndex`, `target` (`parent|page`), `preset`, `class`.
- **Variants (`preset`):** `top`, `bottom`, `left`, `right`, `subtle`, `intense`, `smooth`, `sharp`, `header`, `footer`, `sidebar`, `page-header`, `page-footer`.
- **Animations:** none (static).
- **Visual weight:** Light to the eye. Note that a full-width fixed `backdrop-filter` has a GPU cost on low-end phones.
- **Used on:** all pages (via Base).

#### DeviceSizeIndicator

- **File:** [src/components/helper/DeviceSizeIndicator.astro](src/components/helper/DeviceSizeIndicator.astro)
- **For:** a colored badge in the top-left showing the active Tailwind breakpoint. Development only, not rendered in production builds.
- **Props:** none. **Animations:** none.

### Heroes and page headers

#### PageHeader

- **File:** [src/components/PageHeader.astro](src/components/PageHeader.astro)
- **For:** hero / title band for inner pages: a small eyebrow line and a large heading on the dark background.
- **Props:** `subtitle: string`, `title: string` (rendered as HTML, so `<br/>` and emoji work), `align?: 'left' | 'center'` (default `left`), `dot?: boolean` (adds a green period; default `false`), `colClass?: string` (default `lg:col-10`).
- **Animations:** scroll reveal (fade); heading delayed 100ms.
- **Visual weight:** Light.
- **Used on:** About, Services, Team, Pricing, Contact, FAQ, Privacy, Style Guide, Blog, Blog Horizontal, Portfolio, Thank-you.
- **Notes:** the heading is the page's `<h1>`, so don't add another `<h1>` on pages that use it. Section headings below it start at `h2`. Long words break instead of overflowing.

#### BannerShape

- **File:** [src/components/BannerShape.astro](src/components/BannerShape.astro)
- **For:** a decorative scatter-dot blob behind the home hero (absolute, behind content, 20% opacity, 30% on mobile).
- **Props:** none. The color comes from the `shape` token in global.css (`--color-shape`), via `currentColor`. Hidden from screen readers.
- **Animations:** none.
- **Visual weight:** Light.
- **Used on:** Home.
- **Notes:** needs a `relative` parent.

#### BannerTestimonial

- **File:** [src/components/BannerTestimonial.astro](src/components/BannerTestimonial.astro)
- **For:** social proof in a hero, e.g. "Loved by 550+ Founders" next to overlapping round avatars.
- **Props:** `proof: { label, avatars: { image, name, role, social: { icon, url } }[] }`, `class?`.
- **Animations:** hovering an avatar (or tabbing to its social link) raises it, lightens its border and fades in a white tooltip card with name, role and a social icon link.
- **Visual weight:** Light.
- **Used on:** Home.
- **Notes:** the link's label names the network from its URL ("Sarah Lindgren on X"); `social.icon` is optional and defaults to that network's icon. The avatar border uses the `avatar-ring` token.

#### Showreel

- **File:** [src/components/Showreel.astro](src/components/Showreel.astro)
- **For:** a full-width hero video that expands into a fullscreen player.
- **Props:** `src: string` (video path), `sources?: string[]` (other formats of the same video, e.g. an `.mp4` fallback for a `.webm`), `poster?: string` (resized and served as WebP), `class?: string`.
- **Animations:** autoplays muted and looping while at least 40% visible and the tab is visible, then pauses and resets to the poster. Over the video the system cursor is hidden and a green "▶ Play" pill (dark text) follows the mouse. Click → the video FLIP-animates into a dark fullscreen overlay with sound. Close with ×, the backdrop or Esc → FLIP back. With reduced motion: no inline autoplay (the poster shows) and no zoom animation; clicking still opens the player, and closing returns to the poster.
- **Keyboard:** a "Play showreel" button appears on focus and opens the player; the player is a dialog (`inert` while closed) with focus on ×, and focus returns to the button on close. A "Pause showreel" button (shown on focus) stops the inline loop.
- **Visual weight:** Heavy.
- **Used on:** Home.
- **Notes:** uses `cursor-none`; on touch screens there is no hover cursor, but tapping still opens the player. Right-click works as normal. Keep the files small: the demo reel is 720p, about 2 MB per format.

### Content sections

#### StackedServices

- **File:** [src/components/StackedServices.astro](src/components/StackedServices.astro)
- **For:** services or features shown as cards that stick and pile up as you scroll.
- **Props:** `services: { icon, title, info, meta?, image? }[]`, `withDramaEffect?: boolean` (default `true`), `stackOffset?: number` (px between stacked edges, default `5`), `paneGap?: string | false` (Tailwind gap class, default `gap-2`), `scrollRunway?: string` (extra scroll space after the last card, default `'0px'`), `class?: string`.
- **Card design:** a background photo with a frosted dark glass panel (`backdrop-blur-2xl`) holding a 01/02/… index, an icon, title, text and meta line.
- **Variants:** with or without the "drama" effect (scaling).
- **Animations:** cards are `position: sticky` and pile on top of one another; with the drama effect, covered cards shrink step by step, driven by scroll in `requestAnimationFrame`; inner panels use scroll reveal. Respects `prefers-reduced-motion`.
- **Visual weight:** Heavy.
- **Used on:** Home (right-hand column of the intro section); CCC: For Businesses (the benefits, beside "Why Consumer Choice") and the brand pages.
- **Notes:** sticky `top` values assume the header height. A card without an `image` shows on the dark background. The photo and icon are decorative (`alt=""`); the title carries the meaning. Overlay (CCC): a navy gradient strongest at the foot behind the text (92% → 86% at half height → 45% at the top), a soft shade behind the card number, and a blur only behind the text, fading out above it, so the photo shows through; all text measured at 4.5:1 or better (`scripts/qa/cardcontrast.cjs`). The theme's version is a flat frosted `bg-dark/60` pane.

#### WorkProcess

- **File:** [src/components/WorkProcess.astro](src/components/WorkProcess.astro)
- **For:** a "how we work" section: four numbered steps followed by a CTA strip.
- **Props:** `subtitle: string`, `title: string`, `steps: { heading, text }[]`, `cta: { title, images: string[], button: { label, href } }`.
- **Layout:** a complete dark `<section>`: a centered SectionTitle, four tall translucent cards with decorative glyphs (✳ ✺ ✲ ❋, hidden from screen readers), then a divider and a strip with an avatar stack, a line of text and a white `LineLink` with an arrow (the page's main `Button` stays in the hero).
- **Animations:** scroll reveal with per-card stagger; line-link wipe.
- **Visual weight:** Medium.
- **Used on:** Home.
- **Notes:** the layout is built for four steps (four columns); more steps wrap onto a new row, and the four glyphs repeat in order. Dark background only.

#### Facts

- **File:** [src/components/Facts.astro](src/components/Facts.astro)
- **For:** a stats / "about us in numbers" bento grid.
- **Props:** `facts`: the `facts` block of the `about` entry (typed from the collection): `image`, `image_alt` (empty = decorative), `title` (markdown: `_x_` renders as a large glyph, `**x**` as a heading), `hero { label, value, description }`, `philosophy { label, title, description }`, `impact { label, value, description }`, `stats: { value, label }[]`.
- **Layout:** an image + intro tile, a philosophy quote tile, a big-number tile, three small stat tiles and a big impact-number tile, all translucent on dark. Tiles reorder across breakpoints.
- **Animations:** scroll reveal (fade) with staggered delays; every number counts up with `CounterUp`.
- **Visual weight:** Heavy.
- **Used on:** About, Services.
- **Notes:** a complete `<section>`. Dark background only. Built for three `stats`. An empty `label` isn't rendered; a `hero` or `impact` tile with no label and no value shows its `description` alone, larger and at the top (CCC Our Brands: the lead message as a `quote`, then two confirmed facts).

#### Faq

- **File:** [src/components/Faq.astro](src/components/Faq.astro)
- **For:** an FAQ accordion, grouped under subheadings.
- **Props:** `groups: { title, items: { question, answer }[] }[]` (`answer` is an HTML string), `headingLevel?: 'h2' | 'h3'` for the group titles (default `h2`; use `h3` under a section heading, as on Pricing).
- **Animations:** answers open with a smooth height transition (`grid-template-rows` 0fr → 1fr) and the + icon rotates into ×; opening one item closes the others in the same accordion; each item uses scroll reveal (fade). Reduced motion: no transition.
- **Accessibility:** toggles have `aria-expanded` / `aria-controls`; closed answers are `inert`, so links inside them can't be tabbed to.
- **Visual weight:** Light.
- **Used on:** FAQ, Pricing, Style Guide.
- **Notes:** light background only. Answers are injected as raw HTML, so use trusted content only. Renders nothing with no groups.

### Social proof and media

#### Clients

- **File:** [src/components/Clients.astro](src/components/Clients.astro)
- **For:** a client / partner / sponsor logo wall.
- **Props:** `items: { name, logo }[]`, `columnCount?: number` (default `5`), `class?: string`.
- **Variants:** two data sets: [clients.json](src/content/data/clients.json) (light logos for dark backgrounds) and [clients-dark.json](src/content/data/clients-dark.json) (dark logos for light backgrounds).
- **Animations:** each column shows one logo at a time and swaps every 2s, columns offset by 250ms. Incoming logos rise and de-blur (`ease-theme`); outgoing logos lift and blur out. The wrapper uses scroll reveal (fade). With reduced motion there's no cycling: each column lists its logos, so every client shows once.
- **Visual weight:** Medium.
- **Used on:** Home (dark logos on gray), About and Services (light logos on dark).
- **Notes:** the order is shuffled at build time and short columns are padded with random repeats (hidden from screen readers). There are never more columns than logos, and no logos means no wall. The cycling only runs while the wall is on screen and the tab is visible; it pauses on hover and has a "Pause logo animation" button on keyboard focus.

#### ReviewCarousel

- **File:** [src/components/ReviewCarousel.astro](src/components/ReviewCarousel.astro)
- **For:** testimonials. Text reviews and video reviews in one draggable slider.
- **Props:** `items: { review, author, role?, company?, rating?, date?, social?, media? }[]`, `testimonials: { total_rating?, total_reviews?, top_companies?: { name, logo }[] }`, `light?: boolean` (white pagination dots for dark sections; default `false`).
- **Slide types:**
  - **Summary card** (first, when any of `total_rating`, `total_reviews` or `top_companies` is set): a big rating number, five stars, the review count and inverted company logos.
  - **Video card** (when `media` ends in .mp4/.webm/.mov/.ogv): a muted, looping background video with name, company, social link, a play button, a star rating and a date.
  - **Text card** (otherwise): the quote, a round avatar (`media`, optional), name, role or company, and a social link.
- **Animations:** Swiper free-mode drag and mousewheel; 1.1 → 3.5 slides visible as the screen widens; dynamic pagination bullets; play button grows on hover; the video modal fades in; the close button rotates on hover.
- **Video cards:** the background videos don't preload; they only play while the carousel is on screen and the tab is visible, pause on hover and keyboard focus, have a "Pause testimonial videos" button on focus, and never autoplay with reduced motion. Keep clips short and small (the demo ones are 720p, under 0.6 MB).
- **Accessibility:** star ratings read as "Rated 5 out of 5"; the social link's icon and label follow its URL ("… on LinkedIn"); the video popup is a dialog (`inert` while closed, focus on ×, Esc closes, focus returns to the play button).
- **Visual weight:** Heavy (autoplaying videos and a wide slider).
- **Used on:** Home, About, Services.
- **Notes:** each copy has its own video popup. `date` is an optional field in `testimonials.json` and only video cards display it. Renders nothing with no items and no summary data.

#### TeamGroupCarousel

- **File:** [src/components/TeamGroupCarousel.astro](src/components/TeamGroupCarousel.astro)
- **For:** a continuously scrolling strip of team or culture photos.
- **Props:** `images: (string | { src, alt? })[]`: a plain path is a decorative photo (`alt=""`); use `{ src, alt }` to describe one.
- **Animations:** an endless marquee (`requestAnimationFrame` translateX, one full pass every 20s); images use scroll reveal.
- **Visual weight:** Medium.
- **Used on:** About.
- **Notes:** it only moves while on screen and the tab is visible, pauses on hover, and has a "Pause photo strip" button on keyboard focus. With reduced motion it stops and becomes a single set of photos the visitor can scroll sideways. The duplicate set used for the loop is hidden from screen readers.

#### PortfolioCarousel

- **File:** [src/components/PortfolioCarousel.astro](src/components/PortfolioCarousel.astro)
- **For:** a featured projects / case studies slider.
- **Props:** `projects: { slug, title, category, color, image, carouselImage? }[]`.
- **Layout:** a full-bleed, centered, looping Swiper (1 slide on mobile, 2 from 640px) of `PortfolioCard` (carousel variant), with Prev / Next text buttons and a thin progress bar between "01" and the total.
- **Animations:** free-mode drag and mousewheel, 600ms slide easing, a progress bar and a live counter; card hover effects (see PortfolioCard).
- **Visual weight:** Heavy.
- **Used on:** Home; CCC: 40 Years and For Businesses (the brand slider).
- **Notes:** light background only (black controls). With fewer than 8 projects the slides are repeated until there are 8 so the loop works; the counter still shows the real number of projects, and the repeats are hidden from screen readers and skipped by Tab. Renders nothing with no projects.

### Cards

#### PortfolioCard

- **File:** [src/components/PortfolioCard.astro](src/components/PortfolioCard.astro)
- **For:** a project tile.
- **Props:** `href`, `title`, `category`, `color` (hover overlay color), `image`, `variant?: 'grid' | 'carousel'` (default `grid`), `titleClass?: string` (default `text-[30px]`), `as?: 'h2' | 'h3' | 'h4'` (title heading level; default `h3`, `h2` on listing pages), `class?: string`.
- **Variants:**
  - `grid`: category and title slide up into the bottom-left corner on hover.
  - `carousel`: category and title fade and rise into the center on hover, after a 200ms delay.
- **Animations:** on hover, the image slowly zooms to 120% over 700ms and the project's color floods over it at 95%; the title link underlines.
- **Visual weight:** Medium.
- **Used on:** Home (via PortfolioCarousel), Portfolio (grid), Portfolio detail ("What's next").
- **Notes:** on devices without hover (phones, tablets), the title and category show all the time over a darkening layer (a `touch:` variant defined in global.css). The hover reveal also runs when the title link has keyboard focus. Only the title text is a link, not the whole card; the image is decorative (`alt=""`).

#### BlogCard

- **File:** [src/components/BlogCard.astro](src/components/BlogCard.astro)
- **For:** a blog / news / article card.
- **Props:** `post: CollectionEntry<'blog'>` or `item: { title, description, date, datetime?, category?, image?, imageAlt?, href, external? }` (a card without a post; `datetime` puts the date in `<time>`; `external` opens the link in a new tab and adds "(opens in a new tab)" to its accessible name), `horizontal?: boolean` (default `false`), `category?: string` (overrides the chip label, e.g. "Featured"), `as?: 'h2' | 'h3' | 'h4'` (title heading level; default `h3`, `h2` on listing pages), `class?: string`.
- **Variants:**
  - Vertical: image on top, then the category chip, title (2 lines), description (2 lines), "date — reading time" and an arrow.
  - Horizontal: image and text side by side from `lg`, with a larger title.
- **Animations:** on hover, the image shifts slightly, the arrow nudges up-right and the title underlines. The whole card is clickable. The background is tinted with the post's `color` at 5%.
- **Visual weight:** Medium.
- **Used on:** Home, Blog, Blog Horizontal, Blog detail (related posts).
- **Notes:** light background only. Uses `thumbnail`, falling back to `image`; with neither, the card shows without an image. The card link is named by the post title, so the image is `alt=""`. No category, no chip.

### Primitives

#### SectionTitle

- **File:** [src/components/SectionTitle.astro](src/components/SectionTitle.astro)
- **For:** the eyebrow + heading at the top of a section.
- **Props:** `subtitle?`, `title?`, `background?: 'light' | 'dark'` (default `light`), `align?: 'left' | 'center'` (default `center`), `dot?: boolean` (green period; default `true`), `marginClass?: string` (default `mb-14`), `class?: string`.
- **Animations:** scroll reveal; heading delayed 50ms.
- **Visual weight:** Light.
- **Used on:** Home, About, Services, Team, Pricing, and inside WorkProcess.

#### Button

- **File:** [src/components/Button.astro](src/components/Button.astro)
- **For:** the main button. It renders an `<a>` when `href` is set, otherwise a `<button>`.
- **Props:** `label`, `href?`, `variant?: 'white' | 'black'` (default `white`), `type?: 'button' | 'submit'`, `block?: boolean` (full width), `target?`, `rel?`, `class?`.
- **Extra styles (CSS only):** `btn-dark`, `btn-light` and `btn-sm` exist in global.css but aren't component variants. `btn-circle` with `btn-circle-white` / `btn-circle-black` is a separate round "+" button used by `LoadMore`.
- **Animations:** button text roll (hover and keyboard focus). Long labels wrap onto more lines.
- **Visual weight:** Light.
- **Used on:** Home (hero), About, Team, Pricing, Contact, Privacy, 404, Job detail, Thank-you. Header and Style Guide use the raw `btn` classes.
- **Notes:** one `Button` per page for its main action; everything else is a `LineLink`. `target="_blank"` gets `rel="noopener"` unless you pass `rel`.

#### LineLink

- **File:** [src/components/LineLink.astro](src/components/LineLink.astro)
- **For:** an inline text link with an animated underline. Used for secondary CTAs, email and phone.
- **Props:** `label`, `href`, `tone?: 'primary' | 'white' | 'dark'` (default `primary`), `icon?: 'arrow' | 'down' | 'none'` (default `none`), `target?`, `rel?`, `class?`.
- **Animations:** line-link wipe.
- **Visual weight:** Light.
- **Used on:** Home (hero, WorkProcess, "View all posts"), Contact, Job detail, Portfolio detail, Style Guide, Footer (all pages).

#### CounterUp

- **File:** [src/components/CounterUp.astro](src/components/CounterUp.astro) (vanilla script)
- **For:** animated stat numbers.
- **Props:** `value: string` (prefix + number + suffix, e.g. `"110+"`, `"97%"`, `"$7B"`), `class?`.
- **Animations:** 200px before it scrolls into view the number drops to 60% of its value, then once visible it counts linearly to the value over 1.5s. Values without a number are shown as they are. The final value is what's rendered in the HTML, so it shows without JavaScript and with reduced motion (no count). Numbers are formatted in `locale.format` from site config.
- **Visual weight:** Light.
- **Used on:** About, Services (inside Facts).
- **Notes:** keeps the value's decimals and thousands separators (`"1,200"` stays `1,200`). A bare four-digit year (1900–2100, e.g. `"2023"`) is shown without counting.

### Helpers

#### AstroImage

- **File:** [src/components/helper/AstroImage.astro](src/components/helper/AstroImage.astro)
- **For:** every image in the theme. It resolves a plain string path against `src/assets` (trying `/src/assets{path}`, `/src/assets/images{path}`, `/src{path}`; jpg, png, gif, webp, avif, svg) so Astro can optimize it, and falls back to a plain `<img>` (e.g. for `public/` paths).
- **Props:** `src`, `alt`, `width?`, `height?`, `loading?`, `decoding?`, `format?`, `class?`, `style?`, `widths?`, `sizes?`.
- **Responsive by default:** raster images wider than 400px get a `srcset` of 400 / 800 / 1200 / 1600 (never wider than the width they render at) and `sizes="(min-width: {width}px) {width}px, 100vw"`. Pass `widths` / `sizes` to override.
- **Notes:** an empty `src` renders nothing (no broken image). Use `alt=""` for decorative images and `loading="eager"` for images at the top of the page.
- **Used on:** almost every page and component, and inside portfolio MDX files.

#### AstroVideo

- **File:** [src/components/helper/AstroVideo.astro](src/components/helper/AstroVideo.astro)
- **For:** video, with the same path resolution for the file and its poster. Sets each source's MIME type from its file extension.
- **Props:** `src`, `sources?` (other formats of the same video, added as extra `<source>`s), `poster?` (in `src/assets`: resized to `posterWidth`, default 1600, and served as WebP), `posterWidth?`, `class?`, `autoplay?`, `loop?`, `muted?`, `controls?`, `playsinline?`, `preload?` (default `metadata`), `width?`, `height?`, plus any other attributes.
- **Notes:** an empty `src` renders nothing.
- **Used on:** Home, About, Services (via Showreel and ReviewCarousel).

### New shared pieces

#### TeamGrid

- **File:** [src/components/TeamGrid.astro](src/components/TeamGrid.astro)
- **For:** team member cards (photo, name, role) as grid columns; place it inside a `row`.
- **Props:** `members: { name, role, image }[]`, `as?: 'h2' | 'h3'` (name heading level; default `h3`, `h2` when directly under the page title).
- **Animations:** scroll reveal (fade) with a 4-column stagger.
- **Visual weight:** Light.
- **Used on:** About, Team.
- **Notes:** photos are decorative (`alt=""`); the name follows each one.

#### LoadMore

- **File:** [src/components/LoadMore.astro](src/components/LoadMore.astro)
- **For:** the round "+" load-more button under a list rendered in full with all but the first items hidden.
- **Props:** `target` (id of the list), `total`, `initial`, `step?` (default 4), `label` (accessible name, e.g. "Load more posts"), `class?`.
- **How it works:** list items carry `data-load-item`, hidden ones also the `hidden` class. Each click shows the next `step`, moves keyboard focus to the first new item's link and fires a `loadmore` event on the list (the Portfolio masonry re-flows on it). The button hides when everything is shown, and isn't rendered when `total <= initial`.
- **Visual weight:** Light.
- **Used on:** Blog, Blog Horizontal, Portfolio.

#### PauseButton

- **File:** [src/components/PauseButton.astro](src/components/PauseButton.astro)
- **For:** a "Pause …" / "Play …" control for moving content, visually hidden until it gets keyboard focus (so the design doesn't change). Needs a `relative` parent; the owning component wires the click and `aria-pressed`.
- **Props:** `label` (what it pauses, e.g. "logo animation"), `class?` (position classes; default `top-2 left-2`).
- **Used on:** inside `Clients`, `TeamGroupCarousel`, `ReviewCarousel` and `Showreel`.

#### AnniversarySeal

- **File:** [src/components/ccc/AnniversarySeal.astro](src/components/ccc/AnniversarySeal.astro) (CCC project component)
- **For:** the 40th anniversary seal: "Consumer Choice Canada" on the top arc, "40 / Years of Trust" in the centre, the founding year on the bottom arc (1987, pending client confirmation).
- **Props:** `variant?: 'dark' | 'light'` (`dark` for navy backgrounds: a lighter navy disc; `light` for white or ivory ones: a navy disc; default `dark`), `href?` (wraps the seal in a link, e.g. `/40-years`), `class?` (size; default `size-32`).
- **Accessibility:** an SVG with `role="img"` and a `<title>` ("40 Years of Trust, Consumer Choice Canada, 1987") that also names the link. Gold on navy only, so it passes contrast on any background.
- **Animations:** none.
- **Visual weight:** Light.
- **Used on:** Home (a stamp on the edge between the hero and the showreel, right-aligned with the hero's right column; `size-24` → `lg:size-44`; one fade-and-scale in via `has-anim pop`; navy-and-gold double focus ring), Footer (CTA row).

### CCC components (component lab)

All are in `src/components/ccc/`, built for the CCC design (bold-round spacing, Source Serif 4 / Inter type scale, gold hairlines, navy grain, the pull-quote style, gold-outline buttons, `@theme` tokens only, no hex values). Each is responsive, keyboard accessible, WCAG 2.1 AA and respects reduced motion (`has-anim` reveals are static; hover nudges and transitions are off). **Status: shown only on `/component-lab` (noindex, not in the sitemap or nav); not used on any real page until approved.** "Block" components have no section padding and go inside any section; "section" components are complete `<section>`s with `py-section`.

#### StatRow

- **File:** [src/components/ccc/StatRow.astro](src/components/ccc/StatRow.astro) (block). **Rebuilt (round 2)** in the theme's design language.
- **For:** two to four key facts as a row of tiles, in the language of `Facts`' stat tiles. A `<dl>` (label = term, value = description, shown value first).
- **Signature:** the tiles reveal in a stagger; each number counts up through the theme's own `CounterUp` (drops to 60% just before it's seen, counts up over 1.5s); a gold rule draws across the foot of each tile in step with the count (`scale` 0 → 1 over 1.5s on `ease-theme`, delayed by tile). A two-digit index sits top-left, as on `StackedServices`; the number sits at the foot (`mt-auto`), as in `WorkProcess`' tiles.
- **Props:** `items: { value, label, note? }[]`, `tone?: 'dark' | 'light'` (default `dark`: Facts' translucent `bg-white/3` square tiles on navy; `light`: white `rounded-card` tiles on ivory, like ReviewCarousel's), `class?`.
- **Layout:** one row on large screens; two to a row below, an odd last tile full width (as Facts' stat tiles do).
- **Type:** figures in Inter semibold (`text-4xl` → `text-6xl`), as Facts' numbers; text values (a word or a year) a size down. Years aren't counted (CounterUp shows "1987" as it is).
- **Reduced motion / no JS:** final numbers, rules drawn, nothing moves.
- **Best for:** short confirmed facts with a value: founding year, years of recognition, "1 winner per category", markets served.
- **Could fit:** Our Brands (beside or instead of `Facts`), the Consumer Choice Award page, 40 Years, About.
- **Considered:** `Facts` (a heavy bento on navy only, tied to the About content shape; StatRow is its stat tiles as a reusable row), `CounterUp` (used inside).
- **Base theme candidate:** yes: a light companion to `Facts`.
- **Visual weight:** Light to Medium.

#### StepList

- **File:** [src/components/ccc/StepList.astro](src/components/ccc/StepList.astro) (block, with a small script). **Rebuilt (round 2)** in the theme's design language.
- **For:** a vertical timeline (dated milestones; default) or a process (numbered steps), on a spine. An `<ol>`; step numbers are read by screen readers ("01. Category Selection"); a timeline item with no title uses its year or label as its heading.
- **Signature:** a **scroll-drawn spine**. As the list moves through the view, a gold line draws down from the first marker to the last, following a point 65% down the viewport (a `requestAnimationFrame` scroll loop, as in `StackedServices`); it only moves forward, so once drawn it stays. Each marker lights when the line reaches it (a hollow ring fills gold and grows slightly; numbered markers turn navy-on-gold), and that item's year rises from behind its own edge (the mask reveal of the portfolio grid titles) while its text fades up.
- **Props:** `items: { title?, text?, marker? }[]`, `variant?: 'timeline' | 'steps'`, `tone?: 'light' | 'dark'`, `as?: 'h2' | 'h3' | 'h4'`, `class?`.
- **Layout:** timeline: on large screens a 14rem year column (years in the serif at `text-6xl`, right-aligned; word labels such as "Coast to coast" a size down), the spine, then the text; on phones the spine at the left with the year above its text. Steps: spine at the left, numbered circles.
- **Progressive enhancement:** the markup is the finished state (every item lit, line full). The script measures the spine (always) and rewinds the items only when motion is allowed, so reduced motion and no-JS show everything in place.
- **Best for:** milestones with dates (40 Years); steps with explanations (how winners are chosen, how research works).
- **Could fit:** 40 Years (milestones), the Consumer Choice Award page (the selection process), CCRDI and For Businesses (when process copy is supplied).
- **Considered:** `WorkProcess` (four horizontal tiles on navy with a CTA strip; fixed to four, not for dates or long step text).
- **Base theme candidate:** yes.
- **Visual weight:** Medium.

#### FeatureGrid

- **File:** [src/components/ccc/FeatureGrid.astro](src/components/ccc/FeatureGrid.astro) (block). **Rebuilt (round 3)** in the theme's design language.
- **For:** features, services or values as tall tiles in the language of `WorkProcess` and `Facts`: a two-digit index, a gold Lucide icon, then after a long gap the title and text at the foot. A `<ul>`.
- **Signature:** as the grid comes into view the gold rule across each tile's top draws left to right in a wave along the row (`draw-x`, 140ms apart); on hover or focus the rule thickens to 2px and the icon lifts 4px.
- **Props:** `items: { icon?, title, text?, link? }[]`, `columns?: 2 | 3 | 4`, `tone?: 'light' | 'dark'` (light: open, ruled only; dark: Facts' translucent `bg-white/3` tiles), `as?`, `class?`.
- **Best for:** 3 to 8 parallel items with a short description: pillars, services, audiences, benefits.
- **Could fit:** CCRDI (core services), About (pillars), For Businesses (audiences), Consumer Choice Marketing (services, when supplied).
- **Considered:** `StackedServices` (photo-led, heavy), `WorkProcess` (four steps, CTA strip).
- **Base theme candidate:** yes. **Visual weight:** Light to Medium.

#### Callout

- **File:** [src/components/ccc/Callout.astro](src/components/ccc/Callout.astro) (block). **Rebuilt (round 3)** in the theme's design language.
- **For:** a short note set apart from the text around it (`role="note"`; body in the slot). Not dismissible.
- **Signature:** its gold rule draws as it appears: down the left edge (`note`, `draw-y`), across the top (`outline`, `draw-x`), or on navy an inset gold frame (`edge-ring`) whose sheen sweeps once along it as it appears and again on hover; the title rises from behind its edge (`has-anim mask`).
- **Props:** `title?`, `variant?: 'note' | 'outline' | 'navy'`, `icon?`, `link?`, `as?`, `class?`.
- **Best for:** one key point, an update, a deadline, where to find more.
- **Could fit:** Media & Partners (media enquiries), Contact, legal pages (a summary), 40 Years (events, when supplied).
- **Considered:** none in the theme. **Base theme candidate:** yes. **Visual weight:** Light.

#### Tabs

- **File:** [src/components/ccc/Tabs.astro](src/components/ccc/Tabs.astro) (block, with a small script). **Rebuilt (round 3)** in the theme's design language.
- **For:** related content of the same kind, one panel at a time. WAI-ARIA tabs with automatic activation (Tab into the list and on to the panel; arrows wrap; Home / End). Without JavaScript every panel shows under its own label.
- **Signature:** one gold indicator glides from tab to tab under a faint track (500ms on `ease-theme`); each tab carries a small two-digit index (gold when selected); the opening panel's title rises from behind its edge and its text fades up. The tab list scrolls sideways on small screens and fades the edge with more tabs.
- **Props:** `items: { label, title?, body }[]` (markdown body), `label`, `id`, `as?`, `class?`.
- **Reduced motion:** the indicator jumps; panels appear in place.
- **Best for:** 2 to 5 short, parallel panels: purpose / mission / vision; one per audience.
- **Could fit:** About, For Businesses. **Considered:** `Faq` (an accordion, for many items or several open at once).
- **Base theme candidate:** yes. **Visual weight:** Medium.

#### ComparisonTable

- **File:** [src/components/ccc/ComparisonTable.astro](src/components/ccc/ComparisonTable.astro) (block). **Rebuilt (round 3)** in the theme's design language.
- **For:** rows compared across a few columns: a real `<table>` (caption, column and row headers) in a named, keyboard-focusable region that scrolls sideways on small screens, row headers kept in view.
- **Signature:** the gold rule under the header draws across column by column (`draw-x`), then the rows reveal top to bottom; on hover or focus within a row a gold bar slides in at its left edge and the row warms to ivory. A highlighted column is an ivory band with a gold cap.
- **Props:** `caption`, `captionVisible?`, `columns`, `rows`, `highlight?`, `id`, `class?`.
- **Best for:** structured comparisons with short cells. **Could fit:** Our Brands (§2 brand architecture), For Businesses.
- **Considered:** `.content` prose (no table styling), Pricing cards. **Base theme candidate:** yes. **Visual weight:** Medium.

#### DownloadCards

- **File:** [src/components/ccc/DownloadCards.astro](src/components/ccc/DownloadCards.astro) (block). **Rebuilt (round 3)** in the theme's design language.
- **For:** files to download, as tall white `rounded-card` tiles on ivory (ReviewCarousel's cards): a gold tray with an arrow, the format set large and quiet in the corner (55% navy, 3.6:1, like the reviews' oversized numerals), then at the foot the file name (the link; the whole card is clickable), description, and format and size (read with the link via `aria-describedby`). Same-site files get `download`.
- **Signature:** on hover or focus the arrow drops into its tray, as if downloading (out through the bottom, back in from the top, 0.8s), and a gold rule draws along the card's foot.
- **Props:** `items: { title, description?, href, format, size? }[]`, `columns?: 2 | 3`, `id`, `as?`, `class?`.
- **Best for:** downloadable files. **Could fit:** Media & Partners (logo downloads), CCRDI (reports, when supplied).
- **Considered:** `BlogCard`. **Base theme candidate:** yes. **Visual weight:** Light.

#### NewsList

- **File:** [src/components/ccc/NewsList.astro](src/components/ccc/NewsList.astro) (block, with a small script). **Rebuilt (round 3)** in the theme's design language.
- **For:** news, announcements or press releases as rows between hairlines: date (`<time>`), category, headline (the link; the whole row is clickable), optional summary, a round arrow button.
- **Signature:** after the Showreel's cursor pill: on a pointer device, hovering a row brings up a small photo preview that eases after the cursor (a `requestAnimationFrame` lerp; it scales in from 0) and changes as you move between rows. The headline nudges right (a margin move, not a transform, so the full-row link stays whole), the arrow button fills navy and a gold rule draws along the row's foot. Rows reveal in a stagger. Keyboard focus gets the nudge, fill and rule.
- **Props:** `items: { title, href, date?, datetime?, category?, excerpt?, image?, external? }[]` (`image` for the preview, decorative; `external` opens the row's link in a new tab, with screen-reader text "(opens in a new tab)"), `as?`, `class?`.
- **Touch, reduced motion, rows without a photo:** no preview.
- **Best for:** many items or items without photos. **Could fit:** Media & Partners, the homepage news.
- **Considered:** `BlogCard`. **Base theme candidate:** yes. **Visual weight:** Light to Medium.

#### CtaBand

- **File:** [src/components/ccc/CtaBand.astro](src/components/ccc/CtaBand.astro) (section). **Rebuilt (round 3)** in the theme's design language.
- **For:** a call to action: eyebrow, heading (optionally the pull-quote style), text and up to two actions (`Button` + `LineLink`).
- **Signature:** a gold frame draws itself clockwise around the band from the top centre as it comes into view (`frame-ring`: the brand cards' edge, masked by a sweeping conic gradient, 1.8s); the eyebrow and heading rise from behind their edges, text and actions follow; the frame's sheen sweeps on hover. The split variant draws a gold rule across instead.
- **Props:** `eyebrow?`, `title`, `text?`, `primary?`, `secondary?`, `variant?: 'navy' | 'ivory' | 'split'`, `quote?`, `as?`, `class?`. Keep one main `Button` per page.
- **Could fit:** the end of the brand pages, For Businesses, Media & Partners, About.
- **Considered:** the `WorkProcess` CTA strip, the Footer CTA. **Base theme candidate:** yes. **Visual weight:** Medium.

#### MediaSplit

- **File:** [src/components/ccc/MediaSplit.astro](src/components/ccc/MediaSplit.astro) (section, with a small script). **Rebuilt (round 2)** in the theme's design language.
- **For:** a photo beside an eyebrow, heading, text and link, in the theme's asymmetric grid: a wide photo column (7) and a narrow text column (4) offset to the far side.
- **Signature:** the photo **unveils upward and settles** from a slight zoom as it comes into view (`has-anim clip`), then **drifts gently with the scroll** (a slow parallax of up to 5%, scrubbed while on screen); the eyebrow and heading **rise from behind their edges** (`has-anim mask`), the text and link follow in a stagger. An optional framework statement sits in `StackedServices`' frosted navy pane (`bg-dark/75 backdrop-blur-2xl`, with a ✲ glyph and the pull-quote style) inside the photo's lower inner corner; on phones it becomes a tile of its own under the photo.
- **Props:** `image`, `imageAlt`, `eyebrow?`, `title`, `text?: string | string[]`, `quote?` (framework text only), `link?`, `imageSide?: 'left' | 'right'`, `background?: 'white' | 'light' | 'navy'`, `ratio?: 'landscape' | 'portrait'` (4:3 or 4:5), `as?`, `class?`.
- **Portrait photos:** the text column is sticky on large screens (it stays in view while the tall photo scrolls past), as the homepage intro is beside its card stack.
- **Reduced motion:** the photo in place, unclipped and unzoomed, no parallax; text in place.
- **Best for:** a story section with one strong photo: the anniversary narrative, a brand introduction, "who we are".
- **Could fit:** About (story), 40 Years (the narrative, as a second section), the brand pages (an introduction), For Businesses.
- **Considered:** `BlogCard` horizontal (a 6/6 card for articles), the About intro image block and the case-study layout (both tied to their pages).
- **Base theme candidate:** yes.
- **Visual weight:** Medium to Heavy.

#### Statement

- **File:** [src/components/ccc/Statement.astro](src/components/ccc/Statement.astro) (section, with a small script). **Rebuilt (round 3)** in the theme's design language.
- **For:** one strong framework statement, centred in the italic pull-quote style, under a short gold rule that draws out from the centre. Framework text only: no quotes or testimonials, so no attribution.
- **Signature:** the statement lights up word by word as you scroll through it, scrubbed by the scroll like `StepList`'s spine (each word from 25% to full as the reading line passes; it stays lit). The words are spans inside one element, so screen readers read one sentence. The markup is the finished state; the script dims words only when motion is allowed.
- **Props:** `statement`, `eyebrow?`, `background?: 'white' | 'light' | 'navy'`, `hairlines?`, `as?: 'p' | 'h2'`, `class?`.
- **Could fit:** About (the §13 lead message), 40 Years, between sections on long pages.
- **Considered:** the inline `pull-quote` utility. **Base theme candidate:** yes. **Visual weight:** Medium.

#### Breadcrumbs

- **File:** [src/components/ccc/Breadcrumbs.astro](src/components/ccc/Breadcrumbs.astro) (block). **Rebuilt (round 3)** in the theme's design language.
- **For:** where a page sits in the site: a `<nav>` with an ordered list; the current page is `aria-current="page"` (not a link); separators hidden from screen readers.
- **Signature:** the trail rises crumb by crumb from behind its own line (`has-anim mask`, staggered) and a short gold rule draws under the current page; links use the theme's `line-link` wipe.
- **Props:** `items: { label, href? }[]`, `tone?: 'dark' | 'light'`, `label?`, `class?`.
- **Could fit:** the three brand pages, future press releases. **Considered:** none in the theme. **Base theme candidate:** yes. **Visual weight:** Light.

#### CCC changes to theme components

Small props added in this project so components can take CCC content and placeholders:
- `StackedServices`: `icon` takes an icon-set name (`lucide:award`) as well as an image path; optional `imageAlt` per card; the frosted panel is `bg-dark/75` (theme: `/60`) so white text keeps 4.5:1 over light photos.
- `PortfolioCarousel` / `PortfolioCard` (carousel): with a `logo` (`{ src, alt }`) and `edge` (a brand edge gradient token, e.g. `var(--edge-award)`), a slide becomes a **branded card**: the photo under a navy gradient overlay, a 1px inset gradient border (`edge-ring`, 12px in) in the brand's colours, and the brand's white logo centred as the card's heading (its alt names the brand; the link covers the card). Logos are sized by shape (tall marks larger). On hover or focus the photo zooms 4%, the navy deepens, the edge's sheen sweeps (1.6s), the logo lifts and the role rises in beneath it under a short accent line; on touch everything shows at rest. Text measured at 10.9:1 or better over the photo.
- `PortfolioCarousel` / `PortfolioCard`: each project can set `href` (default `/portfolio/{slug}`; `slug` is optional), `imageAlt`, and `tone: 'dark'` for navy text over a light hover colour (the Award gold). Touch devices keep white text over the darkened image.
- `WorkProcess`: CTA strip `images` take `{ src, alt }` as well as a plain (decorative) path.
- `BlogCard`: takes `item` (`{ title, description, date, category?, image?, imageAlt?, href }`, date shown as written) as an alternative to `post`.
- `BannerTestimonial`: an avatar's `social` link is optional.
- `ReviewCarousel`: the summary card shows stars and the large number only when `total_rating` is a number.
- `Showreel`: with an empty `src` it shows `poster` as a still image (`posterAlt` for its alt text), without the player or its controls.
- `SectionTitle`: the dot is dark gold (`gold-text`) on light backgrounds.
- `Footer`: the CTA link is visible text; adds `footer.description` and the seal.
- Buttons (`btn-white` on navy, `btn-black` on light): gold-outline, no fill. The ring is drawn by `::before` (utility `btn-gold-ring`, vars `--btn-border` / `--btn-sheen`) with a 1.6s sheen across it on hover and focus; no sheen with reduced motion. The theme's text roll (`::after`) is unchanged.
- `Facts`: `hero.value` / `impact.value` may be empty (the tile becomes a label + statement text tile); empty `philosophy.description` is skipped; stat values that aren't numbers are set smaller (`text-lg`); from `md` the intro photo fills the tile's height (`object-cover`).
- `PageHeader`: an empty `subtitle` renders no eyebrow line.
- `Clients`: `logoHeight` (px, default 36) sets the logo row height; each logo keeps its proportions (it was forced into 120 × 36).
- `AstroImage`: given only `width` or only `height`, it works out the other from the image's proportions instead of cropping.
- `Facts`: the philosophy title is larger (`text-xl md:text-2xl`); a text (non-number) `hero` / `impact` value is set at the same size.
- 40 Years (`/40-years`, content `src/content/anniversary`, MDX body): the case-study (Portfolio detail) layout as a single page: eyebrow + H1, the homepage `Showreel` as the feature (falls back to an image without `video`), sidebar (anniversary seal, Award link, confirmed milestones, Our Brands list) + body, and the homepage brand slider (`SectionTitle` + `PortfolioCarousel`) in place of the case study's "What's next?" cards.
- Our Brands panels: each sticky deck panel is the brand's photo under a navy gradient (strongest behind the text, 93% → 62%), with an `edge-ring` in the brand's colours (14px in) and the brand's white logo in its own column (decorative there: the panel's H2 names the brand). Text measured at 4.7:1 or better (the gold eyebrow), body text 7.6:1 or better.
- `edge-ring` (global.css): an absolutely positioned 1px gradient border, `--edge` (gradient) and `--edge-inset`; sheen on `.group` hover or focus; static with reduced motion. Edge gradients `--edge-award` (gold), `--edge-marketing` (red into gold), `--edge-research` (circuit-ring silver).
- Our Brands (`/our-brands`, content `src/content/brands`): the Services page layout (logo wall, `Facts`, colour card deck, testimonials) with a tagline line above each card title, `tone: dark` for light card colours, and a `LineLink` per card.
- About page: `about.clients.logos` and `about.team.members` (content) replace the shared `clients` / `teamMembers` collections when set; testimonials come from `homepage.testimonials.items`.
- `has-anim pop`: fade and scale in place (0.9 → 1 over 0.9s); off with reduced motion.
- `Showreel`: play pill and keyboard Play button are navy with a gold border (no gold fill); close buttons hover to `white/20`.
- Icons are Lucide (`lucide:*`); fonts are Source Serif 4 (headings) and Inter (body), self-hosted; colours come from `brand.colors` (see Rebranding).

---

## Page templates

**Every page** is wrapped in `Base`, so each one starts with **ScrollProgress → Header** and ends with **Footer → GradualBlur**. The tables below list only what sits between them. "Inline" means the markup is written in the page file, not in a component.

Background key: **Dark** = `#001213`, **Gray** = `bg-gray-100`, **Light** = `bg-light` (`#fafafa`), **White** = `bg-white`.

### Hero styles

The theme uses five hero styles. Only the homepage has a large hero.

| Hero style | What it looks like | Size | Built with |
| --- | --- | --- | --- |
| **Large banner hero** | Eyebrow, big H1 with a green period, primary `Button` + secondary `LineLink`, lead paragraph, avatar social proof, then a full-width autoplaying video that overlaps the next section, with a dotted shape behind it. | Large | Inline in `index.astro` + `Button`, `LineLink`, `BannerTestimonial`, `Showreel`, `BannerShape` |
| **Page-title hero** | Dark band with an eyebrow line and a large heading. Left-aligned or centered, optional green period. No image, no button. | Small | `PageHeader` |
| **Page-title hero + feature image** | Centered eyebrow (category · date, or "Case Study") and H1, followed by a full-width image that overlaps the white body section. | Small title, medium overall | Inline + `AstroImage` |
| **Light split header** | Light band; meta line and title on the left, a jump link ("apply") on the right. | Small | Inline + `LineLink` |
| **Error hero** | Centered oversized "404", short message, "Back to Home" button. | Medium | Inline + `Button` |

### Page types at a glance

| Demo page | Route | Page type | Hero style |
| --- | --- | --- | --- |
| Home | `/` | Homepage | Large banner hero |
| About | `/about` | About | Page-title hero (left) |
| Services | `/services` | Services overview | Page-title hero (centered) |
| Team | `/team` | Team + careers listing | Page-title hero (left, dot) |
| Job detail | `/job/[slug]` | Careers: job posting | Light split header |
| Pricing | `/pricing` | Pricing | Page-title hero (left) |
| FAQ | `/faq` | FAQ | Page-title hero (left) |
| Contact | `/contact` | Contact | Page-title hero (left) |
| Portfolio | `/portfolio` | Work / portfolio listing | Page-title hero (left, dot) |
| Portfolio detail | `/portfolio/[slug]` | Case study / project detail | Page-title hero + feature image |
| Blog | `/blog` | Blog / news listing (grid) | Page-title hero (left, dot) |
| Blog Horizontal | `/blog-horizontal` | Blog / news listing (list) | Page-title hero (left, dot) |
| Blog detail | `/blog/[slug]` | Blog / news post | Page-title hero + feature image |
| Privacy | `/privacy` | Legal / generic long-form page | Page-title hero (left) |
| Style Guide | `/style-guide` | Internal design reference (not for launch) | Page-title hero (left) |
| Thank-you (contact) | `/thank-you/contact` | Thank-you / form confirmation | Page-title hero (left) |
| Thank-you (application) | `/thank-you/application` | Thank-you / form confirmation | Page-title hero (left) |
| 404 | `/404` | Error page | Error hero |

**Page types with no demo page.** Projects often need page types the theme doesn't have. Build them from the closest pieces below, in the theme's styling.

| New page type | Closest theme pages | Reuse | Build new |
| --- | --- | --- | --- |
| **Directory / item listing** (e.g. SaaS products) | Blog, Portfolio | `PageHeader`; grid and "+" load-more pattern from `blog/index.astro`; card pattern from `BlogCard` (image, category chip, title, 2-line summary, whole card clickable) | An item card component modelled on `BlogCard`; a content collection for the items (with `seo: seoSchema`) |
| **Category pages** | Blog listing; Team's open positions (grouped by category) | Same listing template filtered by category, one route per category (`getStaticPaths`); category chips from `BlogCard` | Category data (a field on items, or its own collection) |
| **Item / product detail** | Portfolio detail; Job detail | Page-title hero + feature image; sidebar facts (like `client` / `otherInfo` / `services`) + `.content` long-form body; "What's next" related cards; `LineLink` for the external website | Item-specific sidebar fields |
| **Search / filters** | Blog listing | Form field classes and `select-icon` from the Contact page; pill tags from the home intro for active filters; the item card for results | Client-side filtering on the listing page (the site is static). No search component exists. Keep filtered views out of search (`noindex`) if they get their own URLs. |
| **Submission form** (e.g. "Submit your product") | Contact, Job detail | Netlify Forms pattern (unique `name`, `form-name`, honeypot), field styles, the file-upload handling from the job form (8 MB limit), a thank-you page via the `thankYou` collection | The fields |
| **Comparison** | Pricing | Plan-card layout, `Button` | A comparison table (none exists) |
| **Service detail** | Portfolio detail | Sidebar + long-form body layout; one card from the Services showcase deck for the intro | — |
| **Events** | Team, Pricing, FAQ | Team grid for speakers, Pricing for tickets, `Faq` | Date / venue block, agenda |
| **Locations / map** | Contact | The Contact page's details column | A map component |

New page types get SEO the same way as every other page; see [Adding SEO to a new page type](#adding-seo-to-a-new-page-type).

### Home — `/`

[src/pages/index.astro](src/pages/index.astro) · content: `homepage`, `services`, `portfolio` (featured), `blog`, `testimonials`, `clientsDark`

**Page type:** Homepage · **Hero style:** Large banner hero

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Hero: eyebrow, H1 with green dot, primary + secondary CTA, lead text, social proof | Inline + `Button`, `LineLink`, `BannerTestimonial`, `BannerShape` | Dark |
| 2 | Showreel video (overlaps the next section) | `Showreel` | Dark |
| 3 | About intro (sticky text + pill tags) beside the services stack | Inline + `StackedServices` | Gray |
| 4 | Selected projects | `SectionTitle`, `PortfolioCarousel` | Gray |
| 5 | Work process + CTA strip | `WorkProcess` | Dark |
| 6 | Testimonials + client logos | `SectionTitle`, `ReviewCarousel`, `Clients` | Gray |
| 7 | Blog: one featured horizontal post, 3-post grid, "View all posts" (`blog.button`) | `SectionTitle`, `BlogCard` (horizontal + vertical), `LineLink` | White |

> The hero `Button` is the page's one main action; the process CTA and "View all posts" are `LineLink`s. Sections with nothing to show (no featured projects, no posts) are left out.

### About — `/about`

[src/pages/about.astro](src/pages/about.astro) · content: `about`, `homepage.testimonials`, `clients`, `testimonials`, `teamMembers`

**Page type:** About · **Hero style:** Page-title hero (left-aligned, with `<br/>` in the title)

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Page header | `PageHeader` | Dark |
| 2 | Wide header image | Inline `AstroImage` | Dark |
| 3 | "Trusted by…" logo wall | `SectionTitle` (subtitle only), `Clients` | Dark |
| 4 | Stats bento grid | `Facts` | Dark |
| 5 | Team photo marquee | `TeamGroupCarousel` | White |
| 6 | Testimonials | `SectionTitle`, `ReviewCarousel` | Light |
| 7 | Team grid (photo, name, role) + "See Open Positions" | `SectionTitle`, `TeamGrid`, `Button` (black) | White |

### Services — `/services`

[src/pages/services.astro](src/pages/services.astro) · content: `services`, `about.clients`, `about.facts`, `clients`, `testimonials`

**Page type:** Services overview · **Hero style:** Page-title hero (centered). The service cards don't link to detail pages; there is no service detail demo.

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Page header (centered) | `PageHeader` | Dark |
| 2 | "Trusted by…" logo wall | `SectionTitle` (subtitle only), `Clients` | Dark |
| 3 | Stats bento grid | `Facts` | Dark |
| 4 | Service showcase: large colored cards, image and text alternating sides, sub-service list, meta line; cards stick and shrink as the next one slides over (desktop only) | Inline (own script, respects reduced motion) + `AstroImage` | White, each card in its own `color` |
| 5 | Testimonials | `SectionTitle`, `ReviewCarousel` | Light |

### Team — `/team`

[src/pages/team.astro](src/pages/team.astro) · content: `team`, `teamMembers`, `jobs`

**Page type:** Team + careers listing · **Hero style:** Page-title hero (left-aligned, green dot)

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Page header (with dot) | `PageHeader` | Dark |
| 2 | Team grid + CTA | `TeamGrid` (`as="h2"`), `Button` (black) | White |
| 3 | Open positions, grouped by category; rows link to job pages, with a gray fill sweeping up on hover or keyboard focus (`#open-positions`). With no jobs it shows `no_positions`, or the section is left out if that's empty | `SectionTitle`, inline list | Light |

### Job detail — `/job/[slug]`

[src/pages/job/[slug].astro](src/pages/job/[slug].astro) · content: `jobs` collection (MDX); form labels and messages from `team` → `application_form` (shared by every job)

**Page type:** Careers: job posting · **Hero style:** Light split header

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Job header: meta line, title (`h1`), "apply" jump link | Inline + `LineLink` (down arrow) | Light |
| 2 | Job description (MDX; its headings are `##`, shown at 22px) | Inline `.content` | White |
| 3 | Application form: CV upload, name, email, phone, company, cover letter | Inline form + `Button` (submit) | Light |

> **Netlify Forms**, form name `job-application` (shared by every job page). Hidden fields: `form-name`, `subject` ("Job application: {job title}", used as the notification email subject) and `position` (the job title). Spam protection: the `bot-field` honeypot. JavaScript sends the form as `FormData` to `/` so the CV (`cv` field, .pdf/.doc/.docx) is included. Files over 7.5 MB are refused before sending (`application_form.file_too_large`), because Netlify caps a submission at 8 MB. Fields have visible labels; required ones are marked with a red `*`. On a 2xx response from Netlify the visitor goes to `/thank-you/application`; any failure shows an error under the button. The form's `action` is also `/thank-you/application`, so visitors without JavaScript land there too.

### Pricing — `/pricing`

[src/pages/pricing.astro](src/pages/pricing.astro) · content: `pricing`, `faq`

**Page type:** Pricing · **Hero style:** Page-title hero (left-aligned)

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Page header | `PageHeader` | Dark |
| 2 | Monthly/yearly toggle + 3 plan cards (featured card is dark with a "Most Popular" badge; check-mark feature list) | Inline + `Button` (block) | White |
| 3 | FAQ | `SectionTitle`, `Faq` | White |

> Toggle: a `role="switch"` button (`aria-checked`). The knob slides, labels swap weight, and prices count to the new value over 400ms, keeping the content's own symbol, decimals and separators (`$3,500`, `€49.50`, `9.99 kr`); prices that aren't numbers ("Custom", "Free") are swapped as written. No count with reduced motion. Plan names are `h2`; the feature title is an `h3` at body size. "Save 20%", "Most Popular" and "Monthly/Yearly" are hardcoded text.

### FAQ — `/faq`

[src/pages/faq.astro](src/pages/faq.astro) · content: `faq`

**Page type:** FAQ · **Hero style:** Page-title hero (left-aligned)

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Page header | `PageHeader` | Dark |
| 2 | Grouped accordion | `Faq` | White |

### Contact — `/contact`

[src/pages/contact.astro](src/pages/contact.astro) · content: `contact`

**Page type:** Contact · **Hero style:** Page-title hero (left-aligned)

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Page header | `PageHeader` | Dark |
| 2 | Left: intro (`h2`), email, phone, address. Right: form (name, email, phone, company, project type, budget, message) | Inline + `LineLink` (dark), `Button` (submit) | White |

> **Netlify Forms**, form name `contact`. Hidden fields: `form-name` and `subject` ("Message from {brand.name} website", used as the notification email subject). Spam protection: the `bot-field` honeypot. JavaScript sends the form URL-encoded to `/`. On a 2xx response from Netlify the visitor goes to `/thank-you/contact`; anything else shows an error under the button. The form's `action` is also `/thank-you/contact`, so visitors without JavaScript land there too. Every field has a `<label>` (visually hidden; the placeholder is the visible text). Labels, placeholders, the option lists, the submit label and the sending/error messages all come from `contact` → `form`. Both forms share the `field` style in global.css.
>
> **Netlify setup (per site):** turn on form detection (**Forms → Enable form detection**, then redeploy) and add email notifications (**Forms → Submission notifications**). Submissions only work on a Netlify deploy, not with `npm run dev` or `npm run preview`.

### Portfolio — `/portfolio`

[src/pages/portfolio/index.astro](src/pages/portfolio/index.astro) · content: `portfolio`; page header and load-more label from `listings` (`src/content/data/listings.json`, id `portfolio`)

**Page type:** Work / portfolio listing · **Hero style:** Page-title hero (left-aligned, green dot)

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Page header (with dot) | `PageHeader` | Dark |
| 2 | 2-column masonry of project tiles (JS-positioned), 4 shown, "+" loads 4 more | `PortfolioCard` (grid, `as="h2"`), inline masonry, `LoadMore` | White |

### Portfolio detail (case study) — `/portfolio/[slug]`

[src/pages/portfolio/[slug].astro](src/pages/portfolio/[slug].astro) · content: `portfolio` collection (MDX, which uses `AstroImage`)

**Page type:** Case study / project detail · **Hero style:** Page-title hero + feature image

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | "Case Study" header with H1 | Inline | Dark |
| 2 | Hero image (overlaps the next section) | Inline `AstroImage` | Dark |
| 3 | Sidebar (client, description, website link, other info, services) + case-study body (MDX headings are `##`, shown at 22px) | Inline + `LineLink`, MDX `.content prose` | White |
| 4 | "What's next?" (`h2`): 3 other projects; left out when there are none | `PortfolioCard` (grid) | White |

### Blog — `/blog`

[src/pages/blog/index.astro](src/pages/blog/index.astro) · content: `blog`; page header and load-more label from `listings` (id `blog`)

**Page type:** Blog / news listing (grid) · **Hero style:** Page-title hero (left-aligned, green dot)

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Page header (with dot) | `PageHeader` | Dark |
| 2 | Newest post full-width horizontal, then a 3-column grid; 4 shown, "+" loads 4 more | `BlogCard` (`as="h2"`), `LoadMore` | White |

### Blog Horizontal — `/blog-horizontal`

[src/pages/blog-horizontal.astro](src/pages/blog-horizontal.astro) · content: `blog`; page header from `listings` (id `blog`)

**Page type:** Blog / news listing (single-column list) · **Hero style:** Page-title hero (left-aligned, green dot)

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Page header (with dot) | `PageHeader` | Dark |
| 2 | Single column of horizontal cards; 4 shown, "+" loads 4 more | `BlogCard` (horizontal, `as="h2"`), `LoadMore` | White |

### Blog detail — `/blog/[slug]`

[src/pages/blog/[slug].astro](src/pages/blog/[slug].astro) · content: `blog` collection (MDX; one post embeds YouTube via `astro-embed`)

**Page type:** Blog / news post · **Hero style:** Page-title hero + feature image

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Post header: category — date, H1 | Inline | Dark |
| 2 | Hero image (overlaps the next section) | Inline `AstroImage` | Dark |
| 3 | Article body (large first paragraph) + sticky table of contents with scroll-spy highlighting; the TOC collapses into a toggle on mobile (`aria-expanded`, `inert` while closed) and is left out when the post has no `##` / `###` headings | Inline MDX `.content prose`, inline TOC | White |
| 4 | "Related Posts" (`h2`): 3 posts; left out when there are none | `BlogCard` | White |

### Privacy — `/privacy`

[src/pages/privacy.astro](src/pages/privacy.astro) · content: `pages/privacy.mdx`. Works as a generic long-form page template.

**Page type:** Legal (privacy, terms, cookies) / generic long-form · **Hero style:** Page-title hero (left-aligned)

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Page header | `PageHeader` | Dark |
| 2 | MDX body (headings `##` / `###`, shown at 22px / 18px) + optional CTA (heading, button, note) | Inline `.content prose`, `Button` (black) | White |

### Style Guide — `/style-guide`

[src/pages/style-guide.astro](src/pages/style-guide.astro)

**Page type:** Internal design reference; remove it from the menu before launch. It's `noindex` and left out of the sitemap · **Hero style:** Page-title hero (left-aligned)

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Page header | `PageHeader` | Dark |
| 2 | Headings H1–H6, typeface, paragraphs, lists | Inline `.content` | White |
| 3 | Buttons (dark, black, light, white), line links (4 tones), circle buttons | Raw `btn` classes, `LineLink` | White |
| 4 | Accordion | `Faq` | White |
| 5 | Embeds: link preview, Mastodon post, YouTube, Vimeo | `astro-embed` | White |

### Thank-you — `/thank-you/[slug]`

[src/pages/thank-you/[slug].astro](src/pages/thank-you/[slug].astro) · content: `thankYou` collection, one MDX file per form in `src/content/thank-you/`: `contact.mdx` → `/thank-you/contact`, `application.mdx` → `/thank-you/application`

**Page type:** Thank-you / form confirmation · **Hero style:** Page-title hero (left-aligned)

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Page header (`subtitle`, `heading`) | `PageHeader` | Dark |
| 2 | Confirmation and what happens next (MDX body) | Inline `.content` | White |
| 3 | One main action (`cta`) | `Button` (black) | White |

> **Demo copy:** both entries hold placeholder demo copy, written for the base theme. Replace it per project like any other demo content.
>
> **How it's wired:** each form's `action` points to its page, and the form's script redirects there after Netlify confirms the submission. The pages are `noindex` (via `Base`), filtered out of the sitemap in `astro.config.mjs`, and not linked from `menu.json`. To add a thank-you page for a new form, add an MDX file to `src/content/thank-you/` and point that form's `action` at `/thank-you/{file name}`.

### 404

[src/pages/404.astro](src/pages/404.astro)

**Page type:** Error page · **Hero style:** Error hero

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Large "404" (last digit mirrored, hidden from screen readers), message, "Back to Home"; uses the page-title hero spacing | Inline + `Button` | Dark |

### Patterns that exist only inline

These are reusable in spirit but live inside page files. Extract them into components if you plan to reuse them:

- **Pricing plan cards + billing toggle:** `pricing.astro`.
- **Service showcase deck** (colored alternating cards): `services.astro`.
- **Job openings list:** `team.astro`.
- **Contact form** and **job application form:** `contact.astro`, `job/[slug].astro`.
- **Detail-page header + overlapping hero image:** `blog/[slug].astro`, `portfolio/[slug].astro`.
- **Table of contents with scroll-spy:** `blog/[slug].astro`.
- **Home hero** (headline + CTAs + lead + social proof): `index.astro`.

---

### Page dependencies and removing a page

Several demo pages read content that belongs to another page. Check this table before removing a page, so you don't remove content another page still needs.

| Page | Reads content from | Links to it elsewhere |
| --- | --- | --- |
| Home | `homepage`, `services` (items, for `StackedServices`), `portfolio` (featured), `blog`, `testimonials`, `clientsDark` | Logo, menu |
| About | `about`, `homepage.testimonials` (heading, rating), `clients`, `testimonials`, `teamMembers` | Menu, footer, home hero secondary link |
| Services | `services`, **`about.clients` + `about.facts`**, `homepage.testimonials`, `clients`, `testimonials` | Menu, footer |
| Team | `team`, `teamMembers`, `jobs` (open positions) | Menu, footer, About team button (`/team#open-positions`) |
| Job detail | `jobs`, **`team.application_form`** (form labels and messages) | Team open positions; application thank-you button (`/team#open-positions`) |
| Pricing | `pricing`, **`faq`** (its FAQ section) | Menu, footer |
| FAQ | `faq` | Menu, footer |
| Contact | `contact` | Menu, footer CTA, privacy CTA, home process CTA, many content CTAs |
| Blog, Blog Horizontal, Blog detail | `blog`, `listings` (id `blog`) | Menu, footer, home "View all posts" |
| Portfolio, Portfolio detail | `portfolio`, `listings` (id `portfolio`) | Menu, footer, home hero button, contact thank-you button |
| Privacy | `pages` (`privacy.mdx`) | Menu, footer |
| Thank-you | `thankYou` | Contact and job form `action`s |
| Style Guide | **`faq`** (one accordion group) | Menu, footer |

**Shared content to keep when removing a page:**
- Removing **About**: Services still needs `about.clients` and `about.facts`. Keep that content, or move it to `services`.
- Removing **Services**: Home's services stack still reads `services` items.
- Removing **FAQ**: Pricing (and the Style Guide) still read `faq`.
- Removing **careers**: also remove Team's open positions, the About and Team "See Open Positions" buttons, `/thank-you/application`, the `jobs` collection, `getJobs` and `team.application_form` (schema and content).
- Removing the **Team page** but keeping jobs: keep `team/index.mdx` → `application_form`, or move it into the job content.
- Removing **Blog** or **Portfolio**: also remove its entry in `src/content/data/listings.json`.
- Removing **Portfolio**: also remove Home's "Selected projects" section and repoint the hero button and the contact thank-you button.
- Removing **Blog**: also remove Home's blog section.

**Removing a page cleanly:**
1. **Page files:** delete the page file(s) in `src/pages/`.
2. **Content:** if no other page reads it (table above), delete the content folder or data file, its schema in `src/types/collections.ts`, its registration in `src/content.config.ts`, and any helper in `src/lib/content.ts`.
3. **Config:** remove its entries in `src/config/menu.json` (`main` and the footer columns), in `site.config.json` → `seo.pages`, and in the sitemap `filter` in `astro.config.mjs`.
4. **Links:** search for every link to the route (e.g. `grep -rn '"/pricing' src`) in content CTAs, config and components, and repoint or remove each one.
5. **Leftovers:** remove components and demo images used only by that page (see "Used on" in the quick reference), and its section in the project's `CONTENT_TEMPLATE.md`. Update this catalog.
6. **Verify:**
   - `npx astro check` and `npm run build` pass.
   - The route is gone from `dist/sitemap-0.xml`.
   - A link checker over `dist` finds nothing broken (`npx linkinator dist --recurse`).

## Rebranding

Everything brand-related is set in **one file**: [src/config/site.config.json](src/config/site.config.json), under `brand`. Nothing else needs editing to rebrand.

| Setting | Key in `site.config.json` | What it controls |
| --- | --- | --- |
| Site name | `brand.name` | Page title suffix ("About \| Name"), `og:site_name`, Organization JSON-LD, contact form email subject |
| Colors | `brand.colors.primary`, `dark`, `light`, `muted`, `mutedDark` | Every Tailwind color utility (`text-primary`, `bg-dark/5`, …), the text-selection color, underline links, the green section-title dots |
| Font | `brand.font.name`, `weights`, `fallback` | The site font. Must be a [Google Font](https://fonts.google.com) name; it's loaded by Astro's font API in `astro.config.mjs` |
| Logo | `brand.logo.src`, `alt`, `width`, `height` | Header, mobile drawer, footer watermark, Organization JSON-LD |
| Favicon set | `brand.favicon.svg`, `png32`, `appleTouch`, `icon192`, `icon512`, `ico` | Browser tab icon (SVG, plus 32×32 PNG for browsers without SVG support), 180×180 Apple touch icon, the 192 and 512 icons in the web manifest (`/site.webmanifest`), and `/favicon.ico`. `ico.source` is a square PNG that gets resized to `ico.sizes` (default 16, 32, 48). Leave a link path empty to skip it. |

Related settings in the same file: `locale` (`lang` for `<html lang>`, `format` for dates and numbers, e.g. `en-US`, `en-CA`, `fr-CA`), `seo` (default title, description, share image, author), `footer` (contact details, also used in JSON-LD), `headerButton` (the header's main-action button) and `author` (optional "Developed by" footer credit).

**How it works:**
- **Colors:** `Base.astro` writes `brand.colors` to CSS variables (`--brand-primary` …). The `@theme` block in `global.css` maps the Tailwind tokens onto those variables, so `global.css` contains no hex values for brand colors.
- **Font:** `astro.config.mjs` reads `brand.font`, exposes it as `--font-brand`, and `global.css` uses it as `--font-primary`.
- **Images:** the logo path resolves like every other image (`/images/logo.svg` is found in `src/assets/images/`). Favicon paths are plain `public/` paths, because icons need stable URLs; the theme's set lives in `public/images/icons/`.
- **Favicon set:** `Base.astro` outputs the icon `<link>` tags. [src/pages/site.webmanifest.ts](src/pages/site.webmanifest.ts) builds the manifest from `brand.name`, `brand.colors.dark` (theme and background color) and the 192 / 512 icons.
- **`/favicon.ico`:** [src/pages/favicon.ico.ts](src/pages/favicon.ico.ts) builds it at build time. It resizes `brand.favicon.ico.source` (default: the 512 icon) to each of `ico.sizes` with `sharp`, and packs them into one ICO with PNG images. It's for browsers, feed readers and other tools that request `/favicon.ico` directly; pages link the SVG and PNG icons instead. Replacing the source icon updates it automatically.
- **Placeholder icons:** the theme's icons are placeholders scaled up from the old 16×16 demo favicon (the SVG just wraps that PNG). Every project needs its own icon set.

**Rebrand steps:**
1. Edit `brand` in `site.config.json` (name, five colors, font name and weights).
2. Replace the logo file, or point `brand.logo.src` at a new one. The logo sits on the dark header, so it should be light-colored.
3. Replace the five icons in `public/images/icons/` with the brand's own, keeping the same names or updating `brand.favicon`:
   - `favicon.svg`: vector icon
   - `favicon-32.png`: 32×32
   - `apple-touch-icon.png`: 180×180, no transparency (iOS fills transparent areas with black)
   - `icon-192.png` and `icon-512.png`; `icon-512.png` is also the default source for `/favicon.ico`, which is regenerated on every build
4. Replace `public/images/ogimage.png` (1200 × 630), or point `seo.image` at a new file.
5. Update `locale`, `seo` (including `seo.pages` for pages without content entries), `footer`, `headerButton` and `author` in the same file.
6. Run `npm run build` and check the Style Guide page, which shows the font name and button styles.

**Colors not tied to the brand:** they live next to the brand tokens in the `@theme` block of global.css, so there are no hex values in components or pages:
- **Neutrals:** `line` (`#eae9e9`, hairline borders on light sections) and `fill` (`#f1f1f1`, hover fills), plus white, black and the white/black/`dark` opacity steps (e.g. `text-white/95`, `text-dark/70`).
- **Error red:** `error` (`#dc2625`) for form errors and required marks.
- **Decorative hero tints:** `shape` (`#332d2b`, the dotted shape behind the home hero) and `avatar-ring` (`#74484a`, the hero avatar border). Check these against a new palette.
- **Fixed Tailwind colors:** `gray-100` (the "Gray" section background and image placeholders) and `amber-400` (star ratings).
- **Services cards and blog tints:** come from content (`services/index.mdx` → `items[].color`, a post's `color`).
- **Contrast:** small text on light backgrounds uses `dark/70` or darker, which passes WCAG AA on white, `light` and `gray-100`. Check `primary` against white if you use it for text on light sections (the demo green doesn't pass).

## Languages (English and French)

The site is built to be bilingual: English at the root, Canadian French (fr-CA) under `/fr` with French slugs. **French is switched off** until the end of the CCRDI project (`site.config.json` → `i18n.languages.fr.enabled: false`): no `/fr` pages are routed, the language switcher and the hreflang / `og:locale:alternate` tags aren't written (`alternates()` returns undefined), the sitemap has no French chunk or alternates, and `i18n.cjs` / `frtypo.cjs` exit with "French disabled". The CCC French content was removed; the infrastructure below is unchanged. To switch it on: set the flag, add the French entries, route pairs and `fr` site text, and have the translation reviewed.

- **`src/i18n/routes.json`:** every English URL paired with its French URL. The switcher, hreflang, the sitemap's alternates and the French route files read it.
- **`src/i18n/index.ts`:** `getLang(Astro.url)` (French under `/fr`), `entryId(id, lang)` (French singletons are `fr`, other French entries `fr/<id>`), `isFrenchEntry`, `localizePath` (English paths in shared code → French URLs on French pages), `siteText` / `menuFor` / `ui` (site-wide text, menus and interface labels per language), `fill`, `formatLongDate` ("1er octobre 2026"), `ordinalsHTML` (French ordinals as `<sup>`: 1<sup>er</sup>, 40<sup>e</sup>; used for dates in `BlogCard` / `NewsList` and `StepList` text), `fileSize` ("1,2 Mo").
- **Content:** French entries in each collection's `fr/` folder, named like the English ones (`homepage/fr/index.mdx`, `brand-pages/fr/consumer-choice-award.mdx`). Singleton loaders match `index.mdx` and `fr/index.mdx`; English listings filter out French entries.
- **Config:** `site.config.json` → `i18n.languages` (tags, `og:locale`, names, home URLs), `fr` (SEO defaults, footer, header button), `ui.en` / `ui.fr` (labels that were hard-coded in components: skip link, menu, pause/play, carousel, breadcrumb, seal, form honeypot, …); `menu.json` → `fr`.
- **Pages:** each template reads its language from the URL; `src/pages/_fr/` holds thin wrappers (routed by the `french-pages` integration in `astro.config.mjs` only while `i18n.languages.fr.enabled` is on) that render the English template (`<About />`), plus `getStaticPaths` for the dynamic ones with slugs from `routes.json`.
- **`<head>`:** `html lang`, hreflang for both languages and `x-default` (English), written like the canonical URL; `og:locale` and `og:locale:alternate`; Organization JSON-LD in French on `/fr`.
- **Sitemap:** `sitemap-en-0.xml` and `sitemap-fr-0.xml` (`chunks`), each URL with its alternates (`serialize`); French thank-you and 404 pages left out.
- **Mixed-language content:** `BlogCard` and `NewsList` items take `lang` (e.g. `"en"` for English press releases on French pages): the title and summary get `lang`, the screen-reader note reads "(en anglais, s’ouvre dans un nouvel onglet)".
- **Forms:** the same Netlify form on both contact pages, with a hidden `language` field; French custom validation messages (`form.validation`), French thank-you page `/fr/merci/contact`.
- **404:** `/fr/404`, served for missing `/fr/` URLs by a Netlify `_redirects` file that `astro.config.mjs` writes to `dist` while French is on.
- **QA:** `scripts/qa/i18n.cjs` and `scripts/qa/frtypo.cjs`; `stage.cjs` covers the French pages while French is on.

## SEO

Every page outputs a title, meta description, canonical URL, Open Graph and Twitter tags, and a social share image. This works for **any page, including page types a project adds**, through one mechanism in `Base.astro`.

### How each value is chosen

For the title, description and share image, `Base` uses the first non-empty value from this list. **Empty strings count as "not set"**, so blank fields fall through to the next source.

1. **`seo` prop:** the page's content entry, i.e. the `seo:` block in its front matter.
2. **`site.config.json` → `seo.pages["/path"]`:** for pages with no content entry. It's matched on the URL path without a trailing slash (`/blog`, `/directory/ai-tools`). No code changes needed.
3. **The page's own props:** `title`, `description`, `image` passed to `Base` (e.g. a blog post's title, summary and image; a job's title and `meta` line; "About" for the About page).
4. **Site defaults:** `seo.title` (title, used only when nothing else sets one, e.g. the homepage), `seo.description`, `seo.image`.

The final title is shown as `"{title} | {brand.name}"`. Other tags:

| Tag | Default | Change it with |
| --- | --- | --- |
| Canonical URL | The page's own URL on `baseURL` | `canonical` prop on `Base` |
| `og:type` | `website` | `type="article"` prop (blog posts use it) |
| `noindex` | off | `noindex` prop (404, thank-you pages and the Style Guide use it) |
| `meta author` | left out | `seo.author` in site config |
| Share image format | — | Images in `src/assets` are resized to at most 1200px wide and output as absolute URLs; `public/` paths and full URLs are used as-is |

### Adding SEO to a new page type

**A page backed by a content collection** (e.g. a directory of SaaS products, category pages, product detail pages):

1. Add the shared optional SEO block to the collection's schema in [src/types/collections.ts](src/types/collections.ts):
   ```ts
   import { seoSchema } from '@/types/shared';

   export const products = defineCollection({
     loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/products' }),
     schema: z.object({
       seo: seoSchema,           // optional title / description / image overrides
       name: z.string(),
       summary: z.string(),
       logo: z.string(),
       // …
     }),
   });
   ```
2. In the page, pass the item's own fields as natural defaults and its `seo` block as overrides:
   ```astro
   <Base title={data.name} description={data.summary} image={data.logo} seo={data.seo}>
   ```
3. Content editors can then add this to any entry (all fields optional):
   ```yaml
   seo:
     title: "Acme CRM – pricing, features and reviews"   # under 60 characters
     description: "…"                                   # 120–160 characters
     image: "/images/share/acme.jpg"                    # 1200 × 630
   ```

**A page with no content entry** (a listing, search or filter page built in code):
- Pass its own title (`<Base title="Directory">`).
- Add an entry for its path in `site.config.json`. No code changes needed:
  ```json
  "pages": {
    "/directory": { "title": "SaaS Directory", "description": "…", "image": "/images/share/directory.jpg" }
  }
  ```

**Pages that shouldn't be indexed** (search results, filtered views, thank-you pages, internal pages): pass `noindex`, and exclude their paths in the sitemap `filter` in `astro.config.mjs`. There's no `keywords` meta tag: search engines ignore it.

**Collections that already accept `seo:`:** `homepage`, `about`, `services`, `team`, `jobs`, `pricing`, `faq`, `contact`, `pages`, `thankYou`, `portfolio`, `blog`.

**Pages configured in `seo.pages` (with empty values) as examples:** `/blog`, `/blog-horizontal`, `/portfolio`. The Style Guide and 404 use their title and the site defaults.

### Also generated

- **`/site.webmanifest`** ([src/pages/site.webmanifest.ts](src/pages/site.webmanifest.ts)): name, colors and 192 / 512 icons from `brand`.
- **`/favicon.ico`** ([src/pages/favicon.ico.ts](src/pages/favicon.ico.ts)): 16, 32 and 48px icons generated from `brand.favicon.ico`.
- **`/robots.txt`** ([src/pages/robots.txt.ts](src/pages/robots.txt.ts)): allows all crawlers and links to the sitemap on `baseURL`. Thank-you pages are not blocked there, because crawlers must be able to read their `noindex`.
- **Sitemap** (`@astrojs/sitemap`): includes every built page except `/thank-you/` and `/style-guide`. Drafts (`draft: true` in blog, portfolio and jobs) aren't built at all in production. New pages are added automatically, and removed pages disappear on the next build.
- **Organization JSON-LD** (homepage only): `brand.name`, `baseURL`, `brand.logo`, `seo.description`, `footer` email, phone and address, and `sameAs` from the `http(s)` links in `social.json` (the demo's `#!` links are skipped).

**Set before launch:** `baseURL` (canonical URLs, share images, sitemap and robots.txt all use it), the `seo` block, and a real share image.

## Best uses by site type

The theme is built as a **creative agency / studio** site: dark, motion-rich, image-led, with case studies at its core. The further a site gets from that, the more the heavy pieces need to be swapped or toned down.

### Changes worth making for any client site

- **Scope the project first:** remove the demo pages the site doesn't need (see [Page dependencies and removing a page](#page-dependencies-and-removing-a-page)), and build missing page types from the closest pieces (see "Page types with no demo page" under [Page templates](#page-templates)).
- Point the header button (`headerButton` in site config, default "Contact Us") at the site's main action, and set `author` if the footer should say "Developed by …".
- **Forms use Netlify Forms.** In the site's Netlify dashboard, turn on form detection and set up email notifications for the `contact` and `job-application` forms.
- **Rebrand** through `site.config.json` (see [Rebranding](#rebranding)), and fill in the per-page `seo` fields (see [SEO](#seo)).

### Corporate

Established firms, consultancies, B2B services.

**Fits well**
- Pages: About, Services, Team (with open positions and Job detail), Contact, FAQ, Privacy, Blog (as a newsroom).
- Components: `PageHeader`, `SectionTitle`, `Facts` (company in numbers), `Clients`, `ReviewCarousel` with text cards, the services showcase deck, `BlogCard`, `Faq`, `LineLink`, `Button`.

**Needs changes**
- **Home hero:** swap `Showreel` for a still image or a muted ambient loop without the custom cursor; the "Play" pill cursor reads as playful.
- **`StackedServices` / `WorkProcess`:** keep them, but lower the glyph and frosted-glass styling if the brand is conservative.
- **`ReviewCarousel`:** leave `social` empty on references that shouldn't link to a profile (the icon follows the link's network).
- **Pricing:** usually not wanted. Remove it from the menu.
- **Palette:** the near-black and neon green may need re-theming through the `@theme` tokens in global.css.

### Non-profit

Charities, foundations, community organizations.

**Fits well**
- Pages: About, Team, Blog (news and stories), FAQ, Contact, Privacy.
- Components: `Facts` (impact numbers such as people helped or funds raised), `WorkProcess` (how a donation becomes impact, in four steps), `TeamGroupCarousel` (volunteers and events), `ReviewCarousel` (beneficiary or volunteer stories; video cards work well), `Clients` (partners and funders), `BlogCard`.

**Needs changes**
- **Donations:** there's no donation component. The Pricing page could become donation tiers, but its toggle is billing-specific ("Monthly/Yearly", "Save 20%") and should become "One-time/Monthly"; "Most Popular" is hardcoded; CTAs need a payment-provider link.
- **Contact form:** replace "Type of Project" and "Budget" with fields like "How would you like to help?".
- **Accessibility:** non-profits often have stricter accessibility requirements. The theme covers keyboard use, focus, pause controls and contrast; give `TeamGroupCarousel` photos real alt text (`{ src, alt }`) and check the brand colors' contrast.
- **Tone:** `PortfolioCarousel` and the portfolio pages fit only if presented as "Projects" or "Programs"; otherwise drop them.

### Small business

Local services, trades, cafés, clinics, studios of 1–10 people.

**Fits well**
- Pages: a trimmed Home, Services, Pricing (if prices are public), FAQ, Contact, Privacy.
- Components: `PageHeader`, `SectionTitle`, `Button`, `LineLink`, `Faq`, `ReviewCarousel` (text reviews with the rating summary card), `Facts` (years in business, customers served), the services showcase deck, `BlogCard` if they post updates.

**Needs changes**
- **Home:** too heavy as shipped. Remove `Showreel` (or use a short clip), and pick either `StackedServices` or `WorkProcess`, not both. Drop `PortfolioCarousel` unless there's a gallery of work.
- **`Clients`:** needs at least as many logos as columns; with only a few partners set `columnCount` to 3–4 or remove it.
- **Team / Jobs / Style Guide / Blog Horizontal:** usually unnecessary. Remove them from `menu.json`.
- **Contact:** add opening hours and a map; neither exists. The footer has address fields, but there's no map embed.
- **Pricing:** single-price services don't need the monthly/yearly toggle; remove it.

### Portfolio

Designers, photographers, studios, agencies. **This is the theme's native fit.**

**Fits well**
- Pages: Home, Portfolio, Portfolio detail (case study), About, Services, Contact, Blog.
- Components: `Showreel` (reel), `PortfolioCarousel`, `PortfolioCard`, `StackedServices`, `WorkProcess`, `ReviewCarousel`, `Clients`, `TeamGroupCarousel`, `BannerTestimonial`, `Facts`.

**Needs changes**
- **Solo creatives:** rewrite the "We…" copy; drop the Team page, open positions, Job detail and the team grid on About.
- **`PortfolioCard`:** only the title text is a link. Consider making the whole card clickable, especially for phones.
- **Pricing:** most portfolios don't publish prices. Remove it, or turn it into "Packages".

### Event

Conferences, meetups, festivals, workshops.

**Fits well**
- Components: home hero layout + `Showreel` (last year's recap), `Clients` (sponsors), the team grid (speakers), `Faq`, `Facts` (attendees, speakers, sessions, cities), `ReviewCarousel` (past attendee quotes), `TeamGroupCarousel` (event photos), `BlogCard` (announcements).
- Pages: Home, About, FAQ, Contact, Pricing (as tickets), Blog (news).

**Needs changes**
- **Missing pieces:** no countdown, date/venue block, agenda/schedule, speaker detail page, venue map, or ticketing integration. These must be built.
- **`WorkProcess`:** can stand in for a short agenda (four-column layout; more items wrap onto new rows). A real schedule needs a new component.
- **Pricing as tickets:** remove the monthly/yearly toggle; change "Most Popular"; link CTAs to a ticketing provider.
- **Team grid as speakers:** needs talk title, company and a link per person; `teamMembers` only has name, role and image.
- **Portfolio pages:** usually not needed. Could become "Past editions".

### Product

SaaS, apps, digital or physical products.

**Fits well**
- Pages: Home, Pricing (the monthly/yearly toggle with animated prices is a natural fit), FAQ, Blog (changelog and guides), Contact (sales), About, Team + Jobs (careers), Privacy (and a Terms page from the same template).
- Components: hero + `Showreel` (product demo video), `StackedServices` (features), `WorkProcess` (how it works / onboarding steps), `Facts` (usage metrics), `ReviewCarousel` (the rating summary card and top-company logos fit well), `Clients` (customer logos), `Faq`, `BannerTestimonial`.

**Needs changes**
- **Header CTA:** set `headerButton` to "Sign up" or "Start free trial".
- **Missing pieces:** no feature-comparison table, integrations grid, app-store badges, screenshot or device mockup gallery, or changelog layout.
- **Pricing:** "Save 20%" is hardcoded and should come from content; the plan cards have no "per seat" or usage notes beyond the feature list.
- **Contact form:** swap "Type of Project / Budget" for "Company size / Use case".
- **Portfolio pages:** rename to "Customers" / "Case studies" and keep the case-study detail layout; the client sidebar (`client`, `otherInfo`, `services`) maps well onto customer stories.

### At a glance

✅ = good fit as shipped · ✏️ = usable with changes · — = usually not needed

| Component / page | Corporate | Non-profit | Small business | Portfolio | Event | Product |
| --- | --- | --- | --- | --- | --- | --- |
| Showreel | ✏️ | ✏️ | — | ✅ | ✅ | ✅ |
| StackedServices | ✅ | ✏️ | ✏️ | ✅ | — | ✅ |
| WorkProcess | ✅ | ✅ | ✏️ | ✅ | ✏️ | ✅ |
| Facts | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Clients | ✅ | ✅ | ✏️ | ✅ | ✅ | ✅ |
| ReviewCarousel | ✏️ | ✅ | ✅ | ✅ | ✅ | ✅ |
| TeamGroupCarousel | ✏️ | ✅ | — | ✅ | ✅ | ✏️ |
| PortfolioCarousel / PortfolioCard | ✏️ | ✏️ | ✏️ | ✅ | ✏️ | ✏️ |
| BlogCard / Blog pages | ✅ | ✅ | ✏️ | ✅ | ✅ | ✅ |
| Faq / FAQ page | ✅ | ✅ | ✅ | ✏️ | ✅ | ✅ |
| Pricing page | — | ✏️ | ✏️ | — | ✏️ | ✅ |
| Team + Job pages | ✅ | ✏️ | — | ✏️ | ✏️ | ✅ |
| Services page | ✅ | ✏️ | ✅ | ✅ | — | ✏️ |
| Contact page | ✅ | ✏️ | ✏️ | ✅ | ✏️ | ✏️ |
