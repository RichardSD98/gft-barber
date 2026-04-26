'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
} from 'lucide-react';

export default function HomePage() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const services = [
    { id: 'kids', name: 'Kids Cut', price: 'N$90', time: '30 mins' },
    { id: 'adults', name: 'Adults Cut', price: 'N$150', time: '45 mins' },
    { id: 'premium', name: '3-Month Package', price: 'N$1,100', time: '3 cuts' },
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
    <div className="w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-brand-navy text-brand-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-hero font-heading font-bold mb-4">GFT Barber</h1>
            <p className="text-xl md:text-2xl font-light mb-8 text-brand-sky">
              Precision cuts. No waiting.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
              <Link
                href="/booking"
                className="px-8 py-3 bg-brand-blue text-brand-white rounded-btn font-semibold hover:bg-brand-sky transition-colors duration-300 flex items-center gap-2"
              >
                Book Now
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Opening Hours Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-white bg-opacity-10 backdrop-blur px-6 py-3 rounded-full border border-brand-border border-opacity-30">
              <Clock size={18} className="text-brand-sky" />
              <span className="text-sm md:text-base">Mon-Fri 9AM-7PM | Sat 8AM-5PM</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURED SERVICES */}
      <section className="w-full py-16 md:py-24 bg-brand-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-hero md:text-xl font-heading font-bold text-brand-navy text-center mb-12"
          >
            Our Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                className="bg-brand-white border-2 border-brand-border rounded-card p-6 md:p-8 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-lg md:text-xl font-heading font-bold text-brand-navy mb-2">
                  {service.name}
                </h3>
                <p className="text-brand-border text-sm mb-4">{service.time}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-brand-blue">{service.price}</span>
                </div>

                <button
                  className={`w-full py-3 rounded-btn font-semibold transition-all duration-300 ${
                    hoveredService === service.id
                      ? 'bg-brand-blue text-brand-white'
                      : 'bg-brand-navy text-brand-white hover:bg-brand-blue'
                  }`}
                >
                  Book Service
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="w-full py-16 md:py-24 bg-brand-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-hero md:text-xl font-heading font-bold text-brand-navy text-center mb-12"
          >
            Why Choose GFT Barber?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-brand-blue bg-opacity-10 rounded-full">
                      <Icon size={32} className="text-brand-blue" />
                    </div>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-brand-navy mb-2">
                    {badge.label}
                  </h3>
                  <p className="text-brand-border text-sm leading-relaxed">{badge.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. BOOKING POLICY */}
      <section className="w-full py-16 md:py-24 bg-brand-navy text-brand-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-hero md:text-xl font-heading font-bold text-center mb-12"
          >
            Booking Policy
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {policies.map((policy, idx) => {
              const Icon = policy.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex-shrink-0">
                    <Icon size={28} className="text-brand-sky" />
                  </div>
                  <p className="text-base md:text-lg">{policy.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CONTACT STRIP */}
      <section className="w-full py-12 md:py-16 bg-brand-white border-t-2 border-brand-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12">
            {/* Phone */}
            <motion.a
              href="tel:+264852449888"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 hover:text-brand-blue transition-colors duration-300"
            >
              <Phone size={24} className="text-brand-blue" />
              <div>
                <p className="text-xs text-brand-border">Call Us</p>
                <p className="font-semibold text-brand-navy">085 244 9888</p>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:gftbarber@gmail.com"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 hover:text-brand-blue transition-colors duration-300"
            >
              <Mail size={24} className="text-brand-blue" />
              <div>
                <p className="text-xs text-brand-border">Email</p>
                <p className="font-semibold text-brand-navy">gftbarber@gmail.com</p>
              </div>
            </motion.a>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <MapPin size={24} className="text-brand-blue" />
              <div>
                <p className="text-xs text-brand-border">Location</p>
                <p className="font-semibold text-brand-navy">Begonia Street, Khomasdal</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
