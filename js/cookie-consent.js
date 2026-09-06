/* ─── WebKreatives — Cookie consent (single shared implementation) ───────────
 * Used by EVERY page: homepage and all sub-pages.
 * Edit the copy or behaviour HERE and it changes site-wide.
 * Bilingual (NL/EN), self-contained CSS, no dependency on page stylesheets.
 * ─────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  if (window.__wkCookieConsentLoaded) return;   // guard against double-include
  window.__wkCookieConsentLoaded = true;

  /* ── Config ─────────────────────────────────────────────────────────── */
  const KEY   = 'wk-cookie-consent';
  const PKEY  = 'wk-cookie-preferences';
  const GA_ID = 'G-CG9705BC61';

  const COPY = {
    nl: {
      title:        'Cookies op WebKreatives',
      text:         'We gebruiken essentiële cookies voor taal- en themavoorkeuren. Analytics helpt ons de site te verbeteren.',
      accept:       'Alles accepteren',
      customize:    'Aanpassen',
      save:         'Voorkeuren opslaan',
      privacy:      'Privacybeleid',
      essential:    'Essentieel',
      essentialTxt: 'Taal-, thema- en sessievoorkeuren. Altijd actief.',
      analytics:    'Analytics',
      analyticsTxt: 'Helpt ons begrijpen welke pagina’s het beste werken zodat we de site blijven verbeteren.',
      manage:       '🍪 Cookie-instellingen'
    },
    en: {
      title:        'Cookies on WebKreatives',
      text:         'We use essential cookies for language and theme preferences. Analytics helps us improve the site.',
      accept:       'Accept all',
      customize:    'Customize',
      save:         'Save preferences',
      privacy:      'Privacy Policy',
      essential:    'Essential',
      essentialTxt: 'Language, theme, and session preferences. Always on.',
      analytics:    'Analytics',
      analyticsTxt: 'Helps us understand which pages work best so we can keep improving.',
      manage:       '🍪 Cookie settings'
    }
  };

  const getLang = () => (localStorage.getItem('wk-lang') === 'en' ? 'en' : 'nl');

  /* ── Storage ────────────────────────────────────────────────────────── */
  const getState = () => localStorage.getItem(KEY);
  function getPrefs() {
    try { return JSON.parse(localStorage.getItem(PKEY) || '{"essential":true,"analytics":true}'); }
    catch { return { essential: true, analytics: true }; }
  }

  let gaLoaded = false;
  function loadGA() {
    if (gaLoaded || !GA_ID) return;
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { dataLayer.push(arguments); };
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  }

  function save(prefs, state) {
    localStorage.setItem(KEY, state);
    localStorage.setItem(PKEY, JSON.stringify(Object.assign({ essential: true }, prefs)));
    if (prefs.analytics && state !== 'declined') loadGA();
  }

  /* ── Styles (fallbacks so it renders identically on every page) ─────── */
  if (!document.getElementById('wk-ck-style')) {
    const st = document.createElement('style');
    st.id = 'wk-ck-style';
    st.textContent = `
@keyframes wk-ck-rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
#ck{position:fixed;bottom:24px;right:24px;width:300px;z-index:9990;
  background:var(--ink2,oklch(18% .010 25));border:1px solid oklch(26% .010 25);
  border-radius:16px;box-shadow:0 24px 56px rgba(0,0,0,.5);padding:20px;
  font-family:var(--f2,'Figtree',sans-serif);animation:wk-ck-rise .4s cubic-bezier(.16,1,.3,1)}
#ck[hidden]{display:none!important}
.ck-title{font-family:var(--f1,'Unbounded',sans-serif);font-size:12px;font-weight:700;letter-spacing:-.01em;color:var(--white,oklch(99% .004 80));margin-bottom:7px}
.ck-body{font-size:11.5px;color:oklch(50% .005 80);line-height:1.6;margin-bottom:16px}
.ck-body a{color:var(--red,#df3821);text-decoration:underline;text-underline-offset:2px}
.ck-btns{display:flex;gap:8px}
.ck-btn{border:none;border-radius:8px;padding:9px 13px;font-family:var(--f2,'Figtree',sans-serif);font-size:12px;font-weight:600;cursor:pointer;transition:opacity .15s,transform .15s;flex:1;text-align:center}
.ck-btn:hover{opacity:.82;transform:translateY(-1px)}
.ck-btn-p{background:var(--red,#df3821);color:#fff}
.ck-btn-s{background:oklch(20% .010 25);color:oklch(58% .005 80);border:1px solid oklch(28% .010 25)}
.ck-panel{margin-top:14px;border-top:1px solid oklch(24% .010 25);padding-top:12px;display:none}
.ck-panel.open{display:block}
.ck-opt{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;padding:8px 0}
.ck-opt+.ck-opt{border-top:1px solid oklch(20% .010 25)}
.ck-opt-text strong{font-size:11.5px;font-weight:600;color:oklch(78% .005 80)}
.ck-opt-text p{font-size:11px;color:oklch(40% .005 80);margin-top:2px;line-height:1.5}
.ck-toggle{position:relative;width:40px;height:24px;flex-shrink:0;margin-top:2px}
.ck-toggle input{position:absolute;opacity:0;pointer-events:none}
.ck-toggle span{display:block;width:40px;height:24px;border-radius:999px;background:oklch(28% .010 25);transition:background .2s;cursor:pointer}
.ck-toggle span::after{content:'';position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.35);transition:left .2s}
.ck-toggle input:checked+span{background:var(--red,#df3821)}
.ck-toggle input:checked+span::after{left:19px}
.ck-toggle.locked span{background:var(--grn,oklch(68% .150 130));cursor:default}
.ck-panel-save{margin-top:12px}
.ck-panel-save .ck-btn{flex:unset;width:100%}
#ck-manage{position:fixed;bottom:20px;left:20px;z-index:9989;background:oklch(16% .010 25);color:oklch(46% .005 80);border:1px solid oklch(24% .010 25);border-radius:8px;padding:7px 11px;font-family:var(--f2,'Figtree',sans-serif);font-size:11px;cursor:pointer;transition:color .2s,border-color .2s}
#ck-manage:hover{color:oklch(72% .005 80);border-color:oklch(36% .010 25)}
#ck-manage[hidden]{display:none!important}
@media(max-width:600px){
  #ck{left:12px;right:12px;bottom:12px;width:auto;max-width:none;padding:16px}
  .ck-btns{flex-direction:column}
  #ck-manage{left:12px;right:auto;bottom:12px;width:auto;text-align:left;padding:10px 12px}
}`;
    document.head.appendChild(st);
  }

  /* ── Render ─────────────────────────────────────────────────────────── */
  function render() {
    const c = COPY[getLang()];
    const prefs = getPrefs();
    let el = document.getElementById('ck');
    if (!el) {
      el = document.createElement('div');
      el.id = 'ck';
      document.body.appendChild(el);
    }
    el.innerHTML = `
      <p class="ck-title">${c.title}</p>
      <p class="ck-body">${c.text} <a href="/privacy/">${c.privacy}</a>.</p>
      <div class="ck-btns">
        <button class="ck-btn ck-btn-s" id="ck-cust">${c.customize}</button>
        <button class="ck-btn ck-btn-p" id="ck-acc">${c.accept}</button>
      </div>
      <div class="ck-panel" id="ck-panel">
        <div class="ck-opt">
          <div class="ck-opt-text"><strong>${c.essential}</strong><p>${c.essentialTxt}</p></div>
          <label class="ck-toggle locked"><input type="checkbox" checked disabled><span></span></label>
        </div>
        <div class="ck-opt">
          <div class="ck-opt-text"><strong>${c.analytics}</strong><p>${c.analyticsTxt}</p></div>
          <label class="ck-toggle"><input type="checkbox" id="ck-ana"${prefs.analytics ? ' checked' : ''}><span></span></label>
        </div>
        <div class="ck-panel-save">
          <button class="ck-btn ck-btn-p" id="ck-save">${c.save}</button>
        </div>
      </div>`;

    el.hidden = ['accepted', 'declined', 'customized'].includes(getState());

    el.querySelector('#ck-acc').onclick = () => {
      save({ analytics: true }, 'accepted'); el.hidden = true; showManage();
    };
    el.querySelector('#ck-cust').onclick = () => {
      el.querySelector('#ck-panel').classList.toggle('open');
    };
    el.querySelector('#ck-save').onclick = () => {
      const ana = !!el.querySelector('#ck-ana')?.checked;
      save({ analytics: ana }, ana ? 'accepted' : 'customized');
      el.hidden = true; showManage();
    };
  }

  function showManage() {
    let btn = document.getElementById('ck-manage');
    if (!btn) {
      btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'ck-manage';
      document.body.appendChild(btn);
      btn.onclick = () => {
        localStorage.removeItem(KEY);
        localStorage.removeItem(PKEY);
        render();
        btn.hidden = true;
      };
    }
    btn.textContent = COPY[getLang()].manage;
    btn.hidden = !getState();
  }

  /* ── Init + react to language changes ───────────────────────────────── */
  function init() {
    const p = getPrefs();
    if (p.analytics && ['accepted', 'customized'].includes(getState())) loadGA();
    render();
    showManage();
  }

  // Re-render when the visitor switches language (both switcher styles).
  document.addEventListener('wk:languagechange', () => { render(); showManage(); });
  window.wkCookieRefresh = () => { render(); showManage(); };

  if (document.body) init();
  else document.addEventListener('DOMContentLoaded', init);
})();
