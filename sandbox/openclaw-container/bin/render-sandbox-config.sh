#!/usr/bin/env bash
set -euo pipefail

CONFIG_PATH="${OPENCLAW_HOME:-/srv/openclaw/home}/openclaw.json"
SECRETS_DIR="/srv/openclaw/secrets"
WORKSPACE_DIR="/srv/openclaw/workspace"
TOKEN_FILE="$SECRETS_DIR/discord-sandbox-bot-token.txt"

mkdir -p "$(dirname "$CONFIG_PATH")" "$WORKSPACE_DIR"

python3 - <<'PY'
import json
from pathlib import Path

config_path = Path("/srv/openclaw/home/openclaw.json")
workspace_dir = "/srv/openclaw/workspace"
token_file = Path("/srv/openclaw/secrets/discord-sandbox-bot-token.txt")

token = token_file.read_text().strip() if token_file.exists() else ""

config = {
  "agents": {
    "defaults": {
      "workspace": workspace_dir,
      "models": {"openai-codex/gpt-5.4": {}},
      "model": {"primary": "openai-codex/gpt-5.4"},
      "compaction": {"mode": "safeguard"}
    }
  },
  "gateway": {
    "mode": "local",
    "auth": {"mode": "token", "token": "sandbox-local-token"},
    "port": 18790,
    "bind": "0.0.0.0"
  },
  "session": {"dmScope": "per-channel-peer"},
  "channels": {
    "discord": {
      "enabled": bool(token),
      "token": token,
      "groupPolicy": "allowlist",
      "execApprovals": {
        "enabled": True,
        "approvers": ["295625126047907840"],
        "target": "channel"
      },
      "guilds": {
        "1489718723999830076": {
          "requireMention": False,
          "users": ["295625126047907840"]
        }
      }
    }
  },
  "tools": {
    "profile": "coding",
    "elevated": {
      "enabled": True,
      "allowFrom": {"discord": ["295625126047907840"]}
    }
  },
  "plugins": {
    "entries": {
      "openai": {"enabled": True},
      "discord-voice-local": {
        "enabled": True,
        "config": {
          "allowedUsers": ["295625126047907840"],
          "sttProvider": "local-whisper",
          "ttsProvider": "kokoro",
          "localWhisper": {"model": "Xenova/whisper-tiny.en"},
          "kokoro": {"voice": "af_heart"}
        }
      }
    }
  },
  "commands": {
    "ownerAllowFrom": ["discord:295625126047907840"]
  }
}

config_path.write_text(json.dumps(config, ensure_ascii=False, indent=2) + "\n")
PY
