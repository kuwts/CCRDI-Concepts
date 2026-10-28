import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

import {
  linkSchema,
  sectionHeadingSchema,
} from '@/types/shared';

const singleton = (folder: string) =>
  glob({ pattern: 'index.mdx', base: `./src/content/${folder}` });

/* ── Home page ─────────────────────────────────────────────────────── */
export const homepage = defineCollection({
  loader: singleton('homepage'),
  schema: z.object({
    banner: z.object({
      subtitle: z.string(),
      title: z.string(),
      lead: z.string(),
      primary_cta: linkSchema,
      secondary_cta: linkSchema,
      image: z.string(),
      video: z.string(),
      social_proof: z.object({
        label: z.string(),
        avatars: z.array(
          z.object({
            image: z.string(),
            name: z.string(),
            role: z.string(),
            social: z.object({ icon: z.string(), url: z.string() }),
          }),
        ),
      }),
    }),
    intro: z.object({
      section_title: z.string(),
      title: z.string(),
      description: z.string(),
      info: z.array(z.string())
    }),
    projects: sectionHeadingSchema,
    process: sectionHeadingSchema.extend({
      steps: z.array(z.object({heading: z.string(), text: z.string() })),
      cta: z.object({
        title: z.string(),
        images: z.array(z.string()),
        button: linkSchema
      }),
    }),
    testimonials: sectionHeadingSchema,
    clients: sectionHeadingSchema,
    blog: sectionHeadingSchema,
  }),
});

/* ── About page ────────────────────────────────────────────────────── */
export const about = defineCollection({
  loader: singleton('about'),
  schema: z.object({
    header: z.object({ subtitle: z.string(), title: z.string(), image: z.string() }),
    clients: z.object({ subtitle: z.string() }),
    facts: z.object({
      image: z.string(),
      title: z.string(),

      hero: z.object({
        label: z.string(),
        value: z.string(),
        description: z.string(),
      }),

      philosophy: z.object({
        label: z.string(),
        title: z.string(),
        description: z.string(),
      }),

      impact: z.object({
        label: z.string(),
        value: z.string(),
        description: z.string(),
      }),

      stats: z.array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      ),
    }),
    team_group: z.object({ images: z.array(z.string()) }),
    team: sectionHeadingSchema.extend({ cta: linkSchema }),
  }),
});

/* ── Services page ─────────────────────────────────────────────────── */
export const services = defineCollection({
  loader: singleton('services'),
  schema: z.object({
    header: z.object({ subtitle: z.string(), title: z.string() }),
    items: z.array(
      z.object({
        title: z.string(),
        image: z.string(),
        icon: z.string(),
        info: z.string(),
        color: z.string(),
        sub_services: z.array(z.string()),
        meta: z.string(),
      })
    ),
  }),
});

/* ── Team page ─────────────────────────────────────────────────────── */
export const team = defineCollection({
  loader: singleton('team'),
  schema: z.object({
    header: z.object({ subtitle: z.string(), title: z.string() }),
    cta: linkSchema,
    open_positions: sectionHeadingSchema,
  }),
});

/* ── Jobs (dynamic collection) ─────────────────────────────────────── */
export const jobs = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/jobs' }),
  schema: z.object({
    title: z.string(),
    location: z.string(),
    category: z.string(),
    meta: z.string(),
    apply_label: z.string(),
    apply_title: z.string(),
    draft: z.boolean().default(false),
  }),
});

/* ── Pricing page ──────────────────────────────────────────────────── */
export const pricing = defineCollection({
  loader: singleton('pricing'),
  schema: z.object({
    header: z.object({ subtitle: z.string(), title: z.string() }),
    plans: z.array(
      z.object({
        name: z.string(),
        price: z.string(),
        cadence: z.string(),
        priceAnnual: z.string(),
        cadenceAnnual: z.string(),
        description: z.string(),
        feature_title: z.string(),
        features: z.array(z.string()),
        featured: z.boolean().default(false),
        cta: linkSchema,
      }),
    ),
    faq: sectionHeadingSchema,
  }),
});

/* ── FAQ (shared between /faq and /pricing) ────────────────────────── */
export const faq = defineCollection({
  loader: singleton('faq'),
  schema: z.object({
    header: z.object({ subtitle: z.string(), title: z.string() }),
    groups: z.array(
      z.object({
        title: z.string(),
        // `answer` holds rendered HTML so rich answers keep lists/links.
        items: z.array(z.object({ question: z.string(), answer: z.string() })),
      }),
    ),
  }),
});

/* ── Contact page ──────────────────────────────────────────────────── */
export const contact = defineCollection({
  loader: singleton('contact'),
  schema: z.object({
    header: z.object({ subtitle: z.string(), title: z.string() }),
    intro: z.object({ title: z.string(), text: z.string() }),
    email: z.object({ label: z.string(), value: z.string() }),
    phone: z.object({ label: z.string(), value: z.string() }),
    address: z.object({ label: z.string(), lines: z.array(z.string()) }),
    form: z.object({
      project_types: z.array(z.string()),
      budgets: z.array(z.string()),
    }),
  }),
});



/* ── Generic long-form pages (privacy, …) ──────────────────────────── */
export const pages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    subtitle: z.string().optional(),
    heading: z.string(),
    cta: linkSchema.optional(),
    cta_note: z.string().optional(),
    cta_heading: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

/* ── Portfolio projects ────────────────────────────────────────────── */
export const portfolio = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/portfolio' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    color: z.string(),
    image: z.string(),
    carouselImage: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    // detail
    client: z.object({
      name: z.string(),
      description: z.string(),
      website: z.string().optional(),
    }),
    otherInfo: z.array(z.object({
      title: z.string(),
      content: z.string(),
    })),
    services: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

/* ── Blog posts ────────────────────────────────────────────────────── */
export const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    date: z.coerce.date(),
    thumbnail: z.string().optional(),
    image: z.string().optional(),
    color: z.string().default('#0a11a8'),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

/* ── Shared data collections ───────────────────────────────────────── */
export const testimonials = defineCollection({
  loader: file('./src/content/data/testimonials.json'),
  schema: z.object({
    id: z.number(),
    review: z.string(),
    author: z.string(),
    role: z.string().optional(),
    company: z.string().optional(),
    rating: z.number().min(1).max(5).default(5),
    date: z.string().optional(),
    social: z.string().optional(),
    media: z.string().optional(),
  }),
});

export const clients = defineCollection({
  loader: file('./src/content/data/clients.json'),
  schema: z.object({
    id: z.number(),
    name: z.string(),
    logo: z.string(),
  }),
});

export const clientsDark = defineCollection({
  loader: file('./src/content/data/clients-dark.json'),
  schema: z.object({
    id: z.number(),
    name: z.string(),
    logo: z.string(),
  }),
});

export const teamMembers = defineCollection({
  loader: file('./src/content/data/team.json'),
  schema: z.object({
    id: z.number(),
    name: z.string(),
    role: z.string(),
    image: z.string(),
  }),
});
