import Link from "next/link";
import { Navegacion } from "@/components/Navegacion";
import { Pie } from "@/components/Pie";
import { HeroParashaActual } from "@/components/HeroParashaActual";
import { GrillaVideos } from "@/components/GrillaVideos";
import { sitio } from "@/data/config";

export default function Home() {
  return (
    <>
      <Navegacion />

      <main className="flex-1">
        <HeroParashaActual />

        {/* SOBRE EL CANAL — breve, sin relleno genérico */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <h2 className="font-display text-2xl font-semibold text-tinta mb-2">Un ciclo, 54 estudios</h2>
              <p className="text-sm text-tinta-suave leading-relaxed">
                Cada semana del año recorre una parashá del ciclo anual de lectura, de{" "}
                <span className="text-tekhelet">Bereshit</span> a{" "}
                <span className="text-tekhelet">Vezot Haberajá</span>, y vuelve a empezar.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-tinta mb-2">En español, sin atajos</h2>
              <p className="text-sm text-tinta-suave leading-relaxed">
                El comentario respeta el texto original y lo explica con calma, sin simplificar
                lo que merece ser entendido despacio.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-tinta mb-2">Un día a la vez</h2>
              <p className="text-sm text-tinta-suave leading-relaxed">
                {sitio.lema} El estudio diario no exige todo de una vez: solo el siguiente paso.
              </p>
            </div>
          </div>
        </section>

        {/* ÚLTIMOS VIDEOS */}
        <section className="border-t border-pergamino-oscuro bg-pergamino-oscuro/20">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-3xl font-semibold text-tinta">Últimos videos</h2>
              <a
                href={sitio.youtube.canalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-tekhelet hover:text-tekhelet-claro whitespace-nowrap"
              >
                Ver canal completo →
              </a>
            </div>
            <GrillaVideos />
          </div>
        </section>

        {/* CTA SUSCRIPCIÓN / COMUNIDAD */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="rounded-2xl bg-tekhelet px-8 py-12 sm:px-14 sm:py-16 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-pergamino mb-3">
              Recibe la parashá cada semana
            </h2>
            <p className="text-pergamino/80 max-w-lg mx-auto mb-7">
              Un correo breve, el día que comienza la semana, con el resumen y el enlace al estudio completo.
            </p>
            <Link
              href="/contacto"
              className="inline-block rounded-full bg-pergamino px-7 py-3 text-sm font-medium text-tekhelet hover:bg-pergamino-oscuro transition-colors"
            >
              Suscribirme
            </Link>
          </div>
        </section>
      </main>

      <Pie />
    </>
  );
}
