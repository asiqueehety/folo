'use client'

import { Mulish } from 'next/font/google'
import React from 'react'
import { useState, useEffect } from 'react'
import SearchableDropdown from './reusables/SearchableDropdown'
import dynamic from 'next/dynamic';
const MapPage = dynamic(() => import('@/components/Map'), { ssr: false });

const font1 = Mulish(
{
    weight:['900'],
    subsets: ['latin'],
})
const font2 = Mulish(
{
    weight:['700'],
    subsets: ['latin'],
})
export function inputStyles()
{
    return "md:w-full w-75 h-fit max-w-md px-2 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-gray-300 text-gray-800 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent duration-200 m-2 transition-all";
}
export default function CreateLostPostPage() {
  const [con_name, set_con_name] = useState('')
  const [con_type, set_con_type] = useState('')
  const [con_lastused_time, set_con_lastused_time] = useState('')
  const [con_lastused_date, set_con_lastused_date] = useState('')
  const [con_lastused, set_con_lastused] = useState({})
  const [con_location, set_con_location] = useState({})
  const [con_color, set_con_color] = useState('')
  const [con_shape, set_con_shape] = useState('')
  const [con_model, set_con_model] = useState('')
  const [con_special, set_con_special] = useState('')
  const [con_details, set_con_details] = useState({})
  const [con_pic, set_con_pic] = useState('')
  const [con, set_con] = useState({})
  
  const shapes = ["Circle","Rectangle","Square","Oval","Cylinder","Sphere","Triangle","Heart","Star","Hexagon"];

  useEffect(() =>
  {
    set_con_lastused
    ({
        time: con_lastused_time,
        date: con_lastused_date,
    });
  }, [con_lastused_time, con_lastused_date]);

  useEffect(() =>
  {
    set_con_details
    ({
        color: con_color,
        model: con_model,
        special: con_special,
    });
  }, [con_color, con_model, con_special]);

  function allOk()
  {
    return !(con_name=='' || con_type=='' || con_color=='' || con_lastused_time=='' || con_lastused_date == '' || con_location == [{}])
  }

  return (
    <div className={`flex xl:flex-row flex-col`}>
        <div className={`flex flex-col lg:justify-items-start w-full`}>
            <h1 className={`${font1.className} lg:text-6xl text-3xl backdrop-blur-md rounded-4xl bg-blue-700/10 h-fit w-fit p-3 m-2`}>Tell us what you lost</h1>
            <form>
                <div className='flex md:flex-row flex-col'>
                    <input type='text' className={inputStyles()} placeholder='What was the item?' onChange={(e)=>{set_con_name(e.target.value)}} value={con_name}></input>
                    <SearchableDropdown onSelect={(val) => set_con_type(val)} />
                </div>
                <input type='file' accept='image/*' className={inputStyles()} onChange={(e) => {set_con_pic(e.target.files[0])}}></input>
                <div>
                    <h1 className={`${font2.className} m-2 lg:text-2xl text-md`}>Add details of the lost item</h1>
                    <div className='flex flex-col'>
                        <div className='flex flex-row items-center'>
                            <div className={`md:w-full h-fit max-w-md px-2 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-gray-300 text-gray-800 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent duration-200 m-2 transition-all w-63`}>{!!con_color? con_color:'Choose color'}</div>
                            <input type='color' className='rounded-full w-10 h-10' placeholder='Choose color' onChange={(e)=>{set_con_color(e.target.value)}} value={con_color}></input>
                        </div>
                        {/* <select 
                        id="dropdown"
                        className={inputStyles()}
                        defaultValue={""}
                        >
                            <option value="" disabled>Choose shape</option>
                            {shapes.map((shape, ind)=>
                                (
                                    <option key={ind} value={`${shape}`}>{shape}</option>
                                )
                            )}
                        </select> */}
                        <input type='text' className={inputStyles()} placeholder='Specify model' onChange={(e)=>{set_con_model(e.target.value)}} value={con_model}></input>
                        <input type='text' className={inputStyles()} placeholder='Any special markings?' onChange={(e)=>{set_con_special(e.target.value)}} value={con_special}></input>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <h1 className={`${font2.className} m-2 lg:text-2xl text-md`}>When did you last see/use it?</h1>
                    <div className='flex md:flex-row flex-col'>
                            <select 
                            id="dropdown"
                            className={inputStyles()}
                            defaultValue={""}
                            onChange={(e)=>{set_con_lastused_time(e.target.value)}}
                            >
                                <option value="" disabled>Probable time of the day when lost</option>
                                <option value="Morning">Morning (6:01 AM - 11:00 AM) </option>
                                <option value="Noon">Noon ( 11:01 AM - 3:00 PM )</option>
                                <option value="Afternoon">Afternoon ( 3:01 PM - 6:00 PM )</option>
                                <option value="Evening">Evening ( 6:01 PM - 8:00 PM )</option>
                                <option value="Night">Night ( 8:01 PM - 12:00 AM )</option>
                                <option value="Midnight">Midnight ( 12:01 AM - 6:00 AM )</option>
                            </select>

                        <input type='date' className={inputStyles()} placeholder='When did you last see it?' onChange={(e)=>{set_con_lastused_date(e.target.value)}} value={con_lastused_date} max={new Date().toISOString().split("T")[0]}></input>
                    </div>
                </div>
            </form>
            <button className={` ${!allOk()? 'opacity-25 disabled':'hover:bg-blue-600 hover:text-white'} px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full  transition`}>
                Submit
            </button>
        </div>
        <div className={`flex flex-col xl:items-end lg:items-start w-full p-2`}>
            <h1 className={`${font2.className} lg:text-4xl text-xl backdrop-blur-md rounded-4xl bg-blue-700/10 h-fit w-fit p-3 pb-1 lg:mb-0 mb-2`}>Where could it probably be?</h1>
            <MapPage  onSelect={(val) => set_con_location(val)}/>
        </div>
        

    </div>
  )
}
