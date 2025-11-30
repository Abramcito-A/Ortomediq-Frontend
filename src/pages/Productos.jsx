import { useState, useEffect } from 'react'
import { FiFilter } from 'react-icons/fi'
import FilterSidebar from '../components/catalogo/FilterSidebar'
import SortDropdown from '../components/catalogo/SortDropdown'
import ProductGrid from '../components/catalogo/ProductGrid'
import Pagination from '../components/catalogo/Pagination'
import NavbarCatalogo from '../components/NavbarCatalogo'
import { productos as productosData, categorias, rangosPrecio, opcionesOrden } from '../data/productosData'

const ITEMS_PER_PAGE = 12

const Productos = () => {
  const [filtrosActivos, setFiltrosActivos] = useState({
    categoria: 'todas',
    precio: [],
    busqueda: '',
    orden: 'relevante'
  })
  const [paginaActual, setPaginaActual] = useState(1)
  const [productosFiltrados, setProductosFiltrados] = useState(productosData)
  const [isLoading, setIsLoading] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Efecto para filtrar y ordenar productos
  useEffect(() => {
    setIsLoading(true)
    
    // Simular delay de carga
    const timer = setTimeout(() => {
      let resultado = [...productosData]

      // Filtrar por búsqueda
      if (filtrosActivos.busqueda) {
        const busqueda = filtrosActivos.busqueda.toLowerCase()
        resultado = resultado.filter(p =>
          p.nombre.toLowerCase().includes(busqueda) ||
          p.descripcion.toLowerCase().includes(busqueda) ||
          p.categoria.toLowerCase().includes(busqueda)
        )
      }

      // Filtrar por categoría
      if (filtrosActivos.categoria !== 'todas') {
        resultado = resultado.filter(p => p.categoria === filtrosActivos.categoria)
      }

      // Filtrar por precio
      if (filtrosActivos.precio.length > 0) {
        resultado = resultado.filter(p => {
          return filtrosActivos.precio.some(rangoId => {
            const rango = rangosPrecio.find(r => r.id === rangoId)
            return p.precio >= rango.min && p.precio <= rango.max
          })
        })
      }

      // Ordenar
      switch (filtrosActivos.orden) {
        case 'precio_asc':
          resultado.sort((a, b) => a.precio - b.precio)
          break
        case 'precio_desc':
          resultado.sort((a, b) => b.precio - a.precio)
          break
        case 'rating':
          resultado.sort((a, b) => b.rating - a.rating)
          break
        case 'nuevo':
          resultado.sort((a, b) => b.nuevo - a.nuevo)
          break
        default:
          // relevante: destacados primero, luego por rating
          resultado.sort((a, b) => {
            if (a.destacado && !b.destacado) return -1
            if (!a.destacado && b.destacado) return 1
            return b.rating - a.rating
          })
      }

      setProductosFiltrados(resultado)
      setIsLoading(false)
      setPaginaActual(1) // Reset a primera página al filtrar
    }, 300)

    return () => clearTimeout(timer)
  }, [filtrosActivos])

  const handleCategoriaChange = (categoria) => {
    setFiltrosActivos(prev => ({ ...prev, categoria }))
  }

  const handlePrecioChange = (precio) => {
    setFiltrosActivos(prev => ({ ...prev, precio }))
  }

  const handleBusquedaChange = (busqueda) => {
    setFiltrosActivos(prev => ({ ...prev, busqueda }))
  }

  const handleOrdenChange = (orden) => {
    setFiltrosActivos(prev => ({ ...prev, orden }))
  }

  const handleLimpiarFiltros = () => {
    setFiltrosActivos({
      categoria: 'todas',
      precio: [],
      busqueda: '',
      orden: 'relevante'
    })
  }

  // Paginación
  const totalPages = Math.ceil(productosFiltrados.length / ITEMS_PER_PAGE)
  const startIdx = (paginaActual - 1) * ITEMS_PER_PAGE
  const endIdx = startIdx + ITEMS_PER_PAGE
  const productosEnPagina = productosFiltrados.slice(startIdx, endIdx)

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarCatalogo 
        showSearch={true}
        searchValue={filtrosActivos.busqueda}
        onSearchChange={handleBusquedaChange}
      />
      
      {/* Espaciador para navbar fixed con buscador */}
      <div className="h-32"></div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <FilterSidebar
              categorias={categorias}
              rangosPrecio={rangosPrecio}
              filtrosActivos={filtrosActivos}
              onCategoriaChange={handleCategoriaChange}
              onPrecioChange={handlePrecioChange}
              onLimpiarFiltros={handleLimpiarFiltros}
            />
          </div>

          {/* Main Area */}
          <div className="flex-1">
            {/* Botón filtros móvil */}
            <div className="lg:hidden mb-6">
              <button
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <FiFilter />
                <span>Filtros</span>
              </button>
            </div>

            {/* Filtros móvil */}
            {showMobileFilters && (
              <div className="lg:hidden mb-6">
                <FilterSidebar
                  categorias={categorias}
                  rangosPrecio={rangosPrecio}
                  filtrosActivos={filtrosActivos}
                  onCategoriaChange={handleCategoriaChange}
                  onPrecioChange={handlePrecioChange}
                  onLimpiarFiltros={handleLimpiarFiltros}
                />
              </div>
            )}

            {/* Barra de resultados y ordenar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              {/* Resultados */}
              <div className="text-sm text-gray-600">
                {productosFiltrados.length === 0 ? (
                  <span>No se encontraron productos</span>
                ) : (
                  <>
                    Mostrando <span className="font-semibold text-gray-900">{productosEnPagina.length}</span> de{' '}
                    <span className="font-semibold text-gray-900">{productosFiltrados.length}</span>{' '}
                    {productosFiltrados.length === 1 ? 'producto' : 'productos'}
                    
                    {/* Botón limpiar filtros */}
                    {(filtrosActivos.categoria !== 'todas' || filtrosActivos.precio.length > 0 || filtrosActivos.busqueda) && (
                      <button
                        onClick={handleLimpiarFiltros}
                        className="ml-4 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        Limpiar filtros
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Ordenar */}
              <div className="w-full sm:w-64">
                <SortDropdown
                  value={filtrosActivos.orden}
                  options={opcionesOrden}
                  onChange={handleOrdenChange}
                />
              </div>
            </div>

            {/* Grid de productos */}
            <ProductGrid productos={productosEnPagina} isLoading={isLoading} />

            {/* Paginación */}
            {!isLoading && productosFiltrados.length > 0 && (
              <Pagination
                currentPage={paginaActual}
                totalPages={totalPages}
                onPageChange={setPaginaActual}
                totalItems={productosFiltrados.length}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Productos






