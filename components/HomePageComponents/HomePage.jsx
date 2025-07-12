'use client'
import React, { useEffect, useState } from 'react'
import WelcomeContainer from './WelcomeContainer'
import dynamic from 'next/dynamic';
import Footer from '../Footer'
const MapContainerHome = dynamic(() => import ('@/components/HomePageComponents/Map3/MapContainerHome'), { ssr: false });
import LostFoundTab from './LostFoundTabs/LostFoundTab';



export default function HomePage(props) {
  const [_posts, set_posts] = useState({lost_posts:[],found_posts:[]})
  const [userPosition, setUserPosition] = useState({})
  const [showDetails, setShowDetails] = useState(null)
  const [darkmode,set_darkmode] = useState(props.darkmode)


  useEffect(() => {
    fetch('/api/get_all_posts',{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()).then(data => {
      set_posts(data)
      set_darkmode(props.darkmode)
    })
  }, [props.darkmode]);
  
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
        <WelcomeContainer darkmode={darkmode}/>
        <MapContainerHome posts={_posts} darkmode={darkmode} showPostLocations={showDetails}/>
      </div>
      <LostFoundTab posts={_posts} userPosition={userPosition} darkmode={darkmode} onShowDetails={setShowDetails}/>       
    </div>
)
}
