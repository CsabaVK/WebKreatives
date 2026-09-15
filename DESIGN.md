# WebKreatives — Design System

The one reference for everything WebKreatives puts out under its own name: the website,
LinkedIn and Instagram images, link previews, PDFs. Client sites have their own
`client-projects/<client>/DESIGN.md` and never borrow from this file.

Two artefacts, keep them in sync:

- `DESIGN.md` (this file): the rules and the values.
- `_design/index.html`: the same values rendered, plus the social templates as real
  artboards. `_design/render.cjs` turns an artboard into a PNG. The underscore keeps
  the folder out of the published site.

Source of truth for tokens is `css/theme.css`. When a value here and a value there
disagree, `theme.css` wins and this file gets corrected.

## 1. Character

Direct. Crafted. Confident.

A dark studio page: near-black warm ground, cream type set very large and very tight,
one red accent that does the pointing, grain so the dark never reads as flat CSS. The
logo's three small marks (lime, blue, yellow) are the only other colour, used one at a
time as a geometric aside. Nothing is centred by default; the composition leans on the
left margin and lets the right side breathe.

Anti-references, any hit means redesign: purple or blue gradient washes; a row of three
equal cards with icons in circles; glass blur; everything centred; stock photography;
more than one accent colour on a surface; emoji as bullets; Inter or Roboto.

## 2. Palette

All neutrals carry a warm hue. Never `#000`, never `#fff`.

| Token | Value | Use |
|---|---|---|
| `--ink` | `oklch(8% .010 25)` | page ground, social ground |
| `--ink-2` | `oklch(18% .010 25)` | raised surface, cards, ledger rows |
| `--ink-3` | `oklch(24% .010 25)` | hover, higher elevation |
| `--ink-deep` | `oklch(5% .010 25)` | footer, deepest wells |
| `--cream` | `oklch(97% .008 80)` | display type |
| `--cream-dim` | `oklch(80% .006 80)` | body text on ink |
| `--cream-mute` | `oklch(62% .006 80)` | ledes, secondary text |
| `--cream-faint` | `oklch(56% .006 80)` | meta labels, captions |
| `--cream2` | `oklch(93% .012 80)` | paper ground on the inverted variant |
| `--white` | `oklch(99% .004 80)` | brightest hover on quiet links |
| `--red` | `#df3821` | the accent: one word, the eyebrow, the primary button |
| `--red2` | `oklch(43% .200 25)` | pressed red, rare |
| `--red-deep` | `#a82716` | red on paper |
| `#f14b35` | literal in `theme.css` | the lighter red that wipes in behind a primary button on hover |
| `#0c0c0d` | literal in the card | neutral near-black, the business card ground; the warm ink read as red on paper |
| `--bronze-mist` | `rgba(223,56,33,.10)` | badge and tag fill, red at whisper volume |
| `--bronze-rule` | `rgba(223,56,33,.24)` | badge border, frame border on hover, blockquote rule |
| `--lime` | `#b9e185` | logo mark, one geometric aside |
| `--blue` | `#648dcb` | logo mark, one geometric aside |
| `--yellow` | `#fbeb78` | logo mark, one geometric aside |
| `--grn` | `oklch(68% .150 130)` | status dot, "open for projects" |
| `--rule` | `rgba(239,230,210,.10)` | hairlines on ink |
| `--rule-soft` | `rgba(239,230,210,.06)` | hairlines between list items inside a card |
| `--rule-hard` | `rgba(239,230,210,.18)` | ghost button border, input border, stronger hairline |
| `--line` | `oklch(88% .006 80)` | hairlines on paper |
| `--lined` | `oklch(22% .010 25)` | an opaque hairline where alpha would stack on a dark card |

`--bronze`, `--bronze-mid`, `--bronze-low` and `--sage` are aliases for `--red`, `--red2`,
`--red-deep` and `--grn`, kept so older pages keep reading from the same values. New code
uses the plain names.

Rules:

- Red leads. On any one surface, red is the only saturated colour in the type.
- The neutrals are never grey: every ink carries hue 25, every cream hue 80. `#000` and
  `#fff` appear only as the text on a red fill and the cursor label.
- `--grn` is a status colour: the "open for projects" dot, "open now" on client demos, the
  locked consent toggle. Never a button, never type.
- One secondary mark (lime, blue or yellow) per surface at most, as a shape, never as
  type colour, never two together outside the logo.
- Grain (`.wk-grain`, opacity .035) on every ink surface larger than a card.
- Paper (`--cream2` ground, `--ink` type, `--red-deep` accent) is the inverted variant.
  Used deliberately, never as the default.

## 3. Type

Two families, no third.

| Role | Family | Weight | Tracking | Leading |
|---|---|---|---|---|
| Display | Unbounded | 900 | -.04em | .96 |
| Eyebrow, meta, buttons | Unbounded | 700, uppercase | .13em to .16em | 1 |
| Body | Figtree | 300 (400 on paper) | 0 | 1.7 |
| Lede | Figtree | 300 | 0 | 1.75 |
| Prose (case studies, articles) | Figtree | 300, `strong` 500 | 0 | 1.82 |
| Figures (`.wk-stat-n`, ordinals) | Unbounded | 900 | -.04em to -.05em | 1 |
| Note (`.wk-note`, `.ct-hint`) | Figtree | 300 | 0 | 1.72 |

Web scale: `.wk-h1` clamp(34px, 5.4vw, 74px), `.wk-h2` clamp(26px, 3.6vw, 48px),
`.wk-h3` clamp(19px, 2.1vw, 27px), lede clamp(15px, 1.35vw, 18px), body 16px, prose
16.5px, note 12.5px, eyebrow 10.5px, meta 10px, button 11px. Figures: `.wk-stat-n`
clamp(32px, 3.8vw, 52px); the red ordinal over a frame clamp(44px, 5.4vw, 78px) with a
2px ink text stroke. Prose headings: `h2` Unbounded 900 clamp(24px, 3vw, 36px), `h3`
Figtree 500 18px, blockquote Unbounded clamp(20px, 2.2vw, 27px) on a 2px red rule.

Wide screens step the display up rather than leaving it small in a wider column:
`.wk-h1` 82px and `.wk-h2` 54px from 1700px, 90px and 58px from 2400px.

Steps are at least 1.25 apart (10.5, 16, 27, 48, 74); nothing sits between steps. The
`.mark` phrase never wraps on desktop so its drawn underline stays one line; below 900px
it wraps and the rule becomes a repeating background under every line box.

Social scale, on a 1200px wide artboard: display 104px (three lines) or 124px (two
lines), eyebrow 22px, body 36px, meta 20px, ledger label 22px, ledger value 40px.

Display type always gets the accent treatment: exactly one word or one short phrase in
`--red`, and the full stop after it stays cream. Headline is at most 9 words on an
image, at most 3 lines.

## 4. Rhythm

- Radius 8px (`--radius`) on buttons, frames, inputs, badges and swatches. 10px on the
  closing CTA card and the hover preview, 14px on the hosting plan cards. Pills (99px)
  only for tags (`.pf-case-tag`, `.hs-p-tag`) and the billing switch (`.hs-bill`).
- Web gutter `clamp(22px, 5vw, 64px)`, max width 1280px, text column 680px. From 1700px
  the frame steps to 1560px with a 78px gutter, from 2400px to 1760px with 88px.
- Section padding on web `clamp(70px, 10vw, 150px)`; the intro block sits
  `clamp(40px, 5.5vw, 72px)` above its content; bands run
  `padding-block: clamp(38px, 5vw, 64px)`.
- Breakpoints: 900px is where two-column layouts (intro, hero split, case grid) become one
  column and the custom cursor switches off; 860px collapses rows and the plan grid; 600px
  and below stacks button rows and shrinks the consent banner.
- Social margin 96px on all sides of a 1200px artboard (8%). Baseline grid 8px.
- Hairlines, not boxes, separate content. A card is a surface (`--ink-2`), not a border.

## 5. Texture and motion

- Grain: the SVG `feTurbulence` noise in `theme.css`, opacity .035 on ink.
- Grid: 1px lines every 64px at `rgba(239,230,210,.04)`, hero and social only.
- Glow pills: two or three long blurred capsules in red, lime and blue at 10 to 16%
  opacity behind the hero. On social, at most one, red, behind the display type.
- Motion on web: `--ease-premium cubic-bezier(.16,1,.3,1)` for almost everything,
  `--ease-soft cubic-bezier(.32,.72,.24,1)` for long drifts, `--ease-pop
  cubic-bezier(.34,1.36,.64,1)` for the one overshoot allowed (the cursor ring).
  Durations `--dur-fast` .28s, `--dur` .55s, `--dur-slow` .9s. Transform and opacity
  only; never a layout property. Everything respects `prefers-reduced-motion`.
- Motion explains something or does not exist. No parallax for its own sake.
- The hooks, all in `js/motion.js`, all opt-in by attribute:

| Attribute | What happens |
|---|---|
| `data-reveal` (+ `data-reveal-delay`) | rises 26px and fades in when scrolled into view |
| `data-reveal-line` | clip-path wipe from the top |
| `data-split` | display type rises word by word out of a mask, 55ms stagger |
| `data-decode` | an eyebrow resolves out of noise, one pass, about 600ms |
| `data-count` | a figure counts up to its value on entry |
| `data-magnetic` | a button leans toward the pointer |
| `data-tilt="5"` | a card tilts a few degrees with the pointer |
| `data-parallax=".15"` | vertical drift on scroll, cached measurements |
| `data-marquee="32"` | a strip loops sideways, pauses on hover |
| `.wk-frame` / `data-wipe` | a screenshot wipes up into its frame |
| `data-cursor-label="View live"` | the custom cursor grows into a red disc with a label |
| `data-cursor-grid` | a dot grid on the surface lights up around the pointer |
| `data-preview="<img>"` | a floating screenshot follows the pointer over a row |
| `data-field` | the hero light field canvas |

- Custom cursor: an 8px red dot and a 38px red ring, pointer-fine screens only. The ring
  grows over links, shrinks to a bar over text, turns ink over red surfaces. `#wkProgress`
  is a 2px red rail along the top that scales with scroll depth.

## 6. Components (web)

Everything shared lives in `css/theme.css` under a `wk-` prefix and is bilingual by
`data-nl` / `data-en` attributes. Pages extend the system inside their own `<style>`
with their own prefix (`hm-` home, `hs-` hosting, `pf-` portfolio, `ct-` contact) and
never redefine a token. `_design/index.html` renders each of these live.

Text and marks:

- Eyebrow `.wk-eyebrow`: 20px red rule, gap 9px, mono uppercase red. `data-decode` to land it.
- Meta `.wk-meta`: mono uppercase, `--cream-faint`.
- Lede `.wk-lede`: Figtree 300, `--cream-mute`, capped at 680px or 60ch.
- Note `.wk-note`: 12.5px `--cream-faint`, max 76ch; `.wk-note--boxed` adds an icon and a
  surface. `.wk-cta-note` is the mono 11px line under a CTA.
- Accent `.mark` inside display type: the red word with a drawn underline that scales in
  when the parent gets `.is-lit`.
- Badge `.wk-badge`: mono 9.5px, red on `--bronze-mist`, `--bronze-rule` border, 5px red dot.
  Concept and demo markers.
- Breadcrumb `.wk-crumb`: mono 10px `--cream-faint`, separators at 45% opacity.
- Status chip (`.hm-avail`, home): `--grn` dot with a slow pulse, mono label.

Actions:

- Primary button `.wk-btn.wk-btn--primary`: red ground, white mono label, `padding:
  14px 26px`, radius 8px; the arrow slides 4px on hover while `#f14b35` wipes in from the
  left. `.wk-shimmer` adds a one-off diagonal sheen, `data-magnetic` the pointer pull.
- Ghost button `.wk-btn.wk-btn--ghost`: `--rule-hard` border, `--cream-dim` label, red on
  hover.
- Quiet link `.wk-more`: Figtree 500 14px `--cream-mute` with a hairline underline; white
  on hover. The second path beside a real button, never a second button.
- Row link `.wk-row-go`: mono 10px red with an arrow that moves 5px on hover.
- Filter pill (`.pf-f`, portfolio): mono 10px, transparent, `aria-pressed="true"` turns it
  white on red. Segmented switch (`.hs-bill`, hosting): a 99px pill at `--ink` with the
  active button in red.

Surfaces and layout:

- Section shell `.wk-section` inside `.wk-wrap`: `clamp(70px, 10vw, 150px)` of vertical
  room, gutters from `--gutter`.
- Intro `.wk-intro`: eyebrow and `.wk-h2` left, lede right, baseline aligned, one column
  under 900px. Every section opens with one.
- Inner hero `.wk-phero`: `padding: clamp(120px, 15vw, 190px) 0 clamp(46px, 6vw, 80px)`,
  red radial wash top-right, masked 1px grid at 22%, the light field, breadcrumb, eyebrow,
  `.wk-h1`, lede. `.wk-phero-split` seats a figure strip or a wall beside the copy.
- Stats `.wk-stats`: `clamp(32px, 3.8vw, 52px)` figures over mono 9.5px labels;
  `data-count` counts them up.
- Frame `.wk-frame`: the browser window around a screenshot. 1px `--rule`, radius 8px,
  `--ink-deep` well, `.wk-frame-bar` in `--ink-2` with three 7px dots and a mono URL. The
  image sits at `saturate(.85) brightness(.92)` and wipes up on scroll; the parent link's
  hover turns the border `--bronze-rule`, drops the filter and scales the image 1.028 over
  1.1s.
- Rows `.wk-rows > .wk-row`: 64px red number column at 75% opacity, body, 300px figure
  column, hairlines, a red wash fading in from the left on hover. `data-preview` floats a
  screenshot beside the pointer.
- Ledger row: mono label left in `--cream-faint`, value right in cream, hairline below. The
  social and pricing list pattern.
- CTA card `.wk-cta-card` inside `.wk-cta-wrap > .wk-wrap`: `--ink-2`, radius 10px,
  centred heading, lede, button row and mono note; `data-cursor-grid` lights a dot grid
  around the pointer and `.is-lit` draws the underline. The one place centring is allowed.
- Band (`.hm-band`, `.pf-band`): full-bleed `--ink-2` strip between hairlines, heading left,
  one button right.
- Card (`.hs-p`, hosting): `--ink-2`, radius 14px, 1px `--rule`, `--rule-hard` on hover,
  `rgba(223,56,33,.45)` for the chosen plan, list items with a 9px red dash. A card is a
  surface for a plan or a CTA, never a wrapper for a list of work, and never nested.
- Prose `.wk-prose`: 680px column, `strong` in cream, red list markers, a blockquote on a
  2px red rule, links in red with a `--bronze-rule` underline.

Forms and chrome:

- Inputs (`.fg input, textarea, select`, contact): Figtree 300 14.5px on `--ink`, 1px
  `--rule-hard`, radius 8px, `padding: 13px 15px`; labels mono 9.5px `--cream-faint`.
  Focus: border red, ground `--ink-3`, ring `0 0 0 3px rgba(223,56,33,.12)`.
- Toggle (`.ck-toggle`, consent): 38 × 21 pill, 14px knob; on is red mist with a red knob,
  locked is green.
- Nav (`#mainNav`, `js/site-nav.js`): fixed, three-column grid, `padding: 20px 5vw`; on
  scroll it shrinks to `10px 5vw`, takes `oklch(7% .010 25 / .92)` with a 20px blur (the
  only blur in the system) and a hairline. Links Figtree 700 12.5px uppercase with a 2px
  red underline scaling in from the left; the CTA is the primary button at nav size.
  Mobile: a full-screen drawer.
- Footer (`js/site-footer.js`): tagline in display type, four link ladders, the wire
  globe, payment marks, a centred legal row (Privacy · Terms · Refund Policy · Cookies)
  with drawn dots between links.
- Consent banner (`js/cookie-consent.js`): fixed bottom-right, `--ink-2`, the one in-flow
  shadow exception (`0 24px 56px rgba(0,0,0,.55)`), four categories, three buttons.

Elevation is flat. Depth is `--ink-deep`, `--ink`, `--ink-2`, `--ink-3` and hairlines.
Shadows exist on the consent banner, the hover preview (`0 30px 70px rgba(0,0,0,.55)`)
and the input focus ring, nothing in flow. Hover is a border turning red, an image losing
its desaturation, an arrow moving 4px, never a lift.

## 7. Social system

Where the images for LinkedIn (company page) and Instagram come from. Every image
starts from one of the six artboards in `_design/index.html`, or from the five-slide
carousel arc. No freehand layouts.

### Formats

| Name | Size | Ratio | Where |
|---|---|---|---|
| Portrait | 1200 x 1500 | 4:5 | LinkedIn feed image (default), Instagram feed |
| Square | 1200 x 1200 | 1:1 | Instagram, LinkedIn when the post is short |
| Landscape | 1200 x 627 | 1.91:1 | Link preview, LinkedIn article header |

