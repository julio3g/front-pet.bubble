'use server'

import { PASSWORD_RESET } from '@/utils/api-old'
import apiError from '@/utils/erros'
import { redirect } from 'next/navigation'

interface ResetPasswordFormDataProps {
  key: string
  login: string
  password: string
}

export async function passwordReset(dataForm: ResetPasswordFormDataProps) {
  try {
    const { url } = PASSWORD_RESET()
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForm),
    })
    if (!response.ok) return { message: 'Não autorizado!' }
  } catch (error: unknown) {
    return { message: apiError(error) }
  }
  redirect('/auth')
}
