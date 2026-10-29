import config from '@/config/site.config.json';

/** Formats a date as `7 Dec 2021` in the site locale (site.config.json → locale.format). */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat(config.locale.format, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
