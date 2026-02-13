import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  trendLabel?: string;
  trends?: Array<{
    label: string;
    value: string;
    direction: "up" | "down" | "neutral";
  }>;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  trendDirection,
  trendLabel,
  trends,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl p-6 border border-border/50 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300",
        className,
      )}
    >
      {/* Background glow effect */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground">
            {value}
          </h3>
          {trends && trends.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {trends.map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1"
                >
                  <span
                    className={cn(
                      "text-xs font-semibold px-2 py-0.5 rounded-full",
                      item.direction === "up" &&
                        "bg-emerald-500/10 text-emerald-500",
                      item.direction === "down" &&
                        "bg-rose-500/10 text-rose-500",
                      item.direction === "neutral" &&
                        "bg-slate-500/10 text-slate-500",
                    )}
                  >
                    {item.value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.label}
                  </span>
                </span>
              ))}
            </div>
          )}
          {!trends && trend && (
            <div className="flex items-center gap-1.5 mt-2">
              <span
                className={cn(
                  "text-xs font-semibold px-2 py-0.5 rounded-full",
                  trendDirection === "up" &&
                    "bg-emerald-500/10 text-emerald-500",
                  trendDirection === "down" && "bg-rose-500/10 text-rose-500",
                  trendDirection === "neutral" &&
                    "bg-slate-500/10 text-slate-500",
                )}
              >
                {trend}
              </span>
              <span className="text-xs text-muted-foreground">
                {trendLabel ?? "vs last month"}
              </span>
            </div>
          )}
        </div>
        <div className="p-3 bg-muted/50 rounded-xl text-primary border border-white/5">
          {icon}
        </div>
      </div>
    </div>
  );
}
