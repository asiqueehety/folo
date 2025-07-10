'use client'
import React, { useEffect, useState } from 'react'
import WelcomeContainer from './WelcomeContainer'
import dynamic from 'next/dynamic';
import Footer from '../Footer'
const MapContainerHome = dynamic(() => import ('@/components/HomePageComponents/Map3/MapContainerHome'), { ssr: false });
import LostFoundTab from './LostFoundTabs/LostFoundTab';



export default function HomePage() {
  const [_posts, set_posts] = useState({lost_posts:[],found_posts:[]})
  const [userPosition, setUserPosition] = useState({})
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
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {lat:pos.coords.latitude, lng:pos.coords.longitude};
          setUserPosition(coords);
        },
        (err) => {
          alert('Geolocation error: ' + err.message);
        }
      );
    } else {
      alert('Geolocation not supported.');
    }
  }, []);

  return (
    <div className='grid lg:grid-cols-[2fr_5fr]'>
      <div className='flex flex-col'>
        <WelcomeContainer/>
        <MapContainerHome posts={_posts}/>
      </div>
      <LostFoundTab posts={_posts} userPosition={userPosition}/>
        
    </div>
)
}
