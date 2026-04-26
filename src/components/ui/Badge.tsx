import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/lib/utils';

const badgeVariants = cva(
	'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
	{
		variants: {
			variant: {
				default: 'border-transparent bg-brand-blue/12 text-brand-blue',
				secondary: 'border-transparent bg-slate-100 text-slate-700',
				outline: 'border-slate-200 text-slate-600',
				success: 'border-transparent bg-green-100 text-green-700',
				warning: 'border-transparent bg-amber-100 text-amber-700',
				danger: 'border-transparent bg-red-100 text-red-700',
				muted: 'border-transparent bg-gray-100 text-gray-700',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

function Badge({ className, variant, ...props }: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
	return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

Badge.displayName = 'Badge';

export { badgeVariants };
export default Badge;
