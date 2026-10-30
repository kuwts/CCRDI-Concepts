// usage: node measure.cjs <projectDir> <url>  : section spacing, type, line length per width
const { createRequire } = require('module');
const [, , projectDir, url] = process.argv;
const { chromium } = createRequire(projectDir + '/package.json')('playwright');
(async () => {
  const browser = await chromium.launch();
  for (const w of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    await page.goto(url, { waitUntil: 'networkidle' });
    const r = await page.evaluate(() => {
      const px = (v) => Math.round(parseFloat(v));
      const out = { sections: [], type: [], para: [] };
      document.querySelectorAll('main > section, main > div > section, main section').forEach((s) => {
        if (s.parentElement.closest('section')) return;
        const cs = getComputedStyle(s);
        out.sections.push(`${(s.className || '').slice(0, 40).padEnd(40)} pt ${px(cs.paddingTop)} pb ${px(cs.paddingBottom)} h ${Math.round(s.getBoundingClientRect().height)}`);
      });
      const seen = new Set();
      document.querySelectorAll('h1,h2,h3,p,a.btn,.line-link').forEach((el) => {
        const cs = getComputedStyle(el);
        if (!el.textContent.trim() || el.offsetParent === null) return;
        const key = `${el.tagName} ${px(cs.fontSize)}/${(parseFloat(cs.lineHeight) / parseFloat(cs.fontSize)).toFixed(2)} ${cs.fontWeight} ls ${cs.letterSpacing} ${cs.fontFamily.split(',')[0]}`;
        if (!seen.has(key)) { seen.add(key); out.type.push(key + '  «' + el.textContent.trim().slice(0, 40) + '»'); }
        if (el.tagName === 'P' && el.textContent.length > 120) {
          const cpl = Math.round(el.getBoundingClientRect().width / (parseFloat(cs.fontSize) * 0.5));
          out.para.push(`${px(cs.fontSize)}px w ${Math.round(el.getBoundingClientRect().width)} ≈${cpl} chars/line  «${el.textContent.trim().slice(0, 40)}»`);
        }
      });
      return out;
    });
    console.log(`\n===== ${w}px\n-- sections`); r.sections.forEach((l) => console.log(l));
    console.log('-- type'); r.type.forEach((l) => console.log(l));
    console.log('-- long paragraphs'); r.para.forEach((l) => console.log(l));
    await page.close();
  }
  await browser.close();
})();
