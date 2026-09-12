/* Auto District — behaviour. No dependencies. */
(function () {
  const AD = window.AD || {};
  const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];


  /* ── one nav and one footer, drawn on every page ─────────────────── */
  const root = document.body.dataset.root || '';
  const here = document.body.dataset.page || '';
  const ARROW = '<span class="ic"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>';
  const LINKS = [['home', '#top', 'Home', 'Home'], ['diensten', '#diensten', 'Diensten', 'Services'], ['team', '#team', 'Over ons', 'About us'], ['contact', '#contact', 'Contact', 'Contact']];
  const links = () => LINKS.map(([k, h, nl, en]) => '<a href="' + root + h + '"' + (k === here ? ' class="on"' : '') + (nl !== en ? ' data-en="' + en + '"' : '') + '>' + nl + '</a>').join('');
  const langPill = '<div class="lang" role="group" aria-label="Taal"><button type="button" data-lang="nl">NL</button><button type="button" data-lang="en">EN</button></div>';
  const navEl = $('[data-nav]');
  if (navEl) navEl.innerHTML = '<div class="nav-in">' +
    '<a class="nav-logo" href="' + root + '" aria-label="Auto District"><img src="' + root + 'assets/logo.png" alt="Auto District"></a>' +
    '<nav class="nav-links">' + links() + '</nav>' +
    '<div class="nav-cta">' + langPill +
    '<a class="btn sm plain tel" data-tel href="#"><span data-tel="text"></span></a>' +
    '<a class="btn sm red" data-wa href="#" target="_blank" rel="noopener"><span data-en="Book now">Afspraak maken</span>' + ARROW + '</a>' +
    '<button class="nav-burger" aria-label="Menu" data-menu-open><i></i></button></div></div>';
  const menuEl = $('[data-menu]');
  if (menuEl) menuEl.innerHTML = '<button class="menu-x" aria-label="Sluiten" data-menu-close><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button><div><nav>' + links() + '</nav>' +
    '<div class="menu-cta">' + langPill + '<a class="btn red" data-wa href="#" target="_blank" rel="noopener">WhatsApp' + ARROW + '</a><a class="btn plain" data-mail href="#"><span data-mail="text"></span></a></div></div>';
  const footEl = $('[data-footer]');
  if (footEl) footEl.innerHTML = '<div class="wrap foot-in">' +
    '<div><img src="' + root + 'assets/logo.png" alt="Auto District"><p data-en="RDW-approved garage in Poeldijk. Honest, clear dealings, quality and expertise first.">RDW-erkend garagebedrijf in Poeldijk. Eerlijk en helder zaken doen, kwaliteit en deskundigheid voorop.</p></div>' +
    '<div><h4 data-en="Services">Diensten</h4><ul>' + [['apk', 'APK-keuring', 'MOT (APK)'], ['onderhoud', 'Onderhoud', 'Maintenance'], ['reparatie', 'Reparatie', 'Repairs'], ['storingen', 'Storingen &amp; diagnose', 'Fault diagnosis'], ['dsg', 'DSG-versnellingsbak', 'DSG gearbox'], ['airco', 'Airco-service', 'Air conditioning'], ['banden', 'Banden', 'Tyres']].map(([a, nl, en]) => '<li><a href="' + root + '#' + a + '" data-en="' + en + '">' + nl + '</a></li>').join('') + '</ul></div>' +
    '<div><h4>Contact</h4><ul><li><a data-tel href="#"><span data-tel="text"></span></a></li><li><a data-mail href="#"><span data-mail="text"></span></a></li><li><a data-route href="#" target="_blank" rel="noopener">Jupiter 39-B, 2685 LV Poeldijk</a></li><li><a href="' + root + '#contact" data-en="Opening hours">Openingstijden</a></li><li><a href="' + root + 'privacy/" data-en="Privacy">Privacyverklaring</a></li></ul></div></div>' +
    '<div class="wrap foot-bot"><span>© 2026 Auto District · <span data-kvk></span></span><span><span data-en="Website by">Website door</span> <a href="https://webkreatives.com" style="color:var(--txt-2)">WebKreatives</a></span></div>';

  /* ── language: Dutch is the page, English lives in data-en ──────── */
  const T = {
    days: { nl: ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'], en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    closed: { nl: 'Gesloten', en: 'Closed' }, byAppt: { nl: 'Op afspraak', en: 'By appointment' },
    openNow: { nl: 'Nu open · sluit om ', en: 'Open now · closes at ' }, opensAt: { nl: 'Gesloten · opent om ', en: 'Closed · opens at ' },
    opens: { nl: 'Gesloten · opent ', en: 'Closed · opens ' }, tomorrow: { nl: 'morgen', en: 'tomorrow' },
    basedOn: { nl: 'op basis van ', en: 'based on ' }, greviews: { nl: ' Google-reviews', en: ' Google reviews' },
    check: { nl: 'Systeemcheck', en: 'System check' },
    faults: { nl: [['Motorstoring gemeld', [0, 1]], ['Accu laadt niet', [2]], ['ABS-melding', [3, 0]], ['Koelvloeistof te heet', [4]], ['Bandenspanning te laag', [5]]],
              en: [['Engine fault reported', [0, 1]], ['Battery not charging', [2]], ['ABS warning', [3, 0]], ['Coolant too hot', [4]], ['Tyre pressure low', [5]]] },
    reading: { nl: 'Uitlezen met ODIS / Autel…', en: 'Reading out with ODIS / Autel…' }, fixed: { nl: 'Verholpen. Klaar voor de weg.', en: 'Fixed. Ready for the road.' },
    wa: { nl: 'Hallo Auto District, ik wil graag een afspraak maken.', en: 'Hello Auto District, I would like to book an appointment.' },
    phName: { nl: 'Naam klant', en: 'Customer name' }, phWhen: { nl: 'Google · datum', en: 'Google · date' },
    phText: { nl: 'Uitgelichte Google-review #. Tekst, naam en foto volgen van de klant.', en: 'Highlighted Google review #. Text, name and photo to follow from the client.' },
    viaGoogle: { nl: 'Klant via Google', en: 'Google customer' },
  };
  let lang = 'nl';
  try { lang = localStorage.getItem('ad-lang') === 'en' ? 'en' : 'nl'; } catch (e) {}
  const t = k => T[k][lang];

  function applyLang(l) {
    lang = l; document.documentElement.lang = l;
    try { localStorage.setItem('ad-lang', l); } catch (e) {}
    $$('[data-en]').forEach(el => {
      if (!el.hasAttribute('data-nl')) el.setAttribute('data-nl', el.innerHTML);
      el.innerHTML = el.getAttribute(l === 'en' ? 'data-en' : 'data-nl');
    });
    $$('[data-lang]').forEach(b => b.classList.toggle('on', b.dataset.lang === l));
    document.title = l === 'en' ? document.title.replace('RDW-erkend garagebedrijf in Poeldijk · APK, onderhoud, reparatie', 'RDW-approved garage in Poeldijk · MOT, maintenance, repairs') : document.title;
    renderHours(); renderReviews(); paintBadge(AD.google && AD.google.rating, AD.google && AD.google.count);
    $$('[data-wa]').forEach(a => { a.href = 'https://wa.me/' + AD.whatsapp + '?text=' + encodeURIComponent(t('wa')); });
  }
  $$('[data-lang]').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));

  /* ── nav + overlay menu ──────────────────────────────────────────── */
  const nav = $('[data-nav]'), menu = $('[data-menu]');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', scrollY > 30);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    const open = o => { nav.classList.toggle('open', o); if (menu) menu.classList.toggle('open', o); document.body.style.overflow = o ? 'hidden' : ''; };
    $$('[data-menu-open]').forEach(b => b.addEventListener('click', () => open(!nav.classList.contains('open'))));
    $$('[data-menu-close]').forEach(b => b.addEventListener('click', () => open(false)));
    if (menu) $$('nav a', menu).forEach(a => a.addEventListener('click', () => open(false)));
    addEventListener('keydown', e => { if (e.key === 'Escape') open(false); });
    // one page: the link whose section sits under the top third of the screen is the current one
    const targets = $$('.nav-links a[href^="#"], [data-menu] nav a[href^="#"]').map(a => [a, $(a.getAttribute('href'))]).filter(x => x[1]);
    if (targets.length) {
      let queued = false;
      const spy = () => {
        queued = false;
        const y = innerHeight * .36; let cur = null;
        targets.forEach(([, el]) => { const r = el.getBoundingClientRect(); if (r.top <= y && r.bottom > y) cur = el; });
        if (!cur && innerHeight + scrollY >= document.documentElement.scrollHeight - 2) cur = targets[targets.length - 1][1];
        targets.forEach(([a, el]) => a.classList.toggle('on', el === cur));
      };
      const ask = () => { if (!queued) { queued = true; requestAnimationFrame(spy); } };
      addEventListener('scroll', ask, { passive: true }); addEventListener('resize', ask); addEventListener('load', spy); spy();
    }
  }

  /* ── services: every row folds open on the page itself ──────────── */
  const rows = $$('.svc-list .row');
  function rowOpen(row, o) {
    row.classList.toggle('open', o);
    $('.row-hd', row).setAttribute('aria-expanded', o);
    const art = $('.art', row);
    if (o && art) { art.classList.remove('in'); void art.offsetWidth; art.classList.add('in'); }
  }
  rows.forEach(row => $('.row-hd', row).addEventListener('click', () => rowOpen(row, !row.classList.contains('open'))));
  const rowFor = h => { if (!h || h.length < 2) return null; const el = $(h); return el && rows.includes(el) ? el : null; };
  const openHash = () => { const row = rowFor(location.hash); if (row) rowOpen(row, true); };
  openHash(); addEventListener('hashchange', openHash);
  document.addEventListener('click', e => { const a = e.target.closest('a[href^="#"]'); const row = a && rowFor(a.getAttribute('href')); if (row) rowOpen(row, true); });

  /* ── reveals ─────────────────────────────────────────────────────── */
  const rv = $$('[data-rv], .lift, .art');
  if (reduced) rv.forEach(el => el.classList.add('in'));
  else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15, rootMargin: '0px 0px -6% 0px' });
    rv.forEach(el => io.observe(el));
    setTimeout(() => rv.forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in'); }), 2500);
  } else rv.forEach(el => el.classList.add('in'));

  /* ── spotlight borders follow the pointer ────────────────────────── */
  if (fine) $$('[data-spot]').forEach(el => el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  }, { passive: true }));

  /* ── the cluster: a fault loop, and the pointer takes the wheel ──── */
  const dash = $('.dash');
  if (dash && !reduced) {
    const lamps = $$('.lamp', dash), needles = $$('.needle', dash), arcs = $$('.g-arc', dash), nums = $$('.num', dash);
    const status = $('.status', dash), chip = $('.chip', dash), chipTxt = $('.chip span', dash), wrench = $('.wrench', dash);
    const base = [10, 40];           // where the loop last left the needles
    const shown = [10, 40];          // what is on screen right now
    let hover = false, wob = 0;
    const draw = (i, deg) => { needles[i].style.transform = 'rotate(' + deg + 'deg)'; arcs[i].style.strokeDasharray = Math.max(1, deg + 120) + ' 1000'; };
    const label = (i, deg) => { nums[i].textContent = i === 0 ? ((deg + 120) / 240 * 8).toFixed(1) : String(Math.round((deg + 120) / 240 * 160)); };
    const setNeedle = (i, deg, val) => { base[i] = deg; if (!hover) { draw(i, deg); nums[i].textContent = val; } };
    const say = (txt, good) => { status.textContent = txt; status.classList.toggle('good', !!good); if (chip) { chip.classList.toggle('good', !!good); chipTxt.textContent = txt; } };

    /* idle: a living engine, never a still needle */
    (function idle(now) {
      wob = Math.sin(now / 420) * 1.1 + Math.sin(now / 137) * .4;
      if (!hover) { shown[0] = base[0] + wob; shown[1] = base[1] + wob * .5; draw(0, shown[0]); draw(1, shown[1]); }
      requestAnimationFrame(idle);
    })(0);

    /* pointer: x revs the engine, y drives the speed; the tray tilts */
    const wrap = dash.parentElement;
    if (fine) {
      wrap.addEventListener('pointerenter', () => { hover = true; dash.classList.add('live'); });
      wrap.addEventListener('pointermove', e => {
        const r = dash.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width * 2 - 1, ny = (e.clientY - r.top) / r.height * 2 - 1;
        dash.style.setProperty('--ry', (nx * 9) + 'deg'); dash.style.setProperty('--rx', (-ny * 7) + 'deg');
        dash.style.setProperty('--gx', ((nx + 1) * 50) + '%'); dash.style.setProperty('--gy', ((ny + 1) * 50) + '%');
        const rpm = -120 + (nx + 1) / 2 * 215, spd = -120 + (1 - ny) / 2 * 200;
        draw(0, rpm); draw(1, spd); label(0, rpm); label(1, spd);
      }, { passive: true });
      wrap.addEventListener('pointerleave', () => {
        hover = false; dash.classList.remove('live');
        dash.style.setProperty('--rx', '0deg'); dash.style.setProperty('--ry', '0deg');
        draw(0, base[0]); draw(1, base[1]); label(0, base[0]); label(1, base[1]);
      });
    }

    let k = 0;
    function cycle() {
      const [txt, which] = t('faults')[k % 5]; k++;
      lamps.forEach(l => l.classList.remove('on'));
      setNeedle(0, -20, '2.4'); setNeedle(1, 5, '48'); say(txt, false);
      which.forEach((i, j) => setTimeout(() => lamps[i].classList.add('on'), 120 + j * 260));
      setTimeout(() => { say(t('reading'), false); dash.classList.add('run'); setNeedle(0, -95, '0.9'); setNeedle(1, -110, '0'); }, 1700);
      setTimeout(() => { dash.classList.remove('run'); wrench.classList.remove('go'); void wrench.getBBox(); wrench.classList.add('go'); }, 4300);
      setTimeout(() => { lamps.forEach(l => l.classList.remove('on')); lamps[6].classList.add('on'); say(t('fixed'), true); setNeedle(0, 10, '3.1'); setNeedle(1, 40, '80'); }, 5300);
      setTimeout(cycle, 8400);
    }
    setTimeout(() => { setNeedle(0, 10, '3.1'); setNeedle(1, 40, '80'); }, 300);
    setTimeout(cycle, 2200);
  }

  /* ── hours ───────────────────────────────────────────────────────── */
  function renderHours() {
    const hoursEl = $('[data-hours]'); if (!AD.hours) return;
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Amsterdam' }));
    const today = (now.getDay() + 6) % 7;
    if (hoursEl) hoursEl.innerHTML = AD.hours.map((h, i) => '<tr' + (i === today ? ' class="today"' : '') + '><td>' + t('days')[i] + '</td><td>' + (h.open ? h.open + ' – ' + h.close : (h.note ? t('byAppt') : t('closed'))) + '</td></tr>').join('');
    const sts = $$('[data-openstate]'); if (!sts.length) return;
    const h = AD.hours[today], mins = now.getHours() * 60 + now.getMinutes();
    const toM = s => { const [a, b] = s.split(':').map(Number); return a * 60 + b; };
    let open = false, txt;
    if (h.open && mins >= toM(h.open) && mins < toM(h.close)) { open = true; txt = t('openNow') + h.close; }
    else {
      let n = today, d = 0; do { n = (n + 1) % 7; d++; } while (!AD.hours[n].open && d < 7);
      txt = h.open && mins < toM(h.open) ? t('opensAt') + h.open : t('opens') + (d === 1 ? t('tomorrow') : t('days')[n].toLowerCase()) + ' ' + AD.hours[n].open;
    }
    sts.forEach(st => { st.innerHTML = '<i></i>' + txt; st.classList.toggle('closed', !open); });
  }
  setInterval(renderHours, 60000);

  /* ── reviews ─────────────────────────────────────────────────────── */
  const stars = n => '★★★★★'.slice(0, Math.round(n)) + '☆☆☆☆☆'.slice(0, 5 - Math.round(n));
  const badge = $('[data-gbadge]');
  function paintBadge(rating, count) { if (!badge || !rating) return; $('b', badge).textContent = rating.toFixed(1).replace('.', ','); $('.stars', badge).textContent = stars(rating); $('small', badge).textContent = t('basedOn') + count + t('greviews'); }
  let rcarIdx = 0, rcarTimer = 0, rcarUser = false;
  function renderReviews() {
    const el = $('[data-reviews]'); if (!el || !AD.reviews) return;
    const list = AD.reviews.slice(0, 5);
    el.innerHTML = list.map((r, i) => {
      const ph = !r.text || /^Naam klant/.test(r.name);
      const name = ph ? t('phName') : (r.name || t('viaGoogle')), when = ph ? t('phWhen') : (r.when || 'Google'), text = ph ? t('phText').replace('#', i + 1) : r.text;
      const slot = '<span>' + (lang === 'en' ? 'Photo' : 'Foto') + ' ' + (i + 1) + '</span>';
      const pic = r.photo ? '<img src="' + root + r.photo + '" alt="" decoding="async" onerror="this.remove()">' + slot : slot;
      return '<article class="rslide"><div class="pic">' + pic + '</div><div class="txt"><div class="stars">' + stars(r.stars) + '</div><blockquote>' + text + '</blockquote><div class="who"><b>' + name + '</b>' + (when ? '<span>' + when + '</span>' : '') + '</div></div></article>';
    }).join('');
    const dots = $('[data-rcar-dots]');
    if (dots) dots.innerHTML = list.map((_, i) => '<button type="button" data-go="' + i + '" aria-label="Review ' + (i + 1) + '"></button>').join('');
    rcarGo(rcarIdx, false);
  }
  function rcarGo(i, byUser) {
    const track = $('[data-reviews]'); if (!track) return;
    const n = track.children.length; if (!n) return;
    rcarIdx = (i + n) % n;
    track.style.transform = 'translateX(' + (-rcarIdx * 100) + '%)';
    $$('[data-rcar-dots] button').forEach((d, j) => d.classList.toggle('on', j === rcarIdx));
    const cur = $('[data-rcar-cur]'); if (cur) cur.textContent = String(rcarIdx + 1).padStart(2, '0');
    if (byUser) { rcarUser = true; clearTimeout(rcarTimer); }
    rcarFit();
  }
  // on phones the slides stack, so the frame follows the current slide's height instead of the tallest one
  function rcarFit() {
    const track = $('[data-reviews]'), car = $('[data-rcar]'); if (!track || !car || !track.children.length) return;
    car.style.height = window.matchMedia('(max-width:820px)').matches ? track.children[rcarIdx].offsetHeight + 'px' : '';
  }
  (function rcarInit() {
    const nav = $('[data-rcar-nav]'), car = $('[data-rcar]'); if (!nav || !car) return;
    $$('.rcar-btn', nav).forEach(b => b.addEventListener('click', () => rcarGo(rcarIdx + (+b.dataset.dir), true)));
    nav.addEventListener('click', e => { const d = e.target.closest('[data-go]'); if (d) rcarGo(+d.dataset.go, true); });
    window.addEventListener('resize', rcarFit); window.addEventListener('load', rcarFit);
    let x0 = null;
    car.addEventListener('pointerdown', e => { x0 = e.clientX; }, { passive: true });
    car.addEventListener('pointerup', e => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 40) rcarGo(rcarIdx + (dx < 0 ? 1 : -1), true); }, { passive: true });
    let over = false; car.addEventListener('pointerenter', () => { over = true; }); car.addEventListener('pointerleave', () => { over = false; });
    if (!reduced) (function tick() { rcarTimer = setTimeout(() => { if (!rcarUser && !over && !document.hidden) rcarGo(rcarIdx + 1, false); tick(); }, 7000); })();
  })();
  const live = $('[data-greviews]');
  if (live && AD.google && AD.google.placesKey && AD.placeId) {
    fetch('https://places.googleapis.com/v1/places/' + AD.placeId + '?fields=rating,userRatingCount,reviews&languageCode=' + lang + '&key=' + AD.google.placesKey)
      .then(r => r.json()).then(d => {
        if (d.rating) { AD.google.rating = d.rating; AD.google.count = d.userRatingCount || AD.google.count; paintBadge(d.rating, AD.google.count); }
        if (d.reviews && d.reviews.length) {
          live.innerHTML = d.reviews.slice(0, 5).map(r => '<article class="rev"><div class="core"><div class="stars">' + stars(r.rating) + '</div><p>' + ((r.text && r.text.text) || '').slice(0, 260) + '</p><div class="who"><div class="av">' + (r.authorAttribution && r.authorAttribution.photoUri ? '<img src="' + r.authorAttribution.photoUri + '" alt="">' : '★') + '</div><div><b>' + ((r.authorAttribution && r.authorAttribution.displayName) || 'Google') + '</b><span>' + (r.relativePublishTimeDescription || 'Google') + '</span></div></div></div></article>').join('');
          live.closest('[data-greviews-wrap]').hidden = false;
        }
      }).catch(() => {});
  }

  /* ── details from data ───────────────────────────────────────────── */
  $$('[data-tel]').forEach(a => { a.href = 'tel:' + AD.phoneRaw; if (a.dataset.tel === 'text') a.textContent = AD.phone; });
  $$('[data-mail]').forEach(a => { a.href = 'mailto:' + AD.email; if (a.dataset.mail === 'text') a.textContent = AD.email; });
  $$('[data-addr]').forEach(el => { el.innerHTML = '<b>' + AD.name + '</b><br>' + AD.address.street + '<br>' + AD.address.zip + ' ' + AD.address.city; });
  $$('[data-route]').forEach(a => { a.href = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(AD.mapsQuery); });
  $$('[data-greview-link]').forEach(a => { a.href = 'https://search.google.com/local/reviews?placeid=' + AD.placeId; });
  $$('[data-gwrite]').forEach(a => { a.href = 'https://search.google.com/local/writereview?placeid=' + AD.placeId; });
  $$('[data-kvk]').forEach(el => { el.innerHTML = 'KVK ' + AD.kvk; });
  const map = $('[data-map]');
  if (map) map.innerHTML = '<iframe loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Kaart" src="https://www.google.com/maps?q=' + encodeURIComponent(AD.mapsQuery) + '&z=15&output=embed"></iframe>';

  applyLang(lang);
})();
