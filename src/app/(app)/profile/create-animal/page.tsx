import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { CreateANewAnimalForm } from '@/components/profile/createAnimal'
import { ProfileHeader } from '@/components/profile/profileHeader'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Adicione um novo pet - Pet Bubble',
  description: 'Onde lares encontram patinhas',
}

export default function CreateANewAnimal() {
  return (
    <main className="flex flex-col min-h-screen-app">
      <Header />
      <ProfileHeader />
      <section className="flex-1 pt-8 md:container mx-auto">
        <CreateANewAnimalForm />
      </section>
      <Footer />
    </main>
  )
}
