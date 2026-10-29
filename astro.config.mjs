// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

import config from './src/config/site.config.json' with { type: 'json' };

// https://astro.build/config
export default defineConfig({
  site: config.baseURL,
  trailingSlash: config.trailingSlash ? 'always' : 'ignore',
  integrations: [
    mdx(),
    // pages that are noindex stay out of the sitemap: form thank-you pages and
    // the internal Style Guide
    sitemap({ filter: (page) => !page.includes('/thank-you/') && !page.includes('/style-guide') }),
    icon(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
