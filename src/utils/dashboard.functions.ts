import { createServerFn } from '@tanstack/react-start'
import { getAllTrades, getTradeStats } from './dashboard.server'
import { prisma } from '@/lib/db'
import { tradeSchema } from '@/utils/schema/tradeSchema'

export const getTrades = createServerFn({
  method: 'GET',
}).handler(async () => {
  return getAllTrades()
})

export const createTrade = createServerFn({
  method: 'POST',
})
  .inputValidator((data: unknown) => tradeSchema.parse(data))
  .handler(async ({ data }) => {
    const parseNumber = (value?: string) => {
      if (value === undefined || value === '') {
        return undefined
      }

      const parsed = Number(value)
      return Number.isNaN(parsed) ? undefined : parsed
    }

    const parseRatio = (value?: string) => {
      if (value === undefined || value === '') {
        return undefined
      }

      if (value.includes(':')) {
        const [left, right] = value.split(':')
        const leftNumber = Number(left)
        const rightNumber = Number(right)

        if (Number.isNaN(leftNumber) || Number.isNaN(rightNumber)) {
          return undefined
        }

        if (leftNumber === 0) {
          return undefined
        }

        return rightNumber / leftNumber
      }

      return parseNumber(value)
    }

    const dateValue = data.time
      ? new Date(`${data.date}T${data.time}`)
      : new Date(data.date)

    return prisma.trade.create({
      data: {
        date: dateValue,
        time: data.time,
        market: data.market,
        pair: data.pair,
        timeframe: data.timeframe,
        session: data.session,
        tradeType: data.tradeType,
        type: data.tradeType,
        marketCondition: data.marketCondition,
        marketBias: data.marketBias,
        strategy: data.strategy,
        setup: data.setup,
        technicalConfirmation: data.technicalConfirmation,
        fundamentalConfirmation: data.fundamentalConfirmation,
        entryReason: data.entryReason,
        entryPrice: parseNumber(data.entryPrice),
        stopLoss: parseNumber(data.stopLoss),
        takeProfit: parseNumber(data.takeProfit),
        riskPercent: parseNumber(data.riskPercent),
        riskRewardRatio: parseRatio(data.rrRatio),
        rrRatio: data.rrRatio,
        positionSize: parseNumber(data.positionSize),
        entryOnPlan: data.entryOnPlan,
        slippage: data.slippage,
        planChange: data.planChange,
        tradeManagement: data.tradeManagement,
        emotionBefore: data.emotionBefore,
        emotionalDisruption: data.emotionalDisruption,
        confidenceLevel: data.confidence,
        confidence: data.confidence,
        disturbances: data.emotionalDisruption,
        disciplineScore: data.discipline,
        discipline: data.discipline,
        exitPrice: parseNumber(data.exitPrice),
        profitLoss: parseNumber(data.profitLoss),
        outcome: data.result,
        result: data.result,
        actualRR: parseNumber(data.actualRR),
        whatWentRight: data.whatWentRight,
        mistakes: data.mistakes,
        setupValid: data.validSetup,
        validSetup: data.validSetup,
        entryTiming: data.entryTiming,
        lesson: data.lesson,
        notes: data.notes,
        tags: data.tags,
        improvement: data.improvement,
        rulesToTighten: data.rulesToTighten,
        actionPlan: data.actionPlan,
      },
    })
  })

export const getStats = createServerFn({
  method: 'GET',
}).handler(async () => {
  return getTradeStats()
})
