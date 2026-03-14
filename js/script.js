/* ─── WebKreatives — interactive enhancements ─── */

// 1. SCROLL PROGRESS BAR
const progressBar = document.createElement('div');
progressBar.id = 'progress-bar';
document.body.prepend(progressBar);

// 2. REFERENCES
const nav = document.querySelector('nav');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

// 3. MOBILE NAV TOGGLE
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    })
  );
}

// 4. SCROLL HANDLER (rAF-throttled)
let ticking = false;
function handleScroll() {
  const y = window.scrollY;
  const maxY = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.width = Math.min((y / maxY) * 100, 100) + '%';
  nav.classList.toggle('scrolled', y > 40);
  let current = '';
  sections.forEach(s => { if (y >= s.offsetTop - 140) current = s.id; });
  navAnchors.forEach(a =>
    a.classList.toggle('active', a.getAttribute('href') === '#' + current)
  );
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(handleScroll); ticking = true; }
}, { passive: true });

// 5. SCROLL REVEAL
document.documentElement.classList.add('js-loaded');

// Add anim + stagger classes to card elements
['.svc', '.wcard', '.tcard', '.pcard', '.ck', '.faq-item'].forEach(sel =>
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('anim');
    if (i % 3 === 1) el.classList.add('d1');
    if (i % 3 === 2) el.classList.add('d2');
  })
);
document.querySelectorAll('.sh, .trust, .cform, .stats-grid').forEach(el =>
  el.classList.add('anim')
);

const revealObs = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('on'); revealObs.unobserve(e.target); }
  }),
  { threshold: 0.07 }
);
document.querySelectorAll('.anim').forEach(el => revealObs.observe(el));

// 6. STATS COUNTER
function runCounter(el) {
  const raw = el.textContent.trim();
  if (/[★–]/.test(raw)) return;
  const num = parseFloat(raw.replace(/[^\d.]/g, ''));
  const suffix = raw.replace(/[\d.]/g, '');
  const isFloat = /\d\.\d/.test(raw);
  const t0 = performance.now();
  const dur = 1500;
  (function tick(now) {
    const p = Math.min((now - t0) / dur, 1);
    const v = (1 - Math.pow(1 - p, 3)) * num;
    el.textContent = (isFloat ? v.toFixed(1) : Math.floor(v)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  })(performance.now());
}
const statsEl = document.querySelector('.stats');
if (statsEl) {
  const statsObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.sn').forEach(runCounter);
        statsObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  statsObs.observe(statsEl);
}

// 7. TYPING EFFECT in hero h1
const typingEl = document.querySelector('.hero h1 em');
if (typingEl) {
  const words = ['Win', 'Grow', 'Convert'];
  let wi = 0, ci = 0, deleting = false;
  function type() {
    const word = words[wi];
    if (!deleting) {
      typingEl.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(type, 2000); return; }
    } else {
      typingEl.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(type, deleting ? 70 : 130);
  }
  setTimeout(type, 1500);
}

// 8. FAQ ACCORDION
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// 9. MAGNETIC HOVER on primary buttons
document.querySelectorAll('.btn-primary, .btn-nav, .fsub').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.2;
    const y = (e.clientY - r.top - r.height / 2) * 0.25;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

// 10. FORM VALIDATION
const form = document.querySelector('.cform');
if (form) {
  const nameInput = form.querySelector('input[type="text"]');
  const emailInput = form.querySelector('input[type="email"]');
  const submitBtn = form.querySelector('.fsub');
  form.querySelectorAll('input, select, textarea').forEach(el =>
    el.addEventListener('input', () => el.classList.remove('err'))
  );
  submitBtn.addEventListener('click', () => {
    let valid = true;
    if (nameInput && !nameInput.value.trim()) { nameInput.classList.add('err'); valid = false; }
    if (emailInput) {
      const v = emailInput.value.trim();
      if (!v || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { emailInput.classList.add('err'); valid = false; }
    }
    if (!valid) return;
    submitBtn.textContent = '✓ Sent! We\'ll be in touch within 24 hours.';
    submitBtn.style.background = 'var(--green)';
    submitBtn.disabled = true;
  });
}
