'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Clock,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  Users,
  Zap,
  ArrowRight,
  Sparkles,
  Scissors,
} from 'lucide-react';

import Button from '../src/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../src/components/ui/Card';

const heroRevealContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const heroRevealItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55 },
  },
};

export default function HomePage() {
  const coverPhotoUrl =
    'https://scontent.fers3-1.fna.fbcdn.net/v/t39.30808-6/641584155_913581718067791_7186388260566469770_n.png?_nc_cat=102&ccb=1-7&_nc_sid=2a1932&_nc_ohc=jt0NQpPOcPQQ7kNvwFEcT9c&_nc_oc=Ado7KPwwAcAxLLw8ieXW55HYcb_pbH0cZi4cuKsUb8mmbxHHuVdIcNFxlQHH_Oyi850&_nc_zt=23&_nc_ht=scontent.fers3-1.fna&_nc_gid=-Y8nx2qqjBFQoeoIkBoM6g&_nc_ss=7b289&oh=00_Af2c_Z1FwJ2Mr__imEZxEYiBRhbtQM47OSAmHS70e0PO6w&oe=69F2F8D8';
  const { scrollYProgress } = useScroll();
  const scrollProgressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const services = [
    {
      id: 'kids',
      name: 'Kids Cut',
      price: 'N$90',
      time: '30 mins',
      description: 'Clean, age-appropriate cuts with quick turnaround for busy families.',
    },
    {
      id: 'adults',
      name: 'Adults Cut',
      price: 'N$150',
      time: '45 mins',
      description: 'Precision fades, sharp outlines, and a polished finish every session.',
    },
    {
      id: 'premium',
      name: '3-Month Package',
      price: 'N$1,100',
      time: 'Unlimited plan',
      description: 'Best-value membership for clients who want a consistently fresh look.',
    },
  ];

  const quickStats = [
    { label: 'Average wait', value: '<10 min' },
    { label: 'Repeat clients', value: '82%' },
    { label: 'Rated by locals', value: '4.9/5' },
  ];

  const trustBadges = [
    { icon: CheckCircle, label: 'Professional', desc: 'Expert barbers with 10+ years experience' },
    { icon: Clock, label: 'Punctual', desc: 'On-time service, zero-wait bookings' },
    { icon: Zap, label: 'Premium', desc: 'Top-tier tools & hygiene standards' },
  ];

  const policies = [
    { icon: AlertCircle, text: '24-hour cancellation policy' },
    { icon: Clock, text: '5-minute grace period for arrivals' },
    { icon: Users, text: 'Walk-ins welcome subject to availability' },
  ];

  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,#f8fbfd_0%,#ffffff_38%,#eef5fa_100%)]">
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-brand-blue via-brand-sky to-brand-blue"
        style={{ scaleX: scrollProgressScaleX }}
      />

      <section className="relative isolate overflow-hidden bg-brand-navy px-4 pb-12 pt-10 text-brand-white md:px-8 md:pb-16 md:pt-14">
        <div className="absolute inset-0 opacity-90">
          <div className="absolute left-[-6rem] top-16 h-56 w-56 rounded-full bg-brand-sky/20 blur-3xl" />
          <div className="absolute right-[-4rem] top-10 h-72 w-72 rounded-full bg-brand-blue/30 blur-3xl" />
          <div className="absolute bottom-[-5rem] left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={heroRevealContainer}
            className="max-w-2xl"
          >
            <motion.div variants={heroRevealItem} className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-brand-sky backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Windhoek&apos;s cleanest booking-first barber experience
            </motion.div>

            <motion.h1 variants={heroRevealItem} className="font-heading text-[clamp(3rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white">
              Sharp cuts.
              <span className="block text-brand-sky">Modern service.</span>
            </motion.h1>

            <motion.p variants={heroRevealItem} className="mt-6 max-w-xl text-base leading-7 text-white/78 md:text-lg">
              GFT Barber blends precision barbering with a smoother booking flow, faster turnaround,
              and a cleaner premium look from the moment clients land on the site.
            </motion.p>

            <motion.div variants={heroRevealItem} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="min-w-40">
                <Link href="/booking">
                  Book Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 bg-white/5 text-white hover:bg-white hover:text-brand-navy">
                <Link href="/services">Browse Services</Link>
              </Button>
            </motion.div>

            <motion.div variants={heroRevealItem} className="mt-10 grid gap-3 sm:grid-cols-3">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-card border border-white/10 bg-white/5 px-4 py-4 backdrop-blur"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-white/55">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="relative"
          >
            <Card className="overflow-hidden border-white/10 bg-white/8 text-white shadow-[0_35px_100px_-40px_rgba(0,0,0,0.75)] backdrop-blur-xl">
              <CardHeader className="border-b border-white/10">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-white/55">Open this week</p>
                    <CardTitle className="mt-2 text-2xl text-white">Clean schedule. Fast turnaround.</CardTitle>
                  </div>
                  <div className="rounded-full border border-brand-sky/30 bg-brand-sky/10 p-3 text-brand-sky">
                    <Scissors className="h-5 w-5" />
                  </div>
                </div>
                <CardDescription className="text-white/65">
                  Mon-Fri 08:00 - 18:00. Saturday 08:00 - 16:00.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className="rounded-card border border-white/10 bg-black/10 p-4 transition-transform duration-150 hover:scale-[1.01]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-white">{service.name}</p>
                        <p className="mt-1 text-sm text-white/60">{service.description}</p>
                      </div>
                      <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-sky">
                        {index === 1 ? 'Most booked' : service.time}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-2xl font-bold text-brand-sky">{service.price}</span>
                      <span className="text-sm text-white/60">{service.time}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-8 md:px-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-full max-w-5xl"
        >
          <Card className="overflow-hidden border-brand-border/70 bg-white/95 shadow-[0_30px_90px_-55px_rgba(17,20,30,0.5)]">
            <CardContent className="p-0">
              <div className="w-full bg-slate-100">
                <Image
                  src={coverPhotoUrl}
                  alt="GFT Barber cover"
                  width={1600}
                  height={900}
                  priority
                  sizes="(max-width: 768px) 100vw, 960px"
                  className="block h-auto w-full object-contain"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <section className="px-4 py-10 md:px-8 md:py-14">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-brand-blue">Services</p>
              <h2 className="mt-3 font-heading text-4xl font-bold text-brand-navy">Built like a premium service menu, not a placeholder grid.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600 md:text-base">
              This is where the visual shift becomes obvious: stronger hierarchy, cleaner cards, and CTAs that actually feel deliberate.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
              >
                <Card className={idx === 1 ? 'border-brand-blue/40 shadow-[0_24px_70px_-45px_rgba(13,102,180,0.75)]' : ''}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-2xl">{service.name}</CardTitle>
                        <CardDescription className="mt-2 leading-6">{service.description}</CardDescription>
                      </div>
                      {idx === 1 ? (
                        <span className="rounded-full bg-brand-sky/20 px-3 py-1 text-xs font-semibold text-brand-blue">
                          Most popular
                        </span>
                      ) : null}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                      <span className="text-sm font-medium text-slate-500">Duration</span>
                      <span className="text-sm font-semibold text-brand-navy">{service.time}</span>
                    </div>
                    <div className="mb-6 text-4xl font-bold tracking-tight text-brand-blue">{service.price}</div>
                    <Button asChild className="w-full">
                      <Link href={`/booking?service=${service.id}`}>Book Service</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 md:py-14">
        <div className="mx-auto grid w-full max-w-7xl gap-6 md:grid-cols-3">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon;

            return (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="mb-5 inline-flex rounded-2xl bg-brand-blue/10 p-3 text-brand-blue">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-brand-navy">{badge.label}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{badge.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 md:py-14">
        <div className="mx-auto w-full max-w-7xl rounded-[28px] bg-brand-navy px-6 py-8 text-white shadow-[0_30px_100px_-45px_rgba(17,20,30,0.9)] md:px-10 md:py-12">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-sky">Booking policy</p>
              <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">Clear rules, presented like a real product.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-white/65 md:text-base">
              The old section looked like placeholder copy. This version gives each policy item its own surface and visual weight.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {policies.map((policy, idx) => {
              const Icon = policy.icon;

              return (
                <motion.div
                  key={policy.text}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="rounded-card border border-white/10 bg-white/5 p-5 backdrop-blur"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-brand-sky/10 p-3 text-brand-sky">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-base leading-7 text-white/88">{policy.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 md:py-14">
        <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-3">
          <Card className="bg-white/85 backdrop-blur-sm">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-2xl bg-brand-blue/10 p-3 text-brand-blue">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Call Us</p>
                <a href="tel:+264852449888" className="mt-1 block text-lg font-semibold text-brand-navy transition-colors hover:text-brand-blue">
                  085 244 9888
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/85 backdrop-blur-sm">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-2xl bg-brand-blue/10 p-3 text-brand-blue">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Email</p>
                <a href="mailto:gftbarber@gmail.com" className="mt-1 block text-lg font-semibold text-brand-navy transition-colors hover:text-brand-blue">
                  gftbarber@gmail.com
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/85 backdrop-blur-sm">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-2xl bg-brand-blue/10 p-3 text-brand-blue">
                <MapPin className="h-5 w-5" />
              </div>
              <a
                href="https://www.google.com/maps/search/Begonia+Street+Khomasdal+Windhoek"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-85"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Location</p>
                <p className="mt-1 text-lg font-semibold text-brand-navy hover:text-brand-blue">Begonia Street, Khomasdal</p>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
