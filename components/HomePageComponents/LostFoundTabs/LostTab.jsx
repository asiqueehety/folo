import React, { useEffect, useState } from 'react'
import {Inter, Poppins} from 'next/font/google'
import LostMiniCard from './LostMiniCard'

const font1 = Poppins({
    weight:['400'],
    subsets:['latin']
  })

export default function LostTab(props) {

    const [posts, set_posts] = useState(props.posts)
    useEffect(() => {
        set_posts(props.posts)
    }, [props.posts])

const button_style = "px-4 py-1 text-sm font-medium text-white bg-emerald-800 rounded-full shadow-md hover:bg-emerald-700 transition-all duration-300 h-fit w-fit m-1"
  return (
    <div className={`bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/20 shadow-xl hover:bg-white/20 hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-[0.99] p-2 text-black font-sans m-1 ${font1.className} w-full flex flex-col animated-gradient-bg-losttab`}>
        <h2 className="text-5xl font-extrabold mb-3 tracking-wide p-1">Lost</h2>
        <div className='flex flex-row'>
            <button className={button_style}>Distance</button>
            <button className={button_style}>Reward</button>
            <button className={button_style}>Type</button>
            <button className={button_style}>Date</button>
        </div>
        <div className=" rounded-3xl h-130 overflow-y-auto">
        {
            posts && Array.isArray(posts) && posts.map((post,index) => (
                <LostMiniCard key={index} post={post} userPosition={props.userPosition}/>
            ))
        }
        </div>
        
    </div>
  )
}
