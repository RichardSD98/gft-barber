import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.service || !data.date || !data.time || !data.fullName || !data.phone || !data.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate booking reference
    const reference = `GFT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // TODO: Save booking to MongoDB
    // For now, just return the reference
    console.log('Booking data received:', {
      ...data,
      reference,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        reference,
        message: 'Booking confirmed successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
