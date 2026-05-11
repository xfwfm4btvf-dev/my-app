#!/bin/bash
set -e

echo "Building the site..."
npm run build

echo "Deploying to GitHub Pages..."

# Create temp dir for deploy content
DEPLOY_DIR=$(mktemp -d)
cp -a out/. "$DEPLOY_DIR/"

# Save current branch
CURRENT_BRANCH=$(git branch --show-current)

# Create orphan gh-pages branch
git checkout --orphan gh-pages-deploy
git rm -rf .
cp -a "$DEPLOY_DIR"/. .
echo "node_modules/" > .gitignore
git add -A
git commit -m "Deploy: $(date +%Y-%m-%d-%H%M%S) ($(git -C .. log --oneline -1 --format='%s' main))"

# Force push
git push origin gh-pages-deploy:gh-pages --force

# Clean up
git checkout "$CURRENT_BRANCH"
git branch -D gh-pages-deploy
rm -rf "$DEPLOY_DIR"

echo "Deployed successfully!"
echo "Site will be available at: https://xfwfm4btvf-dev.github.io/my-app/"
echo "Wait 2-5 minutes for GitHub Pages to propagate."
