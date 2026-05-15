const { chromium } = require('../node_modules/playwright-core');
const path = require('path');
const fs = require('fs');

const logoB64 = fs.readFileSync(path.resolve(__dirname, '../assets/Horizontallogo.png')).toString('base64');
const logoSrc = `data:image/png;base64,${logoB64}`;

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  width: 1200px;
  height: 630px;
  overflow: hidden;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif;
}

.bar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 5px;
  display: flex;
}
.bar-r { flex: 1; background: #df3821; }
.bar-l { flex: 1; background: #b9e185; }

.bar-btm {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 5px;
  display: flex;
}
.bar-btm .bar-r { background: #b9e185; }
.bar-btm .bar-l { background: #df3821; }

.logo {
  width: 520px;
  display: block;
}

.domain {
  margin-top: 36px;
  font-size: 18px;
  font-weight: 500;
  color: #999;
  letter-spacing: 0.08em;
}
</style>
</head>
<body>
  <div class="bar"><div class="bar-r"></div><div class="bar-l"></div></div>
  <img class="logo" src="${logoSrc}">
  <div class="domain">webkreatives.com</div>
  <div class="bar-btm"><div class="bar-r"></div><div class="bar-l"></div></div>
</body>
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
