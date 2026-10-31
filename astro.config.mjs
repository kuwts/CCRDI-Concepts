// @ts-check
import { writeFile } from 'node:fs/promises';
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

import config from './src/config/site.config.json' with { type: 'json' };
import routes from './src/i18n/routes.json' with { type: 'json' };

// Dev-only pages: the component lab, the internal Style Guide and the theme's demo pages (not in
// brief/sitemap.md). They live in src/dev-pages/ and are routed only by `astro dev`, so a
// production build never contains them (brief/cleanup-list.md). [pattern, entrypoint]
const devOnlyPages = [
  ['/component-lab', './src/dev-pages/component-lab.astro'],
  ['/component-lab/brand/round-1', './src/dev-pages/brand/round1/index.astro'],
  ['/component-lab/brand/round-1/[variant]', './src/dev-pages/brand/round1/[variant].astro'],
  ['/style-guide', './src/dev-pages/style-guide.astro'],
  ['/blog', './src/dev-pages/blog/index.astro'],
  ['/blog/[slug]', './src/dev-pages/blog/[slug].astro'],
  ['/blog-horizontal', './src/dev-pages/blog-horizontal.astro'],
  ['/portfolio', './src/dev-pages/portfolio/index.astro'],
  ['/portfolio/[slug]', './src/dev-pages/portfolio/[slug].astro'],
  ['/job/[slug]', './src/dev-pages/job/[slug].astro'],
  ['/pricing', './src/dev-pages/pricing.astro'],
  ['/faq', './src/dev-pages/faq.astro'],
  ['/team', './src/dev-pages/team.astro'],
  ['/services', './src/dev-pages/services.astro'],
];
// The brand design directions for the client presentation (round 3, with round 2 kept as
// presented). Routed by `astro dev`, and built only by the preview build
// (`npm run build:preview`, BRAND_PREVIEW=1), never by `npm run build`; noindex and out of the
// sitemap either way. [pattern, entrypoint]
const brandPreview = process.env.BRAND_PREVIEW === '1';
const brandPages = [
  ['/component-lab/brand', './src/dev-pages/brand/round3/index.astro'],
  ['/component-lab/brand/precision', './src/dev-pages/brand/round3/precision.astro'],
  ['/component-lab/brand/human-insight', './src/dev-pages/brand/round3/human-insight.astro'],
  ['/component-lab/brand/vivid', './src/dev-pages/brand/round3/vivid.astro'],
  ['/component-lab/brand/round-2', './src/dev-pages/brand/round2/index.astro'],
  ['/component-lab/brand/round-2/report', './src/dev-pages/brand/round2/report.astro'],
  ['/component-lab/brand/round-2/platform', './src/dev-pages/brand/round2/platform.astro'],
  ['/component-lab/brand/round-2/signal', './src/dev-pages/brand/round2/signal.astro'],
];
/** @returns {import('astro').AstroIntegration} */
const devPages = () => ({
  name: 'dev-only-pages',
  hooks: {
    'astro:config:setup': ({ command, injectRoute }) => {
      if (command === 'dev' || brandPreview) {
        for (const [pattern, entrypoint] of brandPages) injectRoute({ pattern, entrypoint });
      }
      if (command !== 'dev') return;
      for (const [pattern, entrypoint] of devOnlyPages) injectRoute({ pattern, entrypoint });
    },
  },
});

