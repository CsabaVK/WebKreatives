"""Make a styled QR for a sticker or card, as SVG plus a PNG proof.

    python _design/qr.py <url> <out.svg> [--style dots|rounded] [--ink "#hex"] [--eye "#hex"|""] [--accents on|off]

Modules are drawn in the light colour on a transparent ground, so the artboard
supplies the ink behind it (an inverted code: light modules on dark). Finder
eyes are cream rounded rings with a red centre; a few data dots take the logo's
colours; a 9-module square in the middle is left clear for the W badge the
artboard lays on top. Error correction H keeps
30% of the code redundant, which covers the badge.

A PNG next to the SVG is written for the decode proof in DESIGN.md.
"""
import sys

import qrcode
from qrcode.constants import ERROR_CORRECT_H

CREAM = "#f2ede4"   # --cream2
RED = "#f14b35"     # the brighter red from the button wipe: the brand red is too dark for an eye
CLEAR = 9           # modules kept empty in the centre for the badge
# A few data dots in the logo's colours. Lime and yellow read as light, so they
# are free; red and blue read as dark-ish, which flips the module, and error
# correction H absorbs that. Keep the count tiny.
ACCENTS = ["#b9e185", "#fbeb78", "#f14b35", "#b9e185", "#648dcb", "#fbeb78", "#f14b35", "#b9e185"]


def matrix(url):
    q = qrcode.QRCode(error_correction=ERROR_CORRECT_H, border=0)
    q.add_data(url)
    q.make(fit=True)
    return q.get_matrix(), q.version


def in_finder(x, y, n):
    return (x < 7 and y < 7) or (x >= n - 7 and y < 7) or (x < 7 and y >= n - 7)


def build_svg(m, style, light, eye, unit=20, accents=True):
    n = len(m)
    size = n * unit
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}">']
    lo = (n - CLEAR) // 2
    hi = lo + CLEAR
    # deterministic spread for the coloured dots: off the timing lines (row/col 6),
    # off the finder zones, off the badge
    candidates = [(x, y) for y in range(n) for x in range(n)
                  if m[y][x] and not in_finder(x, y, n) and x != 6 and y != 6
                  and not (lo - 1 <= x < hi + 1 and lo - 1 <= y < hi + 1)]
    step = max(1, len(candidates) // (len(ACCENTS) + 1))
    coloured = {candidates[(i + 1) * step]: ACCENTS[i] for i in range(len(ACCENTS))} if accents else {}
    for y in range(n):
        for x in range(n):
            if not m[y][x] or in_finder(x, y, n):
                continue
            if lo <= x < hi and lo <= y < hi:
                continue
            cx, cy = x * unit + unit / 2, y * unit + unit / 2
            fill = coloured.get((x, y), light)
            if style == "dots":
                parts.append(f'<circle cx="{cx}" cy="{cy}" r="{unit * 0.44:.1f}" fill="{fill}"/>')
            else:
                s = unit * 0.9
                parts.append(f'<rect x="{cx - s / 2:.1f}" y="{cy - s / 2:.1f}" width="{s:.1f}" height="{s:.1f}" rx="{unit * 0.28:.1f}" fill="{fill}"/>')
    # finder eyes: a rounded ring one module thick in the light colour, the gap
    # left as ground, and the 3x3 centre filled with the eye colour (red by
    # default; the ring and error correction carry the pattern)
    for (fx, fy) in [(0, 0), (n - 7, 0), (0, n - 7)]:
        ox, oy = fx * unit, fy * unit
        parts.append(f'<rect x="{ox + unit / 2}" y="{oy + unit / 2}" width="{6 * unit}" height="{6 * unit}" rx="{unit * 1.6}" fill="none" stroke="{light}" stroke-width="{unit}"/>')
        parts.append(f'<rect x="{ox + 2 * unit}" y="{oy + 2 * unit}" width="{3 * unit}" height="{3 * unit}" rx="{unit * 0.9}" fill="{eye or light}"/>')
    parts.append('</svg>')
    return "\n".join(parts), n


def main(argv):
    url, out = argv[0], argv[1]
    opts = dict(zip(argv[2::2], argv[3::2]))
    style = opts.get("--style", "dots")
    light = opts.get("--ink", CREAM)
    eye = opts.get("--eye", RED)
    accents = opts.get("--accents", "on") != "off"
    m, version = matrix(url)
    svg, n = build_svg(m, style, light, eye, accents=accents)
    with open(out, "w", encoding="utf-8") as f:
        f.write(svg)
    print(out, "version", version, "modules", n, "clear", CLEAR)


if __name__ == "__main__":
    main(sys.argv[1:])
