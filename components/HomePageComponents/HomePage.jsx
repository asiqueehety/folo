'use client'
import React, { useEffect, useState } from 'react'
import WelcomeContainer from './WelcomeContainer'
import dynamic from 'next/dynamic';
const MapContainerHome = dynamic(() => import ('@/components/HomePageComponents/Map3/MapContainerHome'), { ssr: false });
import LostFoundTab from './LostFoundTabs/LostFoundTab';
import Image from 'next/image';
import {motion, AnimatePresence} from 'framer-motion'
import { CloseButton } from '@headlessui/react';



export default function HomePage(props) {
  const [_posts, set_posts] = useState({lost_posts:[],found_posts:[]})
  const [userPosition, setUserPosition] = useState({})
  const [showDetails, setShowDetails] = useState(null)
  const [darkmode,set_darkmode] = useState(props.darkmode)
  const [expand_image, set_expand_image] = useState(null)
  const [zoomed, set_zoomed] = useState(false)

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
      <LostFoundTab posts={_posts} userPosition={userPosition} darkmode={darkmode} onShowDetails={setShowDetails} expand_image={set_expand_image}/>
      <AnimatePresence>
        {!!expand_image && 
        <motion.div
        initial={{opacity:0, height:0}}
        animate={{opacity:1, height:'auto'}}
        exit={{opacity:0, height:0}}
        transition={{duration:0.3}}
        >
          <Image src={expand_image.content_pic} alt={expand_image.content_name} width={600} height={600} className={` ${zoomed? 'w-[95%] h-[95%]' : ''} rounded-xl object-cover fixed z-[60] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden`} onDoubleClick={()=>{set_zoomed(!zoomed)}}/>
          <div className='fixed top-0 right-0 left-0 bottom-0 object-cover bg-black/60 backdrop-blur-sm z-50' onClick={()=>{set_expand_image(null)}}></div>
        </motion.div>
        }
      </AnimatePresence>
    </div>
)
}
