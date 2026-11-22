"use client";

import Link from "next/link";
import { Registry } from "@/components/Registry";
import { Seal } from "@/components/Seal";
import { Rich, Seg } from "@/components/Seg";
import { useI18n } from "@/components/LangProvider";
import type { Repo } from "@/lib/data";
import { TIERS } from "@/lib/taxonomy";

const REPO = "https://github.com/Gh0xE9/open_artex";

export type HomeData = {
  total: number;
  forks: number;
  stars: number;
  attributed: number;
  attributedForks: number;
  syncedAt: string;
  tierCounts: number[];
};

export function HomeView({ data, repos }: { data: HomeData; repos: Repo[] }) {
  const { c } = useI18n();
  const lastId = String(data.total).padStart(4, "0");

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">{c.hero.eyebrow}</div>
              <h1 className="hero-title">
                {c.hero.titleA} <em>{c.hero.titleEm}</em>
                {c.hero.titleB}
              </h1>
              <p className="hero-sub">{c.hero.sub(lastId)}</p>
              <p className="hero-lead">
                <Seg s={c.hero.lead1(data.total)} />
              </p>
              <p className="hero-lead">
                <Seg s={c.hero.lead2} />
              </p>
              <p className="hero-note">{c.hero.note}</p>
            </div>

            <aside className="seal-panel">
              <div className="seal-panel-top">
                <span>{c.sealPanel.topLeft}</span>
                <span>{c.sealPanel.topRight}</span>
              </div>
              <Seal size={104} />
              <div className="seal-meta">
                <div>
                  <span>{c.sealPanel.catalogued}</span>
                  {data.total} {c.sealPanel.repos}
                </div>
                <div>
                  <span>{c.sealPanel.derivatives}</span>
                  {data.forks}
                </div>
                <div>
                  <span>{c.sealPanel.stars}</span>
                  {data.stars.toLocaleString("en-US")}
                </div>
                <div>
                  <span>{c.sealPanel.sync}</span>
                  {data.syncedAt}
                </div>
              </div>
            </aside>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="stat-label">{c.stats.registered}</div>
              <div className="stat-value">
                {data.total}
                <small>{c.stats.registeredUnit}</small>
              </div>
            </div>
            <div className="stat">
              <div className="stat-label">{c.stats.derivative}</div>
              <div className="stat-value">
                {data.forks}
                <small>{c.stats.derivativeUnit}</small>
              </div>
            </div>
            <div className="stat">
              <div className="stat-label">{c.stats.attribution}</div>
              <div className="stat-value">
                {Math.round((data.attributed / data.total) * 100)}%
                <small>{c.stats.attributionUnit}</small>
              </div>
            </div>
            <div className="stat">
              <div className="stat-label">{c.stats.lastSync}</div>
              <div className="stat-value" style={{ fontSize: 20, paddingTop: 5 }}>
                {data.syncedAt}
              </div>
            </div>
          </div>

          <div className="tiers-strip">
            {TIERS.map((t, i) => (
              <div className="tier-cell" key={t.n}>
                <span className="tier-roman">{t.roman}</span>
                <span className="tier-name">{c.tiers[i].label}</span>
                <span className="tier-cnt">{data.tierCounts[i] ?? 0}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap">
        <section className="statement" id="why">
          <div className="statement-head">
            <div className="statement-kicker">{c.statement.kicker}</div>
            <h2 className="statement-title">{c.statement.title}</h2>
          </div>
          <div className="statement-body">
            <p className="statement-lead">{c.statement.lead}</p>
            <p>
              <Seg
                s={c.statement.p2(
                  data.forks,
                  data.attributedForks,
                  data.forks - data.attributedForks,
                )}
              />
            </p>
            <p>
              <Seg s={c.statement.p3} />
            </p>
            <p className="statement-sign">{c.statement.sign}</p>
          </div>
        </section>
      </div>

      <section className="section" id="registry">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="section-kicker">{c.registrySection.kicker}</div>
              <h2 className="section-title">{c.registrySection.title}</h2>
            </div>
            <p className="section-desc">{c.registrySection.desc}</p>
          </div>
          <Registry repos={repos} />
        </div>
      </section>

      <div className="wrap">
        <section className="cta" id="submit">
          <div>
            <div className="section-kicker">{c.cta.kicker}</div>
            <h3>{c.cta.title}</h3>
            <p>{c.cta.body}</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a className="btn btn-primary" href={`${REPO}/blob/main/PR.md`} target="_blank" rel="noreferrer">
                {c.cta.btnGuide}
              </a>
              <a className="btn" href={`${REPO}/pulls`} target="_blank" rel="noreferrer">
                {c.cta.btnPr}
              </a>
            </div>
          </div>
          <ol className="steps">
            {c.cta.steps.map((s, i) => (
              <li key={i}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span>
                  <Rich text={s} />
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
