# ARTEX 二开认证中心

线上地址：**https://openartex.vercel.app**

ARTEX 上游（`Autumn-27/ARTEX`）已于 2026 年 10 月从 GitHub 删除，源码以 v0.3.15 的形式在数十个仓库间流转，
改名、换皮、加装武器库后重新上线。这个站点把它们全部登记在册，按改动深度授予 Ⅰ—Ⅴ 级认证。

- **登记册**：153 个仓库，77 个二开，覆盖 2.6 万 Stars（快照 2026-11-20）
- **认证详情**：每个条目一个编号、一枚 SVG 徽章、一段可引用的自述
- **社区提交**：`data/submissions/*.json` + PR，合并后自动编号
- **技术栈**：Next.js 16（App Router）· React 19 · TypeScript · 零 UI 依赖 · 纯 CSS

## 本地运行

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # prebuild 会先合并 submissions
```

## 目录

```
app/
  page.tsx              首页：统计 + 认证名录（筛选/搜索/排序）
  p/[id]/page.tsx       认证详情（静态生成 153 条）
  badge/[file]/route.ts SVG 认证徽章
  about/page.tsx        认证规则、分级标准、免责
  globals.css           设计令牌与全部样式
components/
  Registry.tsx          客户端筛选表格
  Seal.tsx              印章 SVG
data/
  repos.json            GitHub 抓取快照（scripts/sync.mjs 生成）
  curation.json         人工策展层：kind / tier / tags / note
  submissions/          社区提交条目（PR 入口）
  ids.json              编号映射（只增不改）
  registry.json         合并结果（站点读取，构建生成）
scripts/
  sync.mjs              抓取 GitHub → repos.json → registry.json
  build-registry.mjs    仅合并 submissions → registry.json
  lib.mjs               合并与编号逻辑
PR.md                   提交指南（对外）
```

## 数据管道

```bash
# 刷新 GitHub 快照（建议带 token，匿名配额 60 次/小时）
GITHUB_TOKEN=ghp_xxx npm run sync

# 只合并 submissions（离线可用，CI/构建时执行）
node scripts/build-registry.mjs
```

编号规则：`ARTEX-2K-0001` 递增，首次分配后写入 `data/ids.json`，之后不因排名变化改号，下架后作废不复用。

## 部署到 Vercel

1. 推到 GitHub，在 Vercel 里 Import 该仓库（框架自动识别 Next.js）。
2. 站点绝对地址默认已是 `https://openartex.vercel.app`；换域名时设 `NEXT_PUBLIC_SITE_URL` 覆盖。
   徽章 Markdown/HTML 片段、详情页 canonical、`sitemap.xml`、`robots.txt` 全部由它派生（`lib/site.ts` 是唯一来源）。
3. 可选：加 `GITHUB_TOKEN`，供本地或 CI 跑 `npm run sync`；站点构建本身不联网。

`npm run build` 会先执行 `prebuild` 合并提交，再静态生成所有详情页，无需数据库。

## 边界

本站只索引公开仓库链接与自述文本，不托管、不分发、不编译任何 ARTEX 源码或其衍生品。认证编号是登记序号，
不具备资质、审计或安全背书效力。更正与下架走 Issue。

站点代码 MIT；仓库内登记数据来自各仓库公开自述，版权归原作者。
