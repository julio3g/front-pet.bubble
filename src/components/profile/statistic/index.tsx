'use client'

import { StatsData } from '@/actions/stats-get'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useMedia } from '@/hooks/use-media'
import { Eye } from 'lucide-react'
import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Pie,
  PieChart,
  XAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

const chartConfig = {
  visualizations: {
    label: 'Visitas',
    icon: Eye,
  },
} satisfies ChartConfig

const { indigo, orange, emerald, blue, amber, teal } = colors

const COLORS = [
  indigo[300],
  teal[300],
  orange[300],
  emerald[300],
  blue[300],
  amber[300],
]

export default function StatisticCharts({ data }: { data: StatsData[] }) {
  const mobile = useMedia('(max-width: 768px)')
  const totalVisitors = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.visualizations, 0)
  }, [data])

  function showColorsCell() {
    return data.map((_, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ))
  }

  return (
    <div className="space-y-5 w-full">
      <Card className="p-6">
        <h3 className="text-2xl font-medium">
          Total de Visualizações:{' '}
          <span className="font-semibold">{totalVisitors}</span>
        </h3>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-[260px_auto] lg:grid-cols-[350px_auto] 2xl:grid-cols-[380px_auto] gap-5 max-h-96">
        <Card className="flex h-full w-full">
          <CardContent className="flex-1 p-0">
            <ChartContainer
              config={chartConfig}
              className="m-auto aspect-square h-full"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={data}
                  dataKey="visualizations"
                  nameKey="title"
                  innerRadius={mobile ? 100 : 80}
                  strokeWidth={5}
                >
                  {showColorsCell()}
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl sm:text-4xl font-bold"
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Visitas
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="p-4 max-h-96">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="title"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="visualizations">{showColorsCell()}</Bar>
            </BarChart>
          </ChartContainer>
        </Card>
      </div>
    </div>
  )
}
