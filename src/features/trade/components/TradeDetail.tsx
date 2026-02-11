import React from 'react'
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Brain,
  ClipboardCheck,
  Clock,
  Edit,
  FileText,
  Lightbulb,
  Minus,
  Target,
  TrendingDown,
  TrendingUp,
  X,
} from 'lucide-react'
import { Link, useRouter } from '@tanstack/react-router'
import { mapTradeToFormValues } from '../utils/trade-mapper'
import { EditableSection } from './EditableSection'
import { TradeStepInfo } from './steps/TradeStepInfo'
import { TradeStepPlan } from './steps/TradeStepPlan'
import { TradeStepExecution } from './steps/TradeStepExecution'
import { TradeStepPsychology } from './steps/TradeStepPsychology'
import { TradeStepReview } from './steps/TradeStepReview'
import type { TradeEntry } from '@/types/trade'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { updateTradeSchema } from '@/utils/schema/tradeSchema'
import { updateTrade } from '@/utils/dashboard.functions'

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
  Breakeven: {
    icon: Minus,
    label: 'BREAKEVEN',
    class: 'text-warning bg-warning/15 border-warning/30',
  },
  Partial: {
    icon: Activity,
    label: 'PARTIAL',
    class: 'text-info bg-info/15 border-info/30',
  },
  Pending: {
    icon: Clock,
    label: 'PENDING',
    class: 'text-muted-foreground bg-muted/15 border-muted/30',
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
  const router = useRouter()

  // Normalize outcome to match config keys
  let outcome = trade.outcome ?? 'Pending'

  // Handle legacy/alternate values
  if (outcome === 'BE') outcome = 'Breakeven'

  // Fallback if the outcome string isn't in our config (e.g. invalid data)
  if (!(outcome in resultConfig)) {
    outcome = 'Pending'
  }

  const outcomeKey = outcome as keyof typeof resultConfig
  const cfg = resultConfig[outcomeKey]
  const ResultIcon = cfg.icon

  const profitLossPercent =
    trade.riskPercent && trade.actualRR
      ? Number((trade.actualRR * trade.riskPercent).toFixed(2))
      : (trade.profitLoss ?? 0)

  const defaultValues = mapTradeToFormValues(trade)

  const handleSave = async (data: any) => {
    await updateTrade({ data: { id: trade.id, data } })
    router.invalidate()
  }

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
              title="Full Edit Mode"
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
        {/* Block 1: Info & Context */}
        <EditableSection
          title="Trade Info & Setup"
          icon={FileText}
          defaultValues={defaultValues}
          schema={updateTradeSchema}
          onSave={handleSave}
          renderEdit={(form) => <TradeStepInfo form={form} />}
          renderView={() => (
            <>
              {/* 1. Informasi Umum */}
              <div className="mb-4">
                <SectionTitle icon={FileText} title="Informasi Umum" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Field label="Market" value={trade.market} />
                  <Field label="Timeframe" value={trade.timeframe} mono />
                  <Field label="Session" value={trade.session} />
                  <Field label="Tipe Trade" value={trade.tradeType} />
                </div>
              </div>

              {/* 2. Pra-Trade Analysis (Part 1: Context) */}
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Kondisi Market" value={trade.marketCondition} />
                  <Field label="Market Bias" value={trade.marketBias} />
                  <Field label="Strategy" value={trade.strategy} />
                </div>
                <div className="mt-3">
                  <Field label="Setup" value={trade.setup} />
                </div>
              </div>
            </>
          )}
        />

        <Separator className="bg-border/50" />

        {/* Block 2: Plan & Analysis */}
        <EditableSection
          title="Analysis & Plan"
          icon={Target}
          defaultValues={defaultValues}
          schema={updateTradeSchema}
          onSave={handleSave}
          renderEdit={(form) => <TradeStepPlan form={form} />}
          renderView={() => (
            <>
              {/* 2. Pra-Trade Analysis (Part 2: Confirmations) */}
              <div className="mb-4">
                <SectionTitle icon={Target} title="Pra-Trade Analysis" />
                <div className="space-y-3">
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
              </div>

              {/* 3. Trading Plan */}
              <div>
                <SectionTitle icon={ClipboardCheck} title="Trading Plan" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Field label="Entry Price" value={trade.entryPrice} mono />
                  <Field label="Stop Loss" value={trade.stopLoss} mono />
                  <Field label="Take Profit" value={trade.takeProfit} mono />
                  <Field label="Risk %" value={`${trade.riskPercent}%`} mono />
                  <Field label="RR Ratio" value={`${trade.rrRatio}R`} mono />
                  <Field
                    label="Position Size"
                    value={trade.positionSize}
                    mono
                  />
                </div>
              </div>
            </>
          )}
        />

        <Separator className="bg-border/50" />

        {/* Block 3: Execution & Result */}
        <EditableSection
          title="Execution & Outcome"
          icon={Activity}
          defaultValues={defaultValues}
          schema={updateTradeSchema}
          onSave={handleSave}
          renderEdit={(form) => {
            const result = form.watch('result')
            const isPending = result === 'Pending'
            return <TradeStepExecution form={form} isPending={isPending} />
          }}
          renderView={() => (
            <>
              {/* 4. Eksekusi */}
              <div className="mb-4">
                <SectionTitle icon={Activity} title="Eksekusi Trade" />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Entry sesuai plan?" value={trade.entryOnPlan} />
                  <Field label="Slippage" value={trade.slippage} />
                </div>
                <div className="mt-3 space-y-3">
                  <Field label="Perubahan Plan" value={trade.planChange} />
                  <Field
                    label="Manajemen Trade"
                    value={trade.tradeManagement}
                  />
                </div>
              </div>

              {/* 6. Hasil (Moved here to match Edit Step) */}
              <div>
                <SectionTitle icon={BarChart3} title="Hasil Trade" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Field label="Exit Price" value={trade.exitPrice} mono />
                  <Field label="P&L" value={trade.profitLoss} mono />
                  <Field label="P&L %" value={`${profitLossPercent}%`} mono />
                </div>
              </div>
            </>
          )}
        />

        <Separator className="bg-border/50" />

        {/* Block 4: Psychology */}
        <EditableSection
          title="Psikologi Trading"
          icon={Brain}
          defaultValues={defaultValues}
          schema={updateTradeSchema}
          onSave={handleSave}
          renderEdit={(form) => <TradeStepPsychology form={form} />}
          renderView={() => (
            <>
              {/* 5. Psikologi */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                <Field
                  label="Emosi Sebelum Entry"
                  value={trade.emotionBefore}
                />
                <Field
                  label="Gangguan Emosi"
                  value={trade.emotionalDisruption}
                />
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
            </>
          )}
        />

        <Separator className="bg-border/50" />

        {/* Block 5: Review */}
        <EditableSection
          title="Review & Evaluation"
          icon={Lightbulb}
          defaultValues={defaultValues}
          schema={updateTradeSchema}
          onSave={handleSave}
          renderEdit={(form) => <TradeStepReview form={form} />}
          renderView={() => (
            <>
              {/* 7. Post-Trade Review */}
              <div className="mb-4">
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
                  <Field
                    label="Pelajaran penting"
                    value={trade.lessonsLearned}
                  />
                </div>
              </div>

              {/* 9. Evaluasi */}
              <div>
                <SectionTitle
                  icon={AlertTriangle}
                  title="Evaluasi & Improvement"
                />
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
              </div>
            </>
          )}
        />
      </div>
    </div>
  )
}
