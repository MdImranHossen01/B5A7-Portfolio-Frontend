import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-white shadow rounded-lg overflow-hidden',
        className
      )}
      {...props}
    />
  )
);

Card.displayName = 'Card';

export { Card };