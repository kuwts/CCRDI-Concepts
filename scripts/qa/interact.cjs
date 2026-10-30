// usage: node interact.cjs <projectDir> <baseUrl>
// Real-browser (Chromium) interaction tests on every CCC page, at 1440 and 390, with
// motion allowed and with prefers-reduced-motion: reduce.
const { createRequire } = require('module');
const [, , projectDir, base] = process.argv;
const { chromium } = createRequire(projectDir + '/package.json')('playwright');
const pages = process.env.PAGES ? process.env.PAGES.split(',') : ['/', '/about', '/our-brands', '/our-brands/consumer-choice-award', '/our-brands/consumer-choice-marketing',
  '/our-brands/ccrdi', '/40-years', '/for-businesses', '/media', '/contact', '/thank-you/contact', '/privacy', '/accessibility', '/404'];
const results = [];
const log = (ok, ctx, msg) => { results.push({ ok, ctx, msg }); if (!ok) console.log(`FAIL ${ctx}: ${msg}`); };
const wait = (p, ms) => p.waitForTimeout(ms);

async function scrollThrough(page) {
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 500) { await page.evaluate((y) => window.scrollTo(0, y), y); await wait(page, 60); }
  await page.evaluate(() => window.scrollTo(0, 0)); await wait(page, 300);
}

async function testNav(page, ctx, w, path) {
  // skip link: first Tab stop, visible, moves focus to <main>
  await page.keyboard.press('Tab');
  const skip = await page.evaluate(() => { const a = document.activeElement; const r = a.getBoundingClientRect(); return { text: a.textContent.trim(), vis: r.width > 1 && r.top >= 0 && r.top < innerHeight }; });
  log(skip.text === 'Skip to content' && skip.vis, ctx, `skip link first and visible (${skip.text})`);
  await page.keyboard.press('Enter'); await wait(page, 200);
  log(await page.evaluate(() => document.activeElement?.id === 'main'), ctx, 'skip link moves focus to main');
  // current page marked in the nav
  if (['/about', '/our-brands', '/40-years', '/for-businesses', '/media', '/contact'].includes(path)) {
    const cur = await page.evaluate(() => [...document.querySelectorAll('header [aria-current="page"], #mobile-drawer [aria-current="page"]')].map((a) => a.getAttribute('href')));
    log(cur.some((h) => h === path || h === path + '/'), ctx, `nav marks current page (${cur.join(',') || 'none'})`);
  }
  if (w >= 1024) {
    const link = page.locator('header nav a[href="/about"], header a[href="/about"]').first();
    log(await link.isVisible(), ctx, 'desktop nav visible');
    if (path !== '/about') {
      await link.click(); await page.waitForURL('**/about', { timeout: 5000 }).catch(() => {});
      log(page.url().endsWith('/about'), ctx, 'desktop nav link navigates');
      await page.goBack(); await page.waitForLoadState('networkidle');
    }
  } else {
    const btn = page.locator('button[aria-controls="mobile-drawer"]');
    log(await btn.isVisible(), ctx, 'menu button visible');
    await btn.click(); await wait(page, 600);
    const open = await page.evaluate(() => ({ exp: document.querySelector('button[aria-controls="mobile-drawer"]').getAttribute('aria-expanded'), inert: document.getElementById('mobile-drawer').inert, focusIn: document.getElementById('mobile-drawer').contains(document.activeElement) }));
    log(open.exp === 'true' && !open.inert && open.focusIn, ctx, `menu opens, focus inside (${JSON.stringify(open)})`);
    await page.keyboard.press('Escape'); await wait(page, 600);
    const closed = await page.evaluate(() => ({ exp: document.querySelector('button[aria-controls="mobile-drawer"]').getAttribute('aria-expanded'), inert: document.getElementById('mobile-drawer').inert, back: document.activeElement === document.querySelector('button[aria-controls="mobile-drawer"]') }));
    log(closed.exp === 'false' && closed.inert && closed.back, ctx, `Esc closes menu, focus returns (${JSON.stringify(closed)})`);
    if (path !== '/contact') {
      await btn.click(); await wait(page, 600);
      await page.locator('#mobile-drawer a[href="/contact"]').first().click();
      await page.waitForURL('**/contact', { timeout: 5000 }).catch(() => {});
      log(page.url().endsWith('/contact'), ctx, 'mobile menu link navigates');
      await page.goBack(); await page.waitForLoadState('networkidle');
    }
  }
}

