/**
 * 站点绝对地址的唯一来源。
 * 线上通过环境变量 NEXT_PUBLIC_SITE_URL 覆盖；本地/未配置时回落到正式域名。
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://openartex.vercel.app"
).replace(/\/+$/, "");

/** 徽章 Markdown 片段（可直接贴进 README） */
export function badgeMarkdown(id: string): string {
  return `[![ARTEX 二开认证](${SITE_URL}/badge/${id}.svg)](${SITE_URL}/p/${id})`;
}

/** 徽章 HTML 片段 */
export function badgeHtml(id: string): string {
  return `<a href="${SITE_URL}/p/${id}"><img src="${SITE_URL}/badge/${id}.svg" alt="ARTEX 二开认证" /></a>`;
}
