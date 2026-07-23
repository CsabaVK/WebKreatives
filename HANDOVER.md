# WebKreatives — Handover

> For a fresh agent session with no conversation history. Everything you need to work on this repo safely.
> Written 2026-04-21. Live site: **https://webkreatives.com**

There is **no `CLAUDE.md`** in this repo. The closest existing context files are `CLAUDE_MEMORY.md`, `README.md`, `PRODUCT.md`, `WEBKREATIVES-MISSION.md`, and `DATA_SOURCE.md`. **Read `DATA_SOURCE.md` before touching leads** and note that parts of `CLAUDE_MEMORY.md`/`README.md` are now stale (see §6 and §8). This document supersedes them where they conflict.

---

## 1. Project purpose

WebKreatives is a **static marketing website** for a one-person (Csaba Garaguly) Dutch web-design business based in Amsterdam, serving clients in NL and worldwide. The site's job is lead generation: turn a visitor into a contact-form submission or call. Services: custom website design, webshops, SEO, branding, ongoing support/maintenance. Pricing anchors: one-off packages (€199 / €299 / €599 tiers referenced in copy) and monthly maintenance plans (Basis €19 / Groei €39 / Premium €79).

The repo also holds **supporting business assets**: an SEO article blog, 11 fictional/concept "client project" demo sites used as a portfolio, bilingual email/onboarding/invoice templates, and Node scripts for lead sourcing and Open Graph image generation.

**Status: shipped and in active iteration.** The site is live on GitHub Pages. Recent work is redesign polish, SEO articles, and lead outreach — not a rebuild.

**Positioning note:** `PRODUCT.md` (older) says "Dutch small businesses only." `WEBKREATIVES-MISSION.md` (2026-05-16, newer) broadens this to "any client who wants a custom, non-template site, worldwide." When they conflict, **the Mission file wins.**

---

## 2. Structure

Skipping `.git`, `node_modules`, build artifacts.

