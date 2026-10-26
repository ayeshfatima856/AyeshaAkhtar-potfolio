#!/bin/bash
# Generate sample creatives for the portfolio gallery (clearly labeled as samples in DB)
set -e
OUT=/home/z/my-project/public/images/gen
mkdir -p $OUT

gen() {
  local prompt="$1"; local out="$2"; local size="${3:-1024x1024}"
  for i in 1 2; do
    if z-ai image -p "$prompt" -o "$out" -s "$size" >/dev/null 2>&1; then
      echo "OK: $out"; return 0
    fi
    echo "retry $i failed: $out"
    sleep 2
  done
  echo "FAIL: $out"; return 1
}

gen "Bold modern brand identity poster for a digital marketing studio named ORVEXA, the word ORVEXA in large clean geometric sans-serif letters, electric indigo purple and fresh lime green color scheme on deep navy background, abstract rising arrow and spark shapes, premium minimal agency branding, flat vector style, high quality" "$OUT/orvexa-identity.png" &
gen "Social media post design for a digital agency, ORVEXA logo text small at top, bold headline WE GROW BRANDS, indigo and lime green accents, dark navy background with subtle grid pattern, modern marketing instagram post layout, clean typography, flat design, high quality" "$OUT/orvexa-post.png" &
wait
gen "Instagram advertisement creative for ORVEXA marketing studio, split layout with product mockup of phone showing analytics dashboard, electric indigo gradient background, lime green call to action button, modern sans serif text, premium advertising design, high quality" "$OUT/orvexa-ad.png" &
gen "Mouth-watering social media post for a biryani restaurant, steaming plate of chicken biryani with saffron rice, warm dark background, elegant serif headline BIRYANI NIGHT, golden amber accents, professional food advertising design, high quality" "$OUT/food-biryani.png" &
wait
gen "Real estate advertisement creative, modern luxury house exterior at dusk, bold text overlay NEW HOMES, emerald green and navy color scheme, clean professional property marketing design with price tag badge, high quality" "$OUT/realestate-ad.png" &
gen "Fashion sale instagram story design, stylish female model in trendy outfit, pastel pink and cream editorial layout, bold modern text NEW DROP, minimal magazine style fashion promo, high quality" "$OUT/fashion-drop.png" "864x1152" &
wait
echo "ALL DONE"
