#!/usr/bin/env node
/* Client documents: the onboarding PDF and the agreement.

   Onboarding is one template, two outputs: a PDF where every page is
   emitted and the language and provider choices are links between pages
   (so they work in any viewer, phones included), and an HTML file that is
   the same document as one interactive page. The agreement is one language
   per build, paper-coloured for signing, with the general terms from
   /terms attached as Annex A so they cannot drift from the site.

   Usage:
     node templates/universal/onboarding/build.cjs \
       --company "Autodistrict" --contact "Jan de Vries" --domain autodistrict.nl \
       [--doc onboarding|contract|all]   default all
       [--lang en|nl]                    contract language; onboarding opens in it
       [--plan basic|plus|growth]        default plus; sets the monthly price and term
       [--start 2026-09-15] [--price "€ 890"] [--hosting "€ 55"]
       [--scope-en "..."] [--scope-nl "..."]
       [--form https://forms.gle/...] [--booking https://cal.com/...]
       [--address "Street 1, 2500 AA Den Haag"] [--kvk 12345678] [--client-email jan@...]
       [--provider hostinger] [--out tools/onboarding/out]

   The provider is looked up from the domain's nameservers when not given.
   Everything lands in <out>/<slug>/.                                       */
'use strict';
const fs = require('fs'), path = require('path'), dns = require('dns').promises;

const ROOT = path.resolve(__dirname, '..', '..', '..');
const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a.startsWith('--')) { const k = a.slice(2); const v = process.argv[i + 1]; if (v !== undefined && !v.startsWith('--')) { args[k] = v; i++; } else args[k] = true; }
}
const need = k => { if (!args[k]) { console.error('missing --' + k); process.exit(1); } return args[k]; };

const company = need('company');
const domain  = (args.domain || '').replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/^www\./, '');
const slug    = company.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const out     = path.resolve(ROOT, args.out || 'tools/onboarding/out', slug);
const lang    = args.lang === 'nl' ? 'nl' : 'en';
const doc     = args.doc || 'all';

