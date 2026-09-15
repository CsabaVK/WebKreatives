"""Decode proof for a rendered sticker or card.

    python templates/print/check.py <render.png> [expected-url]

Reads the QR with zxing-cpp (the engine behind most scanner apps) at the full
size, at 400, 280 and 200 px, and through a blur; 160 px is reported as margin.
Every required row must decode before the file goes to print. Exit code 1 if
any required size fails.
"""
import sys

import cv2
import zxingcpp

path = sys.argv[1]
expected = sys.argv[2] if len(sys.argv) > 2 else None
im = cv2.imread(path)
ok_all = True


def run(tag, img, required=True):
    global ok_all
    r = zxingcpp.read_barcodes(img, formats=zxingcpp.BarcodeFormat.QRCode)
    text = r[0].text if r else None
    ok = bool(text) and (expected is None or text == expected)
    if required:
        ok_all &= ok
    print(f"{tag:>10}  {'ok' if ok else ('FAIL' if required else 'miss (margin only)')}  {text or ''}")


def small(sz):
    # scale on the longer side, so a landscape render keeps its shape
    h, w = im.shape[:2]
    k = sz / max(h, w)
    return cv2.resize(im, (max(1, round(w * k)), max(1, round(h * k))), interpolation=cv2.INTER_AREA)


for sz in [None, 400, 280, 200]:
    run("full" if sz is None else f"{sz}px", im if sz is None else small(sz))
# 160 px is a 50 mm sticker seen from across a room; a margin check, not a gate
run("160px", small(160), required=False)
run("blur 400", cv2.GaussianBlur(small(400), (5, 5), 0))
run("blur 280", cv2.GaussianBlur(small(280), (3, 3), 0))
sys.exit(0 if ok_all else 1)
