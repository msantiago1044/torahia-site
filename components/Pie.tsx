import Link from "next/link";
import { sitio } from "@/data/config";

export function Pie() {
  return (
    <footer className="border-t border-pergamino-oscuro bg-pergamino-oscuro/30 mt-auto">
      <div className="mx-auto max-w-6xl px-5 py-12 grid gap-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold text-tinta">{sitio.nombre}</p>
          <p className="mt-2 text-sm text-tinta-suave leading-relaxed">{sitio.lema}</p>
        </div>

        <div>
          <p className="font-utility text-xs uppercase text-tekhelet mb-3">Explorar</p>
          <ul className="space-y-2 text-sm text-tinta-suave">
            <li><Link href="/parasha" className="hover:text-tekhelet">Parashá de la semana</Link></li>
            <li><Link href="/calendario" className="hover:text-tekhelet">Calendario anual</Link></li>
            <li><Link href="/videos" className="hover:text-tekhelet">Videos</Link></li>
            <li><Link href="/contacto" className="hover:text-tekhelet">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-utility text-xs uppercase text-tekhelet mb-3">Síguenos</p>
          <ul className="space-y-2 text-sm text-tinta-suave">
            <li>
              <a href={sitio.redes.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-tekhelet">
                YouTube
              </a>
            </li>
            {sitio.redes.instagram && (
              <li>
                <a href={sitio.redes.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-tekhelet">
                  Instagram
                </a>
              </li>
            )}
            {sitio.redes.whatsappComunidad && (
              <li>
                <a href={sitio.redes.whatsappComunidad} target="_blank" rel="noopener noreferrer" className="hover:text-tekhelet">
                  Comunidad de WhatsApp
                </a>
              </li>
            )}
            <li>
              <a href={`mailto:${sitio.contacto.email}`} className="hover:text-tekhelet">
                {sitio.contacto.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-pergamino-oscuro px-5 py-5 text-center text-xs text-tinta-suave/70 font-utility">
        © {new Date().getFullYear()} {sitio.nombre} · {sitio.dominio}
      </div>
    </footer>
  );
}
