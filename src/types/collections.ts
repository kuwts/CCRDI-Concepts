import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

import {
  fieldSchema,
  linkSchema,
  sectionHeadingSchema,
  seoSchema,
} from '@/types/shared';

const singleton = (folder: string) =>
  glob({ pattern: 'index.mdx', base: `./src/content/${folder}` });

/* ── Home page ─────────────────────────────────────────────────────── */
export const homepage = defineCollection({
  loader: singleton('homepage'),
  schema: z.object({
    seo: seoSchema,
    banner: z.object({
      subtitle: z.string(),
      title: z.string(),
      lead: z.string(),
      primary_cta: linkSchema,
      secondary_cta: linkSchema,
      image: z.string(),
      // alt text for `image` when it's shown on its own (no video yet)
      image_alt: z.string().default(''),
      // empty = no video yet: the showreel shows `image` as a still
      video: z.string().default(''),
      // other formats of the same video (e.g. an .mp4 for browsers without .webm)
      video_sources: z.array(z.string()).optional(),
      // decorative imagery behind the hero text (alt=""): a photo, or a muted looping
      // video whose poster shows first (and alone with reduced motion)
      background: z
        .object({
          variant: z.enum(['photo', 'video']).default('photo'),
          image: z.string(),
          video: z.string().default(''),
          poster: z.string().default(''),
        })
        .optional(),
      social_proof: z.object({
        label: z.string(),
        avatars: z.array(
          z.object({
            image: z.string(),
            name: z.string(),
            role: z.string(),
            social: z.object({ icon: z.string().optional(), url: z.string() }).optional(),
          }),
        ),
      }),
    }),
    intro: z.object({
      section_title: z.string(),
      title: z.string(),
      description: z.string(),
      info: z.array(z.string()),
      // cards in the stack beside the intro (StackedServices)
      items: z.array(
        z.object({
          icon: z.string(),
          title: z.string(),
          info: z.string(),
          meta: z.string().optional(),
          image: z.string().optional(),
          image_alt: z.string().optional(),
        }),
      ),
    }),
    // carousel slides (PortfolioCarousel)
    projects: sectionHeadingSchema.extend({
      items: z.array(
        z.object({
          title: z.string(),
          category: z.string(),
          color: z.string(),
          // text over the hover colour: dark for light colours (e.g. gold)
          tone: z.enum(['white', 'dark']).optional(),
          // a thin decorative line in the logo's second colour (never text)
          accent: z.string().optional(),
          image: z.string(),
          image_alt: z.string().optional(),
          href: z.string(),
        }),
      ),
    }),
    process: sectionHeadingSchema.extend({
      steps: z.array(z.object({heading: z.string(), text: z.string() })),
      cta: z.object({
        title: z.string(),
        // a plain path is decorative; { src, alt } describes the photo
        images: z.array(z.union([z.string(), z.object({ src: z.string(), alt: z.string().optional() })])),
        button: linkSchema
      }),
    }),
    testimonials: sectionHeadingSchema.extend({
      items: z.array(
        z.object({
          review: z.string(),
          author: z.string(),
          role: z.string().optional(),
          company: z.string().optional(),
          media: z.string().optional(),
        }),
      ),
      // logo wall under the testimonials (Clients)
      logos: z.array(z.object({ name: z.string(), logo: z.string() })),
    }),
    clients: sectionHeadingSchema.optional(),
    blog: sectionHeadingSchema.extend({
      button: linkSchema.optional(),
      // news cards (BlogCard); the first is shown large
      items: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          date: z.string(),
          category: z.string().optional(),
          image: z.string().optional(),
          image_alt: z.string().optional(),
          href: z.string(),
        }),
      ),
    }),
  }),
});

/* ── Shared page blocks ───────────────────────────────────────────── */
// stats / about bento grid (Facts); used by About and Our Brands
const factsSchema = z.object({
  image: z.string(),
  image_alt: z.string().default(''),
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
});

// home intro block + card stack (StackedServices): label, heading, text, pills, cards
const introStackSchema = z.object({
  section_title: z.string(),
  title: z.string(),
  description: z.string().default(''),
  info: z.array(z.string()).default([]),
  items: z.array(
    z.object({
      icon: z.string(),
      title: z.string(),
      info: z.string(),
      meta: z.string().optional(),
      image: z.string().optional(),
      image_alt: z.string().optional(),
    }),
  ),
});

// process cards (WorkProcess) with its link strip
const processSchema = z.object({
  title: z.string(),
  steps: z.array(z.object({ heading: z.string(), text: z.string() })),
  cta: z.object({ title: z.string(), button: linkSchema }),
});

