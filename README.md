# Torah Diaria — torahia.site

Sitio web del canal de YouTube **Torah Diaria**, construido con Next.js.
Incluye: parashá de la semana calculada automáticamente, calendario de las
54 parashot del ciclo anual, feed de últimos videos de YouTube, página
"Sobre el canal" y formulario de contacto.

## Calendario de parashot con fechas reales

El calendario (`/calendario` y el badge "esta semana" en cada parashá) usa la
**API pública de Hebcal** (hebcal.com) para calcular el calendario hebreo real,
incluyendo meses embolismales (Adar I/II) y la diferencia entre diáspora e
Israel. El sitio está configurado para **diáspora** (`i=off` en la llamada a
Hebcal), que es lo correcto si tu audiencia es principalmente
latinoamericana/hispanohablante fuera de Israel.

Esto significa que:
- Las fechas civiles de cada parashá se recalculan solas cada año, sin que tengas que tocar nada.
- Las parashot ya leídas en el ciclo actual aparecen atenuadas en `/calendario`.
- La parashá de la semana en curso se resalta automáticamente.
- Si Hebcal no responde (caída del servicio, sin conexión), el sitio sigue
  funcionando: muestra todas las parashot sin fecha en vez de romperse.

Si en algún momento quieres cambiar a Israel, edita
`app/api/calendario-hebcal/route.ts` y cambia `i=off` por `i=on` en las URLs.

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

## Editar las parashot (contenido corto + CMS para el estudio largo)

El resumen corto de cada parashá (1-2 frases, el que se ve en las tarjetas
del calendario) está en **`data/parashot.ts`**. Para el **desarrollo
completo del estudio semanal** (contexto histórico, comentaristas clásicos,
preguntas, enseñanza práctica), el sitio está conectado a **Sanity**, un CMS
gratuito con un panel de edición visual (sin tocar código).

### Cómo conectar Sanity (una sola vez)

**1. Crea el Studio (el panel donde escribirás el contenido)**

En tu computadora, en una carpeta **distinta** a la de este proyecto:

```bash
npm create sanity@latest -- --project-name "Torah Diaria" --dataset production --template clean --typescript
```

Te pedirá iniciar sesión (puedes usar Google/GitHub) y confirmar la creación
del proyecto. Al terminar, anota el **Project ID** que te muestra en pantalla
— lo necesitarás en el paso 3.

**2. Agrega el esquema de "Estudio de parashá"**

Dentro de la carpeta del Studio que acabas de crear, ve a `schemaTypes/` y:

- Copia el archivo `sanity-studio-schema-referencia/estudioParasha.ts` (incluido en este proyecto) a `schemaTypes/estudioParasha.ts` de tu Studio.
- Edita `schemaTypes/index.ts` de tu Studio para incluirlo, usando como referencia `sanity-studio-schema-referencia/schemaTypes-index.ts`.

Luego, dentro de la carpeta del Studio:
```bash
npm run dev
```
Esto abre el panel en `http://localhost:3333`. Ahí verás el formulario
"Estudio de parashá" listo para escribir contenido.

**3. Conecta el proyecto Next.js (este repositorio) a tu Studio**

Crea un archivo `.env.local` en la raíz de **este** proyecto (cópialo de
`.env.local.example`) con:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=tu-project-id-del-paso-1
NEXT_PUBLIC_SANITY_DATASET=production
```

**4. Despliega el Studio para poder editar desde cualquier lugar**

Dentro de la carpeta del Studio:
```bash
npm run deploy
```
Te dará una URL pública tipo `https://torah-diaria.sanity.studio` — ese es
tu panel de edición permanente, sin necesidad de tenerlo corriendo en tu
computadora.

**5. Agrega las mismas variables de entorno en Vercel/Netlify**

En **Vercel → Settings → Environment Variables** (o el equivalente en
Netlify), agrega `NEXT_PUBLIC_SANITY_PROJECT_ID` y
`NEXT_PUBLIC_SANITY_DATASET` con los mismos valores. Vuelve a desplegar
para que tomen efecto.

### Cómo escribir el contenido de una parashá

1. Entra a tu Studio desplegado (`https://tu-proyecto.sanity.studio`).
2. Crea un documento **"Estudio de parashá"**.
3. En el campo **slug**, escribe exactamente el identificador del sitio
   (ej. `bereshit`, `lej-leja`, `jukat`, `pinjas` — los ves todos en
   `data/parashot.ts`, campo `slug`). Si no coincide exactamente, el
   contenido no aparecerá en la página correspondiente.
4. Completa el desarrollo, comentaristas, preguntas y enseñanza práctica.
5. Publica (botón **Publish**). El sitio lo mostrará en menos de una hora
   (se revalida automáticamente), o de inmediato si vuelves a desplegar.

Mientras no escribas el documento de una parashá en Sanity, esa página
sigue mostrando el resumen corto de `data/parashot.ts` — el sitio nunca
se rompe por contenido faltante.

## Formulario de contacto

Ya está conectado a Formspree (`components/FormularioContacto.tsx`). Si en
algún momento quieres cambiar de cuenta, edita la constante
`ENDPOINT_FORMULARIO` ahí mismo con tu nuevo endpoint.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Despliegue

Ver instrucciones completas de despliegue y conexión del dominio `torahia.site`
en la respuesta del chat donde se generó este proyecto, o en `DEPLOY.md`.
