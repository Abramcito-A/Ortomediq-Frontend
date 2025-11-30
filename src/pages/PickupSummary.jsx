import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiCreditCard, FiUser, FiPhone, FiMail } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useCart } from '../hooks/useCart'
import { toast } from 'react-toastify'
import NavbarCatalogo from '../components/NavbarCatalogo'

const PickupSummary = () => {
  const navigate = useNavigate()
  const { cartItems, getSubtotal, getTotalDiscount, getTotal, clearCart } = useCart()

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  })

  const [metodoPago, setMetodoPago] = useState('efectivo')

  // Si el carrito está vacío, redirigir
  if (cartItems.length === 0) {
    navigate('/carrito')
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validar campos requeridos
    const camposRequeridos = ['nombre', 'apellido', 'email', 'telefono']
    const camposFaltantes = camposRequeridos.filter(campo => !formData[campo])

    if (camposFaltantes.length > 0) {
      toast.error('Por favor completa todos los campos requeridos')
      return
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Por favor ingresa un email válido')
      return
    }

    // Guardar datos y redirigir a checkout
    localStorage.setItem('pickupCustomerInfo', JSON.stringify({
      ...formData,
      metodoPago
    }))

    navigate('/checkout-pickup')
  }

  const subtotal = getSubtotal()
  const descuento = getTotalDiscount()
  const total = getTotal(0)

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarCatalogo />
      
      {/* Espaciador para navbar fixed */}
      <div className="h-16"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/carrito"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <FiArrowLeft />
            Volver al carrito
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Recogida en tienda
          </h1>
          <p className="text-gray-600 mt-2">
            Completa tus datos y confirma tu pedido. Lo recogerás en nuestra tienda.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información personal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <FiUser className="text-blue-600" size={24} />
                <h2 className="text-xl font-bold text-gray-900">
                  Información de contacto
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Juan"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    placeholder="Pérez"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="juan.perez@email.com"
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono *
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="871-123-4567"
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Método de pago */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <FiCreditCard className="text-blue-600" size={24} />
                <h2 className="text-xl font-bold text-gray-900">
                  Método de pago
                </h2>
              </div>

              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  metodoPago === 'efectivo' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="metodoPago"
                    value="efectivo"
                    checked={metodoPago === 'efectivo'}
                    onChange={(e) => setMetodoPago(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Efectivo</p>
                    <p className="text-sm text-gray-500">Paga al momento de recoger</p>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  metodoPago === 'tarjeta' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="metodoPago"
                    value="tarjeta"
                    checked={metodoPago === 'tarjeta'}
                    onChange={(e) => setMetodoPago(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Tarjeta de crédito/débito</p>
                    <p className="text-sm text-gray-500">Pago en terminal al recoger</p>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  metodoPago === 'transferencia' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="metodoPago"
                    value="transferencia"
                    checked={metodoPago === 'transferencia'}
                    onChange={(e) => setMetodoPago(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Transferencia bancaria</p>
                    <p className="text-sm text-gray-500">Recibe los datos al confirmar</p>
                  </div>
                </label>
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>ℹ️ Información:</strong> Al confirmar tu pedido, recibirás un código de recogida por email. Usa este código para identificar tu pedido.
                </p>
              </div>
            </motion.div>

            {/* Instrucciones de recogida */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-green-50 border border-green-200 rounded-xl p-6"
            >
              <h3 className="font-semibold text-green-900 mb-3">📍 Instrucciones de recogida</h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li>✓ Tu pedido estará listo en 2-5 días hábiles</li>
                <li>✓ Te enviaremos un código de recogida por email</li>
                <li>✓ Presenta el código o tu número de teléfono en tienda</li>
                <li>✓ Realiza el pago según el método seleccionado</li>
              </ul>
            </motion.div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 sticky top-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Resumen del pedido
              </h2>

              {/* Productos */}
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.talla}-${item.color}`} className="flex gap-3">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 text-sm">
                      <p className="font-medium text-gray-900 line-clamp-2">{item.nombre}</p>
                      <p className="text-xs text-gray-500">
                        {item.talla} • {item.color} • x{item.cantidad}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        ${(item.precio * item.cantidad).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totales */}
              <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
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
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Botón confirmar pedido */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Confirmar pedido
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Al confirmar, aceptas nuestros términos y condiciones
              </p>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PickupSummary
