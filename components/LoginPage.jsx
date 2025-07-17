'use client'

import { Lato } from 'next/font/google'
import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useDarkMode } from '@/app/context/DarkModeContext'


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
  const {darkmode} = useDarkMode();
  

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
        router.push('/') // Redirect to homepage or dashboard
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
    <div className={`${font2.className} flex justify-center items-center flex-col mt-20 p-8 shadow-xl rounded-3xl max-w-md mx-auto ${darkmode ? 'text-neutral-100 bg-neutral-800' : 'text-blue-950 bg-white/100'}`}>
      <h1 className={`${font1.className} text-5xl mb-6`}>Login to <span className='text-purple-600'>FoLo</span></h1>

      <form className='flex flex-col space-y-5 w-full'>
        <input 
          type='text'
          className={`input-field ${darkmode ? 'bg-neutral-800 text-neutral-200 placeholder:text-neutral-400' : 'bg-neutral-100 text-neutral-950 border-neutral-950/50 border-4'}`}
          placeholder='Email or Username'
          onChange={(e)=> setEmail(e.target.value)}
          value={emailOrUsername}
        />

        <input 
          type='password'
          className={`input-field ${darkmode ? 'bg-neutral-800 text-neutral-200 placeholder:text-neutral-400' : ''}`}
          placeholder='Password'
          onChange={(e)=> setpw(e.target.value)}
          value={pw}
        />

        <button
          type='button'
          onClick={clickedLogin}
          className={`bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-indigo-800 transition-all duration-300`}
        >
          Login
        </button>
      </form>

      <div className='text-sm text-center mt-6'>
        <p>Don't have an account?</p>
        <Link href='/signup' className='text-blue-500 hover:underline'>Sign Up</Link>
      </div>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 0.75rem;
          outline: none;
          font-size: 1rem;
          background-color: #F9FAFB;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        .input-field:focus {
          background-color: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.3);
          transform: scale(1.02);
        }
      `}</style>
    </div>
  )
}
