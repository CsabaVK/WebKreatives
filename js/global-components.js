(function () {
  'use strict';

  /* ── 1. Force dark theme ──────────────────────────────── */
  if (document.body) document.body.setAttribute('data-theme', 'dark');

  /* ── 2. Inject fonts + CSS ───────────────────────────── */
  if (!document.getElementById('wk-gc-fonts')) {
    const l = document.createElement('link');
    l.id = 'wk-gc-fonts';
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=Figtree:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap';
    document.head.appendChild(l);
  }

  const styleId = 'wk-gc-style';
  if (!document.getElementById(styleId)) {
    const s = document.createElement('style');
    s.id = styleId;
    s.textContent = `
/* ── WK GLOBAL DESIGN TOKENS ────────────────────────── */
:root{
  --wk-ink:   oklch(8%  .010 25);
  --wk-ink2:  oklch(18% .010 25);
  --wk-cream: oklch(97% .008 80);
  --wk-red:   #df3821;
  --wk-white: oklch(99% .004 80);
  --wk-lime:  #b9e185;
  --wk-f1:    'Unbounded',sans-serif;
  --wk-f2:    'Figtree',sans-serif;
  --wk-ease:  cubic-bezier(.16,1,.3,1);
}

/* ── NAV ─────────────────────────────────────────────── */
/* Kill style.css's nav::before white-glass overlay */
#pNav::before{display:none!important}
#pNav{
  position:fixed;top:0;left:0;right:0;z-index:100;
  height:auto;
  padding:10px 5vw;
  display:grid;grid-template-columns:1fr auto 1fr;align-items:center;
  background:transparent;
  backdrop-filter:none;
  border-bottom:1px solid transparent;
  font-family:var(--wk-f2);
  transition:background .4s cubic-bezier(.16,1,.3,1),
             border-color .35s cubic-bezier(.16,1,.3,1),
             backdrop-filter .4s,
             padding .35s cubic-bezier(.16,1,.3,1);
}
#pNav.scrolled{
  padding-top:6px;padding-bottom:6px;
  background:oklch(7% .010 25 / .96);
  backdrop-filter:blur(20px) saturate(1.4);
  border-bottom-color:oklch(20% .008 25);
}
.wk-logo{display:block;text-decoration:none;line-height:0}
.wk-logo img{height:80px;width:auto;display:block;}
#pNav .nav-links{
  display:flex;gap:32px;list-style:none;justify-content:center;
}
#pNav .nav-links a{
  font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
  color:oklch(66% .005 25);position:relative;padding-bottom:3px;
  transition:color .2s var(--wk-ease);text-decoration:none;
}
#pNav .nav-links a::after{
  content:'';position:absolute;bottom:0;left:0;right:0;
  height:1.5px;border-radius:1px;
  transform:scaleX(0);transform-origin:left center;
  transition:transform .35s var(--wk-ease);background:var(--wk-red);
}
#pNav .nav-links a:hover,#pNav .nav-links a.active{color:oklch(96% .005 25)}
#pNav .nav-links a:hover::after,#pNav .nav-links a.active::after{transform:scaleX(1)}
#pNav .nav-controls{display:flex;align-items:center;gap:6px;justify-content:flex-end}
.wk-divider{width:1px;height:18px;background:oklch(24% .008 25);margin:0 4px}

/* lang dropdown — use same IDs as script.js expects */
#langDropdown{position:relative}
#langBtn{
  display:flex;align-items:center;gap:5px;height:34px;padding:0 6px;
  font-size:11px;font-weight:700;letter-spacing:.1em;
  color:oklch(52% .005 25);background:none;border:none;cursor:pointer;
  font-family:var(--wk-f2);transition:color .2s;
}
#langBtn:hover{color:oklch(82% .005 25)}
#langBtn .lang-flag{
  width:15px;height:11px;display:block;border-radius:2px;overflow:hidden;flex-shrink:0;
}
#langBtn .lang-flag svg{width:100%;height:100%;display:block}
#langMenu{
  position:absolute;top:calc(100% + 6px);right:0;
  background:oklch(10% .010 25);border:1px solid oklch(22% .010 25);
  border-radius:8px;padding:4px;min-width:72px;
  opacity:0;pointer-events:none;transform:translateY(-6px);
  transition:opacity .18s var(--wk-ease),transform .18s var(--wk-ease);z-index:200;
}
#langDropdown.open #langMenu{opacity:1;pointer-events:auto;transform:translateY(0)}
.lang-option{
  display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:5px;
  font-size:11px;font-weight:700;letter-spacing:.1em;
  color:oklch(50% .005 25);width:100%;text-align:left;cursor:pointer;
  transition:background .15s,color .15s;white-space:nowrap;
  background:none;border:none;font-family:var(--wk-f2);
}
.lang-option:hover,.lang-option.active{background:oklch(18% .010 25);color:var(--wk-white)}
.wk-nav-cta{
  display:inline-flex;align-items:center;gap:8px;
  font-size:12px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;
  color:var(--wk-white);background:var(--wk-red);
  padding:10px 22px;border-radius:8px;position:relative;overflow:hidden;
  transition:transform .3s var(--wk-ease),box-shadow .3s;text-decoration:none;
}
.wk-nav-cta::before{
  content:'';position:absolute;inset:0;background:oklch(39% .200 25);
  transform:translateX(-100%);transition:transform .4s var(--wk-ease);
}
.wk-nav-cta:hover{transform:translateY(-1px);box-shadow:0 6px 20px oklch(39% .200 25 / .4)}
.wk-nav-cta:hover::before{transform:translateX(0)}
.wk-nav-cta>span{position:relative}
.nav-hamburger{
  display:none;flex-direction:column;justify-content:center;gap:5px;
  padding:8px;width:38px;height:38px;color:oklch(60% .005 25);
  background:none;border:none;cursor:pointer;
}
.nav-hamburger span{
  display:block;width:20px;height:1.5px;background:currentColor;
  border-radius:2px;transition:.25s var(--wk-ease);
}
.nav-hamburger.open span:nth-child(1){transform:translateY(6.5px) rotate(45deg)}
.nav-hamburger.open span:nth-child(2){opacity:0;transform:scaleX(0)}
.nav-hamburger.open span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg)}
#mobileMenu{
  display:none;position:fixed;top:72px;left:0;right:0;
  background:oklch(7% .010 25 / .98);backdrop-filter:blur(20px);
  border-bottom:1px solid oklch(20% .008 25);
  padding:20px 5vw 24px;z-index:99;font-family:var(--wk-f2);
}
#mobileMenu.open{display:block}
#mobileMenu ul{list-style:none;display:flex;flex-direction:column;gap:4px;margin-bottom:16px}
#mobileMenu a{
  display:block;padding:10px 0;font-size:13px;font-weight:600;
  letter-spacing:.06em;text-transform:uppercase;
  color:oklch(60% .005 25);border-bottom:1px solid oklch(14% .010 25);
  transition:color .2s;text-decoration:none;
}
#mobileMenu a:hover,#mobileMenu a.active{color:var(--wk-white)}
@media(max-width:900px){
  #pNav .nav-links,.wk-nav-cta{display:none}
  .nav-hamburger{display:flex}
}

/* ── FOOTER ──────────────────────────────────────────── */
.wk-footer{
  background:oklch(6% .010 25);border-top:1px solid oklch(13% .010 25);
  padding:56px 5vw 32px;font-family:var(--wk-f2);
}
.wk-fgrid{
  display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:44px;
  max-width:1200px;margin:0 auto 48px;
}
.wk-fbrand p{
  font-size:12.5px;color:oklch(34% .006 25);line-height:1.75;
  margin:12px 0 14px;max-width:240px;
}
.wk-fbrand a{
  font-size:12.5px;color:var(--wk-lime);font-weight:600;
  display:block;margin-bottom:6px;transition:color .2s;text-decoration:none;
}
.wk-fbrand a:hover{color:oklch(86% .15 130)}
.wk-fcol h4{
  font-size:9.5px;font-weight:700;letter-spacing:.12em;
  color:oklch(26% .008 25);text-transform:uppercase;margin-bottom:16px;
}
.wk-fcol a{
  font-size:12.5px;color:oklch(40% .006 25);display:block;
  margin-bottom:8px;transition:color .2s;text-decoration:none;
}
.wk-fcol a:hover{color:oklch(70% .006 25)}
.wk-fcol a.wk-g{color:var(--wk-lime);font-weight:600}
.wk-fbot{
  border-top:1px solid oklch(11% .010 25);padding-top:22px;
  display:flex;justify-content:space-between;align-items:center;
  gap:16px;max-width:1200px;margin:0 auto;flex-wrap:wrap;
}
.wk-fbot p{font-size:11px;color:oklch(26% .008 25)}
.wk-fbot-links{display:flex;gap:24px}
.wk-fbot-links a{
  font-size:11px;color:oklch(26% .008 25);transition:color .2s;text-decoration:none;
}
.wk-fbot-links a:hover{color:oklch(50% .008 25)}
@media(max-width:900px){.wk-fgrid{grid-template-columns:1fr 1fr}}
@media(max-width:480px){
  .wk-fgrid{grid-template-columns:1fr}
  .wk-fbot{flex-direction:column;align-items:flex-start;gap:12px}
}

@media(pointer:coarse), (max-width:900px){
  body,button{cursor:auto!important}
  a,button{cursor:pointer!important}
  #c-dot,#c-ring{display:none!important}
}

.cookie-banner{
  position:fixed;left:50%;bottom:16px;transform:translateX(-50%);
  width:min(calc(100vw - 24px),760px);z-index:1200;
  border-radius:18px;padding:18px;
  font-family:var(--wk-f2);animation:wk-cookie-rise .32s var(--wk-ease);
}
@keyframes wk-cookie-rise{from{opacity:0;transform:translate(-50%,12px)}to{opacity:1;transform:translate(-50%,0)}}
.cookie-banner[hidden]{display:none!important}
.cookie-banner-inner{display:flex;align-items:flex-end;justify-content:space-between;gap:16px}
.cookie-copy strong{display:block;font-size:14px;margin-bottom:5px}
.cookie-copy p{font-size:13px;line-height:1.6;max-width:520px}
.cookie-copy a{color:var(--wk-red);font-weight:600;text-decoration:none}
.cookie-actions{display:flex;gap:8px;align-items:center;justify-content:flex-end;flex-shrink:0}
.cookie-btn{
  border-radius:10px;padding:11px 14px;font-family:var(--wk-f2);
  font-size:13px;font-weight:700;border:0;cursor:pointer;
  transition:transform .15s var(--wk-ease),opacity .15s;
}
.cookie-btn:hover{transform:translateY(-1px);opacity:.9}
.cookie-btn-primary{background:var(--wk-red);color:var(--wk-white)}
.cookie-btn-secondary{border:1px solid oklch(28% .010 25)}
.cookie-panel{display:none;border-top:1px solid oklch(22% .010 25);margin-top:14px;padding-top:12px}
.cookie-banner-expanded .cookie-panel{display:block}
.cookie-banner-customizing .cookie-actions{display:none}
.cookie-option{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:12px 0}
.cookie-option+.cookie-option{border-top:1px solid oklch(18% .010 25)}
.cookie-option strong{display:block;font-size:13px;margin-bottom:4px}
.cookie-option p{font-size:12px;line-height:1.55;max-width:520px}
.cookie-option-locked{opacity:.65}
.cookie-option-locked strong::after{content:' · always on';font-size:11px;font-weight:500;color:oklch(48% .006 25)}
.cookie-switch{position:relative;display:inline-flex;flex-shrink:0;margin-top:2px}
.cookie-switch input{position:absolute;opacity:0;pointer-events:none}
.cookie-switch span{width:46px;height:28px;border-radius:999px;display:block;position:relative;transition:background .2s}
.cookie-switch span::after{
  content:'';position:absolute;top:4px;left:4px;width:20px;height:20px;
  border-radius:50%;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.18);
  transition:left .2s;
}
.cookie-switch input:checked+span::after{left:22px}
.cookie-panel-actions{display:flex;justify-content:flex-end;margin-top:12px}
.cookie-manage-btn{
  position:fixed;left:14px;bottom:14px;z-index:1100;
  border-radius:999px;padding:9px 12px;font-family:var(--wk-f2);
  font-size:11px;font-weight:700;cursor:pointer;
}
@media(max-width:640px){
  .cookie-banner{bottom:10px;padding:15px}
  .cookie-banner-inner{flex-direction:column;align-items:flex-start}
  .cookie-actions,.cookie-panel-actions{width:100%;justify-content:stretch}
  .cookie-btn{flex:1}
  .cookie-copy p{font-size:12.5px}
  .cookie-manage-btn{left:12px;right:12px;width:auto;text-align:center}
}

/* ── DARK COOKIE OVERRIDE ────────────────────────────── */
.cookie-banner{
  background:oklch(13% .010 25) !important;
  border-color:oklch(24% .010 25) !important;
  box-shadow:0 24px 70px oklch(0% 0 0 / .55) !important;
}
.cookie-banner .cookie-copy strong,.cookie-banner .cookie-option strong{
  color:oklch(94% .005 25) !important;
}
.cookie-banner .cookie-copy p,.cookie-banner .cookie-option p{
  color:oklch(60% .006 25) !important;
}
.cookie-banner .cookie-panel{border-top-color:oklch(22% .010 25) !important}
.cookie-btn-secondary{
  color:oklch(82% .006 25) !important;
  border-color:oklch(28% .010 25) !important;
  background:oklch(18% .010 25) !important;
}
.cookie-switch span{background:oklch(28% .010 25) !important}
.cookie-switch input:checked+span{background:var(--wk-red) !important}
.cookie-manage-btn{
  background:oklch(15% .010 25) !important;
  border-color:oklch(28% .012 25) !important;
  color:oklch(75% .006 25) !important;
  box-shadow:0 4px 16px oklch(0% 0 0 / .4) !important;
}
`;
    document.head.appendChild(s);
  }

  /* ── 3. State ─────────────────────────────────────────── */
  const lang = localStorage.getItem('wk-lang') || 'nl';
  const page = document.body?.dataset?.page || '';

  const NL_FLAG = `<svg viewBox="0 0 640 480"><path fill="#ae1c28" d="M0 0h640v160H0z"/><path fill="#fff" d="M0 160h640v160H0z"/><path fill="#21468b" d="M0 320h640v160H0z"/></svg>`;
  const EN_FLAG = `<svg viewBox="0 0 640 480"><path fill="#012169" d="M0 0h640v480H0z"/><path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"/><path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"/><path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z"/><path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z"/></svg>`;

  const curFlag = lang === 'nl' ? NL_FLAG : EN_FLAG;
  const portfolioActive = page === 'portfolio' ? ' class="active"' : '';
  const articlesActive  = (page === 'articles' || page === 'article') ? ' class="active"' : '';
  const nlActive = lang !== 'en' ? ' active' : '';
  const enActive = lang === 'en' ? ' active' : '';

  /* ── 4. Inject nav ───────────────────────────────────── */
  const navRoot = document.getElementById('globalNav');
  if (navRoot) {
    navRoot.innerHTML = `
<nav id="pNav">
  <div>
    <a href="/" class="wk-logo"><img src="/assets/darkmodehorizontallogo.png" alt="WebKreatives"></a>
  </div>
  <ul class="nav-links">
    <li><a href="/#services" data-i18n="nav.services">Diensten</a></li>
    <li><a href="/portfolio/"${portfolioActive}>Portfolio</a></li>
    <li><a href="/#pricing" data-i18n="nav.pricing">Prijzen</a></li>
    <li><a href="/#subscriptions" data-i18n="nav.support">Support</a></li>
    <li><a href="/articles/"${articlesActive} data-i18n="nav.articles">Artikelen</a></li>
    <li><a href="/#contact" data-i18n="nav.reviews">Reviews</a></li>
  </ul>
  <div class="nav-controls">
    <div id="langDropdown">
      <button id="langBtn" aria-label="Language">
        <span class="lang-flag">${curFlag}</span>
        <span class="lang-name">${lang.toUpperCase()}</span>
        <span style="opacity:.5;font-size:9px">&#9662;</span>
      </button>
      <div id="langMenu">
        <button class="lang-option${nlActive}" data-lang="nl">
          <span class="lang-flag">${NL_FLAG}</span> NL
        </button>
        <button class="lang-option${enActive}" data-lang="en">
          <span class="lang-flag">${EN_FLAG}</span> EN
        </button>
      </div>
    </div>
    <div class="wk-divider"></div>
    <a href="/#contact" class="wk-nav-cta"><span data-i18n="nav.cta">Offerte Aanvragen</span></a>
    <button class="nav-hamburger" id="navHamburger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div id="mobileMenu">
  <ul>
    <li><a href="/#services" data-i18n="nav.services">Diensten</a></li>
    <li><a href="/portfolio/"${portfolioActive}>Portfolio</a></li>
    <li><a href="/#pricing" data-i18n="nav.pricing">Prijzen</a></li>
    <li><a href="/#subscriptions" data-i18n="nav.support">Support</a></li>
    <li><a href="/articles/"${articlesActive} data-i18n="nav.articles">Artikelen</a></li>
    <li><a href="/#contact" data-i18n="nav.reviews">Reviews</a></li>
  </ul>
  <a href="/#contact" class="wk-nav-cta" style="width:100%;justify-content:center">
    <span data-i18n="nav.cta">Offerte Aanvragen</span>
  </a>
</div>`;

    /* Mobile menu toggle */
    const ham = document.getElementById('navHamburger');
    const mob = document.getElementById('mobileMenu');
    if (ham && mob) {
      ham.addEventListener('click', () => {
        ham.classList.toggle('open');
        mob.classList.toggle('open');
      });
      /* Close on link click */
      mob.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          ham.classList.remove('open');
          mob.classList.remove('open');
        });
      });
    }

    /* Transparent → dark on scroll (matches main page nav behavior) */
    const pNav = document.getElementById('pNav');
    if (pNav) {
      const updateNav = () => pNav.classList.toggle('scrolled', window.scrollY > 50);
      updateNav();
      window.addEventListener('scroll', updateNav, { passive: true });
    }
  }

  /* ── 5. Inject footer ────────────────────────────────── */
  const footerRoot = document.getElementById('globalFooter');
  if (footerRoot) {
    footerRoot.innerHTML = `
<footer class="wk-footer">
  <div class="wk-fgrid">
    <div class="wk-fbrand">
      <img src="/assets/darkmodehorizontallogo.png" alt="WebKreatives"
           style="height:100px;width:auto;max-width:100%;display:block;margin-bottom:8px">
      <p data-i18n="footer.p">Mooie, converterende websites voor kleine bedrijven. Snel, betaalbaar, op maat gemaakt. Gevestigd in Amsterdam.</p>
      <a href="mailto:info@webkreatives.com">info@webkreatives.com</a>
    </div>
    <div class="wk-fcol">
      <h4 data-i18n="footer.services">Diensten</h4>
      <a href="/#services" data-i18n="footer.design">Website Design</a>
      <a href="/#services" data-i18n="footer.ecom">Webshops</a>
      <a href="/#services" data-i18n="footer.seo">SEO &amp; Prestaties</a>
      <a href="/#services" data-i18n="footer.brand">Branding &amp; Identiteit</a>
      <a href="/#services" data-i18n="footer.support">Doorlopende Support</a>
    </div>
    <div class="wk-fcol">
      <h4 data-i18n="footer.pages">Pagina's</h4>
      <a href="/" data-i18n="footer.home">Home</a>
      <a href="/portfolio/" data-i18n="footer.work">Portfolio</a>
      <a href="/articles/" data-i18n="footer.articles">Artikelen</a>
      <a href="/privacy/" data-i18n="footer.privacy">Privacy Policy</a>
      <a href="/terms/" data-i18n="footer.terms">Voorwaarden</a>
    </div>
    <div class="wk-fcol">
      <h4 data-i18n="footer.connect">Verbinden</h4>
      <a href="/#contact" class="wk-g" data-i18n="footer.start">Start een Project</a>
      <a href="https://www.instagram.com/webkreatives/" target="_blank" rel="noopener" data-i18n="footer.instagram">Instagram</a>
      <a href="https://www.linkedin.com/company/webkreatives/" target="_blank" rel="noopener" data-i18n="footer.linkedin">LinkedIn</a>
      <a href="https://webkreatives.medium.com/" target="_blank" rel="noopener" data-i18n="footer.medium">Medium</a>
    </div>
  </div>
  <div class="wk-fbot">
    <p data-i18n="footer.meta">&copy; 2026 WebKreatives &middot; Amsterdam, Netherlands &middot; KVK: 94051097</p>
    <div class="wk-fbot-links">
      <a href="/privacy/" data-i18n="footer.privacy">Privacy Policy</a>
      <a href="/terms/" data-i18n="footer.terms">Terms</a>
    </div>
  </div>
</footer>`;
  }
})();
