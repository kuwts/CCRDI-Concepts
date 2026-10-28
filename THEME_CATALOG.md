# Obicol Theme Catalog

A reference to every component and page template in this Astro theme, and a guide to which pieces fit which kinds of sites.

**Stack:** Astro 7, Tailwind CSS 4 (with `tailwind-bootstrap-grid` for `row` / `col-*`), React 19 islands, `motion` (Framer Motion), Swiper 14, `astro-icon` (Hugeicons), `astro-embed`.
**Look:** dark base (`--color-dark: #001213`) with white and light-gray content bands, green accent (`--color-primary: #00b75f`), Space Grotesk, square corners throughout.
**Content:** page copy lives in `src/content/*/index.mdx` front matter; repeatable data lives in `src/content/data/*.json` and the `blog`, `portfolio`, `jobs` and `pages` collections. Schemas are in [src/types/collections.ts](src/types/collections.ts).

---

## Contents

1. [How to read this catalog](#how-to-read-this-catalog)
2. [Shared animation systems](#shared-animation-systems)
3. [Component quick reference](#component-quick-reference)
4. [Components in detail](#components-in-detail)
5. [Page templates](#page-templates)
6. [Best uses by site type](#best-uses-by-site-type)

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

---

## Shared animation systems

These are defined once and reused across many components. Component entries refer to them by name.

| Name | Where it's defined | What it does |
| --- | --- | --- |
| **Scroll reveal** (`has-anim`) | `@utility has-anim` in [src/styles/global.css](src/styles/global.css); observer in [src/layouts/Base.astro](src/layouts/Base.astro) | Element starts hidden, 25px lower and at 99% scale, then fades and rises in when it enters the viewport (IntersectionObserver, bottom margin −15%). Runs once. |
| **Scroll reveal, fade** (`has-anim fade`) | same | Gentler version: only an 8px rise, no scale. |
| **Stagger** (`delay-*`, `animDelay[i]`) | [src/utils/animDelay.ts](src/utils/animDelay.ts) | Adds 0–500ms transition delays by item index. All delays are switched off below the `md` breakpoint. |
| **Button text roll** (`btn`) | `@utility btn` in global.css | On hover the label slides up and fades out while a copy (from `data-text`) rises in from below. |
| **Line-link wipe** (`line-link`) | `@utility line-link` in global.css | A faint underline shrinks away, then a solid green underline draws in from the left after 0.3s. |

> **Reduced motion and no JavaScript:** with "reduce motion" turned on, `has-anim` content appears in place with no movement. Without JavaScript, a `<noscript>` style in Base.astro shows it. `StackedServices`, the Services page's card deck, `TeamGroupCarousel`, `Clients`, `Showreel`, `CounterUp` and `ReviewCarousel`'s video cards also respect reduced motion (details in each entry). Hover effects and slider transitions still animate.

---

## Component quick reference

| Component | Purpose | Weight | Used on |
| --- | --- | --- | --- |
| [Header](#header) | Navigation bar + mobile drawer | Medium | All pages |
| [DropdownNav](#dropdownnav) | Desktop dropdown menus (React) | Light | All pages (via Header) |
| [Footer](#footer) | Footer CTA, contact, links | Medium | All pages |
| [ScrollProgress](#scrollprogress) | Back-to-top with progress ring | Light | All pages |
| [GradualBlur](#gradualblur) | Blur fade at the bottom edge of the screen (React) | Light | All pages |
| [DeviceSizeIndicator](#devicesizeindicator) | Breakpoint badge (dev only) | — | All pages (dev only) |
| [PageHeader](#pageheader) | Inner-page hero / title band | Light | 11 pages |
| [BannerShape](#bannershape) | Decorative hero background shape | Light | Home |
| [BannerTestimonial](#bannertestimonial) | Hero social proof (avatar stack) | Light | Home |
| [Showreel](#showreel) | Hero video with fullscreen player | Heavy | Home |
| [StackedServices](#stackedservices) | Services / features as sticky stacking cards | Heavy | Home |
| [WorkProcess](#workprocess) | Process steps + CTA strip | Medium | Home |
| [Facts](#facts) | Stats / about bento grid | Heavy | About, Services |
| [CounterUp](#counterup) | Animated number (React) | Light | About, Services (via Facts) |
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
| [AstroImage](#astroimage) | Image helper | — | Everywhere |
| [AstroVideo](#astrovideo) | Video helper | — | Home, About, Services (via Showreel / ReviewCarousel) |

---

## Components in detail

### Layout and site chrome

#### Base layout

- **File:** [src/layouts/Base.astro](src/layouts/Base.astro)
- **For:** the page shell. Every page uses it. It renders `<head>` SEO/OG tags, then `ScrollProgress`, `DeviceSizeIndicator`, `Header`, `<main><slot/></main>`, `Footer`, and a page-level `GradualBlur`.
- **Props:** `title?` (shown as `"{title} | {seo.title}"`), `description?`, `image?` (OG image), `noindex?`. Also a named `head` slot.
- **Animations:** holds the global scripts for scroll reveal, header hide/shrink on scroll, scroll-progress ring, mobile drawer and mobile submenu accordions.
- **Visual weight:** n/a (wrapper).

#### Header

- **File:** [src/components/Header.astro](src/components/Header.astro)
- **For:** navigation. A sticky dark top bar with logo, desktop menu, "Buy Now" button and a hamburger; below `lg` a slide-in drawer.
- **Props:** none. Reads `menu.main` from [src/config/menu.json](src/config/menu.json) and `logo` / `buyNow` from [src/config/site.config.json](src/config/site.config.json).
- **Variants:** desktop (≥ `lg`, uses `DropdownNav`) and mobile drawer (< `lg`, submenus become accordions). Active page and active section are highlighted automatically.
- **Animations:** hides when you scroll down past 300px and comes back when you scroll up; padding shrinks after 100px; drawer slides in from the right over a blurred dim overlay; mobile submenus open with a height animation and the caret rotates; "Buy Now" uses the button text roll.
- **Visual weight:** Medium.
- **Used on:** all pages (via Base).
- **Notes:** the "Buy Now" button links to the theme store. Rename or repoint it through `buyNow` in site config.

#### DropdownNav

- **File:** [src/components/menu/DropdownNav.tsx](src/components/menu/DropdownNav.tsx) (React, `client:load`)
- **For:** desktop dropdown menus.
- **Props:** `items: { name, url, children?: { name, url }[] }[]`, `currentPath: string`.
- **Animations (motion):** a single white panel with a pointer arrow springs sideways to follow the hovered item; its height animates between menus of different lengths; child links fade up with a 40ms stagger; the other top-level items dim to 50%.
- **Visual weight:** Light.
- **Used on:** all pages (inside Header).
- **Notes:** opens on hover only. There is no keyboard or click handling for opening submenus on desktop.

#### Footer

- **File:** [src/components/Footer.astro](src/components/Footer.astro)
- **For:** footer CTA, contact details, link columns, social links and copyright.
- **Props:** none. Reads `footer`, `logo`, `author` from site config; `menu.footer.col1–col3`; [src/config/social.json](src/config/social.json).
- **Layout:** large "Have an idea…" heading with a green arrow link → email (as a LineLink) + phone + two address lines → three link columns → copyright + social links → oversized logo watermark at 5% opacity bleeding off the bottom.
- **Animations:** scroll reveal (fade) with small staggers; line-link wipe on the email; underline fade on links.
- **Visual weight:** Medium.
- **Used on:** all pages (via Base).
- **Notes:** the "Our blog" link points to `/blogs-1-col`, which doesn't exist (should be `/blog`). The copyright line reads "Developed by Platoltheme".

#### ScrollProgress

- **File:** [src/components/ScrollProgress.astro](src/components/ScrollProgress.astro)
- **For:** back-to-top button.
- **Props:** none. Behavior is in Base.astro.
- **Animations:** fixed bottom-right circle appears after 50px of scroll; an SVG ring fills in step with scroll position; the arrow nudges up on hover; click smooth-scrolls to top. Uses `mix-blend-mode: difference` so it shows on light and dark sections.
- **Visual weight:** Light.
- **Used on:** all pages (via Base).

#### GradualBlur

- **File:** [src/components/ui/GradualBlur.tsx](src/components/ui/GradualBlur.tsx) (React)
- **For:** a stepped backdrop blur along an edge. Base uses it as a fixed blur strip at the bottom of the viewport (`client:idle`, `target="page"`, 6rem, strength 2, 5 layers, bezier curve, exponential).
- **Props:** `position` (`top|bottom|left|right`), `strength`, `height`, `width`, `divCount`, `exponential`, `zIndex`, `animated` (`true|false|'scroll'`), `duration`, `easing`, `opacity`, `curve` (`linear|bezier|ease-in|ease-out|ease-in-out`), `responsive` with `mobile/tablet/desktop` `Height`/`Width`, `target` (`parent|page`), `hoverIntensity`, `onAnimationComplete`, `className`, `style`, `children`. `gpuOptimized` is declared but not used.
- **Variants (`preset`):** `top`, `bottom`, `left`, `right`, `subtle`, `intense`, `smooth`, `sharp`, `header`, `footer`, `sidebar`, `page-header`, `page-footer`.
- **Animations:** static by default. Optional: fade in when scrolled into view (`animated="scroll"`), stronger blur on hover (`hoverIntensity`).
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
- **Used on:** About, Services, Team, Pricing, Contact, FAQ, Privacy, Style Guide, Blog, Blog Horizontal, Portfolio.
- **Notes:** the heading is the page's `<h1>`, so don't add another `<h1>` on pages that use it.

#### BannerShape

- **File:** [src/components/BannerShape.astro](src/components/BannerShape.astro)
- **For:** a decorative scatter-dot blob behind the home hero (absolute, behind content, 20% opacity, 30% on mobile).
- **Props:** none. The color is fixed by a class (`text-[#332D2B]`), even though the comment mentions `currentColor`.
- **Animations:** none.
- **Visual weight:** Light.
- **Used on:** Home.
- **Notes:** needs a `relative` parent.

#### BannerTestimonial

- **File:** [src/components/BannerTestimonial.astro](src/components/BannerTestimonial.astro)
- **For:** social proof in a hero, e.g. "Loved by 550+ Founders" next to overlapping round avatars.
- **Props:** `proof: { label, avatars: { image, name, role, social: { icon, url } }[] }`, `class: string` (required by the type).
- **Animations:** hovering an avatar raises it, lightens its border and fades in a white tooltip card with name, role and a social icon link.
- **Visual weight:** Light.
- **Used on:** Home.
- **Notes:** each social link's `aria-label` says "on LinkedIn" whatever the icon is.

#### Showreel

- **File:** [src/components/Showreel.astro](src/components/Showreel.astro)
- **For:** a full-width hero video that expands into a fullscreen player.
- **Props:** `src: string` (video path), `poster?: string`, `class?: string`.
- **Animations:** autoplays muted and looping while at least 40% visible, then pauses and resets to the poster. Over the video the system cursor is hidden and a green "▶ Play" pill follows the mouse. Click → the video FLIP-animates into a dark fullscreen overlay with sound. Close with ×, the backdrop or Esc → FLIP back. Right-click is blocked. With reduced motion: no inline autoplay (the poster shows) and no zoom animation; clicking still opens the player, and closing returns to the poster.
- **Visual weight:** Heavy.
- **Used on:** Home.
- **Notes:** uses `cursor-none`; on touch screens there is no hover cursor, but tapping still opens the player.

### Content sections

#### StackedServices

- **File:** [src/components/StackedServices.astro](src/components/StackedServices.astro)
- **For:** services or features shown as cards that stick and pile up as you scroll.
- **Props:** `services: { icon, title, info, meta?, image? }[]`, `withDramaEffect?: boolean` (default `true`), `stackOffset?: number` (px between stacked edges, default `5`), `paneGap?: string | false` (Tailwind gap class, default `gap-2`), `scrollRunway?: string` (extra scroll space after the last card, default `'0px'`), `className?: string`.
- **Card design:** a background photo with a frosted dark glass panel (`backdrop-blur-2xl`) holding a 01/02/… index, an icon, title, text and meta line.
- **Variants:** with or without the "drama" effect (scaling).
- **Animations:** cards are `position: sticky` and pile on top of one another; with the drama effect, covered cards shrink step by step, driven by scroll in `requestAnimationFrame`; inner panels use scroll reveal. Respects `prefers-reduced-motion`.
- **Visual weight:** Heavy.
- **Used on:** Home (right-hand column of the intro section).
- **Notes:** takes `className`, not `class`. Sticky `top` values assume the header height. Give every card an `image`, or the card will be blank.

#### WorkProcess

- **File:** [src/components/WorkProcess.astro](src/components/WorkProcess.astro)
- **For:** a "how we work" section: four numbered steps followed by a CTA strip.
- **Props:** `subtitle: string`, `title: string`, `steps: { heading, text }[]`, `cta: { title, images: string[], button: { label, href } }`.
- **Layout:** a complete dark `<section>`: a centered SectionTitle, four tall translucent cards with decorative glyphs (✳ ✺ ✲ ❋), then a divider and a strip with an avatar stack, a line of text and a small white Button.
- **Animations:** scroll reveal with per-card stagger; button text roll.
- **Visual weight:** Medium.
- **Used on:** Home.
- **Notes:** the layout is built for four steps (four columns); more steps wrap onto a new row, and the four glyphs repeat in order. Dark background only.

#### Facts

- **File:** [src/components/Facts.astro](src/components/Facts.astro)
- **For:** a stats / "about us in numbers" bento grid.
- **Props:** `facts` (typed `any`). Expected shape (from the `about` collection): `image`, `title` (markdown: `_x_` renders as a large glyph, `**x**` as a heading), `hero { label, value, description }`, `philosophy { label, title, description }`, `impact { label, value, description }`, `stats: { value, label }[]`.
- **Layout:** an image + intro tile, a philosophy quote tile, a big-number tile, three small stat tiles and a big impact-number tile, all translucent on dark. Tiles reorder across breakpoints.
- **Animations:** scroll reveal (fade) with staggered delays; every number counts up with `CounterUp`.
- **Visual weight:** Heavy.
- **Used on:** About, Services.
- **Notes:** a complete `<section>`. Dark background only. Built for three `stats`.

#### Faq

- **File:** [src/components/Faq.astro](src/components/Faq.astro)
- **For:** an FAQ accordion, grouped under subheadings.
- **Props:** `groups: { title, items: { question, answer }[] }[]`. `answer` is an HTML string.
- **Animations:** answers open with a smooth height transition (`grid-template-rows` 0fr → 1fr) and the + icon rotates into ×; opening one item closes every other item on the page; each item uses scroll reveal (fade).
- **Visual weight:** Light.
- **Used on:** FAQ, Pricing, Style Guide.
- **Notes:** light background only. Answers are injected as raw HTML, so use trusted content only. There's no `aria-expanded` on the toggles.

### Social proof and media

#### Clients

- **File:** [src/components/Clients.astro](src/components/Clients.astro)
- **For:** a client / partner / sponsor logo wall.
- **Props:** `items: { name, logo }[]`, `columnCount?: number` (default `5`), `class?: string`.
- **Variants:** two data sets: [clients.json](src/content/data/clients.json) (light logos for dark backgrounds) and [clients-dark.json](src/content/data/clients-dark.json) (dark logos for light backgrounds).
- **Animations:** each column shows one logo at a time and swaps every 2s, columns offset by 250ms. Incoming logos rise and de-blur with a springy ease; outgoing logos lift and blur out. The wrapper uses scroll reveal (fade). With reduced motion there's no cycling: each column lists its logos, so every client shows once.
- **Visual weight:** Medium.
- **Used on:** Home (dark logos on gray), About and Services (light logos on dark).
- **Notes:** the order is shuffled at build time and short columns are padded with random repeats. With fewer logos than columns, lower `columnCount`. The timer runs every 100ms indefinitely.

#### ReviewCarousel

- **File:** [src/components/ReviewCarousel.astro](src/components/ReviewCarousel.astro)
- **For:** testimonials. Text reviews and video reviews in one draggable slider.
- **Props:** `items: { review, author, role?, company?, rating?, date?, social?, media? }[]`, `testimonials: { total_rating?, total_reviews?, top_companies?: { name, logo }[] }`, `light?: boolean` (white pagination dots for dark sections; default `false`).
- **Slide types:**
  - **Summary card** (always first): a big rating number, five stars, the review count and inverted company logos.
  - **Video card** (when `media` ends in .mp4/.webm/.mov/.ogv): a muted, looping background video (started by script; not autoplayed with reduced motion) with name, company, X link, a play button, a star rating and a date.
  - **Text card** (otherwise): the quote, a round avatar (`media`), name, role or company, and an X link.
- **Animations:** Swiper free-mode drag and mousewheel; 1.1 → 3.5 slides visible as the screen widens; dynamic pagination bullets; play button grows on hover; the video modal fades in; the close button rotates on hover.
- **Visual weight:** Heavy (autoplaying videos and a wide slider).
- **Used on:** Home, About, Services.
- **Notes:** each copy has its own video popup. The social icon and label are always X/Twitter. Text cards need `media` set to an avatar image. `date` is an optional field in `testimonials.json` and only video cards display it. The summary card always renders, even with empty data.

#### TeamGroupCarousel

- **File:** [src/components/TeamGroupCarousel.astro](src/components/TeamGroupCarousel.astro)
- **For:** a continuously scrolling strip of team or culture photos.
- **Props:** `images: string[]`.
- **Animations:** an endless marquee (`requestAnimationFrame` translateX, one full pass every 20s); images use scroll reveal.
- **Visual weight:** Medium.
- **Used on:** About.
- **Notes:** it doesn't pause on hover. With reduced motion it stops and becomes a single set of photos the visitor can scroll sideways. Every image has `alt="team"`; the duplicate set used for the loop is hidden from screen readers.

#### PortfolioCarousel

- **File:** [src/components/PortfolioCarousel.astro](src/components/PortfolioCarousel.astro)
- **For:** a featured projects / case studies slider.
- **Props:** `projects: { slug, title, category, color, image, carouselImage? }[]`.
- **Layout:** a full-bleed, centered, looping Swiper (1 slide on mobile, 2 from 640px) of `PortfolioCard` (carousel variant), with Prev / Next text buttons and a thin progress bar between "01" and the total.
- **Animations:** free-mode drag and mousewheel, 600ms slide easing, a progress bar and a live counter; card hover effects (see PortfolioCard).
- **Visual weight:** Heavy.
- **Used on:** Home.
- **Notes:** light background only (black controls). With fewer than 8 projects the slides are doubled so the loop works, but the counter still shows the real number of projects.

### Cards

#### PortfolioCard

- **File:** [src/components/PortfolioCard.astro](src/components/PortfolioCard.astro)
- **For:** a project tile.
- **Props:** `href`, `title`, `category`, `color` (hover overlay color), `image`, `variant?: 'grid' | 'carousel'` (default `grid`), `titleClass?: string` (default `text-[30px]`), `class?: string`.
- **Variants:**
  - `grid`: category and title slide up into the bottom-left corner on hover.
  - `carousel`: category and title fade and rise into the center on hover, after a 200ms delay.
- **Animations:** on hover, the image slowly zooms to 120% over 700ms and the project's color floods over it at 95%; the title link underlines.
- **Visual weight:** Medium.
- **Used on:** Home (via PortfolioCarousel), Portfolio (grid), Portfolio detail ("What's next").
- **Notes:** on devices without hover (phones, tablets), the title and category show all the time over a darkening layer (a `touch:` variant defined in global.css). Only the title text is a link, not the whole card.

#### BlogCard

- **File:** [src/components/BlogCard.astro](src/components/BlogCard.astro)
- **For:** a blog / news / article card.
- **Props:** `post: CollectionEntry<'blog'>`, `horizontal?: boolean` (default `false`), `category?: string` (overrides the chip label, e.g. "Featured"), `class?: string`.
- **Variants:**
  - Vertical: image on top, then the category chip, title (2 lines), description (2 lines), "date — reading time" and an arrow.
  - Horizontal: image and text side by side from `lg`, with a larger title.
- **Animations:** on hover, the image shifts slightly, the arrow nudges up-right and the title underlines. The whole card is clickable. The background is tinted with the post's `color` at 5%.
- **Visual weight:** Medium.
- **Used on:** Home, Blog, Blog Horizontal, Blog detail (related posts).
- **Notes:** light background only. Uses `thumbnail`, falling back to `image`.

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
- **Extra styles (CSS only):** `btn-dark`, `btn-light` and `btn-sm` exist in global.css but aren't component variants. Home gets a dark button by passing `class="btn btn-dark"`. `btn-circle` with `btn-circle-white` / `btn-circle-black` is a separate round "+" button used for "load more".
- **Animations:** button text roll.
- **Visual weight:** Light.
- **Used on:** Home, About, Team, Pricing, Contact, Privacy, 404, Job detail, WorkProcess. Header and Style Guide use the raw `btn` classes.

#### LineLink

- **File:** [src/components/LineLink.astro](src/components/LineLink.astro)
- **For:** an inline text link with an animated underline. Used for secondary CTAs, email and phone.
- **Props:** `label`, `href`, `tone?: 'primary' | 'white' | 'dark'` (default `primary`), `icon?: 'arrow' | 'down' | 'none'` (default `none`), `target?`, `rel?`, `class?`.
- **Animations:** line-link wipe.
- **Visual weight:** Light.
- **Used on:** Home, Contact, Job detail, Portfolio detail, Style Guide, Footer (all pages).

#### CounterUp

- **File:** [src/components/CounterUp.tsx](src/components/CounterUp.tsx) (React, `client:visible`)
- **For:** animated stat numbers.
- **Props:** `value: string` (prefix + number + suffix, e.g. `"110+"`, `"97%"`, `"$7B"`), `className?`.
- **Animations:** once visible, counts linearly from 60% of the value to the value over 1.5s. Values without a number are shown as they are. The final value is what's rendered in the HTML, so it shows without JavaScript and with reduced motion (no count). Facts hydrates it 200px before it scrolls into view so the count can start from 60%.
- **Visual weight:** Light.
- **Used on:** About, Services (inside Facts).
- **Notes:** keeps the value's decimals and thousands separators (`"1,200"` stays `1,200`). A bare four-digit year (1900–2100, e.g. `"2023"`) is shown without counting.

### Helpers

#### AstroImage

- **File:** [src/components/helper/AstroImage.astro](src/components/helper/AstroImage.astro)
- **For:** every image in the theme. It resolves a plain string path against `src/assets` (trying `/src/assets{path}`, `/src/assets/images{path}`, `/src{path}`) so Astro can optimize it, and falls back to a plain `<img>`.
- **Props:** `src`, `alt`, `width?`, `height?`, `loading?`, `decoding?`, `format?`, `class?`, `style?`, `widths?`, `sizes?`.
- **Used on:** almost every page and component, and inside portfolio MDX files.

#### AstroVideo

- **File:** [src/components/helper/AstroVideo.astro](src/components/helper/AstroVideo.astro)
- **For:** video, with the same path resolution for the file and its poster. Sets the MIME type from the file extension.
- **Props:** `src`, `poster?`, `class?`, `autoplay?`, `loop?`, `muted?`, `controls?`, `playsinline?`, `preload?` (default `metadata`), `width?`, `height?`, plus any other attributes.
- **Used on:** Home, About, Services (via Showreel and ReviewCarousel).

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
| 404 | `/404` | Error page | Error hero |

**Page types with no demo page:** service detail, events, locations / map. Closest matches:
- **Service detail:** Portfolio detail (sidebar + long-form body) for the layout, plus one card from the Services showcase deck for the intro.
- **Events:** nothing close. Team grid for speakers, Pricing for tickets, Faq for questions.
- **Locations / map:** the Contact page's details column. There's no map component.

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
| 7 | Blog: one featured horizontal post, 3-post grid, "View all posts" | `SectionTitle`, `BlogCard` (horizontal + vertical), `Button` | White |

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
| 7 | Team grid (photo, name, role) + "See Open Positions" | `SectionTitle`, inline grid, `Button` (black) | White |

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
| 2 | Team grid + CTA | Inline grid, `Button` (black) | White |
| 3 | Open positions, grouped by category; rows link to job pages, with a gray fill sweeping up on hover (`#open-positions`) | `SectionTitle`, inline list | Light |

### Job detail — `/job/[slug]`

[src/pages/job/[slug].astro](src/pages/job/[slug].astro) · content: `jobs` collection (MDX)

**Page type:** Careers: job posting · **Hero style:** Light split header

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Job header: meta line, title, "apply" jump link | Inline + `LineLink` (down arrow) | Light |
| 2 | Job description (MDX) | Inline `.content` | White |
| 3 | Application form: CV upload, name, email, phone, company, cover letter | Inline form + `Button` (submit) | Light |

> **Netlify Forms**, form name `job-application` (shared by every job page). Hidden fields: `form-name`, `subject` ("Job application: {job title}", used as the notification email subject) and `position` (the job title). Spam protection: the `bot-field` honeypot. JavaScript sends the form as `FormData` to `/` so the CV (`cv` field, .pdf/.doc/.docx) is included. Files over 7.5 MB are refused before sending, because Netlify caps a submission at 8 MB. Success or failure shows under the button, and success appears only on a 2xx response from Netlify. Without JavaScript, the browser posts the form normally and Netlify shows its default success page.

### Pricing — `/pricing`

[src/pages/pricing.astro](src/pages/pricing.astro) · content: `pricing`, `faq`

**Page type:** Pricing · **Hero style:** Page-title hero (left-aligned)

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Page header | `PageHeader` | Dark |
| 2 | Monthly/yearly toggle + 3 plan cards (featured card is dark with a "Most Popular" badge; check-mark feature list) | Inline + `Button` (block) | White |
| 3 | FAQ | `SectionTitle`, `Faq` | White |

> Toggle animation: the knob slides, labels swap weight, and prices count to the new value over 400ms. `formatPrice` hardcodes `$` and whole numbers. "Save 20%" and "Most Popular" are hardcoded text.

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
| 2 | Left: intro, email, phone, address. Right: form (name, email, phone, company, project type, budget, message) | Inline + `LineLink` (dark), `Button` (submit) | White |

> **Netlify Forms**, form name `contact`. Hidden fields: `form-name` and `subject` ("Message from Obicol Astro!", hardcoded, used as the notification email subject). Spam protection: the `bot-field` honeypot. JavaScript sends the form URL-encoded to `/`. "Message sent successfully!" shows only on a 2xx response from Netlify; anything else shows an error. Without JavaScript, the browser posts the form normally and Netlify shows its default success page. "Project type" and "Budget" options come from content.
>
> **Netlify setup (per site):** turn on form detection (**Forms → Enable form detection**, then redeploy) and add email notifications (**Forms → Submission notifications**). Submissions only work on a Netlify deploy, not with `npm run dev` or `npm run preview`.

### Portfolio — `/portfolio`

[src/pages/portfolio/index.astro](src/pages/portfolio/index.astro) · content: `portfolio`

**Page type:** Work / portfolio listing · **Hero style:** Page-title hero (left-aligned, green dot)

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Page header (with dot) | `PageHeader` | Dark |
| 2 | 2-column masonry of project tiles (JS-positioned), 4 shown, "+" loads 4 more | `PortfolioCard` (grid), inline masonry, `btn-circle` | White |

### Portfolio detail (case study) — `/portfolio/[slug]`

[src/pages/portfolio/[slug].astro](src/pages/portfolio/[slug].astro) · content: `portfolio` collection (MDX, which uses `AstroImage`)

**Page type:** Case study / project detail · **Hero style:** Page-title hero + feature image

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | "Case Study" header with H1 | Inline | Dark |
| 2 | Hero image (overlaps the next section) | Inline `AstroImage` | Dark |
| 3 | Sidebar (client, description, website link, other info, services) + case-study body | Inline + `LineLink`, MDX `.content` | White |
| 4 | "What's next?": 3 other projects | `PortfolioCard` (grid) | White |

### Blog — `/blog`

[src/pages/blog/index.astro](src/pages/blog/index.astro) · content: `blog`

**Page type:** Blog / news listing (grid) · **Hero style:** Page-title hero (left-aligned, green dot)

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Page header (with dot) | `PageHeader` | Dark |
| 2 | Newest post full-width horizontal, then a 3-column grid; 4 shown, "+" loads 4 more | `BlogCard`, `btn-circle` | White |

### Blog Horizontal — `/blog-horizontal`

[src/pages/blog-horizontal.astro](src/pages/blog-horizontal.astro) · content: `blog`

**Page type:** Blog / news listing (single-column list) · **Hero style:** Page-title hero (left-aligned, green dot)

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Page header (with dot) | `PageHeader` | Dark |
| 2 | Single column of horizontal cards; 4 shown, "+" loads 4 more | `BlogCard` (horizontal), `btn-circle` | White |

### Blog detail — `/blog/[slug]`

[src/pages/blog/[slug].astro](src/pages/blog/[slug].astro) · content: `blog` collection (MDX; one post embeds YouTube via `astro-embed`)

**Page type:** Blog / news post · **Hero style:** Page-title hero + feature image

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Post header: category — date, H1 | Inline | Dark |
| 2 | Hero image (overlaps the next section) | Inline `AstroImage` | Dark |
| 3 | Article body (large first paragraph) + sticky table of contents with scroll-spy highlighting; the TOC collapses into a toggle on mobile | Inline MDX `.content`, inline TOC | White |
| 4 | Related posts (3) | `BlogCard` | White |

### Privacy — `/privacy`

[src/pages/privacy.astro](src/pages/privacy.astro) · content: `pages/privacy.mdx`. Works as a generic long-form page template.

**Page type:** Legal (privacy, terms, cookies) / generic long-form · **Hero style:** Page-title hero (left-aligned)

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Page header | `PageHeader` | Dark |
| 2 | MDX body + optional CTA (heading, button, note) | Inline `.content`, `Button` (black) | White |

### Style Guide — `/style-guide`

[src/pages/style-guide.astro](src/pages/style-guide.astro)

**Page type:** Internal design reference; remove it from the menu before launch · **Hero style:** Page-title hero (left-aligned)

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Page header | `PageHeader` | Dark |
| 2 | Headings H1–H6, typeface, paragraphs, lists | Inline `.content` | White |
| 3 | Buttons (dark, black, light, white), line links (4 tones), circle buttons | Raw `btn` classes, `LineLink` | White |
| 4 | Accordion | `Faq` | White |
| 5 | Embeds: link preview, Mastodon post, YouTube, Vimeo | `astro-embed` | White |

### 404

[src/pages/404.astro](src/pages/404.astro)

**Page type:** Error page · **Hero style:** Error hero

| # | Section | Component(s) | Background |
| --- | --- | --- | --- |
| 1 | Large "404" (last digit mirrored), message, "Back to Home" | Inline + `Button` | Dark |

### Patterns that exist only inline

These are reusable in spirit but live inside page files. Extract them into components if you plan to reuse them:

- **Team member grid:** duplicated in `about.astro` and `team.astro`.
- **Pricing plan cards + billing toggle:** `pricing.astro`.
- **Service showcase deck** (colored alternating cards): `services.astro`.
- **Job openings list:** `team.astro`.
- **Contact form** and **job application form:** `contact.astro`, `job/[slug].astro`.
- **Detail-page header + overlapping hero image:** `blog/[slug].astro`, `portfolio/[slug].astro`.
- **Table of contents with scroll-spy:** `blog/[slug].astro`.
- **"+" load-more:** duplicated in `blog/index.astro`, `blog-horizontal.astro`, `portfolio/index.astro`.
- **Home hero** (headline + CTAs + lead + social proof): `index.astro`.

---

## Best uses by site type

The theme is built as a **creative agency / studio** site: dark, motion-rich, image-led, with case studies at its core. The further a site gets from that, the more the heavy pieces need to be swapped or toned down.

### Changes worth making for any client site

- Repoint or remove the Header's **"Buy Now"** button (`buyNow` in site config).
- Replace the footer credit **"Developed by Platoltheme"** and fix the **`/blogs-1-col`** footer link.
- **Forms use Netlify Forms.** In the site's Netlify dashboard, turn on form detection and set up email notifications for the `contact` and `job-application` forms. Also change the contact form's hardcoded **subject line**.

### Corporate

Established firms, consultancies, B2B services.

**Fits well**
- Pages: About, Services, Team (with open positions and Job detail), Contact, FAQ, Privacy, Blog (as a newsroom).
- Components: `PageHeader`, `SectionTitle`, `Facts` (company in numbers), `Clients`, `ReviewCarousel` with text cards, the services showcase deck, `BlogCard`, `Faq`, `LineLink`, `Button`.

**Needs changes**
- **Home hero:** swap `Showreel` for a still image or a muted ambient loop without the custom cursor; the "Play" pill cursor reads as playful.
- **`StackedServices` / `WorkProcess`:** keep them, but lower the glyph and frosted-glass styling if the brand is conservative.
- **`ReviewCarousel`:** the X/Twitter icon on every quote is wrong for corporate references; make the social icon configurable or drop it.
- **Pricing:** usually not wanted. Remove it from the menu.
- **Palette:** the near-black and neon green may need re-theming through the `@theme` tokens in global.css.

### Non-profit

Charities, foundations, community organizations.

**Fits well**
- Pages: About, Team, Blog (news and stories), FAQ, Contact, Privacy.
- Components: `Facts` (impact numbers such as people helped or funds raised), `WorkProcess` (how a donation becomes impact, in four steps), `TeamGroupCarousel` (volunteers and events), `ReviewCarousel` (beneficiary or volunteer stories; video cards work well), `Clients` (partners and funders), `BlogCard`.

**Needs changes**
- **Donations:** there's no donation component. The Pricing page could become donation tiers, but its toggle is billing-specific ("Monthly/Yearly", "Save 20%") and should become "One-time/Monthly"; `formatPrice` hardcodes `$` and whole numbers; "Most Popular" is hardcoded; CTAs need a payment-provider link.
- **Contact form:** replace "Type of Project" and "Budget" with fields like "How would you like to help?".
- **Accessibility:** non-profits often have stricter accessibility requirements. Add `aria-expanded` on `Faq` and real alt text in `TeamGroupCarousel`.
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
- **Pricing as tickets:** remove the monthly/yearly toggle; change "Most Popular" and the `$` formatting; link CTAs to a ticketing provider.
- **Team grid as speakers:** needs talk title, company and a link per person; `teamMembers` only has name, role and image.
- **Portfolio pages:** usually not needed. Could become "Past editions".

### Product

SaaS, apps, digital or physical products.

**Fits well**
- Pages: Home, Pricing (the monthly/yearly toggle with animated prices is a natural fit), FAQ, Blog (changelog and guides), Contact (sales), About, Team + Jobs (careers), Privacy (and a Terms page from the same template).
- Components: hero + `Showreel` (product demo video), `StackedServices` (features), `WorkProcess` (how it works / onboarding steps), `Facts` (usage metrics), `ReviewCarousel` (the rating summary card and top-company logos fit well), `Clients` (customer logos), `Faq`, `BannerTestimonial`.

**Needs changes**
- **Header CTA:** change "Buy Now" to "Sign up" or "Start free trial".
- **Missing pieces:** no feature-comparison table, integrations grid, app-store badges, screenshot or device mockup gallery, or changelog layout.
- **Pricing:** "Save 20%" is hardcoded and should come from content; `formatPrice` assumes USD; the plan cards have no "per seat" or usage notes beyond the feature list.
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
