'use server'

import { USER_GET_BY_USERNAME } from '@/utils/api-old'
import apiError from '@/utils/errors'
import { UserProps } from './user-get'

export async function userGetByUserName(username: string) {
  try {
    const { url } = USER_GET_BY_USERNAME(username)
    const response = await fetch(url, {
      method: 'GET',
      next: {
        revalidate: 60,
      },
    })
    if (!response.ok) throw new Error('Erro ao retornar os dados do usuário!')
    const data = (await response.json()) as UserProps
    return { data }
  } catch (error: unknown) {
    return { message: apiError(error) }
  }
}
