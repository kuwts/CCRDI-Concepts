import type { APIRoute } from 'astro';

import config from '@/config/site.config.json';

// Web app manifest built from site.config.json → brand (name, colors, and the
// 192 / 512 icons in brand.favicon). Linked from Base.astro.
export const GET: APIRoute = () => {
  const { name, colors, favicon } = config.brand;
  const icons = [
    { src: favicon.icon192, sizes: '192x192', type: 'image/png' },
    { src: favicon.icon512, sizes: '512x512', type: 'image/png' },
  ].filter((icon) => icon.src);

  const manifest = {
    name,
    short_name: name,
    start_url: '/',
    icons,
    theme_color: colors.dark,
    background_color: colors.dark,
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
};
