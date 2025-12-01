import { useState } from 'react'
import { FaUser, FaBars, FaTimes } from 'react-icons/fa'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  
  // TODO: Reemplazar con lógica real de autenticación cuando esté lista
  // Por ahora, simulamos que el usuario NO está logueado
  const isLoggedIn = false // Cambiar a true para probar vista de usuario logueado
  const userName = 'Usuario' // Nombre del usuario cuando esté logueado

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      setMenuOpen(false) // Cerrar menú móvil si está abierto
    }
  }

  const handleLogoClick = (e) => {
    // Si estamos en la página Home (existe el elemento #inicio)
    const inicioElement = document.getElementById('inicio')
    if (inicioElement) {
      e.preventDefault() // Prevenir navegación
      scrollToSection('inicio') // Hacer scroll suave
    }
    // Si no estamos en Home, dejará que navegue normalmente a "/"
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO - Izquierda */}
          <div className="flex-shrink-0">
            <a 
              href="/" 
              onClick={handleLogoClick}
              className="flex items-center cursor-pointer"
            >
              <div className="text-2xl md:text-3xl font-bold text-blue-600">
                Ortomediq
              </div>
            </a>
          </div>

          {/* MENÚ - Derecha (Desktop) */}
          <div className="hidden lg:flex items-center gap-6">
            <a 
              href="/productos" 
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
            >
              Catalogo
            </a>
            <button 
              onClick={() => scrollToSection('contacto')}
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
            >
              Contacto
            </button>
            
            {/* Mostrar según estado de autenticación */}
            {isLoggedIn ? (
              // Usuario logueado - Mostrar perfil
              <a 
                href="/dashboard" 
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                <FaUser className="text-sm" />
                <span className="font-medium">{userName}</span>
              </a>
            ) : (
              // Usuario NO logueado - Mostrar Login y Registro
              <>
                <a 
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
                >
                  Iniciar Sesión
                </a>
                <a 
                  href="/register"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  <FaUser className="text-sm" />
                  <span className="font-medium">Registrarse</span>
                </a>
              </>
            )}
          </div>

          {/* BOTÓN HAMBURGUESA - Mobile */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Menú"
            >
              {menuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* MENÚ MOBILE - Desplegable */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-200 pb-4">
            <div className="flex flex-col gap-2 pt-4">
              <a
                href="/productos"
                className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-300 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Productos
              </a>
              <button
                onClick={() => scrollToSection('contacto')}
                className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-300 font-medium text-left"
              >
                Contacto
              </button>
              
              {/* Mostrar según estado de autenticación */}
              {isLoggedIn ? (
                // Usuario logueado - Mostrar perfil
                <a
                  href="/dashboard"
                  className="px-4 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition duration-300 font-medium flex items-center justify-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaUser />
                  <span>{userName}</span>
                </a>
              ) : (
                // Usuario NO logueado - Mostrar Login y Registro
                <>
                  <a
                    href="/login"
                    className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-300 font-medium text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </a>
                  <a
                    href="/register"
                    className="px-4 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition duration-300 font-medium flex items-center justify-center gap-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaUser />
                    <span>Registrarse</span>
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

