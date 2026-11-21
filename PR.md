# PR.md · ARTEX 二开认证提交指南

> 发现一个没登记的 ARTEX 二开项目？提 PR，我们给它一个编号。
> 你就是项目方，想补充说明、更正等级或要求下架？同样走这里。

本站的登记册由两部分拼成：一份 GitHub 抓取快照，一份**由 PR 提交的条目**。每次构建（`prebuild`）会把
`data/submissions/` 里的 JSON 合并进 `data/registry.json`，编号由 `data/ids.json` 维护，**只增不改**。

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
[![ARTEX 二开认证](https://openartex.vercel.app/badge/ARTEX-2K-0013.svg)](https://openartex.vercel.app/p/ARTEX-2K-0013)
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
