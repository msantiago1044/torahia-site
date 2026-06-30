"use client";

import Link from "next/link";
import { CicloSemanal } from "@/components/CicloSemanal";
import { VideoEmbed } from "@/components/VideoEmbed";
import { useParashaActual } from "@/lib/useParashaActual";
import { sitio } from "@/data/config";

export function HeroParashaActual() {
  const { parasha, rangoFechas, cargando } = useParashaActual();
  const hoy = new Date().getUTCDay();

  return (
    <section className="textura-pergamino border-b border-pergamino-oscuro">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="animar-entrada">
          {cargando ? (
            <EsqueletoHero />
          ) : parasha ? (
            <>
              <p className="font-utility text-xs uppercase text-tekhelet mb-4">
                Parashá de esta semana · Nº {parasha.numero} de 54
                {rangoFechas && <> · {rangoFechas}</>}
              </p>
              <h1 className="font-display text-5xl sm:text-6xl font-semibold leading-[0.95] text-tinta">
                {parasha.nombre}
              </h1>
              <p className="mt-4 font-utility text-sm text-sello">{parasha.cita}</p>
              <p className="mt-6 text-lg text-tinta-suave leading-relaxed max-w-md">
                {parasha.resumen}
              </p>

              <div className="mt-8 max-w-sm">
                <CicloSemanal diaActivo={hoy} tamaño="sm" />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/parasha/${parasha.slug}`}
                  className="rounded-full bg-tekhelet px-6 py-3 text-sm font-medium text-pergamino hover:bg-tekhelet-claro transition-colors"
                >
                  Leer el estudio completo
                </Link>
                <Link
                  href="/calendario"
                  className="rounded-full border border-tinta/20 px-6 py-3 text-sm font-medium text-tinta hover:border-tekhelet hover:text-tekhelet transition-colors"
                >
                  Ver calendario anual
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="font-utility text-xs uppercase text-tekhelet mb-4">Parashá de esta semana</p>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-tinta">
                No se pudo cargar el calendario en este momento
              </h1>
              <p className="mt-6 text-tinta-suave max-w-md">
                Puedes explorar todas las parashot del ciclo anual mientras se restablece la conexión.
              </p>
              <Link
                href="/calendario"
                className="mt-8 inline-block rounded-full bg-tekhelet px-6 py-3 text-sm font-medium text-pergamino hover:bg-tekhelet-claro transition-colors"
              >
                Ver calendario anual
              </Link>
            </>
          )}
        </div>

        <div className="animar-entrada" style={{ animationDelay: "0.1s" }}>
          <VideoEmbed videoId={sitio.youtube.videoDestacadoId} titulo={parasha ? `Estudio de ${parasha.nombre}` : "Video destacado"} />
        </div>
      </div>
    </section>
  );
}

function EsqueletoHero() {
  return (
    <div className="animate-pulse">
      <div className="h-3 w-48 bg-pergamino-oscuro/50 rounded mb-4" />
      <div className="h-14 w-64 bg-pergamino-oscuro/50 rounded mb-4" />
      <div className="h-3 w-40 bg-pergamino-oscuro/50 rounded mb-6" />
      <div className="h-4 w-full max-w-md bg-pergamino-oscuro/40 rounded mb-2" />
      <div className="h-4 w-3/4 max-w-md bg-pergamino-oscuro/40 rounded" />
    </div>
  );
}
