import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CertView } from "@/components/CertView";
import { byId, repos } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return repos.map((r) => ({ id: r.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const r = byId.get(id.toUpperCase());
  if (!r) return { title: "Not found" };
  return {
    title: `${r.name} · ${r.id}`,
    description: r.descEn || r.desc || `${r.repo} — ARTEX derivative record`,
    alternates: { canonical: `${SITE_URL}/p/${r.id}` },
    openGraph: {
      title: `${r.id} — ${r.repo}`,
      description: r.descEn || r.desc || `${r.repo} — ARTEX derivative record`,
      url: `${SITE_URL}/p/${r.id}`,
    },
  };
}

export default async function CertPage({ params }: Props) {
  const { id } = await params;
  const r = byId.get(id.toUpperCase());
  if (!r) notFound();

  const idx = repos.findIndex((x) => x.id === r.id);
  const prev = repos[idx - 1];
  const next = repos[idx + 1];

  return (
    <CertView
      repo={r}
      prev={prev ? { id: prev.id, name: prev.name } : null}
      next={next ? { id: next.id, name: next.name } : null}
    />
  );
}
