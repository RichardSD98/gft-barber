'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

import Button from '../../../src/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../src/components/ui/Card';

const openingHours = [
  { day: 'Monday', hours: '08:00 - 18:00' },
  { day: 'Tuesday', hours: '08:00 - 18:00' },
  { day: 'Wednesday', hours: '08:00 - 18:00' },
  { day: 'Thursday', hours: '08:00 - 18:00' },
  { day: 'Friday', hours: '08:00 - 18:00' },
  { day: 'Saturday', hours: '08:00 - 16:00' },
  { day: 'Sunday', hours: 'Closed' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

function InstagramIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37a4 4 0 1 1-3.37-3.37 4 4 0 0 1 3.37 3.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6H16.8V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4V11H8v3h2.6v8h2.9Z" />
    </svg>
  );
}

export default function ContactPage() {
  const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapsQuery = encodeURIComponent('Begonia Street, Khomasdal, Windhoek, Namibia');
  const mapsEmbedSrc = mapsApiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${mapsQuery}`
    : `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

  return (
    <div className="w-full bg-[linear-gradient(180deg,#f8fbfd_0%,#ffffff_50%,#eef4f9_100%)]">
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
              Contact and bookings
            </div>
            <h1 className="mb-4 text-hero font-heading font-bold">Get in Touch</h1>
            <p className="mx-auto max-w-2xl text-lg text-white/72 md:text-xl">
              We&apos;re here to help. Reach out with any questions or book your appointment.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-full px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            <motion.a
              href="tel:+264852449888"
              variants={itemVariants}
              className="group"
            >
              <Card className="h-full border-brand-border/70 bg-white/95 transition-all duration-200 group-hover:border-brand-blue/60 group-hover:shadow-[0_24px_65px_-45px_rgba(13,102,180,0.75)]">
                <CardContent className="p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-brand-blue/10 p-4 transition-all group-hover:bg-brand-blue/20">
                      <Phone size={30} className="text-brand-blue" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-brand-navy">Call Us</h3>
                  <p className="mb-1 text-lg font-semibold text-brand-blue">085 244 9888</p>
                  <p className="text-sm text-slate-500">Tap to call directly</p>
                </CardContent>
              </Card>
            </motion.a>

            <motion.a
              href="mailto:gftbarber@gmail.com"
              variants={itemVariants}
              className="group"
            >
              <Card className="h-full border-brand-border/70 bg-white/95 transition-all duration-200 group-hover:border-brand-blue/60 group-hover:shadow-[0_24px_65px_-45px_rgba(13,102,180,0.75)]">
                <CardContent className="p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-brand-blue/10 p-4 transition-all group-hover:bg-brand-blue/20">
                      <Mail size={30} className="text-brand-blue" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-brand-navy">Email Us</h3>
                  <p className="mb-1 break-all text-base font-semibold text-brand-blue">
                    gftbarber@gmail.com
                  </p>
                  <p className="text-sm text-slate-500">Tap to send email</p>
                </CardContent>
              </Card>
            </motion.a>

            <motion.a
              href="https://www.google.com/maps/search/Begonia+Street+Khomasdal+Windhoek"
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="group"
            >
              <Card className="h-full border-brand-border/70 bg-white/95 transition-all duration-200 group-hover:border-brand-blue/60 group-hover:shadow-[0_24px_65px_-45px_rgba(13,102,180,0.75)]">
                <CardContent className="p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-brand-blue/10 p-4 transition-all group-hover:bg-brand-blue/20">
                      <MapPin size={30} className="text-brand-blue" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-brand-navy">Visit Us</h3>
                  <p className="mb-1 text-base font-semibold text-brand-navy">Begonia Street</p>
                  <p className="text-sm text-slate-500">Khomasdal, Windhoek. Tap for maps.</p>
                </CardContent>
              </Card>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <a
              href="https://wa.me/26485244988"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-btn bg-[#25D366] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#1fa855] hover:shadow-xl"
            >
              <MessageCircle size={24} />
              <span>Chat on WhatsApp</span>
            </a>

            <div className="w-full max-w-3xl rounded-card border border-brand-border/60 bg-white/90 p-5 shadow-[0_24px_60px_-48px_rgba(17,20,30,0.4)] md:p-6">
              <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Follow GFT Barber</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <a
                  href="https://www.instagram.com/gftbarber/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-btn border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-brand-navy transition-colors duration-200 hover:border-brand-blue/60 hover:bg-brand-blue/5"
                >
                  <InstagramIcon className="h-5 w-5 text-brand-blue" />
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/gftbarbershop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-btn border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-brand-navy transition-colors duration-200 hover:border-brand-blue/60 hover:bg-brand-blue/5"
                >
                  <FacebookIcon className="h-5 w-5 text-brand-blue" />
                  Facebook
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full border-t border-brand-border/50 px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="mb-2 flex items-center gap-3 text-3xl font-heading font-bold text-brand-navy md:text-4xl">
              <Clock size={32} className="text-brand-blue" />
              Opening Hours
            </h2>
            <p className="text-slate-500">We&apos;re open six days a week for your convenience.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden border-brand-border/70 bg-white/95">
              <CardContent className="p-0">
                <table className="w-full">
                  <tbody>
                    {openingHours.map((item, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-slate-200 last:border-b-0 ${
                          item.day === 'Sunday' ? 'bg-slate-50' : ''
                        }`}
                      >
                        <td className="px-6 py-4 text-left font-semibold text-brand-navy">
                          {item.day}
                        </td>
                        <td
                          className={`px-6 py-4 text-right font-medium ${
                            item.day === 'Sunday' ? 'text-slate-400' : 'text-brand-blue'
                          }`}
                        >
                          {item.hours}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-center text-sm text-slate-500"
          >
            We&apos;re closed on Sundays. Walk-ins welcome subject to availability.
          </motion.p>
        </div>
      </section>

      <section className="w-full px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 text-center text-3xl font-heading font-bold text-brand-navy md:text-4xl">
              Find Us on the Map
            </h2>

            <Card className="overflow-hidden border-brand-border/70 bg-brand-navy text-white shadow-[0_35px_90px_-55px_rgba(17,20,30,0.95)]">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Begonia Street, Khomasdal</CardTitle>
                <CardDescription className="text-brand-sky">Windhoek, Namibia</CardDescription>
              </CardHeader>
              <CardContent className="pb-8">
                <div className="mb-6 overflow-hidden rounded-card border border-white/10 bg-black/10">
                  <iframe
                    src={mapsEmbedSrc}
                    title="GFT Barber location map"
                    className="h-64 w-full"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <Button asChild>
                  <a
                    href="https://www.google.com/maps/search/Begonia+Street+Khomasdal+Windhoek"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Google Maps
                  </a>
                </Button>
              </CardContent>
            </Card>

            <p className="mt-4 text-center text-sm text-slate-500">
              Interactive map powered by Google Maps. Use the button above for full directions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-full px-4 pb-20 md:px-8 md:pb-24">
        <div className="mx-auto max-w-7xl rounded-[28px] bg-brand-navy px-6 py-10 text-brand-white shadow-[0_30px_100px_-50px_rgba(17,20,30,0.9)] md:px-8 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-heading font-bold md:text-4xl">
              Ready to Book?
            </h2>
            <p className="mb-8 text-lg text-brand-sky">
              Don&apos;t wait in line. Book your appointment online now and get a guaranteed slot.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/booking">
                  Book Now
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white hover:text-brand-navy">
                <a href="tel:+264852449888">
                  Call Us
                  <Phone size={20} />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
