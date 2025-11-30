import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import { useCart } from '../../hooks/useCart'
import { motion, AnimatePresence } from 'framer-motion'

const CartBadge = () => {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <Link
      to="/carrito"
      className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
      title="Ver carrito"
    >
      <FiShoppingCart size={24} />
      
      {/* Badge con cantidad */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          >
            {totalItems > 99 ? '99+' : totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  )
}

export default CartBadge



