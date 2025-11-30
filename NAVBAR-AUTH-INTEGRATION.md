# 🔐 Integración de Autenticación en Navbar

## ✅ Estado Actual

El Navbar ahora muestra diferentes opciones según el estado de autenticación del usuario:

### Usuario NO Logueado
```
[Logo]  [Productos]  [Contacto]  [Iniciar Sesión]  [Registrarse]
```

### Usuario Logueado
```
[Logo]  [Productos]  [Contacto]  [👤 Usuario]
```

---

## 🎯 Implementación Actual

### Variables de Estado (Líneas 6-10)

```javascript
// TODO: Reemplazar con lógica real de autenticación cuando esté lista
const isLoggedIn = false // Cambiar a true para probar vista de usuario logueado
const userName = 'Usuario' // Nombre del usuario cuando esté logueado
```

**Estado Actual**: Simulación (usuario siempre NO logueado)

---

## 🔄 Cómo Conectar Autenticación Real

### Opción 1: Usar Context de Autenticación

Cuando tengas tu `AuthContext` listo:

```javascript
import { useAuth } from '../context/AuthContext' // o tu ruta

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  
  // Reemplazar las líneas 6-10 con:
  const { user, isAuthenticated } = useAuth()
  const isLoggedIn = isAuthenticated
  const userName = user?.nombre || user?.email || 'Usuario'
  
  // ... resto del código
}
```

### Opción 2: Usar Hook Personalizado

Si tienes un hook `useAuth`:

```javascript
import { useAuth } from '../hooks/useAuth'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  
  // Reemplazar las líneas 6-10 con:
  const { isLoggedIn, user } = useAuth()
  const userName = user?.nombre || 'Usuario'
  
  // ... resto del código
}
```

### Opción 3: Verificar Token en localStorage

Solución temporal más simple:

```javascript
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  
  // Reemplazar las líneas 6-10 con:
  const token = localStorage.getItem('token')
  const isLoggedIn = !!token
  const userInfo = JSON.parse(localStorage.getItem('user') || '{}')
  const userName = userInfo.nombre || 'Usuario'
  
  // ... resto del código
}
```

---

## 🎨 Vistas según Estado

### Vista NO Logueado (Desktop)
```
┌─────────────────────────────────────────────────────┐
│ Ortomediq    Productos  Contacto  Iniciar Sesión   │
│                                    [Registrarse]    │
└─────────────────────────────────────────────────────┘
```

### Vista Logueado (Desktop)
```
┌─────────────────────────────────────────────────────┐
│ Ortomediq    Productos  Contacto      [👤 Usuario] │
└─────────────────────────────────────────────────────┘
```

### Vista NO Logueado (Móvil - Menú Abierto)
```
┌─────────────────────────┐
│ Ortomediq          ☰    │
├─────────────────────────┤
│ Productos               │
│ Contacto                │
│ Iniciar Sesión          │
│ [Registrarse]           │
└─────────────────────────┘
```

### Vista Logueado (Móvil - Menú Abierto)
```
┌─────────────────────────┐
│ Ortomediq          ☰    │
├─────────────────────────┤
│ Productos               │
│ Contacto                │
│ [👤 Usuario]            │
└─────────────────────────┘
```

---

## 🔗 Enlaces de Navegación

### Para Usuarios NO Logueados:

| Botón | Desktop | Móvil | Destino |
|-------|---------|-------|---------|
| **Iniciar Sesión** | Enlace texto | Botón gris | `/login` |
| **Registrarse** | Botón azul con ícono | Botón azul con ícono | `/register` |

### Para Usuarios Logueados:

| Botón | Desktop | Móvil | Destino |
|-------|---------|-------|---------|
| **Perfil/Usuario** | Botón azul con ícono | Botón azul con ícono | `/dashboard` |

---

## 🎯 Funcionalidades Implementadas

### ✅ Renderizado Condicional
- Muestra diferentes botones según `isLoggedIn`
- Usa `{isLoggedIn ? ... : ...}` en JSX

### ✅ Responsive
- Desktop: Botones horizontales
- Móvil: Lista vertical en menú desplegable

### ✅ Cierre Automático
- Menú móvil se cierra al hacer click en cualquier enlace

