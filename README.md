# WebKreatives

Web design agency website for small businesses in the Netherlands. Built with HTML, CSS, and JavaScript.

**Live:** [webkreatives.com](https://webkreatives.com)

## Structure

```
webkreatives/
├── index.html                    # Main agency page (Dutch default)
├── leyenburger.html              # Client site: Eethuis Leyenburger
├── tandarts-knoll.html           # Client site: Tandarts Knoll
├── klussenbedrijf-edward.html    # Client site: Klussenbedrijf Edward
├── email-template.html           # Outreach email template
├── email-signature.html          # Email signature
├── auto-reply.html               # Auto-reply template (NL + EN)
├── css/
│   └── style.css                 # All styles + dark mode
├── js/
│   ├── script.js                 # Animations, form handling, theme toggle
│   └── i18n.js                   # Translations (Dutch + English)
└── assets/
    ├── csaba.jpg                 # Founder photo
    ├── team1.png                 # Team member
    └── team2.png                 # Team member
```

## Features

- Bilingual: Dutch (default) + English with language switcher
- Dark / light mode toggle with localStorage persistence
- Responsive design (mobile-first)
- Contact form via Web3Forms with honeypot spam protection
- Scroll animations (Intersection Observer)
- Typing effect in hero section
- Expandable subscription plans section
- FAQ accordion
- SEO optimized with meta tags, sitemap, and robots.txt
- Google Analytics integration
- OG meta tags for social sharing

## Sections

- Hero with typing animation + browser mockup
- Trust bar (client logos)
- Stats (5+ sites, 1-2 weeks, 100% satisfaction, 5 stars)
- Services (6 cards)
- Why Us (dark section, 4 checkpoints)
- Portfolio (3 client projects)
- Testimonials (3 reviews)
- FAQ (8 questions)
- Pricing (Starter €199 / Business €299 / Growth €599)
- Subscription plans (Basis €19/mo / Groei €39/mo / Premium €79/mo)
- Contact form
- About / Founder
- Footer

## Brand Colors

| Color | Hex |
|-------|-----|
| Red (primary accent) | `#E53935` |
| Green | `#8BC34A` |
| Yellow | `#D4E157` |
| Blue | `#5B8AC5` |
| Black | `#0d0d0d` |

## Fonts

- Headlines: [Fraunces](https://fonts.google.com/specimen/Fraunces)
- Body: [Poppins](https://fonts.google.com/specimen/Poppins)

## Deployment

Hosted on GitHub Pages with custom domain (webkreatives.com).
Auto-deploys on every push to `main`.

## Contact Form

Powered by [Web3Forms](https://web3forms.com) (free tier). Submissions are sent to info@webkreatives.com. Spam protection via honeypot field + Web3Forms advanced spam filter.
