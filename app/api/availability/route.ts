import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    const service = searchParams.get('service');

    if (!date || !service) {
      return NextResponse.json(
        { error: 'Missing date or service parameter' },
        { status: 400 }
      );
    }

    // Mock available time slots
    // TODO: Fetch real availability from database based on existing bookings
    const mockSlots = [
      { id: '09:00', time: '9:00 AM', available: true },
      { id: '09:30', time: '9:30 AM', available: true },
      { id: '10:00', time: '10:00 AM', available: false },
      { id: '10:30', time: '10:30 AM', available: true },
      { id: '11:00', time: '11:00 AM', available: true },
      { id: '11:30', time: '11:30 AM', available: true },
      { id: '14:00', time: '2:00 PM', available: true },
      { id: '14:30', time: '2:30 PM', available: true },
      { id: '15:00', time: '3:00 PM', available: true },
      { id: '15:30', time: '3:30 PM', available: false },
      { id: '16:00', time: '4:00 PM', available: true },
      { id: '16:30', time: '4:30 PM', available: true },
    ];

    return NextResponse.json({ slots: mockSlots }, { status: 200 });
  } catch (error) {
    console.error('Availability error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}
