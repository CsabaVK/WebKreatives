/* ─── WebKreatives — motion layer (redesign v4) ──────────────────────────────
 * Everything animated in one place. Degrades safely:
 *  - if Lenis fails to load, native scrolling still works
 *  - if JS is off, [data-reveal] elements are shown by a <noscript> rule
 *  - honours prefers-reduced-motion throughout
 * ─────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. Smooth scroll (Lenis, loaded lazily) ────────────────────────── */
  function initSmoothScroll() {
    if (reduced || window.__wkLenis) return;
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js';
    s.onload = () => {
      const L = window.Lenis || (window.lenis && window.lenis.Lenis);
      if (!L) return;
      const lenis = new L({
        duration: 1.05,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.6
      });
      window.__wkLenis = lenis;
      const raf = time => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);

      /* keep in-page anchors working with smooth scroll */
      document.addEventListener('click', e => {
        const a = e.target.closest('a[href^="#"], a[href^="/#"]');
        if (!a) return;
        const hash = a.getAttribute('href').replace(/^\//, '');
        if (hash === '#' || hash.length < 2) return;
        const t = document.querySelector(hash);
        if (!t) return;
        e.preventDefault();
        lenis.scrollTo(t, { offset: -80 });
      });
    };
    s.onerror = () => {};   /* native scroll is a fine fallback */
    document.head.appendChild(s);
  }

  /* ── 2. Reveal on scroll ────────────────────────────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll('[data-reveal],[data-reveal-line]');
    if (!els.length) return;
    if (reduced) { els.forEach(e => e.classList.add('is-in')); return; }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        const delay = parseFloat(el.dataset.revealDelay || 0);
        setTimeout(() => el.classList.add('is-in'), delay * 1000);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    els.forEach(el => io.observe(el));
  }

  /* ── 3. Per-word headline reveal ────────────────────────────────────────
     Splits [data-split] into words. Keeps an sr-only copy so screen readers
     read the sentence normally, and animates an aria-hidden duplicate.      */
  function initSplit() {
    document.querySelectorAll('[data-split]').forEach(el => {
      if (el.dataset.splitDone) return;
      el.dataset.splitDone = '1';

      const source = el.innerHTML;
      const text = el.textContent.trim();

      /* accessible copy */
      const sr = document.createElement('span');
      sr.className = 'sr-only';
      sr.textContent = text;

      /* visual copy, word by word, preserving inline accent markup */
      const holder = document.createElement('span');
      holder.setAttribute('aria-hidden', 'true');
      holder.innerHTML = source;

      holder.querySelectorAll('*').forEach(n => { if (!n.children.length) wrapWords(n); });
      if (!holder.querySelector('.wk-word')) wrapWords(holder);

      el.innerHTML = '';
      el.appendChild(sr);
      el.appendChild(holder);

      const words = holder.querySelectorAll('.wk-word-in');
      if (reduced) { words.forEach(w => { w.style.transform = 'none'; w.style.opacity = 1; }); return; }

      const io = new IntersectionObserver(ents => {
        ents.forEach(en => {
          if (!en.isIntersecting) return;
          words.forEach((w, i) => {
            w.style.transitionDelay = (i * 0.055) + 's';
            w.style.transform = 'translateY(0)';
            w.style.opacity = '1';
          });
          io.disconnect();
        });
      }, { threshold: 0.2 });
      io.observe(el);
    });

    function wrapWords(node) {
      const parts = node.textContent.split(/(\s+)/);
      node.textContent = '';
      parts.forEach(p => {
        if (!p.trim()) { node.appendChild(document.createTextNode(p)); return; }
        const outer = document.createElement('span');
        outer.className = 'wk-word';
        const inner = document.createElement('span');
        inner.className = 'wk-word-in';
        inner.textContent = p;
        outer.appendChild(inner);
        node.appendChild(outer);
      });
    }
  }

  /* ── 4. Counters ────────────────────────────────────────────────────── */
  function initCounters() {
    const els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    const io = new IntersectionObserver(ents => {
      ents.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        io.unobserve(el);
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dec = (el.dataset.count.split('.')[1] || '').length;
        if (reduced) { el.textContent = target.toFixed(dec) + suffix; return; }
        const t0 = performance.now(), dur = 1500;
        (function tick(now) {
          const p = Math.min((now - t0) / dur, 1);
          const v = (1 - Math.pow(1 - p, 3)) * target;
          el.textContent = v.toFixed(dec) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        })(performance.now());
      });
    }, { threshold: 0.5 });
    els.forEach(e => io.observe(e));
  }

  /* ── 5. Magnetic buttons ────────────────────────────────────────────── */
  function initMagnetic() {
    if (reduced || window.matchMedia('(pointer:coarse)').matches) return;
    document.querySelectorAll('[data-magnetic]').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * .22;
        const y = (e.clientY - r.top - r.height / 2) * .3;
        btn.style.transform = `translate(${x}px,${y}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ── 6. Parallax ────────────────────────────────────────────────────── */
  function initParallax() {
    const els = [...document.querySelectorAll('[data-parallax]')];
    if (!els.length || reduced) return;
    let ticking = false;
    const run = () => {
      const vh = innerHeight;
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const speed = parseFloat(el.dataset.parallax) || .15;
        const mid = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(0,${(-mid * speed).toFixed(2)}px,0)`;
      });
      ticking = false;
    };
    addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(run); ticking = true; }
    }, { passive: true });
    run();
  }

  /* ── 7. Marquee ─────────────────────────────────────────────────────── */
  function initMarquee() {
    document.querySelectorAll('[data-marquee]').forEach(m => {
      if (m.dataset.marqueeDone) return;
      m.dataset.marqueeDone = '1';
      const track = m.firstElementChild;
      if (!track) return;
      track.innerHTML += track.innerHTML;   /* duplicate for a seamless loop */
      if (reduced) return;
      m.style.setProperty('--marquee-dur', (m.dataset.marquee || 32) + 's');
    });
  }

  /* ── 8. Section progress rail ───────────────────────────────────────── */
  function initProgress() {
    const bar = document.getElementById('wkProgress');
    if (!bar) return;
    let ticking = false;
    const run = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
      ticking = false;
    };
    addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(run); ticking = true; }
    }, { passive: true });
    run();
  }

  /* ── boot ───────────────────────────────────────────────────────────── */
  function boot() {
    initSmoothScroll();
    initSplit();
    initReveal();
    initCounters();
    initMagnetic();
    initParallax();
    initMarquee();
    initProgress();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  /* re-scan after language switches (nav/footer re-render their text) */
  document.addEventListener('wk:languagechange', () => {
    setTimeout(() => { initReveal(); initMagnetic(); }, 60);
  });
})();
