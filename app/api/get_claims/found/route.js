import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongoose'
import FoundClaim from '@/models/FoundClaim';

export async function POST(request) 
{
    try{
    await connectDB()
    const con_data =  await request.json();
    if (!con_data) {
      return NextResponse.json({ error: 'Missing claim data' }, { status: 400 });
    }
    const claims = await FoundClaim.find({post_id: con_data.post_id})
    return NextResponse.json({ claims: claims })
    } catch (err) {
    console.error("🔥 FOUND CLAIM fetching ERROR:", err.message)
    console.error("📌 FULL ERROR:", err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
    }
}