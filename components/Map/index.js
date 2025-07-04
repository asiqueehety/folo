'use client'
import dynamic from 'next/dynamic'

// Disable SSR for this component (leaflet won't work with SSR)
const Map = dynamic(() => import('./Map'), {
  ssr: false
})


export default Map;