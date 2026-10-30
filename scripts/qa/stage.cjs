// usage: node stage.cjs <projectDir> <baseUrl> <outDir> [axe.min.js]
// Every CCC page (English and French) at 390 and 1440: full-page screenshot, sideways overflow, H1 count,
// heading skips, missing alt, console errors, and (optionally) axe violations.
const fs = require('fs');
const { createRequire } = require('module');
const [, , projectDir, base, outDir, axePath] = process.argv;
const { chromium } = createRequire(projectDir + '/package.json')('playwright');
const pages = process.env.PAGES ? process.env.PAGES.split(',') : ['/', '/about', '/our-brands', '/our-brands/consumer-choice-award', '/our-brands/consumer-choice-marketing',
  '/our-brands/ccrdi', '/40-years', '/for-businesses', '/media', '/contact', '/thank-you/contact', '/privacy', '/accessibility', '/404',
  // French (src/i18n/routes.json)
  '/fr', '/fr/a-propos', '/fr/nos-marques', '/fr/nos-marques/prix-choix-du-consommateur', '/fr/nos-marques/consumer-choice-marketing',
  '/fr/nos-marques/ccrdi', '/fr/40-ans', '/fr/entreprises', '/fr/medias', '/fr/nous-joindre', '/fr/merci/contact', '/fr/confidentialite', '/fr/accessibilite', '/fr/404'];
const slug = (p) => (p === '/' ? 'home' : p.slice(1).replace(/\//g, '-'));
fs.mkdirSync(outDir, { recursive: true });
const axe = fs.readFileSync(axePath || createRequire(projectDir + '/package.json').resolve('axe-core/axe.min.js'), 'utf8');
(async () => {
  const browser = await chromium.launch();
  let problems = 0;
  for (const p of pages) {
    for (const w of [1440, 390]) {
      const page = await browser.newPage({ viewport: { width: w, height: 900 } });
      const errs = [];
      page.on('pageerror', (e) => errs.push(e.message));
      page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
      await page.goto(base + p, { waitUntil: 'networkidle' });
      const h = await page.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y < h; y += 450) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(90); }
      await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(900);
      const r = await page.evaluate(() => {
        const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter((e) => e.offsetParent !== null || getComputedStyle(e).position === 'fixed');
        let skip = false, prev = 0;
        for (const e of hs) { const l = +e.tagName[1]; if (prev && l > prev + 1) skip = true; prev = l; }
        return {
          sw: document.documentElement.scrollWidth, h1: document.querySelectorAll('h1').length, skip,
          noAlt: [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length,
          height: document.body.scrollHeight,
        };
      });
      let axeV = [];
      if (axe) {
        await page.addScriptTag({ content: axe });
        axeV = await page.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] })).violations.map((v) => `${v.id}(${v.nodes.length})`));
      }
      await page.screenshot({ path: `${outDir}/${slug(p)}-${w}.png`, fullPage: true });
      const bad = r.sw > w || r.h1 !== 1 || r.skip || r.noAlt || errs.length || axeV.length;
      if (bad) problems++;
      console.log(`${bad ? '!!' : 'ok'} ${String(w).padEnd(4)} ${p.padEnd(38)} h ${String(r.height).padEnd(6)} sw ${r.sw} h1 ${r.h1}${r.skip ? ' SKIP' : ''}${r.noAlt ? ' noAlt ' + r.noAlt : ''}${errs.length ? ' errors: ' + errs.slice(0, 2).join(' | ') : ''}${axeV.length ? ' axe: ' + axeV.join(' ') : ''}`);
      await page.close();
    }
  }
  console.log(`\n${problems} problem(s)`);
  await browser.close();
})();
