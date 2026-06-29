import { parashot, type Parasha } from "@/data/parashot";

// Ancla verificada: la semana que comienza el domingo 21 de junio de 2026
// (Shabat 27 jun 2026) se lee Jukat-Balak (parashot combinadas, ciclo israelí).
// A partir de ahí, cada parashá ocupa una semana del ciclo de 54,
// repitiéndose el ciclo completo cada 54 semanas (aproximación calendario civil,
// sin ajustar meses embolismales — suficiente para uso editorial del sitio).
const ANCLA_DOMINGO = new Date("2026-06-21T00:00:00Z");
const ANCLA_NUMERO_PARASHA = 40; // Balak (Jukat-Balak combinada esa semana)

function inicioDeSemana(fecha: Date): Date {
  const d = new Date(fecha);
  const dia = d.getUTCDay(); // 0 = domingo
  d.setUTCDate(d.getUTCDate() - dia);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

export function getParashaDeLaSemana(fecha: Date = new Date()): Parasha {
  const inicio = inicioDeSemana(fecha);
  const diffMs = inicio.getTime() - ANCLA_DOMINGO.getTime();
  const diffSemanas = Math.round(diffMs / (7 * 24 * 60 * 60 * 1000));

  let numero = ((ANCLA_NUMERO_PARASHA - 1 + diffSemanas) % 54) + 1;
  if (numero < 1) numero += 54;

  return parashot.find((p) => p.numero === numero) ?? parashot[0];
}

export function getDiasDeLaSemana(fecha: Date = new Date()): Date[] {
  const inicio = inicioDeSemana(fecha);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(inicio);
    d.setUTCDate(d.getUTCDate() + i);
    return d;
  });
}

export const NOMBRES_DIAS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Shabat",
];

export const NOMBRES_DIAS_CORTOS = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SHA"];
