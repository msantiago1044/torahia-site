import { Navegacion } from "@/components/Navegacion";
import { Pie } from "@/components/Pie";
import { GrillaVideos } from "@/components/GrillaVideos";
import { sitio } from "@/data/config";

export const metadata = {
  title: "Videos",
  description: "Todos los estudios y enseñanzas en video del canal Torah Diaria.",
};

export default function VideosPage() {
  return (
    <>
      <Navegacion />
      <main className="flex-1">
        <section className="border-b border-pergamino-oscuro textura-pergamino">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
            <p className="font-utility text-xs uppercase text-tekhelet mb-3">Canal de YouTube</p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-tinta">Videos</h1>
            <p className="mt-4 text-tinta-suave max-w-xl">
              Los estudios completos viven en YouTube. Aquí verás los más recientes; el catálogo
              completo está en el canal.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
          <GrillaVideos />

          <div className="mt-12 text-center">
            <a
              href={sitio.youtube.canalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-tekhelet px-7 py-3 text-sm font-medium text-pergamino hover:bg-tekhelet-claro transition-colors"
            >
              Ver todos los videos en YouTube
            </a>
          </div>
        </section>
      </main>
      <Pie />
    </>
  );
}
