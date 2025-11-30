import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiUser, FiMenu, FiX, FiHome, FiShoppingBag, FiSearch } from 'react-icons/fi'
import CartBadge from './carrito/CartBadge'

const NavbarCatalogo = ({ showSearch = false, searchValue = '', onSearchChange = null }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleSearchChange = (e) => {
    if (onSearchChange) {
      onSearchChange(e.target.value)
    }
  }

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Primera fila: Logo, Links, Acciones */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Ortomediq</h1>
          </Link>

          {/* Links - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <FiHome size={18} />
              <span>Inicio</span>
            </Link>
            <Link
              to="/productos"
              className={`flex items-center gap-2 font-medium transition-colors ${
                isActive('/productos') || location.pathname.startsWith('/productos/')
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <FiShoppingBag size={18} />
              <span>Productos</span>
            </Link>
          </div>

          {/* Acciones - Desktop y Mobile */}
          <div className="flex items-center gap-2">
            {/* Cart Badge - Siempre visible */}
            <CartBadge />
            
            {/* User Icon - Desktop */}
            <Link
              to="/login"
              className="hidden md:flex p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Mi cuenta"
            >
              <FiUser size={24} />
            </Link>

            {/* Botón hamburguesa - Mobile */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Menú"
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Segunda fila: Buscador (solo si showSearch es true) */}
        {showSearch && (
          <div className="border-t border-gray-100 py-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchValue}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        )}

        {/* Menú Mobile - Desplegable */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                  isActive('/')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <FiHome size={20} />
                <span>Inicio</span>
              </Link>
              <Link
                to="/productos"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                  isActive('/productos') || location.pathname.startsWith('/productos/')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <FiShoppingBag size={20} />
                <span>Productos</span>
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                <FiUser size={20} />
                <span>Mi cuenta</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavbarCatalogo

