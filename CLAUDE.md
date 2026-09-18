# WebKreatives — working rules

Static HTML/CSS/vanilla JS on GitHub Pages (webkreatives.com, repo CsabaVK/WebKreatives, work on `main`).
Client sites live in `client-projects/<client>/` with their own `site.css`, `site.js`, `data.js` (all client-editable facts in data.js).

## Every session
- Caveman mode is on. Short answers, no recaps, no option lists unless asked.
- "save" = commit + push. Stop the dev server (launch.json `webkreatives`, port 8080) when done.
- Verify in headless Chrome before showing anything: puppeteer-core is in node_modules, Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`. Element screenshots, not clip. Show only the shot that proves the point.
- Bash heredocs eat backslashes: write helper scripts with the Write tool. Files mix CRLF/LF: Python reads/writes with `newline=''`.
- After editing a live site's CSS/JS/data, bump `?v=N` on every page that loads it (Pages CDN caches ~10 min).
- Link previews need absolute `og:image` URLs and a JPG/PNG, never webp.

## New client site — before the first line of code
1. Write `client-projects/<client>/PRODUCT.md` (who it is for, tone, brand, anti-references) and `DESIGN.md` (palette, type, spacing, components). The root PRODUCT.md is WebKreatives' own — never use it for a client.
2. `/impeccable shape` with that context, get the brief confirmed, then `/impeccable craft`. Before showing the site: `/impeccable audit`, and `redesign-existing-projects` if it still reads generic.
3. Not-AI checklist, any hit means redesign: purple/blue gradient hero · row of three equal cards with icons in circles · Inter/Roboto by default · glass blur on everything · everything centered · "Welcome to…" copy · stock-photo placeholders · more than one accent colour · emoji as bullets. Wanted: the client's real photos, one committed type pairing, asymmetric layout, a hierarchy you can squint at, motion that explains something.

## Design skill routing
Many installed skills claim "design a page" and their descriptions overlap. Do not pick by vibe. Follow this:

- **Default for any page or component design/redesign: `impeccable`** (its `shape` → `craft` → `audit` phases are the spine above). Use it unless a rule below or the user names another skill. When the user names a skill — e.g. "use minimalist-ui" — that choice wins for that task.
- Do **not** reach for `high-end-visual-design`, `gpt-taste`, `design-taste-frontend`, or `stitch-design-taste` in place of `impeccable`. They compete for the same trigger; `impeccable` is the chosen one for this repo. Use them only if the user asks for that skill by name.

Adjuncts — layer these on top of an `impeccable` pass, never as a substitute for it:
- Reads generic after `audit`: `redesign-existing-projects`.
- Design reference images before coding a section: `imagegen-frontend-web` (or `-mobile` for app screens).
- Motion / scroll: `gsap-*` skills for animation, `lenis-smooth-scroll` for smooth scroll, `horizonx` for a full premium scroll-driven page.
- A named drop-in effect (animated background, text effect, cursor): `react-bits` — port to vanilla, this repo is static.
- Data lookup (palette, font pairing, stack-specific rule): `ui-ux-pro-max`.
- A specific look the user asks for by name: `minimalist-ui`, `industrial-brutalist-ui`, `brandkit`, `webgpu-threejs-tsl` (3D/WebGL hero).

Non-design skills, separate triggers: `cybersec` (security tasks, router), `brag` + `hyperframes-*` (make a launch video), `linkedin-*` / print / outreach as their own rules already cover.

### Ponytail vs design ambition
`ponytail` is always active and governs *code* — fewest lines, files, and dependencies. It does **not** govern the deliverable. "Design a page" means a full, finished, high-quality design: full hero, full sections, real hierarchy, the motion that earns its place — judged only on whether the page is good, not on how little code it took. Never scope down the design, cut sections, or drop requested polish in the name of laziness. Ponytail applies only *inside* the chosen implementation: once the design is decided, build it with clean, minimal, dependency-light code (which also matches the static-site rules and the not-AI checklist — no gratuitous effects, but every effect the design calls for stays). If lazy-code instinct and design quality ever pull apart, design quality wins; Ponytail trims the code, never the deliverable.
