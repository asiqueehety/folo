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
    const claim = await FoundClaim.findOne({post_id: con_data.post_id, finder_id: con_data.finder_id})
    return NextResponse.json({ message: 'Found claim created', claimed: claim ? true : false })
    } catch (err) {
    console.error("🔥 FOUND CLAIM CHECK ERROR:", err.message)
    console.error("📌 FULL ERROR:", err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
    }
}