import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiCheck, FiCopy, FiCalendar, FiPhone, FiMail, FiDownload } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useCart } from '../hooks/useCart'
import { createPickupOrder } from '../utils/generatePickupCode'
import NavbarCatalogo from '../components/NavbarCatalogo'

const PickupConfirmation = () => {
  const navigate = useNavigate()
  const { cartItems, getSubtotal, getTotalDiscount, getTotal, clearCart } = useCart()
  const [order, setOrder] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Obtener info del cliente y método de pago del localStorage
    const customerInfo = localStorage.getItem('pickupCustomerInfo')
    const paymentMethod = JSON.parse(customerInfo)?.metodoPago || 'efectivo'
    const customer = JSON.parse(customerInfo)

    if (!cartItems.length || !customerInfo) {
      navigate('/carrito')
      return
    }

    // Crear el pedido
    const newOrder = createPickupOrder(
      cartItems,
      getTotal(0),
      customer,
      paymentMethod
    )
    
    setOrder(newOrder)

    // Guardar pedido en localStorage (en una app real sería en una BD)
    const orders = JSON.parse(localStorage.getItem('userOrders')) || []
    orders.push(newOrder)
    localStorage.setItem('userOrders', JSON.stringify(orders))

    // Limpiar carrito
    clearCart()
    localStorage.removeItem('pickupCustomerInfo')
  }, [])

  if (!order) {
    return null
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(order.pickupCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const subtotal = order.subtotal
  const descuento = order.discount
  const total = order.total

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <NavbarCatalogo />
      
      {/* Espaciador para navbar fixed */}
      <div className="h-16"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Confirmación exitosa */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <FiCheck className="text-green-600" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            ¡Pedido Confirmado!
          </h1>
          <p className="text-lg text-gray-600">
            Tu compra ha sido registrada exitosamente
          </p>
        </motion.div>

        {/* Código de recogida grande */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2 border-green-200"
        >
          <div className="text-center">
            <p className="text-gray-600 font-medium mb-2">Tu código de recogida</p>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 mb-4 font-mono">
                <p className="text-4xl font-bold text-blue-600 tracking-widest">
                  {order.pickupCode}
                </p>
              </div>
              <button
                onClick={handleCopyCode}
                className={`flex items-center gap-2 mx-auto px-4 py-2 rounded-lg font-medium transition-all ${
                  copied 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FiCopy size={18} />
                {copied ? 'Copiado!' : 'Copiar código'}
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Información importante */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Información de tu pedido
            </h2>

            <div className="space-y-4">
              {/* Fecha de recogida */}
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <FiCalendar className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Listo para recoger</p>
                  <p className="font-semibold text-gray-900">{order.pickupDate}</p>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <FiPhone className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Teléfono para recogida</p>
                  <p className="font-semibold text-gray-900">{order.customerInfo.telefono}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <FiMail className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Confirmación enviada a</p>
                  <p className="font-semibold text-gray-900 break-all">{order.customerInfo.email}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Instrucciones */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6"
          >
            <h2 className="text-xl font-bold text-green-900 mb-4">
              Próximos pasos
            </h2>

            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-200 text-green-700 font-bold flex items-center justify-center">
                  1
                </span>
                <div>
                  <p className="font-medium text-green-900">Guarda tu código</p>
                  <p className="text-sm text-green-800">Lo necesitarás al momento de la recogida</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-200 text-green-700 font-bold flex items-center justify-center">
                  2
                </span>
                <div>
                  <p className="font-medium text-green-900">Espera confirmación</p>
                  <p className="text-sm text-green-800">Te notificaremos cuando esté listo</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-200 text-green-700 font-bold flex items-center justify-center">
                  3
                </span>
                <div>
                  <p className="font-medium text-green-900">Recoge tu compra</p>
                  <p className="text-sm text-green-800">Presenta el código en tienda y realiza el pago</p>
                </div>
              </li>
            </ol>
          </motion.div>
        </div>

        {/* Resumen del pedido */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6 mt-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Resumen de compra
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <FiDownload size={18} />
              Descargar
            </button>
          </div>

          {/* Productos */}
          <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
            {order.items.map((item) => (
              <div key={`${item.id}-${item.talla}-${item.color}`} className="flex gap-4 justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.nombre}</p>
                  <p className="text-sm text-gray-600">
                    {item.talla} • {item.color} • Cantidad: {item.cantidad}
                  </p>
                </div>
                <p className="font-semibold text-gray-900">
                  ${(item.precio * item.cantidad).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Totales */}
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>

            {descuento > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Descuentos</span>
                <span className="font-medium">-${descuento.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
              <span>Total a pagar</span>
              <span className="text-blue-600">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Método de pago */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Método de pago:</strong>{' '}
              {order.paymentMethod === 'efectivo' && 'Efectivo'}
              {order.paymentMethod === 'tarjeta' && 'Tarjeta de crédito/débito'}
              {order.paymentMethod === 'transferencia' && 'Transferencia bancaria'}
            </p>
          </div>
        </motion.div>

        {/* Botones de acción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <Link
            to="/productos"
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
          >
            Continuar comprando
          </Link>
          <Link
            to="/dashboard"
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
          >
            Ver mis pedidos
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default PickupConfirmation
