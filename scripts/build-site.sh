#!/usr/bin/env bash
# Builds the React frontend and publishes the output to the repo root,
# which GitHub Pages serves. Run from anywhere; commit the result.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT/frontend"
npm install
npm run build

# Replace the previous build at the root (never touches /assets or /dashboard).
rm -rf "$ROOT/static" "$ROOT/index.html"
cp -r dist/. "$ROOT/"
touch "$ROOT/.nojekyll"

echo "Site published to repo root. Commit index.html + static/ to deploy."
