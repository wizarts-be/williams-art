#!/bin/zsh
# Bouwt de site voor GitHub Pages en pusht hem naar de branch gh-pages.
# Gebruik: ./scripts/deploy-pages.sh   (link: https://wizarts-be.github.io/williams-art/)
set -e
cd "$(dirname "$0")/.."
BASE=/williams-art/ node scripts/build.mjs
TMP=$(mktemp -d)
cp -RL dist/. "$TMP"/
touch "$TMP/.nojekyll"
cd "$TMP"
git init -q -b gh-pages
git add -A
git commit -q -m "Deploy $(date '+%Y-%m-%d %H:%M')"
git -c credential.helper= -c 'credential.helper=!gh auth git-credential' push -q -f https://github.com/wizarts-be/williams-art.git gh-pages
cd - >/dev/null
node scripts/build.mjs >/dev/null   # lokale build terug met BASE=/
echo "Online: https://wizarts-be.github.io/williams-art/"
