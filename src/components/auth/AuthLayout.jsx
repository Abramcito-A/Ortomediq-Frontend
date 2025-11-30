import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Lado Izquierdo - Branding/Imagen (FIJO - sin scroll) */}
      <motion.div 
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 relative overflow-hidden"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decoración de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Contenido */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center"
          >
            {/* Logo */}
            <div className="mb-8">
              <h1 className="text-6xl font-bold mb-2">Ortomediq</h1>
              <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
            </div>

            {/* Mensaje */}
            <h2 className="text-3xl font-semibold mb-4">
              Tu bienestar es nuestra prioridad
            </h2>
            <p className="text-blue-100 text-lg max-w-md mx-auto">
              Especialistas en aparatos ortopédicos en Torreón, Coahuila. 
              Mejorando tu calidad de vida desde hace más de 10 años.
            </p>

            {/* Características */}
            <div className="mt-12 grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl mb-2">🏥</div>
                <p className="text-sm">Calidad Garantizada</p>
              </div>
              <div>
                <div className="text-4xl mb-2">👨‍⚕️</div>
                <p className="text-sm">Asesoría Experta</p>
              </div>
              <div>
                <div className="text-4xl mb-2">⚡</div>
                <p className="text-sm">Atención Rápida</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Lado Derecho - Formulario (CON SCROLL INDEPENDIENTE) */}
      <div className="w-full lg:w-1/2 flex flex-col h-screen overflow-y-auto">
        {/* Header con botón volver - FIJO arriba */}
        <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-100">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FiArrowLeft />
            <span>Volver al inicio</span>
          </Link>
        </div>

        {/* Contenedor del formulario - CON SCROLL */}
        <div className="flex-1 flex items-start justify-center px-6 py-12">
          <motion.div 
            className="w-full max-w-md pb-8"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo móvil */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-4xl font-bold text-blue-600 mb-2">Ortomediq</h1>
              <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>

            {/* Título */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {title}
              </h2>
              {subtitle && (
                <p className="text-gray-600">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Formulario (children) */}
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout

