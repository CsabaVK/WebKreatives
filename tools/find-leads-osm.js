/**
 * WebKreatives — OpenStreetMap Lead Finder
 * 100% FREE — no API key, no quota, no cost ever.
 * Finds Dutch small businesses and appends usable email leads to the local sheet.
 * Prefers businesses without a website, but will also use weak website-based leads when needed.
 *
 * Usage:  node tools/find-leads-osm.js
 * Usage:  node tools/find-leads-osm.js --category hairdresser --city Amsterdam --count 15
 *
 * Category values (OSM tags): hairdresser, bakery, butcher, florist, bicycle_repair,
 *   beauty, nail_salon, tattoo, laundry, dry_cleaning, music_shop, pet_shop, etc.
 */

const https  = require('https');
const path   = require('path');
const fs     = require('fs');
const ExcelJS = require('exceljs');

// ── Category map: Dutch name → OSM tag ────────────────────────────────────────
const CATEGORY_MAP = {
  kapsalon:         { tag: 'shop',    value: 'hairdresser'   },
  schoonheidssalon: { tag: 'shop',    value: 'beauty'        },
  nagelstudio:      { tag: 'shop',    value: 'nail_salon'    },
  tattooshop:       { tag: 'shop',    value: 'tattoo'        },
  fietsenwinkel:    { tag: 'shop',    value: 'bicycle'       },
  slager:           { tag: 'shop',    value: 'butcher'       },
  bakkerij:         { tag: 'shop',    value: 'bakery'        },
  bloemist:         { tag: 'shop',    value: 'florist'       },
  stomerij:         { tag: 'shop',    value: 'dry_cleaning'  },
  wasserette:       { tag: 'shop',    value: 'laundry'       },
  schoenmaker:      { tag: 'shop',    value: 'shoe_repair'   },
  muziekwinkel:     { tag: 'shop',    value: 'musical_instrument' },
  dierenwinkel:     { tag: 'shop',    value: 'pet'           },
  glazenwasser:     { tag: 'craft',   value: 'window_cleaning'},
  schildersbedrijf: { tag: 'craft',   value: 'painter'       },
  loodgieter:       { tag: 'craft',   value: 'plumber'       },
  elektricien:      { tag: 'craft',   value: 'electrician'   },
  klussenbedrijf:   { tag: 'craft',   value: 'carpenter'     },
  rijschool:        { tag: 'amenity', value: 'driving_school'},
  traiteur:         { tag: 'shop',    value: 'deli'          },
};

// ── Dutch city → OSM area name ─────────────────────────────────────────────────
const CITIES = [
  'Amsterdam', 'Rotterdam', 'Den Haag', 'Utrecht', 'Eindhoven',
  'Groningen', 'Tilburg', 'Almere', 'Breda', 'Nijmegen',
  'Haarlem', 'Arnhem', 'Zaandam', 'Amersfoort', 'Apeldoorn',
  'Enschede', 'Zwolle', 'Maastricht', 'Leiden', 'Dordrecht',
];

// ── Parse CLI args ─────────────────────────────────────────────────────────────
const args    = process.argv.slice(2);
const getArg  = (flag, def) => { const i = args.indexOf(flag); return i !== -1 && args[i+1] ? args[i+1] : def; };

const today     = new Date();
const categories = Object.keys(CATEGORY_MAP);
const dayIdx    = today.getDate() % categories.length;
const cityIdx   = Math.floor(today.getDate() / 2) % CITIES.length;

const CATEGORY_NL = getArg('--category', categories[dayIdx]);
const CITY        = getArg('--city', CITIES[cityIdx]);
const MAX_LEADS   = parseInt(getArg('--count', '40'));
const LEADS_FILE  = getArg('--output', path.join(__dirname, '..', 'leads', 'Leads.xlsx'));
const MAX_COMBOS  = parseInt(getArg('--max-combos', '30'));

console.log(`\n🗺  WebKreatives Lead Finder — OpenStreetMap + Website Email Extraction (Free)`);
console.log(`   Seed category : ${CATEGORY_NL}`);
console.log(`   Seed city     : ${CITY}`);
console.log(`   Target        : ${MAX_LEADS} usable email leads (prefer no website)`);
console.log(`   Max combos    : ${MAX_COMBOS}`);
console.log(`   Output        : ${LEADS_FILE}\n`);

// ── Overpass API query ─────────────────────────────────────────────────────────
function buildQuery(city, tag, value) {
  return `
[out:json][timeout:25];
area["name"="${city}"]["boundary"="administrative"]["admin_level"~"^(8|10)$"]->.searchArea;
(
  node["${tag}"="${value}"](area.searchArea);
  way["${tag}"="${value}"](area.searchArea);
  relation["${tag}"="${value}"](area.searchArea);
);
out body;
`.trim();
}

