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
    const claim = await OwnershipClaim.findOne({post_id: con_data.post_id, loser_id: con_data.loser_id})
    return NextResponse.json({ message: 'Ownership claim created', claimed: claim ? true : false })
    } catch (err) {
    console.error("🔥 OWNERSHIP CLAIM CHECK ERROR:", err.message)
    console.error("📌 FULL ERROR:", err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
    }
}