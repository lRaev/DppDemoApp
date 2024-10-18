import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
})

const MapComponent: React.FC = () => {
  return (
    <div className="relative h-full w-full">
      <MapContainer 
        center={[42.73, 25.48]} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false} // Remove zoom controls
        attributionControl={false} // Remove attribution control
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?lang=en"
        />
        <Marker position={[42.73, 25.48]}>
          <Popup>
            Product Origin: Bulgaria
          </Popup>
        </Marker>
      </MapContainer>
      <div className="absolute top-2 left-2 text-white text-sm font-bold bg-blue-600 bg-opacity-50 px-2 py-1 rounded z-[1000]">
        DigiPP by SoftGroup
      </div>
    </div>
  )
}

export default MapComponent