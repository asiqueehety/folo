'use client'

import { Mulish, Roboto_Mono } from 'next/font/google'
import React from 'react'
import { useState, useEffect } from 'react'
import SearchableDropdown from './reusables/SearchableDropdown'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation'
import { getComplementaryColor } from '@/lib/complementaryColor'
import { useDarkMode } from '@/app/context/DarkModeContext'
const MapPage2 = dynamic(() => import ('@/components/Map2'), { ssr: false });

const font1 = Mulish(
{
    weight:['900'],
    subsets: ['latin'],
})
const font2 = Mulish(
{
    weight:['300'],
    subsets: ['latin'],
})
export function inputStyles()
{
    return "md:w-full w-75 h-fit max-w-md px-2 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-gray-300 text-gray-800 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent duration-200 m-2 transition-all input-with-custom-placeholder hover:bg-gray-200";
}

export function inputStyles0()
{
    return "w-full max-w-md px-4 py-2 bg-white/30 backdrop-blur-md border border-gray-300 rounded-xl shadow-md placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition";
}
export default function CreateFoundPostPage() {
  const [con_name, set_con_name] = useState('')
  const [con_type, set_con_type] = useState('')
  const [con_foundwhen_time, set_con_foundwhen_time] = useState('')
  const [con_foundwhen_date, set_con_foundwhen_date] = useState('')
  const [con_foundwhen, set_con_foundwhen] = useState({})
  const [con_location, set_con_location] = useState([])
  const [con_color, set_con_color] = useState('')
  const [con_model, set_con_model] = useState('')
  const [con_special, set_con_special] = useState('')
  const [con_details, set_con_details] = useState({})
  const [con_pic, set_con_pic] = useState('')
  const [con_finder_id, set_con_finder_id] = useState('')
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();
  const { darkmode } = useDarkMode()
  useEffect(() =>
  {
    set_con_foundwhen
    ({
        time: con_foundwhen_time,
        date: con_foundwhen_date,
    });
  }, [con_foundwhen_time, con_foundwhen_date]);

    useEffect(() =>
  {
    set_con_details
    ({
        color: con_color,
        model: con_model,
        special: con_special,
    });
  }, [con_color, con_model, con_special]);

  useEffect(() => {
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
            set_con_finder_id(data.userId);
            console.log('User ID:', data.userId);
        } else {
            router.push('/login')
        }
        })
        .catch(err => {
        console.error('Error fetching user ID:', err);
        });
    }, []);

  function allOk()
  {
    return !(con_name=='' || con_type=='' || con_color=='' || con_foundwhen_time=='' || con_foundwhen_date == '' || con_location.length < 1)
  }

    const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await fetch('/api/upload_image', {
        method: 'POST',
        body: formData,
        });

        const data = await res.json();
        const imageUrl = data.url;

        set_con_pic(imageUrl);
        console.log("Image uploaded:", imageUrl);
    } catch (err) {
        console.error("Upload failed:", err);
    }
    };
    async function submitClicked()
    {
        const con_data = 
        {
            content_name: con_name,
            content_type: con_type,
            content_foundwhen: con_foundwhen,
            content_details: con_details,
            content_location:con_location,
            content_pic: con_pic,
            finder_id: con_finder_id,  
        }
        console.log(con_data)
        try {
        const res = await fetch('/api/create/post/found', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(con_data),
        });
        const data = await res.json();
        if (res.ok) {
        router.push('/') // Redirect to homepage or dashboard
        } else {
        alert(data.error || 'Lost post creation failed')
        }
        } catch (err) {
            console.error("Data send failed", err);
        }
    }
  return (
    <div className={`flex xl:flex-row flex-col ${darkmode? 'text-white' : 'text-black'}`}>
        <div className={`flex flex-col lg:justify-items-start w-full`}>
            <h1 className={`${font1.className} lg:text-6xl text-3xl  backdrop-blur-md rounded-4xl bg-blue-700/10 h-fit w-fit p-3 m-2 animated-gradient-bg-2 text-white`}>Tell us what you found</h1>
            <form>
                <div className='flex md:flex-row flex-col'>
                    <input type='text' className={inputStyles()} placeholder='What is it?' onChange={(e)=>{set_con_name(e.target.value)}} value={con_name}></input>
                    <SearchableDropdown onSelect={(val) => set_con_type(val)}/>
                </div>
                <div className="flex items-center space-x-4 m-2">
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
                    >
                        Upload Image
                    </label>

                    <span className="text-sm text-gray-500">
                        {selectedFile ? selectedFile.name : 'No file selected'}
                    </span>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUpload}
                    />
                </div>
                <div>
                    <h1 className={`${font2.className} m-2 lg:text-2xl text-md`}>Add details of the found item</h1>
                    <div className='flex flex-col'>
                        <div className='flex flex-row items-center'>
                            <label
                                htmlFor="color"
                                style={{color: getComplementaryColor(con_color), backgroundColor: con_color }}
                                className="cursor-pointer px-4 py-2 rounded-xl bg-black text-white font-semibold shadow transition m-2"
                            >
                                What color is it?
                                
                            </label>
                            <input type='color' className='rounded-full w-10 h-10 border-none' placeholder='Choose color' onChange={(e)=>{set_con_color(e.target.value)}} value={con_color}></input>
                        </div>
                        <input type='text' className={inputStyles()} placeholder='Specify model' onChange={(e)=>{set_con_model(e.target.value)}} value={con_model}></input>
                        <input type='text' className={inputStyles()} placeholder='Any special markings?' onChange={(e)=>{set_con_special(e.target.value)}} value={con_special}></input>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <h1 className={`${font2.className} m-2 lg:text-2xl text-md`}>When did you find it?</h1>
                    <div className='flex md:flex-row flex-col *:input-with-custom-placeholder'>
                            <select 
                            id="dropdown"
                            className={inputStyles()}
                            defaultValue={""}
                            onChange={(e)=>{set_con_foundwhen_time(e.target.value)}}
                            >
                                <option className={inputStyles()} value="" disabled>When did you find it approximately?</option>
                                <option className={inputStyles()} value="Morning">Morning (6:01 AM - 11:00 AM) </option>
                                <option className={inputStyles()} value="Noon">Noon ( 11:01 AM - 3:00 PM )</option>
                                <option className={inputStyles()} value="Afternoon">Afternoon ( 3:01 PM - 6:00 PM )</option>
                                <option className={inputStyles()} value="Evening">Evening ( 6:01 PM - 8:00 PM )</option>
                                <option className={inputStyles()} value="Night">Night ( 8:01 PM - 12:00 AM )</option>
                                <option className={inputStyles()} value="Midnight">Midnight ( 12:01 AM - 6:00 AM )</option>
                            </select>

                        <input type='date' className={inputStyles()} placeholder='When did you last see it?' onChange={(e)=>{set_con_foundwhen_date(e.target.value)}} value={con_foundwhen_date} max={new Date().toISOString().split("T")[0]}></input>
                    </div>
                </div>
            </form>
            <div className='flex justify-center items-center h-fit w-full'>
            <button className={` ${!allOk()? 'opacity-25':'hover:bg-blue-600 hover:text-white'} px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full  transition`} onClick={()=>{submitClicked()}} disabled={!allOk()} >
                Submit
            </button>
            </div>
            
        </div>
        <div className={`flex flex-col xl:items-end lg:items-start w-full p-2`}>
            <h1 className={`${font1.className} lg:text-4xl text-xl backdrop-blur-md rounded-4xl bg-blue-700/10 h-fit w-fit p-3 pb-1 lg:mb-0 mb-2`}>Where was it?</h1>
            <MapPage2  onSelect={(val) => {console.log('Received markers in parent:', val); set_con_location(val);}}/>
        </div>
    </div>
  )
}
