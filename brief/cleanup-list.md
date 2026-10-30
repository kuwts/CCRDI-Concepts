# Cleanup list

Everything from the Obicol theme that could be deleted in the cleanup phase, with what depends
on it. **Nothing has been deleted.** Delete only after the project owner approves this list,
then follow THEME_CATALOG.md "Removing a page cleanly". Until then, every demo page is
`noindex` and kept out of the XML sitemap (`noIndexPaths` in `astro.config.mjs`).

Order matters: pages first, then the content, schemas and helpers only those pages read, then
components and assets, then packages. After each step run `npx astro check`, `npm run build`
and a link check. Restart the dev server with `.astro/data-store.json` deleted after schema
changes (CLAUDE.md).

## 1. Demo pages (routes)

| File | Route(s) | Reads | Linked from |
|---|---|---|---|
| `src/pages/blog/index.astro` | /blog | `blog`, `listings` (blog), `BlogCard`, `LoadMore` | nothing in CCC pages |
| `src/pages/blog/[slug].astro` | /blog/… (7 posts) | `blog`, `BlogCard`, `formatDate`, `readingTime` | /blog |
| `src/pages/blog-horizontal.astro` | /blog-horizontal | `blog`, `listings`, `BlogCard`, `LoadMore` | nothing |
| `src/pages/portfolio/index.astro` | /portfolio | `portfolio`, `listings` (portfolio), `PortfolioCard`, `LoadMore` | nothing |
| `src/pages/portfolio/[slug].astro` | /portfolio/… (7) | `portfolio`, `PortfolioCard`, `LineLink` | /portfolio |
| `src/pages/job/[slug].astro` | /job/… (8) | `jobs`, `team` → `application_form` | /team |
| `src/pages/team.astro` | /team | `team`, `teamMembers`, `jobs`, `TeamGrid` | nothing |
| `src/pages/pricing.astro` | /pricing | `pricing`, `faq`, `Faq` | nothing |
| `src/pages/faq.astro` | /faq | `faq`, `Faq` | nothing |
| `src/pages/services.astro` | /services | `services`, `about.clients`, `about.facts`, `clients`, `homepage.testimonials` | nothing (Our Brands is its own page, built from this layout) |
| `src/pages/style-guide.astro` | /style-guide | `faq`, `astro-embed` | nothing |
| `src/content/thank-you/application.mdx` | /thank-you/application | `thankYou` (shared template stays for /thank-you/contact) | the job form `action` only |

| `src/pages/component-lab.astro` | /component-lab | the new CCC components (`src/components/ccc/`) | nothing (internal test page, noindex, not in the sitemap) |

**Keep:** `src/pages/thank-you/[slug].astro` (it builds /thank-you/contact), `privacy.astro`,
`404.astro`, `favicon.ico.ts`, `robots.txt.ts`, `site.webmanifest.ts`.

## 2. Content and data only demo pages read

