import React from 'react'
import WelcomeContainer from './WelcomeContainer'
import dynamic from 'next/dynamic';
import Footer from '../Footer'
const MapContainerHome = dynamic(() => import ('@/components/HomePageComponents/Map3/MapContainerHome'), { ssr: false });




export default function HomePage() {
  return (
    <div className='grid lg:grid-cols-[2fr_5fr]'>
      <div className='flex flex-col'>
        <WelcomeContainer/>
        <MapContainerHome/>
      </div>
        
    </div>
)
}
