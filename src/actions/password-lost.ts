'use server'

import { LostPasswordFormData } from '@/components/auth/lost-password'
import { env } from '@/env'
import { PASSWORD_LOST } from '@/utils/api-old'
import apiError from '@/utils/errors'

export async function passwordLost(dataForm: LostPasswordFormData) {
  const login = dataForm.login as string | null
  const urlLostPassword = `${env.NEXT_PUBLIC_VERCEL_URL}/auth/reset-password`

  try {
    const { url } = PASSWORD_LOST()
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, urlLostPassword }),
    })
    if (!response.ok) return { message: 'Email ou usuário não cadastrados!' }
    return { message: 'Autenticação bem-sucedida' }
  } catch (error: unknown) {
    return { message: apiError(error) }
  }
}
