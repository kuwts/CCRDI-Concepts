import { z } from 'astro/zod';

/** A label + href pair used by buttons and links across the templates. */
export const linkSchema = z.object({
  label: z.string(),
  href: z.string().default('#'),
  target: z.string().optional(),
});
export type Link = z.infer<typeof linkSchema>;

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
