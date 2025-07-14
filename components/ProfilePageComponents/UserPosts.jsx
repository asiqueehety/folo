'use client'

import React,{useState,useEffect} from 'react'
import {Poppins} from 'next/font/google'
import LostFoundTab from './LostFoundTabs/LostFoundTab'

const font1 = Poppins({
  weight:['400'],
  subsets:['latin']
})
export default function UserPosts(props) {
    const [posts, setPosts] = useState(props.posts)
    useEffect(() => {
        setPosts(props.posts)
    }, [props.posts])
  return (
    <div>
        <div className='flex flex-col'>
            <LostFoundTab posts={props.posts} darkmode={props.darkmode}/>
        </div>
    </div>
  )
}
