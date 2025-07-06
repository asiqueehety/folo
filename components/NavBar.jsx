'use client'

import { Lato } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/navigation'

const font1 = Lato({
  weight: ['900'],
  subsets: ['latin'],
})

const font2 = Lato({
  weight: ['700'],
  subsets: ['latin'],
})

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
    <div className={`${font1.className}`}>
      <nav className='w-full h-30 bg-cyan-900 grid lg:grid-cols-[7fr_2fr] md:grid-cols-[5fr_2fr] grid-cols-[1fr_1fr] '>
        <div className='m-4  text-white'>
          <h1 className='text-6xl'><button onClick={()=>{router.push('/')}}>FoLo</button></h1>
          <p>Never lose a thing.</p>
        </div>
        <div className='flex flex-col'>
          <button
            onClick={()=>{handleClick('/create/post/lost')}}
            className='h-fit w-full rounded-2xl bg-white text-blue-950 lg:text-xl text-sm max-w-50 lg:p-2 p-1 m-2 mb-1 border-none'
          >
            Lost something?
          </button>
          <button
            onClick={()=>{handleClick('/create/post/found')}}
            className='h-fit w-full rounded-2xl bg-white text-blue-950 lg:text-xl text-sm max-w-50 lg:p-2 p-1 m-2 mb-1 border-none'
          >
            Found something?
          </button>
        </div>
      </nav>
    </div>
  )
}
