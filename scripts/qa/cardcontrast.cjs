// worst-case text contrast on the brand cards (hovered, so the role shows), the Our Brands panels and
// the StackedServices photo cards (every page that has them). Large text (24px+, or 18.66px+ bold)
// passes at 3:1, the rest at 4.5:1.
const { createRequire } = require('module');
const [, , projectDir, base] = process.argv;
const { chromium } = createRequire(projectDir + '/package.json')('playwright');
const measure = async (p, el, hide = 'h3 img, [data-stacked-content] > .relative img') => {
  const boxes = await el.evaluate((root) => { const rb = root.getBoundingClientRect(); const out = [];
    const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d', { willReadFrequently: true });
    const rgba = (c) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return `rgba(${d[0]}, ${d[1]}, ${d[2]}, ${(d[3] / 255).toFixed(3)})`; };
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) { if (!n.textContent.trim()) continue; const e = n.parentElement; if (!e.checkVisibility({ opacityProperty: true })) continue; const cs = getComputedStyle(e); if (+cs.opacity < 0.5) continue;
      const r = document.createRange(); r.selectNodeContents(n); for (const q of r.getClientRects()) if (q.width > 2) out.push({ label: n.textContent.trim().slice(0, 26), large: parseFloat(cs.fontSize) >= 24 || (parseFloat(cs.fontSize) >= 18.66 && +cs.fontWeight >= 700), color: rgba(cs.color), x: q.left - rb.left, y: q.top - rb.top, w: q.width, h: q.height }); }
    return out; });
  await el.evaluate((root, hide) => { root.querySelectorAll('*').forEach((e) => { if ([...e.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim())) e.style.color = 'transparent'; }); if (hide) root.querySelectorAll(hide).forEach((i) => (i.style.opacity = 0)); }, hide);
  await p.waitForTimeout(150);
  const shot = await el.screenshot();
  const res = await p.evaluate(async ({ b64, list }) => { const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode(); const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0);
    const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; const L = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    return list.map((b) => { let m = b.color.match(/[\d.]+/g).map(Number); if (b.color.startsWith('color(srgb')) m = [m[0] * 255, m[1] * 255, m[2] * 255, m[3]]; const a = m[3] ?? 1; const d = x.getImageData(Math.max(0, b.x | 0), Math.max(0, b.y | 0), Math.max(1, Math.ceil(b.w)), Math.max(1, Math.ceil(b.h))).data; let min = 99;
      for (let k = 0; k < d.length; k += 4) { const tr = a * m[0] + (1 - a) * d[k], tg = a * m[1] + (1 - a) * d[k + 1], tb = a * m[2] + (1 - a) * d[k + 2]; const l1 = L(tr, tg, tb), l2 = L(d[k], d[k + 1], d[k + 2]); min = Math.min(min, (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05)); } return [b.label, min, b.large]; }); }, { b64: shot.toString('base64'), list: boxes });
  const worst = {}; for (const [l, v, lg] of res) if (!(l in worst) || v < worst[l][0]) worst[l] = [v, lg];
  return Object.entries(worst).map(([l, [v, lg]]) => [l, v, lg]).sort((a, b) => a[1] - b[1]);
};
(async () => { const b = await chromium.launch();
  for (const w of [1440, 390]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    await p.goto(base + '/', { waitUntil: 'networkidle' });
    const root = p.locator('.portfolio-carousel-fluid').first(); await root.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
    for (let i = 0; i < 3; i++) { const card = root.locator('.swiper-slide-active .group').first(); const name = await card.evaluate((c) => c.querySelector('h3 img').alt);
      await card.hover(); await p.waitForTimeout(1900); const r = await measure(p, card);
      console.log(`${w} card ${name.padEnd(42)} ` + r.map(([l, v, lg]) => `${v >= (lg ? 3 : 4.5) ? '' : 'FAIL '}${l}: ${v.toFixed(2)}`).join(' | '));
      await p.reload({ waitUntil: 'networkidle' }); await root.scrollIntoViewIfNeeded(); for (let k = 0; k <= i; k++) { await root.locator('.pf-next').click(); await p.waitForTimeout(1000); } }
    await p.goto(base + '/our-brands', { waitUntil: 'networkidle' });
    for (let i = 0; i < 3; i++) { const el = p.locator('[data-stacked-content]').nth(i); await el.scrollIntoViewIfNeeded();
      await el.evaluate((e) => { e.closest('[data-stacked-card]').style.position = 'relative'; e.style.transform = ''; e.querySelectorAll('.has-anim').forEach((x) => x.classList.add('is-visible')); }); await p.waitForTimeout(400);
      const r = await measure(p, el); console.log(`${w} panel ${i + 1}: worst ` + r.slice(0, 4).map(([l, v, lg]) => `${v >= (lg ? 3 : 4.5) ? '' : 'FAIL '}${l}: ${v.toFixed(2)}`).join(' | ')); }
    for (const path of ['/', '/for-businesses', '/our-brands/consumer-choice-award', '/our-brands/consumer-choice-marketing', '/our-brands/ccrdi']) {
      await p.goto(base + path, { waitUntil: 'networkidle' });
      const cards = p.locator('[data-stacked-services] article');
      for (let i = 0; i < (await cards.count()); i++) { const el = cards.nth(i); await el.scrollIntoViewIfNeeded();
        await el.evaluate((e) => { const c = e.closest('[data-stacked-card]'); c.style.position = 'relative'; c.style.zIndex = 999; c.querySelector('[data-stacked-content]').style.transform = ''; e.querySelectorAll('.has-anim').forEach((x) => x.classList.add('is-visible')); e.querySelectorAll('img').forEach((x) => (x.loading = 'eager')); }); await p.waitForTimeout(700);
        const r = await measure(p, el, ''); console.log(`${w} ${path} card ${i + 1}: worst ` + r.slice(0, 3).map(([l, v, lg]) => `${v >= (lg ? 3 : 4.5) ? '' : 'FAIL '}${l}${lg ? ' (large)' : ''}: ${v.toFixed(2)}`).join(' | ')); } }
    await p.close(); }
  await b.close(); })();
