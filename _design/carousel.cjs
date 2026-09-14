#!/usr/bin/env node
/*
 * Render a five-slide carousel (hook, pain, steps, proof, join) from a JSON spec.
 *
 *   node _design/carousel.cjs spec.json out/
 *
 * Writes out/01-hook.png … out/05-join.png at 1200×1500 and out/carousel.pdf
 * (five pages, same size) for LinkedIn's document post. See
 * _design/carousel-example.json for the spec shape; "*word*" marks the accent.
 */
const path = require('path');
const fs = require('fs');
const puppeteer = require(path.join(__dirname, '..', 'node_modules', 'puppeteer-core'));

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PAGE = 'file:///' + path.join(__dirname, 'index.html').replace(/\\/g, '/') + '?render=1';
const SLIDES = [
  ['car-hook', '01-hook'],
  ['car-pain', '02-pain'],
  ['car-steps', '03-steps'],
  ['car-proof', '04-proof'],
  ['car-cta', '05-join'],
];

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const accent = s => esc(s).replace(/\*([^*]+)\*/g, '<em>$1</em>');

(async () => {
  const [specPath, outDir] = process.argv.slice(2);
  if (!specPath || !outDir) { console.error('usage: node _design/carousel.cjs spec.json out/'); process.exit(1); }
  const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
  fs.mkdirSync(outDir, { recursive: true });

  // Pre-render the slot HTML so the page script only assigns strings.
  const slots = {
    'car-hook':  { eyebrow: spec.hook.eyebrow, headline: accent(spec.hook.word), lede: spec.hook.sub, mark: spec.hook.mark },
    'car-pain':  { eyebrow: spec.pain.eyebrow, headline: accent(spec.pain.headline), list: spec.pain.items.map(i => `<li>${esc(i)}</li>`).join('') },
    'car-steps': { eyebrow: spec.steps.eyebrow, headline: accent(spec.steps.headline), list: spec.steps.items.map(i => `<li>${esc(i)}</li>`).join(''), mark: spec.steps.mark },
    'car-proof': { eyebrow: spec.proof.eyebrow, headline: accent(spec.proof.headline), list: spec.proof.items.map(i => `<li>${esc(i)}</li>`).join(''), mark: spec.proof.mark },
    'car-cta':   { eyebrow: spec.cta.eyebrow, headline: accent(spec.cta.headline), lede: spec.cta.body, url: spec.cta.url || 'webkreatives.com' },
  };

  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1500, deviceScaleFactor: 1 });
  await page.goto(PAGE, { waitUntil: 'networkidle0', timeout: 60000 });

  await page.evaluate((slots, order) => {
    for (const [tpl] of order) {
      const ab = document.querySelector(`[data-tpl="${tpl}"]`);
      const o = slots[tpl];
      const set = (slot, html, asHtml) => {
        const el = ab.querySelector(`[data-slot="${slot}"]`);
        if (!el || html == null) return;
        if (asHtml) el.innerHTML = html; else el.textContent = html;
      };
      set('eyebrow', o.eyebrow);
      set('headline', o.headline, true);
      set('lede', o.lede);
      set('list', o.list, true);
      set('url', o.url);
      if (o.mark) ab.dataset.mark = o.mark;
      ab.classList.add('ab-print');
      document.body.appendChild(ab);
    }
    document.body.classList.add('is-print');
  }, slots, SLIDES);

  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => Promise.all(Array.from(document.images).filter(i => !i.complete).map(i => new Promise(r => { i.onload = i.onerror = r; }))));
  await page.evaluate(() => window.fitHeroes());
  await new Promise(r => setTimeout(r, 300));

  const pngs = [];
  for (const [tpl, name] of SLIDES) {
    const el = await page.$(`[data-tpl="${tpl}"]`);
    const file = path.join(outDir, name + '.png');
    await el.screenshot({ path: file });
    pngs.push(file);
  }

  // The PDF is built from the PNGs, not from the live DOM: the grain filter
  // rasterises to tens of megabytes when Chrome prints it directly.
  const imgs = pngs.map(f => `<img src="data:image/png;base64,${fs.readFileSync(f).toString('base64')}">`).join('');
  await page.setContent(`<style>@page{size:1200px 1500px;margin:0}html,body{margin:0}img{display:block;width:1200px;height:1500px;page-break-after:always}img:last-child{page-break-after:auto}</style>${imgs}`);
  await page.pdf({ path: path.join(outDir, 'carousel.pdf'), width: '1200px', height: '1500px', printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await browser.close();
  console.log(path.join(outDir, 'carousel.pdf'));
})();
