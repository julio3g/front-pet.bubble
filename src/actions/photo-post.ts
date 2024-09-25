'use server'

import { PHOTO_POST } from '@/utils/api-old'
import apiError from '@/utils/errors'
import { cookies } from 'next/headers'

export async function createNewPet(dataForm: FormData) {
  const token = cookies().get('token')?.value
  try {
    const { url } = PHOTO_POST()
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: dataForm,
    })
    if (!response.ok) return { message: 'Erro ao adicionar um novo pet!' }
    return null
  } catch (error: unknown) {
    return { message: apiError(error) }
  }
}
