#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
PORT="${1:-8000}"
if command -v python >/dev/null 2>&1; then exec python -m http.server "$PORT" --bind 127.0.0.1
elif command -v python3 >/dev/null 2>&1; then exec python3 -m http.server "$PORT" --bind 127.0.0.1
else echo "Install Python first."; exit 1; fi
