import Link from "next/link";
import { notFound } from "next/navigation";
import { Navegacion } from "@/components/Navegacion";
import { Pie } from "@/components/Pie";
import { BadgeEstadoParasha } from "@/components/BadgeEstadoParasha";
import { ContenidoEstudio } from "@/components/ContenidoEstudio";
import { parashot, getParashaPorSlug, getParashaSiguiente, getParashaAnterior } from "@/data/parashot";
import { getEstudioParasha } from "@/sanity/lib/queries";

export const revalidate = 3600; // revalida el contenido de Sanity cada hora

export function generateStaticParams() {
  return parashot.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getParashaPorSlug(slug);
  if (!p) return {};
  return {
    title: `${p.nombre} — ${p.cita}`,
    description: p.resumen,
  };
}

export default async function ParashaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getParashaPorSlug(slug);
  if (!p) notFound();

  const anterior = getParashaAnterior(p.numero);
  const siguiente = getParashaSiguiente(p.numero);
  const estudio = await getEstudioParasha(p.slug);

  return (
    <>
      <Navegacion />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
          <Link href="/calendario" className="text-sm text-tekhelet hover:text-tekhelet-claro mb-8 inline-block">
            ← Volver al calendario
          </Link>

          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-utility text-xs uppercase text-tekhelet">
                Parashá Nº {p.numero} de 54 · {p.libro}
              </span>
              <BadgeEstadoParasha slug={p.slug} />
            </div>
            <h1 className="font-display text-5xl font-semibold text-tinta leading-tight">{p.nombre}</h1>
            <p className="mt-3 font-utility text-base text-sello">{p.cita}</p>
          </header>

          <ContenidoEstudio estudio={estudio} resumenCorto={p.resumen} slug={p.slug} />

          <nav className="flex items-center justify-between border-t border-pergamino-oscuro pt-8">
            {anterior ? (
              <Link href={`/parasha/${anterior.slug}`} className="group max-w-[45%]">
                <span className="block font-utility text-[10px] uppercase text-tinta-suave/60 mb-1">Anterior</span>
                <span className="text-sm font-medium text-tinta group-hover:text-tekhelet">{anterior.nombre}</span>
              </Link>
            ) : <span />}
            {siguiente && (
              <Link href={`/parasha/${siguiente.slug}`} className="group max-w-[45%] text-right">
                <span className="block font-utility text-[10px] uppercase text-tinta-suave/60 mb-1">Siguiente</span>
                <span className="text-sm font-medium text-tinta group-hover:text-tekhelet">{siguiente.nombre}</span>
              </Link>
            )}
          </nav>
        </article>
      </main>
      <Pie />
    </>
  );
}
