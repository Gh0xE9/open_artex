// Turn one GitHub issue (submission form) into an entry under data/submissions/.
//
// Usage:
//   node scripts/intake.mjs 1
//   node scripts/intake.mjs https://github.com/Gh0xE9/open_artex/issues/1
//
// Behaviour:
//   - already listed -> prints the existing number, writes nothing (usually a duplicate: reply and close)
//   - not listed     -> fetches repository metadata, writes a submission, merges it, prints the new number
//
// Note: tier (depth of change) is never auto-assigned. The script writes a conservative default and a
// human reviews it after merging.

import fs from "node:fs";
import path from "node:path";
import { mergeRegistry } from "./lib.mjs";

const SITE_REPO = "Gh0xE9/open_artex";
const TOKEN = process.env.GITHUB_TOKEN;
const DATA = path.join(process.cwd(), "data");

const KIND_MAP = [
  [/derivative|二开|fork/i, "fork"],
  [/mirror|backup|镜像|备份/i, "mirror"],
  [/defen[cs]e|防御|检测/i, "defense"],
  [/tool|工具/i, "tool"],
  [/distribution|发行/i, "distribution"],
];

const arg = process.argv[2];
if (!arg) {
  console.error("usage: node scripts/intake.mjs <issue-number|issue-url>");
  process.exit(1);
}
const num = (arg.match(/\/issues\/(\d+)/) ?? [, arg])[1];
if (!/^\d+$/.test(num)) {
  console.error(`cannot parse an issue number from: ${arg}`);
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

/** Read the content under "### <label>" in an issue form body. Accepts several labels, English or Chinese. */
function section(body, labels) {
  for (const label of [].concat(labels)) {
    const re = new RegExp(`###\\s*${label}\\s*\\n+([\\s\\S]*?)(?=\\n###\\s|$)`);
    const m = body?.match(re);
    if (m) return m[1].trim();
  }
  return "";
}

const issue = await api(`https://api.github.com/repos/${SITE_REPO}/issues/${num}`);
if (issue.pull_request) {
  console.error(`#${num} is a pull request, not an issue. PRs go through data/submissions/.`);
  process.exit(1);
}

const body = issue.body ?? "";
const repoUrl = section(body, ["Repository URL", "仓库地址"]).match(
  /https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)/i,
);
if (!repoUrl) {
  console.error(`no repository URL found in the body of #${num}`);
  process.exit(1);
}
const [, owner, name] = repoUrl;
const repo = `${owner}/${name}`;
const repoLower = repo.toLowerCase();

const kindRaw = section(body, ["Type", "类型"]);
const kind = KIND_MAP.find(([re]) => re.test(kindRaw))?.[1] ?? "fork";
const why = section(body, ["Why it counts as ARTEX-related", "为什么算 ARTEX 相关"]);
const change = section(body, ["What changed relative to upstream", "相对上游改了什么"]);

// 1) Already listed? Hand back the existing number.
const registry = JSON.parse(fs.readFileSync(path.join(DATA, "registry.json"), "utf8"));
const hit = registry.find((r) => r.repo.toLowerCase() === repoLower);
if (hit) {
  console.log(`#${num} -> already listed: ${hit.id} · ${hit.repo}`);
  console.log(`  kind ${hit.kind} · tier ${hit.tier} · ★${hit.stars}`);
  console.log(`  action: reply with the number and the entry link, then close. No new entry.`);
  process.exit(0);
}

// 2) New: fetch metadata.
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
console.log(`wrote ${path.relative(process.cwd(), file)}`);

const { total, added } = mergeRegistry();
const merged = JSON.parse(fs.readFileSync(path.join(DATA, "registry.json"), "utf8"));
const rec = merged.find((r) => r.repo.toLowerCase() === repoLower);

console.log(`merged: ${total} entries, ${added} new`);
console.log(`number: ${rec?.id ?? "unassigned"} · ${repo}`);
console.log("");
console.log(`still needs a human:`);
console.log(`  tier=${entry.tier} is a conservative default — check it against depth of change Ⅰ—Ⅴ`);
console.log(`  tags=[] needs tags (renamed / restacked / extended / commercial ...)`);
console.log(`  edit ${path.relative(process.cwd(), file)} if the note needs rewriting`);
console.log(`after review: git add data && git commit -m "[2K] add: ${repo}"`);
