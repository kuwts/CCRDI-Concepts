// GitHub Pages serves a project site under /<repo>/, but the site is written for the root
// (every internal link, image and asset path starts with "/"). After the preview build, this
// prefixes those root paths in dist with the base path, and marks every page noindex, as the
// preview is for review only. The source pages are unchanged, so `npm run build` is unaffected.
// Usage: node scripts/deploy/pages-base.mjs /CCRDI-Concepts [dist]
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const base = (process.argv[2] ?? '').replace(/\/$/, '');
const dist = process.argv[3] ?? 'dist';
if (!base.startsWith('/')) {
  console.error('Usage: node scripts/deploy/pages-base.mjs /<base-path> [dist]');
  process.exit(1);
}
const esc = base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// a root path: "/" not followed by "/" (protocol-relative) or the base path itself
const root = `\\/(?!\\/|${esc.slice(1)}\\/)`;

const attr = new RegExp(`(\\s(?:href|src|action|poster|data-src)=["'])${root}`, 'g');
const srcset = /(\s(?:srcset|imagesrcset)=["'])([^"']*)(["'])/g;
const cssUrl = new RegExp(`(url\\(\\s*["']?)${root}`, 'g');

/** @param {string} dir @returns {AsyncGenerator<string>} */
async function* files(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* files(path);
    else yield path;
  }
}

let count = 0;
for await (const file of files(dist)) {
  const isHtml = file.endsWith('.html');
  if (!isHtml && !file.endsWith('.css') && !file.endsWith('.webmanifest')) continue;
  const before = await readFile(file, 'utf8');
  let after = before.replace(cssUrl, `$1${base}/`);
  if (isHtml) {
    after = after
      .replace(attr, `$1${base}/`)
      .replace(srcset, (_, open, list, close) =>
        open + list.replace(new RegExp(`(^|,\\s*)${root}`, 'g'), `$1${base}/`) + close,
      );
    if (!/<meta name="robots"/.test(after)) after = after.replace('<head>', '<head><meta name="robots" content="noindex">');
  } else if (file.endsWith('.webmanifest')) {
    after = after.replace(new RegExp(`("(?:src|start_url|scope)"\\s*:\\s*")${root}`, 'g'), `$1${base}/`);
  }
  if (after !== before) {
    await writeFile(file, after);
    count++;
  }
}
console.log(`pages-base: ${count} files prefixed with ${base}`);
