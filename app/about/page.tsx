import type { Metadata } from "next";
import { AboutView } from "@/components/AboutView";
import { meta, repos, stats } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { TIERS } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "Rules",
  description:
    "How ARTEX derivatives are catalogued, tiered Ⅰ–Ⅴ, numbered and corrected. An unofficial, satirical registry kept for entertainment and archival purposes.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function About() {
  const tierCounts = TIERS.map((t) => repos.filter((r) => r.tier === t.n).length);

  return (
    <AboutView
      data={{
        total: stats.total,
        forks: stats.forks,
        syncedAt: meta.syncedAt,
        tierCounts,
      }}
    />
  );
}
