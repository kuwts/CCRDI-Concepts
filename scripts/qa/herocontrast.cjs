// usage: node herocontrast.cjs <projectDir> <url> [video]
// Worst-case contrast of every piece of hero text over the hero imagery + overlay: the
// text is hidden, the background photographed, and each text line's colour compared
// with the brightest pixel behind it. Video: the check runs on frames across the loop.
// Also: the gold button border (3:1, non-text) and the gold hairline at the hero edge.
const { createRequire } = require('module');
const [, , projectDir, url, mode] = process.argv;
const { chromium } = createRequire(projectDir + '/package.json')('playwright');
(async () => {
  const browser = await chromium.launch();
  for (const w of [1440, 1024, 768, 390]) {
    const page = await browser.newPage({ viewport: { width: w, height: 1000 }, reducedMotion: 'no-preference' });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.querySelectorAll('.has-anim').forEach((e) => e.classList.add('is-visible')));
    await page.waitForTimeout(1200);
    // text boxes: one per rendered line of each text node, with its colour
    const boxes = await page.evaluate(() => {
      const hero = document.querySelector('[data-hero]');
      const hb = hero.getBoundingClientRect();
      const out = [];
      const walker = document.createTreeWalker(hero.querySelector('.container'), NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walker.nextNode())) {
        if (!n.textContent.trim()) continue;
        const el = n.parentElement; const cs = getComputedStyle(el);
        if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
        { let a = el, hid = false; while (a && a !== hero) { const s2 = getComputedStyle(a); if (+s2.opacity === 0 || s2.visibility === 'hidden' || s2.clipPath.includes('inset(50%)')) hid = true; a = a.parentElement; } if (hid) continue; }
        const r = document.createRange(); r.selectNodeContents(n);
        for (const rect of r.getClientRects()) {
          if (rect.width < 2) continue;
          out.push({ label: n.textContent.trim().slice(0, 28), color: cs.color, x: rect.left - hb.left, y: rect.top - hb.top + window.scrollY - (hb.top + window.scrollY - hb.top), w: rect.width, h: rect.height });
        }
      }
      // gold button borders (non-text)
      hero.querySelectorAll('.btn').forEach((b) => { const rc = b.getBoundingClientRect(); out.push({ label: 'button border', color: 'rgb(212, 168, 67)', x: rc.left - hb.left - 2, y: rc.top - hb.top - 2, w: rc.width + 4, h: 3, border: true }); });
      return { boxes: out, hero: { x: hb.left, y: hb.top + window.scrollY, w: hb.width, h: hb.height } };
    });
    // hide the text, keep imagery and overlay
    await page.addStyleTag({ content: '[data-hero] .container, [data-hero] [data-pause-toggle] { visibility: hidden !important; }' });
    const times = mode === 'video' ? [0, 3, 6, 9, 12, 15, 18, 21] : [null];
    const worst = {};
    for (const t of times) {
      if (t !== null) {
        await page.evaluate(async (t) => {
          const v = document.querySelector('[data-hero-video]');
          if (v.readyState < 2) { v.preload = 'auto'; v.load(); await new Promise((r) => v.addEventListener('loadeddata', r, { once: true })); }
          v.pause(); v.currentTime = t; await new Promise((r) => v.addEventListener('seeked', r, { once: true }));
        }, t);
        await page.waitForTimeout(300);
      }
      const shot = await page.screenshot({ clip: { x: boxes.hero.x, y: boxes.hero.y, width: boxes.hero.w, height: boxes.hero.h } });
      const res = await page.evaluate(async ({ b64, list }) => {
        const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
        const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
        const ctx = c.getContext('2d'); ctx.drawImage(img, 0, 0);
        const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
        const L = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
        const parse = (s) => { const m = s.match(/[\d.]+/g).map(Number); return { r: m[0], g: m[1], b: m[2], a: m.length > 3 ? m[3] : 1 }; };
        return list.map((bx) => {
          const col = parse(bx.color);
          const x0 = Math.max(0, Math.floor(bx.x)), y0 = Math.max(0, Math.floor(bx.y));
          const ww = Math.min(c.width - x0, Math.ceil(bx.w)), hh = Math.min(c.height - y0, Math.ceil(bx.h));
          if (ww <= 0 || hh <= 0) return { label: bx.label, min: null };
          const d = ctx.getImageData(x0, y0, ww, hh).data;
          let min = Infinity;
          for (let i = 0; i < d.length; i += 4) {
            const r = d[i], g = d[i + 1], b = d[i + 2];
            const tr = col.a * col.r + (1 - col.a) * r, tg = col.a * col.g + (1 - col.a) * g, tb = col.a * col.b + (1 - col.a) * b;
            const l1 = L(tr, tg, tb), l2 = L(r, g, b);
            const cr = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
            if (cr < min) min = cr;
          }
          return { label: bx.label, min, border: !!bx.border };
        });
      }, { b64: shot.toString('base64'), list: boxes.boxes });
      for (const r of res) { const k = r.label; if (r.min !== null && (!(k in worst) || r.min < worst[k].min)) worst[k] = { ...r, t }; }
    }
    // hairline at the hero's bottom edge vs the pixels on each side of it
    const hair = await page.evaluate(() => {
      const line = document.querySelector('[data-hero] .bg-hairline-dark');
      return line ? getComputedStyle(line).backgroundColor : null;
    });
    console.log(`\n== ${w}px ${mode || 'photo'}  (worst case per text line; target 4.5, button border 3)`);
    const rows = Object.values(worst).sort((a, b) => a.min - b.min);
    rows.forEach((r) => console.log(`${r.min >= (r.border ? 3 : 4.5) ? 'ok  ' : 'FAIL'} ${r.min.toFixed(2).padStart(6)}  ${r.label}${r.t !== null && r.t !== undefined ? '  (frame ' + r.t + 's)' : ''}`));
    console.log(`hairline colour: ${hair}`);
    await page.close();
  }
  await browser.close();
})();
