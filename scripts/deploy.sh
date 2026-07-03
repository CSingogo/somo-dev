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

if pm2 describe somo-dev >/dev/null 2>&1; then
  pm2 restart somo-dev --update-env
else
  pm2 start ecosystem.config.cjs
fi

pm2 save

echo "→ Deploy complete. somo-dev is running on port ${PORT:-3000}"
