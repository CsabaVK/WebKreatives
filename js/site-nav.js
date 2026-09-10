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
  display:none;flex-direction:column;justify-content:center;align-items:center;gap:5px;
  width:42px;height:42px;padding:8px;color:oklch(74% .005 25);
  background:none;border:1px solid transparent;border-radius:10px;cursor:pointer;
  transition:border-color .25s var(--ease,cubic-bezier(.16,1,.3,1)),background .25s,color .25s;
}
.mobile-toggle span{
  display:block;width:19px;height:1.5px;background:currentColor;border-radius:2px;
  transition:transform .4s var(--ease,cubic-bezier(.16,1,.3,1)),opacity .2s;
}
.mobile-toggle.open{color:var(--white,oklch(99% .004 80));border-color:oklch(26% .010 25);background:oklch(14% .010 25)}
.mobile-toggle.open span:nth-child(1){transform:translateY(6.5px) rotate(45deg)}
.mobile-toggle.open span:nth-child(2){opacity:0;transform:scaleX(.4)}
.mobile-toggle.open span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg)}

/* the sheet dims the page rather than floating over a live-looking one */
.mobile-scrim{
  position:fixed;inset:0;z-index:98;
  background:oklch(4% .010 25 / .62);
  -webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);
  opacity:0;pointer-events:none;transition:opacity .38s var(--ease,cubic-bezier(.16,1,.3,1));
}
.mobile-scrim.open{opacity:1;pointer-events:auto}

.mobile-menu{
  position:fixed;top:64px;left:10px;right:10px;z-index:99;
  max-height:calc(100svh - 84px);overflow-y:auto;overscroll-behavior:contain;
  background:oklch(9% .010 25);border:1px solid oklch(19% .010 25);
  border-radius:16px;padding:8px;
  box-shadow:0 30px 80px rgba(0,0,0,.55);
  font-family:var(--f-body,'Figtree',sans-serif);
  opacity:0;visibility:hidden;
  transform:translateY(-10px) scale(.985);transform-origin:top center;
  transition:opacity .3s var(--ease,cubic-bezier(.16,1,.3,1)),
             transform .42s var(--ease,cubic-bezier(.16,1,.3,1)),
             visibility 0s .42s;
}
.mobile-menu.open{opacity:1;visibility:visible;transform:none;transition-delay:0s,0s,0s}

/* rows arrive one after another, so the panel reads as a list being dealt */
.mobile-menu .mm-row,.mobile-menu .mm-cta{
  opacity:0;transform:translateY(7px);
  transition:opacity .34s var(--ease,cubic-bezier(.16,1,.3,1)),
             transform .34s var(--ease,cubic-bezier(.16,1,.3,1)),
             color .2s,background .2s;
}
.mobile-menu.open .mm-row,.mobile-menu.open .mm-cta{
  opacity:1;transform:none;
  transition-delay:calc(70ms + var(--i,0) * 42ms);
}

.mobile-menu .mm-row{
  display:flex;align-items:center;gap:12px;
  width:100%;padding:15px 14px;text-decoration:none;
  background:none;border:0;border-radius:10px;cursor:pointer;
  font-family:inherit;font-size:13.5px;font-weight:700;
  letter-spacing:.09em;text-transform:uppercase;text-align:left;
  color:oklch(74% .005 25);
}
.mobile-menu .mm-row:active{background:oklch(14% .010 25)}
.mobile-menu .mm-row .mm-label{flex:1}

