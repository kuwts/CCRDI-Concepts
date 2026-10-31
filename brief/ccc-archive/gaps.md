# Content still needed from the client

Copy sources: the Key Messaging Framework (sections 1 to 13) and content.md.
"Covered" means the framework or content.md now supplies the copy.

## Covered by the framework
- [x] Positioning statement, brand purpose, mission, vision (framework §3; matches content.md)
- [x] Messaging pillars (framework §4)
- [x] Brand descriptions for Our Brands: role and core message (§2), one-liners (§5),
      taglines (§9), relationship lines (§12), CCRDI positioning, mission, vision, taglines (§6)
      and services (§7)
- [x] One-line descriptions for Media & Partners: CCC and CCRDI (§12); Consumer Choice Award and
      Consumer Choice Marketing (§5 Family of Brands one-liners), so all four brands appear
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
- [ ] **Confirm the 40 Years milestones** (the "Our Milestones" timeline; public facts, word for
      word; the markers are ours: the short label "Coast to coast", approved by the project
      owner, and the years, which are the dates of the sources):
      - "1987": "CCA launched in Montréal in 1987, with early operations also in Ottawa."
      - "Coast to coast": "What began in those two cities has grown into recognition for
        businesses in communities from coast to coast."
      - "2027": "CCA's 40th anniversary year" (the post: "As we begin recognizing our 2027
        winners, … throughout CCA's 40th anniversary year.")
      Source for these three: Consumer Choice Award blog, "40 Years of Recognizing the Businesses
      Canadians Count On" by Sumi Saleh, Communications Manager
      (https://ccaward.com/blog/40-years-of-recognizing-the-businesses-canadians-count-on/).
      **Rewritten copy for client approval (2012, 2015, 2019).** The project owner asked for
      these three in milestone style instead of quoting the releases. Each keeps the facts and
      numbers exactly as the source states them (the counts are the cities and regions each
      release names; nothing rounded or estimated); the year is the release's date. None of
      the three lines names Montréal; where it's named on the site it has its accent (the
      releases spell it "Montreal").
      - "2012": "Consumer Choice Award recognizes businesses in 12 cities across Canada, from
        St. John's to Vancouver." Source sentence: "Consumer Choice Award lives in Calgary,
        Edmonton, Halifax, Hamilton, Montreal, Ottawa, Quebec City, Saskatoon, St. John's,
        Toronto, Vancouver and Winnipeg." (12 cities; St. John's is the easternmost and
        Vancouver the westernmost.) "2012 Consumer Choice Award Winners", CNW, Calgary, March
        20, 2012
        (https://www.newswire.ca/news-releases/2012-consumer-choice-award-winners-509870361.html);
        the same list in the July 4, 2012 Toronto release.
      - "2015": "Consumer Choice Award grows to 14 cities across Canada, including London and
        Regina." Source sentence: "Consumer Choice Award lives in Calgary, Edmonton, Halifax,
        Hamilton, London, Montreal, Ottawa, Quebec City, Regina, Saskatoon, St. John's, Toronto,
        Vancouver and Winnipeg." (14 cities; London and Regina are the two not in the 2012
        list, hence "grows to".) "2015 Montreal Consumer Choice Award Winners", CNW, Montreal,
        March 23, 2015
        (https://www.newswire.ca/news-releases/2015-montreal-consumer-choice-award-winners-517377111.html).
      - "2019": "Consumer Choice Award recognizes businesses in more than 22 cities and regions
        across Canada, including Barrie, Gatineau, Kingston, Peterborough and Surrey." Source
        sentence: "Consumer Choice Award lives in Barrie, Calgary, Edmonton, Gatineau, Greater
        Toronto Area, Halifax, Hamilton, Kingston, London, Montreal, Niagara region, North
        Vancouver, Ottawa, Peterborough, Quebec City, Regina, Saskatoon, St. John's, Surrey,
        Vancouver, Waterloo, Winnipeg & more." (22 named, "& more", hence "more than 22";
        the five named in the line are among those not in the 2015 list.) "2019 Greater
        Toronto Area and Barrie Consumer Choice Award Winners", 24-7 Press Release, Toronto,
        June 26, 2019
        (https://www.24-7pressrelease.com/press-release/463789/2019-greater-toronto-area-and-barrie-consumer-choice-award-winners).
      Found but not used:
      - 2018 list ("Saskatoon's 2018 Consumer Choice Award Winners", August 23, 2018,
        https://www.24-7pressrelease.com/press-release/455086/saskatoons-2018-consumer-choice-award-winners):
        it reads "St. Catharine's St. John's" (missing comma, St. Catharines misspelled), so
        it can't be quoted word for word.
      - Late 2019 lists: September 10, 2019, "Soon to be launching, Abbotsford, Kelowna and
        Windsor." (https://www.24-7pressrelease.com/press-release/465674/southern-alberta-2019-consumer-choice-award-winners),
        and November 20, 2019, a 27-place list including them, which spells "St. Catherines"
        (https://www.newswire.com/news/waterloo-and-guelph-region-2020-consumer-choice-award-winners).
        The client could confirm a corrected version of either.
      - The USA: the earliest US release found is "Announcing the 2025 Atlanta Consumer Choice
        Award Winners" (ACCESS Newswire, January 27, 2025,
        https://www.accessnewswire.com/newsroom/en/business-and-professional-services/announcing-the-2025-atlanta-consumer-choice-award-winners-973583),
        which doesn't say when the award began in the USA; not used.
      - The research partner named in the 2012 and 2015 boilerplate: left out (an open
        question, see Research partner wording).
- [ ] **Milestones for the 40 Years timeline (client to provide 5 to 7).** The timeline uses
      only what public sources confirm (above). Please supply 5 to 7 milestones from Consumer
      Choice Award's history, each with its year and one or two sentences: for example the
      year it reached each new city or region, the first year in the USA, the first winners'
      celebration, new research methods, and the creation of Consumer Choice Canada. These would
      replace or join the ones above; no dates or milestones are invented.
- [ ] **Confirm the Our Brands bento tiles** (the three tiles beside the intro, no labels,
      approved by the project owner; the brands themselves are in the logo wall and panels):
      - Pull quote: the lead message (content.md, "Lead message"), "Consumer Choice Canada
        helps Canadians make more confident decisions while helping businesses earn,
        understand, and communicate consumer trust."
      - "Founded in 1987, Consumer Choice Award uses independent market research to identify
        the top-ranked businesses in their respective categories and communities." and "Over
        the past four decades, Consumer Choice Award has expanded its presence across Canada,
        recognizing businesses across a wide range of industries and communities." Source:
        "Consumer Choice Award Celebrates 40 Years of Recognizing Business Excellence Across
        Canada", EIN Presswire, Toronto, September 21, 2026
        (https://www.einpresswire.com/article/943441319/consumer-choice-award-celebrates-40-years-of-recognizing-business-excellence-across-canada).
      The §2 role and core message tiles they replace are no longer on the site for CCRDI
      ("Turning consumer data into business confidence"); its §9 tagline is very close.
- [ ] **New label "Why Consumer Choice"** (For Businesses: the label over the benefits),
      approved by the project owner, for client confirmation.
- [ ] **Confirm the For Businesses benefits** (the card stack beside "Why Consumer Choice"):
      "Trust" (§4 pillar and its line); "Recognition" (§2 role) with "Unlike other award
      programs, there is only one winner in your category." (https://ccaward.com/advantages/,
      also on the Award page); "Amplification and growth" and "Research and intelligence" (§2
      roles) with the §12 relationship lines for Consumer Choice Marketing and CCRDI. The role
      pills that sat beside the intro are gone (they repeated these titles).
- [ ] **More benefits copy for For Businesses (client to provide).** What a business gains from
      working with Consumer Choice Canada and its brands: 4 to 6 benefits, each with a short
      heading and one or two sentences, plus any proof the client can stand behind (figures
      or examples, with permission to publish).
- [ ] **New label "Press Releases"** (the heading on the homepage and Media & Partners),
      approved by the project owner, for client confirmation.
- [ ] **Confirm the press releases** (src/content/data/press-releases.json; homepage and Media
      & Partners). Consumer Choice Award's six most recent Canadian announcements as of October
      30, 2026, each on EIN Presswire as "News Provided By Consumer Choice Award"; headline,
      date and summary (the release's first sentence) word for word; each link opens the
      release in a new tab, newest first (same-day ones alphabetically). Single-business winner
      releases and US releases are left out. The homepage leads with the 40 Years release, then
      the three newest.
      - October 1, 2026: "Announcing the 2026 Victoria Consumer Choice Award Winners"
        (https://www.einpresswire.com/article/946453455/announcing-the-2026-victoria-consumer-choice-award-winners)
      - October 1, 2026: "Announcing the 2026 Kelowna Consumer Choice Award Winners"
        (https://www.einpresswire.com/article/946429489/announcing-the-2026-kelowna-consumer-choice-award-winners)
      - October 1, 2026: "Announcing the 2026 Nanaimo Consumer Choice Award Winners"
        (https://www.einpresswire.com/article/946443894/announcing-the-2026-nanaimo-consumer-choice-award-winners)
      - October 1, 2026: "Announcing the 2026 Abbotsford Consumer Choice Award Winners"
        (https://www.einpresswire.com/article/946431882/announcing-the-2026-abbotsford-consumer-choice-award-winners)
      - September 21, 2026: "Consumer Choice Award Celebrates 40 Years of Recognizing Business
        Excellence Across Canada"
        (https://www.einpresswire.com/article/943441319/consumer-choice-award-celebrates-40-years-of-recognizing-business-excellence-across-canada)
      - September 14, 2026: "Announcing the 2026 Barrie Consumer Choice Award Winners"
        (https://www.einpresswire.com/article/940972244/announcing-the-2026-barrie-consumer-choice-award-winners)
      The category line on each item is the newswire's name, "EIN Presswire". The homepage
      cards' photos are decorative placeholders until the client supplies press images.
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
- [ ] **Confirm the award winners directory link.** "Find a Trusted Business" (header, mobile
      menu and homepage hero) and the Consumer Choice Award page's closing link go to
      https://ccaward.com/award-winners/canada/, the Canada-only page of the official Consumer
      Choice Award winners directory (the project owner chose it over the full Canada and USA
      directory, https://ccaward.com/award-winners/); opens in a new tab.
- [ ] **New labels "Phone" and "Address"** (Contact page details), approved by the project
      owner, for client confirmation. content.md supplies "Email" but no labels for the phone
      and address.
- [ ] **Confirm the Our Brands menu.** "Our Brands" in the header and mobile menu is now a
      dropdown (approved by the project owner) listing Our Brands, Consumer Choice Award,
      Consumer Choice Marketing and Consumer Choice Research, Data & Insights. The page names
      are the existing ones; no new text.
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

- [ ] **Hero photography: the client's own event photos.** The homepage hero uses a free-licence
      placeholder (a conference audience at a US event, Unsplash). Please supply Consumer Choice
      event photography to replace it: winner events, award presentations or networking
      evenings, ideally wide (1920px or more), calm, with people not the focal point and no
      logos or signage. ccaward.com has no event photos (its large images are licensed stock
      or winners' ads), so none could be used from there.

## French version (/fr)
- [ ] **All French copy is a machine-assisted draft.** Every French page, label, alt text,
      form message, SEO title and description, structured data and the seal text must be
      reviewed by a professional translator or a native French speaker before launch.
      Standard Quebec French (OQLF), professional corporate register; glossary approved by the
      project owner on 2026-10-30. Files: src/content/*/fr/, src/config/site.config.json (`fr`,
      `ui.fr`), src/config/menu.json (`fr`).
- [ ] **Brand names in French: question for the client.** Consumer Choice Award appears as
      "Prix Choix du Consommateur" (the name ccaward.com/fr uses; that site mixes
      "consommateur" and "Consommateur", we use the capital C throughout). Consumer Choice
      Canada, Consumer Choice Marketing and Consumer Choice Research, Data & Insights (CCRDI)
      stay in English. Does the client have official French names for any of them? The
      English logos are used on French pages (there are no French logos).
- [ ] **ccaward.com/fr wording.** The four process headings on the Award's French page and the
      closing line "Reconnaître et célébrer l’excellence commerciale depuis 1987" are
      ccaward.com/fr's own (https://ccaward.com/fr/). Its French process texts were not used
      because some have errors (e.g. "La seule organisation canadienne de subventions…":
      "subventions" means grants); ours are new drafts. The client may want ccaward.com/fr
      corrected too.
- [x] **French header button at 1024–1279px** (decided by the project owner, 2026-10-30): the
      desktop bar shows the shorter label **"Entreprises de confiance"** at 1024–1279px, where
      "Trouver une entreprise de confiance" doesn't fit; the full label from 1280px and in the
      mobile menu. Only one label is displayed at a time, so the button's accessible name always
      matches its visible text. French pages also use slightly tighter header spacing at those
      widths (nav items, button padding, switcher gap). The header fits at every width from
      1024 to 1600.
- [ ] **For the translator's review:** the short header label "Entreprises de confiance"
      (site.config.json → fr.headerButton.shortLabel), meant to keep the "trusted" meaning of
      "Find a Trusted Business" in fewer words.
- [ ] French press releases: the headlines link to the English releases, so they stay in
      English (marked lang="en", with "(en anglais, s’ouvre dans un nouvel onglet)" for screen
      readers). Does Consumer Choice Award publish French releases that could be linked
      instead?
- [ ] French header button and "Visiter le site Web" link to ccaward.com/fr
      (https://ccaward.com/fr/laureats/canada/ and https://ccaward.com/fr/): client to confirm,
      as for the English links.
- [ ] Netlify: both contact forms post to the same form ("contact") with a `language` field
      (en or fr); the French thank-you page is /fr/merci/contact. public/_redirects serves the
      French 404 page for missing /fr/ URLs. Check both after the first deploy.
- [x] French ordinals are set as superscripts (OQLF): "1<sup>er</sup> octobre 2026" in the press
      release dates, "40<sup>e</sup> anniversaire" on /fr/40-ans (ordinalsHTML in src/i18n;
      scripts/qa/frtypo.cjs flags any ordinal left on the line).
- [ ] French interface labels that are new wording (translations of the English labels):
      "Les publics que nous servons" (Who We Serve), "Nos jalons" (Our Milestones), "Pourquoi
      Consumer Choice", "Organisation faîtière" (Umbrella organization), "Rayonnement et
      croissance" (Amplification and growth), and the taglines "Éclairer les décisions"
      (Delivering Insight) and "Aider les entreprises d’exception à grandir" (Helping Great
      Businesses Grow). For the reviewer's attention.

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
      "Play showreel", "Pause ..." controls, "Skip to content", "Close", "Copyright", and
      "(opens in a new tab)" (read by screen readers only, on the press release links).
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
      to Seaton Lake, BC, then (2026-10-30) to a free-licence photo of a conference audience.
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
- Header button "Find a Trusted Business": ccaward.com award winners directory (Canada),
  pending confirmation (see Still needed)
- Footer email: hidden until the client provides a general email address (the footer CTA
  above it already links to Contact). Use a general address only (e.g. an info@ mailbox),
  never an individual person's email.
- Footer phone: [CLIENT TO PROVIDE: phone]
- Footer address: [CLIENT TO PROVIDE: address]
- Footer social links: Consumer Choice Award's accounts, pending confirmation (see Still needed)
- Footer brand links: [CLIENT TO PROVIDE: Consumer Choice Award URL],
  [CLIENT TO PROVIDE: Consumer Choice Marketing URL], [CLIENT TO PROVIDE: CCRDI URL]
- Anniversary seal (hero and footer): 1987, pending confirmation (see Still needed)
- Homepage hero background: free-licence photo of a conference audience (version A, used;
  Unsplash, Headway); a Québec City video (version B) is kept switchable but unused
  (placeholder-media.md), until [CLIENT TO PROVIDE: hero photography or video]

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
- [ ] Press release card photos (4, decorative)
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
7. Press Releases: four of Consumer Choice Award's releases (see Still needed); the card
   photos are placeholders (see above)

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
3. Facts: intro tile photo is a placeholder; the lead message and two press release facts
   beside it, and stat tiles of public facts, pending confirmation (see Still needed)
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
   six confirmed milestones (1987, Coast to coast, 2012, 2015, 2019, 2027; see Still needed)
5. Family of Brands slider (the homepage component): reuses the homepage brand photos; links to
   /our-brands

### For Businesses, Media & Partners, Contact, legal and 404 pages
- For Businesses: benefit card photos reuse the homepage pillar photos; the brand slider
  reuses the homepage brand photos
- Media & Partners: [CLIENT TO PROVIDE: media contact heading], [CLIENT TO PROVIDE: media
  contact name, email and phone] (a Callout under the body, with "Contact Us"),
  [CLIENT TO PROVIDE: logo downloads heading] (the downloads are the client's logos, see Still
  needed); Press Releases: the six releases (see Still needed), as a list
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
- [ ] **Refresh the press releases** right before launch: check Consumer Choice Award's newswire
      releases (EIN Presswire and ACCESS Newswire) for newer Canadian announcements, update
      src/content/data/press-releases.json (headline, date and first sentence word for word,
      newest first; keep one `featured`), and log the changes here.
