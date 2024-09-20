'use client'

import { LogoLarge } from '@/assets/logo-large'
import { useUser } from '@/context/user-context'
import { User } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

export async function Header() {
  const { user } = useUser()

  return (
    <header className="bg-white sticky z-10 top">
      <nav className="flex px-4 2xl:container md:mx-auto items-center justify-between h-16">
        <Link href="/">
          <LogoLarge />
        </Link>
        {user ? (
          <Button variant="ghost" className="flex gap-1">
            <User size={16} />
            <Link href="/profile">{user?.email}</Link>
          </Button>
        ) : (
          <ul className="flex gap-2">
            <li>
              <Button variant="ghost" className="flex gap-1">
                <User size={16} />
                <Link href="/auth">Entrar</Link>
              </Button>
            </li>
            <li>
              <Button asChild>
                <Link href="/auth/create-account">Cadastrar-se</Link>
              </Button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  )
}
