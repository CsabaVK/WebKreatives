const fs = require('fs');
const path = require('path');

const BASE = path.join('D:', '.openclaw', 'workspace', 'projects', '04-WebKreatives', 'client-projects');

const pages = [
  'klussenbedrijf-edward/index.html',
  'vanderberg-loodgieter/index.html',
  'studio-lena-fotografie/index.html',
  'luna-beauty-studio/index.html',
  'bakkerij-hartman/index.html',
  'nexus-it-solutions/index.html',
  'maison-blanc-interieur/index.html',
  'de-groot-accountants/index.html',
  'leyenburger/index.html',
  'tandarts-knoll/index.html',
];

const BANNER = `<!-- wk-concept-banner -->
<div id="wkBanner" style="position:fixed;top:0;left:0;right:0;z-index:99999;height:38px;background:#0d0d0d;color:#fff;display:flex;align-items:center;justify-content:center;gap:10px;font-family:system-ui,-apple-system,sans-serif;font-size:12px;font-weight:500;padding:0 44px 0 14px;box-shadow:0 2px 10px rgba(0,0,0,.35);letter-spacing:.1px">
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8BC34A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
  <span>Conceptontwerp door&#160;<a href="https://webkreatives.com/our-websites/" target="_blank" rel="noopener" style="color:#8BC34A;font-weight:700;text-decoration:none">WebKreatives</a>&#160;&mdash; dit is geen offici&#235;le website van dit bedrijf</span>
  <button id="wkBannerClose" aria-label="Sluiten" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;color:rgba(255,255,255,.45);cursor:pointer;font-size:19px;line-height:1;padding:4px 8px;transition:color .15s" onmouseenter="this.style.color='#fff'" onmouseleave="this.style.color='rgba(255,255,255,.45)'">&#215;</button>
</div>
<script>(function(){document.addEventListener('DOMContentLoaded',function(){var BH=38;var els=[];document.querySelectorAll('nav,.nav,header').forEach(function(el){var s=window.getComputedStyle(el);if(s.position==='fixed'&&s.top==='0px'){el.style.top=BH+'px';els.push(el);}});var btn=document.getElementById('wkBannerClose');if(btn)btn.addEventListener('click',function(){var b=document.getElementById('wkBanner');if(b)b.style.display='none';els.forEach(function(el){el.style.top='0';});});});})();</script>
<!-- /wk-concept-banner -->`;

let ok = 0, skip = 0;

pages.forEach(rel => {
  const file = path.join(BASE, rel);
  if (!fs.existsSync(file)) { console.log('MISSING:', file); return; }

  let html = fs.readFileSync(file, 'utf8');

  if (html.includes('wk-concept-banner') || html.includes('wkBanner')) {
    console.log('SKIP (already has banner):', rel);
    skip++;
    return;
  }

  // Insert right after <body> (with any attributes)
  const replaced = html.replace(/(<body[^>]*>)/, '$1\n' + BANNER);
  if (replaced === html) {
    console.log('WARN: no <body> tag found in', rel);
    return;
  }

  fs.writeFileSync(file, replaced, 'utf8');
  console.log('OK:', rel);
  ok++;
});

console.log(`\nDone: ${ok} updated, ${skip} skipped.`);