async function testPortfolio(page, ctx) {
  const roots = page.locator('.portfolio-carousel-fluid');
  for (let i = 0; i < await roots.count(); i++) {
    const root = roots.nth(i); await root.scrollIntoViewIfNeeded(); await wait(page, 500);
    const active = () => root.evaluate((r) => { const h = r.querySelector('.swiper-slide-active h3, .swiper-slide-active h2'); return h?.textContent.trim() || h?.querySelector('img')?.alt; });
    const a0 = await active();
    await root.locator('.pf-next').click(); await wait(page, 1200);
    const a1 = await active();
    await root.locator('.pf-prev').click(); await wait(page, 1200);
    const a2 = await active();
    await root.locator('.pf-next').focus(); await page.keyboard.press('Enter'); await wait(page, 1200);
    const a3 = await active();
    log(a0 && a1 !== a0 && a2 === a0 && a3 === a1, ctx, `brand slider next/prev/keyboard (${a0} → ${a1} → ${a2} → ${a3})`);
    // only real (non-repeat) slides are focusable
    const hiddenFocusable = await root.evaluate((r) => [...r.querySelectorAll('[data-repeat] a')].filter((a) => a.tabIndex >= 0).length);
    log(hiddenFocusable === 0, ctx, `repeat slides out of tab order (${hiddenFocusable})`);
  }
}

async function testReviews(page, ctx) {
  const roots = page.locator('.review-carousel');
  for (let i = 0; i < await roots.count(); i++) {
    const root = roots.nth(i); await root.scrollIntoViewIfNeeded(); await wait(page, 500);
    const tx = () => root.evaluate((r) => getComputedStyle(r.querySelector('.swiper-wrapper')).transform);
    const t0 = await tx();
    const bullets = root.locator('.swiper-pagination-bullet');
    const n = await bullets.count();
    if (n > 1) { await bullets.nth(Math.min(2, n - 1)).click(); await wait(page, 900); }
    const t1 = await tx();
    log(n > 1 && t1 !== t0, ctx, `testimonial slider moves via pagination (${n} bullets)`);
  }
}

async function testLogos(page, ctx, reduce) {
  const roots = page.locator('[data-logo-carousel]');
  for (let i = 0; i < await roots.count(); i++) {
    const root = roots.nth(i); await root.scrollIntoViewIfNeeded(); await page.mouse.move(2, 2); await wait(page, 300);
    const snap = () => root.evaluate((r) => [...r.querySelectorAll('[data-logo-index]')].map((e) => getComputedStyle(e).transform + getComputedStyle(e).opacity).join('|'));
    const s0 = await snap(); await wait(page, 4500); const s1 = await snap();
    if (reduce) { log(s0 === s1, ctx, 'logo wall static with reduced motion'); continue; }
    const multi = await root.evaluate((r) => [...r.querySelectorAll('[data-column]')].some((c) => c.querySelectorAll('[data-logo-index]').length > 1));
    if (multi) log(s0 !== s1, ctx, 'logo wall cycles'); else log(true, ctx, 'logo wall cycling n/a (one logo per column)');
    const toggle = root.locator('[data-pause-toggle]');
    if (await toggle.count()) {
      await toggle.focus(); await wait(page, 200);
      log(await toggle.isVisible(), ctx, 'logo wall pause button visible on focus');
      await page.keyboard.press('Enter'); await wait(page, 300);
      log((await toggle.getAttribute('aria-pressed')) === 'true', ctx, 'pause button pressed');
      await page.mouse.move(2, 2); await toggle.evaluate((b) => b.blur());
      const p0 = await snap(); await wait(page, 4000); const p1 = await snap();
      log(p0 === p1, ctx, 'logo wall stays paused');
      await toggle.focus(); await page.keyboard.press('Enter'); await toggle.evaluate((b) => b.blur());
    }
  }
}

async function testShowreel(page, ctx, reduce) {
  const vids = page.locator('[data-showreel-video]');
  if (!(await vids.count())) return;
  const vid = vids.first(); await vid.scrollIntoViewIfNeeded(); await page.mouse.move(2, 2); await wait(page, 1500);
  const playing = await vid.evaluate((v) => !v.paused && v.readyState > 1);
  if (reduce) log(!playing, ctx, 'showreel does not autoplay with reduced motion');
  else {
    log(playing, ctx, 'showreel autoplays inline when on screen');
    const toggle = vid.locator('xpath=..').locator('[data-pause-toggle]').first();
    await toggle.focus(); await page.keyboard.press('Enter'); await wait(page, 500);
    log(await vid.evaluate((v) => v.paused), ctx, 'showreel pause button pauses');
    await page.keyboard.press('Enter'); await wait(page, 300); await toggle.evaluate((b) => b.blur());
  }
  // keyboard: "Play showreel" opens the dialog; Esc closes it and returns focus
  const open = page.locator('[data-showreel-open]').first();
  await open.focus(); await wait(page, 200);
  log(await open.isVisible(), ctx, '"Play showreel" visible on focus');
  await page.keyboard.press('Enter'); await wait(page, 1200);
  const st = await page.evaluate(() => { const d = document.querySelector('[aria-label="Showreel"][aria-modal="true"]'); return { inert: d.inert, focusIn: d.contains(document.activeElement), v: (() => { const v = d.querySelector('video'); return v ? !v.paused : null; })() }; });
  log(!st.inert && st.focusIn, ctx, `showreel dialog opens with focus inside (${JSON.stringify(st)})`);
  await page.keyboard.press('Escape'); await wait(page, 1000);
  const cl = await page.evaluate(() => ({ inert: document.querySelector('[aria-label="Showreel"][aria-modal="true"]').inert, back: document.activeElement?.hasAttribute('data-showreel-open') }));
  log(cl.inert && cl.back, ctx, `Esc closes the showreel and returns focus (${JSON.stringify(cl)})`);
}

