import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const response = NextResponse.next();
    // request.json();
    return Response.json({ message: 'test' });
}

export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const b = await request.json();
    const queryString = searchParams.get('a');
    console.log(b);
    console.log(queryString);
    return Response.json({ message: 'test' });
}