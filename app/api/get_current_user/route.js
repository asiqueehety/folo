import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongoose'
import User from '@/models/User'
import mongoose from 'mongoose'

export async function POST(request) {
  try {
    await connectDB();
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const user = await User.findById(new mongoose.Types.ObjectId(userId));
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