// French under /fr, switched off until the end of the project (site.config.json →
// i18n.languages.fr.enabled). The French page templates live in src/pages/_fr/ (never routed on
// their own, as the folder starts with "_") and are routed here only while French is on, so a
// build with French off has no /fr pages, no French sitemap and no Netlify rule for them.
// [pattern, entrypoint]
const frenchEnabled = config.i18n.languages.fr.enabled === true;
const frenchPages = [
  ['/fr', './src/pages/_fr/index.astro'],
  ['/fr/a-propos', './src/pages/_fr/a-propos.astro'],
  ['/fr/nous-joindre', './src/pages/_fr/nous-joindre.astro'],
  ['/fr/confidentialite', './src/pages/_fr/confidentialite.astro'],
  ['/fr/[page]', './src/pages/_fr/[page].astro'],
  ['/fr/merci/[slug]', './src/pages/_fr/merci/[slug].astro'],
  ['/fr/404', './src/pages/_fr/404.astro'],
];
/** @returns {import('astro').AstroIntegration} */
const frenchRoutes = () => ({
  name: 'french-pages',
  hooks: {
    'astro:config:setup': ({ injectRoute }) => {
      if (!frenchEnabled) return;
      for (const [pattern, entrypoint] of frenchPages) injectRoute({ pattern, entrypoint });
    },
    // Netlify: missing French URLs get the French 404 page (English ones get /404.html)
    'astro:build:done': async ({ dir }) => {
      if (!frenchEnabled) return;
      await writeFile(
        new URL('_redirects', dir),
        '# Netlify: missing French URLs get the French 404 page (English ones get /404.html)\n/fr/*  /fr/404/index.html  404\n',
      );
    },
  },
});

// The domain isn't decided: `baseURL` is the placeholder https://ccrdi.example (a reserved
// name, RFC 2606) until the client supplies it (brief/gaps.md). Every build says so, and
// robots.txt disallows everything meanwhile (src/pages/robots.txt.ts).
const placeholderDomain = new URL(config.baseURL).hostname.endsWith('.example');
/** @returns {import('astro').AstroIntegration} */
const domainCheck = () => ({
  name: 'placeholder-domain',
  hooks: {
    'astro:build:start': ({ logger }) => {
      if (placeholderDomain)
        logger.warn(`baseURL is the placeholder ${config.baseURL}: set the real domain in site.config.json before launch (brief/gaps.md).`);
    },
  },
});

// kept out of the XML sitemap (noindex pages that are built: the form thank-you pages and the
// French 404, which is a normal page at /fr/404)
const noIndexPaths = ['/thank-you/', '/fr/merci/', '/fr/404', '/component-lab'];

// English at the root, French under /fr (src/i18n). While French is on, each sitemap URL lists
// its other-language version (the pairs in src/i18n/routes.json, whose slugs differ between
// languages).
/** @param {string} path */
const clean = (path) => path.replace(/(.)\/$/, '$1') || '/';
/** @param {string} url */
const isFrench = (url) => /^\/fr(\/|$)/.test(new URL(url).pathname);
const { languages } = config.i18n;
/** @param {string} url */
const sitemapLinks = (url) => {
  if (!frenchEnabled) return undefined;
  const path = clean(new URL(url).pathname);
  const pair = routes.find((r) => r.en === path || r.fr === path);
  if (!pair) return undefined;
  // written like the sitemap's own URLs (with a trailing slash)
  const slash = new URL(url).pathname.endsWith('/');
  /** @param {string} p */
  const abs = (p) => new URL(slash && p !== '/' ? `${p}/` : p, config.baseURL).href;
  return [
    { lang: languages.en.lang, url: abs(pair.en) },
    { lang: languages.fr.lang, url: abs(pair.fr) },
    { lang: 'x-default', url: abs(pair.en) },
  ];
};

// https://astro.build/config
export default defineConfig({
  site: config.baseURL,
  trailingSlash: config.trailingSlash ? 'always' : 'ignore',
  // English pages at the root, French under /fr (fr-CA) while it's switched on; no redirect by
  // browser language
  i18n: {
    locales: frenchEnabled ? ['en', { path: 'fr', codes: ['fr-CA', 'fr'] }] : ['en'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  integrations: [
    mdx(),
    devPages(),
    frenchRoutes(),
    domainCheck(),
    // noindex pages stay out of the sitemap (the form thank-you pages)
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return !noIndexPaths.some((p) => path === p || path.startsWith(p));
      },
      serialize: (item) => ({ ...item, links: sitemapLinks(item.url) }),
      // sitemap-en-0.xml and (while French is on) sitemap-fr-0.xml, listed in sitemap-index.xml;
      // an empty chunk writes no file
      chunks: {
        en: (item) => (isFrench(item.url) ? undefined : item),
        fr: (item) => (isFrench(item.url) ? item : undefined),
      },
    }),
    icon(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
