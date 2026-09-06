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
 *   dateFormatted → human-readable date shown on cards
 *   readTime      → e.g. "6 min read"
 *   image         → Unsplash or own image URL (w=760&q=80 for cards)
 *   excerpt       → 1-2 sentence teaser shown on cards
 * ─────────────────────────────────────────────────────────────────────────── */

const WK_ARTICLES = [
  {
    slug:             'why-page-speed-and-seo-go-together',
    title:            'Why Page Speed and SEO Go Hand in Hand',
    category:         'Local SEO',
    date:             '2026-08-20',
    dateFormatted:    '20 August 2026',
    readTime:         '6 min read',
    publishedAt:      '2026-08-20T09:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=760&q=80',
    excerpt:          'Speed is not a side job next to your SEO. Here is what Google really measures, what costs local sites their position, and the order to fix it in.',
  },

  {
    slug:             'what-a-good-about-page-should-say',
    title:            'What a Great About Page Should Actually Say',
    category:         'Web Design Tips',
    date:             '2026-08-11',
    dateFormatted:    '11 August 2026',
    readTime:         '7 min read',
    publishedAt:      '2026-08-11T09:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=760&q=80',
    excerpt:          'Your about page is not an autobiography but the place where near-customers shed their last doubt. Here is what belongs on it, and what can go.',
  },

  {
    slug:             'how-to-choose-the-right-colors-for-your-brand',
    title:            'How to Choose the Right Colors for Your Brand',
    category:         'Brand & Trust',
    date:             '2026-08-05',
    dateFormatted:    '5 August 2026',
    readTime:         '7 min read',
    publishedAt:      '2026-08-05T09:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1716471330475-f0669db8947a?auto=format&fit=crop&w=760&q=80',
    excerpt:          'Colour online is rarely about taste. One recognisable main colour, one accent colour for actions and enough contrast will take you further than a full palette.',
  },

  {
    slug:             'website-security-basics-for-small-businesses',
    title:            'Website Security Basics Every Small Business Needs',
    category:         'Performance',
    date:             '2026-07-27',
    dateFormatted:    '27 July 2026',
    readTime:         '8 min read',
    publishedAt:      '2026-07-27T09:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1614064548237-096f735f344f?auto=format&fit=crop&w=760&q=80',
    excerpt:          'Security does not have to be a technical project. These are the five basics every small business should have in order: SSL, updates, backups, hosting and access.',
  },

  {
    slug:             'does-your-small-business-need-a-blog',
    title:            'Does Your Small Business Actually Need a Blog?',
    category:         'Local SEO',
    date:             '2026-07-20',
    dateFormatted:    '20 July 2026',
    readTime:         '7 min read',
    publishedAt:      '2026-07-20T09:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=760&q=80',
    excerpt:          'A blog is not an obligation for a small business, but it is an opportunity. How to pick the right topics, keep it realistic, and know when your time is better spent elsewhere.',
  },

  {
    slug:             'why-your-website-needs-clear-calls-to-action',
    title:            'Why Clear Calls-to-Action Make All the Difference',
    category:         'Conversion',
    date:             '2026-07-13',
    dateFormatted:    '13 July 2026',
    readTime:         '7 min read',
    publishedAt:      '2026-07-13T09:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=760&q=80',
    excerpt:          'A polished website with no clear calls-to-action quietly loses customers. Here is how sharp buttons, smart placement and the right words turn visitors into enquiries.',
  },

  {
    slug:             'how-to-write-website-copy-that-sells',
    title:            'How to Write Website Copy That Sells',
    category:         'Conversion',
    date:             '2026-07-06',
    dateFormatted:    '6 July 2026',
    readTime:         '7 min read',
    publishedAt:      '2026-07-06T09:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=760&q=80',
    excerpt:          'Copy sells, not just visuals. Here is how to write for your customer, turn features into benefits and make every page persuade with a simple framework.',
  },

  {
    slug:             'the-real-cost-of-a-diy-website',
    title:            'The Hidden Cost of a DIY Website',
    category:         'Small Business',
    date:             '2026-06-29',
    dateFormatted:    '29 June 2026',
    readTime:         '8 min read',
    publishedAt:      '2026-06-29T09:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=760&q=80',
    excerpt:          'A DIY website looks free, but the real price is your time, lost enquiries and trust you never win. Here is what doing it yourself actually adds up to.',
  },

  {
    slug:             'why-mobile-first-design-is-non-negotiable-in-2026',
    title:            'Why Mobile-First Design Is Non-Negotiable in 2026',
    category:         'Performance',
    date:             '2026-06-22',
    dateFormatted:    '22 June 2026',
    readTime:         '7 min read',
    publishedAt:      '2026-06-22T09:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=760&q=80',
    excerpt:          'Most visitors arrive on a phone and Google indexes mobile-first. Here is why mobile design is the starting point in 2026, not an afterthought.',
  },

  {
    slug:             'how-often-should-you-update-your-website',
    title:            'How Often Should You Refresh Your Website?',
    category:         'Web Design Tips',
    date:             '2026-06-11',
    dateFormatted:    '11 June 2026',
    readTime:         '6 min read',
    publishedAt:      '2026-06-11T09:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=760&q=80',
    excerpt:          'You don\'t need a yearly overhaul. Learn the difference between maintenance and a redesign, the signs your site is aging, and what to update first.',
  },

  {
    slug:             'stock-photos-vs-real-photos-on-your-website',
    title:            'Stock Photos vs Real Photos: What Builds More Trust',
    category:         'Brand & Trust',
    date:             '2026-06-05',
    dateFormatted:    '5 June 2026',
    readTime:         '6 min read',
    publishedAt:      '2026-06-05T09:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=760&q=80',
    excerpt:          'Stock photos are fast and cheap, but on the wrong page they cost you trust. Learn when stock works and when real photos win more customers.',
  },

  {
    slug:             'what-makes-a-contact-page-actually-work',
    title:            'What Makes a Contact Page Actually Work',
    category:         'Conversion',
    date:             '2026-05-29',
    dateFormatted:    '29 May 2026',
    readTime:         '6 min read',
    publishedAt:      '2026-05-29T09:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=760&q=80',
    excerpt:          'Your contact page is where interest turns into an enquiry. Less friction, a choice of channels and honest expectations noticeably get more visitors to reach out.',
  },

  {
    slug:             'how-website-speed-costs-you-customers',
    title:            'How Your Website Speed Quietly Costs You Customers',
    category:         'Performance',
    date:             '2026-05-21',
    dateFormatted:    '21 May 2026',
    readTime:         '6 min read',
    publishedAt:      '2026-05-21T09:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=760&q=80',
    excerpt:          'A slow website loses customers with silence, not a bang. What Core Web Vitals mean in plain language, why speed is revenue, and the quick wins you can make today.',
  },

  {
    slug:             'why-your-business-needs-a-domain-email',
    title:            'Why a Domain Email Makes Your Business Look More Serious',
    category:         'Brand & Trust',
    date:             '2026-05-15',
    dateFormatted:    '15 May 2026',
    readTime:         '7 min read',
    publishedAt:      '2026-05-15T09:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=760&q=80',
    excerpt:          'Still sending quotes and invoices from @gmail.com? It costs you more trust than you think. Why an address on your own domain makes you look more serious.',
  },

  {
    slug:             'anatomy-of-a-homepage-that-converts',
    title:            'The Anatomy of a Homepage That Converts',
    category:         'Conversion',
    date:             '2026-05-07',
    dateFormatted:    '7 May 2026',
    readTime:         '7 min read',
    publishedAt:      '2026-05-07T09:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=760&q=80',
    excerpt:          'A homepage that converts is not a pretty picture but a set of deliberate parts working together. We break the converting homepage down piece by piece.',
  },

  {
    slug:             'why-a-one-page-website-is-not-enough-in-2026',
    title:            'Why a One-Page Website Is Not Enough in 2026',
    category:         'Web Design Tips',
    date:             '2026-05-01',
    dateFormatted:    '1 May 2026',
    readTime:         '7 min read',
    publishedAt:      '2026-05-01T20:10:00+02:00',
    image:            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=760&q=80',
    excerpt:          'A one-page website can look clean, but for many local businesses it is too limited for trust, SEO, and conversion.',
  },
  {
    slug:             'why-your-google-business-profile-is-your-new-homepage',
    title:            'Why Your Google Business Profile Is Your New Homepage in 2026',
    category:         'Local SEO',
    date:             '2026-04-24',
    dateFormatted:    '24 April 2026',
    readTime:         '7 min read',
    publishedAt:      '2026-04-24T09:30:00+02:00',
    image:            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=760&q=80',
    excerpt:          'For local search results, your Google Business Profile is often the real first impression. Here is why it functions almost like a second homepage in 2026.',
  },
  {
    slug:             'what-does-a-small-business-website-cost-in-2026',
    title:            'What Does a Small Business Website Cost in 2026?',
    category:         'Web Design Tips',
    date:             '2026-04-22',
    dateFormatted:    '22 April 2026',
    readTime:         '8 min read',
    publishedAt:      '2026-04-22T10:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=760&q=80',
    excerpt:          'What does a website cost in 2026? A practical guide for small businesses that want to compare options without falling into the cheapest trap.',
  },
  {
    slug:             'local-seo-how-google-finds-you-in-your-city',
    title:            'Local SEO: How Google Finds You in Your City',
    category:         'Local SEO',
    date:             '2026-04-20',
    dateFormatted:    '20 April 2026',
    readTime:         '7 min read',
    publishedAt:      '2026-04-20T11:30:00+02:00',
    image:            'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=760&q=80',
    excerpt:          'Google Business Profile, reviews, local content, and consistent business details: these are the factors that shape how visible you are in your city.',
  },
  {
    slug:             '5-reasons-customers-leave-your-website',
    title:            '5 Reasons Customers Leave Your Website',
    category:         'Web Design Tips',
    date:             '2026-04-19',
    dateFormatted:    '19 April 2026',
    readTime:         '7 min read',
    publishedAt:      '2026-04-19T22:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=760&q=80',
    excerpt:          'Slow load times, no CTA, outdated design: small mistakes with big consequences. Use this self-check to spot what you are losing each day.',
  },
  {
    slug:             'why-your-hair-salon-needs-a-website',
    title:            'Why Your Hair Salon Needs a Website',
    category:         'Small Business',
    date:             '2026-04-19',
    dateFormatted:    '19 April 2026',
    readTime:         '6 min read',
    publishedAt:      '2026-04-19T18:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=760&q=80',
    excerpt:          '81% of customers search online before choosing a salon. Without a website, you stay invisible to most new clients.',
  },
  {
    slug:             'why-online-reviews-bring-you-more-local-customers',
    title:            'Why Online Reviews Bring You More Local Customers',
    category:         'Local SEO',
    date:             '2026-04-29',
    dateFormatted:    '29 April 2026',
    readTime:         '7 min read',
    publishedAt:      '2026-04-29T09:00:00+02:00',
    image:            'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=760&q=80',
    excerpt:          'Reviews are not just social proof. They also help shape how visible and convincing your business appears locally.',
  }
  /* ── Add new articles above this line ─────────────────────────────────── */
];

WK_ARTICLES.sort((a, b) => {
  const aTime = new Date(a.publishedAt || a.date || 0).getTime();
  const bTime = new Date(b.publishedAt || b.date || 0).getTime();
  return bTime - aTime;
});


