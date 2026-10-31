# Content still needed from the client (CCRDI)

Copy sources: the Key Messaging Framework (sections 1 to 13) and content.md. "Covered" means
the framework or content.md supplies the copy. The Consumer Choice Canada site's register is
in ccc-archive/gaps.md.

## Launch blockers
- [ ] **[CLIENT TO PROVIDE: CCRDI domain].** The site uses the placeholder `https://ccrdi.example`
      (`baseURL` in src/config/site.config.json). `.example` is reserved (RFC 2606): it can't
      resolve or belong to anyone. Canonical URLs, share tags, the XML sitemap, robots.txt and
      the structured data all follow `baseURL`. While it's the placeholder, the build prints a
      warning and robots.txt disallows everything. Pre-launch check in CLAUDE.md.

## Covered by the framework
- [x] Positioning statement, mission, vision, five taglines (§6)
- [x] Homepage hero headline and body (§7)
- [x] Core Services: five services with one line each (§7)
- [x] ISUCORP credibility message (§7)
- [x] Audience lines: Business Leaders, Industry Associations, Media and Partners (§8)
- [x] Messaging hierarchy line (§9); role and core message (§2); family-of-brands line (§3)
- [x] One-line description and relationship line (§12)
- [x] Sister-brand lines for the family of brands (§2, §3, §9, §12)

## Still needed
- [ ] Contact details: [CLIENT TO PROVIDE: email], [CLIENT TO PROVIDE: phone],
      [CLIENT TO PROVIDE: address]; where contact form messages should go.
- [ ] Official CCRDI logo as SVG, a reversed (white) version for dark backgrounds, and a
      favicon or app icon. The site will use a temporary reversed logo and favicon made from
      the supplied PNG (src/assets/images/brands/ccrdi-logo.png).
- [ ] Service detail copy: the framework gives one line per Core Service. A short description
      of each (what it covers, who it's for, deliverables) would let each service have more
      than one line, or its own page later.
- [ ] Methodology: how CCRDI's independent research works (sampling, data sources, frequency),
      in the client's words.
- [ ] Figures for stats (only real, citable numbers with permission to publish): e.g.
      [CLIENT TO PROVIDE: number of categories researched], [CLIENT TO PROVIDE: number of
      consumers surveyed]. No numbers are invented.
- [ ] Clients and partners: names and logos, with permission to show them.
- [ ] Testimonials: quotes from organizations CCRDI has worked with, with names and roles and
      permission to publish.
- [ ] Leadership or team: names, roles, photos, short bios (About team grid).
- [ ] Team or workplace photos (About team photos).
- [ ] News, published reports or research summaries (homepage news section).
- [ ] Photography and video: replace every placeholder in placeholder-media.md.
- [ ] Social media accounts for CCRDI (none found; the CCC site linked Consumer Choice Award's).
- [ ] Founding year of CCRDI, if the client wants it shown (not used until supplied).
- [ ] Privacy policy text: [CLIENT TO PROVIDE: privacy policy text].
- [ ] Accessibility statement text: [CLIENT TO PROVIDE: accessibility statement text].
- [ ] Media contact (name, email, phone) for the Media & Partners page.
- [ ] Sister-brand links: Consumer Choice Marketing URL ([CLIENT TO PROVIDE: Consumer Choice
      Marketing URL]); confirm Consumer Choice Canada's domain (consumerchoicecanada.com, from
      the CCC project) is live.

## Approvals and open questions
- [ ] **Interface labels** in content.md (navigation, buttons, section labels, 404, form
      fields): reused from the labels approved for the Consumer Choice Canada site, plus
      "Core Services" (the framework's §7 heading). Confirm for CCRDI.
- [ ] **ISUCORP spelling:** the framework writes "ISUCORP"; ccaward.com writes "IsuCorp.".
      The site follows the framework. Confirm.
- [ ] **Research partner wording:** ccaward.com says "CCRDI powered by IsuCorp.", while recent
      Consumer Choice Award winner announcements credit Advanced Symbolics International (ASI),
      and older ones Léger Marketing. Confirm which partner CCRDI names.
- [ ] **ccaward.com process text on Core Services** (approved exception, confirmed public
      facts; source https://www.ccaward.com), word for word:
      - "Populating Categories": "CCRDI powered by IsuCorp. gathers all businesses within a
        geographic Territory to establish a complete universe of accounts within a Business
        Category."
      - "Qualifying Relevant Companies": "The Universe of Accounts provided by CCRDI is further
        vetted by Consumer Choice Award to ensure that all companies provided have no legal or
        ethical issues that would negate them from consideration."
      To be re-checked against the live page before the Core Services page is built.
- [ ] **Homepage pills "Research", "Data", "Insights"**: the words of the brand name, used as
      tags (as the CCC homepage used the brand names). Confirm.
- [ ] **Future direction (§11):** not used at launch (approved by the project owner); its
      intro is written for the client. If the client wants a "future direction" section, it
      needs their wording.
- [ ] **Temporary brand assets** made from the client's logo (reversed logo, favicon, share
      image): approve or replace with official versions.
- [ ] **Palette and fonts** (design.md): taken from the logo; confirm with the client.

## French version
- [ ] French is switched off until the end of the project (no /fr pages, language switcher or
      French sitemap; the i18n infrastructure is kept). Before launch, if the site is to be
      bilingual: translate the approved English copy into Canadian French (CLAUDE.md rules),
      have it reviewed by a professional translator or a native French speaker, and switch it on.

## Placeholder register
Every [CLIENT TO PROVIDE: ...] placeholder on the site, by page, is listed here as pages are
built.

## Pre-launch
- [ ] The CCRDI domain is set (Launch blockers).
- [ ] No [CLIENT TO PROVIDE: ...] text, placeholder images, placeholder photos or placeholder
      video remain on the live site (CLAUDE.md pre-launch checks; placeholder-media.md).
- [ ] Official logo, favicon set and share image in place.
- [ ] French reviewed and switched on, or the site launched in English only by decision.
