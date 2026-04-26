import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/src/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-btn text-sm font-semibold transition-[color,background-color,box-shadow,transform] duration-150 outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-55 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:first-child:last-child]:mx-0 [&_svg:first-child]:mr-auto [&_svg:last-child]:ml-auto',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-blue text-brand-white shadow-[0_16px_30px_-18px_rgba(13,102,180,0.9)] hover:bg-brand-sky hover:-translate-y-0.5',
        outline:
          'border border-brand-blue bg-white text-brand-blue hover:bg-brand-blue hover:text-white',
        ghost:
          'border border-brand-border bg-transparent text-slate-600 hover:bg-slate-50',
        danger:
          'bg-red-500 text-white shadow-[0_16px_30px_-18px_rgba(239,68,68,0.9)] hover:bg-red-600',
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-5 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  loading = false,
  asChild = false,
  disabled = false,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const Comp = asChild ? Slot : 'button';
  const classes = cn(buttonVariants({ variant, size }), loading && 'pointer-events-none', className);

  if (asChild) {
    return (
      <Comp
        aria-disabled={isDisabled}
        className={classes}
        data-disabled={isDisabled ? '' : undefined}
        {...rest}
      >
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      type={type}
      disabled={isDisabled}
      className={classes}
      {...rest}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
      {children}
    </Comp>
  );
}

Button.displayName = 'Button';

export { buttonVariants };
export default Button;
