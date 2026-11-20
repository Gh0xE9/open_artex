// 把 GitHub 快照 + 社区提交合并成站点读取的登记册。
// 编号一旦分配就写进 data/ids.json，之后只增不改。

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DATA = path.join(ROOT, "data");
const read = (p, fb) => {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return fb;
  }
};

const SIGN = /upstream|fork|agpl|autumn-27|基于|上游|二次开发|二开|派生|衍生|来源|source/i;

export function mergeRegistry() {
  const snapshot = read(path.join(DATA, "repos.json"), {});
  const base = Array.isArray(snapshot) ? snapshot : snapshot.repos ?? [];
  const ids = read(path.join(DATA, "ids.json"), {});
  const subDir = path.join(DATA, "submissions");
  const subs = fs.existsSync(subDir)
    ? fs
        .readdirSync(subDir)
        .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
        .map((f) => ({ file: f, ...read(path.join(subDir, f), {}) }))
    : [];

  const byRepo = new Map(base.map((r) => [r.repo.toLowerCase(), { ...r }]));

  for (const s of subs) {
    if (!s.repo || !s.url) continue;
    const key = s.repo.toLowerCase();
    const prev = byRepo.get(key) ?? {
      repo: s.repo,
      name: s.repo.split("/")[1],
      owner: s.repo.split("/")[0],
      url: s.url,
      desc: "",
      stars: 0,
      forks: 0,
      lang: null,
      license: null,
      created: "",
      updated: "",
      topics: [],
      kind: "fork",
      tier: 1,
      tags: [],
      note: null,
      attribution: false,
    };
    byRepo.set(key, {
      ...prev,
      desc: s.desc ?? prev.desc,
      kind: s.kind ?? prev.kind,
      tier: s.tier ?? prev.tier,
      tags: s.tags ?? prev.tags,
      note: s.note ?? prev.note,
      source: s.evidence ?? prev.source ?? null,
      submittedBy: s.submittedBy ?? prev.submittedBy ?? null,
    });
  }

  const all = [...byRepo.values()];
  let max = 0;
  for (const id of Object.values(ids)) {
    const n = Number(String(id).split("-").pop());
    if (Number.isFinite(n)) max = Math.max(max, n);
  }

  // 新条目按星级插队分配编号（已有编号不动）
  const pending = all
    .filter((r) => !ids[r.repo])
    .sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0) || a.repo.localeCompare(b.repo));
  for (const r of pending) {
    max += 1;
    ids[r.repo] = `ARTEX-2K-${String(max).padStart(4, "0")}`;
  }

  for (const r of all) {
    r.id = ids[r.repo];
    r.attribution =
      r.attribution || SIGN.test(r.desc ?? "") || /fork/i.test(r.desc ?? "");
    r.tags = r.tags ?? [];
    r.desc = (r.desc ?? "").trim();
    r.note = r.note ?? null;
  }

  all.sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0) || a.repo.localeCompare(b.repo));

  fs.writeFileSync(path.join(DATA, "registry.json"), JSON.stringify(all, null, 1));
  fs.writeFileSync(path.join(DATA, "ids.json"), JSON.stringify(ids, null, 1));

  const metaPath = path.join(DATA, "meta.json");
  const meta = read(metaPath, {});
  meta.total = all.length;
  meta.forks = all.filter((r) => r.kind === "fork").length;
  meta.stars = all.reduce((s, r) => s + (r.stars ?? 0), 0);
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + "\n");

  return { total: all.length, added: pending.length };
}
