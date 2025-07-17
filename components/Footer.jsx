//generate code for footer

import React from 'react'
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};


export default function Footer() {
  return (
    <motion.footer 
          className="text-gray-500 text-sm mt-10 bottom-5 fixed"
          variants={fadeInUp}
        >
          <div className="text-center">&copy; 2025 <a href='https://asiqueehety.vercel.app' target='_blank' rel='noopener noreferrer' className='text-blue-500 hover:text-blue-600'>Asique Ehety</a>. All rights reserved.</div>
          <div className="text-center flex items-center justify-center gap-4 flex-row m-3">
          <a href='https://github.com/asiqueehety' target='_blank' rel='noopener noreferrer'>
            <Github className='w-4 h-4' />
            </a>
            <a href='https://linkedin.com/in/asique96' target='_blank' rel='noopener noreferrer'>
            <Linkedin className='w-4 h-4' />
            </a>
            <a href='mailto:asique228@gmail.com' target='_blank' rel='noopener noreferrer'>
            <Mail className='w-4 h-4' />
            </a>
            
          </div>
        </motion.footer>
  )
}