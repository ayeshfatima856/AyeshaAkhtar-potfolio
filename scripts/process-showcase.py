#!/usr/bin/env python3
"""Process raw showcase screenshots: resize to width 1280, cap height 8000, JPEG q80."""
import os
from PIL import Image

RAW = "/home/z/my-project/public/images/showcase/raw"
OUT = "/home/z/my-project/public/images/showcase"
os.makedirs(OUT, exist_ok=True)

MAX_W = 1280
MAX_H = 8000

for fname in sorted(os.listdir(RAW)):
    if not fname.lower().endswith(".png"):
        continue
    name = os.path.splitext(fname)[0]
    src = os.path.join(RAW, fname)
    dst = os.path.join(OUT, f"{name}.jpg")
    try:
        im = Image.open(src)
        if im.mode in ("RGBA", "P", "LA"):
            bg = Image.new("RGB", im.size, (255, 255, 255))
            if im.mode != "RGB":
                im = im.convert("RGBA")
            bg.paste(im, mask=im.split()[-1] if im.mode == "RGBA" else None)
            im = bg
        else:
            im = im.convert("RGB")
        w, h = im.size
        if w > MAX_W:
            im = im.resize((MAX_W, int(h * MAX_W / w)), Image.LANCZOS)
            w, h = im.size
        if h > MAX_H:
            im = im.crop((0, 0, w, MAX_H))
        im.save(dst, "JPEG", quality=80, optimize=True)
        kb = os.path.getsize(dst) // 1024
        print(f"{name}: {w}x{h} -> {kb} KB")
    except Exception as e:
        print(f"{name}: FAILED {e}")
print("PROCESS DONE")
