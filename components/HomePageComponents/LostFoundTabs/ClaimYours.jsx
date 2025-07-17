'use client'

import { useState,useEffect } from 'react';

export default function ClaimYours({ onClose , post, loser_id , setClaimed}) {
  const [claimMessage, setClaimMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [con_pic, set_con_pic] = useState(null);
  const [claimed,set_claimed] = useState(false);

  useEffect(() => {
    checkClaim();
  }, [claimed]);


  async function checkClaim() {
    const res = await fetch('/api/check/claim/ownership', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {post_id: post._id, loser_id: loser_id}
      ),
    });
    const data = await res.json();
    console.log(data);
    set_claimed(data.claimed);
  }

  async function submitClaim() {
    const res = await fetch('/api/create/claim/ownership', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({claimMessage, con_pic, post, loser_id}),

    });
    const data = await res.json();
    console.log(data);
    onClose();
  }


  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await fetch('/api/upload_image', {
        method: 'POST',
        body: formData,
        });

        const data = await res.json();
        const imageUrl = data.url;

        set_con_pic(imageUrl);
        console.log("Image uploaded:", imageUrl);
    } catch (err) {
        console.error("Upload failed:", err);
    }
    };

  return (
      <div
        className="relative inset-0 bg-none backdrop-blur-sm flex items-center justify-center z-50 mt-3"
      >
        {!claimed? <div
          className="bg-white rounded-3xl p-6 w-[90%] max-w-md text-gray-900 shadow-xl relative"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">Did you lose it?</h2>
          <p className="mb-4 text-gray-600 text-center">
            Provide some proof to verify your claim.
          </p>

          <textarea
            className="w-full h-24 p-3 border rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-300 outline-none resize-none"
            placeholder="Type your message..."
            value={claimMessage}
            onChange={(e) => setClaimMessage(e.target.value)}
          ></textarea>

          <div className="flex items-center space-x-4 m-2">
              <label
                  htmlFor="file-upload"
                  className="cursor-pointer px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
              >
                  Upload your image with the item
              </label>

              <span className="text-sm text-gray-500">
                  {selectedFile ? selectedFile.name : 'No file selected'}
              </span>
              <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
              />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-xl transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-xl transition disabled:opacity-50"
              disabled={!claimMessage.trim() || !con_pic}
              onClick={()=>{submitClaim();set_claimed(true)}}
            >
              Submit Claim
            </button>
          </div>
        </div>
        :
        <div className='bg-white rounded-3xl p-6 w-[90%] max-w-md text-gray-900 shadow-xl relative'>
          <h2 className='text-2xl font-bold mb-4 text-center text-indigo-700'>Claimed</h2>
          <p className='mb-4 text-gray-600 text-center'>
            Your claim has been submitted.
          </p>
          <button className='bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-xl transition' onClick={onClose}>Close</button>
        </div>  
      }
      </div>
  );
}
