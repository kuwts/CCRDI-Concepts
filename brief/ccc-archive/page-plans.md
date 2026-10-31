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
| 3 | Sidebar | Inline + `LineLink` | Brand name, one-liner, the brand's list (Marketing), link ("Visit Website" → ccaward.com for the Award; "Contact Us" → /contact otherwise); CCRDI: role + core message; Award only: confirmed facts (1987 launch in Montréal; one winner per category). (Built: the Award and Marketing core messages are the body headings, so they aren't repeated in the sidebar.) | §5, §2, Our Brands list, ccaward.com |
| 4 | Body | `.content` MDX | **Award:** core message (heading), relationship line, ccaward.com's description of how winners are chosen, its process heading and the four steps with their text. **Marketing:** core message (heading), relationship line. **CCRDI:** §7 hero heading and text, positioning, "Our Mission", "Our Vision", §7 "Core Services" (all five, with their text), ISUCORP credibility message, then the relationship line (award research after the broader positioning) | §2, §6, §7, §12, ccaward.com |
| 5 | Family of Brands | `SectionTitle` + `PortfolioCarousel` (as on 40 Years) | All three brands, linking to the brand pages | §2, §5 |

SEO descriptions: Award and Marketing: their §5 one-liners; CCRDI: the §12 one-line description.
Also: the Our Brands cards, the homepage and 40 Years brand sliders and the footer brand links
now link to these pages ("Learn More" on the Our Brands cards).

---

# Round 2: richer pages (pre-approved; written before each change)

Goal: bring the newer pages closer to Home, About, Our Brands and 40 Years, using the theme's
own sections, with a different mix on each page so the site doesn't repeat itself. Content
rules unchanged; no new copy. Contact and the legal pages stay short (the skill's Contact flow
is "keep it short"; Privacy and Accessibility stay as they are).

