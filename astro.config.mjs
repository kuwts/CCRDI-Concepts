// @ts-check
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
/** @returns {import('astro').AstroIntegration} */
const devPages = () => ({
  name: 'dev-only-pages',
  hooks: {
    'astro:config:setup': ({ command, injectRoute }) => {
      if (command !== 'dev') return;
      for (const [pattern, entrypoint] of devOnlyPages) injectRoute({ pattern, entrypoint });
    },
  },
});

// kept out of the XML sitemap (noindex pages that are built: the form thank-you pages and the
// French 404, which is a normal page at /fr/404)
const noIndexPaths = ['/thank-you/', '/fr/merci/', '/fr/404'];

// English at the root, French under /fr (src/i18n). Each sitemap URL lists its other-language
// version (the pairs in src/i18n/routes.json, whose slugs differ between languages).
/** @param {string} path */
const clean = (path) => path.replace(/(.)\/$/, '$1') || '/';
/** @param {string} url */
const isFrench = (url) => /^\/fr(\/|$)/.test(new URL(url).pathname);
const { languages } = config.i18n;
/** @param {string} url */
const sitemapLinks = (url) => {
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
  // English pages at the root, French under /fr (fr-CA); no redirect by browser language
  i18n: {
    locales: ['en', { path: 'fr', codes: ['fr-CA', 'fr'] }],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  integrations: [
    mdx(),
    devPages(),
    // noindex pages stay out of the sitemap (the form thank-you pages)
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return !noIndexPaths.some((p) => path === p || path.startsWith(p));
      },
      serialize: (item) => ({ ...item, links: sitemapLinks(item.url) }),
      // sitemap-en-0.xml and sitemap-fr-0.xml, both listed in sitemap-index.xml
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
