'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Zap,
  Clock,
  Award,
  Heart,
  Phone,
  Mail,
  MapPin,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';

import Button from '../../../src/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../src/components/ui/Card';

const values = [
  {
    icon: Zap,
    title: 'Precision',
    description: 'Every cut crafted with meticulous attention to detail.',
  },
  {
    icon: Clock,
    title: 'Punctuality',
    description: 'Respecting your time with efficient, on-schedule service.',
  },
  {
    icon: Award,
    title: 'Professionalism',
    description: 'Expert barbers trained in the latest cutting techniques.',
  },
  {
    icon: Heart,
    title: 'Personal Care',
    description: 'Treating every customer as a valued part of our family.',
  },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-[linear-gradient(180deg,#f8fbfd_0%,#ffffff_45%,#eef4f9_100%)]">
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
              Craft. Consistency. Community.
            </div>
            <h1 className="mb-4 text-hero font-heading font-bold">About GFT Barber</h1>
            <p className="mx-auto max-w-2xl text-lg text-white/72 md:text-xl">
              More than just a barbershop. We&apos;re a community built on trust, skill, and genuine
              care for our clients.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-full px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-4xl font-heading font-bold text-brand-navy md:text-5xl">Our Story</h2>
            <div className="space-y-4 text-base leading-7 text-slate-700 md:text-lg">
              <p>
                At GFT Barber, we believe a great haircut is more than just a service. It&apos;s a
                ritual of care and confidence. For years, we&apos;ve served the Windhoek community with
                precision cuts and genuine warmth.
              </p>
              <p>
                I stay updated with current techniques while preserving classic standards.
                Whether you want a timeless style or a fresh modern look, the result should feel
                intentional and clean.
              </p>
              <p>
                From first booking to final mirror check, we focus on consistency: no rushed
                experience, no unclear expectations, just reliable quality every visit.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden border-brand-border/70 bg-white/95">
              <CardContent className="p-0">
                <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-brand-blue to-brand-sky">
                  <div className="text-center">
                    <ImageIcon size={64} className="mx-auto mb-4 text-brand-white/70" />
                    <p className="text-sm text-brand-white/80">GFT Barber Studio Photo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="w-full border-t border-brand-border/50 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-4xl font-heading font-bold text-brand-navy md:text-5xl">Our Values</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-500">
              The principles that shape every appointment and every interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, idx) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <Card className="h-full border-brand-border/70 bg-white/95">
                    <CardContent className="p-6 md:p-8">
                      <div className="mb-4 inline-flex rounded-2xl bg-brand-blue/10 p-3">
                        <Icon size={28} className="text-brand-blue" />
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-brand-navy">{value.title}</h3>
                      <p className="text-sm leading-6 text-slate-600 md:text-base">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full px-4 pb-20 md:px-8 md:pb-24">
        <div className="mx-auto max-w-4xl">
          <Card className="border-brand-blue/30 bg-white/95 shadow-[0_28px_80px_-55px_rgba(13,102,180,0.75)]">
            <CardHeader>
              <CardTitle className="text-center text-3xl md:text-4xl">Get in Touch</CardTitle>
              <CardDescription className="text-center">
                Visit us or reach out anytime. We&apos;d love to hear from you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                <a
                  href="https://www.google.com/maps/search/Begonia+Street+Khomasdal+Windhoek"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center transition-opacity hover:opacity-85 md:text-left"
                >
                  <div className="mb-3 inline-flex rounded-2xl bg-brand-blue/10 p-3">
                    <MapPin size={20} className="text-brand-blue" />
                  </div>
                  <h3 className="mb-1 font-semibold text-brand-navy">Location</h3>
                  <p className="text-sm text-slate-600 hover:text-brand-blue">Begonia Street, Khomasdal, Windhoek</p>
                </a>

                <a href="tel:+264852449888" className="text-center transition-opacity hover:opacity-85 md:text-left">
                  <div className="mb-3 inline-flex rounded-2xl bg-brand-blue/10 p-3">
                    <Phone size={20} className="text-brand-blue" />
                  </div>
                  <h3 className="mb-1 font-semibold text-brand-navy">Phone</h3>
                  <p className="text-sm font-semibold text-brand-blue">085 244 9888</p>
                </a>

                <a href="mailto:gftbarber@gmail.com" className="text-center transition-opacity hover:opacity-85 md:text-left">
                  <div className="mb-3 inline-flex rounded-2xl bg-brand-blue/10 p-3">
                    <Mail size={20} className="text-brand-blue" />
                  </div>
                  <h3 className="mb-1 font-semibold text-brand-navy">Email</h3>
                  <p className="break-all text-sm font-semibold text-brand-blue">gftbarber@gmail.com</p>
                </a>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Button asChild>
                  <Link href="/booking">Book an Appointment</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
