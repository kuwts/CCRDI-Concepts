import { getCollection } from 'astro:content';

/** Published blog posts, newest first. */
export async function getPosts() {
  const posts = await getCollection(
    'blog',
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Portfolio projects ordered by `order`. */
export async function getProjects() {
  const projects = await getCollection(
    'portfolio',
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return projects.sort((a, b) => a.data.order - b.data.order);
}

/** Published jobs, excluding drafts. */
export async function getJobs() {
  const jobs = await getCollection(
    'jobs',
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return jobs;
}

/** Featured projects ordered for the home carousel. */
export async function getFeaturedProjects() {
  const projects = await getProjects();
  return projects
    .filter((p) => p.data.featured)
    .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}
