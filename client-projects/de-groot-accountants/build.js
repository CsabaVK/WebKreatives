// Run: node build.js (from inside the de-groot-accountants folder)
const fs = require('fs');
const path = require('path');

const base = __dirname;

const navHTML = (activePage) => `
<header id="site-header">
  <div class="nav-inner">
    <a href="/client-projects/de-groot-accountants/" class="nav-logo">
      <div class="nav-logo-mark">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
      </div>
      <div>
        <span class="nav-logo-text">De Groot & Partners</span>
        <span class="nav-logo-sub">Accountants & Adviseurs</span>
      </div>
    </a>
    <nav>
      <ul>
        <li><a href="/client-projects/de-groot-accountants/" ${activePage==='home'?'class="active"':''}>Home</a></li>
        <li><a href="/client-projects/de-groot-accountants/diensten/" ${activePage==='diensten'?'class="active"':''}>Diensten</a></li>
        <li><a href="/client-projects/de-groot-accountants/over-ons/" ${activePage==='over-ons'?'class="active"':''}>Over ons</a></li>
        <li><a href="/client-projects/de-groot-accountants/contact/" class="nav-cta ${activePage==='contact'?'active':''}">Contact</a></li>
      </ul>
    </nav>
    <div class="nav-toggle" id="nav-toggle" aria-label="Menu">
      <span></span><span></span><span></span>
    </div>
  </div>
</header>
<div class="nav-mobile" id="nav-mobile">
  <a href="/client-projects/de-groot-accountants/">Home</a>
  <a href="/client-projects/de-groot-accountants/diensten/">Diensten</a>
  <a href="/client-projects/de-groot-accountants/over-ons/">Over ons</a>
  <a href="/client-projects/de-groot-accountants/contact/">Contact</a>
</div>`;

const footerHTML = `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
          <div style="width:32px;height:32px;background:var(--teal);border-radius:6px;display:flex;align-items:center;justify-content:center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span style="font-size:15px;font-weight:800;color:var(--white)">De Groot & Partners</span>
        </div>
        <p>Betrouwbare accountancy en fiscaal advies voor ondernemers in heel Nederland.</p>
      </div>
      <div class="footer-col">
        <h4>Diensten</h4>
        <ul>
          <li><a href="/client-projects/de-groot-accountants/diensten/">Jaarrekening</a></li>
          <li><a href="/client-projects/de-groot-accountants/diensten/">BTW-aangifte</a></li>
          <li><a href="/client-projects/de-groot-accountants/diensten/">Salarisadministratie</a></li>
          <li><a href="/client-projects/de-groot-accountants/diensten/">Belastingadvies</a></li>
          <li><a href="/client-projects/de-groot-accountants/diensten/">Bedrijfsadvies</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Bedrijf</h4>
        <ul>
          <li><a href="/client-projects/de-groot-accountants/over-ons/">Over ons</a></li>
          <li><a href="/client-projects/de-groot-accountants/over-ons/">Ons team</a></li>
          <li><a href="/client-projects/de-groot-accountants/contact/">Contact</a></li>
          <li><a href="#">Vacatures</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:+31201234567">020 123 45 67</a></li>
          <li><a href="mailto:info@degrootpartners.nl">info@degrootpartners.nl</a></li>
          <li><a href="#">Keizersgracht 45, Amsterdam</a></li>
          <li><a href="#">Ma–Vr: 08:30–17:30</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 De Groot & Partners B.V. — Alle rechten voorbehouden</p>
      <span class="footer-kvk">KvK: 12345678 | BTW: NL123456789B01</span>
    </div>
  </div>
</footer>`;

const scriptHTML = `
<script>
// Scroll header
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});
// Mobile nav
const toggle = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('nav-mobile');
if(toggle && mobileNav){
  toggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }));
}
// Fade in
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
</script>`;

