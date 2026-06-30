import { client, sanityConfigurado } from "./client";

export type EstudioParasha = {
  titulo?: string;
  cuerpo?: PortableTextBlock[];
  comentaristas?: string;
  preguntas?: string;
  ensenanzaPractica?: string;
};

// PortableText es el formato de texto enriquecido nativo de Sanity
// (similar a un array de bloques tipo Markdown estructurado).
export type PortableTextBlock = {
  _type: string;
  _key: string;
  style?: string;
  children?: { _type: string; text: string; marks?: string[] }[];
  markDefs?: unknown[];
  listItem?: string;
};

const QUERY_ESTUDIO_POR_SLUG = `
  *[_type == "estudioParasha" && slug.current == $slug][0]{
    titulo,
    cuerpo,
    comentaristas,
    preguntas,
    ensenanzaPractica
  }
`;

/**
 * Obtiene el contenido extendido de una parashá desde Sanity.
 * Devuelve null si Sanity no está configurado (variables de entorno
 * ausentes) o si todavía no se ha escrito el documento para ese slug —
 * en ambos casos la página debe caer de vuelta al resumen corto local.
 */
export async function getEstudioParasha(slug: string): Promise<EstudioParasha | null> {
  if (!sanityConfigurado || !client) return null;

  try {
    const resultado = await client.fetch<EstudioParasha | null>(
      QUERY_ESTUDIO_POR_SLUG,
      { slug },
      { next: { revalidate: 3600 } }
    );
    return resultado ?? null;
  } catch {
    return null;
  }
}
