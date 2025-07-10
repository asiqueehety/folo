import React from 'react'
import {Inter, Poppins} from 'next/font/google'

const font1 = Poppins({
    weight:['400'],
    subsets:['latin']
  })

export default function FoundTab() {
  return (
    <div className={`bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/20 shadow-xl hover:bg-white/20 hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-[0.99] p-2 text-black font-sans m-1 ${font1.className} w-full animated-gradient-bg-foundtab`}>
        <h2 className="text-5xl font-extrabold mb-6 tracking-wide">Found</h2>
        <p className="text-black/80 leading-relaxed">
            Let's find it all out.
        </p>
    </div>
  )
}
