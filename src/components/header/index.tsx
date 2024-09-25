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
      <nav className="flex px-4 md:container md:mx-auto items-center justify-between h-16">
        <Link href="/">
          <LogoLarge />
        </Link>
        {user ? (
          <Button variant="ghost" className="flex gap-1" asChild>
            <Link href="/profile">
              <User size={16} aria-label="Perfil do usuário" />
              <span>{user?.username}</span>
            </Link>
          </Button>
        ) : (
          <ul className="flex gap-2">
            <li>
              <Button variant="ghost" className="flex gap-1" asChild>
                <Link href="/auth">
                  <User size={16} aria-label="Entrar" />
                  Entrar
                </Link>
              </Button>
            </li>
            <li>
              <Button asChild>
                <Link href="/auth/sign-up">Cadastrar-se</Link>
              </Button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  )
}
