'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './button'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

interface ActiveButtonProps {
  icon: React.ElementType
  url?: string
  tooltipText: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  activeClassName?: string
  defaultClassName?: string
  iconActiveClassName?: string
  iconDefaultClassName?: string
}

const ActiveButton: React.FC<ActiveButtonProps> = ({
  icon: Icon,
  url,
  tooltipText,
  onClick,
  activeClassName = 'border-primary bg-orange-100 hover:bg-orange-50',
  defaultClassName = '',
  iconActiveClassName = 'stroke-primary',
  iconDefaultClassName = 'stroke-current',
}) => {
  const pathname = usePathname()
  const isActive = pathname === url

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className={`flex gap-1  ${
            isActive ? activeClassName : defaultClassName
          }`}
          asChild
          onClick={onClick}
          aria-label={tooltipText}
        >
          {url ? (
            <Link href={url}>
              <Icon
                className={
                  isActive ? iconActiveClassName : iconDefaultClassName
                }
                size={16}
              />
            </Link>
          ) : (
            <span className="cursor-pointer">
              <Icon size={16} />
            </span>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  )
}
ActiveButton.displayName = 'ActiveButton'

export { ActiveButton }
