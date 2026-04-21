/**
 * WebKreatives — OpenStreetMap Lead Finder
 * 100% FREE — no API key, no quota, no cost ever.
 * Finds Dutch small businesses WITHOUT a website (perfect targets for WebKreatives)
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
const MAX_COMBOS  = parseInt(getArg('--max-combos', '12'));

console.log(`\n🗺  WebKreatives Lead Finder — OpenStreetMap (100% Free)`);
console.log(`   Seed category : ${CATEGORY_NL}`);
console.log(`   Seed city     : ${CITY}`);
console.log(`   Target        : ${MAX_LEADS} leads WITHOUT a website`);
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
  return String(raw || '').trim().toLowerCase();
}

function normalizeName(raw = '') {
  return String(raw || '').trim();
}

function extractLeads(elements, city, categoryName) {
  const leads = [];

  for (const el of elements) {
    const tags = el.tags || {};

    // Skip businesses that already have a website — they're not our target.
    if (tags.website || tags['contact:website'] || tags.url) continue;

    const name = normalizeName(tags.name || tags['name:nl'] || '');
    if (!name || name.length < 2) continue;

    const phone = String(tags.phone || tags['contact:phone'] || tags['phone:nl'] || '').trim();
    const email = normalizeEmail(tags.email || tags['contact:email'] || '');
    if (!email || !email.includes('@')) continue; // email is mandatory for production use

    const street = String(tags['addr:street'] || '').trim();
    const housenr = String(tags['addr:housenr'] || '').trim();
    const postcode = String(tags['addr:postcode'] || '').trim();
    const address = [street, housenr, postcode].filter(Boolean).join(' ').trim();
    const town = String(tags['addr:city'] || tags['addr:town'] || city || '').trim();

    const type = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    const notes = `Geen website | OSM id:${el.id} | Source: OpenStreetMap | ${categoryName} | ${city}`;

    leads.push({ name, type, address, town, phone, email, notes });
  }

  return leads;
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
    await workbook.xlsx.writeFile(LEADS_FILE);
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

  for (let step = 0; step < maxCombos; step += 1) {
    const categoryName = categories[(seedCategoryIndex + step) % categories.length];
    const cityName = CITIES[(seedCityIndex + (step * 3)) % CITIES.length];
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

  const leads = extractLeads(elements, cityName, categoryName);
  console.log(`   → ${leads.length} have NO website + an email (our usable target)\n`);
  return { categoryName, cityName, elements: elements.length, leads };
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const combos = buildComboPlan(CATEGORY_NL, CITY, MAX_COMBOS);
  const gathered = [];
  let totalElements = 0;
  let totalUsable = 0;

  for (const combo of combos) {
    if (gathered.length >= MAX_LEADS) break;
    const result = await runCombo(combo.categoryName, combo.cityName);
    totalElements += result.elements;
    totalUsable += result.leads.length;
    for (const lead of result.leads) {
      gathered.push(lead);
      if (gathered.length >= MAX_LEADS) break;
    }
  }

  const addedRows = await appendToExcel(gathered.slice(0, MAX_LEADS));

  console.log(`\n📊 Summary:`);
  console.log(`   Combos checked      : ${combos.length}`);
  console.log(`   Total in OSM        : ${totalElements}`);
  console.log(`   Usable leads seen   : ${totalUsable} 🎯`);
  console.log(`   Attempted to add    : ${Math.min(gathered.length, MAX_LEADS)}`);
  console.log(`   Added to Excel      : ${addedRows.length}`);
  if (addedRows.length) {
    console.log(`   Added rows          : ${addedRows.map(row => `${row.row} (#${row.leadNumber})`).join(', ')}`);
  }
  console.log(`\n💡 Run daily — categories & cities auto-rotate, and now keep searching across multiple combos per run.\n`);
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
