// park the page at every scroll position from 0 to 200px and check it stays put
const { createRequire } = require('module');
const [, , projectDir, url] = process.argv;
const { chromium } = createRequire(projectDir + '/package.json')('playwright');
(async () => { const b = await chromium.launch(); let bad = 0;
  for (const w of [1440, 390]) { const p = await b.newPage({ viewport: { width: w, height: 900 } }); await p.goto(url, { waitUntil: 'networkidle' });
    for (let y = 0; y <= 200; y += 4) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(450);
      const a = await p.evaluate(() => scrollY); await p.waitForTimeout(450); const c = await p.evaluate(() => scrollY);
      if (a !== c) { bad++; console.log(`moving at ${w}px, start ${y}: ${a} → ${c}`); } }
    await p.close(); }
  console.log(`${bad} unstable positions`); await b.close(); })();
