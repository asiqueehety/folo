//generate code for footer

import React from 'react'
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className='w-full h-[200px] bg-black text-white flex justify-center items-center'>
        <div className='w-1/3 flex justify-center items-center'>
            <Link href='/'>
                <img src={'/images/logo.png'} alt='logo' className='w-[100px] h-[100px]'/>
            </Link>
        </div>
        <div className='w-1/3 flex justify-center items-center'>
            <div className='flex justify-center items-center'>
                <BsFacebook className='text-[20px] mr-4'/>
                <BsInstagram className='text-[20px] mr-4'/>
                <BsTwitter className='text-[20px]'/>
            </div>
        </div>
    </div>
  )
}