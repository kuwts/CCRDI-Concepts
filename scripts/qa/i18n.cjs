// usage: node i18n.cjs <projectDir> <baseUrl>
// The English/French site (src/i18n): every page pair in src/i18n/routes.json, at 1440 and 390.
// html lang, hreflang (both pages, x-default English), og:locale, the language switcher (header
// and mobile menu) going to the paired page and back, the menus and logo staying in the page's
// language, no English interface labels on French pages, press releases marked lang="en", the
// French contact form (custom validation messages, the `language` field, French thank-you
// page), console errors.
const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');
const [, , projectDir, base] = process.argv;
const { chromium } = createRequire(projectDir + '/package.json')('playwright');
const routes = JSON.parse(fs.readFileSync(path.join(projectDir, 'src/i18n/routes.json'), 'utf8'));
const pairs = routes.filter((r) => r.en !== '/404');
let total = 0, fails = 0;
const ok = (c, m) => { total++; if (!c) { fails++; console.log('FAIL', m); } };
const clean = (p) => p.replace(/(.)\/$/, '$1') || '/';
const pathOf = (u) => clean(new URL(u).pathname);
// interface labels that must not appear on French pages (site.config.json → ui.en)
const englishUi = ['Skip to content', 'Open menu', 'Close menu', 'Scroll to top', 'opens in a new tab', 'Prev', 'Next', 'Pause logo', 'Play showreel', 'Breadcrumb', 'Years of Trust', 'Copyright'];

