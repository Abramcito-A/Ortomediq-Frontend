import { Link } from 'react-router-dom'
import { FiArrowLeft, FiShoppingBag } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useCart } from '../hooks/useCart'
import CartItem from '../components/carrito/CartItem'
import CartSummary from '../components/carrito/CartSummary'
import NavbarCatalogo from '../components/NavbarCatalogo'

const Carrito = () => {
  const { cartItems, clearCart } = useCart()

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarCatalogo />
      
      {/* Espaciador para navbar fixed */}
      <div className="h-16"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/productos"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <FiArrowLeft />
            Continuar comprando
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Carrito de compras
          </h1>
        </div>

        {/* Contenido */}
        {cartItems.length === 0 ? (
          // Carrito vacío
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-12 text-center"
          >
            <FiShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600 mb-6">
              ¡Agrega productos para empezar tu compra!
            </p>
            <Link
              to="/productos"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Ver catálogo
            </Link>
          </motion.div>
        ) : (
          // Carrito con productos
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-4">
              {/* Botón limpiar carrito */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">
                  {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'}
                </p>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Vaciar carrito
                </button>
              </div>

              {/* Items del carrito */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {cartItems.map((item) => (
                  <CartItem key={`${item.id}-${item.talla}-${item.color}`} item={item} />
                ))}
              </motion.div>
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Carrito

