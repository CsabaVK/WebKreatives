/* Auto District — the facts the pages read from.
   Everything a person might need to change lives here: hours,
   highlighted reviews, company details. The pages render from this file,
   so nothing in the HTML has to be touched for a new opening time or a
   new review. */
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

  /* Highlighted reviews: five real Google reviews, each with its own
     photo under assets/reviews/. `text` is the review as written on Google,
     `nl` the Dutch reading shown when the site is in Dutch, `ago` the age in
     years. Without a name the card says "Klant via Google". */
  reviews: [
    { name: 'T U', photo: 'assets/reviews/review-1.webp', stars: 5, ago: 2,
      nl: "Auto District is een geweldige garage. Ik werd meteen geholpen. Het is een VAG-gespecialiseerde garage, maar ze hebben mijn Mercedes-Benz uitstekend verzorgd. Ik kom zeker terug.",
      text: "Auto District is a great garage. I was helped right away. It's a VAG-specialized garage, but they took excellent care of my Mercedes-Benz. I'll definitely be back." },
    { name: 'A Toker', photo: 'assets/reviews/review-2.webp', stars: 5, ago: 2,
      nl: "Deze garage biedt uitstekende service en een vriendelijke, professionele aanpak. Ik wens Fatih veel succes in zijn werk.",
      text: "This garage offers excellent service and a friendly, professional approach. I wish Fatih continued success in his work." },
    { name: 'Csaba Garaguly', photo: 'assets/reviews/review-3.webp', stars: 5, ago: 3,
      nl: "Vriendelijke en snelle autoservice. De prijs en de tijd werden vooraf verteld voordat ze eraan begonnen, zoals ik had gevraagd. Ze spreken ook perfect Engels, wat het zeer aan te raden maakt voor internationale klanten. De auto was dezelfde dag klaar om op te halen! Zeker een aanrader, de beste service waar ik ooit ben geweest!",
      text: "Friendly and fast auto service. The price and the time was told before they started working on it as I asked them to. They speak also perfect English which makes it very much recommended for international as well. Car was done the same day and ready for pick up! Definitely can recommend, best service I ever went to!" },
    { name: 'Philipp Jansen', photo: 'assets/reviews/review-4.webp', stars: 5, ago: 3,
      nl: "Vanochtend ben ik bij Auto District geweest om de camper van mijn ouders te laten nakijken, en ik was enorm onder de indruk van de service. Ondanks de spontane afspraak hielpen ze ons graag: ik belde de avond ervoor en had 's ochtends meteen een plek. We waren snel geholpen en kregen verse koffie terwijl we wachtten. We komen zeker terug voor andere reparaties.",
      text: "This morning I visited Auto District to have my parents' campervan checked out, and I was extremely impressed with the service. Despite the spontaneous appointment they were more than happy to help: I called the evening before and had a slot first thing in the morning. They got us in and out quickly and gave us fresh coffee while we waited. We will definitely be returning for other repairs." },
    { name: 'MJ Lagerwerf', photo: 'assets/reviews/review-5.webp', stars: 5, ago: 3,
      nl: "Auto District is echt een geval van \"klein maar fijn\". De mannen zijn heel deskundig, open en transparant. Nog een klein detail: als ik mijn kind meeneem, behandelen ze hem goed! Ik heb er het volste vertrouwen in om mijn auto hier te laten onderhouden.",
      text: "Auto District is a true case of \"small but mighty.\" The guys are really knowledgeable, open and transparent. Another small detail: when I bring my child, they treat him well! I have complete confidence in having my car serviced here." }
  ]
};