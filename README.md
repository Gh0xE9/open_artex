# ARTEX Derivative Registry

Live: **https://openartex.vercel.app** · [中文说明](README_zh.md)

> **Unofficial.** An independent, satirical fan project. Not affiliated with ARTEX, its author, or any
> listed repository. Kept for entertainment and archival purposes only. A certificate number is a
> registry ID, not a credential.

The ARTEX upstream was deleted from GitHub in October 2026. The source did not go with it: it
circulates as v0.3.15 across dozens of repositories, renamed, reskinned and weaponized. This site
catalogues every public copy we could find and grades each one Ⅰ–Ⅴ by how far it drifted from the
original.

- **Registry**: 261 repositories, 199 derivatives, 30k+ stars (snapshot 2026-11-22)
- **Certificate pages**: one number, one SVG badge, one quotable description per entry
- **Community submissions**: `data/submissions/*.json` + PR, numbered on merge
- **Stack**: Next.js 16 (App Router) · React 19 · TypeScript · no UI dependencies · plain CSS
- **Languages**: English by default, Chinese one click away (`EN / 中文` in the header)

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # prebuild merges submissions first
```

## Structure

```
app/
  page.tsx              home: stats + registry (filter / search / sort)
  p/[id]/page.tsx       certificate page (all entries pre-rendered)
  badge/[file]/route.ts SVG badge, ?lang=zh for Chinese
  about/page.tsx        rules, tiers, disclaimer
  globals.css           design tokens and all styles
components/
  LangProvider.tsx      language state (localStorage + ?lang=)
  HomeView/AboutView/CertView/Registry   bilingual views
  Chrome.tsx            notice bar, header, footer, language switch
  Seal.tsx              2K seal (glyphs swap with language)
  Seg.tsx               text segments with <strong> / <code>
lib/
  copy.ts               every UI string, en + zh, plus tag/note translation maps
  taxonomy.ts           kinds, tiers, roman numerals (no data import)
  data.ts               registry.json + derived stats (server side)
  site.ts               single source of the absolute URL and badge snippets
data/
  repos.json            GitHub snapshot (scripts/sync.mjs)
  curation.json         hand-curated layer: kind / tier / tags / note
  submissions/          community entries (the PR entry point)
  ids.json              number map (append-only)
  registry.json         merged result (what the site reads)
scripts/
  sync.mjs              fetch GitHub -> repos.json -> registry.json
  build-registry.mjs    merge submissions -> registry.json
  intake.mjs            GitHub issue -> submission entry (maintainer)
  lib.mjs               merge and numbering logic
PR.md                   submission guide (English + Chinese)
```

## Data pipeline

```bash
# refresh the GitHub snapshot (token recommended; anonymous quota is 60/hour)
GITHUB_TOKEN=ghp_xxx npm run sync

# merge submissions only (offline; runs on build/CI)
node scripts/build-registry.mjs

# turn one issue into an entry (maintainer)
node scripts/intake.mjs 1        # also accepts a full issue URL
# already listed  -> prints the existing number, writes nothing
# not listed      -> fetches stars/lang/licence, writes the entry, assigns a number
```

Tier is never assigned automatically: the script writes a conservative default and a human reviews it.
Numbers (`ARTEX-2K-0001` …) are written to `data/ids.json` on first assignment, never renumbered, and
retired rather than reused when an entry is removed.

## Submitting

Two entry points, both described in [PR.md](PR.md):

- **Pull request** — add `data/submissions/owner--repo.json` (template in `data/submissions/_template.json`).
  The build merges it and assigns the next number.
- **Issue** — the submission template only needs a repository URL. A maintainer runs
  `node scripts/intake.mjs <issue>`, which either reports the existing number or creates the entry.

Corrections and removal requests also go through an issue; they never need a PR.

## Deploy to Vercel

1. Push to GitHub, import the repository in Vercel (Next.js is detected automatically).
2. The canonical URL defaults to `https://openartex.vercel.app`; set `NEXT_PUBLIC_SITE_URL` to
   override it. Badge snippets, canonicals, `sitemap.xml` and `robots.txt` all derive from that single
   value (`lib/site.ts`).
3. Optional: add `GITHUB_TOKEN` so `npm run sync` can run locally or in CI. Building the site itself
   needs no network access.

## Language

The UI is English by default. The header switch stores the choice in `localStorage`; `?lang=zh`
deep-links straight to Chinese and also persists. Badges are rendered per language: `/badge/<id>.svg`
is English, `?lang=zh` is Chinese, and the copy box on a certificate page emits the matching snippet.

The switch is client-side rather than `/en` and `/zh` routes on purpose: there are 261 pre-rendered
certificate pages, and route-level i18n would double the build for one toggle.

## Tiers

Grades describe distance from the upstream code, not quality or intent.

| Tier | Name | What changed |
| --- | --- | --- |
| Ⅰ | Copy | Re-uploaded as-is, or with trivial edits. Upstream shape intact. |
| Ⅱ | Reskin | Renamed, re-themed, re-translated. Same machinery underneath. |
| Ⅲ | Extended | New modules, skill packs, or orchestration bolted on top. |
| Ⅳ | Rebuilt | Architecture or stack replaced, or merged into a new product. |
| Ⅴ | Commercial | Operated publicly: paid groups, hosting, commercial editions. |

Tiers are assigned by a human from the repository's own description and visible shape, never
automatically; the note on each certificate records what was changed. Appeals go through an issue.

## Boundaries

This site only indexes public repository links and their own descriptions. It does not host,
mirror, distribute or compile any ARTEX source or derivative. Numbers carry no certification, audit or
security-endorsement value. Corrections and removals go through an issue.

Site code is MIT; the registry data belongs to the respective repositories and their authors.
