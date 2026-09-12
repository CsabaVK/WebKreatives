/* Scootershop Den Haag — the facts the pages read from.
   Everything a person might want to change lives here: opening hours,
   prices, the highlighted reviews, contact details. The pages render from
   this file, so a new price or a new opening time never needs an HTML edit. */
window.SSDH = {
  name: 'Scootershop Den Haag',
  owner: 'Ali',
  phone: '06 34554910',
  phoneRaw: '+31634554910',
  whatsapp: '31634554910',
  email: 'info@scootershopdenhaag.nl',
  address: { street: 'Marktweg 384', zip: '2525 JR', city: 'Den Haag' },
  mapsUrl: 'https://www.google.com/maps?q=Scootershop+Den+Haag,+Marktweg+384,+2525+JR+Den+Haag',
  instagram: 'https://www.instagram.com/scootershop_den_haag/',
  facebook: 'https://www.facebook.com/people/Scootershop-Den-Haag/100064209454489/',

  /* Google Business: rating and count as shown on Google Maps (Sept 2026). */
  google: { rating: 4.5, count: 309 },

  /* Opening hours, 24h clock; null = closed. Google says 22:00, the old site
     said 20:00. Change `close` here if the shop closes earlier. */
  hours: [
    { d: 'Maandag',   open: '11:00', close: '22:00' },
    { d: 'Dinsdag',   open: '11:00', close: '22:00' },
    { d: 'Woensdag',  open: '11:00', close: '22:00' },
    { d: 'Donderdag', open: '11:00', close: '22:00' },
    { d: 'Vrijdag',   open: '11:00', close: '22:00' },
    { d: 'Zaterdag',  open: '11:00', close: '22:00' },
    { d: 'Zondag',    open: null,    close: null }
  ],

  /* Brands on the shop sign, in that order. */
  brands: ['Piaggio', 'Vespa', 'SYM', 'Peugeot', 'Gilera', 'Aprilia', 'AGM', 'La Souris', 'BTC', 'Kymco'],

  /* Prices. `from: true` renders "vanaf". `was` renders a struck-out old price. */
  service: {
    name: 'Grote beurt', price: 100, was: 140,
    note: 'Alle merken. Op afspraak meestal dezelfde dag klaar.',
    checklist: [
      'Motorolie verversen', 'Bougie vervangen', 'Luchtfilterelement vervangen',
      'Bandenspanning', 'Voorrem reinigen', 'Achterrem afstellen',
      'Transmissieolie verversen', 'Kleppen afstellen', 'V-snaar vervangen',
      'Variateurrollen vervangen', 'Variateurgeleiders vervangen', 'Variateur reinigen',
      'Remblokken voorrem check', 'Benzinefilter vervangen', 'Bandenprofiel check',
      'Kickstarter reinigen en invetten'
    ]
  },
  repairs: [
    { name: 'Nieuwe band, inclusief montage', price: 60, from: true },
    { name: 'Accu vervangen', price: 35, from: true },
    { name: 'Remmen vervangen', price: 30, from: true },
    { name: 'Lampen vervangen', price: 10, from: true },
    { name: 'Startproblemen, diagnose en reparatie', price: null, note: 'Prijs na diagnose' }
  ],
  upgrades: [
    { name: 'Keuring blauw naar geel kenteken', price: 75, from: true },
    { name: 'Nieuwe of custom kappen plaatsen', price: 75, from: true },
    { name: 'Opvoeren', price: 25, from: true, note: 'Afhankelijk van het type scooter' }
  ],
  damage: [
    { name: 'Taxatie voor de verzekering', price: 50 },
    { name: 'Schaderapport opstellen', price: 0, note: 'Bij de taxatie inbegrepen' },
    { name: 'Lak- en spuitwerk', price: null, note: 'Offerte na het zien van de schade' }
  ],

  /* WhatsApp openers. The key matches data-wa="…" on a button. */
  wa: {
    default: 'Hoi Scootershop Den Haag, ik wil mijn scooter langsbrengen. Kan dat vandaag?',
    beurt: 'Hoi, ik wil een grote beurt (€100) laten doen. Wanneer kan ik langskomen?',
    reparatie: 'Hoi, mijn scooter heeft een probleem: ',
    schade: 'Hoi, ik heb schade aan mijn scooter en wil graag een taxatie. Wanneer kan ik langskomen?',
    keuring: 'Hoi, ik wil mijn scooter laten keuren (snor naar brom / blauw naar geel / WOK). Wat is er nodig?',
    haalbreng: 'Hoi, ik wil graag gebruikmaken van de haal- en brengservice. Mijn adres is: ',
    upgrade: 'Hoi, ik wil mijn scooter laten opvoeren of nieuwe kappen. Wat kost dat voor mijn scooter?'
  },

  /* Highlighted reviews: real Google reviews, five stars, as written.
     `ago` is the age in months at the time of writing (Sept 2026). */
  reviews: [
    { name: 'Alexander Schreuders', ago: 2,
      text: 'Vandaag weer geweest voor een grote beurt voor mijn Peugeot Django, zoals altijd een superservice voor een betaalbare prijs, vriendelijk en kom hier zeker terug.' },
    { name: 'Ed Yil', ago: 6,
      text: 'Beste scooterreparateur uit Den Haag. Staan altijd voor je klaar en zijn ook vooral nette mensen. Werken goed en snel, voor een eerlijk tarief.' },
    { name: 'Miraç', ago: 3,
      text: 'Top zaak! Vriendelijk personeel, eerlijk advies en snel geholpen. Weet precies waar ze het over hebben. Absolute aanrader!' },
    { name: 'Donnie Bankoe', ago: 3,
      text: 'Uitstekende service! Vriendelijk en deskundig personeel dat echt met je meedenkt. Mijn scooter werd snel en vakkundig gerepareerd tegen een eerlijke prijs. De communicatie was duidelijk en ik werd goed op de hoogte gehouden.' },
    { name: 'Live Master', ago: 5,
      text: 'Ik ging zonder afspraak voor een niet-startende scooter. Toen ik aan de beurt was, storing met een nieuwe bobine verholpen. Prima service!' },
    { name: 'Naoufal Zabouh', ago: 4,
      text: 'Ik had startproblemen met mijn scooter en bracht hem naar deze topgarage. Snel geholpen en mijn scooter werkt top. Een aanrader.' }
  ]
};
