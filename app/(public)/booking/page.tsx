'use client';

import { Suspense, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import PolicyModal from '../../../src/components/booking/PolicyModal';
import Button from '../../../src/components/ui/Button';
import { Card, CardContent } from '../../../src/components/ui/Card';
import Input from '../../../src/components/ui/Input';
import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  Check,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import {
  format,
  addDays,
  startOfToday,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isBefore,
  isAfter,
  isSunday,
} from 'date-fns';

// Validation Schema
const bookingSchema = z.object({
  service: z.string().min(1, 'Please select a service'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time slot'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email address'),
  cardHolder: z.string().min(2, 'Card holder name is required'),
  cardNumber: z.string().regex(/^(\d{4}\s?){4}$/, 'Enter a valid 16-digit card number'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, 'Use MM/YY format'),
  cvv: z.string().regex(/^\d{3,4}$/, 'Enter a valid CVV'),
  policyAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the booking policy',
  }),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

const services = [
  { id: 'kids-under-7', name: 'Kids Haircut (Under 7)', price: 90 },
  { id: 'kids-under-16', name: 'Kids Haircut (7-16)', price: 120 },
  { id: 'adults-haircut', name: 'Adults Haircut', price: 150 },
  { id: '31-days-package', name: '31 Days Package', price: 450 },
  { id: '3-months-unlimited', name: '3 Months Unlimited', price: 1100 },
];

const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  const progress = (currentStep / totalSteps) * 100;
  return (
    <div className="mb-8 h-2 w-full rounded-full bg-slate-200 md:mb-12">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-sky"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

const StepHeader = ({ step, title }: { step: number; title: string }) => (
  <div className="mb-8">
    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-brand-blue">Step {step} of 5</p>
    <h2 className="text-2xl md:text-3xl font-heading font-bold text-brand-navy">{title}</h2>
  </div>
);

const fieldClassName =
  'w-full rounded-card border border-slate-200 bg-white px-4 py-3 text-brand-navy shadow-sm outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-slate-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15';

const optionCardClassName =
  'rounded-card border bg-white p-4 shadow-sm transition-all duration-150';

const calendarWeekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const bookingSteps = ['Service', 'Date & Time', 'Your Details', 'Review & Payment', 'Confirmation'];

function BookingPageContent() {
  const logoUrl =
    'https://scontent.fers3-1.fna.fbcdn.net/v/t39.30808-6/633059639_904722098953753_8304485353082645586_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=ZAcBDH19segQ7kNvwGYfk4h&_nc_oc=Adqn9YSzH5fEqalQx9E4uRFbV1DjAU4aECcjQiQ_z-3DdzLBIBt82OCA3WcdvGt3gps&_nc_zt=23&_nc_ht=scontent.fers3-1.fna&_nc_gid=aS1kc1pzWQE4qz1HNaNpMA&_nc_ss=7b289&oh=00_Af0bxSYJIHEVU1NqzyE6g3eVeiCf5FL8Gxy0RbHsNOxslw&oe=69F316B4';

  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');

  const [currentStep, setCurrentStep] = useState(1);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(startOfToday());

  const {
    register,
    handleSubmit,
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: 'onBlur',
    defaultValues: {
      service: serviceParam || '',
      policyAccepted: false,
    },
  });

  const selectedService = useWatch({ control, name: 'service' });
  const selectedDate = useWatch({ control, name: 'date' });
  const selectedTime = useWatch({ control, name: 'time' });
  const fullName = useWatch({ control, name: 'fullName' });
  const email = useWatch({ control, name: 'email' });
  const cardNumber = useWatch({ control, name: 'cardNumber' });
  const bookingStartDate = addDays(startOfToday(), 1);
  const bookingEndDate = addDays(startOfToday(), 30);
  const calendarGridDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(calendarMonth)),
    end: endOfWeek(endOfMonth(calendarMonth)),
  });

  const fetchTimeSlots = async (date: string, serviceId: string) => {
    try {
      setLoadingSlots(true);
      const response = await fetch(
        `/api/availability?date=${date}&service=${serviceId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch time slots');
      }

      const data = await response.json();
      // Fallback to mock slots if API doesn't return data
      setTimeSlots(
        data.slots || [
          { id: '09:00', time: '9:00 AM', available: true },
          { id: '09:30', time: '9:30 AM', available: true },
          { id: '10:00', time: '10:00 AM', available: false },
          { id: '10:30', time: '10:30 AM', available: true },
          { id: '14:00', time: '2:00 PM', available: true },
          { id: '14:30', time: '2:30 PM', available: true },
          { id: '15:00', time: '3:00 PM', available: true },
          { id: '15:30', time: '3:30 PM', available: false },
        ]
      );
    } catch {
      toast.error('Failed to load time slots');
      // Set mock slots on error
      setTimeSlots([
        { id: '09:00', time: '9:00 AM', available: true },
        { id: '09:30', time: '9:30 AM', available: true },
        { id: '10:00', time: '10:00 AM', available: false },
        { id: '10:30', time: '10:30 AM', available: true },
        { id: '14:00', time: '2:00 PM', available: true },
        { id: '14:30', time: '2:30 PM', available: true },
        { id: '15:00', time: '3:00 PM', available: true },
        { id: '15:30', time: '3:30 PM', available: false },
      ]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    try {
      setSubmitting(true);
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Booking failed');
      }

      const result = await response.json();
      setBookingReference(result.reference || 'GFT-CONFIRMED');
      setCurrentStep(5);
      toast.success('Booking confirmed!');
    } catch {
      toast.error('Failed to complete booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = async () => {
    // Validate current step before moving forward
    if (currentStep === 1) {
      if (!selectedService) {
        toast.error('Please select a service');
        return;
      }
    } else if (currentStep === 2) {
      if (!selectedDate) {
        toast.error('Please select a date');
        return;
      }
      const selectedDateObj = new Date(`${selectedDate}T00:00:00`);
      if (selectedDateObj.getDay() === 0) {
        toast.error('We are closed on Sundays. Please pick another date.');
        return;
      }
      if (!selectedTime) {
        toast.error('Please select a time slot');
        return;
      }
    } else if (currentStep === 3) {
      // Validate customer details before payment step.
      const isValid = await trigger(['fullName', 'phone', 'email']);
      if (!isValid) return;
    } else if (currentStep === 4) {
      // Validate payment + policy before submission.
      const isValid = await trigger(['cardHolder', 'cardNumber', 'expiryDate', 'cvv', 'policyAccepted']);
      if (!isValid) return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const paymentLast4 = (cardNumber || '').replace(/\D/g, '').slice(-4) || '----';

  const selectDate = (date: Date) => {
    if (isSunday(date) || isBefore(date, bookingStartDate) || isAfter(date, bookingEndDate)) {
      return;
    }

    const formattedDate = format(date, 'yyyy-MM-dd');

    setValue('date', formattedDate, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setValue('time', '', {
      shouldDirty: true,
      shouldValidate: true,
    });

    if (selectedService) {
      void fetchTimeSlots(formattedDate, selectedService);
    }
  };

  const selectedServiceName = services.find((s) => s.id === selectedService)?.name;

  return (
    <div className="min-h-screen w-full bg-[linear-gradient(180deg,#f8fbfd_0%,#ffffff_45%,#eef4f9_100%)]">
      <section className="relative overflow-hidden bg-brand-navy px-4 py-10 text-brand-white md:px-8 md:py-14">
        <div className="absolute inset-0 opacity-90">
          <div className="absolute left-[-4rem] top-10 h-48 w-48 rounded-full bg-brand-sky/20 blur-3xl" />
          <div className="absolute right-[-4rem] top-0 h-64 w-64 rounded-full bg-brand-blue/25 blur-3xl" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-brand-sky backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Booking flow refresh
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold">Book Your Appointment</h1>
            <p className="mt-2 text-brand-sky">GFT Barber | Professional Haircuts</p>
          </div>
          <div className="max-w-sm rounded-card border border-white/10 bg-white/8 px-5 py-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Process</p>
            <p className="mt-2 text-sm leading-6 text-white/75">Choose your service, pick a slot, confirm your details, and review policy in one clean flow.</p>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 grid grid-cols-2 gap-2 md:grid-cols-5 md:gap-3">
            {bookingSteps.map((label, idx) => {
              const stepNumber = idx + 1;
              const isActive = currentStep === stepNumber;
              const isComplete = currentStep > stepNumber;

              return (
                <div
                  key={label}
                  className={[
                    'rounded-card border px-3 py-2 text-center text-xs font-semibold transition-colors md:text-sm',
                    isActive
                      ? 'border-brand-blue bg-brand-blue/10 text-brand-blue'
                      : isComplete
                      ? 'border-brand-sky/40 bg-brand-sky/10 text-brand-blue'
                      : 'border-slate-200 bg-white text-slate-500',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {stepNumber}. {label}
                </div>
              );
            })}
          </div>

          <ProgressBar currentStep={currentStep} totalSteps={5} />

          <Card className="border-brand-border/70 bg-white/90 shadow-[0_30px_90px_-55px_rgba(17,20,30,0.45)] backdrop-blur-sm">
            <CardContent className="pt-8 md:pt-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Select Service */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepHeader step={1} title="Select a Service" />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {services.map((service) => (
                      <label
                        key={service.id}
                        className={`relative cursor-pointer ${optionCardClassName} ${
                          selectedService === service.id
                            ? 'border-brand-blue bg-brand-blue/5 shadow-[0_16px_40px_-30px_rgba(13,102,180,0.9)]'
                            : 'border-slate-200 hover:border-brand-blue/60 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          value={service.id}
                          {...register('service')}
                          className="absolute right-4 top-4 h-4 w-4 cursor-pointer text-brand-blue"
                        />
                        <div className="pr-8">
                          <p className="font-semibold text-brand-navy">{service.name}</p>
                          <p className="mt-2 text-sm text-slate-500">Premium barber service</p>
                          <p className="mt-4 text-lg font-bold text-brand-blue">N${service.price}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.service && (
                    <p className="text-red-500 text-sm mt-4">{errors.service.message}</p>
                  )}
                </motion.div>
              )}

              {/* Step 2: Pick Date */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepHeader step={2} title="Date & Time" />

                  <div className="rounded-card border border-slate-200 bg-slate-50/70 p-3 md:p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="flex items-center gap-2 text-sm font-semibold text-brand-navy">
                        <Calendar size={18} className="text-brand-blue" />
                        {format(calendarMonth, 'MMMM yyyy')}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setCalendarMonth((prev) => addDays(startOfMonth(prev), -1))}
                          aria-label="Previous month"
                        >
                          <ChevronLeft size={16} />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setCalendarMonth((prev) => addDays(endOfMonth(prev), 1))}
                          aria-label="Next month"
                        >
                          <ChevronRight size={16} />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-500 md:gap-2 md:text-xs">
                      {calendarWeekDays.map((day) => (
                        <p key={day} className="py-0.5 md:py-1">{day}</p>
                      ))}
                    </div>

                    <div className="mt-1 grid grid-cols-7 gap-1.5 md:gap-2">
                      {calendarGridDates.map((date) => {
                        const isUnavailable =
                          isSunday(date) || isBefore(date, bookingStartDate) || isAfter(date, bookingEndDate);
                        const isSelected = selectedDate
                          ? isSameDay(date, new Date(`${selectedDate}T00:00:00`))
                          : false;

                        return (
                          <button
                            key={date.toISOString()}
                            type="button"
                            onClick={() => selectDate(date)}
                            disabled={isUnavailable}
                            className={[
                              'h-9 rounded-btn border text-xs font-semibold transition-colors md:h-10 md:text-sm',
                              isSelected
                                ? 'border-brand-blue bg-brand-blue text-white'
                                : isSameMonth(date, calendarMonth)
                                ? 'border-slate-200 bg-white text-brand-navy hover:border-brand-blue/60 hover:bg-brand-blue/5'
                                : 'border-slate-100 bg-slate-100 text-slate-400',
                              isUnavailable ? 'cursor-not-allowed opacity-45 hover:border-slate-200 hover:bg-white' : '',
                            ]
                              .filter(Boolean)
                              .join(' ')}
                            aria-label={format(date, 'EEEE, d MMMM yyyy')}
                          >
                            {format(date, 'd')}
                          </button>
                        );
                      })}
                    </div>

                    <p className="mt-2 text-xs text-slate-500">
                      Booking window: {format(bookingStartDate, 'd MMM')} - {format(bookingEndDate, 'd MMM yyyy')}. Sundays are unavailable.
                    </p>
                  </div>

                  <div className="mt-6">
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-navy">Available Time Slots</h3>
                    {loadingSlots ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-brand-blue"></div>
                      </div>
                    ) : !selectedDate ? (
                      <p className="text-sm text-slate-500">Select a date to see available slots.</p>
                    ) : (
                      <div className="grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-2.5">
                        {timeSlots.map((slot) => (
                          <label
                            key={slot.id}
                            className={`cursor-pointer rounded-card border bg-white p-2.5 shadow-sm transition-all duration-150 md:p-3 ${
                              !slot.available
                                ? 'cursor-not-allowed border-slate-200 bg-slate-50 opacity-50'
                                : selectedTime === slot.id
                                ? 'border-brand-blue bg-brand-blue/5 shadow-[0_16px_40px_-30px_rgba(13,102,180,0.9)]'
                                : 'border-slate-200 hover:border-brand-blue/60 hover:bg-slate-50'
                            }`}
                          >
                            <input
                              type="radio"
                              value={slot.id}
                              disabled={!slot.available}
                              {...register('time')}
                              className="hidden"
                            />
                            <div className="text-center">
                              <Clock size={16} className="mx-auto mb-1 text-brand-blue md:h-[18px] md:w-[18px]" />
                              <p className="text-xs font-semibold text-brand-navy md:text-sm">{slot.time}</p>
                              {!slot.available && (
                                <p className="text-xs text-slate-500">Booked</p>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {errors.date && (
                    <p className="text-red-500 text-sm mt-4">{errors.date.message}</p>
                  )}
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-2">{errors.time.message}</p>
                  )}
                </motion.div>
              )}

              {/* Step 3: Enter Details */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepHeader step={3} title="Your Details" />

                  <div className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-semibold text-brand-navy mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        {...register('fullName')}
                        className={fieldClassName}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-brand-navy mb-2">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+264852449888"
                        {...register('phone')}
                        className={fieldClassName}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-brand-navy mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        {...register('email')}
                        className={fieldClassName}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Payment */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepHeader step={4} title="Review & Payment" />

                  {/* Booking Summary */}
                  <Card className="mb-6 border-brand-border/70 bg-slate-50/80">
                    <CardContent className="p-6 md:p-8">
                    <h3 className="font-heading font-bold text-brand-navy mb-4">Order Summary</h3>
                    <div className="space-y-3 text-sm md:text-base">
                      <div className="flex justify-between">
                        <span className="text-brand-border">Service:</span>
                        <span className="font-semibold text-brand-navy">{selectedServiceName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-border">Date:</span>
                        <span className="font-semibold text-brand-navy">
                          {selectedDate && format(new Date(selectedDate), 'EEEE, d MMMM yyyy')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-border">Time:</span>
                        <span className="font-semibold text-brand-navy">
                          {timeSlots.find((s) => s.id === selectedTime)?.time}
                        </span>
                      </div>
                      <div className="border-t border-brand-border pt-3">
                        <div className="flex justify-between">
                          <span className="text-brand-border">Name:</span>
                          <span className="font-semibold text-brand-navy">{fullName}</span>
                        </div>
                      </div>
                    </div>
                    </CardContent>
                  </Card>

                  <Card className="mb-6 border-brand-border/70 bg-white/90">
                    <CardContent className="space-y-5 p-6 md:p-8">
                      <div>
                        <label htmlFor="cardHolder" className="mb-2 block text-sm font-semibold text-brand-navy">
                          Card Holder Name *
                        </label>
                        <Input
                          id="cardHolder"
                          type="text"
                          placeholder="John Doe"
                          {...register('cardHolder')}
                          className={fieldClassName}
                        />
                        {errors.cardHolder && (
                          <p className="mt-1 text-sm text-red-500">{errors.cardHolder.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="cardNumber" className="mb-2 block text-sm font-semibold text-brand-navy">
                          Card Number *
                        </label>
                        <Input
                          id="cardNumber"
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          {...register('cardNumber')}
                          className={fieldClassName}
                        />
                        {errors.cardNumber && (
                          <p className="mt-1 text-sm text-red-500">{errors.cardNumber.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="mb-2 block text-sm font-semibold text-brand-navy">
                            Expiry (MM/YY) *
                          </label>
                          <Input
                            id="expiryDate"
                            type="text"
                            placeholder="08/28"
                            maxLength={5}
                            {...register('expiryDate')}
                            className={fieldClassName}
                          />
                          {errors.expiryDate && (
                            <p className="mt-1 text-sm text-red-500">{errors.expiryDate.message}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="cvv" className="mb-2 block text-sm font-semibold text-brand-navy">
                            CVV *
                          </label>
                          <Input
                            id="cvv"
                            type="password"
                            placeholder="123"
                            maxLength={4}
                            {...register('cvv')}
                            className={fieldClassName}
                          />
                          {errors.cvv && (
                            <p className="mt-1 text-sm text-red-500">{errors.cvv.message}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="mb-6 rounded-card border border-brand-blue/20 bg-brand-blue/5 p-4 md:p-6">
                    <div className="flex gap-3 mb-4">
                      <AlertCircle size={24} className="text-brand-blue flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-brand-navy mb-2">Booking Policy</h4>
                        <ul className="space-y-2 text-sm text-brand-navy">
                          <li>
                            <span className="font-semibold">Late Fee:</span> N$30 charge if you
                            arrive more than 15 minutes late
                          </li>
                          <li>
                            <span className="font-semibold">No-Show Fee:</span> N$70 charge if you
                            do not show up without notice; charged on your next booking
                          </li>
                          <li>
                            <span className="font-semibold">Cancellation:</span> Cancel or
                            reschedule in advance
                          </li>
                          <li>
                            <span className="font-semibold">Payment:</span> Full payment is
                            required at the time of service
                          </li>
                        </ul>
                        <button
                          type="button"
                          onClick={() => setIsPolicyModalOpen(true)}
                          className="mt-3 text-sm font-semibold text-brand-blue underline underline-offset-2 transition-colors duration-150 hover:text-brand-sky"
                        >
                          View full policy
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Policy Checkbox */}
                  <label className="flex cursor-pointer items-start gap-3 rounded-card border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-brand-blue/60">
                    <input
                      type="checkbox"
                      {...register('policyAccepted')}
                      className="w-5 h-5 text-brand-blue mt-1 cursor-pointer"
                    />
                    <span className="text-sm md:text-base text-brand-navy">
                      I understand and accept the booking policy, including potential late and
                      no-show fees
                    </span>
                  </label>
                  {errors.policyAccepted && (
                    <p className="text-red-500 text-sm mt-3">{errors.policyAccepted.message}</p>
                  )}
                </motion.div>
              )}

              {/* Step 5: Confirmation */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-12"
                >
                  <div className="mb-6 flex justify-center">
                    <div className="relative h-20 w-20 overflow-hidden rounded-full border border-brand-blue/20 bg-white shadow-[0_18px_45px_-25px_rgba(13,102,180,0.7)]">
                      <Image
                        src={logoUrl}
                        alt="GFT Barber logo"
                        fill
                        sizes="80px"
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-2">
                    Booking Confirmed!
                  </h2>
                  <p className="text-brand-sky text-lg mb-8">
                    Your appointment has been successfully booked.
                  </p>

                  <Card className="mb-8 border-brand-blue/30 bg-white text-left shadow-[0_24px_70px_-45px_rgba(13,102,180,0.8)]">
                    <CardContent className="p-6 md:p-8">
                    <p className="text-sm text-brand-border mb-2">Reference Number</p>
                    <p className="text-2xl md:text-3xl font-bold text-brand-blue font-mono">
                      {bookingReference}
                    </p>

                    <div className="border-t border-brand-border mt-6 pt-6 space-y-3">
                      <div>
                        <p className="text-xs text-brand-border uppercase">Service</p>
                        <p className="font-semibold text-brand-navy">{selectedServiceName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-brand-border uppercase">Date & Time</p>
                        <p className="font-semibold text-brand-navy">
                          {selectedDate && format(new Date(selectedDate), 'EEEE, d MMMM')} at{' '}
                          {timeSlots.find((s) => s.id === selectedTime)?.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-brand-border uppercase">Client Name</p>
                        <p className="font-semibold text-brand-navy">{fullName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-brand-border uppercase">Payment</p>
                        <p className="font-semibold text-brand-navy">
                          Card ending {paymentLast4}
                        </p>
                      </div>
                    </div>
                    </CardContent>
                  </Card>

                  <p className="text-brand-border text-sm mb-6">
                    A confirmation email has been sent to <span className="font-semibold">{email}</span>
                  </p>

                  <div className="space-y-3">
                    <Button asChild className="w-full">
                      <Link href="/">Back to Home</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <a href="tel:+264852449888">Call Us</a>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep < 5 && (
              <div className="mt-12 flex justify-between gap-4">
                <Button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  variant="ghost"
                  className="bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  <ChevronLeft size={20} />
                  Back
                </Button>

                {currentStep === 4 ? (
                  <Button
                    type="submit"
                    loading={submitting}
                  >
                    {submitting ? 'Booking...' : 'Confirm Booking'}
                    <Check size={20} />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={nextStep}
                  >
                    Continue
                    <ChevronRight size={20} />
                  </Button>
                )}
              </div>
            )}
          </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <PolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
      />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <section className="min-h-screen bg-[linear-gradient(180deg,#f8fbfd_0%,#ffffff_38%,#eef5fa_100%)] px-4 py-24 md:px-8">
          <div className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-blue">Loading booking</p>
            <h1 className="mt-3 font-heading text-3xl font-bold text-brand-navy md:text-4xl">Preparing your booking experience...</h1>
          </div>
        </section>
      }
    >
      <BookingPageContent />
    </Suspense>
  );
}
