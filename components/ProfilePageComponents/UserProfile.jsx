'use client'
import React, {useEffect, useState} from 'react'
import { Poppins } from 'next/font/google'
import { UserCircle, Mail, Phone, MapPin, CalendarDays, Edit , Settings, LogOutIcon } from 'lucide-react'
import MapLoading from '../reusables/MapLoading'
import {motion, AnimatePresence} from 'framer-motion'
import {useRouter} from 'next/navigation'

const font1 = Poppins({
  weight:['400'],
  subsets:['latin']
})

export default function UserProfile(props) {

    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(null)
    const [username, set_username] = useState(null)
    const [edit_username, set_edit_username] = useState(false)
    const [email, set_email] = useState(null)
    const [edit_email, set_edit_email] = useState(false)
    const [phone, set_phone] = useState(null)
    const [edit_phone, set_edit_phone] = useState(false)
    const [settings , set_settings] = useState(false)
    const [edit_pw, set_edit_pw] = useState(false)
    const [pw, set_pw] = useState('')
    const [confirm_pw, set_confirm_pw] = useState('')
    const [current_pw, set_current_pw] = useState('')
    const router = useRouter()

    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    useEffect(() => {
        if(user){
            set_username(user.username)
            set_email(user.email)
            set_phone(user.phone)
            setUserId(user._id)
        }
    }, [user])

    function editClicked(route) {
        switch (route) {
            case 'username':
                set_edit_username(true)
                break
            case 'email':
                set_edit_email(true)
                break
            case 'phone':
                set_edit_phone(true)
                break
        }
    }

    async function pw_changed()
    {
        const response = await fetch(`/api/edit/profile/password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                current_pw: current_pw,
                new_pw: pw
            }),
        })
    }

    async function saveClicked(route)
    {
        const response = await fetch(`/api/edit/profile/${route}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                value: (route === 'username' ? username : (route === 'email' ? email : phone)),
            }),
        })
    }

    if (!user) return <div className='flex justify-center items-center h-full'><MapLoading/></div>

    return (
        <div className='flex flex-col gap-4'>
            <div className={`m-1 p-4 rounded-3xl border-2 shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-[0.99] ${props.darkmode ? 'bg-gradient-to-br from-neutral-900 to-neutral-700 border-none text-white' : 'bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md border-white/20 text-black'} ${font1.className}`}>
                
                <div className="flex items-center gap-4 mb-6">
                    <UserCircle className="w-16 h-16 text-emerald-500"/>
                    <div>
                        <div className='flex flex-row'>
                            <h1 className="text-3xl font-bold">{edit_username? user.username:username}</h1>
                            {!edit_username? <Edit className="text-red-500 hover:scale-105 h-4 w-4 m-0.5" onClick={()=>set_edit_username(true)}/>
                            :
                            <div className='flex flex-row'>
                                <input type='text' className="peer min-w-16 max-w-26 m-1 placeholder:text-white/30 placeholder:text-xs border border-gray-300 rounded-xl text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition" placeholder='Username' onChange={(e)=>{set_username(e.target.value)}} value={username}></input>
                                <button className='bg-yellow-600 text-white p-1 m-0 h-fit w-fit rounded-2xl hover:bg-cyan-950 transition-all text-sm' onClick={()=>{saveClicked('username');set_edit_username(false)}} disabled={!username}>Save</button>
                            </div>
                            }
                        </div>
                        <div className='flex flex-row'>
                        <p className="text-sm text-gray-400">{edit_email? user.email:email}</p>
                        {!edit_email? <Edit className="text-red-500 hover:scale-105 h-4 w-4 m-0.5" onClick={()=>editClicked('email')}/>
                        :
                        <div className='flex flex-row'>
                            <input type='text' className="peer min-w-16 max-w-26 m-1 placeholder:text-white/30 placeholder:text-xs border border-gray-300 rounded-xl text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition" placeholder='Email' onChange={(e)=>{set_email(e.target.value)}} value={email}></input>
                            <button className='bg-yellow-600 text-white p-1 m-0 h-fit w-fit rounded-2xl hover:bg-cyan-950 transition-all text-sm' onClick={()=>{saveClicked('email');set_edit_email(false)}} disabled={!email}>Save</button>
                        </div>}
                        </div>
                        
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-lg">
                        <Phone className="text-emerald-500"/> 
                        <span>{edit_phone? user.phone:phone}</span>
                        {!edit_phone? <Edit className="text-red-500 hover:scale-105 h-4 w-4 m-0.5" onClick={()=>editClicked('phone')}/>
                        :
                        <div className='flex flex-row'>
                            <input type='text' className="peer min-w-16 max-w-26 m-1 placeholder:text-white/30 placeholder:text-xs border border-gray-300 rounded-xl text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition" placeholder='Phone' onChange={(e)=>{set_phone(e.target.value)}} value={phone}></input>
                            <button className='bg-yellow-600 text-white p-1 m-0 h-fit w-fit rounded-2xl hover:bg-cyan-950 transition-all text-sm' onClick={()=>{saveClicked('phone');set_edit_phone(false)}} disabled={!phone}>Save</button>
                        </div>
                        }
                    </div>
                    <div className="flex items-center gap-3 text-lg">
                        <MapPin className="text-emerald-500"/> 
                        <span>{`${user.address.suburb || ''} , ${user.address.city || user.address.village} , ${user.address.country}` || 'Location not specified'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-lg">
                        <CalendarDays className="text-emerald-500"/>
                        <span>
                            Joined on {new Date(user.createdAt).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: '2-digit'
                            })}
                        </span>
                    </div>
                    <div className="flex flex-row-reverse gap-3 text-lg mt-8">
                        <Settings className="text-green-500 hover:scale-105" onClick={()=>{set_settings(!settings)}}/>
                        <LogOutIcon className="text-red-500 hover:scale-105" onClick={()=>{localStorage.removeItem('token');router.push('/login');}}/>
                    </div>
                </div>
            </div>
            <AnimatePresence>
            {
                settings && (
                    
                    <motion.div className='flex flex-col gap-4'
                    initial={{opacity:0, height:0}}
                    animate={{opacity:1, height:'auto'}}
                    exit={{opacity:0, height:0}}
                    transition={{duration:0.5, ease:'easeInOut'}}
                    >
                        
                        {edit_pw?
                        <div className={`flex flex-col justify-center items-center *:p-2 m-1 p-4 rounded-3xl border-2 shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-[0.99] ${props.darkmode ? 'bg-gradient-to-br from-neutral-900 to-neutral-700 border-none text-white' : 'bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md border-white/20 text-black'} ${font1.className}`}>
                            <input type='password' className={`peer min-w-30 max-w-50 h-10 m-1 placeholder:text-xs border border-gray-300 rounded-xl text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition ${props.darkmode ? 'bg-neutral-900 text-white placeholder:text-white/30' : ' placeholder:text-black/30 bg-white text-black'}`} placeholder='Current password' onChange={(e)=>{set_current_pw(e.target.value)}} value={current_pw}></input>
                            <input type='password' className={`peer min-w-30 max-w-50 h-10 m-1 placeholder:text-black/30 placeholder:text-xs border border-gray-300 rounded-xl text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition ${props.darkmode ? 'bg-neutral-900 text-white     placeholder:text-white/30' : ' placeholder:text-black/30 bg-white text-black'}`} placeholder='New password' onChange={(e)=>{set_pw(e.target.value)}} value={pw}></input>
                            <input type='password' className={`peer min-w-30 max-w-50 h-10 m-1 placeholder:text-black/30 placeholder:text-xs border border-gray-300 rounded-xl text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition ${props.darkmode ? 'bg-neutral-900 text-white placeholder:text-white/30' : ' placeholder:text-black/30 bg-white text-black'}`} placeholder='Confirm new Password' onChange={(e)=>{set_confirm_pw(e.target.value)}} value={confirm_pw}></input>
                            <div className='flex flex-row *:m-2'>
                                <button className='bg-green-600 text-white p-1 m-0 h-fit w-fit rounded-2xl hover:bg-cyan-950 transition-all text-sm' onClick={()=>{pw_changed();set_edit_pw(false)}} disabled={!pw || !confirm_pw || !(pw === confirm_pw)}>{pw === confirm_pw ? 'Save' : 'Passwords do not match'}</button>
                                <button className='bg-red-600 text-white p-1 m-0 h-fit w-fit rounded-2xl hover:bg-cyan-950 transition-all text-sm' onClick={()=>{set_edit_pw(false)}}>Cancel</button>
                            </div>
                        </div>
                        :
                        <div className={`m-1 p-4 rounded-3xl border-2 shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-[0.99] ${props.darkmode ? 'bg-gradient-to-br from-neutral-900 to-neutral-700 border-none text-white' : 'bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md border-white/20 text-black'} ${font1.className}`}>
                            <button className='bg-cyan-600 text-white p-2 m-0 h-fit w-fit rounded-2xl hover:bg-cyan-950 transition-all text-sm' onClick={()=>{set_edit_pw(true)}}>Change Password</button>
                        </div>
                        }
                        
                    </motion.div>
                )
            }</AnimatePresence>
        </div>

    )
}
