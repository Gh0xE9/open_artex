import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CopyBox } from "@/components/CopyBox";
import { Seal } from "@/components/Seal";
import { KIND_LABEL, byId, repos, tierOf } from "@/lib/data";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://artex-2k.vercel.app";

export function generateStaticParams() {
  return repos.map((r) => ({ id: r.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const r = byId.get(id.toUpperCase());
  if (!r) return { title: "未登记" };
  return {
    title: `${r.name} · ${r.id}`,
    description: r.desc || `${r.repo} 的 ARTEX 二开认证记录`,
    openGraph: { title: `${r.id} — ${r.repo}`, description: r.desc },
  };
}

export default async function CertPage({ params }: Props) {
  const { id } = await params;
  const r = byId.get(id.toUpperCase());
  if (!r) notFound();

  const tier = tierOf(r.tier);
  const idx = repos.findIndex((x) => x.id === r.id);
  const prev = repos[idx - 1];
  const next = repos[idx + 1];
  const badgeMd = `[![ARTEX 二开认证](${SITE}/badge/${r.id}.svg)](${SITE}/p/${r.id})`;

  return (
    <div className="wrap">
      <div className="crumb">
        <Link href="/">首页</Link>
        <span className="sep">/</span>
        <Link href="/#registry">登记册</Link>
        <span className="sep">/</span>
        <span>{r.id}</span>
      </div>

      <article className="cert">
        <div className="cert-head">
          <div style={{ minWidth: 0 }}>
            <div className="cert-no">CERTIFICATE № {r.id}</div>
            <h1>{r.name}</h1>
            <div className="cert-repo">
              <a href={r.url} target="_blank" rel="noreferrer">
                github.com/{r.repo} ↗
              </a>
            </div>
          </div>
          <div style={{ flex: "none", textAlign: "center" }}>
            <Seal size={112} roman={tier ? tier.roman : "—"} label={tier ? tier.label : "登记"} />
            <div className="seal-caption">
              {tier ? `${tier.roman} 级 · ${tier.label}` : KIND_LABEL[r.kind]}
            </div>
          </div>
        </div>

        <blockquote className={`quote${r.desc ? "" : " empty"}`}>
          {r.desc || "该仓库未填写简介，仅登记仓库地址与基础元数据。"}
        </blockquote>

        {r.note ? (
          <p className="cert-note">
            <span>备案备注</span>
            {r.note}
          </p>
        ) : null}

        <dl className="grid-meta">
          <div>
            <dt>类型</dt>
            <dd>{KIND_LABEL[r.kind]}</dd>
          </div>
          <div>
            <dt>认证等级</dt>
            <dd>{tier ? `${tier.roman} 级 · ${tier.label}` : `—（${KIND_LABEL[r.kind]}不评级）`}</dd>
          </div>
          <div>
            <dt>许可证</dt>
            <dd>{r.license ?? "未声明"}</dd>
          </div>
          <div>
            <dt>所有者</dt>
            <dd>
              <a href={`https://github.com/${r.owner}`} target="_blank" rel="noreferrer" className="inline-link">
                {r.owner}
              </a>
            </dd>
          </div>
          <div>
            <dt>主要语言</dt>
            <dd>{r.lang ?? "—"}</dd>
          </div>
          <div>
            <dt>简介标注来源</dt>
            <dd>{r.attribution ? "是" : "否（不代表仓库未署名）"}</dd>
          </div>
          <div>
            <dt>Stars</dt>
            <dd>{r.stars.toLocaleString("en-US")}</dd>
          </div>
          <div>
            <dt>Forks</dt>
            <dd>{r.forks.toLocaleString("en-US")}</dd>
          </div>
          <div>
            <dt>创建 / 更新</dt>
            <dd>
              {r.created || "—"} / {r.updated || "—"}
            </dd>
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <dt>标签</dt>
            <dd>
              {r.tags.length ? (
                <span className="tags">
                  {r.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </span>
              ) : (
                <span style={{ color: "var(--muted)" }}>—</span>
              )}
            </dd>
          </div>
          <div>
            <dt>登记依据</dt>
            <dd>仓库公开自述</dd>
          </div>
        </dl>
      </article>

      <section className="panel-block">
        <div className="panel-head">
          <span>Embedded Badge / 认证徽章</span>
          <span>{r.id}</span>
        </div>
        <div className="badge-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/badge/${r.id}.svg`} alt={`${r.id} 认证徽章`} width={320} height={32} />
          <div style={{ flex: 1, minWidth: 280 }}>
            <CopyBox value={badgeMd} />
            <p style={{ fontSize: 10.5, color: "var(--muted)", margin: "8px 0 0", lineHeight: 1.7 }}>
              把上面这行贴进 README，即可在仓库首页展示你的认证。徽章只表示“已登记”，不表示本站认可该项目。
            </p>
          </div>
        </div>
      </section>

      <div className="pager">
        {prev ? (
          <Link href={`/p/${prev.id}`}>
            <span className="lab">Prev · {prev.id}</span>← {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/p/${next.id}`} style={{ textAlign: "right" }}>
            <span className="lab">Next · {next.id}</span>
            {next.name} →
          </Link>
        ) : (
          <span />
        )}
      </div>

      <p style={{ fontSize: 10.5, color: "var(--muted)", lineHeight: 1.8, margin: "28px 0 0", maxWidth: 720 }}>
        本条记录来自公开仓库自述，可能滞后或存在误差。若你代表该项目并要求更正、补充署名或下架，请在本仓库提交
        Issue，我们会核对后处理。
      </p>
    </div>
  );
}
