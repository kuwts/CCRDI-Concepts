import type { APIRoute } from 'astro';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

import config from '@/config/site.config.json';

// /favicon.ico for browsers, feed readers and other tools that request it
// directly. Built at build time from site.config.json → brand.favicon.ico:
// `source` (a square PNG in public/, defaulting to the 512 / 32 icons) is
// resized to each of `sizes` and packed into one ICO file holding PNG images.
export const GET: APIRoute = async () => {
  const { favicon } = config.brand;
  const source = favicon.ico?.source || favicon.icon512 || favicon.png32;
  const sizes = (favicon.ico?.sizes?.length ? favicon.ico.sizes : [16, 32, 48]).filter(
    (size) => size > 0 && size <= 256,
  );

  if (!source) {
    throw new Error('favicon.ico: set brand.favicon.ico.source (or icon512 / png32) in site.config.json');
  }

  // public/ paths are relative to the project root, where `astro build` runs
  const input = await readFile(path.join(process.cwd(), 'public', source));
  const images = await Promise.all(
    sizes.map((size) =>
      sharp(input).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer(),
    ),
  );

  return new Response(new Uint8Array(toIco(images, sizes)), {
    headers: { 'Content-Type': 'image/x-icon' },
  });
};

/** ICO container: 6-byte header, a 16-byte directory entry per image, then the PNG data. */
function toIco(pngs: Buffer[], sizes: number[]): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngs.length, 4);

  let offset = 6 + 16 * pngs.length;
  const entries = pngs.map((png, i) => {
    const entry = Buffer.alloc(16);
    const size = sizes[i] === 256 ? 0 : sizes[i]; // 0 means 256
    entry.writeUInt8(size, 0); // width
    entry.writeUInt8(size, 1); // height
    entry.writeUInt8(0, 2); // palette colors
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // image offset
    offset += png.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...pngs]);
}
