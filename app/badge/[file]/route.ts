import { byId, tierOf } from "@/lib/data";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;
  const id = decodeURIComponent(file).replace(/\.svg$/i, "").toUpperCase();
  const r = byId.get(id);
  const tier = r ? tierOf(r.tier) : null;

  const right = r
    ? r.kind === "fork" && tier
      ? `${tier.roman} ${tier.label} · ${r.id.replace("ARTEX-2K-", "2K-")}`
      : `登记 · ${r.id.replace("ARTEX-2K-", "2K-")}`
    : "未登记";
  const fill = r && r.kind === "fork" ? "#a5322a" : "#57534a";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="32" viewBox="0 0 320 32" role="img" aria-label="ARTEX 二开认证 ${esc(right)}">
  <rect width="320" height="32" rx="2" fill="#1a1915"/>
  <rect x="186" width="134" height="32" rx="2" fill="${fill}"/>
  <rect x="186" width="3" height="32" fill="#1a1915" opacity="0.25"/>
  <text x="12" y="21" fill="#f8f7f3" font-family="-apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif" font-size="11.5" letter-spacing="0.6">ARTEX 二开认证</text>
  <text x="196" y="20.5" fill="#ffffff" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="9.5" letter-spacing="0.3">${esc(right)}</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
