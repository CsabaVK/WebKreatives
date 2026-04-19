/**
 * WebKreatives — Google CSE Lead Finder
 * Replaces Tavily with free Google Custom Search API
 * Finds Dutch small businesses without websites and appends to Leads.xlsx
 *
 * Usage:  node tools/find-leads-google.js
 * Usage:  node tools/find-leads-google.js --category kapsalon --city Amsterdam --count 10
 *
 * Free quota: 100 queries/day (Google CSE)
 */

const https = require('https');
const path = require('path');
const fs = require('fs');
const ExcelJS = require('exceljs');

// ── Credentials (from .env.leads) ─────────────────────────────────────────────
const API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyC-c70HBh_dLn2HhvN_z5CRuqmyKiZMoMw';
const CX      = process.env.GOOGLE_CSE_CX  || '41ae4ca83dc494e5c';

// ── Lead rotation config ───────────────────────────────────────────────────────
// OpenClaw cycles through these automatically each day to stay fresh
const CATEGORIES = [
  'kapsalon', 'schoonheidssalon', 'nagelstudio', 'tattooshop',
  'fietsenwinkel', 'slager', 'bakkerij', 'bloemist',
  'klussenbedrijf', 'schildersbedrijf', 'loodgieter', 'elektricien',
  'stomerij', 'schoenmaker', 'horlogemaker', 'muziekwinkel',
  'dierenwinkel', 'rijschool', 'traiteur', 'wasserette'
];

const CITIES = [
  'Amsterdam', 'Rotterdam', 'Den Haag', 'Utrecht', 'Eindhoven',
  'Groningen', 'Tilburg', 'Almere', 'Breda', 'Nijmegen',
  'Haarlem', 'Arnhem', 'Zaandam', 'Amersfoort', 'Apeldoorn',
  'Enschede', 'Zwolle', 'Maastricht', 'Leiden', 'Dordrecht'
];

// Sites we search (must match PSE configured sites)
const SEARCH_SITES = [
  'goudengids.nl',
  'yelp.nl',
  'bedrijvengids.nl',
  'kvk.nl',
  'facebook.com/pages'
];

// ── Parse CLI args ─────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const getArg = (flag, def) => {
  const i = args.indexOf(flag);
  return i !== -1 && args[i + 1] ? args[i + 1] : def;
};

// If no args, auto-pick category/city based on today's date (rotates daily)
const today = new Date();
const dayIndex = today.getDate() % CATEGORIES.length;
const cityIndex = Math.floor(today.getDate() / 2) % CITIES.length;

const CATEGORY   = getArg('--category', CATEGORIES[dayIndex]);
const CITY       = getArg('--city',     CITIES[cityIndex]);
const MAX_LEADS  = parseInt(getArg('--count', '10'));
const LEADS_FILE = getArg('--output', path.join(__dirname, '..', 'leads', 'Leads.xlsx'));

console.log(`\n🔍 WebKreatives Lead Finder`);
console.log(`   Category : ${CATEGORY}`);
console.log(`   City     : ${CITY}`);
console.log(`   Target   : ${MAX_LEADS} leads`);
console.log(`   Output   : ${LEADS_FILE}\n`);

