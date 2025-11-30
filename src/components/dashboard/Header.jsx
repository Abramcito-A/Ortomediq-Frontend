import { useState } from 'react'
import { Search, Bell, ChevronDown, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'

const Header = ({ userName = 'Usuario', userRole = 'admin', onMenuClick, sidebarCollapsed = false, pageTitle = 'Dashboard' }) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Mock notifications
  const notifications = [
    { id: 1, type: 'warning', message: '3 productos con stock bajo', time: 'Hace 5 min' },
    { id: 2, type: 'success', message: 'Nueva venta registrada #145', time: 'Hace 15 min' },
    { id: 3, type: 'info', message: 'Pedido #144 entregado', time: 'Hace 1 hora' },
  ]

  const unreadCount = notifications.length

  const getRoleBadge = () => {
    const badges = {
      admin: { text: 'Administrador', color: 'bg-purple-100 text-purple-700' },
      empleado: { text: 'Empleado', color: 'bg-blue-100 text-blue-700' },
      cliente: { text: 'Cliente', color: 'bg-green-100 text-green-700' }
    }
    return badges[userRole] || badges.cliente
  }

  const roleBadge = getRoleBadge()

  return (
    <header className={`
      h-16 bg-white border-b border-gray-200 fixed top-0 right-0 z-30
      transition-all duration-300
      ${sidebarCollapsed ? 'lg:left-20' : 'lg:left-64'}
      left-0
    `}>
      <div className="h-full flex items-center justify-between px-4 md:px-6">
        {/* Botón Menu Móvil + Título de página */}
        <div className="flex items-center gap-4">
          {/* Botón hamburguesa móvil */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* Título de la página */}
          <h1 className="text-lg md:text-xl font-semibold text-gray-900">
            {pageTitle}
          </h1>
        </div>

        {/* Acciones de la derecha */}
        <div className="flex items-center gap-2">
          {/* Botón búsqueda móvil */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Search size={20} className="text-gray-600" />
          </button>

          {/* Notificaciones */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
            >
              <Bell size={20} className="text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Dropdown de notificaciones */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Notificaciones</h3>
                  <p className="text-xs text-gray-500">{unreadCount} nuevas</p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`
                          w-2 h-2 rounded-full mt-1.5 flex-shrink-0
                          ${notif.type === 'warning' ? 'bg-yellow-500' : ''}
                          ${notif.type === 'success' ? 'bg-green-500' : ''}
                          ${notif.type === 'info' ? 'bg-blue-500' : ''}
                        `} />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{notif.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-100">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Ver todas las notificaciones
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Menú de Usuario */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className={`text-xs px-2 py-0.5 rounded-full ${roleBadge.color}`}>
                  {roleBadge.text}
                </p>
              </div>
              <ChevronDown size={16} className="text-gray-600" />
            </button>

            {/* Dropdown de usuario */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="font-semibold text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500">usuario@email.com</p>
                </div>
                <Link
                  to="/dashboard/perfil"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowUserMenu(false)}
                >
                  👤 Mi Perfil
                </Link>
                <Link
                  to="/dashboard/configuracion"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowUserMenu(false)}
                >
                  ⚙️ Configuración
                </Link>
                <hr className="my-2 border-gray-100" />
                <button
                  onClick={() => {
                    // Lógica de cerrar sesión
                    console.log('Cerrar sesión')
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  🚪 Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

