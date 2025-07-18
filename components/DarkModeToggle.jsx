'use client'
import { useDarkMode } from "@/app/context/DarkModeContext";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle()
{
    const { darkmode, setDarkmode } = useDarkMode()

    return(
        <div>
          <button onClick={() => {setDarkmode(!darkmode)}} className={`bg-white/10 backdrop-blur-md rounded-full border-2 border-white/20 shadow-xl hover:bg-white/20 hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-[0.99] p-2 text-white font-sans m-2`}>
            {darkmode? 
            <Sun className="lg:w-6 lg:h-6 w-3 h-3"/> : <Moon className="lg:w-6 lg:h-6 w-3 h-3 text-black"/>}</button>
        </div>
    )
}