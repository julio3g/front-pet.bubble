'use server'

import { AuthenticationFormData } from '@/app/(app)/auth/page'
import { TOKEN_POST } from '@/utils/api-old'
import { cookies } from 'next/headers'

export async function authentication(dataForm: AuthenticationFormData) {
  const username = dataForm.username as string | null
  const password = dataForm.password as string | null

  try {
    if (!username || !password) throw new Error('Preencha todos os campos!')

    const { url } = TOKEN_POST()
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForm),
    })
    if (!response.ok) throw new Error('Senha ou usuário inválidos!')

    const data = await response.json()

    cookies().set('token', data.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
    })
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message)
    else throw new Error('Erro de autenticação desconhecido')
  }
}
