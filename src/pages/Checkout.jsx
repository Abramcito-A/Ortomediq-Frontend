import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiCreditCard, FiMapPin, FiUser } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useCart } from '../hooks/useCart'
import { toast } from 'react-toastify'
import NavbarCatalogo from '../components/NavbarCatalogo'

const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, getSubtotal, getTotalDiscount, getTotal, clearCart } = useCart()

  // Estado del formulario
  const [formData, setFormData] = useState({
    // Información personal
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    // Dirección
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    colonia: '',
    ciudad: 'Torreón',
    estado: 'Coahuila',
    codigoPostal: '',
    // Notas
    notas: ''
  })

  const [metodoPago, setMetodoPago] = useState('efectivo') // efectivo, tarjeta, transferencia

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
    const camposRequeridos = ['nombre', 'apellido', 'email', 'telefono', 'calle', 'numeroExterior', 'colonia', 'codigoPostal']
    const camposFaltantes = camposRequeridos.filter(campo => !formData[campo])

    if (camposFaltantes.length > 0) {
      toast.error('Por favor completa todos los campos requeridos')
      return
    }

    // Simular proceso de pago
    toast.success('¡Pedido realizado con éxito! Nos pondremos en contacto contigo.')
    
    // Limpiar carrito
    clearCart()
    
    // Redirigir a página de confirmación o home
    setTimeout(() => {
      navigate('/productos')
    }, 2000)
  }

  const subtotal = getSubtotal()
  const descuento = getTotalDiscount()
  const envio = 0
  const total = getTotal(envio)

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
            Finalizar compra
          </h1>
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
                  Información personal
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
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>

            {/* Dirección de envío */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <FiMapPin className="text-blue-600" size={24} />
                <h2 className="text-xl font-bold text-gray-900">
                  Dirección de envío
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calle *
                  </label>
                  <input
                    type="text"
                    name="calle"
                    value={formData.calle}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número exterior *
                  </label>
                  <input
                    type="text"
                    name="numeroExterior"
                    value={formData.numeroExterior}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número interior
                  </label>
                  <input
                    type="text"
                    name="numeroInterior"
                    value={formData.numeroInterior}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Colonia *
                  </label>
                  <input
                    type="text"
                    name="colonia"
                    value={formData.colonia}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Código postal *
                  </label>
                  <input
                    type="text"
                    name="codigoPostal"
                    value={formData.codigoPostal}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <input
                    type="text"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    readOnly
                  />
                </div>
              </div>

              {/* Notas adicionales */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notas adicionales (opcional)
                </label>
                <textarea
                  name="notas"
                  value={formData.notas}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Referencias, indicaciones especiales, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </motion.div>

            {/* Método de pago */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <FiCreditCard className="text-blue-600" size={24} />
                <h2 className="text-xl font-bold text-gray-900">
                  Método de pago
                </h2>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
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
                    <p className="text-sm text-gray-500">Pago contra entrega</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
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
                    <p className="text-sm text-gray-500">Te enviaremos los datos bancarios</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
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
                    <p className="text-sm text-gray-500">Pago en terminal al recibir</p>
                  </div>
                </label>
              </div>
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
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.talla}-${item.color}`} className="flex gap-3">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 text-sm">
                      <p className="font-medium text-gray-900">{item.nombre}</p>
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

                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="font-medium text-green-600">Gratis</span>
                </div>
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

export default Checkout

