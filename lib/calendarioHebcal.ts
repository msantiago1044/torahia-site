import type { FechaParasha } from "@/app/api/calendario-hebcal/route";

export type EstadoParasha = "pasada" | "actual" | "futura" | "sin-fecha";

const MESES_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function sumarDias(fechaISO: string, dias: number): Date {
  const d = new Date(`${fechaISO}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + dias);
  return d;
}

/**
 * Formatea el rango civil de lectura (domingo a Shabat) en español,
 * ej: "21 al 27 de junio de 2026" o, si cruza de mes, "28 jun al 4 jul de 2026".
 */
export function formatearRangoSemana(fechaInicioISO: string): string {
  const inicio = sumarDias(fechaInicioISO, 0);
  const fin = sumarDias(fechaInicioISO, 6);

  const diaInicio = inicio.getUTCDate();
  const diaFin = fin.getUTCDate();
  const mesInicio = MESES_ES[inicio.getUTCMonth()];
  const mesFin = MESES_ES[fin.getUTCMonth()];
  const añoFin = fin.getUTCFullYear();

  if (inicio.getUTCMonth() === fin.getUTCMonth()) {
    return `${diaInicio} al ${diaFin} de ${mesFin} de ${añoFin}`;
  }

  // Cruza de mes: abrevia el primer mes para que no quede largo
  const mesInicioAbrev = mesInicio.slice(0, 3);
  const mesFinAbrev = mesFin.slice(0, 3);
  return `${diaInicio} ${mesInicioAbrev} al ${diaFin} ${mesFinAbrev} de ${añoFin}`;
}

/**
 * Determina si una semana (por su fecha de inicio civil) ya pasó, es la actual,
 * o todavía no llega, comparando contra el inicio de la semana civil de hoy.
 */
export function getEstadoSemana(fechaInicioISO: string | undefined, hoy: Date = new Date()): EstadoParasha {
  if (!fechaInicioISO) return "sin-fecha";

  const inicioHoy = new Date(hoy);
  const diaSemana = inicioHoy.getUTCDay();
  inicioHoy.setUTCDate(inicioHoy.getUTCDate() - diaSemana);
  inicioHoy.setUTCHours(0, 0, 0, 0);

  const inicioSemana = new Date(`${fechaInicioISO}T00:00:00Z`);

  if (inicioSemana.getTime() === inicioHoy.getTime()) return "actual";
  return inicioSemana.getTime() < inicioHoy.getTime() ? "pasada" : "futura";
}

export function indexarFechasPorSlug(fechas: FechaParasha[]): Map<string, FechaParasha> {
  // Si una parashá aparece más de una vez en el rango pedido (ciclo de 54 semanas
  // cubre poco más de un año), nos quedamos con la ocurrencia más próxima a hoy.
  const mapa = new Map<string, FechaParasha>();
  for (const f of fechas) {
    const existente = mapa.get(f.slug);
    if (!existente) {
      mapa.set(f.slug, f);
      continue;
    }
    // Prioriza la fecha futura más próxima sobre una pasada lejana, si hay ambigüedad
    const hoy = new Date().toISOString().slice(0, 10);
    const distActual = Math.abs(new Date(existente.fechaInicio).getTime() - new Date(hoy).getTime());
    const distNueva = Math.abs(new Date(f.fechaInicio).getTime() - new Date(hoy).getTime());
    if (distNueva < distActual) mapa.set(f.slug, f);
  }
  return mapa;
}
