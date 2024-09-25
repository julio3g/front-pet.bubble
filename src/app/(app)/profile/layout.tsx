import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ProfileHeader } from '@/components/profile/profile-header'
import { ReactNode } from 'react'

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <main className="flex flex-col min-h-screen-app">
      <Header />
      <ProfileHeader />
      <section className="flex-1 pt-8 p-4 sm:container mx-auto">
        {children}
      </section>
      <Footer />
    </main>
  )
}
