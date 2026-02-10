import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

type PerformanceCardProps = {
  bestWinTrade: number
  worstLossTrade: number
}

export function PerformanceCard({
  bestWinTrade,
  worstLossTrade,
}: PerformanceCardProps) {
  const performanceData = [
    {
      name: 'Best Win',
      value: bestWinTrade,
      color: '#10b981',
    },
    {
      name: 'Worst Loss',
      value: Math.abs(worstLossTrade),
      color: '#f43f5e',
    },
  ]
  const performanceTotal = performanceData[0].value + performanceData[1].value

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm flex flex-col">
      <h3 className="text-lg font-bold font-display mb-4">Performance</h3>
      <div className="flex-1 flex flex-col items-center justify-center">
        {performanceTotal > 0 ? (
          <div className="w-full flex flex-col items-center gap-4">
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={58}
                    outerRadius={90}
                    paddingAngle={4}
                  >
                    {performanceData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => `$${value.toFixed(2)}`}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Best Trade</span>
                <span className="text-emerald-500 font-bold font-mono">
                  +${bestWinTrade.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Worst Trade</span>
                <span className="text-rose-500 font-bold font-mono">
                  -${Math.abs(worstLossTrade).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-sm text-muted-foreground border border-dashed border-border/60 rounded-xl">
            No trades yet. Add a trade to see performance.
          </div>
        )}
      </div>
    </div>
  )
}
