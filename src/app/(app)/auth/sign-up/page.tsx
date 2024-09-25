import { LogoLarge } from '@/assets/logo-large'
import { LeftAuthPage } from '@/components/auth'
import { SignUpForm } from '@/components/auth/sign-up'
import Link from 'next/link'

export default function SignUp() {
  return (
    <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/"
        className="absolute left-4 top-4 z-20 md:right-8 md:top-8 lg:hidden"
      >
        <LogoLarge />
      </Link>
      <LeftAuthPage />
      <div className="lg:p-8">
        <SignUpForm />
      </div>
    </div>
  )
}
