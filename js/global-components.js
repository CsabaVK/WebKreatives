(function () {
  'use strict';

  /* ── 1. Force dark theme ──────────────────────────────── */
  if (document.body) document.body.setAttribute('data-theme', 'dark');

  /* ── 2. Inject fonts + CSS ───────────────────────────── */
  if (!document.getElementById('wk-gc-fonts')) {
    const l = document.createElement('link');
    l.id = 'wk-gc-fonts';
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=Figtree:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap';
    document.head.appendChild(l);
  }

  const styleId = 'wk-gc-style';
  if (!document.getElementById(styleId)) {
    const s = document.createElement('style');
    s.id = styleId;
    s.textContent = `
/* ── WK GLOBAL DESIGN TOKENS ────────────────────────── */
:root{
  --wk-ink:   oklch(8%  .010 25);
  --wk-ink2:  oklch(18% .010 25);
  --wk-cream: oklch(97% .008 80);
  --wk-red:   #df3821;
  --wk-white: oklch(99% .004 80);
  --wk-lime:  #b9e185;
  --wk-f1:    'Unbounded',sans-serif;
  --wk-f2:    'Figtree',sans-serif;
  --wk-ease:  cubic-bezier(.16,1,.3,1);
}

@media(pointer:coarse), (max-width:900px){
  body,button{cursor:auto!important}
  a,button{cursor:pointer!important}
  #c-dot,#c-ring{display:none!important}
}

.cookie-banner{
  position:fixed;left:50%;bottom:16px;transform:translateX(-50%);
  width:min(calc(100vw - 24px),760px);z-index:1200;
  border-radius:18px;padding:18px;
  font-family:var(--wk-f2);animation:wk-cookie-rise .32s var(--wk-ease);
}
@keyframes wk-cookie-rise{from{opacity:0;transform:translate(-50%,12px)}to{opacity:1;transform:translate(-50%,0)}}
.cookie-banner[hidden]{display:none!important}
.cookie-banner-inner{display:flex;align-items:flex-end;justify-content:space-between;gap:16px}
.cookie-copy strong{display:block;font-size:14px;margin-bottom:5px}
.cookie-copy p{font-size:13px;line-height:1.6;max-width:520px}
.cookie-copy a{color:var(--wk-red);font-weight:600;text-decoration:none}
.cookie-actions{display:flex;gap:8px;align-items:center;justify-content:flex-end;flex-shrink:0}
.cookie-btn{
  border-radius:10px;padding:11px 14px;font-family:var(--wk-f2);
  font-size:13px;font-weight:700;border:0;cursor:pointer;
  transition:transform .15s var(--wk-ease),opacity .15s;
}
.cookie-btn:hover{transform:translateY(-1px);opacity:.9}
.cookie-btn-primary{background:var(--wk-red);color:var(--wk-white)}
.cookie-btn-secondary{border:1px solid oklch(28% .010 25)}
.cookie-panel{display:none;border-top:1px solid oklch(22% .010 25);margin-top:14px;padding-top:12px}
.cookie-banner-expanded .cookie-panel{display:block}
.cookie-banner-customizing .cookie-actions{display:none}
.cookie-option{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:12px 0}
.cookie-option+.cookie-option{border-top:1px solid oklch(18% .010 25)}
.cookie-option strong{display:block;font-size:13px;margin-bottom:4px}
.cookie-option p{font-size:12px;line-height:1.55;max-width:520px}
.cookie-option-locked{opacity:.65}
.cookie-option-locked strong::after{content:' · always on';font-size:11px;font-weight:500;color:oklch(48% .006 25)}
.cookie-switch{position:relative;display:inline-flex;flex-shrink:0;margin-top:2px}
.cookie-switch input{position:absolute;opacity:0;pointer-events:none}
.cookie-switch span{width:46px;height:28px;border-radius:999px;display:block;position:relative;transition:background .2s}
.cookie-switch span::after{
  content:'';position:absolute;top:4px;left:4px;width:20px;height:20px;
  border-radius:50%;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.18);
  transition:left .2s;
}
.cookie-switch input:checked+span::after{left:22px}
.cookie-panel-actions{display:flex;justify-content:flex-end;margin-top:12px}
.cookie-manage-btn{
  position:fixed;left:14px;bottom:14px;z-index:1100;
  border-radius:999px;padding:10px 12px;font-family:var(--wk-f2);
  font-size:11px;font-weight:700;cursor:pointer;
}
@media(max-width:640px){
  .cookie-banner{
    left:12px;right:12px;bottom:12px;width:auto;
    transform:none;padding:15px;
    animation:wk-cookie-rise-mobile .32s var(--wk-ease);
  }
  .cookie-banner-inner{flex-direction:column;align-items:flex-start}
  .cookie-actions,.cookie-panel-actions{width:100%;justify-content:stretch}
  .cookie-btn{flex:1}
  .cookie-copy p{font-size:12.5px}
  .cookie-manage-btn{left:12px;right:auto;width:auto;text-align:left}
}
@keyframes wk-cookie-rise-mobile{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}

/* ── DARK COOKIE OVERRIDE ────────────────────────────── */
.cookie-banner{
  background:oklch(13% .010 25) !important;
  border-color:oklch(24% .010 25) !important;
  box-shadow:0 24px 70px oklch(0% 0 0 / .55) !important;
}
.cookie-banner .cookie-copy strong,.cookie-banner .cookie-option strong{
  color:oklch(94% .005 25) !important;
}
.cookie-banner .cookie-copy p,.cookie-banner .cookie-option p{
  color:oklch(60% .006 25) !important;
}
.cookie-banner .cookie-panel{border-top-color:oklch(22% .010 25) !important}
.cookie-btn-secondary{
  color:oklch(82% .006 25) !important;
  border-color:oklch(28% .010 25) !important;
  background:oklch(18% .010 25) !important;
}
.cookie-switch span{background:oklch(28% .010 25) !important}
.cookie-switch input:checked+span{background:var(--wk-red) !important}
.cookie-manage-btn{
  background:oklch(15% .010 25) !important;
  border-color:oklch(28% .012 25) !important;
  color:oklch(75% .006 25) !important;
  box-shadow:0 4px 16px oklch(0% 0 0 / .4) !important;
}
`;
    document.head.appendChild(s);
  }

})();
