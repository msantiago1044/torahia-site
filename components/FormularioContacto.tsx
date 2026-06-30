"use client";

import { useForm, ValidationError } from "@formspree/react";

// Formulario conectado a Formspree usando su librería oficial de React,
// que maneja la conexión con su API de forma robusta (evita problemas de
// CORS/red que pueden ocurrir con fetch manual en algunos navegadores).
// Si cambias de cuenta de Formspree, reemplaza el ID aquí (es la parte
// final de tu endpoint: formspree.io/f/ESTE-ID).
const FORM_ID = "mlgylyjk";

export function FormularioContacto() {
  const [state, handleSubmit] = useForm(FORM_ID);

  if (state.succeeded) {
    return (
      <div className="rounded-lg border border-tekhelet/30 bg-tekhelet/5 p-6 text-center">
        <p className="font-display text-lg text-tinta">Mensaje enviado</p>
        <p className="text-sm text-tinta-suave mt-1">Gracias por escribir. Te responderemos pronto.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-tinta mb-1.5">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          className="w-full rounded-md border border-pergamino-oscuro bg-pergamino px-4 py-2.5 text-sm text-tinta focus-visible:outline-2 focus-visible:outline-tekhelet"
        />
        <ValidationError prefix="Nombre" field="nombre" errors={state.errors} className="mt-1 text-xs text-red-700" />
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
        <ValidationError prefix="Correo" field="email" errors={state.errors} className="mt-1 text-xs text-red-700" />
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
        <ValidationError prefix="Mensaje" field="mensaje" errors={state.errors} className="mt-1 text-xs text-red-700" />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="rounded-full bg-tekhelet px-6 py-3 text-sm font-medium text-pergamino hover:bg-tekhelet-claro transition-colors disabled:opacity-60"
      >
        {state.submitting ? "Enviando…" : "Enviar mensaje"}
      </button>

      <ValidationError errors={state.errors} className="text-sm text-red-700" />
    </form>
  );
}
