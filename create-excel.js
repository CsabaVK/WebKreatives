const ExcelJS = require('exceljs');
const path = require('path');

async function createBusinessList() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'WebKreatives';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('Businesses Without Websites', {
    properties: { defaultColWidth: 20 }
  });

  // Define columns
  sheet.columns = [
    { header: '#', key: 'num', width: 5 },
    { header: 'Business Name', key: 'name', width: 42 },
    { header: 'Industry / Type', key: 'type', width: 22 },
    { header: 'Address', key: 'address', width: 35 },
    { header: 'Town / Region', key: 'town', width: 22 },
    { header: 'Phone', key: 'phone', width: 18 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Notes', key: 'notes', width: 30 }
  ];

  // Style header row
  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF2D2D2D' }
  };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
  headerRow.height = 25;

  // Business data
  const businesses = [
    { name: 'Schilderwerken P. Klein', type: 'Painter', address: 'Mokkenland 13', town: 'Staphorst', phone: '0522 464 866' },
    { name: 'Stukadoorsbedrijf Gebr. Kijk in de Vegte', type: 'Plasterer', address: 'Den Hulst 54C', town: 'Staphorst', phone: '06 27008865' },
    { name: 'Hoveniersbedrijf André Geerts V.O.F.', type: 'Landscaper', address: 'Hessenweg 15', town: 'Dalfsen', phone: '0529 433 057' },
    { name: 'Nijenkamp Timmerwerken', type: 'Carpenter', address: 'Enkstraat 130', town: 'Raalte', phone: '' },
    { name: 'Nijland Dienstverlening', type: 'Carpenter', address: 'Hogeweg 20', town: 'Raalte', phone: '06 54934289' },
    { name: 'Metselbedrijf Gommer', type: 'Masonry', address: 'Industriestraat 8', town: 'Tubbergen', phone: '06 25442297' },
    { name: 'Metselbedrijf René Nijland', type: 'Masonry', address: 'Ootmarsumseweg 183', town: 'Tubbergen', phone: '0546 442 236' },
    { name: 'Metselbedrijf Gebr. Oude Breuil', type: 'Masonry', address: 'Vosmeerstraat 16', town: 'Tubbergen', phone: '06 57332922' },
    { name: 'Glazenwassersbedrijf R. Gerrits', type: 'Window Cleaning', address: 'Prins Bernhardstraat 18', town: 'Ootmarsum', phone: '06 55943989' },
    { name: 'Morgenstond glazenwassers en schoonmaakbedrijf', type: 'Cleaning', address: 'Nordhornsestraat 236', town: 'Ootmarsum', phone: '0541 535 042' },
    { name: 'Aannemersbedrijf Wintels', type: 'Contractor', address: 'Brandlichterweg 6', town: 'Denekamp', phone: '06 51160180' },
    { name: 'Voegersbedrijf Siemes', type: 'Masonry / Pointing', address: 'Groenloseweg 46', town: 'Eibergen', phone: '0545 471 664' },
    { name: 'Bouwonderneming R. Nijhuis', type: 'Construction', address: 'Huikert 7', town: 'Eibergen', phone: '0545 296 055' },
    { name: 'Voegersbedrijf Overkamp', type: 'Masonry / Pointing', address: 'Slemphutterweg 4', town: 'Eibergen', phone: '0545 224 382' },
    { name: 'Rk Straatwerken', type: 'Paving', address: 'Vonderweg 20', town: 'Rijssen', phone: '' },
    { name: 'De Aanpakkers 053', type: 'Handyman', address: 'Kwartelstraat 51', town: 'Goor', phone: '06 41513255' },
    { name: 'Roel\'s Clean. Serv. Twenterand', type: 'Cleaning', address: 'Oosteinde 101', town: 'Vriezenveen', phone: '06 10052891' },
    { name: 'Habé Afbouw B.V.', type: 'Construction / Finishing', address: 'Maalstoel 4', town: 'Hardenberg', phone: '0523 265 900' },
    { name: 'Bouw en Klussenbedrijf Cremer', type: 'Handyman / Construction', address: 'Nieuwe Krim 38', town: 'Coevorden', phone: '0524 570 879' },
    { name: 'Klusservice Marcel', type: 'Handyman', address: 'Van Bothniaplantsoen 5', town: 'Coevorden', phone: '' },
    { name: 'Hoogeveen Rijwielhandel A J', type: 'Bicycle Shop', address: 'Grote Kerkstraat 7', town: 'Meppel', phone: '0522 251 895' },
    { name: 'Automobielbedrijf Van de Peppel', type: 'Auto Repair', address: 'Ommerkanaal 41', town: 'Dedemsvaart', phone: '0523 614 168' },
    { name: 'Peters Voegwerken', type: 'Masonry / Pointing', address: 'Doctor Kortmannweg 9', town: 'Venray', phone: '0478 511 693' },
    { name: 'Metselbedrijf Jac Hellegers', type: 'Masonry', address: 'Vicarieweg 49', town: 'Venray', phone: '0478 587 004' },
    { name: 'Metselbedrijf van Houdt', type: 'Masonry', address: 'Gildestraat 44', town: 'Venray', phone: '0478 636 458' },
    { name: 'Steema Timmerwerken', type: 'Carpenter', address: 'Ridderspoor 5', town: 'Venray', phone: '06 23273049' },
    { name: 'van Voorden Metselwerken', type: 'Masonry', address: 'De Horst 43a', town: 'Horst', phone: '0184 410 295' },
    { name: 'Van der Horst Lijmwerken', type: 'Masonry / Adhesive Work', address: 'Floralaan 3', town: 'Horst', phone: '0493 695 214' },
    { name: 'Raben Metselwerken', type: 'Masonry', address: 'Lage Horst 51', town: 'Horst', phone: '06 12850066' },
    { name: 'Willemsen Metselwerken', type: 'Masonry', address: '', town: 'Horst', phone: '06 15371114' },
    { name: 'Klussenbedrijf Verberk', type: 'Contractor', address: 'Kanarie 9', town: 'Boxmeer', phone: '0485 522 121' },
    { name: 'GS klussen', type: 'Handyman', address: 'Boterbloem 78', town: 'Boxmeer', phone: '06 30528487' },
    { name: 'Rutten Stucadoorsbedrijf V.O.F.', type: 'Plasterer', address: 'Kruisstraat 25', town: 'Gennep (6591 EA)', phone: '0485 512 885' },
    { name: 'Stop Schilderwerken & Onderhoudswerkzaamheden', type: 'Painter', address: 'Robijnlaan 64', town: 'Cuijk', phone: '0485 322 738' },
    { name: 'Schildersbedrijf René Janssen', type: 'Painter', address: 'Gardeniersdreef 7', town: 'Cuijk', phone: '06 15175214' },
    { name: 'Radt Schilderwerken', type: 'Painter', address: 'Heeswijksestraat 23', town: 'Cuijk area', phone: '043 365 6484' },
    { name: 'Lankman Bouw en Onderhoud Nunspeet', type: 'Carpenter / Construction', address: 'Vicarieweg 52', town: 'Nunspeet', phone: '06 33020983' },
    { name: 'Gerard van Klompenburg Timmerwerken', type: 'Carpenter', address: 'Secretaris Mulderweg 24', town: 'Nunspeet', phone: '0341 842 360' },
    { name: 'Kruisselbrink Bouwwerken', type: 'Masonry / Construction', address: 'Jonenstraat 4', town: 'Winterswijk', phone: '0543 840 532' },
    { name: 'Voegersbedrijf H.J. Dibbets & Zonen', type: 'Masonry / Pointing', address: 'Misterweg 226', town: 'Winterswijk', phone: '06 22747119' },
    { name: 'Schildersbedrijf Gils', type: 'Painter', address: 'Brunstingerstraat 27', town: 'Beilen', phone: '0593 524 846' },
    { name: 'Hetty\'s behangen en binnenschilderwerk', type: 'Painter / Wallpaper', address: 'Dikningestraat 9', town: 'Beilen', phone: '06 40260335' },
    { name: 'Metselbedrijf Henk Dijkstra', type: 'Masonry', address: 'Eringastraat 35', town: 'Drachten', phone: '06 23622247' },
    { name: 'Metselbedrijf Y. Poutsma', type: 'Masonry', address: 'Ureterperend 2', town: 'Drachten', phone: '06 51762069' },
    { name: 'Klussenbedrijf Yigit', type: 'Handyman', address: 'Citroenvlinderstraat 7', town: 'Heerenveen', phone: '06 15615040' },
    { name: 'Hendriks Bouwbedrijf D M', type: 'Masonry / Construction', address: 'Eiberstraat 7', town: 'Assen', phone: '06 36037800' },
    { name: 'H.H.Otten', type: 'Window Cleaning', address: 'Westerd 19', town: 'Meppel', phone: '0522 744 153' },
    { name: 'Firma Boonstra', type: 'Window Cleaning', address: 'Ambonstraat 56', town: 'Meppel', phone: '0522 253 380' },
    { name: 'Schoonmaakbedrijf Hulst', type: 'Cleaning', address: 'Papaverstraat 56', town: 'Meppel', phone: '0522 260 031' },
    { name: 'Klussenbedrijf Koetsier', type: 'Handyman', address: 'Hessenweg 110', town: 'Hattem', phone: '038 444 2736' },
    { name: 'Steenbergen klus-en montagebedrijf', type: 'Handyman', address: 'Van Heeckerenskamp 21', town: 'Hattem', phone: '' }
  ];

  // Add data rows with alternating colors
  businesses.forEach((biz, index) => {
    const row = sheet.addRow({
      num: index + 1,
      name: biz.name,
      type: biz.type,
      address: biz.address,
      town: biz.town,
      phone: biz.phone,
      email: '', // Email not available from Google Maps
      notes: biz.phone ? '' : 'No phone listed on Google Maps'
    });

    // Alternating row colors
    if (index % 2 === 0) {
      row.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF5F5F5' }
      };
    }

    row.alignment = { vertical: 'middle' };
    row.height = 20;
  });

  // Add borders to all cells
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

  // Auto-filter on header
  sheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: businesses.length + 1, column: 8 }
  };

  // Freeze header row
  sheet.views = [{ state: 'frozen', ySplit: 1 }];

  // Save
  const filePath = path.join(__dirname, 'WebKreatives_Leads_50_Businesses.xlsx');
  await workbook.xlsx.writeFile(filePath);
  console.log(`Excel file created successfully: ${filePath}`);
  console.log(`Total businesses: ${businesses.length}`);
}

createBusinessList().catch(err => {
  console.error('Error creating Excel:', err);
  process.exit(1);
});
