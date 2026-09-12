/* Auto District — the facts the pages read from.
   Everything a person might need to change lives here: hours, team,
   highlighted reviews, company details. The pages render from this file,
   so nothing in the HTML has to be touched for a new opening time or a
   new colleague. */
window.AD = {
  name: 'Auto District',
  phone: '+31 6 54 97 78 50',
  phoneRaw: '+31654977850',
  whatsapp: '31654977850',
  email: 'info@autodistrict.nl',
  address: { street: 'Jupiter 39-B', zip: '2685 LV', city: 'Poeldijk' },
  mapsQuery: 'Auto District, Jupiter 39-B, 2685 LV Poeldijk',
  placeId: 'ChIJ450IXmSzxUcRIZTbUZUGf4g',
  /* TODO before go-live: confirm both with the client */
  kvk: '00000000',
  btw: 'NL000000000B01',

  /* Google: rating and count as shown on the current site (Sept 2026).
     Add a Places API key restricted to autodistrict.nl and the page will
     fetch the live number and the five latest reviews instead. */
  google: { rating: 5.0, count: 298, placesKey: '' },

  /* Opening hours. 24h clock; null = closed. TODO: confirm with the client */
  hours: [
    { d: 'Maandag',   open: '08:00', close: '17:30' },
    { d: 'Dinsdag',   open: '08:00', close: '17:30' },
    { d: 'Woensdag',  open: '08:00', close: '17:30' },
    { d: 'Donderdag', open: '08:00', close: '17:30' },
    { d: 'Vrijdag',   open: '08:00', close: '17:30' },
    { d: 'Zaterdag',  open: null,    close: null, note: 'Op afspraak' },
    { d: 'Zondag',    open: null,    close: null }
  ],

  /* Team. Photo paths are relative to the site root; leave photo empty for
     an initial-avatar. TODO: names and roles from the client */
  team: [
    { name: 'Naam', role: 'Eigenaar · APK-keurmeester', photo: '' },
    { name: 'Naam', role: 'Monteur · APK-keurmeester', photo: '' },
    { name: 'Naam', role: 'Monteur · APK-keurmeester', photo: '' }
  ],

  /* Highlighted reviews: five, each with a picture slot. Real Google
     reviews the client picks; photo is a path under assets/. Until they
     arrive the cards say so. */
  reviews: [
    { name: 'Naam klant', photo: '', stars: 5, when: 'Google · datum', text: 'Uitgelichte Google-review 1. Tekst, naam en foto volgen van de klant.' },
    { name: 'Naam klant', photo: '', stars: 5, when: 'Google · datum', text: 'Uitgelichte Google-review 2. Tekst, naam en foto volgen van de klant.' },
    { name: 'Naam klant', photo: '', stars: 5, when: 'Google · datum', text: 'Uitgelichte Google-review 3. Tekst, naam en foto volgen van de klant.' },
    { name: 'Naam klant', photo: '', stars: 5, when: 'Google · datum', text: 'Uitgelichte Google-review 4. Tekst, naam en foto volgen van de klant.' },
    { name: 'Naam klant', photo: '', stars: 5, when: 'Google · datum', text: 'Uitgelichte Google-review 5. Tekst, naam en foto volgen van de klant.' }
  ]
};