// logo wall: light logos for a dark section (Clients)
const logoWallSchema = z.object({
  subtitle: z.string(),
  logos: z.array(z.object({ name: z.string(), logo: z.string() })).optional(),
});

/* ── About page ────────────────────────────────────────────────────── */
export const about = defineCollection({
  loader: singleton('about'),
  schema: z.object({
    seo: seoSchema,
    header: z.object({
      subtitle: z.string(),
      title: z.string(),
      image: z.string(),
      image_alt: z.string().default(''),
    }),
    clients: logoWallSchema,
    facts: factsSchema,
    // plain paths are decorative; use { src, alt } to describe a photo
    team_group: z.object({
      images: z.array(z.union([z.string(), z.object({ src: z.string(), alt: z.string().optional() })])),
    }),
    team: sectionHeadingSchema.extend({
      cta: linkSchema,
      // team cards on this page (TeamGrid); falls back to the shared team list
      members: z.array(z.object({ name: z.string(), role: z.string(), image: z.string() })).optional(),
    }),
  }),
});

/* ── Our Brands page ───────────────────────────────────────────────── */
// built on the Services page layout: logo wall, bento grid, colour card deck
export const brands = defineCollection({
  loader: singleton('brands'),
  schema: z.object({
    seo: seoSchema,
    header: z.object({ subtitle: z.string().default(''), title: z.string() }),
    clients: logoWallSchema,
    facts: factsSchema,
    items: z.array(
      z.object({
        title: z.string(),
        tagline: z.string(),
        image: z.string(),
        image_alt: z.string().default(''),
        // an icon-set name (e.g. lucide:award) or an image path
        icon: z.string(),
        info: z.array(z.string()),
        // card background: a colour token, e.g. var(--color-award)
        color: z.string(),
        // text on the card: white (default) or dark for light colours
        tone: z.enum(['white', 'dark']).default('white'),
        // a thin decorative line in the logo's second colour (never text)
        accent: z.string().optional(),
        sub_services: z.array(z.string()),
        meta: z.array(z.string()),
        link: linkSchema,
      }),
    ),
  }),
});

/* ── 40 Years page ─────────────────────────────────────────────────── */
// built on the case-study (Portfolio detail) layout: header, feature image, sidebar + MDX body,
// closing row of cards
export const anniversary = defineCollection({
  loader: singleton('anniversary'),
  schema: z.object({
    seo: seoSchema,
    eyebrow: z.string(),
    title: z.string(),
    // poster frame (also the share image); with `video`, the feature plays it muted and looping
    image: z.string(),
    image_alt: z.string().default(''),
    video: z.string().default(''),
    sidebar: z.object({
      name: z.string(),
      description: z.string(),
      link: linkSchema.optional(),
    }),
    // confirmed facts only (sources in brief/gaps.md)
    milestones: z.array(z.object({ title: z.string(), content: z.string() })),
    family: z.object({ title: z.string(), items: z.array(z.string()) }),
    next: z.object({
      title: z.string(),
      items: z.array(
        z.object({
          title: z.string(),
          category: z.string(),
          color: z.string(),
          tone: z.enum(['white', 'dark']).default('white'),
          // a thin decorative line in the logo's second colour (never text)
          accent: z.string().optional(),
          image: z.string(),
          image_alt: z.string().default(''),
          href: z.string(),
        }),
      ),
    }),
  }),
});

/* ── For Businesses page ──────────────────────────────────────────── */
export const businesses = defineCollection({
  loader: singleton('businesses'),
  schema: z.object({
    seo: seoSchema,
    title: z.string(),
    intro: introStackSchema.optional(),
    // show the homepage testimonial placeholders at the end
    testimonials: z.boolean().default(false),
    // audiences (WorkProcess) with its contact strip
    audiences: z.object({
      title: z.string(),
      steps: z.array(z.object({ heading: z.string(), text: z.string() })),
      cta: z.object({ title: z.string(), button: linkSchema }),
    }),
    // brand cards (BlogCard plain items)
    brands: z.object({
      title: z.string(),
      items: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          category: z.string().optional(),
          image: z.string().optional(),
          image_alt: z.string().optional(),
          href: z.string(),
        }),
      ),
    }),
  }),
});

