/* ─── WebKreatives — Article Shared Components ────────────────────────────────
 * Auto-renders: share bar · author bio · related articles
 *
 * Usage in each article HTML (before </body>):
 *   <script src="articles-data.js"></script>
 *   <script src="article-utils.js"></script>
 *
 * Targets (place empty divs with these attributes in your article HTML):
 *   <div class="art-share"       data-wk-share></div>
 *   <div class="art-author-bio"  data-wk-author></div>
 *   <div class="art-related-grid" data-wk-related></div>
 * ─────────────────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  const LINKEDIN_COMPANY = 'https://www.linkedin.com/company/webkreatives/';
  const INSTAGRAM_PAGE   = 'https://www.instagram.com/webkreatives/';
  const AUTHOR_IMG       = 'https://webkreatives.com/assets/csaba.jpg';

  /* ── Helpers ──────────────────────────────────────────────────────────── */
  function getCurrentSlug() {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) return '';
    return canonical.href.replace(/\/$/, '').replace(/\.html$/, '').split('/').pop();
  }

  function getArticleLanguage() {
    return localStorage.getItem('wk-lang') || document.documentElement.lang || 'nl';
  }

  function t(nl, en) {
    return getArticleLanguage() === 'en' ? en : nl;
  }

  /* ── Share Bar ────────────────────────────────────────────────────────── */
  function renderShareBar(el) {
    const pageUrl   = encodeURIComponent(window.location.href);
    const liUrl     = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;

    el.innerHTML = `
      <span class="art-share-label">${t('Deel dit artikel:', 'Share this article:')}</span>
      <a class="share-btn linkedin" href="${liUrl}" target="_blank" rel="noopener" aria-label="${t('Deel op LinkedIn', 'Share on LinkedIn')}">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v1.5A5 5 0 0 1 16 8z"/>
          <rect x="2" y="9" width="4" height="12" rx=".5"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
        LinkedIn
      </a>
      <a class="share-btn instagram" href="${INSTAGRAM_PAGE}" target="_blank" rel="noopener" aria-label="${t('Volg ons op Instagram', 'Follow us on Instagram')}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1.5" fill="white" stroke="none"/>
        </svg>
        Instagram
      </a>
      <button class="share-btn copy" id="wkCopyBtn" aria-label="${t('Kopieer paginalink', 'Copy page link')}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        ${t('Kopieer link', 'Copy link')}
      </button>`;

    const copyBtn = document.getElementById('wkCopyBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(window.location.href).then(() => {
          copyBtn.classList.add('copied');
          copyBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            ${t('Gekopieerd!', 'Copied!')}`;
          setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.innerHTML = `
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              ${t('Kopieer link', 'Copy link')}`;
          }, 2800);
        }).catch(() => {
          /* Fallback for older browsers */
          const ta = document.createElement('textarea');
          ta.value = window.location.href;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          copyBtn.textContent = `✓ ${t('Gekopieerd!', 'Copied!')}`;
          setTimeout(() => { copyBtn.textContent = t('Kopieer link', 'Copy link'); }, 2800);
        });
      });
    }
  }

  /* ── Author Bio ───────────────────────────────────────────────────────── */
  function renderAuthorBio(el) {
    el.innerHTML = `
      <img src="${AUTHOR_IMG}" alt="Csaba Garaguly, Co-founder WebKreatives" loading="lazy">
      <div>
        <h4>Csaba Garaguly</h4>
        <span class="bio-role">${t('Co-founder · WebKreatives', 'Co-founder · WebKreatives')}</span>
        <p>${t('WebKreatives bouwt websites voor kleine bedrijven in Nederland en deelt praktische inzichten over online groeien. Csaba schrijft vanuit WebKreatives over hoe ondernemers hun online aanwezigheid sterker kunnen maken zonder fortuin te betalen.', 'WebKreatives builds websites for small businesses in the Netherlands and shares practical insights about growing online. Csaba writes from within WebKreatives about how business owners can strengthen their online presence without paying a fortune.')}</p>
      </div>`;
  }

  /* ── Related Articles ─────────────────────────────────────────────────── */
  function renderRelated(el) {
    if (typeof WK_ARTICLES === 'undefined' || !WK_ARTICLES.length) {
      el.innerHTML = `<p style="color:var(--grey-500);font-size:14px">${t('Binnenkort meer artikelen.', 'More articles coming soon.')}</p>`;
      return;
    }

    const isEnglish = getArticleLanguage() === 'en';
    const slug      = getCurrentSlug();
    const others    = WK_ARTICLES.filter(a => a.slug !== slug).slice(0, 3);

    if (!others.length) {
      el.innerHTML = `<p style="color:var(--grey-500);font-size:14px">${t('Binnenkort meer artikelen.', 'More articles coming soon.')}</p>`;
      return;
    }

    el.innerHTML = others.map(a => {
      const category = isEnglish ? (a.categoryEn || a.category) : a.category;
      const title = isEnglish ? (a.titleEn || a.title) : a.title;
      const dateFormatted = isEnglish ? (a.dateFormattedEn || a.dateFormatted) : a.dateFormatted;
      const readTime = isEnglish ? (a.readTimeEn || a.readTime) : a.readTime;

      return `
      <a class="art-related-card" href="/articles/${a.slug}/">
        <span class="arc-cat">${category}</span>
        <div class="arc-title">${title}</div>
        <span class="arc-date">${dateFormatted} · ${readTime}</span>
      </a>`;
    }).join('');
  }

  /* ── Init ─────────────────────────────────────────────────────────────── */
  function init() {
    const shareEl   = document.querySelector('[data-wk-share]');
    const authorEl  = document.querySelector('[data-wk-author]');
    const relatedEl = document.querySelector('[data-wk-related]');

    if (shareEl)   renderShareBar(shareEl);
    if (authorEl)  renderAuthorBio(authorEl);
    if (relatedEl) renderRelated(relatedEl);
  }

  document.addEventListener('wk:languagechange', init);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

