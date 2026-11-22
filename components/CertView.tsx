"use client";

import Link from "next/link";
import { CopyBox } from "@/components/CopyBox";
import { Seal } from "@/components/Seal";
import { useI18n } from "@/components/LangProvider";
import { noteIn, tagIn } from "@/lib/copy";
import type { Repo } from "@/lib/data";
import { tierOf } from "@/lib/taxonomy";
import { badgeMarkdown } from "@/lib/site";

export function CertView({
  repo,
  prev,
  next,
}: {
  repo: Repo;
  prev: { id: string; name: string } | null;
  next: { id: string; name: string } | null;
}) {
  const { c, lang } = useI18n();
  const t = c.cert;
  const tier = tierOf(repo.tier);
  const tierText = tier ? c.tiers[tier.n - 1] : null;
  const note = noteIn(lang, repo.note);
  const badgeMd = badgeMarkdown(repo.id, lang);
  const tierLabel = tier && tierText ? `${tier.roman} · ${tierText.label}` : null;

  return (
    <div className="wrap">
      <div className="crumb">
        <Link href="/">{t.home}</Link>
        <span className="sep">/</span>
        <Link href="/#registry">{t.registry}</Link>
        <span className="sep">/</span>
        <span>{repo.id}</span>
      </div>

      <article className="cert">
        <div className="cert-head">
          <div style={{ minWidth: 0 }}>
            <div className="cert-no">{t.no(repo.id)}</div>
            <h1>{repo.name}</h1>
            <div className="cert-repo">
              <a href={repo.url} target="_blank" rel="noreferrer">
                github.com/{repo.repo} ↗
              </a>
            </div>
          </div>
          <div style={{ flex: "none", textAlign: "center" }}>
            <Seal size={112} roman={tier ? tier.roman : "—"} label={tierText ? tierText.label : t.notRated} />
            <div className="seal-caption">{tierLabel ?? c.kinds[repo.kind]}</div>
          </div>
        </div>

        <blockquote className={`quote${repo.desc ? "" : " empty"}`}>
          {repo.desc || t.emptyQuote}
        </blockquote>

        {note ? (
          <p className="cert-note">
            <span>{t.noteLabel}</span>
            {note}
          </p>
        ) : null}

        <dl className="grid-meta">
          <div>
            <dt>{t.type}</dt>
            <dd>{c.kinds[repo.kind]}</dd>
          </div>
          <div>
            <dt>{t.tier}</dt>
            <dd>{tierLabel ?? t.notRatedFor(c.kinds[repo.kind])}</dd>
          </div>
          <div>
            <dt>{t.license}</dt>
            <dd>{repo.license ?? t.undeclared}</dd>
          </div>
          <div>
            <dt>{t.owner}</dt>
            <dd>
              <a
                href={`https://github.com/${repo.owner}`}
                target="_blank"
                rel="noreferrer"
                className="inline-link"
              >
                {repo.owner}
              </a>
            </dd>
          </div>
          <div>
            <dt>{t.lang}</dt>
            <dd>{repo.lang ?? "—"}</dd>
          </div>
          <div>
            <dt>{t.attribution}</dt>
            <dd>{repo.attribution ? t.attributionYes : t.attributionNo}</dd>
          </div>
          <div>
            <dt>{t.stars}</dt>
            <dd>{repo.stars.toLocaleString("en-US")}</dd>
          </div>
          <div>
            <dt>{t.forks}</dt>
            <dd>{repo.forks.toLocaleString("en-US")}</dd>
          </div>
          <div>
            <dt>{t.dates}</dt>
            <dd>
              {repo.created || "—"} / {repo.updated || "—"}
            </dd>
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <dt>{t.tags}</dt>
            <dd>
              {repo.tags.length ? (
                <span className="tags">
                  {repo.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tagIn(lang, tag)}
                    </span>
                  ))}
                </span>
              ) : (
                <span style={{ color: "var(--muted)" }}>—</span>
              )}
            </dd>
          </div>
          <div>
            <dt>{t.basis}</dt>
            <dd>{t.basisValue}</dd>
          </div>
        </dl>
      </article>

      <section className="panel-block">
        <div className="panel-head">
          <span>{t.badgeHead}</span>
          <span>{repo.id}</span>
        </div>
        <div className="badge-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/badge/${repo.id}.svg?lang=${lang}`}
            alt={t.badgeAlt(repo.id)}
            width={320}
            height={32}
          />
          <div style={{ flex: 1, minWidth: 280 }}>
            <CopyBox value={badgeMd} />
            <p style={{ fontSize: 10.5, color: "var(--muted)", margin: "8px 0 0", lineHeight: 1.7 }}>
              {t.badgeHint}
            </p>
          </div>
        </div>
      </section>

      <div className="pager">
        {prev ? (
          <Link href={`/p/${prev.id}`}>
            <span className="lab">
              {t.prev} · {prev.id}
            </span>
            ← {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/p/${next.id}`} style={{ textAlign: "right" }}>
            <span className="lab">
              {t.next} · {next.id}
            </span>
            {next.name} →
          </Link>
        ) : (
          <span />
        )}
      </div>

      <p style={{ fontSize: 10.5, color: "var(--muted)", lineHeight: 1.8, margin: "28px 0 0", maxWidth: 720 }}>
        {t.fineprint}
      </p>
    </div>
  );
}
