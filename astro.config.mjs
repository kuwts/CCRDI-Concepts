// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

import config from './src/config/site.config.json' with { type: 'json' };

// kept out of the XML sitemap (every one of these pages is also noindex)
const noIndexPaths = [
  '/thank-you/',
  '/style-guide',
  '/blog',
  '/blog-horizontal',
  '/portfolio',
  '/job/',
  '/pricing',
  '/faq',
  '/team',
  '/services',
];

// https://astro.build/config
export default defineConfig({
  site: config.baseURL,
  trailingSlash: config.trailingSlash ? 'always' : 'ignore',
  integrations: [
    mdx(),
    // pages that are noindex stay out of the sitemap: form thank-you pages, the internal
    // Style Guide, and the theme demo pages that aren't in brief/sitemap.md (noindex until
    // the cleanup phase; brief/cleanup-list.md)
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
