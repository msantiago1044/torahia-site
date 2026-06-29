import Link from "next/link";
import { Navegacion } from "@/components/Navegacion";
import { Pie } from "@/components/Pie";
import { CicloSemanal } from "@/components/CicloSemanal";
import { VideoEmbed } from "@/components/VideoEmbed";
import { GrillaVideos } from "@/components/GrillaVideos";
import { getParashaDeLaSemana } from "@/lib/calendario";
import { sitio } from "@/data/config";

export default function Home() {
  const parashaActual = getParashaDeLaSemana();
  const hoy = new Date().getUTCDay();

  return (
    <>
      <Navegacion />

      <main className="flex-1">
        {/* HERO — la parashá de la semana es la tesis de la página */}
        <section className="textura-pergamino border-b border-pergamino-oscuro">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="animar-entrada">
              <p className="font-utility text-xs uppercase text-tekhelet mb-4">
                Parashá de esta semana · Nº {parashaActual.numero} de 54
              </p>
              <h1 className="font-display text-5xl sm:text-6xl font-semibold leading-[0.95] text-tinta">
                {parashaActual.nombre}
              </h1>
              <p className="mt-4 font-utility text-sm text-sello">{parashaActual.cita}</p>
              <p className="mt-6 text-lg text-tinta-suave leading-relaxed max-w-md">
                {parashaActual.resumen}
              </p>

              <div className="mt-8 max-w-sm">
                <CicloSemanal diaActivo={hoy} tamaño="sm" />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/parasha/${parashaActual.slug}`}
                  className="rounded-full bg-tekhelet px-6 py-3 text-sm font-medium text-pergamino hover:bg-tekhelet-claro transition-colors"
                >
                  Leer el estudio completo
                </Link>
                <Link
                  href="/calendario"
                  className="rounded-full border border-tinta/20 px-6 py-3 text-sm font-medium text-tinta hover:border-tekhelet hover:text-tekhelet transition-colors"
                >
                  Ver calendario anual
                </Link>
              </div>
            </div>

            <div className="animar-entrada" style={{ animationDelay: "0.1s" }}>
              <VideoEmbed videoId={sitio.youtube.videoDestacadoId} titulo={`Estudio de ${parashaActual.nombre}`} />
            </div>
          </div>
        </section>

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
