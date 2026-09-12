/* Auto District — behaviour. No dependencies. */
(function () {
  const AD = window.AD || {};
  const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];

  /* ── nav ─────────────────────────────────────────────────────────── */
  const nav = $('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', scrollY > 24);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    const burger = $('.nav-burger', nav);
    if (burger) burger.addEventListener('click', () => nav.classList.toggle('open'));
    $$('.nav-links a', nav).forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
    /* highlight the section in view */
    const targets = $$('.nav-links a[href^="#"], .subnav a[href^="#"]').map(a => [a, $(a.getAttribute('href'))]).filter(x => x[1]);
    if (targets.length && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        targets.forEach(([a, el]) => a.classList.toggle('on', el === e.target));
      }), { rootMargin: '-40% 0px -55% 0px' });
      targets.forEach(([, el]) => io.observe(el));
    }
  }

  /* ── reveals ─────────────────────────────────────────────────────── */
  const rv = $$('[data-rv], .lift, .art');
  if (reduced) rv.forEach(el => el.classList.add('in'));
  else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .18, rootMargin: '0px 0px -6% 0px' });
    rv.forEach(el => io.observe(el));
    setTimeout(() => rv.forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in'); }), 2500);
  } else rv.forEach(el => el.classList.add('in'));

  /* ── the dashboard: fault → diagnosis → fixed, on a loop ─────────── */
  const dash = $('.dash');
  if (dash && !reduced) {
    const lamps = $$('.lamp', dash), needles = $$('.needle', dash), arcs = $$('.g-arc', dash);
    const status = $('.status', dash), chip = $('.chip', dash), wrench = $('.wrench', dash);
    const nums = $$('.num', dash);
    const setNeedle = (i, deg, val) => { needles[i].style.transform = 'rotate(' + deg + 'deg)'; if (nums[i]) nums[i].textContent = val; if (arcs[i]) arcs[i].style.strokeDasharray = Math.max(1, deg + 120) + ' 1000'; };
    const say = (t, good) => { status.textContent = t; status.classList.toggle('good', !!good); chip.classList.toggle('good', !!good); $('.chip span', dash).textContent = t; };
    const faults = [['Motorstoring gemeld', [0, 1]], ['Accu laadt niet', [2]], ['ABS-melding', [3, 0]], ['Koelvloeistof te heet', [4]], ['Airco levert niets', [5]]];
    let k = 0;
    function cycle() {
      const [label, which] = faults[k % faults.length]; k++;
      lamps.forEach(l => l.classList.remove('on'));
      setNeedle(0, -20, '2.4'); setNeedle(1, 5, '48');
      say(label, false);
      which.forEach((i, j) => setTimeout(() => lamps[i].classList.add('on'), 120 + j * 260));
      setTimeout(() => { say('Uitlezen met ODIS / Autel…', false); dash.classList.add('run'); setNeedle(0, -95, '0.9'); setNeedle(1, -110, '0'); }, 1700);
      setTimeout(() => { dash.classList.remove('run'); wrench.classList.remove('go'); void wrench.getBBox(); wrench.classList.add('go'); }, 4300);
      setTimeout(() => { lamps.forEach(l => l.classList.remove('on')); lamps[6].classList.add('on'); say('Verholpen. Klaar voor de weg.', true); setNeedle(0, 10, '3.1'); setNeedle(1, 40, '80'); }, 5300);
      setTimeout(cycle, 8200);
    }
    setTimeout(() => { setNeedle(0, 10, '3.1'); setNeedle(1, 40, '80'); }, 300);
    setTimeout(cycle, 2200);
  }

  /* ── hours: table, today, and open-now ───────────────────────────── */
  const hoursEl = $('[data-hours]');
  if (hoursEl && AD.hours) {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Amsterdam' }));
    const today = (now.getDay() + 6) % 7; // Monday = 0
    hoursEl.innerHTML = AD.hours.map((h, i) => '<tr' + (i === today ? ' class="today"' : '') + '><td>' + h.d + '</td><td>' + (h.open ? h.open + ' – ' + h.close : (h.note || 'Gesloten')) + '</td></tr>').join('');
    const st = $('[data-openstate]');
    if (st) {
      const h = AD.hours[today]; const mins = now.getHours() * 60 + now.getMinutes();
      const toM = s => { const [a, b] = s.split(':').map(Number); return a * 60 + b; };
      let open = false, txt;
      if (h.open && mins >= toM(h.open) && mins < toM(h.close)) { open = true; txt = 'Nu open · sluit om ' + h.close; }
      else {
        let n = today, d = 0; do { n = (n + 1) % 7; d++; } while (!AD.hours[n].open && d < 7);
        const nh = AD.hours[n];
        txt = h.open && mins < toM(h.open) ? 'Gesloten · opent om ' + h.open : 'Gesloten · opent ' + (d === 1 ? 'morgen' : nh.d.toLowerCase()) + ' ' + nh.open;
      }
      st.innerHTML = '<i></i>' + txt; st.classList.toggle('closed', !open);
    }
  }

  /* ── team ────────────────────────────────────────────────────────── */
  const teamEl = $('[data-team]');
  if (teamEl && AD.team) {
    teamEl.innerHTML = AD.team.map((m, i) => '<div class="member" data-rv data-d="' + (i + 1) + '"><div class="av">' + (m.photo ? '<img src="' + m.photo + '" alt="' + m.name + '">' : m.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()) + '</div><div><b>' + m.name + '</b><span>' + m.role + '</span></div></div>').join('');
  }

  /* ── reviews: the badge, the highlighted three, and Google live ──── */
  const stars = n => '★★★★★'.slice(0, Math.round(n)) + '☆☆☆☆☆'.slice(0, 5 - Math.round(n));
  const badge = $('[data-gbadge]');
  const paintBadge = (rating, count) => { if (!badge) return; $('b', badge).textContent = rating.toFixed(1).replace('.', ','); $('.stars', badge).textContent = stars(rating); $('small', badge).textContent = 'op basis van ' + count + ' Google-reviews'; };
  if (AD.google) paintBadge(AD.google.rating, AD.google.count);
  const revEl = $('[data-reviews]');
  if (revEl && AD.reviews) {
    revEl.innerHTML = AD.reviews.map((r, i) => '<article class="rev' + (/^Naam klant/.test(r.name) ? ' ph' : '') + '" data-rv data-d="' + (i + 1) + '"><span class="q">“</span><div class="stars">' + stars(r.stars) + '</div><p>' + r.text + '</p><div class="who"><div class="av">' + (r.photo ? '<img src="' + r.photo + '" alt="' + r.name + '">' : r.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()) + '</div><div><b>' + r.name + '</b><span>' + r.when + '</span></div></div></article>').join('');
  }
  const live = $('[data-greviews]');
  if (live && AD.google && AD.google.placesKey && AD.placeId) {
    fetch('https://places.googleapis.com/v1/places/' + AD.placeId + '?fields=rating,userRatingCount,reviews&languageCode=nl&key=' + AD.google.placesKey)
      .then(r => r.json()).then(d => {
        if (d.rating) paintBadge(d.rating, d.userRatingCount || AD.google.count);
        if (d.reviews && d.reviews.length) {
          live.innerHTML = d.reviews.slice(0, 5).map(r => '<article class="rev"><div class="stars">' + stars(r.rating) + '</div><p>' + ((r.text && r.text.text) || '').slice(0, 260) + '</p><div class="who"><div class="av">' + (r.authorAttribution && r.authorAttribution.photoUri ? '<img src="' + r.authorAttribution.photoUri + '" alt="">' : '★') + '</div><div><b>' + ((r.authorAttribution && r.authorAttribution.displayName) || 'Google-gebruiker') + '</b><span>' + (r.relativePublishTimeDescription || 'Google') + '</span></div></div></article>').join('');
          live.closest('[data-greviews-wrap]').hidden = false;
        }
      }).catch(() => {});
  }

  /* ── contact details from data ───────────────────────────────────── */
  $$('[data-tel]').forEach(a => { a.href = 'tel:' + AD.phoneRaw; if (a.dataset.tel === 'text') a.textContent = AD.phone; });
  $$('[data-wa]').forEach(a => { a.href = 'https://wa.me/' + AD.whatsapp + '?text=' + encodeURIComponent('Hallo Auto District, ik wil graag een afspraak maken.'); });
  $$('[data-mail]').forEach(a => { a.href = 'mailto:' + AD.email; if (a.dataset.mail === 'text') a.textContent = AD.email; });
  $$('[data-addr]').forEach(el => { el.innerHTML = '<b>' + AD.name + '</b><br>' + AD.address.street + '<br>' + AD.address.zip + ' ' + AD.address.city; });
  $$('[data-route]').forEach(a => { a.href = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(AD.mapsQuery); });
  $$('[data-greview-link]').forEach(a => { a.href = 'https://search.google.com/local/reviews?placeid=' + AD.placeId; });
  $$('[data-gwrite]').forEach(a => { a.href = 'https://search.google.com/local/writereview?placeid=' + AD.placeId; });
  $$('[data-kvk]').forEach(el => { el.innerHTML = 'KVK ' + AD.kvk + ' · BTW ' + AD.btw; });
  const map = $('[data-map]');
  if (map) map.innerHTML = '<iframe loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Kaart" src="https://www.google.com/maps?q=' + encodeURIComponent(AD.mapsQuery) + '&z=15&output=embed"></iframe>';
})();
