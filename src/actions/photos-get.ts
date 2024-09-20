'use server'

export interface PhotoProps {
  id: number
  author: string
  title: string
  date: string
  src: string
  peso: string
  idade: string
  acessos: string
  total_comments: string
}

export async function photosGet() {
  const response = await fetch(
    // 'https://dogsapi.origamid.dev/json/api/photo/?_page=1&_total=6&_user=0',
    'http://pet-shop.local/json/api/photo/?_page=1&_total=6&_user=0',
  )
  // console.log(await response.json())
  const data = (await response.json()) as PhotoProps[]
  return data
}
