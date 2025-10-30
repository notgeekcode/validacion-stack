# Portal de Turismo Lavalleja

Portal web institucional para explorar alojamientos, gastronomía, actividades y eventos en Lavalleja, Uruguay.

## 🚀 Stack Tecnológico

- **Frontend**: React 18 + Vite + TypeScript
- **UI**: Tailwind CSS + shadcn/ui
- **Routing**: react-router-dom v6
- **Estado**: TanStack Query (React Query)
- **Formularios**: React Hook Form + Zod
- **SEO**: react-helmet-async
- **Mapas**: Leaflet / React Leaflet
- **Animaciones**: Framer Motion (opcional)
- **Accesibilidad**: WCAG 2.1 AA

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <YOUR_GIT_URL>

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

## 🔧 Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```bash
# URL base de la API externa (si aplica)
VITE_API_URL=https://api.turismolavalleja.com/api

# Modo de datos: "true" usa mocks locales, "false" llama a API externa
USE_MOCKS=true

# Token para mapas (Mapbox, MapLibre, etc.)
VITE_MAP_TOKEN=your_map_token_here
```

### Modo Mocks vs API Real

El proyecto soporta dos modos de operación:

- **`USE_MOCKS=true`** (por defecto): Usa datos de prueba locales (src/lib/mockData.ts)
- **`USE_MOCKS=false`**: Realiza llamadas HTTP a la API externa configurada en `VITE_API_URL`

El cambio entre modos se maneja automáticamente en `src/lib/dataProvider.ts`.

## 📂 Estructura del Proyecto

```
src/
├── app/              # Configuración de providers, router, theming
├── components/       # Componentes UI reutilizables
│   ├── ui/          # shadcn/ui components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── features/         # Módulos por funcionalidad
│   ├── places/      # Lugares (listado, detalle, CRUD)
│   ├── events/      # Eventos
│   ├── auth/        # Autenticación
│   ├── moderation/  # Panel de curador
│   └── demo/        # Recorrido guiado
├── hooks/            # Custom hooks
│   ├── usePlaces.ts
│   ├── useEvents.ts
│   ├── useAuth.ts
│   ├── useModeration.ts
│   └── useAnalytics.ts
├── lib/              # Utilidades y servicios
│   ├── api-client.ts     # Cliente HTTP centralizado
│   ├── dataProvider.ts   # Proveedor de datos (mocks/API)
│   ├── types.ts          # Tipos TypeScript globales
│   ├── mockData.ts       # Datos de prueba
│   └── utils.ts
├── pages/            # Páginas/rutas principales
├── mocks/            # JSON estáticos para USE_MOCKS
└── styles/           # CSS y tokens de diseño
```

## 🗺️ Rutas Principales

| Ruta | Descripción |
|------|-------------|
| `/` | Home: hero + buscador + accesos |
| `/explorar` | Listado con filtros (zona/rubro/tipo/precio) + mapa |
| `/eventos` | Calendario de eventos + listado |
| `/eventos/:id` | Detalle de evento |
| `/lugares/:id` | Detalle de lugar |
| `/ingresar` | Login |
| `/registrarse` | Registro de usuario |
| `/panel/comerciante` | Panel CRUD de comerciante |
| `/panel/comerciante/eventos` | Gestión de eventos del comerciante |
| `/panel/curador` | Panel de moderación |
| `/dashboard` | Dashboard de KPIs (demo) |
| `/demo` | Recorrido guiado del sistema |

## 🎨 Sistema de Diseño

El proyecto usa un sistema de tokens semánticos definido en:
- `src/index.css`: Variables CSS (colores HSL, gradientes, sombras, transiciones)
- `tailwind.config.ts`: Extensión de Tailwind con tokens personalizados

**Modo oscuro**: Soportado vía clase `.dark` (next-themes)

## 📊 Tipos TypeScript

Principales interfaces definidas en `src/lib/types.ts`:

- `User` - Usuario del sistema
- `Place` - Lugar turístico (alojamiento, gastronomía, actividades)
- `Event` - Evento (cultural, deportivo, gastronómico, familiar)
- `Role` - Roles de usuario (tourist, merchant, curator, analyst)
- `SubmissionStatus` - Estados de aprobación (pending, approved, rejected)
- `FilterOptions` - Opciones de filtrado
- `KpiResponse` - Respuesta de métricas para dashboard

## 🧪 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## ♿ Accesibilidad

El proyecto implementa las siguientes prácticas de accesibilidad (WCAG 2.1 AA):

- Contraste de colores adecuado
- Navegación por teclado
- Etiquetas ARIA apropiadas
- Textos alternativos en imágenes
- Estructura semántica HTML5
- Formularios accesibles

## 📱 Responsive Design

Mobile-first approach con breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1400px

## 🔍 SEO

- Meta tags dinámicos por ruta (react-helmet-async)
- Open Graph y Twitter Card
- `sitemap.xml` y `robots.txt` en `/public`
- URLs semánticas
- Carga optimizada de imágenes

## 🚀 Deployment

El proyecto puede desplegarse en:
- Vercel
- Netlify
- Firebase Hosting
- GitHub Pages
- Cualquier servicio que soporte aplicaciones React

### Build

```bash
npm run build
```

Los archivos estáticos se generan en `/dist`.

## 📄 Licencia

Este es un proyecto institucional para el departamento de Lavalleja, Uruguay.

## 🤝 Contribución

Para contribuir al proyecto, por favor seguir la estructura por features y mantener la consistencia con el sistema de diseño establecido.

## 📞 Contacto

Para consultas sobre el proyecto, contactar a la Intendencia de Lavalleja.
