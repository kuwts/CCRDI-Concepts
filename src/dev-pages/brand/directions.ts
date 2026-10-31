// Brand specimen, round 2 (dev only): three design directions for CCRDI, each on the logo's core
// colours (Ink, CCRDI Red, Silver) with cool-tinted neutrals, a heading face, a monospace for
// numbers, data labels and small eyebrows, and Inter (shared with Consumer Choice Canada) or the
// heading family for body text. Each direction's palette is written as --spec-* variables and
// mapped onto the theme's colour roles for its own page only, so the real components show it.
// Once a direction is chosen its values move into site.config.json → brand.

export interface Swatch {
  key: string;
  name: string;
  hex: string;
  use: string;
}
export interface Direction {
  id: 'report' | 'platform' | 'signal';
  name: string;
  summary: string;
  fonts: { heading: string; mono: string; body: string };
  palette: Swatch[];
  /** theme roles → palette keys, plus shape tokens */
  roles: Record<string, string>;
}

// the logo's own colours, shared by all three (measured from ccrdi-logo.png)
const logo = {
  red: { key: 'red', name: 'CCRDI Red', hex: '#C82127', use: 'the signal: one mark, one data point, one rule at a time' },
  signal: { key: 'signal', name: 'Signal Red', hex: '#ED1C28', use: 'the logo’s bright pixel squares; motifs only' },
  silver: { key: 'silver', name: 'Silver', hex: '#D6D8D9', use: 'the logo’s circuit ring; motifs and fine lines' },
};

export const directions: Direction[] = [
  {
    id: 'report',
    name: 'Report',
    summary: 'Minimal and editorial, like a premium research report: paper-white pages, a large quiet headline, numbered sections, hairline rules, figures in a mono, and a line chart that draws itself as you read.',
    fonts: { heading: 'Instrument Sans', mono: 'IBM Plex Mono', body: 'Inter' },
    palette: [
      { key: 'ink', name: 'Ink', hex: '#15171B', use: 'text, the primary button, the dark band' },
      { key: 'graphite', name: 'Graphite', hex: '#474D57', use: 'secondary text' },
      { key: 'steel', name: 'Steel', hex: '#7D8590', use: 'chart lines, tertiary marks' },
      { key: 'rule', name: 'Rule', hex: '#D7DCE3', use: 'hairlines and grid lines' },
      { key: 'fog', name: 'Fog', hex: '#EEF1F4', use: 'alternate sections' },
      { key: 'paper', name: 'Paper', hex: '#F9FAFB', use: 'page' },
      { key: 'white', name: 'White', hex: '#FFFFFF', use: 'panels' },
      logo.red,
      logo.silver,
    ],
    roles: {
      dark: 'ink', navy700: 'graphite', primary: 'ink', primaryDeep: 'graphite', goldText: 'red',
      light: 'fog', muted: 'silver', mutedDark: 'graphite', text: 'ink', border: 'rule', '--spec-page': 'paper',
      '--color-hairline-light': 'rule', '--color-hairline-dark': 'red',
      '--radius-card': '2px', '--radius-btn': '0px', '--heading-weight': '500', '--subheading-weight': '500',
    },
  },
  {
    id: 'platform',
    name: 'Platform',
    summary: 'Technical, like a refined data platform: a cool canvas on a fine grid, bordered panels with corner ticks and mono labels, and a matrix of the logo’s pixel squares that assembles into a heat map.',
    fonts: { heading: 'Geist', mono: 'Geist Mono', body: 'Geist' },
    palette: [
      { key: 'ink', name: 'Ink', hex: '#0D1015', use: 'text, the primary button' },
      { key: 'graphite', name: 'Graphite', hex: '#2B313A', use: 'hover, dark panels' },
      { key: 'slate', name: 'Slate', hex: '#566070', use: 'secondary text' },
      { key: 'steel', name: 'Steel', hex: '#97A0AD', use: 'bars and quiet marks' },
      { key: 'rule', name: 'Rule', hex: '#D3D9E1', use: 'panel borders' },
      { key: 'grid', name: 'Grid', hex: '#E7EBF0', use: 'the background grid, gridlines' },
      { key: 'canvas', name: 'Canvas', hex: '#F4F6F9', use: 'page' },
      { key: 'white', name: 'White', hex: '#FFFFFF', use: 'panels' },
      { key: 'h1', name: 'Matrix 1', hex: '#E3E8EE', use: 'heat map, lowest' },
      { key: 'h2', name: 'Matrix 2', hex: '#C3CCD8', use: 'heat map' },
      { key: 'h3', name: 'Matrix 3', hex: '#97A3B3', use: 'heat map' },
      { key: 'h4', name: 'Matrix 4', hex: '#66738A', use: 'heat map' },
      { key: 'h5', name: 'Matrix 5', hex: '#3A4558', use: 'heat map, highest' },
      logo.red,
      logo.signal,
      logo.silver,
      { key: 'wine', name: 'Wine', hex: '#8F2635', use: 'the logo’s dark pixel squares; motifs' },
      { key: 'blush', name: 'Blush', hex: '#F4D1D8', use: 'the logo’s pale pixel squares; motifs' },
    ],
    roles: {
      dark: 'ink', navy700: 'graphite', primary: 'ink', primaryDeep: 'graphite', goldText: 'red',
      light: 'canvas', muted: 'silver', mutedDark: 'slate', text: 'ink', border: 'rule', '--spec-page': 'canvas',
      '--color-hairline-light': 'rule', '--color-hairline-dark': 'red',
      '--radius-card': '8px', '--radius-btn': '6px', '--heading-weight': '600', '--subheading-weight': '600',
    },
  },
  {
    id: 'signal',
    name: 'Signal',
    summary: 'Between the two: the CCC homepage’s composition (photo layers, a sticky statement beside a card stack) in a crisp light palette, an expanded grotesk, monochrome photography, and bars that grow to a red signal.',
    fonts: { heading: 'Archivo', mono: 'JetBrains Mono', body: 'Inter' },
    palette: [
      { key: 'ink', name: 'Ink', hex: '#17191D', use: 'text, the primary button, frosted panes' },
      { key: 'graphite', name: 'Graphite', hex: '#33373E', use: 'hover' },
      { key: 'slate', name: 'Slate', hex: '#51575F', use: 'secondary text' },
      { key: 'steel', name: 'Steel', hex: '#8D949E', use: 'bars' },
      { key: 'rule', name: 'Rule', hex: '#D9DDE2', use: 'hairlines' },
      { key: 'mist', name: 'Mist', hex: '#F2F4F6', use: 'alternate sections' },
      { key: 'white', name: 'White', hex: '#FFFFFF', use: 'page' },
      logo.red,
      logo.signal,
      logo.silver,
      { key: 'wine', name: 'Wine', hex: '#8F2635', use: 'the logo’s dark pixel squares; motifs' },
      { key: 'blush', name: 'Blush', hex: '#F4D1D8', use: 'the logo’s pale pixel squares; motifs' },
    ],
    roles: {
      dark: 'ink', navy700: 'graphite', primary: 'ink', primaryDeep: 'graphite', goldText: 'red',
      light: 'mist', muted: 'silver', mutedDark: 'slate', text: 'ink', border: 'rule', '--spec-page': 'white',
      '--color-hairline-light': 'rule', '--color-hairline-dark': 'red',
      '--radius-card': '6px', '--radius-btn': '4px', '--heading-weight': '600', '--subheading-weight': '600',
    },
  },
];

