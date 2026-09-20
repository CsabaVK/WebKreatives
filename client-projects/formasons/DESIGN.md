# Design

Static HTML, one `site.css`, one `site.js`, one `mark.js` (the 3D mark), all facts
in `data.js`. No framework, no build step. Fonts from Google Fonts, Three.js from
jsdelivr, everything else self-hosted under `assets/`. No GSAP: the mark's
glide is a per-frame lerp and the reveals are one IntersectionObserver.

## Theme

Light. Scene: an estate manager at a desk on the fourth floor of a Paddington
office, 10:15 on a Tuesday, three provider tabs open, deciding which one to ring
before the next meeting. Daylight through the window, a Portland-stone building
across the street. The page should feel like the one provider whose paperwork
is already in order.

## Color strategy

Committed. One hue, the mark's own green, carries the page: the deepest shade is
the ink for every headline and paragraph, the mid shade is the only accent
(buttons, rules that matter, the 3D mark's material), the palest shade tints a
callout ground. Everything else is warm stone. No second accent, no black, no
white.

## Palette (OKLCH)

| Token | Value | Use |
|---|---|---|
| `--stone` | `oklch(96.5% 0.009 80)` | page ground |
| `--stone-2` | `oklch(93% 0.012 80)` | alternate section, inputs |
| `--stone-3` | `oklch(86% 0.014 80)` | hairlines |
| `--ink` | `oklch(24% 0.028 190)` | headings, body, footer ground (the mark's #0b2625) |
| `--ink-2` | `oklch(42% 0.022 190)` | secondary text |
| `--ink-3` | `oklch(60% 0.016 190)` | captions, numerals in lists |
| `--green` | `oklch(41% 0.085 140)` | accent: buttons, active rules, the 3D mark (the banner's #2d461d) |
| `--green-deep` | `oklch(33% 0.08 140)` | hover |
| `--green-tint` | `oklch(92% 0.03 140)` | callout ground |
| `--on-green` | `oklch(97% 0.01 140)` | text on green |
| `--on-ink` | `oklch(94% 0.01 80)` | text on ink |

## Typography

Two faces, one job each.

- **Display: Bodoni Moda** (variable, optical size 6 to 96, weight 400 to 900).
  Chosen because it is the wordmark's own family: a Didone with hairline serifs
  and a strong vertical stress. Used for every headline, for the big numerals in
  the process ledger, and for pull figures. Weight 600 for headings, 500 for quotes.
  `opsz` is held LOW on purpose (28 for the hero, 22 for section titles, 14 for
  service names, 11 for quotes and numerals): the text optical sizes keep the
  hairlines thick enough to read on screen; the display sizes went to thread and
  were unreadable. Leading 1.02, tracking -0.005em. Never italic except for one
  word in the hero.
- **Text: Libre Franklin** (variable, weight 300 to 900). A plain American
  gothic with a British-civil-service plainness to it: forms, ledgers, contract
  schedules. Body 400, emphasis 600, labels 500. 17px on phones, 18px from 720px.
  Line length 58 to 66ch. `font-variant-numeric: tabular-nums` on any column of
  figures.
- Never Inter, Roboto, Playfair, Cormorant, Manrope, DM Sans, Space Grotesk.

Scale (fluid, clamp):

| Step | Size | Use |
|---|---|---|
| `--t-hero` | 48px to 112px | one headline per page |
| `--t-1` | 36px to 64px | section titles |
| `--t-2` | 26px to 40px | service family names, ledger numerals |
| `--t-3` | 20px to 24px | subheads, promise lines |
| `--t-body` | 17px to 18px | body |
| `--t-small` | 13px to 14px | labels, captions, footer |

Caps labels only in Libre Franklin 500, 13px, tracking 0.12em, used as eyebrows
and table heads.

## Spacing and layout

Base 8px. Section padding varies with weight: hero 48/96px, services 96/144px,
process 96/128px, promises 80/112px, contact 96/128px, footer 64px. Container
1280px, gutter 20px on phones, 48px from 900px.

Twelve-column grid from 900px. Left-aligned throughout; nothing centred.

- Hero: headline across 8 columns left; the schedule (six service families as a
  numbered list with a rule under each) sits in the right 4 columns, offset one
  row down so it hangs below the headline's baseline.
- Services: each family is a full-width row, family name in `--t-2` on the left
  4 columns, its named lines in a two-column text list on the right 7 columns,
  numeral `01` to `06` in `--ink-3` at the far left. A hairline between rows.
  The 3D mark parks under the family name on odd rows and at the row's end on
  even rows; no empty column is reserved between name and lines.
- Process: a ledger. Six rows, `--t-2` numeral, step name, one line of what
  happens. Left 7 columns; the right 4 hold one promise in `--t-3` that stays
  sticky while the ledger scrolls.
- Promises: five short sentences in `--t-3`, stacked, on a `--green-tint`
  ground with the ink rule above.
- Coverage and contact: address and phone in the left 5 columns, form in the
  right 6 columns, one column of air between.

## Components

- **Nav**: SVG mark + "FORMASONS" wordmark in Bodoni Moda 600 with "ESTATES" in
  Libre Franklin caps beneath, four links, ink phone button right. Sticky,
  stone ground, hairline bottom. Phone: mark, phone button, burger; menu stacks
  links at `--t-2`.
- **Schedule** (hero right): numbered list, family names in Libre Franklin 600,
  each with a hairline and a small arrow that links to the row below.
- **Service row**: as above. No icons, no cards.
- **Ledger row**: numeral, name, one line. Hover raises nothing; the row is
  text.
- **Promise line**: a sentence, a rule, a sentence, set in Libre Franklin 500
  at `--t-3` (contract lines belong to the text face).
- **Recognition**: one typographic row, Libre Franklin caps eyebrow "Recognition"
  then the four names set in Bodoni Moda `--t-3`, separated by hairlines. No
  badge images, no laurels.
- **Testimonial**: quote in Bodoni Moda `--t-3`, name in Libre Franklin 500
  beneath, three in a staggered 5/4/3-column stack, never three equal boxes.
- **Buttons**: green fill with on-green text (primary), ink outline (secondary).
  Radius 2px. 52px tall. Label only, arrow after label on the primary.
- **Form**: stacked fields, visible labels above, stone-2 inputs with a 1px ink
  bottom rule only, no boxes. Submit is a primary button. Success state replaces
  the form with one sentence.
- **Footer**: ink ground, on-ink type. Address, both phone numbers, e-mail,
  the four FGL names in a row, privacy link.

## The mark (3D)

The fleur-de-lis mark rebuilt in Three.js as a procedural model: a chevron
(extruded triangle with a slot), two scrolls (tubes along a spiral, one mirrored),
a spear point (extruded rhombus). Material `--green`, low roughness, a soft
hemisphere light plus one key light so the scrolls read as round. About 96px tall
on desktop, 64px on phones, rendered on a fixed transparent canvas over the page,
`pointer-events: none`.

Behaviour: the mark is the hero's object. It starts large (about 320px tall on
desktop, 180px on phones) in the hero's right columns beside the schedule, and
it never leaves the screen. Every section (and every service row) declares an
anchor slot, and the slots alternate sides down the page: hero right, cleaning
left gutter, maintenance right, security left, and so on, so the mark's path is
a zigzag. Movement is scroll-driven and smoothed: the mark's target is the
current anchor (the last one to cross 60% of the viewport), and position, scale
and rotation ease toward the target every frame (lerp, about 0.08 per frame at
60fps, no tween library) so a scroll reads as one continuous glide rather than a series of jumps.
On each change of anchor it lifts on an arc (up, then down) and turns half a
turn on its vertical axis; parked, it idles with one slow turn every 24s. It
shrinks from hero size to about 96px as it leaves the hero and stays that size
for the rest of the page. It never sits over text: anchors are placed in gutters
and margins that the grid reserves for it. On resize, anchors are re-measured
and the mark snaps to the current one.

`prefers-reduced-motion`: canvas not created; a static SVG of the mark appears
in every anchor slot instead. Below 720px the mark still hops but at 64px and
only between sections, not between service rows.

## Visuals beside the text

Drawn, not photographed. Every visual on the home page is an ink-hairline
drawing on stone with green where the work happens, in the language of a
survey or a schedule: the estate steward's paperwork.

- Service rows: one floor plan (lobby, two meeting rooms, office, corridor,
  kitchen, plant, store, WC, a bin yard outside), drawn six times in
  `site.js`; the green highlight is what that family touches: hatched rooms
  for cleaning, the plant room and services runs for maintenance, the
  perimeter, lobby and camera points for security, crosses for the handyman's
  fixings, the WC block and dispensers for washroom, the kitchen-to-yard route
  for waste. Highlights fade in as the row reveals.
- Process aside: a sample week (`sampleSchedule` in data.js) set as a small
  document on stone with hairlines.
- Ledger: a 2px green rule fills as the reader scrolls the six steps
  (`animation-timeline: view()`); each numeral turns green as its row reveals.
- Band: a drawn six-storey elevation with the overnight timeline (22:00 to
  08:30) as leader-line notes either side; the windows light up floor by floor
  as it scrolls into view.

## Motion

- The hop, as above. It is the page's only animation of note.
- Photos settle from a 1.08 zoom to rest as they enter (scroll-driven,
  `@supports (animation-timeline: view())`, otherwise static).
- Reveal on scroll: opacity + 10px translate, 500ms, `power3.out`, stagger 70ms
  on lists. Nothing else moves.
- `prefers-reduced-motion`: reveals off, final state shown.

## Imagery

One photograph, carried over from the current site: `london` (Millennium
Bridge towards St Paul's) under the hero at 21:9, 1600px and 800px webp. Every
other visual is drawn (above). When the client supplies their own photos
(Kingdom Street, a team member on site) they may replace the drawings in the
service rows one for one; until then no stock.

## Banned here

Purple or blue gradients, glass blur, icons in circles, three equal cards,
emoji bullets, star ratings, badge images (recognition is set as type), gradient text, drop shadows on
cards, `Inter`, `Roboto`, "Welcome to", "legacy", "impeccable", "tapestry".
