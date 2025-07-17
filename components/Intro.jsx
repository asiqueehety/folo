'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import Footer from './Footer';
import { useState, useEffect } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3
    }
  }
};

export default function Home(props) {
  const [darkmode, setDarkmode] = useState(false);

  useEffect(() => {
    setDarkmode(props.darkmode);
  }, [props.darkmode]);

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap" rel="stylesheet" />
        <style>{`body { font-family: 'Lato', sans-serif; }`}</style>
      </Head>
      <motion.div 
        className="flex flex-col items-center justify-center min-h-full  text-center space-y-10 p-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className={`text-6xl md:text-7xl font-extrabold ${darkmode ? 'text-neutral-100' : 'text-gray-900'} drop-shadow-2xl`}
          variants={fadeInUp}
        >
          Welcome to <span className="text-purple-600">FoLo</span>
        </motion.h1>

        <motion.p
          className={`text-xl md:text-2xl ${darkmode ? 'text-white' : 'text-neutral-700'} max-w-2xl`}
          variants={fadeInUp}
        >
          Bridging the gap between lost and found. Post what you've lost or report what you've found — FoLo connects the dots.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-6"
          variants={fadeInUp}
        >
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#6366F1' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full shadow-lg text-lg transition-all duration-300"
            >
              Login
            </motion.button>
          </Link>
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#EC4899' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full shadow-lg text-lg transition-all duration-300"
            >
              Sign Up
            </motion.button>
          </Link>
        </motion.div>
        <Footer/>
      </motion.div>
    </>
  );
}
// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import Head from 'next/head';
// import { useState, useEffect } from 'react';

// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 1 } }
// };

// const staggerContainer = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.3
//     }
//   }
// };

// export default function Home() {
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     document.body.style.backgroundColor = darkMode ? '#1a202c' : '';
//   }, [darkMode]);

//   return (
//     <>
//       <Head>
//         <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap" rel="stylesheet" />
//         <style>{`body { font-family: 'Lato', sans-serif; }`}</style>
//       </Head>
//       <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 text-gray-900'} transition-colors duration-500`}>
//         <div className="flex justify-end p-4">
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
//           >
//             Toggle {darkMode ? 'Light' : 'Dark'} Mode
//           </button>
//         </div>
//         <motion.div 
//           className="flex flex-col items-center justify-center min-h-full text-center space-y-10 p-4"
//           variants={staggerContainer}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.h1 
//             className="text-6xl md:text-7xl font-extrabold drop-shadow-2xl"
//             variants={fadeInUp}
//           >
//             Welcome to <span className="text-purple-600">FoLo</span>
//           </motion.h1>

//           <motion.p
//             className="text-xl md:text-2xl max-w-2xl"
//             variants={fadeInUp}
//           >
//             Bridging the gap between lost and found. Post what you've lost or report what you've found — FoLo connects the dots.
//           </motion.p>

//           <motion.div
//             className="flex flex-wrap justify-center gap-6 mt-6"
//             variants={fadeInUp}
//           >
//             <Link href="/find-lost">
//               <motion.button
//                 whileHover={{ scale: 1.05, backgroundColor: '#6366F1' }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full shadow-lg text-lg transition-all duration-300"
//               >
//                 Find Lost Item
//               </motion.button>
//             </Link>
//             <Link href="/report-found">
//               <motion.button
//                 whileHover={{ scale: 1.05, backgroundColor: '#EC4899' }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full shadow-lg text-lg transition-all duration-300"
//               >
//                 Report Found Item
//               </motion.button>
//             </Link>
//           </motion.div>

//           <motion.footer 
//             className="text-gray-500 text-sm mt-10"
//             variants={fadeInUp}
//           >
//             &copy; 2025 FoLo. All rights reserved.
//           </motion.footer>
//         </motion.div>
//       </div>
//     </>
//   );
// }
