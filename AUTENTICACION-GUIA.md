# 🔐 Sistema de Autenticación - Ortomediq

## ✅ **Completado**

El sistema de Login y Registro está completamente implementado con:

- ✅ Diseño Split Screen moderno
- ✅ Validaciones completas con react-hook-form + yup
- ✅ Animaciones con Framer Motion
- ✅ Notificaciones con react-toastify
- ✅ Componentes reutilizables
- ✅ Responsive design
- ✅ Indicador de fortaleza de contraseña
- ✅ Toggle mostrar/ocultar contraseña
- ✅ Manejo de estados de carga

---

## 📁 **Estructura Creada**

```
src/
├── api/
│   ├── axiosConfig.js         ✅ Configuración de Axios + interceptors
│   └── authApi.js             ✅ Servicios de autenticación
│
├── components/
│   ├── common/
│   │   ├── Button.jsx         ✅ Botón reutilizable con loading
│   │   └── Input.jsx          ✅ Input personalizado con validación
│   │
│   └── auth/
│       ├── AuthLayout.jsx     ✅ Layout Split Screen
│       ├── LoginForm.jsx      ✅ Formulario de login
│       ├── RegisterForm.jsx   ✅ Formulario de registro
│       └── PasswordInput.jsx  ✅ Input de contraseña con toggle
│
├── pages/
│   ├── Login.jsx              ✅ Página de login
│   ├── Register.jsx           ✅ Página de registro
│   └── Dashboard.jsx          ✅ Dashboard temporal
│
├── router/
│   └── AppRouter.jsx          ✅ Configuración de rutas
│
└── App.jsx                    ✅ App principal con ToastContainer
```

---

## 🎨 **Características Implementadas**

### **LoginForm**
- Email con validación de formato
- Contraseña con validación
- Checkbox "Recordarme"
- Link "Olvidé mi contraseña"
- Link a página de registro
- Validación en tiempo real

### **RegisterForm**
- Nombre completo (solo letras)
- Email con validación
- Teléfono (10 dígitos, formato mexicano)
- Contraseña con indicador de fortaleza:
  - Mínimo 8 caracteres
  - Al menos 1 mayúscula
  - Al menos 1 minúscula
  - Al menos 1 número
- Confirmar contraseña (debe coincidir)
- Checkbox términos y condiciones
- Validación completa con mensajes de error

### **AuthLayout (Split Screen)**
```
┌─────────────────────────────────────────┐
│                        │                │
│   BRANDING/IMAGEN      │   FORMULARIO   │
│   (Lado izquierdo)     │   (Lado der.)  │
│                        │                │
│   - Logo Ortomediq     │   - Título     │
│   - Mensaje inspirador │   - Campos     │
│   - Características    │   - Validación │
│   - Gradiente azul     │   - Botones    │
│                        │                │
└─────────────────────────────────────────┘
```

---

## 🚀 **Cómo Probar**

### **1. Iniciar el servidor**
```bash
npm run dev
```

### **2. Navegar a las rutas**
- **Home temporal:** http://localhost:5173/
- **Login:** http://localhost:5173/login
- **Registro:** http://localhost:5173/register
- **Dashboard:** http://localhost:5173/dashboard (después del login)

### **3. Probar Login**
1. Ve a `/login`
2. Ingresa cualquier email y contraseña (por ahora es simulación)
3. Click en "Iniciar Sesión"
4. Verás una notificación de éxito
5. Serás redirigido al Dashboard

### **4. Probar Registro**
1. Ve a `/register`
2. Llena todos los campos
3. Observa el indicador de fortaleza de contraseña
4. Acepta términos
5. Click en "Crear Cuenta"
6. Verás notificación y serás redirigido

---

## 🔧 **Configuración del Backend**

### **Variables de Entorno**

Crea o edita el archivo `.env`:

```env
# URL del backend API
VITE_API_URL=http://localhost:3000/api

# Nombre de la aplicación
VITE_APP_NAME=Ortomediq
```

### **Endpoints que el Backend debe implementar**

