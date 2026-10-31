import type { APIRoute } from 'astro';

import config from '@/config/site.config.json';

// robots.txt built from the site URL (site.config.json → baseURL), so the
// sitemap link always matches the deployed domain. Thank-you pages aren't
// disallowed here: they carry `noindex`, which crawlers must be able to read.
// While baseURL is the placeholder domain (https://ccrdi.example, brief/gaps.md),
// everything is disallowed, so a preview deploy can't be indexed.
export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL(config.baseURL);
  const placeholder = base.hostname.endsWith('.example');
  const body = [
    'User-agent: *',
    placeholder ? 'Disallow: /' : 'Allow: /',
    '',
    `Sitemap: ${new URL('sitemap-index.xml', base).href}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
