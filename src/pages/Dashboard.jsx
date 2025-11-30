import { motion } from 'framer-motion'
import { FiLogOut, FiPackage, FiShoppingCart, FiUsers, FiBarChart } from 'react-icons/fi'

const Dashboard = () => {
  const handleLogout = () => {
    // TODO: Implementar logout real
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ortomediq</h1>
              <p className="text-sm text-gray-600">Sistema de Gestión</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FiLogOut />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Welcome */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Bienvenido al Dashboard
            </h2>
            <p className="text-gray-600">
              Panel de control temporal - En construcción
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FiPackage className="text-2xl text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">245</span>
              </div>
              <h3 className="text-gray-600 font-medium">Productos</h3>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FiShoppingCart className="text-2xl text-green-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">128</span>
              </div>
              <h3 className="text-gray-600 font-medium">Ventas</h3>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FiUsers className="text-2xl text-purple-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">89</span>
              </div>
              <h3 className="text-gray-600 font-medium">Clientes</h3>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <FiBarChart className="text-2xl text-orange-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">$45.2K</span>
              </div>
              <h3 className="text-gray-600 font-medium">Ingresos</h3>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Accesos Rápidos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                <FiShoppingCart className="text-2xl text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 text-sm font-medium">Nueva Venta</p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                <FiPackage className="text-2xl text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 text-sm font-medium">Ver Productos</p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                <FiUsers className="text-2xl text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 text-sm font-medium">Clientes</p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                <FiBarChart className="text-2xl text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 text-sm font-medium">Reportes</p>
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default Dashboard








