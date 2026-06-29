import { MetadataRoute } from "next";
import { parashot } from "@/data/parashot";
import { sitio } from "@/data/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${sitio.dominio}`;

  const paginasFijas = [
    "",
    "/parasha",
    "/calendario",
    "/videos",
    "/sobre",
    "/contacto",
  ].map((ruta) => ({
    url: `${base}${ruta}`,
    lastModified: new Date(),
  }));

  const paginasParashot = parashot.map((p) => ({
    url: `${base}/parasha/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...paginasFijas, ...paginasParashot];
}
