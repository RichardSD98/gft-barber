import { ArrowRight, Clock3 } from 'lucide-react';
import Image from 'next/image';

import Button from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

export interface ServiceCardProps {
  id: string;
  name: string;
  category: string;
  duration: string;
  price: number;
  description: string;
  imageUrl?: string;
  featured?: boolean;
  onBook: (id: string) => void;
}

function ServiceCard({
  id,
  name,
  category,
  duration,
  price,
  description,
  imageUrl,
  featured = false,
  onBook,
}: ServiceCardProps) {
  return (
    <Card
      className={[
        'relative h-full overflow-hidden border bg-white/95 transition-transform duration-150 hover:scale-[1.01]',
        featured
          ? 'border-[1.5px] border-brand-blue shadow-[0_28px_70px_-42px_rgba(13,102,180,0.95)]'
          : 'border-brand-border/80',
      ].join(' ')}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-blue via-brand-sky to-brand-blue opacity-85" />
      {featured ? (
        <span className="absolute right-5 top-5 inline-flex items-center rounded-full bg-brand-sky/20 px-3 py-1 text-xs font-semibold text-brand-blue">
          Most popular
        </span>
      ) : null}

      {imageUrl ? (
        <div className="relative h-56 w-full overflow-hidden border-b border-slate-100">
          <Image
            src={imageUrl}
            alt={`${name} service photo`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center"
          />
        </div>
      ) : null}

      <CardHeader className="pb-4 pr-28">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{category}</p>
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
          <Clock3 className="h-3.5 w-3.5 text-brand-blue" />
          {duration}
        </div>

        <p className="mb-6 text-sm leading-6 text-slate-600">{description}</p>

        <div className="mb-6 text-4xl font-bold tracking-tight text-brand-blue">N${price}</div>

        <Button
          variant="primary"
          className="w-full"
          onClick={() => onBook(id)}
          aria-label={`Book ${name}`}
        >
          Book service
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

export default ServiceCard;
