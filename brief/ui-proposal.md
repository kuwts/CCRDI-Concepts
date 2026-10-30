# UI proposal: a calmer, more premium finish

**Status:** approved, including typography and images. Applied site-wide on the
`ui-proposal` branch in four stages, each committed: spacing, interactions, typography,
images. The homepage-only preview flag (`data-ui="proposal"`) has been removed.
`ccc-site-build` is unchanged until the merge is approved.

**Decisions:**
1. Section titles stay centred.
2. The gold full stop after headings is dropped everywhere.
3. The Who We Serve card gap is 96px.

**Refinements made while applying it** (the same scale and weights, two extra steps):
- **Interior page H1s** use their own step, 32 → 48px (`--text-h1`). The 36 → 64px display
  size is kept for the homepage hero only, since 64px is too large for a page title like
  "Privacy Policy".
- **Sentence-length headings** use a "statement" step, 28 → 36px (`--text-statement`). These
  are the homepage intro's lead message, the For Businesses intro, the CCRDI credibility
  message and the featured news headline. At 44px they would run to about seven lines.
- **The measure is `34em`, not `65ch`.** In Inter, `ch` is the width of a "0", so 65ch came out
  at about 78 characters; 34em is about 65 to 68.

**Scope:** spacing, typography, image treatment and micro-interactions only. No layout,
section order, component or copy changes. The brief still applies:
- calm, institutional and heritage-led
- subtle fade-up on scroll at most
- `prefers-reduced-motion` respected
- 8px spacing scale, 12px cards, 8px buttons
- WCAG 2.1 AA

---

## 1. What makes institutional sites feel high-end

These are general design principles, not taken from any one site.

- **Whitespace that shows confidence.** Established institutions give each section room:
  - about 120 to 160px between major sections on desktop, about 80px on phones
  - the same spacing on every page
  - Tight, uneven spacing reads as busy or promotional.
- **One vertical rhythm.**
  - Spacing comes from one small scale.
  - The gap under a section heading is the same everywhere.
  - Adjacent sections never share a background, so each block reads as its own chapter.
- **Restrained type.**
  - one heading family at one or two weights (serifs look most refined at regular to
    medium weight, not bold)
  - a consistent size ratio between levels (about 1.25)
  - slightly tighter letter-spacing at display sizes
  - body text at 16 to 18px, 1.6 to 1.7 line height
  - **Line length:** 45 to 75 characters (typographic convention), ideally about 65.
- **Consistent eyebrows and labels.** Small labels above headings share one style: small,
  medium weight, often uppercase with open tracking, in an accent colour. They work like
  signage.
- **Image treatment.**
  - fewer, larger images, at consistent aspect ratios and one corner radius
  - natural colour, no heavy filters
  - Hover effects are slight (a 2 to 4% zoom at most) and only on images that link
    somewhere.
- **Quiet micro-interactions.**
  - **Feedback:** states respond within about 100 to 250ms, so they feel immediate without
    being noticed. Colour and underline changes do the work; text doesn't move or swap.
  - **Scroll reveals:** short distances (8 to 16px), 500 to 800ms, once only. Premium sites
    use them sparingly or not at all.
  - **Pressing:** a 1px press or a fill step confirms the click.
  - **Focus:** always visible, never hidden behind fixed elements.
  - **Hover:** nothing hovers that can't be clicked.
- **Nothing fixed competing with content.**
  - no permanent overlays or floating effects
  - the header and one back-to-top control at most

## 2. Where the current site stands

Measured on the built homepage at 1440px and 390px.

