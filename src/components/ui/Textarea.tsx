import * as React from 'react';

import { cn } from '@/src/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex min-h-[96px] w-full rounded-card border border-slate-200 bg-white px-4 py-3 text-sm text-brand-navy shadow-sm outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-slate-400 focus-visible:border-brand-blue focus-visible:ring-2 focus-visible:ring-brand-blue/15 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

Textarea.displayName = 'Textarea';

export default Textarea;
