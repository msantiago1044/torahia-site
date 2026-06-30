"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParashaActual } from "@/lib/useParashaActual";

export default function ParashaIndexPage() {
  const router = useRouter();
  const { parasha, cargando } = useParashaActual();

  useEffect(() => {
    if (!cargando && parasha) {
      router.replace(`/parasha/${parasha.slug}`);
    } else if (!cargando && !parasha) {
      router.replace("/calendario");
    }
  }, [cargando, parasha, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-pergamino">
      <p className="font-utility text-sm text-tinta-suave">Cargando la parashá de la semana…</p>
    </div>
  );
}
