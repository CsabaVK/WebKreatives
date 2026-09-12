/* Scootershop Den Haag — behaviour. No dependencies.
   Draws the nav, menu, footer and phone bar on every page, then fills every
   [data-…] hook from data.js: phone, WhatsApp, hours, prices, reviews.
   Dutch is the page; English lives in data-en attributes and the `en`
   fields of data.js, and the NL/EN pill swaps between them. */
(function () {
  const D = window.SSDH || {};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const root = document.body.dataset.root || '';
  const here = document.body.dataset.page || '';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const euro = n => '€' + String(n).replace('.', ',');

  /* ── language ────────────────────────────────────────────────── */
  let lang = 'nl';
  try { lang = localStorage.getItem('ssdh-lang') === 'en' ? 'en' : 'nl'; } catch (e) {}
  const T = {
    openNow: ['Nu open · tot ', 'Open now · until '], opensAt: ['Gesloten · opent om ', 'Closed · opens at '],
    opens: ['Gesloten · ', 'Closed · '], openAt: [' open om ', ' opens at '], tomorrow: ['morgen', 'tomorrow'],
    closed: ['Gesloten', 'Closed'], from: ['vanaf', 'from'], onRequest: ['op aanvraag', 'on request'], included: ['inbegrepen', 'included'],
    brandsLbl: ['Alle merken, onder andere', 'All brands, among them'],
    month: ['1 maand geleden', '1 month ago'], months: [' maanden geleden', ' months ago'],
    stars: ['5 van 5 sterren', '5 out of 5 stars']
  };
  const t = k => T[k][lang === 'en' ? 1 : 0];
  const nl = (a, b) => lang === 'en' ? b : a;
  const en = (a, b) => a === b ? '' : ' data-en="' + esc(b) + '"';

  const WA = '<span class="wa"><svg viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg></span>';
  const LINKS = [['diensten', '#diensten', 'Diensten', 'Services'], ['prijzen', 'prijzen/', 'Prijzen', 'Prices'], ['schade', 'schadeherstel/', 'Schadeherstel', 'Damage repair'], ['over', '#over', 'Over ons', 'About us'], ['contact', '#contact', 'Contact', 'Contact']];
  const href = h => h.startsWith('#') ? (here === 'home' ? h : root + h) : root + h;
  const links = () => LINKS.map(([k, h, a, b]) => '<a href="' + href(h) + '"' + (k === here ? ' class="on"' : '') + en(a, b) + '>' + a + '</a>').join('');
  const langPill = '<div class="lang" role="group" aria-label="Taal / Language"><button type="button" data-lang="nl" lang="nl">NL</button><button type="button" data-lang="en" lang="en">EN</button></div>';

  /* ── nav, menu, footer, phone bar ────────────────────────────── */
  const navEl = $('[data-nav]');
  if (navEl) navEl.innerHTML = '<div class="wrap nav-in">' +
    '<a class="nav-logo" href="' + root + '" aria-label="Scootershop Den Haag, home"><img src="' + root + 'assets/mark.svg" alt="" width="34" height="42"><span>Scootershop Den Haag</span></a>' +
    '<nav class="nav-links" aria-label="Hoofdmenu">' + links() + '</nav>' +
    '<div class="nav-cta">' + langPill +
    '<a class="btn sm line tel" data-tel href="#"><span data-tel="text"></span></a>' +
    '<a class="btn sm green" data-wa="default" href="#" target="_blank" rel="noopener">' + WA + '<span>WhatsApp</span></a>' +
    '<button class="nav-burger" aria-label="Menu" aria-expanded="false" data-menu-open><i></i></button></div></div>';
  const menuEl = $('[data-menu]');
  if (menuEl) menuEl.innerHTML = '<nav aria-label="Menu">' + links() + '</nav>' +
    '<div class="menu-foot"><div class="menu-row"><span class="openstate" data-openstate><i></i>…</span>' + langPill + '</div>' +
    '<a class="btn green" data-wa="default" href="#" target="_blank" rel="noopener">' + WA + '<span data-en="Send a WhatsApp">Stuur een WhatsApp</span></a>' +
    '<a class="btn line" data-tel href="#"><span><span data-en="Call">Bel</span> <span data-tel="text"></span></span></a></div>';
  const footEl = $('[data-foot]');
  if (footEl) footEl.innerHTML = '<div class="wrap foot-in">' +
    '<div><div class="brand"><img src="' + root + 'assets/mark.svg" alt="" width="30" height="37">Scootershop Den Haag</div>' +
    '<p data-en="Repairs, servicing, damage repair and inspections for every scooter. Piaggio and Vespa specialist on the Marktweg, for over 15 years.">Reparatie, onderhoud, schadeherstel en keuringen voor alle scooters. Piaggio- en Vespa-specialist aan de Marktweg, al meer dan 15 jaar.</p></div>' +
    '<div><h4 data-en="Quick links">Snel naar</h4><ul>' +
    '<li><a href="' + href('#diensten') + '" data-en="Services">Diensten</a></li><li><a href="' + root + 'prijzen/" data-en="Prices">Prijzen</a></li>' +
    '<li><a href="' + root + 'schadeherstel/" data-en="Damage repair">Schadeherstel</a></li><li><a href="' + href('#reviews') + '">Reviews</a></li>' +
    '<li><a href="' + root + 'privacy/">Privacy</a></li></ul></div>' +
    '<div><h4>Contact</h4><ul>' +
    '<li><a data-route href="#" target="_blank" rel="noopener">' + esc(D.address.street + ', ' + D.address.zip + ' ' + D.address.city) + '</a></li>' +
    '<li><a data-tel href="#"><span data-tel="text"></span></a></li>' +
    '<li><a data-wa="default" href="#" target="_blank" rel="noopener">WhatsApp</a></li>' +
    '<li><a data-mail href="#"><span data-mail="text"></span></a></li>' +
    '<li><a href="' + esc(D.instagram) + '" target="_blank" rel="noopener">Instagram</a></li>' +
    '<li><a href="' + esc(D.facebook) + '" target="_blank" rel="noopener">Facebook</a></li></ul></div></div>' +
    '<div class="wrap foot-bot"><span>© ' + new Date().getFullYear() + ' Scootershop Den Haag</span><span><span data-en="Website by">Website door</span> <a href="https://webkreatives.com">WebKreatives</a></span></div>';
  const barEl = $('[data-bar]');
  if (barEl) {
    barEl.innerHTML = '<a class="btn green" data-wa="default" href="#" target="_blank" rel="noopener">' + WA + '<span>WhatsApp</span></a>' +
      '<a class="btn line" data-tel href="#"><span data-en="Call us">Bel ons</span></a>';
    document.body.classList.add('has-bar');
  }

  /* ── contact hooks; re-run after a language swap, which can
        re-create these nodes from data-en ──────────────────────── */
  function fillStatic() {
  $$('[data-tel]').forEach(a => { a.href = 'tel:' + D.phoneRaw; });
  $$('[data-tel="text"]').forEach(s => { s.textContent = D.phone; });
  $$('[data-mail]').forEach(a => { a.href = 'mailto:' + D.email; });
  $$('[data-mail="text"]').forEach(s => { s.textContent = D.email; });
  $$('[data-route]').forEach(a => { a.href = D.mapsUrl; });
  $$('[data-google]').forEach(el => {
    const k = el.dataset.google;
    el.textContent = k === 'count' ? D.google.count : String(D.google.rating).replace('.', lang === 'en' ? '.' : ',');
  });
  $$('[data-open-at]').forEach(el => { el.textContent = D.hours[0].open; });
  $$('[data-close-at]').forEach(el => { el.textContent = D.hours[0].close; });
  }

  /* ── everything that reads in two languages ──────────────────── */
  const hh = s => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
  const dayIdx = () => (new Date().getDay() + 6) % 7; // Monday = 0
  const dayName = d => lang === 'en' ? d.en : d.d;
  function openState() {
    const now = new Date(), i = dayIdx(), mins = now.getHours() * 60 + now.getMinutes();
    const today = D.hours[i];
    if (today.open && mins >= hh(today.open) && mins < hh(today.close)) return { on: true, text: t('openNow') + '<span class="num">' + today.close + '</span>' };
    if (today.open && mins < hh(today.open)) return { on: false, text: t('opensAt') + '<span class="num">' + today.open + '</span>' };
    for (let k = 1; k <= 7; k++) {
      const d = D.hours[(i + k) % 7];
      if (d.open) return { on: false, text: t('opens') + (k === 1 ? t('tomorrow') : dayName(d).toLowerCase()) + t('openAt') + '<span class="num">' + d.open + '</span>' };
    }
    return { on: false, text: t('closed') };
  }
  function renderOpen() {
    const s = openState();
    $$('[data-openstate]').forEach(el => { el.classList.toggle('on', s.on); el.innerHTML = '<i></i><span>' + s.text + '</span>'; });
  }
  function renderHours() {
    const i = dayIdx();
    $$('[data-hours]').forEach(tb => {
      tb.innerHTML = D.hours.map((d, k) => '<tr class="' + (k === i ? 'today ' : '') + (d.open ? '' : 'closed') + '"><td>' + dayName(d) + '</td><td>' +
        (d.open ? d.open + ' – ' + d.close : t('closed')) + '</td></tr>').join('');
    });
  }
  const rowName = r => lang === 'en' && r.en ? r.en : r.name;
  const rowNote = r => lang === 'en' && r.noteEn ? r.noteEn : r.note;
  const priceHtml = r => {
    if (r.price === null) return '<span class="val"><span class="from">' + esc(rowNote(r) || t('onRequest')) + '</span></span>';
    if (r.price === 0) return '<span class="val"><span class="from">' + esc(rowNote(r) || t('included')) + '</span></span>';
    return '<span class="val">' + (r.was ? '<span class="was">' + euro(r.was) + '</span>' : '') + (r.from ? '<span class="from">' + t('from') + '</span>' : '') + '<span class="num">' + euro(r.price) + '</span></span>';
  };
  function renderPrices() {
    $$('[data-prices]').forEach(el => {
      const list = D[el.dataset.prices] || [];
      el.innerHTML = list.map(r => '<div class="plist-row"><span class="name">' + esc(rowName(r)) +
        (r.note && r.price ? '<span class="note">' + esc(rowNote(r)) + '</span>' : '') + '</span>' + priceHtml(r) + '</div>').join('');
    });
    $$('[data-service="price"]').forEach(el => { el.textContent = euro(D.service.price); });
    $$('[data-service="was"]').forEach(el => { if (D.service.was) el.textContent = euro(D.service.was); else el.hidden = true; });
    $$('[data-service="name"]').forEach(el => { el.textContent = nl(D.service.name, D.service.en); });
    $$('[data-service="note"]').forEach(el => { el.textContent = nl(D.service.note, D.service.noteEn); });
    $$('[data-checklist]').forEach(el => { el.innerHTML = (lang === 'en' ? D.service.checklistEn : D.service.checklist).map(c => '<li>' + esc(c) + '</li>').join(''); });
    $$('[data-price]').forEach(el => {
      const [list, idx] = el.dataset.price.split('.');
      const r = (D[list] || [])[+idx]; if (!r) return;
      el.innerHTML = (r.was ? '<span class="was">' + euro(r.was) + '</span>' : '') + (r.from ? '<span class="from">' + t('from') + '</span>' : '') + '<span class="num">' + euro(r.price) + '</span>';
    });
    $$('[data-brands]').forEach(el => { el.innerHTML = '<li class="lbl">' + t('brandsLbl') + '</li>' + D.brands.map(b => '<li>' + esc(b) + '</li>').join(''); });
  }
  function renderReviews() {
    $$('[data-reviews]').forEach(el => {
      el.innerHTML = D.reviews.map(r => '<article class="review in">' +
        '<span class="stars" aria-label="' + t('stars') + '">★★★★★</span>' +
        '<blockquote>' + esc(lang === 'en' && r.en ? r.en : r.text) + '</blockquote>' +
        '<footer><b>' + esc(r.name) + '</b><span>Google · ' + (r.ago === 1 ? t('month') : r.ago + t('months')) + '</span></footer></article>').join('');
    });
  }
  function renderWa() {
    const set = lang === 'en' && D.waEn ? D.waEn : D.wa;
    $$('[data-wa]').forEach(a => {
      const key = a.dataset.wa || 'default';
      a.href = 'https://wa.me/' + D.whatsapp + '?text=' + encodeURIComponent(set[key] || set.default);
    });
  }
  const titleNl = document.title, titleEn = document.documentElement.dataset.titleEn || document.title;
  function applyLang(l, store) {
    lang = l; document.documentElement.lang = l;
    if (store) try { localStorage.setItem('ssdh-lang', l); } catch (e) {}
    $$('[data-en]').forEach(el => {
      if (!el.hasAttribute('data-nl')) el.setAttribute('data-nl', el.innerHTML);
      el.innerHTML = el.getAttribute(l === 'en' ? 'data-en' : 'data-nl');
    });
    $$('[data-en-alt]').forEach(el => { // image alt text in two languages
      if (!el.hasAttribute('data-nl-alt')) el.setAttribute('data-nl-alt', el.getAttribute('alt'));
      el.setAttribute('alt', el.getAttribute(l === 'en' ? 'data-en-alt' : 'data-nl-alt'));
    });
    $$('[data-lang]').forEach(b => { b.classList.toggle('on', b.dataset.lang === l); b.setAttribute('aria-pressed', b.dataset.lang === l); });
    document.title = l === 'en' ? titleEn : titleNl;
    fillStatic(); renderOpen(); renderHours(); renderPrices(); renderReviews(); renderWa();
  }
  $$('[data-lang]').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang, true)));
  applyLang(lang, false);
  setInterval(renderOpen, 60000);

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
