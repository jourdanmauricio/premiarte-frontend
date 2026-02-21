# Premiarte — Frontend

Frontend de **Premiarte**, aplicación web construida con Next.js. Incluye catálogo de productos, categorías, solicitud de presupuestos, contacto y autenticación.

## Stack tecnológico

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **React:** 19
- **Estilos:** [Tailwind CSS 4](https://tailwindcss.com)
- **UI:** [Radix UI](https://www.radix-ui.com), [shadcn/ui](https://ui.shadcn.com), [Lucide](https://lucide.dev)
- **Estado:** [Zustand](https://zustand-demo.pmnd.rs)
- **Autenticación:** [NextAuth.js](https://next-auth.js.org) (p. ej. Google)
- **Validación:** [Zod](https://zod.dev)
- **Carousel:** Embla Carousel

## Requisitos

- Node.js 20+
- npm, yarn, pnpm o bun

## Instalación

```bash
# Clonar el repositorio (si aplica)
git clone <url-del-repositorio>
cd premiarte-front

# Instalar dependencias
npm install
```

## Variables de entorno

Crea un archivo `.env.local` en la raíz con:

| Variable | Descripción |
|----------|-------------|
| `PORT` | Puerto del servidor de desarrollo (por defecto 5000 en scripts) |
| `API_URL` | URL base del API backend (ej: `http://localhost:8000/api`) |
| `NEXTAUTH_URL` | URL pública de la app (ej: `http://localhost:5000`) |
| `NEXTAUTH_SECRET` | Secreto para firmar sesiones de NextAuth |
| `GOOGLE_CLIENT_ID` | Client ID de Google OAuth |
| `GOOGLE_CLIENT_SECRET` | Client secret de Google OAuth |
| `SECRET_REVALIDATE` | Secreto para la ruta de revalidación (`/api/revalidate`) |

Puedes usar `.env.example` como plantilla (sin valores sensibles).

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo en el puerto 5000 |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción en el puerto 5000 |
| `npm run lint` | Ejecutar ESLint |

## Estructura del proyecto

```
premiarte-front/
├── app/                    # App Router (Next.js)
│   ├── api/                # Rutas API (auth, revalidate)
│   ├── categorias/         # Página de categorías
│   ├── contacto/           # Página de contacto
│   ├── presupuesto/        # Solicitud de presupuesto
│   ├── productos/          # Listado y detalle de productos
│   ├── shared/             # Constantes y tipos compartidos
│   ├── layout.tsx
│   └── page.tsx            # Inicio
├── actions/                # Server Actions
│   └── budgetActions.ts    # Envío de formulario de presupuesto
├── components/             # Componentes React
│   ├── cartPage/           # Carrito
│   ├── categoriesPage/     # Cágina de categorías
│   ├── contactPage/        # Contacto
│   ├── homePage/           # Secciones de la home
│   ├── productPage/        # Detalle de producto
│   ├── productsPage/       # Listado de productos
│   ├── providers/          # SessionProvider, etc.
│   ├── shared/             # NavBar, Footer, botones, etc.
│   └── ui/                 # Componentes base (shadcn)
└── validations/            # Esquemas Zod
    └── budget.ts
```

## Funcionalidad principal

- **Inicio:** hero, categorías destacadas, productos destacados, testimonios, servicios, newsletter.
- **Productos:** listado con filtros/paginación y detalle por slug.
- **Categorías:** listado de categorías.
- **Presupuesto:** formulario que envía datos al API (`POST /budget`) con validación Zod.
- **Contacto:** página de contacto.
- **Carrito:** estado con Zustand; contador en la barra de navegación.
- **Autenticación:** NextAuth (p. ej. Google); sección de auth en la barra de navegación.

## Desarrollo

1. Configura `.env.local` con la URL del API y las variables de NextAuth.
2. Asegúrate de que el backend esté disponible en `API_URL`.
3. Ejecuta `npm run dev` y abre [http://localhost:5000](http://localhost:5000).

## Despliegue

- Build: `npm run build`
- Arranque en producción: `npm run start` (puerto 6000).

Para desplegar en [Vercel](https://vercel.com), configura las mismas variables de entorno en el panel del proyecto.

### Docker (Coolify)

El proyecto incluye un `Dockerfile` preparado para desplegar en [Coolify](https://coolify.io) (puerto **6000**).

```bash
docker build -t premiarte-front .
docker run -p 6000:6000 --env-file .env.local premiarte-front
```

**Variables de entorno en producción (Coolify):** no uses `http://localhost:6001` ni `http://localhost:6000`. En el servidor cada servicio corre en su propio contenedor; `localhost` dentro del contenedor se refiere a ese contenedor, no al backend ni al host. Configura URLs accesibles:

| Variable     | En producción (Coolify) |
|-------------|--------------------------|
| `API_URL`   | URL pública del backend, p. ej. `https://api.tudominio.com/api` |
| `NEXTAUTH_URL` | URL pública de este frontend, p. ej. `https://www.tudominio.com` |

Si Coolify crea una red interna entre tus 3 servicios, puedes usar el hostname interno del backend (p. ej. `http://premiarte-backend:6001/api`) solo para peticiones **server-side** desde este frontend; para el navegador y para callbacks OAuth sigue siendo necesario usar dominios públicos HTTPS.
