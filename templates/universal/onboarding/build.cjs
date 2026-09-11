#!/usr/bin/env node
/* Onboarding document for a new client.

   One template, two outputs: a PDF where every page is emitted and the
   language and provider choices are links between pages (so they work in
   any PDF viewer, including phones), and an HTML file that is the same
   document as one interactive page.

   Usage:
     node templates/universal/onboarding/build.cjs \
       --company "Autodistrict" --contact "Jan" --domain autodistrict.nl \
       [--start 2026-09-15] [--price "€ 890"] [--hosting "€ 25"] \
       [--scope-en "One-page site, six sections"] [--scope-nl "..."] \
       [--form https://forms.gle/...] [--booking https://cal.com/...] \
       [--provider hostinger] [--lang nl] [--out tools/onboarding/out]

   The provider is looked up from the domain's nameservers when not given.
   Everything lands in <out>/<slug>/: index.html (interactive) and
   onboarding-<slug>.pdf.                                                  */
'use strict';
const fs = require('fs'), path = require('path'), dns = require('dns').promises;

const ROOT = path.resolve(__dirname, '..', '..', '..');
const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a.startsWith('--')) { const k = a.slice(2); const v = process.argv[i + 1]; if (v && !v.startsWith('--')) { args[k] = v; i++; } else args[k] = true; }
}
const need = k => { if (!args[k]) { console.error('missing --' + k); process.exit(1); } return args[k]; };

const company = need('company');
const domain  = (args.domain || '').replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/^www\./, '');
const slug    = company.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const out     = path.resolve(ROOT, args.out || 'tools/onboarding/out', slug);

/* ── who the domain is with ─────────────────────────────────────────── */
const NS = [
  ['hostinger',   /dns-parking\.com|hostinger/i],
  ['godaddy',     /domaincontrol\.com|godaddy/i],
  ['cloudflare',  /cloudflare\.com/i],
  ['wix',         /wixdns\.net/i],
  ['squarespace', /squarespacedns\.com|googledomains\.com/i],
  ['transip',     /transip\.(nl|net|eu)/i],
  ['namecheap',   /registrar-servers\.com/i],
  ['strato',      /strato/i],
  ['one',         /one\.com/i],
];
const NAMES = { hostinger: 'Hostinger', godaddy: 'GoDaddy', cloudflare: 'Cloudflare', wix: 'Wix', squarespace: 'Squarespace', transip: 'TransIP', namecheap: 'Namecheap', strato: 'Strato', one: 'One.com', other: '', unknown: '' };
const PAGES = ['hostinger', 'godaddy', 'cloudflare', 'wix', 'squarespace', 'transip'];

async function detect() {
  if (args.provider) return args.provider;
  if (!domain) return 'unknown';
  try {
    const ns = (await dns.resolveNs(domain)).join(' ');
    for (const [k, re] of NS) if (re.test(ns)) return k;
    return 'unknown';
  } catch { return 'unknown'; }
}

/* ── dates ───────────────────────────────────────────────────────────── */
function nextMonday() { const d = new Date(); d.setDate(d.getDate() + ((8 - d.getDay()) % 7 || 7)); return d; }
const start = args.start ? new Date(args.start + 'T12:00:00') : nextMonday();
const plus = n => { const d = new Date(start); d.setDate(d.getDate() + n); return d; };
const fmt = (d, lang) => d.toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
const dates = { brief: plus(0), access: plus(3), preview: plus(10), feedback: plus(13), live: plus(17) };

(async () => {
  const provider = await detect();
  const pdfOnlyProvider = PAGES.includes(provider) ? provider : (provider === 'unknown' ? 'unknown' : 'other');
  const v = {
    company, contact: args.contact || '', domain: domain || '—', company_q: encodeURIComponent(company),
    price: args.price || '€ —', hosting: args.hosting || '€ 25',
    scope_en: args['scope-en'] || 'A custom site built to fit the business, delivered in days to weeks, everything in your name.',
    scope_nl: args['scope-nl'] || 'Een site op maat van het bedrijf, opgeleverd in dagen tot weken, alles op jouw naam.',
    form_url: args.form || 'https://webkreatives.com/contact/',
    booking_url: args.booking || 'mailto:' + (args.email || 'info@webkreatives.com') + '?subject=' + encodeURIComponent('15 minutes for domain access · ' + company),
    our_email: args.email || 'info@webkreatives.com', our_name: args.name || 'Csaba', our_phone: args.phone || '',
    provider: pdfOnlyProvider, provider_name: NAMES[pdfOnlyProvider] || '',
    lang: args.lang || 'en',
    date_long_en: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
  };
  for (const [k, d] of Object.entries(dates)) { v['d_' + k + '_en'] = fmt(d, 'en'); v['d_' + k + '_nl'] = fmt(d, 'nl'); }

  const tpl = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
  function render(mode) {
    let s = tpl;
    if (!v.our_phone) s = s.replace(/ · \{\{our_phone\}\}/g, '');
    s = s.replace(/\{\{(\w+)\}\}/g, (m, k) => (k === 'mode' ? mode : (v[k] !== undefined ? v[k] : m)));
    if (!v.provider_name) {
      s = s.replace(/<p class="prov-hint"[^>]*>.*?<\/p>\n/g, '');
    } else {
      /* the detected provider's button carries a tick */
      s = s.replace(new RegExp('data-p="' + pdfOnlyProvider + '"', 'g'), 'data-p="' + pdfOnlyProvider + '" data-tag="✓"')
           .replace(/(<(?:a|button)[^>]*data-tag="✓"[^>]*?)(?: class="([^"]*)")?>/g, (m, head, cls) => head + ' class="is-detected' + (cls ? ' ' + cls : '') + '">');
    }
    return s;
  }

  fs.mkdirSync(out, { recursive: true });
  const htmlWeb = render('web');
  const htmlPdf = render('pdf');
  fs.writeFileSync(path.join(out, 'index.html'), htmlWeb);
  const pdfSrc = path.join(out, '_print.html');
  fs.writeFileSync(pdfSrc, htmlPdf);

  const puppeteer = require(path.join(ROOT, 'node_modules', 'puppeteer-core'));
  const chrome = process.env.CHROME_PATH || ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome'].find(p => fs.existsSync(p));
  if (!chrome) { console.error('Chrome not found; set CHROME_PATH'); process.exit(1); }
  const browser = await puppeteer.launch({ executablePath: chrome, headless: 'new' });
  const page = await browser.newPage();
  await page.goto('file:///' + pdfSrc.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  const pdfPath = path.join(out, 'onboarding-' + slug + '.pdf');
  await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await browser.close();
  fs.unlinkSync(pdfSrc);

  console.log('company   ', company, '·', domain);
  console.log('provider  ', provider + (args.provider ? ' (given)' : ' (from nameservers)'));
  console.log('dates     ', Object.entries(dates).map(([k, d]) => k + ' ' + fmt(d, 'en')).join(' · '));
  console.log('pdf       ', pdfPath, Math.round(fs.statSync(pdfPath).size / 1024) + ' KB');
  console.log('web       ', path.join(out, 'index.html'));
})().catch(e => { console.error(e); process.exit(1); });
