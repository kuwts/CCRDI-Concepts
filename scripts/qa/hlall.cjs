// every hairline on a page: where it is, its colour, the backgrounds on each side and the contrast against each
const { createRequire } = require('module');
const [, , projectDir, base] = process.argv;
const { chromium } = createRequire(projectDir + '/package.json')('playwright');
const pages = ['/', '/about', '/our-brands', '/our-brands/consumer-choice-award', '/our-brands/consumer-choice-marketing', '/our-brands/ccrdi', '/40-years', '/for-businesses', '/media', '/contact', '/thank-you/contact', '/privacy', '/accessibility', '/404'];
(async () => { const b = await chromium.launch();
  for (const w of [1440, 390]) { const p = await b.newPage({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    for (const path of pages) { await p.goto(base + path, { waitUntil: 'networkidle' });
      const found = await p.evaluate(() => {
        const out = [];
        document.querySelectorAll('.hairline-top, .hairline-bottom, [data-hero] .bg-hairline-dark').forEach((el) => {
          const pseudo = el.classList.contains('hairline-top') ? '::before' : el.classList.contains('hairline-bottom') ? '::after' : null;
          const cs = pseudo ? getComputedStyle(el, pseudo) : getComputedStyle(el);
          const r = el.getBoundingClientRect();
          const y = pseudo === '::before' ? r.top : r.bottom - 1;
          out.push({ cls: (el.className.baseVal ?? el.className).split(' ').filter((c) => c.startsWith('hairline') || c.startsWith('bg-')).join(' '), y: Math.round(y + scrollY), color: cs.backgroundColor, width: cs.width });
        });
        return out;
      });
      for (const f of found) {
        await p.evaluate((y) => window.scrollTo(0, y - 400), f.y); await p.waitForTimeout(150);
        const vy = await p.evaluate((y) => y - scrollY, f.y);
        const shot = await p.screenshot({ clip: { x: Math.round(w / 2) - 40, y: Math.max(0, vy - 3), width: 1, height: 7 } });
        const rows = await p.evaluate(async (b64) => { const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
          const c = document.createElement('canvas'); c.width = 1; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0);
          const d = x.getImageData(0, 0, 1, c.height).data; const o = []; for (let i = 0; i < d.length; i += 4) o.push([d[i], d[i + 1], d[i + 2]]); return o; }, shot.toString('base64'));
        const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
        const L = ([r, g, bb]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(bb);
        const cr = (a, c) => { const x = L(a), y = L(c); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
        const m = f.color.match(/\d+/g).map(Number); const line = [m[0], m[1], m[2]];
        const above = rows[0], below = rows[rows.length - 1];
        const ok = cr(line, above) >= 3 || cr(line, below) >= 3;
        console.log(`${cr(line, above) >= 3 && cr(line, below) >= 3 ? 'ok  ' : 'part'} ${w} ${path.padEnd(38)} ${f.cls.padEnd(36)} line rgb(${line}) vs above ${cr(line, above).toFixed(2)} below ${cr(line, below).toFixed(2)}  rows ${rows.map((r) => r.join(',')).join(' | ')}`);
      }
    }
    await p.close(); }
  await b.close(); })();
