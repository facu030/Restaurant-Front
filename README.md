# 🍕 Cosa Nostra — Frontend

![Vercel Deploy](https://therealsujitk-vercel-badge.vercel.app/?app=restaurant-front-topaz-iota&style=flat-square)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwind%20css-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

> Interfaz de usuario del sistema de gestión gastronómica **Cosa Nostra**. Construida con React + Vite, permite a los clientes realizar reservas y a los administradores gestionar la ocupación del restaurante en tiempo real.

🔗 **Demo en vivo:** [restaurant-front-topaz-iota.vercel.app](https://restaurant-front-topaz-iota.vercel.app)  
🔗 **Repositorio Backend:** [https://github.com/nachonazar/backend-Restaurante/tree/main](https://github.com/nachonazar/backend-Restaurante/tree/main)

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Flujo del Proceso de Reserva](#-flujo-del-proceso-de-reserva)
- [Decisiones de Diseño](#-decisiones-de-diseño)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Variables de Entorno](#-variables-de-entorno)
- [Endpoints Principales de la API](#-endpoints-principales-de-la-api)
- [Scripts Disponibles](#-scripts-disponibles)
- [Roles y Permisos](#-roles-y-permisos)
- [Desafíos Técnicos Superados](#-desafíos-técnicos-superados)
- [Deploy en Vercel](#-deploy-en-vercel)
- [Contribución](#-contribución)
- [Equipo](#-equipo)

---

## ✨ Características

- 🔐 **Autenticación con JWT** — Login y registro de usuarios con tokens seguros
- 📅 **Gestión de Reservas** — Creación, edición y cancelación de reservas
- 📊 **Panel de Administración** — Dashboard con métricas de ocupación, estadísticas por hora y tendencias
- 👥 **Gestión de Usuarios** — Control de roles (cliente / administrador)
- 📱 **Diseño Responsive** — Adaptado para mobile y desktop
- 🛡️ **Rutas Protegidas** — Acceso restringido según rol del usuario

---

| Dashboard Administrador |
|---|
| ![image](https://github.com/user-attachments/assets/4c7c74df-669c-4d2d-997f-79acd72458e6) |
| ![image](https://github.com/user-attachments/assets/2b696909-69d3-4e67-93a3-6288e3ea2a59) |
| ![image](https://github.com/user-attachments/assets/61ad2d74-f50a-41ff-91ef-beeb4edeba73) |

| Proceso de Reserva |
|---|
| ![image](https://github.com/user-attachments/assets/be990435-6bdb-44bc-b92b-c02b5ca903e4) |
| ![image](https://github.com/user-attachments/assets/69558263-0347-469a-988e-53ee780fda21) |

---

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|---|---|
| [React.js](https://react.dev/) + [Vite](https://vitejs.dev/) | Framework y bundler |
| [Tailwind CSS](https://tailwindcss.com/) | Estilos y diseño responsive |
| [Context API](https://react.dev/reference/react/useContext) | Gestión de estado global |
| [React Router DOM](https://reactrouter.com/) | Navegación y rutas protegidas |
| [Vercel](https://vercel.com/) | Hosting y CI/CD |

---

## 🏗️ Arquitectura del Sistema

```mermaid
graph LR
  subgraph "Cliente"
    B["🌐 Browser"]
    subgraph "React App (Vercel)"
      R["React + Vite"]
      CTX["Context API\n(Auth / Reservas)"]
      RR["React Router\n(Rutas protegidas)"]
    end
  end

  subgraph "Servidor (Vercel Serverless)"
    API["Express.js API"]
    MW["Middleware\n• JWT Auth\n• CORS manual\n• Validación"]
    subgraph "Rutas"
      AU["/api/auth"]
      RE["/api/reservations"]
      US["/api/users"]
    end
  end

  subgraph "Base de Datos"
    MG[("MongoDB Atlas")]
  end

  B --> R
  R --> CTX
  R --> RR
  RR -->|"HTTP / JWT"| API
  API --> MW
  MW --> AU & RE & US
  AU & RE & US -->|"Mongoose"| MG
```

---

## 🔄 Flujo del Proceso de Reserva

```mermaid
flowchart TD
    A(["👤 Usuario ingresa al sistema"]) --> B{"¿Está autenticado?"}
    B -->|"No"| C["🔐 Login / Registro"]
    C --> D["JWT almacenado en cliente"]
    D --> E
    B -->|"Sí"| E["📋 Ver disponibilidad y seleccionar fecha"]
    E --> F["🕐 Elegir horario y cantidad de personas"]
    F --> G["✍️ Completar datos de la reserva"]
    G --> H["📤 POST /api/reservations"]
    H --> I{"¿Hay mesa disponible?"}
    I -->|"No"| J["⚠️ Error: sin disponibilidad\nSugerir otro horario"]
    J --> F
    I -->|"Sí"| K["✅ Reserva creada — Estado: PENDIENTE"]
    K --> L["📧 Notificación al cliente"]
    K --> M["🔔 Notificación al Admin"]
    M --> N{"👨‍💼 Admin revisa la reserva"}
    N -->|"Confirmar"| O["✅ Estado: CONFIRMADA"]
    N -->|"Rechazar"| P["❌ Estado: CANCELADA"]
    O --> Q["🍽️ Cliente asiste al restaurante"]
    P --> R(["🔁 Cliente puede realizar nueva reserva"])
    Q --> S(["⭐ Fin del proceso"])
```

---

## 🧩 Decisiones de Diseño

| Decisión | Alternativa considerada | Por qué elegimos esta opción |
|---|---|---|
| **Context API** | Redux / Zustand | El estado global es acotado (usuario autenticado + reservas). Context evita dependencias externas y es suficiente para la escala del proyecto. |
| **Vite** | Create React App | Tiempos de arranque ~10x más rápidos, HMR nativo y configuración mínima para proyectos modernos. CRA está deprecado. |
| **Arquitectura modular (feature-based)** | Estructura por tipo (components/, pages/) | Escala mejor: cada módulo es autónomo con sus propios componentes, páginas y servicios. Facilita el trabajo en equipo. |
| **Vercel (Serverless)** | VPS / Railway | Deploy automático desde Git, integración nativa con el frontend y tier gratuito suficiente para el proyecto. |
| **JWT en localStorage** | Cookies httpOnly | Simplifica la integración inicial. *Roadmap: migrar a cookies httpOnly para mayor seguridad.* |

---

## 📁 Estructura del Proyecto

```
src/
├── assets/              # Imágenes, iconos y recursos estáticos
├── modules/             # Arquitectura modular (Feature-based)
│   ├── admin/           # Panel de control y gestión administrativa
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── auth/            # Autenticación (Login, Registro, recuperación)
│   ├── public/          # Vistas de acceso libre (Landing page, Menú)
│   │   ├── components/
│   │   └── pages/
│   ├── reservations/    # Lógica y vistas de reservas para clientes
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── shared/          # Elementos reutilizables en toda la app
│   │   ├── api/         # Configuración de Axios/Fetch
│   │   ├── components/  # Componentes UI genéricos (Botones, Modales)
│   │   └── layouts/     # Plantillas de estructura (Navbar, Footer)
│   └── users/           # Gestión de perfiles de usuario
│       ├── components/
│       ├── hook/        # Custom hooks específicos de usuario
│       ├── pages/
│       └── services/
├── App.jsx              # Componente raíz y enrutador principal
├── elements.css         # Estilos base de elementos HTML
├── index.css            # Estilos globales y directivas de Tailwind
└── main.jsx             # Punto de entrada de la aplicación React
```

---

## ⚙️ Instalación y Configuración

### Prerrequisitos

- Node.js v18 o superior
- npm o yarn
- Backend corriendo (local o en Vercel)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/nachonazar/restaurant-front.git
cd restaurant-front

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# 4. Iniciar el servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`

---

## 🔑 Variables de Entorno

### Frontend

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_BACKEND_URL=https://backend-restaurante-sigma.vercel.app
```

> ⚠️ Para desarrollo local, reemplazá el valor por `http://localhost:3001`

### Backend

> Ver configuración completa en el [README del backend](https://github.com/nachonazar/backend-Restaurante/tree/main).

| Variable | Descripción | Ejemplo |
|---|---|---|
| `MONGODB_URI` | URI de conexión a MongoDB Atlas | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT | `change_me_in_local_env` |
| `SLOT_CAPACITY` | Capacidad máxima de comensales por horario | `20` |
| `PORT` | Puerto del servidor (local) | `3001` |

---

## 📡 Endpoints Principales de la API

Base URL: `https://backend-restaurante-sigma.vercel.app`

### 🔐 Auth

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Registrar nuevo usuario | ❌ |
| `POST` | `/api/auth/login` | Login → devuelve JWT | ❌ |

### 📅 Reservas

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| `GET` | `/api/reservations` | Listar todas las reservas | 🔒 Admin |
| `GET` | `/api/reservations/my` | Reservas del usuario autenticado | 🔒 Cliente |
| `POST` | `/api/reservations` | Crear nueva reserva | 🔒 Cliente |
| `PUT` | `/api/reservations/:id` | Editar una reserva | 🔒 Cliente/Admin |
| `DELETE` | `/api/reservations/:id` | Cancelar una reserva | 🔒 Cliente/Admin |

### 👥 Usuarios

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| `GET` | `/api/users` | Listar usuarios | 🔒 Admin |
| `PUT` | `/api/users/:id` | Actualizar perfil | 🔒 Admin |
| `DELETE` | `/api/users/:id` | Eliminar usuario | 🔒 Admin |

> 🔒 Requiere header `Authorization: Bearer <token>`

---

## 📜 Scripts Disponibles

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run preview    # Vista previa del build
npm run lint       # Linter (ESLint)
```

---

## 👥 Roles y Permisos

| Rol | Permisos |
|---|---|
| **Cliente** | Ver menú, crear y gestionar sus reservas |
| **Administrador** | Todo lo anterior + panel de administración, gestión de usuarios, ciclo de vida de reserva y estadísticas |

---

## 🧠 Desafíos Técnicos Superados

Durante el desarrollo y despliegue del proyecto, se enfrentaron retos críticos que requirieron soluciones avanzadas de arquitectura:

### 1. Configuración de CORS en Entornos Serverless
**Problema:** Al desplegar en Vercel, la librería estándar `cors` de Express no gestionaba correctamente las peticiones preflight (`OPTIONS`) en funciones serverless, lo que bloqueaba la comunicación con el Frontend.  
**Solución:** Se implementó un middleware de CORS manual que intercepta las peticiones y responde inmediatamente con las cabeceras `Access-Control-Allow-*` necesarias, garantizando la interoperabilidad entre dominios sin latencia.

### 2. Ciclo de Vida y Conectividad en Vercel Functions
**Problema:** El backend presentaba errores de conexión intermitentes con MongoDB Atlas debido a que el punto de entrada (`index.js`) no se ejecutaba de forma persistente en el entorno de Vercel.  
**Solución:** Se reestructuró el punto de entrada a `app.js` y se configuró un archivo `vercel.json` para mapear las rutas. Además, se optimizó la lógica de conexión a la base de datos para que se ejecute en cada invocación de la función serverless, asegurando disponibilidad total.

### 3. Seguridad de Red y Firewall
**Problema:** La base de datos rechazaba peticiones desde la nube debido a que Vercel utiliza IPs dinámicas que no podían ser pre-autorizadas.  
**Solución:** Se configuró una política de acceso de red en MongoDB Atlas (`0.0.0.0/0`) y se reforzó la seguridad mediante variables de entorno encriptadas y validación estricta de Schemas en el servidor.

---

## 🚀 Deploy en Vercel

El proyecto está configurado para deploy automático en Vercel desde la rama `master`.

### Variables de entorno en Vercel

En **Settings → Environment Variables** del proyecto frontend:

| Key | Value |
|---|---|
| `VITE_BACKEND_URL` | `https://backend-restaurante-sigma.vercel.app` |

### CI/CD

Cada push a `master` genera un deploy automático en producción.

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Seguí estos pasos para colaborar con el proyecto.

### 1. Fork & Clone

```bash
# Forkear el repositorio desde GitHub, luego:
git clone https://github.com/TU_USUARIO/restaurant-front.git
cd restaurant-front
```

### 2. Crear una rama

Usamos la siguiente convención para nombrar ramas:

| Tipo | Prefijo | Ejemplo |
|---|---|---|
| Nueva funcionalidad | `feature/` | `feature/email-notifications` |
| Corrección de bug | `fix/` | `fix/login-redirect` |
| Mejora de estilos/UI | `ui/` | `ui/dashboard-responsive` |
| Documentación | `docs/` | `docs/api-endpoints` |

```bash
git checkout -b feature/nombre-de-tu-feature
```

### 3. Convención de commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<scope>): <descripción corta>

feat(reservations): agregar validación de horario mínimo
fix(auth): corregir redirección post-login en mobile
ui(dashboard): mejorar responsividad del panel admin
docs(readme): agregar sección de endpoints
```

| Tipo | Cuándo usarlo |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `ui` | Cambios visuales sin lógica |
| `refactor` | Refactor sin cambio de comportamiento |
| `docs` | Solo documentación |
| `chore` | Configs, dependencias, CI |

### 4. Push y Pull Request

```bash
git push origin feature/nombre-de-tu-feature
```

Luego abrí un PR hacia `master` con:
- ✅ Descripción clara de qué cambia y por qué
- ✅ Capturas o GIF si hay cambios visuales
- ✅ Referencia al issue relacionado (si existe): `Closes #12`

### 5. Code Review

- Todo PR requiere al menos **1 aprobación** antes de hacer merge
- Los comentarios del review deben resolverse antes del merge
- No hacer merge del propio PR

> 💡 ¿Encontraste un bug o tenés una idea? Abrí un [Issue](https://github.com/nachonazar/restaurant-front/issues) antes de empezar a codear.

---

## 👨‍💻 Equipo

| Integrante | Rol | GitHub |
|---|---|---|
| **Facundo Martínez** | Frontend Developer | [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github)](https://github.com/facu030) [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/facundo-martinez-372604286/) |
| **Ignacio Nazar** | Backend Developer | [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github)](https://github.com/nachonazar) |

---

## 🔗 Recursos Relacionados

- [Repositorio Backend](https://github.com/nachonazar/backend-Restaurante/tree/main)
- [API Docs](#) *(próximamente)*
- [Figma / Diseño](https://www.figma.com/make/YM9B2iNWt0s8j3ljDn9b4m/Restaurante-Reserva-Mockup?t=uMsrN49fAqaITmO6-1)

---

## 📈 Próximas Mejoras (Roadmap)

- [ ] 📧 Notificaciones automáticas por Email (Nodemailer) al confirmar reserva
- [ ] 📱 Implementación de PWA para instalación en dispositivos móviles
- [ ] 🌍 Soporte multi-idioma (i18next)
- [ ] 🧑‍🍳 CRUD de mozos
- [ ] 🪑 CRUD de mesas
- [ ] 💳 Pasarela de pagos
- [ ] 🔒 Migrar JWT a cookies httpOnly para mayor seguridad
