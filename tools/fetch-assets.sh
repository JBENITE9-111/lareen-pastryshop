#!/bin/sh
# Reconstruct images/ from the live deployment, verified against
# docs/IMAGES_MANIFEST.json (SHA-1 + byte size per file).
# The catalogue pictures are binary, so they are not stored in this repo's
# text snapshot; this script re-downloads them from the live site.
# Usage: sh tools/fetch-assets.sh  (run from the repo root)
set -e
cd "$(dirname "$0")/.."
BASE="https://lareen-pastryshop.vercel.app"
python3 - "$BASE" <<'PY'
import hashlib, json, os, sys, urllib.request
base = sys.argv[1]
man = json.load(open('docs/IMAGES_MANIFEST.json'))
ok = fail = 0
for img in man['images']:
    path = img['file']
    os.makedirs(os.path.dirname(path), exist_ok=True)
    try:
        with urllib.request.urlopen(base + '/' + path, timeout=60) as r:
            data = r.read()
    except Exception as e:
        print(f'FAIL {path}: {e}'); fail += 1; continue
    sha = hashlib.sha1(data).hexdigest()
    if len(data) != img['bytes'] or sha != img['sha1']:
        print(f'MISMATCH {path}: got {len(data)}B {sha[:12]}, want {img["bytes"]}B {img["sha1"][:12]}')
        fail += 1; continue
    open(path, 'wb').write(data)
    ok += 1
print(f'{ok} verified, {fail} failed, of {man["count"]} images')
sys.exit(1 if fail else 0)
PY
