import { PortableText } from "@portabletext/react";
import type { EstudioParasha } from "@/sanity/lib/queries";
import { sanityConfigurado } from "@/sanity/lib/client";

const componentesPortableText = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-base text-tinta-suave leading-relaxed mb-4">{children}</p>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-display text-xl font-semibold text-tinta mt-8 mb-3">{children}</h3>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-tinta">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-5 mb-4 space-y-1 text-tinta-suave">{children}</ul>
    ),
  },
};

export function ContenidoEstudio({
  estudio,
  resumenCorto,
  slug,
}: {
  estudio: EstudioParasha | null;
  resumenCorto: string;
  slug: string;
}) {
  // Caso 1: hay contenido real escrito en Sanity para esta parashá
  if (estudio && (estudio.cuerpo?.length || estudio.comentaristas || estudio.preguntas || estudio.ensenanzaPractica)) {
    return (
      <div className="mb-10">
        {estudio.cuerpo && estudio.cuerpo.length > 0 && (
          <div className="mb-8">
            <PortableText value={estudio.cuerpo} components={componentesPortableText} />
          </div>
        )}

        {estudio.comentaristas && (
          <div className="mb-8">
            <h3 className="font-display text-xl font-semibold text-tinta mb-2">Comentaristas clásicos</h3>
            <p className="text-base text-tinta-suave leading-relaxed whitespace-pre-line">{estudio.comentaristas}</p>
          </div>
        )}

        {estudio.preguntas && (
          <div className="mb-8">
            <h3 className="font-display text-xl font-semibold text-tinta mb-2">Preguntas para reflexionar</h3>
            <p className="text-base text-tinta-suave leading-relaxed whitespace-pre-line">{estudio.preguntas}</p>
          </div>
        )}

        {estudio.ensenanzaPractica && (
          <div className="rounded-lg border border-tekhelet/20 bg-tekhelet/5 p-6">
            <h3 className="font-display text-lg font-semibold text-tinta mb-2">Enseñanza práctica de la semana</h3>
            <p className="text-base text-tinta-suave leading-relaxed whitespace-pre-line">{estudio.ensenanzaPractica}</p>
          </div>
        )}
      </div>
    );
  }

  // Caso 2: todavía no hay contenido en Sanity — mostramos el resumen corto
  // y, solo si Sanity ya está configurado, una invitación a escribirlo allí.
  return (
    <>
      <p className="text-lg text-tinta-suave leading-relaxed mb-10">{resumenCorto}</p>

      {sanityConfigurado ? (
        <div className="rounded-lg border border-dashed border-pergamino-oscuro p-6 mb-10 bg-pergamino-oscuro/20">
          <p className="font-utility text-xs uppercase text-tekhelet mb-2">Estudio completo pendiente</p>
          <p className="text-sm text-tinta-suave">
            Todavía no has escrito el desarrollo completo de esta parashá.{" "}
            <a href="/studio" className="text-tekhelet hover:text-tekhelet-claro font-medium">
              Escríbelo en el panel de edición
            </a>{" "}
            usando el slug <code className="font-utility text-xs">{slug}</code>.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-pergamino-oscuro p-6 mb-10 bg-pergamino-oscuro/20">
          <p className="font-utility text-xs uppercase text-tekhelet mb-2">Espacio para tu comentario</p>
          <p className="text-sm text-tinta-suave">
            Conecta el panel de edición (Sanity) siguiendo las instrucciones del{" "}
            <code className="font-utility text-xs">README.md</code> para escribir aquí el desarrollo
            completo: contexto histórico, comentaristas clásicos y la enseñanza práctica de la semana.
          </p>
        </div>
      )}
    </>
  );
}
