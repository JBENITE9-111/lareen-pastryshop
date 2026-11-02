#!/bin/sh
# Usage: ./QA_FRAME_EXTRACTION.sh path/to/approved-shot.mp4 output-dir
# Extracts five frames for visual morphing review; does NOT decide whether the images are correct.
set -eu
INPUT="${1:?Provide an existing MP4 path}"
OUT="${2:?Provide output directory}"
mkdir -p "$OUT"
ffmpeg -y -ss 0.0 -i "$INPUT" -frames:v 1 "$OUT/frame-00.jpg" -loglevel error
ffmpeg -y -ss 2.0 -i "$INPUT" -frames:v 1 "$OUT/frame-25.jpg" -loglevel error
ffmpeg -y -ss 4.0 -i "$INPUT" -frames:v 1 "$OUT/frame-50.jpg" -loglevel error
ffmpeg -y -ss 6.0 -i "$INPUT" -frames:v 1 "$OUT/frame-75.jpg" -loglevel error
ffmpeg -y -ss 7.8 -i "$INPUT" -frames:v 1 "$OUT/frame-100.jpg" -loglevel error
echo "Inspect all five images manually against the approved reference."
