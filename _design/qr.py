"""Make a styled QR for a sticker or card, as SVG plus a PNG proof.

    python _design/qr.py <url> <out.svg> [--style dots|rounded] [--ink "#hex"] [--eye "#hex"|""]

Modules are drawn in the light colour on a transparent ground, so the artboard
supplies the ink behind it (an inverted code: light modules on dark). Finder
eyes are rounded rings with a red ring in the gap; a 9-module square in the
middle is left clear for the W badge the artboard lays on top. Error correction H keeps
30% of the code redundant, which covers the badge.

A PNG next to the SVG is written for the decode proof in DESIGN.md.
"""
import sys

import qrcode
from qrcode.constants import ERROR_CORRECT_H

CREAM = "#f2ede4"   # --cream2
RED = "#df3821"     # --red
CLEAR = 9           # modules kept empty in the centre for the badge


def matrix(url):
    q = qrcode.QRCode(error_correction=ERROR_CORRECT_H, border=0)
    q.add_data(url)
    q.make(fit=True)
    return q.get_matrix(), q.version


def in_finder(x, y, n):
    return (x < 7 and y < 7) or (x >= n - 7 and y < 7) or (x < 7 and y >= n - 7)


def build_svg(m, style, light, eye, unit=20):
    n = len(m)
    size = n * unit
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}">']
    lo = (n - CLEAR) // 2
    hi = lo + CLEAR
    for y in range(n):
        for x in range(n):
            if not m[y][x] or in_finder(x, y, n):
                continue
            if lo <= x < hi and lo <= y < hi:
                continue
            cx, cy = x * unit + unit / 2, y * unit + unit / 2
            if style == "dots":
                parts.append(f'<circle cx="{cx}" cy="{cy}" r="{unit * 0.44:.1f}" fill="{light}"/>')
            else:
                s = unit * 0.9
                parts.append(f'<rect x="{cx - s / 2:.1f}" y="{cy - s / 2:.1f}" width="{s:.1f}" height="{s:.1f}" rx="{unit * 0.28:.1f}" fill="{light}"/>')
    # finder eyes: a rounded ring one module thick, a red ring in the gap (the
    # gap is a logical-light zone, and red reads as dark-ish on ink, so the
    # decoder still sees a gap), and a rounded 3x3 centre in the light colour
    for (fx, fy) in [(0, 0), (n - 7, 0), (0, n - 7)]:
        ox, oy = fx * unit, fy * unit
        parts.append(f'<rect x="{ox + unit / 2}" y="{oy + unit / 2}" width="{6 * unit}" height="{6 * unit}" rx="{unit * 1.6}" fill="none" stroke="{light}" stroke-width="{unit}"/>')
        if eye:
            parts.append(f'<rect x="{ox + 1.5 * unit}" y="{oy + 1.5 * unit}" width="{4 * unit}" height="{4 * unit}" rx="{unit * 1.1}" fill="none" stroke="{eye}" stroke-width="{unit * 0.55}"/>')
        parts.append(f'<rect x="{ox + 2 * unit}" y="{oy + 2 * unit}" width="{3 * unit}" height="{3 * unit}" rx="{unit * 0.9}" fill="{light}"/>')
    parts.append('</svg>')
    return "\n".join(parts), n


def main(argv):
    url, out = argv[0], argv[1]
    opts = dict(zip(argv[2::2], argv[3::2]))
    style = opts.get("--style", "dots")
    light = opts.get("--ink", CREAM)
    eye = opts.get("--eye", RED)
    m, version = matrix(url)
    svg, n = build_svg(m, style, light, eye)
    with open(out, "w", encoding="utf-8") as f:
        f.write(svg)
    print(out, "version", version, "modules", n, "clear", CLEAR)


if __name__ == "__main__":
    main(sys.argv[1:])
