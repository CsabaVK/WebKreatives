const { chromium } = require('../node_modules/playwright-core');
const path = require('path');
const fs = require('fs');

const svgPath = path.resolve(__dirname, 'og-image.svg');
const svgContent = fs.readFileSync(svgPath, 'utf8');

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
* { margin: 0; padding: 0; }
body { width: 1200px; height: 630px; overflow: hidden; background: #0d0d0d; }
</style>
</head>
<body>${svgContent}</body>
</html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  const outPath = path.resolve(__dirname, 'og-image.png');
  await page.screenshot({ path: outPath, type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log('Generated:', outPath);
  await browser.close();
})();
