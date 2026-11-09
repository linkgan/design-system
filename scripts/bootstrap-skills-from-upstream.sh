#!/usr/bin/env bash
# One-time bootstrap when linkgan/agent-skills is unreachable.
# Copies allowlisted skills from public upstream mirrors into skills/.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${ROOT}/skills"
TMP="${ROOT}/.cache/skill-upstreams"
mkdir -p "$TMP" "$DEST"

clone_if() {
  local url="$1" dir="$2"
  if [[ ! -d "$TMP/$dir/.git" ]]; then
    git clone --depth 1 "$url" "$TMP/$dir"
  fi
}

copy_skill() {
  local name="$1" src="$2"
  if [[ -f "$src/SKILL.md" ]]; then
    rm -rf "$DEST/$name"
    mkdir -p "$DEST/$name"
    cp -R "$src/." "$DEST/$name/"
    echo "bootstrapped: $name"
  else
    echo "skip (missing): $name -> $src" >&2
  fi
}

clone_if https://github.com/Owl-Listener/designer-skills.git owl
clone_if https://github.com/jakubkrehel/skills.git jakub
clone_if https://github.com/emilkowalski/skills.git emil
clone_if https://github.com/MengTo/Skills.git mengto
clone_if https://github.com/codeswithroh/tastemaker.git tastemaker

OWL="$TMP/owl"
copy_skill design-principles "$OWL/ux-strategy/skills/design-principles"
copy_skill design-token "$OWL/design-systems/skills/design-token"
copy_skill color-system "$OWL/ui-design/skills/color-system"
copy_skill typography-scale "$OWL/ui-design/skills/typography-scale"
copy_skill spacing-system "$OWL/ui-design/skills/spacing-system"
copy_skill layout-grid "$OWL/ui-design/skills/layout-grid"
copy_skill theming-system "$OWL/design-systems/skills/theming-system"
copy_skill dark-mode-design "$OWL/ui-design/skills/dark-mode-design"
copy_skill motion-system "$OWL/design-systems/skills/motion-system"
copy_skill component-spec "$OWL/design-systems/skills/component-spec"
copy_skill design-critique "$OWL/design-ops/skills/design-critique"
copy_skill critique-visual-hierarchy "$OWL/visual-critique/skills/critique-visual-hierarchy"

JAKUB="$TMP/jakub/skills"
for s in better-typography better-colors better-layout better-interface better-accessibility; do
  copy_skill "$s" "$JAKUB/$s"
done

copy_skill emil-design-eng "$TMP/emil/skills/emil-design-eng"
copy_skill tastemaker "$TMP/tastemaker/skills/tastemaker"
copy_skill no-ai-design-slop "$TMP/mengto/agent-skills/ui/no-ai-design-slop"
copy_skill audit-ai-design-slop "$TMP/mengto/agent-skills/ui/audit-ai-design-slop"
