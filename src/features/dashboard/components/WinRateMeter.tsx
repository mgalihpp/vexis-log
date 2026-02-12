'use client'

import { useMemo } from 'react'
import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts'

import type { ChartConfig } from '@/components/ui/chart'
import { ChartContainer } from '@/components/ui/chart'

type WinRateMeterProps = {
  winRate: number
  totalTrades: number
}

export function WinRateMeter({ winRate, totalTrades }: WinRateMeterProps) {
  const chartData = [
    {
      activity: 'winRate',
      value: winRate,
      fill: 'var(--color-winRate)',
    },
  ]

  const chartConfig = useMemo(
    () =>
      ({
        winRate: {
          label: 'Win Rate',
          color: winRate >= 50 ? 'oklch(0.72 0.17 155)' : 'oklch(0.65 0.2 25)',
        },
      }) satisfies ChartConfig,
    [winRate],
  )

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm flex flex-col h-full">
      <h3 className="text-lg font-bold font-display mb-6">Win Rate</h3>
      <div className="h-[300px] w-full relative">
        {totalTrades > 0 ? (
          <>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square w-full max-h-[300px]"
            >
              <RadialBarChart
                data={chartData}
                startAngle={90}
                endAngle={-270}
                innerRadius={80}
                outerRadius={110}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar background dataKey="value" cornerRadius={30} />
              </RadialBarChart>
            </ChartContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold font-display">
                {winRate.toFixed(0)}%
              </span>
              <span className="text-sm text-muted-foreground">
                {totalTrades} trades
              </span>
            </div>
          </>
        ) : (
          <div className="h-full flex text-center items-center justify-center text-sm text-muted-foreground border border-dashed border-border/60 rounded-xl">
            No trades yet.
            <br />
            Add a trade to see your win rate.
          </div>
        )}
      </div>
    </div>
  )
}
