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
  useEffect(() => {
    if (props.posts) {
      set_lost_posts(props.posts.lost_posts)
      set_found_posts(props.posts.found_posts)
    }
  }, [props.posts, props.darkmode])

  return (
    <>
      <div className={`${props.darkmode? 'bg-neutral-800 border-none':'bg-white/10 backdrop-blur-md border-white/20'} rounded-3xl border-2  shadow-xl  hover:shadow-2xl transition-all duration-500 ease-in-out transform p-1 py-0 ${props.darkmode? 'text-white' : 'text-black'} font-sans lg:m-2 m-1mt-1.5 ${font1.className} flex lg:flex-row flex-col mt-2`}>
        <LostTab posts={lost_posts} userPosition={props.userPosition} darkmode={props.darkmode} onShowDetails={props.onShowDetails} expand_image={props.expand_image}/>
        <FoundTab posts={found_posts} userPosition={props.userPosition} darkmode={props.darkmode} onShowDetails={props.onShowDetails} expand_image={props.expand_image}/>
      </div>
    </>
  )
}