function queryOverpass(query) {
  return new Promise((resolve, reject) => {
    const body = `data=${encodeURIComponent(query)}`;
    const options = {
      hostname: 'overpass-api.de',
      path:     '/api/interpreter',
      method:   'POST',
      headers:  {
        'Content-Type':   'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body),
        'User-Agent':     'WebKreatives-LeadFinder/1.0'
      }
    };
    const req = https.request(options, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve(JSON.parse(d)); }
        catch(e) { reject(new Error('Invalid JSON: ' + d.substring(0, 200))); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ── Extract leads from OSM elements ───────────────────────────────────────────
function normalizeEmail(raw = '') {
  return String(raw || '').trim().toLowerCase().replace(/^mailto:/i, '');
}

function normalizeName(raw = '') {
  return String(raw || '').trim();
}

function normalizeWebsite(raw = '') {
  let url = String(raw || '').trim();
  if (!url) return '';
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  try {
    const parsed = new URL(url);
    parsed.hash = '';
    return parsed.toString().replace(/\/$/, '');
  } catch {
    return '';
  }
}

function buildAddress(tags = {}) {
  const street = String(tags['addr:street'] || '').trim();
  const housenr = String(tags['addr:housenr'] || '').trim();
  const postcode = String(tags['addr:postcode'] || '').trim();
  return [street, housenr, postcode].filter(Boolean).join(' ').trim();
}

function extractEmailsFromText(text = '') {
  const matches = String(text || '').match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || [];
  const blocked = ['example.com', 'email.com', 'domain.com', 'yourdomain', 'sentry.io'];
  return [...new Set(matches.map(normalizeEmail).filter(email => email.includes('@') && !blocked.some(part => email.includes(part))))];
}

function chooseBestEmail(emails = [], website = '') {
  if (!emails.length) return '';
  if (!website) return emails[0];
  try {
    const host = new URL(website).hostname.replace(/^www\./i, '').toLowerCase();
    const sameDomain = emails.find(email => email.endsWith(`@${host}`) || email.endsWith(`@${host.split('.').slice(-2).join('.')}`));
    return sameDomain || emails[0];
  } catch {
    return emails[0];
  }
}

async function fetchText(url, redirects = 0) {
  if (!url || redirects > 5) throw new Error('Too many redirects');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'manual',
      signal: controller.signal,
      headers: {
        'User-Agent': 'WebKreatives-LeadFinder/1.0',
        'Accept': 'text/html,application/xhtml+xml'
      }
    });
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location');
      if (location) return fetchText(new URL(location, url).toString(), redirects + 1);
    }
    const text = await res.text();
    return text.slice(0, 400000);
  } finally {
    clearTimeout(timer);
  }
}

const websiteEmailCache = new Map();

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let index = 0;
  const runners = Array.from({ length: Math.max(1, limit) }, async () => {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await worker(items[current], current);
    }
  });
  await Promise.all(runners);
  return results;
}

async function extractEmailFromWebsite(website = '') {
  const normalized = normalizeWebsite(website);
  if (!normalized) return { email: '', scanned: false };
  if (websiteEmailCache.has(normalized)) return websiteEmailCache.get(normalized);

  const result = { email: '', scanned: true };
  try {
    const homepage = await fetchText(normalized);
    const homepageEmails = extractEmailsFromText(homepage);
    if (homepageEmails.length) {
      result.email = chooseBestEmail(homepageEmails, normalized);
      websiteEmailCache.set(normalized, result);
      return result;
    }

    const paths = ['/contact', '/contact-us', '/over-ons', '/about', '/impressum'];
    for (const pathName of paths) {
      try {
        const html = await fetchText(`${normalized}${pathName}`);
        const emails = extractEmailsFromText(html);
        if (emails.length) {
          result.email = chooseBestEmail(emails, normalized);
          websiteEmailCache.set(normalized, result);
          return result;
        }
      } catch {}
    }
  } catch {}

  websiteEmailCache.set(normalized, result);
  return result;
}

