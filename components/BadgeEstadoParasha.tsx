"use client";

import { useEffect, useState } from "react";
import { getEstadoSemana, indexarFechasPorSlug, formatearRangoSemana } from "@/lib/calendarioHebcal";
import type { FechaParasha } from "@/app/api/calendario-hebcal/route";

export function BadgeEstadoParasha({ slug }: { slug: string }) {
  const [estado, setEstado] = useState<"cargando" | "actual" | "pasada" | "futura" | "sin-fecha">("cargando");
  const [rango, setRango] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/calendario-hebcal")
      .then((r) => r.json())
      .then((data) => {
        const indice = indexarFechasPorSlug((data.fechas ?? []) as FechaParasha[]);
        const f = indice.get(slug);
        setEstado(getEstadoSemana(f?.fechaInicio));
        if (f) setRango(formatearRangoSemana(f.fechaInicio));
      })
      .catch(() => setEstado("sin-fecha"));
  }, [slug]);

  if (estado === "cargando") {
    return <span className="inline-block h-5 w-24 rounded-full bg-pergamino-oscuro/40 animate-pulse" />;
  }

  if (estado === "actual") {
    return (
      <span className="font-utility text-xs uppercase bg-tekhelet/10 text-tekhelet px-2 py-0.5 rounded-full">
        Esta semana{rango && ` · ${rango}`}
      </span>
    );
  }

  if (estado === "pasada" && rango) {
    return <span className="font-utility text-xs text-tinta-suave/60">Se leyó del {rango}</span>;
  }

  if (estado === "futura" && rango) {
    return <span className="font-utility text-xs text-tinta-suave/60">Se leerá del {rango}</span>;
  }

  return null;
}
