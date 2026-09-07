/* ─── WebKreatives — Site footer (single shared implementation) ──────────────
 * Used by EVERY page: homepage and all sub-pages.
 * Edit the footer HERE and it changes site-wide.
 * Renders into <div id="globalFooter"></div>.
 * Bilingual via data-nl / data-en (both language switchers apply these).
 * ─────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  const root = document.getElementById('globalFooter');
  if (!root || root.dataset.wkRendered) return;
  root.dataset.wkRendered = '1';

  /* ── Styles (token fallbacks so it renders on every page) ───────────── */
  if (!document.getElementById('wk-footer-style')) {
    const st = document.createElement('style');
    st.id = 'wk-footer-style';
    st.textContent = `
.wk-site-footer{background:var(--ink,oklch(8% .010 25));padding:72px 5vw 40px;font-family:var(--f2,'Figtree',sans-serif)}
.wk-site-footer a{text-decoration:none;color:inherit}
.wk-site-footer .fgrid{
  display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;
  gap:48px;padding-bottom:56px;
  border-bottom:1px solid var(--lined,oklch(22% .010 25));margin-bottom:36px;
}
.wk-site-footer .fbrand-logo img{height:80px;width:auto;margin-bottom:18px}
.wk-site-footer .fbrand p{font-size:13px;color:oklch(42% .005 25);line-height:1.7;font-weight:300;max-width:240px;margin-bottom:14px}
.wk-site-footer .fbrand a{font-size:13px;color:oklch(52% .005 25);transition:color .2s}
.wk-site-footer .fbrand a:hover{color:oklch(72% .005 25)}
.wk-site-footer .fcol h4{font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:oklch(38% .005 25);margin-bottom:18px}
.wk-site-footer .fcol a{
  display:flex;align-items:center;gap:8px;
  font-size:13px;color:oklch(50% .005 25);
  font-weight:300;margin-bottom:10px;transition:color .2s;
}
.wk-site-footer .fcol a:hover{color:oklch(75% .005 25)}
.wk-site-footer .fcol a.g{color:var(--red,#df3821)}
.wk-site-footer .fcol a.g:hover{color:oklch(65% .220 25)}
.wk-site-footer .fpay{
  padding-bottom:32px;border-bottom:1px solid var(--lined,oklch(22% .010 25));margin-bottom:28px;
  display:flex;align-items:center;gap:16px;flex-wrap:wrap;
}
.wk-site-footer .fpay-label{font-size:11px;color:oklch(38% .005 25);display:flex;align-items:center;gap:6px;flex-shrink:0}
.wk-site-footer .fpay-icons{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.wk-site-footer .fpay-badge{opacity:.96;transition:opacity .2s,transform .2s,box-shadow .2s,border-color .2s;flex-shrink:0;border-radius:10px;background:linear-gradient(180deg,#fff 0%,#f8fafc 100%);border:1px solid rgba(15,23,42,.08);padding:6px;width:52px;height:34px;object-fit:contain;box-sizing:border-box;box-shadow:0 6px 16px rgba(15,23,42,.05)}
.wk-site-footer .fpay-badge:hover{opacity:1;transform:translateY(-1px);box-shadow:0 10px 22px rgba(15,23,42,.08)}
.wk-site-footer .fpay-badge[alt="Visa"]{border-color:rgba(26,31,113,.22);box-shadow:inset 0 2px 0 #1a1f71,0 6px 16px rgba(15,23,42,.05)}
.wk-site-footer .fpay-badge[alt="Mastercard"]{border-color:rgba(255,95,0,.2);box-shadow:inset 0 2px 0 #ff5f00,0 6px 16px rgba(15,23,42,.05)}
.wk-site-footer .fpay-badge[alt="iDEAL"]{border-color:rgba(204,0,102,.22);box-shadow:inset 0 2px 0 #cc0066,0 6px 16px rgba(15,23,42,.05)}
.wk-site-footer .fpay-badge[alt="Apple Pay"]{border-color:rgba(17,17,17,.18);box-shadow:inset 0 2px 0 #111,0 6px 16px rgba(15,23,42,.05)}
.wk-site-footer .fpay-badge[alt="Google Pay"]{border-color:rgba(66,133,244,.2);box-shadow:inset 0 2px 0 #4285f4,0 6px 16px rgba(15,23,42,.05)}
.wk-site-footer .fpay-badge[alt="Klarna"]{border-color:rgba(255,179,199,.55);box-shadow:inset 0 2px 0 #ffb3c7,0 6px 16px rgba(15,23,42,.05)}
.wk-site-footer .fpay-badge[alt="PayPal"]{border-color:rgba(0,48,135,.18);box-shadow:inset 0 2px 0 #003087,0 6px 16px rgba(15,23,42,.05)}
.wk-site-footer .fpay-badge[alt="Stripe"]{border-color:rgba(99,91,255,.22);box-shadow:inset 0 2px 0 #635bff,0 6px 16px rgba(15,23,42,.05)}
.wk-site-footer .fpay-badge[alt="Amazon Pay"]{border-color:rgba(255,153,0,.24);box-shadow:inset 0 2px 0 #ff9900,0 6px 16px rgba(15,23,42,.05)}
.wk-site-footer .fpay-badge[alt="Visa"],.wk-site-footer .fpay-badge[alt="Mastercard"],.wk-site-footer .fpay-badge[alt="Apple Pay"],.wk-site-footer .fpay-badge[alt="Google Pay"],.wk-site-footer .fpay-badge[alt="Amazon Pay"]{padding:4px}
.wk-site-footer .fbot{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
.wk-site-footer .fbot p,.wk-site-footer .fbot a{font-size:12px;color:oklch(32% .005 25);font-weight:300}
.wk-site-footer .fbot a:hover{color:oklch(52% .005 25)}
.wk-site-footer .fbot-links{display:flex;gap:20px}
@media(max-width:900px){.wk-site-footer .fgrid{grid-template-columns:1fr 1fr}}
@media(max-width:560px){
  .wk-site-footer .fgrid{grid-template-columns:1fr;gap:32px}
  .wk-site-footer .fbot{flex-direction:column;align-items:flex-start}
}`;
    document.head.appendChild(st);
  }

  const PAY = [
    ['visa', 'Visa'], ['mastercard', 'Mastercard'], ['ideal', 'iDEAL'],
    ['applepay', 'Apple Pay'], ['googlepay', 'Google Pay'], ['klarna', 'Klarna'],
    ['paypal', 'PayPal'], ['stripe', 'Stripe'], ['amazonpay', 'Amazon Pay']
  ].map(([f, a]) => `<img class="fpay-badge" src="/assets/payment/${f}.svg" alt="${a}" loading="lazy" width="52" height="34">`).join('\n        ');

  root.innerHTML = `
<footer class="wk-site-footer">
  <div class="fgrid">
    <div class="fbrand">
      <div class="fbrand-logo"><img src="/assets/darkmodehorizontallogo.png" alt="WebKreatives"></div>
      <p data-nl="Webdesign op maat voor bedrijven die willen opvallen. Vanaf nul gebouwd, snel opgeleverd, gemaakt om te converteren. Gevestigd in Amsterdam." data-en="Custom web design for businesses that want to stand out. Built from scratch, delivered fast, designed to convert. Based in Amsterdam.">Webdesign op maat voor bedrijven die willen opvallen. Vanaf nul gebouwd, snel opgeleverd, gemaakt om te converteren. Gevestigd in Amsterdam.</p>
      <a href="mailto:info@webkreatives.com">info@webkreatives.com</a>
    </div>
    <div class="fcol">
      <h4 data-nl="Diensten" data-en="Services">Diensten</h4>
      <a href="/#services" data-nl="Website Design" data-en="Website Design">Website Design</a>
      <a href="/#services" data-nl="Webshops" data-en="Webshops">Webshops</a>
      <a href="/#services" data-nl="SEO &amp; Prestaties" data-en="SEO &amp; Performance">SEO &amp; Prestaties</a>
      <a href="/#services" data-nl="Branding &amp; Identiteit" data-en="Branding &amp; Identity">Branding &amp; Identiteit</a>
      <a href="/#subscriptions" data-nl="Support" data-en="Support">Support</a>
    </div>
    <div class="fcol">
      <h4 data-nl="Pagina's" data-en="Pages">Pagina's</h4>
      <a href="/" data-nl="Home" data-en="Home">Home</a>
      <a href="/portfolio/" data-nl="Portfolio" data-en="Portfolio">Portfolio</a>
      <a href="/case-studies/" data-nl="Case studies" data-en="Case studies">Case studies</a>
      <a href="/articles/" data-nl="Artikelen" data-en="Articles">Artikelen</a>
      <a href="/privacy/" data-nl="Privacybeleid" data-en="Privacy Policy">Privacybeleid</a>
      <a href="/terms/" data-nl="Voorwaarden" data-en="Terms">Voorwaarden</a>
    </div>
    <div class="fcol">
      <h4 data-nl="Verbinden" data-en="Connect">Verbinden</h4>
      <a href="/#contact" class="g" data-nl="Start een Project" data-en="Start a Project">Start een Project</a>
      <a href="https://www.instagram.com/webkreatives/" target="_blank" rel="noopener">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
        Instagram
      </a>
      <a href="https://www.linkedin.com/company/webkreatives/" target="_blank" rel="noopener">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v1.5A5 5 0 0 1 16 8z"/><rect x="2" y="9" width="4" height="12" rx=".5"/><circle cx="4" cy="4" r="2"/></svg>
        LinkedIn
      </a>
      <a href="https://webkreatives.medium.com/" target="_blank" rel="noopener">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
        Medium
      </a>
    </div>
  </div>
  <div class="fpay">
    <span class="fpay-label">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      <span data-nl="Veilig betalen" data-en="Secure payment">Veilig betalen</span>
    </span>
    <div class="fpay-icons">
        ${PAY}
    </div>
  </div>
  <div class="fbot">
    <p>© 2026 WebKreatives · Amsterdam, Netherlands · KVK: 94051097</p>
    <nav class="fbot-links">
      <a href="/privacy/" data-nl="Privacybeleid" data-en="Privacy Policy">Privacybeleid</a>
      <a href="/terms/" data-nl="Voorwaarden" data-en="Terms">Voorwaarden</a>
    </nav>
  </div>
</footer>`;

  /* Apply the current language to the freshly injected markup. */
  function applyFooterLang(l) {
    const lang = l === 'en' ? 'en' : 'nl';
    root.querySelectorAll('[data-nl],[data-en]').forEach(el => {
      const txt = el.getAttribute('data-' + lang);
      if (txt) el.innerHTML = txt;
    });
  }
  applyFooterLang(localStorage.getItem('wk-lang') || 'nl');
  document.addEventListener('wk:languagechange', e =>
    applyFooterLang(e?.detail?.lang || localStorage.getItem('wk-lang') || 'nl')
  );
})();
