"""Styled QR as SVG, for stickers and cards.

    python templates/print/qr.py <url> <out.svg> --modules "#hex" [--eye "#hex"]
        [--accents "#hex,#hex,..."] [--style dots|rounded|square] [--clear 9]

The modules are drawn in --modules on a transparent ground; the artboard
supplies the ground colour. Finder eyes: a rounded ring in the module colour,
an empty gap, and a 3x3 centre in --eye (default: the module colour). --accents
recolours a handful of data dots; --clear leaves a square of that many modules
empty in the middle for a badge (0 for none). Error correction H throughout.

Polarity: on a dark ground use light modules (an inverted code). Phone cameras
read inverted codes; some old scanner apps do not. On a light ground use dark
modules. Either way, check the result with check.py before printing.
"""
import sys

import qrcode
from qrcode.constants import ERROR_CORRECT_H


def matrix(url):
    q = qrcode.QRCode(error_correction=ERROR_CORRECT_H, border=0)
    q.add_data(url)
    q.make(fit=True)
    return q.get_matrix(), q.version


def in_finder(x, y, n):
    return (x < 7 and y < 7) or (x >= n - 7 and y < 7) or (x < 7 and y >= n - 7)


def build_svg(m, style, light, eye, accents, clear, unit=20):
    n = len(m)
    size = n * unit
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}">']
    lo = (n - clear) // 2
    hi = lo + clear
    cand = [(x, y) for y in range(n) for x in range(n)
            if m[y][x] and not in_finder(x, y, n) and x != 6 and y != 6
            and not (lo - 1 <= x < hi + 1 and lo - 1 <= y < hi + 1)]
    coloured = {}
    if accents:
        step = max(1, len(cand) // (len(accents) + 1))
        coloured = {cand[(i + 1) * step]: accents[i] for i in range(len(accents)) if (i + 1) * step < len(cand)}
    for y in range(n):
        for x in range(n):
            if not m[y][x] or in_finder(x, y, n) or (lo <= x < hi and lo <= y < hi):
                continue
            cx, cy = x * unit + unit / 2, y * unit + unit / 2
            fill = coloured.get((x, y), light)
            if style == "dots":
                out.append(f'<circle cx="{cx}" cy="{cy}" r="{unit * 0.44:.1f}" fill="{fill}"/>')
            elif style == "rounded":
                s = unit * 0.9
                out.append(f'<rect x="{cx - s / 2:.1f}" y="{cy - s / 2:.1f}" width="{s:.1f}" height="{s:.1f}" rx="{unit * 0.28:.1f}" fill="{fill}"/>')
            else:
                out.append(f'<rect x="{x * unit}" y="{y * unit}" width="{unit}" height="{unit}" fill="{fill}"/>')
    for (fx, fy) in [(0, 0), (n - 7, 0), (0, n - 7)]:
        ox, oy = fx * unit, fy * unit
        out.append(f'<rect x="{ox + unit / 2}" y="{oy + unit / 2}" width="{6 * unit}" height="{6 * unit}" rx="{unit * 1.6}" fill="none" stroke="{light}" stroke-width="{unit}"/>')
        out.append(f'<rect x="{ox + 2 * unit}" y="{oy + 2 * unit}" width="{3 * unit}" height="{3 * unit}" rx="{unit * 0.9}" fill="{eye or light}"/>')
    out.append('</svg>')
    return "\n".join(out), n


def main(argv):
    url, out = argv[0], argv[1]
    o = dict(zip(argv[2::2], argv[3::2]))
    light = o.get("--modules", "#f2ede4")
    eye = o.get("--eye", "") or light
    accents = [c.strip() for c in o.get("--accents", "").split(",") if c.strip()]
    style = o.get("--style", "dots")
    clear = int(o.get("--clear", "9"))
    m, version = matrix(url)
    svg, n = build_svg(m, style, light, eye, accents, clear)
    with open(out, "w", encoding="utf-8") as f:
        f.write(svg)
    print(out, "version", version, "modules", n, "clear", clear, "accents", len(accents))


if __name__ == "__main__":
    main(sys.argv[1:])
