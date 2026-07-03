#!/usr/bin/env bash
# Run on the VPS after git pull. Installs deps, builds, and restarts PM2.
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$APP_DIR"

echo "→ Deploying somo-dev in ${APP_DIR}"

if ! command -v bun >/dev/null 2>&1; then
  echo "Error: bun is not installed on this server."
  exit 1
fi

if ! command -v pm2 >/dev/null 2>&1; then
  echo "Error: pm2 is not installed on this server."
  exit 1
fi

bun install --frozen-lockfile
bun run build

# Delete and recreate so PM2 picks up ecosystem changes (e.g. port, fork mode)
pm2 delete somo-dev 2>/dev/null || true
pm2 start ecosystem.config.cjs

pm2 save

echo "→ Deploy complete. somo-dev is running on port 3001"
