'use client'
import Image from 'next/image'
import avg_location from '../../../lib/avg_location'
import getDistance from '../../../lib/get_distance'
import {useState, useEffect} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getComplementaryColor } from '../../../lib/complementaryColor'
import dynamic from 'next/dynamic';
import { Edit,Trash2 } from 'lucide-react';
const MapContainerProfileCards = dynamic(() => import ('@/components/ProfilePageComponents/LostFoundTabs/Map4/MapContainerProfileCards'), { ssr: false });

export default function FoundMiniCard(props) {
    const [content_name, set_content_name] = useState(null)
    const [content_type, set_content_type] = useState(null)
    const [content_details_model, set_content_details_model] = useState(null)
    const [content_details_color, set_content_details_color] = useState(null)
    const [content_details_special, set_content_details_special] = useState(null)
    const [content_foundwhen_time, set_content_foundwhen_time] = useState(null)
    const [content_foundwhen_date, set_content_foundwhen_date] = useState(null)
    const [content_location, set_content_location] = useState(null)
    const [content_pic, set_content_pic] = useState(null)
    const [userPosition, set_userPosition] = useState([])
    const ymdt_diff = props.ymdt_diff
    const [distance, set_distance] = useState()
    const [post, set_post] = useState(null)
    const [show_details, set_show_details] = useState(false)
    const [map_click_tip, set_map_click_tip] = useState(false)
    const [darkmode, set_darkmode] = useState(false)
    const [confirm_delete, set_confirm_delete] = useState(false)

    const [edit_content_name, set_edit_content_name] = useState(false)
    const [edit_content_type, set_edit_content_type] = useState(false)
    const [edit_content_details_model, set_edit_content_details_model] = useState(false)
    const [edit_content_details_color, set_edit_content_details_color] = useState(false)
    const [edit_content_details_special, set_edit_content_details_special] = useState(false)
    const [edit_content_foundwhen_time, set_edit_content_foundwhen_time] = useState(false)
    const [edit_content_foundwhen_date, set_edit_content_foundwhen_date] = useState(false)
    const [edit_content_location, set_edit_content_location] = useState(false)
    const [edit_content_pic, set_edit_content_pic] = useState(false)
    const [edit_value, set_edit_value] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null);
    const [post_deleted, set_post_deleted] = useState(false)


    function formatDate(input) {
        const date = new Date(input);
        const options = { year: 'numeric', month: 'long', day: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    }
    useEffect(() => {
        set_post(props.post)
        set_userPosition(props.userPosition)
        set_darkmode(props.darkmode)
    }, [props.post, props.userPosition, props.darkmode])

    useEffect(() => {
        set_content_name(props.post.content_name)
        set_content_type(props.post.content_type)
        set_content_details_model(props.post.content_details.model)
        set_content_details_color(props.post.content_details.color)
        set_content_details_special(props.post.content_details.special)
        set_content_foundwhen_time(props.post.content_foundwhen.time)
        set_content_foundwhen_date(props.post.content_foundwhen.date)
        set_content_pic(props.post.content_pic)
        set_content_location(props.post.content_location)
    }, [props.post])

  useEffect(() => {
    set_userPosition(props.userPosition)
    if (post?.content_location && post.content_location.length > 0) {
        set_distance(getDistance({lat: userPosition[0], lng: userPosition[1]}, avg_location(post.content_location)))
    }
  }, [post, userPosition])

  function editClicked(route) {
    switch (route) {
        case 'content_name':
            set_edit_content_name(true)
            break
        case 'content_type':
            set_edit_content_type(true)
            break
        case 'content_details/model':
            set_edit_content_details_model(true)
            break
        case 'content_details/color':
            set_edit_content_details_color(true)
            break
        case 'content_details/special':
            set_edit_content_details_special(true)
            break
        case 'content_foundwhen/time':
            set_edit_content_foundwhen_time(true)
            break
        case 'content_foundwhen/date':
            set_edit_content_foundwhen_date(true)
            break
        case 'content_location':
            set_edit_content_location(true)
            break
        case 'content_pic':
            set_edit_content_pic(!edit_content_pic)
            break
    }
  }

  async function deleteClicked(route) {
    const response = await fetch(`/api/delete/post/${route}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            post_id: post._id,
        }),
    })
    if (response.ok) {
        console.log('Post deleted successfully')
        
    } else {
        console.error('Failed to delete post')
    }
    set_confirm_delete(false)
}

  function saveClicked(route) {
    let value = '';

    if (route === 'content_name') value = content_name;
    else if (route === 'content_type') value = content_type;
    else if (route === 'content_details/model') value = content_details_model;
    else if (route === 'content_details/color') value = content_details_color;
    else if (route === 'content_details/special') value = content_details_special;
    else if (route === 'content_foundwhen/time') value = content_foundwhen_time;
    else if (route === 'content_foundwhen/date') value = content_foundwhen_date;
    else if (route === 'content_location') value = content_location;
    else if (route === 'content_pic') value = content_pic;
    

    set_edit_value(value);  // Optional if needed elsewhere in your state/UI
    edit_in_db(route, value);
    }
  async function edit_in_db(route, value) {
    console.log(route, value)
    try {
        const res = await fetch(`/api/edit/post/found/${route}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            post_id: post._id,
            value: value,
        }),
        });
        const data = await res.json();
        if (res.ok) {
        console.log('Found post update successful')
        } else {
        alert(data.error || 'Found post update failed')
        }
    } catch (err) {
        console.error("Data send failed", err);
    }
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

        set_content_pic(imageUrl);
        console.log("Image uploaded:", imageUrl);
    } catch (err) {
        console.error("Upload failed:", err);
    }
    };

  if (!post) return null;
  return (
    <div className="w-full p-3 bg-gray-800 text-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 my-1 flex flex-col hover:scale-[0.99]">
        <div className='flex flex-row justify-between'>
        <Edit className="text-blue-600 hover:scale-105 h-4 w-4 m-0.5" onClick={()=>editClicked('content_pic')}/>
        {!post_deleted? (!confirm_delete? 
        <Trash2 className="text-blue-600 hover:scale-105 h-4 w-4 m-0.5" onClick={()=>set_confirm_delete(true)}/>
        :
        <div className='flex flex-row text-xs'>
            <p>Are you sure you want to delete this post?</p>
            <button className='bg-red-500 text-white p-1 m-0 h-fit w-fit rounded-2xl hover:bg-cyan-950 transition-all' onClick={()=>{set_post_deleted(true);deleteClicked(`/found`)}}>Yes</button>
            <button className='bg-yellow-600 text-white p-1 m-0 h-fit w-fit rounded-2xl hover:bg-cyan-950 transition-all' onClick={()=>{set_confirm_delete(false)}}>No</button>
        </div>)
        :
        <div className='flex flex-row text-xs'>
            <p>Post deleted</p>
        </div>
        }
        </div>
        {edit_content_pic && <div className="flex items-center space-x-4 m-2">
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
            <button className='bg-yellow-600 text-white p-1 m-0 h-fit w-fit rounded-2xl hover:bg-cyan-950 transition-all text-sm' onClick={()=>{saveClicked('content_pic');set_edit_content_pic(false)}} disabled={!content_pic}>Save</button>
        </div>}
        <div className='flex flex-row'>
            <Image src={!edit_content_pic? content_pic : post.content_pic} alt={post.content_name} width={120} height={120} className="rounded-xl object-cover"/>
            <div className='flex flex-col ml-2'>
            <h3 className="text-lg font-semibold mb-1 flex flex-row">
                {!edit_content_name? content_name : post.content_name}
                {!edit_content_name?
                <Edit className="text-blue-600 hover:scale-105 h-4 w-4 m-0.5" onClick={()=>editClicked('content_name')}/>
                :
                <div className='flex flex-row'>
                    <input type='text' className="peer min-w-16 max-w-26 m-1 placeholder:text-white/30 placeholder:text-xs border border-gray-300 rounded-xl text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition" placeholder='Content Name' onChange={(e)=>{set_content_name(e.target.value)}} value={content_name}></input>
                    <button className='bg-amber-950 text-white p-1 m-0 h-fit w-fit rounded-2xl hover:bg-cyan-950 transition-all text-sm' onClick={()=>{saveClicked('content_name');set_edit_content_name(false)}} disabled={!content_name}>Save</button>
                </div>}
                {!edit_content_details_model? (content_details_model? content_details_model: '') : post.content_details.model}
                {!edit_content_details_model? <Edit className="text-blue-600 hover:scale-105 h-4 w-4 m-0.5" onClick={()=>editClicked('content_details/model')}/>
                :
                <div className='flex flex-row'>
                    <input type='text' className="peer min-w-16 max-w-26 m-1 placeholder:text-white/30 placeholder:text-xs border border-gray-300 rounded-xl text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition" placeholder='Content Name' onChange={(e)=>{set_content_details_model(e.target.value)}} value={content_details_model}></input>
                    <button className='bg-amber-950 text-white p-1 m-0 h-fit w-fit rounded-2xl hover:bg-cyan-950 transition-all text-sm' onClick={()=>{saveClicked('content_details/model');set_edit_content_details_model(false)}} disabled={!content_details_model}>Save</button>
                </div>
                }
                </h3>
                <div className='flex flex-row'>
                    <div className="text-sm text-gray-300 mb-2 flex flex-row">
                        {!edit_content_type? content_type : post.content_type}
                        {!edit_content_type? <Edit className="text-blue-600 hover:scale-105 h-4 w-4 m-0.5" onClick={()=>editClicked('content_type')}/>
                        :
                        <div className='flex flex-row'>
                            <input type='text' className="peer min-w-16 max-w-26 m-1 placeholder:text-white/30 placeholder:text-xs border border-gray-300 rounded-xl text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition" placeholder='Content Type' onChange={(e)=>{set_content_type(e.target.value)}} value={content_type}></input>
                            <button className='bg-amber-950 text-white p-1 m-0 h-fit w-fit rounded-2xl hover:bg-cyan-950 transition-all text-sm' onClick={()=>{saveClicked('content_type');set_edit_content_type(false)}} disabled={!content_type}>Save</button>
                        </div>
                        }</div>
                </div>
                <p className="text-sm text-gray-300 mb-2">{`${distance && distance < 1? `${(distance*1000)} m` : distance && `${distance} km`} away`}</p>
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
            <div className={`flex items-center m-2 w-fit h-fit p-1 rounded-xl flex flex-row`}
            style={ !edit_content_details_color? {color: getComplementaryColor(content_details_color), backgroundColor: content_details_color } : {color: getComplementaryColor(post.content_details.color), backgroundColor: post.content_details.color }}
            >
                {!edit_content_details_color? <div className={`flex items-center m-2 w-fit h-fit p-1 rounded-xl flex flex-row`}
                style={ content_details_color? {color: getComplementaryColor(content_details_color), backgroundColor: content_details_color } : {color: getComplementaryColor(post.content_details.color), backgroundColor: post.content_details.color }}
                >
                    Color of the item
                    <Edit className="text-blue-600 hover:scale-105 h-4 w-4 m-0.5" onClick={()=>editClicked('content_details/color')}/>
                </div>
                :
                <div className='flex flex-row'> 
                    <input type='color' className="peer min-w-16 max-w-26 m-1 placeholder:text-white/30 placeholder:text-xs border border-gray-300 rounded-xl text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition" placeholder='Content Name' onChange={(e)=>{set_content_details_color(e.target.value)}} value={content_details_color}></input>
                    <button className='bg-amber-950 text-white p-1 m-0 h-fit w-fit rounded-2xl hover:bg-cyan-950 transition-all text-sm' onClick={()=>{saveClicked('content_details/color');set_edit_content_details_color(false)}} disabled={!content_details_color}>Save</button>
                </div>
                }
            </div>
            <div className={`grid grid-cols-[1fr_3fr] m-2 w-full h-fit p-1 rounded-xl`}
            >
                <div className='font-semibold text-xs'>Special markings </div><div className='bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg text-md p-1 w-fit flex flex-row'>{!!post.content_details.special? (!edit_content_details_special? content_details_special : post.content_details.special): 'None'}
                {!edit_content_details_special? <Edit className="text-blue-600 hover:scale-105 h-4 w-4 m-0.5" onClick={()=>editClicked('content_details/special')}/>
                :
                <div className='flex flex-row'>
                    <input type='text' className="peer min-w-30 max-w-46 m-1 placeholder:text-white/30 placeholder:text-xs border border-gray-300 rounded-xl text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition" placeholder='Content Name' onChange={(e)=>{set_content_details_special(e.target.value)}} value={content_details_special}></input>
                    <button className='bg-amber-950 text-white p-1 m-0 h-fit w-fit rounded-2xl hover:bg-cyan-950 transition-all text-sm' onClick={()=>{saveClicked('content_details/special');set_edit_content_details_special(false)}} disabled={!content_details_special}>Save</button>
                </div>
                }</div>
            </div>
            <div className={`grid grid-cols-[1fr_3fr] m-2 w-full h-fit p-1 rounded-xl`}
            >
                <p className='font-semibold text-xs'>Found</p>
                <div className='bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg text-md p-1 w-fit flex flex-row'>
                    {!edit_content_foundwhen_time? content_foundwhen_time:post.content_foundwhen.time}
                    {!edit_content_foundwhen_time?
                    <Edit className="text-blue-600 hover:scale-105 h-4 w-4 m-0.5" onClick={()=>editClicked('content_foundwhen/time')}/>
                    :
                    <div className='flex flex-row'>
                    <select 
                        id="dropdown"
                        className="peer min-w-30 max-w-46 m-1 placeholder:text-white/30 placeholder:text-xs border border-gray-300 rounded-xl text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                        defaultValue={""}
                        onChange={(e)=>{set_content_foundwhen_time(e.target.value)}}
                        >
                            <option value="" disabled>Probable time of the day when found</option>
                            <option value="Morning">Morning (6:01 AM - 11:00 AM) </option>
                            <option value="Noon">Noon ( 11:01 AM - 3:00 PM )</option>
                            <option value="Afternoon">Afternoon ( 3:01 PM - 6:00 PM )</option>
                            <option value="Evening">Evening ( 6:01 PM - 8:00 PM )</option>
                            <option value="Night">Night ( 8:01 PM - 12:00 AM )</option>
                            <option value="Midnight">Midnight ( 12:01 AM - 6:00 AM )</option>
                        </select>
                    <button className='bg-amber-950 text-white p-1 m-0 h-fit w-fit rounded-2xl hover:bg-cyan-950 transition-all text-sm' onClick={()=>{saveClicked('content_foundwhen/time');set_edit_content_foundwhen_time(false)}} disabled={!content_foundwhen_time}>Save</button>
                </div>
                    }
                    ,
                    {!edit_content_foundwhen_date? (formatDate(content_foundwhen_date)):(formatDate(post.content_foundwhen.date))}
                    {!edit_content_foundwhen_date? 
                    <Edit className="text-blue-600 hover:scale-105 h-4 w-4 m-0.5" onClick={()=>editClicked('content_foundwhen/date')}/>
                    :
                    <div className='flex flex-row'>
                    <input type='date' className="peer min-w-30 max-w-46 m-1 placeholder:text-white/30 placeholder:text-xs border border-gray-300 rounded-xl text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition" placeholder='Content Name' onChange={(e)=>{set_content_foundwhen_date(e.target.value)}} value={content_foundwhen_date} max={new Date().toISOString().split("T")[0]} ></input>
                    <button className='bg-amber-950 text-white p-1 m-0 h-fit w-fit rounded-2xl hover:bg-cyan-950 transition-all text-sm' onClick={()=>{saveClicked('content_foundwhen/date');set_edit_content_foundwhen_date(false)}} disabled={!content_foundwhen_date}>Save</button>
                </div>
                    }
                </div>
            </div>
            <div className={`grid grid-cols-[1fr_3fr] m-2 w-full h-fit p-1 rounded-xl`}
            >
                <div className='font-semibold text-xs'>Location found in</div>
                <button className='backdrop-blur-md border border-cyan/20 rounded-2xl shadow-lg text-md p-1 w-fit animated-gradient-bg-foundtab hover:scale-98'
                onClick={() => {
                    set_map_click_tip(!map_click_tip);
                }}
                >
                    {map_click_tip? 'Hide map' : 'Show on map'}
                </button>
                <Edit className="text-blue-700 hover:scale-105 h-4 w-4 m-0.5" onClick={()=>editClicked('content_location')}/>
                {map_click_tip && (<>
                <p className='text-xs text-gray-300 mb-2'>Click on the map to focus on the location</p>
                </>)}
            </div>
        </motion.div>
        )}
        </AnimatePresence>
        <AnimatePresence>
            {map_click_tip && (
                <motion.div
                initial={{opacity:0, height:0}}
                animate={{ opacity:1, height:'auto'}}
                exit={{ opacity:0, height:0}}
                transition={{ duration: 0.3 }}
                >
                    <MapContainerProfileCards post={post} userPosition={userPosition} darkmode={darkmode} lo_fo={false}/>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  )
}
