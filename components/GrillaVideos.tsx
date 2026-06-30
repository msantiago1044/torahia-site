"use client";

import { useCallback, useEffect, useState } from "react";
import { sitio } from "@/data/config";

type VideoFeed = {
  id: string;
  titulo: string;
  publicado: string;
  miniatura: string;
};

export function GrillaVideos() {
  const [videos, setVideos] = useState<VideoFeed[] | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  const cargar = useCallback(() => {
    fetch("/api/videos")
      .then((r) => r.json())
      .then((data) => {
        setVideos(data.videos ?? []);
        setAviso(data.aviso ?? null);
      })
      .catch(() => {
        setVideos([]);
        setAviso("No se pudieron cargar los videos en este momento.");
      });
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  function reintentar() {
    setVideos(null);
    cargar();
  }

  if (videos === null) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="aspect-video rounded-lg bg-pergamino-oscuro/40 animate-pulse" />
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-pergamino-oscuro p-8 text-center">
        <p className="text-sm text-tinta-suave max-w-lg mx-auto">
          {aviso ?? "Todavía no hay videos para mostrar aquí."}
        </p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            onClick={reintentar}
            className="text-sm font-medium text-tekhelet hover:text-tekhelet-claro"
          >
            ↻ Reintentar
          </button>
          <a
            href={sitio.youtube.canalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-tekhelet hover:text-tekhelet-claro"
          >
            Ver el canal completo →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((v) => (
        <a
          key={v.id}
          href={`https://www.youtube.com/watch?v=${v.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="aspect-video overflow-hidden rounded-lg bg-pergamino-oscuro/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={v.miniatura}
              alt={v.titulo}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <p className="mt-2.5 text-sm font-medium text-tinta leading-snug group-hover:text-tekhelet transition-colors">
            {v.titulo}
          </p>
        </a>
      ))}
    </div>
  );
}
