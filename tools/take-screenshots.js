const { chromium } = require('C:/Users/csaba/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const BASE = 'D:/.openclaw/Openclaw/projects/04-WebKreatives/client-projects';
const OUT  = 'D:/.openclaw/Openclaw/projects/04-WebKreatives/assets/screenshots';

const sites = [
  'de-groot-accountants',
  'tandarts-knoll',
  'leyenburger',
  'luna-beauty-studio',
  'studio-lena-fotografie',
  'maison-blanc-interieur',
  'klussenbedrijf-edward',
];

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  for (const s of sites) {
    const filePath = path.join(BASE, s, 'index.html').replace(/\\/g, '/');
    const url = 'file:///' + filePath;
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(2000);
      await page.evaluate(() => { const b = document.getElementById('wkBanner'); if (b) b.style.display = 'none'; });
      const outPath = path.join(OUT, s + '.png');
      await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: 1280, height: 900 } });
      console.log('OK  ' + s);
    } catch (e) {
      console.log('FAIL ' + s + ': ' + e.message.slice(0, 100));
    }
  }

  await browser.close();
  console.log('Done.');
})();
