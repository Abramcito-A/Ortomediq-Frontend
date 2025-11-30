import { FaCheckCircle } from 'react-icons/fa'

function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            ¿Quiénes Somos?
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Somos Ortomediq, tu tienda de confianza en Torreón. Con años de experiencia, 
            nos dedicamos a mejorar la calidad de vida de nuestros clientes con aparatos 
            ortopédicos de la más alta calidad.
          </p>
        </div>

        {/* Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <FaCheckCircle className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Calidad Garantizada
            </h3>
            <p className="text-gray-600">
              Productos certificados de las mejores marcas del mercado
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <FaCheckCircle className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Experiencia
            </h3>
            <p className="text-gray-600">
              Años de trayectoria sirviendo a la comunidad de Torreón
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <FaCheckCircle className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Atención Personalizada
            </h3>
            <p className="text-gray-600">
              Asesoría experta para encontrar el producto ideal para ti
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