/* the same four accents the desktop underlines use, as a leading tick */
.mobile-menu .mm-row::before{
  content:'';width:3px;height:15px;border-radius:3px;flex-shrink:0;
  background:var(--acc,var(--red,#df3821));
  transform:scaleY(.32);opacity:.5;transform-origin:center;
  transition:transform .3s var(--ease,cubic-bezier(.16,1,.3,1)),opacity .3s;
}
.mobile-menu .mm-row.is-here{color:var(--white,oklch(99% .004 80))}
.mobile-menu .mm-row.is-here::before,
.mobile-menu .mm-group.open > .mm-row::before{transform:none;opacity:1}

.mobile-menu .mm-caret{
  width:11px;height:11px;flex-shrink:0;opacity:.5;
  transition:transform .38s var(--ease,cubic-bezier(.16,1,.3,1)),opacity .2s;
}
.mobile-menu .mm-group.open .mm-caret{transform:rotate(180deg);opacity:1}

/* the accordion: height is measured and written by the toggle handler, so it
   animates properly instead of snapping */
.mobile-menu .mm-sub{
  overflow:hidden;max-height:0;
  transition:max-height .4s var(--ease,cubic-bezier(.16,1,.3,1)),opacity .3s;
  opacity:0;
}
.mobile-menu .mm-group.open .mm-sub{opacity:1}
.mobile-menu .mm-sub a{
  display:block;padding:12px 14px 12px 29px;margin:2px 0;
  border-radius:9px;text-decoration:none;
  font-size:13px;font-weight:600;letter-spacing:.02em;text-transform:none;
  color:oklch(70% .005 25);
}
.mobile-menu .mm-sub a:active{background:oklch(14% .010 25)}
.mobile-menu .mm-sub a.is-here{color:var(--white,oklch(99% .004 80))}
.mobile-menu .mm-sub .mm-d{
  display:block;margin-top:3px;
  font-size:11.5px;font-weight:400;letter-spacing:0;
  color:oklch(50% .005 25);
}

.mobile-menu .mm-sep{height:1px;margin:6px 12px;background:oklch(17% .010 25)}

.mobile-menu .mm-cta{
  display:flex;align-items:center;justify-content:center;gap:9px;
  margin:6px 2px 2px;padding:15px;border-radius:11px;
  background:var(--red,#df3821);color:var(--white,oklch(99% .004 80));
  text-decoration:none;font-size:13px;font-weight:700;
  letter-spacing:.06em;text-transform:uppercase;
}
.mobile-menu .mm-cta .wk-arrow{transition:transform .3s var(--ease,cubic-bezier(.16,1,.3,1))}
.mobile-menu .mm-cta:active .wk-arrow{transform:translateX(3px)}

/* the page must not scroll behind an open sheet */
html.wk-menu-open,html.wk-menu-open body{overflow:hidden}

@media(prefers-reduced-motion:reduce){
  .mobile-menu,.mobile-menu .mm-row,.mobile-menu .mm-cta,
  .mobile-menu .mm-sub,.mobile-scrim,.mobile-toggle span,.mobile-menu .mm-caret{
    transition-duration:.01ms!important;transition-delay:0s!important;
  }
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

  /* the four accents the desktop underlines use, in the same order */
  const ACCENT = ['var(--red,#df3821)', 'var(--lime,#b9e185)', 'var(--yellow,#fbeb78)', 'var(--blue,#648dcb)'];
  const MCARET = '<svg class="mm-caret" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M1 3l4 4 4-4"/></svg>';

  const mobileItems = ITEMS.map((i, n) => {
    const acc = `style="--acc:${ACCENT[n % ACCENT.length]};--i:${n}"`;
    const label = `<span class="mm-label" data-nl="${i.nl}" data-en="${i.en}">${i.nl}</span>`;
    if (!i.sub) {
      return `<a class="mm-row" ${acc} href="${i.href}">${label}</a>`;
    }
    const kids = i.sub.map(k =>
      `<a href="${k.href}"
          data-nl="${k.nl}<span class='mm-d'>${k.dnl}</span>"
          data-en="${k.en}<span class='mm-d'>${k.den}</span>">${k.nl}<span class="mm-d">${k.dnl}</span></a>`
    ).join('\n        ');
    /* a button, not a link: on a phone the parent's job is to open the group */
    return `<div class="mm-group">
      <button class="mm-row mm-toggle" ${acc} type="button" aria-expanded="false" aria-controls="mmSub${n}">
        ${label}${MCARET}
      </button>
      <div class="mm-sub" id="mmSub${n}">
        ${kids}
      </div>
    </div>`;
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
<div class="mobile-scrim" id="mobileScrim" hidden></div>
<div class="mobile-menu" id="mobileMenu" role="dialog" aria-modal="true" aria-label="Menu">
  ${mobileItems}
  <div class="mm-sep"></div>
  <a class="mm-cta" style="--i:4" href="${'/contact/'}">
    <span data-nl="Neem contact op" data-en="Get in touch">Neem contact op</span>
    <span class="wk-arrow">&rarr;</span>
  </a>
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

  /* ── Mobile sheet ───────────────────────────────────────────────────── */
  const tog   = document.getElementById('mobileToggle');
  const menu  = document.getElementById('mobileMenu');
  const scrim = document.getElementById('mobileScrim');

  if (tog && menu) {
    /* mark the page you are on, so the sheet says where you are */
    const here = location.pathname.replace(/index\.html$/, '');
    menu.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (href && href !== '/' && here.indexOf(href) === 0) {
        a.classList.add('is-here');
        const grp = a.closest('.mm-group');
        if (grp) grp.querySelector('.mm-toggle').classList.add('is-here');
      } else if (href === '/' && here === '/') {
        a.classList.add('is-here');
      }
    });

    const closeGroups = () => menu.querySelectorAll('.mm-group.open').forEach(g => {
      g.classList.remove('open');
      g.querySelector('.mm-sub').style.maxHeight = '0px';
      g.querySelector('.mm-toggle').setAttribute('aria-expanded', 'false');
    });

    const setOpen = (open) => {
      tog.classList.toggle('open', open);
      menu.classList.toggle('open', open);
      scrim.classList.toggle('open', open);
      scrim.hidden = !open;
      tog.setAttribute('aria-expanded', String(open));
      document.documentElement.classList.toggle('wk-menu-open', open);
      /* next time it opens, it opens clean */
      if (!open) setTimeout(closeGroups, 320);
    };

    tog.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
    scrim.addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('open')) { setOpen(false); tog.focus(); }
    });
    menu.querySelectorAll('a[href]').forEach(a =>
      a.addEventListener('click', () => setOpen(false))
    );

    /* the accordion — measured height, so it eases instead of snapping */
    menu.querySelectorAll('.mm-toggle').forEach(btn => {
      const group = btn.closest('.mm-group');
      const sub   = group.querySelector('.mm-sub');
      btn.addEventListener('click', () => {
        const open = !group.classList.contains('open');
        group.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', String(open));
        sub.style.maxHeight = open ? sub.scrollHeight + 'px' : '0px';
      });
      /* a language switch changes the copy, so the measured height is stale */
      document.addEventListener('wk:languagechange', () => {
        if (group.classList.contains('open')) sub.style.maxHeight = sub.scrollHeight + 'px';
      });
    });

    /* going back to a wide window should not leave the sheet hanging */
    matchMedia('(min-width:1001px)').addEventListener('change', e => {
      if (e.matches && menu.classList.contains('open')) setOpen(false);
    });
  }
})();
