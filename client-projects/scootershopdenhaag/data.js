/* Scootershop Den Haag — the facts the pages read from.
   Everything a person might want to change lives here: opening hours,
   prices, the highlighted reviews, contact details. The pages render from
   this file, so a new price or a new opening time never needs an HTML edit.
   Dutch is the site; every `en` / `…En` field is the English reading shown
   when a visitor switches language. */
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
    { d: 'Maandag',   en: 'Monday',    open: '11:00', close: '22:00' },
    { d: 'Dinsdag',   en: 'Tuesday',   open: '11:00', close: '22:00' },
    { d: 'Woensdag',  en: 'Wednesday', open: '11:00', close: '22:00' },
    { d: 'Donderdag', en: 'Thursday',  open: '11:00', close: '22:00' },
    { d: 'Vrijdag',   en: 'Friday',    open: '11:00', close: '22:00' },
    { d: 'Zaterdag',  en: 'Saturday',  open: '11:00', close: '22:00' },
    { d: 'Zondag',    en: 'Sunday',    open: null,    close: null }
  ],

  /* Brands on the shop sign, in that order. */
  brands: ['Piaggio', 'Vespa', 'SYM', 'Peugeot', 'Gilera', 'Aprilia', 'AGM', 'La Souris', 'BTC', 'Kymco'],

  /* Prices. `from: true` renders "vanaf". `was` renders a struck-out old price. */
  service: {
    name: 'Grote beurt', en: 'Full service', price: 100, was: 140,
    note: 'Alle merken. Op afspraak meestal dezelfde dag klaar.',
    noteEn: 'All brands. By appointment, usually ready the same day.',
    checklist: [
      'Motorolie verversen', 'Bougie vervangen', 'Luchtfilterelement vervangen',
      'Bandenspanning', 'Voorrem reinigen', 'Achterrem afstellen',
      'Transmissieolie verversen', 'Kleppen afstellen', 'V-snaar vervangen',
      'Variateurrollen vervangen', 'Variateurgeleiders vervangen', 'Variateur reinigen',
      'Remblokken voorrem check', 'Benzinefilter vervangen', 'Bandenprofiel check',
      'Kickstarter reinigen en invetten'
    ],
    checklistEn: [
      'Engine oil change', 'New spark plug', 'New air filter element',
      'Tyre pressure', 'Front brake cleaned', 'Rear brake adjusted',
      'Transmission oil change', 'Valve clearance adjusted', 'New drive belt',
      'New variator rollers', 'New variator guides', 'Variator cleaned',
      'Front brake pads checked', 'New fuel filter', 'Tyre tread checked',
      'Kick-starter cleaned and greased'
    ]
  },
  repairs: [
    { name: 'Nieuwe band, inclusief montage', en: 'New tyre, fitted', price: 60, from: true },
    { name: 'Accu vervangen', en: 'Battery replaced', price: 35, from: true },
    { name: 'Remmen vervangen', en: 'Brakes replaced', price: 30, from: true },
    { name: 'Lampen vervangen', en: 'Bulbs replaced', price: 10, from: true },
    { name: 'Startproblemen, diagnose en reparatie', en: 'Starting trouble, diagnosis and repair', price: null, note: 'Prijs na diagnose', noteEn: 'Price after diagnosis' }
  ],
  upgrades: [
    { name: 'Keuring blauw naar geel kenteken', en: 'Inspection, blue to yellow plate', price: 75, from: true },
    { name: 'Nieuwe of custom kappen plaatsen', en: 'New or custom body panels fitted', price: 75, from: true },
    { name: 'Opvoeren', en: 'Derestriction (tuning)', price: 25, from: true, note: 'Afhankelijk van het type scooter', noteEn: 'Depends on the scooter model' }
  ],
  damage: [
    { name: 'Taxatie voor de verzekering', en: 'Insurance damage assessment', price: 50 },
    { name: 'Schaderapport opstellen', en: 'Damage report', price: 0, note: 'Bij de taxatie inbegrepen', noteEn: 'Included in the assessment' },
    { name: 'Lak- en spuitwerk', en: 'Paint and spray work', price: null, note: 'Offerte na het zien van de schade', noteEn: 'Quote after we see the damage' }
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
  waEn: {
    default: 'Hi Scootershop Den Haag, I would like to bring my scooter in. Is today possible?',
    beurt: 'Hi, I would like a full service (€100). When can I come by?',
    reparatie: 'Hi, my scooter has a problem: ',
    schade: 'Hi, my scooter is damaged and I need an insurance assessment. When can I come by?',
    keuring: 'Hi, I would like my scooter inspected (moped class change / blue to yellow plate / WOK). What do you need?',
    haalbreng: 'Hi, I would like to use the pick-up and delivery service. My address is: ',
    upgrade: 'Hi, I am interested in derestriction or new body panels. What would that cost for my scooter?'
  },

  /* Highlighted reviews: real Google reviews, five stars, as written.
     `en` is the English reading; `ago` the age in months (Sept 2026). */
  reviews: [
    { name: 'Alexander Schreuders', ago: 2,
      text: 'Vandaag weer geweest voor een grote beurt voor mijn Peugeot Django, zoals altijd een superservice voor een betaalbare prijs, vriendelijk en kom hier zeker terug.',
      en: 'Went back today for a full service on my Peugeot Django. As always, superb service at an affordable price, friendly, and I will definitely be back.' },
    { name: 'Ed Yil', ago: 6,
      text: 'Beste scooterreparateur uit Den Haag. Staan altijd voor je klaar en zijn ook vooral nette mensen. Werken goed en snel, voor een eerlijk tarief.',
      en: 'Best scooter repair shop in The Hague. Always there for you, and decent people above all. Good, fast work at an honest rate.' },
    { name: 'Miraç', ago: 3,
      text: 'Top zaak! Vriendelijk personeel, eerlijk advies en snel geholpen. Weet precies waar ze het over hebben. Absolute aanrader!',
      en: 'Great place! Friendly staff, honest advice and quick help. They know exactly what they are talking about. Highly recommended!' },
    { name: 'Donnie Bankoe', ago: 3,
      text: 'Uitstekende service! Vriendelijk en deskundig personeel dat echt met je meedenkt. Mijn scooter werd snel en vakkundig gerepareerd tegen een eerlijke prijs. De communicatie was duidelijk en ik werd goed op de hoogte gehouden.',
      en: 'Excellent service! Friendly, knowledgeable staff who really think along with you. My scooter was repaired quickly and expertly at a fair price. Communication was clear and I was kept well informed.' },
    { name: 'Live Master', ago: 5,
      text: 'Ik ging zonder afspraak voor een niet-startende scooter. Toen ik aan de beurt was, storing met een nieuwe bobine verholpen. Prima service!',
      en: 'Walked in without an appointment with a scooter that would not start. When it was my turn, the fault was fixed with a new ignition coil. Great service!' },
    { name: 'Naoufal Zabouh', ago: 4,
      text: 'Ik had startproblemen met mijn scooter en bracht hem naar deze topgarage. Snel geholpen en mijn scooter werkt top. Een aanrader.',
      en: 'I had starting trouble with my scooter and took it to this great garage. Helped quickly and my scooter runs perfectly. Recommended.' }
  ]
};
