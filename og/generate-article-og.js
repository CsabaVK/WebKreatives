/**
 * Usage: node generate-article-og.js <slug> "Article Title" "https://image-url.jpg"
 * Output: og/articles/<slug>.png  +  patches articles/<slug>/index.html
 *
 * Example:
 *   node generate-article-og.js my-new-article "Why Your Thing Matters" "https://images.unsplash.com/photo-xxx"
 */

const { chromium } = require('../node_modules/playwright-core');
const path = require('path');
const fs = require('fs');

const [,, slug, title, imageUrl] = process.argv;
if (!slug || !title) {
  console.error('Usage: node generate-article-og.js <slug> "Article Title" "https://image-url"');
  process.exit(1);
}

const logoB64 = fs.readFileSync(path.resolve(__dirname, '../assets/Horizontallogo.png')).toString('base64');
const logoSrc = `data:image/png;base64,${logoB64}`;

const len = title.length;
const fontSize = len < 32 ? 68 : len < 48 ? 54 : len < 64 ? 44 : 36;

// If no image provided, use a solid brand-coloured right panel
const rightPanel = imageUrl
  ? `background-image: url('${imageUrl}'); background-size: cover; background-position: center;`
  : `background: linear-gradient(135deg, #df3821 0%, #0d0d0d 100%);`;

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@900&display=swap" rel="stylesheet">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  width: 1200px;
  height: 630px;
  overflow: hidden;
  font-family: 'Unbounded', 'Arial Black', sans-serif;
  position: relative;
}

/* ── Layout ── */
.split {
  display: flex;
  width: 1200px;
  height: 630px;
}

/* ── Left panel ── */
.left {
  width: 680px;
  flex-shrink: 0;
  background: #ffffff;
  padding: 50px 56px 38px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
}

/* ── Right panel (image) ── */
.right {
  flex: 1;
  position: relative;
  ${rightPanel}
}

/* Soft blend from left white into image */
.right::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(255,255,255,0.22) 0%, transparent 35%);
  z-index: 1;
}

/* Red tint overlay on image */
.right::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(13,13,13,0.18);
  z-index: 1;
}

/* ── Top accent bar ── */
.bar-top {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 5px;
  display: flex;
  z-index: 10;
}
.bar-top .r { flex: 1; background: #df3821; }
.bar-top .l { flex: 1; background: #b9e185; }

/* ── Bottom accent bar ── */
.bar-bot {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 5px;
  display: flex;
  z-index: 10;
}
.bar-bot .r { flex: 1; background: #b9e185; }
.bar-bot .l { flex: 1; background: #df3821; }

/* ── Logo ── */
.logo {
  width: 170px;
  display: block;
  margin-bottom: auto;
}

/* ── Label ── */
.label {
  font-family: -apple-system, 'Helvetica Neue', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: #648dcb;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 18px;
  margin-top: 36px;
  display: flex;
  align-items: center;
  gap: 11px;
}
.label::before, .label::after {
  content: '';
  display: block;
  width: 20px;
  height: 1px;
  background: #648dcb;
}

/* ── Title ── */
.title {
  font-family: 'Unbounded', 'Arial Black', sans-serif;
  font-weight: 900;
  font-size: ${fontSize}px;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #0d0d0d;
  max-width: 580px;
}

/* ── Domain ── */
.domain {
  margin-top: auto;
  padding-top: 28px;
  font-family: -apple-system, 'Helvetica Neue', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #c0c0c0;
  letter-spacing: 0.07em;
}
</style>
</head>
<body>
  <div class="bar-top"><div class="r"></div><div class="l"></div></div>

  <div class="split">
    <div class="left">
      <img class="logo" src="${logoSrc}">
      <div class="label">Article</div>
      <div class="title">${title}</div>
      <div class="domain">webkreatives.com</div>
    </div>
    <div class="right"></div>
  </div>

  <div class="bar-bot"><div class="r"></div><div class="l"></div></div>
</body>
</html>`;

(async () => {
  const outDir = path.resolve(__dirname, 'articles');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const outPath = path.join(outDir, `${slug}.png`);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.screenshot({ path: outPath, type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await browser.close();

  console.log('Generated:', outPath);

  // Patch og:image in article HTML
  const articleHtml = path.resolve(__dirname, `../articles/${slug}/index.html`);
  if (fs.existsSync(articleHtml)) {
    let src = fs.readFileSync(articleHtml, 'utf8');
    const newUrl = `https://webkreatives.com/og/articles/${slug}.png`;
    src = src.replace(
      /<meta property="og:image" content="[^"]*">/,
      `<meta property="og:image" content="${newUrl}">`
    );
    fs.writeFileSync(articleHtml, src, 'utf8');
    console.log('Updated og:image in:', articleHtml);
  }
})();
