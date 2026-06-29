import { Navegacion } from "@/components/Navegacion";
import { Pie } from "@/components/Pie";
import { CicloSemanal } from "@/components/CicloSemanal";
import { sitio } from "@/data/config";

export const metadata = {
  title: "Sobre el canal",
  description: "La filosofía y el propósito detrás de Torah Diaria.",
};

export default function SobrePage() {
  return (
    <>
      <Navegacion />
      <main className="flex-1">
        <section className="border-b border-pergamino-oscuro textura-pergamino">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
            <p className="font-utility text-xs uppercase text-tekhelet mb-3">Filosofía</p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-tinta leading-tight">
              {sitio.lema}
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-14 sm:py-16 space-y-8">
          <p className="text-lg text-tinta-suave leading-relaxed">
            {sitio.descripcion}
          </p>

          <p className="text-base text-tinta-suave leading-relaxed">
            El estudio diario no busca cubrir todo de una vez. Sigue el ritmo del ciclo anual de
            lectura: una parashá por semana, y dentro de ella, un paso por día. Así se sostiene un
            año completo de estudio sin necesitar tiempo extraordinario, solo constancia ordinaria.
          </p>

          <div className="rounded-lg border border-pergamino-oscuro p-6 bg-pergamino-oscuro/20">
            <p className="font-utility text-xs uppercase text-tekhelet mb-4">El ciclo semanal</p>
            <CicloSemanal />
            <p className="mt-4 text-sm text-tinta-suave">
              Cada semana, de domingo a Shabat, gira alrededor de una sola parashá: se presenta,
              se profundiza, se comenta y se cierra. La semana siguiente, comienza la próxima.
            </p>
          </div>

          {sitio.sobreElMaestro.nombre && (
            <div>
              <h2 className="font-display text-2xl font-semibold text-tinta mb-3">
                {sitio.sobreElMaestro.nombre}
              </h2>
              <p className="text-base text-tinta-suave leading-relaxed">{sitio.sobreElMaestro.bio}</p>
            </div>
          )}
        </section>
      </main>
      <Pie />
    </>
  );
}
