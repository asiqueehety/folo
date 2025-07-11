'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import avg_location from '../../../lib/avg_location'
import getDistance from '../../../lib/get_distance'



export default function LostMiniCard(props) {
    const post = props.post
    const userPosition = props.userPosition
    const ymdt_diff = props.ymdt_diff
    const distance = getDistance(userPosition, avg_location(post.content_location))
    // const [placename, setPlacename] = useState(null);

    // async function get_placename(lat, lng)
    // {
    //     try {
    //     const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
    //     const data = await res.json();
    //     const address = data.address;

    //     const _country = address.country || '';
    //     const _state = address.state || '';
    //     const _city = address.city || address.town || address.village || '';
    //     const _suburb = address.suburb || '';
    //     const _postcode = address.postcode || '';
    //     const _full = `${_suburb}, ${_city}, ${_state}, ${_country} - ${_postcode}`;
    //     const place_name = {
    //         country: _country,
    //         state: _state,
    //         city: _city,
    //         suburb: _suburb,
    //         postcode: _postcode
    //     }
    //     console.log(place_name)
    //     return place_name;
    //     } catch (err) {
    //     console.error(err);
    //     }
    // }

    // useEffect(() => {
    //   const getPlace = async () => {
    //     const avgLoc = avg_location(post.content_location);
    //     const name = await get_placename(avgLoc.lat, avgLoc.lng);
    //     setPlacename(name);
    //   };
    //   getPlace();
    // }, [post]);
  
  return (
    <div className="w-full p-4 bg-gray-800 text-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 my-1 flex flex-col hover:scale-[0.99]   ">
        <div className='flex flex-row'>
            <Image src={post.content_pic} alt={post.content_name} width={120} height={120} className="rounded-xl object-cover"/>
            <div className='flex flex-col ml-2'>
                <h3 className="text-lg font-semibold mb-1">{post.content_name} {post.content_details.model? `(${post.content_details.model})` : ''}</h3>
                <p className="text-sm text-gray-300 mb-2">{post.content_type}</p>
                {/* <p className="text-sm text-gray-300 mb-2">
                    {placename ? `${placename.city}, ${placename.country}` : 'Loading location...'}
                </p> */}
                <p className="text-sm text-gray-300 mb-2">{`${distance < 1? `${(distance*1000)} m` : `${distance} km`} away`}</p>
                <p className="text-xs text-gray-300 mb-2">Lost {`${ymdt_diff.yeard? ymdt_diff.yeard+' years ' : ''}${ymdt_diff.monthd?ymdt_diff.monthd+' months ' : ''}${ymdt_diff.dated?ymdt_diff.dated+' days ' : ''}${ymdt_diff.hourd? ymdt_diff.hourd+' hours ' : ''}${ymdt_diff.minuted?ymdt_diff.minuted+' minutes ' : ''} ago`}</p>
                <p className="text-sm text-gray-300 mb-2 animated-gradient-bg-rewardBtn w-fit px-2 py-1 rounded-3xl">$ {post.finder_reward}</p>
            </div>
            <div>

            </div>
        </div>
        <div className='flex flex-row justify-between'>
            <button className="mt-2 px-3 py-1 text-sm bg-red-600 rounded-full hover:bg-red-700 transition-colors">
                View Details
            </button>
            <button className="mt-2 px-3 py-1 text-sm bg-red-600 rounded-full hover:bg-red-700 transition-colors">
                Claim found
            </button>
        </div>
        
    </div>
  )
}
