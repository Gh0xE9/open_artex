import type { Lang } from "@/lib/copy";

/**
 * 站点绝对地址的唯一来源。
 * 线上通过环境变量 NEXT_PUBLIC_SITE_URL 覆盖；本地/未配置时回落到正式域名。
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://openartex.vercel.app"
).replace(/\/+$/, "");

/** 徽章 SVG 地址；默认英文，中文加 ?lang=zh */
export function badgeSrc(id: string, lang: Lang = "en"): string {
  return `${SITE_URL}/badge/${id}.svg${lang === "zh" ? "?lang=zh" : ""}`;
}

/** 徽章 Markdown 片段（可直接贴进 README） */
export function badgeMarkdown(id: string, lang: Lang = "en"): string {
  const alt = lang === "zh" ? "ARTEX 二开认证" : "ARTEX Derivative Registry";
  return `[![${alt}](${badgeSrc(id, lang)})](${SITE_URL}/p/${id})`;
}

/** 徽章 HTML 片段 */
export function badgeHtml(id: string, lang: Lang = "en"): string {
  const alt = lang === "zh" ? "ARTEX 二开认证" : "ARTEX Derivative Registry";
  return `<a href="${SITE_URL}/p/${id}"><img src="${badgeSrc(id, lang)}" alt="${alt}" /></a>`;
}
