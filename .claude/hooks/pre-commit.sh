#!/usr/bin/env bash
set -e
npm run lint --silent
npm run typecheck
echo "pre-commit passed"
