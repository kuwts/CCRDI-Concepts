# Page plans: remaining pages

Pre-approved by the project owner; written before each page was built, for later review.
Sources: framework (sections 1 to 13) and content.md word for word; public facts from
ccaward.com (sources in gaps.md); labels from content.md "Interface labels". New pages follow
the general CLAUDE.md rule: theme sections with no content are left out (the keep-every-section
exception covers only Home, About, Our Brands and 40 Years). Decisions only the owner can make
are in /brief/questions.md.

---

## For Businesses (`/for-businesses`)
**Page type:** Services overview (skill flow: page-title hero → audiences → brands → contact path)
· **Hero:** small page-title hero. No single theme page fits, so the page is composed from the
theme's own sections, in the Services-overview order.

| # | Section | Component | Content | Source |
|---|---|---|---|---|
| 1 | Page header | `PageHeader` | H1 "For Businesses"; no eyebrow | Page title label |
| 2 | Audiences + contact path | `WorkProcess` (dark; new `columns` option for 3 cards; CTA strip photos optional) | Title "Who We Serve"; cards: Award Winners, Business Leaders, Industry Associations; strip: "Building Trust Between Consumers and Business." + `LineLink` "Contact Us" → /contact | Labels; §8; §3 alternate tagline (secondary use) |
| 3 | Consumer Choice Marketing and CCRDI | `SectionTitle` + 2 `BlogCard`s (plain items, homepage news pattern) | Title "Family of Brands"; each card: tagline as chip, brand name, relationship line, brand photo, link to the brand page | Labels; §9; §12 |

Left out: testimonials, stats (no content). SEO description: the Business Leaders line (§8).

## Media & Partners (`/media`)
**Page type:** Legal / generic long-form + news · **Hero:** small page-title hero.
Built on the theme's long-form page (Privacy), as a shared template for the `pages` collection
(`src/pages/[page].astro`, which also builds /accessibility), plus the homepage news section.

| # | Section | Component | Content | Source |
|---|---|---|---|---|
| 1 | Page header | `PageHeader` | H1 "Media & Partners" | Page title label |
| 2 | Long-form body | `.content` MDX | Media and Partners message; "Consumer Choice Canada" + CCC one-line description; "Consumer Choice Research, Data & Insights" + CCRDI one-line description; media contact and logo downloads as placeholders | §8; §12; gaps.md |
| 3 | News | `SectionTitle` + `BlogCard`s | The homepage news placeholders (heading, 4 cards) | homepage content |

SEO description: the Media and Partners line (§8).

## Contact (`/contact`) and thank-you (`/thank-you/contact`)
**Page type:** Contact · **Hero:** small page-title hero. The theme's Contact page, fields cut to
content.md's list.

| # | Section | Component | Content | Source |
|---|---|---|---|---|
| 1 | Page header | `PageHeader` | H1 "Contact"; no eyebrow | Page title label |
| 2 | Details | Inline + `LineLink` | Intro heading and text: placeholders; "Email" + placeholder; phone and address: placeholders (no labels, see questions.md) | Labels; gaps.md |
| 3 | Form (Netlify, `contact`) | Inline form + `Button` (light) | Fields Name, Email, Organization, Message; button "Send"; sending and error messages: placeholders. Phone, project type and budget fields removed | content.md form fields |
| 4 | Thank-you page | Thank-you template | Heading and body: placeholders; button "Return Home" → / | Labels |

## Privacy Policy (`/privacy`) and Accessibility Statement (`/accessibility`)
**Page type:** Legal · **Hero:** small page-title hero. The theme's Privacy page (and the shared
`[page].astro` template for Accessibility).

| # | Section | Component | Content | Source |
|---|---|---|---|---|
| 1 | Page header | `PageHeader` | H1 "Privacy Policy" / "Accessibility Statement"; eyebrow: last-updated placeholder | Page title labels |
| 2 | Body | `.content` | `[CLIENT TO PROVIDE: privacy policy text]` / `[CLIENT TO PROVIDE: accessibility statement text]`. No legal text written | gaps.md |

The theme's closing "Submit Request" block is left out (no content).

## 404
**Page type:** Error · **Hero:** error hero (theme). "404" numeral; heading "Page not found";
message `[CLIENT TO PROVIDE: 404 message]`; button "Return Home" → /. Source: content.md 404 labels.

## Brand pages (`/our-brands/consumer-choice-award`, `/consumer-choice-marketing`, `/ccrdi`)
**Page type:** Item / product detail (case study) · **Hero:** page-title hero + feature image.
One template (`src/pages/our-brands/[slug].astro`) on the 40 Years layout (the theme's case-study
page), content in `src/content/brand-pages/`. Each page uses its division colour as the accent
(a rule under the H1, the sidebar list markers and link underline); text stays navy or dark for
contrast.

| # | Section | Component | Content | Source |
|---|---|---|---|---|
| 1 | Header | Inline (case study) | Eyebrow: brand tagline; H1: brand name | §9 |
| 2 | Feature image | `AstroImage` | The brand's photo (the same one as on Home and Our Brands) | placeholder-media.md |
| 3 | Sidebar | Inline + `LineLink` | Brand name, one-liner, the brand's list (Marketing), link ("Visit Website" → ccaward.com for the Award; "Contact Us" → /contact otherwise); role + core message; Award only: confirmed facts (1987 launch in Montréal; one winner per category) | §5, §2, Our Brands list, ccaward.com |
| 4 | Body | `.content` MDX | **Award:** core message (heading), relationship line, ccaward.com's description of how winners are chosen, its process heading and the four steps with their text. **Marketing:** core message (heading), relationship line. **CCRDI:** §7 hero heading and text, positioning, "Our Mission", "Our Vision", §7 "Core Services" (all five, with their text), ISUCORP credibility message, then the relationship line (award research after the broader positioning) | §2, §6, §7, §12, ccaward.com |
| 5 | Family of Brands | `SectionTitle` + `PortfolioCarousel` (as on 40 Years) | All three brands, linking to the brand pages | §2, §5 |

SEO descriptions: Award and Marketing: their §5 one-liners; CCRDI: the §12 one-line description.
Also: the Our Brands cards, the homepage and 40 Years brand sliders and the footer brand links
now link to these pages ("Learn More" on the Our Brands cards).
