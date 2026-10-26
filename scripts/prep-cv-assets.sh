#!/bin/bash
# Prep assets for the new creative portfolio site
set -e
UP=/home/z/my-project/upload
OUT=/home/z/my-project/public/images/cv
mkdir -p "$OUT"

copy() { cp "$UP/$1" "$OUT/$2" && echo "OK  $2"; }

# Marketing dashboards (real screenshots / designed case study)
copy pasted_image_1792692241844.png zameen-casestudy.png
copy pasted_image_1792692390568.png gads-overview.png
copy pasted_image_1792692402184.png gads-summary.png
copy pasted_image_1792692438656.png gads-pmax.png
copy pasted_image_1792692660341.png vx-meta-oct.png

# Creative designs (real design work samples)
copy pasted_image_1792692722594.png food-flyer.png
copy pasted_image_1792692735695.png burger-poster.png
copy pasted_image_1792693085199.png visa-poster-1.png
copy pasted_image_1792693085374.png visa-poster-2.png

# Pinterest reference image
curl -sL --max-time 25 -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36" \
  -e "https://www.pinterest.com/" \
  "https://i.pinimg.com/736x/92/f3/ec/92f3ec732fda1614fdbbeaba08f04c22.jpg" -o "$OUT/pin-niche.jpg" || echo "PIN FAIL"
file "$OUT/pin-niche.jpg" 2>/dev/null | head -1

# Verify portrait exists
ls -la /home/z/my-project/public/images/site/ayesha-portrait.png

# Reusable previews from earlier work
cp /home/z/my-project/public/images/site/preview-stampare.jpg "$OUT/preview-stampare.jpg" 2>/dev/null && echo "OK  preview-stampare.jpg"
cp /home/z/my-project/public/images/site/preview-bundukhan.jpg "$OUT/preview-bundukhan.jpg" 2>/dev/null && echo "OK  preview-bundukhan.jpg"
cp /home/z/my-project/public/images/live/skyvisa.jpg "$OUT/preview-skyvisa.jpg" && echo "OK  preview-skyvisa.jpg"

echo "---- FINAL ----"
ls -la "$OUT"