// ─────────────────────────────────────────────────────────────────────────────
// INDEX.HTML
// ─────────────────────────────────────────────────────────────────────────────
const indexHTML = `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>De Groot & Partners — Accountants & Adviseurs</title>
<meta name="description" content="Betrouwbare accountancy, belastingadvies en salarisadministratie voor ondernemers. Al 25 jaar uw partner in financieel succes.">
<link rel="stylesheet" href="style.css">
<style>
/* ── HERO ── */
.hero{background:var(--navy);min-height:100vh;display:flex;align-items:center;position:relative;overflow:hidden;padding-top:72px}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 80% 50%,rgba(14,184,160,.12),transparent 65%),radial-gradient(ellipse 40% 60% at 10% 80%,rgba(14,184,160,.07),transparent 55%)}
.hero-grid{display:grid;grid-template-columns:1fr 440px;gap:80px;align-items:center;position:relative;z-index:1}
.hero-label{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:var(--teal);background:rgba(14,184,160,.1);border:1px solid rgba(14,184,160,.25);padding:6px 16px;border-radius:100px;margin-bottom:24px}
.hero h1{font-size:clamp(36px,5vw,60px);font-weight:800;color:var(--white);line-height:1.1;margin-bottom:20px}
.hero h1 em{color:var(--teal);font-style:normal}
.hero-desc{font-size:17px;color:rgba(255,255,255,.65);line-height:1.7;margin-bottom:36px;max-width:480px}
.hero-actions{display:flex;gap:14px;flex-wrap:wrap}
.hero-trust{display:flex;align-items:center;gap:24px;margin-top:48px;padding-top:32px;border-top:1px solid rgba(255,255,255,.1)}
.trust-item{text-align:center}
.trust-item strong{display:block;font-size:24px;font-weight:800;color:var(--white)}
.trust-item span{font-size:11px;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:.5px}
.hero-card{background:rgba(255,255,255,.05);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.1);border-radius:var(--r-xl);padding:32px;position:relative}
.hero-card-icon{width:48px;height:48px;background:var(--teal);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:20px}
.hero-card-icon svg{width:24px;height:24px;stroke:white;fill:none;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}
.hero-card h3{font-size:16px;font-weight:700;color:var(--white);margin-bottom:6px}
.hero-card p{font-size:13px;color:rgba(255,255,255,.55);line-height:1.6;margin-bottom:20px}
.hero-card-list{display:flex;flex-direction:column;gap:10px}
.hero-card-item{display:flex;align-items:center;gap:10px;font-size:13px;color:rgba(255,255,255,.75)}
.hero-card-item::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--teal);flex-shrink:0}
.hero-badge{position:absolute;top:-12px;right:24px;background:var(--teal);color:white;font-size:11px;font-weight:700;padding:5px 14px;border-radius:100px}

/* ── SERVICES STRIP ── */
.services-strip{background:var(--off-white);padding:56px 0}
.services-strip-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:24px}
.strip-item{display:flex;flex-direction:column;align-items:flex-start;gap:10px}
.strip-icon{width:44px;height:44px;background:var(--white);border:1px solid var(--grey-200);border-radius:10px;display:flex;align-items:center;justify-content:center;box-shadow:var(--sh-sm)}
.strip-icon svg{width:20px;height:20px;stroke:var(--teal);fill:none;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}
.strip-item h4{font-size:14px;font-weight:700;color:var(--navy)}
.strip-item p{font-size:12px;color:var(--grey-600);line-height:1.5}

/* ── WHY US ── */
.why-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
.why-img{position:relative}
.why-img-main{border-radius:var(--r-xl);overflow:hidden;background:var(--grey-100);aspect-ratio:4/3;display:flex;align-items:center;justify-content:center}
.why-img-main svg{width:80px;height:80px;stroke:var(--grey-400);fill:none;stroke-width:.8}
.why-badge{position:absolute;bottom:-20px;right:-20px;background:var(--navy);color:var(--white);padding:20px 24px;border-radius:var(--r-lg);text-align:center;box-shadow:var(--sh-lg)}
.why-badge strong{display:block;font-size:28px;font-weight:800;color:var(--teal)}
.why-badge span{font-size:12px;color:rgba(255,255,255,.6)}
.why-list{display:flex;flex-direction:column;gap:20px;margin-top:28px}
.why-item{display:flex;gap:14px;align-items:flex-start}
.why-check{width:36px;height:36px;border-radius:10px;background:var(--teal-light);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
.why-check svg{width:16px;height:16px;stroke:var(--teal);fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
.why-item h4{font-size:15px;font-weight:700;color:var(--navy);margin-bottom:3px}
.why-item p{font-size:13px;color:var(--grey-600);line-height:1.6}

/* ── PROCESS ── */
.process{background:var(--navy);padding:88px 0;position:relative;overflow:hidden}
.process::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 50% 70% at 100% 100%,rgba(14,184,160,.08),transparent 60%)}
.process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:32px;position:relative;z-index:1}
.process-step{padding:28px 24px;border:1px solid rgba(255,255,255,.1);border-radius:var(--r-lg);background:rgba(255,255,255,.03);transition:all .3s}
.process-step:hover{background:rgba(255,255,255,.06);border-color:rgba(14,184,160,.4)}
.step-num{font-size:11px;font-weight:700;letter-spacing:1.5px;color:rgba(255,255,255,.3);text-transform:uppercase;margin-bottom:12px}
.step-icon{width:48px;height:48px;background:rgba(14,184,160,.12);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px}
.step-icon svg{width:22px;height:22px;stroke:var(--teal);fill:none;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}
.process-step h4{font-size:16px;font-weight:700;color:var(--white);margin-bottom:8px}
.process-step p{font-size:13px;color:rgba(255,255,255,.5);line-height:1.6}

/* ── CTA BAND ── */
.cta-band{background:linear-gradient(135deg,var(--teal) 0%,var(--teal-dark) 100%);padding:72px 0;text-align:center}
.cta-band h2{color:var(--white);margin-bottom:12px}
.cta-band p{color:rgba(255,255,255,.8);margin-bottom:32px;font-size:16px}
.cta-band .btn{background:var(--white);color:var(--teal);font-weight:700}
.cta-band .btn:hover{background:var(--off-white);transform:translateY(-1px)}

@media(max-width:900px){
  .hero-grid{grid-template-columns:1fr;gap:40px}
  .hero-card{display:none}
  .hero-trust{gap:16px;flex-wrap:wrap}
  .services-strip-grid{grid-template-columns:repeat(2,1fr)}
  .why-grid{grid-template-columns:1fr;gap:48px}
  .why-img{display:none}
  .process-grid{grid-template-columns:1fr 1fr;gap:16px}
}
@media(max-width:560px){
  .hero-actions{flex-direction:column}
  .process-grid{grid-template-columns:1fr}
  .services-strip-grid{grid-template-columns:1fr 1fr}
}
</style>
</head>
<body>

${navHTML('home')}

<!-- HERO -->
<section class="hero">
  <div class="container">
    <div class="hero-grid">
      <div>
        <div class="hero-label">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          Al 25 jaar uw vertrouwde partner
        </div>
        <h1>Uw financiën in <em>vertrouwde handen</em></h1>
        <p class="hero-desc">Van jaarrekening tot belastingadvies — wij ontzorgen u zodat u zich kunt focussen op ondernemen.</p>
        <div class="hero-actions">
          <a href="/client-projects/de-groot-accountants/contact/" class="btn btn-primary">
            <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.72-.72a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.24 17z"/></svg>
            Gratis adviesgesprek
          </a>
          <a href="/client-projects/de-groot-accountants/diensten/" class="btn btn-outline">Bekijk diensten</a>
        </div>
        <div class="hero-trust">
          <div class="trust-item"><strong>500+</strong><span>Klanten</span></div>
          <div class="trust-item"><strong>25</strong><span>Jaar ervaring</span></div>
          <div class="trust-item"><strong>99%</strong><span>Klanttevredenheid</span></div>
          <div class="trust-item"><strong>€0</strong><span>Verborgen kosten</span></div>
        </div>
      </div>
      <div class="hero-card">
        <div class="hero-badge">Gratis intake</div>
        <div class="hero-card-icon">
          <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        </div>
        <h3>Wat wij voor u regelen</h3>
        <p>Volledige financiële administratie, zodat u zich kunt concentreren op uw bedrijf.</p>
        <div class="hero-card-list">
          <div class="hero-card-item">Jaarrekening & belastingaangifte</div>
          <div class="hero-card-item">BTW-aangifte & loonadministratie</div>
          <div class="hero-card-item">Financieel advies op maat</div>
          <div class="hero-card-item">Vennootschapsbelasting (VPB)</div>
          <div class="hero-card-item">Startershulp & bedrijfsoprichting</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SERVICES STRIP -->
<section class="services-strip">
  <div class="container">
    <div class="services-strip-grid">
      <div class="strip-item fade-in">
        <div class="strip-icon"><svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
        <h4>Jaarrekening</h4>
        <p>Volledig en tijdig ingeleverd</p>
      </div>
      <div class="strip-item fade-in fade-in-delay-1">
        <div class="strip-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
        <h4>BTW-aangifte</h4>
        <p>Nooit meer een deadline missen</p>
      </div>
      <div class="strip-item fade-in fade-in-delay-2">
        <div class="strip-icon"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
        <h4>Salarisadministratie</h4>
        <p>Correcte loonstroken elke maand</p>
      </div>
      <div class="strip-item fade-in fade-in-delay-3">
        <div class="strip-icon"><svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
        <h4>Belastingadvies</h4>
        <p>Optimale fiscale structuur</p>
      </div>
      <div class="strip-item fade-in fade-in-delay-4">
        <div class="strip-icon"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
        <h4>Bedrijfsadvies</h4>
        <p>Strategisch groeien met data</p>
      </div>
    </div>
  </div>
</section>

<!-- WHY US -->
<section class="section">
  <div class="container">
    <div class="why-grid">
      <div class="why-img fade-in">
        <div class="why-img-main">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="60" height="60" rx="8" stroke="currentColor"/>
            <path d="M25 40h30M25 30h20M25 50h15" stroke="currentColor" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="why-badge">
          <strong>25+</strong>
          <span>jaar expertise</span>
        </div>
      </div>
      <div class="fade-in fade-in-delay-1">
        <div class="label-tag">Waarom De Groot & Partners</div>
        <h2>Meer dan cijfers — wij zijn uw <em style="color:var(--teal);font-style:normal">strategische partner</em></h2>
        <div class="why-list">
          <div class="why-item">
            <div class="why-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
            <div>
              <h4>Persoonlijk aanspreekpunt</h4>
              <p>U heeft altijd één vaste accountant die uw bedrijf door en door kent.</p>
            </div>
          </div>
          <div class="why-item">
            <div class="why-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
            <div>
              <h4>Transparante, vaste prijzen</h4>
              <p>Geen verrassingen op de factuur. U weet vooraf precies wat u betaalt.</p>
            </div>
          </div>
          <div class="why-item">
            <div class="why-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
            <div>
              <h4>Proactief meedenken</h4>
              <p>Wij signaleren kansen en risico's voordat u er zelf mee te maken krijgt.</p>
            </div>
          </div>
          <div class="why-item">
            <div class="why-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
            <div>
              <h4>Digitaal & efficiënt</h4>
              <p>Alles geregeld via ons beveiligde klantportaal — geen papieren gedoe.</p>
            </div>
          </div>
        </div>
        <div style="margin-top:28px">
          <a href="/client-projects/de-groot-accountants/over-ons/" class="btn btn-ghost">Leer ons kennen <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- PROCESS -->
<section class="process">
  <div class="container">
    <div class="text-center" style="margin-bottom:52px">
      <div class="label-tag label-tag-white">Hoe het werkt</div>
      <h2 style="color:var(--white);margin-bottom:12px">In vier stappen <em style="color:var(--teal);font-style:normal">volledig ontzorgd</em></h2>
      <p style="color:rgba(255,255,255,.5);max-width:480px;margin:0 auto">Snel en eenvoudig van start. Wij regelen de rest.</p>
    </div>
    <div class="process-grid">
      <div class="process-step fade-in">
        <div class="step-num">Stap 01</div>
        <div class="step-icon"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.72-.72a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.24 17z"/></svg></div>
        <h4>Gratis kennismakingsgesprek</h4>
        <p>We bespreken uw situatie en wensen, geheel vrijblijvend.</p>
      </div>
      <div class="process-step fade-in fade-in-delay-1">
        <div class="step-num">Stap 02</div>
        <div class="step-icon"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
        <h4>Offerte op maat</h4>
        <p>U ontvangt een heldere offerte met vaste maandprijs — geen verrassingen.</p>
      </div>
      <div class="process-step fade-in fade-in-delay-2">
        <div class="step-num">Stap 03</div>
        <div class="step-icon"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
        <h4>Overdracht & onboarding</h4>
        <p>Wij nemen uw administratie over van uw huidige boekhouder — wij regelen alles.</p>
      </div>
      <div class="process-step fade-in fade-in-delay-3">
        <div class="step-num">Stap 04</div>
        <div class="step-icon"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
        <h4>Continu ontzorgen</h4>
        <p>Maandelijkse rapportages, deadlines bewaken en altijd bereikbaar voor vragen.</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-band">
  <div class="container">
    <div class="label-tag" style="background:rgba(255,255,255,.2);color:var(--white);border:1px solid rgba(255,255,255,.3);margin-bottom:20px">Gratis gesprek inplannen</div>
    <h2 style="color:var(--white);margin-bottom:12px">Klaar om uw administratie te vereenvoudigen?</h2>
    <p>Bel ons op <strong>020 123 45 67</strong> of plan direct een gratis kennismakingsgesprek in.</p>
    <a href="/client-projects/de-groot-accountants/contact/" class="btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      Neem contact op
    </a>
  </div>
</section>

${footerHTML}
${scriptHTML}
</body>
</html>`;

