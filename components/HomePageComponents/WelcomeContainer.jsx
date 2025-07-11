'use client'
import React, { useEffect,useState } from 'react'
import {Inter, Poppins} from 'next/font/google'
import { useRouter } from 'next/navigation';

const font1 = Poppins({
  weight:['400'],
  subsets:['latin']
})

export default function WelcomeContainer(props) {

  const [user_name,set_user_name] = useState('')
  const [darkmode,set_darkmode] = useState(false)
  const router = useRouter();


  useEffect(() => {
    set_darkmode(props.darkmode)
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('/api/get_user_id', {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${token}`,
        },
    })
        .then(res => res.json())
        .then(data => {
        if (data.userId) {
            console.log('User ID:', data.userId);
            fetch('/api/get_current_user',{
              method:'POST',
              headers:{
                'Content-Type': 'application/json',
              },
              body:JSON.stringify({
                userId:data.userId
              })
            }).then(res => res.json()).then(data => {
              set_user_name(data.username)
            })
        } else {
            router.push('/login')
        }
        })
        .catch(err => {
        console.error('Error fetching user ID:', err);
        });
    }, [props.darkmode]);

  


  return (
    <>
    {/* <div className={`max-w-md mx-auto bg-slate-800 bg-opacity-90 rounded-3xl shadow-2xl border-2 border-transparent hover:bg-slate-700 hover:border-sky-400 transition-colors duration-500 ease-in-out p-8 text-slate-200 font-sans m-1 ${font1.className} `}>
      <h2 className="text-5xl font-extrabold mb-6 tracking-wide">Welcome back</h2>
      <p className="text-slate-300 leading-relaxed">
        Let's find it all out.
      </p>
    </div>
    <div className="max-w-md mx-auto p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg text-black">
      <h2 className="text-2xl font-bold mb-4">Glass Container</h2>
      <p className="text-black/80">
        This is a glass-like, transparent container with a soft blur and modern style using Tailwind CSS.
      </p>
    </div> */}

      <div className={`${darkmode? 'bg-neutral-800 border-none':'bg-white/10 backdrop-blur-md border-white/20'} rounded-3xl border-2  shadow-xl hover:bg-white/20 hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-[0.99] p-4 ${darkmode? 'text-white' : 'text-black'} font-sans m-1 mt-1.5 ${font1.className}`}>
        <h2 className="text-5xl font-extrabold mb-3 tracking-wide">Welcome back, {user_name}</h2>
        <p className={`${darkmode? 'text-white/80' : 'text-black/80'} leading-relaxed`}>
          Let's find it all out.
        </p>
      </div>
    </>
  )
}
