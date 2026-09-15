"""Schedule an Instagram carousel through Publora from local PNGs.

    python _design/publora-ig.py <slides-dir> <caption.txt> <ISO-8601-UTC>

Reads PUBLORA_API_KEY and INSTAGRAM_PLATFORM_ID (or the id below) from .env,
creates a draft, uploads every *.png in the folder in name order, then flips
the post to scheduled. Prints the postGroupId.
"""
import io
import json
import os
import sys
from pathlib import Path

import requests
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parents[1]
load_dotenv(ROOT / ".env", override=True)
KEY = os.environ["PUBLORA_API_KEY"]
IG = os.environ.get("INSTAGRAM_PLATFORM_ID", "instagram-17841442997106917")
API = "https://api.publora.com/api/v1"
H = {"x-publora-key": KEY, "Content-Type": "application/json"}


def call(method, path, **kw):
    r = requests.request(method, API + path, headers=H, timeout=60, **kw)
    if not r.ok:
        sys.exit(f"{method} {path} -> {r.status_code} {r.text[:300]}")
    return r.json()


def main(slides_dir, caption_path, when):
    caption = io.open(caption_path, encoding="utf-8").read().strip()
    slides = sorted(Path(slides_dir).glob("*.png"))
    slides = [s for s in slides if not s.name.startswith("sheet")]
    if not slides:
        sys.exit("no slides")

    draft = call("POST", "/create-post", data=json.dumps({"content": caption, "platforms": [IG]}))
    gid = draft["postGroupId"]
    print("draft", gid)

    for s in slides:
        up = call("POST", "/get-upload-url", data=json.dumps({
            "fileName": s.name, "contentType": "image/png", "type": "image", "postGroupId": gid}))
        put = requests.put(up["uploadUrl"], data=s.read_bytes(), headers={"Content-Type": "image/png"}, timeout=120)
        if not put.ok:
            sys.exit(f"PUT {s.name} -> {put.status_code}")
        # No finalise call over REST: Publora probes the object itself and
        # marks it ready before the scheduled time.
        print("uploaded", s.name, up["mediaId"])

    sched = call("PUT", f"/update-post/{gid}", data=json.dumps({"status": "scheduled", "scheduledTime": when}))
    print("scheduled", json.dumps(sched)[:300])
    print(gid)


if __name__ == "__main__":
    main(*sys.argv[1:4])
