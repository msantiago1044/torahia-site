type Props = {
  videoId?: string;
  titulo?: string;
};

export function VideoEmbed({ videoId, titulo = "Video de Torah Diaria" }: Props) {
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

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg shadow-sm">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={titulo}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
