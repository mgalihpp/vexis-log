import { useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AnalyticsTrade } from "@/utils/dashboard.analytics";
import { calculateDailyPnL } from "@/utils/dashboard.analytics";

type PnLCalendarProps = {
  trades: Array<AnalyticsTrade>;
};

export function PnLCalendar({ trades }: PnLCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Calculate P&L data
  const dailyData = calculateDailyPnL(trades);
  const pnlMap = new Map<string, { pnl: number; tradeCount: number }>();

  for (const day of dailyData) {
    pnlMap.set(day.date, { pnl: day.pnl, tradeCount: day.tradeCount });
  }

  // Calendar generation logic
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Calculate offset for Monday start
  // getDay returns 0 for Sunday, 1 for Monday, etc.
  const startDay = getDay(monthStart);
  const offset = startDay === 0 ? 6 : startDay - 1;

  const getDayCellStyle = (pnl: number | undefined) => {
    if (pnl === undefined) return "bg-muted/30 text-muted-foreground";
    if (pnl > 0)
      return "bg-emerald-500/15 text-emerald-600 border-emerald-500/30 font-medium";
    if (pnl < 0)
      return "bg-red-500/15 text-red-600 border-red-500/30 font-medium";
    return "bg-muted/30 text-muted-foreground";
  };

  const formatCurrency = (val: number) => {
    return val > 0 ? `+$${val.toFixed(2)}` : `-$${Math.abs(val).toFixed(2)}`;
  };

  if (trades.length === 0) {
    return (
      <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
        <h3 className="text-lg font-bold font-display mb-6">P&L Calendar</h3>
        <div className="h-full flex flex-col text-center items-center justify-center text-sm text-muted-foreground border border-dashed border-border/60 rounded-xl min-h-[300px]">
          <p>No trades yet.</p>
          <p>Add a trade to see your P&L calendar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold font-display">P&L Calendar</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentMonth((prev) => subMonths(prev, 1))}
            className="p-1 hover:bg-muted rounded-md transition-colors"
            type="button"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium min-w-[120px] text-center">
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <button
            onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}
            className="p-1 hover:bg-muted rounded-md transition-colors"
            type="button"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div
            key={day}
            className="text-center text-xs text-muted-foreground font-medium py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for offset */}
        {Array.from({ length: offset }).map((_, i) => (
          <div key={`empty-${i}`} className="min-h-[60px] md:min-h-[80px]" />
        ))}

        {/* Day cells */}
        {daysInMonth.map((date) => {
          const dateStr = format(date, "yyyy-MM-dd");
          const dayData = pnlMap.get(dateStr);
          const pnl = dayData?.pnl;
          const dayNumber = format(date, "d");

          return (
            <div
              key={dateStr}
              className={`
                relative p-2 rounded-lg border text-xs sm:text-sm flex flex-col justify-between
                min-h-[60px] md:min-h-[80px] transition-colors
                ${getDayCellStyle(pnl)}
                ${!dayData ? "border-transparent" : ""}
              `}
            >
              <span className="opacity-50 text-[10px] sm:text-xs font-medium">
                {dayNumber}
              </span>

              {dayData && (
                <div className="flex flex-col items-center justify-center gap-0.5 flex-1">
                  <span className="font-semibold tracking-tight whitespace-nowrap">
                    {formatCurrency(pnl || 0)}
                  </span>
                  <span className="text-[10px] opacity-70 hidden sm:inline-block">
                    {dayData.tradeCount} trade
                    {dayData.tradeCount !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
