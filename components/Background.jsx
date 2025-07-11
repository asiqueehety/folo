'use client'

import React from 'react'
import { useDarkMode } from '@/app/context/DarkModeContext'

export default function Background() {

  const { darkmode } = useDarkMode();

  return (
    <div className= {` ${darkmode? 'animated-gradient-bg-dark':'animated-gradient-bg'} w-screen h-screen -z-50 fixed`}></div>
  )
}
//bg-gradient-to-br from-purple-200 via-blue-200 to-red-100