/* ── the plans, as sold on /services/hosting ────────────────────────── */
const PLANS = {
  basic:  { en: 'Basic',  nl: 'Basis', price: '€ 25', term_en: '12 months', term_nl: '12 maanden', desc_en: 'for a site that rarely changes', desc_nl: 'voor een site die zelden verandert' },
  plus:   { en: 'Plus',   nl: 'Plus',  price: '€ 55', term_en: '6 months',  term_nl: '6 maanden',  desc_en: 'for a site that moves with the business', desc_nl: 'voor een site die meebeweegt met het bedrijf' },
  growth: { en: 'Growth', nl: 'Groei', price: '€ 89', term_en: '6 months',  term_nl: '6 maanden',  desc_en: 'for a business actively using the site to win work', desc_nl: 'voor een bedrijf dat de site actief inzet om werk binnen te halen' },
};
const plan = PLANS[(args.plan || 'plus').toLowerCase()] || PLANS.plus;

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
const NAMES = { hostinger: 'Hostinger', godaddy: 'GoDaddy', cloudflare: 'Cloudflare', wix: 'Wix', squarespace: 'Squarespace', transip: 'TransIP', namecheap: 'Namecheap', strato: 'Strato', one: 'One.com' };
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
const fmt = (d, l) => d.toLocaleDateString(l === 'nl' ? 'nl-NL' : 'en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
const long = (d, l) => d.toLocaleDateString(l === 'nl' ? 'nl-NL' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
const dates = { brief: plus(0), access: plus(3), preview: plus(10), feedback: plus(13), live: plus(17) };

/* ── the general terms, lifted from the live page ───────────────────── */
function termsHtml(l) {
  const src = fs.readFileSync(path.join(ROOT, 'terms', 'index.html'), 'utf8');
  const main = src.slice(src.indexOf('<section class="legal-main">'));
  const m = main.match(new RegExp('<div data-lang-block="' + l + '" class="legal-lang-block[^"]*">([\\s\\S]*?)\\n      </div>'));
  if (!m) throw new Error('terms block not found for ' + l);
  return m[1].replace(/\s(?:data-lang|data-lang-block)="[^"]*"/g, '').replace(/ style="display:none"/g, '').replace(/ id="[^"]*"/g, '');
}

(async () => {
  const provider = await detect();
  const pdfProvider = PAGES.includes(provider) ? provider : (provider === 'unknown' ? 'unknown' : 'other');
  const our_email = args.email || 'info@webkreatives.com';
  const v = {
    company, contact: args.contact || '', domain: domain || '—', company_q: encodeURIComponent(company),
    price: args.price || '€ —', hosting: args.hosting || plan.price,
    plan_name: plan[lang], plan_term_en: plan.term_en, plan_term_nl: plan.term_nl,
    scope_en: args['scope-en'] || 'A custom site built to fit the business, delivered in days to weeks, everything in your name.',
    scope_nl: args['scope-nl'] || 'Een site op maat van het bedrijf, opgeleverd in dagen tot weken, alles op jouw naam.',
    form_url: args.form || 'https://webkreatives.com/contact/',
    booking_url: args.booking || 'mailto:' + our_email + '?subject=' + encodeURIComponent('15 minutes for domain access · ' + company),
    our_email, our_name: args.name || 'Csaba', our_phone: args.phone || '',
    provider: pdfProvider, provider_name: NAMES[pdfProvider] || '',
    lang, date_long_en: long(new Date(), 'en'),
  };
  for (const [k, d] of Object.entries(dates)) { v['d_' + k + '_en'] = fmt(d, 'en'); v['d_' + k + '_nl'] = fmt(d, 'nl'); }

  const fill = (tpl, extra) => {
    const vars = Object.assign({}, v, extra || {});
    let s = tpl;
    if (!vars.our_phone) s = s.replace(/ · \{\{our_phone\}\}/g, '');
    return s.replace(/\{\{(\w+)\}\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m));
  };

  fs.mkdirSync(out, { recursive: true });
  const puppeteer = require(path.join(ROOT, 'node_modules', 'puppeteer-core'));
  const chrome = process.env.CHROME_PATH || ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome'].find(p => fs.existsSync(p));
  if (!chrome) { console.error('Chrome not found; set CHROME_PATH'); process.exit(1); }
  const browser = await puppeteer.launch({ executablePath: chrome, headless: 'new' });
  async function toPdf(html, file) {
    const src = path.join(out, '_print.html'); fs.writeFileSync(src, html);
    const page = await browser.newPage();
    await page.goto('file:///' + src.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    const p = path.join(out, file);
    await page.pdf({ path: p, format: 'A4', printBackground: true, preferCSSPageSize: true });
    await page.close(); fs.unlinkSync(src);
    return p;
  }

  console.log('company   ', company, '·', domain || '—');
  console.log('provider  ', provider + (args.provider ? ' (given)' : ' (from nameservers)'));
  console.log('plan      ', plan.en, plan.price + '/month, min.', plan.term_en);

  /* ── onboarding ──────────────────────────────────────────────────── */
  if (doc === 'all' || doc === 'onboarding') {
    const tpl = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
    const render = mode => {
      let s = fill(tpl, { mode });
      if (!v.provider_name) s = s.replace(/<p class="prov-hint"[^>]*>.*?<\/p>\n/g, '');
      else s = s.replace(new RegExp('data-p="' + pdfProvider + '"', 'g'), 'data-p="' + pdfProvider + '" data-tag="✓"')
                .replace(/(<(?:a|button)[^>]*data-tag="✓"[^>]*?)(?: class="([^"]*)")?>/g, (m, head, cls) => head + ' class="is-detected' + (cls ? ' ' + cls : '') + '">');
      return s;
    };
    fs.writeFileSync(path.join(out, 'index.html'), render('web'));
    const p = await toPdf(render('pdf'), 'onboarding-' + slug + '.pdf');
    console.log('dates     ', Object.entries(dates).map(([k, d]) => k + ' ' + fmt(d, 'en')).join(' · '));
    console.log('onboarding', p, Math.round(fs.statSync(p).size / 1024) + ' KB', '+ index.html');
  }

  /* ── agreement ───────────────────────────────────────────────────── */
  if (doc === 'all' || doc === 'contract') {
    let tpl = fs.readFileSync(path.join(__dirname, 'contract.html'), 'utf8');
    // keep the chosen language only
    const other = lang === 'nl' ? 'en' : 'nl';
    tpl = tpl.replace(new RegExp('<div data-lang="' + other + '">[\\s\\S]*?</div>\\n\\n<!--'), '<!--').replace(new RegExp('<div data-lang="' + other + '">[\\s\\S]*?</div>\\n\\n</body>'), '</body>');
    const kvk = args.kvk ? (lang === 'nl' ? 'KVK ' : 'Chamber of Commerce (KVK) ') + args.kvk + '<br>' : '';
    const html = fill(tpl, {
      doc_title: lang === 'nl' ? 'Overeenkomst' : 'Agreement',
      date_long: long(new Date(), lang),
      scope: lang === 'nl' ? v.scope_nl : v.scope_en,
      plan_desc: lang === 'nl' ? plan.desc_nl : plan.desc_en,
      plan_term: lang === 'nl' ? plan.term_nl : plan.term_en,
      client_address: args.address || (lang === 'nl' ? 'Adres: ____________________' : 'Address: ____________________'),
      client_city: args.city || (args.address ? args.address.split(',').pop().trim().replace(/^\d{4}\s?[A-Z]{2}\s*/, '') : ''),
      client_kvk: kvk, client_email: args['client-email'] || '',
      terms_html: termsHtml(lang),
    });
    const p = await toPdf(html, 'agreement-' + slug + '-' + lang + '.pdf');
    console.log('agreement ', p, Math.round(fs.statSync(p).size / 1024) + ' KB', '(' + lang + ')');
  }

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
