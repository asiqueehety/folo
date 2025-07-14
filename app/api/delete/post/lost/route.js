import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import LostPost from '@/models/LostPost';
import { Types } from 'mongoose';

export async function DELETE(request) {
  try {
    await connectDB();

    const { post_id } = await request.json();

    if (!post_id) {
      return NextResponse.json({ error: 'post_id is required' }, { status: 400 });
    }

    const result = await LostPost.deleteOne(
      { _id: new Types.ObjectId(post_id) }
    );  

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Post delete error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
