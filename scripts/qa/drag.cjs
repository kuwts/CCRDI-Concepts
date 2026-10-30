const { createRequire } = require('module');
const [, , projectDir, base] = process.argv;
const { chromium } = createRequire(projectDir + '/package.json')('playwright');
const pages = ['/', '/40-years', '/our-brands/consumer-choice-award', '/our-brands/consumer-choice-marketing', '/our-brands/ccrdi'];
let fails = 0, total = 0; const ok = (c, m) => { total++; if (!c) { fails++; console.log('FAIL', m); } };
(async () => { const b = await chromium.launch();
  for (const w of [1440, 390]) for (const touch of [false, true]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, hasTouch: touch, isMobile: touch && w < 500 });
    for (const path of pages) {
      const tag = `${w} ${touch ? 'touch' : 'mouse'} ${path}`;
      const p = await ctx.newPage(); await p.goto(base + path, { waitUntil: 'networkidle' });
      const root = p.locator('.portfolio-carousel-fluid').first(); await root.scrollIntoViewIfNeeded(); await p.waitForTimeout(700);
      const idx = () => root.evaluate((r) => Number(r.querySelector('[data-active]').textContent));
      const settled = () => root.evaluate((r) => { const t = getComputedStyle(r.querySelector('.swiper-wrapper')).transitionDuration; return t; });
      const box = await root.locator('.swiper').boundingBox();
      const cy = box.y + box.height * 0.45, cx = box.x + box.width / 2;
      const cdp = touch ? await ctx.newCDPSession(p) : null;
      const drag = async (dx, steps) => {
        if (touch) {
          await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: cx, y: cy }] });
          for (let i = 1; i <= steps; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: cx + (dx * i) / steps, y: cy }] });
          await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
        } else {
          await p.mouse.move(cx, cy); await p.mouse.down();
          for (let i = 1; i <= steps; i++) await p.mouse.move(cx + (dx * i) / steps, cy);
          await p.mouse.up();
        }
        await p.waitForTimeout(1100);
      };
      const n = 3; const url0 = p.url();
      let a = await idx();
      await drag(-box.width * 0.35, 12); let c = await idx();
      ok(c === (a % n) + 1, `${tag}: normal drag left moves one slide (${a} → ${c})`);
      a = c; await drag(-box.width * 1.6, 4); c = await idx();
      ok(c === (a % n) + 1, `${tag}: long fast fling moves one slide (${a} → ${c})`);
      a = c; await drag(box.width * 0.35, 12); c = await idx();
      ok(c === ((a + n - 2) % n) + 1, `${tag}: drag right moves back one (${a} → ${c})`);
      ok(p.url() === url0, `${tag}: dragging didn't open a link (${p.url()})`);
      // settles: after the transition, the active slide is centred
      const off = await root.evaluate((r) => { const s = r.querySelector('.swiper-slide-active').getBoundingClientRect(); const sw = r.querySelector('.swiper').getBoundingClientRect(); return Math.round(Math.abs((s.left + s.width / 2) - (sw.left + sw.width / 2))); });
      ok(off <= 2, `${tag}: settles centred (${off}px off)`);
      // a plain click / tap still opens the card's link
      const href = await root.evaluate((r) => r.querySelector('.swiper-slide-active a').getAttribute('href'));
      if (touch) await p.touchscreen.tap(cx, cy); else await p.mouse.click(cx, cy);
      await p.waitForURL((u) => u.pathname === href, { timeout: 4000 }).catch(() => {});
      ok(new URL(p.url()).pathname === href, `${tag}: a click opens the card (${href} vs ${new URL(p.url()).pathname})`);
      await p.close();
    }
    await ctx.close();
  }
  console.log(`${total} checks, ${fails} failures`); await b.close(); })();
