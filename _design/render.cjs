#!/usr/bin/env node
/*
 * Render one social artboard from _design/index.html to a PNG.
 *
 *   node _design/render.cjs <template> <out.png> [--eyebrow "…"] [--headline "… *accent* …"]
 *        [--lede "…"] [--caption "…"] [--attr "…"] [--rows "Label|Value;Label|Value"]
 *        [--shot path/to/screenshot.webp] [--mark none|lime|blue|yellow] [--glow on|off]
 *
 * Templates: statement (main), ledger, showcase, paper, maxim, update.
 * The accent word in --headline is wrapped in *asterisks*. Output is native size
 * (1200×1500, 1200×1200 or 1200×627) at 1x, straight from headless Chrome.
 */
const path = require('path');
const fs = require('fs');
const puppeteer = require(path.join(__dirname, '..', 'node_modules', 'puppeteer-core'));

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PAGE = 'file:///' + path.join(__dirname, 'index.html').replace(/\\/g, '/') + '?render=1';

function parseArgs(argv) {
  const [template, out, ...rest] = argv;
  const opts = {};
  for (let i = 0; i < rest.length; i += 2) {
    const k = rest[i].replace(/^--/, '');
    opts[k] = rest[i + 1];
  }
  return { template, out, opts };
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function headlineHtml(s) {
  // "*word*" becomes <em>word</em>; everything else is escaped text.
  return esc(s).replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

(async () => {
  const { template, out, opts } = parseArgs(process.argv.slice(2));
  if (!template || !out) {
    console.error('usage: node _design/render.cjs <template> <out.png> [--field value] ...');
    process.exit(1);
  }
  const shot = opts.shot ? 'file:///' + path.resolve(opts.shot).replace(/\\/g, '/') : null;

  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1640, height: 1500, deviceScaleFactor: 1 });
  await page.goto(PAGE, { waitUntil: 'networkidle0', timeout: 60000 });

  const ok = await page.evaluate((tpl, o, hl, shotUrl) => {
    const ab = document.querySelector(`[data-tpl="${tpl}"]`);
    if (!ab) return false;
    const set = (slot, html, asHtml) => {
      const el = ab.querySelector(`[data-slot="${slot}"]`);
      if (!el || html == null) return;
      if (asHtml) el.innerHTML = html; else el.textContent = html;
    };
    set('eyebrow', o.eyebrow);
    set('headline', hl, true);
    set('lede', o.lede);
    set('caption', o.caption);
    set('attr', o.attr);
    if (o.rows) {
      const rows = o.rows.split(';').map(r => r.split('|'));
      set('rows', rows.map(([l, v]) => `<div class="ab-row"><b>${l}</b><span>${v}</span></div>`).join(''), true);
    }
    if (shotUrl) { const img = ab.querySelector('[data-slot="shot"]'); if (img) img.src = shotUrl; }
    if (o.mark) ab.dataset.mark = o.mark;
    if (o.glow === 'off') { const g = ab.querySelector('.ab-glow'); if (g) g.classList.add('ab-glow--off'); }
    if (o.glow === 'on') { const g = ab.querySelector('.ab-glow'); if (g) g.classList.remove('ab-glow--off'); }
    document.body.classList.add('is-render');
    ab.classList.add('ab-render');
    document.body.appendChild(ab);
    return true;
  }, template, opts, opts.headline ? headlineHtml(opts.headline) : null, shot);

  if (!ok) { console.error(`no artboard with data-tpl="${template}"`); await browser.close(); process.exit(1); }

  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => Promise.all(Array.from(document.images).filter(i => !i.complete).map(i => new Promise(r => { i.onload = i.onerror = r; }))));
  await new Promise(r => setTimeout(r, 300));

  const el = await page.$(`[data-tpl="${template}"]`);
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  await el.screenshot({ path: out });
  await browser.close();
  console.log(out);
})();
