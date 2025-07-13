import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongoose'
import LostPost from '@/models/LostPost'
import FoundPost from '@/models/FoundPost'

import mongoose from 'mongoose'

export async function POST(request) {
  try {
    await connectDB();
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const lostp = await LostPost.find({loser_id: userId});
    const foundp = await FoundPost.find({finder_id: userId});


    return NextResponse.json({
        lost: lostp,
        found: foundp,
      });

  } catch (err) {
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
