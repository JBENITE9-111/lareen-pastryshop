# Export commands — run only after approved media exists

These examples require `ffmpeg` installed on the computer used by Muse or the operator. Inputs are example paths; adjust names to the actual export paths. The generation package contains **prompts only**, not generated footage.

## Single 8-second hero: silent, optimized baseline MP4

```bash
ffmpeg -i input_approved_hero.mp4 -an -vf "fps=24,scale=-2:720:flags=lanczos,format=yuv420p" -c:v libx264 -preset slow -crf 26 -movflags +faststart assets/lareen/video/lareen-hero-8s-16x9.mp4
```

Review result visually, check media filesize; if still too big, change `-crf 26` to `-crf 28` or use 540p ONLY when acceptable. Never compromise texture to meet an arbitrary file-size number.

## Create still poster from the actual approved video

```bash
ffmpeg -ss 00:00:01 -i assets/lareen/video/lareen-hero-8s-16x9.mp4 -frames:v 1 -q:v 2 /tmp/lareen-hero.jpg
ffmpeg -i /tmp/lareen-hero.jpg -frames:v 1 -c:v libwebp -quality 84 assets/lareen/posters/lareen-hero.webp
```

Alternatively generate WebP directly from the independently approved high-resolution product still, which often improves LCP consistency.

## Combine six 8-second clips after individual QA
Create `concat.txt` with exact real file paths, one per line:

```text
file 'film-01.mp4'
file 'film-02.mp4'
file 'film-03.mp4'
file 'film-04.mp4'
file 'film-05.mp4'
file 'film-06.mp4'
```

Then transcode consistently (handles occasional variable frame-rate differences):

```bash
ffmpeg -f concat -safe 0 -i concat.txt -an -vf "fps=24,scale=-2:1080:flags=lanczos,format=yuv420p" -c:v libx264 -preset slow -crf 23 -movflags +faststart assets/lareen/video/lareen-brand-film-48s-16x9.mp4
```

Caveat: If original clip codecs or frame rates differ materially, this demuxer path may need pre-normalizing all clips first. Inspect `ffprobe` output and resulting transitions, and don't claim 48s until duration is verified.

## Probe audio/video and file sizes

```bash
ffprobe -v error -show_entries format=duration,size -of json assets/lareen/video/lareen-brand-film-48s-16x9.mp4
ffprobe -v error -show_entries stream=width,height,r_frame_rate,pix_fmt -of json assets/lareen/video/lareen-hero-8s-16x9.mp4
```

## Poster first performance targets
- Prefer AVIF/WebP still cards when supported and keep JPG fallbacks.
- Avoid preloading 10 product videos. Homepage should not download the 48-second film before visitor actively plays it.
- High-bandwidth desktop can play a short film after poster and LCP; mobile Save-Data and reduced motion show poster only.
- Verify real page timings after integration, not just media file dimensions.
