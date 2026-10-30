import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

// In a production build the theme's demo-only media (the dev pages' blog, portfolio, team,
// client and testimonial assets and the demo showreel; brief/cleanup-list.md) is left out of
// this glob, so Vite doesn't emit it; `astro dev` resolves everything for the dev pages.
const images = import.meta.env.DEV
  ? import.meta.glob<{ default: ImageMetadata }>('/src/assets/**/*.{jpeg,jpg,png,gif,webp,svg}')
  : import.meta.glob<{ default: ImageMetadata }>(['/src/assets/**/*.{jpeg,jpg,png,gif,webp,svg}', '!/src/assets/images/{blogs,portfolio,services,team,team-group,clients,testimonials}/**', '!/src/assets/images/{about-header.jpg,about-stats.jpg,logo.svg}', '!/src/assets/videos/poster.png']);

/**
 * Absolute URL for an image used outside the page body (og:image, twitter:image,
 * JSON-LD logo). Paths resolve like AstroImage: src/assets first (optimized,
 * capped at `maxWidth` and served as JPG), then public/. Full URLs pass through.
 */
export async function absoluteImageURL(
  path: string,
  site: URL,
  maxWidth = 1200,
): Promise<string> {
  if (/^https?:\/\//.test(path)) return path;

  const normalized = path.startsWith('/') ? path : `/${path}`;
  const candidates = [
    `/src/assets${normalized}`,
    `/src/assets/images${normalized}`,
    `/src${normalized}`,
  ];

  for (const candidate of candidates) {
    if (!images[candidate]) continue;
    const meta = (await images[candidate]()).default;
    if (meta.format === 'svg') return new URL(meta.src, site).href;
    const img = await getImage({
      src: meta,
      width: Math.min(meta.width, maxWidth),
      format: 'jpg',
    });
    return new URL(img.src, site).href;
  }

  return new URL(normalized, site).href;
}
