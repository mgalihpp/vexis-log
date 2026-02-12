import { useMemo } from 'react'
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from 'recharts'
import type { ChartConfig } from '@/components/ui/chart'
import type { AnalyticsTrade } from '@/utils/dashboard.analytics'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { calculateRadarMetrics } from '@/utils/dashboard.analytics'

type TraderRadarProps = {
  trades: Array<AnalyticsTrade>
}

const chartConfig = {
  value: {
    label: 'Score',
    color: 'oklch(0.72 0.19 277)',
  },
} satisfies ChartConfig

const getMetricColor = (value: number): string => {
  if (value >= 80) return 'bg-emerald-500/15 text-emerald-400'
  if (value >= 60) return 'bg-emerald-500/10 text-emerald-300'
  if (value >= 40) return 'bg-amber-500/15 text-amber-400'
  if (value >= 20) return 'bg-orange-500/15 text-orange-400'
  return 'bg-red-500/15 text-red-400'
}

export function TraderRadar({ trades }: TraderRadarProps) {
  const radarData = useMemo(() => calculateRadarMetrics(trades), [trades])
  const hasTrades = trades.length > 0

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
      <h3 className="text-lg font-bold font-display mb-4">Trader Score</h3>

      {hasTrades ? (
        <>
          {/* Radar Chart */}
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-h-[280px]"
          >
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" fontSize={12} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Radar
                name="Score"
                dataKey="value"
                stroke="var(--color-value)"
                fill="var(--color-value)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ChartContainer>

          {/* Heatmap Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-4">
            {radarData.map((item) => (
              <div
                key={item.metric}
                className={`rounded-lg p-3 text-center ${getMetricColor(item.value)}`}
              >
                <div className="text-xs text-muted-foreground mb-1">
                  {item.metric}
                </div>
                <div className="text-lg font-bold font-display">
                  {item.value.toFixed(0)}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="h-full flex text-center items-center justify-center text-sm text-muted-foreground border border-dashed border-border/60 rounded-xl min-h-[300px]">
          No trades yet.
          <br />
          Add a trade to see your trader score.
        </div>
      )}
    </div>
  )
}