/* ── Brand pages (/our-brands/[slug]) ───────────────────────────────── */
// the case-study (Portfolio detail) layout, like 40 Years; one MDX file per brand
export const brandPages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/brand-pages' }),
  schema: z.object({
    seo: seoSchema,
    order: z.number().default(0),
    eyebrow: z.string(),
    title: z.string(),
    // the division's mark colour (a token) for small marks on white: list markers, link underline
    accent: z.string(),
    // its mark on navy (the rule under the H1); defaults to `accent`
    accent_on_dark: z.string().optional(),
    image: z.string(),
    image_alt: z.string().default(''),
    sidebar: z.object({
      name: z.string(),
      description: z.string(),
      // the brand's list (shown under the description)
      list: z.array(z.string()).default([]),
      link: linkSchema,
    }),
    // role + core message, and confirmed public facts (sources in brief/gaps.md)
    facts: z.array(z.object({ title: z.string(), content: z.string() })),
    // the brand's logo at the top of the sidebar, when a real one exists
    logo: z.object({ src: z.string(), alt: z.string() }).optional(),
    // extra sections after the body, each optional
    process: processSchema.optional(),
    stack: introStackSchema.optional(),
    testimonials: z.boolean().default(false),
    next_title: z.string(),
  }),
});

/* ── Services page ─────────────────────────────────────────────────── */
export const services = defineCollection({
  loader: singleton('services'),
  schema: z.object({
    seo: seoSchema,
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
    seo: seoSchema,
    header: z.object({ subtitle: z.string(), title: z.string() }),
    cta: linkSchema,
    open_positions: sectionHeadingSchema,
    // shown when there are no open jobs (the section is hidden if left empty)
    no_positions: z.string().optional(),
    // labels and messages for the application form on every job page
    application_form: z.object({
      fields: z.object({
        cv: fieldSchema,
        name: fieldSchema,
        email: fieldSchema,
        phone: fieldSchema,
        company: fieldSchema,
        cover_letter: fieldSchema,
      }),
      submit_label: z.string(),
      sending_label: z.string(),
      error_message: z.string(),
      file_too_large: z.string(),
    }),
  }),
});

/* ── Jobs (dynamic collection) ─────────────────────────────────────── */
export const jobs = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/jobs' }),
  schema: z.object({
    seo: seoSchema,
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
    seo: seoSchema,
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
    seo: seoSchema,
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
    seo: seoSchema,
    header: z.object({ subtitle: z.string(), title: z.string() }),
    intro: z.object({ title: z.string(), text: z.string() }),
    // an empty label shows the value on its own
    email: z.object({ label: z.string().default(''), value: z.string() }),
    phone: z.object({ label: z.string().default(''), value: z.string() }),
    address: z.object({ label: z.string().default(''), lines: z.array(z.string()) }),
    form: z.object({
      // optional fields are only shown when set
      fields: z.object({
        name: fieldSchema,
        email: fieldSchema,
        phone: fieldSchema.optional(),
        company: fieldSchema.optional(),
        project_type: fieldSchema.optional(),
        budget: fieldSchema.optional(),
        message: fieldSchema,
      }),
      project_types: z.array(z.string()).default([]),
      budgets: z.array(z.string()).default([]),
      submit_label: z.string(),
      sending_label: z.string(),
      error_message: z.string(),
    }),
  }),
});



/* ── Generic long-form pages (privacy, …) ──────────────────────────── */
export const pages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/pages' }),
  schema: z.object({
    seo: seoSchema,
    title: z.string(),
    description: z.string().optional(),
    subtitle: z.string().optional(),
    heading: z.string(),
    cta: linkSchema.optional(),
    cta_note: z.string().optional(),
    cta_heading: z.string().optional(),
    // show the homepage news cards under the body (Media & Partners)
    news: z.boolean().default(false),
    // a logo wall under the header (Media & Partners): the Our Brands logos
    brand_logos: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

/* ── Form thank-you pages (/thank-you/[slug], one per form) ────────── */
export const thankYou = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/thank-you' }),
  schema: z.object({
    seo: seoSchema,
    title: z.string(),
    subtitle: z.string(),
    heading: z.string(),
    cta: linkSchema,
  }),
});

/* ── Portfolio projects ────────────────────────────────────────────── */
export const portfolio = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/portfolio' }),
  schema: z.object({
    seo: seoSchema,
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
    seo: seoSchema,
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

/* ── Listing page headers (blog, portfolio) ────────────────────────── */
export const listings = defineCollection({
  loader: file('./src/content/data/listings.json'),
  schema: z.object({
    id: z.string(),
    subtitle: z.string(),
    title: z.string(),
    // accessible name for the "+" load-more button
    load_more_label: z.string(),
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
