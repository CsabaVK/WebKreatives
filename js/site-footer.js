/* ─── WebKreatives — Site footer (single shared implementation) ──────────────
 * Used by EVERY page. Edit here and it changes site-wide.
 * Renders into <div id="globalFooter"></div>. Bilingual via data-nl/data-en.
 * ─────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  const root = document.getElementById('globalFooter');
  if (!root || root.dataset.wkRendered) return;
  root.dataset.wkRendered = '1';

  /* ── Styles ─────────────────────────────────────────────────────────── */
  if (!document.getElementById('wk-footer-style')) {
    const st = document.createElement('style');
    st.id = 'wk-footer-style';
    st.textContent = `
.wk-ft{
  border-top:1px solid var(--rule,rgba(239,230,210,.09));
  background:var(--ink,#0c0a09);font-family:var(--f-body,'Figtree',sans-serif);
}
.wk-ft a{text-decoration:none;color:inherit}
.wk-ft-top{
  max-width:var(--maxw,1280px);margin:0 auto;
  padding:clamp(64px,8vw,104px) var(--gutter,5vw) clamp(48px,6vw,72px);
  display:grid;grid-template-columns:1.5fr 1fr 1fr 1.05fr 1.5fr;
  gap:clamp(30px,3.4vw,56px);
}
.wk-ft-brand{display:flex;flex-direction:column;gap:18px;max-width:34ch}
.wk-ft-mail{
  display:inline-flex;align-items:center;gap:8px;margin-top:6px;
  font-size:13.5px;font-weight:500;color:var(--cream-dim,#c8c3bc);
  transition:color .2s;
}
.wk-ft-mail:hover{color:var(--red,#df3821)}
.wk-ft-kicker{
  font-family:var(--f-mono,'Unbounded',sans-serif);font-size:10px;letter-spacing:.14em;
  text-transform:uppercase;color:var(--cream-faint,#635f5a);
}
.wk-ft-line{
  font-family:var(--f-display,'Unbounded',sans-serif);font-weight:900;
  font-size:clamp(24px,2.8vw,36px);line-height:1.08;letter-spacing:-.04em;
  color:var(--cream,#f7f3ec);margin:0;max-width:14ch;
}
.wk-ft-line .mark{font-style:normal;color:var(--bronze,#df3821)}
.wk-ft-col{display:flex;flex-direction:column;gap:3px}
.wk-ft-col h4{
  font-family:var(--f-mono,'Unbounded',sans-serif);font-size:10px;font-weight:900;
  letter-spacing:.14em;text-transform:uppercase;
  color:var(--cream-faint,#635f5a);margin:0 0 14px;
}
.wk-ft-col a{
  display:flex;align-items:center;min-height:34px;
  font-size:14px;font-weight:300;color:var(--cream-mute,#918d87);
  transition:color .2s var(--ease-premium,ease);
}
.wk-ft-col a:hover{color:var(--red,#df3821)}
.wk-ft-col a svg{
  width:13px;height:13px;flex-shrink:0;margin-right:9px;
  opacity:.6;transition:opacity .2s,transform .2s;
}
.wk-ft-col a:hover svg{opacity:1;transform:translateY(-1px)}
/* the primary line in Connect reads as an action, not a link */
.wk-ft-col a.go{color:var(--cream,#f7f3ec);font-weight:600;white-space:nowrap}
.wk-ft-col a.go::after{
  content:'\\2192';margin-left:8px;opacity:.55;
  transition:transform .25s var(--ease-premium,ease),opacity .2s;
  display:inline-block;
}
.wk-ft-col a.go:hover{color:var(--red,#df3821)}
.wk-ft-col a.go:hover::after{transform:translateX(4px);opacity:1}
.wk-ft-globe{position:relative;height:230px;min-width:236px;display:none;align-self:center}
.wk-ft-globe canvas{position:absolute;inset:0;width:100%;height:100%}

.wk-ft-pay{
  max-width:var(--maxw,1280px);margin:0 auto;
  padding:0 var(--gutter,5vw) 16px;
  display:flex;align-items:center;gap:14px;flex-wrap:wrap;
}
.wk-ft-pay-l{
  font-family:var(--f-mono,'Unbounded',sans-serif);font-size:9.5px;letter-spacing:.13em;
  text-transform:uppercase;color:var(--cream-faint,#635f5a);
  display:flex;align-items:center;gap:7px;flex-shrink:0;
}
.wk-ft-pay:last-of-type{padding-bottom:clamp(34px,4vw,46px)}
.wk-ft-pay-icons{display:flex;gap:8px;flex-wrap:wrap;align-items:center}

/* the currencies we actually invoice in, ahead of the methods */
/* A list, not a row of buttons. Pills read as things to press, and there is
   nothing here to press — it is a statement of what we bill in. Separated by
   a drawn dot, the same device the legal links in the bottom bar use. */
.wk-ft-cur{display:flex;gap:0 18px;flex-wrap:wrap;align-items:center}
.wk-ft-cur b{
  position:relative;
  font-family:var(--f-body,'Figtree',sans-serif);
  font-size:12px;font-weight:600;letter-spacing:.04em;
  color:var(--cream-mute,#8b857c);
  transition:color .2s;
}
.wk-ft-cur b + b::before{
  content:'';position:absolute;left:-10px;top:50%;
  width:3px;height:3px;border-radius:50%;
  background:var(--cream-faint,#635f5a);opacity:.5;transform:translateY(-50%);
}
/* the two we quote in carry a little more weight than the rest */
.wk-ft-cur b.lead{color:var(--cream-dim,#cfc9bf);font-weight:700}
.wk-ft-cur b:hover{color:var(--white,#fff)}
@media(max-width:520px){.wk-ft-cur{gap:0 14px}.wk-ft-cur b + b::before{left:-8px}}

/* A brand we hold no artwork for. Set as bare text it read as a caption that
   had lost its logo, so it now sits on a brand-coloured plate inside the same
   white card — the shape of a payment mark, without pretending to be one. */
.wk-ft-badge--text{
  display:inline-flex;align-items:center;justify-content:center;
  padding:5px;overflow:hidden;
}
.wk-ft-badge--text i{
  display:flex;align-items:center;justify-content:center;
  width:100%;height:100%;border-radius:5px;
  background:var(--brand,#0f172a);
  font-family:var(--f-body,'Figtree',sans-serif);font-style:normal;
  font-size:7px;font-weight:800;letter-spacing:.03em;line-height:1;
  color:#fff;white-space:nowrap;
}
/* the longer names need to come down a step to stay on the plate */
.wk-ft-badge--text i.sm{font-size:5.6px;letter-spacing:0}
.wk-ft-badge{
  width:52px;height:34px;object-fit:contain;padding:6px;flex-shrink:0;
  box-sizing:border-box;border-radius:10px;
  background:linear-gradient(180deg,#fff 0%,#f8fafc 100%);
  border:1px solid rgba(15,23,42,.08);
  box-shadow:0 6px 16px rgba(15,23,42,.05);
  opacity:.96;
  transition:opacity .2s,transform .2s,box-shadow .2s,border-color .2s;
}
.wk-ft-badge:hover{opacity:1;transform:translateY(-1px);box-shadow:0 10px 22px rgba(15,23,42,.08)}
/* each card carries its brand's colour as a stripe across the top */
.wk-ft-badge[alt="Visa"]{border-color:rgba(26,31,113,.22);box-shadow:inset 0 2px 0 #1a1f71,0 6px 16px rgba(15,23,42,.05)}
.wk-ft-badge[alt="Mastercard"]{border-color:rgba(255,95,0,.2);box-shadow:inset 0 2px 0 #ff5f00,0 6px 16px rgba(15,23,42,.05)}
.wk-ft-badge[alt="iDEAL"]{border-color:rgba(204,0,102,.22);box-shadow:inset 0 2px 0 #cc0066,0 6px 16px rgba(15,23,42,.05)}
.wk-ft-badge[alt="Apple Pay"]{border-color:rgba(17,17,17,.18);box-shadow:inset 0 2px 0 #111,0 6px 16px rgba(15,23,42,.05)}
.wk-ft-badge[alt="Google Pay"]{border-color:rgba(66,133,244,.2);box-shadow:inset 0 2px 0 #4285f4,0 6px 16px rgba(15,23,42,.05)}
.wk-ft-badge[alt="Klarna"]{border-color:rgba(255,179,199,.55);box-shadow:inset 0 2px 0 #ffb3c7,0 6px 16px rgba(15,23,42,.05)}
.wk-ft-badge[alt="American Express"]{border-color:rgba(0,111,207,.22);box-shadow:inset 0 2px 0 #006fcf,0 6px 16px rgba(15,23,42,.05);--brand:#006fcf}
.wk-ft-badge[alt="Discover"]{border-color:rgba(255,96,0,.22);box-shadow:inset 0 2px 0 #ff6000,0 6px 16px rgba(15,23,42,.05);--brand:#e35205}
.wk-ft-badge[alt="Maestro"]{border-color:rgba(0,153,223,.22);box-shadow:inset 0 2px 0 #0099df,0 6px 16px rgba(15,23,42,.05);--brand:#0068a5}
.wk-ft-badge[alt="Bancontact"]{border-color:rgba(0,84,152,.22);box-shadow:inset 0 2px 0 #005498,0 6px 16px rgba(15,23,42,.05);--brand:#005498}
.wk-ft-badge[alt="SEPA Direct Debit"]{border-color:rgba(16,41,142,.22);box-shadow:inset 0 2px 0 #10298e,0 6px 16px rgba(15,23,42,.05);--brand:#10298e}
.wk-ft-badge[alt="PayPal"]{border-color:rgba(0,48,135,.18);box-shadow:inset 0 2px 0 #003087,0 6px 16px rgba(15,23,42,.05)}
.wk-ft-badge[alt="Stripe"]{border-color:rgba(99,91,255,.22);box-shadow:inset 0 2px 0 #635bff,0 6px 16px rgba(15,23,42,.05)}
.wk-ft-badge[alt="Amazon Pay"]{border-color:rgba(255,153,0,.24);box-shadow:inset 0 2px 0 #ff9900,0 6px 16px rgba(15,23,42,.05)}
.wk-ft-badge[alt="Visa"],.wk-ft-badge[alt="Mastercard"],.wk-ft-badge[alt="Apple Pay"],
.wk-ft-badge[alt="Google Pay"],.wk-ft-badge[alt="Amazon Pay"]{padding:4px}

.wk-ft-bot{
  max-width:var(--maxw,1280px);margin:0 auto;
  border-top:1px solid var(--rule,rgba(239,230,210,.09));
  padding:28px var(--gutter,5vw) 34px;
}
.wk-ft-bot-top{
  display:flex;align-items:center;justify-content:space-between;
  gap:18px;flex-wrap:wrap;
}
.wk-ft-bot p,.wk-ft-bot a,.wk-ft-bot span{
  font-family:var(--f-body,'Figtree',sans-serif);font-size:11.5px;line-height:1.6;
  letter-spacing:.03em;color:var(--cream-faint,#635f5a);margin:0;
}
/* the legal links sit between the tagline and the copyright, centred */
.wk-ft-legal{
  display:flex;align-items:center;flex-wrap:wrap;justify-content:center;
  flex:1 1 auto;
}
.wk-ft-legal a{
  font-weight:500;color:var(--cream-mute,#918d87);
  transition:color .2s;padding:2px 0;
}
.wk-ft-legal a:hover{color:var(--red,#df3821)}
/* a dot between each pair, drawn rather than typed so it stays even */
.wk-ft-legal a + a{margin-left:26px;position:relative}
.wk-ft-legal a + a::before{
  content:'';position:absolute;left:-14px;top:50%;
  width:3px;height:3px;border-radius:50%;
  background:var(--cream-faint,#635f5a);opacity:.55;transform:translateY(-50%);
}
@media(max-width:520px){
  .wk-ft-legal a + a{margin-left:20px}
  .wk-ft-legal a + a::before{left:-11px}
}
/* ── the ladder ───────────────────────────────────────────────────────
   The globe needs real width beside four link columns, so it is the first
   thing to go. Below that the brand takes its own row rather than being
   squeezed into a column too narrow for the sentence.                    */
@media(min-width:1240px){.wk-ft-globe{display:block}}
@media(max-width:1239px){
  .wk-ft-top{grid-template-columns:1.6fr 1fr 1fr 1.05fr}
}
@media(max-width:1020px){
  .wk-ft-top{grid-template-columns:repeat(3,minmax(0,1fr));gap:34px 30px}
  .wk-ft-brand{grid-column:1/-1;max-width:52ch}
}
@media(max-width:660px){
  .wk-ft-top{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media(max-width:880px){
  .wk-ft-bot-top{flex-direction:column;align-items:flex-start;gap:12px}
  .wk-ft-legal{justify-content:flex-start}
}
/* Two columns still fit a 360px phone — the longest label, "What it costs",
   sits in 146px with room to spare — and one column turned the footer into
   an extra screen and a half of stacked links. Only the narrowest handsets
   drop to a single column now. */
@media(max-width:430px){
  .wk-ft-pay{gap:12px}
}
@media(max-width:339px){
  .wk-ft-top{grid-template-columns:minmax(0,1fr);gap:30px}
}
`;
    document.head.appendChild(st);
  }

  /* The site quotes in the first two; Stripe settles the rest for a Dutch
     account, so they are worth naming for anyone wondering whether they can
     pay in their own money. */
  const CUR = ['EUR', 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'CAD', 'AUD', 'NZD', 'JPY']
    .map((c, i) => `<b${i < 2 ? ' class="lead"' : ''}>${c}</b>`).join('');

  /* brands we hold artwork for */
  const PAY = [
    ['visa','Visa'],['mastercard','Mastercard'],['ideal','iDEAL'],['applepay','Apple Pay'],
    ['googlepay','Google Pay'],['klarna','Klarna'],['paypal','PayPal'],['stripe','Stripe'],['amazonpay','Amazon Pay']
  ].map(([f,a]) => `<img class="wk-ft-badge" src="/assets/payment/${f}.svg" alt="${a}" loading="lazy" width="52" height="34">`).join('');

  /* and the ones we do not — a wordmark beats a logo drawn from memory */
  const TEXT = [
    ['American Express', 'AMEX'],
    ['Discover', 'DISCOVER'],
    ['Maestro', 'MAESTRO'],
    ['Bancontact', 'BANCONTACT'],
    ['SEPA Direct Debit', 'SEPA']
  ].map(([a, t]) => `<span class="wk-ft-badge wk-ft-badge--text" role="img" aria-label="${a}" alt="${a}"><i${t.length > 8 ? ' class="sm"' : ''}>${t}</i></span>`).join('');

  const L = (href, nl, en) => `<a href="${href}" data-nl="${nl}" data-en="${en}">${nl}</a>`;

  root.innerHTML = `
<footer class="wk-ft">
  <div class="wk-ft-top">
    <div class="wk-ft-brand">
      <div class="wk-ft-kicker">WebKreatives</div>
      <p class="wk-ft-line"
         data-nl="Websites die <em class='mark'>hun werk doen.</em>"
         data-en="Websites that <em class='mark'>earn their keep.</em>">Websites that <em class="mark">earn their keep.</em></p>
      <a class="wk-ft-mail" href="mailto:info@webkreatives.com">info@webkreatives.com</a>
    </div>

    <div class="wk-ft-col">
      <h4 data-nl="Diensten" data-en="Services">Services</h4>
      ${L('/services/websites/','Websites','Websites')}
      ${L('/services/hosting/','Hosting','Hosting')}
      ${L('/pricing/','Wat kost het?','What it costs')}
    </div>

    <div class="wk-ft-col">
      <h4 data-nl="Pagina's" data-en="Pages">Pages</h4>
      ${L('/','Home','Home')}
      ${L('/portfolio/','Portfolio','Portfolio')}
      ${L('/case-studies/','Case studies','Case studies')}
      ${L('/articles/','Artikelen','Articles')}
      ${L('/contact/','Contact','Contact')}
    </div>

    <div class="wk-ft-col">
      <h4 data-nl="Verbinden" data-en="Connect">Connect</h4>
      <a class="go" href="/contact/" data-nl="Aan de slag" data-en="Get started">Get started</a>
      <a href="https://www.instagram.com/webkreatives/" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>Instagram</a>
      <a href="https://www.linkedin.com/company/webkreatives/" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v1.5A5 5 0 0 1 16 8z"/><rect x="2" y="9" width="4" height="12" rx=".5"/><circle cx="4" cy="4" r="2"/></svg>LinkedIn</a>
      <a href="https://webkreatives.medium.com/" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>Medium</a>
    </div>

    <div class="wk-ft-globe" data-topo-globe></div>
  </div>

  <div class="wk-ft-pay">
    <span class="wk-ft-pay-l">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
      <span data-nl="Wij factureren in" data-en="We invoice in">We invoice in</span>
    </span>
    <div class="wk-ft-cur">${CUR}</div>
  </div>

  <div class="wk-ft-pay">
    <span class="wk-ft-pay-l">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      <span data-nl="Veilig betalen" data-en="Secure payments">Secure payments</span>
    </span>
    <div class="wk-ft-pay-icons">${PAY}${TEXT}</div>
  </div>

  <div class="wk-ft-bot">
    <div class="wk-ft-bot-top">
      <p data-nl="Minder klanten, dichterbij werken." data-en="Fewer clients, closer work.">Fewer clients, closer work.</p>
      <div class="wk-ft-legal">
        ${L('/privacy/','Privacy','Privacy')}
        ${L('/terms/','Voorwaarden','Terms')}
        ${L('/refund-policy/','Herroeping &amp; restitutie','Refund Policy')}
      </div>
      <span>© 2026 WebKreatives · Amsterdam, NL · KVK 94051097</span>
    </div>
  </div>
</footer>`;

  /* ── Language ───────────────────────────────────────────────────────── */
  function applyFooterLang(l) {
    const lang = l === 'en' ? 'en' : 'nl';
    root.querySelectorAll('[data-nl],[data-en]').forEach(el => {
      const t = el.getAttribute('data-' + lang);
      if (t) el.innerHTML = t;
    });
  }
  applyFooterLang(localStorage.getItem('wk-lang') || 'nl');
  document.addEventListener('wk:languagechange', e =>
    applyFooterLang(e?.detail?.lang || localStorage.getItem('wk-lang') || 'nl'));

  /* ── Rotating wire globe (constant, paused when off screen) ─────────── */
  (function globe() {
    const host = root.querySelector('[data-topo-globe]');
    if (!host) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cv = document.createElement('canvas');
    host.appendChild(cv);
    const ctx = cv.getContext('2d');
    let w = 0, h = 0, dpr = 1, t = 0, raf = 0, live = false;

    function size() {
      const r = host.getBoundingClientRect();
      if (!r.width) return;
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    /* The studio bills in euros and works worldwide. Each currency is pinned
       to a point on the surface: side alternates, heights differ, and only one
       is up at a time. */
    const MONEY = [
      { sym: '\u20AC', code: 'EUR', side:  1, ay: -0.42 },
      { sym: '$',       code: 'USD', side: -1, ay:  0.12 },
      { sym: '\u00A5', code: 'JPY', side:  1, ay:  0.46 },
      { sym: '\u00A3', code: 'GBP', side: -1, ay: -0.16 }
    ];
    const HOLD = 2400;
    const FADE = 520;
    const TILT = -0.36;

    function roundRect(c, x, y, wd, ht, r) {
      c.beginPath();
      c.moveTo(x + r, y);
      c.arcTo(x + wd, y, x + wd, y + ht, r);
      c.arcTo(x + wd, y + ht, x, y + ht, r);
      c.arcTo(x, y + ht, x, y, r);
      c.arcTo(x, y, x + wd, y, r);
      c.closePath();
    }

    let last = 0, t0 = 0;
    function draw(now) {
      raf = live ? requestAnimationFrame(draw) : 0;
      if (now - last < 33) return;
      last = now;
      if (!t0) t0 = now;

      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.27;

      /* ── wireframe, on its axis, turning the other way ── */
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(TILT);
      ctx.lineWidth = 1;

      ctx.strokeStyle = 'rgba(223,56,33,.30)';
      ctx.beginPath(); ctx.arc(0, 0, R, 0, 6.2832); ctx.stroke();

      ctx.strokeStyle = 'rgba(239,230,210,.13)';
      for (let i = 1; i < 6; i++) {
        const y = -R + (2 * R / 6) * i;
        const rx = Math.sqrt(Math.max(R * R - y * y, 0));
        ctx.beginPath(); ctx.ellipse(0, y, rx, rx * 0.20, 0, 0, 6.2832); ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(223,56,33,.22)';
      for (let i = 0; i < 7; i++) {
        const p = (-t / 300 + i / 7 + 1) % 1;   /* the other way round */
        const rx = Math.abs(Math.cos(p * Math.PI)) * R;
        ctx.beginPath(); ctx.ellipse(0, 0, rx, R, 0, 0, 6.2832); ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(239,230,210,.10)';
      ctx.beginPath(); ctx.moveTo(0, -R - 12); ctx.lineTo(0, R + 12); ctx.stroke();
      ctx.restore();

      /* ── one pinned currency at a time ── */
      const span = HOLD + FADE * 2;
      const elapsed = now - t0;
      const m = MONEY[Math.floor(elapsed / span) % MONEY.length];
      const phase = elapsed % span;
      let a = 1;
      if (phase < FADE) a = phase / FADE;
      else if (phase > FADE + HOLD) a = 1 - (phase - FADE - HOLD) / FADE;
      a = Math.max(0, Math.min(1, a));
      if (a <= 0.01) { t++; return; }

      /* where it sits on the surface */
      const ay = m.ay * R;
      const ax = m.side * Math.sqrt(Math.max(R * R - ay * ay, 0)) * 0.82;
      const px = cx + ax, py = cy + ay;

      /* the box, pushed out past the rim on that side */
      ctx.font = '900 13px Unbounded, system-ui, sans-serif';
      const symW = ctx.measureText(m.sym).width;
      ctx.font = '700 9px Figtree, system-ui, sans-serif';
      const codeW = ctx.measureText(m.code).width;
      const bw = Math.ceil(symW + codeW + 22), bh = 24;

      let bx = m.side === 1 ? cx + R + 16 : cx - R - 16 - bw;
      bx = Math.max(2, Math.min(bx, w - bw - 2));      /* never leave the canvas */
      const by = Math.max(2, Math.min(py - bh / 2, h - bh - 2));

      /* leader from the pin to the nearest edge of the box */
      const ex = m.side === 1 ? bx : bx + bw;
      ctx.globalAlpha = a * 0.75;
      ctx.strokeStyle = 'rgba(223,56,33,.85)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(ex - m.side * 6, py);
      ctx.lineTo(ex, by + bh / 2);
      ctx.stroke();

      /* the pin */
      ctx.globalAlpha = a;
      ctx.fillStyle = '#df3821';
      ctx.beginPath(); ctx.arc(px, py, 2.6, 0, 6.2832); ctx.fill();
      ctx.globalAlpha = a * 0.28;
      ctx.beginPath(); ctx.arc(px, py, 6.5, 0, 6.2832); ctx.fill();

      /* the box */
      ctx.globalAlpha = a;
      roundRect(ctx, bx, by, bw, bh, 6);
      ctx.fillStyle = 'rgba(12,10,9,.94)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(223,56,33,.45)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#df3821';
      ctx.font = '900 13px Unbounded, system-ui, sans-serif';
      ctx.fillText(m.sym, bx + 9, by + bh / 2 + 1);
      ctx.fillStyle = 'rgba(247,243,236,.8)';
      ctx.font = '700 9px Figtree, system-ui, sans-serif';
      ctx.fillText(m.code, bx + 9 + symW + 6, by + bh / 2 + 1);
      ctx.globalAlpha = 1;

      t++;
    }

    new IntersectionObserver(es => es.forEach(e => {
      live = e.isIntersecting;
      if (live && !raf) { size(); raf = requestAnimationFrame(draw); }
    }), { threshold: 0.01 }).observe(host);

    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(size, 150); });
    size();
  })();
})();
