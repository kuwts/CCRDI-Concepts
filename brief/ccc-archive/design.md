# Consumer Choice Canada: design direction

Feel: an established national institution. Calm, confident, heritage-led. Think a respected
Canadian standards body or foundation, not a marketing agency. Generous white space.

## Typography
- Headings: Source Serif 4 (install @fontsource-variable/source-serif-4)
- Body and UI: Inter (install @fontsource-variable/inter)
- Self-host both. Remove any Google Fonts links the theme uses.

## Colour tokens
--color-primary: #0B2545        (header, hero, footer, primary buttons)
--color-primary-700: #13315C    (hover states, secondary dark panels)
--color-gold: #D4A843           (seal, rules, accents on navy ONLY; fails contrast on white)
--color-gold-text: #8A6514      (gold text or icons on light backgrounds)
--color-red: #C8102E            (rare Canadian accent only; never buttons)
--color-surface: #FFFFFF        (main background)
--color-surface-alt: #F8F6F1    (alternating section background, ivory)
--color-text: #1F2933           (body text)
--color-text-muted: #52606D     (captions, secondary copy)
--color-border: #E4E7EB         (card borders, dividers)

Division accents, taken from the brands' logos (updated; brief/division-colours.md; client
to confirm). Fill = family-of-brands panels and the brand sliders' colour wash; mark = small
marks on white or ivory; on navy = marks on navy and the thin decorative line on the fill.
--color-award: #D4A843 (Consumer Choice Award; mark #8A6514; on navy #D4A843)
--color-marketing: #7B1417 deep red (Consumer Choice Marketing; mark #7B1417; on navy and
  decorative line: CCM checkmark gold #CF9F28)
--color-research: #3A3A3C charcoal (CCRDI; mark: CCRDI red #C82127; on navy and decorative
  line: CCRDI bright red #ED1C28)
The decorative lines are never used for text.

## Shape and spacing
- Card radius 12px, button radius 8px
- 8px spacing scale
- Subtle shadows only

## Icons
One icon set only (Lucide or Phosphor), consistent stroke weight.

## Imagery
Real Canadian business owners and customers in their own settings. No stock handshakes,
trophies, or people pointing at laptops. Use neutral, clearly labelled image placeholders
until the client supplies photos.

## Motion
Subtle fade-up on scroll at most. Respect prefers-reduced-motion.

## Signature component (the one planned new component; still confirm with me first)
An original, scalable SVG 40th anniversary seal: "40 Years of Trust" with a [FOUNDING YEAR]
placeholder, in navy and Heritage Gold, with an accessible title and light and dark variants.
Used in the hero, footer, and 40 Years page.
