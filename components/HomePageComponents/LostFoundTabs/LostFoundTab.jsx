'use client'
import React, { useEffect,useState } from 'react'
import {Inter, Poppins} from 'next/font/google'
import { useRouter } from 'next/navigation';
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
  }, [props.posts])

  return (
    <>
      <div className={`bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/20 shadow-xl hover:bg-white/20 hover:shadow-2xl transition-all duration-500 ease-in-out transform p-1 text-black font-sans m-2 mt-3 ${font1.className} flex flex-row`}>
        <LostTab posts={lost_posts}/>
        <FoundTab posts={found_posts}/>
      </div>
    </>
  )
}
