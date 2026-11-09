#!/usr/bin/env bash
#
# Sync allowlisted agent skills from linkgan/agent-skills into ./skills/
# Usage:
#   ./scripts/sync-skills.sh              # sync
#   ./scripts/sync-skills.sh --list       # list allowlisted skill names
#   ./scripts/sync-skills.sh --check      # verify skills/ matches allowlist files
#
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

YAML="${ROOT}/.skills.yaml"
DEST="${ROOT}/skills"
CACHE="${ROOT}/.cache/agent-skills"

list_skills() {
  awk '/^skills:/{flag=1;next} /^[a-zA-Z#]/{if(flag && $0 !~ /^  -/) flag=0} flag && /^  - /{print substr($0,5)}' "$YAML"
}

if [[ "${1:-}" == "--list" ]]; then
  echo "Allowlisted skills:"
  list_skills | sed 's/^/  /'
  if [[ -d "$DEST" ]]; then
    echo ""
    echo "Present in ${DEST}:"
    find "$DEST" -mindepth 1 -maxdepth 1 -type d -printf '  %f\n' 2>/dev/null | sort || ls -1 "$DEST" 2>/dev/null | sed 's/^/  /'
  fi
  exit 0
fi

if [[ ! -f "$YAML" ]]; then
  echo "error: missing $YAML" >&2
  exit 1
fi

REPO="$(awk -F': ' '/^repository:/{gsub(/^[ \t]+/,"",$2); print $2}' "$YAML")"
BRANCH="$(awk -F': ' '/^branch:/{print $2}' "$YAML" | tr -d ' ')"

mkdir -p "${ROOT}/.cache"
if [[ ! -d "$CACHE/.git" ]]; then
  echo "Cloning skill catalog from ${REPO} ..."
  if ! git clone --depth 1 --branch "$BRANCH" "$REPO" "$CACHE" 2>/dev/null; then
    echo "warning: could not clone ${REPO} (private or unavailable)." >&2
    echo "Keeping existing ./skills/ content. Fix credentials or run scripts/bootstrap-skills-from-upstream.sh" >&2
    exit 0
  fi
else
  echo "Updating skill catalog ..."
  git -C "$CACHE" fetch --depth 1 origin "$BRANCH" 2>/dev/null && git -C "$CACHE" checkout -q FETCH_HEAD 2>/dev/null || true
fi

mkdir -p "$DEST"
while IFS= read -r name; do
  [[ -z "$name" ]] && continue
  src=""
  if [[ -d "$CACHE/skills/${name}" ]]; then
    src="$CACHE/skills/${name}"
  else
    found="$(find "$CACHE" -type d -name "$name" -path '*/skills/*' 2>/dev/null | head -1)"
    [[ -n "$found" && -f "$found/SKILL.md" ]] && src="$found"
  fi
  if [[ -z "$src" || ! -f "$src/SKILL.md" ]]; then
  echo "warning: skill '${name}' not found in catalog; skipping" >&2
    continue
  fi
  rm -rf "${DEST}/${name}"
  mkdir -p "${DEST}/${name}"
  cp -R "${src}/." "${DEST}/${name}/"
  echo "synced: ${name}"
done < <(list_skills)

echo "Done. Skills available under ${DEST}/"