(async () => {
  const b = await chromium.launch();
  for (const pair of pairs) for (const lang of ['en', 'fr']) for (const w of [1440, 390]) {
    const url = pair[lang], other = lang === 'en' ? 'fr' : 'en';
    const ctx = `${w} ${url}`;
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    await p.goto(base + url, { waitUntil: 'networkidle' });
    const head = await p.evaluate(() => ({
      lang: document.documentElement.lang,
      alts: Object.fromEntries([...document.querySelectorAll('link[rel=alternate][hreflang]')].map((l) => [l.hreflang, l.href])),
      og: document.querySelector('meta[property="og:locale"]')?.content,
      noindex: !!document.querySelector('meta[name=robots][content*=noindex]'),
    }));
    ok(head.lang === (lang === 'fr' ? 'fr-CA' : 'en-CA'), `${ctx}: html lang ${head.lang}`);
    ok(head.og === (lang === 'fr' ? 'fr_CA' : 'en_CA'), `${ctx}: og:locale ${head.og}`);
    if (!head.noindex) {
      ok(head.alts['en-CA'] && pathOf(head.alts['en-CA']) === pair.en, `${ctx}: hreflang en-CA → ${head.alts['en-CA']}`);
      ok(head.alts['fr-CA'] && pathOf(head.alts['fr-CA']) === pair.fr, `${ctx}: hreflang fr-CA → ${head.alts['fr-CA']}`);
      ok(head.alts['x-default'] && pathOf(head.alts['x-default']) === pair.en, `${ctx}: hreflang x-default → ${head.alts['x-default']}`);
    }
    // header and menu links stay in the page's language
    const links = await p.evaluate(() => [...document.querySelectorAll('#site-header a[href^="/"], #mobile-drawer a[href^="/"], footer a[href^="/"]')].filter((a) => !a.hasAttribute('hreflang')).map((a) => a.getAttribute('href')));
    const wrong = links.filter((h) => (lang === 'fr') !== /^\/fr(\/|$)/.test(h));
    ok(wrong.length === 0, `${ctx}: header, menu and footer links in the page's language (${wrong.join(', ')})`);
    if (lang === 'fr') {
      const text = await p.evaluate(() => {
        const out = [document.body.innerText];
        document.querySelectorAll('[aria-label],[title],[data-pause-text],[data-play-text],img[alt]').forEach((e) => out.push(e.getAttribute('aria-label') || '', e.getAttribute('title') || '', e.dataset.pauseText || '', e.dataset.playText || '', e.getAttribute('alt') || ''));
        document.querySelectorAll('svg title').forEach((t) => out.push(t.textContent));
        return out.join('\n');
      });
      const found = englishUi.filter((s) => new RegExp(`\\b${s}\\b`).test(text));
      ok(found.length === 0, `${ctx}: no English interface labels (${found.join(', ')})`);
      // press releases: English headline and summary, marked as English, French note
      const news = await p.evaluate(() => [...document.querySelectorAll('a[href*="presswire"], a[href*="newswire"]')].map((a) => ({ en: !!a.querySelector('[lang=en]'), note: a.textContent.includes('en anglais') })));
      ok(news.every((n) => n.en && n.note), `${ctx}: ${news.length} press release links marked lang="en" with "(en anglais, …)"`);
    }
    // the switcher goes to the paired page
    if (w === 1440) {
      const sw = p.locator(`#site-header a[hreflang="${lang === 'fr' ? 'en-CA' : 'fr-CA'}"]`);
      ok(await sw.isVisible(), `${ctx}: header language switcher visible`);
      const name = await sw.evaluate((a) => a.textContent.trim());
      ok(name.startsWith(lang === 'fr' ? 'EN' : 'FR'), `${ctx}: switcher name includes its visible text (${name})`);
      await sw.click();
      await p.waitForLoadState('networkidle');
      ok(pathOf(p.url()) === pair[other], `${ctx}: switcher → ${pathOf(p.url())} (expected ${pair[other]})`);
    } else {
      await p.locator('[data-menu-open]').click();
      await p.waitForTimeout(600);
      const msw = p.locator(`#mobile-drawer a[hreflang="${lang === 'fr' ? 'en-CA' : 'fr-CA'}"]`);
      ok(await msw.isVisible(), `${ctx}: mobile menu language switcher visible`);
      ok((await msw.getAttribute('href')) === pair[other], `${ctx}: mobile switcher href ${await msw.getAttribute('href')}`);
      await p.keyboard.press('Escape');
    }
    ok(errs.length === 0, `${ctx}: console errors ${errs.join(' | ')}`);
    await p.close();
  }

  // French contact form
  for (const w of [1440, 390]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    await p.goto(base + '/fr/nous-joindre', { waitUntil: 'networkidle' });
    await p.locator('#contact-form button[type=submit]').click();
    const msg = await p.evaluate(() => document.getElementById('contact-name').validationMessage);
    ok(msg === 'Veuillez remplir ce champ.', `${w} /fr/nous-joindre: required message in French (${msg})`);
    await p.fill('#contact-name', 'Test');
    await p.fill('#contact-email', 'pas-un-courriel');
    await p.locator('#contact-form button[type=submit]').click();
    const emailMsg = await p.evaluate(() => document.getElementById('contact-email').validationMessage);
    ok(emailMsg === 'Veuillez entrer une adresse courriel valide.', `${w} /fr/nous-joindre: email message in French (${emailMsg})`);
    await p.fill('#contact-email', 'test@example.com');
    await p.fill('#contact-message', 'Bonjour');
    let posted = '';
    await p.route('**/', (route) => { if (route.request().method() === 'POST') { posted = route.request().postData() ?? ''; return route.fulfill({ status: 200, body: 'ok' }); } return route.continue(); });
    await p.locator('#contact-form button[type=submit]').click();
    await p.waitForURL('**/fr/merci/contact', { timeout: 5000 }).catch(() => {});
    ok(pathOf(p.url()) === '/fr/merci/contact', `${w} /fr/nous-joindre: a sent form goes to /fr/merci/contact (${pathOf(p.url())})`);
    ok(posted.includes('form-name=contact') && posted.includes('language=fr'), `${w} /fr/nous-joindre: posts form "contact" with language=fr`);
    await p.close();
  }
  await b.close();
  console.log(`\n${total} checks, ${fails} failure(s)`);
  process.exit(fails ? 1 : 0);
})();
