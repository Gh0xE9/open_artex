"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/LangProvider";
import type { Repo } from "@/lib/data";
import { type Kind, tierOf } from "@/lib/taxonomy";

type FilterKey = "all" | "fork" | "core" | "mirror" | "defense" | "tool";

const FILTERS: { key: FilterKey; kinds: Kind[] }[] = [
  { key: "all", kinds: [] },
  { key: "fork", kinds: ["fork"] },
  { key: "core", kinds: ["upstream", "distribution"] },
  { key: "mirror", kinds: ["mirror"] },
  { key: "defense", kinds: ["defense"] },
  { key: "tool", kinds: ["tool", "index"] },
];

const PAGE = 24;

export function Registry({ repos }: { repos: Repo[] }) {
  const router = useRouter();
  const { c } = useI18n();
  const t = c.registry;
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
                {t.filters[f.key]}
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
              placeholder={t.search}
              aria-label={t.searchAria}
            />
          </div>
          <select
            className="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            aria-label={t.sortAria}
          >
            <option value="stars">{t.sort.stars}</option>
            <option value="updated">{t.sort.updated}</option>
            <option value="id">{t.sort.id}</option>
          </select>
        </div>
      </div>

      <div className="table-wrap">
        <table className="registry">
          <thead>
            <tr>
              <th className="col-id">{t.colId}</th>
              <th>{t.colProject}</th>
              <th className="col-kind">{t.colKind}</th>
              <th className="col-tier">{t.colTier}</th>
              <th className="col-desc">{t.colDesc}</th>
              <th className="col-stars">{t.colStars}</th>
              <th className="col-upd">{t.colUpd}</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => {
              const tier = tierOf(r.tier);
              const tierText = tier ? c.tiers[tier.n - 1] : null;
              return (
                <tr key={r.id} className="row" onClick={() => router.push(`/p/${r.id}`)}>
                  <td className="col-id">
                    <span className="cert-id">{r.id.replace("ARTEX-2K-", "2K-")}</span>
                  </td>
                  <td className="col-proj">
                    <Link href={`/p/${r.id}`} className="p-name">
                      {r.name}
                    </Link>
                    <div className="p-repo">
                      <span
                        className="attr-dot"
                        data-on={r.attribution}
                        title={r.attribution ? t.attrYes : t.attrNo}
                      />
                      {r.repo}
                    </div>
                    <div className="p-mobile">
                      <span>{c.kinds[r.kind]}</span>
                      {r.kind === "fork" && tier && tierText ? (
                        <span>
                          · <span className="tier-roman">{tier.roman}</span> {tierText.label}
                        </span>
                      ) : null}
                    </div>
                    <div className={`p-desc-m${r.desc ? "" : " empty"}`}>
                      {r.desc || t.noDesc}
                    </div>
                  </td>
                  <td className="col-kind">
                    <span className="kind-chip" data-kind={r.kind}>
                      {c.kinds[r.kind]}
                    </span>
                  </td>
                  <td className="col-tier">
                    {r.kind === "fork" && tier && tierText ? (
                      <span className="tier">
                        <span className="tier-roman">{tier.roman}</span>
                        <span className="tier-label">{tierText.label}</span>
                      </span>
                    ) : (
                      <span className="tier-none">—</span>
                    )}
                  </td>
                  <td className="col-desc">
                    <div className={`p-desc${r.desc ? "" : " empty"}`}>{r.desc || t.noDesc}</div>
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
            {t.emptyPre}
            <Link href="/about#submit" style={{ color: "var(--seal)" }}>
              {t.emptyLink}
            </Link>
            {t.emptyPost}
          </div>
        ) : null}
      </div>

      <div className="legend">
        <span>
          <i className="attr-dot" data-on="true" style={{ display: "inline-block" }} />
          {t.legendYes}
        </span>
        <span>
          <i className="attr-dot" data-on="false" style={{ display: "inline-block" }} />
          {t.legendNo}
        </span>
        <span>{t.legendTier}</span>
      </div>

      {base.length > shown.length ? (
        <div className="more-row">
          <button type="button" className="btn" onClick={() => setLimit((n) => n + PAGE * 2)}>
            {t.more(base.length - shown.length)}
          </button>
        </div>
      ) : null}
    </>
  );
}
