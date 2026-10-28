// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import config from './src/config/site.config.json' with { type: 'json' };

// https://astro.build/config
export default defineConfig({
  site: config.baseURL,
  trailingSlash: config.trailingSlash ? 'always' : 'ignore',
  integrations: [
    mdx(), sitemap(), icon(), react()
  ],

  fonts: [
    {
      name: 'Space Grotesk',
      cssVariable: '--font-space-grotesk',
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
