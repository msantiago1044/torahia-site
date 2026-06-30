"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { parashot, LIBROS } from "@/data/parashot";
import {
  formatearRangoSemana,
  getEstadoSemana,
  indexarFechasPorSlug,
  type EstadoParasha,
} from "@/lib/calendarioHebcal";
import type { FechaParasha } from "@/app/api/calendario-hebcal/route";

export function CalendarioAnual() {
  const [fechas, setFechas] = useState<Map<string, FechaParasha> | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/calendario-hebcal")
      .then((r) => r.json())
      .then((data) => {
        setFechas(indexarFechasPorSlug(data.fechas ?? []));
        setAviso(data.aviso ?? null);
      })
      .catch(() => {
        setFechas(new Map());
        setAviso("No se pudo cargar el calendario en este momento.");
      });
  }, []);

  // Mientras carga, no sabemos cuál es "actual" — usamos un estado neutro
  const cargando = fechas === null;

  // Encuentra la parashá actual para el texto introductorio
  let actual: (typeof parashot)[number] | undefined;
  if (fechas) {
    for (const p of parashot) {
      const f = fechas.get(p.slug);
      if (f && getEstadoSemana(f.fechaInicio) === "actual") {
        actual = p;
        break;
      }
    }
  }

  return (
    <>
      <section className="border-b border-pergamino-oscuro textura-pergamino">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
          <p className="font-utility text-xs uppercase text-tekhelet mb-3">Ciclo anual</p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-tinta">
            Las 54 parashot
          </h1>
          <p className="mt-4 text-tinta-suave max-w-xl">
            El recorrido completo de la Torá, dividido en lecturas semanales, con las fechas
            civiles de este año según el calendario hebreo vigente en la diáspora.
            {actual && (
              <>
                {" "}Estás cursando{" "}
                <Link href={`/parasha/${actual.slug}`} className="text-tekhelet font-medium hover:text-tekhelet-claro">
                  {actual.nombre}
                </Link>{" "}
                esta semana.
              </>
            )}
          </p>
          {aviso && (
            <p className="mt-3 text-sm text-sello">{aviso} Las fechas exactas no están disponibles, pero puedes seguir explorando todas las parashot.</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-16 space-y-14">
        {/* Leyenda */}
        <div className="flex flex-wrap gap-5 text-xs font-utility text-tinta-suave">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-tekhelet inline-block" /> esta semana
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm border border-pergamino-oscuro bg-pergamino inline-block" /> por leer
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-pergamino-oscuro/50 inline-block" /> ya leída
          </span>
        </div>

        {LIBROS.map((libro) => {
          const lista = parashot.filter((p) => p.libro === libro);
          return (
            <div key={libro}>
              <h2 className="font-display text-2xl font-semibold text-tinta mb-5 flex items-baseline gap-3">
                {libro}
                <span className="font-utility text-xs text-tinta-suave/60">{lista.length} parashot</span>
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {lista.map((p) => {
                  const fecha = fechas?.get(p.slug);
                  const estado: EstadoParasha = cargando ? "sin-fecha" : getEstadoSemana(fecha?.fechaInicio);
                  return <TarjetaParasha key={p.slug} parasha={p} estado={estado} fecha={fecha} cargando={cargando} />;
                })}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

function TarjetaParasha({
  parasha,
  estado,
  fecha,
  cargando,
}: {
  parasha: (typeof parashot)[number];
  estado: EstadoParasha;
  fecha?: FechaParasha;
  cargando: boolean;
}) {
  const estilosPorEstado: Record<EstadoParasha, string> = {
    actual: "border-tekhelet bg-tekhelet/5",
    futura: "border-pergamino-oscuro hover:border-tekhelet/50",
    pasada: "border-pergamino-oscuro/50 bg-pergamino-oscuro/20 opacity-60 hover:opacity-90",
    "sin-fecha": "border-pergamino-oscuro hover:border-tekhelet/50",
  };

  return (
    <Link
      href={`/parasha/${parasha.slug}`}
      className={`group rounded-lg border p-4 transition-all ${estilosPorEstado[estado]}`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-utility text-[10px] text-tinta-suave/60">
          {String(parasha.numero).padStart(2, "0")}
        </span>
        {estado === "actual" && (
          <span className="font-utility text-[10px] uppercase text-tekhelet">esta semana</span>
        )}
        {estado === "pasada" && (
          <span className="font-utility text-[10px] uppercase text-tinta-suave/50">leída</span>
        )}
      </div>
      <p className="font-display text-lg font-medium text-tinta group-hover:text-tekhelet transition-colors">
        {parasha.nombre}
      </p>
      <p className="font-utility text-xs text-sello mt-0.5">{parasha.cita}</p>

      {cargando ? (
        <div className="mt-2 h-3 w-32 rounded bg-pergamino-oscuro/40 animate-pulse" />
      ) : fecha ? (
        <p className="mt-2 font-utility text-[11px] text-tinta-suave/70">
          {formatearRangoSemana(fecha.fechaInicio)}
        </p>
      ) : null}
    </Link>
  );
}
