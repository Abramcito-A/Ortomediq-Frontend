import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiEye } from 'react-icons/fi'

const ProductCard = ({ producto }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col border border-gray-200"
      style={{ height: '100%' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Imagen */}
      <Link to={`/productos/${producto.id}`} className="block relative overflow-hidden bg-gray-50 aspect-square group">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Información del producto - Flex grow para ocupar espacio disponible */}
      <div className="p-3 flex flex-col flex-grow">
        {/* Contenido superior */}
        <div className="flex-grow space-y-2">
          {/* Marca */}
          <p className="text-xs text-gray-500 uppercase tracking-wide">{producto.marca}</p>

          {/* Nombre - Altura fija de 2 líneas */}
          <Link to={`/productos/${producto.id}`}>
            <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 text-sm leading-snug h-10">
              {producto.nombre}
            </h3>
          </Link>

          {/* Precio y Stock en una línea */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xl font-bold text-blue-600">
              ${producto.precio.toFixed(2)}
            </span>
            {producto.stock > 0 ? (
              <span className="text-xs font-medium text-green-600">
                ✓ Stock
              </span>
            ) : (
              <span className="text-xs font-medium text-red-600">
                Sin stock
              </span>
            )}
          </div>
        </div>

        {/* Botón ver detalles - Siempre al fondo con margin-top fijo */}
        <Link
          to={`/productos/${producto.id}`}
          className="w-full bg-blue-600 text-white py-2 px-3 rounded-md font-medium hover:bg-blue-700 transition-all flex items-center justify-center gap-1.5 text-sm mt-3"
        >
          <FiEye />
          Ver detalles
        </Link>
      </div>
    </motion.div>
  )
}

export default ProductCard