```
/
├── index.html                  Homepage. STANDALONE 2691-line file — inline CSS + inline JS + GSAP.
│                               Does NOT use css/style.css, js/*, or the i18n system. (see §5, §8)
├── CNAME                        Custom domain for GitHub Pages: webkreatives.com
├── robots.txt · sitemap.xml     SEO crawl directives + URL index
├── favicon.svg
├── package.json                 Only devDeps: exceljs, http-server (no build step)
├── package-lock.json
│
├── css/
│   ├── style.css                Shared stylesheet for SUB-PAGES ONLY (Poppins-based design system)
│   └── article.css              Article-specific styles
├── js/
│   ├── global-components.js     Injects shared <nav> + <footer> into #globalNav/#globalFooter on sub-pages
│   ├── i18n.js                  NL/EN translation dictionary; applies to [data-i18n] elements on sub-pages
│   └── script.js                Sub-page behaviour: language switcher, dark mode, cookie banner, typing FX
│
├── our-websites/index.html      Portfolio showcase page (STANDALONE, own inline styles). Lists the 11 demos.
├── portfolio/index.html         Older/alt portfolio page (uses modular css/js system)
├── privacy/index.html           Privacy policy (bilingual, modular system)
├── terms/index.html             Terms & conditions (bilingual, modular system)
│
├── articles/                    SEO blog. Each article = folder with index.html → clean URL, no .html
│   ├── index.html               Article listing page
│   ├── articles-data.js         Article metadata (titles, dates, slugs) driving the listing
│   ├── article-page-i18n.js     Per-article-page translation strings
│   ├── article-utils.js         Shared article helpers
│   └── <slug>/index.html        7 published articles (English hyphenated slugs)
│
├── client-projects/             11 CONCEPT demo sites (fictional or unaffiliated businesses).
│   │                            Each is standalone with its own styling. Used as portfolio proof.
│   │                            Every page carries a "concept design by WebKreatives" banner (legal).
│   ├── de-groot-accountants/    The only MULTI-PAGE demo (index, over-ons, diensten, contact + build.js)
│   └── <10 others>/index.html   leyenburger, tandarts-knoll, studio-lena-fotografie, luna-beauty-studio,
│                                bakkerij-hartman, nexus-it-solutions, maison-blanc-interieur,
│                                vanderberg-loodgieter, klussenbedrijf-edward, ironforge-gym, nox-studio
│
├── templates/                   Business documents (not part of the public site)
│   ├── dutch/ · english/        5 paired HTML templates each (auto-reply, onboarding, 3 cold-emails).
│   │                            PAIRED 1-to-1 BY FILENAME — edit both when editing one (§7).
│   └── universal/               invoice-template, email-signature, client-preview (no language pair)
│
├── assets/
│   ├── payment/                 Self-hosted SVG payment badges (visa, mastercard, ideal, applepay, etc.)
│   │   └── download-test/       Stray test copies of 2 badges — safe to delete (§9)
│   ├── screenshots/             PNG screenshots of the 10 client demos (used on portfolio)
│   ├── Horizontallogo.png       Light-mode logo   · darkmodehorizontallogo.png  Dark-mode logo
│   ├── csaba.jpg                 Founder photo (email signatures/templates)
│   └── (misc client + team imagery)
│
├── og/                          Open Graph image generation
│   ├── generate-og-png.js       Renders the main OG image
│   ├── generate-article-og.js   Renders per-article OG images (usage in file header comment)
│   ├── og-image/index.html      HTML source rendered into the OG PNG
│   └── articles/*.png           Generated per-article OG images
│
├── tools/                       Node/PHP utility scripts (see §11)
│   ├── find-leads-google.js     Lead sourcing via Google Custom Search (needs GOOGLE_API_KEY, GOOGLE_CSE_CX)
│   ├── find-leads-osm.js        Lead sourcing via OpenStreetMap
│   ├── find-leads-scraper.js    Scraper-based lead sourcing
│   ├── take-screenshots.js      Screenshots the client demos (INFERRED: headless browser)
│   ├── create-excel.js / -2.js  Build the leads workbook via exceljs
│   ├── send.php                 Server-side mail sender (INFERRED: legacy/unused; site uses Web3Forms)
│   ├── push-to-github.sh        Git push helper
│   └── client-launch-checklist.md
│
├── leads/
│   ├── Leads.xlsx               Local lead workbook. NOT canonical — see DATA_SOURCE.md (§8/§11)
│   └── Leads.xlsx.bak           Backup
│
├── memory/                      Standing instructions & research for AI sessions (business ops, not site)
│   ├── OPENCLAW-ARTICLE-CREATION.md      How articles get authored/published
│   ├── OPENCLAW-LINKEDIN-AUTOMATION.md   LinkedIn posting automation guide
│   ├── linkedin.md · linkedin-marketing-research-2026.md · social-media.md
│   └── Reference-colors.txt · Reference-hero.txt
│
├── _rollback/                  BACKUP of the PREVIOUS modular homepage (index.html + css/ + js/).
│                               Not linked from the live site. Keep for rollback; don't edit. (§8)
│
├── .env.leads                  Secrets for lead tools (gitignored) — see §4
├── .gitignore                  Ignores node_modules/, .env.leads, *.env, nul
├── CLAUDE_MEMORY.md            OLDER AI context (2026-03-22). Partly STALE — see §6/§8
├── README.md                   Project overview. Partly STALE (describes pre-redesign homepage)
├── PRODUCT.md                  Brand/design principles & target user (older positioning)
├── WEBKREATIVES-MISSION.md     Current mission/positioning (2026-05-16) — AUTHORITATIVE on positioning
├── DATA_SOURCE.md              LEAD DATA RULE: Google Sheet is source of truth, not local xlsx
└── tmp-*.cjs (6 files)         One-off throwaway scripts in repo root — untracked, safe to delete (§9)
```

---

## 3. Stack and dependencies

- **Languages:** HTML, CSS, vanilla JavaScript. No framework, no bundler, no transpile step. Node.js only for offline tooling (lead sourcing, Excel, OG image generation).
- **Homepage animation:** GSAP 3.12.5 + ScrollTrigger, loaded from cdnjs CDN (not npm).
- **Fonts (homepage):** Unbounded (400/700/900) + Figtree — Google Fonts CDN.
- **Fonts (sub-pages):** Poppins — Google Fonts CDN. (Two different font systems coexist; see §8.)
- **Package manager:** npm. `package.json` declares only `devDependencies`:
  - `exceljs@^4.4.0` — build/read the leads workbook
  - `http-server@^14.1.1` — local static serving
- **Additional Node libs used by tools but NOT in package.json** (INFERRED — install ad hoc): whatever `take-screenshots.js` uses for headless browsing (likely puppeteer/playwright), and HTTP clients in the lead scripts. Verify by reading the specific script before running.
- **Runtime:** any recent Node LTS (18+) for the scripts. No version is pinned (no `engines` field, no `.nvmrc`).
- **`send.php`** implies PHP was once available server-side, but the live site is static GitHub Pages, so PHP does not run in production (INFERRED legacy).