async function extractLeads(elements, city, categoryName) {
  const mapped = await mapLimit(elements, 6, async (el) => {
    const tags = el.tags || {};
    const name = normalizeName(tags.name || tags['name:nl'] || '');
    if (!name || name.length < 2) return null;

    const phone = String(tags.phone || tags['contact:phone'] || tags['phone:nl'] || '').trim();
    const directEmail = normalizeEmail(tags.email || tags['contact:email'] || '');
    const website = normalizeWebsite(tags.website || tags['contact:website'] || tags.url || '');
    const hasWebsite = !!website;
    const websiteLookup = !directEmail && hasWebsite ? await extractEmailFromWebsite(website) : { email: '', scanned: false };
    const email = normalizeEmail(directEmail || websiteLookup.email || '');
    if (!email || !email.includes('@')) return null;

    const address = buildAddress(tags);
    const town = String(tags['addr:city'] || tags['addr:town'] || city || '').trim();
    const type = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    const sourceParts = [
      hasWebsite ? 'Website available' : 'Geen website',
      directEmail ? 'Email from OSM' : (websiteLookup.email ? 'Email from website' : 'No email source'),
      `OSM id:${el.id}`,
      'Source: OpenStreetMap',
      categoryName,
      city
    ];
    if (website) sourceParts.push(`Website: ${website}`);

    return {
      name,
      type,
      address,
      town,
      phone,
      email,
      notes: sourceParts.join(' | '),
      hasWebsite,
      sourceEmailType: directEmail ? 'osm' : 'website'
    };
  });

  return mapped.filter(Boolean).sort((a, b) => Number(a.hasWebsite) - Number(b.hasWebsite));
}

