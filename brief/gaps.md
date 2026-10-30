# Content still needed from the client

Copy sources: the Key Messaging Framework (sections 1 to 13) and content.md.
"Covered" means the framework or content.md now supplies the copy.

## Covered by the framework
- [x] Positioning statement, brand purpose, mission, vision (framework §3; matches content.md)
- [x] Messaging pillars (framework §4)
- [x] Brand descriptions for Our Brands: role and core message (§2), one-liners (§5),
      taglines (§9), relationship lines (§12), CCRDI positioning, mission, vision, taglines (§6)
      and services (§7)
- [x] One-line descriptions for Media & Partners: CCC and CCRDI (§12)
- [x] Audience messages, including Industry Associations (§8)
- [x] SEO descriptions: site default = CCC one-line description (§12, 183 characters, cut off
      in search results after about 160); homepage = lead message (§13, 143 characters);
      About = Vision (§3, 116 characters; replaces About paragraph 1, which was 168);
      Our Brands = first sentence of About
      paragraph 2 (§5, 128 characters: "Our organization brings together Consumer Choice Award,
      Consumer Choice Marketing, and Consumer Choice Research, Data & Insights.")
- [x] SEO descriptions for every other CCC page, word for word from the framework (each
      under 160 characters; sentences already used as another page's description are not
      reused):
      - 40 Years: §10, first sentence (108 characters)
      - For Businesses: §8 Business Leaders (94)
      - Media & Partners: §8 Media and Partners (86)
      - Consumer Choice Award: §5 Family of Brands one-liner (66)
      - Consumer Choice Marketing: §5 Family of Brands one-liner (98)
      - CCRDI: §12 CCRDI one-line description (140)
      - Contact: §5 Homepage Hero, second sentence, "Today, Consumer Choice Canada brings
        together research, recognition, marketing, and consumer intelligence under one
        national organization." (138)
      - Privacy Policy: §3 Mission, "To empower Canadians with trusted information while
        recognizing businesses that consistently deliver exceptional customer experiences."
        (134)
      - Accessibility Statement: §5 Homepage Hero, first sentence, "For more than 40 years,
        Consumer Choice has helped consumers make better decisions while recognizing
        businesses that earn their trust." (134)
      - Contact thank-you page (noindex): §3 Brand Purpose, "To strengthen trust between
        Canadian consumers and the businesses that serve them." (82)
      - 404 (noindex): §4 Trust pillar, "For four decades, Consumer Choice has helped Canadians
        identify businesses they can trust." (90; in site.config.json seo.pages["/404"])
      The site default (the §12 CCC one-liner, 183 characters) is now used only by the theme
      demo pages. **Client to confirm**, or to supply page-specific descriptions.
- [x] SEO title for CCRDI: "CCRDI" (the framework's own short name, §2, §6), so the page
      title is "CCRDI | Consumer Choice Canada" (30 characters) instead of the full name
      (70). The H1 stays "Consumer Choice Research, Data & Insights".

## Still needed
- [ ] **Confirm the Consumer Choice Award brand page copy from ccaward.com** (word for word):
      - Sidebar facts: "1987": "CCA launched in Montréal in 1987, with early operations also
        in Ottawa." (https://ccaward.com/blog/40-years-of-recognizing-the-businesses-canadians-count-on/);
        "One winner per category" (our label): "Unlike other award programs, there is only one
        winner in your category." (https://www.ccaward.com)
      - Body: "Your recognition is not based on an application, a company nominating itself, or
        the opinion of a small judging panel. It begins with independent consumer research and
        the collective voice of the marketplace." (https://ccaward.com/about/)
      - Process cards: the heading "Canada's only award organization to utilize statistically
        supported independent research." and the four steps with their text; strip line
        "Recognizing and celebrating business excellence since 1987" (ccaward.com's header)
        (https://www.ccaward.com)
      - Sidebar: the real Consumer Choice Award logo (ccaward.com)
- [x] Brand logos: the client supplied the Consumer Choice Canada, Consumer Choice Marketing
      and CCRDI logos (src/assets/images/brands/ccc-logo.webp, ccm-logo.webp, ccrdi-logo.png,
      kept as delivered). The site uses trimmed copies (ccc.png, ccm.png, ccrdi.png: empty space
      cropped; the backgrounds were already transparent; nothing else changed). The Consumer
      Choice Award logo is the medal from ccaward.com.
      - Header, mobile menu and footer (navy): a temporary reversed CCC logo, ccc-reversed.png
        (navy text and lines recoloured to white; the gold gradient untouched, checked pixel by
        pixel). The original is used on light backgrounds, in the structured data and in the
        default share image (/images/share-default.png, 1200 x 630, ivory).
      - Logo walls (Our Brands, Media & Partners): all four logos on white tiles, so they keep
        their own colours on the navy section (no reversed sub-brand versions needed).
      - Brand page sidebars: each brand's own logo.
- [ ] **Logos in SVG for all four brands** (Consumer Choice Canada, Consumer Choice Award,
      CCRDI, Consumer Choice Marketing). The Award's only public copy is a 255 x 300 PNG.
- [ ] **Official reversed logos for dark backgrounds**, to replace the temporary recoloured CCC
      logo (ccc-reversed.png); reversed CCM and CCRDI versions too, if the client has them.
- [ ] **Confirm the logos may be offered as downloads** on Media & Partners: the client's
      supplied Consumer Choice Canada, Consumer Choice Marketing and CCRDI logos (trimmed PNGs,
      transparent), titled with the brand names, with format and size shown. The Consumer
      Choice Award medal is left out until a vector version arrives (the only copy is 255 x 300).
      The download section's heading is still [CLIENT TO PROVIDE: logo downloads heading].
- [ ] **New label "Our Milestones"** (the 40 Years timeline heading), for client confirmation;
      it follows the approved section labels (Our Mission, Our Vision, Our Purpose).
- [ ] **Approve the temporary all-white sub-brand logos** used on the navy brand cards (the
      brand slider on Home, 40 Years and the brand pages, and the Our Brands panels):
      ccm-white.png and ccrdi-white.png, made from the client's logos. Every pixel is white;
      solid ink is fully opaque, and very light details (the CCRDI circuit ring and pale pixel
      squares) stay faint, as in the original. The Consumer Choice Award medal is kept in
      colour (it reads well on navy). Replace with official single-colour versions.
- [ ] **Approve the brand card edge colours** (thin inset border on the navy brand cards, a
      gradient in each brand's own colours): Award, CCC logo gold #E8C44C into medal gold
      #C0902C; Marketing, CCM deep red lifted to #D92329 into the checkmark gold #CF9F28;
      CCRDI, the silver-grey of its logo's circuit ring #D2D3DA into a darker silver #A3A5AE
      (changed from red, which sat too close to Marketing's). The Marketing red is an on-dark
      shade of the CCM deep red (the original is 1.43:1 on navy); it clears 3:1. On navy:
      Award gold 9.1:1 and 5.3:1, Marketing 3.1:1 into 6.3:1, CCRDI silver 10.3:1 and 6.3:1.
- [ ] **Approve the favicon (temporary monogram).** Made from the CCC logo: "CC" in the logo's
      geometric letterforms (a near-circular C with diagonal terminals, stroke about a quarter of
      the letter height), the first white (Consumer, as in the reversed logo) and the second in
      the CHOICE gold gradient, on a navy rounded square. Tab sizes (favicon.svg, 32px PNG and
      /favicon.ico at 16, 32 and 48) use slightly larger letters so it stays legible at 16px;
      home-screen sizes (180 Apple touch icon, 192 and 512 manifest icons) have more room.
      Files: public/images/icons/. Replace with an official icon or monogram if the client has
      one.
- [ ] **Confirm the updated division colours** (taken from the new logos; approved by the
      project owner and applied, replacing design.md's Marketing orange and CCRDI teal):
      Marketing deep red #7B1417 with the checkmark gold #CF9F28 as a decorative line; CCRDI
      charcoal #3A3A3C with its red #C82127 (marks on white) and bright red #ED1C28 (marks on
      navy, decorative line); Award gold unchanged (brief/division-colours.md).
- [ ] Existing brand colours and fonts, if any (palette may change to match the award logo;
      the Consumer Choice Award logo is red and gold)
- [ ] **Confirm the founding year 1987**, now on the anniversary seal (hero and footer). Sources:
      ccaward.com header, "Recognizing and celebrating business excellence since 1987."
      (https://www.ccaward.com); Consumer Choice Award press release boilerplate, "Consumer
      Choice Award has been recognizing and promoting business excellence in North America
      since 1987." (ACCESS Newswire, August 6, 2025:
      https://natlawreview.com/press-releases/announcing-2025-halton-region-consumer-choice-award-winners).
      Note: 1987 is the Award's founding year; the seal also names Consumer Choice Canada.
- [ ] Stats: winners to date, categories, cities or regions covered (About page)
- [ ] **Confirm the Our Brands stat tiles** (public facts; the short labels are ours):
      - "1987" / "Year Consumer Choice Award began": "since 1987" (sources above)
      - "40+" / "Years recognizing top North American businesses": ccaward.com footer,
        "recognizing top North American businesses for over 40 years." (https://www.ccaward.com)
      - "1" / "Winner per category": ccaward.com, "there is only one winner in your
        category." (https://www.ccaward.com)
- [ ] Leadership/team names, titles, photos
- [ ] Testimonials from past award winners, with permission
- [ ] **Confirm the 40 Years sidebar milestones** (public facts, word for word; the short labels
      "Coast to coast" and the years are ours, approved by the project owner). Source for all
      three: Consumer Choice Award blog, "40 Years of Recognizing the Businesses Canadians Count
      On" by Sumi Saleh, Communications Manager (https://ccaward.com/blog/40-years-of-recognizing-the-businesses-canadians-count-on/):
      - "1987": "CCA launched in Montréal in 1987, with early operations also in Ottawa."
      - "Coast to coast": "What began in those two cities has grown into recognition for
        businesses in communities from coast to coast."
      - "2027": "CCA's 40th anniversary year" (the post: "As we begin recognizing our 2027
        winners, … throughout CCA's 40th anniversary year.")
- [ ] More milestones by year for the 40 Years timeline: the sidebar shows only the three
      confirmed facts above; more can be added when the client provides them (no dates or
      milestones are invented)
- [ ] Contact details (a general email address, never an individual's; phone, address),
      form destination email, social links
- [ ] URLs for the Consumer Choice Award, Consumer Choice Marketing, and CCRDI sites.
      **Confirm the brand links.** The Our Brands cards now link to the brand pages ("Learn
      More"). On the brand pages (sidebar):
      - Consumer Choice Award: "Visit Website" → https://www.ccaward.com (opens in a new tab)
      - Consumer Choice Marketing: "Contact Us" → /contact (no official website found)
      - CCRDI: "Contact Us" → /contact (no official website found; ccaward.com mentions
        "CCRDI powered by IsuCorp." without a link)
      "Visit Website" is a new interface label, not in content.md.
- [ ] **Confirm the Consumer Choice Marketing service list** on Our Brands: "Digital
      marketing", "Content", "Brand amplification", "Reputation". It comes from the
      framework's draft notes (after section 13), which are otherwise not used on the site.
- [ ] **Confirm the Consumer Choice Award list** on the Our Brands card: the four process
      headings from https://www.ccaward.com, word for word, with the text each one heads there:
      - "Category Selection": "CCA identifies the business categories that matter most to
        today’s consumer."
      - "Populating Categories": "CCRDI powered by IsuCorp. gathers all businesses within a
        geographic Territory to establish a complete universe of accounts within a Business
        Category."
      - "Qualifying Relevant Companies": "The Universe of Accounts provided by CCRDI is further
        vetted by Consumer Choice Award to ensure that all companies provided have no legal or
        ethical issues that would negate them from consideration."
      - "Nominating Award-Winners": "After the list of companies has been refined, market
        insights are integrated with AI results."
- [ ] **Confirm the award winners directory link.** "Find a Trusted Business" (header and
      homepage hero) now goes to https://ccaward.com/award-winners/, the official Consumer
      Choice Award winners directory (Canada and USA), linked as "Award Winners" in
      ccaward.com's navigation; opens in a new tab. The Canada-only directory is
      https://ccaward.com/award-winners/canada/ if the client prefers it.
- [ ] **Confirm the footer social links.** They are Consumer Choice Award's official accounts,
      as linked from ccaward.com's header and footer (CCC has no accounts of its own yet):
      Facebook https://www.facebook.com/consumerchoiceaward/, Instagram
      https://www.instagram.com/consumerchoiceaward/, LinkedIn
      https://www.linkedin.com/company/consumer-choice-award/, X https://twitter.com/Consumer_CA,
      YouTube https://www.youtube.com/@ConsumerChoiceAward. Placeholder (#) social links are
      now hidden automatically.
- [ ] **CCC's own social profiles.** The homepage's Organization structured data has no
      `sameAs` (the list that tells search engines which social profiles belong to the
      organization), because the footer accounts above are Consumer Choice Award's, not
      Consumer Choice Canada's. Add CCC's own profile URLs as `sameAs` in `Base.astro` when the
      client has them. The structured data also leaves out the email, phone and address until
      they're real (placeholders are not published as data).
- [ ] Privacy policy text
- [ ] Accessibility Statement text
- [ ] **SEO descriptions for Privacy Policy and Accessibility Statement**, to be supplied with
      the legal text. The framework sentences used for now (§3 Mission and the first sentence
      of the §5 homepage hero) don't describe those pages; replace them with descriptions of
      each page's content, under 160 characters.
- [ ] Photography (owned or approved stock), with one-sentence alt text for each photo
- [ ] Page eyebrow or intro line for each interior page (or confirm none)
- [ ] Contact page intro, form placeholders, sending and error messages, thank-you page
      heading, body and button
- [ ] 404 body text (only "Page not found / Return Home" is supplied)
- [ ] Media & Partners: media contact, logo-download files, news items

## Approvals and open questions
- [ ] Superlative claims ("Canada's leading", "most trusted", "Canada's Trusted Consumer
      Authority"): used in the framework's final copy (§3, §5); still needs explicit sign-off
- [ ] Interface labels in content.md (navigation, buttons, section labels, 404, form fields)
- [ ] Page URLs: /our-brands, /40-years, /for-businesses, /media, /accessibility
- [x] ISUCORP: approved by the project owner for the Our Brands CCRDI card (framework §7).
      Not used on the homepage.
- [ ] **Research partner wording:** ccaward.com says "CCRDI powered by IsuCorp.", while
      recent Consumer Choice Award winner announcements found in search credit Advanced
      Symbolics International (ASI), and older ones Léger Marketing. Confirm which partner
      CCRDI and the Award should name.
- [ ] Seal wording "40 Years of Trust" (from design.md; part of the §10 headline)
- [ ] Homepage strip uses "Celebrating 40 Years of Trust", the first half of the §10 headline
      (approved by the project owner)
- [ ] Theme interface text kept for function and accessibility: "Prev", "Next", "Play",
      "Play showreel", "Pause ..." controls, "Skip to content", "Close", "Copyright".
      Added on the bold-round branch (homepage hero, version B only): "Pause background
      video" / "Play background video", the same pattern as the showreel's control; shown
      only on keyboard focus.
- [ ] **Design decision for client approval (adjusts design.md):** buttons are gold-outline
      instead of solid navy or gold fills, with a slow sheen across the border on hover and
      keyboard focus (off with reduced motion). The border uses Heritage Gold #D4A843 on navy
      (6.95:1) and the darker gold #8A6514 on light backgrounds (5.31:1 on white, 4.92:1 on
      ivory). Solid gold fills are removed everywhere except the Consumer Choice Award division
      colour; text selection is now navy. Gold stays as an accent: the anniversary seal, button
      borders, focus rings, link underlines, the footer "Contact Us" link, heading dots, pillar
      icons and hero avatar rings.
- [ ] **Design decision for client approval (bold round):**
      - Homepage hero imagery under a navy overlay.
      - Thin gold hairlines at a few section transitions, including a new edge gold, #A9802A, in
        `brand.colors.goldEdge`. It's used only for lines on the edge between navy and a light
        section, because it meets 3:1 against both (4.26:1 navy, 3.61:1 white, 3.31:1 ivory).
      - A fine paper texture on navy, only just noticeable up close (CSS/SVG, no image file).
      - Italic pull quotes for framework statements.
      - Wider section spacing.
      The hero photo was changed from Old Québec (Château Frontenac, a hotel brand's building)
      to Seaton Lake, BC.
- [ ] **Design decision for client approval:** the anniversary seal sits on the edge between
      the hero and the showreel, like a stamp, instead of inside the hero.
- [ ] AODA: does it apply (Ontario organization with 50+ employees)? The site already targets
      WCAG 2.1 AA, which exceeds the AODA's WCAG 2.0 AA.
- [ ] **Possible future section for client approval:** a "Looking Ahead" section on 40 Years
      using the framework's §11 list ("Potential opportunities include:" + the 8 items), framed
      as future direction, never as current services. Not used for now (the project owner chose
      to leave §11 out); the heading "Looking Ahead" would be new copy.
- [ ] Terms page: is one needed? (Listed earlier with privacy text; not in the sitemap.)

## Placeholder register
Every placeholder on the site. Each one must be replaced before launch.

### Site-wide (header and footer)
- Header, mobile menu and footer logo: the client's CCC logo, in a temporary reversed version
  until the official one arrives (see Still needed)
- Favicon set: a temporary CC monogram from the CCC logo, pending approval (see Still needed)
- Header button "Find a Trusted Business": ccaward.com award winners directory, pending
  confirmation (see Still needed)
- Footer email: hidden until the client provides a general email address (the footer CTA
  above it already links to Contact). Use a general address only (e.g. an info@ mailbox),
  never an individual person's email.
- Footer phone: [CLIENT TO PROVIDE: phone]
- Footer address: [CLIENT TO PROVIDE: address]
- Footer social links: Consumer Choice Award's accounts, pending confirmation (see Still needed)
- Footer brand links: [CLIENT TO PROVIDE: Consumer Choice Award URL],
  [CLIENT TO PROVIDE: Consumer Choice Marketing URL], [CLIENT TO PROVIDE: CCRDI URL]
- Anniversary seal (hero and footer): 1987, pending confirmation (see Still needed)
- Homepage hero background: free-licence photo of Seaton Lake, BC (version A, used); a Québec City
  video (version B) is kept switchable but unused (placeholder-media.md), until [CLIENT TO PROVIDE: hero photography or video]

### Placeholder photos and video
All photos and the showreel video on the homepage are free-licence placeholders (Unsplash and
Pexels), listed with their sources and licences in /brief/placeholder-media.md. **Every one
must be replaced with the client's photography before launch.** Their alt text was written to
describe the placeholder photos (not from the copy sources) and is a placeholder too: it must
be rewritten for the client's photos.
- [ ] Showreel: [CLIENT TO PROVIDE: 40th anniversary video] (placeholder: Toronto skyline
      from Lake Ontario, with its poster frame)
- [ ] Pillar card photos (Trust, Recognition, Intelligence, Growth)
- [ ] Family of Brands slide photos (Award, Marketing, Research, Data & Insights)
- [ ] Who We Serve strip: 3 thumbnails next to "Celebrating 40 Years of Trust"
- [ ] News card photos (4)
- [ ] About: header photo, intro tile photo, 6 marquee photos (Canadian places, no
      identifiable faces, so nothing reads as CCC staff)
- [ ] Our Brands: intro tile photo; the three brand cards reuse the homepage brand photos
- [ ] 40 Years: feature video (fireworks, Pexels; location not stated) and its poster, and the
      body photo (Old Port of Montréal); the three brand cards reuse the homepage brand photos.
      A Canadian anniversary video from the client would suit the feature best.
- [ ] Alt text for all of the above

### Homepage
1. Hero
   - Button link: [CLIENT TO PROVIDE: award winners directory URL]
   - Social proof line: [CLIENT TO PROVIDE: social proof line]
   - 3 avatars: [CLIENT TO PROVIDE: name], [CLIENT TO PROVIDE: role], generic silhouettes
2. Showreel: placeholder video and poster (see above)
3. Pillar cards: placeholder photos (see above)
4. Family of Brands carousel: placeholder photos (see above)
5. Who We Serve strip: placeholder thumbnails (see above)
6. Testimonials
   - Heading: [CLIENT TO PROVIDE: testimonials heading]
   - Summary card: [CLIENT TO PROVIDE: average rating], [CLIENT TO PROVIDE: number of reviews],
     2 logos [CLIENT TO PROVIDE: award winner logo]
   - 5 cards: [CLIENT TO PROVIDE: client testimonial], [CLIENT TO PROVIDE: name],
     [CLIENT TO PROVIDE: business name], generic silhouette
   - Logo wall: 5 logos [CLIENT TO PROVIDE: award winner or partner logo]
7. News
   - Heading: [CLIENT TO PROVIDE: news section heading]
   - 4 cards: [CLIENT TO PROVIDE: news headline], [CLIENT TO PROVIDE: news summary],
     [CLIENT TO PROVIDE: date], [CLIENT TO PROVIDE: news category], placeholder photos
     (see above)

### About page
1. Page header: no eyebrow line (H1 "About Consumer Choice Canada"); header photo is a
   placeholder (see above)
2. Logo wall: heading [CLIENT TO PROVIDE: logo wall heading]; 5 logos
   [CLIENT TO PROVIDE: award winner or partner logo]
3. Facts: intro tile photo is a placeholder (see above); 3 stat tiles:
   [CLIENT TO PROVIDE: winners to date], [CLIENT TO PROVIDE: categories],
   [CLIENT TO PROVIDE: cities or regions covered], each with [CLIENT TO PROVIDE: stat label]
4. Marquee: 6 placeholder photos (see above)
5. Testimonials: the same placeholders as the homepage (heading, summary card, 5 cards)
6. Leadership: heading [CLIENT TO PROVIDE: leadership section heading]; 4 cards with
   [CLIENT TO PROVIDE: name], [CLIENT TO PROVIDE: title] and generic silhouettes; the
   theme's careers link ("See Open Positions") is replaced by "Read Our Story" → /40-years

### Our Brands page
1. Page header: H1 "Our Brands", no eyebrow
2. Logo wall ("Family of Brands"): the four brands' logos on white tiles
3. Facts: intro tile photo is a placeholder; stat tiles use public facts pending
   confirmation (see Still needed)
4. Brand cards: Award list from ccaward.com's process headings, pending confirmation;
   Marketing list from the draft notes, pending confirmation; card photos and links
   pending confirmation (see above)
5. Testimonials: the same placeholders as the homepage. Never use or write quotes from real
   people unless the client supplies them.

### 40 Years page
1. Header: eyebrow "40 Years"; H1 "Celebrating 40 Years of Trust" and body heading "Building
   the Next Generation of Consumer Confidence" (the two halves of the §10 headline, approved)
2. Feature video, poster and body photo: placeholders (see above)
3. Sidebar: anniversary seal (1987, pending confirmation); "Visit Website" → ccaward.com
   (pending confirmation, as on Our Brands); list heading "Our Brands"
4. Milestones timeline (StepList): heading "Our Milestones" (new label, see Still needed); the
   three confirmed milestones (see Still needed)
5. Family of Brands slider (the homepage component): reuses the homepage brand photos; links to
   /our-brands

### For Businesses, Media & Partners, Contact, legal and 404 pages
- For Businesses: no placeholders (brand cards reuse the homepage brand photos)
- Media & Partners: [CLIENT TO PROVIDE: media contact heading], [CLIENT TO PROVIDE: media
  contact name, email and phone] (a Callout under the body, with "Contact Us"),
  [CLIENT TO PROVIDE: logo downloads heading] (the downloads are the client's logos, see Still
  needed); news: the homepage placeholders, as a list
- Contact: [CLIENT TO PROVIDE: contact intro heading], [CLIENT TO PROVIDE: contact intro text],
  email, phone, address, [CLIENT TO PROVIDE: sending message], [CLIENT TO PROVIDE: error
  message]; form notifications email (Netlify dashboard)
- Contact thank-you: [CLIENT TO PROVIDE: thank-you heading], [CLIENT TO PROVIDE: thank-you
  message]
- Privacy Policy and Accessibility Statement: [CLIENT TO PROVIDE: last updated date],
  [CLIENT TO PROVIDE: privacy policy text], [CLIENT TO PROVIDE: accessibility statement text]
- 404: [CLIENT TO PROVIDE: 404 message]
- Brand pages: the brand photos (reused from the homepage); Marketing service list pending
  confirmation

## Pre-launch
- [ ] No [CLIENT TO PROVIDE: ...] text, [FOUNDING YEAR], placeholder images, placeholder
      photos or placeholder video remain on the live site (see the Pre-launch check in
      CLAUDE.md and /brief/placeholder-media.md).
