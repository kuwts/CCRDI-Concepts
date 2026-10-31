# CCRDI: design direction

Approved by the project owner (conversion plan, 2026-10-30). The client has supplied no CCRDI
design brief beyond the logo; this direction is the project owner's.

**Feel:** a sister brand to Consumer Choice Canada (CCC), with the same premium quality, but
slightly more modern and data-driven, and not CCC in different colours. CCC is navy, gold and
ivory, a serif, a paper grain and a 40-year seal: an institution. CCRDI keeps the same grid,
spacing, motion, components and finish, and gets a cool, precise identity of its own: a
near-black ink with red from the logo, silver hairlines, a cool mist background, a geometric
sans for headings, tighter corners, and motifs from the logo (the pixel squares, the circuit
ring, the tracked "RESEARCH • DATA • INSIGHTS" caps with red dots). The shared body font
(Inter) and the shared layout are the family link.

**Layout variant: to be chosen** from the phase 3 specimen (component lab):
- A. Dark-led: Ink for the hero, header, footer and several dark sections (CCC's navy layout).
- B. Light-led: mostly White and Mist, Ink for text, only a few dark sections (header, footer,
  one feature section), red used sparingly for buttons and small accents.

## Colour tokens
All from the logo (`src/assets/images/brands/ccrdi-logo.png`, the most common pixel of each
colour). Set in `src/config/site.config.json` → `brand.colors`; no hex values in components.

| Role | Name | Hex | Source | Use |
|---|---|---|---|---|
| dark | Ink | #1E1F22 | logo charcoal, deepened (same neutral hue) | header, hero, footer, dark sections, body text |
| dark-700 | Charcoal | #3A3A3C | the "CC" letters | secondary dark panels, hover on dark, cards on ink |
| primary | CCRDI Red | #C82127 | the "RDI" letters | buttons, links and eyebrows on light, focus ring on light |
| primary-bright | Signal Red | #ED1C28 | the bright pixel squares | decorative marks on ink, large text (24px+); never small text |
| primary-deep | Wine | #8F2635 | the dark pixel squares | button hover, red text needing extra contrast |
| tint | Blush | #F4D1D8 | the pale pixel squares | light end of a red data ramp; text on ink |
| silver | Silver | #D6D8D9 | the circuit ring (26% opacity in the logo; full strength here) | hairlines and borders on light (decorative); secondary text and eyebrows on ink |
| muted | Steel | #9EA1A6 | silver, darkened | muted text on ink |
| mutedDark | Slate | #55585E | charcoal, lightened | captions and secondary text on light |
| light | Mist | #F2F3F4 | silver, lightened | alternating light sections |
| surface | White | #FFFFFF | | page background |

Sister-brand colours, used only on the family-of-brands slides: Consumer Choice Canada navy
#0B2545 and gold #D4A843; Consumer Choice Award gold #D4A843; Consumer Choice Marketing deep
red #7B1417 with its checkmark gold #CF9F28.

## Contrast (WCAG 2.1 AA)
| Pair | Ratio | Use |
|---|---|---|
| White on Ink / Charcoal | 16.48 / 11.35 | all text |
| Silver on Ink / Charcoal | 11.52 / 7.94 | all text |
| Steel on Ink / Charcoal | 6.36 / 4.38 | all text on Ink; large text only on Charcoal |
| Blush on Ink | 11.74 | all text |
| Signal Red on Ink / Charcoal | 3.76 / 2.59 | large text and marks on Ink; decorative only on Charcoal |
| Ink on White / Mist | 16.48 / 14.83 | all text |
| Slate on White / Mist | 7.13 / 6.42 | all text |
| CCRDI Red on White / Mist / Silver | 5.67 / 5.10 / 3.97 | text on White and Mist; marks only on Silver |
| Wine on White / Mist | 8.41 / 7.57 | all text |
| Signal Red on White | 4.38 | large text and marks only |
| Primary button: White on CCRDI Red; hover White on Wine | 5.67; 8.41 | all sizes |
| Primary button edge against Ink | 2.91 | the label identifies the button (1.4.11); focus ring white on dark |
| Secondary button on dark: Ink on White | 16.48 | |
| Silver hairline on White | 1.43 | decorative only, never the only boundary of a control |
| Focus ring: CCRDI Red on White / White on Ink | 5.67 / 16.48 | |

Buttons: one primary red button per page (white text); `LineLink`s for everything else (white
on dark; ink with a red underline on light). Eyebrows: CCRDI Red on light, Silver on dark.

## Typography
- Headings: Plus Jakarta Sans (`@fontsource-variable/plus-jakarta-sans`, self-hosted),
  weights 600 and 700.
- Body and UI: Inter (`@fontsource-variable/inter`, kept from CCC); tabular figures for stats.
- Eyebrows: Inter, uppercase, wide tracking, after the logo's "RESEARCH • DATA • INSIGHTS"; a
  red dot separator where an eyebrow has more than one part.
- No Google Fonts links.

## Shape and spacing
- Card radius 6px, button radius 4px.
- The theme's 8px spacing scale and section spacing, unchanged.
- Subtle shadows only.

## Icons
One icon set only (Lucide), consistent stroke weight.

## Imagery
Free-licence research and data photography as placeholders (people at work with data, reports,
screens and workshops; no visible logos or brand names; no stock handshakes, trophies or people
pointing at laptops), logged in placeholder-media.md and replaced with the client's photography
before launch.

## Motion
The theme's scroll reveals and one easing curve. Respect prefers-reduced-motion.
