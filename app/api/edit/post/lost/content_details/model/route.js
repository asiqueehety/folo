import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import LostPost from '@/models/LostPost';
import { Types } from 'mongoose';

export async function PUT(request) {
  try {
    await connectDB();

    const { post_id, value } = await request.json();

    if (!post_id || !value) {
      return NextResponse.json({ error: 'post_id and value are required' }, { status: 400 });
    }

    const result = await LostPost.updateOne(
      { _id: new Types.ObjectId(post_id) },
      { $set: { 'content_details.model': value } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Post updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Post update error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
