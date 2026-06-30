import { createClient } from "@sanity/client";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2026-01-01";

// `sanityConfigurado` indica si las variables de entorno ya fueron puestas.
// El sitio funciona perfectamente sin ellas (usa el resumen corto de
// data/parashot.ts como contenido), así que nunca lanzamos un error duro
// por falta de configuración — solo desactivamos las consultas a Sanity.
export const sanityConfigurado = Boolean(projectId);

export const client = sanityConfigurado
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;
