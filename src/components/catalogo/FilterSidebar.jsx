import { motion } from 'framer-motion'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useState } from 'react'

const FilterSidebar = ({ 
  categorias, 
  rangosPrecio, 
  filtrosActivos, 
  onCategoriaChange, 
  onPrecioChange,
  onLimpiarFiltros 
}) => {
  const [categoriasExpanded, setCategoriasExpanded] = useState(true)
  const [precioExpanded, setPrecioExpanded] = useState(true)

  const hasFiltros = filtrosActivos.categoria !== 'todas' || filtrosActivos.precio.length > 0

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm p-6 sticky top-6"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filtros</h2>
        {hasFiltros && (
          <button
            onClick={onLimpiarFiltros}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Categorías */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button
          onClick={() => setCategoriasExpanded(!categoriasExpanded)}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-base font-semibold text-gray-900">Categorías</h3>
          {categoriasExpanded ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        
        {categoriasExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-2 max-h-80 overflow-y-auto"
          >
            {categorias.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <input
                  type="radio"
                  name="categoria"
                  value={cat.id}
                  checked={filtrosActivos.categoria === cat.id}
                  onChange={(e) => onCategoriaChange(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 flex-1">{cat.nombre}</span>
                <span className="text-xs text-gray-400">({cat.count})</span>
              </label>
            ))}
          </motion.div>
        )}
      </div>

      {/* Rango de Precio */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button
          onClick={() => setPrecioExpanded(!precioExpanded)}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-base font-semibold text-gray-900">Precio</h3>
          {precioExpanded ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        
        {precioExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-2"
          >
            {rangosPrecio.map((rango) => (
              <label
                key={rango.id}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <input
                  type="checkbox"
                  value={rango.id}
                  checked={filtrosActivos.precio.includes(rango.id)}
                  onChange={(e) => {
                    const value = e.target.value
                    const newPrecio = e.target.checked
                      ? [...filtrosActivos.precio, value]
                      : filtrosActivos.precio.filter(p => p !== value)
                    onPrecioChange(newPrecio)
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{rango.label}</span>
              </label>
            ))}
          </motion.div>
        )}
      </div>

      {/* Filtros activos */}
      {hasFiltros && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Filtros activos:</h4>
          <div className="flex flex-wrap gap-2">
            {filtrosActivos.categoria !== 'todas' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {categorias.find(c => c.id === filtrosActivos.categoria)?.nombre}
              </span>
            )}
            {filtrosActivos.precio.map(precioId => (
              <span key={precioId} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {rangosPrecio.find(r => r.id === precioId)?.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default FilterSidebar








