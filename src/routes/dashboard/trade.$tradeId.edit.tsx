import { format } from 'date-fns'
import { createFileRoute } from '@tanstack/react-router'
import type { TradeFormInput } from '@/utils/schema/tradeSchema'
import TradeForm from '@/features/trade/components/TradeForm'
import { getTrade } from '@/utils/dashboard.functions'

export const Route = createFileRoute('/dashboard/trade/$tradeId/edit')({
  loader: async ({ params }) => {
    const trade = await getTrade({ data: { id: params.tradeId } })
    return { trade }
  },
  component: RouteComponent,
})

function mapTradeToFormValues(trade: {
  date: Date | string
  time?: string | null
  market: string
  pair: string
  timeframe?: string | null
  session?: string | null
  tradeType?: string | null
  type: string
  marketCondition?: string | null
  marketBias?: string | null
  strategy?: string | null
  setup?: string | null
  technicalConfirmation?: string | null
  fundamentalConfirmation?: string | null
  entryReason?: string | null
  entryPrice?: number | null
  stopLoss?: number | null
  takeProfit?: number | null
  riskPercent?: number | null
  rrRatio?: string | null
  riskRewardRatio?: number | null
  positionSize?: number | null
  entryOnPlan?: boolean | null
  slippage?: string | null
  planChange?: string | null
  tradeManagement?: string | null
  emotionBefore?: string | null
  emotionalDisruption?: string | null
  confidence?: number | null
  discipline?: number | null
  exitPrice?: number | null
  profitLoss?: number | null
  result?: string | null
  actualRR?: number | null
  whatWentRight?: string | null
  mistakes?: string | null
  validSetup?: boolean | null
  entryTiming?: string | null
  lesson?: string | null
  notes?: string | null
  tags?: Array<string> | null
  improvement?: string | null
  rulesToTighten?: string | null
  actionPlan?: string | null
}): TradeFormInput {
  const dateValue =
    trade.date instanceof Date ? trade.date : new Date(trade.date)
  const timeValue = trade.time ?? format(dateValue, 'HH:mm')

  return {
    date: format(dateValue, 'yyyy-MM-dd'),
    time: timeValue,
    market: trade.market,
    pair: trade.pair,
    timeframe: trade.timeframe ?? '',
    session: trade.session ?? '',
    tradeType: trade.tradeType ?? '',
    direction: trade.type,
    marketCondition: trade.marketCondition ?? '',
    marketBias: trade.marketBias ?? '',
    strategy: trade.strategy ?? '',
    setup: trade.setup ?? '',
    technicalConfirmation: trade.technicalConfirmation ?? '',
    fundamentalConfirmation: trade.fundamentalConfirmation ?? '',
    entryReason: trade.entryReason ?? '',
    entryPrice: trade.entryPrice?.toString() ?? '',
    stopLoss: trade.stopLoss?.toString() ?? '',
    takeProfit: trade.takeProfit?.toString() ?? '',
    riskPercent: trade.riskPercent?.toString() ?? '',
    rrRatio: trade.rrRatio ?? trade.riskRewardRatio?.toString() ?? '',
    positionSize: trade.positionSize?.toString() ?? '',
    entryOnPlan: trade.entryOnPlan ?? false,
    slippage: trade.slippage ?? '',
    planChange: trade.planChange ?? '',
    tradeManagement: trade.tradeManagement ?? '',
    emotionBefore: trade.emotionBefore ?? '',
    emotionalDisruption: trade.emotionalDisruption ?? '',
    confidence: trade.confidence ?? 5,
    discipline: trade.discipline ?? 5,
    exitPrice: trade.exitPrice?.toString() ?? '',
    profitLoss: trade.profitLoss?.toString() ?? '',
    result: trade.result ?? 'Pending',
    actualRR: trade.actualRR?.toString() ?? '',
    whatWentRight: trade.whatWentRight ?? '',
    mistakes: trade.mistakes ?? '',
    validSetup: trade.validSetup ?? false,
    entryTiming: trade.entryTiming ?? '',
    lesson: trade.lesson ?? '',
    notes: trade.notes ?? '',
    tags: trade.tags ?? [],
    improvement: trade.improvement ?? '',
    rulesToTighten: trade.rulesToTighten ?? '',
    actionPlan: trade.actionPlan ?? '',
  }
}

function RouteComponent() {
  const { trade } = Route.useLoaderData()
  const initialValues = mapTradeToFormValues(trade)

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Edit Trade
        </h1>
        <p className="text-muted-foreground">
          Update trade details, outcome, or notes.
        </p>
      </div>
      <TradeForm tradeId={trade.id} initialValues={initialValues} />
    </div>
  )
}
