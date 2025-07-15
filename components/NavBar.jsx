'use client'

import { Lato } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/navigation'
import DashboardPage from './DashboardPage'

const font1 = Lato({
  weight: ['900'],
  subsets: ['latin'],
})

const font2 = Lato({
  weight: ['700'],
  subsets: ['latin'],
})

export function buttonStyles()
{
  return `h-fit w-full rounded-2xl bg-white text-blue-950 lg:text-xl text-sm max-w-50 lg:p-1 p-1 m-2 mb-1 border-none hover:bg-gradient-to-br from-purple-200 via-blue-200 to-red-100 hover:transition-all hover:scale-98`
}

export default function NavBar() {
  const router = useRouter();

  function handleClick(dest) {
    if (!!localStorage.getItem('token')) {
      router.push(dest)
    } else {
      router.push('/login')
    }
  }

  return (
    <div className={`${font1.className} fixed z-50`}>
      <nav className='w-screen h-20 bg-cyan-900 grid xl:grid-cols-[7fr_4fr] lg:grid-cols-[3fr_2fr] grid-cols-[1fr_1fr] animated-gradient-bg-navbar '>
        <div className='m-4 text-white flex md:flex-row flex-col'>
          <h1 className='lg:text-6xl text-3xl'><button onClick={()=>{router.push('/')}}>FoLo</button></h1>
          <p className='lg:text-xl text-sm flex justify-end'>Just find it.</p>
        </div>
        <div className='xl:flex xl:flex-row h-fit hidden'>
          <button
            onClick={()=>{handleClick('/create/post/lost')}}
            className={buttonStyles()}
          >
            Lost something?
          </button>
          <button
            onClick={()=>{handleClick('/create/post/found')}}
            className={buttonStyles()}
          >
            Found something?
          </button>
        </div>
      </nav>
    </div>
  )
}
