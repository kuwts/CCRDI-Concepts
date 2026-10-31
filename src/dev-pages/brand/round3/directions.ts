// Brand specimen, round 3 (dev and preview builds): three genuinely different CCRDI directions,
// each rooted in the logo's colours (charcoal, CCRDI red, signal red, wine, the pale pinks, the
// silver ring) and its motifs (the pixel squares, the circuit ring):
//   Precision      light, monochrome, technical: the best of round 2
//   Human Insight  warm and editorial: linen and sand, a crimson red, a serif, colour photography
//   Vivid          bold: fields of red and wine, the logo's pinks as a data ramp, big type
// Each direction's palette is written as --spec-* variables and mapped onto the theme's colour
// roles for its own page only, so the real components show it.

export interface Swatch {
  key: string;
  name: string;
  hex: string;
  use: string;
}
export interface Direction {
  id: 'precision' | 'human-insight' | 'vivid';
  name: string;
  summary: string;
  imagery: string;
  signature: string;
  fonts: { heading: string; body: string; label: string };
  palette: Swatch[];
  /** theme roles → palette keys (or raw values for `--` custom properties) */
  roles: Record<string, string>;
}

const logo = {
  red: { key: 'red', name: 'CCRDI Red', hex: '#C82127', use: 'the logo’s “RDI”' },
  signal: { key: 'signal', name: 'Signal Red', hex: '#ED1C28', use: 'the logo’s bright pixel squares' },
  wine: { key: 'wine', name: 'Wine', hex: '#8F2635', use: 'the logo’s dark pixel squares' },
  blush: { key: 'blush', name: 'Blush', hex: '#F4D1D8', use: 'the logo’s pale pixel squares' },
  silver: { key: 'silver', name: 'Silver', hex: '#D6D8D9', use: 'the logo’s circuit ring' },
};

export const directions: Direction[] = [
  {
    id: 'precision',
    name: 'Precision',
    summary: 'Light, monochrome and technical. A cool canvas on a fine grid, bordered panels with corner marks, a mono for every figure and label, black-and-white photography under frosted ink, and red used only as a signal.',
    imagery: 'Black-and-white photography of research at work, cool and crisp, under frosted ink panes.',
    signature: 'An instrument panel where the logo’s ring draws and its squares assemble; a heat map of pixel squares that settles into rows, then scans once.',
    fonts: { heading: 'Geist', body: 'Geist', label: 'Geist Mono' },
    palette: [
      { key: 'ink', name: 'Ink', hex: '#0F1216', use: 'text, the primary button, panes' },
      { key: 'graphite', name: 'Graphite', hex: '#2B3038', use: 'hover, dark panels' },
      { key: 'slate', name: 'Slate', hex: '#535B66', use: 'secondary text' },
      { key: 'steel', name: 'Steel', hex: '#939AA5', use: 'quiet marks, trend lines' },
      { key: 'rule', name: 'Rule', hex: '#D5DAE1', use: 'panel borders, hairlines' },
      { key: 'grid', name: 'Grid', hex: '#E8EBF0', use: 'the background grid' },
      { key: 'canvas', name: 'Canvas', hex: '#F5F6F8', use: 'page' },
      { key: 'white', name: 'White', hex: '#FFFFFF', use: 'panels' },
      { key: 'h1', name: 'Matrix 1', hex: '#E3E8EE', use: 'heat map' },
      { key: 'h2', name: 'Matrix 2', hex: '#C3CCD8', use: 'heat map' },
      { key: 'h3', name: 'Matrix 3', hex: '#97A3B3', use: 'heat map' },
      { key: 'h4', name: 'Matrix 4', hex: '#66738A', use: 'heat map' },
      { key: 'h5', name: 'Matrix 5', hex: '#3A4558', use: 'heat map' },
      logo.red,
      logo.signal,
      logo.wine,
      logo.blush,
      logo.silver,
    ],
    roles: {
      dark: 'ink', navy700: 'graphite', primary: 'ink', primaryDeep: 'graphite', goldText: 'red',
      light: 'canvas', muted: 'silver', mutedDark: 'slate', text: 'ink', border: 'rule',
      '--spec-page': 'canvas', '--spec-accent': 'red', '--spec-muted-text': 'slate',
      '--color-hairline-light': 'rule', '--color-hairline-dark': 'red',
      '--radius-card': '8px', '--radius-btn': '6px', '--heading-weight': '600', '--subheading-weight': '600',
    },
  },
  {
    id: 'human-insight',
    name: 'Human Insight',
    summary: 'Warm and editorial, a trusted research partner focused on people. Linen and sand, a deeper crimson take on the CCRDI red, an elegant serif, generous rounded photography of real people and consumers, and data drawn as people.',
    imagery: 'Full-colour photography of real people and consumers in their own settings, warm natural light, rounded crops and overlapping collages.',
    signature: 'The logo’s circuit ring draws around a portrait as it opens; a chart of people, one square for each of a hundred respondents, that fills in like a room filling up.',
    fonts: { heading: 'Fraunces', body: 'DM Sans', label: 'DM Sans' },
    palette: [
      { key: 'espresso', name: 'Espresso', hex: '#2B211D', use: 'text, dark sections' },
      { key: 'taupe', name: 'Taupe', hex: '#6A5E54', use: 'secondary text, other data' },
      { key: 'clay', name: 'Clay', hex: '#D8CABA', use: 'rules, empty data' },
      { key: 'sand', name: 'Sand', hex: '#ECE3D7', use: 'alternate sections, cards' },
      { key: 'linen', name: 'Linen', hex: '#F7F2EC', use: 'page' },
      { key: 'white', name: 'White', hex: '#FFFFFF', use: 'cards' },
      { key: 'crimson', name: 'Crimson', hex: '#A3202F', use: 'CCRDI red, deepened: buttons, accents, the highlighted data' },
      { key: 'crimsonDeep', name: 'Crimson Deep', hex: '#7C1826', use: 'button hover' },
      { key: 'rose', name: 'Rose', hex: '#EBCBC6', use: 'the logo’s blush, warmed: tints' },
      logo.red,
      logo.wine,
    ],
    roles: {
      dark: 'espresso', navy700: 'taupe', primary: 'crimson', primaryDeep: 'crimsonDeep', goldText: 'crimson',
      light: 'sand', muted: 'clay', mutedDark: 'taupe', text: 'espresso', border: 'clay',
      '--spec-page': 'linen', '--spec-ink': 'espresso', '--spec-accent': 'crimson', '--spec-muted-text': 'taupe',
      '--spec-rule': 'clay', '--spec-steel': 'taupe',
      '--color-hairline-light': 'clay', '--color-hairline-dark': 'rose',
      '--radius-card': '20px', '--radius-btn': '999px', '--heading-weight': '400', '--subheading-weight': '500',
    },
  },
  {
    id: 'vivid',
    name: 'Vivid',
    summary: 'Bold and confident. Large fields of the logo’s red and wine, its pinks as a data colour ramp, big condensed type, the pixel squares as a supergraphic, and richer data that moves with energy, kept polished.',
    imagery: 'Photography in a red and wine duotone, set in large blocks against the colour fields.',
    signature: 'The logo’s pixel squares assemble as a supergraphic across the red hero while the ring draws; stacked bars in the pink-to-wine ramp cascade in, segment by segment.',
    fonts: { heading: 'Bricolage Grotesque', body: 'Inter', label: 'Bricolage Grotesque' },
    palette: [
      logo.red,
      logo.wine,
      logo.signal,
      { key: 'plum', name: 'Plum', hex: '#4A1520', use: 'the darkest field, the ramp’s top step' },
      { key: 'coral', name: 'Coral', hex: '#DC605B', use: 'the logo’s soft red squares, lifted a step so ink labels pass: data' },
      { key: 'pink', name: 'Pink', hex: '#E59698', use: 'the logo’s mid pink: data' },
      logo.blush,
      { key: 'petal', name: 'Petal', hex: '#FBEDEF', use: 'light sections' },
      { key: 'ink', name: 'Ink', hex: '#1F1417', use: 'text' },
      { key: 'white', name: 'White', hex: '#FFFFFF', use: 'page, text on red' },
    ],
    roles: {
      dark: 'wine', navy700: 'plum', primary: 'red', primaryDeep: 'wine', goldText: 'red',
      light: 'petal', muted: 'blush', mutedDark: 'wine', text: 'ink', border: 'blush',
      '--spec-page': 'white', '--spec-accent': 'red', '--spec-muted-text': 'wine', '--spec-rule': 'blush',
      '--color-hairline-light': 'blush', '--color-hairline-dark': 'blush',
      '--radius-card': '4px', '--radius-btn': '4px', '--heading-weight': '750', '--subheading-weight': '700',
    },
  },
];

