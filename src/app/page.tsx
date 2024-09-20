import { Feed } from '@/components/feed'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen-app">
      <Header />
      <section className="flex-1 pt-8">
        <Feed />
      </section>
      <Footer />
    </main>
  )
}
