import { NextRequest, NextResponse } from 'next/server';

const services = [
  {
    id: 'kids-under-7',
    name: 'Kids Haircut',
    duration: 45,
    price: 90,
    description: 'Professional haircut for children under 7 years old.',
  },
  {
    id: 'kids-under-16',
    name: 'Kids Haircut',
    duration: 45,
    price: 120,
    description: 'Expert styling for young teens aged 7-16 years.',
  },
  {
    id: 'adults-haircut',
    name: 'Adults Haircut',
    duration: 45,
    price: 150,
    description: 'Premium haircut service for adults over 16 years old.',
    featured: true,
  },
  {
    id: '31-days-package',
    name: '31 Days Package',
    duration: 45,
    price: 450,
    description: 'Unlimited haircuts for 31 days. Perfect for maintaining your style.',
  },
  {
    id: '3-months-unlimited',
    name: '3 Months Unlimited',
    duration: 45,
    price: 1100,
    description: 'Enjoy unlimited haircuts for 3 months. Best value package.',
  },
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error('Services error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
