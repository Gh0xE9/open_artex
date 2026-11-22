## What this PR does

<!-- Tick one -->
- [ ] `[2K] add` — register a new ARTEX-related repository
- [ ] `[2K] fix` — correct an existing entry (number: `ARTEX-2K-____`)
- [ ] `[2K] remove` — removal requested by the project (number: `ARTEX-2K-____`)
- [ ] Site / data pipeline / docs change

## Entry

| Field | Value |
| --- | --- |
| Repository | `owner/repo` |
| Type | `fork` / `mirror` / `defense` / `tool` / `distribution` |
| Self-assessed tier | Ⅰ / Ⅱ / Ⅲ / Ⅳ / Ⅴ / not tiered |
| File | `data/submissions/____.json` |

## Checks

- [ ] The repository is publicly reachable, not empty and not a bare fork snapshot
- [ ] At least one of README / description / commits proves it is based on ARTEX
- [ ] `desc` matches the repository's own description — not polished, translated or annotated
- [ ] `note` only describes changes; no attack targets, victim information, private data or keys
- [ ] `node scripts/build-registry.mjs` ran locally and the entry shows up in `data/registry.json`
- [ ] The same repository was not submitted before

## Notes

<!-- Anything the maintainer should know; removal requests should include a way to verify identity -->
