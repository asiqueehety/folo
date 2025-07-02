// 'use client'

// import { Lato } from 'next/font/google'
// import React from 'react'
// import Link from 'next/link'

// const font1 = Lato({
//   weight:['900'],
//   subsets: ['latin'],
// })

// const font2 = Lato({
//   weight: ['700'],
//   subsets: ['latin'],

// })

// export default function NavBar(dest) {
//   function linkClicked()
//   {
//     const token = localStorage.getItem('token') // Or whatever key you're storing
//     if (token) {
//       return dest;
//     } else {
//       return '/signup'
//     }
//   }

//   return (
//     <div className={`${font1.className}`}>
//         <nav className='w-full h-30 bg-cyan-900 grid lg:grid-cols-[7fr_2fr] grid-cols-[5fr_4fr]'>
//             <div className='m-4'>
//             <h1 className='text-6xl'><Link href='/'>FoLo</Link></h1>
//             <p>Never lose a thing.</p>
//             </div>
//             <div className='flex flex-col'>
//               <Link href={linkClicked('/lost')} className='h-fit w-full rounded-2xl bg-white text-blue-950 lg:text-xl text-sm max-w-50 lg:p-2 p-1 m-2 mb-1'>Lost something?</Link>
//               <Link href={linkClicked('/found')} className='h-fit w-full rounded-2xl bg-white text-blue-950 lg:text-xl text-sm max-w-50 lg:p-2 p-1 m-2 mb-1'>Found something?</Link>
//             </div>
//         </nav>
//     </div>
//   )
// }


'use client'

import { Lato } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const font1 = Lato({
  weight: ['900'],
  subsets: ['latin'],
})

const font2 = Lato({
  weight: ['700'],
  subsets: ['latin'],
})

export default function NavBar() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // This runs only on the client
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  function handleClick(destination) {
    if (isLoggedIn) {
      router.push(destination)
    } else {
      router.push('/login')
    }
  }

  return (
    <div className={`${font1.className}`}>
      <nav className='w-full h-30 bg-cyan-900 grid lg:grid-cols-[7fr_2fr] grid-cols-[5fr_4fr]'>
        <div className='m-4'>
          <h1 className='text-6xl'><Link href='/'>FoLo</Link></h1>
          <p>Never lose a thing.</p>
        </div>
        <div className='flex flex-col'>
          <button
            onClick={() => handleClick('/lost')}
            className='h-fit w-full rounded-2xl bg-white text-blue-950 lg:text-xl text-sm max-w-50 lg:p-2 p-1 m-2 mb-1'
          >
            Lost something?
          </button>
          <button
            onClick={() => handleClick('/found')}
            className='h-fit w-full rounded-2xl bg-white text-blue-950 lg:text-xl text-sm max-w-50 lg:p-2 p-1 m-2 mb-1'
          >
            Found something?
          </button>
        </div>
      </nav>
    </div>
  )
}
