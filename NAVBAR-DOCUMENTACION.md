# 🧭 Navbar - Documentación

## ✅ **Navbar Creado e Integrado**

El Navbar ya está funcionando y agregado al Home.

---

## 🎨 **Estructura del Navbar**

### **Vista Desktop (≥1024px)**

```
┌────────────────────────────────────────────────────────────────┐
│  [ORTOMEDIQ]    [🔍 Buscar productos... | Buscar]   Productos  │
│                                              Contacto  [👤 Perfil] │
└────────────────────────────────────────────────────────────────┘
```

### **Vista Mobile (<1024px)**

```
┌─────────────────────────────────┐
│  [ORTOMEDIQ]              [☰]  │
├─────────────────────────────────┤
│  [🔍 Buscar productos...]       │
└─────────────────────────────────┘

Menú desplegable cuando se hace clic en ☰:
┌─────────────────────────────────┐
│  Productos                      │
│  Contacto                       │
│  [👤 Perfil]                    │
└─────────────────────────────────┘
```

---

## 📦 **Componentes del Navbar**

### **1. Logo (Izquierda)**
```jsx
- Texto: "Ortomediq"
- Color: Azul (text-blue-600)
- Tamaño: 2xl en mobile, 3xl en desktop
- Enlace a: "/" (home)
```

### **2. Buscador (Centro - Desktop)**
```jsx
- Input de búsqueda
- Icono de lupa (FaSearch)
- Placeholder: "Buscar productos..."
- Botón "Buscar"
- Estado: searchQuery (useState)
```

### **3. Menú (Derecha - Desktop)**
```jsx
Links:
- Productos (#productos)
- Contacto (#contacto)
- Perfil (#perfil) - Botón destacado con icono
```

### **4. Buscador Mobile**
```jsx
- Visible solo en mobile
- Debajo del logo
- Mismo input que desktop
```

### **5. Menú Hamburguesa (Mobile)**
```jsx
- Icono: FaBars (cerrado) / FaTimes (abierto)
- Toggle: menuOpen (useState)
- Despliega menú vertical
```

---

## 🔧 **Funcionalidades Implementadas**

### **✅ Búsqueda**
```jsx
const [searchQuery, setSearchQuery] = useState('')

const handleSearch = (e) => {
  e.preventDefault()
  console.log('Buscando:', searchQuery)
  // Aquí se integrará la lógica de búsqueda real
}
```

**Preparado para:**
- Búsqueda de productos
- Filtrado en tiempo real
- Redirección a página de resultados

### **✅ Menú Mobile Responsive**
```jsx
const [menuOpen, setMenuOpen] = useState(false)

const toggleMenu = () => {
  setMenuOpen(!menuOpen)
}
```

**Características:**
- Se cierra automáticamente al hacer clic en un link
- Animación suave de apertura/cierre
- Overlay cuando está abierto

### **✅ Navegación Sticky**
```jsx
className="sticky top-0 z-50"
```

**Comportamiento:**
- Se mantiene fijo en la parte superior
- Al hacer scroll, siempre visible
- z-index alto para estar sobre otros elementos

---

## 🎨 **Estilos y Diseño**

### **Colores:**
```
Fondo:        bg-white
Sombra:       shadow-lg
Logo:         text-blue-600
Links:        text-gray-700 → hover:text-blue-600
Perfil:       bg-blue-600 → hover:bg-blue-700
Input:        bg-gray-100 → focus:bg-white
```

### **Altura:**
```
Navbar:       h-20 (80px)
```

### **Responsive Breakpoints:**
```
lg: (≥1024px) → Menú horizontal
<lg:          → Menú hamburguesa
```

### **Transiciones:**
```jsx
transition duration-300
```
- Hover effects suaves
- Cambios de color fluidos
- Focus states animados

---

## 🔗 **Integración con el Home**

El Navbar está integrado en `src/pages/Home.jsx`:

```jsx
import Navbar from '../components/Navbar'

function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      {/* ... resto de secciones */}
    </div>
  )
}
```

---

## 🎯 **Próximas Mejoras**

