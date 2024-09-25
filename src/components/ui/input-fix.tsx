import * as React from 'react'

import { cn } from '@/lib/utils'

export type InputProps = {
  className?: string
  type?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'>

const InputWithFix = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, prefix, suffix, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 justify-between text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
      >
        {prefix && <>{prefix}</>}
        <input
          type={type}
          ref={ref}
          {...props}
          className={cn('outline-none ', className)}
        />
        {suffix && <>{suffix}</>}
      </div>
    )
  },
)
InputWithFix.displayName = 'InputWithFix'

export { InputWithFix }
