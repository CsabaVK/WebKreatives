/* Scootershop Den Haag — behaviour. No dependencies.
   Draws the nav, menu, footer and phone bar on every page, then fills every
   [data-…] hook from data.js: phone, WhatsApp, hours, prices, reviews. */
(function () {
  const D = window.SSDH || {};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const root = document.body.dataset.root || '';
  const here = document.body.dataset.page || '';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const euro = n => '€' + String(n).replace('.', ',');

  const ARROW = '<span class="ic"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>';
  const WA = '<span class="wa"><svg viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg></span>';
  const LINKS = [['diensten', '#diensten', 'Diensten'], ['prijzen', 'prijzen/', 'Prijzen'], ['schade', 'schadeherstel/', 'Schadeherstel'], ['over', '#over', 'Over ons'], ['contact', '#contact', 'Contact']];
  const href = h => h.startsWith('#') ? (here === 'home' ? h : root + h) : root + h;
  const links = () => LINKS.map(([k, h, t]) => '<a href="' + href(h) + '"' + (k === here ? ' class="on"' : '') + '>' + t + '</a>').join('');

  /* ── nav, menu, footer, phone bar ────────────────────────────── */
  const navEl = $('[data-nav]');
  if (navEl) navEl.innerHTML = '<div class="wrap nav-in">' +
    '<a class="nav-logo" href="' + root + '" aria-label="Scootershop Den Haag, home"><img src="' + root + 'assets/mark.svg" alt="" width="34" height="42"><span>Scootershop Den Haag</span></a>' +
    '<nav class="nav-links" aria-label="Hoofdmenu">' + links() + '</nav>' +
    '<div class="nav-cta">' +
    '<a class="btn sm line tel" data-tel href="#"><span data-tel="text"></span></a>' +
    '<a class="btn sm green" data-wa="default" href="#" target="_blank" rel="noopener">' + WA + '<span>WhatsApp</span></a>' +
    '<button class="nav-burger" aria-label="Menu" aria-expanded="false" data-menu-open><i></i></button></div></div>';
  const menuEl = $('[data-menu]');
  if (menuEl) menuEl.innerHTML = '<nav aria-label="Menu">' + links() + '</nav>' +
    '<div class="menu-foot"><span class="openstate" data-openstate><i></i>…</span>' +
    '<a class="btn green" data-wa="default" href="#" target="_blank" rel="noopener">' + WA + '<span>Stuur een WhatsApp</span></a>' +
    '<a class="btn line" data-tel href="#"><span>Bel <span data-tel="text"></span></span></a></div>';
  const footEl = $('[data-foot]');
  if (footEl) footEl.innerHTML = '<div class="wrap foot-in">' +
    '<div><div class="brand"><img src="' + root + 'assets/mark.svg" alt="" width="30" height="37">Scootershop Den Haag</div>' +
    '<p>Reparatie, onderhoud, schadeherstel en keuringen voor alle scooters. Piaggio- en Vespa-specialist aan de Marktweg, al meer dan 15 jaar.</p></div>' +
    '<div><h4>Snel naar</h4><ul>' +
    '<li><a href="' + href('#diensten') + '">Diensten</a></li><li><a href="' + root + 'prijzen/">Prijzen</a></li>' +
    '<li><a href="' + root + 'schadeherstel/">Schadeherstel</a></li><li><a href="' + href('#reviews') + '">Reviews</a></li>' +
    '<li><a href="' + root + 'privacy/">Privacy</a></li></ul></div>' +
    '<div><h4>Contact</h4><ul>' +
    '<li><a data-route href="#" target="_blank" rel="noopener">' + esc(D.address.street + ', ' + D.address.zip + ' ' + D.address.city) + '</a></li>' +
    '<li><a data-tel href="#"><span data-tel="text"></span></a></li>' +
    '<li><a data-wa="default" href="#" target="_blank" rel="noopener">WhatsApp</a></li>' +
    '<li><a data-mail href="#"><span data-mail="text"></span></a></li>' +
    '<li><a href="' + esc(D.instagram) + '" target="_blank" rel="noopener">Instagram</a></li>' +
    '<li><a href="' + esc(D.facebook) + '" target="_blank" rel="noopener">Facebook</a></li></ul></div></div>' +
    '<div class="wrap foot-bot"><span>© ' + new Date().getFullYear() + ' Scootershop Den Haag</span><span>Website door <a href="https://webkreatives.com">WebKreatives</a></span></div>';
  const barEl = $('[data-bar]');
  if (barEl) {
    barEl.innerHTML = '<a class="btn green" data-wa="default" href="#" target="_blank" rel="noopener">' + WA + '<span>WhatsApp</span></a>' +
      '<a class="btn line" data-tel href="#"><span>Bel ons</span></a>';
    document.body.classList.add('has-bar');
  }

  /* ── contact hooks ───────────────────────────────────────────── */
  $$('[data-tel]').forEach(a => { a.href = 'tel:' + D.phoneRaw; });
  $$('[data-tel="text"]').forEach(s => { s.textContent = D.phone; });
  $$('[data-mail]').forEach(a => { a.href = 'mailto:' + D.email; });
  $$('[data-mail="text"]').forEach(s => { s.textContent = D.email; });
  $$('[data-route]').forEach(a => { a.href = D.mapsUrl; });
  $$('[data-wa]').forEach(a => {
    const key = a.dataset.wa || 'default';
    a.href = 'https://wa.me/' + D.whatsapp + '?text=' + encodeURIComponent((D.wa && D.wa[key]) || D.wa.default);
  });
  $$('[data-google]').forEach(el => {
    const k = el.dataset.google;
    el.textContent = k === 'count' ? D.google.count : String(D.google.rating).replace('.', ',');
  });
  $$('[data-brands]').forEach(el => { el.innerHTML = '<li class="lbl">Alle merken, onder andere</li>' + D.brands.map(b => '<li>' + esc(b) + '</li>').join(''); });

  /* ── opening hours, open-now ─────────────────────────────────── */
  const hh = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const dayIdx = () => (new Date().getDay() + 6) % 7; // Monday = 0
  function openState() {
    const now = new Date(), i = dayIdx(), mins = now.getHours() * 60 + now.getMinutes();
    const today = D.hours[i];
    if (today.open && mins >= hh(today.open) && mins < hh(today.close)) return { on: true, text: 'Nu open · tot <span class="num">' + today.close + '</span>' };
    if (today.open && mins < hh(today.open)) return { on: false, text: 'Gesloten · opent om <span class="num">' + today.open + '</span>' };
    for (let k = 1; k <= 7; k++) {
      const d = D.hours[(i + k) % 7];
      if (d.open) return { on: false, text: 'Gesloten · ' + (k === 1 ? 'morgen' : d.d.toLowerCase()) + ' open om <span class="num">' + d.open + '</span>' };
    }
    return { on: false, text: 'Gesloten' };
  }
  function renderOpen() {
    const s = openState();
    $$('[data-openstate]').forEach(el => { el.classList.toggle('on', s.on); el.innerHTML = '<i></i><span>' + s.text + '</span>'; });
  }
  renderOpen(); setInterval(renderOpen, 60000);
  $$('[data-hours]').forEach(tb => {
    const i = dayIdx();
    tb.innerHTML = D.hours.map((d, k) => '<tr class="' + (k === i ? 'today ' : '') + (d.open ? '' : 'closed') + '"><td>' + d.d + '</td><td>' +
      (d.open ? d.open + ' – ' + d.close : 'Gesloten') + '</td></tr>').join('');
  });
  $$('[data-open-at]').forEach(el => { el.textContent = D.hours[0].open; });
  $$('[data-close-at]').forEach(el => { el.textContent = D.hours[0].close; });

  /* ── prices ──────────────────────────────────────────────────── */
  const priceHtml = r => {
    if (r.price === null) return '<span class="val"><span class="from">' + esc(r.note || 'op aanvraag') + '</span></span>';
    if (r.price === 0) return '<span class="val"><span class="from">' + esc(r.note || 'inbegrepen') + '</span></span>';
    return '<span class="val">' + (r.was ? '<span class="was">' + euro(r.was) + '</span>' : '') + (r.from ? '<span class="from">vanaf</span>' : '') + '<span class="num">' + euro(r.price) + '</span></span>';
  };
  $$('[data-prices]').forEach(el => {
    const list = D[el.dataset.prices] || [];
    el.innerHTML = list.map(r => '<div class="plist-row"><span class="name">' + esc(r.name) +
      (r.note && r.price ? '<span class="note">' + esc(r.note) + '</span>' : '') + '</span>' + priceHtml(r) + '</div>').join('');
  });
  $$('[data-service="price"]').forEach(el => { el.textContent = euro(D.service.price); });
  $$('[data-service="was"]').forEach(el => { if (D.service.was) el.textContent = euro(D.service.was); else el.hidden = true; });
  $$('[data-service="name"]').forEach(el => { el.textContent = D.service.name; });
  $$('[data-checklist]').forEach(el => { el.innerHTML = D.service.checklist.map(c => '<li>' + esc(c) + '</li>').join(''); });
  $$('[data-price]').forEach(el => {
    const [list, idx] = el.dataset.price.split('.');
    const r = (D[list] || [])[+idx]; if (!r) return;
    el.innerHTML = (r.was ? '<span class="was">' + euro(r.was) + '</span>' : '') + (r.from ? '<span class="from">vanaf</span>' : '') + '<span class="num">' + euro(r.price) + '</span>';
  });

  /* ── reviews ─────────────────────────────────────────────────── */
  $$('[data-reviews]').forEach(el => {
    el.innerHTML = D.reviews.map(r => '<article class="review" data-rv>' +
      '<span class="stars" aria-label="5 van 5 sterren">★★★★★</span>' +
      '<blockquote>' + esc(r.text) + '</blockquote>' +
      '<footer><b>' + esc(r.name) + '</b><span>Google · ' + (r.ago === 1 ? '1 maand' : r.ago + ' maanden') + ' geleden</span></footer></article>').join('');
  });

  /* ── nav: scroll shadow, burger, current section ─────────────── */
  const nav = $('[data-nav]'), menu = $('[data-menu]');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', scrollY > 20);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    const open = o => {
      nav.classList.toggle('open', o); if (menu) menu.classList.toggle('open', o);
      document.body.style.overflow = o ? 'hidden' : '';
      $$('[data-menu-open]').forEach(b => b.setAttribute('aria-expanded', o));
    };
    $$('[data-menu-open]').forEach(b => b.addEventListener('click', () => open(!nav.classList.contains('open'))));
    if (menu) $$('a', menu).forEach(a => a.addEventListener('click', () => open(false)));
    addEventListener('keydown', e => { if (e.key === 'Escape') open(false); });
    const targets = $$('.nav-links a[href^="#"]').map(a => [a, $(a.getAttribute('href'))]).filter(x => x[1]);
    if (targets.length) {
      let queued = false;
      const spy = () => {
        queued = false; const y = innerHeight * .36; let cur = null;
        targets.forEach(([, el]) => { const r = el.getBoundingClientRect(); if (r.top <= y && r.bottom > y) cur = el; });
        targets.forEach(([a, el]) => a.classList.toggle('on', el === cur));
      };
      const ask = () => { if (!queued) { queued = true; requestAnimationFrame(spy); } };
      addEventListener('scroll', ask, { passive: true }); addEventListener('resize', ask); spy();
    }
  }

  /* ── phone bar: appears once the hero buttons scroll away ────── */
  if (barEl) {
    const anchor = $('.hero-cta') || $('.page-hd');
    const show = () => barEl.classList.toggle('show', !anchor || anchor.getBoundingClientRect().bottom < 0);
    addEventListener('scroll', show, { passive: true }); show();
  }

  /* ── reveals and the receipt timeline ────────────────────────── */
  const rv = $$('[data-rv]');
  if (reduced || !('IntersectionObserver' in window)) rv.forEach(el => el.classList.add('in'));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    // what is on screen at load shows at once; the observer takes the rest
    rv.forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in'); else io.observe(el); });
  }
  // the long checklist starts folded on a phone
  if (innerWidth < 720) $$('details[data-fold]').forEach(d => { d.open = false; });
  const ticket = $('.ticket');
  if (ticket) requestAnimationFrame(() => ticket.classList.add('go'));
})();
