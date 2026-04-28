/* ─── WebKreatives — Article Registry ─────────────────────────────────────────
 * Add every new article here. This file drives:
 *   • Related articles section (auto, excludes current)
 *   • Blog index page cards
 *   • Homepage preview cards (future)
 *
 * Articles are listed newest first. The first entry = most recent.
 *
 * Fields:
 *   slug          → clean English URL slug (folder name / URL path segment)
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
    slug:             'what-does-a-small-business-website-cost-in-2026',
    title:            'Wat Kost Een Website Voor Een Klein Bedrijf in 2026?',
    titleEn:          'What Does a Small Business Website Cost in 2026?',
    category:         'Webdesign Tips',
    categoryEn:       'Web Design Tips',
    date:             '2026-04-22',
    dateFormatted:    '22 april 2026',
    dateFormattedEn:  '22 April 2026',
    readTime:         '8 min lezen',
    readTimeEn:       '8 min read',
    publishedAt:      '2026-04-22T10:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=760&q=80',
    excerpt:          'Wat kost een website laten maken in 2026? Een praktische gids voor kleine bedrijven die slim willen vergelijken zonder in de goedkoopste val te lopen.',
    excerptEn:        'What does a website cost in 2026? A practical guide for small businesses that want to compare options without falling into the cheapest trap.'
  },
  {
    slug:             'local-seo-how-google-finds-you-in-your-city',
    title:            'Lokale SEO: Hoe Google Jou Vindt in Jouw Stad',
    titleEn:          'Local SEO: How Google Finds You in Your City',
    category:         'Lokale SEO',
    categoryEn:       'Local SEO',
    date:             '2026-04-20',
    dateFormatted:    '20 april 2026',
    dateFormattedEn:  '20 April 2026',
    readTime:         '7 min lezen',
    readTimeEn:       '7 min read',
    publishedAt:      '2026-04-20T11:30:00+02:00',
    image:            'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=760&q=80',
    excerpt:          'Google Bedrijfsprofiel, reviews, lokale content en consistente bedrijfsinformatie: dit zijn de onderdelen die bepalen hoe zichtbaar jij bent in jouw stad.',
    excerptEn:        'Google Business Profile, reviews, local content, and consistent business details: these are the factors that shape how visible you are in your city.'
  },
  {
    slug:             '5-reasons-customers-leave-your-website',
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
    slug:             'why-your-hair-salon-needs-a-website',
    title:            'Waarom Jouw Kapsalon Een Website Nodig Heeft',
    titleEn:          'Why Your Hair Salon Needs a Website',
    category:         'Kleine Bedrijven',
    categoryEn:       'Small Business',
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


