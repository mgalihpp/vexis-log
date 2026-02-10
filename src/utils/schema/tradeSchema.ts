import { z } from 'zod'

export const tradeSchema = z.object({
  date: z.string().min(1, 'Please enter a date.'),
  time: z.string().min(1, 'Please enter a time.'),
  market: z.string().min(1, 'Please select a market.'),
  pair: z.string().min(1, 'Please enter a pair/asset.'),
  timeframe: z.string().min(1, 'Please select a timeframe.'),
  session: z.string().min(1, 'Please select a session.'),
  tradeType: z.string().min(1, 'Please select a trade type.'),
  direction: z.string().min(1, 'Please select a direction.'),
  marketCondition: z.string().min(1, 'Please select a market condition.'),
  marketBias: z.string().optional(),
  strategy: z.string().optional(),
  setup: z.string().min(1, 'Please describe the setup.'),
  technicalConfirmation: z.string().optional(),
  fundamentalConfirmation: z.string().optional(),
  entryReason: z.string().optional(),
  entryPrice: z.string().optional(),
  stopLoss: z.string().optional(),
  takeProfit: z.string().optional(),
  riskPercent: z.string().optional(),
  rrRatio: z.string().optional(),
  positionSize: z.string().optional(),
  entryOnPlan: z.boolean().optional(),
  slippage: z.string().optional(),
  planChange: z.string().optional(),
  tradeManagement: z.string().optional(),
  emotionBefore: z.string().optional(),
  emotionalDisruption: z.string().optional(),
  confidence: z.number().min(1),
  discipline: z.number().min(1),
  exitPrice: z.string().optional(),
  profitLoss: z.string().optional(),
  result: z.string().min(1, 'Please select a result.').default('Pending'),
  actualRR: z.string().optional(),
  whatWentRight: z.string().optional(),
  mistakes: z.string().optional(),
  validSetup: z.boolean().optional(),
  entryTiming: z.string().optional(),
  lesson: z.string().optional(),
  notes: z.string().min(1, 'Please add notes.'),
  tags: z.array(z.string()).optional().default([]),
  improvement: z.string().optional(),
  rulesToTighten: z.string().optional(),
  actionPlan: z.string().optional(),
})

export const quickAddTradeSchema = tradeSchema.partial().extend({
  date: z.string().min(1, 'Please enter a date.'),
  time: z.string().min(1, 'Please enter a time.'),
  market: z.string().min(1, 'Please select a market.'),
  pair: z.string().min(1, 'Please enter a pair/asset.'),
  timeframe: z.string().min(1, 'Please select a timeframe.'),
  tradeType: z.string().min(1, 'Please select a trade type.'),
  direction: z.string().min(1, 'Please select a direction.'),
  result: z.string().min(1, 'Please select a result.').default('Pending'),
  confidence: z.number().min(1).optional().default(5),
  discipline: z.number().min(1).optional().default(5),
})

export const updateTradeSchema = z
  .object({})
  .passthrough()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update.',
  })
  .pipe(tradeSchema.partial())

export type TradeFormInput = z.input<typeof tradeSchema>
export type TradeFormValues = z.infer<typeof tradeSchema>
export type QuickAddTradeFormInput = z.input<typeof quickAddTradeSchema>
export type QuickAddTradeFormValues = z.infer<typeof quickAddTradeSchema>
export type UpdateTradeFormInput = Partial<z.input<typeof tradeSchema>>
export type UpdateTradeFormValues = z.infer<typeof updateTradeSchema>
