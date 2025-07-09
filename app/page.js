
'use client'

import { useEffect, useState } from 'react'
import HomePage from "@/components/HomePageComponents/HomePage";
import Intro from "@/components/Intro";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
    setIsMounted(true)
  }, [])

  if (!isMounted) return null // Prevents hydration mismatch

  return (
    <div>
      {isLoggedIn ? <HomePage /> : <Intro />}
    </div>
  )
}
