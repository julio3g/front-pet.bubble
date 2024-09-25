import { LogoLarge } from '@/assets/logo-large'
import Image from 'next/image'
import Link from 'next/link'

export function LeftAuthPage() {
  return (
    <div className="relative hidden h-full flex-col bg-muted p-10 text-accent-foreground lg:flex">
      <Link href="/" className="relative z-20">
        <LogoLarge />
      </Link>
      <div className="flex-1 flex flex-col justify-center items-center">
        <Image
          src="/Adopt_a_pet-amico_3.png"
          alt="sei-la"
          width={500}
          className="max-w-md"
          height={500}
          sizes="80vw"
        />
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
