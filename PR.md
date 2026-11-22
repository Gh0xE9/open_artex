# PR.md · Submitting an ARTEX derivative

> Found an ARTEX derivative that is not listed? Open a PR and we will give it a number.
> Are you the maintainer, wanting to add context, correct a tier, or request removal? Same entry point.

**English** · [中文提交指南](#中文提交指南)

**Unofficial.** This registry is an independent, satirical fan project. It is not affiliated with
ARTEX, its original author, any downstream maintainer, or any listed repository. Everything here is
kept for entertainment and archival purposes only. A certificate number is a registry ID, not a
credential.

The registry is assembled from two parts: a GitHub snapshot, and **entries submitted by PR**. On
every build (`prebuild`) the JSON files in `data/submissions/` are merged into `data/registry.json`.
Numbers live in `data/ids.json` and are **append-only**.

---

## 1. Three steps

```bash
# 1. Fork and clone
git clone https://github.com/<you>/open_artex.git
cd open_artex

# 2. Create an entry (filename: owner--repo.json, slash becomes a double dash)
cp data/submissions/_template.json data/submissions/owner--repo.json

# 3. Open the PR
git checkout -b 2k/add-owner-repo
git add data/submissions/owner--repo.json
git commit -m "feat(2k): add owner/repo"
git push origin 2k/add-owner-repo
```

Pull request titles:

| Type | Title | Example |
| --- | --- | --- |
| Add | `[2K] add: owner/repo` | `[2K] add: Xiao1an/ARTEX-God` |
| Correct | `[2K] fix: ARTEX-2K-0013` | change tier, description or credit |
| Remove | `[2K] remove: ARTEX-2K-0013` | maintainer request, identity required |

No appetite for JSON? Open an [issue](https://github.com/Gh0xE9/open_artex/issues/new) with the
repository link and a maintainer will fill it in. The maintainer-side command is
`node scripts/intake.mjs <issue-number>`: if the repository is already listed it prints the existing
number and closes the issue; otherwise it fetches the metadata, writes the entry and assigns a number.

---

## 2. Entry format

Path: `data/submissions/<owner>--<repo>.json` (e.g. `Xiao1an--ARTEX-God.json`; lowercase is safer).

```json
{
  "repo": "Xiao1an/ARTEX-God",
  "url": "https://github.com/Xiao1an/ARTEX-God",
  "kind": "fork",
  "tier": 3,
  "desc": "ARTEX二开增强版-优化敏感操作拦截，增加一键getshell、长链路后渗透、内网横向、逻辑漏洞增强、卫星等IOT协议测试适配等...",
  "note": "加装一键 getshell、内网横向与 IoT 协议适配。",
  "tags": ["增强", "后渗透", "武器化"],
  "evidence": "https://github.com/Xiao1an/ARTEX-God",
  "submittedBy": "your-github-handle"
}
```

### Fields

| Field | Required | Type | Notes |
| --- | --- | --- | --- |
| `repo` | ✅ | string | `owner/repo`, must be a real public GitHub repository |
| `url` | ✅ | string | Full URL, must match `repo` |
| `kind` | ✅ | enum | `fork` / `upstream` / `distribution` / `mirror` / `defense` / `tool` |
| `tier` | `fork` only | 1–5 | see below; 0 or omit for other kinds |
| `desc` | recommended | string | **The repository's own description, verbatim.** Do not polish, translate or editorialize |
| `note` | optional | string | One line on *what changed* — not on whether it is good |
| `tags` | optional | string[] | Up to 4 short tags, e.g. `改名`, `主题`, `武器库`, `英文` (Chinese tags are translated on the site) |
| `evidence` | recommended | string | Something proving it is built on ARTEX: a commit, a README paragraph, a release note |
| `submittedBy` | ✅ | string | Your GitHub handle, for traceability; never displayed |

### `kind`

| Value | Meaning |
| --- | --- |
| `fork` | Derived: modified, renamed, extended or rebuilt from ARTEX source |
| `mirror` | Backup: unmodified, or re-uploaded only |
| `defense` | Defensive research: detection rules, hardening, honeypots, exploit analysis, teaching |
| `tool` | Tooling: MCP servers, plugins, mobile wrappers, consoles, skill packs |
| `distribution` | A localized or translated distribution with dense downstream forking |
| `upstream` | Upstream itself (rarely needs submitting) |

### `tier`

| Tier | Name | Criteria |
| --- | --- | --- |
| Ⅰ | Copy | Re-uploaded as-is, or README-only edits |
| Ⅱ | Reskin | Renamed, re-themed, re-translated; functionality unchanged |
| Ⅲ | Extended | New modules, skill packs, orchestration |
| Ⅳ | Rebuilt | Architecture or stack replaced, or merged into a new product |
| Ⅴ | Commercial | Publicly operated, paid groups, hosting, commercial editions |

Unsure? Use Ⅱ or leave it blank; a maintainer will review. **A higher self-assessment does not make
a project look better** — the tier only says how far it drifted from the original.

---

## 3. Review criteria

Five checks, all of which must pass:

1. **The link resolves**: public, openable, not a 404, not empty.
2. **It actually relates**: name, description, README or commit history shows ARTEX lineage
   (`Autumn-27/ARTEX`, `BaaRai/ARTEX`, `RuoJi6/ARTEX` or their downstream chains).
3. **The quote is accurate**: `desc` matches the repository description; `note` describes changes
   only, with no unverified accusations.
4. **No sensitive content**: no real attack targets, victim information, unauthorized intrusion
   walkthroughs, personal data or credentials.
5. **No duplicates**: one entry per repository; mirrors in a fork chain are recorded as `mirror`
   without a tier.

Maintainers may adjust `tier`, `tags` or `note` before merging; the change is noted in the merge
message.

---

## 4. What we do not accept

- Unrelated projects that happen to share the name (a building-materials brand, a gallery, `ARText`,
  `ArtExt` and other OCR / text-extraction tools).
- Empty forks that only got a star, star farms, automation-driven repositories.
- Someone else's derivative, resubmitted under a new name (we deduplicate by repository URL).
- Entries containing attack targets, victim screenshots, leaked data, internal addresses, or
  credentials.
- Entries meant to expose or humiliate a person without repository evidence. **We register
  repositories, not people.**

---

## 5. Corrections and removal

**Correction**: open a PR against your entry, or an issue with an explanation and a verifiable link.
`desc`, `tier`, `tags`, `note` and credit status can all be corrected; the number never changes.

**Removal**: the maintainer or an authorized representative opens an issue (template: `Removal
request`) stating identity and reason. We remove immediately when:

- the repository was deleted or made private;
- the maintainer asks and can prove ownership (owner account, organization email, etc.);
- the entry is factually wrong and cannot be corrected.

A removed entry retires its number; numbers are never reassigned, so they cannot later point at a
different project.

---

## 6. After you get a number

Once merged and deployed, the entry page offers an SVG badge:

```markdown
[![ARTEX Derivative Registry](https://openartex.vercel.app/badge/ARTEX-2K-0013.svg)](https://openartex.vercel.app/p/ARTEX-2K-0013)
```

Paste it into a README. Badges are English by default; append `?lang=zh` for the Chinese one (the
copy box does this for you when the site is in Chinese). The badge means "registered" — not
endorsed, audited or guaranteed by this site.

---

## 7. Verify locally

```bash
npm install
node scripts/build-registry.mjs   # merge submissions -> registry.json
npm run dev                       # http://localhost:3000
```

Make sure `node scripts/build-registry.mjs` runs and your entry shows up before opening the PR. CI
runs the same check.

---

## 8. FAQ

**Will being listed make me look like a script kiddie?**
This site records facts: repository URL, its own description, how far it drifted. A high tier does
not mean bad engineering, and a low tier does not mean innocence. What gets recorded is that the
repository existed.

**I only backed up the source. Do I need to register?**
Yes, as `mirror`, with no tier. Backups matter for tracing: after the upstream was deleted, much of
the research on it relied on exactly these copies.

**My project is already deleted.**
Open `[2K] remove: <number>` with a note; we mark the entry as deleted and keep the number retired.

**Can I skip `note`?**
Yes. `desc` is shown verbatim; entries without one display "no description provided".

**How often is the data refreshed?**
Stars and timestamps are refreshed when a maintainer runs `npm run sync`; community entries merge on
every build.

---

<a id="中文提交指南"></a>

# 提交指南（中文）

> 发现一个没登记的 ARTEX 二开项目？提 PR，我们给它一个编号。
> 你就是项目方，想补充说明、更正等级或要求下架？同样走这里。

本站的登记册由两部分拼成：一份 GitHub 抓取快照，一份**由 PR 提交的条目**。每次构建（`prebuild`）会把
`data/submissions/` 里的 JSON 合并进 `data/registry.json`，编号由 `data/ids.json` 维护，**只增不改**。

**非官方**：本站是独立的戏谑性副项目，与 ARTEX、其原作者及名录中的任何仓库均无隶属关系，仅供娱乐与存档。

---

## 一、三步提交

```bash
# 1. Fork 并克隆
git clone https://github.com/<you>/open_artex.git
cd open_artex

# 2. 新建条目（文件名用 owner--repo.json，斜杠换成双横线）
cp data/submissions/_template.json data/submissions/owner--repo.json

# 3. 提 PR
git checkout -b 2k/add-owner-repo
git add data/submissions/owner--repo.json
git commit -m "feat(2k): add owner/repo"
git push origin 2k/add-owner-repo
```

PR 标题格式：

| 类型 | 标题 | 示例 |
| --- | --- | --- |
| 新增 | `[2K] 新增：owner/repo` | `[2K] 新增：Xiao1an/ARTEX-God` |
| 更正 | `[2K] 更正：ARTEX-2K-0013` | 改等级、改描述、补署名 |
| 下架 | `[2K] 下架：ARTEX-2K-0013` | 项目方要求，需说明身份 |

不想写 JSON 也行：开一个 [Issue](https://github.com/Gh0xE9/open_artex/issues/new) 贴仓库链接，维护者代填。
维护者侧的处理命令是 `node scripts/intake.mjs <issue 编号>`：已登记的直接回编号并关闭，未登记的自动抓元数据、生成条目、分配编号。

---

## 二、条目格式

文件路径：`data/submissions/<owner>--<repo>.json`（例如 `Xiao1an--ARTEX-God.json`，全部小写更稳）。

```json
{
  "repo": "Xiao1an/ARTEX-God",
  "url": "https://github.com/Xiao1an/ARTEX-God",
  "kind": "fork",
  "tier": 3,
  "desc": "ARTEX二开增强版-优化敏感操作拦截，增加一键getshell、长链路后渗透、内网横向、逻辑漏洞增强、卫星等IOT协议测试适配等...",
  "note": "加装一键 getshell、内网横向与 IoT 协议适配。",
  "tags": ["增强", "后渗透", "武器化"],
  "evidence": "https://github.com/Xiao1an/ARTEX-God",
  "submittedBy": "your-github-handle"
}
```

### 字段

| 字段 | 必填 | 类型 | 说明 |
| --- | --- | --- | --- |
| `repo` | ✅ | string | `owner/repo`，必须是 GitHub 上真实存在的公开仓库 |
| `url` | ✅ | string | 仓库完整地址，须与 `repo` 一致 |
| `kind` | ✅ | enum | `fork` / `upstream` / `distribution` / `mirror` / `defense` / `tool` |
| `tier` | 仅 `fork` | 1–5 | 认证等级，见下表；其它类型填 0 或不填 |
| `desc` | 建议 | string | **仓库自己的简介原文**，不要润色、不要翻译、不要加评价 |
| `note` | 可选 | string | 一句话备案备注，写“改了什么”，不写“好不好” |
| `tags` | 可选 | string[] | 最多 4 个，短词，如 `改名`、`主题`、`武器库`、`英文` |
| `evidence` | 建议 | string | 能证明“基于 ARTEX”的链接：commit、README 段落、release 说明 |
| `submittedBy` | ✅ | string | 你的 GitHub 用户名，用于追溯，不会展示在页面上 |

### kind 取值

| 值 | 含义 |
| --- | --- |
| `fork` | 二开：在 ARTEX 源码上修改、改名、加功能、重构 |
| `mirror` | 备份镜像：未改动或仅转存 |
| `defense` | 防御研究：检测规则、加固、蜜罐、漏洞分析、教学 |
| `tool` | 周边工具：MCP、插件、移动端、控制台、技能包 |
| `distribution` | 主要发行：下游分叉密集的本地化/翻译发行版 |
| `upstream` | 上游主干（一般不需要提交） |

### tier 怎么填

| 等级 | 名称 | 判定 |
| --- | --- | --- |
| Ⅰ | 搬运 | 原样转存或只改 README |
| Ⅱ | 换皮 | 改名、换界面、换主题、换语言，功能主体不变 |
| Ⅲ | 增筑 | 增加功能模块、技能包、流程编排 |
| Ⅳ | 重构 | 改造架构/技术栈，或与其它框架融合成新产品 |
| Ⅴ | 产业 | 对外运营、建群收费、托管服务、商业发行 |

拿不准就填 Ⅱ 或留空，维护者复核。**自评高不会让项目显得更厉害**，等级只表示“离原版多远”。

---

## 三、审核标准

合并前只看五条，全部通过即合并：

1. **链接可访问**：仓库公开、可打开，不是 404、不是空仓库。
2. **确有关联**：名字、简介、README、commit 至少一处能证明基于 ARTEX（`Autumn-27/ARTEX`、`BaaRai/ARTEX`、`RuoJi6/ARTEX` 及其衍生链）。
3. **引述无误**：`desc` 与仓库简介一致；`note` 只描述改动，不添加未经证实的指控。
4. **不含敏感内容**：不得包含真实攻击目标、受害者信息、未授权入侵教程、个人隐私、密钥。
5. **不重复**：同一仓库只登记一次；fork 链上的镜像按 `mirror` 登记，不重复评级。

维护者可能修改 `tier`、`tags`、`note` 后再合并，改动会写在合并说明里。

---

## 四、不接受什么

- 与 ARTEX 同名的无关项目（建材品牌、画廊、`ARText`、`ArtExt` 等 OCR / 文本抽取工具）。
- 只点了个 star 的空 fork、纯 star 农场、自动化刷量仓库。
- 把别人的二开项目换个名字再提交一次（我们会按仓库地址去重）。
- 带攻击目标、受害者截图、泄露数据、内网地址、账号密码的条目。
- 以举报/羞辱个人为目的、但没有仓库证据的条目。本站登记仓库，不登记人。

---

## 五、更正与下架

**更正**：提 PR 修改你的条目，或开 Issue 附上说明与可核验链接。可更正 `desc`、`tier`、`tags`、`note`、
署名状态；编号不变。

**下架**：项目方本人或授权代表提 Issue（模板：`下架申请`），说明身份与理由。以下情况会直接下架：

- 仓库已删除或转为私有；
- 项目方明确要求，且能证明身份（仓库 owner 账号、组织邮箱等）；
- 条目内容失实且无法更正。

下架后编号作废，不再重新分配，避免编号被复用后指向别的项目。

---

## 六、拿到编号之后

合并并部署后，项目详情页会生成一枚 SVG 徽章：

```markdown
[![ARTEX 二开认证](https://openartex.vercel.app/badge/ARTEX-2K-0013.svg?lang=zh)](https://openartex.vercel.app/p/ARTEX-2K-0013)
```

贴进 README 即可。徽章只表示“已登记”，不代表本站认可、审计或担保该项目。

---

## 七、本地验证

```bash
npm install
node scripts/build-registry.mjs   # 合并 submissions → registry.json
npm run dev                       # http://localhost:3000 查看你的条目
```

提交前请确认 `node scripts/build-registry.mjs` 能跑通、你的条目出现在列表里。CI 会做同样的检查。

---

## 八、FAQ

**Q：登记了会不会被当成“脚本小子”？**
A：本站只做事实登记：仓库地址、自述、改动深度。等级高不代表技术差，等级低也不代表清白。真正被记录的是“这个仓库存在过”。

**Q：我只是备份了源码，也要登记？**
A：可以，按 `mirror` 提交，不评级。备份在源码追溯上有价值——上游删除后，很多研究是靠这些备份做的。

**Q：我的项目已经删了。**
A：提 `[2K] 下架：编号`，附删除说明，我们会把条目标记为已删除并保留编号。

**Q：能不能不写 note？**
A：可以。`desc` 会原样展示，没有 `desc` 的条目显示“仓库未填写简介”。

**Q：数据多久更新一次？**
A：Stars、更新时间等字段由维护者跑 `npm run sync` 刷新；社区提交的条目在每次构建时合并。
