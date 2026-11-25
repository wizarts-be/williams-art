#!/bin/zsh
# Bouwt de site voor GitHub Pages en pusht hem naar de branch gh-pages.
# Noodoplossing: normaal publiceert .github/workflows/pages.yml automatisch bij elke push naar main.
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
git push -q -f git@github-work:wizarts-be/williams-art.git gh-pages
cd - >/dev/null
node scripts/build.mjs >/dev/null   # lokale build terug met BASE=/
echo "Online: https://wizarts-be.github.io/williams-art/"
