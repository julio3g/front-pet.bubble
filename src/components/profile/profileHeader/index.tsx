'use client'

import { logout } from '@/actions/logout'
import { Button } from '@/components/ui/button'
import { useUser } from '@/context/user-context'
import useMedia from '@/hooks/use-media'
import { User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function getTitle(pathname: string) {
  switch (pathname) {
    case '/conta/postar':
      return 'Poste Sua Foto'
    case '/conta/estatisticas':
      return 'Estatísticas'
    default:
      return 'Minha Conta'
  }
}

export function ProfileHeader() {
  const mobile = useMedia('(max-width: 40rem)')
  const pathname = usePathname()

  const { setUserState } = useUser()
  async function handleLogout() {
    await logout()
    setUserState(null)
  }

  return (
    <nav className="flex px-4 2xl:container md:mx-auto w-full items-center justify-between h-16">
      <h2>{getTitle(pathname)}</h2>
      <ul className="flex gap-2">
        <li>
          <Button
            variant="ghost"
            className={`flex gap-1 ${
              pathname === '/profile' ? 'bg-orange-700 text-white' : ''
            }`}
          >
            <User size={16} />
            <Link href="/profile">Entrar</Link>
          </Button>
        </li>
        <li>
          <Button variant="ghost" className="flex gap-1">
            <User size={16} />
            <Link href="/profile/statistic">statistic</Link>
          </Button>
        </li>
        <li>
          <Button variant="ghost" className="flex gap-1">
            <User size={16} />
            <Link href="/profile/create">create</Link>
          </Button>
        </li>
        <li>
          <Button onClick={handleLogout} variant="ghost" className="flex gap-1">
            <User size={16} />
            <Link href="/logout">logout</Link>
          </Button>
        </li>
      </ul>
    </nav>
  )
}