// ── Deduplicate ───────────────────────────────────────────────────────────────
function normalizeForCompare(value = '') {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function getLastLeadNumber(sheet) {
  let max = 0;
  for (let rn = 2; rn <= sheet.rowCount; rn++) {
    const value = String(sheet.getRow(rn).getCell(1).text || '').trim();
    const num = Number(value);
    if (Number.isFinite(num) && num > max) max = num;
  }
  return max;
}

function collectExistingLeads(sheet) {
  const existing = [];
  for (let rn = 2; rn <= sheet.rowCount; rn++) {
    const row = sheet.getRow(rn);
    const businessName = String(row.getCell(7).text || '').trim();
    const email = normalizeEmail(row.getCell(6).text || '');
    if (businessName || email) existing.push({ businessName, email });
  }
  return existing;
}

function isDuplicate(existing, lead) {
  const leadName = normalizeForCompare(lead.name);
  const leadEmail = normalizeEmail(lead.email);
  return existing.some(e => {
    const existingName = normalizeForCompare(e.businessName);
    const existingEmail = normalizeEmail(e.email);
    return (leadEmail && existingEmail && leadEmail === existingEmail) || (leadName && existingName && leadName === existingName);
  });
}

// ── Append to Excel ───────────────────────────────────────────────────────────
async function appendToExcel(newLeads) {
  const workbook = new ExcelJS.Workbook();
  let sheet;

  if (!fs.existsSync(LEADS_FILE)) {
    throw new Error(`Leads file not found: ${LEADS_FILE}`);
  }

  await workbook.xlsx.readFile(LEADS_FILE);
  sheet = workbook.worksheets[0];

  const existing = collectExistingLeads(sheet);
  let nextLeadNumber = getLastLeadNumber(sheet) + 1;
  let writeRow = sheet.rowCount + 1;
  let added = 0;
  const addedRows = [];

  for (const lead of newLeads) {
    if (!lead.name || !lead.email) {
      console.log(`  ⚠ Skip incomplete lead: ${lead.name || 'Unnamed'} | ${lead.email || 'no email'}`);
      continue;
    }
    if (isDuplicate(existing, lead)) {
      console.log(`  ⚠ Skip duplicate: ${lead.name} | ${lead.email}`);
      continue;
    }

    const row = sheet.getRow(writeRow);
    row.getCell(1).value = nextLeadNumber;
    row.getCell(2).value = 'Not Yet';
    row.getCell(3).value = 'No';
    row.getCell(4).value = '';
    row.getCell(5).value = '';
    row.getCell(6).value = lead.email;
    row.getCell(7).value = lead.name;
    row.getCell(8).value = lead.type;
    row.getCell(9).value = lead.address;
    row.getCell(10).value = lead.town;
    row.getCell(11).value = lead.phone;
    row.getCell(12).value = lead.notes;
    row.commit?.();

    existing.push({ businessName: lead.name, email: lead.email });
    addedRows.push({ row: writeRow, leadNumber: nextLeadNumber, ...lead });
    console.log(`  ✓ Added row ${writeRow} (#${nextLeadNumber}): ${lead.name} | ${lead.email} | ${lead.town || '—'}`);

    added += 1;
    nextLeadNumber += 1;
    writeRow += 1;
  }

  if (added > 0) {
    const tempFile = `${LEADS_FILE}.tmp`;
    await workbook.xlsx.writeFile(tempFile);
    fs.renameSync(tempFile, LEADS_FILE);
    console.log(`\n✅ Saved ${added} new leads → ${LEADS_FILE}`);
  } else {
    console.log('\n⚠ No new leads added.');
    console.log('   Need OSM entries with both business name and email, and no duplicates.');
  }
  return addedRows;
}

function buildComboPlan(seedCategory, seedCity, maxCombos) {
  const seedCategoryIndex = Math.max(0, categories.indexOf(seedCategory));
  const seedCityIndex = Math.max(0, CITIES.indexOf(seedCity));
  const combos = [];
  const seen = new Set();

  for (let step = 0; combos.length < maxCombos && step < categories.length * CITIES.length; step += 1) {
    const categoryName = categories[(seedCategoryIndex + step) % categories.length];
    const cityName = CITIES[(seedCityIndex + (step * 3)) % CITIES.length];
    const key = `${categoryName}__${cityName}`;
    if (seen.has(key)) continue;
    seen.add(key);
    combos.push({ categoryName, cityName });
  }

  return combos;
}

async function runCombo(categoryName, cityName) {
  const tag = CATEGORY_MAP[categoryName] || { tag: 'shop', value: categoryName };
  const query = buildQuery(cityName, tag.tag, tag.value);
  console.log(`🌐 Querying OpenStreetMap Overpass API...`);
  console.log(`   Combo    : ${categoryName} in ${cityName} (${tag.tag}=${tag.value})`);

  let data;
  try {
    data = await queryOverpass(query);
  } catch (e) {
    console.log(`   Primary endpoint failed, trying mirror...`);
    try {
      data = await queryOverpass(query.replace('overpass-api.de', 'overpass.kumi.systems'));
    } catch (e2) {
      console.log(`   ✗ Overpass unavailable for ${categoryName}/${cityName}: ${e2.message}`);
      return { categoryName, cityName, elements: 0, leads: [] };
    }
  }

  const elements = Array.isArray(data.elements) ? data.elements : [];
  console.log(`   → Found ${elements.length} businesses on OpenStreetMap`);

  const leads = await extractLeads(elements, cityName, categoryName);
  const noWebsiteCount = leads.filter(lead => !lead.hasWebsite).length;
  const websiteCount = leads.length - noWebsiteCount;
  console.log(`   → ${leads.length} usable email leads (${noWebsiteCount} no-website preferred, ${websiteCount} website-backed)\n`);
  return { categoryName, cityName, elements: elements.length, leads, noWebsiteCount, websiteCount };
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const combos = buildComboPlan(CATEGORY_NL, CITY, MAX_COMBOS);
  const gathered = [];
  const seenInRun = new Set();
  let totalElements = 0;
  let totalUsable = 0;
  let totalNoWebsite = 0;
  let totalWebsiteBacked = 0;
  let combosChecked = 0;

  for (const combo of combos) {
    if (gathered.length >= MAX_LEADS) break;
    const result = await runCombo(combo.categoryName, combo.cityName);
    combosChecked += 1;
    totalElements += result.elements;
    totalUsable += result.leads.length;
    totalNoWebsite += Number(result.noWebsiteCount || 0);
    totalWebsiteBacked += Number(result.websiteCount || 0);
    for (const lead of result.leads) {
      const key = `${normalizeEmail(lead.email)}__${normalizeForCompare(lead.name)}`;
      if (seenInRun.has(key)) continue;
      seenInRun.add(key);
      gathered.push(lead);
      if (gathered.length >= MAX_LEADS) break;
    }
  }

  const preferredFirst = gathered
    .sort((a, b) => Number(a.hasWebsite) - Number(b.hasWebsite))
    .slice(0, MAX_LEADS);

  const addedRows = await appendToExcel(preferredFirst);

  console.log(`\n📊 Summary:`);
  console.log(`   Combos checked      : ${combosChecked}`);
  console.log(`   Total in OSM        : ${totalElements}`);
  console.log(`   Usable leads seen   : ${totalUsable} 🎯`);
  console.log(`   No-website leads    : ${totalNoWebsite}`);
  console.log(`   Website-backed      : ${totalWebsiteBacked}`);
  console.log(`   Attempted to add    : ${preferredFirst.length}`);
  console.log(`   Added to Excel      : ${addedRows.length}`);
  if (addedRows.length) {
    console.log(`   Added rows          : ${addedRows.map(row => `${row.row} (#${row.leadNumber})`).join(', ')}`);
  }
  console.log(`\n💡 Strategy: prefer no-website leads first, then use website-backed email leads to keep the sheet growing.\n`);
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
