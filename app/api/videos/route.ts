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

  try {
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${canalId}`;
    const res = await fetch(feedUrl, { next: { revalidate: 3600 } });

    if (!res.ok) {
      return NextResponse.json({ videos: [], aviso: "No se pudo leer el feed del canal." }, { status: 200 });
    }

    const xml = await res.text();
    const entradas = xml.split("<entry>").slice(1);

    const videos: VideoFeed[] = entradas.slice(0, 6).map((entrada) => {
      const id = entrada.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] ?? "";
      const titulo = entrada.match(/<title>(.*?)<\/title>/)?.[1] ?? "";
      const publicado = entrada.match(/<published>(.*?)<\/published>/)?.[1] ?? "";
      const miniatura = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      return { id, titulo, publicado, miniatura };
    });

    return NextResponse.json({ videos, canalUrl });
  } catch {
    return NextResponse.json({ videos: [], aviso: "Error al conectar con YouTube." }, { status: 200 });
  }
}
