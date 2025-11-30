# 🏥 Ortomediq - Sistema de Ventas (Frontend)

Sistema de ventas para la empresa Ortomediq, dedicada a la venta y distribución de aparatos ortopédicos en Torreón, Coahuila.

## 📋 Descripción del Proyecto

Sistema web moderno que digitaliza y automatiza los procesos de venta, control de inventario y gestión de clientes. Desarrollado con React + Vite y diseñado con Tailwind CSS.

## 🚀 Tecnologías Instaladas

### Core
- **React 18.3.1** - Librería de interfaces de usuario
- **Vite 6.0.3** - Build tool y servidor de desarrollo
- **React Router DOM 7.9.4** - Navegación y rutas

### Estilos
- **Tailwind CSS 4.1.15** - Framework CSS utility-first
- **PostCSS 8.5.6** - Procesador CSS
- **Autoprefixer 10.4.21** - Prefijos CSS automáticos

### Peticiones HTTP
- **Axios 1.12.2** - Cliente HTTP para comunicación con backend

### Formularios y Validación
- **React Hook Form 7.65.0** - Manejo de formularios
- **Yup 1.7.1** - Validación de esquemas
- **@hookform/resolvers 5.2.2** - Integración de validadores

### UI y UX
- **React Icons 5.5.0** - Librería de iconos
- **React Toastify 11.0.5** - Notificaciones y alertas

### Utilidades
- **date-fns 4.1.0** - Manipulación de fechas
- **@tanstack/react-table 8.21.3** - Tablas de datos avanzadas

## 📁 Estructura del Proyecto

```
ortomediq-frontend/
│
├── public/                   # Archivos estáticos
│
├── src/
│   ├── api/                  # Servicios de comunicación con backend
│   ├── assets/               # Recursos (imágenes, estilos)
│   │   ├── images/
│   │   └── styles.css
│   ├── components/           # Componentes reutilizables
│   ├── pages/                # Vistas principales
│   ├── context/              # Estado global (Context API)
│   ├── hooks/                # Custom hooks
│   ├── router/               # Configuración de rutas
│   ├── App.jsx               # Componente principal
│   ├── main.jsx              # Punto de entrada
│   └── index.css             # Estilos globales + Tailwind
│
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🛠️ Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 📝 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# URL del backend API
VITE_API_URL=http://localhost:3000/api

# Nombre de la aplicación
VITE_APP_NAME=Ortomediq
```

## 🎯 Próximos Pasos

1. Configurar componentes base (Navbar, Sidebar, Footer)
2. Implementar sistema de autenticación
3. Crear vistas principales (Login, Dashboard, Productos, etc.)
4. Configurar servicios API
5. Implementar Context API para estado global
6. Desarrollar funcionalidades de ventas e inventario

## 👥 Desarrollo

Proyecto desarrollado para Ortomediq, Torreón, Coahuila.

---

**Nota**: Este es el frontend del sistema. El backend se desarrolla por separado con Node.js, Express y MySQL.

