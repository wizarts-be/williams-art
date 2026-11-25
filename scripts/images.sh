#!/bin/zsh
# Zet assets/origineel om naar webp in 2 breedtes: assets/img/<pad>-{1800,900}.webp
SRC=assets/origineel; OUT=assets/img
find $SRC/werken $SRC/paginas -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) | while read f; do
  rel=${f#$SRC/}; base=${rel%.*}; mkdir -p "$OUT/$(dirname $rel)"
  for w in 1800 900; do
    o="$OUT/$base-$w.webp"; [ -f "$o" ] && continue
    echo "cwebp -quiet -q 78 -mt -metadata none -resize $w 0 '$f' -o '$o'"
  done
done | xargs -P 8 -I{} sh -c '{}'
echo DONE
