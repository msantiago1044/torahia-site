import { defineField, defineType } from "sanity";

// Este esquema define el formulario que verás en el Sanity Studio
// para escribir el estudio extendido de cada parashá. El campo `slug`
// debe coincidir exactamente con el slug de data/parashot.ts en el
// proyecto Next.js (ej. "bereshit", "pinjas", "jukat") para que la
// página /parasha/[slug] encuentre el contenido correcto.

export const estudioParasha = defineType({
  name: "estudioParasha",
  title: "Estudio de parashá",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug (debe coincidir con el del sitio)",
      type: "slug",
      description:
        "Usa el mismo identificador que en el sitio, ej: bereshit, lej-leja, jukat, pinjas. No inventes uno nuevo.",
      options: { source: "titulo", maxLength: 60 },
      validation: (Regla) => Regla.required(),
    }),
    defineField({
      name: "titulo",
      title: "Nombre de la parashá",
      type: "string",
      description: "Solo de referencia interna en el Studio (el sitio usa el nombre que ya tiene configurado).",
    }),
    defineField({
      name: "cuerpo",
      title: "Desarrollo del estudio",
      type: "array",
      of: [{ type: "block" }],
      description: "El comentario principal: contexto, análisis del texto, reflexión.",
    }),
    defineField({
      name: "comentaristas",
      title: "Comentaristas clásicos",
      type: "text",
      description: "Citas o referencias a Rashi, Ramban, Rashbam, etc. (texto simple).",
    }),
    defineField({
      name: "preguntas",
      title: "Preguntas para reflexionar",
      type: "text",
      description: "Preguntas abiertas sobre el texto, una por línea.",
    }),
    defineField({
      name: "ensenanzaPractica",
      title: "Enseñanza práctica de la semana",
      type: "text",
      description: "El cierre aplicado: qué hacer con esto esta semana.",
    }),
  ],
  preview: {
    select: { title: "titulo", subtitle: "slug.current" },
  },
});
