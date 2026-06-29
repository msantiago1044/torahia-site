import Link from "next/link";
import { Navegacion } from "@/components/Navegacion";
import { Pie } from "@/components/Pie";
import { parashot, LIBROS } from "@/data/parashot";
import { getParashaDeLaSemana } from "@/lib/calendario";

export const metadata = {
  title: "Calendario anual de parashot",
  description: "Las 54 parashot del ciclo anual de lectura de la Torá, organizadas por libro.",
};

export default function CalendarioPage() {
  const actual = getParashaDeLaSemana();

  return (
    <>
      <Navegacion />
      <main className="flex-1">
        <section className="border-b border-pergamino-oscuro textura-pergamino">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
            <p className="font-utility text-xs uppercase text-tekhelet mb-3">Ciclo anual</p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-tinta">
              Las 54 parashot
            </h1>
            <p className="mt-4 text-tinta-suave max-w-xl">
              El recorrido completo de la Torá, dividido en lecturas semanales. Estás cursando{" "}
              <Link href={`/parasha/${actual.slug}`} className="text-tekhelet font-medium hover:text-tekhelet-claro">
                {actual.nombre}
              </Link>{" "}
              esta semana.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:py-16 space-y-14">
          {LIBROS.map((libro) => {
            const lista = parashot.filter((p) => p.libro === libro);
            return (
              <div key={libro}>
                <h2 className="font-display text-2xl font-semibold text-tinta mb-5 flex items-baseline gap-3">
                  {libro}
                  <span className="font-utility text-xs text-tinta-suave/60">{lista.length} parashot</span>
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {lista.map((p) => {
                    const esActual = p.slug === actual.slug;
                    return (
                      <Link
                        key={p.slug}
                        href={`/parasha/${p.slug}`}
                        className={`group rounded-lg border p-4 transition-colors
                          ${esActual
                            ? "border-tekhelet bg-tekhelet/5"
                            : "border-pergamino-oscuro hover:border-tekhelet/50"}
                        `}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-utility text-[10px] text-tinta-suave/60">
                            {String(p.numero).padStart(2, "0")}
                          </span>
                          {esActual && (
                            <span className="font-utility text-[10px] uppercase text-tekhelet">esta semana</span>
                          )}
                        </div>
                        <p className="font-display text-lg font-medium text-tinta group-hover:text-tekhelet transition-colors">
                          {p.nombre}
                        </p>
                        <p className="font-utility text-xs text-sello mt-0.5">{p.cita}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </main>
      <Pie />
    </>
  );
}
