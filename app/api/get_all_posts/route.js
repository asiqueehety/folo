import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import LostPost from '@/models/LostPost';
import FoundPost from '@/models/FoundPost';

export async function GET() {
  try {
    await connectDB();

    const lostPosts = await LostPost.find({});
    const foundPosts = await FoundPost.find({});

    return NextResponse.json({
      lost_posts: lostPosts,
      found_posts: foundPosts,
    });
    
  } catch (err) {
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