| Area | Now | Gap |
|---|---|---|
| Section spacing | 100px on desktop, 80px on phones, everywhere | Slightly tight for "generous white space" (design.md) at 1440px. One value for every width. |
| Section rhythm | Intro and Family of Brands are both ivory, back to back | They read as one 2,600px-tall block. |
| Gap under section titles | 56px (`mb-14`) | Fine on phones; tight next to the larger desktop spacing. |
| Heading weights (serif) | 300 (footer), 500 (H1), 600 (H2), 700 (card and news H3) | Four weights. The 700s look heavy and promotional. |
| Heading sizes | H1 56, H2 36, H3 38, 30, 24 and 20 | No clear ratio. A card H3 (38px) is larger than the H2 (36px). |
| Heading line height | Brand card titles 38px at 1.6 | Too loose for display text (1.1 to 1.2 is typical). |
| Letter-spacing | Intro H2 −0.9px; other H2s normal | Inconsistent. |
| Eyebrows | "About" 14px navy; "Our Brands" 16px navy at 70% | Two styles for the same role. |
| Line length | About paragraph about 72 characters per line; the rest 42 to 60 | About sits at the upper limit. |
| Buttons | On hover the label rolls up and a copy rolls in (650ms), plus the approved gold sheen | The roll is an agency-style effect, and the text moves under the pointer. |
| Text links | On hover the underline retracts, then a gold one draws in after a 300ms pause (about 700ms in all) | For a moment there's no underline; it feels hesitant. |
| Scroll reveal | 400ms; most items rise 8px, cards rise 25px and scale from 99% | Two motions; quick and slightly bouncy (the curve front-loads the movement). |
| Image hover | Brand cards zoom 20%; news cards shift sideways | 20% is dramatic. The shift looks like a glitch. |
| Image corners | Brand cards 12px; news images square | Two treatments. |
| Fixed blur strip | A 6rem `backdrop-filter` band at the bottom of every screen (also in audit.md) | It blurs content as it scrolls past, costs GPU time on phones, and can partly cover a focused link near the bottom of the window. |
| Focus ring | Gold with a navy inner ring | Good. Keep it. |
| Reduced motion | Respected | Good. Keep it. |

## 3. Proposed changes

### 3.1 Spacing (applied on the homepage preview)