---

## 4. Setup and run

No build step. The site is static files served as-is.

**Install tooling deps:**
```bash
npm install
```

**Run locally (two equivalent options):**
```bash
npx serve -s . -l 8080
```
This matches `.claude/launch.json` (config name `webkreatives`, port 8080). Or:
```bash
npx http-server -p 8080
```
Then open `http://localhost:8080/`. Because public URLs are folder-based (no `.html`), serve from the repo root so `/articles/`, `/our-websites/`, etc. resolve to their `index.html`.

**Test:** there is **no test suite**. "Testing" = load pages in a browser and check console. (There is a git branch named `Testing`, unrelated to automated tests — see §8.)

**Build:** none for the site. The only "build" steps are optional generators:
```bash
node og/generate-og-png.js                 # regenerate main OG image
node og/generate-article-og.js <slug> "<Title>" "<image-url>"   # per-article OG (see file header)
node tools/take-screenshots.js             # refresh client-demo screenshots
```

**Environment variables** (in `.env.leads`, gitignored — never commit, never print values):
| Name | Used by | Purpose |
|------|---------|---------|
| `GOOGLE_API_KEY` | `tools/find-leads-google.js` | Google Custom Search API auth for lead sourcing |
| `GOOGLE_CSE_CX` | `tools/find-leads-google.js` | Google Custom Search Engine ID |

No env vars are needed to run or deploy the website itself.

**Deploy:** push to `main`. GitHub Pages (repo `CsabaVK/WebKreatives`) auto-deploys `main` → `webkreatives.com` in ~1 minute. There is no CI/CD config in-repo; deployment is GitHub Pages' native branch publishing.

---

## 5. Architecture and data flow

Two distinct page architectures live in one repo:

```
                          ┌─────────────────────────────────────────┐
  Visitor ── GET / ──────►│ index.html  (STANDALONE homepage)        │
                          │  • inline <style> + inline <script>      │
                          │  • GSAP + ScrollTrigger (CDN)            │
                          │  • Unbounded/Figtree fonts               │
                          │  • its own NL/EN toggle, inline          │
                          │  • contact form ─► api.web3forms.com     │
                          └─────────────────────────────────────────┘

  Visitor ── GET /articles/…, /privacy/, /terms/, /portfolio/ ─┐
                                                               ▼
                          ┌─────────────────────────────────────────┐
                          │ Sub-page index.html (MODULAR system)     │
                          │  loads:                                  │
                          │   /css/style.css  + /css/article.css     │
                          │   /js/global-components.js  ──► injects  │
                          │        shared <nav>/<footer> into        │
                          │        #globalNav / #globalFooter        │
                          │   /js/i18n.js     ──► fills [data-i18n]   │
                          │   /js/script.js   ──► lang switch, dark   │
                          │        mode, cookie banner, typing FX     │
                          │  Poppins fonts                           │
                          └─────────────────────────────────────────┘

  Visitor ── GET /our-websites/, /client-projects/<x>/ ──► STANDALONE pages,
             each with its own inline styling; client demos carry a fixed
             "concept design by WebKreatives" banner injected at top.
```

**Contact form flow:** homepage `<form action="https://api.web3forms.com/submit" method="POST">` with a hidden `access_key`. Web3Forms emails the submission to `info@webkreatives.com`. Client-side `fetch()` also posts to the same endpoint for the AJAX success path. There is **no backend and no database** in production.

**i18n flow (sub-pages only):** `js/i18n.js` holds a `translations` object with `nl` and `en` maps keyed like `"nav.services"`. On load / language switch, `script.js` reads `localStorage['wk-lang']`, falls back to `navigator.language` (Dutch → `nl`, else `en`), and swaps text on every `[data-i18n]` element. The homepage has its **own** inline equivalent, independent of this file.

**Lead flow (offline):** `tools/find-leads-*.js` gather prospects → written to `leads/Leads.xlsx` via exceljs. **But** per `DATA_SOURCE.md` the canonical lead store is a Google Sheet, not this xlsx (§8/§11).

**Article flow:** `articles/articles-data.js` lists article metadata; `articles/index.html` renders the listing from it and auto-sorts by date. Each article folder is a hand-authored `index.html` using the modular system. OG images are pre-generated into `og/articles/`.

