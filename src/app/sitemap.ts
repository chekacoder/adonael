import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://adonaeltrading.com";

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1.0,
      images: [
        `${baseUrl}/images/trading_atrium.jpg`,
        `${baseUrl}/images/meteor_interior.webp`,
        `${baseUrl}/images/meteor_cuisine.webp`,
      ],
    },
  ];
}
