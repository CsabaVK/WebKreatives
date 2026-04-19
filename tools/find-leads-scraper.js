/**
 * WebKreatives — Gouden Gids Lead Scraper
 * Free alternative: scrapes goudengids.nl directly (Dutch Yellow Pages)
 * No API key required. Finds Dutch small businesses with contact info.
 *
 * Usage:  node tools/find-leads-scraper.js
 * Usage:  node tools/find-leads-scraper.js --category kapsalon --city Amsterdam --count 10
 */

const https = require('https');
const path  = require('path');
const fs    = require('fs');
const ExcelJS = require('exceljs');

// ── Lead rotation config (auto-rotates daily) ─────────────────────────────────
const CATEGORIES = [
  'kapsalon', 'schoonheidssalon', 'nagelstudio', 'tattooshop',
  'fietsenwinkel', 'slager', 'bakkerij', 'bloemist',
  'klussenbedrijf', 'schildersbedrijf', 'loodgieter', 'elektricien',
  'stomerij', 'schoenmaker', 'muziekwinkel', 'dierenwinkel',
  'rijschool', 'traiteur', 'wasserette', 'glazenwasser'
];

const CITIES = [
  'Amsterdam', 'Rotterdam', 'Den+Haag', 'Utrecht', 'Eindhoven',
  'Groningen', 'Tilburg', 'Almere', 'Breda', 'Nijmegen',
  'Haarlem', 'Arnhem', 'Zaandam', 'Amersfoort', 'Apeldoorn',
  'Enschede', 'Zwolle', 'Maastricht', 'Leiden', 'Dordrecht'
];

// ── Parse CLI args ─────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const getArg = (flag, def) => {
  const i = args.indexOf(flag);
  return i !== -1 && args[i + 1] ? args[i + 1] : def;
};

const today = new Date();
const dayIndex  = today.getDate() % CATEGORIES.length;
const cityIndex = Math.floor(today.getDate() / 2) % CITIES.length;

const CATEGORY   = getArg('--category', CATEGORIES[dayIndex]);
const CITY       = getArg('--city',     CITIES[cityIndex]);
const MAX_LEADS  = parseInt(getArg('--count', '10'));
const LEADS_FILE = getArg('--output', path.join(__dirname, '..', 'leads', 'Leads.xlsx'));

console.log(`\n🔍 WebKreatives Lead Scraper (Gouden Gids)`);
console.log(`   Category : ${CATEGORY}`);
console.log(`   City     : ${CITY.replace('+', ' ')}`);
console.log(`   Target   : ${MAX_LEADS} leads`);
console.log(`   Output   : ${LEADS_FILE}\n`);

