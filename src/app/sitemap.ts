import type { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: getAbsoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: getAbsoluteUrl("/legal"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
