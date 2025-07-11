'use client'

import { createContext, useContext, useState } from 'react'

const DarkModeContext = createContext()

export const DarkModeProvider = ({ children }) => {
  const [darkmode, setDarkmode] = useState(false)

  return (
    <DarkModeContext.Provider value={{ darkmode, setDarkmode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkMode = () => useContext(DarkModeContext)
