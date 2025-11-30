import { FaUserMd, FaMapMarkerAlt, FaDollarSign, FaTruck } from 'react-icons/fa'

function WhyChooseUs() {
  const razones = [
    {
      id: 1,
      icon: FaUserMd,
      titulo: 'Asesoría Especializada',
      descripcion: 'Personal capacitado para recomendarte el producto ideal según tus necesidades'
    },
    {
      id: 2,
      icon: FaMapMarkerAlt,
      titulo: 'En Torreón, Coahuila',
      descripcion: 'Fácil acceso y atención personalizada en nuestra ubicación local'
    },
    {
      id: 3,
      icon: FaDollarSign,
      titulo: 'Precios Competitivos',
      descripcion: 'La mejor relación calidad-precio del mercado ortopédico'
    },
    {
      id: 4,
      icon: FaTruck,
      titulo: 'Entrega Rápida',
      descripcion: 'Envíos a domicilio rápidos y seguros en toda la región'
    }
  ]

  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ¿Por Qué Elegirnos?
          </h2>
          <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Somos tu mejor opción en aparatos ortopédicos
          </p>
        </div>

        {/* Grid de razones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {razones.map((razon) => {
            const IconComponent = razon.icon
            return (
              <div key={razon.id} className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
                  <IconComponent className="text-blue-600 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {razon.titulo}
                </h3>
                <p className="text-blue-100">
                  {razon.descripcion}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs

