
import Image from 'next/image'
import avg_location from '../../../lib/avg_location'
import getDistance from '../../../lib/get_distance'



export default function LostMiniCard(props) {
    const post = props.post
    const userPosition = props.userPosition
    const ymdt_diff = props.ymdt_diff
    const distance = getDistance(userPosition, avg_location(post.content_location)) 
  return (
    <div className="w-full p-3 bg-neutral-800 text-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 my-1 flex flex-col hover:scale-[0.99]   ">
        <div className='flex flex-row'>
            <Image src={post.content_pic} alt={post.content_name} width={120} height={120} className="rounded-xl object-cover"/>
            <div className='flex flex-col ml-2'>
                <h3 className="text-lg font-semibold mb-1">{post.content_name} {post.content_details.model? `(${post.content_details.model})` : ''}</h3>
                <div className='flex flex-row'>
                    <p className="text-sm text-gray-300 mb-2">{post.content_type}</p>
                </div>
                
                {/* <p className="text-sm text-gray-300 mb-2">
                    {placename ? `${placename.city}, ${placename.country}` : 'Loading location...'}
                </p> */}
                <p className="text-sm text-gray-300 mb-2">{`${distance < 1? `${(distance*1000)} m` : `${distance} km`} away`}</p>
                <p className="text-xs text-gray-300 mb-2">Lost {`${ymdt_diff.yeard? ymdt_diff.yeard+' years ' : ''}${ymdt_diff.monthd?ymdt_diff.monthd+' months ' : ''}${ymdt_diff.dated?ymdt_diff.dated+' days ' : ''}${ymdt_diff.hourd? ymdt_diff.hourd+' hours ' : ''}${ymdt_diff.minuted?ymdt_diff.minuted+' minutes ' : ''} ago`}</p>
                
            </div>
            <div>

            </div>
        </div>
        <div className='flex flex-row justify-between'>
            <button className="mt-2 px-3 py-1 text-sm bg-black/60 rounded-full hover:bg-red-700 transition-colors">
                View Details
            </button>
            <p className="text-sm text-gray-300 mb-0 animated-gradient-bg-rewardBtn w-fit px-3 py-2 rounded-3xl">$ {post.finder_reward}</p>
            <button className="mt-2 px-3 py-1 text-sm bg-red-600 rounded-full hover:bg-red-700 transition-colors">
                Claim found
            </button>
        </div>
        
    </div>
  )
}
