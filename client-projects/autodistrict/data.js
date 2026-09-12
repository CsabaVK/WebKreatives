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
  kvk: '71785213',

  /* Google: rating and count as shown on the current site (Sept 2026).
     Add a Places API key restricted to autodistrict.nl and the page will
     fetch the live number and the five latest reviews instead. */
  google: { rating: 5.0, count: 298, placesKey: '' },

  /* Opening hours. 24h clock; null = closed. */
  hours: [
    { d: 'Maandag',   open: '08:00', close: '17:00' },
    { d: 'Dinsdag',   open: '08:00', close: '17:00' },
    { d: 'Woensdag',  open: '08:00', close: '17:00' },
    { d: 'Donderdag', open: '08:00', close: '17:00' },
    { d: 'Vrijdag',   open: '08:00', close: '17:00' },
    { d: 'Zaterdag',  open: '08:30', close: '13:00' },
    { d: 'Zondag',    open: null,    close: null }
  ],

  /* Team. Photo paths are relative to the site root; leave photo empty for
     an initial-avatar. TODO: names and roles from the client */
  team: [
    { name: 'Naam', role: 'Eigenaar · APK-keurmeester', photo: '' },
    { name: 'Naam', role: 'Monteur · APK-keurmeester', photo: '' },
    { name: 'Naam', role: 'Monteur · APK-keurmeester', photo: '' }
  ],

  /* Highlighted reviews: five real Google reviews, each with its own
     photo under assets/reviews/. Names can be added later; without one the
     card says "Klant via Google". */
  reviews: [
    { name: '', photo: 'assets/reviews/review-1.webp', stars: 5, when: '', text: "Auto District is a great garage. I was helped right away. It's a VAG-specialized garage, but they took excellent care of my Mercedes-Benz. I'll definitely be back." },
    { name: '', photo: 'assets/reviews/review-2.webp', stars: 5, when: '', text: "This garage offers excellent service and a friendly, professional approach. I wish Fatih continued success in his work." },
    { name: '', photo: 'assets/reviews/review-3.webp', stars: 5, when: '', text: "Friendly and fast auto service. The price and the time was told before they started working on it as I asked them to. They speak also perfect English which makes it very much recommended for international as well. Car was done the same day and ready for pick up! Definitely can recommend, best service I ever went to!" },
    { name: '', photo: 'assets/reviews/review-4.webp', stars: 5, when: '', text: "This morning I visited Auto District to have my parents' campervan checked out, and I was extremely impressed with the service. Despite the spontaneous appointment they were more than happy to help: I called the evening before and had a slot first thing in the morning. They got us in and out quickly and gave us fresh coffee while we waited. We will definitely be returning for other repairs." },
    { name: '', photo: 'assets/reviews/review-5.webp', stars: 5, when: '', text: "Auto District is a true case of \"small but mighty.\" The guys are really knowledgeable, open and transparent. Another small detail: when I bring my child, they treat him well! I have complete confidence in having my car serviced here." }
  ]
};