// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

import config from './src/config/site.config.json' with { type: 'json' };

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

// kept out of the XML sitemap (noindex pages that are built: the form thank-you pages)
const noIndexPaths = ['/thank-you/'];

// https://astro.build/config
export default defineConfig({
  site: config.baseURL,
  trailingSlash: config.trailingSlash ? 'always' : 'ignore',
  integrations: [
    mdx(),
    devPages(),
    // noindex pages stay out of the sitemap (the form thank-you pages)
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return !noIndexPaths.some((p) => path === p || path.startsWith(p));
      },
    }),
    icon(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
