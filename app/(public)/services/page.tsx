'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Scissors, Sparkles } from 'lucide-react';

import ServiceCard from '../../../src/components/booking/ServiceCard';
import Button from '../../../src/components/ui/Button';
import { Card, CardContent } from '../../../src/components/ui/Card';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
  imageUrl?: string;
  featured?: boolean;
}

const defaultServices: Service[] = [
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
    imageUrl:
      'https://scontent.fers3-1.fna.fbcdn.net/v/t39.30808-6/661692303_949886127770683_5989210191388591444_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=13d280&_nc_ohc=ieUf09dnFdsQ7kNvwFqsjDO&_nc_oc=AdpxngENNv4OHKFy4blA58sTFMp7Y_a8x1bmSQHhZqBVi1J6qgo_whPLRYcSrMihLsY&_nc_zt=23&_nc_ht=scontent.fers3-1.fna&_nc_gid=x-9ej9goauPUwIN-W2YCTA&_nc_ss=7b289&oh=00_Af2HMP1s3cwesjw_0Exj5DgPf-OAnPErXYhpdKIsTFlsMg&oe=69F2E777',
  },
  {
    id: '3-months-unlimited',
    name: '3 Months Unlimited',
    duration: 45,
    price: 1100,
    description: 'Enjoy unlimited haircuts for 3 months. Best value package.',
    imageUrl:
      'https://scontent.fers3-1.fna.fbcdn.net/v/t39.30808-6/668663476_949897001102929_3603838900222085096_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_ohc=vgPUKAL26NcQ7kNvwGXOtns&_nc_oc=AdpVVfZgexuUpz6icH6QtPFJcJvDLR53PMFdgkBE97YFR02FV6d8I7ILKuIOo5LPDn8&_nc_zt=23&_nc_ht=scontent.fers3-1.fna&_nc_gid=n33oC2uVe6r-Merqyux3vg&_nc_ss=7b289&oh=00_Af23jrU-6zXbSzopPlt3o_m9hbeM3n51eO5_zIa8aDr_JA&oe=69F30100',
  },
];

const SkeletonLoader = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
    {[1, 2, 3, 4, 5].map((idx) => (
      <Card
        key={idx}
        className="animate-pulse border-brand-border/70 bg-white/90"
      >
        <CardContent className="space-y-4 pt-6">
          <div className="h-3 w-24 rounded-full bg-slate-200"></div>
          <div className="h-8 w-3/4 rounded bg-slate-200"></div>
          <div className="h-6 w-1/3 rounded-full bg-slate-100"></div>
          <div className="h-3 w-full rounded bg-slate-200"></div>
          <div className="h-3 w-5/6 rounded bg-slate-200"></div>
          <div className="h-10 w-full rounded-btn bg-slate-900"></div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const getServiceCategory = (service: Service) => {
  if (service.id === 'kids-under-7') return 'Under 7 years';
  if (service.id === 'kids-under-16') return 'Ages 7-16 years';
  if (service.id === 'adults-haircut') return 'Over 16 years';
  if (service.id === '31-days-package') return 'Monthly package';
  return 'Unlimited package';
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/services');

        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }

        const data = await response.json();
        setServices(data);
      } catch {
        // Fallback to default services if API fails
        setServices(defaultServices);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="w-full bg-[linear-gradient(180deg,#f8fbfd_0%,#ffffff_42%,#eef4f9_100%)]">
      <section className="relative overflow-hidden bg-brand-navy px-4 py-16 text-brand-white md:px-8 md:py-24">
        <div className="absolute inset-0 opacity-90">
          <div className="absolute left-[-4rem] top-12 h-48 w-48 rounded-full bg-brand-sky/20 blur-3xl" />
          <div className="absolute right-[-5rem] top-0 h-72 w-72 rounded-full bg-brand-blue/25 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-brand-sky backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Curated barber menu
            </div>
            <h1 className="text-hero font-heading font-bold mb-4">Services built to look premium before the cut even starts.</h1>
            <p className="text-lg text-white/72 md:text-xl">
              Professional haircut services tailored to your needs. Choose the package that works
              best for you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Card className="border-white/10 bg-white/8 text-white backdrop-blur-xl">
              <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
                <div className="rounded-card border border-white/10 bg-black/10 p-4">
                  <Scissors className="mb-3 h-5 w-5 text-brand-sky" />
                  <p className="text-sm text-white/60">Fastest appointment flow</p>
                  <p className="mt-2 text-2xl font-semibold text-white">45 min avg</p>
                </div>
                <div className="rounded-card border border-white/10 bg-black/10 p-4">
                  <Sparkles className="mb-3 h-5 w-5 text-brand-sky" />
                  <p className="text-sm text-white/60">Best-value plan</p>
                  <p className="mt-2 text-2xl font-semibold text-white">Unlimited packages</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="w-full px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <SkeletonLoader />
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-brand-navy text-lg">{error}</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-brand-navy text-lg">No services available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45 }}
                >
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    category={getServiceCategory(service)}
                    duration={`${service.duration} mins`}
                    price={service.price}
                    description={service.description}
                    imageUrl={service.imageUrl}
                    featured={service.featured}
                    onBook={(serviceId) => {
                      window.location.href = `/booking?service=${serviceId}`;
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="w-full px-4 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-7xl rounded-[28px] bg-brand-navy px-6 py-10 text-center text-brand-white shadow-[0_30px_100px_-45px_rgba(17,20,30,0.9)] md:px-8 md:py-14">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Not sure which service is right for you?
          </h2>
          <p className="text-brand-sky mb-6 max-w-lg mx-auto">
            Contact us today and I will help you find the perfect package.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/booking">Book an appointment</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white hover:text-brand-navy">
              <Link href="tel:+264852449888">
                Call Us Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
