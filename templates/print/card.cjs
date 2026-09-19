#!/usr/bin/env node
/*
 * Render a client business card (85 x 55 mm, two sides) from a spec.
 *
 *   node templates/print/card.cjs specs/<client>.json out/ [--ref WK-ABCD]
 *
 * Steps: build the QR for the card's URL (qr.py, the sticker's styling),
 * fill card.html from the spec, screenshot both sides at 1820 x 1220 px
 * (91 x 61 mm with bleed), write a stacked preview, run check.py on the code.
 * Output:
 *   out/<slug>-card-front.png   print file, bleed included
 *   out/<slug>-card-back.png    print file, bleed included
 *   out/<slug>-card-preview.png both sides trimmed, on a neutral ground
 *   out/<slug>-card-qr.svg      the code on its own
 *   out/<slug>-card-code.png    the code with its quiet zone, what check.py reads
 *
 * The spec's `card` block (all optional, defaults in brackets):
 *   url        what the code carries [spec.url]
 *   ground     card ground, when it differs from the sticker's [colors.ground]
 *   eyebrow    front eyebrow [spec.eyebrow]
 *   logoHeight front wordmark height in px, 20 px per mm [300]
 *   person     { eyebrow: "Co-Founder", name: "First *Last*" } — the starred word
 *              takes the accent; leave person out for the domain in display type
 *   services   [ "Web Design", "*Hosting*", "Support" ], one line, points between,
 *              starred words in the accent
 *   lines      [ "hello@client.nl", "client.nl", "+31 6 ..." ], the contact lines
 *   qr         { eye, accents[] } overrides for the card's code [spec.qr]
 *   radius     die-cut corner radius in mm for the preview [0, square corners]
 */
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');
const puppeteer = require(path.join(__dirname, '..', '..', 'node_modules', 'puppeteer-core'));

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const HERE = __dirname;
const fileUrl = p => 'file:///' + path.resolve(p).replace(/\\/g, '/');

