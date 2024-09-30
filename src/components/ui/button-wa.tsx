import React from 'react'

import { Phone } from 'lucide-react'
import { Button } from './button'

interface WhatsAppButtonProps {
  phoneNumber: string // Número de telefone no formato 55DDDNúmero (ex: 5511999998888)
  message?: string
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message,
}) => {
  const encodedMessage = encodeURIComponent(message)
  const whatsAppUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  return (
    <Button asChild variant="wa" className="flex items-center gap-2">
      <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
        <Phone size={18} />
        Entrar em contato via WhatsApp
      </a>
    </Button>
  )
}

export { WhatsAppButton }
