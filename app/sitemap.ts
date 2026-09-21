import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  // Canonical domain — override per-environment with NEXT_PUBLIC_SITE_URL.
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mohanvignesh.dev";
  return [
    { url: `${base}/`, lastModified: new Date() },
    ...projects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: new Date(),
    })),
  ];
}
