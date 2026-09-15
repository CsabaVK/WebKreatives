# Print templates

Brand-agnostic templates for the print side of the service: stickers and business
cards now, standalone QR codes next. Everything renders from a client spec through
headless Chrome, and every QR gets a decode proof before it can go to print.

The WebKreatives version of these lives in `_design/` and follows `DESIGN.md`. This
folder is the productised copy: same rules, any brand.

## Files

| File | Role |
|---|---|
| `sticker.html` | the 50 mm sticker artboard, driven by CSS custom properties and slots |
| `card.html` | the 85 x 55 mm business card, front and back, same properties and slots |
| `qr.py` | styled QR as SVG: dots or rounded, rings and eyes, a few coloured dots, a badge gap |
| `check.py` | decode proof with zxing-cpp at full, 400, 280, 200 px and through blur |
| `render.cjs` | sticker: spec in, print PNG + trimmed preview + QR SVG out, proof run last |
| `card.cjs` | card: spec in, front + back PNGs, stacked preview, QR SVG, proof on the code |
| `specs/*.json` | one spec per client; `webkreatives.json` and `scootershopdenhaag.json` are the references |
| `out/` | renders, ignored by git |

```
node templates/print/render.cjs templates/print/specs/<client>.json templates/print/out
node templates/print/card.cjs   templates/print/specs/<client>.json templates/print/out
```

Exit code 2 means the proof failed: the file is written but must not be printed.

## The spec

```json
{
  "slug": "client",
  "name": "Client Name",
  "url": "https://client.nl/sticker",
  "urlText": "client.nl",
  "eyebrow": "Websites by",
  "logo": "client-wordmark.png",
  "logoHeight": 96,
  "fontsUrl": "https://fonts.googleapis.com/css2?family=...",
  "fonts": { "display": "'Family', sans-serif", "body": "'Family', sans-serif" },
  "colors": { "ground": "#110d0c", "type": "#f2ede4", "accent": "#df3821" },
  "qr": { "style": "dots", "eye": "#f14b35", "accents": ["#hex", "#hex"] },
  "badge": { "letter": "C", "bars": ["#hex", "#hex"] },
  "marks": ["#hex", "#hex", "#hex", "#hex"],
  "markShapes": "mixed",
  "card": {
    "url": "https://client.nl/card",
    "ground": "#0c0c0d",
    "logoHeight": 300,
    "person": { "eyebrow": "Co-Founder", "name": "First *Last*" },
    "services": ["Web Design", "*Hosting*", "Support", "*Branding*"],
    "lines": ["hello@client.nl", "client.nl", "+31 6 12 34 56 78"],
    "qr": { "eye": "#hex", "accents": ["#hex"] },
    "radius": 0
  }
}
```

- `logo` is a path relative to the spec. Leave it out and the name is set as a
  wordmark in the display font, shrunk to one line.
- `url` is what the code carries; `urlText` is what is printed. Print the bare
  domain, let the code carry the path (`/sticker`, a redirect with a `utm_source`).
- `qr.eye` defaults to the module colour. `qr.accents` is the list of coloured dots
  in order; keep it under ten. `badge: false` removes the badge and closes the gap.
- `marks` are four colours for the corner cluster: big circle, small square, big
  square, small circle. Omit for no cluster. `markShapes`: `mixed` (default),
  `squares`, `circles`.
- `card` is read by `card.cjs` only; every key is optional. `card.url` should be its
  own redirect (`/card`, `utm_source=card`) so a scan from a card and a scan from a
  sticker are told apart. `ground` overrides the sticker ground for the card only.
  `person.name` takes one starred word for the accent; leave `person` out and the
  back leads with the domain instead. `services` print as one centred line along
  the bottom with points between; a starred word takes the accent, keep it to four
  or five. `lines` print in order, middle-left: mail, site, phone. `qr`
  overrides the sticker's `qr` block for the card; leave it out and the card's code
  matches the sticker's. `radius` is the die-cut corner in mm, for the preview only.

## What makes it look right

Learned on the WebKreatives sticker, September 2026. Keep these unless the client's
brand says otherwise.

