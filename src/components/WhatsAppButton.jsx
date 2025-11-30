import { FaWhatsapp } from 'react-icons/fa'
import { useState } from 'react'

function WhatsAppButton() {
  // Número de WhatsApp de Ortomediq (formato internacional sin + ni espacios)
  // Ejemplo: 528711234567 para el número +52 871 123 4567
  const whatsappNumber = '528715766792'
  
  // Mensaje de bienvenida que aparecerá automáticamente en WhatsApp
  const welcomeMessage = `¡Hola! 👋 Bienvenido a *Ortomediq*

Me gustaría obtener más información sobre:
• Productos ortopédicos disponibles
• Precios y promociones
• Horarios de atención
• Ubicación de la tienda

¡Gracias!`
  
  // Estado para mostrar/ocultar tooltip
  const [showTooltip, setShowTooltip] = useState(false)

  // Función para abrir WhatsApp
  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(welcomeMessage)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap shadow-lg">
          ¿Necesitas ayuda? ¡Escríbenos!
          <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
        </div>
      )}

      {/* Botón de WhatsApp */}
      <button
        onClick={openWhatsApp}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp className="text-4xl" />
        
        {/* Animación de pulso */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
      </button>
    </div>
  )
}

export default WhatsAppButton

