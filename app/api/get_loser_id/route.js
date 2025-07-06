// /app/api/get-user/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return NextResponse.json({ error: 'No token' }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_secret);
    return NextResponse.json({ userId: decoded.id });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
