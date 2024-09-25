import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ReactNode } from 'react'

export default async function ProfilePublicLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <main className="flex flex-col min-h-screen-app">
      <Header />
      <section className="flex-1 pt-8 p-4 md:container mx-auto">
        {children}
      </section>
      <Footer />
    </main>
  )
}
