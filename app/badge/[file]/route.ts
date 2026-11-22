import { copy } from "@/lib/copy";
import { byId } from "@/lib/data";
import { tierOf } from "@/lib/taxonomy";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET(req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const id = decodeURIComponent(file).replace(/\.svg$/i, "").toUpperCase();
  const lang = new URL(req.url).searchParams.get("lang") === "zh" ? "zh" : "en";
  const c = copy[lang];

  const r = byId.get(id);
  const tier = r ? tierOf(r.tier) : null;
  const short = id.replace("ARTEX-2K-", "2K-");

  let right: string;
  if (!r) {
    right = lang === "zh" ? "未登记" : "UNREGISTERED";
  } else if (r.kind === "fork" && tier) {
    right = `${tier.roman} ${c.tiers[tier.n - 1].label} · ${short}`;
  } else {
    right = lang === "zh" ? `登记 · ${short}` : `REGISTERED · ${short}`;
  }

  const left = lang === "zh" ? "ARTEX 二开认证" : "ARTEX DERIVATIVE";
  const fill = r && r.kind === "fork" ? "#a5322a" : "#57534a";
  const aria =
    lang === "zh" ? `ARTEX 二开认证 ${right}` : `ARTEX derivative certificate ${right}`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="32" viewBox="0 0 320 32" role="img" aria-label="${esc(aria)}">
  <rect width="320" height="32" rx="2" fill="#1a1915"/>
  <rect x="176" width="144" height="32" rx="2" fill="${fill}"/>
  <rect x="176" width="3" height="32" fill="#1a1915" opacity="0.25"/>
  <text x="12" y="21" fill="#f8f7f3" font-family="-apple-system, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif" font-size="11.5" letter-spacing="0.6">${esc(left)}</text>
  <text x="186" y="20.5" fill="#ffffff" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="9.2" letter-spacing="0.2">${esc(right)}</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
