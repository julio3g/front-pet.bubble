'use client'

import { LogoLarge } from '@/assets/logo-large'
import { useUser } from '@/context/user-context'
import { User } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

export function Header() {
  const { user } = useUser()

  return (
    <header className="bg-white sticky z-10 top">
      <nav className="flex px-4 2xl:container md:mx-auto items-center justify-between h-16">
        <Link href="/">
          <LogoLarge />
        </Link>
        {user ? (
          <Link href="/profile">
            <Button variant="ghost" className="flex gap-1">
              <User size={16} />
              <span>{user?.username}</span>
            </Button>
          </Link>
        ) : (
          <ul className="flex gap-2">
            <li>
              <Link href="/auth">
                <Button variant="ghost" className="flex gap-1">
                  <User size={16} />
                  Entrar
                </Button>
              </Link>
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
