"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { KIND_LABEL, tierOf, type Repo } from "@/lib/data";

type FilterKey = "all" | "fork" | "core" | "mirror" | "defense" | "tool";

const FILTERS: { key: FilterKey; label: string; kinds: Repo["kind"][] }[] = [
  { key: "all", label: "全部", kinds: [] },
  { key: "fork", label: "二开", kinds: ["fork"] },
  { key: "core", label: "上游 / 发行", kinds: ["upstream", "distribution"] },
  { key: "mirror", label: "备份镜像", kinds: ["mirror"] },
  { key: "defense", label: "防御研究", kinds: ["defense"] },
  { key: "tool", label: "周边工具", kinds: ["tool", "index"] },
];

const PAGE = 24;

export function Registry({ repos }: { repos: Repo[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"stars" | "updated" | "id">("stars");
  const [limit, setLimit] = useState(PAGE);

  const base = useMemo(() => {
    const f = FILTERS.find((x) => x.key === filter)!;
    const q = query.trim().toLowerCase();
    let list = repos;
    if (f.kinds.length) list = list.filter((r) => f.kinds.includes(r.kind));
    if (q) {
      list = list.filter((r) =>
        [r.name, r.repo, r.desc, r.owner, r.tags.join(" "), r.note ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    }
    const sorted = [...list];
    if (sort === "stars") sorted.sort((a, b) => b.stars - a.stars || a.repo.localeCompare(b.repo));
    if (sort === "updated") sorted.sort((a, b) => (a.updated < b.updated ? 1 : -1));
    if (sort === "id") sorted.sort((a, b) => a.id.localeCompare(b.id));
    return sorted;
  }, [repos, filter, query, sort]);

  const shown = base.slice(0, limit);

  function pick(key: FilterKey) {
    setFilter(key);
    setLimit(PAGE);
  }

  return (
    <>
      <div className="controls">
        <div className="tabs">
          {FILTERS.map((f) => {
            const n = f.kinds.length
              ? repos.filter((r) => f.kinds.includes(r.kind)).length
              : repos.length;
            return (
              <button
                key={f.key}
                type="button"
                className="tab"
                data-active={filter === f.key}
                onClick={() => pick(f.key)}
              >
                {f.label}
                <span className="tab-count">{n}</span>
              </button>
            );
          })}
        </div>
        <div className="controls-right">
          <div className="field">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.3" />
              <path d="M10.6 10.6L14 14" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(PAGE);
              }}
              placeholder="搜索仓库 / 关键词"
              aria-label="搜索仓库"
            />
          </div>
          <select
            className="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            aria-label="排序方式"
          >
            <option value="stars">按星级</option>
            <option value="updated">按更新</option>
            <option value="id">按编号</option>
          </select>
        </div>
      </div>

      <div className="table-wrap">
        <table className="registry">
          <thead>
            <tr>
              <th className="col-id">认证编号</th>
              <th>项目 / 仓库</th>
              <th className="col-kind">类型</th>
              <th className="col-tier">认证等级</th>
              <th className="col-desc">仓库自述</th>
              <th className="col-stars">Stars</th>
              <th className="col-upd">更新</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => {
              const tier = tierOf(r.tier);
              return (
                <tr
                  key={r.id}
                  className="row"
                  onClick={() => router.push(`/p/${r.id}`)}
                >
                  <td className="col-id">
                    <span className="cert-id">{r.id.replace("ARTEX-2K-", "2K-")}</span>
                  </td>
                  <td className="col-proj">
                    <Link href={`/p/${r.id}`} className="p-name">
                      {r.name}
                    </Link>
                    <div className="p-repo">
                      <span className="attr-dot" data-on={r.attribution} title={r.attribution ? "简介已标注来源" : "简介未标注来源"} />
                      {r.repo}
                    </div>
                    <div className="p-mobile">
                      <span>{KIND_LABEL[r.kind]}</span>
                      {r.kind === "fork" && tier ? (
                        <span>
                          · <span className="tier-roman">{tier.roman}</span> {tier.label}
                        </span>
                      ) : null}
                    </div>
                    <div className={`p-desc-m${r.desc ? "" : " empty"}`}>
                      {r.desc || "（仓库未填写简介）"}
                    </div>
                  </td>
                  <td className="col-kind">
                    <span className="kind-chip" data-kind={r.kind}>
                      {KIND_LABEL[r.kind]}
                    </span>
                  </td>
                  <td className="col-tier">
                    {r.kind === "fork" && tier ? (
                      <span className="tier">
                        <span className="tier-roman">{tier.roman}</span>
                        <span className="tier-label">{tier.label}</span>
                      </span>
                    ) : (
                      <span className="tier-none">—</span>
                    )}
                  </td>
                  <td className="col-desc">
                    <div className={`p-desc${r.desc ? "" : " empty"}`}>
                      {r.desc || "（仓库未填写简介）"}
                    </div>
                  </td>
                  <td className="col-stars" style={{ textAlign: "right" }}>
                    <span className="num">{r.stars.toLocaleString("en-US")}</span>
                  </td>
                  <td className="col-upd" style={{ textAlign: "right" }}>
                    <span className="date">{r.updated ? r.updated.slice(5) : "—"}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {shown.length === 0 ? (
          <div className="empty-state">
            没有匹配的仓库。如果你知道一个，<Link href="/about#submit" style={{ color: "var(--seal)" }}>提交给它一个编号</Link>。
          </div>
        ) : null}
      </div>

      <div className="legend">
        <span>
          <i className="attr-dot" data-on="true" style={{ display: "inline-block" }} />
          简介已标注上游 / 许可证
        </span>
        <span>
          <i className="attr-dot" data-on="false" style={{ display: "inline-block" }} />
          简介未标注来源（不代表仓库未署名）
        </span>
        <span>· 等级仅按仓库自述判定，Ⅰ 级最轻，Ⅴ 级已对外运营</span>
      </div>

      {base.length > shown.length ? (
        <div className="more-row">
          <button type="button" className="btn" onClick={() => setLimit((n) => n + PAGE * 2)}>
            展开更多 · 剩余 {base.length - shown.length}
          </button>
        </div>
      ) : null}
    </>
  );
}
