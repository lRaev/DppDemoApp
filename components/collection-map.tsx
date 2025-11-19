"use client"

import { useEffect, useRef } from "react"
import { MapPin } from 'lucide-react'

interface CollectionPoint {
  id: number
  name: string
  address: string
  lat: number
  lng: number
}

interface CollectionMapProps {
  points: CollectionPoint[]
}

export function CollectionMap({ points }: CollectionMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return

    // Dynamically import Leaflet only on client side
    import("leaflet").then((L) => {
      // Import Leaflet CSS
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        document.head.appendChild(link)
      }

      // Clean up existing map
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
      }

      // Calculate center of all points
      const avgLat = points.reduce((sum, p) => sum + p.lat, 0) / points.length
      const avgLng = points.reduce((sum, p) => sum + p.lng, 0) / points.length

      // Create map
      const map = L.map(mapRef.current).setView([avgLat, avgLng], 13)

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      // Custom icon
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background-color: #22c55e; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      })

      // Add markers
      points.forEach((point) => {
        L.marker([point.lat, point.lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family: system-ui, -apple-system, sans-serif;">
              <strong style="font-size: 14px; color: #16a34a;">${point.name}</strong>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">${point.address}</p>
            </div>`
          )
      })

      mapInstanceRef.current = map

      // Fit bounds to show all markers
      const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]))
      map.fitBounds(bounds, { padding: [30, 30] })
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
      }
    }
  }, [points])

  return (
    <div className="space-y-3">
      <div ref={mapRef} className="w-full h-[400px] rounded-lg border border-gray-300 shadow-md" />
      <div className="text-xs text-muted-foreground text-center">
        <MapPin className="h-3 w-3 inline mr-1" />
        {points.length} textile collection points in Sofia
      </div>
    </div>
  )
}
