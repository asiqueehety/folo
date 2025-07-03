'use client'

import { Lato } from 'next/font/google'
import React, {useState} from 'react'
import Link from 'next/link'

const font1 = Lato({
  weight:['900'],
  subsets: ['latin'],
})

const font2 = Lato({
  weight: ['700'],
  subsets: ['latin'],

})

export default function SignupPage() {
  const [uname, setUname] = useState('')
  const [email,setEmail] = useState('')
  const [pw,setpw] = useState('')
  const [address, setaddress] = useState('')
  const [phone, setphone] = useState('')
  

  async function clickedSignup(e)
  {
    e.preventDefault()
    //finish what to do next
    const res = await fetch('/api/auth/signup',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: uname,
                email: email,
                pw: pw,
                phone: phone,
                address: address,
                role: 'admin'
            })
        })
        const data = await res.json()
        if (res.ok) {
            alert('Signup successful!')
            // You can also auto-login or redirect
        } else {
            alert(data.error || 'Signup failed')
        }
  }
  return (
    <div className={`${font2.className} flex justify-center items-center flex-col lg:mt-20 mt-0 p-4 rounded-3xl`}>
      <h1 className={`${font1.className} text-6xl text-blue-950`}>Signup to FoLo</h1>
      <form className='flex flex-col justify-center items-center m-4 mt-15'>
        <div className='flex flex-row justify-center items-center'><input type='text' className='rounded-xl border-none text-amber-950 h-10 w-70 m-2 p-2' placeholder='Enter your username' onChange={(e)=>{setUname(e.target.value)}} value={uname}></input></div>
        <div className='flex flex-row justify-center items-center'><input type='text' className='rounded-xl border-none text-amber-950 h-10 w-70 m-2 p-2' placeholder='Enter your email' onChange={(e)=>{setEmail(e.target.value)}} value={email}></input></div>
        <div className='flex flex-row justify-center items-center'><input type='password' className='rounded-xl border-none text-amber-950 h-10 w-70 m-2 p-2' placeholder='Enter your password' onChange={(e)=>{setpw(e.target.value)}} value={pw}></input></div>
        <div className='flex flex-row justify-center items-center'><input type='text' className='rounded-xl border-none text-amber-950 h-10 w-70 m-2 p-2' placeholder='Enter your address' onChange={(e)=>{setaddress(e.target.value)}} value={address}></input></div>
        <div className='flex flex-row justify-center items-center'><input type='text' className='rounded-xl border-none text-amber-950 h-10 w-70 m-2 p-2' placeholder='Enter your phone number' onChange={(e)=>{setphone(e.target.value)}} value={phone}></input></div>
        
        <button className='bg-amber-950 text-white p-3 m-2 h-fit w-fit rounded-2xl hover:bg-cyan-950 transition-all' onClick={clickedSignup}>Sign Up</button>
      </form>
      <div className='text-sm flex flex-col justify-center items-center'>
        <h1 className='text-black'>Already have an existing account?</h1>
        <Link href='/login' className='text-blue-700 hover:text-blue-600'>Log in</Link>
      </div>
    </div>
  )
}