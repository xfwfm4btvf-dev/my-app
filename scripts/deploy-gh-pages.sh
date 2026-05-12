#!/bin/bash
set -e

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

echo "Building..."
npm run build

echo "Deploying to gh-pages..."
rm -rf /tmp/gh-pages-deploy
mkdir -p /tmp/gh-pages-deploy
cp -a out/. /tmp/gh-pages-deploy/

cd /tmp/gh-pages-deploy
git init
git checkout -b gh-pages
touch .nojekyll
echo "node_modules/" > .gitignore
git add -A
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M')"
git remote add origin https://github.com/xfwfm4btvf-dev/my-app.git
git push origin gh-pages --force

echo "Deployed successfully!"
