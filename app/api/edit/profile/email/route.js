import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User from '@/models/User';
import { Types } from 'mongoose';

export async function PUT(request) {
  try {
    await connectDB();

    const { userId, value } = await request.json();

    if (!userId || !value) {
      return NextResponse.json({ error: 'userId and value are required' }, { status: 400 });
    }

    const result = await User.updateOne(
      { _id: new Types.ObjectId(userId) },
      { $set: { email: value } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('User update error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
