import { format } from 'date-fns'
import type { TradeFormInput } from '@/utils/schema/tradeSchema'
import type { TradeEntry } from '@/types/trade'

export function mapTradeToFormValues(trade: TradeEntry): TradeFormInput {
  const dateValue =
    trade.date instanceof Date ? trade.date : new Date(trade.date)
  const timeValue = trade.time ?? format(dateValue, 'HH:mm')

  return {
    date: format(dateValue, 'yyyy-MM-dd'),
    time: timeValue,
    market: trade.market,
    pair: trade.pair,
    timeframe: trade.timeframe,
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
    confidence: trade.confidenceLevel ?? 5,
    discipline: trade.disciplineScore ?? 5,
    exitPrice: trade.exitPrice?.toString() ?? '',
    profitLoss: trade.profitLoss?.toString() ?? '',
    result: trade.result ?? 'Pending',
    actualRR: trade.actualRR?.toString() ?? '',
    whatWentRight: trade.whatWentRight ?? '',
    mistakes: trade.mistakes ?? '',
    validSetup: trade.validSetup ?? false,
    entryTiming: trade.entryTiming ?? '',
    lesson: trade.lessonsLearned ?? '',
    notes: trade.notes ?? '',
    tags: trade.tags,
    improvement: trade.improvementPlan ?? '',
    rulesToTighten: trade.rulesToTighten ?? '',
    actionPlan: trade.actionPlan ?? '',
  }
}