| Path | Collection | Depends on it |
|---|---|---|
| `src/content/blog/` (7 MDX) | `blog` | blog pages; `BlogCard` `post` mode |
| `src/content/portfolio/` (7 MDX) | `portfolio` | portfolio pages; `getFeaturedProjects` |
| `src/content/jobs/` (8 MDX) | `jobs` | job pages, team page |
| `src/content/team/index.mdx` | `team` | team page, job application form |
| `src/content/pricing/index.mdx` | `pricing` | pricing page |
| `src/content/faq/index.mdx` | `faq` | faq, pricing, style-guide |
| `src/content/services/index.mdx` | `services` | services page |
| `src/content/data/listings.json` | `listings` | blog and portfolio listings |
| `src/content/data/team.json` | `teamMembers` | team page; About uses it only as a fallback when `about.team.members` is empty (it isn't) |
| `src/content/data/clients.json`, `clients-dark.json` | `clients`, `clientsDark` | services page; About and Our Brands use them only as fallbacks (both set their own logos) |
| `src/content/data/testimonials.json` | `testimonials` | services page only (Home, About and Our Brands read `homepage.testimonials.items`) |

**With them:**
- their schemas in `src/types/collections.ts` (`blog`, `portfolio`, `jobs`, `team`,
  `pricing`, `faq`, `services`, `listings`, `teamMembers`, `clients`, `clientsDark`,
  `testimonials`), and their entries in `src/content.config.ts`
- `src/lib/content.ts` (`getPosts`, `getProjects`, `getJobs`, `getFeaturedProjects`; only demo
  pages call it)
- the fallback code in `about.astro` and `our-brands.astro`

**Keep:** `homepage`, `about`, `brands`, `anniversary`, `businesses`, `brandPages`, `contact`,
`pages` (privacy, accessibility, media), `thankYou` (contact).

## 3. Components and helpers

| File | Used by | After cleanup |
|---|---|---|
| `src/components/Faq.astro` | faq, pricing, style-guide | unused: delete (or keep for a future CCC FAQ) |
| `src/components/LoadMore.astro` | blog, blog-horizontal, portfolio | unused: delete |
| `src/utils/readingTime.ts`, `src/utils/formatDate.ts` | `BlogCard` `post` mode | delete with `BlogCard`'s `post` mode (the `item` mode stays) |
| `src/components/BlogCard.astro` | Home, Media, For Businesses (`item` mode); blog pages (`post` mode) | keep; drop `post` mode |
| `src/components/TeamGrid.astro` | About (CCC), team page | keep |
| `src/components/PortfolioCard.astro`, `PortfolioCarousel.astro` | Home, 40 Years, brand pages (carousel); portfolio pages (grid) | keep; drop the `/portfolio/{slug}` default link |
| `src/components/helper/DeviceSizeIndicator.astro` | `Base.astro`, dev only | keep or delete (not in production builds) |

| `src/components/GradualBlur.astro` | nothing (removed from `Base.astro` with the UI proposal) | unused: delete |

Every other component is used by a CCC page. Also keep `CounterUp` and `PauseButton`.

## 4. Images and video

| Path | Size | Used by |
|---|---|---|
| `src/assets/images/blogs/` | 96 KB | blog content |
| `src/assets/images/portfolio/` | 160 KB | portfolio content |
| `src/assets/images/services/` | 60 KB | services content |
| `src/assets/images/team/` | 576 KB | `team.json` |
| `src/assets/images/team-group/` | 40 KB | nothing (About now uses placeholders) |
| `src/assets/images/clients/` (20 logos) | 120 KB | `clients*.json`, `pricing` |
| `src/assets/images/testimonials/` (avatars, `video-01.mp4`, `video-02.mp4`) | 820 KB | `testimonials.json` |
| `src/assets/images/about-header.jpg`, `about-stats.jpg` | — | nothing |
| `src/assets/images/logo.svg` (Obicol logo) | — | nothing (the site uses the client's CCC logo) |
| `src/assets/images/placeholders/logo-wordmark.svg`, `wordmark-consumer-choice-canada.svg`, `wordmark-consumer-choice-marketing.svg`, `wordmark-ccrdi.svg` | — | nothing (replaced by the client's logos) |
| `src/assets/videos/showreel.webm`, `showreel.mp4`, `poster.png` | 4.3 MB | nothing in CCC pages; the demo homepage video |
| `public/.DS_Store`, `public/images/.DS_Store` | — | macOS files; delete and they're already git-ignored |

**Replace, don't delete:** `public/images/ogimage.png` and the 5 icons in `public/images/icons/`
(the theme's placeholders; CCC versions needed, gaps.md).

**Keep until launch:** `src/assets/images/placeholders/`, `src/assets/videos/placeholders/`
(placeholder-media.md; removed when the client's media arrives), `src/assets/images/brands/`.

## 5. Packages

| Package | Used by | After cleanup |
|---|---|---|
| `@iconify-json/hugeicons` | nothing (all icons are Lucide now) | remove now: `npm uninstall @iconify-json/hugeicons` |
| `astro-embed` | style-guide, one blog post (YouTube embed) | remove with them |
| `marked` | `src/utils/textConverter.ts` → `Facts` (About, Our Brands) | keep |
| `swiper` | `PortfolioCarousel`, `ReviewCarousel` | keep |
| `playwright` (dev) | screenshots and checks | keep |

## 6. Config and docs

- `src/config/site.config.json`: `seo.pages` entries for `/blog`, `/blog-horizontal`,
  `/portfolio`.
- `astro.config.mjs`: the demo entries in `noIndexPaths` (keep `/thank-you/` and, if kept,
  `/style-guide`).
- `THEME_CATALOG.md`: remove the demo page sections, and record the CCC pages.
- `CONTENT_TEMPLATE.md`: the theme's client template. Tailor it to the CCC sitemap, or remove
  it if gaps.md replaces it.
- `brief/theme-audit.md`: out of date (CLAUDE.md says so). Keep it as history, or remove it.
