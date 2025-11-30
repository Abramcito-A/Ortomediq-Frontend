import { useCart } from '../../hooks/useCart'
import { Link } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'

const CartSummary = ({ showCheckoutButton = true }) => {
  const { cartItems, getSubtotal, getTotalDiscount, getTotal, getTotalItems } = useCart()

  const subtotal = getSubtotal()
  const descuento = getTotalDiscount()
  const envio = 0 // Por ahora sin costo de envío
  const total = getTotal(envio)

  if (cartItems.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Resumen del pedido
      </h2>

      {/* Detalle de costos */}
      <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({getTotalItems()} productos)</span>
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
          <span className="font-medium">
            {envio === 0 ? 'Gratis' : `$${envio.toFixed(2)}`}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-blue-600">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Botón de checkout */}
      {showCheckoutButton && (
        <Link
          to="/pickup-summary"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <FiShoppingBag />
          Proceder a recogida
        </Link>
      )}

      {/* Mensaje de envío gratis */}
      {envio === 0 && (
        <p className="text-xs text-gray-500 text-center mt-4">
          🏪 ¡Recogida gratis en tienda!
        </p>
      )}

      {/* Continuar comprando */}
      <Link
        to="/productos"
        className="block text-center text-sm text-blue-600 hover:text-blue-700 mt-4"
      >
        ← Continuar comprando
      </Link>
    </div>
  )
}

export default CartSummary



