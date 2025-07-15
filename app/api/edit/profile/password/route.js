import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User from '@/models/User';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';

export async function PUT(request) {
  try {
    await connectDB();

    const { userId, current_pw, new_pw } = await request.json();

    if (!userId || !current_pw || !new_pw) {
      return NextResponse.json({ error: 'userId, current_pw, and new_pw are required' }, { status: 400 });
    }

    const user = await User.findOne({ _id: new Types.ObjectId(userId) });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(current_pw, user.pw_hash)
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const hashed_new_pw = await bcrypt.hash(new_pw, 10)

    const result = await User.updateOne(
      { _id: new Types.ObjectId(userId) },
      { $set: { pw_hash: hashed_new_pw } }
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
