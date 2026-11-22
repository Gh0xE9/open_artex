/**
 * 分类常量。刻意与 lib/data.ts 分开：
 * data.ts 会 import registry.json，任何客户端组件只要 import 它，
 * 整份 261 条数据都会被打进浏览器包。这里只放纯常量。
 */

export type Kind =
  | "upstream"
  | "distribution"
  | "fork"
  | "mirror"
  | "defense"
  | "tool"
  | "index";

export const KINDS: Kind[] = [
  "upstream",
  "distribution",
  "fork",
  "mirror",
  "defense",
  "tool",
  "index",
];

export type TierRef = { n: number; roman: string };

/** 等级只保留序号与罗马数字，文字标签按语言取自 lib/copy.ts */
export const TIERS: TierRef[] = [
  { n: 1, roman: "Ⅰ" },
  { n: 2, roman: "Ⅱ" },
  { n: 3, roman: "Ⅲ" },
  { n: 4, roman: "Ⅳ" },
  { n: 5, roman: "Ⅴ" },
];

export const tierOf = (n: number): TierRef | null => TIERS[n - 1] ?? null;
