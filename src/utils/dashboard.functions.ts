import { createServerFn } from '@tanstack/react-start'
import z from 'zod'
import {
  deleteTradeById,
  getAllTrades,
  getTradeById,
  getTradeStats,
} from './dashboard.server'
import { prisma } from '@/lib/db'
import {
  quickAddTradeSchema,
  tradeSchema,
  updateTradeSchema,
} from '@/utils/schema/tradeSchema'

export const getTrades = createServerFn({
  method: 'GET',
}).handler(async () => {
  return getAllTrades()
})

export const getTrade = createServerFn({
  method: 'GET',
})
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    return getTradeById(data.id)
  })

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

const mapTradeInputToData = (
  data:
    | z.infer<typeof tradeSchema>
    | z.infer<typeof quickAddTradeSchema>
    | Partial<z.infer<typeof tradeSchema>>,
) => {
  const dateValue =
    data.date !== undefined
      ? data.time
        ? new Date(`${data.date}T${data.time}`)
        : new Date(data.date)
      : undefined

  return {
    date: dateValue,
    time: data.time,
    market: data.market,
    pair: data.pair,
    timeframe: data.timeframe,
    session: data.session,
    tradeType: data.tradeType,
    type: data.direction ?? data.tradeType,
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
  }
}

export const createTrade = createServerFn({
  method: 'POST',
})
  .inputValidator((data: unknown) =>
    tradeSchema.or(quickAddTradeSchema).parse(data),
  )
  .handler(async ({ data }) => {
    // Validator guarantees full data via tradeSchema | quickAddTradeSchema
    return prisma.trade.create({
      data: mapTradeInputToData(data) as Parameters<
        typeof prisma.trade.create
      >[0]['data'],
    })
  })

export const updateTrade = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.string(), data: updateTradeSchema }))
  .handler(async ({ data }) => {
    const mapped = mapTradeInputToData(data.data)
    // Strip undefined fields so Prisma only updates provided values
    const updateData = Object.fromEntries(
      Object.entries(mapped).filter(([, v]) => v !== undefined),
    )
    return prisma.trade.update({
      where: {
        id: data.id,
      },
      data: updateData,
    })
  })

export const deleteTrade = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    return deleteTradeById(data.id)
  })

export const getStats = createServerFn({
  method: 'GET',
}).handler(async () => {
  return getTradeStats()
})
