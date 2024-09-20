'use server'

import { CreateAccountFormData } from '@/app/(app)/auth/create-account/page'
import { USER_POST } from '@/utils/api-old'
import { authentication } from './authentication'

export async function createNewUser(dataForm: CreateAccountFormData) {
  const username = dataForm.username as string | null
  const email = dataForm.email as string | null
  const password = dataForm.password as string | null
  const zipCode = dataForm.zipCode as string | null
  const numberAddress = dataForm.numberAddress as string | null

  try {
    if (!username || !email || !password || !zipCode || !numberAddress)
      throw new Error('Preencha todos os campos!')

    const { url } = USER_POST()
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForm),
    })
    if (!response.ok) throw new Error('Email ou usuário já cadastrados!')
    const auth = await authentication({ password, username })
    if (!auth) throw new Error('Erro na autenticação!')
    return { message: 'Autenticação bem-sucedida' }
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message)
    else throw new Error('Erro de autenticação desconhecido')
  }
}