## For Businesses (round 2)
| # | Section | Component | Content | Source |
|---|---|---|---|---|
| 1 | Page header | `PageHeader` | H1 "For Businesses" | unchanged |
| 2 | **New:** intro + card stack | Home intro block (inline) + `StackedServices` (brand photos, Lucide icons) | Label "Family of Brands"; heading: the Growth pillar line; text: About paragraph 2; pills: the three §2 roles; 3 cards: brand name, §5 one-liner, §9 tagline | Labels; §4; §5; §2; §9 |
| 3 | Audiences + contact path | `WorkProcess` (3 cards) | unchanged | §8; §3 |
| 4 | Marketing and CCRDI cards | `SectionTitle` + `BlogCard`s | unchanged | §9; §12 |
| 5 | **New:** testimonials | `SectionTitle` + `ReviewCarousel` | the homepage testimonial placeholders (award winners' stories belong here) | placeholders |

## Media & Partners (round 2)
| # | Section | Component | Content | Source |
|---|---|---|---|---|
| 1 | Page header | `PageHeader` | unchanged | |
| 2 | **New:** logo wall | `SectionTitle` + `Clients` (navy, as on Our Brands) | "Family of Brands": the real Consumer Choice Award logo and the brand wordmarks (what media most often need) | Labels; Our Brands logos |
| 3 | Body | `.content` | unchanged | |
| 4 | News | `BlogCard`s | unchanged | |

## Consumer Choice Award page (round 2)
| # | Section | Component | Content | Source |
|---|---|---|---|---|
| 1–3 | Header, feature, sidebar + body | unchanged, plus the real Consumer Choice Award logo at the top of the sidebar | | ccaward.com logo |
| 3 | Body | `.content` | core message heading, relationship line, how winners are chosen (the process steps move to section 4) | §2; §12; ccaward.com |
| 4 | **New:** the process as cards | `WorkProcess` (dark, 4 cards) | Heading: ccaward.com's "Canada's only award organization to utilize statistically supported independent research."; the four steps with their text; strip: "Recognizing and celebrating business excellence since 1987" + `LineLink` "Find a Trusted Business" → the winners directory | ccaward.com; labels |
| 5 | Family of Brands | `PortfolioCarousel` | unchanged | |

## CCRDI page (round 2)
| # | Section | Component | Content | Source |
|---|---|---|---|---|
| 1–3 | Header, feature, sidebar + body | unchanged; the body keeps the hero heading and text, positioning, mission, vision (the services move to section 4) | | §6; §7 |
| 4 | **New:** core services as a card stack | Home intro block (inline, ivory) + `StackedServices` (5 cards, Lucide icons, no photos) | Label "Core Services"; heading: the ISUCORP credibility message; text: the relationship line; 5 cards: service name + its §7 text | §7; §12 |
| 5 | Family of Brands | `PortfolioCarousel` | unchanged | |

## Consumer Choice Marketing page (round 2)
Sections 1 to 13 have little Marketing copy (core message, one-liner, relationship line,
tagline; the service list is pending confirmation), so one section is added:
| # | Section | Component | Content | Source |
|---|---|---|---|---|
| 4 | **New:** testimonials | `SectionTitle` + `ReviewCarousel` (ivory) | the homepage testimonial placeholders (award winners telling their story fits Marketing) | placeholders |

---

# Round 3: new components on real pages (proposal; waiting for approval)

Each plan replaces the section that already carries the content; nothing is shown twice. All copy
is from framework sections 1 to 13, content.md (including its interface labels), or ccaward.com
facts already logged in gaps.md. Anything missing is a `[CLIENT TO PROVIDE: …]` placeholder.
The homepage is unchanged.

## 40 Years (`/40-years`)
| # | Section | Component | Content | Source | Change |
|---|---|---|---|---|---|
| 1–2 | Header, showreel | unchanged | | | |
| 3 | Sidebar + body | case-study layout | Sidebar keeps the seal, the Award link and the Our Brands list; **the three milestones move out of it** | | milestones removed from the sidebar |
| 4 | **Milestones (new section, white, gold hairline above)** | `StepList` timeline | Heading `[CLIENT TO PROVIDE: milestones heading]` (no approved label fits); items: "1987", "Coast to coast", "2027" with their confirmed lines | ccaward.com (gaps.md) | replaces the sidebar milestones |
| 5 | Family of Brands | `PortfolioCarousel` (ivory) | unchanged | | |

## Consumer Choice Award (`/our-brands/consumer-choice-award`)
| # | Section | Component | Content | Source | Change |
|---|---|---|---|---|---|
| 0 | **Breadcrumbs** | `Breadcrumbs` (dark) in the page header, above the eyebrow | Home › Our Brands › Consumer Choice Award | page title labels | new |
| 1–3 | Header, feature photo, sidebar + body | unchanged | | | |
| 4 | **The selection process (navy)** | `SectionTitle`-style heading on the left (sticky), `StepList` steps (dark) on the right | Heading: "Canada's only award organization to utilize statistically supported independent research."; the four steps with their text | ccaward.com (gaps.md) | **replaces** `WorkProcess` (the same four steps as cards) |
| 5 | Family of Brands | `PortfolioCarousel` (white) | unchanged | | |
| 6 | **Closing CTA (ivory)** | `CtaBand` ivory | Eyebrow "Consumers"; title "Make more confident decisions with trusted recognition and independent insight."; text "Recognizing and celebrating business excellence since 1987"; LineLink "Find a Trusted Business" → winners directory | §8; ccaward.com; labels | new; takes over the line and link from WorkProcess's CTA strip (removed with it) |

## Consumer Choice Marketing (`/our-brands/consumer-choice-marketing`)
| # | Section | Component | Content | Source | Change |
|---|---|---|---|---|---|
| 0 | **Breadcrumbs** | as above | Home › Our Brands › Consumer Choice Marketing | labels | new |
| 1–5 | Header, photo, sidebar + body, testimonials, Family of Brands | unchanged | | | |
| 6 | **Closing CTA (ivory)** | `CtaBand` ivory | Eyebrow "Award Winners"; title "Turn consumer recognition into stronger credibility, visibility, and growth."; LineLink "Contact Us" → /contact | §8; labels | new |

## CCRDI (`/our-brands/ccrdi`)
| # | Section | Component | Content | Source | Change |
|---|---|---|---|---|---|
| 0 | **Breadcrumbs** | as above | Home › Our Brands › Consumer Choice Research, Data & Insights | labels; page H1 | new |
| 1–5 | Header, photo, sidebar + body, core services, Family of Brands | unchanged | | | |
| 6 | **Closing CTA (ivory)** | `CtaBand` ivory | Eyebrow "Business Leaders"; title "Understand how your organization is perceived, where it stands, and where opportunities exist."; LineLink "Contact Us" → /contact | §8; labels | new |

Brand pages also get **BreadcrumbList structured data** (JSON-LD: Home, Our Brands, the brand),
with absolute URLs from `baseURL` (still example.com until the domain is confirmed, questions.md #12).
The closing CTA is ivory and comes after the white brand slider, so it doesn't sit navy-on-navy
against the footer. No `Button`: the header already carries the site's main action.

## Media & Partners (`/media`)
| # | Section | Component | Content | Source | Change |
|---|---|---|---|---|---|
| 1–2 | Header, Family of Brands logo wall | unchanged | | | |
| 3 | Body | `.content` | Intro line, CCC and CCRDI one-liners (unchanged) **plus a `Callout` (note) for media enquiries**: title `[CLIENT TO PROVIDE: media contact heading]`, body `[CLIENT TO PROVIDE: media contact name, email and phone]`, LineLink "Contact Us" → /contact | §8, §12; gaps.md; labels | **replaces** the media contact heading and placeholder in the body |
| 4 | **Logo downloads (ivory)** | heading + `DownloadCards` | Heading `[CLIENT TO PROVIDE: logo downloads heading]`; cards (see decision 2) | gaps.md | **replaces** the logo downloads placeholder in the body |
| 5 | **News (white, gold hairline)** | `SectionTitle` + `NewsList` | The homepage news placeholders (heading, 4 items: headline, summary, date, category), with their placeholder photos for the cursor preview | homepage content | **replaces** the `BlogCard` news grid |

## Our Brands (`/our-brands`)
| # | Section | Component | Content | Source | Change |
|---|---|---|---|---|---|
| 3 | Brand architecture | see decision 1 | Brand / Primary Role / Core Message for the four brands, caption "Brand Architecture" | §2 | |

## Decisions needed
1. **Our Brands: the `Facts` bento is already the §2 brand architecture** (one tile per brand
   with its role and core message, plus the three confirmed facts). A table beside it would
   duplicate it. CLAUDE.md says Our Brands must keep every section of the theme's page.
   - **A (recommended):** replace `Facts` with the `ComparisonTable` (§2), followed by a
     `StatRow` for the three confirmed facts (1987, 40+, 1). This needs a one-off exception to
     the keep-every-section rule for Our Brands (I'd note it in CLAUDE.md).
   - **B:** keep `Facts` and skip the table on Our Brands (the rule stays as written).
2. **Media: the logo download files.** Use the client's supplied logos as the downloads
   (Consumer Choice Canada, Consumer Choice Marketing, CCRDI: the trimmed PNGs; Consumer Choice
   Award: the medal from ccaward.com), titled with the brand names, format and size shown, no
   descriptions? Or keep placeholder cards until the client supplies a media kit? Recommended:
   the supplied logos, logged in gaps.md for the client to confirm they may be downloaded (the
   temporary white versions are not offered).
3. **40 Years: milestones heading.** A placeholder heading (recommended; it gives the timeline a
   proper section heading), or no heading (the years carry the structure)?
