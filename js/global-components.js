(function () {
  const page = document.body?.dataset?.page || 'home';
  const isHome = page === 'home';

  const logoLight = `<img class="wk-logo-img wk-logo-img--nav" src="/assets/Horizontallogo.png" alt="WebKreatives">`;

  const logoDark  = `<img class="wk-logo-img wk-logo-img--footer" src="/assets/darkmodehorizontallogo.png" alt="WebKreatives">`;

  const navRoot = document.getElementById('globalNav');
  if (navRoot) {
    navRoot.innerHTML = `
      <nav>
        <a class="logo" href="/">
          ${logoLight}
          <span class="logo-tagline" data-i18n="nav.tagline">Webdesign voor kleine bedrijven</span>
        </a>
        <div class="nav-links">
          <a href="/#services" data-i18n="nav.services">Diensten</a>
          <a href="/our-websites/" data-i18n="nav.work">Onze Websites</a>
          <a href="/#pricing" data-i18n="nav.pricing">Prijzen</a>
          <a href="/#testimonials" data-i18n="nav.reviews">Reviews</a>
          <a href="/articles/" data-i18n="nav.articles">Articles</a>
          <a href="/#contact" class="btn-nav btn-nav-mobile" data-i18n="nav.cta">Offerte Aanvragen</a>
        </div>
        <div class="nav-controls">
          <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
            <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </button>
          <div class="lang-dropdown" id="langDropdown">
            <button class="lang-btn" id="langBtn">
              <span class="lang-flag"><svg viewBox="0 0 640 480"><path fill="#ae1c28" d="M0 0h640v160H0z"/><path fill="#fff" d="M0 160h640v160H0z"/><path fill="#21468b" d="M0 320h640v160H0z"/></svg></span>
              <span class="lang-name">NL</span>
              <span class="lang-arrow">▾</span>
            </button>
            <div class="lang-menu" id="langMenu">
              <button class="lang-option active" data-lang="nl"><span class="lang-flag"><svg viewBox="0 0 640 480"><path fill="#ae1c28" d="M0 0h640v160H0z"/><path fill="#fff" d="M0 160h640v160H0z"/><path fill="#21468b" d="M0 320h640v160H0z"/></svg></span> Nederlands</button>
              <button class="lang-option" data-lang="en"><span class="lang-flag"><svg viewBox="0 0 640 480"><path fill="#012169" d="M0 0h640v480H0z"/><path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"/><path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"/><path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z"/><path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z"/></svg></span> English</button>
            </div>
          </div>
          <a href="/#contact" class="btn-nav btn-nav-desktop" data-i18n="nav.cta">Offerte Aanvragen</a>
        </div>
        <button class="hamburger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </nav>`;
  }

  const footerRoot = document.getElementById('globalFooter');
  if (footerRoot) {
    footerRoot.innerHTML = `
      <footer>
        <div class="fgrid">
          <div class="fbrand">
            ${logoDark}
            <p data-i18n="footer.p">Mooie, converterende websites voor kleine bedrijven. Snel, betaalbaar, op maat gemaakt. Gevestigd in Amsterdam.</p>
            <a href="mailto:info@webkreatives.com">info@webkreatives.com</a>
          </div>
          <div class="fcol">
            <h4 data-i18n="footer.services">Diensten</h4>
            <a href="/#services" data-i18n="footer.design">Website Design</a>
            <a href="/#services" data-i18n="footer.ecom">Webshops</a>
            <a href="/#services" data-i18n="footer.seo">SEO &amp; Prestaties</a>
            <a href="/#services" data-i18n="footer.brand">Branding &amp; Identiteit</a>
            <a href="/#services" data-i18n="footer.support">Doorlopende Support</a>
          </div>
          <div class="fcol">
            <h4 data-i18n="footer.pages">Pagina's</h4>
            <a href="/" data-i18n="footer.home">Home</a>
            <a href="/our-websites/" data-i18n="footer.work">Onze Websites</a>
            <a href="/articles/" data-i18n="footer.articles">Artikelen</a>
            <a href="/privacy/" data-i18n="footer.privacy">Privacy Policy</a>
            <a href="/terms/" data-i18n="footer.terms">Voorwaarden</a>
          </div>
          <div class="fcol">
            <h4 data-i18n="footer.connect">Verbinden</h4>
            <a href="/#contact" class="g" data-i18n="footer.start">Start een Project</a>
            <a href="https://www.instagram.com/webkreatives/" target="_blank" rel="noopener" class="fsocial-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              <span data-i18n="footer.instagram">Instagram</span>
            </a>
            <a href="https://www.linkedin.com/company/webkreatives/" target="_blank" rel="noopener" class="fsocial-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v1.5A5 5 0 0 1 16 8z"/><rect x="2" y="9" width="4" height="12" rx=".5"/><circle cx="4" cy="4" r="2"/></svg>
              <span data-i18n="footer.linkedin">LinkedIn</span>
            </a>
            <a href="https://webkreatives.medium.com/" target="_blank" rel="noopener" class="fsocial-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.37 7.28a.44.44 0 0 0-.13-.4L3.2 5.63V5.4h3.2l2.47 5.42 2.17-5.42H14v.23l-.89.85a.27.27 0 0 0-.1.26v10.52a.27.27 0 0 0 .1.26l.87.85v.23h-4.39v-.23l.9-.87c.09-.09.09-.11.09-.26V8.72l-2.5 6.35h-.34L4.83 8.72v7.18c-.03.2.04.4.18.54l1.17 1.42v.23H2.86v-.23l1.17-1.42c.13-.14.19-.34.16-.54V7.28h.18zM17.74 18.6c-.48 0-.86-.38-.86-.85s.38-.86.86-.86.86.38.86.86-.39.85-.86.85zm3.4 0c-.48 0-.86-.38-.86-.85s.38-.86.86-.86.86.38.86.86-.38.85-.86.85z"/></svg>
              <span data-i18n="footer.medium">Medium</span>
            </a>
          </div>
        </div>
        <div class="fpay">
          <span class="fpay-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Secure payments
          </span>
          <div class="fpay-icons">
            <!-- Visa -->
            <span class="fpay-badge"><svg width="46" height="30" viewBox="0 0 46 30"><rect width="46" height="30" rx="4" fill="#1a1f71"/><text x="23" y="22" font-family="Arial,sans-serif" font-size="14" font-weight="900" font-style="italic" fill="#fff" text-anchor="middle" letter-spacing="1">VISA</text></svg></span>
            <!-- Mastercard -->
            <span class="fpay-badge"><svg width="46" height="30" viewBox="0 0 46 30"><rect width="46" height="30" rx="4" fill="#1a1a1a"/><circle cx="18" cy="15" r="9" fill="#eb001b"/><circle cx="28" cy="15" r="9" fill="#f79e1b"/><path d="M23 7.7a9 9 0 0 1 0 14.6A9 9 0 0 1 23 7.7z" fill="#ff5f00"/></svg></span>
            <!-- iDEAL -->
            <span class="fpay-badge"><svg width="46" height="30" viewBox="0 0 46 30"><rect width="46" height="30" rx="4" fill="#fff" stroke="#e0e0e0" stroke-width="1"/><text x="23" y="20" font-family="Arial,sans-serif" font-size="12" font-weight="700" fill="#cc0066" text-anchor="middle">i</text><text x="29" y="20" font-family="Arial,sans-serif" font-size="12" font-weight="700" fill="#000" text-anchor="middle">DEAL</text></svg></span>
            <!-- Apple Pay -->
            <span class="fpay-badge"><svg width="46" height="30" viewBox="0 0 46 30"><rect width="46" height="30" rx="4" fill="#000"/><text x="23" y="21" font-family="-apple-system,Arial,sans-serif" font-size="11" fill="#fff" text-anchor="middle" letter-spacing=".3"> Pay</text><text x="14" y="21" font-family="-apple-system,Arial,sans-serif" font-size="13" fill="#fff" text-anchor="middle"></text></svg></span>
            <!-- Google Pay -->
            <span class="fpay-badge"><svg width="46" height="30" viewBox="0 0 46 30"><rect width="46" height="30" rx="4" fill="#fff" stroke="#e0e0e0" stroke-width="1"/><text x="10" y="21" font-family="Arial,sans-serif" font-size="11" font-weight="700" fill="#4285f4">G</text><text x="18" y="21" font-family="Arial,sans-serif" font-size="11" fill="#34a853">o</text><text x="25" y="21" font-family="Arial,sans-serif" font-size="11" fill="#fbbc04">o</text><text x="32" y="21" font-family="Arial,sans-serif" font-size="11" fill="#ea4335">g</text></svg></span>
            <!-- Klarna -->
            <span class="fpay-badge"><svg width="46" height="30" viewBox="0 0 46 30"><rect width="46" height="30" rx="4" fill="#ffb3c7"/><text x="23" y="21" font-family="Arial,sans-serif" font-size="12" font-weight="700" fill="#17120e" text-anchor="middle">Klarna</text></svg></span>
            <!-- PayPal -->
            <span class="fpay-badge"><svg width="46" height="30" viewBox="0 0 46 30"><rect width="46" height="30" rx="4" fill="#fff" stroke="#e0e0e0" stroke-width="1"/><text x="23" y="21" font-family="Arial,sans-serif" font-size="12" font-weight="700" fill="#003087" text-anchor="middle">Pay<tspan fill="#009cde">Pal</tspan></text></svg></span>
            <!-- Stripe -->
            <span class="fpay-badge"><svg width="46" height="30" viewBox="0 0 46 30"><rect width="46" height="30" rx="4" fill="#635bff"/><text x="23" y="21" font-family="Arial,sans-serif" font-size="12" font-weight="600" fill="#fff" text-anchor="middle">stripe</text></svg></span>
            <!-- Amazon Pay -->
            <span class="fpay-badge"><svg width="46" height="30" viewBox="0 0 46 30"><rect width="46" height="30" rx="4" fill="#fff" stroke="#e0e0e0" stroke-width="1"/><text x="23" y="17" font-family="Arial,sans-serif" font-size="9" font-weight="700" fill="#232f3e" text-anchor="middle">amazon</text><text x="23" y="27" font-family="Arial,sans-serif" font-size="8" fill="#ff9900" text-anchor="middle">pay ›</text></svg></span>
          </div>
        </div>
        <div class="fbot">
          <p data-i18n="footer.meta">© 2026 WebKreatives · Amsterdam, Netherlands · KVK: 94051097</p>
          <p class="footer-legal-links">
            <a href="/privacy/" data-i18n="footer.privacy">Privacy Policy</a>
            <span aria-hidden="true">·</span>
            <a href="/terms/" data-i18n="footer.terms">Terms</a>
          </p>
        </div>
      </footer>`;
  }
})();

