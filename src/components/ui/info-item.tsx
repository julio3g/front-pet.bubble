import * as React from 'react'

interface InfoItemProps {
  icon: React.ElementType
  label: string
  value: string
}

export function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-center text-lg gap-2">
      <Icon size={20} />
      <div className="flex gap-1">
        <span className="font-medium">{label}:</span>
        <span>{value}</span>
      </div>
    </div>
  )
}