// ── HTTP fetch helper ──────────────────────────────────────────────────────────
function fetch(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'nl-NL,nl;q=0.9',
      }
    };
    https.get(url, options, res => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// ── Parse Gouden Gids HTML results ────────────────────────────────────────────
function parseGoudenGids(html, category, city) {
  const leads = [];

  // Match each business listing block
  // Gouden Gids renders listings with data attributes and structured HTML
  const listingPattern = /<article[^>]*class="[^"]*(?:listing|result)[^"]*"[^>]*>([\s\S]*?)<\/article>/gi;
  let listingMatch;

  while ((listingMatch = listingPattern.exec(html)) !== null && leads.length < MAX_LEADS) {
    const block = listingMatch[1];

    // Extract business name
    const nameMatch = block.match(/<h\d[^>]*>([^<]+)<\/h\d>/) ||
                      block.match(/class="[^"]*(?:name|title|bedrijfsnaam)[^"]*"[^>]*>([^<]+)</i);
    if (!nameMatch) continue;
    const name = nameMatch[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"').trim();

    // Extract phone
    const phoneMatch = block.match(/(?:tel:|href="tel:)([0-9\s\-+]+)/) ||
                       block.match(/\b(0[1-9][\d\s\-]{7,12}|06[\s\-]?[\d]{8})\b/);
    const phone = phoneMatch ? phoneMatch[1].replace(/\s+/g, ' ').trim() : '';

    // Extract address
    const addrMatch = block.match(/(\d{4}\s?[A-Z]{2}[^<,]*)/);
    const address = addrMatch ? addrMatch[1].trim() : '';

    // Extract email if present
    const emailMatch = block.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-z]{2,}/);
    const email = emailMatch ? emailMatch[0] : '';

    const town = city.replace('+', ' ');
    const type = category.charAt(0).toUpperCase() + category.slice(1);

    if (name.length > 2) {
      leads.push({ name, type, address, town, phone, email, notes: 'Bron: goudengids.nl' });
    }
  }

  // Fallback: simpler regex if article tags didn't work
  if (leads.length === 0) {
    const simplePattern = /data-company-name="([^"]+)"[^>]*data-phone="([^"]*)"/gi;
    let m;
    while ((m = simplePattern.exec(html)) !== null && leads.length < MAX_LEADS) {
      leads.push({
        name: m[1].trim(),
        type: category.charAt(0).toUpperCase() + category.slice(1),
        address: '',
        town: city.replace('+', ' '),
        phone: m[2].trim(),
        email: '',
        notes: 'Bron: goudengids.nl'
      });
    }
  }

  return leads;
}

// ── Parse Yelp NL HTML results ─────────────────────────────────────────────────
function parseYelp(html, category, city) {
  const leads = [];
  // Yelp business cards
  const pattern = /"name":"([^"]+)","[^"]*"phone":"([^"]*)"/gi;
  let m;
  while ((m = pattern.exec(html)) !== null && leads.length < MAX_LEADS) {
    leads.push({
      name: m[1].replace(/\\u[\dA-F]{4}/gi, c => String.fromCharCode(parseInt(c.replace(/\\u/i, ''), 16))).trim(),
      type: category.charAt(0).toUpperCase() + category.slice(1),
      address: '',
      town: city.replace('+', ' '),
      phone: m[2].trim(),
      email: '',
      notes: 'Bron: yelp.nl'
    });
  }
  return leads;
}

// ── Deduplicate check ─────────────────────────────────────────────────────────
function isDuplicate(existingNames, lead) {
  const norm = s => s.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  return existingNames.some(n => norm(n) === norm(lead.name));
}

// ── Append to Excel ───────────────────────────────────────────────────────────
async function appendToExcel(newLeads) {
  const workbook = new ExcelJS.Workbook();
  let sheet;
  const existingNames = [];

  if (fs.existsSync(LEADS_FILE)) {
    await workbook.xlsx.readFile(LEADS_FILE);
    sheet = workbook.worksheets[0];
    sheet.eachRow((row, rn) => {
      if (rn > 1) {
        const v = row.getCell(2).value;
        if (v) existingNames.push(String(v));
      }
    });
  } else {
    sheet = workbook.addWorksheet('Leads', { properties: { defaultColWidth: 20 } });
    sheet.columns = [
      { header: '#',              key: 'num',    width: 5  },
      { header: 'Business Name', key: 'name',   width: 42 },
      { header: 'Industry/Type', key: 'type',   width: 22 },
      { header: 'Address',       key: 'address',width: 35 },
      { header: 'Town/Region',   key: 'town',   width: 22 },
      { header: 'Phone',         key: 'phone',  width: 18 },
      { header: 'Email',         key: 'email',  width: 30 },
      { header: 'Status',        key: 'status', width: 15 },
      { header: 'Notes',         key: 'notes',  width: 35 },
    ];
    const hRow = sheet.getRow(1);
    hRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    hRow.fill  = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A1A2E' } };
    hRow.height = 25;
  }

  let added = 0;
  const baseNum = sheet.rowCount;

  for (const lead of newLeads) {
    if (!lead.name || lead.name.length < 3) continue;
    if (isDuplicate(existingNames, lead))    { console.log(`  ⚠ Skip: ${lead.name}`); continue; }

    const row = sheet.addRow({
      num:    baseNum + added,
      name:   lead.name,
      type:   lead.type,
      address:lead.address,
      town:   lead.town,
      phone:  lead.phone,
      email:  lead.email,
      status: 'Nieuw',
      notes:  lead.notes
    });
    row.alignment = { vertical: 'middle' };
    row.height = 20;
    if (added % 2 === 0) {
      row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF5F5F5' } };
    }
    existingNames.push(lead.name);
    added++;
    console.log(`  ✓ ${lead.name} (${lead.town}) — ${lead.phone || 'no phone'}`);
  }

  if (added > 0) {
    await workbook.xlsx.writeFile(LEADS_FILE);
    console.log(`\n✅ Saved ${added} new leads → ${LEADS_FILE}`);
  } else {
    console.log('\n⚠ No new leads added (all duplicates or no results).');
    console.log('   Try different --category or --city flags.');
  }

  return added;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const allLeads = [];

  // Source 1: Gouden Gids
  try {
    const url = `https://www.goudengids.nl/nl/zoeken/${encodeURIComponent(CATEGORY)}/${CITY}/`;
    console.log(`🌐 Fetching: ${url}`);
    const html = await fetch(url);
    const leads = parseGoudenGids(html, CATEGORY, CITY);
    console.log(`   → Found ${leads.length} results from Gouden Gids`);
    allLeads.push(...leads);
    await new Promise(r => setTimeout(r, 1000)); // polite delay
  } catch (e) {
    console.log(`   ✗ Gouden Gids error: ${e.message}`);
  }

  // Source 2: Yelp NL (if we need more)
  if (allLeads.length < MAX_LEADS) {
    try {
      const url = `https://www.yelp.nl/search?find_desc=${encodeURIComponent(CATEGORY)}&find_loc=${CITY}`;
      console.log(`🌐 Fetching: ${url}`);
      const html = await fetch(url);
      const leads = parseYelp(html, CATEGORY, CITY);
      console.log(`   → Found ${leads.length} results from Yelp NL`);
      allLeads.push(...leads);
    } catch (e) {
      console.log(`   ✗ Yelp error: ${e.message}`);
    }
  }

  console.log(`\n📋 Total leads found: ${allLeads.length}`);
  await appendToExcel(allLeads.slice(0, MAX_LEADS));
  console.log('\n💡 Tip: Run daily with different --category and --city for fresh leads.\n');
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
