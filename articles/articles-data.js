/* ─── WebKreatives — Article Registry ─────────────────────────────────────────
 * Add every new article here. This file drives:
 *   • Related articles section (auto, excludes current)
 *   • Blog index page cards
 *   • Homepage preview cards (future)
 *
 * Articles are listed newest first. The first entry = most recent.
 *
 * Fields:
 *   slug          → filename without .html (also the URL path segment)
 *   title         → full article title
 *   category      → display label (shown on cards + related section)
 *   date          → ISO 8601 (YYYY-MM-DD) — used for sorting
 *   dateFormatted → human-readable Dutch date shown on cards
 *   readTime      → e.g. "6 min lezen"
 *   image         → Unsplash or own image URL (w=760&q=80 for cards)
 *   excerpt       → 1-2 sentence teaser shown on cards
 * ─────────────────────────────────────────────────────────────────────────── */

const WK_ARTICLES = [
  {
    slug:             '5-redenen-waarom-klanten-jouw-website-verlaten',
    title:            '5 Redenen Waarom Klanten Jouw Website Verlaten',
    titleEn:          '5 Reasons Customers Leave Your Website',
    category:         'Webdesign Tips',
    categoryEn:       'Web Design Tips',
    date:             '2026-04-19',
    dateFormatted:    '19 april 2026',
    dateFormattedEn:  '19 April 2026',
    readTime:         '7 min lezen',
    readTimeEn:       '7 min read',
    publishedAt:      '2026-04-19T22:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=760&q=80',
    excerpt:          'Laadtijd, geen CTA, verouderd design: kleine fouten met grote gevolgen. Doe de zelfscan en ontdek wat je dagelijks misloopt.',
    excerptEn:        'Slow load times, no CTA, outdated design: small mistakes with big consequences. Use this self-check to spot what you are losing each day.'
  },
  {
    slug:             'waarom-jouw-kapsalon-een-website-nodig-heeft',
    title:            'Waarom Jouw Kapsalon Een Website Nodig Heeft',
    titleEn:          'Why Your Hair Salon Needs a Website',
    category:         'Kapsalon & Beauty',
    categoryEn:       'Salon & Beauty',
    date:             '2026-04-19',
    dateFormatted:    '19 april 2026',
    dateFormattedEn:  '19 April 2026',
    readTime:         '6 min lezen',
    readTimeEn:       '6 min read',
    publishedAt:      '2026-04-19T18:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=760&q=80',
    excerpt:          '81% van de klanten zoekt online voordat ze een kapsalon bezoeken. Zonder website ben je onzichtbaar voor nieuwe klanten.',
    excerptEn:        '81% of customers search online before choosing a salon. Without a website, you stay invisible to most new clients.'
  }
  /* ── Add new articles above this line ─────────────────────────────────── */
];
