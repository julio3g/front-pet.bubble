'use server'

import { CreateAccountFormData } from '@/components/auth/sign-up'
import { USER_POST } from '@/utils/api-old'
import apiError from '@/utils/errors'
import { authentication } from './authentication'

export async function createNewUser(dataForm: CreateAccountFormData) {
  const { username, password } = dataForm

  try {
    const { url } = USER_POST()
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForm),
    })
    if (!response.ok) return { message: 'Email ou usuário já cadastrados!' }
    const auth = await authentication({ password, username })
    if (!auth) throw new Error('Erro na autenticação!')
    return null
  } catch (error: unknown) {
    return { message: apiError(error) }
  }
}
