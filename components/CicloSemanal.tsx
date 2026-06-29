import { NOMBRES_DIAS_CORTOS } from "@/lib/calendario";

type Props = {
  diaActivo?: number; // 0 = domingo ... 6 = shabat
  tamaño?: "sm" | "md";
};

export function CicloSemanal({ diaActivo, tamaño = "md" }: Props) {
  const alturaCelda = tamaño === "sm" ? "h-8" : "h-12";
  const textoTam = tamaño === "sm" ? "text-[10px]" : "text-xs";

  return (
    <div className="flex gap-1" role="img" aria-label="Ciclo semanal de estudio, de domingo a Shabat">
      {NOMBRES_DIAS_CORTOS.map((dia, i) => {
        const esShabat = i === 6;
        const activo = diaActivo === i;
        return (
          <div
            key={dia}
            className={`flex-1 ${alturaCelda} flex items-center justify-center rounded-sm font-utility ${textoTam} transition-colors
              ${activo ? "bg-tekhelet text-pergamino" : esShabat ? "bg-sello/15 text-sello" : "bg-pergamino-oscuro/60 text-tinta-suave"}
            `}
          >
            {dia}
          </div>
        );
      })}
    </div>
  );
}
