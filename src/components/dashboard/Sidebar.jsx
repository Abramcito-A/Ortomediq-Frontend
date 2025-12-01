import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  ClipboardList, 
  Users, 
  BarChart3, 
  Settings,
  ChevronLeft,
  LogOut,
  User,
  CreditCard
} from 'lucide-react'
import { useState } from 'react'

const Sidebar = ({ userRole = 'admin', onCollapse }) => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
    if (onCollapse) onCollapse(!collapsed)
  }

  // Navegación según rol
  const navigationItems = {
    admin: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { name: 'Punto de Venta', path: '/dashboard/punto-venta', icon: CreditCard },
      { name: 'Pedidos', path: '/dashboard/pedidos', icon: ShoppingCart },
      { name: 'Ventas', path: '/dashboard/ventas', icon: ShoppingCart },
      { name: 'Productos', path: '/dashboard/productos', icon: Package },
      { name: 'Inventario', path: '/dashboard/inventario', icon: ClipboardList },
      { name: 'Empleados', path: '/dashboard/empleados', icon: Users },
      { name: 'Clientes', path: '/dashboard/clientes', icon: Users },
      { name: 'Reportes', path: '/dashboard/reportes', icon: BarChart3 },
      { name: 'Configuración', path: '/dashboard/configuracion', icon: Settings },
    ],
    empleado: [
      { name: 'Mi Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { name: 'Punto de Venta', path: '/dashboard/punto-venta', icon: CreditCard },
      { name: 'Pedidos', path: '/dashboard/pedidos', icon: ShoppingCart },
      { name: 'Ventas', path: '/dashboard/ventas', icon: ShoppingCart },
      { name: 'Productos', path: '/dashboard/productos', icon: Package },
      { name: 'Clientes', path: '/dashboard/clientes', icon: Users },
    ],
    cliente: [
      { name: 'Mi Cuenta', path: '/dashboard', icon: User },
      { name: 'Mis Pedidos', path: '/dashboard/pedidos', icon: ShoppingCart },
    ]
  }

  const menuItems = navigationItems[userRole] || navigationItems.admin

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <aside 
      className={`
        ${collapsed ? 'w-20' : 'w-64'} 
        bg-white border-r border-gray-200 
        flex flex-col
        transition-all duration-300 ease-in-out
        fixed left-0 top-0 bottom-0 z-40
      `}
    >
      {/* Logo y Toggle */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && (
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">Ortomediq</span>
          </Link>
        )}
        <button
          onClick={toggleCollapse}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          title={collapsed ? 'Expandir' : 'Colapsar'}
        >
          <ChevronLeft 
            size={20} 
            className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Navegación */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg
                    transition-all duration-200
                    ${active 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                    ${collapsed ? 'justify-center' : ''}
                  `}
                  title={collapsed ? item.name : ''}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!collapsed && (
                    <span className="text-sm">{item.name}</span>
                  )}
                  {active && !collapsed && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer con Perfil y Cerrar Sesión */}
      <div className="border-t border-gray-200 p-4">
        <Link
          to="/dashboard/perfil"
          className={`
            flex items-center gap-3 px-3 py-2.5 rounded-lg
            text-gray-700 hover:bg-gray-50 transition-colors
            ${collapsed ? 'justify-center' : ''}
          `}
          title={collapsed ? 'Mi Perfil' : ''}
        >
          <User size={20} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm">Mi Perfil</span>}
        </Link>
        
        <button
          onClick={() => {
            // Lógica de cerrar sesión
            console.log('Cerrar sesión')
          }}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
            text-red-600 hover:bg-red-50 transition-colors mt-2
            ${collapsed ? 'justify-center' : ''}
          `}
          title={collapsed ? 'Cerrar Sesión' : ''}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm">Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar



