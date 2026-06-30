"use client";

import { useEffect, useState } from "react";
import { parashot, type Parasha } from "@/data/parashot";
import { getEstadoSemana, indexarFechasPorSlug, formatearRangoSemana } from "@/lib/calendarioHebcal";
import type { FechaParasha } from "@/app/api/calendario-hebcal/route";

type ResultadoParashaActual = {
  parasha: Parasha | null;
  rangoFechas: string | null;
  cargando: boolean;
  aviso: string | null;
};

/**
 * Hook cliente que determina la parashá de la semana en curso a partir de
 * la API de Hebcal (calendario hebreo real, ajustado a diáspora). Mientras
 * carga, `cargando` es true y `parasha` es null — los componentes que lo usan
 * deben mostrar un estado de carga en vez de asumir un valor por defecto,
 * para no mostrar momentáneamente una parashá incorrecta.
 */
export function useParashaActual(): ResultadoParashaActual {
  const [estado, setEstado] = useState<ResultadoParashaActual>({
    parasha: null,
    rangoFechas: null,
    cargando: true,
    aviso: null,
  });

  useEffect(() => {
    fetch("/api/calendario-hebcal")
      .then((r) => r.json())
      .then((data) => {
        const indice = indexarFechasPorSlug((data.fechas ?? []) as FechaParasha[]);

        let encontrada: Parasha | null = null;
        let fechaEncontrada: FechaParasha | undefined;

        for (const p of parashot) {
          const f = indice.get(p.slug);
          if (f && getEstadoSemana(f.fechaInicio) === "actual") {
            encontrada = p;
            fechaEncontrada = f;
            break;
          }
        }

        setEstado({
          parasha: encontrada,
          rangoFechas: fechaEncontrada ? formatearRangoSemana(fechaEncontrada.fechaInicio) : null,
          cargando: false,
          aviso: data.aviso ?? (encontrada ? null : "No se pudo determinar la parashá de esta semana."),
        });
      })
      .catch(() => {
        setEstado({
          parasha: null,
          rangoFechas: null,
          cargando: false,
          aviso: "No se pudo conectar con el calendario hebreo.",
        });
      });
  }, []);

  return estado;
}
