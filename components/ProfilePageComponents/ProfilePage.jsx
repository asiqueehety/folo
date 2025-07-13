
'use client'
import React, { useState, useEffect } from 'react'
import UserProfile from './UserProfile'
import UserPosts from './UserPosts'
import { useDarkMode } from '@/app/context/DarkModeContext'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {

    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(null)
    const [posts, setPosts] = useState(null)
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
                console.log(postsData)

            } catch (err) {
                console.error('Error fetching user data:', err)
            }
        }

        fetchData()
    }, [])

    return (
        <div className='flex flex-row *:w-full gap-2'>
            <div className='flex-2'><UserProfile darkmode={darkmode} user={user} /></div>
            <div className='flex-5'><UserPosts darkmode={darkmode} posts={posts} /></div>
        </div>
    )
}
