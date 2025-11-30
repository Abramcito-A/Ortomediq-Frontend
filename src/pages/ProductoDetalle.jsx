import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiChevronLeft } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import NavbarCatalogo from '../components/NavbarCatalogo'
import { productos } from '../data/productosData'
import { useCart } from '../hooks/useCart'

const ProductoDetalle = () => {
  const { id } = useParams()
  const producto = productos.find(p => p.id === parseInt(id))
  const { addToCart } = useCart()

  const [imagenSeleccionada, setImagenSeleccionada] = useState(0)
  const [tallaSeleccionada, setTallaSeleccionada] = useState('')
  const [colorSeleccionado, setColorSeleccionado] = useState('')
  const [cantidad, setCantidad] = useState(1)

  // Inicializar talla y color con el primer valor disponible
  useEffect(() => {
    if (producto) {
      setTallaSeleccionada(producto.tallas[0] || '')
      setColorSeleccionado(producto.colores[0] || '')
    }
  }, [producto])

  if (!producto) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Producto no encontrado</h2>
          <Link to="/productos" className="text-blue-600 hover:underline">
            Volver al catálogo
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(producto, cantidad, tallaSeleccionada, colorSeleccionado)
  }

  const handleWhatsApp = () => {
    const mensaje = `Hola! Estoy interesado en: ${producto.nombre} - $${producto.precio}`
    window.open(`https://wa.me/528715766792?text=${encodeURIComponent(mensaje)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarCatalogo />
      
      {/* Espaciador para navbar fixed */}
      <div className="h-16"></div>
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Inicio</Link>
            <span className="text-gray-400">/</span>
            <Link to="/productos" className="text-gray-500 hover:text-gray-700">Productos</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{producto.nombre}</span>
          </div>
        </div>
      </div>

      {/* Botón volver */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          to="/productos"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <FiChevronLeft />
          Volver al catálogo
        </Link>
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Galería de imágenes - LADO IZQUIERDO */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-gray-50 flex flex-col justify-center"
            >
              {/* Imagen principal */}
              <div className="w-full max-w-md mx-auto">
                <div className="aspect-square bg-white rounded-lg overflow-hidden mb-3 shadow-sm border border-gray-200">
                  <img
                    src={producto.imagenes[imagenSeleccionada]}
                    alt={producto.nombre}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Miniaturas */}
                {producto.imagenes.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {producto.imagenes.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setImagenSeleccionada(idx)}
                        className={`aspect-square bg-gray-100 rounded-md overflow-hidden border-2 transition-all ${
                          imagenSeleccionada === idx ? 'border-blue-600 shadow-sm' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img src={img} alt={`${producto.nombre} ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Información del producto - LADO DERECHO */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-6 flex flex-col justify-between"
            >
              {/* Todo el contenido */}
              <div className="space-y-4">
                {/* Marca y Nombre */}
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">{producto.marca}</p>
                  <h1 className="text-2xl font-bold text-gray-900">{producto.nombre}</h1>
                </div>

                {/* Precio y Stock */}
                <div className="flex items-center justify-between py-3 border-y border-gray-200">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-blue-600">
                      ${producto.precio.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-right">
                    {producto.stock > 0 ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        ✓ {producto.stock} disponibles
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        Sin stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Tallas y Colores en grid */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Tallas */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Talla:</h3>
                    <div className="flex flex-wrap gap-2">
                      {producto.tallas.slice(0, 3).map((talla) => (
                        <button
                          key={talla}
                          onClick={() => setTallaSeleccionada(talla)}
                          className={`px-4 py-2 border-2 rounded-md text-sm font-medium transition-all ${
                            tallaSeleccionada === talla
                              ? 'border-blue-600 bg-blue-50 text-blue-600'
                              : 'border-gray-300 hover:border-blue-400'
                          }`}
                        >
                          {talla}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colores */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Color:</h3>
                    <div className="flex gap-2">
                      {producto.colores.slice(0, 3).map((color) => (
                        <button
                          key={color}
                          onClick={() => setColorSeleccionado(color)}
                          title={color}
                          className={`w-10 h-10 rounded-full border-3 transition-all shadow-sm ${
                            colorSeleccionado === color
                              ? 'border-blue-600 scale-110 ring-2 ring-blue-300'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{
                            backgroundColor: color.toLowerCase() === 'negro' ? '#000' :
                              color.toLowerCase() === 'blanco' ? '#fff' :
                              color.toLowerCase() === 'azul' || color.toLowerCase().includes('azul') ? '#3b82f6' :
                              color.toLowerCase() === 'gris' ? '#6b7280' :
                              color.toLowerCase() === 'beige' ? '#d4a574' :
                              color.toLowerCase() === 'plateado' ? '#c0c0c0' :
                              color.toLowerCase() === 'bronce' ? '#cd7f32' :
                              '#6b7280'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Cantidad */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Cantidad:</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                        className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-md text-lg hover:bg-gray-50 hover:border-gray-400 transition-all"
                      >
                        -
                      </button>
                      <span className="w-12 text-center text-lg font-semibold">{cantidad}</span>
                      <button
                        onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
                        className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-md text-lg hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={cantidad >= producto.stock}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Botones */}
                <div className="space-y-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed text-base shadow-md hover:shadow-lg"
                  disabled={!producto.disponible || !tallaSeleccionada || !colorSeleccionado}
                >
                  <FiShoppingCart className="text-lg" />
                  Agregar al carrito
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-all flex items-center justify-center gap-2 text-base shadow-md hover:shadow-lg"
                >
                  <FaWhatsapp className="text-lg" />
                  Consultar por WhatsApp
                </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductoDetalle

