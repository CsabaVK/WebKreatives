/* ─── WebKreatives — interactive enhancements ─── */

const WK_GA_ID = 'G-CG9705BC61';
const WK_CONSENT_KEY = 'wk-cookie-consent';
const WK_CONSENT_PREFS_KEY = 'wk-cookie-preferences';
let wkGaLoaded = false;

function loadGoogleAnalytics() {
  if (wkGaLoaded || !WK_GA_ID) return;
  wkGaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ dataLayer.push(arguments); };

  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${WK_GA_ID}`;
  document.head.appendChild(gaScript);

  window.gtag('js', new Date());
  window.gtag('config', WK_GA_ID, { anonymize_ip: true });
}

function getCookieConsentState() {
  return localStorage.getItem(WK_CONSENT_KEY);
}

function getCookiePreferences() {
  try {
    return JSON.parse(localStorage.getItem(WK_CONSENT_PREFS_KEY) || '{"essential":true,"analytics":true}');
  } catch {
    return { essential: true, analytics: true };
  }
}

function applyCookiePreferences(prefs, state) {
  localStorage.setItem(WK_CONSENT_KEY, state);
  localStorage.setItem(WK_CONSENT_PREFS_KEY, JSON.stringify(prefs));
  if (prefs.analytics && state !== 'declined') loadGoogleAnalytics();
}

function getCookieBannerCopy(lang) {
  return lang === 'en'
    ? {
        title: 'Cookies on WebKreatives',
        text: 'We use essential cookies for language and theme preferences. Analytics helps us improve the site and is enabled after your permission.',
        accept: 'Accept cookies',
        customize: 'Customize cookies',
        decline: 'Decline cookies',
        manage: 'Privacy Policy',
        save: 'Save preferences',
        essential: 'Essential cookies',
        essentialText: 'Needed for basic website functionality such as language and theme preferences. Always on.',
        analytics: 'Analytics cookies',
        analyticsText: 'Helps us understand which pages perform best so we can improve the website.'
      }
    : {
        title: 'Cookies op WebKreatives',
        text: 'We gebruiken essentiële cookies voor taal- en themavoorkeuren. Analytics helpt ons de site te verbeteren en wordt pas actief na jouw keuze.',
        accept: 'Cookies accepteren',
        customize: 'Cookies aanpassen',
        decline: 'Cookies weigeren',
        manage: 'Privacybeleid',
        save: 'Voorkeuren opslaan',
        essential: 'Essentiële cookies',
        essentialText: 'Nodig voor basisfunctionaliteit van de website, zoals taal- en themavoorkeuren. Altijd actief.',
        analytics: 'Analytics cookies',
        analyticsText: 'Helpt ons begrijpen welke pagina’s het beste werken zodat we de website kunnen verbeteren.'
      };
}

function renderCookieBanner(lang) {
  let banner = document.getElementById('cookieBanner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.className = 'cookie-banner';
    document.body.appendChild(banner);
  }

  const prefs = getCookiePreferences();
  const copy = getCookieBannerCopy(lang);
  banner.innerHTML = `
    <div class="cookie-banner-inner">
      <div class="cookie-copy">
        <strong>${copy.title}</strong>
        <p>${copy.text} <a href="/privacy/">${copy.manage}</a>.</p>
      </div>
      <div class="cookie-actions">
        <button type="button" class="cookie-btn cookie-btn-secondary" data-cookie-action="customize">${copy.customize}</button>
        <button type="button" class="cookie-btn cookie-btn-primary" data-cookie-action="accept">${copy.accept}</button>
      </div>
    </div>
    <div class="cookie-panel" hidden>
      <div class="cookie-option cookie-option-locked">
        <div>
          <strong>${copy.essential}</strong>
          <p>${copy.essentialText}</p>
        </div>
        <label class="cookie-switch is-disabled"><input type="checkbox" checked disabled><span></span></label>
      </div>
      <div class="cookie-option">
        <div>
          <strong>${copy.analytics}</strong>
          <p>${copy.analyticsText}</p>
        </div>
        <label class="cookie-switch"><input type="checkbox" data-cookie-analytics ${prefs.analytics ? 'checked' : ''}><span></span></label>
      </div>
      <div class="cookie-panel-actions">
        <button type="button" class="cookie-btn cookie-btn-ghost" data-cookie-action="decline">${copy.decline}</button>
        <button type="button" class="cookie-btn cookie-btn-primary" data-cookie-action="save">${copy.save}</button>
      </div>
    </div>`;

  const panel = banner.querySelector('.cookie-panel');
  banner.querySelector('[data-cookie-action="accept"]').addEventListener('click', () => {
    applyCookiePreferences({ essential: true, analytics: true }, 'accepted');
    banner.hidden = true;
    renderCookieManageButton(lang);
  });
  banner.querySelector('[data-cookie-action="customize"]').addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    banner.classList.toggle('cookie-banner-expanded', !panel.hidden);
  });
  banner.querySelector('[data-cookie-action="decline"]').addEventListener('click', () => {
    applyCookiePreferences({ essential: true, analytics: false }, 'declined');
    banner.hidden = true;
    renderCookieManageButton(lang);
  });
  banner.querySelector('[data-cookie-action="save"]').addEventListener('click', () => {
    const analytics = !!banner.querySelector('[data-cookie-analytics]')?.checked;
    applyCookiePreferences({ essential: true, analytics }, analytics ? 'accepted' : 'customized');
    banner.hidden = true;
    renderCookieManageButton(lang);
  });

  banner.hidden = ['accepted', 'declined', 'customized'].includes(getCookieConsentState());
}

function renderCookieManageButton(lang) {
  let btn = document.getElementById('cookieManageBtn');
  const consent = getCookieConsentState();
  if (!consent) {
    if (btn) btn.hidden = true;
    return;
  }
  if (!btn) {
    btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'cookieManageBtn';
    btn.className = 'cookie-manage-btn';
    document.body.appendChild(btn);
    btn.addEventListener('click', () => {
      localStorage.removeItem(WK_CONSENT_KEY);
      renderCookieBanner(currentLang || localStorage.getItem('wk-lang') || 'nl');
      renderCookieManageButton(currentLang || localStorage.getItem('wk-lang') || 'nl');
    });
  }
  btn.textContent = lang === 'en' ? 'Cookie settings' : 'Cookie-instellingen';
  btn.hidden = false;
}

const initialPrefs = getCookiePreferences();
if (initialPrefs.analytics && ['accepted', 'customized'].includes(getCookieConsentState())) {
  loadGoogleAnalytics();
}

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
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

function closeNav() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  navOverlay.classList.remove('active');
  document.body.classList.remove('nav-open');
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    navOverlay.classList.toggle('active', open);
    document.body.classList.toggle('nav-open', open);
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', closeNav)
  );
  navOverlay.addEventListener('click', closeNav);
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
let words = (typeof translations !== 'undefined' && translations[localStorage.getItem('wk-lang') || 'nl']) ? (translations[localStorage.getItem('wk-lang') || 'nl']['hero.words'] || 'Winnen,Groeien,Converteren').split(',') : ['Winnen','Groeien','Converteren'];
if (typingEl) {
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

// 9.5 LANGUAGE SWITCHER
const langBtn = document.getElementById('langBtn');
const langMenu = document.getElementById('langMenu');
const langDropdown = document.getElementById('langDropdown');
let currentLang = localStorage.getItem('wk-lang') || 'nl';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('wk-lang', lang);
  document.documentElement.lang = lang;

  const t = translations[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key]) el.innerHTML = t[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) el.placeholder = t[key];
  });

  // Update typing words
  if (t['hero.words'] && typeof words !== 'undefined') {
    words = t['hero.words'].split(',');
  }

  // Update lang button display
  const flagSVGs = {
    nl: '<svg viewBox="0 0 640 480"><path fill="#ae1c28" d="M0 0h640v160H0z"/><path fill="#fff" d="M0 160h640v160H0z"/><path fill="#21468b" d="M0 320h640v160H0z"/></svg>',
    en: '<svg viewBox="0 0 640 480"><path fill="#012169" d="M0 0h640v480H0z"/><path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"/><path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"/><path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z"/><path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z"/></svg>'
  };
  const names = {nl: 'NL', en: 'EN'};
  if (langBtn) {
    langBtn.querySelector('.lang-flag').innerHTML = flagSVGs[lang] || flagSVGs.nl;
    langBtn.querySelector('.lang-name').textContent = names[lang] || names.nl;
  }

  // Update active state
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });

  renderCookieBanner(lang);
  renderCookieManageButton(lang);

  document.dispatchEvent(new CustomEvent('wk:languagechange', {
    detail: { lang, translations: t }
  }));
}

if (langBtn) {
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
  });

  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', () => {
      setLanguage(opt.dataset.lang);
      langDropdown.classList.remove('open');
    });
  });

  document.addEventListener('click', () => {
    langDropdown.classList.remove('open');
  });
}

// Apply saved language on load
setLanguage(currentLang);

// 9.6 DARK MODE TOGGLE
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('wk-theme');
if (savedTheme) document.body.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('wk-theme', newTheme);
  });
}

// 10. SUBSCRIPTION TOGGLE
const subToggle = document.getElementById('subToggle');
const subPanel = document.getElementById('subPanel');
if (subToggle && subPanel) {
  subToggle.addEventListener('click', () => {
    const isOpen = subToggle.classList.toggle('open');
    subPanel.classList.toggle('open', isOpen);
    if (isOpen) {
      setTimeout(() => {
        subPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  });
  // Add scroll reveal to subscription cards
  document.querySelectorAll('.scard').forEach((el, i) => {
    el.classList.add('anim');
    if (i === 1) el.classList.add('d1');
    if (i === 2) el.classList.add('d2');
    revealObs.observe(el);
  });
}

// 11. FORM SUBMISSION
const form = document.querySelector('#contactForm');
if (form) {
  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  const submitBtn = form.querySelector('.fsub');
  const statusDiv = document.getElementById('formStatus');
  form.querySelectorAll('input, select, textarea').forEach(el =>
    el.addEventListener('input', () => el.classList.remove('err'))
  );
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    if (nameInput && !nameInput.value.trim()) { nameInput.classList.add('err'); valid = false; }
    if (emailInput) {
      const v = emailInput.value.trim();
      if (!v || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { emailInput.classList.add('err'); valid = false; }
    }
    if (messageInput && !messageInput.value.trim()) { messageInput.classList.add('err'); valid = false; }
    if (!valid) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Verzenden...';

    var data = new FormData(form);
    fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      .then(function(r) { return r.json(); })
      .then(function(res) {
        if (res.success) {
          submitBtn.textContent = '✓ Verzonden!';
          submitBtn.style.background = 'var(--green)';
          statusDiv.style.display = 'block';
          statusDiv.style.color = 'var(--green)';
          statusDiv.textContent = 'Bedankt! We nemen binnen 24 uur contact op.';
          form.reset();
        } else {
          throw new Error(res.message || 'Fout');
        }
      })
      .catch(function(err) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Bericht Versturen \u2192';
        statusDiv.style.display = 'block';
        statusDiv.style.color = 'var(--red)';
        statusDiv.textContent = err.message || 'Er ging iets mis. Probeer het opnieuw.';
      });
  });
}
