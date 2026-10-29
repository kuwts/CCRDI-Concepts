import { z } from 'astro/zod';

/** A label + href pair used by buttons and links across the templates. */
export const linkSchema = z.object({
  label: z.string(),
  href: z.string().default('#'),
  target: z.string().optional(),
});
export type Link = z.infer<typeof linkSchema>;

/** A form field's visible label and placeholder (either can be empty). */
export const fieldSchema = z.object({
  label: z.string(),
  placeholder: z.string().default(''),
});
export type Field = z.infer<typeof fieldSchema>;

/** A small section subtitle + heading pair. */
export const sectionHeadingSchema = z.object({
  subtitle: z.string().optional(),
  title: z.string(),
  total_rating: z.string().optional(),
  total_reviews: z.string().optional(),
  top_companies: z.array(
    z.object({
      name: z.string(),
      logo: z.string(),
    })
  ).optional(),
});
export type SectionHeading = z.infer<typeof sectionHeadingSchema>;

/**
 * Optional per-page SEO overrides. Anything left out falls back to the page's
 * own title / description / image, then to `seo` in site.config.json.
 * `image` is a social share image path (src/assets or public), ideally 1200×630.
 */
export const seoSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
  })
  .optional();
export type Seo = z.infer<typeof seoSchema>;
