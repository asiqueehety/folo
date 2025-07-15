'use client'
import React, { useEffect,useState } from 'react'
import {Inter, Poppins} from 'next/font/google'
import { useRouter } from 'next/navigation';
import {motion, AnimatePresence} from 'framer-motion'

const font1 = Poppins({
  weight:['400'],
  subsets:['latin']
})

export default function WelcomeContainer(props) {

  const [user_name,set_user_name] = useState('')
  const [darkmode,set_darkmode] = useState(false)
  const [hovered,set_hovered] = useState(false)
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
      <div className={`${darkmode? 'bg-neutral-800 border-none':'bg-white/10 backdrop-blur-md border-white/20'} rounded-3xl border-2  shadow-xl hover:bg-white/20 hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-[0.99] p-4 ${darkmode? 'text-white' : 'text-black'} font-sans m-1 mt-1.5 ${font1.className}`} onMouseEnter={()=>{set_hovered(true)}} onMouseLeave={()=>{set_hovered(false)}} onClick={()=>{router.push('/profile')}}>
        <h1 className="text-5xl font-extrabold mb-3 tracking-wide">
          Welcome back, {user_name}
        </h1>
        <p className={`${darkmode? 'text-white/80' : 'text-black/80'} leading-relaxed`}>
          Let's find it all out.
        </p>
        <AnimatePresence>
          {hovered && 
          <motion.h1 className={`${props.darkmode? 'text-blue-200' : 'text-blue-500'} cursor-pointer text-xs`}
          initial={{opacity:0, height:0}}
          animate={{opacity:1, height:'auto'}}
          exit={{opacity:0, height:0}}
          transition={{duration:0.2, ease:'easeInOut'}}
          >
            Click to visit your profile
          </motion.h1>
          }
        </AnimatePresence>

        
      </div>
      
    </>
  )
}
