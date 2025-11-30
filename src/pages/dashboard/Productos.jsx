import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, MoreVertical, Filter, ChevronUp, ChevronDown } from 'lucide-react'
import { productos as productosData } from '../../data/productosData'

const Productos = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategoria, setFilterCategoria] = useState('todas')
  const [sortBy, setSortBy] = useState('nombre')
  const [sortOrder, setSortOrder] = useState('asc')
  const [productosPorPagina, setProductosPorPagina] = useState(10)
  const [paginaActual, setPaginaActual] = useState(1)

  // Obtener categorías únicas
  const categorias = ['todas', ...new Set(productosData.map(p => p.categoria))]

  // Filtrar productos
  let productosFiltrados = productosData.filter(producto => {
    const matchSearch = 
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.id.toString().includes(searchTerm)
    
    const matchCategoria = filterCategoria === 'todas' || producto.categoria === filterCategoria
    
    return matchSearch && matchCategoria
  })

  // Ordenar productos
  productosFiltrados = productosFiltrados.sort((a, b) => {
    let aVal, bVal

    switch(sortBy) {
      case 'nombre':
        aVal = a.nombre.toLowerCase()
        bVal = b.nombre.toLowerCase()
        break
      case 'precio':
        aVal = a.precioDescuento || a.precio
        bVal = b.precioDescuento || b.precio
        break
      case 'stock':
        aVal = a.stock
        bVal = b.stock
        break
      case 'rating':
        aVal = a.rating
        bVal = b.rating
        break
      default:
        aVal = a.nombre.toLowerCase()
        bVal = b.nombre.toLowerCase()
    }

    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })

  // Paginación
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina)
  const inicio = (paginaActual - 1) * productosPorPagina
  const productosVisibles = productosFiltrados.slice(inicio, inicio + productosPorPagina)

  const handleSort = (columna) => {
    if (sortBy === columna) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(columna)
      setSortOrder('asc')
    }
  }

  const SortIcon = ({ columna }) => {
    if (sortBy !== columna) return <div className="w-4 h-4" />
    return sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
  }

  const getPrecioFormato = (producto) => {
    if (producto.precioDescuento) {
      return (
        <div>
          <p className="text-sm text-gray-500 line-through">${producto.precio.toFixed(2)}</p>
          <p className="font-semibold text-green-600">${producto.precioDescuento.toFixed(2)}</p>
        </div>
      )
    }
    return <p className="font-semibold">${producto.precio.toFixed(2)}</p>
  }

  const getStockColor = (stock) => {
    if (stock === 0) return 'text-red-600 bg-red-50'
    if (stock < 5) return 'text-orange-600 bg-orange-50'
    return 'text-green-600 bg-green-50'
  }

  const getStockBadge = (stock) => {
    if (stock === 0) return 'Sin stock'
    if (stock < 5) return `Bajo stock (${stock})`
    return `${stock} unidades`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Productos</h1>
          <p className="text-gray-600 mt-1">Gestiona el catálogo de productos</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm">
          <Plus size={20} />
          <span>Agregar Producto</span>
        </button>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          {/* Búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nombre, marca o ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPaginaActual(1)
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filtro por categoría */}
          <select
            value={filterCategoria}
            onChange={(e) => {
              setFilterCategoria(e.target.value)
              setPaginaActual(1)
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categorias.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'todas' ? 'Todas las categorías' : cat}
              </option>
            ))}
          </select>

          {/* Productos por página */}
          <select
            value={productosPorPagina}
            onChange={(e) => {
              setProductosPorPagina(Number(e.target.value))
              setPaginaActual(1)
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={10}>10 por página</option>
            <option value={25}>25 por página</option>
            <option value={50}>50 por página</option>
          </select>
        </div>
      </div>

      {/* Tabla de Productos */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  <button 
                    onClick={() => handleSort('nombre')}
                    className="flex items-center gap-2 hover:text-gray-900"
                  >
                    Producto
                    <SortIcon columna="nombre" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Categoría</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Marca</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  <button 
                    onClick={() => handleSort('precio')}
                    className="flex items-center gap-2 hover:text-gray-900"
                  >
                    Precio
                    <SortIcon columna="precio" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  <button 
                    onClick={() => handleSort('stock')}
                    className="flex items-center gap-2 hover:text-gray-900"
                  >
                    Stock
                    <SortIcon columna="stock" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  <button 
                    onClick={() => handleSort('rating')}
                    className="flex items-center gap-2 hover:text-gray-900"
                  >
                    Rating
                    <SortIcon columna="rating" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosVisibles.map((producto) => (
                <tr key={producto.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  {/* Producto */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={producto.imagen} 
                        alt={producto.nombre}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{producto.nombre}</p>
                        <p className="text-xs text-gray-500">ID: {producto.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Categoría */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 capitalize">
                      {producto.categoria}
                    </span>
                  </td>

                  {/* Marca */}
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600">{producto.marca}</p>
                  </td>

                  {/* Precio */}
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      {getPrecioFormato(producto)}
                    </div>
                  </td>

                  {/* Stock */}
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStockColor(producto.stock)}`}>
                      {getStockBadge(producto.stock)}
                    </span>
                  </td>

                  {/* Rating */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-gray-900">{producto.rating}</span>
                      <span className="text-xs text-gray-500">({producto.numReviews})</span>
                    </div>
                  </td>

                  {/* Acciones */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ver detalles"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Más opciones"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No hay resultados */}
        {productosVisibles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 font-medium">No se encontraron productos</p>
            <p className="text-sm text-gray-500 mt-1">Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando {inicio + 1} a {Math.min(inicio + productosPorPagina, productosFiltrados.length)} de {productosFiltrados.length} productos
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPaginaActual(Math.max(1, paginaActual - 1))}
              disabled={paginaActual === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>
            
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setPaginaActual(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  paginaActual === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setPaginaActual(Math.min(totalPaginas, paginaActual + 1))}
              disabled={paginaActual === totalPaginas}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Productos

