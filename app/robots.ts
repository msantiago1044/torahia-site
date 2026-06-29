import { MetadataRoute } from "next";
import { sitio } from "@/data/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `https://${sitio.dominio}/sitemap.xml`,
  };
}
