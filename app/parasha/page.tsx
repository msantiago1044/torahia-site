import { redirect } from "next/navigation";
import { getParashaDeLaSemana } from "@/lib/calendario";

export default function ParashaIndexPage() {
  const actual = getParashaDeLaSemana();
  redirect(`/parasha/${actual.slug}`);
}
