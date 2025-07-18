import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongoose'
import User from '@/models/User'

export async function POST(request) {
    try {
        await connectDB()
        const { user_id } = await request.json()

        const user = await User.findById(user_id).select('-password -__v') // exclude sensitive fields if any

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        return NextResponse.json(user)
    } catch (err) {
        console.error("🔥 USER FETCH ERROR:", err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
