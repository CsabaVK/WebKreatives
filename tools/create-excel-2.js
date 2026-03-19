const ExcelJS = require('exceljs');
const path = require('path');

async function createBusinessList() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'WebKreatives';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('Businesses With Emails', {
    properties: { defaultColWidth: 20 }
  });

  sheet.columns = [
    { header: '#', key: 'num', width: 5 },
    { header: 'Business Name', key: 'name', width: 42 },
    { header: 'Industry / Type', key: 'type', width: 24 },
    { header: 'Town / Region', key: 'town', width: 22 },
    { header: 'Phone', key: 'phone', width: 18 },
    { header: 'Email', key: 'email', width: 35 },
    { header: 'Website', key: 'website', width: 38 },
    { header: 'Notes', key: 'notes', width: 30 }
  ];

  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11, name: 'Arial' };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF2D2D2D' }
  };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
  headerRow.height = 25;

  const businesses = [
    { name: 'Voegbedrijf Schepers', type: 'Masonry / Pointing', town: 'Ulft, Gelderland', phone: '0315 631 118', email: 'info@voegbedrijfschepers.nl', website: 'voegbedrijfschepers.nl', notes: '30+ years experience' },
    { name: 'Timmermans Schilderwerken V.O.F.', type: 'Painter', town: 'Geldrop, Noord-Brabant', phone: '040 285 8821', email: 'info@schildergeldrop.nl', website: 'schildergeldrop.nl', notes: '' },
    { name: 'Schildersbedrijf Jo Loozen & Zn', type: 'Painter', town: 'Simpelveld, Limburg', phone: '045 544 1591', email: 'schilder@loozen.info', website: 'loozen.info', notes: 'Since 1959' },
    { name: 'Bouwbedrijf Gert Bruiniers', type: 'Construction', town: 'Haren, Groningen', phone: '050 534 7509', email: 'info@bruiniers.nl', website: 'bouwbedrijfbruiniers.nl', notes: '' },
    { name: 'Hoveniersbedrijf Kleine', type: 'Landscaper', town: 'Assendelft, Noord-Holland', phone: '06 27451260', email: 'info@hoveniersbedrijfkleine.nl', website: 'hoveniersbedrijfkleine.nl', notes: '' },
    { name: 'Hoveniersbedrijf Eric Kuijpers', type: 'Landscaper', town: 'Den Bosch, Noord-Brabant', phone: '073 551 4698', email: 'info@erickuijpers.nl', website: 'erickuijpers.nl', notes: 'Near Den Bosch' },
    { name: 'Schouten Hoveniers', type: 'Landscaper', town: 'Dreumel, Gelderland', phone: '0481 377 883', email: 'info@schouten-hoveniers.nl', website: 'schouten-hoveniers.nl', notes: '' },
    { name: 'Schoonmaakbedrijf Garritsen', type: 'Cleaning', town: 'Almere, Flevoland', phone: '', email: 'info@schoonmaakbedrijfgarritsen.nl', website: 'schoonmaakbedrijfgarritsen.nl', notes: '' },
    { name: 'EWGS Glazenwasserij en Schoonmaak', type: 'Window Cleaning / Cleaning', town: 'Winschoten, Groningen', phone: '', email: 'info@ewgs.nl', website: 'ewgs.nl', notes: '' },
    { name: 'Schoonmaakbedrijf Jansen', type: 'Cleaning', town: 'Den Bosch, Noord-Brabant', phone: '', email: 'info@schoonmaakbedrijfjansen.nl', website: 'schoonmaakbedrijfjansen.nl', notes: 'North-East Brabant' },
    { name: 'Limburgs Schildersbedrijf', type: 'Painter', town: 'Limburg', phone: '077 206 1132', email: 'info@limburgs-schildersbedrijf.nl', website: 'limburgs-schildersbedrijf.nl', notes: '' },
    { name: 'Ger van Glabbeeck Schilderwerken', type: 'Painter', town: 'Limburg', phone: '06 29145994', email: 'info@gervanglabbeeck.nl', website: 'gervanglabbeeck.nl', notes: '' },
    { name: 'SenK Installatieservice', type: 'Plumber / Installer', town: 'Groningen', phone: '050 501 8442', email: 'info@senkinstallaties.nl', website: 'senkinstallaties.nl', notes: 'Loodgietersbedrijf Drenthe' },
    { name: 'SA Elektro Experts', type: 'Electrician', town: 'Den Haag, Zuid-Holland', phone: '070 750 3681', email: 'info@saelektroexperts.nl', website: 'saelektroexperts.nl', notes: '' },
    { name: 'Bestrating Nederland B.V.', type: 'Paving', town: 'Lemmer, Friesland', phone: '', email: 'info@bestratingnederland.nl', website: 'bestratingnederland.nl', notes: '' },
    { name: 'Timmerman Utrecht', type: 'Carpenter', town: 'Utrecht', phone: '', email: 'info@timmermanutrecht.nl', website: 'timmermanutrecht.nl', notes: '' },
    { name: 'BC Stukadoor & Klussenbedrijf', type: 'Plasterer / Handyman', town: 'Steenwijk, Overijssel', phone: '', email: 'info@bcklussenbedrijf.nl', website: 'bcklussenbedrijf.nl', notes: '24 years experience' },
    { name: 'Stukadoorbedrijf Gelderland', type: 'Plasterer', town: 'Gelderland', phone: '0577 222 004', email: 'info@stukadoorbedrijfgelderland.nl', website: 'stukadoorbedrijfgelderland.nl', notes: '' },
    { name: 'Bouwbedrijf Plas', type: 'Construction', town: 'Drenthe', phone: '', email: 'info@bouwbedrijfplas.nl', website: 'bouwbedrijfplas.nl', notes: '' },
    { name: 'HTO Aannemingsbedrijf', type: 'Contractor', town: 'Drenthe / Groningen', phone: '', email: 'info@hto.nl', website: 'hto.nl', notes: '' },
    { name: 'E. Kwant Bouw- en Handelsonderneming', type: 'Construction', town: 'Drenthe', phone: '', email: 'info@kwantbouw.nl', website: 'kwantbouw.nl', notes: '' },
    { name: 'Stukadoorsbedrijf Been', type: 'Plasterer', town: 'Drenthe', phone: '', email: 'info@stukadoorsbedrijfbeen.nl', website: 'stukadoorsbedrijfbeen.nl', notes: '' },
    { name: 'Veemar Bouwservice', type: 'Construction', town: 'Drenthe / Groningen', phone: '', email: 'info@veemar.nl', website: 'veemar.nl', notes: '' },
    { name: 'Rinketbouw', type: 'Construction', town: 'Drenthe', phone: '', email: 'info@rinketbouw.nl', website: 'rinketbouw.nl', notes: '' },
    { name: 'Timmerbedrijf Hotim', type: 'Carpenter', town: 'Drenthe / Groningen', phone: '', email: 'info@timmerbedrijfhotim.nl', website: 'timmerbedrijfhotim.nl', notes: '' },
    { name: 'Hodal Schoonmaak', type: 'Cleaning', town: 'Almere, Flevoland', phone: '', email: 'info@hodal.nl', website: 'hodal.nl', notes: '' },
    { name: 'Hoekstra Schoonmaak', type: 'Cleaning', town: 'Hoorn, Noord-Holland', phone: '', email: 'info@hoekstraschoonmaak.nl', website: 'hoekstraschoonmaak.nl', notes: '' },
    { name: 'JvW Glazenwasserij & Schoonmaak', type: 'Window Cleaning / Cleaning', town: 'Cuijk, Noord-Brabant', phone: '', email: 'info@jvwglazenwasserij.nl', website: 'jvwglazenwasserij.nl', notes: 'Land van Cuijk region' },
    { name: 'Jouby Schoonmaakbedrijf & Glazenwasserij', type: 'Window Cleaning / Cleaning', town: 'Bovenkarspel, Noord-Holland', phone: '0228 514 865', email: 'info@jouby-schoonmaakbedrijf.nl', website: 'jouby-schoonmaakbedrijf.nl', notes: '45+ years experience' },
    { name: 'Scheers V.O.F. Schoonmaakbedrijf', type: 'Window Cleaning / Cleaning', town: 'Nederland', phone: '', email: 'info@scheers.biz', website: 'scheers.biz', notes: '' },
    { name: 'Dakdekkers Drenthe', type: 'Roofer', town: 'Drenthe', phone: '0593 241 052', email: 'info@dakdekkers-drenthe.nl', website: 'dakdekkers-drenthe.nl', notes: '' },
    { name: 'Loodgietersbedrijf Drenthe', type: 'Plumber', town: 'Drenthe', phone: '0593 241 066', email: 'info@loodgietersbedrijfdrenthe.nl', website: 'loodgietersbedrijfdrenthe.nl', notes: '' },
    { name: 'KGM Onderhoudsbedrijf', type: 'Maintenance / Handyman', town: 'Utrecht', phone: '', email: 'info@kgmonderhoud.nl', website: 'kgmonderhoud.nl', notes: '#1 in onderhoud en verbouwen' },
    { name: 'RMK Totaalonderhoud', type: 'Maintenance / Construction', town: 'Almere, Flevoland', phone: '', email: 'info@rmkbouw.nl', website: 'rmkbouw.nl', notes: 'Flevoland, Utrecht, Noord-Holland' },
    { name: 'Bouw & Onderhoudsbedrijf Snijder', type: 'Construction / Handyman', town: 'Zeewolde, Flevoland', phone: '', email: 'info@bouwonderhoudsnijder.nl', website: 'bouwonderhoudsnijder.nl', notes: '' },
    { name: 'Electra&Zo', type: 'Electrician', town: 'Nijmegen, Gelderland', phone: '06 19024280', email: 'info@electraenzo.nl', website: 'electraenzo.nl', notes: 'Certified installer' },
    { name: 'RS Electro B.V.', type: 'Electrician', town: 'Arnhem, Gelderland', phone: '085 401 4125', email: 'info@rselectro.nl', website: 'rselectro.nl', notes: 'Arnhem, Utrecht, Amsterdam' },
    { name: 'J&S Elektrotechniek', type: 'Electrician', town: 'Nederland', phone: '', email: 'info@jenselektrotechniek.nl', website: 'jenselektrotechniek.nl', notes: 'Certified installer' },
    { name: 'MK-Schilderwerken', type: 'Painter', town: 'Echt-Susteren, Limburg', phone: '', email: 'info@mk-schilderwerken.nl', website: 'mk-schilderwerken.nl', notes: 'Small renovation & maintenance' },
    { name: 'BS Schilderwerken', type: 'Painter', town: 'Limburg', phone: '', email: 'info@bsschilderwerken.nl', website: 'bsschilderwerken.nl', notes: 'Top quality painting' },
    { name: 'Reijnders Onderhoud', type: 'Painter / Maintenance', town: 'Limburg', phone: '', email: 'info@reijndersonderhoud.nl', website: 'reijndersonderhoud.nl', notes: '' },
    { name: 'AABS Bouw- en Timmerbedrijf', type: 'Construction / Carpenter', town: 'Tynaarlo, Drenthe', phone: '', email: 'info@aabsbouw.nl', website: 'aabsbouw.nl', notes: 'Groningen & Drenthe' },
    { name: 'Polluxbouw', type: 'Carpenter', town: 'Groningen', phone: '', email: 'info@polluxbouw.nl', website: 'polluxbouw.nl', notes: 'Timmerbedrijf Groningen' },
    { name: 'BDVO Bouwbedrijf', type: 'Construction', town: 'Groningen', phone: '', email: 'info@bouwbedrijfdvo.nl', website: 'bouwbedrijfdvo.nl', notes: 'North Netherlands' },
    { name: 'Metselaar Overijssel', type: 'Masonry', town: 'Overijssel', phone: '0541 241 087', email: 'info@metselaar-overijssel.nl', website: 'metselaar-overijssel.nl', notes: 'Multiple locations in Overijssel' },
    { name: 'Timmerman Noord-Brabant', type: 'Carpenter', town: 'Noord-Brabant', phone: '013 207 0457', email: 'info@timmermannoordbrabant.nl', website: 'timmermannoordbrabant.nl', notes: '' },
    { name: 'Slagwater Schoonmaakbedrijf', type: 'Cleaning / Window Cleaning', town: 'Noord-Holland', phone: '', email: 'info@slagwater.nl', website: 'slagwater.nl', notes: 'Throughout Noord-Holland' },
    { name: 'BMND Glasbewassing & Schoonmaak', type: 'Window Cleaning / Cleaning', town: 'Hoeksche Waard, Zuid-Holland', phone: '0186 700 250', email: 'info@bmnd.nl', website: 'bmnd.nl', notes: 'Zuid-Holland & Noord-Brabant' },
    { name: 'M.H. van Meurs BV', type: 'Plumber / Roofer', town: 'Waalwijk, Noord-Brabant', phone: '073 623 3999', email: 'info@meursmhvanloodgieter.nl', website: 'meursmhvanloodgieter.nl', notes: 'Since 1979' },
    { name: 'Hovenier van der Heijden', type: 'Landscaper', town: 'Nederland', phone: '', email: 'info@hoveniervanderheijden.nl', website: 'hoveniervanderheijden.nl', notes: '' }
  ];

  businesses.forEach((biz, index) => {
    const row = sheet.addRow({
      num: index + 1,
      name: biz.name,
      type: biz.type,
      town: biz.town,
      phone: biz.phone,
      email: biz.email,
      website: biz.website,
      notes: biz.notes
    });

    if (index % 2 === 0) {
      row.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF5F5F5' }
      };
    }

    row.font = { name: 'Arial', size: 10 };
    row.alignment = { vertical: 'middle' };
    row.height = 20;

    // Make email clickable
    const emailCell = row.getCell('email');
    emailCell.value = { text: biz.email, hyperlink: `mailto:${biz.email}` };
    emailCell.font = { name: 'Arial', size: 10, color: { argb: 'FF0066CC' }, underline: true };

    // Make website clickable
    if (biz.website) {
      const webCell = row.getCell('website');
      webCell.value = { text: biz.website, hyperlink: `https://${biz.website}` };
      webCell.font = { name: 'Arial', size: 10, color: { argb: 'FF0066CC' }, underline: true };
    }
  });

  sheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFD0D0D0' } },
        left: { style: 'thin', color: { argb: 'FFD0D0D0' } },
        bottom: { style: 'thin', color: { argb: 'FFD0D0D0' } },
        right: { style: 'thin', color: { argb: 'FFD0D0D0' } }
      };
    });
  });

  sheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: businesses.length + 1, column: 8 }
  };

  sheet.views = [{ state: 'frozen', ySplit: 1 }];

  const filePath = path.join(__dirname, 'WebKreatives_Leads_50_With_Emails.xlsx');
  await workbook.xlsx.writeFile(filePath);
  console.log(`Excel file created: ${filePath}`);
  console.log(`Total businesses: ${businesses.length}`);
}

createBusinessList().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