### Fixed frame

Every artboard shares these, whatever the template:

- Wordmark bottom-left, 96px from the edges: `assets/darkmodehorizontallogo.png` on
  ink, `assets/Horizontallogo.png` on paper. Cropped copies live in `_design/wordmark-*.png`.
  Height 112px on portrait and square, 72px on landscape.
- `webkreatives.com` bottom-right in meta style.
- Eyebrow top-left with the 20px rule.
- 96px margin, 8px baseline, content left-aligned to the margin.
- Grain on ink. Grid lines on ink at .04.

### Templates

**T1 Statement (main).** Ink ground, eyebrow, display headline in cream with one red
word, optional one-line lede in `--cream-mute`. One red glow pill behind the type,
low. The default: at least every second image is T1.

**T2 Ledger.** Ink ground, short display headline (two lines max, 88px), then four to
six ledger rows on an `--ink-2` surface: mono label left, cream value right, hairlines
between. For "what that means in practice", pricing structure, what is included.

**T3 Showcase.** Ink ground, display headline top-left at 88px, a real phone
screenshot (`assets/screenshots/<slug>-phone.webp`) standing on the right, cut by the
bottom edge, with an `--ink-2` bezel and a 1px `--rule-hard` edge. Caption under the
headline names the sector and one checkable figure. Only real screenshots, never
mockups of nothing.

**T4 Paper.** The inverted variant: `--cream2` ground, `--ink` display type,
`--red-deep` accent word, light logo. Same grid as T1. No grain, no glow. Use at most
one in four images, to break the dark run in the feed.

**T5 Maxim.** Square. One line, maximum 6 words, 124px display, red opening quotation
mark as a shape at 240px in the top-left, cream text below it. Attribution line in
meta: "WebKreatives". For quotable closes and reposts.

**T6 Update.** Landscape. Eyebrow "Shipped", headline names the page or feature in
two or three lines at 64px, one-line body says what changed, a strip of the changed page along
the bottom edge as a screenshot. For "what went live this week".

### Carousel arc (T7)

A LinkedIn document post: five pages, 1200 x 1500 each, one arc. Grab attention, name
the pain, show the system, prove it works, drive the action.

| Slide | Ground | Job | Content |
|---|---|---|---|
| 01 Hook | ink, glow | grab attention | one hero word, auto-fit to the line, accent on one syllable or none; subline of two sentences, the pain then the payoff; "Swipe" cue |
| 02 Pain | paper | name the pain | headline names the problem; three to five things that break, one line each, red cross markers |
| 03 Steps | ink | show the system | headline; the mechanism as a numbered list, three or four steps, red numerals |
| 04 Proof | ink | prove it works | headline; outcomes as red checkmarks, one checkable outcome per line; one mark allowed |
| 05 Join | red | drive the action | headline with an ink accent word, one-line body, the URL set in display type |

Rules on top of the fixed frame:

- Page number top-right in meta on every slide. Wordmark bottom-left. Swipe cue
  bottom-right on 01 to 04, nothing on 05.
- Red ground exists only on slide 05. Type on red is white, the accent word is ink, no
  other colour.
- No comment keyword, no "comment X to get Y". The close is the URL and a plain offer.
- Proof carries a specific number once numbers are cleared; until then, checkable
  outcomes.
- Paper is used on slide 02 by default, so the run reads ink, paper, ink, ink, red.

Render:

```
node _design/carousel.cjs _design/carousel-example.json out/
```

Writes `01-hook.png` to `05-join.png` and `carousel.pdf` (about 2.5 MB). Copy the
example JSON, change the words, keep the shape. The PDF is what goes to LinkedIn.

### Single post arc (S)

A LinkedIn image post carries one image. The five stages of the carousel do not fit
on one artboard, so the arc splits: the image carries one stage, the post text carries
the other four. The image stops the scroll; the text does the reasoning.

| Stage | Image | When |
|---|---|---|
| Hook | T1 Statement, portrait | The default. The text carries pain, mechanism, proof and join. |
| Proof | T3 Showcase or T2 Ledger | When a real screenshot or a checkable list beats a sentence. The text carries hook, pain, mechanism and join. |
| Pain | T4 Paper | At most one in four, to break the ink run. The text carries hook, mechanism, proof and join. |
| Join | never | A red ground without the four slides before it reads as an ad. The close lives in the text. |

Post text, in carousel order, 120 to 180 words:

1. Hook: one or two lines that restate the image in other words. Lands within the
   first 140 characters, before "...more" on a phone.
2. Pain: two or three lines.
3. Mechanism: three lines, one step each.
4. Proof: one checkable line.
5. Join: the last line, a plain offer plus `webkreatives.com`. No comment keyword.

Rules on top of the fixed frame:

- Portrait only. 4:5 takes the most feed height.
- The headline stays legible at 40% width, the size of a phone feed.
- Alt text is the headline in plain words: no asterisks, no markup.
- The text never repeats the lede. It restates the headline once, in the hook, and
  moves on.

Rhythm: singles on Wednesday and Thursday. The carousel goes out on Tuesday, at most
once a week. Single rotation follows the run under Variation: T1, T3 or T2, T1, T4.

Worked example with the render command, the alt text and the post text:
`_design/single-example.md`.

### Page covers (T8)

Facebook cover, rendered at 1640 x 624 (twice the 820 x 312 desktop display). Phones
show only the central 1120px, and the profile photo covers the bottom-left corner on
desktop, so:

- Everything sits inside the safe box: 260px in from each side, 64px from top and
  bottom. The design page draws the box in blue dashes and the photo corner in red.
- Eyebrow top-left of the box, three-line headline at 68px with one red phrase,
  one-line lede, wordmark bottom-right of the box, one mark top-right. Nothing
  bottom-left.
- Same PNG serves LinkedIn (upload 1584 x 396: crop the middle band) and X.

```
node _design/render.cjs cover out/facebook-cover.png
```

### Print: sticker (T10)

Client window sticker, 50 x 50 mm, 3 mm bleed, 3 mm die-cut radius, 4 mm safe zone.
Rendered at 20 px per mm: 1120 px canvas, trim at 60 px.

- Print surfaces drop grain, glow and grid. Ink ground like the site, cream type.
- Layout: eyebrow "Websites by" in red and the wordmark top-left, the trio mark
  top-right (four rounded squares in red, yellow, lime and blue, four sizes,
  overlapping), the QR centred at 28 mm, the plain domain under it in mono.
- The QR is part of the design, not a pasted patch: cream dots on ink, finder eyes as
  cream rounded rings with an empty gap and a red centre, eight data dots in the
  logo's colours, and the W badge (cream Unbounded W on the ink ground, red and lime
  bars, the favicon inverted) over a 9-module clear square in the middle. Error
  correction H covers the badge and the coloured dots.
- The red inside the QR is `#f14b35`, the button-wipe red, not `#df3821`. The brand
  red is too dark for an inverted eye: with it the code stops reading below 400 px;
  with the brighter red it reads down to 160 px and through blur.
- It is an inverted code (light on dark). Current phone cameras and the zxing engine
  read it; some older scanner apps do not. The decode proof in `qr.py`'s notes uses
  zxing-cpp, which reads the rendered sticker down to 200 px. Scan the print proof
  with two phones before the run. If a client's audience skews old, use the
  cream-ground variant by passing `--ink "#110d0c"` and swapping the ground.
- Target: `https://webkreatives.com/sticker`, a noindex page that forwards to the
  homepage with `utm_source=sticker`. The printed text stays the bare domain.

```
python _design/qr.py https://webkreatives.com/sticker out/qr.svg
node _design/render.cjs sticker out/sticker.png --shot out/qr.svg --mark trio
```

Print file: the PNG at 1120 px for 56 mm; ask for matte vinyl, and for the red as a
CMYK match of `#df3821`.

### Print: business card (T11)

85 x 55 mm, 3 mm bleed, 4 mm safe zone, square corners, rendered at 20 px per mm from
`templates/print/card.html` and `card.cjs` with the `card` block of
`templates/print/specs/webkreatives.json`. Ground `#0c0c0d`, a neutral near-black,
darker and cooler than `--ink`; the warm ink read as red on the card.

- Front is the brand side: "Websites by" and the wordmark bottom-left, 15 mm tall, the
  trio cluster top-right at 1.5x the sticker's. Nothing else.
