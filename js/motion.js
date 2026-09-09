/* ─── WebKreatives — motion layer (redesign v4) ──────────────────────────────
 * Everything animated in one place. Degrades safely:
 *  - scrolling is native; nothing sits between the wheel and the page
 *  - if JS is off, [data-reveal] elements are shown by a <noscript> rule
 *  - honours prefers-reduced-motion throughout
 * ─────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. Anchor scrolling ────────────────────────────────────────────────
     No smooth-scroll library. An interpolated scroll always trails the wheel
     by design, which is what "laggy and not reactive" is. Native scrolling
     has no such lag, and CSS scroll-behavior still eases the anchor jumps. */
  function initAnchors() {
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"], a[href^="/#"]');
      if (!a) return;
      const hash = a.getAttribute('href').replace(/^\//, '');
      if (hash === '#' || hash.length < 2) return;
      const t = document.querySelector(hash);
      if (!t) return;
      e.preventDefault();
      const y = t.getBoundingClientRect().top + scrollY - 80;
      scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
    });
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

    /* Safety net: nothing on this site may stay invisible because an
       observer never fired. Anything still hidden after 2.5s is shown. */
    setTimeout(() => {
      els.forEach(el => {
        if (!el.classList.contains('is-in') &&
            el.getBoundingClientRect().top < innerHeight) el.classList.add('is-in');
      });
    }, 2500);
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
        /* The first write happens inside rAF, so the figure printed in the
           HTML stays on screen if frames never run. */
        const t0 = performance.now(), dur = 1500;
        requestAnimationFrame(function tick(now) {
          const p = Math.min((now - t0) / dur, 1);
          const v = (1 - Math.pow(1 - p, 3)) * target;
          el.textContent = v.toFixed(dec) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        });
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

    /* measure once, not every frame: reading layout during scroll is what
       makes smooth-scroll feel heavy */
    let cache = [];
    const measure = () => {
      cache = els.map(el => {
        el.style.transform = '';
        const r = el.getBoundingClientRect();
        return { el, mid: r.top + scrollY + r.height / 2,
                 speed: parseFloat(el.dataset.parallax) || .15 };
      });
      els.forEach(el => { el.style.willChange = 'transform'; });
    };

    let ticking = false;
    const run = () => {
      const centre = scrollY + innerHeight / 2;
      for (const c of cache) {
        const d = c.mid - centre;
        if (Math.abs(d) > innerHeight * 1.6) continue;
        c.el.style.transform = 'translate3d(0,' + (-d * c.speed).toFixed(1) + 'px,0)';
      }
      ticking = false;
    };
    addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(run); ticking = true; }
    }, { passive: true });
    let rt; addEventListener('resize', () => {
      clearTimeout(rt); rt = setTimeout(() => { measure(); run(); }, 150);
    });
    measure(); run();
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
    let ticking = false, max = 0;
    /* scrollHeight is a layout read; measuring it every frame would put a
       forced reflow in the scroll path. Measure on resize instead. */
    const measure = () => { max = document.documentElement.scrollHeight - innerHeight; };
    const run = () => {
      bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
      ticking = false;
    };
    addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(run); ticking = true; }
    }, { passive: true });
    let rt; addEventListener('resize', () => {
      clearTimeout(rt); rt = setTimeout(() => { measure(); run(); }, 150);
    });
    /* images and webfonts change the page height after load */
    addEventListener('load', measure);
    measure(); run();
  }


  /* ── 9. Cursor grid (canvas) ────────────────────────────────────────
     A dot grid that lights up around the pointer. Only runs while the
     section is on screen, and never on touch or reduced-motion.        */
  function initCursorGrid() {
    document.querySelectorAll('[data-cursor-grid]').forEach(host => {
      if (host.dataset.gridDone) return;
      host.dataset.gridDone = '1';
      if (reduced || window.matchMedia('(pointer:coarse)').matches) return;

      const cv = document.createElement('canvas');
      cv.className = 'cursor-grid__canvas';
      host.appendChild(cv);
      const ctx = cv.getContext('2d');

      const GAP = 38, R = 1.1, REACH = 165;
      let w = 0, h = 0, dpr = 1, dots = [], raf = 0, live = false;
      let rect = null, dirty = true;
      const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

      function build() {
        rect = host.getBoundingClientRect();
        if (!rect.width) return;
        dpr = Math.min(devicePixelRatio || 1, 1.5);
        w = rect.width; h = rect.height;
        cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
        cv.style.width = w + 'px'; cv.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        dots = [];
        for (let y = GAP / 2; y < h; y += GAP)
          for (let x = GAP / 2; x < w; x += GAP) dots.push({ x, y });
        dirty = true;
      }

      function frame() {
        const dx0 = pointer.tx - pointer.x, dy0 = pointer.ty - pointer.y;
        const moving = Math.abs(dx0) > 0.4 || Math.abs(dy0) > 0.4;

        if (moving || dirty) {
          pointer.x += dx0 * 0.14;
          pointer.y += dy0 * 0.14;
          ctx.clearRect(0, 0, w, h);

          /* every dot outside the pointer's reach is the same colour and the
             same size, so they go down as ONE path with one fill instead of
             one arc() call each. That is the whole cost of this effect. */
          ctx.fillStyle = 'rgba(239,230,210,0.10)';
          ctx.beginPath();
          const near = [];
          for (const d of dots) {
            const dx = d.x - pointer.x, dy = d.y - pointer.y;
            if (dx * dx + dy * dy < REACH * REACH) { near.push([d, dx, dy]); continue; }
            ctx.moveTo(d.x + R, d.y);
            ctx.arc(d.x, d.y, R, 0, 6.2832);
          }
          ctx.fill();

          for (const [d, dx, dy] of near) {
            const f = 1 - Math.hypot(dx, dy) / REACH;
            ctx.beginPath();
            ctx.arc(d.x - dx * f * 0.10, d.y - dy * f * 0.10, R + f * 2.1, 0, 6.2832);
            ctx.fillStyle = 'rgba(223,56,33,' + (0.10 + f * 0.68).toFixed(3) + ')';
            ctx.fill();
          }
          dirty = moving;
        }
        raf = live ? requestAnimationFrame(frame) : 0;
      }

      /* The host rect is cached. Scrolling only flags it stale (a boolean
         write); it is re-read lazily on the next pointer move, which cannot
         happen during a scroll anyway. Reading layout in a scroll handler is
         what makes a page feel heavy. */
      let stale = true;
      host.addEventListener('pointermove', e => {
        if (stale) { rect = host.getBoundingClientRect(); stale = false; }
        pointer.tx = e.clientX - rect.left;
        pointer.ty = e.clientY - rect.top;
        dirty = true;
      }, { passive: true });
      addEventListener('scroll', () => { stale = true; }, { passive: true });
      host.addEventListener('pointerleave', () => { pointer.tx = -9999; pointer.ty = -9999; dirty = true; });

      const io = new IntersectionObserver(es => {
        es.forEach(en => {
          live = en.isIntersecting;
          if (live && !raf) raf = requestAnimationFrame(frame);
        });
      }, { threshold: 0.01 });
      io.observe(host);

      let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(build, 150); });
      build();
    });
  }


  /* -- 10. Hero field ------------------------------------------------------
     A slow, organic warm wash behind the hero. Drawn tiny and stretched up,
     so the browser's own image smoothing does the blurring for free: no
     shader, no blur filter, cheap enough to hold 60fps on a laptop.
     Mount with <div data-field></div>.                                      */
  function initField() {
    document.querySelectorAll('[data-field]').forEach(host => {
      if (host.dataset.fieldDone) return;
      host.dataset.fieldDone = '1';
      if (reduced) return;

      const cv = document.createElement('canvas');
      cv.className = 'wk-field__canvas';
      host.appendChild(cv);
      const ctx = cv.getContext('2d');

      /* the wash is drawn this many pixels across, then stretched to fill */
      const LOW = 96;
      const off = document.createElement('canvas');
      const octx = off.getContext('2d');

      /* colour, radius, orbit radii, speed, phase, peak alpha */
      const SPEC = [
        { c: [223,  56,  33], rad: .58, ax: .30, ay: .20, sp: .00021, ph: 0.0, a: .13 },
        { c: [100, 141, 203], rad: .50, ax: .26, ay: .24, sp: .00016, ph: 2.1, a: .08 },
        { c: [185, 225, 133], rad: .42, ax: .22, ay: .18, sp: .00025, ph: 4.2, a: .05 },
        { c: [251, 235, 120], rad: .32, ax: .34, ay: .14, sp: .00013, ph: 1.2, a: .04 }
      ];

      let w = 0, h = 0, raf = 0, live = false;
      const t0 = performance.now();
      const ptr = { x: .5, y: .4, tx: .5, ty: .4 };

      function size() {
        const r = host.getBoundingClientRect();
        if (!r.width || !r.height) return;
        w = r.width; h = r.height;
        /* the wash is soft by definition, so the backing store is capped well
           below device pixels: a full-viewport drawImage every frame is the
           expensive part, and nobody can see the difference. */
        const scale = Math.min(1, 900 / w);
        cv.width = Math.round(w * scale); cv.height = Math.round(h * scale);
        cv.style.width = w + 'px'; cv.style.height = h + 'px';
        off.width = LOW; off.height = Math.max(2, Math.round(LOW * h / w));
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }

      let last = 0;
      function frame(now) {
        raf = live ? requestAnimationFrame(frame) : 0;
        if (now - last < 33) return;   /* 30fps is plenty for a slow wash */
        last = now;
        const ow = off.width, oh = off.height;
        ptr.x += (ptr.tx - ptr.x) * .045;
        ptr.y += (ptr.ty - ptr.y) * .045;

        octx.clearRect(0, 0, ow, oh);
        octx.globalCompositeOperation = 'lighter';
        for (const s of SPEC) {
          const a = (now - t0) * s.sp + s.ph;
          const cx = (.50 + Math.cos(a) * s.ax + (ptr.x - .5) * .10) * ow;
          const cy = (.45 + Math.sin(a * 1.31) * s.ay + (ptr.y - .5) * .10) * oh;
          const rr = s.rad * ow * (1 + Math.sin(a * .7) * .10);
          const col = s.c[0] + ',' + s.c[1] + ',' + s.c[2];
          const g = octx.createRadialGradient(cx, cy, 0, cx, cy, rr);
          g.addColorStop(0,   'rgba(' + col + ',' + s.a + ')');
          g.addColorStop(.55, 'rgba(' + col + ',' + (s.a * .28) + ')');
          g.addColorStop(1,   'rgba(' + col + ',0)');
          octx.fillStyle = g;
          octx.beginPath(); octx.arc(cx, cy, rr, 0, 6.2832); octx.fill();
        }
        octx.globalCompositeOperation = 'source-over';

        ctx.clearRect(0, 0, cv.width, cv.height);
        ctx.drawImage(off, 0, 0, ow, oh, 0, 0, cv.width, cv.height);
      }

      addEventListener('pointermove', e => {
        ptr.tx = e.clientX / innerWidth;
        ptr.ty = e.clientY / innerHeight;
      }, { passive: true });

      new IntersectionObserver(es => es.forEach(e => {
        live = e.isIntersecting;
        if (live && !raf) { size(); raf = requestAnimationFrame(frame); }
      }), { threshold: 0.01 }).observe(host);

      let rt;
      addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(size, 150); });
      size();
    });
  }

  /* ── boot ───────────────────────────────────────────────────────────── */
  function boot() {
    initAnchors();
    initSplit();
    initReveal();
    initCounters();
    initMagnetic();
    initParallax();
    initMarquee();
    initProgress();
    initCursorGrid();
    initField();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  /* re-scan after language switches (nav/footer re-render their text) */
  window.wkRescanMotion = () => { initReveal(); initMagnetic(); };

  document.addEventListener('wk:languagechange', () => {
    setTimeout(() => { initReveal(); initMagnetic(); }, 60);
  });
})();
