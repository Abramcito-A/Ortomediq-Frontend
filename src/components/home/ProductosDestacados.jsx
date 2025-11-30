function ProductosDestacados() {
  // Array de productos (datos temporales - después vendrán de la API)
  const productos = [
    {
      id: 1,
      nombre: 'Rodillera Ortopédica',
      descripcion: 'Soporte y estabilidad para la rodilla',
      precio: '$450',
      imagen: '/placeholder-producto.jpg' // Placeholder
    },
    {
      id: 2,
      nombre: 'Faja Lumbar',
      descripcion: 'Apoyo para la espalda baja',
      precio: '$380',
      imagen: '/placeholder-producto.jpg'
    },
    {
      id: 3,
      nombre: 'Muletas Ajustables',
      descripcion: 'Ligeras y resistentes',
      precio: '$650',
      imagen: '/placeholder-producto.jpg'
    },
    {
      id: 4,
      nombre: 'Plantillas Ortopédicas',
      descripcion: 'Confort y corrección postural',
      precio: '$280',
      imagen: '/placeholder-producto.jpg'
    },
    {
      id: 5,
      nombre: 'Soporte de Muñeca',
      descripcion: 'Ideal para túnel carpiano',
      precio: '$320',
      imagen: '/placeholder-producto.jpg'
    },
    {
      id: 6,
      nombre: 'Collarín Cervical',
      descripcion: 'Soporte para el cuello',
      precio: '$420',
      imagen: '/placeholder-producto.jpg'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Productos Destacados
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubre nuestra selección de aparatos ortopédicos de la más alta calidad
          </p>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {productos.map((producto) => (
            <div 
              key={producto.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              {/* Imagen placeholder */}
              <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Imagen del producto</span>
              </div>
              
              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {producto.nombre}
                </h3>
                <p className="text-gray-600 mb-4">
                  {producto.descripcion}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    {producto.precio}
                  </span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                    Ver más
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón ver todos */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg">
            Ver Catálogo Completo
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductosDestacados

