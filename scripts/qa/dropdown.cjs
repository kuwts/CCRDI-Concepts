// usage: node dropdown.cjs <projectDir> <baseUrl>
// The "Our Brands" menu: header fit at every desktop width; desktop keyboard (disclosure
// pattern), hover, click outside, touch at desktop width; the mobile drawer's submenu.
const { createRequire } = require('module');
const [, , projectDir, base] = process.argv;
const { chromium } = createRequire(projectDir + '/package.json')('playwright');
let total = 0, fails = 0; const ok = (c, m) => { total++; if (!c) { fails++; console.log('FAIL', m); } };
const children = ['/our-brands', '/our-brands/consumer-choice-award', '/our-brands/consumer-choice-marketing', '/our-brands/ccrdi'];
(async () => { const b = await chromium.launch();
  // 1. header fit
  for (const w of [1024, 1100, 1180, 1279, 1280, 1366, 1440, 1600]) {
    const p = await b.newPage({ viewport: { width: w, height: 800 } }); await p.goto(base + '/');
    const r = await p.evaluate(() => { const n = document.querySelector('#site-header nav'); const k = [...n.children].filter((c) => c.offsetParent).map((c) => c.getBoundingClientRect()); let gap = 99; for (let i = 1; i < k.length; i++) gap = Math.min(gap, k[i].left - k[i - 1].right); return { over: n.scrollWidth > n.clientWidth + 1, gap: Math.round(gap), wraps: [...document.querySelectorAll('[data-dropnav] > ul > li')].some((li) => li.getBoundingClientRect().height > 70) }; });
    ok(!r.over && !r.wraps && r.gap >= 8, `${w}: header fits (overflow ${r.over}, min gap ${r.gap}px, wraps ${r.wraps})`);
    await p.close();
  }
  for (const reduce of [false, true]) {
    const tag = reduce ? 'reduce' : 'motion';
    // 2. desktop keyboard
    let p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: reduce ? 'reduce' : 'no-preference' }); await p.goto(base + '/about', { waitUntil: 'networkidle' });
    const btn = p.locator('[data-dropnav] button[data-nav-trigger]'); const state = () => p.evaluate(() => { const bt = document.querySelector('[data-dropnav] button[data-nav-trigger]'); const m = document.getElementById(bt.getAttribute('aria-controls')); return { exp: bt.getAttribute('aria-expanded'), hidden: m.hidden, focus: document.activeElement?.getAttribute('href') || document.activeElement?.textContent.trim().slice(0, 20) }; });
    ok(await btn.count() === 1 && (await btn.textContent()).includes('Our Brands'), `${tag}: Our Brands is a menu button`);
    await btn.focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(400); let s = await state();
    ok(s.exp === 'true' && !s.hidden, `${tag}: Enter opens (${JSON.stringify(s)})`);
    await p.keyboard.press('Tab'); s = await state(); ok(s.focus === children[0], `${tag}: Tab moves into the menu (${s.focus})`);
    for (let i = 1; i < 4; i++) { await p.keyboard.press('Tab'); s = await state(); ok(s.focus === children[i], `${tag}: Tab to item ${i + 1} (${s.focus})`); }
    await p.keyboard.press('Tab'); s = await state(); ok(s.exp === 'false' && s.focus === '/40-years', `${tag}: Tab past the last item closes and moves on (${JSON.stringify(s)})`);
    await btn.focus(); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(300); s = await state(); ok(s.exp === 'true' && s.focus === children[0], `${tag}: ArrowDown opens and focuses the first item (${s.focus})`);
    await p.keyboard.press('Escape'); await p.waitForTimeout(900); s = await state(); ok(s.exp === 'false' && s.hidden && s.focus.startsWith('Our Brands'), `${tag}: Esc closes and returns focus (${JSON.stringify(s)})`);
    await btn.focus(); await p.keyboard.press('Space'); await p.waitForTimeout(300); s = await state(); ok(s.exp === 'true', `${tag}: Space opens`);
    await p.keyboard.press('Space'); await p.waitForTimeout(300); s = await state(); ok(s.exp === 'false', `${tag}: Space closes again`);
    // a closed menu's links aren't in the Tab order (Tab past Contact leaves the header)
    await p.locator('[data-dropnav] a[href="/contact"]').focus(); await p.keyboard.press('Tab');
    const after = await p.evaluate(() => ({ inMenu: !!document.activeElement?.closest('[data-nav-menu]'), href: document.activeElement?.getAttribute('href') }));
    ok(!after.inMenu, `${tag}: closed menu links are out of the Tab order (${JSON.stringify(after)})`);
    // focus ring visible on the button and on a menu link
    await btn.focus(); const ring = await btn.evaluate((e) => getComputedStyle(e).outlineStyle + ' ' + getComputedStyle(e).outlineWidth);
    ok(ring.startsWith('solid'), `${tag}: visible focus ring on the button (${ring})`);
    // 3. hover and click outside, then a child link navigates
    await p.mouse.move(2, 400); await btn.hover(); await p.waitForTimeout(500); s = await state(); ok(s.exp === 'true' || !s.hidden, `${tag}: hover opens (${JSON.stringify(s)})`);
    const link = p.locator(`[data-nav-menu] a[href="/our-brands/ccrdi"]`); await link.hover(); await p.waitForTimeout(200);
    ok(await link.isVisible(), `${tag}: menu link visible on hover`);
    await link.click(); await p.waitForURL('**/our-brands/ccrdi', { timeout: 4000 }).catch(() => {});
    ok(p.url().endsWith('/our-brands/ccrdi'), `${tag}: a menu link navigates (${p.url()})`);
    const cur = await p.evaluate(() => ({ btn: document.querySelector('[data-dropnav] button[data-nav-trigger]').classList.contains('text-white'), link: document.querySelector('[data-nav-menu] a[href="/our-brands/ccrdi"]').getAttribute('aria-current') }));
    ok(cur.btn && cur.link === 'page', `${tag}: current section and page marked (${JSON.stringify(cur)})`);
    await btn.click(); await p.waitForTimeout(300); await p.mouse.click(700, 600); await p.waitForTimeout(300); s = await state(); ok(s.exp === 'false', `${tag}: click outside closes`);
    await p.close();
    // 4. touch at desktop width (a landscape tablet)
    const tctx = await b.newContext({ viewport: { width: 1180, height: 820 }, hasTouch: true, reducedMotion: reduce ? 'reduce' : 'no-preference' });
    p = await tctx.newPage(); await p.goto(base + '/about', { waitUntil: 'networkidle' });
    const tb = p.locator('[data-dropnav] button[data-nav-trigger]'); const bb = await tb.boundingBox();
    await p.touchscreen.tap(bb.x + bb.width / 2, bb.y + bb.height / 2); await p.waitForTimeout(500); s = await state();
    ok(s.exp === 'true' && !s.hidden, `${tag} touch: tap opens (${JSON.stringify(s)})`);
    const tl = await p.locator('[data-nav-menu] a[href="/our-brands/consumer-choice-award"]').boundingBox();
    await p.touchscreen.tap(tl.x + tl.width / 2, tl.y + tl.height / 2); await p.waitForURL('**/consumer-choice-award', { timeout: 4000 }).catch(() => {});
    ok(p.url().endsWith('/our-brands/consumer-choice-award'), `${tag} touch: tapping a link navigates (${p.url()})`);
    const tb2 = p.locator('[data-dropnav] button[data-nav-trigger]'); const bb2 = await tb2.boundingBox();
    await p.touchscreen.tap(bb2.x + bb2.width / 2, bb2.y + bb2.height / 2); await p.waitForTimeout(400);
    await p.touchscreen.tap(600, 700); await p.waitForTimeout(400); s = await state(); ok(s.exp === 'false', `${tag} touch: tapping elsewhere closes`);
    await tctx.close();
    // 5. mobile drawer
    for (const touch of [false, true]) {
      const mctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: touch, isMobile: touch, reducedMotion: reduce ? 'reduce' : 'no-preference' });
      p = await mctx.newPage(); await p.goto(base + '/about', { waitUntil: 'networkidle' });
      const mt = `${tag} ${touch ? 'touch' : 'mouse'} 390`;
      await p.locator('button[aria-controls="mobile-drawer"]').click(); await p.waitForTimeout(600);
      const tog = p.locator('#mobile-drawer [data-dropdown-toggle]');
      const ms = () => p.evaluate(() => { const t = document.querySelector('#mobile-drawer [data-dropdown-toggle]'); const sub = t.nextElementSibling; return { exp: t.getAttribute('aria-expanded'), inert: sub.inert, h: Math.round(sub.getBoundingClientRect().height), links: sub.querySelectorAll('a').length }; });
      let m = await ms(); ok(m.exp === 'false' && m.inert && m.h === 0, `${mt}: submenu closed at first (${JSON.stringify(m)})`);
      if (touch) { const tb3 = await tog.boundingBox(); await p.touchscreen.tap(tb3.x + 20, tb3.y + tb3.height / 2); } else await tog.click();
      await p.waitForTimeout(600); m = await ms(); ok(m.exp === 'true' && !m.inert && m.h > 100 && m.links === 4, `${mt}: toggle opens the submenu (${JSON.stringify(m)})`);
      await tog.focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(500); m = await ms(); ok(m.exp === 'false' && m.inert, `${mt}: Enter closes it again`);
      await p.keyboard.press('Enter'); await p.waitForTimeout(500);
      await p.locator('#mobile-drawer [data-submenu] a[href="/our-brands/ccrdi"]').click(); await p.waitForURL('**/ccrdi', { timeout: 4000 }).catch(() => {});
      ok(p.url().endsWith('/our-brands/ccrdi'), `${mt}: submenu link navigates`);
      await mctx.close();
    }
  }
  console.log(`${total} checks, ${fails} failures`); await b.close(); })();
