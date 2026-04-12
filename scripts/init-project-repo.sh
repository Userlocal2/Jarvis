#!/usr/bin/env bash
set -euo pipefail

ROOT="/root/.openclaw/workspace"
PROJECTS_DIR="$ROOT/projects"
TEMPLATE_DIR="$ROOT/templates/project-repo"

if [ $# -lt 1 ]; then
  echo "Usage: $0 <project-name>"
  exit 1
fi

PROJECT_NAME="$1"
TARGET_DIR="$PROJECTS_DIR/$PROJECT_NAME"

mkdir -p "$TARGET_DIR"
mkdir -p "$TARGET_DIR/docs" "$TARGET_DIR/src"

if [ ! -f "$TARGET_DIR/README.md" ]; then
  sed "s/{{PROJECT_NAME}}/$PROJECT_NAME/g" "$TEMPLATE_DIR/README.md" > "$TARGET_DIR/README.md"
fi

if [ ! -f "$TARGET_DIR/.gitignore" ]; then
  cp "$TEMPLATE_DIR/.gitignore" "$TARGET_DIR/.gitignore"
fi

if [ ! -d "$TARGET_DIR/.git" ]; then
  git -C "$TARGET_DIR" init -b main
  git -C "$TARGET_DIR" config user.name "Jarwis"
  git -C "$TARGET_DIR" config user.email "jarwis@userlocal.app"
  git -C "$TARGET_DIR" add .
  git -C "$TARGET_DIR" commit -m "Initial commit for $PROJECT_NAME"
fi

echo "Initialized project repo: $TARGET_DIR"
