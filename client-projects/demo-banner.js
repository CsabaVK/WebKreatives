/* WebKreatives demo banner.
   One line at the very top of every client demo that is listed in the portfolio,
   saying the page is a demo and not the business's own website. It sits in the
   page flow (a spacer keeps content below it) and stays on top while scrolling;
   fixed elements that hug the top edge (navs) are moved down by its height.

   Include once per page, before </body>:
   <script src="/client-projects/demo-banner.js" data-name="Business name" data-site="business.nl" defer></script>
   data-site is optional: when given, the name links to the real website.
   The x on the right closes it for the rest of the browser tab (sessionStorage). */
(function () {
  var me = document.currentScript || {};
  var name = (me.getAttribute && me.getAttribute('data-name')) || 'this business';
  var site = me.getAttribute && me.getAttribute('data-site');
  var HOME = 'https://webkreatives.com/';
  var KEY = 'wk-demo-closed';
  try { if (sessionStorage.getItem(KEY)) return; } catch (e) {}

  var css = '#wkDemo{position:fixed;top:0;left:0;right:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:4px 22px;min-height:40px;padding:8px 48px 8px 16px;box-sizing:border-box;background:#0d0d0d;color:#fff;font:500 12.5px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif;letter-spacing:.1px;text-align:center;box-shadow:0 1px 0 rgba(255,255,255,.08),0 2px 12px rgba(0,0,0,.35)}' +
    '#wkDemo a{color:#8BC34A;font-weight:700;text-decoration:none}#wkDemo a:hover{text-decoration:underline}' +
    '#wkDemo .wkBack{display:inline-flex;align-items:center;gap:6px;white-space:nowrap}#wkDemo .wkBack svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}' +
    '#wkDemo .wkSite{color:#fff;font-weight:600;text-decoration:underline;text-decoration-color:rgba(255,255,255,.4);text-underline-offset:2px}' +
    '#wkDemoX{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:34px;height:34px;border:0;border-radius:50%;background:none;color:rgba(255,255,255,.55);cursor:pointer;display:grid;place-items:center;padding:0}#wkDemoX:hover{color:#fff;background:rgba(255,255,255,.1)}#wkDemoX svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2.2;stroke-linecap:round}' +
    '#wkDemoPad{height:40px}@media(max-width:640px){#wkDemo{font-size:12px;gap:2px 14px;padding:7px 44px 7px 12px}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var who = site ? '<a class="wkSite" href="https://' + esc(site.replace(/^https?:\/\//, '')) + '" target="_blank" rel="noopener">' + esc(name) + '</a>' : '<b>' + esc(name) + '</b>';
  var bar = document.createElement('div'); bar.id = 'wkDemo'; bar.setAttribute('role', 'note'); bar.lang = 'en';
  bar.innerHTML = '<a class="wkBack" href="' + HOME + '"><svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>Back to WebKreatives</a>' +
    '<span>Client demo by <a href="' + HOME + '">webkreatives.com</a> &middot; this is not the actual website of ' + who + '</span>' +
    '<button id="wkDemoX" type="button" aria-label="Close this notice" title="Close"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>';
  var pad = document.createElement('div'); pad.id = 'wkDemoPad';

  function mount() {
    var body = document.body;
    body.insertBefore(pad, body.firstChild);
    body.insertBefore(bar, pad);
    // fixed bars glued to the top edge (navs) move down with the banner;
    // full-screen overlays and small things like custom cursors stay put
    var top = [];
    Array.prototype.forEach.call(body.querySelectorAll('nav, header, aside, div, a, button'), function (el) {
      if (el === bar || el === pad) return;
      var s = getComputedStyle(el);
      if (s.position !== 'fixed') return;
      var t = parseFloat(s.top), r = el.getBoundingClientRect();
      if (isNaN(t) || t > 40 || r.width < innerWidth * 0.4 || r.height > innerHeight * 0.8) return;
      top.push([el, t]);
    });
    var base = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    function fit() {
      var h = bar.offsetHeight;
      pad.style.height = h + 'px';
      top.forEach(function (x) { x[0].style.top = (x[1] + h) + 'px'; });
      document.documentElement.style.scrollPaddingTop = (base + h) + 'px';
    }
    fit();
    var ro = window.ResizeObserver ? new ResizeObserver(fit) : null;
    if (ro) ro.observe(bar); else addEventListener('resize', fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    bar.querySelector('#wkDemoX').addEventListener('click', function () {
      if (ro) ro.disconnect();
      bar.remove(); pad.remove();
      top.forEach(function (x) { x[0].style.top = ''; });
      document.documentElement.style.scrollPaddingTop = '';
      try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
