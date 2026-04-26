'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { Sparkles, Star, Send, Quote } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

import Button from '../../../src/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../src/components/ui/Card';
import Input from '../../../src/components/ui/Input';
import Textarea from '../../../src/components/ui/Textarea';

// Validation Schema
const reviewSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  rating: z.number().min(1, 'Please select a rating').max(5),
  comment: z.string().min(10, 'Review must be at least 10 characters').max(500),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
  approved: boolean;
}

const REVIEWS_PER_PAGE = 6;

const StarRating = ({ rating, size = 20 }: { rating: number; size?: number }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={size}
        className={star <= rating ? 'fill-brand-blue text-brand-blue' : 'text-brand-border'}
      />
    ))}
  </div>
);

const AvatarInitials = ({ name }: { name: string }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-brand-white md:h-14 md:w-14 md:text-base">
      {initials}
    </div>
  );
};

const ReviewCard = ({ review }: { review: Review }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="h-full border-brand-border/70 bg-white/95 shadow-[0_20px_55px_-45px_rgba(17,20,30,0.55)]">
      <CardContent className="pt-6">
        <div className="mb-5 flex items-start gap-4">
          <AvatarInitials name={review.name} />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-brand-navy">{review.name}</h3>
            <div className="mt-2 flex items-center justify-between gap-3">
              <StarRating rating={review.rating} size={16} />
              <p className="text-xs text-slate-500 md:text-sm">
                {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
        </div>
        <p className="text-sm leading-7 text-slate-700 md:text-base">{review.comment}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayedCount, setDisplayedCount] = useState(REVIEWS_PER_PAGE);
  const [submitting, setSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
    },
  });

  const selectedRating = useWatch({ control, name: 'rating' }) || 0;
  const commentValue = useWatch({ control, name: 'comment' }) || '';

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/reviews');

      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
      // Sort by newest first
      const sortedReviews = data.sort(
        (a: Review, b: Review) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setReviews(sortedReviews);
    } catch {
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  // Fetch reviews on mount
  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      void fetchReviews();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const onSubmit = async (formData: ReviewFormData) => {
    try {
      setSubmitting(true);
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      toast.success('Thank you! Your review has been submitted and will appear after approval.');
      reset();
      setHoveredRating(0);
      // Optionally refresh reviews
      await fetchReviews();
    } catch {
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const displayedReviews = reviews.slice(0, displayedCount);
  const averageRating =
    reviews.length > 0 ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10 : 0;

  return (
    <div className="w-full bg-[linear-gradient(180deg,#f8fbfd_0%,#ffffff_48%,#eef4f9_100%)]">
      <section className="relative overflow-hidden bg-brand-navy px-4 py-16 text-brand-white md:px-8 md:py-24">
        <div className="absolute inset-0 opacity-90">
          <div className="absolute left-[-4rem] top-8 h-52 w-52 rounded-full bg-brand-sky/20 blur-3xl" />
          <div className="absolute right-[-4rem] top-0 h-72 w-72 rounded-full bg-brand-blue/25 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-brand-sky backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Verified client feedback
            </div>
            <h1 className="mb-4 text-hero font-heading font-bold">Customer Reviews</h1>
            <p className="text-lg text-white/72 md:text-xl">
              See what our customers think about GFT Barber
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-full px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <Card className="border-brand-border/70 bg-white/90">
            <CardContent className="grid items-center gap-6 p-8 md:grid-cols-[0.75fr_1.25fr] md:p-10">
              <div className="text-center md:text-left">
                <p className="mb-2 text-sm text-slate-500">Overall Rating</p>
                <div className="flex items-baseline justify-center gap-2 md:justify-start">
                  <span className="text-6xl font-bold text-brand-blue md:text-7xl">{averageRating}</span>
                  <span className="text-2xl text-slate-400 md:text-3xl">/5</span>
                </div>
                <div className="mt-3 flex justify-center md:justify-start">
                  <StarRating rating={Math.round(averageRating)} size={24} />
                </div>
                <p className="mt-3 text-sm text-slate-500">Based on {reviews.length} reviews</p>
              </div>

              <div className="rounded-card border border-slate-200 bg-slate-50 p-5 md:p-6">
                <div className="mb-3 inline-flex rounded-xl bg-brand-blue/10 p-2 text-brand-blue">
                  <Quote className="h-5 w-5" />
                </div>
                <p className="text-sm leading-7 text-slate-700 md:text-base">
                  Real client feedback helps us improve quality, punctuality, and service consistency.
                  Every approved review represents a genuine visit.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="w-full px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-brand-blue"></div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-brand-navy text-lg">No reviews yet. Be the first to leave one!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                {displayedReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>

              {displayedCount < reviews.length && (
                <div className="flex justify-center">
                  <Button
                    onClick={() => setDisplayedCount((prev) => prev + REVIEWS_PER_PAGE)}
                    variant="outline"
                  >
                    Load More Reviews
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="w-full border-t border-brand-border/50 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-brand-blue/30 bg-white/90 shadow-[0_28px_80px_-55px_rgba(13,102,180,0.75)]">
              <CardHeader className="pb-3">
                <CardTitle className="text-3xl md:text-4xl">Share Your Experience</CardTitle>
                <CardDescription>
                  Help other customers by sharing your honest feedback about GFT Barber.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-brand-navy">
                      Your Name *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-semibold text-brand-navy">
                      Your Rating *
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setValue('rating', star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            size={32}
                            className={
                              star <= (hoveredRating || selectedRating)
                                ? 'fill-brand-blue text-brand-blue'
                                : 'text-brand-border'
                            }
                          />
                        </button>
                      ))}
                    </div>
                    {errors.rating && (
                      <p className="mt-2 text-sm text-red-500">{errors.rating.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="comment" className="mb-2 block text-sm font-semibold text-brand-navy">
                      Your Review *
                    </label>
                    <Textarea
                      id="comment"
                      placeholder="Share your experience with us... (10-500 characters)"
                      maxLength={500}
                      rows={5}
                      {...register('comment')}
                    />
                    <div className="mt-2 flex items-center justify-between">
                      {errors.comment && (
                        <p className="text-sm text-red-500">{errors.comment.message}</p>
                      )}
                      <p className="text-xs text-slate-500">
                        {commentValue.length}/500 characters
                      </p>
                    </div>
                  </div>

                  <Button type="submit" disabled={submitting} className="w-full">
                    {submitting ? 'Submitting...' : 'Submit Review'}
                    <Send size={18} />
                  </Button>

                  <p className="text-center text-xs text-slate-500">
                    Your review will be published after approval.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
