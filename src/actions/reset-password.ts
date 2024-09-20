'use server'

import { PASSWORD_RESET } from '@/utils/api-old'
import { redirect } from 'next/navigation'

interface ResetPasswordFormDataProps {
  key: string
  login: string
  password: string
}

export async function passwordReset(dataForm: ResetPasswordFormDataProps) {
  const login = dataForm.login as string | null
  const key = dataForm.key as string | null
  const password = dataForm.password as string | null

  try {
    if (!login) throw new Error('Preencha todos os campos!')
    const { url } = PASSWORD_RESET()
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForm),
    })
    if (!response.ok) throw new Error('Não autorizado!')
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message)
    else throw new Error('Erro de autenticação desconhecido')
  }
  redirect('/auth')
}