// ─────────────────────────────────────────────────────────────────────────────
// OVER-ONS.HTML
// ─────────────────────────────────────────────────────────────────────────────
const overOnsHTML = `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Over ons — De Groot & Partners</title>
<meta name="description" content="Maak kennis met het team van De Groot & Partners. 25 jaar ervaring in accountancy en belastingadvies voor ondernemers.">
<link rel="stylesheet" href="style.css">
<style>
.page-hero{background:var(--navy);padding:140px 0 80px;position:relative;overflow:hidden}
.page-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 80% 50%,rgba(14,184,160,.1),transparent 60%)}
.page-hero .container{position:relative;z-index:1}
.page-hero h1{font-size:clamp(32px,5vw,52px);color:var(--white);margin-bottom:16px}
.page-hero p{font-size:17px;color:rgba(255,255,255,.6);max-width:560px}

.story-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
.story-img{background:var(--grey-100);border-radius:var(--r-xl);aspect-ratio:1;display:flex;align-items:center;justify-content:center}
.story-img svg{width:80px;height:80px;stroke:var(--grey-400);fill:none;stroke-width:.8}
.story-content .label-tag{margin-bottom:16px}
.story-content h2{margin-bottom:20px}
.story-content p+p{margin-top:14px}

.values-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
.value-card{background:var(--white);border:1px solid var(--grey-200);border-radius:var(--r-lg);padding:32px;box-shadow:var(--sh-sm);transition:all .3s}
.value-card:hover{box-shadow:var(--sh-md);transform:translateY(-4px)}
.value-icon{width:52px;height:52px;background:var(--teal-light);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:18px}
.value-icon svg{width:24px;height:24px;stroke:var(--teal);fill:none;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}
.value-card h3{font-size:17px;margin-bottom:10px;color:var(--navy)}
.value-card p{font-size:13px;line-height:1.65}

.team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.team-card{background:var(--white);border:1px solid var(--grey-200);border-radius:var(--r-lg);overflow:hidden;box-shadow:var(--sh-sm);transition:all .3s}
.team-card:hover{box-shadow:var(--sh-md);transform:translateY(-3px)}
.team-photo{aspect-ratio:1;background:var(--grey-100);display:flex;align-items:center;justify-content:center;font-size:36px}
.team-info{padding:18px}
.team-info h4{font-size:15px;font-weight:700;color:var(--navy);margin-bottom:3px}
.team-info span{font-size:12px;color:var(--teal);font-weight:600;display:block;margin-bottom:8px}
.team-info p{font-size:12px;color:var(--grey-600);line-height:1.55}

@media(max-width:900px){
  .story-grid,.values-grid{grid-template-columns:1fr}
  .story-img{display:none}
  .team-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:560px){
  .team-grid{grid-template-columns:1fr 1fr}
}
</style>
</head>
<body>
${navHTML('over-ons')}

<section class="page-hero">
  <div class="container">
    <div class="label-tag label-tag-white">Over ons</div>
    <h1>Mensen achter de cijfers</h1>
    <p>Al 25 jaar helpen wij ondernemers in heel Nederland met hun financiën. Niet als leverancier, maar als partner.</p>
  </div>
</section>

<!-- STORY -->
<section class="section">
  <div class="container">
    <div class="story-grid">
      <div class="story-img fade-in">
        <svg viewBox="0 0 80 80" fill="none"><rect x="10" y="10" width="60" height="60" rx="8" stroke="currentColor"/><circle cx="40" cy="32" r="10" stroke="currentColor"/><path d="M20 66c0-11 9-18 20-18s20 7 20 18" stroke="currentColor" stroke-linecap="round"/></svg>
      </div>
      <div class="story-content fade-in fade-in-delay-1">
        <div class="label-tag">Ons verhaal</div>
        <h2>Opgericht in 1999, groeit nog elke dag</h2>
        <p>De Groot & Partners is opgericht door Herman de Groot, met één missie: ondernemers ontzorgen zodat zij kunnen doen waar ze goed in zijn. Wat begon als een eenmanspraktijk is uitgegroeid tot een team van 12 professionals.</p>
        <p>Wij geloven in langdurige relaties, eerlijk advies en transparante communicatie. Geen kleine lettertjes, geen verborgen kosten. Gewoon degelijke accountancy waarmee u vooruit kunt.</p>
        <p>Onze klanten variëren van ZZP'ers en startups tot familiebedrijven met tientallen medewerkers. Elk bedrijf verdient dezelfde aandacht — dat is onze filosofie.</p>
        <div style="display:flex;gap:32px;margin-top:28px">
          <div><strong style="font-size:22px;font-weight:800;color:var(--navy)">500+</strong><br><span style="font-size:12px;color:var(--grey-600)">Tevreden klanten</span></div>
          <div><strong style="font-size:22px;font-weight:800;color:var(--navy)">12</strong><br><span style="font-size:12px;color:var(--grey-600)">Professionals</span></div>
          <div><strong style="font-size:22px;font-weight:800;color:var(--navy)">25+</strong><br><span style="font-size:12px;color:var(--grey-600)">Jaar ervaring</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- VALUES -->
<section class="section" style="background:var(--off-white)">
  <div class="container">
    <div class="text-center" style="margin-bottom:48px">
      <div class="label-tag">Onze waarden</div>
      <h2>Waar wij voor staan</h2>
    </div>
    <div class="values-grid">
      <div class="value-card fade-in">
        <div class="value-icon"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
        <h3>Betrouwbaarheid</h3>
        <p>U kunt altijd op ons rekenen. Deadlines worden gehaald, afspraken worden nagekomen en wij zijn er wanneer u ons nodig heeft.</p>
      </div>
      <div class="value-card fade-in fade-in-delay-1">
        <div class="value-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
        <h3>Transparantie</h3>
        <p>Heldere communicatie en vaste prijzen. U weet altijd precies waar u aan toe bent — geen onaangename verrassingen.</p>
      </div>
      <div class="value-card fade-in fade-in-delay-2">
        <div class="value-icon"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
        <h3>Proactiviteit</h3>
        <p>Wij wachten niet af. Wij signaleren kansen en risico's en komen met concrete voorstellen voordat u erom vraagt.</p>
      </div>
    </div>
  </div>
</section>

<!-- TEAM -->
<section class="section">
  <div class="container">
    <div class="text-center" style="margin-bottom:48px">
      <div class="label-tag">Het team</div>
      <h2>Uw vaste aanspreekpunten</h2>
    </div>
    <div class="team-grid">
      <div class="team-card fade-in">
        <div class="team-photo">👨‍💼</div>
        <div class="team-info">
          <h4>Herman de Groot RA</h4>
          <span>Oprichter & Partner</span>
          <p>25 jaar ervaring in accountancy en fiscaal advies voor het MKB.</p>
        </div>
      </div>
      <div class="team-card fade-in fade-in-delay-1">
        <div class="team-photo">👩‍💼</div>
        <div class="team-info">
          <h4>Linda Visser AA</h4>
          <span>Senior Accountant</span>
          <p>Gespecialiseerd in salarisadministratie en jaarrekeningen voor BV's.</p>
        </div>
      </div>
      <div class="team-card fade-in fade-in-delay-2">
        <div class="team-photo">👨‍💻</div>
        <div class="team-info">
          <h4>Tom Bergman</h4>
          <span>Belastingadviseur</span>
          <p>Expert in VPB, BTW-vraagstukken en fiscale structurering.</p>
        </div>
      </div>
      <div class="team-card fade-in fade-in-delay-3">
        <div class="team-photo">👩‍🎓</div>
        <div class="team-info">
          <h4>Sophie de Vries</h4>
          <span>Junior Accountant</span>
          <p>Aanspreekpunt voor startende ondernemers en ZZP'ers.</p>
        </div>
      </div>
    </div>
  </div>
</section>

${footerHTML}
${scriptHTML}
</body>
</html>`;

