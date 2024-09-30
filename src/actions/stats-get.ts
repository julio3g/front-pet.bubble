'use server'

import { STATS_GET } from '@/utils/api-old'
import apiError from '@/utils/errors'
import { cookies } from 'next/headers'

export interface StatsData {
  id: number
  title: string
  visualizations: number
}

export default async function statsGet() {
  try {
    const token = cookies().get('token')?.value
    if (!token) throw new Error('Acesso negado.')
    const { url } = STATS_GET()
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 10,
      },
    })
    if (!response.ok) return { message: 'Erro ao buscar os dados.' }
    const data = await response.json()
    const updatedData = data.map((item: StatsData) => ({
      ...item,
      visualizations: Number(item.visualizations),
    })) as StatsData[]
    return { updatedData }
  } catch (error) {
    return { message: apiError(error) }
  }
}
