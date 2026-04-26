'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

import Button from '@/src/components/ui/Button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/src/components/ui/Sheet';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact', href: '/contact' },
];

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

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/gftbarber/', icon: InstagramIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/gftbarbershop/', icon: FacebookIcon },
];

function Navbar() {
  const logoUrl =
    'https://scontent.fers3-1.fna.fbcdn.net/v/t39.30808-6/633059639_904722098953753_8304485353082645586_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=ZAcBDH19segQ7kNvwGYfk4h&_nc_oc=Adqn9YSzH5fEqalQx9E4uRFbV1DjAU4aECcjQiQ_z-3DdzLBIBt82OCA3WcdvGt3gps&_nc_zt=23&_nc_ht=scontent.fers3-1.fna&_nc_gid=aS1kc1pzWQE4qz1HNaNpMA&_nc_ss=7b289&oh=00_Af0bxSYJIHEVU1NqzyE6g3eVeiCf5FL8Gxy0RbHsNOxslw&oe=69F316B4';

  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState<string | null>(null);
  const [hasShadow, setHasShadow] = useState(false);
  const hideNavbar = pathname?.startsWith('/dashboard');
  const isMenuVisible = isMenuOpen && menuPathname === pathname;

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (hideNavbar) {
    return null;
  }

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-navy/78 backdrop-blur-xl transition-shadow duration-200',
          hasShadow ? 'shadow-[0_20px_50px_-30px_rgba(0,0,0,0.8)]' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 text-brand-white">
            <span className="relative inline-flex h-10 w-10 overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-inner shadow-white/5">
              <Image
                src={logoUrl}
                alt="GFT Barber logo"
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </span>
            <span>
              <span className="block text-base font-bold tracking-[0.18em]">GFT Barber</span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-white/45">Windhoek</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 md:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    'rounded-full px-4 py-2 text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'bg-brand-sky/20 text-brand-sky'
                      : 'text-brand-white/80 hover:bg-white/8 hover:text-white',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition-colors duration-150 hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}

            <Button asChild className="min-w-28 shadow-[0_18px_40px_-22px_rgba(13,102,180,1)]">
              <Link href="/booking">Book Now</Link>
            </Button>
          </div>

          <Button
            type="button"
            onClick={() => {
              setMenuPathname(pathname);
              setIsMenuOpen(true);
            }}
            variant="ghost"
            className="inline-flex items-center justify-center rounded-md p-2 text-brand-white transition-colors duration-150 hover:bg-white/10 md:hidden"
            aria-label={isMenuVisible ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuVisible}
            aria-controls="mobile-menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <div className="h-16" aria-hidden="true" />

      <Sheet
        open={isMenuVisible}
        onOpenChange={(open) => {
          if (open) {
            setMenuPathname(pathname);
            setIsMenuOpen(true);
            return;
          }

          setIsMenuOpen(false);
        }}
      >
        <SheetContent side="right" className="w-full max-w-full px-6 pt-10 md:hidden">
          <SheetHeader className="px-0 pb-3">
            <SheetTitle className="text-white">Navigation</SheetTitle>
          </SheetHeader>

          <nav id="mobile-menu" className="mt-4 flex flex-col gap-5" aria-label="Mobile">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    'rounded-2xl border px-4 py-4 text-2xl font-semibold transition-colors duration-150',
                    isActive
                      ? 'border-brand-sky/30 bg-brand-sky/10 text-brand-sky'
                      : 'border-white/10 bg-white/5 text-brand-white hover:text-brand-sky',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:text-brand-sky"
                >
                  <Icon className="h-4 w-4" />
                  {social.label}
                </a>
              );
            })}
          </div>

          <Button asChild size="lg" className="mt-10 w-full justify-center">
            <Link href="/booking">Book Now</Link>
          </Button>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Navbar;
