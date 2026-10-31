# Division colours: proposal

**Status:** approved by the project owner, with charcoal as the CCRDI fill, and applied. The
client is still to confirm (gaps.md).

**Approved addition:** the Marketing and CCRDI panels (Our Brands) and slider cards (Home,
40 Years, brand pages) get a thin decorative line in their logo's second colour, so they read
as their brands. That's the CCM checkmark gold `#CF9F28` on the deep red (4.45:1 against it)
and the CCRDI bright red `#ED1C28` on the charcoal (2.67:1). These are decorative only, never
text. The Award stays as it was.

**Why:** design.md's division accents no longer match the real logos:
- Consumer Choice Marketing is navy, deep red and gold, not orange.
- CCRDI is charcoal and red, not teal.

All proposed colours are taken from the logo files (the most common solid pixel of each
colour). Consumer Choice Award stays Heritage Gold, which matches the medal and the CCC logo.

## Proposed colours

Each division gets up to three shades, because the same colour can't work everywhere:

- **Fill:** panels and the colour wash on the brand sliders.
- **Mark on light:** small marks on white or ivory (list markers, link underline).
- **Mark on navy:** the rule under the brand page H1.

| Division | Fill | Mark on light | Mark on navy | Source |
|---|---|---|---|---|
| Consumer Choice Award | Heritage Gold `#D4A843` (no change) | Dark gold `#8A6514` (new for this use; today the gold is used, at 2.21:1 on white) | Heritage Gold `#D4A843` | medal and CCC logo gold; existing tokens |
| Consumer Choice Marketing | Deep red `#7B1417` | Deep red `#7B1417` | CCM gold `#CF9F28` (the checkmark) | CCM logo |
| CCRDI | Charcoal `#3A3A3C` | CCRDI red `#C82127` | CCRDI bright red `#ED1C28` (the pixel squares) | CCRDI logo |

Why separate marks on navy: the deep red (1.43:1) and the charcoal (1.36:1) are close to
invisible on navy. The logos' own second colours are used instead. Each mark on navy appears
only on its own brand page, so the Marketing gold doesn't sit next to the Award gold.

## Contrast in every place the colours are used

| Where | Text or mark | Award | Marketing | CCRDI | Target |
|---|---|---|---|---|---|
| Our Brands panels (solid fill) | panel text | navy on gold **6.95** | white on deep red **10.74** | white on charcoal **11.35** | 4.5 |
| Brand sliders: 95% colour wash on hover (Home, 40 Years, brand pages), over a white part of the photo | slide title and category | navy **7.23** | white **9.63** | white **9.72** | 4.5 |
| The same, over a black part of the photo | slide title and category | navy **6.29** | white **11.28** | white **11.88** | 4.5 |
| Brand page sidebar list markers ("~", decorative) | mark on white | **5.31** | **10.74** | **5.67** | 3 |
| Brand page sidebar link underline | mark on white | **5.31** | **10.74** | **5.67** | 3 |
| Brand page body list bullets | mark on white | **5.31** | **10.74** | **5.67** | 3 |
| The same on ivory | mark on ivory | **4.92** | **9.95** | **5.25** | 3 |
| Brand page rule under the H1 (decorative) | mark on navy | **6.95** | **6.33** | **3.52** | 3 |

For comparison, today:
- Marketing orange `#C2410C`: white text 5.18:1, 2.97:1 on navy.
- CCRDI teal `#0F766E`: white text 5.47:1, 2.81:1 on navy.
- Award gold `#D4A843` as a mark on white: 2.21:1.

So the proposal raises every ratio, and fixes the two marks that are below 3:1 today: the
Award markers on white and the CCRDI rule on navy.

## Things to know

- **Telling the panels apart.** Deep red and charcoal are close in lightness (1.06:1), so they
  differ by hue rather than brightness. Every panel and slide also names its brand (and the
  walls show its logo), so colour is never the only cue.
- **Alternative for CCRDI:** red `#C82127` as the fill instead of charcoal. White text on it is
  5.67:1. But it sits close to Marketing's deep red (1.89:1 between them), so the three brands
  would read as gold, red and red. Charcoal keeps them distinct.
- **Tokens:** `brand.colors` in site.config.json gets `award`, `marketing` and `research`
  updated, plus `awardMark`, `marketingMark`, `researchMark` (mark on light) and
  `marketingOnDark`, `researchOnDark` (mark on navy). These map to `--color-*` tokens in
  global.css. No hex values go in components.
- design.md's division accents would be updated to match once approved.
