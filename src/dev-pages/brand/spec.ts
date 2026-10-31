// Brand specimen helpers (dev only): the proposed palette (palette.json) as --spec-* variables,
// mapped onto the theme's colour roles for the specimen pages only, and WCAG contrast ratios.
import palette from './palette.json';

export const colors = palette.colors;
export const hex = (key: string) => colors.find((c) => c.key === key)!.hex;

const specVars = colors.map((c) => `--spec-${c.key}:${c.hex};`).join('');
const roles = [
  '--brand-dark:var(--spec-ink)',
  '--brand-navy700:var(--spec-charcoal)',
  '--brand-primary:var(--spec-red)',
  '--brand-primaryDeep:var(--spec-wine)',
  '--brand-goldText:var(--spec-red)',
  '--brand-goldEdge:var(--spec-silver)',
  '--brand-light:var(--spec-mist)',
  '--brand-muted:var(--spec-silver)',
  '--brand-mutedDark:var(--spec-slate)',
  '--brand-text:var(--spec-ink)',
  '--brand-border:var(--spec-silver)',
  "--brand-font-heading:'Plus Jakarta Sans Variable',sans-serif",
  '--color-hairline-dark:var(--spec-signalRed)',
  '--color-hairline-light:var(--spec-silver)',
  '--radius-card:6px',
  '--radius-btn:4px',
  '--heading-weight:650',
  '--subheading-weight:600',
].join(';');

/** A <style> for the page's head: the palette, the role mapping, and the site header hidden. */
export const headStyle = `<style>html:root{${specVars}${roles}}#site-header{display:none}</style>`;

const luminance = (h: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const v = parseInt(h.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** WCAG 2.1 contrast ratio between two hex colours, to two decimals. */
export function contrast(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return Math.round(((x + 0.05) / (y + 0.05)) * 100) / 100;
}
