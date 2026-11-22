# ARTEX 二开认证中心

线上地址：**https://openartex.vercel.app** · [English](README.md)

> **非官方**：本站是独立的戏谑性副项目，与 ARTEX、其原作者及名录中的任何仓库均无隶属关系，
> 仅供娱乐与存档。认证编号只是登记序号，不具备任何资质效力。

ARTEX 上游已于 2026 年 10 月从 GitHub 删除，源码却没有随之消失：它以 v0.3.15 的形式在数十个仓库之间流转，
被改名、换皮、加装武器库，再以「自主 AI 渗透平台」的名义重新上线。这个站点把所有能找到的公开副本登记在册，
并按改动深度授予 Ⅰ—Ⅴ 级认证。

- **登记册**：261 个仓库，199 个二开，3.0 万+ Stars（快照 2026-11-22）
- **认证详情**：每个条目一个编号、一枚 SVG 徽章、一段可引用的自述
- **社区提交**：`data/submissions/*.json` + PR，合并后自动编号
- **技术栈**：Next.js 16（App Router）· React 19 · TypeScript · 零 UI 依赖 · 纯 CSS
- **语言**：默认英文，右上角 `EN / 中文` 切换；`?lang=zh` 可直接进中文

## 本地运行

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # prebuild 会先合并社区提交
```

## 目录结构

```
app/
  page.tsx              首页：统计 + 登记册（筛选 / 搜索 / 排序）
  p/[id]/page.tsx       认证详情页（所有条目预渲染）
  badge/[file]/route.ts SVG 徽章，中文加 ?lang=zh
  about/page.tsx        规则、分级与免责
  globals.css           设计令牌与全部样式
components/
  LangProvider.tsx      语言状态（localStorage + ?lang=）
  HomeView/AboutView/CertView/Registry   双语视图
  Chrome.tsx            提示条、页头、页脚、语言开关
  Seal.tsx              2K 印章（字形随语言切换）
  Seg.tsx               带 <strong> / <code> 的文本片段
lib/
  copy.ts               全部界面文案（中英双语），另含标签与备注的英文映射
  taxonomy.ts           类型、等级、罗马数字（不引用数据）
  data.ts               registry.json 与派生统计（仅服务端）
  site.ts               绝对地址与徽章片段的唯一来源
data/
  repos.json            GitHub 快照（scripts/sync.mjs）
  curation.json         人工策展层：类型 / 等级 / 标签 / 备注
  submissions/          社区提交（PR 的入口）
  ids.json              编号表（只增不改）
  registry.json         合并结果（站点读取的文件）
scripts/
  sync.mjs              抓取 GitHub -> repos.json -> registry.json
  build-registry.mjs    合并提交 -> registry.json
  intake.mjs            Issue -> 条目（维护者用）
  lib.mjs               合并与编号逻辑
PR.md                   提交指南（英文 + 中文）
```

## 数据管道

```bash
# 刷新 GitHub 快照（建议带 token；匿名额度 60 次/小时）
GITHUB_TOKEN=ghp_xxx npm run sync

# 只合并社区提交（离线；构建与 CI 都会跑）
node scripts/build-registry.mjs

# 把一条 Issue 转成条目（维护者）
node scripts/intake.mjs 1        # 也接受完整 Issue 链接
# 已登记 -> 打印现有编号，不写文件
# 未登记 -> 抓 Stars / 语言 / 许可证，写入条目并分配编号
```

等级从不自动判定：脚本只写一个保守的默认值，由人来复核。编号（`ARTEX-2K-0001` 起）在首次分配时写入
`data/ids.json`，此后不再变动；条目下架时编号作废留档，不回收复用。

## 提交方式

两个入口，细节见 [PR.md](PR.md)：

- **Pull Request** —— 新增 `data/submissions/owner--repo.json`（模板见 `data/submissions/_template.json`），
  构建时合并并分配下一个编号。
- **Issue** —— 提交模板只需要一个仓库链接。维护者执行 `node scripts/intake.mjs <issue>`，
  要么返回已有编号，要么生成条目。

更正与下架申请同样走 Issue，不需要 PR。

## 部署到 Vercel

1. 推到 GitHub，在 Vercel 导入仓库（会自动识别 Next.js）。
2. 站点绝对地址默认 `https://openartex.vercel.app`，设置 `NEXT_PUBLIC_SITE_URL` 可覆盖。
   徽章片段、canonical、`sitemap.xml`、`robots.txt` 全部由 `lib/site.ts` 里的这一个值派生。
3. 可选：配置 `GITHUB_TOKEN`，让 `npm run sync` 能在本地或 CI 跑。构建站点本身不需要联网。

## 语言

界面默认英文。右上角开关把选择写进 `localStorage`，`?lang=zh` 可直达中文并同样持久化。
徽章按语言渲染：`/badge/<id>.svg` 是英文，加 `?lang=zh` 是中文，详情页的复制框会给出对应片段的代码。

没有做 `/en`、`/zh` 路由前缀，是有意为之：认证页有 261 个且全部预渲染，路由级双语会让构建量翻倍，
而切换语言只需要一个开关。

## 分级

等级描述的是与上游代码的距离，不是质量，也不是动机。

| 等级 | 名称 | 改了什么 |
| --- | --- | --- |
| Ⅰ | 搬运 | 原样重传，或只有无关紧要的改动，上游形态完整 |
| Ⅱ | 换皮 | 改名、换主题、换语言，底下的东西没变 |
| Ⅲ | 增筑 | 在原基础上加模块、加技能包、加编排 |
| Ⅳ | 重构 | 架构或技术栈被替换，或并入了新的产品 |
| Ⅴ | 产业 | 已对外运营：付费群、托管服务、商业版本 |

等级由人根据仓库自述与可见形态判定，从不自动生成；每条认证页的备注会记下改了什么。有异议走 Issue。

## 边界

本站只登记公开仓库的链接与它们自己的简介，不托管、不镜像、不分发、不编译任何 ARTEX 源码或二开产物。
编号不具备认证、审计或安全背书的效力。更正与下架通过 Issue 处理。

站点代码 MIT；登记数据来自各仓库的公开自述，版权归原作者。
