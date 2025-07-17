'use client'
import React, { useEffect,useState } from 'react'
import {Poppins} from 'next/font/google'
import LostTab from './LostTab';
import FoundTab from './FoundTab';

const font1 = Poppins({
  weight:['400'],
  subsets:['latin']
})

export default function LostFoundTab(props) {
  const [lost_posts, set_lost_posts] = useState([])
  const [found_posts, set_found_posts] = useState([])
  const [userPosition, setUserPosition] = useState([])
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
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

  useEffect(() => {
    if (props.posts) {
      set_lost_posts(props.posts.lost)
      set_found_posts(props.posts.found)
    }
  }, [props.posts, props.darkmode])

  return (
      <div className={`${props.darkmode? 'bg-neutral-800 border-none':'bg-white/10 backdrop-blur-md border-white/20'} rounded-3xl border-2  shadow-xl  hover:shadow-2xl transition-all duration-500 ease-in-out transform p-1 py-0 ${props.darkmode? 'text-white' : 'text-black'} font-sans m-2 mt-1.5 ${font1.className} flex lg:flex-row flex-col`}>
        <div className='flex-1'><LostTab posts={lost_posts} userPosition={userPosition} darkmode={props.darkmode} expand_image={props.expand_image}/></div>
        <div className='flex-1'><FoundTab posts={found_posts} userPosition={userPosition} darkmode={props.darkmode} expand_image={props.expand_image}/></div>
      </div>
  )
}
