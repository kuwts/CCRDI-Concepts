// usage: node clips.cjs <projectDir> <url> <outPrefix> <width> <y0,y1;y0,y1...>
const { createRequire } = require('module');
const [, , projectDir, url, outPrefix, width, ranges] = process.argv;
const { chromium } = createRequire(projectDir + '/package.json')('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: +width, height: 900 } });
  await page.goto(url, { waitUntil: 'networkidle' });
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 400) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(100); }
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(800);
  let i = 0;
  for (const r of ranges.split(';')) {
    const [a, b] = r.split(',').map(Number);
    await page.screenshot({ path: `${outPrefix}-${i++}.png`, fullPage: true, clip: { x: 0, y: a, width: +width, height: b - a } });
  }
  await browser.close();
})();
