import { Navegacion } from "@/components/Navegacion";
import { Pie } from "@/components/Pie";
import { CalendarioAnual } from "@/components/CalendarioAnual";

export const metadata = {
  title: "Calendario anual de parashot",
  description: "Las 54 parashot del ciclo anual de lectura de la Torá, con las fechas civiles reales de este año según el calendario hebreo vigente en la diáspora.",
};

export default function CalendarioPage() {
  return (
    <>
      <Navegacion />
      <main className="flex-1">
        <CalendarioAnual />
      </main>
      <Pie />
    </>
  );
}
