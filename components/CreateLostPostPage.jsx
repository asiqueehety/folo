'use client'

import { Mulish } from 'next/font/google'
import React from 'react'
import { useState } from 'react'

const font1 = Mulish(
    {
        weight:['900'],
        subsets: ['latin'],
    })

export default function CreateLostPostPage() {
  const [con_name, set_con_name] = useState('')

  function inputStyles()
  {
    return "w-full max-w-md px-4 py-3 rounded-xl bg-white/80 backdrop-blur-md border border-gray-300 text-gray-800 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 m-2";
  }
  

  return (
    <div>
            <div>
                <h1 className={`${font1.className} text-6xl backdrop-blur-md rounded-4xl bg-blue-700/10 h-fit w-fit p-3 m-2`}>Tell us what you lost</h1>
                <form>
                    <input type='text' className={inputStyles()} placeholder='What was the item?' onChange={(e)=>{set_con_name(e.target.value)}} value={con_name}></input>
                    
                </form>
                
            </div>
            <div>

            </div>
    </div>
  )
}
