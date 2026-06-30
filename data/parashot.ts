// Las 54 parashot del ciclo anual de lectura de la Torá,
// agrupadas por libro. El campo `nombreHebcal` usa la transliteración
// exacta que devuelve la API pública de Hebcal (hebcal.com), necesaria
// para cruzar cada parashá con su fecha real del calendario hebreo vigente.
// Algunas semanas Hebcal devuelve nombres combinados (ej. "Matot-Masei",
// "Chukat-Balak"); eso se maneja en lib/calendarioHebcal.ts al separar el string.

export type Parasha = {
  slug: string;
  nombre: string;
  nombreHebcal: string;
  libro: "Bereshit" | "Shemot" | "Vayikra" | "Bamidbar" | "Devarim";
  numero: number; // posición 1-54 en el ciclo anual
  cita: string; // referencia de capítulos
  resumen: string; // 1-2 frases de contenido real, no genérico
};

export const LIBROS = ["Bereshit", "Shemot", "Vayikra", "Bamidbar", "Devarim"] as const;

export const parashot: Parasha[] = [
  { slug: "bereshit", nombre: "Bereshit", nombreHebcal: "Bereshit", libro: "Bereshit", numero: 1, cita: "Génesis 1:1–6:8", resumen: "La creación del mundo en seis días, el Edén, y los primeros hermanos: Caín y Hevel." },
  { slug: "noaj", nombre: "Noaj", nombreHebcal: "Noach", libro: "Bereshit", numero: 2, cita: "Génesis 6:9–11:32", resumen: "El diluvio, el arca de Noaj, y la dispersión de los pueblos en Babel." },
  { slug: "lej-leja", nombre: "Lej Lejá", nombreHebcal: "Lech-Lecha", libro: "Bereshit", numero: 3, cita: "Génesis 12:1–17:27", resumen: "Avraham recibe el llamado de dejar su tierra; nace el pacto de la circuncisión." },
  { slug: "vayera", nombre: "Vayerá", nombreHebcal: "Vayera", libro: "Bereshit", numero: 4, cita: "Génesis 18:1–22:24", resumen: "Los tres visitantes ante la tienda de Avraham, la destrucción de Sedom y el Akedá de Itzjak." },
  { slug: "jaye-sara", nombre: "Jayé Sará", nombreHebcal: "Chayei Sara", libro: "Bereshit", numero: 5, cita: "Génesis 23:1–25:18", resumen: "La muerte de Sará, la compra de la cueva de Majpelá y el matrimonio de Itzjak con Rivká." },
  { slug: "toledot", nombre: "Toledot", nombreHebcal: "Toldot", libro: "Bereshit", numero: 6, cita: "Génesis 25:19–28:9", resumen: "El nacimiento de Yaakov y Esav, la venta de la primogenitura y la bendición robada." },
  { slug: "vayetze", nombre: "Vayetzé", nombreHebcal: "Vayetzei", libro: "Bereshit", numero: 7, cita: "Génesis 28:10–32:3", resumen: "El sueño de la escalera, Yaakov en casa de Lavan, y el nacimiento de sus doce hijos." },
  { slug: "vayishlaj", nombre: "Vayishlaj", nombreHebcal: "Vayishlach", libro: "Bereshit", numero: 8, cita: "Génesis 32:4–36:43", resumen: "Yaakov lucha con el ángel, se reconcilia con Esav y cambia su nombre a Israel." },
  { slug: "vayeshev", nombre: "Vayeshev", nombreHebcal: "Vayeshev", libro: "Bereshit", numero: 9, cita: "Génesis 37:1–40:23", resumen: "Yosef es vendido por sus hermanos y comienza su descenso a Egipto." },
  { slug: "miketz", nombre: "Miketz", nombreHebcal: "Miketz", libro: "Bereshit", numero: 10, cita: "Génesis 41:1–44:17", resumen: "Yosef interpreta los sueños de Faraón y asciende al poder en Egipto." },
  { slug: "vayigash", nombre: "Vayigash", nombreHebcal: "Vayigash", libro: "Bereshit", numero: 11, cita: "Génesis 44:18–47:27", resumen: "Yosef se revela ante sus hermanos y la familia de Yaakov desciende a Egipto." },
  { slug: "vayeji", nombre: "Vayejí", nombreHebcal: "Vayechi", libro: "Bereshit", numero: 12, cita: "Génesis 47:28–50:26", resumen: "Las últimas bendiciones de Yaakov a sus hijos y su sepultura en la Tierra Prometida." },

  { slug: "shemot", nombre: "Shemot", nombreHebcal: "Shemot", libro: "Shemot", numero: 13, cita: "Éxodo 1:1–6:1", resumen: "La esclavitud en Egipto, el nacimiento de Moshé y la zarza ardiente." },
  { slug: "vaera", nombre: "Vaerá", nombreHebcal: "Vaera", libro: "Shemot", numero: 14, cita: "Éxodo 6:2–9:35", resumen: "Las primeras siete plagas y el endurecimiento del corazón de Faraón." },
  { slug: "bo", nombre: "Bo", nombreHebcal: "Bo", libro: "Shemot", numero: 15, cita: "Éxodo 10:1–13:16", resumen: "Las últimas plagas, el primer Pésaj y la salida de Egipto." },
  { slug: "beshalaj", nombre: "Beshalaj", nombreHebcal: "Beshalach", libro: "Shemot", numero: 16, cita: "Éxodo 13:17–17:16", resumen: "La división del Mar Rojo, el Cántico del Mar y el maná en el desierto." },
  { slug: "yitro", nombre: "Yitró", nombreHebcal: "Yitro", libro: "Shemot", numero: 17, cita: "Éxodo 18:1–20:23", resumen: "El consejo de Yitró a Moshé y la entrega de los Diez Mandamientos en el Sinaí." },
  { slug: "mishpatim", nombre: "Mishpatim", nombreHebcal: "Mishpatim", libro: "Shemot", numero: 18, cita: "Éxodo 21:1–24:18", resumen: "Las leyes civiles y sociales que ordenan la vida en comunidad." },
  { slug: "teruma", nombre: "Terumá", nombreHebcal: "Terumah", libro: "Shemot", numero: 19, cita: "Éxodo 25:1–27:19", resumen: "Las instrucciones para construir el Mishkán, el Arca y los utensilios sagrados." },
  { slug: "tetzave", nombre: "Tetzavé", nombreHebcal: "Tetzaveh", libro: "Shemot", numero: 20, cita: "Éxodo 27:20–30:10", resumen: "Las vestiduras sacerdotales y la consagración de Aharón y sus hijos." },
  { slug: "ki-tisa", nombre: "Ki Tisá", nombreHebcal: "Ki Tisa", libro: "Shemot", numero: 21, cita: "Éxodo 30:11–34:35", resumen: "El pecado del becerro de oro y el perdón de Israel tras la intercesión de Moshé." },
  { slug: "vayakel", nombre: "Vayakhel", nombreHebcal: "Vayakhel", libro: "Shemot", numero: 22, cita: "Éxodo 35:1–38:20", resumen: "El pueblo aporta los materiales y construye el Mishkán con generosidad." },
  { slug: "pekude", nombre: "Pekudé", nombreHebcal: "Pekudei", libro: "Shemot", numero: 23, cita: "Éxodo 38:21–40:38", resumen: "La culminación del Mishkán y la nube de gloria que desciende sobre él." },

  { slug: "vayikra", nombre: "Vayikrá", nombreHebcal: "Vayikra", libro: "Vayikra", numero: 24, cita: "Levítico 1:1–5:26", resumen: "Las leyes de los sacrificios: ofrendas voluntarias, de paz y de expiación." },
  { slug: "tzav", nombre: "Tzav", nombreHebcal: "Tzav", libro: "Vayikra", numero: 25, cita: "Levítico 6:1–8:36", resumen: "Instrucciones adicionales a los sacerdotes y su consagración para el servicio." },
  { slug: "shmini", nombre: "Shminí", nombreHebcal: "Shmini", libro: "Vayikra", numero: 26, cita: "Levítico 9:1–11:47", resumen: "La inauguración del Mishkán y las leyes de alimentación permitida y prohibida." },
  { slug: "tazria", nombre: "Tazría", nombreHebcal: "Tazria", libro: "Vayikra", numero: 27, cita: "Levítico 12:1–13:59", resumen: "Las leyes de pureza tras el parto y el diagnóstico de la tzaraat." },
  { slug: "metzora", nombre: "Metzorá", nombreHebcal: "Metzora", libro: "Vayikra", numero: 28, cita: "Levítico 14:1–15:33", resumen: "El proceso de purificación de la tzaraat y las leyes de pureza familiar." },
  { slug: "ajare-mot", nombre: "Ajaré Mot", nombreHebcal: "Achrei Mot", libro: "Vayikra", numero: 29, cita: "Levítico 16:1–18:30", resumen: "El servicio de Yom Kipur del Sumo Sacerdote y las leyes de santidad personal." },
  { slug: "kedoshim", nombre: "Kedoshim", nombreHebcal: "Kedoshim", libro: "Vayikra", numero: 30, cita: "Levítico 19:1–20:27", resumen: "El llamado a la santidad: 'Sed santos, porque Yo soy santo', y las leyes éticas que de ahí derivan." },
  { slug: "emor", nombre: "Emor", nombreHebcal: "Emor", libro: "Vayikra", numero: 31, cita: "Levítico 21:1–24:23", resumen: "Las leyes de los sacerdotes y el calendario de las festividades sagradas." },
  { slug: "behar", nombre: "Behar", nombreHebcal: "Behar", libro: "Vayikra", numero: 32, cita: "Levítico 25:1–26:2", resumen: "Las leyes del año sabático (Shemitá) y del año de jubileo (Yovel)." },
  { slug: "bejukotai", nombre: "Bejukotai", nombreHebcal: "Bechukotai", libro: "Vayikra", numero: 33, cita: "Levítico 26:3–27:34", resumen: "Las bendiciones por seguir los caminos de Dios y las consecuencias de abandonarlos." },

  { slug: "bamidbar", nombre: "Bamidbar", nombreHebcal: "Bamidbar", libro: "Bamidbar", numero: 34, cita: "Números 1:1–4:20", resumen: "El censo de las tribus de Israel y la organización del campamento en el desierto." },
  { slug: "nasso", nombre: "Nasó", nombreHebcal: "Nasso", libro: "Bamidbar", numero: 35, cita: "Números 4:21–7:89", resumen: "Las funciones de los levitas, la bendición sacerdotal y las ofrendas de los líderes." },
  { slug: "behaalotja", nombre: "Behaalotjá", nombreHebcal: "Beha'alotcha", libro: "Bamidbar", numero: 36, cita: "Números 8:1–12:16", resumen: "El encendido de la Menorá, las quejas del pueblo y la humildad de Moshé." },
  { slug: "shlaj", nombre: "Shlaj", nombreHebcal: "Sh'lach", libro: "Bamidbar", numero: 37, cita: "Números 13:1–15:41", resumen: "Los doce exploradores en la Tierra Prometida y el decreto de los cuarenta años en el desierto." },
  { slug: "koraj", nombre: "Koraj", nombreHebcal: "Korach", libro: "Bamidbar", numero: 38, cita: "Números 16:1–18:32", resumen: "La rebelión de Koraj contra el liderazgo de Moshé y Aharón." },
  { slug: "jukat", nombre: "Jukat", nombreHebcal: "Chukat", libro: "Bamidbar", numero: 39, cita: "Números 19:1–22:1", resumen: "La purificación con la vaca roja, la muerte de Miriam y Aharón, y la serpiente de cobre." },
  { slug: "balak", nombre: "Balak", nombreHebcal: "Balak", libro: "Bamidbar", numero: 40, cita: "Números 22:2–25:9", resumen: "El profeta Bilam intenta maldecir a Israel por encargo del rey Balak, y termina bendiciéndolo." },
  { slug: "pinjas", nombre: "Pinjás", nombreHebcal: "Pinchas", libro: "Bamidbar", numero: 41, cita: "Números 25:10–30:1", resumen: "El celo de Pinjás, un nuevo censo y las hijas de Tzelofjad reclaman su herencia." },
  { slug: "matot", nombre: "Matot", nombreHebcal: "Matot", libro: "Bamidbar", numero: 42, cita: "Números 30:2–32:42", resumen: "Las leyes de los votos y la guerra contra Midián." },
  { slug: "masei", nombre: "Masei", nombreHebcal: "Masei", libro: "Bamidbar", numero: 43, cita: "Números 33:1–36:13", resumen: "El recuento de las jornadas por el desierto y los límites de la Tierra Prometida." },

  { slug: "devarim", nombre: "Devarim", nombreHebcal: "Devarim", libro: "Devarim", numero: 44, cita: "Deuteronomio 1:1–3:22", resumen: "Moshé comienza su discurso final, repasando el camino recorrido por el desierto." },
  { slug: "vaetjanan", nombre: "Vaetjanán", nombreHebcal: "Vaetchanan", libro: "Devarim", numero: 45, cita: "Deuteronomio 3:23–7:11", resumen: "Moshé ruega entrar a la Tierra, y se repite el Shemá Israel." },
  { slug: "ekev", nombre: "Ekev", nombreHebcal: "Eikev", libro: "Devarim", numero: 46, cita: "Deuteronomio 7:12–11:25", resumen: "Las recompensas de seguir los mandamientos y el recuerdo de los errores en el desierto." },
  { slug: "reé", nombre: "Reé", nombreHebcal: "Re'eh", libro: "Devarim", numero: 47, cita: "Deuteronomio 11:26–16:17", resumen: "Las leyes de kashrut, diezmos y las tres festividades de peregrinación." },
  { slug: "shoftim", nombre: "Shoftim", nombreHebcal: "Shoftim", libro: "Devarim", numero: 48, cita: "Deuteronomio 16:18–21:9", resumen: "El nombramiento de jueces, reyes y profetas, y las leyes de justicia social." },
  { slug: "ki-tetze", nombre: "Ki Tetzé", nombreHebcal: "Ki Teitzei", libro: "Devarim", numero: 49, cita: "Deuteronomio 21:10–25:19", resumen: "Mandamientos diversos de ética cotidiana, familia y trato justo al prójimo." },
  { slug: "ki-tabo", nombre: "Ki Tavó", nombreHebcal: "Ki Tavo", libro: "Devarim", numero: 50, cita: "Deuteronomio 26:1–29:8", resumen: "Las primicias, las bendiciones y advertencias por el pacto con Dios." },
  { slug: "nitzavim", nombre: "Nitzavim", nombreHebcal: "Nitzavim", libro: "Devarim", numero: 51, cita: "Deuteronomio 29:9–30:20", resumen: "Todo Israel se presenta ante el pacto; la elección entre la vida y el bien." },
  { slug: "vayelej", nombre: "Vayelej", nombreHebcal: "Vayeilech", libro: "Devarim", numero: 52, cita: "Deuteronomio 31:1–30", resumen: "Moshé entrega el liderazgo a Yehoshúa y encomienda la lectura pública de la Torá." },
  { slug: "haazinu", nombre: "Haazinu", nombreHebcal: "Ha'Azinu", libro: "Devarim", numero: 53, cita: "Deuteronomio 32:1–52", resumen: "El cántico final de Moshé, testigo del pacto entre Dios e Israel." },
  { slug: "vezot-haberaja", nombre: "Vezot Haberajá", nombreHebcal: "Vezot Habracha", libro: "Devarim", numero: 54, cita: "Deuteronomio 33:1–34:12", resumen: "La bendición final de Moshé a las tribus y su muerte en el monte Nebo." },
];

export function getParashaPorSlug(slug: string) {
  return parashot.find((p) => p.slug === slug);
}

export function getParashaSiguiente(numero: number) {
  return parashot.find((p) => p.numero === (numero % 54) + 1);
}

export function getParashaAnterior(numero: number) {
  const anteriorNum = numero === 1 ? 54 : numero - 1;
  return parashot.find((p) => p.numero === anteriorNum);
}
