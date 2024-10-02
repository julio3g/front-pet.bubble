import { photosGet } from '@/actions/photos-get'
import { Feed } from '@/components/feed'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default async function Home() {
  const { data } = await photosGet()
  return (
    <main className="flex flex-col min-h-screen-app">
      <Header />
      <section className="flex-1 pt-8 p-4 w-full max-w-5xl mx-auto">
        {data.length ? <Feed photos={data} /> : <p>Nao tem nada</p>}
      </section>
      <Footer />
    </main>
  )
}
