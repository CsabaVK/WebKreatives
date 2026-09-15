"""Make a print-grade QR PNG for a sticker or card.

    python _design/qr.py <url> <out.png> [modules_px]

Ink modules on transparent ground, error correction H (30%), no logo. The
artboard puts it on cream. Default 24 px per module gives roughly 1000 px for a
short URL, well above the 300 dpi needed at 32 mm.
"""
import sys

import qrcode
from qrcode.constants import ERROR_CORRECT_H
from PIL import Image

INK = (17, 13, 12)  # oklch(8% .010 25) as sRGB, close enough for print proofing


def main(url, out, box=24):
    q = qrcode.QRCode(error_correction=ERROR_CORRECT_H, box_size=int(box), border=0)
    q.add_data(url)
    q.make(fit=True)
    im = q.make_image(fill_color=INK, back_color="white").convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            if px[x, y][:3] == (255, 255, 255):
                px[x, y] = (255, 255, 255, 0)
    im.save(out)
    print(out, im.size, "version", q.version)


if __name__ == "__main__":
    main(*sys.argv[1:4])
