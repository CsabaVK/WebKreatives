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
#ck{position:fixed;bottom:24px;right:24px;width:320px;z-index:9990;
  background:var(--ink-2,#211f1a);border:1px solid var(--rule,rgba(239,230,210,.09));
  border-radius:var(--radius,3px);box-shadow:0 24px 56px rgba(0,0,0,.55);padding:22px;
  font-family:var(--f-body,'Figtree',sans-serif);
  animation:wk-ck-rise .5s cubic-bezier(.22,.9,.18,1)}
#ck[hidden]{display:none!important}
.ck-title{
  font-family:var(--f-mono,monospace);font-size:10px;font-weight:500;
  letter-spacing:.16em;text-transform:uppercase;color:var(--bronze,#d9a748);
  margin-bottom:10px;display:flex;align-items:center;gap:9px}
.ck-title::before{content:'';width:18px;height:1px;background:currentColor;opacity:.6;flex-shrink:0}
.ck-body{font-size:12.5px;font-weight:300;color:var(--cream-mute,#8a8272);line-height:1.65;margin-bottom:18px}
.ck-body a{color:var(--bronze,#d9a748);text-decoration:none;border-bottom:1px solid rgba(217,167,72,.35)}
.ck-body a:hover{border-bottom-color:var(--bronze,#d9a748)}
.ck-btns{display:flex;gap:8px}
.ck-btn{
  border:1px solid transparent;border-radius:var(--radius,3px);padding:11px 14px;
  font-family:var(--f-mono,monospace);font-size:10px;font-weight:600;
  letter-spacing:.13em;text-transform:uppercase;cursor:pointer;
  transition:background .25s cubic-bezier(.22,.9,.18,1),color .25s,border-color .25s;
  flex:1;text-align:center;line-height:1.3}
.ck-btn-p{background:var(--bronze,#d9a748);color:#1b1a15}
.ck-btn-p:hover{background:#e8bc66}
.ck-btn-s{background:transparent;color:var(--cream-dim,#b8ae99);border-color:var(--rule-hard,rgba(239,230,210,.16))}
.ck-btn-s:hover{border-color:var(--bronze,#d9a748);color:var(--bronze,#d9a748)}
.ck-panel{margin-top:16px;border-top:1px solid var(--rule,rgba(239,230,210,.09));padding-top:14px;display:none}
.ck-panel.open{display:block}
.ck-opt{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:11px 0}
.ck-opt+.ck-opt{border-top:1px solid var(--rule-soft,rgba(239,230,210,.05))}
.ck-opt-text strong{
  display:block;font-family:var(--f-mono,monospace);font-size:9.5px;font-weight:500;
  letter-spacing:.14em;text-transform:uppercase;color:var(--cream,#efe6d2)}
.ck-opt-text p{font-size:11.5px;font-weight:300;color:var(--cream-faint,#5d574c);margin-top:5px;line-height:1.55}
.ck-toggle{position:relative;width:38px;height:21px;flex-shrink:0;margin-top:2px}
.ck-toggle input{position:absolute;opacity:0;pointer-events:none}
.ck-toggle span{
  display:block;width:38px;height:21px;border-radius:999px;
  background:rgba(239,230,210,.12);border:1px solid var(--rule,rgba(239,230,210,.09));
  transition:background .25s,border-color .25s;cursor:pointer}
.ck-toggle span::after{
  content:'';position:absolute;top:4px;left:4px;width:14px;height:14px;border-radius:50%;
  background:var(--cream-mute,#8a8272);transition:left .25s cubic-bezier(.22,.9,.18,1),background .25s}
.ck-toggle input:checked+span{background:rgba(217,167,72,.22);border-color:rgba(217,167,72,.4)}
.ck-toggle input:checked+span::after{left:19px;background:var(--bronze,#d9a748)}
.ck-toggle.locked span{background:rgba(106,143,93,.2);border-color:rgba(106,143,93,.4);cursor:default}
.ck-toggle.locked span::after{background:var(--sage,#6a8f5d)}
.ck-panel-save{margin-top:14px}
.ck-panel-save .ck-btn{flex:unset;width:100%}
#ck-manage{
  position:fixed;bottom:20px;left:20px;z-index:9989;
  background:var(--ink-2,#211f1a);color:var(--cream-faint,#5d574c);
  border:1px solid var(--rule,rgba(239,230,210,.09));border-radius:var(--radius,3px);
  padding:8px 12px;font-family:var(--f-mono,monospace);font-size:9.5px;
  letter-spacing:.13em;text-transform:uppercase;cursor:pointer;
  transition:color .25s,border-color .25s}
#ck-manage:hover{color:var(--bronze,#d9a748);border-color:rgba(217,167,72,.4)}
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
