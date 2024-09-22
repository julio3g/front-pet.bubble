import statsGet from '@/actions/stats-get'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ProfileHeader } from '@/components/profile/profileHeader'

import dynamic from 'next/dynamic'

const StatisticCharts = dynamic(
  () => import('@/components/profile/statistic'),
  {
    loading: () => <div className="">Carregando...</div>,
    ssr: false,
  },
)

export default async function Statistic() {
  const { updatedData } = await statsGet()
  return (
    <main className="flex flex-col min-h-screen-app">
      <Header />
      <ProfileHeader />
      <section className="flex-1 pt-8 md:container mx-auto">
        <StatisticCharts data={updatedData} />
      </section>
      <Footer />
    </main>
  )
}
