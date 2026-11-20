// 从 GitHub 重新抓取 ARTEX 相关仓库，更新 data/repos.json，再合并进登记册。
// 用法：GITHUB_TOKEN=ghp_xxx npm run sync
// 未带 token 时走匿名配额（搜索 10 次/分钟、核心 60 次/小时），够跑一轮。

import fs from "node:fs";
import path from "node:path";
import { mergeRegistry } from "./lib.mjs";

const ROOT = process.cwd();
const DATA = path.join(ROOT, "data");
const read = (p, fb) => {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return fb;
  }
};

const TOKEN = process.env.GITHUB_TOKEN ?? "";
const HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "artex-2k-registry",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

const SEARCHES = [
  "artex in:name,description&sort=stars&order=desc&per_page=100",
  "artex in:name&sort=updated&order=desc&per_page=100",
  "ARTEX 二开&sort=updated&order=desc&per_page=100",
  "artex in:readme&sort=updated&order=desc&per_page=50",
];

const FORK_SOURCES = ["BaaRai/ARTEX", "RuoJi6/ARTEX"];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(url, attempt = 0) {
  const res = await fetch(url, { headers: HEADERS });
  if (res.status === 403 || res.status === 429) {
    const reset = res.headers.get("x-ratelimit-reset");
    throw new Error(`GitHub 限流（${res.status}），重置时间 ${reset ? new Date(Number(reset) * 1000).toISOString() : "未知"}。请设置 GITHUB_TOKEN 后重试。`);
  }
  if (!res.ok) {
    if (attempt < 2) {
      await sleep(1500);
      return api(url, attempt + 1);
    }
    throw new Error(`${url} → ${res.status}`);
  }
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    if (attempt < 2) {
      await sleep(1500);
      return api(url, attempt + 1);
    }
    throw new Error(`${url} 返回内容不完整`);
  }
}

const curation = read(path.join(DATA, "curation.json"), {});
const exclude = new Set(read(path.join(DATA, "exclude.json"), []));
const previous = read(path.join(DATA, "repos.json"), []);
const prevByRepo = new Map((Array.isArray(previous) ? previous : []).map((r) => [r.repo, r]));

const found = new Map();

function add(r) {
  if (!r || !r.full_name) return;
  if (exclude.has(r.full_name)) return;
  found.set(r.full_name, r);
}

for (const spec of SEARCHES) {
  const [q, ...rest] = spec.split("&");
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&${rest.join("&")}`;
  const data = await api(url);
  (data.items ?? []).forEach(add);
  console.log(`search ok: ${data.items?.length ?? 0} · ${q}`);
  await sleep(6500);
}

for (const repo of FORK_SOURCES) {
  try {
    const items = await api(`https://api.github.com/repos/${repo}/forks?sort=stargazers&per_page=50`);
    items.forEach(add);
    console.log(`forks ok: ${items.length} · ${repo}`);
  } catch (e) {
    console.warn(`forks skip: ${repo} · ${e.message}`);
  }
  await sleep(1500);
}

const repos = [...found.values()].map((r) => {
  const c = curation[r.full_name] ?? {};
  const prev = prevByRepo.get(r.full_name) ?? {};
  return {
    repo: r.full_name,
    name: r.name,
    owner: r.owner.login,
    url: r.html_url,
    desc: (r.description ?? "").trim(),
    stars: r.stargazers_count ?? 0,
    forks: r.forks_count ?? 0,
    lang: r.language ?? null,
    license: r.license?.spdx_id ?? null,
    created: (r.created_at ?? "").slice(0, 10),
    updated: (r.pushed_at ?? r.updated_at ?? "").slice(0, 10),
    topics: (r.topics ?? []).slice(0, 6),
    kind: c.kind ?? prev.kind ?? "fork",
    tier: c.tier ?? prev.tier ?? 1,
    tags: c.tags ?? prev.tags ?? [],
    note: c.note ?? prev.note ?? null,
  };
});

repos.sort((a, b) => b.stars - a.stars || a.repo.localeCompare(b.repo));
fs.writeFileSync(path.join(DATA, "repos.json"), JSON.stringify(repos, null, 1) + "\n");

const metaPath = path.join(DATA, "meta.json");
const meta = read(metaPath, {});
meta.syncedAt = new Date().toISOString().slice(0, 10);
meta.queries = [...SEARCHES.map((q) => q.split("&")[0]), ...FORK_SOURCES.map((f) => `forks ${f}`)];
fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + "\n");

console.log(`snapshot: ${repos.length} 个仓库`);
const merged = mergeRegistry();
console.log(`registry: ${merged.total} 条，新增 ${merged.added} 条`);