| Change | Token | Why |
|---|---|---|
| Section padding 80 / 104 / 128px (phone / tablet / desktop) instead of 80 / 100 | New `--spacing-section-sm` (5rem), `--spacing-section-md` (6.5rem), `--spacing-section-lg` (8rem) in the `@theme` block → `py-section-sm md:py-section-md lg:py-section-lg` | 28% more air between sections on desktop, phones unchanged. Steps on the 8px scale. |
| Gap under section titles 48px on phones, 64px on desktop instead of 56px | SectionTitle `marginClass` (`mb-12 lg:mb-16`); site-wide, change the default | Keeps the heading in proportion to the larger section spacing. |
| No two adjacent sections share a background: Family of Brands moves from ivory to white | Existing `bg-white` / `bg-light` | The homepage now runs navy → ivory → white → navy → ivory → white → navy. |
| The intro section gets its own bottom padding (it used to rely on the next section's) | `--spacing-section-*` | Needed once the two backgrounds differ. |

Effect: the homepage is about 400px taller at 1440px (7,742 → 8,146px). It's unchanged at
390px apart from the background.

### 3.2 Interactions (applied on the homepage preview)

| Change | Token | Why |
|---|---|---|
| **Buttons:** the label stays put (no roll-up swap). The fill tint changes in 250ms; pressing moves the button down 1px. The approved gold sheen on the border stays. | `--duration-base` 250ms, `--duration-fast` 150ms, `--ease-theme` (unchanged) | Text that moves under the pointer feels promotional. A fill step plus the sheen is enough. |
| **Text links:** the faint resting underline stays; a full gold underline draws from the left in 250ms, with no retract and no pause. The arrow nudges 2px up and right. | `--duration-base` | Immediate, readable feedback; the link never loses its underline. |
| **Scroll reveal:** one motion for everything: fade up 12px over 700ms, no scale. The seal's "pop" is unchanged. Reduced motion shows everything at once, as now. | `--reveal-distance` 12px, `--duration-slow` 700ms | Calmer and slower, one motion only, within the brief's "subtle fade-up at most". |
| **Card images:** 4% zoom over 700ms on hover or keyboard focus. That's 20% now on brand cards, and the sideways shift on news cards is gone. The brand cards' colour wash stays (it keeps the title readable). | `--zoom-image` 1.04, `--duration-slow` | A slow, small zoom feels considered; 20% feels like a gimmick. |
| **No fixed blur strip** at the bottom of the screen. | none (`GradualBlur` hidden) | No overlay competes with content, and focus is never partly covered. Also on audit.md's list. |

All new motion is off under `prefers-reduced-motion`. Focus rings are unchanged. The theme's
one easing curve (`--ease-theme`) is kept for every movement, as the skill requires.

### 3.3 Typography (proposed, not applied)

| Change | Token | Why |
|---|---|---|
| **Heading weights:** two only. Display, H1 and H2 at 500; H3 at 600. No 300 or 700 in the serif. | New `--font-weight-heading` 500, `--font-weight-subheading` 600 | Fewer weights look more refined; bold serif headings look promotional. |
| **Fluid type scale,** ratio about 1.25. Display/H1 36 → 64px. H2 30 → 44px. Card and H3 titles 20 → 28px, always smaller than H2. Lead 20px. Body 17px for reading paragraphs (UI text stays 15 to 16px). Small 14px. Eyebrow 13px. | New `--text-display`, `--text-h2`, `--text-h3`, `--text-lead`, `--text-body`, `--text-eyebrow` (with `clamp()`) | A clear hierarchy that scales smoothly between phone and desktop; brand card titles stop competing with section headings. |
| **Line heights:** display 1.1, headings 1.2, body 1.65. Fixes the brand card titles (38px at 1.6). | New `--leading-display`, `--leading-heading`, `--leading-body` | Tight display lines look set, not typed. Open body lines aid reading. |
| **Letter-spacing:** −0.015em at 36px and up; normal below. One rule for all H1s and H2s. | New `--tracking-display` | Large serif text looks loose at default spacing; one rule removes the inconsistency. |
| **Line length:** paragraphs capped at 65 characters. | New `--container-measure` 34em (`max-w-measure`; about 65 characters) | Keeps the About paragraph (72) in the comfortable range. |
| **One eyebrow style:** 13px, medium, uppercase, 0.08em tracking. Gold text on light backgrounds (4.92:1 on ivory, 5.31:1 on white), Heritage Gold on navy (6.95:1). Applies to short labels ("About", "Our Brands"). The hero tagline stays in sentence case, since it's a full sentence. | `--text-eyebrow`, existing `--color-gold-text` / `--color-primary` | Labels work like signage and tie the gold accent into every section. |
| **Body text colour:** paragraphs on light backgrounds use design.md's text colour `#1F2933` (`text-text`) instead of navy; headings stay navy. | Existing `--color-text` | Matches design.md; a slightly softer body colour lets navy headings lead. Still 14.7:1 on white. |
| **Wrapping:** `text-wrap: balance` on headings, `pretty` on paragraphs (where supported) | none | No single-word last lines. |

### 3.4 Image treatment (proposed; the zoom is applied)

- **One corner radius:** every card image at 12px (`--radius-card`). News images are square
  now.
- **Fixed aspect ratios by role:**
  - hero / showreel 16:9
  - brand cards and news cards 3:2
  - pillar cards as now
  - so the client's photos crop consistently when they arrive
- **Hover only where it links:** the 4% zoom only on linked images; nothing on decorative
  ones.
- **Photography direction** (when the client's photos arrive): natural light and colour, no
  filters or heavy grading, one subject per photo. Already in line with design.md's
  imagery rules.

## 4. Decisions for you (not applied)

1. **Left-aligned section titles.** Section titles are centred now. Left-aligning them to the
   grid (SectionTitle `align="left"`, an existing prop) reads more editorial and
   institutional. Optional.
2. **The gold full stop after headings** (a theme flourish, e.g. "Family of Brands."). It
   adds warmth, but a standards body usually wouldn't use one. Keep or drop?
3. **Who We Serve cards:** the 160px gap between each card's title and text (`md:mb-40`) leaves
   the cards mostly empty at 1440px. Reduce it to 96px?

## 5. Applying it site-wide (after approval)

1. **Tokens:** move the proposed tokens from `@theme static` into the main `@theme` block and
   add the typography tokens.
2. **Spacing:** replace `py-20 md:py-25` with the section utilities in every page and section
   component. That covers WorkProcess (it now has a `spacingClass` prop), the footer, the
   PageHeader follow-on sections, and the brand page, 40 Years, About and Our Brands
   templates. Then change SectionTitle's default `marginClass`.
3. **Interactions:** fold the preview rules into the `btn`, `line-link` and `has-anim`
   utilities, and into the PortfolioCard and BlogCard classes. Remove `GradualBlur` from
   `Base.astro` (and from the cleanup list).
4. **Typography:** apply the scale and weights in SectionTitle, PortfolioCard, BlogCard, the
   home and page templates, and the prose (`.content`) styles.
5. **Clean up the preview:** remove the `data-ui="proposal"` flag and its CSS block.
6. **Check every page:** type check, build, 1440px and 390px screenshots of every page, axe,
   overflow and heading checks, with and without reduced motion.

## 6. Preview files

- **Branch:** `ui-proposal`. Changes:
  - `src/styles/global.css`: the proposed tokens, plus the scoped preview block at the end
  - `src/layouts/Base.astro`: the `uiProposal` prop
  - `src/components/WorkProcess.astro`: the `spacingClass` prop (the theme's default is
    unchanged)
  - `src/pages/index.astro`: section spacing, title gaps, and Family of Brands on white
- **Screenshots** (`screenshots/`, git-ignored):
  - `30-ui-before-home-1440.png`, `30-ui-before-home-390.png`: before
  - `31-ui-after-home-1440.png`, `31-ui-after-home-390.png`: after
  - `34-ui-before-intro-brands-1440.png`, `35-ui-after-intro-brands-1440.png`: the
    intro-to-brands transition
  - `32-ui-hover-button-link.png`: button and link 180ms into hover, before and after
  - `33-ui-hover-brand-card.png`: brand card at rest and on hover, before and after
- **Checks on the preview:**
  - type check and build pass
  - axe: 0 violations
  - no sideways overflow at 390, 768 and 1440px
  - one H1, no skipped heading levels

---

## 7. Bold round (approved; branch `bold-round`)

Applied after the proposal, on the project owner's request, keeping the calm feel, the
subtle-motion rule and WCAG 2.1 AA.

- **Homepage hero:** imagery behind the headline under a navy overlay (`hero-scrim`, with
  `--scrim-*` strengths).
  - Version A (used): a photo of Seaton Lake, BC, at dusk.
  - Version B (kept switchable, unused): a muted looping Québec City aerial video. The poster
    shows first, and alone with reduced motion; it pauses off screen and has a keyboard pause
    control.
  - Switch with `banner.background.variant` in the homepage content.
  - Every hero text line keeps 4.5:1 or better over the brightest pixel behind it.
- **Interior page headers** stay small, with no imagery.
- **Section spacing:** 96 / 120 / 160px on every page (`--spacing-section-*`). Section title
  gaps are 60 / 80px.
- **Gold hairlines (1px):** a few per page (`hairline-top`, `hairline-dark`, `hairline-bottom`).
  - On light sections they use dark gold (`#8A6514`), on navy Heritage Gold.
  - Page-header edges use an edge gold (`#A9802A`), which meets 3:1 against both navy and
    white.
- **Navy grain:** a fine SVG grain on the page background (so every navy area has it) and on the
  sticky header. It's at most 3.5% white, so white text stays above 14:1 and gold above 6.3:1.
- **Pull quotes:** italic serif with a gold rule (`pull-quote`), framework text only.
  - Home: §13 lead message.
  - For Businesses: the Growth pillar.
  - CCRDI: the ISUCORP credibility message.
  - About: the Purpose statement (smaller, in its tile).
