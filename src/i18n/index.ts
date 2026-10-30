// English at the root, French under /fr (Canadian French, fr-CA). Pages, components and
// layouts take their language from the URL; site-wide text for each language lives in
// site.config.json (English at the top level, French in `fr`, interface strings in `ui`) and
// menu.json (`fr`). French content entries sit in each collection's `fr/` folder.
import config from '@/config/site.config.json';
import menuConfig from '@/config/menu.json';
import routes from '@/i18n/routes.json';

export type Lang = 'en' | 'fr';

export const languages = config.i18n.languages;

/** The page's language, from its URL: French pages live under /fr. */
export function getLang(url: URL): Lang {
  return /^\/fr(\/|$)/.test(url.pathname) ? 'fr' : 'en';
}

const clean = (path: string) => path.replace(/(.)\/$/, '$1') || '/';

/** The page's English and French URLs (routes.json), or undefined for unpaired pages. */
export function alternates(url: URL): Record<Lang, string> | undefined {
  const path = clean(url.pathname);
  return routes.find((r) => r.en === path || r.fr === path);
}

/**
 * An internal link in the page's language: English paths from shared code (e.g. "/40-years",
 * "/contact#form") become their French URL on French pages. External and unknown links pass
 * through unchanged.
 */
export function localizePath(href: string, lang: Lang): string {
  if (lang === 'en' || !href.startsWith('/')) return href;
  const [, path, rest = ''] = href.match(/^([^#?]*)(.*)$/)!;
  const route = routes.find((r) => r.en === clean(path));
  return route ? route.fr + rest : href;
}

/** The last segment of a page's French URL, e.g. "prix-choix-du-consommateur". */
export function frSlug(enPath: string): string | undefined {
  return routes.find((r) => r.en === enPath)?.fr.split('/').pop();
}

/** A content entry's id in the page's language: French singletons are `fr`, others `fr/<id>`. */
export function entryId(id: string, lang: Lang): string {
  if (lang === 'en') return id;
  return id === 'index' ? 'fr' : `fr/${id}`;
}

/** True for French entries (filtered out of English collection listings). */
export const isFrenchEntry = (id: string) => id === 'fr' || id.startsWith('fr/');

/** Site-wide text (SEO defaults, footer, header button) in the page's language. */
export function siteText(lang: Lang) {
  return lang === 'fr'
    ? config.fr
    : { seo: config.seo, footer: config.footer, headerButton: config.headerButton };
}

/** The main and footer menus in the page's language. */
export function menuFor(lang: Lang) {
  return lang === 'fr' ? menuConfig.fr : { main: menuConfig.main, footer: menuConfig.footer };
}

/** Interface strings (labels hard-coded in components) in the page's language. */
export function ui(lang: Lang) {
  return config.ui[lang];
}

/** Fills `{name}` slots in an interface string. */
export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (m, key) => (key in values ? String(values[key]) : m));
}

/** The locale tag for Intl formatting and `lang` attributes: en-CA or fr-CA. */
export const localeTag = (lang: Lang) => languages[lang].lang;

/**
 * A date from an ISO string (YYYY-MM-DD) in long form: "October 1, 2026" in English,
 * "1er octobre 2026" in French (the first of the month is "1er", OQLF).
 */
export function formatLongDate(iso: string, lang: Lang): string {
  const date = new Date(`${iso}T12:00:00Z`);
  const parts = new Intl.DateTimeFormat(localeTag(lang), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
  return lang === 'fr' ? parts.replace(/^1 /, '1er ') : parts;
}

/** A file size: "245 KB" and "1.2 MB" in English, "245 Ko" and "1,2 Mo" in French. */
export function fileSize(bytes: number, lang: Lang): string {
  const [units, sep] = lang === 'fr' ? [['Ko', 'Mo'], ' '] : [['KB', 'MB'], ' '];
  const mb = bytes >= 1048576;
  const value = mb ? bytes / 1048576 : Math.round(bytes / 1024);
  const shown = new Intl.NumberFormat(localeTag(lang), { maximumFractionDigits: mb ? 1 : 0, minimumFractionDigits: mb ? 1 : 0 }).format(value);
  return `${shown}${sep}${units[mb ? 1 : 0]}`;
}
