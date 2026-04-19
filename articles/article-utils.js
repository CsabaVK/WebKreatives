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

  /* ── Share Bar ────────────────────────────────────────────────────────── */
  function renderShareBar(el) {
    const pageUrl   = encodeURIComponent(window.location.href);
    const liUrl     = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;

    el.innerHTML = `
      <span class="art-share-label">Deel dit artikel:</span>
      <a class="share-btn linkedin" href="${liUrl}" target="_blank" rel="noopener" aria-label="Deel op LinkedIn">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v1.5A5 5 0 0 1 16 8z"/>
          <rect x="2" y="9" width="4" height="12" rx=".5"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
        LinkedIn
      </a>
      <a class="share-btn instagram" href="${INSTAGRAM_PAGE}" target="_blank" rel="noopener" aria-label="Volg ons op Instagram">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1.5" fill="white" stroke="none"/>
        </svg>
        Instagram
      </a>
      <button class="share-btn copy" id="wkCopyBtn" aria-label="Kopieer paginalink">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        Kopieer link
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
            Gekopieerd!`;
          setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.innerHTML = `
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              Kopieer link`;
          }, 2800);
        }).catch(() => {
          /* Fallback for older browsers */
          const ta = document.createElement('textarea');
          ta.value = window.location.href;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          copyBtn.textContent = '✓ Gekopieerd!';
          setTimeout(() => { copyBtn.textContent = 'Kopieer link'; }, 2800);
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
        <span class="bio-role">Co-founder · WebKreatives</span>
        <p>Csaba bouwt websites voor kleine bedrijven in Nederland en schrijft over alles wat te maken heeft met online groeien. WebKreatives helpt ondernemers die weten dat hun online aanwezigheid beter kan, zonder fortuin te betalen.</p>
      </div>`;
  }

  /* ── Related Articles ─────────────────────────────────────────────────── */
  function renderRelated(el) {
    if (typeof WK_ARTICLES === 'undefined' || !WK_ARTICLES.length) {
      el.innerHTML = '<p style="color:var(--grey-500);font-size:14px">Binnenkort meer artikelen.</p>';
      return;
    }

    const slug   = getCurrentSlug();
    const others = WK_ARTICLES.filter(a => a.slug !== slug).slice(0, 3);

    if (!others.length) {
      el.innerHTML = '<p style="color:var(--grey-500);font-size:14px">Binnenkort meer artikelen.</p>';
      return;
    }

    el.innerHTML = others.map(a => `
      <a class="art-related-card" href="/articles/${a.slug}.html">
        <span class="arc-cat">${a.category}</span>
        <div class="arc-title">${a.title}</div>
        <span class="arc-date">${a.dateFormatted} · ${a.readTime}</span>
      </a>`).join('');
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
