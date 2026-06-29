# Torah Diaria — torahia.site

Sitio web del canal de YouTube **Torah Diaria**, construido con Next.js.
Incluye: parashá de la semana calculada automáticamente, calendario de las
54 parashot del ciclo anual, feed de últimos videos de YouTube, página
"Sobre el canal" y formulario de contacto.

## Editar contenido del canal

Todo lo personalizable vive en **`data/config.ts`**:

```ts
export const sitio = {
  youtube: {
    canalUrl: "...",        // URL pública del canal
    videoDestacadoId: "",   // ID del video que se muestra en el hero
    canalId: "",            // ID del canal (para el feed de últimos videos)
  },
  redes: { instagram: "", whatsappComunidad: "", ... },
  contacto: { email: "..." },
};
```

### Cómo obtener el `canalId`

1. Entra a [YouTube Studio](https://studio.youtube.com).
2. Ve a **Personalización → Básica**, o a **Configuración → Canal → Información básica del canal**.
3. Copia el "ID del canal" (empieza con `UC...`).
4. Pégalo en `youtube.canalId` en `data/config.ts`.

Esto activa automáticamente la sección de "Últimos videos" en la home y en `/videos`,
sin necesidad de API key (usa el feed RSS público de YouTube).

### Cómo obtener el `videoDestacadoId`

De la URL de cualquier video: `youtube.com/watch?v=ESTE_ES_EL_ID`.

## Editar las parashot

El texto de cada parashá (resumen de 1-2 frases) está en **`data/parashot.ts`**.
Puedes ampliarlo, y el contenido más extenso del estudio semanal se edita
directamente en `app/parasha/[slug]/page.tsx` (sección "Espacio para tu comentario").

## Conectar el formulario de contacto

El formulario en `/contacto` necesita un endpoint que reciba el envío.
La forma más simple sin programar backend:

1. Crea una cuenta gratis en [formspree.io](https://formspree.io) (50 envíos/mes gratis).
2. Crea un formulario y copia tu endpoint (ej: `https://formspree.io/f/abc123xy`).
3. Pégalo en `components/FormularioContacto.tsx`, constante `ENDPOINT_FORMULARIO`.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Despliegue

Ver instrucciones completas de despliegue y conexión del dominio `torahia.site`
en la respuesta del chat donde se generó este proyecto, o en `DEPLOY.md`.
