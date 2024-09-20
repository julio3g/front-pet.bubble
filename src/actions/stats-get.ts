'use server'

import { STATS_GET } from '@/utils/api-old'
import { cookies } from 'next/headers'

export interface StatsData {
  id: number
  title: string
  visualizations: string
}

export default async function statsGet() {
  try {
    const token = cookies().get('token')?.value
    if (!token) throw new Error('Acesso negado.')
    const { url } = STATS_GET()
    const response = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      next: {
        revalidate: 60,
      },
    })
    if (!response.ok) throw new Error('Erro ao buscar os dados.')
    const data = (await response.json()) as StatsData[]
    return { data }
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
    else throw new Error('Erro de autenticação desconhecido')
  }
}
