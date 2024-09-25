'use client'

import { logout } from '@/actions/logout'
import { ActiveButton } from '@/components/ui/active-button'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useUser } from '@/context/user-context'
import useMedia from '@/hooks/use-media'
import { ChartPie, Grid2X2, LogOut, Plus } from 'lucide-react'
import { usePathname } from 'next/navigation'

function getTitle(pathname: string) {
  switch (pathname) {
    case '/profile/create-animal':
      return 'Adicione um novo pet'
    case '/profile/statistic':
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
    try {
      await logout()
      setUserState(null)
    } catch (error) {
      console.error('Erro ao deslogar!', error)
    }
  }

  return (
    <nav className="mt-8 flex px-4 md:container md:mx-auto w-full items-center justify-between h-16">
      <h2 className="text-3xl font-medium">{getTitle(pathname)}</h2>
      <ul className="flex gap-2">
        <TooltipProvider>
          <li>
            <ActiveButton
              icon={Grid2X2}
              url="/profile"
              tooltipText="Estatísticas"
            />
          </li>
          <li>
            <ActiveButton
              icon={ChartPie}
              url="/profile/statistic"
              tooltipText="Estatísticas"
            />
          </li>
          <li>
            <ActiveButton
              icon={Plus}
              url="/profile/create-animal"
              tooltipText="Estatísticas"
            />
          </li>
          <li>
            <ActiveButton
              icon={LogOut}
              tooltipText="Sair da conta"
              onClick={handleLogout}
            />
          </li>
        </TooltipProvider>
      </ul>
    </nav>
  )
}