// ── Google CSE search ──────────────────────────────────────────────────────────
function googleSearch(query, start = 1) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      key: API_KEY,
      cx:  CX,
      q:   query,
      num: 10,
      start,
      gl:  'nl',   // geo-locate to Netherlands
      lr:  'lang_nl' // Dutch language results
    });
    const url = `https://www.googleapis.com/customsearch/v1?${params}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

// ── Extract lead info from a search result item ────────────────────────────────
function extractLead(item, category, city) {
  const title   = item.title || '';
  const snippet = item.snippet || '';
  const link    = item.link || '';
  const pagemap  = item.pagemap || {};

  // Business name: strip site branding from title
  let name = title
    .replace(/\s*[-|–]\s*(Gouden Gids|Yelp|KVK|Bedrijvengids|Facebook).*/gi, '')
    .replace(/\s*[-|–]\s*\d{4}\s*[A-Z]{2}.*/g, '')
    .trim();

  // Address / phone from structured data if available
  let address = '';
  let phone   = '';
  let email   = '';

  const hcard = (pagemap.hcard || [])[0] || {};
  const metatags = (pagemap.metatags || [])[0] || {};

  if (hcard['adr']) address = hcard['adr'];
  if (hcard['tel']) phone   = hcard['tel'];

  // Fallback: regex from snippet
  if (!phone) {
    const phoneMatch = snippet.match(/\b(0[1-9]\d[\s\-]?\d{3}[\s\-]?\d{4}|06[\s\-]?\d{8}|\+31[\s\-]?\d{9})\b/);
    if (phoneMatch) phone = phoneMatch[0].trim();
  }
  if (!address) {
    const addrMatch = snippet.match(/\b\d{4}\s?[A-Z]{2}\b/); // Dutch postal code
    if (addrMatch) address = addrMatch[0];
  }
  const emailMatch = snippet.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-z]{2,}/);
  if (emailMatch) email = emailMatch[0];

  // Determine town from title/snippet if not passed
  let town = city;
  CITIES.forEach(c => {
    if (title.includes(c) || snippet.includes(c)) town = c;
  });

  // Determine type
  const type = category.charAt(0).toUpperCase() + category.slice(1);

  // Notes: source URL domain
  const source = new URL(link).hostname.replace('www.', '');
  const notes  = `Bron: ${source}`;

  return { name, type, address, town, phone, email, notes, link };
}

// ── Check if lead already exists in Excel ────────────────────────────────────
function isDuplicate(existingNames, lead) {
  const norm = s => s.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  return existingNames.some(n => norm(n) === norm(lead.name));
}

// ── Append leads to Excel ─────────────────────────────────────────────────────
async function appendToExcel(newLeads) {
  const workbook = new ExcelJS.Workbook();

  let sheet;
  let startRow = 2;
  const existingNames = [];

  if (fs.existsSync(LEADS_FILE)) {
    await workbook.xlsx.readFile(LEADS_FILE);
    sheet = workbook.worksheets[0];
    // Collect existing names to deduplicate
    sheet.eachRow((row, rn) => {
      if (rn > 1) {
        const cell = row.getCell(2); // Business Name column
        if (cell.value) existingNames.push(String(cell.value));
      }
    });
    startRow = sheet.rowCount + 1;
  } else {
    sheet = workbook.addWorksheet('Leads', { properties: { defaultColWidth: 20 } });
    sheet.columns = [
      { header: '#',              key: 'num',     width: 5  },
      { header: 'Business Name', key: 'name',     width: 42 },
      { header: 'Industry/Type', key: 'type',     width: 22 },
      { header: 'Address',       key: 'address',  width: 35 },
      { header: 'Town/Region',   key: 'town',     width: 22 },
      { header: 'Phone',         key: 'phone',    width: 18 },
      { header: 'Email',         key: 'email',    width: 30 },
      { header: 'Status',        key: 'status',   width: 15 },
      { header: 'Notes',         key: 'notes',    width: 35 },
    ];
    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A1A2E' } };
    headerRow.height = 25;
  }

  let added = 0;
  const rowNum = sheet.rowCount; // current last row number

  for (const lead of newLeads) {
    if (!lead.name || lead.name.length < 3) continue;
    if (isDuplicate(existingNames, lead)) {
      console.log(`  ⚠ Skip duplicate: ${lead.name}`);
      continue;
    }

    const row = sheet.addRow({
      num:     rowNum + added + 1,
      name:    lead.name,
      type:    lead.type,
      address: lead.address,
      town:    lead.town,
      phone:   lead.phone,
      email:   lead.email,
      status:  'Nieuw',
      notes:   lead.notes
    });

    row.alignment = { vertical: 'middle' };
    row.height = 20;
    if (added % 2 === 0) {
      row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF5F5F5' } };
    }

    existingNames.push(lead.name);
    added++;
    console.log(`  ✓ Added: ${lead.name} (${lead.town}) — ${lead.phone || 'no phone'}`);
  }

  if (added > 0) {
    await workbook.xlsx.writeFile(LEADS_FILE);
    console.log(`\n✅ Saved ${added} new leads to ${LEADS_FILE}`);
  } else {
    console.log('\n⚠ No new leads added (all duplicates or empty).');
  }

  return added;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const leads = [];
  let queriesUsed = 0;

  // Build search queries targeting Dutch business directories
  const queries = [
    `${CATEGORY} ${CITY} telefoon contactgegevens`,
    `${CATEGORY} ${CITY} site:goudengids.nl`,
    `${CATEGORY} ${CITY} site:yelp.nl`,
  ];

  for (const query of queries) {
    if (leads.length >= MAX_LEADS) break;
    if (queriesUsed >= 3) break; // max 3 queries per run to stay well within free quota

    console.log(`🌐 Searching: "${query}"`);
    try {
      const result = await googleSearch(query);
      queriesUsed++;

      if (result.error) {
        console.error(`  ✗ API error: ${result.error.message}`);
        if (result.error.code === 429) {
          console.error('  ✗ Daily quota exceeded. Try again tomorrow.');
          break;
        }
        continue;
      }

      const items = result.items || [];
      console.log(`  → Found ${items.length} results`);

      for (const item of items) {
        if (leads.length >= MAX_LEADS) break;
        const lead = extractLead(item, CATEGORY, CITY);
        if (lead.name) leads.push(lead);
      }

      // Small delay to be polite to the API
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
    }
  }

  console.log(`\n📋 Total leads found: ${leads.length}`);
  await appendToExcel(leads);

  console.log(`\n📊 Queries used today: ${queriesUsed}/100 (free tier limit)`);
  console.log('   Run this script daily — it auto-rotates category & city.\n');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
