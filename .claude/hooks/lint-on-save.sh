#!/usr/bin/env bash
npx prettier --write "$1" --log-level silent 2>/dev/null || true
