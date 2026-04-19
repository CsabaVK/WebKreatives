# WebKreatives — Webdesign voor Kleine Bedrijven

> **Live:** [webkreatives.com](https://webkreatives.com)
> Hosted via GitHub Pages — auto-deploys from `main` branch
> Owner: Csaba Garaguly

---

## About

WebKreatives is a Dutch freelance web design agency specialising in fast, affordable, conversion-focused websites for small businesses in the Netherlands. Websites go live within 1–2 weeks, starting from €199.

---

## Repository Structure

```
/
├── index.html                        ← Main homepage (NL + EN bilingual toggle)
├── our-websites.html             ← Showcase of all client templates
├── README.md                         ← This file
├── CLAUDE_MEMORY.md                  ← AI context file (project memory for Claude)
│
├── templates/
│   ├── dutch/                        ← Dutch language templates
│   │   ├── auto-reply.html
│   │   ├── client-onboarding.html
│   │   ├── cold-email-outreach.html
│   │   ├── cold-email-new-offer.html
│   │   └── cold-email-website-refresh.html
│   ├── english/                      ← English counterparts (paired 1-to-1 with dutch/)
│   │   ├── auto-reply.html
│   │   ├── client-onboarding.html
│   │   ├── cold-email-outreach.html
│   │   ├── cold-email-new-offer.html
│   │   └── cold-email-website-refresh.html
│   └── universal/                    ← Language-neutral templates
│       ├── invoice-template.html
│       ├── email-signature.html
│       └── client-preview.html
│
├── client-projects/
│   ├── de-groot-accountants/
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
├── assets/
│   └── csaba.jpg                     ← Profile photo used in email signatures & templates
├── og/
│   └── og-image.html                 ← Open Graph preview image
└── leads/                            ← Lead data & scripts (gitignored)
```

---

## Colour Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Red (Primary) | `#E53935` | CTA buttons, accents, logo bar |
| Yellow / Lime | `#D4E157` | Secondary accent, logo bar |
| Green | `#8BC34A` | Success states, checkmarks |
| Blue | `#5B8AC5` | Info accents |
| Black | `#0d0d0d` | Dark backgrounds, headings |
| White | `#ffffff` | Card & section backgrounds |
| Light grey | `#f5f5f5` / `#fafafa` | Page backgrounds |
| Body text | `#333333` | Paragraph text |
| Muted text | `#888` / `#999` | Labels, subtitles, captions |

---

## Typography

| Role | Font | Weights |
|------|------|---------|
| Primary (UI) | [Poppins](https://fonts.google.com/specimen/Poppins) | 300, 400, 500, 600, 700, 800 |
| Email templates | Arial / Helvetica (email-safe stack) | — |

---

## Template System

Templates are split into three categories:

| Folder | Purpose | Pairing |
|--------|---------|---------|
| `templates/dutch/` | Dutch language versions | Paired with `english/` by filename |
| `templates/english/` | English language versions | Paired with `dutch/` by filename |
| `templates/universal/` | Language-neutral (invoice, signature, client preview) | No pair |

**Sync rule**: Editing `dutch/[name].html` should always be mirrored in `english/[name].html` and vice versa.

---

## Homepage Sections

| Section | Details |
|---------|---------|
| Hero | Typing animation + browser mockup |
| Trust bar | Client logos |
| Stats | 15+ sites · 1–2 weeks delivery · 100% satisfaction |
| Services | 6 service cards |
| Why Us | Dark section, 4 key points |
| Portfolio | Client project previews |
| Testimonials | Client reviews |
| Pricing | Starter €199 / Business €299 / Growth €599 |
| Subscription plans | Basis €19/mo · Groei €39/mo · Premium €79/mo |
| FAQ | Accordion (8 questions) |
| Contact form | Powered by Web3Forms |
| About / Founder | Csaba G. intro |

---

## Features

- Bilingual: Dutch (default) + English with language switcher
- Mobile-first responsive design
- Contact form via [Web3Forms](https://web3forms.com) with honeypot spam protection
- Scroll animations (Intersection Observer API)
- `data-i18n` attributes for translation strings
- SEO optimised — meta tags, Open Graph, sitemap, robots.txt

---

## Integrations

| Service | Detail |
|---------|--------|
| GitHub Pages | Auto-deploys from `main` → `webkreatives.com` |
| Web3Forms | Contact form handler → `info@webkreatives.com` |
| Gmail | Connected via MCP for automated workflows |

---

## Deployment

Hosted on GitHub Pages with custom domain.
Every push to `main` automatically deploys to [webkreatives.com](https://webkreatives.com) within ~1 minute.

---

*Built and maintained by Csaba Garaguly · [webkreatives.com](https://webkreatives.com)*

