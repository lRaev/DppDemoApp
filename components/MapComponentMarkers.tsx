"use client"

import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export interface MarkerData {
  position: [number, number];
  popupContent: string;
  type: 'origin' | 'distribution' | 'manufacturer';
}

interface MapComponentProps {
  markers: MarkerData[];
}

const markerIcons = {
  origin: L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  distribution: L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  manufacturer: L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
};

const MapBounds: React.FC<{ markers: MarkerData[] }> = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(marker => marker.position));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [markers, map]);

  return null;
};

const MapComponentMarkers: React.FC<MapComponentProps> = ({ markers }) => {
  const [mapReady, setMapReady] = useState(false);
  const defaultCenter: [number, number] = [0, 0];
  const defaultZoom = 2;

  useEffect(() => {
    setMapReady(true);
  }, []);

  return (
    <div className="relative h-full w-full">
      <MapContainer 
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapReady && markers.map((marker, index) => (
          <Marker 
            key={index} 
            position={marker.position} 
            icon={markerIcons[marker.type]}
          >
            <Popup>
              {marker.popupContent}
            </Popup>
          </Marker>
        ))}
        <MapBounds markers={markers} />
      </MapContainer>
      <div className="absolute top-3 left-2 text-white text-sm font-bold bg-blue-600 bg-opacity-50 px-2 py-1 rounded z-[1000]">
        DigiPP by SoftGroup
      </div>
      
    </div>
  );
};

export default MapComponentMarkers;