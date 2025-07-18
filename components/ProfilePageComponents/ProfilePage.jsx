
'use client'
import React, { useState, useEffect } from 'react'
import UserProfile from './UserProfile'
import UserPosts from './UserPosts'
import { useDarkMode } from '@/app/context/DarkModeContext'
import { useRouter } from 'next/navigation'
import {motion , AnimatePresence} from 'framer-motion'
import Image from 'next/image'

export default function ProfilePage() {

    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(null)
    const [posts, setPosts] = useState(null)
    const [expand_image, set_expand_image] = useState(null)
    const [zoomed, set_zoomed] = useState(false)
    const router = useRouter()
    const { darkmode } = useDarkMode()

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                router.push('/login')
                return
            }

            try {
                // 1. Get userId
                const resUserId = await fetch('/api/get_user_id', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                const userIdData = await resUserId.json()

                if (!userIdData.userId) {
                    router.push('/login')
                    return
                }
                setUserId(userIdData.userId)

                // 2. Get user data
                const resUser = await fetch('/api/get_current_user', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: userIdData.userId })
                })
                const userData = await resUser.json()
                setUser(userData)

                // 3. Get user posts
                const resPosts = await fetch('/api/get_current_user_posts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: userIdData.userId })
                })
                const postsData = await resPosts.json()
                setPosts(postsData)

            } catch (err) {
                console.error('Error fetching user data:', err)
            }
        }

        fetchData()
    }, [])

    return (
        <div>
            <div className='flex flex-row *:w-full gap-2'>
                <div className='flex-2'><UserProfile darkmode={darkmode} user={user} /></div>
                <div className='flex-5'><UserPosts darkmode={darkmode} posts={posts} expand_image={set_expand_image}/></div>
            </div>
            <AnimatePresence>
                {!!expand_image && 
                <motion.div
                initial={{opacity:0, height:0}}
                animate={{opacity:1, height:'auto'}}
                exit={{opacity:0, height:0}}
                transition={{duration:0.3}}
                >
                <Image src={expand_image} alt={`expanded image`} width={600} height={600} className={` ${zoomed? 'w-[95%] h-[95%]' : ''} rounded-xl object-cover fixed z-[60] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden`} onDoubleClick={()=>{set_zoomed(!zoomed)}}/>
                <div className='fixed top-0 right-0 left-0 bottom-0 object-cover bg-black/60 backdrop-blur-sm z-50' onClick={()=>{set_expand_image(null)}}></div>
                </motion.div>
                }
            </AnimatePresence>
        </div>
        
    )
}
