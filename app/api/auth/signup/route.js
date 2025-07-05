import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import connectDB from '@/lib/mongoose'
import User from '@/models/User'

export async function POST(request) 
{
    try{
    await connectDB()
    const 
    {
        username,
        email,
        pw,
        phone,
        address,
        role
    } =  await request.json();

    const user_email = await User.findOne({email})
    if (user_email) return NextResponse.json({ error: 'Email already in use' }, { status: 404 })
    const user_name = await User.findOne({username})
    if (user_name) return NextResponse.json({ error: 'Username already in use' }, { status: 404 })
    

    const pw_hash = await bcrypt.hash(pw, 10)
    await User.create({ username, email, pw_hash, phone, address, role })
    return NextResponse.json({ message: 'User created' })
    } catch (err) {
  console.error("🔥 SIGNUP ERROR:", err.message)
  console.error("📌 FULL ERROR:", err)
  return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
}

}