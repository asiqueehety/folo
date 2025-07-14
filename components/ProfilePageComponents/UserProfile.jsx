'use client'
import React, {useEffect, useState} from 'react'
import { Poppins } from 'next/font/google'
import { UserCircle, Mail, Phone, MapPin, CalendarDays, Edit , Settings } from 'lucide-react'
import MapLoading from '../reusables/MapLoading'

const font1 = Poppins({
  weight:['400'],
  subsets:['latin']
})

export default function UserProfile(props) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    if (!user) return <div className='flex justify-center items-center h-full'><MapLoading/></div>

    return (
        <div className='flex flex-col gap-4'>
            <h1 className={`${font1.className} text-2xl font-bold`}>Profile</h1>
            <div className={`p-4 rounded-3xl border-2 shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-[0.99] ${props.darkmode ? 'bg-gradient-to-br from-neutral-900 to-neutral-700 border-none text-white' : 'bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md border-white/20 text-black'} ${font1.className}`}>
                
                <div className="flex items-center gap-4 mb-6">
                    <UserCircle className="w-16 h-16 text-emerald-500"/>
                    <div>
                        <h1 className="text-3xl font-bold">{user.username}</h1>
                        <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-lg">
                        <Phone className="text-emerald-500"/> 
                        <span>{user.phone || 'No phone number provided'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-lg">
                        <MapPin className="text-emerald-500"/> 
                        <span>{`${user.address.lat} , ${user.address.lng}` || 'Location not specified'}</span>
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
                        <Edit className="text-red-500 hover:scale-105"/>
                        <Settings className="text-green-500 hover:scale-105"/>
                    </div>
                </div>
            </div>
        </div>

    )
}
