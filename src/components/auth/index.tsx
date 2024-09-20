import { LogoLarge } from '@/assets/logo-large'
import Link from 'next/link'

export function LeftAuthPage() {
  return (
    <div className="relative hidden h-full flex-col bg-muted p-10 text-accent-foreground lg:flex">
      <Link href="/" className="relative z-20">
        <LogoLarge />
      </Link>
      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          <p className="max-w-md">
            “Encontrei meu melhor amigo graças a vocês. A adoção foi simples, e
            agora tenho um companheiro para a vida toda!”
          </p>
          <footer className="text-sm">Mariana S.</footer>
        </blockquote>
      </div>
    </div>
  )
}
