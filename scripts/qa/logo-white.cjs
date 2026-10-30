// usage: node white.cjs <projectDir> <in.png> <out.png>
// All-white single-colour version: every pixel white; alpha = original alpha x weight, where
// weight is 1 for ink (anything not very light) and falls to 0.3 for near-white decorative
// elements, so faint details stay faint instead of turning solid.
const fs = require('fs'); const { createRequire } = require('module');
const [, , projectDir, input, output] = process.argv;
const { chromium } = createRequire(projectDir + '/package.json')('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage();
  const png = await p.evaluate(async (b64) => {
    const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0);
    const id = x.getImageData(0, 0, c.width, c.height); const d = id.data;
    for (let k = 0; k < d.length; k += 4) {
      if (!d[k + 3]) continue;
      const light = (Math.max(d[k], d[k + 1], d[k + 2]) + Math.min(d[k], d[k + 1], d[k + 2])) / 510; // HSL lightness
      const w = light <= 0.7 ? 1 : Math.max(0.3, 1 - (light - 0.7) / 0.3 * 0.7);
      d[k] = d[k + 1] = d[k + 2] = 255; d[k + 3] = Math.round(d[k + 3] * w);
    }
    x.putImageData(id, 0, 0); return c.toDataURL('image/png').split(',')[1];
  }, fs.readFileSync(input).toString('base64'));
  fs.writeFileSync(output, Buffer.from(png, 'base64')); console.log(output.split('/').pop(), fs.statSync(output).size); await b.close(); })();
