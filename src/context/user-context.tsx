'use client'

import { UserProps } from '@/actions/user-get'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
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
  return (
    <UserContext.Provider value={{ user: userState, setUserState }}>
      {children}
    </UserContext.Provider>
  )
}
