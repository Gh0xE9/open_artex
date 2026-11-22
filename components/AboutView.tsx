"use client";

import Link from "next/link";
import { useI18n } from "@/components/LangProvider";
import { Rich, Seg } from "@/components/Seg";
import { TIERS } from "@/lib/taxonomy";

const REPO = "https://github.com/Gh0xE9/open_artex";

export type AboutData = {
  total: number;
  forks: number;
  syncedAt: string;
  tierCounts: number[];
};

export function AboutView({ data }: { data: AboutData }) {
  const { c } = useI18n();
  const a = c.about;

  return (
    <div className="wrap">
      <div className="crumb">
        <Link href="/">{c.cert.home}</Link>
        <span className="sep">/</span>
        <span>{a.crumb}</span>
      </div>

      <div className="section-head" style={{ borderBottom: "1px solid var(--line-2)", paddingBottom: 16 }}>
        <div>
          <div className="section-kicker">{a.kicker}</div>
          <h1 className="section-title" style={{ fontSize: 32 }}>
            {a.title}
          </h1>
        </div>
        <p className="section-desc">{a.desc}</p>
      </div>

      <div className="prose">
        <h2>{a.s1.title}</h2>
        <p>
          <Rich text={a.s1.p1} />
        </p>
        <p>{a.s1.p2}</p>
        <p>
          <Seg s={a.s1.p3} />
        </p>

        <h2>{a.s2.title}</h2>
        <p>{a.s2.intro}</p>
        <table className="tier-table">
          <thead>
            <tr>
              <th>{a.s2.colTier}</th>
              <th>{a.s2.colName}</th>
              <th>{a.s2.colCriteria}</th>
              <th style={{ textAlign: "right" }}>{a.s2.colNow}</th>
            </tr>
          </thead>
          <tbody>
            {TIERS.map((t, i) => (
              <tr key={t.n}>
                <td>{t.roman}</td>
                <td style={{ whiteSpace: "nowrap" }}>{c.tiers[i].label}</td>
                <td>{c.tiers[i].desc}</td>
                <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontSize: 11 }}>
                  {data.tierCounts[i] ?? 0}
                </td>
              </tr>
            ))}
            <tr>
              <td style={{ color: "var(--muted)" }}>—</td>
              <td style={{ whiteSpace: "nowrap", color: "var(--muted)" }}>{a.s2.notRatedName}</td>
              <td style={{ color: "var(--muted)" }}>{a.s2.notRatedDesc}</td>
              <td
                style={{
                  textAlign: "right",
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--muted)",
                }}
              >
                {data.total - data.forks}
              </td>
            </tr>
          </tbody>
        </table>
        <p style={{ fontSize: 11, color: "var(--muted)" }}>{a.s2.note(data.total, data.forks)}</p>

        <h2>{a.s3.title}</h2>
        <ul>
          {a.s3.items.map((item) => (
            <li key={item.label}>
              <strong>{item.label}</strong>
              {a.s3.labelSep}
              {item.text}
            </li>
          ))}
        </ul>
        <p>
          <Rich text={a.s3.excl} />
        </p>

        <h2>{a.s4.title}</h2>
        <p>
          <Seg s={a.s4.p1} />
        </p>
        <p>
          <Rich text={a.s4.p2(data.syncedAt)} />
        </p>

        <h2 id="submit">{a.s5.title}</h2>
        <p>
          {a.s5.p1.pre}
          <a href={`${REPO}/blob/main/PR.md`} target="_blank" rel="noreferrer">
            {a.s5.p1.link}
          </a>
          {a.s5.p1.post}
        </p>
        <ol>
          {a.s5.steps.map((s, i) => (
            <li key={i}>
              <Rich text={s} />
            </li>
          ))}
        </ol>
        <p>{a.s5.p2}</p>

        <h2>{a.s6.title}</h2>
        <ul>
          {a.s6.items.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <h2 id="disclaimer">{a.s7.title}</h2>
        <ul>
          {a.s7.items.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <p style={{ marginTop: 24, color: "var(--muted)", fontSize: 11.5 }}>
          {a.upstream}{" "}
          <a href="https://github.com/BaaRai/ARTEX" target="_blank" rel="noreferrer">
            {a.upstreamMirror}
          </a>{" "}
          ·{" "}
          <a href="https://github.com/RuoJi6/ARTEX" target="_blank" rel="noreferrer">
            {a.upstreamMaintained}
          </a>
        </p>
      </div>
    </div>
  );
}
