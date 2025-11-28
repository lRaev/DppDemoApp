"use client"

import React, { useEffect, useState, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface OfficeLocation {
  position: [number, number];
  name: string;
  address: string;
}

const officeLocations: OfficeLocation[] = [
  {
    position: [42.62660832609827, 23.374245476497354], // Sofia, Bulgaria
    name: "Sofia Office",
    address: "Business Park Sofia, str., building 8B, floor 7"
  },
  {
    position: [42.15001183810139, 24.749370046455233], // Plovdiv, Bulgaria
    name: "Plovdiv Office",
    address: "ul. Stefan Verkovich 5"
  }
]

const getGoogleMapsUrl = (position: [number, number], name: string) => {
  return `https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}&destination_place_id=${encodeURIComponent(name)}`
}

const OfficeMapComponent: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !containerRef.current || mapRef.current) return

    const officeIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })

    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([42.4, 24.0], 7)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(map)

    officeLocations.forEach(location => {
      const popupContent = `
        <div style="text-align: center;">
          <strong>${location.name}</strong><br />
          ${location.address}<br />
          <a href="${getGoogleMapsUrl(location.position, location.name)}"
             target="_blank"
             rel="noopener noreferrer"
             style="color: #2563eb; text-decoration: underline; font-size: 12px;">
            Get Directions
          </a>
        </div>
      `
      L.marker(location.position, { icon: officeIcon })
        .addTo(map)
        .bindPopup(popupContent)
    })

    const bounds = L.latLngBounds(officeLocations.map(loc => loc.position))
    map.fitBounds(bounds, { padding: [30, 30] })

    mapRef.current = map

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [isClient])

  if (!isClient) {
    return (
      <div className="h-[200px] w-full bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Loading map...</span>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="h-[200px] w-full rounded-lg overflow-hidden"
    />
  )
}

export default OfficeMapComponent

