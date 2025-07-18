import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongoose'
import OwnershipClaim from '@/models/OwnershipClaim';

export async function POST(request) 
{
    try{
    await connectDB()
    const con_data =  await request.json();
    if (!con_data) {
      return NextResponse.json({ error: 'Missing claim data' }, { status: 400 });
    }
    const claims = await OwnershipClaim.find({post_id: con_data.post_id})
    return NextResponse.json({ claims: claims })
    } catch (err) {
    console.error("🔥 OWNERSHIP CLAIM fetching ERROR:", err.message)
    console.error("📌 FULL ERROR:", err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
    }
}