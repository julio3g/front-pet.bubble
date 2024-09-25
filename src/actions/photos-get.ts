'use server'

import { PHOTOS_GET } from '@/utils/api-old'
import apiError from '@/utils/errors'
import { UserProps } from './user-get'

export interface PhotoProps {
  id: number
  author: string
  title: string
  date: string
  src: string
  animal_type: string
  animal_age: string
  animal_breed: string
  animal_gender: string
  animal_vaccinated: string
  animal_castrated: string
  animal_special_condition: string
  animal_special_condition_description: string
  responsible_contact: string
  visualizations: string
  user: UserProps
}

type PhotosGetParams = {
  page?: number
  total?: number
  user?: 0 | string
}

export async function photosGet(
  { page = 1, total = 6, user = 0 }: PhotosGetParams = {},
  optionsFront?: RequestInit,
) {
  try {
    const options = optionsFront || {
      next: { revalidate: 10, tags: ['photo'] },
    }
    const { url } = PHOTOS_GET({ page, total, user })
    const response = await fetch(url, options)

    if (!response.ok) return { message: 'Erro ao buscar os dados.' }
    const data = (await response.json()) as PhotoProps[]

    return { data }
  } catch (error) {
    return { message: apiError(error) }
  }
}
