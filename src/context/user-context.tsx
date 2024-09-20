'use client'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

export interface UserProps {
  id: number
  email: string
  username: string
  name: string
  zipCode: string
  state: string
  city: string
  neighborhood: string
  street: string
  numberAddress: string
  complement: string
}

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
