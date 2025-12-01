import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Productos from '../pages/Productos'
import ProductoDetalle from '../pages/ProductoDetalle'
import Carrito from '../pages/Carrito'
import Checkout from '../pages/Checkout'
import PickupSummary from '../pages/PickupSummary'
import PickupConfirmation from '../pages/PickupConfirmation'
import Home from '../pages/Home'

// Dashboard Layout y Páginas
import DashboardLayout from '../layouts/DashboardLayout'
import DashboardAdmin from '../pages/dashboard/DashboardAdmin'
import DashboardEmpleado from '../pages/dashboard/DashboardEmpleado'
import DashboardCliente from '../pages/dashboard/DashboardCliente'
import Empleados from '../pages/dashboard/Empleados'
import PuntoVenta from '../pages/dashboard/PuntoVenta'
import ProductosDashboard from '../pages/dashboard/Productos'
import Reportes from '../pages/dashboard/Reportes'
import Pedidos from '../pages/dashboard/Pedidos'
import Ventas from '../pages/dashboard/Ventas'

// Componente temporal para Home
const TempHome = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Ortomediq
      </h1>
      <p className="text-gray-600 mb-8">
        Home en construcción...
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <a
          href="/productos"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ver Catálogo
        </a>
        <a
          href="/login"
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Iniciar Sesión
        </a>
        <a
          href="/register"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Crear Cuenta
        </a>
      </div>
    </div>
  </div>
)

const AppRouter = () => {
  // TODO: Obtener el rol del usuario del AuthContext
  // Por ahora usamos localStorage o 'cliente' como valor por defecto
  const userRole = localStorage.getItem('userRole') || 'empleado' // 'admin', 'empleado', 'cliente'

  // Determinar qué dashboard mostrar según el rol
  const getDashboardComponent = () => {
    switch(userRole) {
      case 'admin':
        return <DashboardAdmin />
      case 'empleado':
        return <DashboardEmpleado />
      case 'cliente':
        return <DashboardCliente />
      default:
        return <DashboardCliente />
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Home />} />
        
        {/* Rutas de autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rutas del catálogo público */}
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<ProductoDetalle />} />
        
        {/* Rutas del carrito */}
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pickup-summary" element={<PickupSummary />} />
        <Route path="/checkout-pickup" element={<PickupConfirmation />} />
        
        {/* Rutas del Dashboard (protegidas) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={getDashboardComponent()} />
          <Route path="punto-venta" element={<PuntoVenta />} />
          <Route path="ventas" element={<Ventas />} />
          <Route path="productos" element={<ProductosDashboard />} />
          <Route path="inventario" element={<div className="p-6">Módulo de Inventario (En construcción)</div>} />
          <Route path="empleados" element={<Empleados />} />
          <Route path="clientes" element={<div className="p-6">Módulo de Clientes (En construcción)</div>} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="configuracion" element={<div className="p-6">Configuración (En construcción)</div>} />
          <Route path="perfil" element={<div className="p-6">Mi Perfil (En construcción)</div>} />
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="favoritos" element={<div className="p-6">Mis Favoritos (En construcción)</div>} />
        </Route>
        
        {/* Ruta 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter

