import { NextResponse } from "next/server";
import { parashot } from "@/data/parashot";

export const revalidate = 86400; // refresca una vez al día

type ItemHebcal = {
  date: string; // YYYY-MM-DD del Shabat
  hdate?: string;
  name?: { en?: string; he?: string };
  parshaNum?: number | number[];
};

export type FechaParasha = {
  slug: string;
  fechaInicio: string; // ISO, inicio de semana civil (domingo) de la lectura
  fechaShabat: string; // ISO, fecha exacta del Shabat en que se lee
};

// Construye un índice rápido: nombreHebcal en minúsculas -> slug
const indicePorNombreHebcal = new Map(
  parashot.map((p) => [p.nombreHebcal.toLowerCase(), p.slug])
);

function inicioDeSemanaCivil(fechaShabatISO: string): string {
  const d = new Date(`${fechaShabatISO}T00:00:00Z`);
  // El Shabat es el día 6 de la semana civil (domingo=0). Restamos 6 días.
  d.setUTCDate(d.getUTCDate() - 6);
  return d.toISOString().slice(0, 10);
}

function mapearNombreHebcalASlugs(nombreEn: string): string[] {
  // Hebcal a veces junta dos parashot en un solo string: "Matot-Masei", "Chukat-Balak"
  const partes = nombreEn.split("-").map((p) => p.trim());
  const slugs: string[] = [];
  for (const parte of partes) {
    const slug = indicePorNombreHebcal.get(parte.toLowerCase());
    if (slug) slugs.push(slug);
  }
  return slugs;
}

export async function GET() {
  const hoy = new Date();
  // Pedimos un rango amplio: desde 1 mes atrás hasta ~13 meses adelante,
  // para cubrir el ciclo completo de 54 parashot sin importar en qué
  // punto del año hebreo estemos (cubre meses embolismales también).
  const inicio = new Date(hoy);
  inicio.setUTCMonth(inicio.getUTCMonth() - 1);
  const fin = new Date(hoy);
  fin.setUTCMonth(fin.getUTCMonth() + 13);

  const fmt = (d: Date) => d.toISOString().slice(0, 10);

  try {
    // Hebcal trunca a 180 días por solicitud, así que dividimos el rango en 2 llamadas.
    const medio = new Date(inicio);
    medio.setUTCDate(medio.getUTCDate() + 179);

    const urls = [
      `https://www.hebcal.com/leyning?cfg=json&start=${fmt(inicio)}&end=${fmt(medio)}&i=off&triennial=off`,
      `https://www.hebcal.com/leyning?cfg=json&start=${fmt(medio)}&end=${fmt(fin)}&i=off&triennial=off`,
    ];

    const respuestas = await Promise.all(
      urls.map((u) => fetch(u, { next: { revalidate: 86400 } }))
    );

    if (respuestas.some((r) => !r.ok)) {
      return NextResponse.json(
        { fechas: [], aviso: "No se pudo leer el calendario de Hebcal." },
        { status: 200 }
      );
    }

    const datos = await Promise.all(respuestas.map((r) => r.json()));
    const items: ItemHebcal[] = datos.flatMap((d) => d.items ?? []);

    const fechas: FechaParasha[] = [];
    const vistos = new Set<string>();

    for (const item of items) {
      const nombreEn = item.name?.en;
      if (!nombreEn) continue;

      const slugs = mapearNombreHebcalASlugs(nombreEn);
      for (const slug of slugs) {
        const clave = `${slug}-${item.date}`;
        if (vistos.has(clave)) continue;
        vistos.add(clave);
        fechas.push({
          slug,
          fechaShabat: item.date,
          fechaInicio: inicioDeSemanaCivil(item.date),
        });
      }
    }

    return NextResponse.json({ fechas });
  } catch {
    return NextResponse.json(
      { fechas: [], aviso: "Error al conectar con el servicio de calendario hebreo." },
      { status: 200 }
    );
  }
}
