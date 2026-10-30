const fs = require('fs'); const { createRequire } = require('module');
const [, , projectDir, base, axePath] = process.argv;
const { chromium } = createRequire(projectDir + '/package.json')('playwright');
const axe = fs.readFileSync(axePath || require.resolve('axe-core/axe.min.js'), 'utf8');
const results = []; const ok = (c, ctx, m) => { results.push(c); if (!c) console.log(`FAIL ${ctx}: ${m}`); else if (process.env.V) console.log(`ok   ${ctx}: ${m}`); };
(async () => { const b = await chromium.launch(); const url = base + '/component-lab';
  for (const reduce of [false, true]) for (const w of [390, 768, 1024, 1440]) {
    const ctx = `${reduce ? 'reduce' : 'motion'} ${w}`;
    const p = await b.newPage({ viewport: { width: w, height: 900 }, reducedMotion: reduce ? 'reduce' : 'no-preference' });
    const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    await p.goto(url, { waitUntil: 'networkidle' });
    const h = await p.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 500) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(40); }
    await p.waitForTimeout(800);
    // page: overflow, one H1, heading order
    const pg = await p.evaluate(() => { const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter((e) => e.offsetParent); let skip = false, prev = 0; for (const e of hs) { const l = +e.tagName[1]; if (prev && l > prev + 1) skip = true; prev = l; } return { sw: document.documentElement.scrollWidth, h1: document.querySelectorAll('h1').length, skip }; });
    ok(pg.sw <= w, ctx, `no sideways scroll (${pg.sw})`); ok(pg.h1 === 1 && !pg.skip, ctx, 'one H1, no skipped heading level');

    // tabs: enhanced state
    for (const id of ['lab-tabs-purpose', 'lab-tabs-audiences']) {
      const st = () => p.evaluate((id) => { const tabs = [...document.querySelectorAll(`[id^="${id}-tab-"]`)]; const panels = [...document.querySelectorAll(`[id^="${id}-panel-"]`)];
        return { list: !tabs[0].closest('[role=tablist]').hidden, sel: tabs.map((t) => t.getAttribute('aria-selected')).join(''), ti: tabs.map((t) => t.tabIndex).join(','), vis: panels.map((x) => !x.hidden ? 1 : 0).join(''), fallback: [...panels[0].closest('[data-tabs]').querySelectorAll('[data-tab-fallback]')].every((e) => e.hidden), focus: document.activeElement?.id }; }, id);
      let s = await st(); const n = s.sel.length / 4 | 0;
      ok(s.list && s.vis.startsWith('1') && s.vis.slice(1).indexOf('1') < 0 && s.fallback && s.ti.startsWith('0'), ctx, `${id}: enhanced, first tab open (${JSON.stringify(s)})`);
      await p.locator(`#${id}-tab-1`).click(); await p.waitForTimeout(150); s = await st();
      ok(s.vis[1] === '1' && s.vis.split('').filter((x) => x === '1').length === 1, ctx, `${id}: click opens tab 2 (${s.vis})`);
      await p.locator(`#${id}-tab-1`).focus();
      await p.keyboard.press('ArrowRight'); s = await st(); ok(s.focus === `${id}-tab-2` && s.vis[2] === '1', ctx, `${id}: ArrowRight → tab 3 (${s.focus})`);
      await p.keyboard.press('End'); s = await st(); const last = s.vis.length - 1; ok(s.focus === `${id}-tab-${last}` && s.vis[last] === '1', ctx, `${id}: End → last`);
      await p.keyboard.press('ArrowRight'); s = await st(); ok(s.focus === `${id}-tab-0` && s.vis[0] === '1', ctx, `${id}: ArrowRight wraps to first`);
      await p.keyboard.press('ArrowLeft'); s = await st(); ok(s.focus === `${id}-tab-${last}`, ctx, `${id}: ArrowLeft wraps to last`);
      await p.keyboard.press('Home'); s = await st(); ok(s.focus === `${id}-tab-0` && s.vis[0] === '1' && s.ti.split(',').filter((x) => x === '0').length === 1, ctx, `${id}: Home → first; only one tab in the Tab order`);
      await p.keyboard.press('Tab'); s = await st(); ok(s.focus === `${id}-panel-0`, ctx, `${id}: Tab moves to the open panel (${s.focus})`);
      const anim = await p.evaluate((id) => getComputedStyle(document.getElementById(`${id}-panel-0`)).animationName, id);
      ok(reduce ? anim === 'none' : true, ctx, `${id}: no panel animation with reduced motion (${anim})`);
      await p.waitForTimeout(reduce ? 50 : 650);
      const ind = await p.evaluate((id) => { const t = document.getElementById(`${id}-tab-0`); const i = t.closest('[role=tablist]').querySelector('.tab-indicator'); const a = t.getBoundingClientRect(), b = i.getBoundingClientRect(); return { dx: Math.round(Math.abs(a.left - b.left)), dw: Math.round(Math.abs(a.width - b.width)), color: getComputedStyle(i).backgroundColor, tr: getComputedStyle(i).transitionDuration }; }, id);
      ok(ind.dx <= 1 && ind.dw <= 1 && ind.color === 'rgb(138, 101, 20)' && (!reduce || ind.tr.startsWith('0s')), ctx, `${id}: gold indicator under the selected tab (${JSON.stringify(ind)})`);
    }
    // tab list edge fade where it scrolls
    const more = await p.evaluate(() => { const l = document.getElementById('lab-tabs-audiences-tab-0').closest('[role=tablist]'); return { over: l.scrollWidth > l.clientWidth + 1, more: l.dataset.more ?? null }; });
    ok(more.over ? more.more !== null : more.more === null, ctx, `audience tabs edge fade only when they scroll (${JSON.stringify(more)})`);

    // comparison table: focusable named region, scrolls with the keyboard when it overflows
    const reg = p.locator('[role=region][aria-labelledby="lab-architecture-caption"]');
    await reg.focus(); const tb = await reg.evaluate((r) => ({ name: document.getElementById(r.getAttribute('aria-labelledby')).textContent.trim(), over: r.scrollWidth > r.clientWidth + 1, focused: document.activeElement === r, ths: r.querySelectorAll('th[scope=col]').length + '/' + r.querySelectorAll('th[scope=row]').length }));
    ok(tb.focused && tb.name === 'Brand Architecture' && tb.ths === '3/4', ctx, `table region focusable, named, headers (${JSON.stringify(tb)})`);
    if (tb.over) { await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(300); const sl = await reg.evaluate((r) => r.scrollLeft); ok(sl > 0, ctx, `table scrolls with the arrow keys (${sl})`);
      const sticky = await reg.evaluate((r) => getComputedStyle(r.querySelector('th[scope=row]')).position); ok(sticky === 'sticky', ctx, 'row headers stay in view'); }

    // breadcrumbs, downloads, news, decorative bits
    const misc = await p.evaluate(() => {
      const navs = [...document.querySelectorAll('nav[aria-label^="Breadcrumb"]')];
      const bc = navs.map((n) => ({ cur: n.querySelector('[aria-current=page]')?.textContent.trim(), links: n.querySelectorAll('a').length, sepHidden: [...n.querySelectorAll('svg')].every((s) => s.getAttribute('aria-hidden') === 'true') }));
      const dl = [...document.querySelectorAll('#lab-downloads-0-meta')].length ? (() => { const a = document.querySelector('a[aria-describedby="lab-downloads-0-meta"]'); return { download: a.hasAttribute('download'), desc: document.getElementById('lab-downloads-0-meta').textContent.replace(/\s+/g, ' ').trim(), demoNoDownload: !document.querySelector('a[aria-describedby="lab-downloads-1-meta"]').hasAttribute('download') || true }; })() : null;
      const news = [...document.querySelectorAll('time[datetime]')].length;
      const decor = [...document.querySelectorAll('main svg')].filter((s) => !s.closest('a,button,[aria-hidden="true"]') && !s.getAttribute('role')).length;
      const notes = document.querySelectorAll('[role=note]').length;
      const stepsSr = [...document.querySelectorAll('ol li h3 .sr-only')].map((e) => e.textContent.trim()).slice(0, 2).join(' ');
      return { bc, dl, news, decor, notes, stepsSr };
    });
    ok(misc.bc.length === 2 && misc.bc.every((x) => x.cur && x.links === 2 && x.sepHidden), ctx, `breadcrumbs: current page marked, separators hidden (${JSON.stringify(misc.bc)})`);
    ok(misc.dl && misc.dl.download && misc.dl.desc.startsWith('PNG'), ctx, `download card: download attribute, format and size described (${JSON.stringify(misc.dl)})`);
    ok(misc.news === 3 && misc.notes === 3 && misc.decor === 0, ctx, `news dates in <time>, callouts as notes, decorative icons hidden (${misc.news}/${misc.notes}/${misc.decor})`);
    ok(misc.stepsSr === '01. 02.', ctx, `step numbers read by screen readers (${misc.stepsSr})`);
    // rebuilt components: StepList, StatRow, MediaSplit
    const rb = await p.evaluate(() => {
      const lists = [...document.querySelectorAll('[data-steplist]')];
      const allLit = lists.every((l) => [...l.querySelectorAll('.steplist-item')].every((li) => li.hasAttribute('data-active')));
      const progress = lists.map((l) => +getComputedStyle(l).getPropertyValue('--progress')).join(',');
      const animate = lists.some((l) => l.hasAttribute('data-animate'));
      const rules = [...document.querySelectorAll('.stat-rule')].map((r) => { const cs = getComputedStyle(r); return cs.scale + '|' + cs.transitionDuration; });
      const f = document.querySelector('[data-media-split] .has-anim.clip'); const img = f.querySelector('img');
      const spine = (() => { const l = lists[0]; const dot = l.querySelector('.steplist-marker').getBoundingClientRect(); const fill = l.querySelector('.steplist-fill').getBoundingClientRect(); return Math.round(Math.abs((dot.left + dot.width / 2) - (fill.left + fill.width / 2))); })();
      return { allLit, progress, animate, rules, clip: getComputedStyle(f).clipPath, imgScale: getComputedStyle(img).scale, spine };
    });
    ok(rb.allLit && rb.progress.split(',').every((v) => v === '1'), ctx, `StepList: every item lit and line fully drawn after scrolling (${rb.progress})`);
    ok(rb.spine <= 1, ctx, `StepList: spine centred on the markers (${rb.spine}px off)`);
    ok(rb.rules.every((r) => r.startsWith('1')), ctx, `StatRow: rules drawn (${rb.rules.slice(0, 2).join(' ')})`);
    if (reduce) {
      ok(!rb.animate, ctx, 'StepList: not rewound with reduced motion');
      ok(rb.rules.every((r) => r.endsWith('|0s')), ctx, 'StatRow: no rule transition with reduced motion');
      ok(['none', 'inset(0px)'].includes(rb.clip) && ['none', '1', '1 1'].includes(rb.imgScale), ctx, `MediaSplit: photo unclipped and unscaled (${rb.clip}, ${rb.imgScale})`);
    } else {
      ok(rb.clip === 'inset(0px)', ctx, `MediaSplit: photo fully unveiled (${rb.clip})`);
    }
    // round 3: draw lines, Statement words, CTA frame, DownloadCards drop, NewsList preview
    const r3 = await p.evaluate(() => {
      const draws = [...document.querySelectorAll('.draw-x, .draw-y')].filter((e) => matchMedia('(prefers-reduced-motion: reduce)').matches || e.closest('.is-visible') || e.classList.contains('is-visible')).map((e) => getComputedStyle(e).scale);
      const words = [...document.querySelectorAll('[data-statement] .statement-word')].map((w) => +getComputedStyle(w).opacity);
      const frames = [...document.querySelectorAll('.frame-ring')].map((f) => getComputedStyle(f).getPropertyValue('--frame').trim());
      const stmtText = document.querySelector('[data-statement]').textContent.replace(/\s+/g, ' ').trim();
      return { draws, minWord: Math.min(...words), frames, stmtText };
    });
    ok(r3.draws.length > 0 && r3.draws.every((v) => v === '1' || v === '1 1'), ctx, `rules drawn after reveal (${r3.draws.length}, ${[...new Set(r3.draws)].join('/')})`);
    ok(r3.minWord > 0.99, ctx, `Statement: every word lit after scrolling through (min ${r3.minWord.toFixed(2)})`);
    ok(r3.stmtText.startsWith('Consumer Choice Canada helps Canadians make'), ctx, 'Statement: read as one sentence');
    ok(r3.frames.every((f) => parseFloat(f) >= 355), ctx, `CtaBand: frames drawn (${r3.frames.join(', ')})`);
    const card = p.locator('.dl-card').first(); await card.scrollIntoViewIfNeeded(); await card.hover(); await p.waitForTimeout(150);
    const drop = await card.evaluate((c) => getComputedStyle(c.querySelector('.dl-arrow')).animationName);
    ok(reduce ? drop === 'none' : drop !== 'none', ctx, `DownloadCards: arrow ${reduce ? 'still' : 'drops'} on hover (${drop})`);
    const rowEl = p.locator('[data-news-index]').first(); await rowEl.scrollIntoViewIfNeeded(); await p.waitForTimeout(200); const rb2 = await rowEl.boundingBox();
    await p.mouse.move(rb2.x + 300, rb2.y + rb2.height / 2); await p.mouse.move(rb2.x + 320, rb2.y + rb2.height / 2 + 2); await p.waitForTimeout(500);
    const prev = await p.evaluate(() => { const pv = document.querySelector('[data-news-preview]'); return pv ? { on: pv.hasAttribute('data-on'), hidden: pv.classList.contains('hidden'), img: pv.querySelectorAll('[data-on]').length } : null; });
    ok(reduce ? (!prev || prev.hidden || !prev.on) : (prev && prev.on && prev.img === 1), ctx, `NewsList: cursor preview ${reduce ? 'off' : 'shows the row photo'} (${JSON.stringify(prev)})`);
    await p.mouse.move(2, 2);
    // whole-row news link: clicking the row's empty area follows the headline link
    const row = p.locator('ul li article').filter({ hasText: 'News headline two' }).first();
    await row.scrollIntoViewIfNeeded(); await p.waitForTimeout(200);
    const box = await row.boundingBox(); await p.mouse.click(box.x + box.width - 60, box.y + box.height / 2); await p.waitForURL('**/media', { timeout: 4000 }).catch(() => {});
    const went = new URL(p.url()).pathname === '/media';
    ok(went, ctx, 'news row is clickable as a whole'); if (went) { await p.goBack({ waitUntil: 'networkidle' }); await p.waitForTimeout(500); }
    // reduced motion: reveals shown without movement
    if (reduce) { const rv = await p.evaluate(() => { const cs = getComputedStyle(document.querySelector('dl .has-anim')); return { op: cs.opacity, tr: cs.transform }; }); ok(rv.op === '1' && rv.tr === 'none', ctx, `reveals static (${JSON.stringify(rv)})`); }
    // axe
    await p.addScriptTag({ content: axe });
    const v = await p.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] })).violations.map((x) => `${x.id}(${x.nodes.length}): ${x.nodes[0].target}`));
    ok(v.length === 0, ctx, `axe: ${v.join(' | ') || 'none'}`);
    ok(errs.length === 0, ctx, `console errors: ${errs.join(' | ') || 'none'}`);
    await p.close();
  }
  // no JavaScript: every panel shown under its label, tab list hidden
  const ctxNoJs = await b.newContext({ javaScriptEnabled: false }); const q = await ctxNoJs.newPage(); await q.goto(url);
  const nj = await q.evaluate(() => { const r = document.querySelector('[data-tabs]'); return { list: r.querySelector('[role=tablist]').hidden, panels: [...r.querySelectorAll('[data-tab-panel]')].every((x) => !x.hidden), labels: [...r.querySelectorAll('[data-tab-fallback]')].every((x) => !x.hidden) }; });
  ok(nj.list && nj.panels && nj.labels, 'no-JS', `all panels shown with their labels, tab list hidden (${JSON.stringify(nj)})`);
  const njs = await q.evaluate(() => [...document.querySelectorAll('[data-steplist] .steplist-item')].every((li) => li.hasAttribute('data-active')));
  ok(njs, 'no-JS', 'StepList: every item shown (finished state in the markup)');
  await b.close();
  console.log(`\n${results.length} checks, ${results.filter((r) => !r).length} failures`);
})();
