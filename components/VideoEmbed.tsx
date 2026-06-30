"use client";

import { useRef, useState } from "react";

type Props = {
  videoId?: string;
  titulo?: string;
};

export function VideoEmbed({ videoId, titulo = "Video de Torah Diaria" }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [conSonido, setConSonido] = useState(false);

  if (!videoId) {
    return (
      <div className="aspect-video w-full rounded-lg border border-dashed border-pergamino-oscuro bg-pergamino-oscuro/30 flex flex-col items-center justify-center gap-2 text-center px-6">
        <p className="font-utility text-xs uppercase text-tekhelet">Video pendiente</p>
        <p className="text-sm text-tinta-suave max-w-sm">
          Agrega el ID del video en <code className="font-utility text-xs">data/config.ts</code> →{" "}
          <code className="font-utility text-xs">youtube.videoDestacadoId</code> para mostrarlo aquí.
        </p>
      </div>
    );
  }

  function activarSonido() {
    // Le pedimos al reproductor de YouTube, vía su API de mensajes postMessage,
    // que quite el silencio. Esto no requiere recargar el iframe ni perder el
    // progreso de la reproducción en curso.
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "unMute", args: [] }),
      "https://www.youtube.com"
    );
    setConSonido(true);
  }

  // mute=1 + autoplay=1 es la única combinación que los navegadores permiten
  // reproducir automáticamente sin interacción previa del usuario.
  // enablejsapi=1 habilita el control por postMessage (botón de activar sonido).
  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1&playsinline=1`;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-sm group">
      <iframe
        ref={iframeRef}
        className="h-full w-full"
        src={src}
        title={titulo}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />

      {!conSonido && (
        <button
          onClick={activarSonido}
          className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-tinta/85 px-4 py-2 text-xs font-medium text-pergamino backdrop-blur-sm transition-colors hover:bg-tinta"
          aria-label="Activar sonido del video"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 9v6h4l5 5V4L7 9H3z" />
            <path d="M16.5 12a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12z" />
          </svg>
          Activar sonido
        </button>
      )}
    </div>
  );
}
