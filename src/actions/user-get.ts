'use server'

import { USER_GET } from '@/utils/api-old'
import { cookies } from 'next/headers'

export interface UserProps {
  id: number
  email: string
  username: string
  name: string
  roles: Array<string>
  zipCode: string
  state: string
  city: string
  neighborhood: string
  street: string
  numberAddress: string
  complement: string
}

export async function userGet() {
  try {
    const token = cookies().get('token')?.value
    if (!token) throw new Error('Token não encontrado!')
    const { url } = USER_GET()
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60,
      },
    })
    if (!response.ok) throw new Error('Erro ao retornar os dados do usuário!')
    const data = (await response.json()) as UserProps
    if (!data) return
    return { data }
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message)
    else throw new Error('Erro de autenticação desconhecido')
  }
}
