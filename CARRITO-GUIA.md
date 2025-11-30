# 🛒 Sistema de Carrito de Compras - Guía Completa

## 📋 Índice
1. [Descripción General](#descripción-general)
2. [Arquitectura](#arquitectura)
3. [Funcionalidades](#funcionalidades)
4. [Componentes](#componentes)
5. [Uso](#uso)
6. [Flujo de Compra](#flujo-de-compra)

---

## 📝 Descripción General

Sistema completo de carrito de compras implementado con **React Context API** para gestión global del estado. Permite:
- ✅ Agregar productos al carrito con variantes (talla, color)
- ✅ Modificar cantidades
- ✅ Eliminar productos
- ✅ Persistencia en localStorage
- ✅ Validación de stock
- ✅ Cálculo automático de totales y descuentos
- ✅ Proceso de checkout completo

---

## 🏗️ Arquitectura

### **Context: CartContext**
**Ubicación:** `src/context/CartContext.jsx`

Maneja el estado global del carrito y proporciona las siguientes funciones:

```javascript
{
  cartItems,              // Array de productos en el carrito
  addToCart(),            // Agregar producto
  removeFromCart(),       // Eliminar producto
  updateQuantity(),       // Actualizar cantidad
  clearCart(),            // Vaciar carrito
  getTotalItems(),        // Total de items
  getSubtotal(),          // Subtotal
  getTotalDiscount(),     // Descuento total
  getTotal(),             // Total final
  isInCart(),             // Verificar si producto está en carrito
  getItemQuantity()       // Cantidad de un producto específico
}
```

### **Hook: useCart**
**Ubicación:** `src/hooks/useCart.js`

Hook personalizado para acceder al Context del carrito de forma sencilla:

```javascript
import { useCart } from '../hooks/useCart'

const { addToCart, cartItems, getTotalItems } = useCart()
```

---

## ⚙️ Funcionalidades

### **1. Agregar al Carrito**
```javascript
addToCart(producto, cantidad, talla, color)
```
- Valida que se hayan seleccionado talla y color
- Verifica stock disponible
- Si el producto ya existe (con mismas variantes), suma la cantidad
- Si no existe, lo agrega como nuevo item
- Muestra notificación de éxito/error

### **2. Actualizar Cantidad**
```javascript
updateQuantity(id, talla, color, nuevaCantidad)
```
- Valida que la cantidad no exceda el stock
- Si la cantidad es 0 o menor, elimina el producto
- Actualiza el carrito inmediatamente

### **3. Eliminar Producto**
```javascript
removeFromCart(id, talla, color)
```
- Elimina el producto específico (identificado por id + variantes)
- Muestra notificación informativa

### **4. Cálculos Automáticos**
- **Subtotal:** Suma de precio × cantidad de todos los items
- **Descuento:** Suma de descuentos aplicados
- **Total:** Subtotal + envío (actualmente envío gratis)

### **5. Persistencia**
- El carrito se guarda automáticamente en `localStorage`
- Se recupera al recargar la página
- Key: `'cart'`

---

## 🧩 Componentes

### **1. CartBadge**
**Ubicación:** `src/components/carrito/CartBadge.jsx`

Badge animado que muestra la cantidad de items en el carrito.
- Se integra en el Navbar
- Animación con Framer Motion al cambiar cantidad
- Enlace directo a `/carrito`

```jsx
<CartBadge />
```

### **2. CartItem**
**Ubicación:** `src/components/carrito/CartItem.jsx`

Componente individual para mostrar un producto en el carrito.

**Características:**
- Imagen del producto
- Nombre, marca y precio
- Variantes seleccionadas (talla y color)
- Controles de cantidad (+/-)
- Botón eliminar
- Indicador de stock disponible

### **3. CartSummary**
**Ubicación:** `src/components/carrito/CartSummary.jsx`

Resumen del pedido con totales.

**Muestra:**
- Subtotal
- Descuentos aplicados
- Costo de envío (gratis)
- Total final
- Botón "Proceder al pago"
- Link "Continuar comprando"

**Props:**
- `showCheckoutButton` (boolean): Mostrar/ocultar botón de checkout

### **4. NavbarCatalogo**
**Ubicación:** `src/components/NavbarCatalogo.jsx`

Navbar simplificado para páginas de catálogo y carrito.

**Incluye:**
- Logo con enlace a home
- Links de navegación
- CartBadge
- Link a login/cuenta

---

## 📄 Páginas

### **1. Carrito** (`/carrito`)
**Ubicación:** `src/pages/Carrito.jsx`

Vista principal del carrito de compras.

**Características:**
- Lista de todos los productos agregados
- Botón "Vaciar carrito"
- Resumen del pedido
- Vista de carrito vacío con call-to-action
- Botón "Proceder al pago" → `/checkout`

### **2. Checkout** (`/checkout`)
**Ubicación:** `src/pages/Checkout.jsx`

Página de finalización de compra.

**Formulario incluye:**

#### Información Personal
- Nombre *
- Apellido *
- Email *
- Teléfono *

#### Dirección de Envío
- Calle *
- Número exterior *
- Número interior
- Colonia *
- Código postal *
- Ciudad (fijo: Torreón)
- Estado (fijo: Coahuila)
- Notas adicionales

#### Método de Pago
- Efectivo (contra entrega)
- Transferencia bancaria
- Tarjeta (en terminal al recibir)

#### Resumen del Pedido
- Vista compacta de productos
- Totales y descuentos
- Botón "Confirmar pedido"

**Validación:**
- Campos obligatorios marcados con *
- Verifica que todos los campos requeridos estén completos
- Muestra error si falta información

**Al confirmar:**
1. Valida datos
2. Muestra notificación de éxito
3. Limpia el carrito
4. Redirige a `/productos` después de 2 segundos

---

## 💡 Uso

### **Integración en ProductoDetalle**

```jsx
import { useCart } from '../hooks/useCart'

const ProductoDetalle = () => {
  const { addToCart } = useCart()
  const [tallaSeleccionada, setTallaSeleccionada] = useState('')
  const [colorSeleccionado, setColorSeleccionado] = useState('')
  const [cantidad, setCantidad] = useState(1)

  const handleAddToCart = () => {
    addToCart(producto, cantidad, tallaSeleccionada, colorSeleccionado)
  }

  return (
    <button onClick={handleAddToCart}>
      Agregar al carrito
    </button>
  )
}
```

### **Mostrar Cantidad en Navbar**

```jsx
import CartBadge from '../components/carrito/CartBadge'

const Navbar = () => {
  return (
    <nav>
      {/* ... otros elementos ... */}
      <CartBadge />
    </nav>
  )
}
```

### **Verificar si Producto está en Carrito**

```jsx
const { isInCart } = useCart()

if (isInCart(productoId, talla, color)) {
  console.log('Producto ya está en el carrito')
}
```

---

## 🛍️ Flujo de Compra

```
1. Usuario navega por catálogo
   └─> /productos

2. Usuario ve detalles de producto
   └─> /productos/:id
   
3. Usuario selecciona:
   - Talla
   - Color
   - Cantidad
   └─> Click en "Agregar al carrito"

4. CartBadge actualiza cantidad (animación)
   └─> Usuario puede:
       - Continuar comprando
       - Ir al carrito (click en badge)

5. Usuario revisa carrito
   └─> /carrito
   └─> Puede modificar cantidades o eliminar items

6. Usuario procede al pago
   └─> /checkout

7. Usuario completa formulario:
   - Información personal
   - Dirección
   - Método de pago
   └─> Click en "Confirmar pedido"

8. Sistema:
   - Valida datos
   - Muestra confirmación
   - Limpia carrito
   - Redirige a catálogo

9. (Futuro) Sistema notifica a administrador
   └─> Procesamiento del pedido
```

---

## 🎨 Estilos y Animaciones

### **Animaciones con Framer Motion**
- Badge del carrito: escala al cambiar cantidad
- Items del carrito: fade-in al cargar
- Páginas: transiciones suaves

### **Estados Visuales**
- Productos sin stock: botón deshabilitado
- Carrito vacío: ilustración y mensaje amigable
- Loading states: mientras se filtran productos

---

## 🔧 Próximas Mejoras

- [ ] Integración con backend real
- [ ] Cupones de descuento
- [ ] Cálculo dinámico de envío
- [ ] Guardar "favoritos"
- [ ] Historial de pedidos (usuarios autenticados)
- [ ] Notificaciones por email
- [ ] Pasarela de pago real

---

## 📞 Notas Adicionales

### **LocalStorage**
El carrito se guarda en `localStorage` con la key `'cart'`.

**Estructura:**
```json
[
  {
    "id": 1,
    "nombre": "Producto X",
    "marca": "Marca Y",
    "precio": 299.99,
    "precioOriginal": 349.99,
    "imagen": "url",
    "talla": "M",
    "color": "Azul",
    "cantidad": 2,
    "stock": 10
  }
]
```

### **Identificación Única**
Cada item en el carrito se identifica por:
```
id + talla + color
```

Esto permite tener el mismo producto con diferentes variantes en el carrito.

---

**¡Sistema de carrito completamente funcional! 🎉**



