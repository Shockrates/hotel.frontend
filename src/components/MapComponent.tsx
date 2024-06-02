import { APIProvider, AdvancedMarker, Map, Marker, Pin } from '@vis.gl/react-google-maps'
import React from 'react'

type coordinates = {
    lat: number,
    lon: number
}

function MapComponent({lat, lon}: coordinates) {
    const pos = {lat:lat, lng:lon}
  console.log(pos);
  
    
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="h-80">
        <Map defaultZoom={16} defaultCenter={pos} mapId={import.meta.env.VITE_GOOGLE_MAPS_PUBLIC_MAP_ID}>
          <AdvancedMarker position={pos}>
            <Pin   /> 
          </AdvancedMarker>
        </Map>
      </div>
      
    </APIProvider>
  )
}

export default MapComponent