```javascript
// Login
POST /api/auth/login
Body: { email, password }
Response: { token, user: { id, nombre, email, rol } }

// Registro
POST /api/auth/register
Body: { nombreCompleto, email, telefono, password }
Response: { token, user: { id, nombre, email, rol } }

// Verificar Token
GET /api/auth/verify
Headers: { Authorization: "Bearer TOKEN" }
Response: { user: { id, nombre, email, rol } }

// Logout
POST /api/auth/logout
Response: { message: "Sesión cerrada" }
```

---

## 🔄 **Integrar con Backend Real**

Actualmente las páginas usan **datos simulados**. Para conectar con el backend:

### **1. Descomentar en Login.jsx**
```javascript
// Línea 4
import { useAuth } from '../hooks/useAuth'

// Línea 9
const { login } = useAuth()

// Línea 17 - Reemplazar simulación con:
await login(data)
```

### **2. Descomentar en Register.jsx**
```javascript
// Similar al Login
import { useAuth } from '../hooks/useAuth'
const { register: registerUser } = useAuth()
await registerUser(data)
```

### **3. Implementar AuthContext**

Edita `src/context/AuthContext.jsx`:

```javascript
import { createContext, useState, useEffect } from 'react'
import { loginUser, registerUser, verifyToken } from '../api/authApi'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  // Verificar token al cargar
  useEffect(() => {
    if (token) {
      verifyToken(token)
        .then((data) => {
          setUser(data.user)
        })
        .catch(() => {
          logout()
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [token])

  const login = async (credentials) => {
    const data = await loginUser(credentials)
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    return data
  }

  const register = async (userData) => {
    const data = await registerUser(userData)
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    return data
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
```

### **4. Implementar useAuth Hook**

Edita `src/hooks/useAuth.js`:

```javascript
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const useAuth = () => {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  
  return context
}
```

### **5. Envolver App con AuthProvider**

Edita `src/main.jsx`:

```javascript
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)
```

---

## 🛡️ **Protección de Rutas**

Crea `src/components/ProtectedRoute.jsx`:

```javascript
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth()

  if (loading) {
    return <div>Cargando...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.rol)) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
```

Úsalo en `AppRouter.jsx`:

```javascript
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute allowedRoles={['admin', 'empleado']}>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

---

## 🎨 **Personalización**

### **Cambiar colores**

Edita los componentes y reemplaza:
- `bg-blue-600` → Tu color primario
- `bg-blue-700` → Versión más oscura

### **Agregar logo real**

En `AuthLayout.jsx`, reemplaza:
```jsx
<h1 className="text-6xl font-bold mb-2">Ortomediq</h1>
```

Por:
```jsx
<img src="/logo-ortomediq-white.png" alt="Ortomediq" className="w-64" />
```

---

## 📱 **Responsive**

El diseño es totalmente responsive:
- **Desktop:** Split screen (50/50)
- **Tablet:** Split screen ajustado
- **Móvil:** Solo formulario (branding oculto)

---

## ✨ **Animaciones Implementadas**

- Fade in al cargar página
- Slide in lateral en split screen
- Hover effects en botones
- Loading spinners
- Smooth transitions

---

## 🐛 **Testing**

### **Validaciones a probar:**

**Login:**
- [ ] Email inválido muestra error
- [ ] Contraseña vacía muestra error
- [ ] Loading state funciona
- [ ] Redirección después del login

**Registro:**
- [ ] Nombre con números muestra error
- [ ] Email inválido muestra error
- [ ] Teléfono con letras muestra error
- [ ] Contraseña débil muestra indicador rojo
- [ ] Contraseñas no coinciden muestra error
- [ ] Sin aceptar términos no permite submit

---

## 🚀 **Próximos Pasos**

1. ✅ Implementar AuthContext completo
2. ✅ Conectar con backend real
3. ✅ Agregar página "Olvidé contraseña"
4. ✅ Agregar protección de rutas
5. ✅ Implementar roles (admin, empleado, cliente)
6. ✅ Agregar verificación por email (opcional)
7. ✅ Agregar 2FA (opcional)

---

## 📚 **Recursos Usados**

- **React Hook Form:** https://react-hook-form.com
- **Yup:** https://github.com/jquense/yup
- **Framer Motion:** https://framer.com/motion
- **React Toastify:** https://fkhadra.github.io/react-toastify
- **React Icons:** https://react-icons.github.io/react-icons

---

**¿Preguntas o necesitas ayuda con la integración?** 🚀








