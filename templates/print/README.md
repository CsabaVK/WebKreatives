# Print templates

Brand-agnostic templates for the print side of the service: stickers now, business
cards and standalone QR codes next. Everything renders from a client spec through
headless Chrome, and every QR gets a decode proof before it can go to print.

The WebKreatives version of these lives in `_design/` and follows `DESIGN.md`. This
folder is the productised copy: same rules, any brand.

## Files

| File | Role |
|---|---|
| `sticker.html` | the 50 mm sticker artboard, driven by CSS custom properties and slots |
| `qr.py` | styled QR as SVG: dots or rounded, rings and eyes, a few coloured dots, a badge gap |
| `check.py` | decode proof with zxing-cpp at full, 400, 280, 200 px and through blur |
| `render.cjs` | spec in, print PNG + trimmed preview + QR SVG out, proof run last |
| `specs/*.json` | one spec per client; `webkreatives.json` and `scootershopdenhaag.json` are the references |
| `out/` | renders, ignored by git |

```
node templates/print/render.cjs templates/print/specs/<client>.json templates/print/out
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
  "markShapes": "mixed"
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

## Next

- `card.html`: 85 x 55 mm, two sides. Front ink with the wordmark and the cluster;
  back with the domain in display type, contact lines in meta, the QR small on a
  light stamp if the ground is dark.
- `qr.html`: a standalone code for windows and counters, 100 mm, same styling.
