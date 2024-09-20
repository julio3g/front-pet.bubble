'use server'

import { LostPasswordFormData } from '@/components/auth/lost-password'
import { PASSWORD_LOST } from '@/utils/api-old'

export async function passwordLost(dataForm: LostPasswordFormData) {
  const login = dataForm.login as string | null
  const urlLostPassword = 'http://localhost:3000/auth/reset-password'

  try {
    if (!login) throw new Error('Preencha todos os campos!')
    const { url } = PASSWORD_LOST()
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, urlLostPassword }),
    })
    if (!response.ok) throw new Error('Email ou usuário não cadastrados!')
    return { message: 'Autenticação bem-sucedida' }
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message)
    else throw new Error('Erro de autenticação desconhecido')
  }
}
