'use server'

import { TOKEN_VALIDATE_POST } from '@/utils/api-old'
import apiError from '@/utils/errors'
import { cookies } from 'next/headers'

export default async function validateToken() {
  try {
    const token = cookies().get('token')?.value
    if (!token) return { message: 'Acesso negado!' }
    const { url } = TOKEN_VALIDATE_POST()
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) return { message: 'Erro ao validar token!' }
    const data = await response.json()
    return { data }
  } catch (error) {
    return { message: apiError(error) }
  }
}
