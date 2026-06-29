import { Navegacion } from "@/components/Navegacion";
import { Pie } from "@/components/Pie";
import { FormularioContacto } from "@/components/FormularioContacto";
import { sitio } from "@/data/config";

export const metadata = {
  title: "Contacto",
  description: "Escríbenos o únete a la comunidad de Torah Diaria.",
};

export default function ContactoPage() {
  return (
    <>
      <Navegacion />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
          <p className="font-utility text-xs uppercase text-tekhelet mb-3">Contacto</p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-tinta mb-10">
            Escríbenos
          </h1>

          <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr]">
            <FormularioContacto />

            <div className="space-y-6">
              <div>
                <p className="font-utility text-xs uppercase text-tekhelet mb-2">Correo directo</p>
                <a href={`mailto:${sitio.contacto.email}`} className="text-tinta hover:text-tekhelet">
                  {sitio.contacto.email}
                </a>
              </div>

              {sitio.redes.whatsappComunidad && (
                <div>
                  <p className="font-utility text-xs uppercase text-tekhelet mb-2">Comunidad</p>
                  <a
                    href={sitio.redes.whatsappComunidad}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-tinta hover:text-tekhelet"
                  >
                    Unirme al grupo de WhatsApp
                  </a>
                </div>
              )}

              <div>
                <p className="font-utility text-xs uppercase text-tekhelet mb-2">YouTube</p>
                <a
                  href={sitio.redes.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tinta hover:text-tekhelet"
                >
                  {sitio.nombre}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Pie />
    </>
  );
}
