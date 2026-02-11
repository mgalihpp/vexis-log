import {
  ChevronRight,
  ClipboardList,
  Minus,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { TradeEntry } from '@/types/trade'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface TradeListProps {
  trades: Array<TradeEntry>
  onSelectTrade: (trade: TradeEntry) => void
  selectedId?: string
}

const resultConfig = {
  Win: {
    icon: TrendingUp,
    class: 'bg-success/15 text-success border-success/30',
  },
  Loss: {
    icon: TrendingDown,
    class: 'bg-destructive/15 text-destructive border-destructive/30',
  },
  BE: { icon: Minus, class: 'bg-warning/15 text-warning border-warning/30' },
}

const marketColors: Record<string, string> = {
  Forex: 'bg-primary/15 text-primary border-primary/30',
  Crypto:
    'bg-[hsl(262,60%,52%)]/15 text-[hsl(262,60%,52%)] border-[hsl(262,60%,52%)]/30',
  Stock: 'bg-success/15 text-success border-success/30',
  Index: 'bg-warning/15 text-warning border-warning/30',
}

export function TradeList({
  trades,
  onSelectTrade,
  selectedId,
}: TradeListProps) {
  if (trades.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-lg border-border/50 bg-muted/5 animate-fade-in">
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-muted/20">
          <ClipboardList className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold font-display">
          Trade Journal Empty
        </h3>
        <p className="max-w-xs mb-6 text-sm text-muted-foreground">
          You haven't logged any trades yet. Start your journey by adding your
          first trade.
        </p>
        <Link to="/dashboard/trade/new">
          <Button>Add First Trade</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {trades.map((trade, i) => {
        const outcomeKey = trade.outcome ?? 'BE'
        const cfg =
          (resultConfig as Record<string, any>)[outcomeKey] ?? resultConfig.BE
        const ResultIcon = cfg.icon
        const isSelected = trade.id === selectedId

        const profitLossPercent =
          trade.riskPercent && trade.actualRR
            ? Number((trade.actualRR * trade.riskPercent).toFixed(2))
            : (trade.profitLoss ?? 0)

        return (
          <button
            key={trade.id}
            onClick={() => onSelectTrade(trade)}
            className={`w-full text-left glass-card p-4 hover:bg-secondary/50 transition-all cursor-pointer animate-fade-in group ${
              isSelected ? 'ring-1 ring-primary/50 glow-primary' : ''
            }`}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-lg ${cfg.class}`}
                >
                  <ResultIcon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-semibold text-foreground">
                      {trade.pair}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] px-1.5 py-0 ${marketColors[trade.market] || ''}`}
                    >
                      {trade.market}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0 border-border text-muted-foreground"
                    >
                      {trade.tradeType}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>
                      {trade.date instanceof Date
                        ? trade.date.toLocaleDateString()
                        : String(trade.date)}
                    </span>
                    <span>{trade.session}</span>
                    <span>{trade.timeframe}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div
                    className={`font-mono font-semibold text-sm ${
                      profitLossPercent > 0
                        ? 'text-success'
                        : profitLossPercent < 0
                          ? 'text-destructive'
                          : 'text-warning'
                    }`}
                  >
                    {profitLossPercent > 0 ? '+' : ''}
                    {profitLossPercent}%
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {trade.actualRR && trade.actualRR > 0 ? '+' : ''}
                    {trade.actualRR}R
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
