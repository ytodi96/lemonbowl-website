# Leak guard setup

Two checks run on every commit (locally) and every push (GitHub Actions):

| Check | Catches |
|---|---|
| [gitleaks](https://github.com/gitleaks/gitleaks) | API keys, tokens, passwords |
| [`scripts/leak_guard.py`](../scripts/leak_guard.py) | Indian mobile numbers (placeholders `9999999999` and `9199999999` allowed), names on the do-not-publish list, and blocked files (`.env`, `.xlsx`, `.zip`, `.vcf`, WhatsApp exports, `Chats/`, `_raw/`, `data/`) |

## Locally (once per clone)

```bash
pip install pre-commit && pre-commit install
```

Then set `DO_NOT_PUBLISH_FILE` in `.env` to the list in your local copy of `lemonbowl-private-data`. Run a full scan any time with `python scripts/leak_guard.py`.

## On GitHub (once per repo)

The workflow fetches the do-not-publish list from the private data repo. Create a fine-grained token with **read-only Contents access to `lemonbowl-private-data` only**, and add it to this repo as the Actions secret `DO_NOT_PUBLISH_TOKEN`. Without it, the name check is skipped and the other checks still run.

Matched names are never printed, only the list line they came from, so CI logs on public repos stay clean.
