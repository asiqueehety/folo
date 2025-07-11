'use client'
import { useDarkMode } from "@/app/context/DarkModeContext";

export default function DarkModeToggle()
{
    const { darkmode, setDarkmode } = useDarkMode()

    return(
        <div>
          <button onClick={() => {setDarkmode(!darkmode)}} className='bg-white/10 backdrop-blur-md rounded-full border-2 border-white/20 shadow-xl hover:bg-white/20 hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-[0.99] p-2 text-black font-sans fixed top-3 right-20 z-50'>{darkmode? 'L' : 'D'}</button>
        </div>
    )
}