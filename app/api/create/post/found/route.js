import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongoose'
import FoundPost from '@/models/FoundPost';

export async function POST(request) 
{
    try{
    await connectDB()
    const con_data =  await request.json();
    if (!con_data) {
      return NextResponse.json({ error: 'Missing post data' }, { status: 400 });
    }
    await FoundPost.create(con_data)
    return NextResponse.json({ message: 'Lost post created' })
    } catch (err) {
    console.error("🔥 POST CREATION ERROR:", err.message)
    console.error("📌 FULL ERROR:", err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
    }
}