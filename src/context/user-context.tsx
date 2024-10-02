'use client'

import { logout } from '@/actions/logout'
import { UserProps } from '@/actions/user-get'
import validateToken from '@/actions/validate-token'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

interface IUserContextProps {
  user: UserProps | null
  setUserState: Dispatch<SetStateAction<UserProps | null>>
}

const UserContext = createContext<IUserContextProps | null>(null)

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === null) {
    throw new Error('useUser must be used within a UserContextProvider')
  }
  return context
}

export function UserContextProvider({
  children,
  user,
}: {
  children: ReactNode
  user: UserProps | null
}) {
  const [userState, setUserState] = useState<UserProps | null>(user)

  useEffect(() => {
    async function validate() {
      const result = await validateToken()
      if (!result) await logout()
    }
    if (userState) validate()
  }, [userState])

  return (
    <UserContext.Provider value={{ user: userState, setUserState }}>
      {children}
    </UserContext.Provider>
  )
}
