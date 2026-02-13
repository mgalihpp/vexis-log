import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useMemo } from "react";
import { format } from "date-fns";
import type { ChartConfig } from "@/components/ui/chart";
import type { AnalyticsTrade } from "@/utils/dashboard.analytics";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { calculateEquityCurve } from "@/utils/dashboard.analytics";

type EquityCurveCardProps = {
  trades: Array<AnalyticsTrade>;
  hasTrades: boolean;
};

const chartConfig = {
  equity: {
    label: "Equity",
    color: "oklch(0.72 0.19 277)",
  },
} satisfies ChartConfig;

export function EquityCurveCard({ trades, hasTrades }: EquityCurveCardProps) {
  const chartData = useMemo(() => calculateEquityCurve(trades), [trades]);

  return (
    <div className="lg:col-span-3 bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
      <h3 className="text-lg font-bold font-display mb-6">Equity Curve</h3>
      <div className="h-[300px] w-full">
        {hasTrades ? (
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-equity)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-equity)"
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
                tickFormatter={(value) => format(new Date(value), "MMM dd")}
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => {
                      const formattedValue = `$${Number(value).toFixed(2)}`;
                      return formattedValue;
                    }}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="equity"
                stroke="var(--color-equity)"
                fillOpacity={1}
                fill="url(#colorEquity)"
                strokeWidth={2.5}
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <div className="h-full flex text-center items-center justify-center text-sm text-muted-foreground border border-dashed border-border/60 rounded-xl">
            No trades yet. <br /> Add a trade to see the equity curve.
          </div>
        )}
      </div>
    </div>
  );
}
