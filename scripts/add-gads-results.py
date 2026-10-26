#!/usr/bin/env python3
"""Copy the 6 newly uploaded Google Ads dashboard screenshots into
public/images/cv/ with clean names; flatten to white bg, optimize."""
from PIL import Image
import os

SRC = "/home/z/my-project/upload"
DST = "/home/z/my-project/public/images/cv"

MAPPING = [
    ("pasted_image_1793044275124.png", "gads-call-leads.png"),   # Mar 14 - Apr 12, 2025
    ("pasted_image_1793044290259.png", "gads-purchases.png"),    # Feb 1 - Apr 26, 2023
    ("pasted_image_1793044312652.png", "gads-roas.png"),         # Jul 2023
    ("pasted_image_1793044333995.png", "gads-small-account.png"),# Mar 31 - Apr 23, 2020
    ("pasted_image_1793044350558.png", "gads-eur-longterm.png"), # Nov 2018 - Jul 2020
    ("pasted_image_1793044543012.png", "gads-ac-aug2024.png"),   # Aug 2024 breakdown
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
    # big render -> JPG to keep bundle light; small raw screenshots stay PNG
    if dst_name.endswith(".jpg"):
        im.save(dst_path, "JPEG", quality=88, optimize=True)
    elif os.path.getsize(src_path) > 900 * 1024:
        jpg_path = dst_path.replace(".png", ".jpg")
        im.save(jpg_path, "JPEG", quality=88, optimize=True)
        print(f"{src_name} -> {os.path.basename(jpg_path)} {im.size} {os.path.getsize(jpg_path)//1024}KB (converted to JPG)")
        continue
    else:
        im.save(dst_path, "PNG", optimize=True)
    print(f"{src_name} -> {dst_name} {im.size} {os.path.getsize(dst_path)//1024}KB")

print("done")
