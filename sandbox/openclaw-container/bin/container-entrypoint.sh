#!/usr/bin/env bash
set -euo pipefail

export OPENCLAW_HOME="${OPENCLAW_HOME:-/srv/openclaw/home}"
export HOME="${HOME:-$OPENCLAW_HOME}"

mkdir -p "$OPENCLAW_HOME" /srv/openclaw/workspace

if [[ -x /opt/openclaw-bootstrap/bin/render-sandbox-config.sh ]]; then
  /opt/openclaw-bootstrap/bin/render-sandbox-config.sh
fi

exec "$@"
