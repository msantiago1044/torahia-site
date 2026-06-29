"use client";

import { useState, FormEvent } from "react";

// IMPORTANTE: este formulario necesita un endpoint que reciba el POST.
// La opción más simple sin backend propio es Formspree (gratis hasta 50 envíos/mes):
// 1. Crea una cuenta en https://formspree.io
// 2. Crea un formulario y copia tu endpoint, ej: https://formspree.io/f/abc123xy
// 3. Pégalo abajo en ENDPOINT_FORMULARIO.
const ENDPOINT_FORMULARIO = "https://formspree.io/f/mlgylyjk";

export function FormularioContacto() {
  const [estado, setEstado] = useState<"idle" | "enviando" | "exito" | "error">("idle");

  async function manejarEnvio(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!ENDPOINT_FORMULARIO) {
      setEstado("error");
      return;
    }

    setEstado("enviando");
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch(ENDPOINT_FORMULARIO, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setEstado("exito");
        e.currentTarget.reset();
      } else {
        setEstado("error");
      }
    } catch {
      setEstado("error");
    }
  }

  if (estado === "exito") {
    return (
      <div className="rounded-lg border border-tekhelet/30 bg-tekhelet/5 p-6 text-center">
        <p className="font-display text-lg text-tinta">Mensaje enviado</p>
        <p className="text-sm text-tinta-suave mt-1">Gracias por escribir. Te responderemos pronto.</p>
      </div>
    );
  }

  return (
    <form onSubmit={manejarEnvio} className="space-y-5">
      {!ENDPOINT_FORMULARIO && (
        <p className="rounded-md bg-sello/10 text-sello text-sm px-4 py-3">
          El formulario aún no está conectado. Configura ENDPOINT_FORMULARIO en{" "}
          <code className="font-utility text-xs">components/FormularioContacto.tsx</code>.
        </p>
      )}

      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-tinta mb-1.5">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          className="w-full rounded-md border border-pergamino-oscuro bg-pergamino px-4 py-2.5 text-sm text-tinta focus-visible:outline-2 focus-visible:outline-tekhelet"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-tinta mb-1.5">Correo</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-pergamino-oscuro bg-pergamino px-4 py-2.5 text-sm text-tinta focus-visible:outline-2 focus-visible:outline-tekhelet"
        />
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-tinta mb-1.5">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={5}
          className="w-full rounded-md border border-pergamino-oscuro bg-pergamino px-4 py-2.5 text-sm text-tinta focus-visible:outline-2 focus-visible:outline-tekhelet resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="rounded-full bg-tekhelet px-6 py-3 text-sm font-medium text-pergamino hover:bg-tekhelet-claro transition-colors disabled:opacity-60"
      >
        {estado === "enviando" ? "Enviando…" : "Enviar mensaje"}
      </button>

      {estado === "error" && ENDPOINT_FORMULARIO && (
        <p className="text-sm text-red-700">No se pudo enviar. Intenta de nuevo en un momento.</p>
      )}
    </form>
  );
}
