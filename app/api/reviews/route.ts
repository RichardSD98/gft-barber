import { NextRequest, NextResponse } from 'next/server';

// Mock database of reviews
const reviewsDatabase = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    rating: 5,
    comment: 'Excellent service! The barber knew exactly what I wanted and delivered. Will definitely come back.',
    createdAt: '2026-04-20T10:30:00Z',
    approved: true,
  },
  {
    id: '2',
    name: 'David Nkosi',
    rating: 5,
    comment: 'Best haircut I\'ve had in Windhoek. Professional, clean, and reasonably priced. Highly recommend!',
    createdAt: '2026-04-19T14:15:00Z',
    approved: true,
  },
  {
    id: '3',
    name: 'Samuel Kaputu',
    rating: 4,
    comment: 'Great experience overall. Quick service and good quality. Small wait time but worth it.',
    createdAt: '2026-04-18T09:45:00Z',
    approved: true,
  },
  {
    id: '4',
    name: 'Okechukwu Mensah',
    rating: 5,
    comment: 'Amazing barber shop. Clean environment, friendly staff, and excellent haircut. 10/10!',
    createdAt: '2026-04-17T16:20:00Z',
    approved: true,
  },
  {
    id: '5',
    name: 'Johannes Petrus',
    rating: 4,
    comment: 'Good quality work. The booking process is smooth and convenient. Slightly expensive but fair.',
    createdAt: '2026-04-16T11:00:00Z',
    approved: true,
  },
  {
    id: '6',
    name: 'Michael Otieno',
    rating: 5,
    comment: 'Fantastic service! The barber was professional and attentive to detail. Will be a regular customer.',
    createdAt: '2026-04-15T13:30:00Z',
    approved: true,
  },
  {
    id: '7',
    name: 'Leon Strube',
    rating: 3,
    comment: 'Good haircut but the shop could be cleaner. Service was adequate but not exceptional.',
    createdAt: '2026-04-14T10:00:00Z',
    approved: true,
  },
  {
    id: '8',
    name: 'Thabo Mchunu',
    rating: 5,
    comment: 'Outstanding! Best barber in town. I\'ve recommended them to all my friends.',
    createdAt: '2026-04-13T15:45:00Z',
    approved: true,
  },
];

export async function GET(request: NextRequest) {
  try {
    // Return only approved reviews
    const approvedReviews = reviewsDatabase.filter((review) => review.approved);

    return NextResponse.json(approvedReviews, { status: 200 });
  } catch (error) {
    console.error('Reviews fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.rating || !data.comment) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate rating
    if (data.rating < 1 || data.rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Validate comment length
    if (data.comment.length < 10 || data.comment.length > 500) {
      return NextResponse.json(
        { error: 'Comment must be between 10 and 500 characters' },
        { status: 400 }
      );
    }

    // Create new review (pending approval)
    const newReview = {
      id: `review-${Date.now()}`,
      name: data.name.trim(),
      rating: parseInt(data.rating),
      comment: data.comment.trim(),
      createdAt: new Date().toISOString(),
      approved: false, // Require admin approval
    };

    // TODO: Save to MongoDB
    console.log('New review submitted (pending approval):', newReview);

    return NextResponse.json(
      {
        success: true,
        message: 'Review submitted successfully. It will appear after approval.',
        review: newReview,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Review creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
