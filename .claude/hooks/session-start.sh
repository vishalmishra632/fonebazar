#!/usr/bin/env bash
echo "fonebazar session started at $(date)"
echo "Branch: $(git branch --show-current 2>/dev/null || echo 'no git')"
echo "Last commit: $(git log -1 --oneline 2>/dev/null || echo 'n/a')"
