import { FaFacebook, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Sección principal del footer */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Columna 1: Logo y descripción */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Ortomediq</h3>
            <p className="text-gray-400 mb-4">
              Tu tienda de confianza en aparatos ortopédicos en Torreón, Coahuila.
            </p>
            {/* Redes sociales */}
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition duration-300"
                aria-label="Facebook"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition duration-300"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-xl" />
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  Productos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-blue-500 mt-1 flex-shrink-0" />
                <span>Av. Principal #123, Torreón, Coahuila</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-blue-500 flex-shrink-0" />
                <span>(871) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-blue-500 flex-shrink-0" />
                <span>contacto@ortomediq.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barra inferior del copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>© 2025 Ortomediq. Todos los derechos reservados.</p>
            <p className="mt-2 md:mt-0">Torreón, Coahuila, México</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

