import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongoose'

export async function GET(request) {
    await connectDB()
    
    return NextResponse.json(user);
}
 
export async function HEAD(request) {}
 
export async function POST(request) {}
 
export async function PUT(request) {}
 
export async function DELETE(request) {}
 
export async function PATCH(request) {}
 
// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and set the appropriate Response `Allow` header depending on the other methods defined in the Route Handler.
export async function OPTIONS(request) {}