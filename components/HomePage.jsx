import React from 'react'
import DashboardPage from './DashboardPage'
import MapLoading from './reusables/MapLoading'

export default function HomePage() {
  return (
    <div className='flex justify-center items-center mt-20'>
      <MapLoading/>
    </div>
  )
}