(async () => {
  const [specPath, outDir, flag, refCode] = process.argv.slice(2);
  if (!specPath || !outDir) { console.error('usage: node templates/print/card.cjs spec.json out/'); process.exit(1); }
  const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
  const card = spec.card || {};
  let slug = spec.slug || path.basename(specPath, '.json');
  /* --ref WK-ABCD: a referral card. The code goes to /qr/?ref=, is printed
     as the last contact line, and names the output files. */
  if (flag === '--ref') {
    if (!/^WK-[A-HJ-NP-Z2-9]{4}$/.test(refCode || '')) { console.error('--ref needs a code like WK-ABCD'); process.exit(1); }
    card.url = 'https://webkreatives.com/qr/?ref=' + refCode;
    card.lines = (card.lines || []).concat(['Code *' + refCode + '*']);
    slug += '-ref-' + refCode;
  }
  fs.mkdirSync(outDir, { recursive: true });

  // 1. QR, same polarity and styling as the sticker
  const url = card.url || spec.url;
  const ground = card.ground || spec.colors.ground;
  const q = Object.assign({}, spec.qr || {}, card.qr || {});
  const qrSvg = path.join(outDir, `${slug}-card-qr.svg`);
  execFileSync('python', [path.join(HERE, 'qr.py'), url, qrSvg,
    '--modules', q.modules || spec.colors.type,
    '--eye', q.eye || '',
    '--accents', (q.accents || []).join(','),
    '--style', q.style || 'dots',
    '--clear', String(spec.badge === false ? 0 : 9)], { stdio: 'inherit' });

  // 2. Page
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1820, height: 2480, deviceScaleFactor: 1 });
  await page.goto(fileUrl(path.join(HERE, 'card.html')), { waitUntil: 'load' });
  if (spec.fontsUrl) await page.addStyleTag({ url: spec.fontsUrl });

  const logoUrl = spec.logo ? fileUrl(path.resolve(path.dirname(specPath), spec.logo)) : null;
  await page.evaluate((spec, card, logoUrl, qrUrl, ground) => {
    const c = spec.colors, f = spec.fonts || {};
    const vars = {
      '--ground': ground, '--type': c.type, '--accent': c.accent,
      '--display': f.display || "'Unbounded',system-ui,sans-serif",
      '--body': f.body || "'Figtree',system-ui,sans-serif",
      '--bar1': (spec.badge && spec.badge.bars && spec.badge.bars[0]) || c.accent,
      '--bar2': (spec.badge && spec.badge.bars && spec.badge.bars[1]) || c.type,
    };
    (spec.marks || []).forEach((m, i) => { vars['--m' + (i + 1)] = m; });
    for (const side of document.querySelectorAll('.side')) for (const [k, v] of Object.entries(vars)) side.style.setProperty(k, v);

    const set = (slot, text) => { const el = document.querySelector(`[data-slot="${slot}"]`); if (el && text != null) el.textContent = text; };
    const bare = spec.urlText || (card.url || spec.url).replace(/^https?:\/\//, '').replace(/\/.*$/, '');

    // front
    set('eyebrow', card.eyebrow || spec.eyebrow);
    const logo = document.querySelector('[data-slot="logo"]');
    const wm = document.querySelector('[data-slot="wordmark"]');
    if (logoUrl) { logo.src = logoUrl; logo.style.height = (card.logoHeight || 300) + 'px'; wm.hidden = true; }
    else { logo.remove(); wm.hidden = false; wm.textContent = spec.name; }
    const marks = document.querySelector('[data-slot="marks"]');
    if (!spec.marks || !spec.marks.length) marks.hidden = true;
    else if (spec.markShapes) marks.dataset.shapes = spec.markShapes;

    // back: the person, or the domain in display type when there is none
    const name = document.querySelector('[data-slot="name"]');
    const pe = document.querySelector('[data-slot="person-eyebrow"]');
    if (card.person && card.person.name) {
      if (card.person.eyebrow) pe.textContent = card.person.eyebrow; else pe.hidden = true;
      name.innerHTML = card.person.name.replace(/[&<>]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[ch]))
        .replace(/\*([^*]+)\*/, '<em>$1</em>');
    } else {
      pe.hidden = true;
      name.textContent = bare;
    }
    const lines = document.querySelector('[data-slot="lines"]');
    if (!card.lines || !card.lines.length) lines.hidden = true;
    else for (const text of card.lines) {
      /* "Code *WK-ABCD*": the starred part takes the accent, like services */
      const li = document.createElement('li');
      const m = /^(.*?)\*(.+)\*(.*)$/.exec(text);
      if (m) { li.append(m[1]); const em = document.createElement('em'); em.textContent = m[2]; li.append(em, m[3]); }
      else li.textContent = text;
      lines.append(li);
    }
    const services = document.querySelector('[data-slot="services"]');
    if (!card.services || !card.services.length) services.hidden = true;
    else card.services.forEach((text, i) => {
      if (i) { const dot = document.createElement('i'); dot.textContent = '\u00b7'; services.append(dot); }
      const m = /^\*(.+)\*$/.exec(text);
      const el = document.createElement(m ? 'em' : 'span'); el.textContent = m ? m[1] : text; services.append(el);
    });
    document.querySelector('[data-slot="qr"]').src = qrUrl;
    const badge = document.querySelector('.badge');
    if (spec.badge === false) badge.remove(); else set('badge', (spec.badge && spec.badge.letter) || spec.name[0]);
  }, spec, card, logoUrl, fileUrl(qrSvg), ground);

  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => Promise.all(Array.from(document.images).filter(i => !i.complete).map(i => new Promise(r => { i.onload = i.onerror = r; }))));
  // Display lines shrink until they fit their column.
  await page.evaluate(() => {
    for (const [sel, max, min] of [['[data-slot="wordmark"]', 1200, 60], ['[data-slot="name"]', 1000, 44], ['[data-slot="services"]', 1540, 24]]) {
      const el = document.querySelector(sel);
      if (!el || el.hidden) continue;
      let size = parseFloat(getComputedStyle(el).fontSize);
      while (el.scrollWidth > max && size > min) { size -= 2; el.style.fontSize = size + 'px'; }
    }
  });
  await new Promise(r => setTimeout(r, 300));

  const front = path.join(outDir, `${slug}-card-front.png`);
  const back = path.join(outDir, `${slug}-card-back.png`);
  const code = path.join(outDir, `${slug}-card-code.png`);
  await (await page.$('#front')).screenshot({ path: front });
  await (await page.$('#back')).screenshot({ path: back });
  // the code with 80 px of ground around it: the quiet zone a scanner expects
  const box = await (await page.$('#qr')).boundingBox();
  await page.screenshot({ path: code, clip: { x: box.x - 80, y: box.y - 80, width: box.width + 160, height: box.height + 160 } });
  await browser.close();

  // 3. Preview + proof
  const radius = Math.round((card.radius || 0) * 20);
  execFileSync('python', ['-c', `
from PIL import Image, ImageDraw
sides=[Image.open(p).convert('RGBA').crop((60,60,1760,1160)) for p in (r'''${front}''', r'''${back}''')]
m=Image.new('L',(1700,1100),0); ImageDraw.Draw(m).rounded_rectangle((0,0,1699,1099),radius=${radius},fill=255)
bg=Image.new('RGBA',(1860,2440),(214,206,196,255))
for i,s in enumerate(sides): bg.paste(s,(80,80+i*1180),m)
bg.convert('RGB').resize((930,1220),Image.LANCZOS).save(r'''${path.join(outDir, `${slug}-card-preview.png`)}''')`], { stdio: 'inherit' });
  try {
    execFileSync('python', [path.join(HERE, 'check.py'), code, url], { stdio: 'inherit' });
  } catch (e) {
    console.error('QR proof failed: do not print this file.');
    process.exit(2);
  }
  console.log(front); console.log(back);
})();