### ✅ Estilos Consistentes
- "Iniciar Sesión": Enlace simple gris
- "Registrarse": Botón azul destacado
- "Usuario/Perfil": Botón azul con ícono

---

## 🔧 Personalización

### Cambiar el Nombre que se Muestra

```javascript
// Opción 1: Solo nombre
const userName = user?.nombre

// Opción 2: Nombre o email
const userName = user?.nombre || user?.email

// Opción 3: Primera palabra del nombre
const userName = user?.nombre?.split(' ')[0] || 'Usuario'

// Opción 4: Iniciales
const userName = user?.nombre
  ?.split(' ')
  .map(n => n[0])
  .join('')
  .toUpperCase() || 'U'
```

### Agregar Dropdown de Menú

Para cuando el usuario esté logueado, puedes agregar un menú desplegable:

```javascript
{isLoggedIn ? (
  <div className="relative group">
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
      <FaUser className="text-sm" />
      <span className="font-medium">{userName}</span>
    </button>
    
    {/* Dropdown */}
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
      <a href="/mi-cuenta" className="block px-4 py-2 hover:bg-gray-100">
        Mi Cuenta
      </a>
      <a href="/mis-pedidos" className="block px-4 py-2 hover:bg-gray-100">
        Mis Pedidos
      </a>
      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">
        Cerrar Sesión
      </button>
    </div>
  </div>
) : (
  // ... botones de login/registro
)}
```

### Agregar Botón de Logout

```javascript
const handleLogout = () => {
  // Limpiar token y datos del usuario
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  
  // O si usas Context:
  // logout()
  
  // Redirigir al home
  window.location.href = '/'
}
```

---

## 🧪 Pruebas

### Probar Vista NO Logueado (Actual)

1. Abre el navegador: `http://localhost:5173`
2. Verifica que veas:
   - "Iniciar Sesión" (enlace)
   - "Registrarse" (botón azul)

3. Click en "Iniciar Sesión" → Debería ir a `/login`
4. Click en "Registrarse" → Debería ir a `/register`

### Probar Vista Logueado

1. En `Navbar.jsx` línea 9, cambia:
   ```javascript
   const isLoggedIn = true // ⬅️ Cambiar a true
   ```

2. Guarda y recarga
3. Verifica que veas:
   - "Usuario" (botón azul con ícono)

4. Click en "Usuario" → Debería ir a `/dashboard`

---

## 📋 Checklist de Integración

Cuando conectes la autenticación real:

- [ ] Importar hook/context de autenticación
- [ ] Reemplazar `isLoggedIn` con estado real
- [ ] Reemplazar `userName` con datos reales del usuario
- [ ] Probar flujo de login → navbar actualiza
- [ ] Probar flujo de logout → navbar actualiza
- [ ] Probar en desktop
- [ ] Probar en móvil
- [ ] Verificar que los enlaces funcionan
- [ ] Agregar manejo de carga (skeleton/spinner)

---

## 🚀 Mejoras Futuras

### Corto Plazo
- [ ] Agregar dropdown con opciones de perfil
- [ ] Agregar botón de logout
- [ ] Mostrar foto de perfil del usuario
- [ ] Agregar badge de notificaciones

### Mediano Plazo
- [ ] Agregar indicador de carrito
- [ ] Menú de usuario con más opciones
- [ ] Transiciones suaves al cambiar estado
- [ ] Estados de carga

---

## 📝 Notas Importantes

1. **Por defecto** el navbar muestra la vista de usuario NO logueado
2. **Para cambiar** el comportamiento, modifica las líneas 6-10 del `Navbar.jsx`
3. **Los enlaces** ya están configurados correctamente:
   - `/login` → Página de Login
   - `/register` → Página de Registro
   - `/dashboard` → Dashboard (cuando esté logueado)

4. **Responsive**: Funciona en todos los dispositivos
5. **Listo para producción**: Solo falta conectar la autenticación real

---

## 🔗 Archivos Relacionados

- `src/components/Navbar.jsx` - Componente principal
- `src/pages/Login.jsx` - Página de inicio de sesión
- `src/pages/Register.jsx` - Página de registro
- `src/pages/Dashboard.jsx` - Dashboard del usuario

---

**Fecha**: 30 de noviembre de 2025
**Estado**: ✅ Listo para integración con autenticación real
**Versión**: 1.0

