#!/usr/bin/env python3
"""Offline file-existence, count and metadata audit for Muse after Flow media exports.
Does NOT certify actual photographic accuracy or owner approval; those require human QA.
Usage: python validate_assets.py /path/to/website/public
"""
from pathlib import Path
import json, subprocess, sys, csv
P=Path(__file__).resolve().parent
root=Path(sys.argv[1]).expanduser().resolve() if len(sys.argv)>1 else Path.cwd()
with (P/'PRODUCT_SHOT_MANIFEST_78.csv').open(encoding='utf-8') as f:
    products=list(csv.DictReader(f))
manifest=json.loads((P/'VIDEO_SHOT_MANIFEST.json').read_text(encoding='utf-8'))
assert len(products)==78
assert len(manifest['brand_film'])==6
assert len(manifest['hero_10'])==10
assert len(manifest['category_5'])==5
missing_stills=[x['deliverable'] for x in products if not (root/x['deliverable']).is_file()]
missing_video=[x['output'] for x in manifest['brand_film'] if not (root/x['output']).is_file()]
print('BASE FOLDER:',root)
print('Stills present:',78-len(missing_stills),'/78')
print('Mandatory brand film clips present:',6-len(missing_video),'/6')
print('Missing still exports (up to 20):',missing_stills[:20])
print('Missing clips:',missing_video)
for clip in manifest['brand_film']:
    path=root/clip['output']
    if not path.is_file():continue
    try:
        proc=subprocess.run(['ffprobe','-v','error','-show_entries','format=duration,size','-of','json',str(path)],capture_output=True,text=True,timeout=20,check=True)
        data=json.loads(proc.stdout)['format']
        dur=float(data['duration']);size=int(data['size']);print(path.name, 'duration',round(dur,2),'seconds','size',round(size/1024**2,2),'MiB', 'within 7.5–8.5?',7.5<=dur<=8.5)
    except Exception as exc: print(path.name, 'metadata unavailable',str(exc)[:100])
print('\nHuman visual review AND bakery sign-off still required before production publication.')
