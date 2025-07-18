'use client'

import { Lato } from 'next/font/google'
import React, {useState,useRef} from 'react'
import Link from 'next/link'
import { CheckCircleIcon, LocateFixedIcon, LocateIcon } from 'lucide-react'
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

  async function locatePos() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        
  
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
          const data = await res.json();
          const address = data.address;
  
          const country = address.country || '';
          const state = address.state || '';
          const city = address.city || address.town || address.village || '';
          const suburb = address.suburb || '';
          const postcode = address.postcode || '';
          const full = `${suburb}, ${city}, ${state}, ${country} - ${postcode}`;
          setaddress({ lat, lng, country, state, city, suburb, postcode });
          console.log('Detailed location:', full);
          alert(`You are in ${full}`);
        } catch (err) {
          alert('Failed to reverse geocode location');
          console.error(err);
        }
      },
      (err) => {
        alert('Unable to retrieve your location. Error: ' + err.message);
      }
    );
  }
  


  return (
    <div className={`${font2.className} flex justify-center items-center flex-col mt-4 p-10 bg-gradient-to-br from-purple-50 via-white to-indigo-50 shadow-2xl rounded-3xl border border-gray-300 max-w-xl lg:mx-auto mx-2`}> 
      <h1 className={`${font1.className} text-5xl text-indigo-900 mb-8 tracking-wide`}>Sign Up to <span className='text-purple-700'>FoLo</span></h1>

      <form className='flex flex-col space-y-5 w-full'>
        <input 
          type='text'
          className='input-field'
          placeholder='Username'
          onChange={(e)=> setUname(e.target.value)}
          value={uname}
        />

        <input 
          type='email'
          className='input-field'
          placeholder='Email'
          onChange={(e)=> setEmail(e.target.value)}
          value={email}
        />

        <input 
          type='password'
          className='input-field'
          placeholder='Password'
          onChange={(e)=> setpw(e.target.value)}
          value={pw}
        />

        <input 
          type='password'
          className='input-field'
          placeholder='Confirm Password'
          onChange={(e)=> setrpw(e.target.value)}
          value={rpw}
        />

        {pw !== rpw && rpw !== '' && (
          <p className='text-red-500 text-sm'>Passwords don't match</p>
        )}

        <button 
          type='button'
          className='input-field bg-indigo-100 text-indigo-900 font-medium cursor-pointer hover:bg-indigo-200'
          onClick={locatePos}
        >
          {Object.keys(address).length === 0 ? 
          <div className='flex items-center'>
            <LocateIcon className='w-4 h-4 mr-2'/>
            Detect Location 
          </div>
          : 
          <div className='flex items-center'>
            <LocateFixedIcon className='w-4 h-4 mr-2'/>
            Location Found
          </div>
          }
        </button>

        <input 
          type='number'
          className='input-field'
          placeholder='Phone Number'
          onChange={(e)=> setphone(e.target.value)}
          value={phone}
        />

        <button
          type='button'
          onClick={clickedSignup}
          className={`bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-indigo-800 transition-all duration-300 ${!allOk() ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!allOk()}
        >
          Sign Up
        </button>
      </form>

      <div className='text-sm text-center mt-6 text-gray-600'>
        <p>Already have an account?</p>
        <Link href='/login' className='text-blue-600 hover:underline'>Log in</Link>
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
          box-shadow: 0 0 0 3px rgba(124,58,237,0.3);
          transform: scale(1.02);
        }
      `}</style>
    </div>
  )
}