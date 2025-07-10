import React from 'react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'

const font1 = Poppins({
  weight:['400'],
  subsets:['latin']
})


export default function LostPopup(props) {

    const pic = props.post_pic
    const name = props.post_name
    const type = props.post_type
    const reward = props.post_reward
    const distance = props.post_distance

  return (
    <div className={`bg-[#3e0000] bg-opacity-90 rounded-3xl shadow-2xl border-2 border-transparent hover:bg-[#543535] hover:border-red-100 transition-colors duration-500 ease-in-out p-0.5 text-slate-200 font-sans ${font1.className} flex flex-col`}>
    <div className='w-fit h-fit p-0 flex flex-row justify-center items-center *:mx-auto'>
        <Image src={pic} alt={name} className='rounded-3xl mx-auto' width={120} height={120}/>
        <p className="text-sm  p-1 rounded-2xl h-fit w-full mx-auto flex justify-center">
            {type}
        </p>
    </div>
      <p className="text-slate-300 text-2xl  p-1 rounded-xl h-fit w-full my-0 py-0">
        {name}
      </p>
      <p className="text-sm  p-1 rounded-2xl h-fit w-full mx-auto flex justify-center">
        {distance} km away
      </p>
    
    <div className="relative px-4 py-1 rounded-xl bg-[#0208a4] text-white shadow-md border border-white/10 overflow-hidden w-fit mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-800 opacity-20 blur-sm animate-pulse z-0"></div>
        <div className="relative z-10 text-center text-sm font-medium leading-none">
            <p className="opacity-90">{reward}</p>
        </div>
    </div>
    <div className='*:border-none *:h-fit *:w-fit *:p-2 *:bg-white/30 *:rounded-4xl flex flex-row justify-center items-center text-sm *:m-2 *:hover:bg-blue-700 *:transition-all *:hover:text-white'>
        <button>
            Show details
        </button>
        <button>
            Claim found
        </button>
    </div>
      
    </div>
  )
}
