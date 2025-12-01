import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import Sidebar from '../components/dashboard/Sidebar'
import Header from '../components/dashboard/Header'
import { X } from 'lucide-react'

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Aquí deberías obtener el usuario real del context/auth
  // Por ahora usamos datos de ejemplo
  const user = {
    name: 'Admin User',
    role: localStorage.getItem('userRole') || 'empleado', // admin, empleado, cliente
    email: 'admin@ortomediq.com'
  }

  // Mapeo de rutas a títulos
  const pageTitles = {
    '/dashboard': 'Dashboard',
    '/dashboard/punto-venta': 'Punto de Venta',
    '/dashboard/ventas': 'Ventas',
    '/dashboard/empleados': 'Empleados',
    '/dashboard/productos': 'Productos',
    '/dashboard/reportes': 'Reportes',
    '/dashboard/pedidos': 'Pedidos',
    '/dashboard/perfil': 'Mi Perfil',
    '/dashboard/configuracion': 'Configuración'
  }

  // Obtener el título de la página según la ruta actual
  const getPageTitle = () => {
    return pageTitles[location.pathname] || 'Dashboard'
  }

  const handleSidebarCollapse = (collapsed) => {
    setSidebarCollapsed(collapsed)
  }

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Desktop */}
      <div className="hidden lg:block">
        <Sidebar 
          userRole={user.role}
          onCollapse={handleSidebarCollapse}
        />
      </div>

      {/* Sidebar Móvil (Overlay) */}
      {mobileSidebarOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
            <div className="relative">
              <Sidebar userRole={user.role} />
              {/* Botón cerrar */}
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="absolute top-4 right-4 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Header */}
      <Header 
        userName={user.name}
        userRole={user.role}
        onMenuClick={toggleMobileSidebar}
        sidebarCollapsed={sidebarCollapsed}
        pageTitle={getPageTitle()}
      />

      {/* Contenido Principal */}
      <main className={`
        transition-all duration-300 pt-16
        ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
      `}>
        <div className="p-4 md:p-6 lg:p-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <a href="/dashboard" className="hover:text-gray-900">Dashboard</a>
              <span>/</span>
              <span className="text-gray-900 font-medium">Inicio</span>
            </nav>
          </div>

          {/* Contenido de la página (Outlet) */}
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout

