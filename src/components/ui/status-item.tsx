import * as React from 'react'
import { Badge } from './badge'

interface StatusItemProps {
  icon: React.ElementType
  label: string
  value: string
}
export function StatusItem({ icon: Icon, label, value }: StatusItemProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-col items-center text-center">
        <Icon size={24} />
        <span className="text-sm">{label}</span>
      </div>
      <Badge
        variant={value ? 'default' : 'destructive'}
        className="font-medium"
      >
        {value ? 'Sim' : 'Não'}
      </Badge>
    </div>
  )
}
