'use client'

import { Lato } from 'next/font/google'
import React, {useState,useRef} from 'react'
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
  const [address, setaddress] = useState({})
  const [phone, setphone] = useState('')
  const [rpw, setrpw] = useState('')

  async function clickedSignup(e)
  {
    e.preventDefault()
    //finish what to do next
    try
    {const res = await fetch('/api/auth/signup',
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
    } catch(err) {
      alert('Something went wrong: ' + err.message);
      console.error(err);
    }
  }

  function allOk(){
    return !(uname === '' || email === '' || pw === '' || rpw === '' || phone === ''  || pw !== rpw || Object.keys(address).length ===0)
  }

  async function locatePos()
  {
    if (!navigator.geolocation)
    {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setaddress({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        console.log(address)
      },
      (err) => {
        alert('Unable to retrieve your location. Error: ' + err.message);
      }
    );
  }


  return (
    <div className={`${font2.className} flex justify-center items-center flex-col lg:mt-20 mt-0 p-4 rounded-3xl`}>
      <h1 className={`${font1.className} text-6xl text-blue-950`}>Signup to FoLo</h1>
      <form className='flex flex-col justify-center items-center m-4 mt-15 *:flex *:flex-row'>
        <div className='flex flex-row justify-center items-center '><input type='text' className='rounded-xl border-amber-950/50 border-4 text-amber-950 h-10 w-70 m-2 p-2' placeholder='Enter your username' onChange={(e)=>{setUname(e.target.value)}} value={uname}></input></div>
        <div className='flex flex-row justify-center items-center'><input type='email' className='rounded-xl border-amber-950/50 border-4 text-amber-950 h-10 w-70 m-2 p-2' placeholder='Enter your email' onChange={(e)=>{setEmail(e.target.value)}} value={email}></input></div>
        <div>
          <div className='flex flex-row justify-center items-center'><input type='password' className='rounded-xl border-amber-950/50 border-4 text-amber-950 h-10 w-70 m-2 p-2' placeholder='Enter your password' onChange={(e)=>{setpw(e.target.value)}} value={pw}></input></div>
          <div className='flex flex-row justify-center items-center'><input type='password' className='rounded-xl border-amber-950/50 border-4 text-amber-950 h-10 w-70 m-2 p-2' placeholder='Retype your password' onChange={(e)=>{setrpw(e.target.value)}} value={rpw}></input></div>
        </div>
          {((pw!=rpw) && (rpw != ''))? <h1 className='text-red-500'>Passwords don't match</h1>:<></>}
          <div className='flex flex-row justify-center items-center rounded-xl border-amber-950/50 border-4 text-amber-950 h-10 w-fit m-2 p-2' placeholder='Click to detect your location' onClick={()=>{locatePos()}}>
            {Object.keys(address).length === 0? <h1>Click to locate</h1> : <h1>Location found</h1>}
          </div>
        <div className='flex flex-row justify-center items-center'><input type='number' className='rounded-xl border-amber-950/50 border-4 text-amber-950 h-10 w-70 m-2 p-2'  placeholder='Enter your phone number' onChange={(e)=>{setphone(e.target.value)}} value={phone}></input></div>
        <button className={`bg-amber-950 text-white p-3 m-2 h-fit w-fit rounded-2xl hover:bg-cyan-950 transition-all ${!allOk()? 'disabled opacity-20':''} `} onClick={clickedSignup}>Sign Up</button>
      </form>
      <div className='text-sm flex flex-col justify-center items-center'>
        <h1 className='text-black'>Already have an existing account?</h1>
        <Link href='/login' className='text-blue-700 hover:text-blue-600'>Log in</Link>
      </div>
    </div>
  )
}