'use client'
import Image from 'next/image'
import avg_location from '../../../lib/avg_location'
import getDistance from '../../../lib/get_distance'
import {useState, useEffect} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getComplementaryColor } from '../../../lib/complementaryColor'
import edit from '../../../public/resources/edit.png'
import dlt from '../../../public/resources/delete.png'




export default function FoundMiniCard(props) {
    const post = props.post
    const userPosition = props.userPosition
    const ymdt_diff = props.ymdt_diff
    const distance = getDistance(userPosition, avg_location(post.content_location))

    const [show_details, set_show_details] = useState(false)
    const [map_click_tip, set_map_click_tip] = useState(false)
    function formatDate(input) {
        const date = new Date(input);
        const options = { year: 'numeric', month: 'long', day: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    }

  function editClicked() {
    console.log('edit clicked')
  }

  function deleteClicked() {
    console.log('delete clicked')
  }

  return (
    <>
    <div className="w-full p-3 bg-gray-800 text-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 my-1 flex flex-col hover:scale-[0.99]">
        <div className='flex flex-row justify-between'>
            <Image src={edit} alt='EDIT' width={30} height={30} className="object-cover p-1 hover:scale-110 transition-all duration-300 m-1 mt-0 pt-0" onClick={editClicked}/>
            <Image src={dlt} alt='DELETE ' width={30} height={30} className="object-cover p-1 hover:scale-110 transition-all duration-300 m-1 mt-0 pt-0" onClick={deleteClicked}/>
            
        </div>
        <div className='flex flex-row'>
            <Image src={post.content_pic} alt={post.content_name} width={120} height={120} className="rounded-xl object-cover"/>
            <div className='flex flex-col ml-2'>
                <h3 className="text-lg font-semibold mb-1">{post.content_name} {post.content_details.model? `(${post.content_details.model})` : ''}</h3>
                <p className="text-sm text-gray-300 mb-2">{post.content_type}</p>
                {/* <p className="text-sm text-gray-300 mb-2">
                    {placename ? `${placename.city}, ${placename.country}` : 'Loading location...'}
                </p> */}
                <p className="text-sm text-gray-300 mb-2">{`${distance < 1? `${(distance*1000)} m` : `${distance} km`} away`}</p>
                <p className="text-xs text-gray-300 mb-2">Found {`${ymdt_diff.yeard? ymdt_diff.yeard+' years ' : ''}${ymdt_diff.monthd?ymdt_diff.monthd+' months ' : ''}${ymdt_diff.dated?ymdt_diff.dated+' days ' : ''}${ymdt_diff.hourd && !ymdt_diff.monthd ? ymdt_diff.hourd+' hours ' : ''}${ymdt_diff.minuted && !ymdt_diff.dated?ymdt_diff.minuted+' minutes ' : ''} ago`}</p>
            </div>
        </div>
        <div className='flex flex-row justify-between'>
            <button className="mt-2 px-3 py-1 text-sm bg-black/60 rounded-full hover:bg-blue-700 transition-colors" 
            onClick={() => {set_show_details(!show_details);set_map_click_tip(false);}}
            >
                {show_details ? 'Hide Details' : 'View Details'}
            </button>
        </div>
        <AnimatePresence>
        {show_details && (
        <motion.div
            initial={{opacity:0, height:0}}
            animate={{ opacity:1, height:'auto'}}
            exit={{ opacity:0, height:0}}
            transition={{ duration: 0.3 }}
        >
            <div className={`flex items-center m-2 w-fit h-fit p-1 rounded-xl`}
            style={{color: getComplementaryColor(post.content_details.color), backgroundColor: post.content_details.color }}
            >
                Color of the item
            </div>
            <div className={`grid grid-cols-[1fr_3fr] m-2 w-full h-fit p-1 rounded-xl`}
            >
                <p className='font-semibold text-xs'>Special markings </p><p className='bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg text-md p-1 w-fit'>{!!post.content_details.special? post.content_details.special: 'None'}</p>
            </div>
            <div className={`grid grid-cols-[1fr_3fr] m-2 w-full h-fit p-1 rounded-xl`}
            >
                <p className='font-semibold text-xs'>Found</p><p className='bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg text-md p-1 w-fit'>{post.content_foundwhen.time}, {formatDate(post.content_foundwhen.date)}</p>
            </div>
            <div className={`grid grid-cols-[1fr_3fr] m-2 w-full h-fit p-1 rounded-xl`}
            >
                <div className='font-semibold text-xs'>Location found in</div>
                <button className='backdrop-blur-md border border-cyan/20 rounded-2xl shadow-lg text-md p-1 w-fit animated-gradient-bg-foundtab hover:scale-98'
                onClick={() => {
                    set_map_click_tip(true);
                }}
                >
                    Show on map
                </button>
                {map_click_tip && <p className='text-xs text-gray-300 mb-2'>Click on the map to focus on the location</p>}
            </div>
            
            <button className="mt-2 px-3 py-1 text-sm bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                Claim
            </button>
            
        </motion.div>
        )}
        </AnimatePresence>
    </div>
    </>
  )
}
