import statsGet from '@/actions/stats-get'
import { Loader2 } from 'lucide-react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Estatística - Pet Bubble',
  description: 'Onde lares encontram patinhas',
}

const StatisticCharts = dynamic(
  () => import('@/components/profile/statistic'),
  {
    loading: () => (
      <div className="flex items-center justify-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      </div>
    ),
    ssr: false,
  },
)

export default async function Statistic() {
  const { updatedData } = await statsGet()
  return (
    <>
      {updatedData && updatedData.length > 0 ? (
        <StatisticCharts data={updatedData} />
      ) : (
        <div className="flex flex-col items-center gap-2 justify-center">
          <p className="text-xl">Nenhum dado encontrado</p>
          <p className="text-sm text-muted-foreground">
            Por favor, tente mais tarde.
          </p>
        </div>
      )}
    </>
  )
}
