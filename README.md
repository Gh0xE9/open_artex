# ARTEX Derivative Registry

Live: **https://openartex.vercel.app**

> **Unofficial.** An independent, satirical fan project. Not affiliated with ARTEX, its author, or any
> listed repository. Kept for entertainment and archival purposes only. A certificate number is a
> registry ID, not a credential.

The ARTEX upstream (`Autumn-27/ARTEX`) was deleted from GitHub in October 2026. The source did not go
with it: it circulates as v0.3.15 across dozens of repositories, renamed, reskinned and weaponized.
This site catalogues all of them and grades each one Ⅰ–Ⅴ by how far it drifted.

- **Registry**: 261 repositories, 199 derivatives, ~30k stars (snapshot 2026-11-22)
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

## Boundaries

This site only indexes public repository links and their own descriptions. It does not host,
mirror, distribute or compile any ARTEX source or derivative. Numbers carry no certification, audit or
security-endorsement value. Corrections and removals go through an issue.

Site code is MIT; the registry data belongs to the respective repositories and their authors.

---

# 中文说明

线上地址：**https://openartex.vercel.app**

**非官方**：本站是独立的戏谑性副项目，与 ARTEX、其原作者及名录中的任何仓库均无隶属关系，仅供娱乐与存档。
认证编号只是登记序号，不具备任何资质效力。

ARTEX 上游（`Autumn-27/ARTEX`）已于 2026 年 10 月从 GitHub 删除，源码以 v0.3.15 的形式在数十个仓库间流转，
改名、换皮、加装武器库后重新上线。这个站点把它们全部登记在册，按改动深度授予 Ⅰ—Ⅴ 级认证。

- **登记册**：261 个仓库，199 个二开，覆盖 3.0 万 Stars（快照 2026-11-22）
- **认证详情**：每个条目一个编号、一枚 SVG 徽章、一段可引用的自述
- **社区提交**：`data/submissions/*.json` + PR，合并后自动编号
- **技术栈**：Next.js 16（App Router）· React 19 · TypeScript · 零 UI 依赖 · 纯 CSS
- **语言**：默认英文，右上角 `EN / 中文` 可切换；`?lang=zh` 可直接进中文

本地运行、目录结构、数据管道与部署步骤见上方英文段（命令与路径完全一致）。

站点代码 MIT；仓库内登记数据来自各仓库公开自述，版权归原作者。
