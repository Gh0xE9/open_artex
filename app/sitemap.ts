import type { MetadataRoute } from "next";
import { repos } from "@/lib/data";
import { SITE_URL as SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/about`, changeFrequency: "monthly", priority: 0.6 },
    ...repos.map((r) => ({
      url: `${SITE}/p/${r.id}`,
      lastModified: r.updated || undefined,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
  ];
}
