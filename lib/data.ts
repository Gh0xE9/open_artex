import reposJson from "@/data/registry.json";
import metaJson from "@/data/meta.json";

export type Kind =
  | "upstream"
  | "distribution"
  | "fork"
  | "mirror"
  | "defense"
  | "tool"
  | "index";

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

export const KIND_LABEL: Record<Kind, string> = {
  upstream: "上游主干",
  distribution: "主要发行",
  fork: "二开",
  mirror: "备份镜像",
  defense: "防御研究",
  tool: "周边工具",
  index: "收录站",
};

export const KIND_ORDER: Kind[] = [
  "upstream",
  "distribution",
  "fork",
  "mirror",
  "defense",
  "tool",
  "index",
];

export type Tier = {
  n: number;
  roman: string;
  label: string;
  desc: string;
};

export const TIERS: Tier[] = [
  { n: 1, roman: "Ⅰ", label: "搬运", desc: "原样转存或仅做极少量改动，几乎保留上游原貌。" },
  { n: 2, roman: "Ⅱ", label: "换皮", desc: "改名、换界面、换主题、换语言，功能主体不变。" },
  { n: 3, roman: "Ⅲ", label: "增筑", desc: "在原有框架上增加功能模块、技能包或流程编排。" },
  { n: 4, roman: "Ⅳ", label: "重构", desc: "改造架构或技术栈，或与其它框架融合成新产品。" },
  { n: 5, roman: "Ⅴ", label: "产业", desc: "对外运营、建群收费、提供托管服务或商业发行。" },
];

export const tierOf = (n: number) => TIERS.find((t) => t.n === n) ?? null;

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
