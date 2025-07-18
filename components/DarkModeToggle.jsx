'use client'
import { useDarkMode } from "@/app/context/DarkModeContext";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle()
{
    const { darkmode, setDarkmode } = useDarkMode()

    return(
        <div>
          <button onClick={() => {setDarkmode(!darkmode)}} className={`bg-white/10 backdrop-blur-md rounded-full border-2 border-white/20 shadow-xl hover:bg-white/20 hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-[0.99] p-2 text-white font-sans fixed top-5 right-10 z-50`}>{darkmode? 
            <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}</button>
        </div>
    )
}