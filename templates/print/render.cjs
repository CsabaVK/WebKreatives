#!/usr/bin/env node
/*
 * Render a client sticker from a spec.
 *
 *   node templates/print/render.cjs specs/<client>.json out/
 *
 * Steps: build the QR (qr.py), fill sticker.html from the spec, screenshot at
 * 1120 px (56 mm with bleed), write a trimmed preview, run check.py. Output:
 *   out/<slug>-sticker.png      print file, bleed included
 *   out/<slug>-preview.png      trimmed, die-cut corners, on a neutral ground
 *   out/<slug>-qr.svg           the code on its own
 */
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');
const puppeteer = require(path.join(__dirname, '..', '..', 'node_modules', 'puppeteer-core'));

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const HERE = __dirname;
const fileUrl = p => 'file:///' + path.resolve(p).replace(/\\/g, '/');

(async () => {
  const [specPath, outDir] = process.argv.slice(2);
  if (!specPath || !outDir) { console.error('usage: node templates/print/render.cjs spec.json out/'); process.exit(1); }
  const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
  const slug = spec.slug || path.basename(specPath, '.json');
  fs.mkdirSync(outDir, { recursive: true });

  // 1. QR
  const qrSvg = path.join(outDir, `${slug}-qr.svg`);
  const q = spec.qr || {};
  execFileSync('python', [path.join(HERE, 'qr.py'), spec.url, qrSvg,
    '--modules', q.modules || spec.colors.type,
    '--eye', q.eye || '',
    '--accents', (q.accents || []).join(','),
    '--style', q.style || 'dots',
    '--clear', String(q.badge === false ? 0 : 9)], { stdio: 'inherit' });

  // 2. Page
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1120, height: 1120, deviceScaleFactor: 1 });
  await page.goto(fileUrl(path.join(HERE, 'sticker.html')), { waitUntil: 'load' });

  if (spec.fontsUrl) {
    await page.addStyleTag({ url: spec.fontsUrl });
  }
  const logoUrl = spec.logo ? fileUrl(path.resolve(path.dirname(specPath), spec.logo)) : null;
  await page.evaluate((spec, logoUrl, qrUrl) => {
    const ab = document.getElementById('ab');
    const c = spec.colors, f = spec.fonts || {};
    const vars = {
      '--ground': c.ground, '--type': c.type, '--type-mute': c.typeMute || c.type, '--accent': c.accent,
      '--display': f.display || "'Unbounded',system-ui,sans-serif",
      '--body': f.body || "'Figtree',system-ui,sans-serif",
      '--bar1': (spec.badge && spec.badge.bars && spec.badge.bars[0]) || c.accent,
      '--bar2': (spec.badge && spec.badge.bars && spec.badge.bars[1]) || c.type,
    };
    (spec.marks || []).forEach((m, i) => { vars['--m' + (i + 1)] = m; });
    for (const [k, v] of Object.entries(vars)) ab.style.setProperty(k, v);

    const set = (slot, text) => { const el = ab.querySelector(`[data-slot="${slot}"]`); if (el && text != null) el.textContent = text; };
    set('eyebrow', spec.eyebrow);
    set('url', spec.urlText || spec.url.replace(/^https?:\/\//, '').replace(/\/.*$/, ''));
    const logo = ab.querySelector('[data-slot="logo"]');
    const wm = ab.querySelector('[data-slot="wordmark"]');
    if (logoUrl) { logo.src = logoUrl; if (spec.logoHeight) logo.style.height = spec.logoHeight + 'px'; wm.hidden = true; }
    else { logo.remove(); wm.hidden = false; wm.textContent = spec.name; }
    ab.querySelector('[data-slot="qr"]').src = qrUrl;
    const badge = ab.querySelector('.badge');
    if (spec.badge === false) badge.remove(); else set('badge', (spec.badge && spec.badge.letter) || spec.name[0]);
    const marks = ab.querySelector('[data-slot="marks"]');
    if (!spec.marks || !spec.marks.length) marks.hidden = true;
    else if (spec.markShapes) marks.dataset.shapes = spec.markShapes;
  }, spec, logoUrl, fileUrl(qrSvg));

  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => Promise.all(Array.from(document.images).filter(i => !i.complete).map(i => new Promise(r => { i.onload = i.onerror = r; }))));
  // A text wordmark shrinks until it sits on one line, so it never meets the QR.
  await page.evaluate(() => {
    const wm = document.querySelector('[data-slot="wordmark"]');
    if (!wm || wm.hidden) return;
    let size = 64;
    wm.style.whiteSpace = 'nowrap';
    while (wm.scrollWidth > 700 && size > 34) { size -= 2; wm.style.fontSize = size + 'px'; }
  });
  await new Promise(r => setTimeout(r, 300));

  const png = path.join(outDir, `${slug}-sticker.png`);
  await (await page.$('#ab')).screenshot({ path: png });
  await browser.close();

  // 3. Preview + proof
  execFileSync('python', ['-c', `
from PIL import Image, ImageDraw
im=Image.open(r'''${png}''').convert('RGBA'); t=im.crop((60,60,1060,1060))
m=Image.new('L',t.size,0); ImageDraw.Draw(m).rounded_rectangle((0,0,999,999),radius=60,fill=255)
bg=Image.new('RGBA',(1160,1160),(214,206,196,255)); bg.paste(t,(80,80),m)
bg.convert('RGB').resize((580,580),Image.LANCZOS).save(r'''${path.join(outDir, `${slug}-preview.png`)}''')`], { stdio: 'inherit' });
  try {
    execFileSync('python', [path.join(HERE, 'check.py'), png, spec.url], { stdio: 'inherit' });
  } catch (e) {
    console.error('QR proof failed: do not print this file.');
    process.exit(2);
  }
  console.log(png);
})();
