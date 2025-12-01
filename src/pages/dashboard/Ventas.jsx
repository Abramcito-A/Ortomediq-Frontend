import { useState, useEffect } from 'react'
import { Search, TrendingUp, Calendar, DollarSign, ShoppingCart, Filter, Download, Eye } from 'lucide-react'
import { motion } from 'framer-motion'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const Ventas = () => {
  const [ventas, setVentas] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDate, setFilterDate] = useState('mes')
  const [selectedSale, setSelectedSale] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [userRole] = useState(localStorage.getItem('userRole') || 'empleado')

  // Colores para gráficos
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

  // Cargar ventas desde localStorage
  useEffect(() => {
    // Las ventas son transacciones completadas en punto de venta (no pedidos de clientes)
    const ventasStorage = JSON.parse(localStorage.getItem('pointOfSaleVentas')) || []
    
    // Si no hay ventas en punto de venta, crear datos de ejemplo
    if (ventasStorage.length === 0) {
      const ventasEjemplo = [
        {
          id: 2001,
          codigo: 'ORZ-VTA-001',
          cliente: 'Juan Pérez',
          email: 'juan@email.com',
          total: 124.48,
          subtotal: 124.48,
          descuento: 0,
          items: [
            { nombre: 'Rodillera Deportiva', cantidad: 2, precio: 45.99 }
          ],
          fecha: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          estado: 'completado',
          metodoPago: 'efectivo'
        },
        {
          id: 2002,
          codigo: 'ORZ-VTA-002',
          cliente: 'María García',
          email: 'maria@email.com',
          total: 97.99,
          subtotal: 102.99,
          descuento: 5.00,
          items: [
            { nombre: 'Faja Lumbar', cantidad: 1, precio: 65.00 },
            { nombre: 'Plantillas', cantidad: 2, precio: 28.50 }
          ],
          fecha: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          estado: 'completado',
          metodoPago: 'tarjeta'
        },
        {
          id: 2003,
          codigo: 'ORZ-VTA-003',
          cliente: 'Carlos López',
          email: 'carlos@email.com',
          total: 156.50,
          subtotal: 156.50,
          descuento: 0,
          items: [
            { nombre: 'Muletas Ajustables', cantidad: 2, precio: 35.50 },
            { nombre: 'Tobillera', cantidad: 1, precio: 45.50 }
          ],
          fecha: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          estado: 'completado',
          metodoPago: 'transferencia'
        },
        {
          id: 2004,
          codigo: 'ORZ-VTA-004',
          cliente: 'Patricia Martínez',
          email: 'patricia@email.com',
          total: 89.99,
          subtotal: 89.99,
          descuento: 0,
          items: [
            { nombre: 'Vendaje Elástico', cantidad: 3, precio: 12.99 },
            { nombre: 'Protección Rodilla', cantidad: 1, precio: 52.02 }
          ],
          fecha: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          estado: 'completado',
          metodoPago: 'efectivo'
        },
        {
          id: 2005,
          codigo: 'ORZ-VTA-005',
          cliente: 'Roberto Sánchez',
          email: 'roberto@email.com',
          total: 234.50,
          subtotal: 234.50,
          descuento: 0,
          items: [
            { nombre: 'Set Completo Protección', cantidad: 1, precio: 234.50 }
          ],
          fecha: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          estado: 'completado',
          metodoPago: 'tarjeta'
        }
      ]

      setVentas(ventasEjemplo)
      localStorage.setItem('pointOfSaleVentas', JSON.stringify(ventasEjemplo))
    } else {
      setVentas(ventasStorage)
    }
  }, [])

  // Calcular estadísticas
  const calcularEstadisticas = () => {
    const totalVentas = ventas.reduce((sum, venta) => sum + venta.total, 0)
    const cantidadVentas = ventas.length
    const ticketPromedio = cantidadVentas > 0 ? totalVentas / cantidadVentas : 0

    const porMetodo = {}
    ventas.forEach(venta => {
      porMetodo[venta.metodoPago] = (porMetodo[venta.metodoPago] || 0) + venta.total
    })

    return { totalVentas, cantidadVentas, ticketPromedio, porMetodo }
  }

  // Datos para gráfico de línea (últimos 7 días)
  const generarDatosGraficoLinea = () => {
    const dias = []
    for (let i = 6; i >= 0; i--) {
      const fecha = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      const fechaStr = fecha.toLocaleDateString('es-MX', { month: 'short', day: 'numeric' })
      
      const ventasDelDia = ventas.filter(v => {
        const vFecha = new Date(v.fecha)
        return vFecha.toDateString() === fecha.toDateString()
      }).reduce((sum, v) => sum + v.total, 0)

      dias.push({
        fecha: fechaStr,
        ventas: ventasDelDia
      })
    }
    return dias
  }

  // Datos para gráfico de pastel (métodos de pago)
  const generarDatosGraficoPastel = () => {
    const { porMetodo } = calcularEstadisticas()
    return Object.entries(porMetodo).map(([metodo, total]) => ({
      name: metodo.charAt(0).toUpperCase() + metodo.slice(1),
      value: total
    }))
  }

  // Filtrar ventas
  const ventasFiltradas = ventas.filter(venta => {
    return (
      venta.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venta.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venta.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const stats = calcularEstadisticas()
  const datosLinea = generarDatosGraficoLinea()
  const datosPastel = generarDatosGraficoPastel()

  const openDetails = (venta) => {
    setSelectedSale(venta)
    setShowDetails(true)
  }

  const closeDetails = () => {
    setShowDetails(false)
    setSelectedSale(null)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ventas</h1>
          <p className="text-gray-600 mt-1">
            {userRole === 'admin' 
              ? 'Registro y análisis de todas tus ventas'
              : 'Registro de ventas realizadas'
            }
          </p>
        </div>
        {userRole === 'admin' && (
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download size={20} />
            Exportar
          </button>
        )}
      </div>

      {/* Tarjetas de estadísticas - Solo para Admin */}
      {userRole === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total de ventas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Ventas</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${stats.totalVentas.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="text-blue-600" size={24} />
              </div>
            </div>
          </motion.div>

          {/* Cantidad de ventas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Cantidad de Ventas</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.cantidadVentas}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <ShoppingCart className="text-green-600" size={24} />
              </div>
            </div>
          </motion.div>

          {/* Ticket promedio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Ticket Promedio</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${stats.ticketPromedio.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
            </div>
          </motion.div>

          {/* Métodos de pago */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <p className="text-sm text-gray-600 font-medium mb-3">Métodos de Pago</p>
            <div className="space-y-2">
              {Object.entries(stats.porMetodo).map(([metodo, total]) => (
                <div key={metodo} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700 capitalize">{metodo}</span>
                  <span className="font-semibold text-gray-900">${total.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Gráficos - Solo para Admin */}
      {userRole === 'admin' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de línea */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ventas por Día (últimos 7 días)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={datosLinea}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="ventas" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6' }}
                  name="Ventas ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Gráfico de pastel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Métodos de Pago</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={datosPastel}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${value.toFixed(0)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {datosPastel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      )}

      {/* Búsqueda y filtros */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-4 space-y-4"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por código, cliente, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </motion.div>

      {/* Tabla de ventas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        {ventasFiltradas.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingCart className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 text-lg">No se encontraron ventas</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Código</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Método</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {ventasFiltradas.map((venta) => (
                  <motion.tr
                    key={venta.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                    className="transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-blue-600">{venta.codigo}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{venta.cliente}</p>
                        <p className="text-xs text-gray-500">{venta.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{formatDate(venta.fecha)}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                        {venta.metodoPago}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">${venta.total.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => openDetails(venta)}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Modal de detalles */}
      {showDetails && selectedSale && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Detalles de la Venta</h2>
                <p className="text-blue-100">{selectedSale.codigo}</p>
              </div>
              <button
                onClick={closeDetails}
                className="text-white hover:bg-blue-700 p-2 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Información del cliente */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Cliente</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Nombre</p>
                    <p className="font-semibold text-gray-900">{selectedSale.cliente}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">{selectedSale.email}</p>
                  </div>
                </div>
              </div>

              {/* Información de la venta */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de la Venta</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Fecha</p>
                    <p className="font-semibold text-gray-900">{formatDate(selectedSale.fecha)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Método de Pago</p>
                    <p className="font-semibold text-gray-900 capitalize">{selectedSale.metodoPago}</p>
                  </div>
                </div>
              </div>

              {/* Productos */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Productos</h3>
                <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                  {selectedSale.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{item.nombre}</p>
                        <p className="text-sm text-gray-500">Cantidad: {item.cantidad} x ${item.precio.toFixed(2)}</p>
                      </div>
                      <p className="font-semibold text-gray-900">${(item.precio * item.cantidad).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totales */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen</h3>
                <div className="space-y-3 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Subtotal:</span>
                    <span className="font-semibold text-gray-900">${selectedSale.subtotal.toFixed(2)}</span>
                  </div>
                  {selectedSale.descuento > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Descuento:</span>
                      <span className="font-semibold">-${selectedSale.descuento.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-blue-200 pt-3 flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-blue-600">${selectedSale.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón cerrar */}
            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <button
                onClick={closeDetails}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Ventas