- Back: "Co-Founder" and the name in Unbounded 900 top-left, first name in red; mail,
  bare domain, phone in mono 30px middle-left; the sticker's code at 30 mm right,
  vertically centred, nothing under it; the services in one centred mono 30px line
  along the bottom, "Web Design · Hosting · Support · Branding", Hosting and
  Branding in red, the points in `--cream-faint`. No labels, no hairlines, no city.
- The code is the sticker's exactly: cream dots on the ground, `#f14b35` eye
  centres, eight coloured dots, the W badge. `check.py` proves the code with 4 mm
  of ground around it, not the whole side.
- Target: `https://webkreatives.com/card`, a noindex page that forwards home with
  `utm_source=card`, so a card scan and a sticker scan are told apart.

```
node templates/print/card.cjs templates/print/specs/webkreatives.json templates/print/out
```

Print files: `webkreatives-card-front.png` and `-back.png` at 1820 x 1220 px for
91 x 61 mm; 350 g uncoated or matte laminate, never gloss on the ink ground.

### Variation, inside the system

The templates above are the structure. These knobs give variety without a new system:

- Mark: `none` (default), `lime`, `blue`, `yellow`, and on print `trio`. Adds one
  geometric shape in the logo's palette: lime square, blue dot, yellow square, placed
  top-right or beside the headline. `trio` is a cluster of four rounded squares in the
  wordmark's colours (red, yellow, lime, blue), four sizes, overlapping, and counts
  as one mark. Never two marks. Never on T4.
- Accent placement: the red word can be the first word, the last word, or a phrase in
  the middle. Rotate.
- Headline length: two lines at 124px or three lines at 104px.
- Lede: present or absent.
- Glow: on or off (T1 only).

Rotation over a run of posts: T1, T3 or T2, T1, T4, T1, T5 or T6, and back. Never two
T4 in a row. Never two showcases of the same sector in a row.

### Copy on images

- Headline is a statement, never a question. Questions live in the post text.
- No numbers on images for now (owner decision, September 2026). A named sector, page
  or decision instead.
- The eyebrow is a category, two or three words: "Studio", "Ownership", "Shipped",
  "Portfolio", "Template vs custom".
- No hashtags, no emoji, no URLs other than the fixed bottom-right one.

### Rendering

```
node _design/render.cjs <template> <out.png> [--field "value"] ...
```

Fields: `--eyebrow`, `--headline` (wrap the accent in `*asterisks*`), `--lede`,
`--rows "Label|Value;Label|Value"` (T2), `--shot assets/screenshots/<slug>-phone.webp`
(T3, T6), `--caption` (T3), `--mark lime|blue|yellow`, `--glow off`.

Templates: `statement`, `ledger`, `showcase`, `paper`, `maxim`, `update`, `cover`, `sticker`. Carousel slides
render through `_design/carousel.cjs`, see the arc above.

Output is a PNG at native size, rendered by headless Chrome. Check the PNG before it
goes anywhere. Link previews still need `og:image` as an absolute JPG or PNG URL.

## 8. File map

| Path | Holds |
|---|---|
| `css/theme.css` | tokens, base, display type, eyebrow, buttons, frame, rows, CTA card, prose, grain, motion primitives |
| `js/motion.js` | every `data-*` motion hook, the custom cursor, the progress rail |
| `js/site-nav.js`, `js/site-footer.js`, `js/cookie-consent.js` | nav, footer and consent banner, rendered on every page |
| `_design/index.html` | this system rendered live from `theme.css` and `motion.js`, plus the six social artboards, the carousel and the single post arc |
| `_design/render.cjs` | artboard to PNG |
| `_design/carousel.cjs`, `carousel-example.json` | five-slide carousel to PNGs and PDF |
| `_design/qr.py` | styled QR as SVG (dots, lime eyes, badge gap) |
| `templates/print/` | the same sticker for any client: spec in, print file and proof out |
| `_design/publora-ig.py` | Instagram carousel to Publora |
| `_design/single-example.md` | one worked single post: render command, alt text, post text |
| `_design/wordmark-light.png`, `wordmark-dark.png` | cropped wordmarks for the artboards |
| `assets/Horizontallogo.png`, `darkmodehorizontallogo.png` | source logos |
| `assets/screenshots/*-phone.webp` | real portfolio screenshots for T3 |
| `og/` | link preview images and their generators |
