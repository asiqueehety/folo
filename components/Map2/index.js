'use client'
import dynamic from 'next/dynamic'

// Disable SSR for this component (leaflet won't work with SSR)
const Map2 = dynamic(() => import('./Map2'), {
  ssr: false
})


export default Map2;