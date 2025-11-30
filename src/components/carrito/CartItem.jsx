import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart()

  const handleDecrease = () => {
    if (item.cantidad > 1) {
      updateQuantity(item.id, item.talla, item.color, item.cantidad - 1)
    }
  }

  const handleIncrease = () => {
    if (item.cantidad < item.stock) {
      updateQuantity(item.id, item.talla, item.color, item.cantidad + 1)
    }
  }

  const handleRemove = () => {
    removeFromCart(item.id, item.talla, item.color)
  }

  const subtotal = item.precio * item.cantidad
  const tieneDescuento = item.precioOriginal > item.precio

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      {/* Imagen */}
      <Link to={`/productos/${item.id}`} className="flex-shrink-0">
        <img
          src={item.imagen}
          alt={item.nombre}
          className="w-24 h-24 object-cover rounded-lg"
        />
      </Link>

      {/* Información */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Nombre y marca */}
        <div>
          <Link to={`/productos/${item.id}`}>
            <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
              {item.nombre}
            </h3>
          </Link>
          <p className="text-xs text-gray-500">{item.marca}</p>
        </div>

        {/* Variantes */}
        <div className="flex gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Talla:</span> {item.talla}
          </div>
          <div>
            <span className="font-medium">Color:</span> {item.color}
          </div>
        </div>

        {/* Controles de cantidad */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrease}
            disabled={item.cantidad <= 1}
            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiMinus size={14} />
          </button>
          <span className="w-10 text-center font-medium">{item.cantidad}</span>
          <button
            onClick={handleIncrease}
            disabled={item.cantidad >= item.stock}
            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiPlus size={14} />
          </button>
          <span className="text-xs text-gray-500 ml-2">
            ({item.stock} disponibles)
          </span>
        </div>
      </div>

      {/* Precio y eliminar */}
      <div className="flex flex-col items-end justify-between">
        {/* Precio */}
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">
            ${subtotal.toFixed(2)}
          </p>
          {tieneDescuento && (
            <p className="text-xs text-gray-400 line-through">
              ${(item.precioOriginal * item.cantidad).toFixed(2)}
            </p>
          )}
          <p className="text-xs text-gray-500">
            ${item.precio.toFixed(2)} c/u
          </p>
        </div>

        {/* Botón eliminar */}
        <button
          onClick={handleRemove}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title="Eliminar del carrito"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  )
}

export default CartItem