// ─────────────────────────────────────────────────────────────────────────────
// DIENSTEN.HTML
// ─────────────────────────────────────────────────────────────────────────────
const dienstenHTML = `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Diensten — De Groot & Partners</title>
<meta name="description" content="Alle accountancy-diensten van De Groot & Partners: jaarrekening, BTW, salarisadministratie, belastingadvies en meer.">
<link rel="stylesheet" href="style.css">
<style>
.page-hero{background:var(--navy);padding:140px 0 80px;position:relative;overflow:hidden}
.page-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 80% 50%,rgba(14,184,160,.1),transparent 60%)}
.page-hero .container{position:relative;z-index:1}
.page-hero h1{font-size:clamp(32px,5vw,52px);color:var(--white);margin-bottom:16px}
.page-hero p{font-size:17px;color:rgba(255,255,255,.6);max-width:560px}

.services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
.service-card{background:var(--white);border:1px solid var(--grey-200);border-radius:var(--r-xl);padding:36px;box-shadow:var(--sh-sm);transition:all .3s;display:flex;flex-direction:column}
.service-card:hover{box-shadow:var(--sh-lg);transform:translateY(-5px);border-color:var(--teal)}
.svc-icon{width:56px;height:56px;border-radius:14px;background:var(--teal-light);display:flex;align-items:center;justify-content:center;margin-bottom:20px}
.svc-icon svg{width:26px;height:26px;stroke:var(--teal);fill:none;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}
.service-card h3{font-size:18px;color:var(--navy);margin-bottom:10px}
.service-card>p{font-size:13.5px;line-height:1.65;margin-bottom:18px;flex:1}
.svc-list{display:flex;flex-direction:column;gap:7px;margin-bottom:22px}
.svc-list li{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--grey-700)}
.svc-list li::before{content:'';width:5px;height:5px;border-radius:50%;background:var(--teal);flex-shrink:0}
.svc-price{font-size:13px;font-weight:700;color:var(--navy);background:var(--grey-100);padding:10px 14px;border-radius:var(--r-sm);text-align:center}
.svc-price em{color:var(--teal);font-style:normal}

.pricing-note{background:var(--navy);color:var(--white);border-radius:var(--r-xl);padding:40px;display:flex;align-items:center;gap:32px;margin-top:48px}
.pricing-note-icon{width:56px;height:56px;background:rgba(14,184,160,.15);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.pricing-note-icon svg{width:26px;height:26px;stroke:var(--teal);fill:none;stroke-width:1.75}
.pricing-note h3{font-size:18px;color:var(--white);margin-bottom:6px}
.pricing-note p{font-size:14px;color:rgba(255,255,255,.6);line-height:1.6;margin:0}

@media(max-width:900px){.services-grid{grid-template-columns:1fr 1fr}}
@media(max-width:560px){.services-grid{grid-template-columns:1fr}.pricing-note{flex-direction:column;gap:20px}}
</style>
</head>
<body>
${navHTML('diensten')}

<section class="page-hero">
  <div class="container">
    <div class="label-tag label-tag-white">Onze diensten</div>
    <h1>Alles voor uw financiële administratie</h1>
    <p>Van jaarrekening tot salarisadministratie — wij bieden een compleet pakket zodat u zich kunt focussen op ondernemen.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="services-grid">
      <div class="service-card fade-in">
        <div class="svc-icon"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
        <h3>Jaarrekening</h3>
        <p>Wij stellen uw jaarrekening op conform de geldende wet- en regelgeving, tijdig en correct ingediend bij de Kamer van Koophandel.</p>
        <ul class="svc-list">
          <li>Balans & winst-en-verliesrekening</li>
          <li>Toelichting en bijlagen</li>
          <li>Deponering bij KvK</li>
          <li>Afstemming met belastingaangifte</li>
        </ul>
        <div class="svc-price">Vanaf <em>€399</em> per jaar</div>
      </div>

      <div class="service-card fade-in fade-in-delay-1">
        <div class="svc-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg></div>
        <h3>BTW-aangifte</h3>
        <p>Nooit meer een BTW-deadline missen. Wij verzorgen uw kwartaal- of maandaangiften correct en op tijd.</p>
        <ul class="svc-list">
          <li>Maand- of kwartaalangifte</li>
          <li>Suppletieaangifte indien nodig</li>
          <li>ICP-aangifte (grensoverschrijdend)</li>
          <li>Bezwaar & beroep bij belastingdienst</li>
        </ul>
        <div class="svc-price">Vanaf <em>€75</em> per aangifte</div>
      </div>

      <div class="service-card fade-in fade-in-delay-2">
        <div class="svc-icon"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
        <h3>Salarisadministratie</h3>
        <p>Correcte loonstroken elke maand, loonaangiften op tijd en alle HR-gerelateerde administratie in één hand.</p>
        <ul class="svc-list">
          <li>Maandelijkse loonstroken</li>
          <li>Loonaangifte bij belastingdienst</li>
          <li>Vakantiegeld & eindejaarsuitkering</li>
          <li>Ziekmelding & WGA-administratie</li>
        </ul>
        <div class="svc-price">Vanaf <em>€35</em> per medewerker/maand</div>
      </div>

      <div class="service-card fade-in">
        <div class="svc-icon"><svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
        <h3>Belastingadvies</h3>
        <p>Optimale belastingplanning, zodat u legaal zo min mogelijk belasting betaalt en uw vermogen maximaal behoudt.</p>
        <ul class="svc-list">
          <li>Inkomstenbelasting (IB)</li>
          <li>Vennootschapsbelasting (VPB)</li>
          <li>Dividendbelasting & DGA-salaris</li>
          <li>Fiscale structuuradvies</li>
        </ul>
        <div class="svc-price">Vanaf <em>€125</em> per uur</div>
      </div>

      <div class="service-card fade-in fade-in-delay-1">
        <div class="svc-icon"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
        <h3>Bedrijfsadvies</h3>
        <p>Strategisch meedenken over uw bedrijf: van financiering tot overnames en groeiplannen.</p>
        <ul class="svc-list">
          <li>Business plan & prognose</li>
          <li>Financieringsaanvragen</li>
          <li>Overname & due diligence</li>
          <li>Kwartaalgesprekken & KPI's</li>
        </ul>
        <div class="svc-price">Maatwerk offerte</div>
      </div>

      <div class="service-card fade-in fade-in-delay-2">
        <div class="svc-icon"><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
        <h3>Startershulp</h3>
        <p>Begint u een nieuw bedrijf? Wij helpen u van KvK-inschrijving tot uw eerste factuur en alles daartussenin.</p>
        <ul class="svc-list">
          <li>KvK-inschrijving & rechtsvorm</li>
          <li>BTW-nummer aanvragen</li>
          <li>Administratie opzetten</li>
          <li>Eerste jaarrekening</li>
        </ul>
        <div class="svc-price">Starterspakket <em>€199</em></div>
      </div>
    </div>

    <div class="pricing-note fade-in">
      <div class="pricing-note-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></div>
      <div>
        <h3>Vaste maandprijs, geen verrassingen</h3>
        <p>Alle bovenstaande diensten zijn ook beschikbaar als all-in maandpakket. U betaalt één vast bedrag per maand en wij regelen de rest. Vraag een gratis offerte aan via onze <a href="/client-projects/de-groot-accountants/contact/" style="color:var(--teal);font-weight:600">contactpagina</a>.</p>
      </div>
    </div>
  </div>
</section>

${footerHTML}
${scriptHTML}
</body>
</html>`;

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT.HTML
// ─────────────────────────────────────────────────────────────────────────────
const contactHTML = `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Contact — De Groot & Partners</title>
<meta name="description" content="Neem contact op met De Groot & Partners. Gratis kennismakingsgesprek inplannen. Amsterdam, bereikbaar ma-vr 08:30-17:30.">
<link rel="stylesheet" href="style.css">
<style>
.page-hero{background:var(--navy);padding:140px 0 80px;position:relative;overflow:hidden}
.page-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 80% 50%,rgba(14,184,160,.1),transparent 60%)}
.page-hero .container{position:relative;z-index:1}
.page-hero h1{font-size:clamp(32px,5vw,52px);color:var(--white);margin-bottom:16px}
.page-hero p{font-size:17px;color:rgba(255,255,255,.6);max-width:560px}

.contact-grid{display:grid;grid-template-columns:1fr 420px;gap:64px;align-items:start}

/* Form */
.contact-form-wrap{background:var(--white);border:1px solid var(--grey-200);border-radius:var(--r-xl);padding:40px;box-shadow:var(--sh-md)}
.contact-form-wrap h2{font-size:22px;color:var(--navy);margin-bottom:6px}
.contact-form-wrap>p{font-size:13.5px;color:var(--grey-600);margin-bottom:28px}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.form-group{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
.form-group label{font-size:13px;font-weight:600;color:var(--navy)}
.form-group input,.form-group select,.form-group textarea{
  font-family:inherit;font-size:14px;padding:11px 14px;border:1.5px solid var(--grey-200);border-radius:var(--r-sm);color:var(--text);background:var(--white);transition:border-color .2s,box-shadow .2s;outline:none
}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{border-color:var(--teal);box-shadow:0 0 0 3px rgba(14,184,160,.1)}
.form-group textarea{resize:vertical;min-height:110px;line-height:1.5}
.form-submit{width:100%;background:var(--teal);color:var(--white);border:none;padding:14px;border-radius:var(--r-md);font-family:inherit;font-size:15px;font-weight:700;cursor:pointer;transition:all .25s;display:flex;align-items:center;justify-content:center;gap:8px}
.form-submit:hover{background:var(--teal-dark);transform:translateY(-1px);box-shadow:0 8px 24px rgba(14,184,160,.3)}
.form-success{display:none;text-align:center;padding:20px;background:var(--teal-light);border-radius:var(--r-md);color:var(--teal-dark);font-weight:600;margin-top:16px}

/* Info sidebar */
.contact-info{display:flex;flex-direction:column;gap:20px}
.info-card{background:var(--white);border:1px solid var(--grey-200);border-radius:var(--r-lg);padding:24px;box-shadow:var(--sh-sm)}
.info-card-header{display:flex;align-items:center;gap:12px;margin-bottom:14px}
.info-card-icon{width:40px;height:40px;background:var(--teal-light);border-radius:10px;display:flex;align-items:center;justify-content:center}
.info-card-icon svg{width:18px;height:18px;stroke:var(--teal);fill:none;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}
.info-card h3{font-size:15px;font-weight:700;color:var(--navy)}
.info-card p,.info-card a{font-size:13.5px;color:var(--grey-600);line-height:1.65;display:block}
.info-card a:hover{color:var(--teal)}
.hours-grid{display:grid;grid-template-columns:auto 1fr;gap:4px 16px}
.hours-grid span:nth-child(odd){font-size:13px;font-weight:600;color:var(--navy)}
.hours-grid span:nth-child(even){font-size:13px;color:var(--grey-600)}

/* FAQ */
.faq-list{display:flex;flex-direction:column;gap:0}
.faq-item{border-bottom:1px solid var(--grey-200);overflow:hidden}
.faq-item:first-child{border-top:1px solid var(--grey-200)}
.faq-q{display:flex;align-items:center;justify-content:space-between;padding:18px 0;cursor:pointer;font-size:14px;font-weight:600;color:var(--navy);gap:12px;user-select:none}
.faq-q svg{width:16px;height:16px;stroke:var(--teal);fill:none;stroke-width:2.5;flex-shrink:0;transition:transform .3s}
.faq-item.open .faq-q svg{transform:rotate(45deg)}
.faq-a{font-size:13.5px;color:var(--grey-600);line-height:1.7;max-height:0;overflow:hidden;transition:max-height .35s ease,padding .35s ease}
.faq-item.open .faq-a{max-height:200px;padding-bottom:16px}

@media(max-width:900px){.contact-grid{grid-template-columns:1fr}}
@media(max-width:560px){.form-row{grid-template-columns:1fr}}
</style>
</head>
<body>
${navHTML('contact')}

<section class="page-hero">
  <div class="container">
    <div class="label-tag label-tag-white">Contact</div>
    <h1>Laten we kennismaken</h1>
    <p>Neem contact op voor een gratis en vrijblijvend gesprek. Wij reageren binnen 1 werkdag.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="contact-grid">
      <!-- FORM -->
      <div class="contact-form-wrap fade-in">
        <h2>Stuur ons een bericht</h2>
        <p>Vul het formulier in en wij nemen zo snel mogelijk contact met u op.</p>
        <form id="contact-form" action="https://api.web3forms.com/submit" method="POST">
          <input type="hidden" name="access_key" value="16fb32e8-43cd-4b8c-b6ad-904a4efd8e59">
          <input type="hidden" name="subject" value="Nieuw bericht — De Groot & Partners website">
          <input type="hidden" name="redirect" value="false">
          <div class="form-row">
            <div class="form-group">
              <label for="naam">Naam *</label>
              <input type="text" id="naam" name="naam" required placeholder="Jan Jansen">
            </div>
            <div class="form-group">
              <label for="bedrijf">Bedrijfsnaam</label>
              <input type="text" id="bedrijf" name="bedrijf" placeholder="Jansen B.V.">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="email">E-mailadres *</label>
              <input type="email" id="email" name="email" required placeholder="jan@jansen.nl">
            </div>
            <div class="form-group">
              <label for="telefoon">Telefoonnummer</label>
              <input type="tel" id="telefoon" name="telefoon" placeholder="06 12345678">
            </div>
          </div>
          <div class="form-group">
            <label for="dienst">Waarmee kunnen wij u helpen?</label>
            <select id="dienst" name="dienst">
              <option value="">Selecteer een dienst…</option>
              <option>Jaarrekening</option>
              <option>BTW-aangifte</option>
              <option>Salarisadministratie</option>
              <option>Belastingadvies</option>
              <option>Bedrijfsadvies</option>
              <option>Startershulp</option>
              <option>Anders / weet ik nog niet</option>
            </select>
          </div>
          <div class="form-group">
            <label for="bericht">Bericht *</label>
            <textarea id="bericht" name="bericht" required placeholder="Vertel ons kort over uw situatie en uw vraag…"></textarea>
          </div>
          <button type="submit" class="form-submit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Bericht versturen
          </button>
        </form>
        <div class="form-success" id="form-success">
          ✓ Bedankt voor uw bericht! Wij nemen binnen 1 werkdag contact met u op.
        </div>
      </div>

      <!-- SIDEBAR -->
      <div class="contact-info fade-in fade-in-delay-1">
        <div class="info-card">
          <div class="info-card-header">
            <div class="info-card-icon"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.72-.72a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.24 17z"/></svg></div>
            <h3>Telefoon & e-mail</h3>
          </div>
          <a href="tel:+31201234567">020 123 45 67</a>
          <a href="mailto:info@degrootpartners.nl">info@degrootpartners.nl</a>
        </div>
        <div class="info-card">
          <div class="info-card-header">
            <div class="info-card-icon"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
            <h3>Adres</h3>
          </div>
          <p>Keizersgracht 45<br>1015 CD Amsterdam</p>
          <p style="margin-top:8px;font-size:12px;color:var(--grey-400)">Bereikbaar met tram 1, 2 en 5 (halte Keizersgracht)</p>
        </div>
        <div class="info-card">
          <div class="info-card-header">
            <div class="info-card-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
            <h3>Openingstijden</h3>
          </div>
          <div class="hours-grid">
            <span>Ma – Vr</span><span>08:30 – 17:30</span>
            <span>Zaterdag</span><span>Op afspraak</span>
            <span>Zondag</span><span>Gesloten</span>
          </div>
        </div>

        <!-- FAQ -->
        <div style="margin-top:8px">
          <h3 style="font-size:16px;color:var(--navy);margin-bottom:16px">Veelgestelde vragen</h3>
          <div class="faq-list">
            <div class="faq-item">
              <div class="faq-q">Hoe snel reageren jullie?<svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div>
              <div class="faq-a">Wij reageren binnen 1 werkdag op alle aanvragen. Bij spoed kunt u ons ook telefonisch bereiken.</div>
            </div>
            <div class="faq-item">
              <div class="faq-q">Is het eerste gesprek gratis?<svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div>
              <div class="faq-a">Ja, het eerste kennismakingsgesprek is altijd gratis en vrijblijvend. We bespreken uw situatie en geven u een heldere offerte.</div>
            </div>
            <div class="faq-item">
              <div class="faq-q">Helpen jullie ook ZZP'ers?<svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div>
              <div class="faq-a">Absoluut. Wij helpen ondernemers van alle soorten en maten, van ZZP'ers tot BV's met meerdere medewerkers.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

${footerHTML}

<script>
// Form submit
const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');
if(form){
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Verzenden…';
    btn.disabled = true;
    try {
      const res = await fetch(form.action, {method:'POST', body: new FormData(form), headers:{Accept:'application/json'}});
      const data = await res.json();
      if(data.success){
        form.style.display = 'none';
        success.style.display = 'block';
      } else {
        btn.textContent = 'Probeer opnieuw';
        btn.disabled = false;
      }
    } catch(err){ btn.textContent = 'Fout — probeer opnieuw'; btn.disabled = false; }
  });
}
// FAQ accordion
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if(!isOpen) item.classList.add('open');
  });
});
</script>
${scriptHTML}
</body>
</html>`;

// Write all files
const files = {
  'index.html': indexHTML,
  'over-ons/index.html': overOnsHTML,
  'diensten/index.html': dienstenHTML,
  'contact/index.html': contactHTML,
};

for (const [name, content] of Object.entries(files)) {
  const filePath = path.join(base, name);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ Written:', name, '(' + content.length + ' bytes)');
}

console.log('\nAll done! Files in:', base);