**Ground.** Match the client's site. Dark site, dark sticker. The sticker is a piece
of the site that ended up on a window.

**Polarity of the code.** On a dark ground the modules are light: an inverted code.
Phone cameras read it, zxing reads it, some old scanner apps do not. On a light
ground the modules are dark and every scanner reads it. Both are fine; the proof
decides.

**Colour inside the code.** A decoder thresholds on luminance, so a colour is either
"module" or "ground" to it. On a dark ground, a light colour (cream, lime, yellow)
is a module and can sit anywhere; a mid colour (red, blue) reads as ground and flips
whatever it covers. Error correction H absorbs a handful of flips, so a few red or
blue dots are free. The eye centre is different: it is part of the finder pattern
and a mid colour there breaks detection at distance. WebKreatives' brand red
`#df3821` killed the read below 400 px; the brighter `#f14b35` reads down to 160.
For a client, pick the eye colour from their palette and let `check.py` say no.

**The badge.** A 9-module square left empty in the middle, with the client's initial
in the display font and two short bars in two brand colours, on the sticker ground.
No box around it. Error correction covers the hole.

**The cluster.** Four shapes in four sizes, from the client's palette, overlapping
by a few pixels, circles on opposite corners, squares on a diagonal. Sizes 76, 52,
60, 40 px on the 1120 canvas. It reads as the brand's confetti, not a logo.

**Text.** One eyebrow line in the accent colour with a short rule, the wordmark or
the name under it, the bare domain under the code in the display font. Nothing
else. No phone number, no slogan.

**Geometry.** 50 mm square, 3 mm bleed, 3 mm die-cut radius, 4 mm safe zone, 20 px
per mm, QR 28 mm. Matte vinyl.

**Print surface.** No grain, no gradients, no shadows, no glass. Flat colour prints
true; texture prints as noise.

**Proof.** `check.py` must pass at full, 400, 280 and 200 px and through blur; 160 px
is margin. Then a printed proof scanned with two phones, one iPhone, one Android,
in daylight, before the run.

## The card

85 x 55 mm, 3 mm bleed, 4 mm safe zone, 20 px per mm: 1820 x 1220 px a side, trim at
60 px. Square corners by default. 350 g uncoated or matte laminated; no gloss, the
ink ground shows every fingerprint on gloss.

**Front.** The brand side: eyebrow and wordmark bottom-left (wordmark 15 mm tall),
the cluster top-right at 1.5x the sticker's size. Nothing else. The two sit on a
diagonal and the rest is ground.

**Back.** Top-left: eyebrow and name in display type, one word in the accent.
Middle-left: the contact lines in the small display face, mail, site, phone, the
site as the bare domain. Right: the code at 30 mm, vertically centred, the same
inverted, dotted, badged code as the sticker; nothing printed under it, the domain
is already in the column. Bottom, centred across the card: the services in one
line of the same small display face as the contact lines, muted points between,
one or two words in the accent so the line answers the red in the name. No
labels, no hairlines, no city.

**Ground.** The card ground is a neutral near-black (`#0c0c0d`), a step darker and
cooler than the site's warm ink. Csaba's call, September 2026: the warm ink read
as red on the card. The sticker keeps the warm ground.

**The code.** Same rules as the sticker: light modules on the ground, bright eye
centres, a few coloured dots, the badge in the middle. At 30 mm it is bigger than
the sticker's, so the inverted polarity is less of a gamble than it would be at
stamp size. A light-ground client card takes dark modules through `qr.modules`.
`check.py` runs on the code with 4 mm of ground around it
(`<slug>-card-code.png`), not on the whole side; a card is read from a hand's
length, not across a room.

**Type at 20 px per mm.** Name 76 px (3.8 mm, about 11 pt), contact lines and
services 30 px (about 4.3 pt, Unbounded 700 tracked), eyebrow 26 px (uppercase
Unbounded holds at that size). Nothing under 26 px goes to print.

## Next

- `qr.html`: a standalone code for windows and counters, 100 mm, same styling.
