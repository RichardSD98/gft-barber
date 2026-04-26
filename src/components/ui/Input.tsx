import * as React from 'react';

import { cn } from '@/src/lib/utils';

function Input({ className, type = 'text', ...props }: React.ComponentProps<'input'>) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				'flex h-10 w-full rounded-card border border-slate-200 bg-white px-4 py-2 text-sm text-brand-navy shadow-sm outline-none transition-[border-color,box-shadow] duration-150 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:border-brand-blue focus-visible:ring-2 focus-visible:ring-brand-blue/15 disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			{...props}
		/>
	);
}

Input.displayName = 'Input';

export default Input;
