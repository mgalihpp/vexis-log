import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import type { ChartConfig } from '@/components/ui/chart'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

type EquityPoint = {
  date: string
  value: number
  daily: number
}

type EquityCurveCardProps = {
  chartData: Array<EquityPoint>
  hasTrades: boolean
}

const chartConfig = {
  value: {
    label: 'Equity',
    color: 'oklch(0.72 0.19 277)',
  },
} satisfies ChartConfig

export function EquityCurveCard({
  chartData,
  hasTrades,
}: EquityCurveCardProps) {
  return (
    <div className="lg:col-span-2 bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
      <h3 className="text-lg font-bold font-display mb-6">Equity Curve</h3>
      <div className="h-[300px] w-full">
        {hasTrades ? (
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-value)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-value)"
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--color-value)"
                fillOpacity={1}
                fill="url(#colorValue)"
                strokeWidth={2.5}
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-sm text-muted-foreground border border-dashed border-border/60 rounded-xl">
            No trades yet. Add a trade to see the equity curve.
          </div>
        )}
      </div>
    </div>
  )
}
