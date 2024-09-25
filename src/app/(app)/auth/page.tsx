import { LogoLarge } from '@/assets/logo-large'
import { LeftAuthPage } from '@/components/auth'
import { SignInForm } from '@/components/auth/sign-in'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Login - Pet.Bubble',
  description: 'Faça login na nossa plataforma de adoção de animais',
}

export default function SignIn() {
  return (
    <div className="container relative flex h-screen w-screen items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/"
        className="absolute left-4 top-4 z-20 md:right-8 md:top-8 lg:hidden"
      >
        <LogoLarge />
      </Link>
      <LeftAuthPage />
      <div className="lg:p-8">
        <SignInForm />
      </div>
    </div>
  )
}
