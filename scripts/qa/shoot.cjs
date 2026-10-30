// usage: node shoot.cjs <projectDir> <url> <outPrefix>
const { createRequire } = require('module');
const [, , projectDir, url, outPrefix] = process.argv;
const { chromium } = createRequire(projectDir + '/package.json')('playwright');

(async () => {
  const browser = await chromium.launch();
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(url, { waitUntil: 'networkidle' });
    // scroll through the page so scroll-reveal content is shown
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 400) {
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await page.waitForTimeout(120);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${outPrefix}-${width}.png`, fullPage: true });
    // console errors
    await page.close();
  }
  await browser.close();
})();
