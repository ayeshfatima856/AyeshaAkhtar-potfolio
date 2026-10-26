#!/usr/bin/env python3
"""Copy the 3 newly uploaded Meta Ads / store dashboard screenshots into
public/images/cv/ with clean names; flatten to white bg, optimize."""
from PIL import Image
import os

SRC = "/home/z/my-project/upload"
DST = "/home/z/my-project/public/images/cv"

MAPPING = [
    ("pasted_image_1793046630804.png", "meta-leadgen-master.png"),  # Lead Gen Master Account, Feb 1 - May 31, 2025
    ("pasted_image_1793046660830.png", "meta-purchases-oct.png"),   # website purchases, Columns: 15 Oct
    ("pasted_image_1793046786560.png", "store-daily-sales.png"),    # store dashboard, daily sales
]

for src_name, dst_name in MAPPING:
    src_path = os.path.join(SRC, src_name)
    dst_path = os.path.join(DST, dst_name)
    im = Image.open(src_path)
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, (255, 255, 255))
        bg.paste(im, mask=im.split()[-1])
        im = bg
    else:
        im = im.convert("RGB")
    if os.path.getsize(src_path) > 900 * 1024:
        jpg_path = dst_path.replace(".png", ".jpg")
        im.save(jpg_path, "JPEG", quality=88, optimize=True)
        print(f"{src_name} -> {os.path.basename(jpg_path)} {im.size} {os.path.getsize(jpg_path)//1024}KB (converted to JPG)")
        continue
    im.save(dst_path, "PNG", optimize=True)
    print(f"{src_name} -> {dst_name} {im.size} {os.path.getsize(dst_path)//1024}KB")

print("done")
