'use client'

import { Cell, Customized, Pie, PieChart } from 'recharts'

import type { ChartConfig } from '@/components/ui/chart'
import { ChartContainer } from '@/components/ui/chart'

type WinRateMeterProps = {
  winRate: number
  totalTrades: number
}

const chartConfig = {
  win: {
    label: 'Win',
    color: 'hsl(142, 72%, 42%)',
  },
  loss: {
    label: 'Loss',
    color: 'hsl(0, 72%, 51%)',
  },
} satisfies ChartConfig

// Needle component that scales with the chart
// Customized passes { width, height, ... } of the chart area
const Needle = (props: any) => {
  const { width, height, winRate } = props

  if (typeof width !== 'number' || typeof height !== 'number') {
    return null
  }

  // Calculate center.
  // Pie is configured with cx="50%", cy="100%"
  const center_x = width / 2
  const center_y = height

  // Calculate radius.
  // Pie uses innerRadius="75%", outerRadius="100%"
  // Recharts calculates 'maxRadius' as min(width/2, height)
  const maxRadius = Math.min(width / 2, height)

  // Needle length should be within the arc.
  // Outer radius of arc is 100% of maxRadius.
  // Inner is 75%.
  // Let's make needle tip reach 85%?
  const needleLength = maxRadius * 0.85

  // Convert winRate to angle for speedometer (180 to 0)
  // 0% -> 180 deg (Left)
  // 100% -> 0 deg (Right)
  const angle = 180 - (winRate / 100) * 180
  const radian = (angle * Math.PI) / 180

  const x = center_x + needleLength * Math.cos(radian)
  const y = center_y - needleLength * Math.sin(radian)

  return (
    <g>
      <circle cx={center_x} cy={center_y} r={4} fill="hsl(var(--foreground))" />
      <line
        x1={center_x}
        y1={center_y}
        x2={x}
        y2={y}
        stroke="hsl(var(--foreground))"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </g>
  )
}

export function WinRateMeter({ winRate, totalTrades }: WinRateMeterProps) {
  // Data for the gauge
  const gaugeData = [
    { value: winRate }, // Filled
    { value: 100 - winRate }, // Empty
  ]

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm flex flex-col h-full lg:col-span-2">
      <h3 className="text-lg font-bold font-display mb-6">Win Rate</h3>
      <div className="flex-1 flex flex-col items-center justify-center">
        {totalTrades > 0 ? (
          <>
            <div className="w-full max-w-[280px]">
              <ChartContainer
                config={chartConfig}
                className="w-full aspect-[5/3]"
              >
                <PieChart>
                  {/* Value arc */}
                  <Pie
                    data={gaugeData}
                    cx="50%"
                    cy="100%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius="75%"
                    outerRadius="100%"
                    dataKey="value"
                    stroke="none"
                    cornerRadius={5}
                  >
                    <Cell fill="var(--color-win)" />
                    <Cell fill="var(--color-loss)" />
                  </Pie>

                  {/* Needle */}
                  <Customized
                    component={(props: any) => (
                      <Needle {...props} winRate={winRate} />
                    )}
                  />
                </PieChart>
              </ChartContainer>
            </div>

            {/* Value display */}
            <div className="mt-2 text-center space-y-1">
              <span className="block text-3xl font-bold font-display leading-none">
                {winRate.toFixed(0)}%
              </span>
              <span className="block text-sm text-muted-foreground leading-tight">
                Total {totalTrades} trades
              </span>
            </div>

            {/* Scale labels */}
            <div className="mt-3 flex justify-between w-full max-w-[240px] px-2">
              <span className="text-xs text-muted-foreground">0%</span>
              <span className="text-xs text-muted-foreground">100%</span>
            </div>
          </>
        ) : (
          <div className="h-full flex text-center items-center justify-center text-sm text-muted-foreground border border-dashed border-border/60 rounded-xl w-full min-h-[200px]">
            No trades yet.
            <br />
            Add a trade to see your win rate.
          </div>
        )}
      </div>
    </div>
  )
}
