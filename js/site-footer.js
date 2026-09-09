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
  padding:clamp(48px,6vw,74px) var(--gutter,5vw) clamp(34px,4vw,50px);
  display:grid;grid-template-columns:1.7fr 1fr 1fr 1fr 1.1fr;
  gap:clamp(24px,3vw,48px);
}
.wk-ft-brand{display:flex;flex-direction:column;gap:16px}
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
.wk-ft-col{display:flex;flex-direction:column;gap:2px}
.wk-ft-col h4{
  font-family:var(--f-mono,'Unbounded',sans-serif);font-size:10px;font-weight:900;
  letter-spacing:.14em;text-transform:uppercase;
  color:var(--cream-faint,#635f5a);margin:0 0 8px;
}
.wk-ft-col a{
  display:flex;align-items:center;min-height:32px;
  font-size:14px;font-weight:300;color:var(--cream-mute,#918d87);
  transition:color .2s var(--ease-premium,ease);
}
.wk-ft-col a:hover{color:var(--bronze,#df3821)}
.wk-ft-globe{position:relative;height:200px;display:none}
@media(min-width:1100px){.wk-ft-globe{display:block}}
.wk-ft-globe canvas{position:absolute;inset:0;width:100%;height:100%}

.wk-ft-pay{
  max-width:var(--maxw,1280px);margin:0 auto;
  padding:0 var(--gutter,5vw) clamp(26px,3vw,34px);
  display:flex;align-items:center;gap:14px;flex-wrap:wrap;
}
.wk-ft-pay-l{
  font-family:var(--f-mono,'Unbounded',sans-serif);font-size:9.5px;letter-spacing:.13em;
  text-transform:uppercase;color:var(--cream-faint,#635f5a);
  display:flex;align-items:center;gap:7px;flex-shrink:0;
}
.wk-ft-pay-icons{display:flex;gap:7px;flex-wrap:wrap;align-items:center}
.wk-ft-badge{
  width:44px;height:29px;object-fit:contain;padding:5px;flex-shrink:0;
  border-radius:var(--radius,3px);background:rgba(239,230,210,.92);
  opacity:.5;transition:opacity .25s;
}
.wk-ft-badge:hover{opacity:1}

.wk-ft-bot{
  max-width:var(--maxw,1280px);margin:0 auto;
  border-top:1px solid var(--rule,rgba(239,230,210,.09));
  padding:20px var(--gutter,5vw);
  display:flex;align-items:center;justify-content:space-between;
  gap:14px;flex-wrap:wrap;
}
.wk-ft-bot p,.wk-ft-bot a,.wk-ft-bot span{
  font-family:var(--f-mono,'Unbounded',sans-serif);font-size:10.5px;line-height:1.6;
  letter-spacing:.05em;color:var(--cream-faint,#635f5a);margin:0;
}
.wk-ft-bot a{transition:color .2s}
.wk-ft-bot a:hover{color:var(--bronze,#df3821)}
.wk-ft-legal{display:flex;align-items:center;gap:18px;flex-wrap:wrap}
@media(max-width:1099px){.wk-ft-top{grid-template-columns:1.6fr 1fr 1fr 1fr}}
@media(max-width:860px){
  .wk-ft-top{grid-template-columns:1fr 1fr;gap:30px}
  .wk-ft-brand{grid-column:1/-1}
}
@media(max-width:520px){
  .wk-ft-top{grid-template-columns:1fr}
  .wk-ft-bot{flex-direction:column;align-items:flex-start}
}
`;
    document.head.appendChild(st);
  }

  const PAY = [
    ['visa','Visa'],['mastercard','Mastercard'],['ideal','iDEAL'],['applepay','Apple Pay'],
    ['googlepay','Google Pay'],['klarna','Klarna'],['paypal','PayPal'],['stripe','Stripe'],['amazonpay','Amazon Pay']
  ].map(([f,a]) => `<img class="wk-ft-badge" src="/assets/payment/${f}.svg" alt="${a}" loading="lazy" width="44" height="29">`).join('');

  const L = (href, nl, en) => `<a href="${href}" data-nl="${nl}" data-en="${en}">${nl}</a>`;

  root.innerHTML = `
<footer class="wk-ft">
  <div class="wk-ft-top">
    <div class="wk-ft-brand">
      <div class="wk-ft-kicker">WebKreatives</div>
      <p class="wk-ft-line"
         data-nl="Websites die <em class='mark'>hun werk doen.</em>"
         data-en="Websites that <em class='mark'>earn their keep.</em>">Websites that <em class="mark">earn their keep.</em></p>
    </div>

    <div class="wk-ft-col">
      <h4 data-nl="Wat we doen" data-en="Capabilities">Capabilities</h4>
      ${L('/services/websites/','Websites','Websites')}
      ${L('/services/hosting/','Hosting &amp; support','Hosting &amp; support')}
      ${L('/pricing/','Wat kost het?','What it costs')}
    </div>

    <div class="wk-ft-col">
      <h4 data-nl="Werk" data-en="Work">Work</h4>
      ${L('/portfolio/','Portfolio','Portfolio')}
      ${L('/case-studies/','Case studies','Case studies')}
      ${L('/articles/','Artikelen','Articles')}
    </div>

    <div class="wk-ft-col">
      <h4 data-nl="Begin hier" data-en="Start here">Start here</h4>
      ${L('/contact/','Start een project','Start a project')}
      ${L('/#help','Wat werkt er niet?','What is not working?')}
      <a href="mailto:info@webkreatives.com">info@webkreatives.com</a>
    </div>

    <div class="wk-ft-globe" data-topo-globe></div>
  </div>

  <div class="wk-ft-pay">
    <span class="wk-ft-pay-l">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      <span data-nl="Veilig betalen" data-en="Secure payment">Secure payment</span>
    </span>
    <div class="wk-ft-pay-icons">${PAY}</div>
  </div>

  <div class="wk-ft-bot">
    <p data-nl="Minder klanten, dichterbij werken." data-en="Fewer clients, closer work.">Fewer clients, closer work.</p>
    <div class="wk-ft-legal">
      ${L('/privacy/','Privacy','Privacy')}
      ${L('/terms/','Voorwaarden','Terms')}
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

    let last = 0;
    function draw(now) {
      raf = live ? requestAnimationFrame(draw) : 0;
      if (now - last < 33) return;
      last = now;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.40;

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(223,56,33,.28)';
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.stroke();

      ctx.strokeStyle = 'rgba(239,230,210,.13)';
      for (let i = 1; i < 6; i++) {
        const y = cy - R + (2 * R / 6) * i;
        const rx = Math.sqrt(Math.max(R * R - (y - cy) * (y - cy), 0));
        ctx.beginPath(); ctx.ellipse(cx, y, rx, rx * 0.20, 0, 0, 6.2832); ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(223,56,33,.20)';
      for (let i = 0; i < 7; i++) {
        const p = (t / 300 + i / 7) % 1;
        const rx = Math.abs(Math.cos(p * Math.PI)) * R;
        ctx.beginPath(); ctx.ellipse(cx, cy, rx, R, 0, 0, 6.2832); ctx.stroke();
      }
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
