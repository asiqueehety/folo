'use client'
import dynamic from 'next/dynamic'

// Disable SSR for this component (leaflet won't work with SSR)
const MapContainerHome = dynamic(() => import('./MapContainerHome'), {
  ssr: false
})


export default MapContainerHome;