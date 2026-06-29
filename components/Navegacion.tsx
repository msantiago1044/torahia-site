"use client";

import Link from "next/link";
import { useState } from "react";
import { sitio } from "@/data/config";

const enlaces = [
  { href: "/parasha", label: "Parashá de la semana" },
  { href: "/calendario", label: "Calendario" },
  { href: "/videos", label: "Videos" },
  { href: "/sobre", label: "Sobre el canal" },
  { href: "/contacto", label: "Contacto" },
];

export function Navegacion() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-pergamino-oscuro bg-pergamino/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-baseline gap-2 group">
          <span className="font-display text-xl font-semibold tracking-tight text-tinta">
            {sitio.nombre}
          </span>
          <span className="hidden font-utility text-[10px] uppercase text-tekhelet sm:inline">
            estudio diario
          </span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {enlaces.map((e) => (
            <li key={e.href}>
              <Link
                href={e.href}
                className="text-sm text-tinta-suave transition-colors hover:text-tekhelet"
              >
                {e.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={sitio.youtube.canalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-tekhelet px-4 py-2 text-sm font-medium text-pergamino transition-colors hover:bg-tekhelet-claro md:inline-block"
        >
          Ver en YouTube
        </a>

        <button
          onClick={() => setAbierto(!abierto)}
          className="md:hidden p-2 -mr-2"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={abierto}
        >
          <span className="block w-6 h-0.5 bg-tinta mb-1.5" />
          <span className="block w-6 h-0.5 bg-tinta mb-1.5" />
          <span className="block w-6 h-0.5 bg-tinta" />
        </button>
      </nav>

      {abierto && (
        <div className="md:hidden border-t border-pergamino-oscuro px-5 py-4 flex flex-col gap-4">
          {enlaces.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              onClick={() => setAbierto(false)}
              className="text-base text-tinta-suave"
            >
              {e.label}
            </Link>
          ))}
          <a
            href={sitio.youtube.canalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-tekhelet px-4 py-2.5 text-center text-sm font-medium text-pergamino"
          >
            Ver en YouTube
          </a>
        </div>
      )}
    </header>
  );
}
