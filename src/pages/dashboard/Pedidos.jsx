import { useState, useEffect } from 'react'
import { Search, ChevronDown, Eye, Printer, Truck, CheckCircle, Clock, AlertCircle, Filter } from 'lucide-react'
import { motion } from 'framer-motion'

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [sortBy, setSortBy] = useState('fecha')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  // Estados posibles
  const estados = [
    { id: 'confirmado', nombre: 'Confirmado', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
    { id: 'completado', nombre: 'Completado', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    { id: 'pendiente', nombre: 'Pendiente', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    { id: 'cancelado', nombre: 'Cancelado', color: 'bg-red-100 text-red-800', icon: AlertCircle }
  ]

  // Cargar pedidos desde localStorage y crear ejemplos si no existen
  useEffect(() => {
    let ordersFromStorage = JSON.parse(localStorage.getItem('userOrders')) || []

    // Crear pedidos de ejemplo si no hay suficientes
    if (ordersFromStorage.length < 5) {
      const pedidosEjemplo = [
        {
          id: 1001,
          pickupCode: 'ORZ-XYZ789-2025',
          pickupDate: '3 de diciembre de 2025',
          customerInfo: {
            nombre: 'Carlos',
            apellido: 'García',
            email: 'carlos.garcia@email.com',
            telefono: '871-555-4567'
          },
          items: [
            { nombre: 'Rodillera Deportiva', precio: 45.99, cantidad: 1 },
            { nombre: 'Plantillas Ortopédicas', precio: 28.50, cantidad: 2 }
          ],
          subtotal: 102.99,
          descuento: 5.00,
          total: 97.99,
          status: 'confirmado',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          paidAt: null
        },
        {
          id: 1002,
          pickupCode: 'ORZ-DEF456-2025',
          pickupDate: '4 de diciembre de 2025',
          customerInfo: {
            nombre: 'María',
            apellido: 'López',
            email: 'maria.lopez@email.com',
            telefono: '871-555-8901'
          },
          items: [
            { nombre: 'Faja Lumbar Premium', precio: 65.00, cantidad: 1 }
          ],
          subtotal: 65.00,
          descuento: 0,
          total: 65.00,
          status: 'completado',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          paidAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 1003,
          pickupCode: 'ORZ-GHI123-2025',
          pickupDate: '6 de diciembre de 2025',
          customerInfo: {
            nombre: 'Roberto',
            apellido: 'Martínez',
            email: 'roberto.m@email.com',
            telefono: '871-555-2345'
          },
          items: [
            { nombre: 'Muletas Ajustables', precio: 35.50, cantidad: 2 },
            { nombre: 'Vendaje Elástico', precio: 12.99, cantidad: 3 }
          ],
          subtotal: 110.47,
          descuento: 0,
          total: 110.47,
          status: 'pendiente',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          paidAt: null
        },
        {
          id: 1004,
          pickupCode: 'ORZ-JKL890-2025',
          pickupDate: '2 de diciembre de 2025',
          customerInfo: {
            nombre: 'Patricia',
            apellido: 'Rodríguez',
            email: 'patricia.r@email.com',
            telefono: '871-555-6789'
          },
          items: [
            { nombre: 'Tobillera de Soporte', precio: 32.00, cantidad: 1 }
          ],
          subtotal: 32.00,
          descuento: 3.20,
          total: 28.80,
          status: 'completado',
          createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          paidAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]

      ordersFromStorage = [...ordersFromStorage, ...pedidosEjemplo]
      localStorage.setItem('userOrders', JSON.stringify(ordersFromStorage))
    }

    setPedidos(ordersFromStorage)
  }, [])

  // Filtrar y ordenar pedidos
  const pedidosFiltrados = pedidos
    .filter(pedido => {
      const matchSearch = 
        pedido.pickupCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pedido.customerInfo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pedido.customerInfo.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pedido.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchStatus = statusFilter === 'todos' || pedido.status === statusFilter
      
      return matchSearch && matchStatus
    })
    .sort((a, b) => {
      if (sortBy === 'fecha') {
        return new Date(b.createdAt) - new Date(a.createdAt)
      } else if (sortBy === 'total') {
        return b.total - a.total
      }
      return 0
    })

  const getStatusInfo = (status) => {
    return estados.find(e => e.id === status) || estados[0]
  }

  const openDetails = (pedido) => {
    setSelectedOrder(pedido)
    setShowDetails(true)
  }

  const closeDetails = () => {
    setShowDetails(false)
    setSelectedOrder(null)
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
          <h1 className="text-3xl font-bold text-gray-900">Pedidos</h1>
          <p className="text-gray-600 mt-1">Gestiona todos los pedidos de recogida</p>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-4 space-y-4"
      >
        {/* Búsqueda */}
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

        {/* Filtros */}
        <div className="flex gap-3 flex-wrap">
          {/* Filtro por estado */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Estado</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="todos">Todos</option>
              {estados.map(est => (
                <option key={est.id} value={est.id}>{est.nombre}</option>
              ))}
            </select>
          </div>

          {/* Ordenar por */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Ordenar por</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="fecha">Fecha más reciente</option>
              <option value="total">Mayor monto</option>
            </select>
          </div>

          {/* Contador */}
          <div className="flex items-end">
            <span className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
              {pedidosFiltrados.length} pedido{pedidosFiltrados.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Tabla de pedidos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        {pedidosFiltrados.length === 0 ? (
          <div className="p-12 text-center">
            <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 text-lg">No se encontraron pedidos</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Código</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Fecha Recogida</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pedidosFiltrados.map((pedido) => {
                  const statusInfo = getStatusInfo(pedido.status)
                  return (
                    <motion.tr
                      key={pedido.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                      className="transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-blue-600">{pedido.pickupCode}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {pedido.customerInfo.nombre} {pedido.customerInfo.apellido}
                          </p>
                          <p className="text-xs text-gray-500">{pedido.customerInfo.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm text-gray-900">{pedido.pickupDate}</p>
                          <p className="text-xs text-gray-500">{formatDate(pedido.createdAt)}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900">${pedido.total.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusInfo.color}`}>
                          {statusInfo.nombre}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openDetails(pedido)}
                            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Ver detalles"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Imprimir"
                          >
                            <Printer size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Modal de detalles */}
      {showDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Detalles del Pedido</h2>
                <p className="text-blue-100">{selectedOrder.pickupCode}</p>
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
                    <p className="font-semibold text-gray-900">
                      {selectedOrder.customerInfo.nombre} {selectedOrder.customerInfo.apellido}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Teléfono</p>
                    <p className="font-semibold text-gray-900">{selectedOrder.customerInfo.telefono}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">{selectedOrder.customerInfo.email}</p>
                  </div>
                </div>
              </div>

              {/* Información del pedido */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Pedido</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Fecha de creación</p>
                    <p className="font-semibold text-gray-900">{formatDate(selectedOrder.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fecha de recogida</p>
                    <p className="font-semibold text-gray-900">{selectedOrder.pickupDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estado</p>
                    <div className="mt-1">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusInfo(selectedOrder.status).color}`}>
                        {getStatusInfo(selectedOrder.status).nombre}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Código de recogida</p>
                    <p className="font-semibold text-blue-600 text-lg">{selectedOrder.pickupCode}</p>
                  </div>
                </div>
              </div>

              {/* Productos */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Productos</h3>
                <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{item.nombre}</p>
                        <p className="text-sm text-gray-500">Cantidad: {item.cantidad}</p>
                      </div>
                      <p className="font-semibold text-gray-900">${(item.precio * item.cantidad).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totales */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen de pago</h3>
                <div className="space-y-3 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Subtotal:</span>
                    <span className="font-semibold text-gray-900">${selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  {selectedOrder.descuento > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Descuento:</span>
                      <span className="font-semibold">-${selectedOrder.descuento.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-blue-200 pt-3 flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-blue-600">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="bg-gray-50 p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={closeDetails}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cerrar
              </button>
              <button
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Printer size={18} />
                Imprimir
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Pedidos
