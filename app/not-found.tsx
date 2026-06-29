import Link from "next/link";
import { Navegacion } from "@/components/Navegacion";
import { Pie } from "@/components/Pie";

export default function NotFound() {
  return (
    <>
      <Navegacion />
      <main className="flex-1 flex items-center justify-center px-5 py-24">
        <div className="text-center max-w-md">
          <p className="font-utility text-xs uppercase text-tekhelet mb-3">Página no encontrada</p>
          <h1 className="font-display text-4xl font-semibold text-tinta mb-4">
            Esta página se perdió en el desierto
          </h1>
          <p className="text-tinta-suave mb-8">
            No encontramos lo que buscabas. Vuelve al inicio o revisa el calendario de parashot.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/" className="rounded-full bg-tekhelet px-6 py-3 text-sm font-medium text-pergamino hover:bg-tekhelet-claro transition-colors">
              Ir al inicio
            </Link>
            <Link href="/calendario" className="rounded-full border border-tinta/20 px-6 py-3 text-sm font-medium text-tinta hover:border-tekhelet hover:text-tekhelet transition-colors">
              Ver calendario
            </Link>
          </div>
        </div>
      </main>
      <Pie />
    </>
  );
}
