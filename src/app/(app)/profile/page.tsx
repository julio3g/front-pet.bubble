import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ProfileHeader } from '@/components/profile/profileHeader'

export default function ResetPassword() {
  return (
    <main className="flex flex-col min-h-screen-app">
      <Header />
      <ProfileHeader />
      <section className="flex-1 pt-8 md:container mx-auto">Profile</section>
      <Footer />
    </main>
  )
}
