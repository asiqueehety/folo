'use client'
import Image from 'next/image'
import {useState} from 'react'
import {motion , AnimatePresence} from 'framer-motion'

export default function FoundClaimCard({ claim , expand_image}) {

    const [user, set_user] = useState(null)
    const [show_user , set_show_user] = useState(false)
    async function get_user() {
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: claim.finder_id,
            }),
        })
        const data = await res.json()
        set_user(data)
    }

    return (
    <div className="w-full flex flex-col bg-neutral-700 text-white rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-300 mt-2 mr-2">
        <div className="flex flex-row items-center gap-4">
            <div className="w-20 h-20 relative flex-shrink-0">
                <Image
                    src={claim.claim_pic}
                    alt="Claim proof"
                    fill
                    className="rounded-lg object-cover"
                    onClick={() => {
                        if (typeof expand_image === 'function') {
                          expand_image(claim.claim_pic);
                        } else {
                          console.error("expand_image is not a function", expand_image);
                        }
                    }}
                />
            </div>
            <div className="flex flex-col flex-grow">
                <p className="text-sm text-gray-300">{claim.claim_message}</p>
                <p className="text-xs text-gray-400 mt-1">Status: 
                    <span className={`ml-1 font-semibold ${
                        claim.status === 'Approved' ? 'text-green-400'
                        : claim.status === 'Rejected' ? 'text-red-400'
                        : 'text-yellow-400'
                    }`}>
                        {claim.status}
                    </span>
                </p>
            </div>
        </div>
        <div className={`flex flex-row-reverse`}>
            <button className="bg-blue-950 text-white px-4 py-2 rounded-md text-xs" onClick={()=>{
                set_show_user(!show_user);
                get_user();
            }}>
                {!show_user? 'View finder details' : 'Hide finder details'}
            </button>
        </div>
        <AnimatePresence>
            {show_user && !!user && (
                <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                >
                    <p className="text-sm text-gray-300">{user.username}</p>
                    <p className="text-sm text-gray-300">{user.email}</p>
                    <p className="text-sm text-gray-300">{user.phone}</p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
    )
}
