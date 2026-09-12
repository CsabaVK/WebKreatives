# Design

Static HTML, one `site.css`, one `site.js`, all facts in `data.js`. No framework, no
build step. Fonts from Google Fonts, everything else self-hosted under `assets/`.

## Theme

Light. Scene: a delivery rider on the Marktweg pavement at 10:50 in full daylight,
phone at arm's length, scooter dead beside them, deciding in twenty seconds whether
to push it here. Sunlight kills dark UIs and thin type. Paper-white ground, ink
type, one loud accent.

## Color strategy

Committed. One colour, the Italian green from the logo, carries about a third of
the page: the same-day band, the price ticket, every primary button. Everything
else is warm paper and warm ink. No second accent; the red in the logo stays in
the logo.

## Palette (OKLCH)

| Token | Value | Use |
|---|---|---|
| `--paper` | `oklch(97.5% 0.008 85)` | page ground |
| `--paper-2` | `oklch(94.5% 0.012 85)` | alternate section, input fields |
| `--ink` | `oklch(21% 0.012 60)` | headings, body, footer ground |
| `--ink-2` | `oklch(42% 0.012 60)` | secondary text on paper |
| `--ink-3` | `oklch(62% 0.01 60)` | captions, dividers |
| `--line` | `oklch(86% 0.012 85)` | hairlines on paper |
| `--green` | `oklch(58% 0.17 150)` | accent: buttons, band, ticket, open-now |
| `--green-deep` | `oklch(44% 0.14 150)` | hover, text on green tint |
| `--green-tint` | `oklch(93% 0.05 150)` | soft green ground for callouts |
| `--on-green` | `oklch(98% 0.01 150)` | text on green |
| `--on-ink` | `oklch(95% 0.008 85)` | text on ink |

Never `#000` or `#fff`. Every neutral carries the warm hue (85) or the ink hue (60).

## Typography

One family, **Archivo** (variable: weight 100 to 900, width 62 to 125). Chosen as a
physical object: the hand-painted price board above a market stall, the sign on the
Marktweg shopfront. Voice words: loud, handy, street. Contrast comes from weight and
width inside the family, not from a second face.

- Display: Archivo, weight 800 to 900, width 110 to 125 (expanded), leading 0.92 to
  1.0, tracking -0.02em above 40px.
- Body: Archivo 400 and 500, width 100. 17px on phones, 18px from 720px up. Line
  length 60 to 68ch.
- Figures: prices and times in Archivo 700, width 88 (slightly condensed), with
  `font-variant-numeric: tabular-nums`.
- Never Inter, Roboto, Instrument, DM, Plus Jakarta, Space Grotesk.

Scale (fluid, clamp):

| Step | Size | Use |
|---|---|---|
| `--t-hero` | 44px to 104px | one headline per page |
| `--t-1` | 34px to 60px | section titles |
| `--t-2` | 26px to 36px | service names, prices in list |
| `--t-3` | 20px to 24px | subheads, ticket rows |
| `--t-body` | 17px to 18px | body |
| `--t-small` | 14px to 15px | captions, hours table, footer |

Ratio between steps at least 1.25. No all-caps body. Caps labels only in Archivo
600, 13px, width 100, tracking 0.08em, and sparingly (eyebrows, table heads).

## Spacing and layout

Base 8px. Section padding varies on purpose: hero 40/64px, promise band 96/128px,
list sections 72/112px, footer 56px. Container 1200px, side gutter 20px on phones,
40px from 900px.

Twelve-column grid from 900px. Hero is 7 + 5 (headline left, ticket right). Service
rows alternate 5 + 7 photo and text, never a card grid. Reviews run as a staggered
three-column masonry, not three equal boxes.

Left-aligned by default. Only the promise band centres its one line.

## Components

- **Nav**: logo mark + wordmark left, four links, green WhatsApp button right.
  Sticky, paper ground, hairline bottom. Phone: logo, WhatsApp button, burger; menu
  stacks one link per line at `--t-2`.
- **Open-now pill**: reads `data.js` hours, shows "Nu open · tot 20:00" or "Gesloten
  · morgen 11:00". Green dot when open, ink-3 dot when closed.
- **Ticket**: the same-day promise as a receipt: "Gebracht 11:00" and "Klaar
  vandaag" rows, a dashed rule, `--t-2` figures. Green ground, on-green type,
  slight paper-torn top edge in SVG. This is the hero's right column.
- **Price rows**: name left, price right, one hairline between rows. Grote beurt
  gets the full checklist as an expandable `<details>`.
- **Service row**: real photo (workshop, storefront, lift) beside a title, two
  lines, and a price line. Alternates sides.
- **Review**: quote at `--t-3`, name and age below, five stars as text glyphs in
  green. Header carries "4,5 op Google · 309 reviews".
- **Buttons**: green fill with on-green text (primary), ink outline (secondary).
  Radius 6px. 48px tall. Icon after label, arrow only.
- **Footer**: ink ground, on-ink text, hours table with tabular figures, address
  linking to Maps, Instagram, WhatsApp, e-mail.

## Motion

- Ticket timeline draws once on load: a line from 11:00 to 20:00 fills in 1.2s,
  ease-out-quint, the "Klaar" row fades in at the end. Explains the promise.
- Reveal on scroll: opacity + 12px translate, 500ms, ease-out-quart, staggered
  80ms. Nothing else moves.
- `prefers-reduced-motion`: every animation off, final state shown.

## Imagery

Only the shop's own photos, under `assets/` as webp, 1600px max, 80 quality:
storefront (FOTO-2), scooter on the red lift (FOTO-9, FOTO-10), the row outside
(FOTO-5, FOTO-7), the workshop interior (FOTO-8, sss). Never the Meta AI renders,
never the theme's stock welder. Logo: `logo-final.jpg` traced to SVG for the nav,
mark only for the favicon.

## Banned here

Purple or blue gradients, glass blur, icons in circles, three equal cards, emoji
bullets, side-stripe borders, gradient text, `Inter`, `Roboto`, "Welkom bij".
