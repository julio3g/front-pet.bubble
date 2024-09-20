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

// id: 11,
//       author: 'admin',
//       title: 'devon',
//       date: '2024-09-13 13:09:29',
//       src:
//         'http://pet-shop.local/wp-content/uploads/2024/09/1716083693-66495bedddc21581547092-1000x683.jpg',
//       animal_type: 'novo_usuario2',
//       animal_age: 'email@exemplo2.com',
//       animal_carrying: 'senha123',
//       animal_gender: '01001000',
//       animal_vaccinated: '',
//       animal_castrated: '',
//       animal_special_condition: '',
//       animal_special_condition_description: 'oi',
//       visualizations: '0'
export async function photosGet() {
  const response = await fetch(
    // 'https://dogsapi.origamid.dev/json/api/photo/?_page=1&_total=6&_user=0',
    'http://pet-shop.local/json/api/photo/?_page=1&_total=6&_user=0',
  )
  // console.log(await response.json())
  const data = (await response.json()) as PhotoProps[]
  return data
}
