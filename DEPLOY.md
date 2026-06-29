# Guía de despliegue — torahia.site

Tu dominio `torahia.site` está registrado y gestionado en **Namecheap**
(Domain List → Advanced DNS). Los dos registros CNAME `_acme-challenge` que
ves ahí son de un certificado SSL que Cloudflare emitió en algún momento para
el hosting anterior — no significan que tu DNS viva en Cloudflare. Tu DNS
vive en Namecheap, y ahí es donde haremos los cambios.

## Vercel o Netlify: ¿cuál elegir?

**Recomendado: Vercel.** Next.js es el framework de Vercel (lo crean y
mantienen ellos), así que el soporte es más directo: despliegues más
rápidos, mejor manejo de las rutas dinámicas que usa este sitio
(`/parasha/[slug]`, la API route de videos), y el plan gratuito (Hobby) es
suficiente para un sitio de este tamaño y tráfico.

Netlify también soporta Next.js perfectamente bien (vía su plugin oficial)
y es una alternativa igualmente válida — si ya tienes cuenta o prefieres su
interfaz, no hay ningún problema en usarlo. La diferencia práctica para este
proyecto es mínima. Esta guía detalla Vercel primero por ser la opción que
recomiendo; la sección de Netlify está abajo si la prefieres.

---

## Opción A: Vercel (recomendada)

### 1. Sube el código a GitHub
Descomprime el archivo `torahia-site.tar.gz`, luego:
```bash
cd torahia-site
git init
git add .
git commit -m "Sitio inicial de Torah Diaria"
```
Crea un repositorio en [github.com/new](https://github.com/new) (públic o privado,
ambos funcionan) y sigue las instrucciones que GitHub te da para subir el código
ya creado (`git remote add origin ...` y `git push`).

### 2. Conecta el repo a Vercel
1. Entra a [vercel.com](https://vercel.com) e inicia sesión (puedes usar tu cuenta de GitHub).
2. **Add New → Project** → importa el repositorio `torahia-site`.
3. Vercel detecta Next.js automáticamente. No necesitas cambiar nada. Click **Deploy**.
4. En un par de minutos tendrás una URL temporal tipo `torahia-site.vercel.app` funcionando.

### 3. Conecta el dominio `torahia.site`
1. Dentro del proyecto en Vercel: **Settings → Domains**.
2. Escribe `torahia.site` → **Add**. Repite con `www.torahia.site`.
3. Vercel te mostrará exactamente qué registros DNS crear. Normalmente son:

   | Tipo  | Host | Valor                  |
   |-------|------|-------------------------|
   | A     | @    | `76.76.21.21`           |
   | CNAME | www  | `cname.vercel-dns.com`  |

   **Usa los valores que Vercel te muestre en pantalla**, no los de esta tabla
   a ciegas — Vercel a veces da una IP distinta según tu cuenta.

### 4. Configura los registros en Namecheap

Ve a **Domain List → torahia.site → Manage → Advanced DNS** (la pantalla
que ya tienes abierta en tu captura).

1. **Borra** el registro `A Record` con Host `@` y Valor `66.71.220.1` (clic en el ícono de basura).
2. **Borra** el registro `A Record` con Host `www` y Valor `66.71.220.1`.
3. Click **ADD NEW RECORD** → tipo `A Record`, Host `@`, Value: la IP que te dio Vercel (ej. `76.76.21.21`), TTL: Automatic.
4. Click **ADD NEW RECORD** → tipo `CNAME Record`, Host `www`, Value: `cname.vercel-dns.com` (sin `https://`, sin barra final), TTL: Automatic.
5. **Conserva** los dos registros `CNAME Record` de `_acme-challenge` tal como están — no los toques, no interfieren con Vercel.
6. Guarda los cambios (el ✔ verde junto a cada fila, o el botón de guardar que aparece).

La propagación del DNS puede tardar desde minutos hasta unas horas (Namecheap
suele ser rápido, normalmente menos de 30 min). Cuando esté lista, Vercel
emitirá automáticamente el certificado SSL (HTTPS) sin que tengas que hacer nada más.

### 5. Verifica
Vuelve a **Vercel → Settings → Domains**: cuando ambos dominios muestren un
check verde, el sitio está en vivo en `https://torahia.site`.

---

## Opción B: Netlify

### 1. Sube a GitHub (igual que arriba)

### 2. Conecta a Netlify
1. [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**.
2. Conecta tu repo de GitHub. Netlify detecta Next.js automáticamente
   (usa su plugin oficial `@netlify/plugin-nextjs`).
3. Deja el build command por defecto (`next build`) y despliega.

### 3. Conecta el dominio
1. **Site settings → Domain management → Add a domain** → escribe `torahia.site`.
2. Netlify te dará registros parecidos a:

   | Tipo  | Host | Valor                      |
   |-------|------|-----------------------------|
   | A     | @    | `75.2.60.5`                 |
   | CNAME | www  | `tu-sitio.netlify.app`       |

3. En Namecheap (Advanced DNS): mismos pasos que en la Opción A —
   borra los dos A Records viejos (`66.71.220.1`), crea el A Record nuevo con
   la IP que te dé Netlify, y el CNAME de `www` apuntando a tu subdominio de Netlify.
   Conserva los `_acme-challenge`.

---

## Resumen de lo que cambia y lo que NO

| Registro actual | Acción |
|---|---|
| `A` · `@` · `66.71.220.1` | **Borrar**, reemplazar por la IP de Vercel/Netlify |
| `A` · `www` · `66.71.220.1` | **Borrar** (o convertir a CNAME apuntando al hosting nuevo) |
| `CNAME` · `_acme-challenge` (torahia.site) | **No tocar** |
| `CNAME` · `_acme-challenge` (www.torahia.site) | **No tocar** |

---

## Variables de entorno
No se requieren para que el sitio funcione (el feed de YouTube usa RSS
público con el `canalId` que ya configuramos, sin necesidad de API key).

## Próximos pasos opcionales
- **CMS** para editar el contenido largo de cada parashá sin tocar código (Sanity, Notion-as-CMS).
- **Newsletter real** para el botón "Suscribirme" (Mailchimp, Buttondown, ConvertKit).
- **Analítica**: Vercel Analytics (un click, plan gratuito) o Plausible/Google Analytics.
- **API de YouTube Data v3** si más adelante quieres mostrar duración o vistas de cada video.
