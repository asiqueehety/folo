// import connectDB from "@/lib/mongoose";
// import { NextResponse } from 'next/server'
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import User from '@/models/User'
 
// export async function POST(request) 
// {
//     await connectDB();

//     const { email, password } = request.body;

//     const user = await User.findOne({ email });
//     if (!user) 
//     {
//         return NextResponse.json({ error: 'User not found' }, { status: 404 })
//     }
//     const isPasswordValid = await bcrypt.compare(pw, user.pw_hash)
//     if (!isPasswordValid)
//     {
//       return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
//     }

        
// }


import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import connectDB from '@/lib/mongoose'
import User from '@/models/User'

export async function POST(request) {
  try {
    await connectDB()

    const { email, pw } = await request.json()

    // 1. Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // 2. Compare passwords
    const isPasswordValid = await bcrypt.compare(pw, user.pw_hash)
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // 3. Sign JWT Token (expires in 7 days)
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_secret,
      { expiresIn: '7d' }
    )

    // 4. Return token to client
    return NextResponse.json({ token }, { status: 200 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
