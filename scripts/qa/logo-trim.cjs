// usage: node process.cjs <projectDir> <in> <out> [reverse]
// Trims an image to its visible pixels (alpha > 3), lossless PNG out. With "reverse":
// navy/blue and neutral grey/charcoal pixels become white (alpha kept); gold and red
// pixels are left exactly as they are.
const fs = require('fs');
const { createRequire } = require('module');
const [, , projectDir, input, output, mode] = process.argv;
const { chromium } = createRequire(projectDir + '/package.json')('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage();
  const b64 = fs.readFileSync(input).toString('base64'); const mime = input.endsWith('.png') ? 'image/png' : 'image/webp';
  const res = await p.evaluate(async ({ b64, mime, reverse }) => {
    const img = new Image(); img.src = `data:${mime};base64,${b64}`; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
    const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0);
    const W = c.width, H = c.height; const d = x.getImageData(0, 0, W, H).data;
    let minx = W, miny = H, maxx = -1, maxy = -1;
    for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) if (d[(j * W + i) * 4 + 3] > 3) { if (i < minx) minx = i; if (i > maxx) maxx = i; if (j < miny) miny = j; if (j > maxy) maxy = j; }
    const w = maxx - minx + 1, h = maxy - miny + 1;
    const o = document.createElement('canvas'); o.width = w; o.height = h; const ox = o.getContext('2d');
    const src = x.getImageData(minx, miny, w, h);
    let changed = 0;
    if (reverse) {
      const a = src.data;
      for (let k = 0; k < a.length; k += 4) {
        if (a[k + 3] === 0) continue;
        const r = a[k] / 255, g = a[k + 1] / 255, bl = a[k + 2] / 255;
        const mx = Math.max(r, g, bl), mn = Math.min(r, g, bl), l = (mx + mn) / 2, dd = mx - mn;
        const s = dd === 0 ? 0 : dd / (1 - Math.abs(2 * l - 1));
        let hue = 0;
        if (dd) { hue = mx === r ? ((g - bl) / dd) % 6 : mx === g ? (bl - r) / dd + 2 : (r - g) / dd + 4; hue *= 60; if (hue < 0) hue += 360; }
        const blue = hue >= 170 && hue <= 260, neutral = s < 0.15;
        if (blue || neutral) { a[k] = a[k + 1] = a[k + 2] = 255; changed++; }
      }
    }
    ox.putImageData(src, 0, 0);
    return { from: [W, H], crop: [minx, miny, w, h], changed, png: o.toDataURL('image/png').split(',')[1] };
  }, { b64, mime, reverse: mode === 'reverse' });
  fs.writeFileSync(output, Buffer.from(res.png, 'base64'));
  console.log(`${input.split('/').pop()} ${res.from.join('x')} → ${res.crop[2]}x${res.crop[3]} (crop at ${res.crop[0]},${res.crop[1]})${mode ? `, ${res.changed} pixels recoloured` : ''} → ${output.split('/').pop()} ${fs.statSync(output).size} bytes`);
  await b.close(); })();