---

## 6. Decisions and rationale

- **Static site on GitHub Pages, no framework.** Zero hosting cost, trivial deploy, fast. Pulled from README + CNAME + absence of any build config.
- **Homepage rewritten as a single standalone file with GSAP** while sub-pages kept the older modular `css/js` system. Commit history ("new og img, fixed v3.2", "Revamp testimonials section", "Update index.html") and the `_rollback/` folder (a full copy of the previous modular homepage) show the homepage was **redesigned in place**, and the old version was preserved for rollback rather than deleted. INFERRED: the redesign wasn't propagated to sub-pages, which is why two systems coexist.
- **Clean, folder-based URLs (no `.html`).** README "Routing Rules" mandates `/articles/<slug>/` etc. Rationale: SEO + shareable canonical URLs. New article slugs must be English, lowercase, hyphenated.
- **Client demos are explicitly labelled "concept design."** Every `client-projects/*` page has a fixed top banner stating it's a WebKreatives concept and not the business's official site. This was a **deliberate legal safeguard** because the demos reference real/real-sounding businesses that were never engaged as clients. Do not remove these banners.
- **Middle-dot separators, not em dashes, in banners/disclaimers.** A stated owner preference — banners use `·`. Keep it.
- **Terms page avoids a "Dutch text prevails" clause.** It was deliberately removed and replaced with an invitation to contact, because the conflict clause "made clients feel unsafe." Don't reintroduce a language-precedence clause.
- **Self-hosted SVG payment badges** in `assets/payment/`. An earlier attempt used the SimpleIcons CDN and broke/looked cheap; the decision was to hand-build local SVGs for reliability + legibility. Don't swap these back to a CDN.
- **Bilingual, Dutch default with browser-based auto-detect.** Sub-page `script.js` picks `nl` for Dutch browsers and `en` otherwise, but a manual switch is saved to `localStorage['wk-lang']` and always wins.
- **JSON-LD Organization schema on the homepage** with a populated `sameAs` (Instagram, LinkedIn, Medium). Added to fix Google mis-rendering the brand/email in search — a deliberate SEO/brand-signal fix.
- **Positioning broadened over time.** `PRODUCT.md` (Dutch SMEs only) → `WEBKREATIVES-MISSION.md` (any custom-website client, worldwide). The Mission file is the current intent.
- **Leads moved off local Excel to a Google Sheet.** `DATA_SOURCE.md` declares the Sheet canonical and the local xlsx non-authoritative — a deliberate anti-"stale-copy" decision.

---

## 7. Conventions

- **URLs:** folder-based, never end in `.html`. New article slugs: English, lowercase, hyphenated. Keep internal links, canonicals, sitemap, OG URLs, and CTAs in this clean format.
- **Template pairing:** `templates/dutch/<name>.html` and `templates/english/<name>.html` are paired 1-to-1 by filename. **Edit one → mirror the change in the other.** `templates/universal/` has no pair.
- **Two design systems — don't cross them.** Homepage edits go inline in `index.html` (GSAP, Unbounded/Figtree). Sub-page edits go through `css/style.css` + `js/*` + `[data-i18n]` (Poppins). Adding a nav/footer link means updating `js/global-components.js` for sub-pages **and** the inline homepage markup separately.
- **i18n:** every new user-facing string on a sub-page needs a `data-i18n="key"` attribute plus matching `nl` and `en` entries in `js/i18n.js`. Add both languages in the same commit.
- **Brand tokens (sub-pages, from `css/style.css`):** `--red #E8392A`, `--blue #5B8AC5`, `--yellow #D4E157`, `--green #8BC34A`, `--black #0d0d0d`. Note: `CLAUDE_MEMORY.md`/`README.md` list the red as `#E53935` — the CSS variable is `#E8392A`; trust the CSS.
- **Separators:** use `·` (middle dot), not `—` (em dash), in banner/disclaimer microcopy.
- **Commits:** short imperative subject lines (history: "Add 39 WebKreatives OSM leads", "Validate lead finder emails", "Fix article CTA translations"). Commit named files intentionally; per `CLAUDE_MEMORY.md`, avoid blind `git add -A`. Repo convention has **no** Co-Authored-By trailer on most commits.
- **Branching:** `main` is the deploy branch. Other branches exist (`Testing`, `new-site`) — see §8; don't assume they're safe bases.
- **Business/ops instructions live in `memory/`** and the root `*.md` files. Read the relevant one before automation work (articles, LinkedIn).

