/* ─── WebKreatives — Site navigation + language switcher ─────────────────────
 * Used by EVERY page: homepage and all sub-pages.
 * Owns the ONE language dropdown; switching translates the whole page
 * (nav, footer and any [data-nl]/[data-en] content) and fires
 * 'wk:languagechange' so other modules can follow.
 * Renders into <div id="globalNav"></div>.
 * ─────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  const root = document.getElementById('globalNav');
  if (!root || root.dataset.wkRendered) return;
  root.dataset.wkRendered = '1';

  /* On the homepage the section links are in-page anchors; elsewhere they
     point back at the homepage. Portfolio has both a section and a page. */
  const path = location.pathname.replace(/index\.html$/, '');
  const onHome = path === '/' || path === '';
  const H = (hash) => (onHome ? hash : '/' + hash);

  /* ── Styles ─────────────────────────────────────────────────────────── */
  if (!document.getElementById('wk-nav-style')) {
    const st = document.createElement('style');
    st.id = 'wk-nav-style';
    st.textContent = `
#mainNav{
  position:fixed;top:0;left:0;right:0;z-index:100;
  padding:20px 5vw;
  display:grid;grid-template-columns:1fr auto 1fr;align-items:center;
  transition:padding .35s var(--ease,cubic-bezier(.16,1,.3,1)),background .4s var(--ease,cubic-bezier(.16,1,.3,1)),border-color .35s;
  border-bottom:1px solid transparent;
  font-family:var(--f-body,'Figtree',sans-serif);
}
#mainNav::before{display:none!important}
#mainNav.scrolled{
  padding:10px 5vw;
  background:oklch(7% .010 25 / .92);
  backdrop-filter:blur(20px) saturate(1.4);
  -webkit-backdrop-filter:blur(20px) saturate(1.4);
  border-bottom-color:oklch(18% .010 25);
}
#mainNav a{text-decoration:none;color:inherit}
.nav-logo{display:block;line-height:0}
.nav-logo img{height:80px;width:auto;display:block}
#mainNav .nav-links{
  display:flex;gap:46px;list-style:none;justify-content:center;align-items:center;
  margin:0;padding:0;
}
#mainNav .nav-links a{
  font-family:var(--f-body,'Figtree',sans-serif);
  font-size:12.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:oklch(62% .005 25);position:relative;padding-bottom:4px;
  transition:color .2s var(--ease,cubic-bezier(.16,1,.3,1));
}
#mainNav .nav-links a::after{
  content:'';position:absolute;bottom:0;left:0;right:0;height:2px;border-radius:2px;
  transform:scaleX(0);transform-origin:left center;
  transition:transform .35s var(--ease,cubic-bezier(.16,1,.3,1));
}
#mainNav .nav-links li:nth-child(1) a::after{background:var(--red,#df3821)}
#mainNav .nav-links li:nth-child(2) a::after{background:var(--lime,#b9e185)}
#mainNav .nav-links li:nth-child(3) a::after{background:var(--yellow,#fbeb78)}
#mainNav .nav-links li:nth-child(4) a::after{background:var(--blue,#648dcb)}
#mainNav .nav-links li:nth-child(5) a::after{background:var(--red,#df3821)}
#mainNav .nav-links li:nth-child(6) a::after{background:var(--lime,#b9e185)}
#mainNav .nav-links a:hover,#mainNav .nav-links a.active{color:oklch(96% .005 25)}
#mainNav .nav-links a:hover::after,#mainNav .nav-links a.active::after{transform:scaleX(1)}
#mainNav .nav-controls{display:flex;align-items:center;gap:10px;justify-content:flex-end}

/* the single language dropdown */
.lang-drop{position:relative}
.lang-btn-nav{
  display:flex;align-items:center;gap:5px;height:34px;padding:0 6px;
  font-size:12px;font-weight:700;letter-spacing:.1em;
  color:oklch(60% .005 25);background:none;border:none;cursor:pointer;
  font-family:var(--f-body,'Figtree',sans-serif);transition:color .2s;
}
.lang-btn-nav:hover{color:oklch(88% .005 25)}
.lang-menu{
  position:absolute;top:calc(100% + 6px);right:0;
  background:oklch(12% .010 25);border:1px solid oklch(22% .010 25);
  border-radius:8px;padding:4px;min-width:74px;
  opacity:0;pointer-events:none;transform:translateY(-6px);
  transition:opacity .18s var(--ease,cubic-bezier(.16,1,.3,1)),transform .18s var(--ease,cubic-bezier(.16,1,.3,1));z-index:200;
}
.lang-drop.open .lang-menu{opacity:1;pointer-events:auto;transform:translateY(0)}
.lang-opt{
  display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:5px;
  font-size:12px;font-weight:700;letter-spacing:.1em;
  color:oklch(50% .005 25);width:100%;text-align:left;cursor:pointer;
  transition:background .15s,color .15s;white-space:nowrap;
  background:none;border:none;font-family:var(--f-body,'Figtree',sans-serif);
}
.lang-opt:hover,.lang-opt.active{background:oklch(22% .010 25);color:var(--white,oklch(99% .004 80))}
.nav-divider{width:1px;height:18px;background:oklch(24% .008 25);margin:0 2px}
.nav-cta{
  display:inline-flex;align-items:center;gap:8px;
  font-family:var(--f-body,'Figtree',sans-serif);
  font-size:13px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;
  color:var(--white,oklch(99% .004 80));background:var(--red,#df3821);
  padding:12px 24px;border-radius:9px;position:relative;overflow:hidden;
  transition:transform .3s var(--ease,cubic-bezier(.16,1,.3,1)),box-shadow .3s;
}
.nav-cta::before{
  content:'';position:absolute;inset:0;background:var(--red2,oklch(43% .200 25));
  transform:translateX(-100%);transition:transform .4s var(--ease,cubic-bezier(.16,1,.3,1));
}
#mainNav .nav-cta,#mainNav .nav-cta span{color:var(--white,oklch(99% .004 80))}
.nav-cta span{position:relative}
.nav-cta:hover{transform:translateY(-2px);box-shadow:0 8px 24px oklch(51% .220 25 / .38)}
.nav-cta:hover::before{transform:translateX(0)}
.mobile-toggle{
  display:none;flex-direction:column;justify-content:center;gap:5px;
  width:38px;height:38px;padding:8px;color:oklch(70% .005 25);
  background:none;border:none;cursor:pointer;
}
.mobile-toggle span{display:block;width:20px;height:2px;background:currentColor;border-radius:2px;transition:.25s var(--ease,cubic-bezier(.16,1,.3,1))}
.mobile-toggle.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
.mobile-toggle.open span:nth-child(2){opacity:0}
.mobile-toggle.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
.mobile-menu{
  display:none;position:fixed;top:70px;left:12px;right:12px;z-index:99;
  background:oklch(10% .010 25);border:1px solid oklch(20% .010 25);
  border-radius:14px;padding:12px;
  box-shadow:0 22px 70px rgba(0,0,0,.45);
  font-family:var(--f-body,'Figtree',sans-serif);
}
.mobile-menu.open{display:block}
.mobile-menu a{
  display:flex;align-items:center;justify-content:space-between;
  padding:14px 10px;text-decoration:none;
  border-bottom:1px solid oklch(16% .010 25);
  font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;
  color:oklch(72% .005 25);
}
.mobile-menu a:last-child{border-bottom:0}
.mobile-menu .mobile-menu-cta{
  margin-top:8px;justify-content:center;border-radius:9px;
  background:var(--red,#df3821);color:var(--white,oklch(99% .004 80));border-bottom:0;
}

/* ── Services dropdown ────────────────────────────────────────────── */
#mainNav .nav-links li{position:relative}
#mainNav .nav-links .has-sub > a{display:inline-flex;align-items:center;gap:6px}
.nav-caret{
  width:8px;height:8px;flex-shrink:0;opacity:.55;
  transition:transform .25s var(--ease,cubic-bezier(.16,1,.3,1)),opacity .2s;
}
#mainNav .nav-links .has-sub.open > a .nav-caret{transform:rotate(180deg);opacity:1}
.nav-sub{
  position:absolute;top:100%;left:50%;margin-top:14px;
  transform:translate(-50%,-6px);
  min-width:236px;padding:6px;list-style:none;
  background:oklch(12% .010 25);border:1px solid oklch(22% .010 25);
  border-radius:12px;box-shadow:0 22px 60px rgba(0,0,0,.5);
  opacity:0;pointer-events:none;z-index:210;
  transition:opacity .2s var(--ease,cubic-bezier(.16,1,.3,1)),
             transform .2s var(--ease,cubic-bezier(.16,1,.3,1));
}
/* an invisible bridge so the pointer can cross the gap without closing it */
.nav-sub::before{content:'';position:absolute;left:0;right:0;top:-14px;height:14px}
#mainNav .nav-links .has-sub.open .nav-sub{opacity:1;pointer-events:auto;transform:translate(-50%,0)}
.nav-sub li{width:100%}
#mainNav .nav-sub a{
  display:block;padding:11px 13px;border-radius:8px;
  font-family:var(--f-body,'Figtree',sans-serif);
  font-size:12.5px;font-weight:700;letter-spacing:.04em;text-transform:none;
  color:oklch(72% .005 25);
  transition:background .18s,color .18s;
}
#mainNav .nav-sub a::after{display:none}
#mainNav .nav-sub a:hover{background:oklch(20% .010 25);color:var(--white,oklch(99% .004 80))}
.nav-sub-d{
  display:block;margin-top:3px;font-size:11px;font-weight:400;
  letter-spacing:0;text-transform:none;color:oklch(50% .005 25);
}

/* mobile: the children sit under the parent, no flyout */
.mobile-menu .mobile-sub{
  display:block;padding:11px 10px 11px 26px;
  font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:none;
  color:oklch(60% .005 25);
}

@media(max-width:1000px){
  #mainNav{grid-template-columns:auto 1fr auto;padding:14px 18px}
  #mainNav.scrolled{padding:10px 18px}
  .nav-logo img{height:58px}
  #mainNav .nav-links,#mainNav .nav-cta,.nav-divider{display:none}
  .mobile-toggle{display:flex}
}
`;
    document.head.appendChild(st);
  }

  /* ── Markup ─────────────────────────────────────────────────────────── */
  const CARET = '<svg class="nav-caret" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M1 3l4 4 4-4"/></svg>';

  const ITEMS = [
    { href: '/portfolio/', nl: 'Portfolio', en: 'Portfolio' },
    {
      href: '/services/websites/', nl: 'Diensten', en: 'Services',
      sub: [
        { href: '/services/websites/', nl: 'Websites', en: 'Websites',
          dnl: 'Ontwerp, bouw en oplevering',
          den: 'Design, build and launch' },
        { href: '/services/hosting/', nl: 'Hosting', en: 'Hosting',
          dnl: 'Online houden, snel en bijgewerkt',
          den: 'Kept online, fast and up to date' }
      ]
    },
    { href: '/pricing/',  nl: 'Prijzen',   en: 'Pricing'  },
    { href: '/articles/', nl: 'Artikelen', en: 'Articles' }
  ];

  const listItems = ITEMS.map(i => {
    if (!i.sub) {
      return `<li><a href="${i.href}" data-nl="${i.nl}" data-en="${i.en}">${i.nl}</a></li>`;
    }
    const kids = i.sub.map(k =>
      `<li><a href="${k.href}" data-nl="${k.nl}<span class='nav-sub-d'>${k.dnl}</span>" data-en="${k.en}<span class='nav-sub-d'>${k.den}</span>">${k.nl}<span class="nav-sub-d">${k.dnl}</span></a></li>`
    ).join('\n          ');
    return `<li class="has-sub">
        <a href="${i.href}" aria-haspopup="true" aria-expanded="false"><span data-nl="${i.nl}" data-en="${i.en}">${i.nl}</span>${CARET}</a>
        <ul class="nav-sub">
          ${kids}
        </ul>
      </li>`;
  }).join('\n      ');

  const mobileItems = ITEMS.map(i => {
    const own = `<a href="${i.href}" data-nl="${i.nl}" data-en="${i.en}">${i.nl}</a>`;
    if (!i.sub) return own;
    return own + '\n  ' + i.sub.map(k =>
      `<a class="mobile-sub" href="${k.href}" data-nl="${k.nl}" data-en="${k.en}">${k.nl}</a>`
    ).join('\n  ');
  }).join('\n  ');

  root.innerHTML = `
<nav id="mainNav">
  <a class="nav-logo" href="/"><img src="/assets/darkmodehorizontallogo.png" alt="WebKreatives"></a>
  <ul class="nav-links">
      ${listItems}
  </ul>
  <div class="nav-controls">
    <div class="lang-drop" id="langDrop">
      <button class="lang-btn-nav" id="langBtn" aria-label="Language">
        <span id="lang-label-nav">NL</span>
        <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.6" style="opacity:.6"><path d="M1 3l4 4 4-4"/></svg>
      </button>
      <div class="lang-menu">
        <button class="lang-opt" data-lang="nl">NL</button>
        <button class="lang-opt" data-lang="en">EN</button>
      </div>
    </div>
    <div class="nav-divider"></div>
    <a href="${'/contact/'}" class="nav-cta"><span data-nl="Neem contact op" data-en="Get in touch">Neem contact op</span></a>
    <button class="mobile-toggle" id="mobileToggle" aria-label="Menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="mobile-menu" id="mobileMenu">
  ${mobileItems}
  <a class="mobile-menu-cta" href="${'/contact/'}" data-nl="Neem contact op" data-en="Get in touch">Neem contact op</a>
</div>`;

  /* ── The single language switcher ───────────────────────────────────── */
  const drop  = document.getElementById('langDrop');
  const label = document.getElementById('lang-label-nav');

  function applyLanguage(l) {
    const lang = l === 'en' ? 'en' : 'nl';
    localStorage.setItem('wk-lang', lang);
    document.documentElement.lang = lang;

    /* translate everything on the page that declares both languages */
    document.querySelectorAll('[data-nl],[data-en]').forEach(el => {
      const txt = el.getAttribute('data-' + lang);
      if (txt) el.innerHTML = txt;
    });

    if (label) label.textContent = lang.toUpperCase();
    document.querySelectorAll('.lang-opt').forEach(o =>
      o.classList.toggle('active', o.dataset.lang === lang)
    );
    if (drop) drop.classList.remove('open');

    document.dispatchEvent(new CustomEvent('wk:languagechange', { detail: { lang } }));
  }
  window.wkApplyLanguage = applyLanguage;

  /* Default is English (also what search engines see). Dutch visitors get
     Dutch automatically; a manual choice always wins and is remembered. */
  function initialLanguage() {
    const saved = localStorage.getItem('wk-lang');
    if (saved === 'nl' || saved === 'en') return saved;
    return (navigator.language || '').toLowerCase().startsWith('nl') ? 'nl' : 'en';
  }
  applyLanguage(initialLanguage());

  const btn = document.getElementById('langBtn');
  if (btn) {
    btn.addEventListener('click', e => { e.stopPropagation(); drop.classList.toggle('open'); });
    document.querySelectorAll('.lang-opt').forEach(o =>
      o.addEventListener('click', () => applyLanguage(o.dataset.lang))
    );
    document.addEventListener('click', () => drop.classList.remove('open'));
  }

  /* ── Scroll state + mobile menu ─────────────────────────────────────── */
  const navEl = document.getElementById('mainNav');
  const onScroll = () => navEl && navEl.classList.toggle('scrolled', window.scrollY > 60);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Services dropdown ──────────────────────────────────────────────
     Hover opens it on a fine pointer, with a short close delay so the
     pointer can cross the gap to the menu. Click and keyboard work
     everywhere, which hover alone does not.                              */
  document.querySelectorAll('#mainNav .has-sub').forEach(li => {
    const trigger = li.querySelector(':scope > a');
    let t;
    const open  = () => { clearTimeout(t); li.classList.add('open');    trigger.setAttribute('aria-expanded', 'true'); };
    const close = () => { clearTimeout(t); li.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); };
    const lazyClose = () => { clearTimeout(t); t = setTimeout(close, 220); };

    if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
      li.addEventListener('pointerenter', open);
      li.addEventListener('pointerleave', lazyClose);
      /* on desktop the parent link is a shortcut, not a toggle */
    } else {
      trigger.addEventListener('click', e => {
        if (!li.classList.contains('open')) { e.preventDefault(); open(); }
      });
    }
    li.addEventListener('focusin', open);
    li.addEventListener('focusout', e => {
      if (!li.contains(e.relatedTarget)) close();
    });
    li.addEventListener('keydown', e => { if (e.key === 'Escape') { close(); trigger.focus(); } });
  });

  const tog  = document.getElementById('mobileToggle');
  const menu = document.getElementById('mobileMenu');
  if (tog && menu) {
    tog.addEventListener('click', () => {
      const open = tog.classList.toggle('open');
      menu.classList.toggle('open', open);
      tog.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      tog.classList.remove('open'); menu.classList.remove('open');
    }));
  }
})();
