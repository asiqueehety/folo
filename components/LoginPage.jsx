'use client'

import { Lato } from 'next/font/google'
import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


const font1 = Lato({
  weight:['900'],
  subsets: ['latin'],
})

const font2 = Lato({
  weight: ['700'],
  subsets: ['latin'],

})

export default function LoginPage() {

  const [emailOrUsername,setEmail] = useState('')
  const [pw,setpw] = useState('')
  const router = useRouter()
  

  async function clickedLogin(e)
  {
    e.preventDefault()

    try
    {
      const res = await fetch('/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({emailOrUsername,pw}),
        
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('token', data.token) // Store JWT in browser
        router.push('/home') // Redirect to homepage or dashboard
      } else {
        alert(data.error || 'Login failed')
      }
    }
    catch (error)
    {
      console.error(error)
    }
  }

  return (
    <div className={`${font2.className} flex justify-center items-center flex-col mt-20 p-4 rounded-3xl`}>
      <h1 className={`${font1.className} text-6xl text-blue-950`}>Login to FoLo</h1>
      <form className='flex flex-col justify-center items-center m-4 mt-15'>
        <div className='flex flex-row justify-center items-center'><input type='text' className='rounded-xl border-none text-amber-950 h-10 w-80 m-2 p-2' placeholder='Email or Username' onChange={(e)=>{setEmail(e.target.value)}} value={emailOrUsername}></input></div>
        <div className='flex flex-row justify-center items-center'><input type='password' className='rounded-xl border-none text-amber-950 h-10 w-80 m-2 p-2' placeholder='Password' onChange={(e)=>{setpw(e.target.value)}} value={pw}></input></div>
        <button className='bg-amber-950 text-white p-3 m-2 h-fit w-fit rounded-2xl hover:bg-cyan-950 transition-all' onClick={clickedLogin}>Login</button>
      </form>
      <div className='text-sm flex flex-col justify-center items-center'>
        <h1 className='text-black'>Don't have an account?</h1>
        <Link href='/signup' className='text-blue-700 hover:text-blue-600'>Sign Up</Link>
      </div>
    </div>
  )
}
