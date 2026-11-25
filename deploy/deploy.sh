#!/usr/bin/env bash
# Usage: bash deploy/deploy.sh /path/to/key.pem ubuntu@EC2_IP
set -euo pipefail
cd "$(dirname "$0")/.."
KEY="${1:?Provide key path}"
HOST="${2:?Provide user@host}"
test -f "$KEY"
if command -v node >/dev/null 2>&1; then node --test tests/core.test.js; fi
archive=$(mktemp)
trap 'rm -f "$archive"' EXIT
tar --exclude='*.md' -czf "$archive" index.html menu events catering booking gallery about contact privacy assets
remote=$(ssh -i "$KEY" "$HOST" 'mktemp /tmp/funnelcake.XXXXXXXX.tar.gz')
scp -i "$KEY" "$archive" "$HOST:$remote"
ssh -i "$KEY" "$HOST" "set -e; sudo mkdir -p /var/www/fivestarfunnelcake; sudo tar --no-same-owner -xzf '$remote' -C /var/www/fivestarfunnelcake; rm -f '$remote'; sudo nginx -t"
