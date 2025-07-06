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
  const [isLoggedIn, setIsLoggedIn] = useState(true)

    
  function logoutClicked()
  {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setShowDash(false)
    router.push('/login')
  }

  function buttonClicked(dest)
  {
    if(localStorage.getItem('token')) {router.push(dest);setShowDash(false);return;}
    setShowDash(false)
    router.push('/login')
    
  }

  return (
    <div>
      <div className={`${font2.className} fixed top-20 right-0`}>
      {isLoggedIn && <motion.button className='bg-blue-200 rounded-full fixed top-5 right-5 hover:bg-blue-400 transition-all z-[100]' onClick={()=>{setShowDash(!showDash)}}
      animate={showDash? {rotate:0}:{rotate:180}}
      transition={{duration:0.1}}>
          <Image src={dashboard} width={40} height={40} alt='dashboard open/close button'></Image>
      </motion.button>}
      <AnimatePresence>
          {showDash && 
          <motion.div className='flex flex-col justify-center items-center bg-cyan-800 text-white text-lg lg:h-full lg:w-70 w-screen h-160 lg:rounded-bl-2xl rounded-none -z-50'
          
          initial={{x:1000}}
          animate={{x:0}}
          exit={{x:1000}}
          transition={{duration:0.5}}>
              <div className='pt-10 pb-10'>
                  <h1 className={`${font1.className} text-4xl`}>Dashboard</h1>
              </div>
              <button onClick={()=>{buttonClicked('/')}} className='hover:bg-blue-500 hover:text-blue-50 h-full w-full p-3 transition-all'><h1 className='bg-blue-500 p-2 w-full rounded-xl'>Home</h1></button>
              <button onClick={()=>{buttonClicked('/')}} className='hover:bg-blue-500 hover:text-blue-50 h-full w-full p-3 transition-all'><h1 className='bg-blue-500 p-2 w-full rounded-xl'>My findings</h1></button>
              <button onClick={()=>{buttonClicked('/')}} className='hover:bg-blue-500 hover:text-blue-50 h-full w-full p-3 transition-all'><h1 className='bg-blue-500 p-2 w-full rounded-xl'>Things I lost</h1></button>
              <button onClick={()=>{buttonClicked('/')}} className='hover:bg-blue-500 hover:text-blue-50 h-full w-full p-3 transition-all'><h1 className='bg-blue-500 p-2 w-full rounded-xl'>Profile</h1></button>
              <button onClick={()=>{buttonClicked('/create/post/lost')}} className='hover:bg-blue-500 hover:text-blue-50 h-full w-full p-3 transition-all'><h1 className='bg-blue-500 p-2 w-full rounded-xl xl:hidden'>Lost something?</h1></button>
              <button onClick={()=>{buttonClicked('/create/post/found')}} className='hover:bg-blue-500 hover:text-blue-50 h-full w-full p-3 transition-all'><h1 className='bg-blue-500 p-2 w-full rounded-xl xl:hidden'>Found something?</h1></button>
              
              <button className='bg-white rounded-full p-2 m-4' onClick={logoutClicked}><Image src={logout} width={30} height={30} alt='logout'></Image></button>
              

          </motion.div>}
      </AnimatePresence>
      
    </div>
    </div>

  )
}
