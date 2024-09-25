import { photosGet } from '@/actions/photos-get'
import { Feed } from '@/components/feed'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default async function Home() {
  const { data } = await photosGet({ user: 0 })

  return (
    <main className="flex flex-col min-h-screen-app">
      <Header />
      <section className="flex-1 pt-8 p-4 md:container mx-auto">
        {data && <Feed photos={data} />}
      </section>
      <Footer />
    </main>
  )
}
