// usage: node sheet.cjs <projectDir> <imgDir> <out.png> [cols]
const fs = require('fs'), path = require('path');
const { createRequire } = require('module');
const [, , projectDir, dir, out, cols = 3] = process.argv;
const { chromium } = createRequire(projectDir + '/package.json')('playwright');
const files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png|webp)$/i.test(f)).sort();
const html = `<body style="margin:0;font:14px sans-serif;display:grid;grid-template-columns:repeat(${cols},1fr);gap:8px;padding:8px;width:${cols*460}px">` +
  files.map(f => `<figure style="margin:0"><img src="file://${path.join(dir,f)}" style="width:100%;height:300px;object-fit:contain;background:#eee"><figcaption>${f}</figcaption></figure>`).join('') + '</body>';
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: cols*460+16, height: 400 } });
  const f = path.join(dir, '_sheet.html'); fs.writeFileSync(f, html); await p.goto('file://' + f); await p.waitForTimeout(500); await p.screenshot({ path: out, fullPage: true }); await b.close(); })();