export const direction = (id: string) => directions.find((d) => d.id === id)!;
export const hexOf = (d: Direction, key: string) => d.palette.find((c) => c.key === key)!.hex;

const families: Record<string, string> = {
  'Instrument Sans': "'Instrument Sans Variable',sans-serif",
  'IBM Plex Mono': "'IBM Plex Mono',monospace",
  Geist: "'Geist Variable',sans-serif",
  'Geist Mono': "'Geist Mono Variable',monospace",
  Archivo: "'Archivo Variable',sans-serif",
  'JetBrains Mono': "'JetBrains Mono Variable',monospace",
  Inter: "'Inter Variable',sans-serif",
};

/** The CSS font-family list for a font name in this file. */
export const fontFamily = (name: string) => families[name];

/** A <style> for the head: the palette, the role mapping, the fonts, the site header hidden. */
export function headStyle(d: Direction): string {
  const vars = d.palette.map((c) => `--spec-${c.key}:${c.hex}`);
  const roles = Object.entries(d.roles).map(([role, v]) =>
    role.startsWith('--')
      ? `${role}:${v.match(/^[a-z]\w*$/i) && d.palette.some((c) => c.key === v) ? `var(--spec-${v})` : v}`
      : `--brand-${role}:var(--spec-${v})`,
  );
  const fonts = [
    `--brand-font-heading:${families[d.fonts.heading]}`,
    `--brand-font-body:${families[d.fonts.body]}`,
    `--spec-mono:${families[d.fonts.mono]}`,
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