---

## 8. Gotchas

- **⚠️ Git is in DETACHED HEAD at `1254ddf`, one commit ahead of `main` (`0704a83`).** The working tree is clean, but `1254ddf` ("Mark invalid WebKreatives lead email") **is not on any branch.** If you commit here without first attaching, work can be lost to GC. **Before doing anything:** `git switch main` (or `git branch -f main 1254ddf` only if you've confirmed `1254ddf` should be main's new tip), then verify with `git log --oneline -3`. Do not push detached work.
- **⚠️ Two homepage/design systems coexist.** `index.html` is fully standalone (inline CSS/JS, GSAP, Unbounded/Figtree). Editing `css/style.css` or `js/i18n.js` **does nothing to the homepage** — those only affect sub-pages. Conversely, homepage nav/footer changes don't touch sub-pages (which get theirs from `js/global-components.js`). Change both when a change must be site-wide.
- **Stale docs.** `README.md` and `CLAUDE_MEMORY.md` describe the *pre-redesign* homepage (Poppins, `global-components`, Inter font, old file paths like `C:\Users\csaba\Documents\webkreatives`). They are unreliable for the current homepage. `CLAUDE_MEMORY.md` also lists an old red hex and old flat file names (`our-websites.html`) that are now folders.
- **`_rollback/` is a live copy of the old homepage.** It's not linked publicly but IS in the repo/deploy. Don't edit it thinking it's the real site, and don't let its files shadow the real ones.
- **Secrets committed in tracked files.** The Web3Forms `access_key` (`16fb...`) is hardcoded in `index.html`, and `CLAUDE_MEMORY.md` contains KVK/BTW numbers and the same key. The Web3Forms key is inherently public (client-side form) so that's acceptable, but treat `CLAUDE_MEMORY.md` as containing business PII. Don't add new secrets to tracked files; real secrets belong in `.env.leads` (gitignored).
- **`leads/Leads.xlsx` is NOT the source of truth.** Per `DATA_SOURCE.md`, the canonical lead data is a Google Sheet. Don't build workflows off the local xlsx or "reconcile" it as if authoritative.
- **`tools/send.php` won't run in production** (static GitHub Pages). The real form path is Web3Forms. Treat `send.php` as legacy unless told otherwise.
- **Branch `new-site` diverges** (tip `c6be13f`, different history). Don't branch off it or merge it without understanding what it contains.
- **Line endings:** git warns "LF will be replaced by CRLF" on Windows for `css/js`. Harmless, but expect the warning.
- **Client-demo concept banners are load-bearing (legal).** Removing or breaking them exposes the business. The banner script nudges fixed navs down by 38px; if a demo's nav layout looks off at the top, that interaction is why.

---

## 9. Open items

- **No TODO/FIXME markers in real source code.** The only `TODO/XXX`-looking hits are placeholder phone numbers in article copy (`articles/5-reasons-customers-leave-your-website/index.html:228`, `"06-XXXXXXXX"` used as an illustrative example — intentional) and doc examples in `CLAUDE_MEMORY.md:81` / `og/generate-article-og.js:6`. None require action.
- **No failing tests** — because there are no tests.
- **Repo hygiene / cleanup candidates:**
  - 6 throwaway scripts in repo root: `tmp-add-concept-banner.cjs`, `tmp-check-new-row.cjs`, `tmp-find-rows.cjs`, `tmp-inspect-leads.cjs`, `tmp-inspect-live-leads.cjs`, `tmp-payment-icons.cjs` — one-off, untracked, safe to delete.
  - `assets/payment/download-test/` — stray duplicate badges, safe to delete.
  - `leads/Leads.xlsx.bak` — backup clutter given the Google Sheet is canonical.
  - Nested `.claude/.claude/` duplication (`.claude/.claude/launch.json`, `.claude/.claude/settings.local.json`) — looks accidental; verify before removing.
- **Detached HEAD** (§8) is the most urgent open item.
- **Positioning drift** between `PRODUCT.md` and `WEBKREATIVES-MISSION.md` is unresolved in the docs; site copy should be audited against the Mission file.

---

## 10. Next steps (priority order)

