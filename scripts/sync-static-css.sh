#!/usr/bin/env bash
#
# Copy allowlisted CSS from this repo to a consumer directory (e.g. home-website vendor/lds).
# Usage:
#   ./scripts/sync-static-css.sh /path/to/dest
#   ./scripts/sync-static-css.sh --list
#
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MANIFEST="${ROOT}/static-css.manifest"

list_files() {
  grep -v '^\s*#' "$MANIFEST" | grep -v '^\s*$' || true
}

if [[ "${1:-}" == "--list" ]]; then
  echo "Static CSS manifest:"
  list_files | sed 's/^/  /'
  exit 0
fi

if [[ $# -lt 1 ]]; then
  echo "usage: $0 DEST | --list" >&2
  exit 1
fi

DEST="$1"
mkdir -p "$DEST"

while IFS= read -r relpath; do
  [[ -z "$relpath" ]] && continue
  src="${ROOT}/${relpath}"
  if [[ ! -f "$src" ]]; then
    echo "error: missing ${relpath}" >&2
    exit 1
  fi
  out="${DEST}/${relpath}"
  mkdir -p "$(dirname "$out")"
  cp "$src" "$out"
  echo "synced: ${relpath} -> ${out}"
done < <(list_files)
