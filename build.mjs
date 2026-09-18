/* Build for GitHub Pages: copy every tracked file into _site/ and minify the
 * HTML, CSS and JS on the way. The source stays readable here; only the
 * published copy is compressed. Run by .github/workflows/pages.yml.
 * Local check: `node build.mjs && npx http-server _site -p 8081`. */
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { minify as html } from 'html-minifier-terser';
import { minify as js } from 'terser';
import CleanCSS from 'clean-css';

const OUT = '_site';
const SKIP = /^(_|\.)|^(node_modules|package(-lock)?\.json|build\.mjs|tmp-.*\.cjs|.*\.md)$/;
const css = new CleanCSS({ level: 1 });
const HTML_OPTS = {
  collapseWhitespace: true, conservativeCollapse: true, removeComments: true,
  minifyCSS: true, minifyJS: true, keepClosingSlash: true
};

rmSync(OUT, { recursive: true, force: true });
const files = execSync('git ls-files', { encoding: 'utf8' }).split('\n').filter(f => f && !SKIP.test(f));
let n = 0;
for (const f of files) {
  const out = join(OUT, f);
  mkdirSync(dirname(out), { recursive: true });
  const ext = extname(f);
  if (!['.html', '.css', '.js'].includes(ext)) { copyFileSync(f, out); continue; }
  const src = readFileSync(f, 'utf8');
  let min;
  try {
    min = ext === '.html' ? await html(src, HTML_OPTS)
        : ext === '.css'  ? css.minify(src).styles
        : (await js(src)).code;
  } catch (e) {
    console.warn('not minified:', f, e.message.split('\n')[0]);
    min = src;
  }
  writeFileSync(out, min);
  n++;
}
console.log(`${files.length} files, ${n} minified → ${OUT}/`);