### **Fase 1: Logo Real**
- [ ] Reemplazar texto "Ortomediq" con imagen del logo
- [ ] Versión responsive del logo

### **Fase 2: Búsqueda Funcional**
```jsx
// Integrar con API de productos
const handleSearch = async (e) => {
  e.preventDefault()
  const resultados = await buscarProductos(searchQuery)
  // Navegar a página de resultados
}
```

### **Fase 3: Navegación React Router**
```jsx
import { Link } from 'react-router-dom'

<Link to="/productos">Productos</Link>
<Link to="/contacto">Contacto</Link>
```

### **Fase 4: Autenticación**
```jsx
// Mostrar nombre de usuario si está logueado
{user ? (
  <div>Hola, {user.nombre}</div>
) : (
  <Link to="/login">Iniciar Sesión</Link>
)}
```

### **Fase 5: Carrito de Compras**
```jsx
// Agregar icono de carrito
<button>
  <FaShoppingCart />
  <span className="badge">{cantidadItems}</span>
</button>
```

---

## 📱 **Comportamiento Responsive Detallado**

### **Desktop (≥1024px)**
```
✅ Logo a la izquierda (30%)
✅ Buscador centrado (40%)
✅ Menú a la derecha (30%)
✅ Todo en una línea
✅ Sin menú hamburguesa
```

### **Tablet (768px - 1023px)**
```
✅ Logo a la izquierda
✅ Buscador debajo del logo
✅ Menú hamburguesa a la derecha
✅ Menú desplegable vertical
```

### **Mobile (<768px)**
```
✅ Logo a la izquierda (pequeño)
✅ Buscador debajo (ancho completo)
✅ Menú hamburguesa grande
✅ Menú desplegable full-width
```

---

## 🛠️ **Props y Estados**

### **Estados (useState)**
```jsx
menuOpen:    boolean  // Control del menú mobile
searchQuery: string   // Texto del buscador
```

### **Props del Navbar**
```jsx
// Por ahora no recibe props
// En el futuro podría recibir:
- user: objeto del usuario logueado
- cartItems: número de items en carrito
- onSearch: función custom de búsqueda
```

---

## 🔍 **Ejemplos de Uso Futuro**

### **Con Usuario Logueado**
```jsx
<Navbar user={currentUser} />

// Dentro del Navbar:
{user ? (
  <div className="flex items-center gap-2">
    <img src={user.avatar} className="w-8 h-8 rounded-full" />
    <span>{user.nombre}</span>
  </div>
) : (
  <Link to="/login">Iniciar Sesión</Link>
)}
```

### **Con Búsqueda Avanzada**
```jsx
<Navbar 
  onSearch={(query) => buscarProductos(query)}
  searchPlaceholder="Buscar por nombre o categoría..."
/>
```

---

## ✨ **Características Destacadas**

✅ **Sticky Navigation** - Siempre visible al hacer scroll
✅ **Totalmente Responsive** - Funciona perfecto en todos los dispositivos
✅ **Menú Mobile Moderno** - Hamburguesa con animaciones
✅ **Buscador Integrado** - En desktop y mobile
✅ **Transiciones Suaves** - Experiencia fluida
✅ **Iconos Profesionales** - react-icons
✅ **Accesible** - Aria-labels y semántica correcta
✅ **Preparado para Expandir** - Fácil agregar más funciones

---

## 🎨 **Personalización Rápida**

### **Cambiar Colores**
```jsx
// En Navbar.jsx línea 2:
bg-white → bg-gray-900 (navbar oscuro)
text-blue-600 → text-green-600 (color primario)
```

### **Agregar Más Links**
```jsx
// Después de "Contacto":
<a href="#nosotros" className="...">
  Sobre Nosotros
</a>
```

### **Modificar Logo**
```jsx
// Reemplazar línea 21-25:
<img 
  src="/logo.png" 
  alt="Ortomediq" 
  className="h-12"
/>
```

---

**¡El Navbar está listo y funcional! 🎉**

Ahora el Home tiene una navegación completa y profesional.

