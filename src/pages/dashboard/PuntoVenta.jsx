import { useState, useEffect, useRef } from 'react'
import { Search, Trash2, Plus, Minus, DollarSign, CreditCard, Smartphone, Printer, X, ShoppingCart, Scan } from 'lucide-react'
import { productos as productosData } from '../../data/productosData'

const PuntoVenta = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoriaActiva, setCategoriaActiva] = useState('todas')
  const [carrito, setCarrito] = useState([])
  const [metodoPago, setMetodoPago] = useState('efectivo')
  const [montoPagado, setMontoPagado] = useState('')
  const [showTicket, setShowTicket] = useState(false)
  const searchInputRef = useRef(null)

  // Categorías disponibles
  const categorias = [
    { id: 'todas', nombre: 'Todas' },
    { id: 'rodilleras', nombre: 'Rodilleras' },
    { id: 'fajas', nombre: 'Fajas' },
    { id: 'muletas', nombre: 'Muletas' },
    { id: 'plantillas', nombre: 'Plantillas' },
    { id: 'soportes', nombre: 'Soportes' }
  ]

  // Filtrar productos
  const productosFiltrados = productosData.filter(producto => {
    const matchSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       producto.id.toString().includes(searchTerm)
    const matchCategoria = categoriaActiva === 'todas' || producto.categoria === categoriaActiva
    return matchSearch && matchCategoria
  })

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    const itemExistente = carrito.find(item => item.id === producto.id)
    
    if (itemExistente) {
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ))
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }])
    }
  }

  // Modificar cantidad
  const modificarCantidad = (id, cantidad) => {
    if (cantidad <= 0) {
      setCarrito(carrito.filter(item => item.id !== id))
    } else {
      setCarrito(carrito.map(item =>
        item.id === id ? { ...item, cantidad } : item
      ))
    }
  }

  // Eliminar del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id))
  }

  // Limpiar carrito
  const limpiarCarrito = () => {
    setCarrito([])
    setMontoPagado('')
  }

  // Calcular totales
  const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
  const total = subtotal
  const cambio = montoPagado ? Math.max(0, parseFloat(montoPagado) - total) : 0

  // Procesar venta
  const procesarVenta = () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío')
      return
    }
    
    if (metodoPago === 'efectivo' && parseFloat(montoPagado) < total) {
      alert('El monto pagado es insuficiente')
      return
    }

    // Aquí iría la lógica para guardar la venta
    console.log('Venta procesada:', {
      items: carrito,
      total,
      metodoPago,
      montoPagado: parseFloat(montoPagado),
      cambio
    })

    setShowTicket(true)
  }

  // Cerrar ticket y limpiar
  const cerrarTicket = () => {
    setShowTicket(false)
    limpiarCarrito()
  }

  // Focus en búsqueda al cargar
  useEffect(() => {
    searchInputRef.current?.focus()
  }, [])

  // Atajo de teclado F2 para buscar
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'F2') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <div className="-mx-4 md:-mx-6 lg:-mx-8 -mb-4 md:-mb-6 lg:-mb-8 -mt-6 h-[calc(100vh-10rem)] flex bg-gray-50 overflow-hidden">
      {/* Panel Izquierdo - Productos */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header con búsqueda */}
        <div className="bg-white border-b border-gray-200 p-2">
          <div className="flex gap-1.5">
            {/* Búsqueda */}
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Buscar o escanear (F2)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
              />
            </div>
            <button className="px-2 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
              <Scan size={16} />
            </button>
          </div>

          {/* Categorías */}
          <div className="flex gap-1.5 mt-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
            {categorias.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoriaActiva(cat.id)}
                className={`px-2 py-1 rounded-md whitespace-nowrap transition-colors text-xs ${
                  categoriaActiva === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Productos */}
        <div className="flex-1 overflow-hidden p-2">
          <div 
            className="grid gap-1.5 overflow-y-auto justify-start content-start"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 120px))', gridAutoRows: 'max-content' }}
          >
            {productosFiltrados.map(producto => (
              <button
                key={producto.id}
                onClick={() => agregarAlCarrito(producto)}
                className="bg-white rounded-md border border-gray-200 hover:border-blue-500 hover:shadow-sm transition-all p-1.5 text-left group w-[120px]"
              >
                <div className="aspect-square bg-gray-50 rounded-md mb-1 overflow-hidden">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-medium text-[10px] text-gray-900 line-clamp-2 mb-0.5 leading-tight">
                  {producto.nombre}
                </h3>
                <p className="text-sm font-bold text-blue-600">
                  ${producto.precio.toFixed(2)}
                </p>
                <p className="text-[10px] text-gray-500">
                  {producto.stock}
                </p>
              </button>
            ))}
          </div>

          {productosFiltrados.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingCart size={32} className="mb-2" />
              <p className="text-xs font-medium">No se encontraron productos</p>
            </div>
          )}
        </div>
      </div>

      {/* Panel Derecho - Carrito y Pago */}
      <div className="w-72 bg-white border-l border-gray-200 flex flex-col">
        {/* Header Carrito */}
        <div className="p-2 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900">Ticket</h2>
            <button
              onClick={limpiarCarrito}
              className="text-red-600 hover:bg-red-50 p-1 rounded-md transition-colors"
              title="Limpiar"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <p className="text-[10px] text-gray-500 mt-0.5">
            {carrito.length} {carrito.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {/* Items del Carrito */}
        <div className="flex-1 overflow-hidden p-2">
          <div className="space-y-1.5 h-full overflow-y-auto">
            {carrito.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingCart size={32} className="mb-1.5" />
              <p className="text-[10px]">Carrito vacío</p>
            </div>
          ) : (
            carrito.map(item => (
              <div key={item.id} className="bg-gray-50 rounded-md p-1.5">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-[10px] text-gray-900 flex-1 pr-1.5 line-clamp-2 leading-tight">
                    {item.nombre}
                  </h3>
                  <button
                    onClick={() => eliminarDelCarrito(item.id)}
                    className="text-red-600 hover:bg-red-50 p-0.5 rounded transition-colors flex-shrink-0"
                  >
                    <X size={12} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  {/* Control de cantidad */}
                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={() => modificarCantidad(item.id, item.cantidad - 1)}
                      className="w-5 h-5 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-100"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="w-6 text-center font-semibold text-xs">{item.cantidad}</span>
                    <button
                      onClick={() => modificarCantidad(item.id, item.cantidad + 1)}
                      className="w-5 h-5 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-100"
                      disabled={item.cantidad >= item.stock}
                    >
                      <Plus size={10} />
                    </button>
                  </div>

                  {/* Precio */}
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500">${item.precio.toFixed(2)}</p>
                    <p className="text-sm font-bold text-blue-600">
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
          </div>
        </div>

        {/* Resumen y Pago */}
        {carrito.length > 0 && (
          <div className="border-t border-gray-200 p-2 space-y-1.5">
            {/* Totales */}
            <div className="flex justify-between text-sm font-bold text-gray-900 py-1.5 border-y border-gray-200">
              <span>Total:</span>
              <span className="text-blue-600 text-lg">${total.toFixed(2)}</span>
            </div>

            {/* Método de Pago */}
            <div>
              <label className="block text-[10px] font-semibold text-gray-700 mb-1">
                Método de Pago
              </label>
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => setMetodoPago('efectivo')}
                  className={`flex flex-col items-center gap-0.5 p-1.5 rounded-md border-2 transition-all ${
                    metodoPago === 'efectivo'
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <DollarSign size={16} />
                  <span className="text-[10px] font-medium">Efectivo</span>
                </button>
                <button
                  onClick={() => setMetodoPago('tarjeta')}
                  className={`flex flex-col items-center gap-0.5 p-1.5 rounded-md border-2 transition-all ${
                    metodoPago === 'tarjeta'
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CreditCard size={16} />
                  <span className="text-[10px] font-medium">Tarjeta</span>
                </button>
                <button
                  onClick={() => setMetodoPago('transferencia')}
                  className={`flex flex-col items-center gap-0.5 p-1.5 rounded-md border-2 transition-all ${
                    metodoPago === 'transferencia'
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Smartphone size={16} />
                  <span className="text-[10px] font-medium">Transfer.</span>
                </button>
              </div>
            </div>

            {/* Monto Pagado (solo para efectivo) */}
            {metodoPago === 'efectivo' && (
              <div>
                <label className="block text-[10px] font-semibold text-gray-700 mb-1">
                  Monto Pagado
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={montoPagado}
                  onChange={(e) => setMontoPagado(e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
                />
                {montoPagado && (
                  <div className="mt-1 p-1.5 bg-green-50 rounded-md">
                    <div className="flex justify-between text-green-700">
                      <span className="font-medium text-xs">Cambio:</span>
                      <span className="text-base font-bold">${cambio.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Botón Procesar Venta */}
            <button
              onClick={procesarVenta}
              className="w-full py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-bold text-sm shadow-md flex items-center justify-center gap-1.5"
            >
              <DollarSign size={18} />
              COBRAR ${total.toFixed(2)}
            </button>
          </div>
        )}
      </div>

      {/* Modal Ticket */}
      {showTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="bg-green-600 text-white p-4 rounded-t-lg">
              <h3 className="text-xl font-bold text-center">¡Venta Exitosa!</h3>
            </div>

            {/* Ticket */}
            <div className="p-6">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Ortomediq</h2>
                <p className="text-sm text-gray-600">Torreón, Coahuila</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date().toLocaleString('es-MX')}
                </p>
              </div>

              <div className="border-t border-b border-gray-300 py-3 space-y-2">
                {carrito.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.nombre}</p>
                      <p className="text-gray-600">
                        {item.cantidad} x ${item.precio.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Método:</span>
                  <span className="capitalize">{metodoPago}</span>
                </div>
                {metodoPago === 'efectivo' && (
                  <>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Pagado:</span>
                      <span>${parseFloat(montoPagado).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-green-600">
                      <span>Cambio:</span>
                      <span>${cambio.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Botones */}
            <div className="p-4 bg-gray-50 rounded-b-lg space-y-2">
              <button
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Printer size={20} />
                Imprimir Ticket
              </button>
              <button
                onClick={cerrarTicket}
                className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Nueva Venta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PuntoVenta


