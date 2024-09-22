import { LogoLarge } from '@/assets/logo-large'
import { LeftAuthPage } from '@/components/auth'
import { SignInForm } from '@/components/auth/sign-in'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Login - Pet.Bubble',
  description: 'Faça login na nossa plataforma de adoção de animais',
}

export default function Login() {
  return (
    <div className="container relative flex h-screen w-screen items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Button className="absolute right-4 top-4 md:right-8 md:top-8" asChild>
        <Link href="/auth/create-account">Cadastrar-se</Link>
      </Button>
      <Link
        href="/"
        className="absolute left-4 top-4 z-20 md:right-8 md:top-8 lg:hidden"
      >
        <LogoLarge />
      </Link>
      <LeftAuthPage />
      <SignInForm />
    </div>
  )
}
