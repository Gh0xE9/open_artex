import { HomeView } from "@/components/HomeView";
import { meta, repos, stats } from "@/lib/data";
import { TIERS } from "@/lib/taxonomy";

export default function Home() {
  const tierCounts = TIERS.map((t) => repos.filter((r) => r.tier === t.n).length);

  return (
    <HomeView
      repos={repos}
      data={{
        total: stats.total,
        forks: stats.forks,
        stars: stats.stars,
        attributed: stats.attributed,
        attributedForks: stats.attributedForks,
        syncedAt: meta.syncedAt,
        tierCounts,
      }}
    />
  );
}
