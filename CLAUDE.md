# WebKreatives — working rules

Static HTML/CSS/vanilla JS on GitHub Pages (webkreatives.com, repo CsabaVK/WebKreatives, work on `main`).
Client sites live in `client-projects/<client>/` with their own `site.css`, `site.js`, `data.js` (all client-editable facts in data.js).

## Every session
- Caveman mode is on. Short answers, no recaps, no option lists unless asked.
- "save" = commit + push. Stop the dev server (launch.json `webkreatives`, port 8080) when done.
- Verify in headless Chrome before showing anything: puppeteer-core is in node_modules, Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`. Element screenshots, not clip. Show only the shot that proves the point.
- Bash heredocs eat backslashes: write helper scripts with the Write tool. Files mix CRLF/LF: Python reads/writes with `newline=''`.
- After editing a live site's CSS/JS/data, bump `?v=N` on every page that loads it (Pages CDN caches ~10 min).
- Link previews need absolute `og:image` URLs and a JPG/PNG, never webp.

## New client site — before the first line of code
1. Write `client-projects/<client>/PRODUCT.md` (who it is for, tone, brand, anti-references) and `DESIGN.md` (palette, type, spacing, components). The root PRODUCT.md is WebKreatives' own — never use it for a client.
2. `/impeccable shape` with that context, get the brief confirmed, then `/impeccable craft`. Before showing the site: `/impeccable audit`, and `redesign-existing-projects` if it still reads generic.
3. Not-AI checklist, any hit means redesign: purple/blue gradient hero · row of three equal cards with icons in circles · Inter/Roboto by default · glass blur on everything · everything centered · "Welcome to…" copy · stock-photo placeholders · more than one accent colour · emoji as bullets. Wanted: the client's real photos, one committed type pairing, asymmetric layout, a hierarchy you can squint at, motion that explains something.
