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


for sz in [None, 400, 280, 200]:
    img = im if sz is None else cv2.resize(im, (sz, sz), interpolation=cv2.INTER_AREA)
    run("full" if sz is None else f"{sz}px", img)
# 160 px is a 50 mm sticker seen from across a room; a margin check, not a gate
run("160px", cv2.resize(im, (160, 160), interpolation=cv2.INTER_AREA), required=False)
run("blur 400", cv2.GaussianBlur(cv2.resize(im, (400, 400), interpolation=cv2.INTER_AREA), (5, 5), 0))
run("blur 280", cv2.GaussianBlur(cv2.resize(im, (280, 280), interpolation=cv2.INTER_AREA), (3, 3), 0))
sys.exit(0 if ok_all else 1)
