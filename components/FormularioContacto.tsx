"use client";

import { useState, FormEvent } from "react";

// Formulario conectado a Formspree. Si en algún momento cambias de cuenta,
// reemplaza este endpoint por el nuevo (Formspree → tu formulario → Settings → Endpoint).
const ENDPOINT_FORMULARIO = "https://formspree.io/f/mlgylyjk";

export function FormularioContacto() {
  const [estado, setEstado] = useState<"idle" | "enviando" | "exito" | "error">("idle");
  const [mensajeError, setMensajeError] = useState<string | null>(null);

  async function manejarEnvio(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!ENDPOINT_FORMULARIO) {
      setEstado("error");
      setMensajeError("El formulario no está conectado todavía.");
      return;
    }

    setEstado("enviando");
    setMensajeError(null);

    const formData = new FormData(e.currentTarget);
    const datos = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(ENDPOINT_FORMULARIO, {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setEstado("exito");
        e.currentTarget.reset();
        return;
      }

      // Formspree devuelve detalle del error en el cuerpo JSON cuando algo falla
      // (formulario desactivado, falta verificar el correo, límite alcanzado, etc.)
      let detalle = `Código de error: ${res.status}.`;
      try {
        const cuerpo = await res.json();
        if (cuerpo?.errors?.length) {
          detalle = cuerpo.errors.map((er: { message?: string }) => er.message).filter(Boolean).join(" ");
        } else if (cuerpo?.error) {
          detalle = cuerpo.error;
        }
      } catch {
        // si el cuerpo no es JSON, nos quedamos con el código de estado
      }

      setEstado("error");
      setMensajeError(detalle);
    } catch {
      setEstado("error");
      setMensajeError("No se pudo conectar con el servidor de envío. Revisa tu conexión e intenta de nuevo.");
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
        <p className="text-sm text-red-700">
          No se pudo enviar. {mensajeError ?? "Intenta de nuevo en un momento."}
        </p>
      )}
    </form>
  );
}
