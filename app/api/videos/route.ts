import { NextResponse } from "next/server";
import { sitio } from "@/data/config";

export const revalidate = 3600; // refresca cada hora

type VideoFeed = {
  id: string;
  titulo: string;
  publicado: string;
  miniatura: string;
};

export async function GET() {
  const { canalId, canalUrl } = sitio.youtube;

  // El feed RSS de YouTube acepta channel_id directamente.
  // Si no se configuró canalId, intentamos resolverlo no es posible sin API key,
  // así que devolvemos vacío con instrucción clara.
  if (!canalId) {
    return NextResponse.json(
      {
        videos: [],
        aviso:
          "Configura youtube.canalId en data/config.ts (lo encuentras en YouTube Studio → Personalización → Básica) para activar el feed automático de videos.",
      },
      { status: 200 }
    );
  }

  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${canalId}`;

  try {
    const res = await fetch(feedUrl, {
      next: { revalidate: 3600 },
      headers: {
        // Algunos servidores de YouTube rechazan peticiones sin un User-Agent
        // de navegador real cuando vienen de un servidor (no de un navegador).
        "User-Agent":
          "Mozilla/5.0 (compatible; TorahDiariaSite/1.0; +https://torahia.site)",
      },
    });

    if (!res.ok) {
      // Reportamos el código real para poder diagnosticar:
      // 404 = el channel_id no existe o está mal escrito.
      // 400 = formato de la URL inválido.
      // otros = problema temporal de YouTube.
      return NextResponse.json(
        {
          videos: [],
          aviso: `YouTube respondió con error ${res.status} para el canal configurado. Verifica que el Channel ID "${canalId}" sea exactamente el de YouTube Studio → Personalización → Básica (debe empezar con "UC" y tener 24 caracteres).`,
        },
        { status: 200 }
      );
    }

    const xml = await res.text();

    // Si el feed cargó pero no tiene el tag <feed>, algo vino mal formado
    // (por ejemplo una página de error HTML en vez de XML).
    if (!xml.includes("<feed")) {
      return NextResponse.json(
        { videos: [], aviso: "YouTube no devolvió un feed válido para este canal." },
        { status: 200 }
      );
    }

    const entradas = xml.split("<entry>").slice(1);

    if (entradas.length === 0) {
      return NextResponse.json(
        {
          videos: [],
          aviso:
            "El canal existe pero el feed no tiene videos públicos todavía (los videos no listados o privados no aparecen aquí).",
        },
        { status: 200 }
      );
    }

    const videos: VideoFeed[] = entradas.slice(0, 6).map((entrada) => {
      const id = entrada.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] ?? "";
      const titulo = entrada.match(/<title>(.*?)<\/title>/)?.[1] ?? "";
      const publicado = entrada.match(/<published>(.*?)<\/published>/)?.[1] ?? "";
      const miniatura = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      return { id, titulo, publicado, miniatura };
    });

    return NextResponse.json({ videos, canalUrl });
  } catch (error) {
    const detalle = error instanceof Error ? error.message : "error desconocido";
    return NextResponse.json(
      { videos: [], aviso: `No se pudo conectar con YouTube (${detalle}).` },
      { status: 200 }
    );
  }
}
