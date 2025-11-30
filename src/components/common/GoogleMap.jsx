import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { useState } from 'react'

const GoogleMapComponent = ({ 
  apiKey,
  center = { lat: 25.5428, lng: -103.4068 }, // Torreón, Coahuila
  zoom = 15,
  height = '400px'
}) => {
  const [mapError, setMapError] = useState(false)

  const mapStyles = {
    height: height,
    width: '100%',
    borderRadius: '0.5rem'
  }

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
  }

  // Si no hay API key, mostrar placeholder
  if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
    return (
      <div 
        className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-600 border-2 border-dashed border-gray-400"
        style={{ height }}
      >
        <svg 
          className="w-20 h-20 mb-4 text-gray-400"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
          />
        </svg>
        <p className="font-semibold text-lg mb-2">Google Maps</p>
        <p className="text-sm text-center px-4">
          Configura tu API Key de Google Maps<br />
          en el archivo <code className="bg-gray-400 px-2 py-1 rounded">.env</code>
        </p>
      </div>
    )
  }

  // Si hay error al cargar el mapa
  if (mapError) {
    return (
      <div 
        className="bg-red-50 rounded-lg flex flex-col items-center justify-center text-red-600 border-2 border-red-200"
        style={{ height }}
      >
        <svg 
          className="w-16 h-16 mb-3"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <p className="font-semibold mb-1">Error al cargar el mapa</p>
        <p className="text-sm text-center px-4">
          Verifica tu API Key de Google Maps
        </p>
      </div>
    )
  }

  return (
    <LoadScript 
      googleMapsApiKey={apiKey}
      onError={() => setMapError(true)}
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        center={center}
        zoom={zoom}
        options={mapOptions}
      >
        {/* Marcador en la ubicación */}
        <Marker 
          position={center}
          title="Ortomediq - Torreón, Coahuila"
        />
      </GoogleMap>
    </LoadScript>
  )
}

export default GoogleMapComponent



