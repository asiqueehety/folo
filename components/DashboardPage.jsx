'use client'

import React,{useState,useEffect} from 'react'
import dashboard from '@/public/resources/dashboard.png'
import logout from '@/public/resources/logout.png'
import Image from 'next/image'
import {motion, AnimatePresence} from 'framer-motion'
import { Lato } from 'next/font/google'
import {useRouter} from 'next/navigation'

const font1 = Lato({
  weight: ['900'],
  subsets: ['latin'],
})

const font2 = Lato({
  weight: ['400'],
  subsets: ['latin'],
})


export default function DashboardPage() {
  const [showDash, setShowDash] = useState(false)
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {setIsLoggedIn(true);setIsMounted(true);}
  }, [])

    
  function logoutClicked()
  {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setShowDash(false)
    router.push('/login')
  }

  function buttonClicked(dest)
  {
    if(localStorage.getItem('token')) {router.push(dest);return;}
    router.push('/login')
  }

  return (
    <div>
      {isMounted && <div className={`${font2.className} fixed`}>
      {isLoggedIn && <motion.button className='bg-blue-200 rounded-full fixed top-35 left-5 hover:bg-blue-400 transition-all z-[100]' onClick={()=>{setShowDash(!showDash)}}
      animate={showDash? {rotate:0}:{rotate:180}}
      transition={{duration:0.1}}>
          <Image src={dashboard} width={40} height={40} alt='dashboard open/close button'></Image>
      </motion.button>}
      <AnimatePresence>
          {showDash && 
          <motion.div className='flex flex-col justify-center items-center bg-cyan-800 text-white text-lg h-full w-400 rounded-br-4xl'
          
          initial={{width:0,x:-1000}}
          animate={{width:400,x:0}}
          exit={{x:-1000}}
          transition={{duration:0.5}}>
              <div className='pt-10 pb-10'>
                  <h1 className={`${font1.className} text-4xl`}>Dashboard</h1>
              </div>
              <button onClick={()=>{buttonClicked('/home')}} className='hover:bg-blue-500 hover:text-blue-50 h-full w-full p-3 transition-all'><h1 className='bg-blue-500 p-2 w-full rounded-xl'>Home</h1></button>
              <button onClick={()=>{buttonClicked('/home')}} className='hover:bg-blue-500 hover:text-blue-50 h-full w-full p-3 transition-all'><h1 className='bg-blue-500 p-2 w-full rounded-xl'>My findings</h1></button>
              <button onClick={()=>{buttonClicked('/home')}} className='hover:bg-blue-500 hover:text-blue-50 h-full w-full p-3 transition-all'><h1 className='bg-blue-500 p-2 w-full rounded-xl'>Things I lost</h1></button>
              <button onClick={()=>{buttonClicked('/home')}} className='hover:bg-blue-500 hover:text-blue-50 h-full w-full p-3 transition-all'><h1 className='bg-blue-500 p-2 w-full rounded-xl'>Profile</h1></button>
              
              <button className='bg-white rounded-full p-2 m-4' onClick={logoutClicked}><Image src={logout} width={30} height={30} alt='logout'></Image></button>
              

          </motion.div>}
      </AnimatePresence>
      
    </div>}
    </div>

  )
}
