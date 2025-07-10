import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing lat or lon query parameter' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://us1.locationiq.com/v1/reverse?key=${process.env.REV_GEO_API_KEY}&lat=${lat}&lon=${lon}&format=json&`, {
      headers: {
        'User-Agent': 'YourAppName/1.0 (your email or website)'
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch from LocationIQ' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
