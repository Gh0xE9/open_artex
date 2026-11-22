import reposJson from "@/data/registry.json";
import metaJson from "@/data/meta.json";
import descEnJson from "@/data/desc-en.json";
import type { Kind } from "@/lib/taxonomy";

export type { Kind };

export type Repo = {
  id: string;
  repo: string;
  name: string;
  owner: string;
  url: string;
  desc: string;
  stars: number;
  forks: number;
  lang: string | null;
  license: string | null;
  created: string;
  updated: string;
  topics: string[];
  kind: Kind;
  tier: number;
  tags: string[];
  note: string | null;
  attribution: boolean;
  /** 英文简介（仅中文自述的条目有；原文仍保留在 desc 里） */
  descEn: string | null;
  source?: string | null;
  submittedBy?: string | null;
};

export type Meta = {
  syncedAt: string;
  upstream: string;
  queries: string[];
  total: number;
  forks: number;
  stars: number;
};

const DESC_EN = descEnJson as Record<string, string>;

/** 查表时把连续空白归一化，避免 sync 改写空格后对不上 */
const norm = (s: string) => s.replace(/\s+/g, " ").trim();

/** 中文自述的英文译本；英文自述或没有简介时返回 null */
export function descEnOf(desc: string | null | undefined): string | null {
  if (!desc) return null;
  return DESC_EN[norm(desc)] ?? null;
}

export const repos: Repo[] = (reposJson as Repo[]).map((r) => ({
  ...r,
  descEn: descEnOf(r.desc),
}));
export const meta = metaJson as Meta;

export const byId = new Map(repos.map((r) => [r.id, r]));

export function countByKind(kind: Kind) {
  return repos.filter((r) => r.kind === kind).length;
}

export const stats = {
  total: repos.length,
  forks: countByKind("fork"),
  stars: repos.reduce((s, r) => s + r.stars, 0),
  attributed: repos.filter((r) => r.attribution).length,
  /** 二开项目中在简介里标注了上游来源的数量 */
  attributedForks: repos.filter((r) => r.kind === "fork" && r.attribution).length,
  syncedAt: meta.syncedAt,
};
