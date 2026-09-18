"""Schedule an image post through Publora from local PNGs.

    python _design/publora-post.py <platform-id> <caption.txt> <ISO-8601-UTC> <image.png> [more.png ...]

Works for any Publora connection (facebook-…, instagram-…, linkedin-…). Reads
PUBLORA_API_KEY from .env, creates a draft, uploads the images in the order
given, then flips the post to scheduled. Prints the postGroupId. LinkedIn PDF
document posts cannot go through here; upload those by hand.

    python _design/publora-post.py schedule <postGroupId> <ISO-8601-UTC>

flips a draft to scheduled later. The Starter plan allows 3 active scheduled
posts; a fourth create-post leaves a draft with its media uploaded.
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
API = "https://api.publora.com/api/v1"
H = {"x-publora-key": KEY, "Content-Type": "application/json"}


def call(method, path, **kw):
    r = requests.request(method, API + path, headers=H, timeout=60, **kw)
    if not r.ok:
        sys.exit(f"{method} {path} -> {r.status_code} {r.text[:300]}")
    return r.json()


def main(platform, caption_path, when, *images):
    caption = io.open(caption_path, encoding="utf-8").read().strip()
    images = [Path(p) for p in images]
    if not images:
        sys.exit("no images")

    draft = call("POST", "/create-post", data=json.dumps({"content": caption, "platforms": [platform]}))
    gid = draft["postGroupId"]
    print("draft", gid)

    for img in images:
        up = call("POST", "/get-upload-url", data=json.dumps({
            "fileName": img.name, "contentType": "image/png", "type": "image", "postGroupId": gid}))
        put = requests.put(up["uploadUrl"], data=img.read_bytes(), headers={"Content-Type": "image/png"}, timeout=120)
        if not put.ok:
            sys.exit(f"PUT {img.name} -> {put.status_code}")
        # No finalise call over REST: Publora probes the object itself and
        # marks it ready before the scheduled time.
        print("uploaded", img.name, up["mediaId"])

    sched = call("PUT", f"/update-post/{gid}", data=json.dumps({"status": "scheduled", "scheduledTime": when}))
    print("scheduled", json.dumps(sched)[:300])
    print(gid)


def schedule(gid, when):
    """Flip an existing draft to scheduled, for when the plan's slot limit was hit."""
    sched = call("PUT", f"/update-post/{gid}", data=json.dumps({"status": "scheduled", "scheduledTime": when}))
    print("scheduled", json.dumps(sched)[:300])


if __name__ == "__main__":
    if sys.argv[1] == "schedule":
        schedule(*sys.argv[2:4])
    else:
        main(*sys.argv[1:])
