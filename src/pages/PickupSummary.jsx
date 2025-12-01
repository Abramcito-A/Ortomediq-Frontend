import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiUser, FiPhone, FiMail, FiCopy, FiCheck } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useCart } from '../hooks/useCart'
import { toast } from 'react-toastify'
import NavbarCatalogo from '../components/NavbarCatalogo'
import { generatePickupCode, getPickupDate } from '../utils/generatePickupCode'

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

  // Estado del modal de confirmación
  const [showModal, setShowModal] = useState(false)
  const [pickupCode, setPickupCode] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [copiedCode, setCopiedCode] = useState(false)

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

    // Generar código de recogida
    const codigo = generatePickupCode()
    const fecha = getPickupDate()

    // Guardar datos en localStorage
    const order = {
      id: Date.now(),
      pickupCode: codigo,
      pickupDate: fecha,
      customerInfo: formData,
      items: cartItems,
      subtotal: getSubtotal(),
      descuento: getTotalDiscount(),
      total: getTotal(0),
      status: 'confirmado',
      createdAt: new Date().toISOString()
    }

    // Guardar en localStorage
    const existingOrders = JSON.parse(localStorage.getItem('userOrders')) || []
    localStorage.setItem('userOrders', JSON.stringify([...existingOrders, order]))

    // Mostrar modal con el código
    setPickupCode(codigo)
    setPickupDate(fecha)
    setShowModal(true)
    toast.success('¡Pedido confirmado exitosamente!')
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pickupCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const handleCloseModal = () => {
    clearCart()
    setShowModal(false)
    navigate('/')
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

        {/* Modal de confirmación con código */}
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              // Evitar cerrar si se hace clic en el modal (no en el fondo)
              if (e.target === e.currentTarget) {
                // No hacer nada - el usuario no puede cerrar con ESC o fondo
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              {/* Header del modal */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-8 text-white text-center">
                <div className="text-5xl mb-3">✓</div>
                <h2 className="text-2xl font-bold">¡Pedido Confirmado!</h2>
                <p className="text-green-100 mt-2">Tu compra se ha registrado exitosamente</p>
              </div>

              {/* Contenido del modal */}
              <div className="p-6 space-y-6">
                {/* Código de recogida */}
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">Tu código de recogida</p>
                  <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-blue-300">
                    <code className="text-3xl font-bold text-blue-600 tracking-widest">
                      {pickupCode}
                    </code>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className={`mt-3 flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      copiedCode
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  >
                    {copiedCode ? (
                      <>
                        <FiCheck size={18} />
                        Copiado
                      </>
                    ) : (
                      <>
                        <FiCopy size={18} />
                        Copiar código
                      </>
                    )}
                  </button>
                </div>

                {/* Información de recogida */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">📍 Instrucciones de recogida</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex gap-3">
                      <span className="text-blue-600 font-bold">1.</span>
                      <p><strong>Fecha de recogida:</strong> {pickupDate}</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-blue-600 font-bold">2.</span>
                      <p>Presenta este código o tu teléfono en tienda</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-blue-600 font-bold">3.</span>
                      <p>Verifica que todos tus productos sean correctos</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-blue-600 font-bold">4.</span>
                      <p>Realiza el pago en tienda</p>
                    </div>
                  </div>
                </div>

                {/* Información de contacto confirmada */}
                <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-2">
                  <p><strong>📧 Email:</strong> {formData.email}</p>
                  <p><strong>📱 Teléfono:</strong> {formData.telefono}</p>
                  <p className="text-gray-500 text-xs mt-3">
                    Te enviaremos confirmación y recordatorio de recogida a estos contactos
                  </p>
                </div>

                {/* Botones de acción */}
                <button
                  onClick={handleCloseModal}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Ir a inicio
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default PickupSummary
