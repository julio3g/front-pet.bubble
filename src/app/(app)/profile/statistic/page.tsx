import statsGet from '@/actions/stats-get'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ProfileHeader } from '@/components/profile/profileHeader'

import dynamic from 'next/dynamic'

const StatisticCharts = dynamic(
  () => import('@/components/profile/statistic'),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
)

export default async function Statistic() {
  const { data } = await statsGet()
  return (
    <main className="flex flex-col min-h-screen-app">
      <Header />
      <ProfileHeader />
      <section className="flex-1 pt-8 md:container mx-auto">
        <StatisticCharts data={data} />
      </section>
      <Footer />
    </main>
  )
}
