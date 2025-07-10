'use client'
import React, { useEffect, useState } from 'react'
import WelcomeContainer from './WelcomeContainer'
import dynamic from 'next/dynamic';
import Footer from '../Footer'
const MapContainerHome = dynamic(() => import ('@/components/HomePageComponents/Map3/MapContainerHome'), { ssr: false });
import LostFoundTab from './LostFoundTabs/LostFoundTab';



export default function HomePage() {
  const [_posts, set_posts] = useState({lost_posts:[],found_posts:[]})
  useEffect(() => {
    fetch('/api/get_all_posts',{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()).then(data => {
      set_posts(data)
    })
  }, []);
  
  

  return (
    <div className='grid lg:grid-cols-[2fr_5fr]'>
      <div className='flex flex-col'>
        <WelcomeContainer/>
        <MapContainerHome posts={_posts}/>
      </div>
      <LostFoundTab posts={_posts}/>
        
    </div>
)
}
