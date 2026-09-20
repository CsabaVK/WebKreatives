/* Formasons Estates — renders the lists from data.js, the nav, the reveals
   and the demo forms. The 3D mark lives in mark.js. */
(function () {
  var D = window.FORMASONS, base = document.body.dataset.base || '';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  /* One floor plan, drawn six times: the rooms are the same, the green
     highlight is what the family touches. Ink hairlines on stone. */
  var ROOMS = { lobby: [20, 150, 90, 70], m1: [20, 20, 90, 65], m2: [20, 85, 90, 65], office: [110, 20, 190, 130], corr: [110, 150, 190, 25], kitchen: [110, 175, 190, 45], plant: [300, 20, 80, 50], store: [300, 70, 80, 80], wc: [300, 150, 80, 70] };
  var LABELS = { lobby: 'Lobby', m1: 'Meeting', m2: 'Meeting', office: 'Office', kitchen: 'Kitchen', plant: 'Plant', store: 'Store', wc: 'WC' };
  var PLANS = {
    cleaning: { rooms: ['office', 'm1', 'm2', 'lobby', 'corr', 'kitchen', 'wc'], hatch: true },
    maintenance: { rooms: ['plant'], extra: '<path class="hl" d="M340 70V150M110 45H20M300 100H380" stroke-dasharray="4 4"/><rect class="hl" x="20" y="226" width="360" height="12"/>' },
    security: { rooms: ['lobby'], extra: '<rect class="hl line" x="20" y="20" width="360" height="200" stroke-width="3"/>' + [[26, 26], [374, 26], [374, 214], [26, 214], [110, 150]].map(function (c) { return '<circle class="hl" cx="' + c[0] + '" cy="' + c[1] + '" r="4"/>'; }).join('') },
    handyman: { rooms: [], extra: [[65, 150], [110, 60], [300, 110], [205, 175], [355, 220], [150, 20]].map(function (c) { return '<path class="hl" d="M' + (c[0] - 5) + ' ' + (c[1] - 5) + 'l10 10M' + (c[0] + 5) + ' ' + (c[1] - 5) + 'l-10 10" stroke-width="2"/>'; }).join('') },
    washroom: { rooms: ['wc'], extra: [[312, 162], [332, 162], [352, 162], [312, 200], [352, 200]].map(function (c) { return '<rect class="hl" x="' + c[0] + '" y="' + c[1] + '" width="12" height="8"/>'; }).join('') },
    waste: { rooms: ['kitchen'], extra: '<rect class="hl" x="390" y="150" width="28" height="70" stroke-dasharray="3 3"/><path class="hl" d="M205 197H65V162M65 220V240H404V220" stroke-dasharray="4 3" stroke-width="1.5"/>' }
  };
  var plan = function (id) {
    var p = PLANS[id] || { rooms: [] }, n = 0;
    var rooms = Object.keys(ROOMS).map(function (k) {
      var r = ROOMS[k], hl = p.rooms.indexOf(k) >= 0;
      return '<rect x="' + r[0] + '" y="' + r[1] + '" width="' + r[2] + '" height="' + r[3] + '"' + (hl ? ' class="hl' + (p.hatch ? ' hatch' : '') + '" style="transition-delay:' + (n++ * 70) + 'ms"' : '') + '/>' +
        (LABELS[k] ? '<text x="' + (r[0] + 6) + '" y="' + (r[1] + 14) + '">' + LABELS[k] + '</text>' : '');
    }).join('');
    return '<svg class="plan" viewBox="0 0 420 248" aria-hidden="true"><defs><pattern id="h-' + id + '" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6"/><line x1="0" y1="0" x2="0" y2="6"/></pattern></defs>' +
      rooms + '<rect x="20" y="20" width="360" height="200" class="wall"/><path d="M60 220v-14M300 175h-14M300 100v14" class="door"/>' + (p.extra || '') + '</svg>';
  };

  /* Facts that repeat on every page */
  document.querySelectorAll('[data-fact]').forEach(function (el) {
    var v = D[el.dataset.fact]; if (v == null) return;
    if (el.tagName === 'A' && el.dataset.fact === 'phone') el.href = 'tel:' + D.phoneRaw;
    if (el.tagName === 'A' && el.dataset.fact === 'phone2') el.href = 'tel:' + D.phone2Raw;
    if (el.tagName === 'A' && el.dataset.fact === 'email') el.href = 'mailto:' + D.email;
    el.textContent = v;
  });
  var addr = $('[data-address]');
  if (addr) addr.innerHTML = esc(D.address.street) + '<br>' + esc(D.address.area) + ', ' + esc(D.address.city) + ' ' + esc(D.address.postcode);
  var group = $('[data-group]');
  if (group) group.innerHTML = D.group.map(function (g) { return '<span>' + esc(g) + '</span>'; }).join('') + '<span>© ' + new Date().getFullYear() + ' ' + esc(D.name) + '. All rights reserved.</span>';

  /* Hero schedule */
  var sched = $('[data-schedule]');
  if (sched) sched.innerHTML = D.services.map(function (s, i) {
    return '<li><a href="' + (sched.dataset.schedule || '') + '#' + s.id + '"><span>' + pad(i + 1) + '</span><span>' + esc(s.name) + '</span><span>→</span></a></li>';
  }).join('');

  /* Service rows: the mark's slot alternates between the middle gutter and
     the row's end, so its path down the page is a zigzag. */
  var svc = $('[data-services]');
  if (svc) svc.innerHTML = D.services.map(function (s, i) {
    return '<article class="service reveal" id="' + s.id + '">' +
      '<span class="idx">' + pad(i + 1) + '</span>' +
      '<div class="name"><h3>' + esc(s.name) + '</h3><p>' + esc(s.note) + '</p></div>' +
      '<div class="mark-slot ' + (i % 2 ? 'slot-end' : 'slot-mid') + '" aria-hidden="true"></div>' +
      '<ul class="lines">' + s.lines.map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ul>' +
      plan(s.id) +
      '</article>';
  }).join('');

  /* Rows arrive after load, so a #cleaning link from elsewhere needs a nudge. */
  if (location.hash && svc) { var t = $(location.hash); if (t) t.scrollIntoView({ behavior: 'instant' }); }

  var week = $('[data-week]');
  if (week) week.innerHTML = D.sampleSchedule.map(function (r) {
    return '<li><span>' + r.day + '</span><span>' + esc(r.what) + '</span><span class="num">' + r.when + '</span></li>';
  }).join('');

  var ov = $('[data-overnight]');
  if (ov) {
    ov.innerHTML = D.overnight.map(function (n) {
      var l = n.side === 'l', x = l ? 20 : 580;
      return '<text x="' + x + '" y="' + (n.y + 4) + '">' + n.t + '</text><text x="' + x + '" y="' + (n.y + 22) + '" class="sub">' + esc(n.what) + '</text>' +
        (l ? '<line x1="150" y1="' + n.y + '" x2="230" y2="' + n.y + '"/>' : '<line x1="560" y1="' + n.y + '" x2="576" y2="' + n.y + '"/>');
    }).join('');
    /* Phones: crop the drawing to the building, the notes move to the list below. */
    var mq = matchMedia('(max-width: 899px)'), svg = ov.closest('svg');
    var crop = function () { svg.setAttribute('viewBox', mq.matches ? '214 20 362 372' : '0 0 760 400'); };
    mq.addEventListener('change', crop); crop();
    $('[data-overnight-list]').innerHTML = D.overnight.map(function (n) { return '<li><span class="num">' + n.t + '</span><span>' + esc(n.what) + '</span></li>'; }).join('');
  }

  var proc = $('[data-process]');
  if (proc) proc.innerHTML = D.process.map(function (p, i) {
    return '<li class="reveal"><span class="n">' + pad(i + 1) + '</span><div><h3>' + esc(p.name) + '</h3><p>' + esc(p.text) + '</p></div></li>';
  }).join('');

  var prom = $('[data-promises]');
  if (prom) prom.innerHTML = D.promises.map(function (p) { return '<li class="reveal">' + esc(p) + '</li>'; }).join('');

  var rec = $('[data-recognition]');
  if (rec) rec.innerHTML = D.recognition.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('');

  var quotes = $('[data-testimonials]');
  if (quotes) quotes.innerHTML = D.testimonials.map(function (t) {
    return '<div class="quote reveal"><blockquote>' + esc(t.text) + '</blockquote><cite>' + esc(t.name) + '</cite></div>';
  }).join('');

  /* Nav */
  var nav = $('.nav'), burger = $('.burger');
  if (burger) burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  var here = location.pathname.replace(/index\.html$/, '');
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var p = a.pathname.replace(/index\.html$/, '');
    if (p === here && !a.hash) a.setAttribute('aria-current', 'page');
  });

  /* Reveal on scroll */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  /* Forms: demo. Validate the required fields, then show the success line. */
  document.querySelectorAll('form[data-demo]').forEach(function (form) {
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (f) {
        var bad = f.type === 'checkbox' ? !f.checked : !f.value.trim() || (f.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value));
        f.closest('.field').classList.toggle('invalid', bad);
        if (bad && ok) { f.focus(); ok = false; }
      });
      if (!ok) return;
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = 'Sending';
      setTimeout(function () {
        var done = document.createElement('p');
        done.className = 'form-done';
        done.setAttribute('role', 'status');
        done.textContent = form.dataset.demo;
        form.replaceWith(done);
      }, 700);
    });
    form.querySelectorAll('[required]').forEach(function (f) {
      f.addEventListener('input', function () { f.closest('.field').classList.remove('invalid'); });
    });
  });
})();
