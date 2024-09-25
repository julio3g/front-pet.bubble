import { photoGet } from '@/actions/photo-get'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

interface SingleAnimalParams {
  params: { id: string }
}

export default async function SingleAnimal({ params }: SingleAnimalParams) {
  const { data } = await photoGet(params.id)
  console.log(data)
  return (
    <main className="flex flex-col min-h-screen-app">
      <Header />
      <section className="flex-1 pt-8 p-4 md:container mx-auto">
        Single Animal, Animal: {data.title}
      </section>
      <Footer />
    </main>
  )
}
