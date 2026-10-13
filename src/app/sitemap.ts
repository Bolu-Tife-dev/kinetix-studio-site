import type { MetadataRoute } from "next";

const LAST_MODIFIED = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kinetix.studio";

  return [
    { url: base, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/docs`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/downloads`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
