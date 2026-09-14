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
| `--red` | `#df3821` | the accent: one word, the eyebrow, the primary button |
| `--red-deep` | `#a82716` | red on paper, hover on red |
| `--lime` | `#b9e185` | logo mark, one geometric aside |
| `--blue` | `#648dcb` | logo mark, one geometric aside |
| `--yellow` | `#fbeb78` | logo mark, one geometric aside |
| `--grn` | `oklch(68% .150 130)` | status dot, "open for projects" |
| `--rule` | `rgba(239,230,210,.10)` | hairlines on ink |
| `--rule-hard` | `rgba(239,230,210,.18)` | ghost button border, stronger hairline |
| `--line` | `oklch(88% .006 80)` | hairlines on paper |

Rules:

- Red leads. On any one surface, red is the only saturated colour in the type.
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

Web scale: `.wk-h1` clamp(34px, 5.4vw, 74px), `.wk-h2` clamp(26px, 3.6vw, 48px),
`.wk-h3` clamp(19px, 2.1vw, 27px), lede clamp(15px, 1.35vw, 18px), eyebrow 10.5px,
meta 10px, button 11px.

Social scale, on a 1200px wide artboard: display 104px (three lines) or 124px (two
lines), eyebrow 22px, body 36px, meta 20px, ledger label 22px, ledger value 40px.

Display type always gets the accent treatment: exactly one word or one short phrase in
`--red`, and the full stop after it stays cream. Headline is at most 9 words on an
image, at most 3 lines.

## 4. Rhythm

- Radius 8px everywhere. No pills except the ghost status chip.
- Web gutter `clamp(22px, 5vw, 64px)`, max width 1280px, text column 680px.
- Social margin 96px on all sides of a 1200px artboard (8%). Baseline grid 8px.
- Section padding on web `clamp(70px, 10vw, 150px)`.
- Hairlines, not boxes, separate content. A card is a surface (`--ink-2`), not a border.

## 5. Texture and motion

- Grain: the SVG `feTurbulence` noise in `theme.css`, opacity .035 on ink.
- Grid: 1px lines every 64px at `rgba(239,230,210,.04)`, hero and social only.
- Glow pills: two or three long blurred capsules in red, lime and blue at 10 to 16%
  opacity behind the hero. On social, at most one, red, behind the display type.
- Motion on web: `--ease-premium cubic-bezier(.16,1,.3,1)`, durations .28s / .55s /
  .9s. Reveal is translateY(26px) to 0 with fade. Per-word masked line reveal for
  display type. Everything respects `prefers-reduced-motion`.
- Motion explains something or does not exist. No parallax for its own sake.

## 6. Components (web)

- Eyebrow `.wk-eyebrow`: 20px red rule, gap 9px, mono uppercase red.
- Meta `.wk-meta`: mono uppercase, `--cream-faint`.
- Primary button `.wk-btn--primary`: red ground, white mono label, arrow slides 4px on
  hover, brighter red wipes in from the left.
- Ghost button `.wk-btn--ghost`: `--rule-hard` border, `--cream-dim` label, red on hover.
- Status chip: `--grn` dot, mono label "Project openings available".
- Ledger row: mono label left in `--cream-faint`, value right in cream, hairline below.

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

### Variation, inside the system

The templates above are the structure. These knobs give variety without a new system:

- Mark: `none` (default), `lime`, `blue`, `yellow`. Adds one geometric shape in the
  logo's palette: lime square, blue dot, yellow square, placed top-right or beside the
  headline. Never two marks. Never on T4.
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

Templates: `statement`, `ledger`, `showcase`, `paper`, `maxim`, `update`. Carousel slides
render through `_design/carousel.cjs`, see the arc above.

Output is a PNG at native size, rendered by headless Chrome. Check the PNG before it
goes anywhere. Link previews still need `og:image` as an absolute JPG or PNG URL.

## 8. File map

| Path | Holds |
|---|---|
| `css/theme.css` | tokens, base, display type, eyebrow, buttons, grain, motion primitives |
| `_design/index.html` | this system rendered, plus the six social artboards |
| `_design/render.cjs` | artboard to PNG |
| `_design/carousel.cjs`, `carousel-example.json` | five-slide carousel to PNGs and PDF |
| `_design/wordmark-light.png`, `wordmark-dark.png` | cropped wordmarks for the artboards |
| `assets/Horizontallogo.png`, `darkmodehorizontallogo.png` | source logos |
| `assets/screenshots/*-phone.webp` | real portfolio screenshots for T3 |
| `og/` | link preview images and their generators |
