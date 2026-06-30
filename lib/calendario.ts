// Nombres de los días de la semana civil, usados por el componente
// CicloSemanal (motivo visual recurrente del sitio). El cálculo real
// de qué parashá corresponde a cada semana vive ahora en
// lib/calendarioHebcal.ts + app/api/calendario-hebcal/route.ts,
// que consultan la API de Hebcal para reflejar el calendario hebreo real.

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