1. **Attach HEAD to a branch.** Resolve the detached-HEAD-ahead-of-main state before any other work, or commits risk being orphaned. Confirm whether `1254ddf` belongs on `main`, fast-forward `main` to it if so, and push. *(Blocks safe committing.)*
2. **Reconcile the stale docs.** Either update `README.md`/`CLAUDE_MEMORY.md` to reflect the standalone GSAP homepage + dual design system, or add a short "current architecture" note pointing here. A fresh session following the old docs will edit the wrong files. *(High confusion risk.)*
3. **Decide the homepage/sub-page design-system split.** Either accept it and document the "edit both" rule prominently, or migrate sub-pages to match the new homepage look. Right now the homepage and sub-pages diverge visually (fonts, nav). *(Brand consistency.)*
4. **Repo cleanup** (§9): remove `tmp-*.cjs`, `assets/payment/download-test/`, redundant `.claude/.claude/`, and confirm the fate of `_rollback/`. *(Low risk, high tidiness.)*
5. **Audit site copy against `WEBKREATIVES-MISSION.md`** — ensure homepage/positioning reflects "custom sites, worldwide," not the older "Dutch SMEs only." *(Positioning.)*
6. **Verify article/OG pipeline still runs** (`og/generate-article-og.js`) and that `articles/articles-data.js` matches the folders on disk before publishing the next article.

Reasoning: 1 protects work-in-progress; 2–3 remove the single biggest trap (editing the wrong layer); 4–6 are maintenance that reduces future error.

---

## 11. External services

| Service | Role | Where referenced |
|---------|------|------------------|
| **GitHub Pages** (repo `CsabaVK/WebKreatives`) | Hosting + CI-less deploy of `main` → `webkreatives.com` | `CNAME`, README |
| **Web3Forms** | Contact-form backend → emails `info@webkreatives.com`. Public `access_key` hardcoded client-side | `index.html` form action + hidden input |
| **Google Fonts** (CDN) | Unbounded/Figtree (homepage), Poppins (sub-pages) | `<link>` tags |
| **cdnjs** (CDN) | GSAP 3.12.5 + ScrollTrigger for homepage animation | `index.html` `<script>` |
| **Google Custom Search API** | Lead sourcing | `tools/find-leads-google.js` (`GOOGLE_API_KEY`, `GOOGLE_CSE_CX`) |
| **OpenStreetMap** | Lead sourcing | `tools/find-leads-osm.js` |
| **Google Sheets** | **Canonical lead/outreach data store** (not the local xlsx) | `DATA_SOURCE.md` |
| **Instagram / LinkedIn / Medium** | Brand social profiles in JSON-LD `sameAs`; LinkedIn + Medium article syndication is an automation goal | homepage schema, `memory/OPENCLAW-LINKEDIN-AUTOMATION.md`, `memory/OPENCLAW-ARTICLE-CREATION.md` |
| **Gmail** | Referenced for auto-reply/notification workflows (via MCP in owner's setup) | `CLAUDE_MEMORY.md`, README |

**MCP connectors (owner's environment, not repo config):** the owner works with a range of MCP tools (Gmail, Google Calendar/Drive, Notion, Slack, Webflow, Canva, ElevenLabs, browser automation, scheduled tasks). None are required to build or deploy the site; they support business ops. Don't assume any are available in a given session — check first.

**Business identifiers (from `CLAUDE_MEMORY.md`, verify before external use):** KVK `94051097` (legal entity Csaba Services, trade name WebKreatives), BTW `NL381246668B01`. These are public registration numbers, but treat as sensitive-ish and confirm currency before putting them in client-facing docs.

---

## Recent work & current git state (as of this handover)

- **Working tree:** clean. **No uncommitted changes.**
- **HEAD:** detached at `1254ddf` ("Mark invalid WebKreatives lead email"), **1 commit ahead of `main` (`0704a83`)** — see §8/§10.
- **Branches present:** `main` (deploy), `Testing`, `new-site` (diverged, tip `c6be13f`), plus remotes `origin/main`, `origin/HEAD`.
- **Recent commit themes (last ~30):** dominated by **lead sourcing/outreach** ("Add 39/40 WebKreatives OSM leads", "Record outreach batch 313-332", "Validate lead finder emails", "Remove duplicate lead rows") and **SEO articles / OG images** ("Add one-page website article", "Update Open Graph images", "og img fix v2/v3"). The site itself is stable; most churn is business data + content, not code.

> Reminder: verify §8's git state and read `DATA_SOURCE.md` before your first commit or any lead work.
