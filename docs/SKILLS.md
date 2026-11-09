# Agent skills in this repo

Skills live under `./skills/` and are driven by [`.skills.yaml`](../.skills.yaml).

## Sync from owner's library

```bash
./scripts/sync-skills.sh --list   # resolve exact names
./scripts/sync-skills.sh          # pull from linkgan/agent-skills
```

Requires read access to `https://github.com/linkgan/agent-skills`. On success, each allowlisted skill is copied to `skills/<name>/`.

## Bootstrap (offline / private catalog unavailable)

```bash
./scripts/bootstrap-skills-from-upstream.sh
```

Copies the same allowlist from public upstream mirrors (Owl-Listener, jakubkrehel, emilkowalski, MengTo, tastemaker). Re-run after changing `.skills.yaml`.

## Local-only skill

`skills/linkgan-design-language/` is authored here and is not synced from agent-skills. It will move to `linkgan/agent-skills` later.