async function testForm(page, ctx, w) {
  const form = page.locator('#contact-form');
  if (!(await form.count())) return;
  await form.scrollIntoViewIfNeeded();
  await page.locator('label[for="contact-name"]').click();
  log(await page.evaluate(() => document.activeElement?.id === 'contact-name'), ctx, 'clicking the Name label focuses the field');
  await page.locator('#contact-form button[type="submit"]').click(); await wait(page, 400);
  log(new URL(page.url()).pathname === '/contact' && !(await form.evaluate((f) => f.checkValidity())), ctx, 'empty form is blocked by required-field validation');
  await page.fill('#contact-name', 'Test Person'); await page.fill('#contact-email', 'test@example.ca');
  await page.fill('#contact-company', 'Test Org'); await page.fill('#contact-message', 'Testing the contact form.');
  let posted = null;
  await page.route('**/', (route) => { if (route.request().method() === 'POST') { posted = route.request().postData(); return route.fulfill({ status: 500, body: 'x' }); } return route.continue(); });
  await page.locator('#contact-form button[type="submit"]').click(); await wait(page, 800);
  const err = await page.evaluate(() => ({ status: document.querySelector('#contact-form .status').textContent, disabled: document.querySelector('#contact-form button[type=submit]').disabled }));
  log(posted && posted.includes('form-name=contact') && posted.includes('name=Test+Person') && err.status.length > 0 && !err.disabled, ctx, `failed send shows the error and re-enables the button (${err.status.slice(0, 40)})`);
  await page.unroute('**/');
  await page.route('**/', (route) => route.request().method() === 'POST' ? route.fulfill({ status: 200, body: 'ok' }) : route.continue());
  await page.locator('#contact-form button[type="submit"]').click();
  await page.waitForURL('**/thank-you/contact', { timeout: 5000 }).catch(() => {});
  log(page.url().endsWith('/thank-you/contact'), ctx, 'successful send goes to the thank-you page');
  await page.unroute('**/');
}

(async () => {
  const browser = await chromium.launch();
  // every internal link on the site resolves
  const ctx0 = await browser.newPage();
  const hrefs = new Set();
  for (const p of pages) { await ctx0.goto(base + p); (await ctx0.evaluate(() => [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href').split('#')[0]))).forEach((h) => h && hrefs.add(h)); }
  for (const h of hrefs) { const r = await ctx0.request.get(base + h); log(r.status() === 200, 'links', `${h} → ${r.status()}`); }
  await ctx0.close();

  for (const reduce of [false, true]) {
    for (const w of [1440, 390]) {
      for (const p of pages) {
        const ctx = `${reduce ? 'reduce' : 'motion'} ${w} ${p}`;
        const page = await browser.newPage({ viewport: { width: w, height: 900 }, reducedMotion: reduce ? 'reduce' : 'no-preference' });
        const errs = []; page.on('pageerror', (e) => errs.push(e.message)); page.on('console', (m) => m.type() === 'error' && !(p === '/contact' && m.text().includes('500')) && errs.push(m.text()));
        await page.goto(base + p, { waitUntil: 'networkidle' });
        await scrollThrough(page);
        await testNav(page, ctx, w, p);
        await testPortfolio(page, ctx);
        await testReviews(page, ctx);
        await testLogos(page, ctx, reduce);
        await testShowreel(page, ctx, reduce);
        await testForm(page, ctx, w);
        log(errs.length === 0, ctx, `no console errors ${errs.slice(0, 2).join(' | ')}`);
        await page.close();
      }
    }
  }
  await browser.close();
  const fails = results.filter((r) => !r.ok);
  const tally = {}; results.forEach((r) => { const k = r.msg.replace(/\s*\(.*$/, ''); tally[k] = tally[k] || [0, 0]; tally[k][r.ok ? 0 : 1]++; });
  console.log('\n-- checks (passed / failed)');
  Object.entries(tally).filter(([k]) => !k.startsWith('/')).forEach(([k, [a, b]]) => console.log(`${String(a).padStart(4)} / ${b}  ${k}`));
  console.log(`\nlinks checked: ${hrefs.size}; total checks: ${results.length}; failures: ${fails.length}`);
})();
