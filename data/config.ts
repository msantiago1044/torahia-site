// Configuración central del sitio. Edita aquí los datos reales del canal:
// enlaces, videos destacados, redes y contacto. El resto del sitio
// se alimenta de este archivo.

export const sitio = {
  nombre: "Torah Diaria",
  dominio: "torahia.site",
  descripcion:
    "Estudio diario de la Torá en español: parashá semanal, comentario y enseñanza para acompañar el ciclo anual de lectura.",
  lema: "Un verso cada día sostiene el camino de un año.",

  youtube: {
    canalUrl: "https://www.youtube.com/@TorahDiariaEspañol",
    // Reemplaza por el ID real de un video destacado para incrustarlo en el hero.
    // Se obtiene de la URL: youtube.com/watch?v=ESTE_ES_EL_ID
    videoDestacadoId: "",
    // ID del canal (visible en YouTube Studio > Personalización > Básica),
    // se usa para construir el feed de "últimos videos" vía RSS.
    canalId: "UCjdPLAkFqA4lyjillCHCA5Q",
  },

  redes: {
    youtube: "https://www.youtube.com/@TorahDiariaEspañol",
    instagram: "",
    facebook: "",
    whatsappComunidad: "",
    spotify: "",
    telegram: "",
  },

  contacto: {
    email: "[email protected]",
  },

  donaciones: {
    paypal: "",
    zelle: "",
  },

  // Texto base sobre el rabino/maestro o conductor del canal, si aplica.
  sobreElMaestro: {
    nombre: "",
    bio: "",
  },
};
