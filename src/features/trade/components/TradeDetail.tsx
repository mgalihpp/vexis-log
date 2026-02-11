import {
  Activity,
  AlertTriangle,
  BarChart3,
  Brain,
  ClipboardCheck,
  Edit,
  FileText,
  Lightbulb,
  Minus,
  Target,
  TrendingDown,
  TrendingUp,
  X,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { TradeEntry } from '@/types/trade'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface TradeDetailProps {
  trade: TradeEntry
  onClose: () => void
}

const resultConfig = {
  Win: {
    icon: TrendingUp,
    label: 'WIN',
    class: 'text-success bg-success/15 border-success/30',
  },
  Loss: {
    icon: TrendingDown,
    label: 'LOSS',
    class: 'text-destructive bg-destructive/15 border-destructive/30',
  },
  BE: {
    icon: Minus,
    label: 'BREAKEVEN',
    class: 'text-warning bg-warning/15 border-warning/30',
  },
}

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: React.ElementType
  title: string
}) {
  return (
    <div className="section-header">
      <Icon className="h-4 w-4 text-primary" />
      <span>{title}</span>
    </div>
  )
}

function Field({
  label,
  value,
  mono,
}: {
  label: string
  value: string | number | boolean | null | undefined
  mono?: boolean
}) {
  const display =
    typeof value === 'boolean'
      ? value
        ? 'Ya ✓'
        : 'Tidak ✗'
      : String(value ?? '')
  return (
    <div>
      <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
      <div className={`text-sm text-foreground ${mono ? 'font-mono' : ''}`}>
        {display || '—'}
      </div>
    </div>
  )
}

function RatingBar({ value, max = 10 }: { value: number; max?: number }) {
  const pct = (value / max) * 100
  const color =
    value >= 7 ? 'bg-success' : value >= 4 ? 'bg-warning' : 'bg-destructive'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-sm font-semibold text-foreground">
        {value}/{max}
      </span>
    </div>
  )
}

