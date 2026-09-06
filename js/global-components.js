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
  #pNav{
    padding:12px 18px 12px 28px;
    grid-template-columns:auto 1fr auto;
  }
  #pNav.scrolled{padding-top:8px;padding-bottom:8px}
  .wk-logo img{height:58px}
  #pNav .nav-controls{gap:8px}
  #pNav .nav-links,#pNav>.nav-controls>.wk-nav-cta,.wk-divider{display:none}
  .nav-hamburger{display:flex}
  #mobileMenu{top:72px}
  #mobileMenu .wk-nav-cta{display:flex}
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

`;
    document.head.appendChild(s);
  }

  /* ── 3. State ─────────────────────────────────────────── */
  const page = document.body?.dataset?.page || '';

  const portfolioActive = page === 'portfolio' ? ' class="active"' : '';
  const articlesActive  = (page === 'articles' || page === 'article') ? ' class="active"' : '';

  /* ── 4. Inject nav ───────────────────────────────────── */
  const navRoot = document.getElementById('globalNav');
  if (navRoot) {
    navRoot.innerHTML = `
<nav id="pNav">
  <div>
    <a href="/" class="wk-logo"><img src="/assets/darkmodehorizontallogo.png" alt="WebKreatives"></a>
  </div>
  <ul class="nav-links">
    <li><a href="/#services">Services</a></li>
    <li><a href="/portfolio/"${portfolioActive}>Portfolio</a></li>
    <li><a href="/#pricing">Pricing</a></li>
    <li><a href="/#subscriptions">Support</a></li>
    <li><a href="/articles/"${articlesActive}>Articles</a></li>
    <li><a href="/#contact">Reviews</a></li>
  </ul>
  <div class="nav-controls">
    <a href="/#contact" class="wk-nav-cta"><span>Get a Quote</span></a>
    <button class="nav-hamburger" id="navHamburger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div id="mobileMenu">
  <ul>
    <li><a href="/#services">Services</a></li>
    <li><a href="/portfolio/"${portfolioActive}>Portfolio</a></li>
    <li><a href="/#pricing">Pricing</a></li>
    <li><a href="/#subscriptions">Support</a></li>
    <li><a href="/articles/"${articlesActive}>Articles</a></li>
    <li><a href="/#contact">Reviews</a></li>
  </ul>
  <a href="/#contact" class="wk-nav-cta" style="width:100%;justify-content:center">
    <span>Get a Quote</span>
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
      <p>Beautiful, high-converting websites for growing businesses. Fast, affordable, custom-built. Based in Amsterdam, working worldwide.</p>
      <a href="mailto:info@webkreatives.com">info@webkreatives.com</a>
    </div>
    <div class="wk-fcol">
      <h4>Services</h4>
      <a href="/#services">Website Design</a>
      <a href="/#services">Online Stores</a>
      <a href="/#services">SEO &amp; Performance</a>
      <a href="/#services">Branding &amp; Identity</a>
      <a href="/#services">Ongoing Support</a>
    </div>
    <div class="wk-fcol">
      <h4>Pages</h4>
      <a href="/">Home</a>
      <a href="/portfolio/">Portfolio</a>
      <a href="/articles/">Articles</a>
      <a href="/privacy/">Privacy Policy</a>
      <a href="/terms/">Terms</a>
    </div>
    <div class="wk-fcol">
      <h4>Connect</h4>
      <a href="/#contact" class="wk-g">Start a Project</a>
      <a href="https://www.instagram.com/webkreatives/" target="_blank" rel="noopener">Instagram</a>
      <a href="https://www.linkedin.com/company/webkreatives/" target="_blank" rel="noopener">LinkedIn</a>
      <a href="https://webkreatives.medium.com/" target="_blank" rel="noopener">Medium</a>
    </div>
  </div>
  <div class="wk-fbot">
    <p>&copy; 2026 WebKreatives &middot; Amsterdam, Netherlands &middot; KVK: 94051097</p>
    <div class="wk-fbot-links">
      <a href="/privacy/">Privacy Policy</a>
      <a href="/terms/">Terms</a>
    </div>
  </div>
</footer>`;
  }
})();
