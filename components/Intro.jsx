'use client'

import React from 'react'
import Link from 'next/link'
import {Lato, Outfit} from 'next/font/google'
import {useRouter} from 'next/navigation'
import {useState} from 'react'
import MapPage from './Map'

const font1 = Lato({
  weight:['900'],
  subsets: ['latin'],
})

const font2 = Lato({
  weight: ['700'],
  subsets: ['latin'],

})

export default function Intro() {
  const router = useRouter()
  return (
    <div className={`${font1.className}`}>
    </div>
  )
}
