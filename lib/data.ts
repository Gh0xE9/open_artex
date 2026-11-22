import reposJson from "@/data/registry.json";
import metaJson from "@/data/meta.json";
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

export const repos = reposJson as Repo[];
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
