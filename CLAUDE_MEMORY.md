# Claude Memory File — WebKreatives Project
> Created: 2026-03-22 | Owner: Csaba Garaguly / WebKreatives
> This file exists so future Claude sessions instantly know the full context of this project.

---

## 👤 About the Owner
- **Name**: Csaba Garaguly
- **Business**: WebKreatives — freelance web design & development
- **Website**: [webkreatives.com](https://webkreatives.com) (GitHub Pages, repo: CsabaVK/WebKreatives)
- **Tools used alongside Claude**: "OpenClaw" (another AI tool) — both tools work on the same repo
- **Email**: tied to Web3Forms + Gmail

---

## 📁 Repository & File Structure
```
C:\Users\csaba\Documents\webkreatives\   ← SINGLE SOURCE OF TRUTH (local + GitHub)
│
├── index.html                           ← Main portfolio/homepage
├── template-library.html               ← Showcase of all client templates (10 cards)
├── CLAUDE_MEMORY.md                    ← This file
│
├── templates/
│   ├── dutch/                          ← Dutch language templates
│   │   ├── auto-reply.html
│   │   ├── client-onboarding.html
│   │   ├── cold-email-outreach.html
│   │   ├── cold-email-new-offer.html
│   │   └── cold-email-website-refresh.html
│   ├── english/                        ← English language templates (paired with dutch/)
│   │   ├── auto-reply.html
│   │   ├── client-onboarding.html
│   │   ├── cold-email-outreach.html
│   │   ├── cold-email-new-offer.html
│   │   └── cold-email-website-refresh.html
│   └── universal/                      ← Language-neutral templates
│       ├── invoice-template.html
│       ├── email-signature.html
│       └── client-preview.html
│
├── client-projects/
│   ├── de-groot-accountants/           ← Multi-page accountancy site (FULL SITE)
│   │   ├── index.html
│   │   ├── over-ons.html
│   │   ├── diensten.html
│   │   ├── contact.html
│   │   └── style.css
│   ├── leyenburger.html
│   ├── tandarts-knoll.html
│   ├── studio-lena-fotografie.html
│   ├── luna-beauty-studio.html
│   ├── bakkerij-hartman.html
│   ├── nexus-it-solutions.html
│   ├── maison-blanc-interieur.html
│   ├── vanderberg-loodgieter.html
│   └── klussenbedrijf-edward.html
│
├── leads/                              ← Lead data & scripts (NOT committed to git)
├── assets/
│   └── csaba.jpg                       ← Csaba's profile photo (used in templates)
└── og/
    └── og-image.html
```

**GitHub remote**: `https://github.com/CsabaVK/WebKreatives` (branch: `main`)
**Live URL**: `https://webkreatives.com`

---

## 🎨 Brand / Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--red` | `#E53935` | Primary accent |
| `--yellow` | `#D4E157` | Secondary accent |
| `--black` | `#0d0d0d` | Background dark |

- **Font**: Inter (Google Fonts), various weights
- **Csaba's photo URL**: `https://webkreatives.com/assets/csaba.jpg`
- **Unsplash pattern**: `https://images.unsplash.com/photo-XXXXXXXXXX?auto=format&fit=crop&w=800&q=80`

---

## 🔑 Integrations & Keys

| Service | Key / Detail |
|---------|-------------|
| Web3Forms | Access key: `16fb32e8-43cd-4b8c-b6ad-904a4efd8e59` |
| KVK | **94051097** — legal entity: Csaba Services, trade name: WebKreatives (updated 2026-03-22) |
| BTW | **NL381246668B01** |
| GitHub Pages | Auto-deploys from `main` branch |
| Gmail | Connected via MCP — `notify@web3forms.com` filter needed (auto-reply setup) |

---

## 📝 Templates — Key Details

### 🔁 Template Language Sync Rule (set 2026-03-22)
> **IMPORTANT**: `dutch/` and `english/` templates are paired 1-to-1 by filename.
> Whenever Csaba edits a file in `dutch/` OR `english/`, Claude MUST automatically update the matching file in the other language folder to keep content, structure, and tone in sync.
> - Example: edit `dutch/auto-reply.html` → Claude also updates `english/auto-reply.html`
> - Universal templates (`universal/`) have no pair — edit freely.
> - Pairing is by filename (e.g. `dutch/client-onboarding.html` ↔ `english/client-onboarding.html`)

---

### `dutch/client-onboarding.html` (formerly `client-onboarding-welcome.html`)
- 4-page A4 PDF-style document for new WebKreatives clients
- Uses `@page{size:A4}`, `width:210mm`, `height:297mm`, `page-break-after:always`
- **Page 1**: Welcome hero (dark) + meta-grid (Klant/Bedrijf/Pakket/Startdatum) + summary cards
- **Page 2**: Project flow — 6 steps: Onboarding → Aanlevering → Design → Feedback → Finale check → Livegang
- **Page 3**: Client intake (8 questions) + pricing tiers: Starter €199 / Business €299 / Growth €599
- **Page 4**: Terms & conditions summary + maintenance plans (€19/€39/€79/ma) + Csaba signature
- Print via browser: File → Print → Save as PDF (A4)

### `email-template-dutch-website-refresh.html`
- HTML cold email for Dutch small businesses (website refresh pitch)
- Table-based layout, **580px wide** — email client compatible
- Sections: top accent bar → dark header with logo → hero image → greeting `[Bedrijfsnaam]` → 3 service cards → dark highlight strip → personal note + CTA buttons → signature
- Footer: "Niet geinteresseerd? Geen probleem - je hoort nooit meer van ons."
- Service cards: Website vanaf €199 / SEO & Groei / Onderhoud vanaf €19/ma
- Uses `csaba.jpg` avatar in signature

---

## 🏗️ Client Projects — Notes

### De Groot & Partners Accountants (`/client-projects/de-groot-accountants/`)
- **Full multi-page site** (4 pages: index, over-ons, diensten, contact)
- Color scheme: `--navy: #1a2744`, `--teal: #2dd4bf`, `--gold: #f59e0b`
- **Known bug fixed**: `.nav-mobile{display:none}` MUST be in base styles (outside any media query). If it's inside `@media(max-width:900px)` only, the mobile nav shows as a white strip of plain text on desktop.
  ```css
  /* CORRECT — base styles, outside all media queries */
  .nav-mobile{display:none}
  /* Inside @media(max-width:900px) only: */
  .nav-mobile.open{display:flex;position:fixed;inset:0;...}
  ```
- Real Unsplash photos used (not SVG placeholders):
  - Why section (index.html): `photo-1454165804606-c3d57bc86b40`
  - Office story (over-ons.html): `photo-1497366216548-37526070297c`
  - Team headshots: Herman `1560250097`, Linda `1573496359142-b8d87734a5a2`, Tom `1472099645785`, Sophie `1438761681033`

---

## 🔄 Workflow & Conventions

### Git Commits
- Working directory (OpenClaw): `D:\.openclaw\workspace\projects\WebsitePrototypes\webkreatives-v3`
- Old path (may still be valid): `C:\Users\csaba\Documents\webkreatives`
- Commit specific files by name (never `git add -A` without checking)
- Push to `origin main`
- Always use absolute paths

### File Consolidation Rule
> **The GitHub repo at `C:\Users\csaba\Documents\webkreatives\` is the single source of truth.**
- When Csaba provides files from `C:\Users\csaba\Desktop\WebKreatives-templates\` — those are his latest local edits
- Overwrite the repo versions, commit, push
- Do NOT let GitHub get overwritten by stale local copies

### Starting a New Claude Session
- Open terminal: `cd "C:\Users\csaba\Documents\webkreatives"`
- Run `claude` — this sets the correct project root
- If session starts from `Downloads\webkreatives`, use absolute paths anyway

### Image Pattern
- All stock images: Unsplash CDN — `https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w={W}&q=80`
- Always use `object-fit:cover` on img tags inside fixed-size containers
- For team photos: `w=400`, for hero/wide images: `w=800` or `w=1200`

---

## ✅ Completed Milestones (this conversation)

| # | Task | Status |
|---|------|--------|
| 1 | Fix De Groot white bar (nav-mobile CSS scope bug) | ✅ Done — commit `f7c6114` |
| 2 | Add real Unsplash photos to De Groot site (5 locations) | ✅ Done — commit `f7c6114` |
| 3 | Overwrite `client-onboarding-welcome.html` from Desktop → repo | ✅ Done — commit `cc7586a` |
| 4 | Overwrite `email-template-dutch-website-refresh.html` from Desktop → repo | ✅ Done — commit `cc7586a` |
| 5 | Create this CLAUDE_MEMORY.md file | ✅ Done |

---

## 🚧 Pending / To-Do

- [ ] Fix Gmail auto-reply filter for `notify@web3forms.com` (so form submissions auto-reply to sender)
- [ ] Check all other local files against repo for parity (user to provide file locations)
- [ ] Verify `template-library.html` has De Groot & Partners as card #10 (check it renders correctly)

---

## 💡 Lessons Learned / Approach Notes

1. **Always read existing files before editing** — never assume structure
2. **CSS media query scoping** — `display:none` for hidden elements must be in base styles, not locked inside a breakpoint
3. **Unsplash for placeholders** — always works, no API key needed, just the CDN URL pattern
4. **Agent rate limits** — if a background agent returns ~28 tokens with 2 tool calls, it hit its rate limit and didn't do the work. Pick up manually.
5. **Two AI tools on same repo** — Csaba uses both Claude and OpenClaw. Claude is authoritative for GitHub; when Csaba sends a file and says "this is the latest", overwrite without hesitation
6. **HTML emails** — always table-based layout for email client compatibility, 580px max-width
7. **PDF-style HTML docs** — use `@page{size:A4}`, `width:210mm`, per-page divs with `page-break-after:always`
