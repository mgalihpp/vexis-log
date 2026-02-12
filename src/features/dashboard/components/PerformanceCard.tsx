import { Cell, Pie, PieChart } from 'recharts'
import type { ChartConfig } from '@/components/ui/chart'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

type PerformanceCardProps = {
  bestWinTrade: number
  worstLossTrade: number
}

const COLORS = {
  win: '#34d399',
  loss: '#fb7185',
}

const chartConfig = {
  value: { label: 'Amount' },
  'Best Win': { label: 'Best Win', color: COLORS.win },
  'Worst Loss': { label: 'Worst Loss', color: COLORS.loss },
} satisfies ChartConfig

export function PerformanceCard({
  bestWinTrade,
  worstLossTrade,
}: PerformanceCardProps) {
  const performanceData = [
    {
      name: 'Best Win',
      value: bestWinTrade,
      fill: COLORS.win,
    },
    {
      name: 'Worst Loss',
      value: Math.abs(worstLossTrade),
      fill: COLORS.loss,
    },
  ]
  const performanceTotal = performanceData[0].value + performanceData[1].value
  const chartData = performanceData.filter((d) => d.value > 0)

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm flex flex-col lg:col-span-2">
      <h3 className="text-lg font-bold font-display mb-4">Performance</h3>
      <div className="flex-1 flex flex-col items-center justify-center">
        {performanceTotal > 0 ? (
          <div className="w-full flex flex-col items-center gap-4">
            <div className="h-[220px] w-full">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={0}
                    outerRadius={85}
                    paddingAngle={chartData.length > 1 ? 4 : 0}
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        nameKey="name"
                        formatter={(value) =>
                          `$${(value as number).toFixed(2)}`
                        }
                      />
                    }
                  />
                </PieChart>
              </ChartContainer>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Best Trade</span>
                <span className="text-emerald-400 font-bold font-mono">
                  +${bestWinTrade.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Worst Trade</span>
                <span className="text-rose-400 font-bold font-mono">
                  -${Math.abs(worstLossTrade).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full w-full flex text-center items-center justify-center text-sm text-muted-foreground border border-dashed border-border/60 rounded-xl">
            No trades yet. <br /> Add a trade to see performance.
          </div>
        )}
      </div>
    </div>
  )
}