export function TradeDetail({ trade, onClose }: TradeDetailProps) {
  const outcomeKey = (trade.outcome ?? 'BE') as keyof typeof resultConfig
  const cfg = resultConfig[outcomeKey]
  const ResultIcon = cfg.icon

  const profitLossPercent =
    trade.riskPercent && trade.actualRR
      ? Number((trade.actualRR * trade.riskPercent).toFixed(2))
      : (trade.profitLoss ?? 0)

  return (
    <div className="glass-card p-6 animate-fade-in h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-lg border ${cfg.class}`}
          >
            <ResultIcon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-mono text-xl font-bold text-foreground">
              {trade.pair}
            </h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>
                {trade.date instanceof Date
                  ? trade.date.toLocaleDateString()
                  : String(trade.date)}{' '}
                {trade.time ?? ''}
              </span>
              <span>·</span>
              <span>{trade.session}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/dashboard/trade/$tradeId/edit"
            params={{ tradeId: trade.id }}
          >
            <button
              type="button"
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <Edit className="h-5 w-5 text-muted-foreground" />
            </button>
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Result banner */}
      <div
        className={`flex items-center justify-between p-4 rounded-lg border mb-6 ${cfg.class}`}
      >
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={cfg.class}>
            {cfg.label}
          </Badge>
          <span className="text-sm">
            Actual RR:{' '}
            <span className="font-mono font-bold">{trade.actualRR}R</span>
          </span>
        </div>
        <div className="font-mono text-2xl font-bold">
          {profitLossPercent > 0 ? '+' : ''}
          {profitLossPercent}%
        </div>
      </div>

      <div className="space-y-6">
        {/* 1. Informasi Umum */}
        <section>
          <SectionTitle icon={FileText} title="Informasi Umum" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Field label="Market" value={trade.market} />
            <Field label="Timeframe" value={trade.timeframe} mono />
            <Field label="Session" value={trade.session} />
            <Field label="Tipe Trade" value={trade.tradeType} />
          </div>
        </section>

        <Separator className="bg-border/50" />

        {/* 2. Pra-Trade Analysis */}
        <section>
          <SectionTitle icon={Target} title="Pra-Trade Analysis" />
          <div className="grid grid-cols-2 gap-4 mb-3">
            <Field label="Kondisi Market" value={trade.marketCondition} />
            <Field label="Market Bias" value={trade.marketBias} />
          </div>
          <div className="space-y-3">
            <Field label="Setup" value={trade.setup} />
            <Field
              label="Konfirmasi Teknis"
              value={trade.technicalConfirmation}
            />
            <Field
              label="Konfirmasi Fundamental"
              value={trade.fundamentalConfirmation}
            />
            <Field label="Alasan Entry" value={trade.entryReason} />
          </div>
        </section>

        <Separator className="bg-border/50" />

        {/* 3. Trading Plan */}
        <section>
          <SectionTitle icon={ClipboardCheck} title="Trading Plan" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Field label="Entry Price" value={trade.entryPrice} mono />
            <Field label="Stop Loss" value={trade.stopLoss} mono />
            <Field label="Take Profit" value={trade.takeProfit} mono />
            <Field label="Risk %" value={`${trade.riskPercent}%`} mono />
            <Field label="RR Ratio" value={`${trade.rrRatio}R`} mono />
            <Field label="Position Size" value={trade.positionSize} mono />
          </div>
        </section>

        <Separator className="bg-border/50" />

        {/* 4. Eksekusi */}
        <section>
          <SectionTitle icon={Activity} title="Eksekusi Trade" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Entry sesuai plan?" value={trade.entryOnPlan} />
            <Field label="Slippage" value={trade.slippage} />
          </div>
          <div className="mt-3 space-y-3">
            <Field label="Perubahan Plan" value={trade.planChange} />
            <Field label="Manajemen Trade" value={trade.tradeManagement} />
          </div>
        </section>

        <Separator className="bg-border/50" />

        {/* 5. Psikologi */}
        <section>
          <SectionTitle icon={Brain} title="Psikologi Trading" />
          <div className="grid grid-cols-2 gap-4 mb-3">
            <Field label="Emosi Sebelum Entry" value={trade.emotionBefore} />
            <Field label="Gangguan Emosi" value={trade.emotionalDisruption} />
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                Tingkat Keyakinan
              </div>
              <RatingBar value={trade.confidenceLevel ?? 0} />
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                Disiplin terhadap Rules
              </div>
              <RatingBar value={trade.disciplineScore ?? 0} />
            </div>
          </div>
        </section>

        <Separator className="bg-border/50" />

        {/* 6. Hasil */}
        <section>
          <SectionTitle icon={BarChart3} title="Hasil Trade" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Field label="Exit Price" value={trade.exitPrice} mono />
            <Field label="P&L" value={trade.profitLoss} mono />
            <Field label="P&L %" value={`${profitLossPercent}%`} mono />
          </div>
        </section>

        <Separator className="bg-border/50" />

        {/* 7. Post-Trade Review */}
        <section>
          <SectionTitle icon={Lightbulb} title="Post-Trade Review" />
          <div className="space-y-3">
            <Field
              label="Apa yang dilakukan dengan benar"
              value={trade.whatWentRight}
            />
            <Field label="Kesalahan" value={trade.mistakes} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Setup valid?" value={trade.setupValid} />
              <Field label="Entry timing" value={trade.entryTiming} />
            </div>
            <Field label="Pelajaran penting" value={trade.lessonsLearned} />
          </div>
        </section>

        <Separator className="bg-border/50" />

        {/* 9. Evaluasi */}
        <section>
          <SectionTitle icon={AlertTriangle} title="Evaluasi & Improvement" />
          <div className="space-y-3">
            <Field
              label="Apa yang harus diperbaiki"
              value={trade.improvementPlan}
            />
            <Field
              label="Rule yang perlu diperketat"
              value={trade.rulesToTighten}
            />
            <Field label="Action plan" value={trade.actionPlan} />
          </div>
        </section>
      </div>
    </div>
  )
}
