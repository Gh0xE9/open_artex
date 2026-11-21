// 把一条 GitHub Issue（提交表单）转成 data/submissions/ 里的条目。
//
// 用法：
//   node scripts/intake.mjs 1
//   node scripts/intake.mjs https://github.com/Gh0xE9/open_artex/issues/1
//
// 行为：
//   - 已登记 → 打印现有编号，不写任何文件（提交通常是重复，回复即可关闭）
//   - 未登记 → 抓仓库元数据，生成 submission，合并进登记册并打印新编号
//
// 注意：tier（改动深度）不自动判定，脚本给一个保守默认值，合并后仍需人工核对。

import fs from "node:fs";
import path from "node:path";
import { mergeRegistry } from "./lib.mjs";

const SITE_REPO = "Gh0xE9/open_artex";
const TOKEN = process.env.GITHUB_TOKEN;
const DATA = path.join(process.cwd(), "data");

const KIND_MAP = [
  [/二开|fork/i, "fork"],
  [/镜像|备份|mirror/i, "mirror"],
  [/防御|检测|defense/i, "defense"],
  [/工具|tool/i, "tool"],
  [/发行|distribution/i, "distribution"],
];

const arg = process.argv[2];
if (!arg) {
  console.error("用法: node scripts/intake.mjs <issue-number|issue-url>");
  process.exit(1);
}
const num = (arg.match(/\/issues\/(\d+)/) ?? [, arg])[1];
if (!/^\d+$/.test(num)) {
  console.error(`无法识别 issue 编号: ${arg}`);
  process.exit(1);
}

async function api(url) {
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "artex-intake",
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return res.json();
}

/** 取 issue 表单里 "### 标题" 下面的内容 */
function section(body, label) {
  const re = new RegExp(`###\\s*${label}\\s*\\n+([\\s\\S]*?)(?=\\n###\\s|$)`);
  const m = body?.match(re);
  return m ? m[1].trim() : "";
}

const issue = await api(`https://api.github.com/repos/${SITE_REPO}/issues/${num}`);
if (issue.pull_request) {
  console.error(`#${num} 是 PR，不是 Issue。PR 请走 data/submissions/ 合并流程。`);
  process.exit(1);
}

const body = issue.body ?? "";
const repoUrl = section(body, "仓库地址").match(/https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)/i);
if (!repoUrl) {
  console.error(`#${num} 正文里找不到仓库地址，无法处理。`);
  process.exit(1);
}
const [, owner, name] = repoUrl;
const repo = `${owner}/${name}`;
const repoLower = repo.toLowerCase();

const kindRaw = section(body, "类型");
const kind = KIND_MAP.find(([re]) => re.test(kindRaw))?.[1] ?? "fork";
const why = section(body, "为什么算 ARTEX 相关");
const change = section(body, "相对上游改了什么");

// 1) 已在册？直接给编号
const registry = JSON.parse(fs.readFileSync(path.join(DATA, "registry.json"), "utf8"));
const hit = registry.find((r) => r.repo.toLowerCase() === repoLower);
if (hit) {
  console.log(`#${num} → 已登记：${hit.id} · ${hit.repo}`);
  console.log(`  类型 ${hit.kind} · 等级 ${hit.tier} · ★${hit.stars}`);
  console.log(`  处理：回复编号与详情页链接后关闭，不新增条目。`);
  process.exit(0);
}

// 2) 未登记，抓元数据
const gh = await api(`https://api.github.com/repos/${repo}`);
const entry = {
  repo,
  url: `https://github.com/${repo}`,
  kind,
  tier: kind === "fork" ? 3 : 1,
  desc: (gh.description ?? "").trim(),
  note: change || null,
  tags: [],
  evidence: why || null,
  submittedBy: issue.user.login,
  meta: {
    stars: gh.stargazers_count ?? 0,
    forks: gh.forks_count ?? 0,
    lang: gh.language ?? null,
    license: (gh.license ?? {}).spdx_id ?? null,
    created: (gh.created_at ?? "").slice(0, 10),
    updated: (gh.pushed_at ?? "").slice(0, 10),
    topics: gh.topics ?? [],
  },
};

const file = path.join(DATA, "submissions", `${owner}--${name}.json`);
fs.writeFileSync(file, JSON.stringify(entry, null, 2) + "\n");
console.log(`已写入 ${path.relative(process.cwd(), file)}`);

const { total, added } = mergeRegistry();
const merged = JSON.parse(fs.readFileSync(path.join(DATA, "registry.json"), "utf8"));
const rec = merged.find((r) => r.repo.toLowerCase() === repoLower);

console.log(`合并完成：共 ${total} 条，新增 ${added} 条`);
console.log(`编号：${rec?.id ?? "未分配"} · ${repo}`);
console.log("");
console.log(`还需人工确认：`);
console.log(`  tier=${entry.tier} 是保守默认值，按改动深度核对 Ⅰ—Ⅴ`);
console.log(`  tags=[] 需补标签（改名 / 换栈 / 功能增强 / 收费运营 …）`);
console.log(`  note 如需改写，直接编辑 ${path.relative(process.cwd(), file)}`);
console.log(`核对完提交：git add data && git commit -m "[2K] 新增：${repo}"`);
