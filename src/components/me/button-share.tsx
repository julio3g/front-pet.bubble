'use client'

import { CopyCheck, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'

export function ButtonShare() {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    const urlToCopy = window.location.href
    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch((err) => toast.error(err))
  }

  return (
    <>
      {copied ? (
        <Button
          onClick={handleCopy}
          className="flex gap-2 bg-green-500 hover:bg-green-600"
        >
          <CopyCheck size={16} />
          Link Copiado!
        </Button>
      ) : (
        <Button onClick={handleCopy} className="flex gap-2">
          <ExternalLink size={16} />
          Compartilhar
        </Button>
      )}
    </>
  )
}
