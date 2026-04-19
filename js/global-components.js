(function () {
  const page = document.body?.dataset?.page || 'home';
  const isHome = page === 'home';

  const logoLight = `
    <svg width="158" height="40" viewBox="0 0 158 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="2" width="7" height="36" fill="#0d0d0d"/>
      <circle cx="13" cy="12" r="5" fill="#E8392A"/>
      <circle cx="26" cy="5" r="3.5" fill="#5B8AC5"/>
      <rect x="0" y="33" width="11" height="5" fill="#D4E157"/>
      <rect x="147" y="33" width="11" height="5" fill="#8BC34A"/>
      <text x="16" y="18" font-family="'Fraunces',Georgia,serif" font-size="16" font-weight="900" fill="#0d0d0d">Web</text>
      <text x="16" y="32" font-family="'Fraunces',Georgia,serif" font-size="16" font-weight="900" fill="#0d0d0d">Kreatives</text>
    </svg>`;

  const logoDark = `
    <svg width="158" height="40" viewBox="0 0 158 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="2" width="7" height="36" fill="white"/>
      <circle cx="13" cy="12" r="5" fill="#E8392A"/>
      <circle cx="26" cy="5" r="3.5" fill="#5B8AC5"/>
      <rect x="0" y="33" width="11" height="5" fill="#D4E157"/>
      <rect x="147" y="33" width="11" height="5" fill="#8BC34A"/>
      <text x="16" y="18" font-family="'Fraunces',Georgia,serif" font-size="16" font-weight="900" fill="white" class="footer-logo-text">Web</text>
      <text x="16" y="32" font-family="'Fraunces',Georgia,serif" font-size="16" font-weight="900" fill="white" class="footer-logo-text">Kreatives</text>
    </svg>`;

  const navRoot = document.getElementById('globalNav');
  if (navRoot) {
    navRoot.innerHTML = `
      <nav>
        <a class="logo" href="/">
          ${logoLight}
        </a>
        <div class="nav-links">
          <a href="/#services" data-i18n="nav.services">Diensten</a>
          <a href="/template-library.html" data-i18n="nav.work">Portfolio</a>
          <a href="/#pricing" data-i18n="nav.pricing">Prijzen</a>
          <a href="/#testimonials" data-i18n="nav.reviews">Reviews</a>
          <a href="/articles/" data-i18n="nav.articles">Blog</a>
          <a href="/#contact" class="btn-nav" data-i18n="nav.cta">Offerte Aanvragen</a>
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
            <h4 data-i18n="footer.company">Bedrijf</h4>
            <a href="/template-library.html" data-i18n="footer.work">Ons Werk</a>
            <a href="/articles/" data-i18n="footer.articles">Blog &amp; Tips</a>
            <a href="/#why-us" data-i18n="footer.why">Waarom Wij</a>
            <a href="/#testimonials" data-i18n="footer.reviews">Reviews</a>
            <a href="/#pricing" data-i18n="footer.pricing">Prijzen</a>
            <a href="/#contact" data-i18n="footer.contact">Contact</a>
          </div>
          <div class="fcol">
            <h4 data-i18n="footer.connect">Verbinden</h4>
            <a href="/#contact" class="g" data-i18n="footer.start">Start een Project</a>
            <a href="https://www.instagram.com/webkreatives/" target="_blank" rel="noopener" class="fsocial-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              Instagram
            </a>
            <a href="https://www.linkedin.com/company/webkreatives/" target="_blank" rel="noopener" class="fsocial-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v1.5A5 5 0 0 1 16 8z"/><rect x="2" y="9" width="4" height="12" rx=".5"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </a>
          </div>
        </div>
        <div class="fbot">
          <p>© 2026 WebKreatives · Amsterdam, Netherlands · KVK: 94051097</p>
          <p>Privacy Policy · Terms</p>
        </div>
      </footer>`;
  }
})();
