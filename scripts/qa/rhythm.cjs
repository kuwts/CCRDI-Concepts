// usage: node rhythm.cjs <projectDir> <baseUrl> : top-level section backgrounds in order; flags neighbours that match
const { createRequire } = require('module');
const [, , projectDir, base] = process.argv;
const { chromium } = createRequire(projectDir + '/package.json')('playwright');
const pages = ['/', '/about', '/our-brands', '/our-brands/consumer-choice-award', '/our-brands/consumer-choice-marketing',
  '/our-brands/ccrdi', '/40-years', '/for-businesses', '/media', '/contact', '/thank-you/contact', '/privacy', '/accessibility', '/404'];
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'networkidle' });
    const list = await page.evaluate(() => {
      const name = (c) => ({ 'rgb(11, 37, 69)': 'navy', 'rgb(248, 246, 241)': 'ivory', 'rgb(255, 255, 255)': 'white', 'rgba(0, 0, 0, 0)': 'navy*' }[c] || c);
      const els = [...document.querySelectorAll('main > section, main > div, footer')].filter((e) => e.getBoundingClientRect().height > 40);
      return els.map((e) => `${name(getComputedStyle(e).backgroundColor)}(${Math.round(e.getBoundingClientRect().height)})`);
    });
    const flat = list.map((x) => x.split('(')[0].replace('*', ''));
    const dup = flat.some((b, i) => i && b === flat[i - 1]);
    console.log(`${dup ? '!!' : 'ok'} ${p.padEnd(38)} ${list.join(' → ')}`);
  }
  await browser.close();
})();