export const direction = (id: string) => directions.find((d) => d.id === id)!;
export const hexOf = (d: Direction, key: string) => d.palette.find((c) => c.key === key)!.hex;

const families: Record<string, string> = {
  Geist: "'Geist Variable',sans-serif",
  'Geist Mono': "'Geist Mono Variable',monospace",
  Fraunces: "'Fraunces Variable',serif",
  'DM Sans': "'DM Sans Variable',sans-serif",
  'Bricolage Grotesque': "'Bricolage Grotesque Variable',sans-serif",
  Inter: "'Inter Variable',sans-serif",
};
/** The CSS font-family list for a font name in this file. */
export const fontFamily = (name: string) => families[name];

/** A <style> for the head: the palette, the role mapping, the fonts, the site header hidden. */
export function headStyle(d: Direction): string {
  const isKey = (v: string) => d.palette.some((c) => c.key === v);
  const vars = d.palette.map((c) => `--spec-${c.key}:${c.hex}`);
  const roles = Object.entries(d.roles).map(([role, v]) =>
    role.startsWith('--') ? `${role}:${isKey(v) ? `var(--spec-${v})` : v}` : `--brand-${role}:var(--spec-${v})`,
  );
  const fonts = [
    `--brand-font-heading:${families[d.fonts.heading]}`,
    `--brand-font-body:${families[d.fonts.body]}`,
    `--spec-label-font:${families[d.fonts.label]}`,
    `--spec-mono:${families[d.fonts.label]}`,
  ];
  return `<style>html:root{${[...vars, ...roles, ...fonts].join(';')}}#site-header{display:none}</style>`;
}

/** WCAG 2.1 contrast ratio between two hex colours, to two decimals. */
export function contrast(a: string, b: string): number {
  const lum = (h: string) => {
    const [r, g, b] = [1, 3, 5].map((i) => {
      const v = parseInt(h.slice(i, i + 2), 16) / 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return Math.round(((x + 0.05) / (y + 0.05)) * 100) / 100;
}
