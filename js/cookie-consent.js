/* ─── WebKreatives — Cookie consent (single shared implementation) ───────────
 * Used by EVERY page: homepage and all sub-pages.
 * Edit the copy or behaviour HERE and it changes site-wide.
 * Bilingual (NL/EN), self-contained CSS, no dependency on page stylesheets.
 *
 * Four categories. Required is always on; the other three are opt-in.
 *   required        language, currency, region, theme, the consent choice
 *   personalization what the visitor filled in, kept for the next visit
 *                   (wk-billing, wk-scope-saved); browser only
 *   marketing       ad tags (Google Ads, Meta, LinkedIn); nothing loads
 *                   until an ID is filled in below
 *   analytics       Google Analytics 4, IP anonymised
 *
 * The banner waits six seconds on a first visit, then never returns once a
 * choice is made. The "Cookies" link in the footer (or window.wkCookieOpen)
 * reopens it with the current choices shown.
 * ─────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  if (window.__wkCookieConsentLoaded) return;   // guard against double-include
  window.__wkCookieConsentLoaded = true;

  /* ── Config ─────────────────────────────────────────────────────────── */
  const KEY     = 'wk-consent';          // v2: four categories in one JSON
  const OLD     = ['wk-cookie-consent', 'wk-cookie-preferences'];
  const DELAY   = 6000;                  // first-visit banner delay, ms
  const GA_ID   = 'G-CG9705BC61';
  const ADS     = { googleAds: '', metaPixel: '', linkedin: '' };   // fill in to activate marketing tags
  const CATS    = ['personalization', 'marketing', 'analytics'];

  const COPY = {
    nl: {
      title:     'Jij bepaalt wat we bewaren',
      text:      'Lees welke cookies we gebruiken en kies welke je toestaat. Noodzakelijke staan altijd aan.',
      accept:    'Alles accepteren',
      reject:    'Weigeren',
      customize: 'Aanpassen',
      save:      'Voorkeuren opslaan',
      privacy:   'Privacybeleid',
      required:  'Noodzakelijk',
      requiredTxt: 'Nodig om de site te laten werken: taal, valuta, thema en je cookiekeuze. Altijd actief.',
      personalization: 'Personalisatie',
      personalizationTxt: 'Onthoudt wat je invulde, zoals de calculator en je gekozen plan, zodat je volgende bezoek daar verdergaat. Blijft in je browser.',
      marketing: 'Marketing',
      marketingTxt: 'Gebruikt door ons en advertentiepartners (Google, Meta, LinkedIn) om te meten of een advertentie werkte en je op andere sites relevante advertenties te tonen.',
      analytics: 'Analytics',
      analyticsTxt: 'Helpt ons begrijpen hoe je de site gebruikt: welke pagina’s, hoe lang, vanaf welk apparaat. Daarmee verbeteren we de site.'
    },
    en: {
      title:     'You control your data',
      text:      'Learn which cookies we use and choose which to allow. Required ones are always on.',
      accept:    'Accept all',
      reject:    'Decline',
      customize: 'Customize',
      save:      'Save preferences',
      privacy:   'Privacy Policy',
      required:  'Required',
      requiredTxt: 'Needed for the site to work: language, currency, theme and your cookie choice. Always on.',
      personalization: 'Personalization',
      personalizationTxt: 'Remembers what you filled in, such as the calculator and your chosen plan, so your next visit picks up there. Stays in your browser.',
      marketing: 'Marketing',
      marketingTxt: 'Used by us and advertising partners (Google, Meta, LinkedIn) to measure whether an ad worked and to show you relevant ads on other sites.',
      analytics: 'Analytics',
      analyticsTxt: 'Helps us understand how you use the site: which pages, how long, on which device. We use that to improve it.'
    }
  };

  const getLang = () => (localStorage.getItem('wk-lang') === 'en' ? 'en' : 'nl');

  /* ── Storage ────────────────────────────────────────────────────────── */
  function read() {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || 'null');
      return v && v.v === 2 ? v : null;
    } catch (e) { return null; }
  }
  const NONE = { required: true, personalization: false, marketing: false, analytics: false };
  const prefs = () => Object.assign({}, NONE, read() || {});
  const allows = cat => cat === 'required' || !!prefs()[cat];

  function write(p) {
    const v = Object.assign({ v: 2, at: new Date().toISOString(), required: true }, p);
    try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {}
    apply(v);
    document.dispatchEvent(new CustomEvent('wk:consentchange', { detail: v }));
  }

  /* ── Tags: each loads once, only after its category is allowed ──────── */
  function gtagBoot() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { dataLayer.push(arguments); };
  }
  let consentDefaulted = false;
  function consentMode(p) {
    gtagBoot();
    const g = k => (p[k] ? 'granted' : 'denied');
    const state = {
      analytics_storage: g('analytics'),
      ad_storage: g('marketing'), ad_user_data: g('marketing'), ad_personalization: g('marketing'),
      functionality_storage: 'granted', security_storage: 'granted',
      personalization_storage: g('personalization')
    };
    if (!consentDefaulted) { window.gtag('consent', 'default', state); consentDefaulted = true; }
    else window.gtag('consent', 'update', state);
  }
  let gaLoaded = false;
  function loadGA() {
    if (gaLoaded || !GA_ID) return;
    gaLoaded = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  }
  let adsLoaded = false;
  function loadMarketing() {
    if (adsLoaded) return;
    adsLoaded = true;
    if (ADS.googleAds) {
      if (!gaLoaded) {
        const s = document.createElement('script'); s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ADS.googleAds; document.head.appendChild(s);
        window.gtag('js', new Date());
      }
      window.gtag('config', ADS.googleAds);
    }
    if (ADS.metaPixel) {
      const s = document.createElement('script'); s.async = true;
      s.src = 'https://connect.facebook.net/en_US/fbevents.js'; document.head.appendChild(s);
      window.fbq = window.fbq || function () { (window.fbq.q = window.fbq.q || []).push(arguments); };
      window.fbq('init', ADS.metaPixel); window.fbq('track', 'PageView');
    }
    if (ADS.linkedin) {
      window._linkedin_partner_id = ADS.linkedin;
      window._linkedin_data_partner_ids = (window._linkedin_data_partner_ids || []).concat(ADS.linkedin);
      const s = document.createElement('script'); s.async = true;
      s.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js'; document.head.appendChild(s);
    }
  }
  function apply(p) {
    consentMode(p);
    if (p.analytics) loadGA();
    if (p.marketing) loadMarketing();
  }

  /* ── Public: other modules ask before they remember, and log events ── */
  window.wkConsent = { get: prefs, allows: allows, open: () => open(true) };
  window.wkCookieOpen = () => open(true);
  window.wkTrack = (name, params) => {
    if (gaLoaded && window.gtag) window.gtag('event', name, params || {});
  };

  /* ── Styles ─────────────────────────────────────────────────────────── */
  if (!document.getElementById('wk-ck-style')) {
    const st = document.createElement('style');
    st.id = 'wk-ck-style';
    st.textContent = `
@keyframes wk-ck-rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
#ck{position:fixed;bottom:24px;right:24px;width:372px;max-height:calc(100vh - 48px);overflow:auto;z-index:9990;
  background:var(--ink-2,#1f1c1b);border:1px solid var(--rule,rgba(239,230,210,.09));
  border-radius:var(--radius,3px);box-shadow:0 24px 56px rgba(0,0,0,.55);padding:22px;
  font-family:var(--f-body,'Figtree',sans-serif);
  animation:wk-ck-rise .5s cubic-bezier(.22,.9,.18,1)}
#ck[hidden]{display:none!important}
.ck-title{
  font-family:var(--f-mono,'Unbounded',sans-serif);font-size:10px;font-weight:900;
  letter-spacing:.16em;text-transform:uppercase;color:var(--bronze,#df3821);
  margin:0 0 10px;display:flex;align-items:center;gap:9px}
.ck-title::before{content:'';width:18px;height:1px;background:currentColor;opacity:.6;flex-shrink:0}
.ck-body{font-size:12.5px;font-weight:300;color:var(--cream-mute,#918d87);line-height:1.65;margin:0 0 18px}
.ck-body a{color:var(--bronze,#df3821);text-decoration:none;border-bottom:1px solid rgba(223,56,33,.35)}
.ck-body a:hover{border-bottom-color:var(--bronze,#df3821)}
.ck-btns{display:flex;gap:8px}
.ck-btn{
  border:1px solid transparent;border-radius:var(--radius,3px);padding:11px 10px;
  font-family:var(--f-mono,'Unbounded',sans-serif);font-size:9.5px;font-weight:900;
  letter-spacing:.12em;text-transform:uppercase;cursor:pointer;
  transition:background .25s cubic-bezier(.22,.9,.18,1),color .25s,border-color .25s;
  flex:1;text-align:center;line-height:1.3}
.ck-btn-p{background:var(--bronze,#df3821);color:#fff}
#ck-acc{flex:1.4}
.ck-btn-p:hover{background:#f14b35}
.ck-btn-s{background:transparent;color:var(--cream-dim,#c8c3bc);border-color:var(--rule-hard,rgba(239,230,210,.16))}
.ck-btn-s:hover{border-color:var(--bronze,#df3821);color:var(--bronze,#df3821)}
.ck-panel{margin-top:16px;border-top:1px solid var(--rule,rgba(239,230,210,.09));padding-top:6px;display:none}
.ck-panel.open{display:block}
.ck-opt{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:11px 0}
.ck-opt+.ck-opt{border-top:1px solid var(--rule-soft,rgba(239,230,210,.05))}
.ck-opt-text strong{
  display:block;font-family:var(--f-mono,'Unbounded',sans-serif);font-size:9.5px;font-weight:900;
  letter-spacing:.14em;text-transform:uppercase;color:var(--cream,#f7f3ec)}
.ck-opt-text p{font-size:11.5px;font-weight:300;color:var(--cream-faint,#635f5a);margin:5px 0 0;line-height:1.55}
.ck-toggle{position:relative;width:38px;height:21px;flex-shrink:0;margin-top:2px}
.ck-toggle input{position:absolute;opacity:0;pointer-events:none}
.ck-toggle span{
  display:block;width:38px;height:21px;border-radius:999px;
  background:rgba(239,230,210,.12);border:1px solid var(--rule,rgba(239,230,210,.09));
  transition:background .25s,border-color .25s;cursor:pointer}
.ck-toggle span::after{
  content:'';position:absolute;top:4px;left:4px;width:14px;height:14px;border-radius:50%;
  background:var(--cream-mute,#918d87);transition:left .25s cubic-bezier(.22,.9,.18,1),background .25s}
.ck-toggle input:checked+span{background:rgba(223,56,33,.22);border-color:rgba(223,56,33,.4)}
.ck-toggle input:checked+span::after{left:19px;background:var(--bronze,#df3821)}
.ck-toggle input:focus-visible+span{outline:2px solid var(--bronze,#df3821);outline-offset:2px}
.ck-toggle.locked span{background:rgba(139,195,74,.2);border-color:rgba(139,195,74,.4);cursor:default}
.ck-toggle.locked span::after{background:var(--sage,#8bc34a)}
.ck-panel-save{margin-top:14px}
.ck-panel-save .ck-btn{flex:unset;width:100%}
@media(max-width:600px){
  #ck{left:12px;right:12px;bottom:12px;width:auto;max-width:none;padding:16px;max-height:calc(100vh - 24px)}
  .ck-btns{flex-direction:column}
}`;
    document.head.appendChild(st);
  }

  /* ── Render ─────────────────────────────────────────────────────────── */
  function render(panelOpen) {
    const c = COPY[getLang()];
    const p = prefs();
    let el = document.getElementById('ck');
    if (!el) {
      el = document.createElement('div');
      el.id = 'ck';
      el.setAttribute('role', 'dialog');
      el.setAttribute('aria-label', c.title);
      el.hidden = true;
      document.body.appendChild(el);
    }
    const opt = (key, lockedOn) => `
        <div class="ck-opt">
          <div class="ck-opt-text"><strong>${c[key]}</strong><p>${c[key + 'Txt']}</p></div>
          <label class="ck-toggle${lockedOn ? ' locked' : ''}"><input type="checkbox" data-cat="${key}"${lockedOn ? ' checked disabled' : (p[key] ? ' checked' : '')}><span></span></label>
        </div>`;
    el.innerHTML = `
      <p class="ck-title">${c.title}</p>
      <p class="ck-body">${c.text} <a href="/privacy/#cookies">${c.privacy}</a>.</p>
      <div class="ck-btns">
        <button type="button" class="ck-btn ck-btn-s" id="ck-cust">${c.customize}</button>
        <button type="button" class="ck-btn ck-btn-s" id="ck-rej">${c.reject}</button>
        <button type="button" class="ck-btn ck-btn-p" id="ck-acc">${c.accept}</button>
      </div>
      <div class="ck-panel${panelOpen ? ' open' : ''}" id="ck-panel">
        ${opt('required', true)}${opt('personalization')}${opt('marketing')}${opt('analytics')}
        <div class="ck-panel-save">
          <button type="button" class="ck-btn ck-btn-p" id="ck-save">${c.save}</button>
        </div>
      </div>`;

    const done = p2 => { write(p2); el.hidden = true; };
    el.querySelector('#ck-acc').onclick = () => done({ personalization: true, marketing: true, analytics: true });
    el.querySelector('#ck-rej').onclick = () => done({ personalization: false, marketing: false, analytics: false });
    el.querySelector('#ck-cust').onclick = () => el.querySelector('#ck-panel').classList.toggle('open');
    el.querySelector('#ck-save').onclick = () => {
      const out = {};
      CATS.forEach(k => { out[k] = !!el.querySelector('input[data-cat="' + k + '"]').checked; });
      done(out);
    };
    return el;
  }

  function open(panelOpen) {
    const el = render(panelOpen);
    el.hidden = false;
  }

  /* ── Init + react to language changes ───────────────────────────────── */
  let timer = 0;
  function init() {
    OLD.forEach(k => { try { localStorage.removeItem(k); } catch (e) {} });
    const saved = read();
    if (saved) { apply(saved); return; }
    consentMode(NONE);
    timer = setTimeout(() => { if (!read()) open(false); }, DELAY);
  }

  // Re-render in the new language if the banner is on screen.
  document.addEventListener('wk:languagechange', () => {
    const el = document.getElementById('ck');
    if (el && !el.hidden) render(el.querySelector('#ck-panel').classList.contains('open'));
  });
  window.wkCookieRefresh = () => {};   // kept for older pages that call it

  if (document.body) init();
  else document.addEventListener('DOMContentLoaded', init);
})();
