import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaClock } from 'react-icons/fa'
import GoogleMapComponent from '../common/GoogleMap'

function ContactSection() {
  // ==========================================
  // CONFIGURACIÓN DE GOOGLE MAPS
  // ==========================================
  // 🗺️ Coordenadas de Ortomediq en Torreón, Coahuila
  // Para obtener las coordenadas exactas:
  // 1. Ve a Google Maps: https://www.google.com/maps
  // 2. Busca tu negocio o dirección
  // 3. Click derecho en la ubicación > Click en las coordenadas
  // 4. Reemplaza los valores abajo
  const mapCenter = {
    lat: 25.5428,    // ⬅️ Reemplaza con tu latitud real
    lng: -103.4068   // ⬅️ Reemplaza con tu longitud real
  }

  // 🔑 API Key de Google Maps (configurar en archivo .env)
  // Ver instrucciones en: GOOGLE-MAPS-CONFIG.md
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  // 🔗 URL de Google Maps para abrir en el navegador/app
  const googleMapsUrl = `https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}`

  return (
    <section id="contacto" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Visítanos o Contáctanos
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Estamos para atenderte y ayudarte a encontrar lo que necesitas
          </p>
        </div>

        {/* Contenido en dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Columna 1: Información de contacto */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Información de Contacto
            </h3>

            {/* Dirección */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Dirección</h4>
                <p className="text-gray-600">
                  {/* ⬇️ Actualiza con tu dirección real */}
                  Av. Principal #123<br />
                  Col. Centro<br />
                  Torreón, Coahuila, México<br />
                  C.P. 27000
                </p>
              </div>
            </div>

            {/* Teléfono */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaPhone className="text-blue-600 text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Teléfono</h4>
                <p className="text-gray-600">
                  {/* ⬇️ Actualiza con tu teléfono real */}
                  (871) 576-6792
                </p>
                <a 
                  href="tel:+528715766792"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Llamar ahora
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FaWhatsapp className="text-green-600 text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">WhatsApp</h4>
                <p className="text-gray-600">+52 871 576 6792</p>
                <a 
                  href="https://wa.me/528715766792?text=%C2%A1Hola!%20%F0%9F%91%8B%20Bienvenido%20a%20*Ortomediq*%0A%0AMe%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%3A%0A%E2%80%A2%20Productos%20ortop%C3%A9dicos%20disponibles%0A%E2%80%A2%20Precios%20y%20promociones%0A%E2%80%A2%20Horarios%20de%20atenci%C3%B3n%0A%E2%80%A2%20Ubicaci%C3%B3n%20de%20la%20tienda%0A%0A%C2%A1Gracias!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline text-sm"
                >
                  Enviar mensaje
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaEnvelope className="text-blue-600 text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                <p className="text-gray-600">
                  {/* ⬇️ Actualiza con tu email real */}
                  contacto@ortomediq.com
                </p>
                <a 
                  href="mailto:contacto@ortomediq.com"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Enviar email
                </a>
              </div>
            </div>

            {/* Horarios */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaClock className="text-blue-600 text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Horarios</h4>
                <p className="text-gray-600">
                  Lunes a Viernes: 9:00 AM - 7:00 PM<br />
                  Sábados: 9:00 AM - 3:00 PM<br />
                  Domingos: Cerrado
                </p>
              </div>
            </div>
          </div>

          {/* Columna 2: Mapa */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Nuestra Ubicación
            </h3>
            
            {/* Mapa de Google Maps */}
            <div className="mb-4">
              <GoogleMapComponent 
                apiKey={googleMapsApiKey}
                center={mapCenter}
                zoom={16}
                height="384px"
              />
            </div>

            {/* Botón para abrir en Google Maps */}
            <a 
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2"
            >
              <FaMapMarkerAlt />
              Ver en Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

