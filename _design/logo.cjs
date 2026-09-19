#!/usr/bin/env node
/*
 * Render the wordmark from _design/logo.html to a transparent PNG.
 *   node _design/logo.cjs <out.png> [scale=3] [--dark] [--check]
 * --dark sets the type white for dark grounds. --check paints the site ground behind
 * it (cream, or ink with --dark) for a look; the deliverable has none.
 */
const path = require('path');
const puppeteer = require(path.join(__dirname, '..', 'node_modules', 'puppeteer-core'));
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

(async () => {
  const [out, scaleArg, ...flags] = process.argv.slice(2);
  const scale = Number(scaleArg) || 3;
  const dark = flags.includes('--dark'), check = flags.includes('--check');
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 520, height: 260, deviceScaleFactor: scale });
  const url = 'file:///' + path.join(__dirname, 'logo.html').replace(/\\/g, '/') + (dark ? '?dark=1' : '');
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => document.body.dataset.ready === '1');
  if (check) await page.evaluate(() => document.body.classList.add('check'));
  await (await page.$('#logo')).screenshot({ path: out, omitBackground: !check });
  await browser.close();
  console.log(out);
})();
