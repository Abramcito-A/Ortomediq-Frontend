import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

const ProductGrid = ({ productos, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(12)].map((_, idx) => (
          <div key={idx} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
        ))}
      </div>
    )
  }

  if (productos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <svg
          className="w-24 h-24 text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No se encontraron productos
        </h3>
        <p className="text-gray-500">
          Intenta ajustar los filtros o la búsqueda
        </p>
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {productos.map((producto, idx) => (
        <motion.div
          key={producto.id}
          className="h-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05, duration: 0.3 }}
        >
          <ProductCard producto={producto} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default ProductGrid








