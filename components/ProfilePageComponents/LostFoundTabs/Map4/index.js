'use client'
import dynamic from 'next/dynamic'

// Disable SSR for this component (leaflet won't work with SSR)
const MapContainerProfileCards = dynamic(() => import('./MapContainerProfileCards'), {
  ssr: false
})


export default MapContainerProfileCards;