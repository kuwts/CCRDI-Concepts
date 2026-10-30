const { createRequire } = require('module');
const [, , projectDir, file] = process.argv;
const { chromium } = createRequire(projectDir + '/package.json')('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 700, height: 800 } }); await p.goto('file://' + file); await p.waitForTimeout(400);
  const n = await p.evaluate(() => document.querySelectorAll('.b').length);
  for (let i = 0; i < n; i++) { await p.locator(".b").nth(i).scrollIntoViewIfNeeded();
    const box = await p.locator('.b').nth(i).boundingBox();
    const shot = await p.screenshot({ clip: { x: box.x + 400, y: box.y + 120, width: 260, height: 60 } });
    const r = await p.evaluate(async (b64) => { const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode(); const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0);
      const d = x.getImageData(0, 0, c.width, c.height).data; const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
      let mn = 1, mx = 0, s = 0, s2 = 0, n = 0; const vals = [];
      for (let k = 0; k < d.length; k += 4) { const l = 0.2126 * lin(d[k]) + 0.7152 * lin(d[k + 1]) + 0.0722 * lin(d[k + 2]); mn = Math.min(mn, l); mx = Math.max(mx, l); s += l; s2 += l * l; n++; vals.push(d[k + 2]); }
      const mean = s / n, sd = Math.sqrt(s2 / n - mean * mean); vals.sort((a, b) => a - b);
      const cr = (a) => (1.05) / (a + 0.05); const crg = (a) => (0.425 + 0.05) / (a + 0.05);
      return `blue p5 ${vals[Math.floor(n * .05)]} p50 ${vals[Math.floor(n * .5)]} p95 ${vals[Math.floor(n * .95)]} | L sd ${(sd * 1000).toFixed(2)}e-3 max ${mx.toFixed(4)} | white worst ${cr(mx).toFixed(2)} gold worst ${crg(mx).toFixed(2)}`; }, shot.toString('base64'));
    console.log(i, r);
  }
  await b.close(); })();
