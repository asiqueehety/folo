import React, { useEffect, useState } from 'react'
import {Inter, Poppins} from 'next/font/google'
import FoundMiniCard from './FoundMiniCard'
import getDistance from './../../../lib/get_distance';
import get_time_diff from './../../../lib/get_time_diff';
import avg_location from './../../../lib/avg_location';

const font1 = Poppins({
    weight:['400'],
    subsets:['latin']
  })

export default function FoundTab(props) {

    const [posts, set_posts] = useState(props.posts)
    const [userPosition, set_userPosition] = useState(props.userPosition)
    const [distance_sort, set_distance_sort] = useState(false)
    const [date_sort, set_date_sort] = useState(false)
    const [darkmode,set_darkmode] = useState(false)

    useEffect(() => {
        set_posts(props.posts)
        set_userPosition(props.userPosition)
        set_darkmode(props.darkmode)
    }, [props.posts, props.userPosition, props.darkmode])

    useEffect(() => {
        if (typeof props.onShowDetails !== 'function') {
          console.warn("onShowDetails is missing or not a function in FoundTab");
        }
      }, [props.onShowDetails]);
      

function sort_by_distance(userPosition, posts) {

    const distArr = []
    posts.map((post,ind) => {
        const distance = getDistance(userPosition, avg_location(post.content_location))
        distArr.push({index:ind, distance:distance})
    })
    distArr.sort((a,b) => a.distance - b.distance)
    const sortedPosts = distArr.map((item) => posts[item.index])
    set_posts(sortedPosts)
}

function sort_by_date(posts) {
    const dateArr = []
    posts.map((post,ind) => {
        const time_diff = get_time_diff(post.content_foundwhen).timediff
        dateArr.push({index:ind, timediff:time_diff})
    })
    dateArr.sort((a,b) => a.timediff - b.timediff)
    const sortedPosts = dateArr.map((item) => posts[item.index])
    set_posts(sortedPosts)
}

const button_style = "px-4 py-1 lg:text-sm text-xs font-medium text-white  rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 h-fit w-fit m-1"
  return (
    <div className={`${darkmode? 'bg-neutral-800 border-none hover:bg-neutral-700':'bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20'} rounded-3xl border-2  shadow-xl  hover:shadow-2xl transition-all duration-500 ease-in-out transform  hover:scale-99 p-1 py-0 ${darkmode? 'text-white' : 'text-black'} font-sans m-1 ${font1.className} w-full flex flex-col animated-gradient-bg-foundtab`}>
        <h2 className="lg:text-5xl text-3xl font-extrabold mb-3 tracking-wide p-1">Found</h2>
        <div className='flex flex-row'>
            <button className={`${button_style} ${distance_sort ? 'bg-blue-700' : 'bg-emerald-800'}`} onClick={() => {sort_by_distance(userPosition, posts);set_distance_sort(true);set_date_sort(false);}}>Distance</button>
            <button className={`${button_style} ${date_sort ? 'bg-blue-700' : 'bg-emerald-800'}`} onClick={() => {sort_by_date(posts);set_date_sort(true);set_distance_sort(false);}}>Finding date</button>
        </div>
        <div className=" rounded-3xl lg:h-145.5 h-96 overflow-y-auto">
        {
            posts && Array.isArray(posts) && posts.map((post,index) => (
                <FoundMiniCard key={index} post={post} userPosition={props.userPosition} ymdt_diff={get_time_diff(post.content_foundwhen)} onShowDetails={props.onShowDetails}  expand_image={props.expand_image}/>
            ))
        }
        </div>
    </div>
  )
}
