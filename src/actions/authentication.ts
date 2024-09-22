'use server'

import { AuthenticationFormData } from '@/components/auth/sign-in'
import { TOKEN_POST } from '@/utils/api-old'
import apiError from '@/utils/erros'
import { cookies } from 'next/headers'

export async function authentication(dataForm: AuthenticationFormData) {
  try {
    const { url } = TOKEN_POST()
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForm),
    })
    if (!response.ok) return { message: 'Senha ou usuário inválidos!' }
    const data = await response.json()
    cookies().set('token', data.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
    })
    return null
  } catch (error: unknown) {
    return { message: apiError(error) }
  }
}
