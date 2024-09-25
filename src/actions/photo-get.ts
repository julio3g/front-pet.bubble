'use server'

import { PHOTO_GET } from '@/utils/api-old'
import apiError from '@/utils/errors'
import { PhotoProps } from './photos-get'

export async function photoGet(id: string) {
  try {
    const { url } = PHOTO_GET(id)
    const response = await fetch(url, {
      next: {
        revalidate: 60,
        tags: ['photos'],
      },
    })
    if (!response.ok) return { message: 'Erro ao buscar os dados.' }
    const data = (await response.json()) as PhotoProps
    return { data }
  } catch (error) {
    return { message: apiError(error) }
  }
}
